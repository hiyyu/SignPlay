import { FilesetResolver, HandLandmarker, PoseLandmarker }
  from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs";

const BASE = new URL("../models/", import.meta.url).href;
const WASM = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const N_FRAMES = 48;
const POSE_KEEP = [0, 11, 12, 13, 14, 15, 16];
const ALIAS = { GOODBYE: "BYE" };
let hand, pose, session, meta, loading = null;

const sleep = ms => new Promise(r => setTimeout(r, ms));
function norm(w) {
  const n = String(w).toUpperCase().replace(/[^A-Z]/g, "");
  return ALIAS[n] || n;
}

function loadScript(src) {
  return new Promise((res, rej) => {
    if (window.ort) return res();
    const s = document.createElement("script");
    s.src = src; s.onload = res;
    s.onerror = () => rej(new Error("Could not load " + src));
    document.head.appendChild(s);
  });
}

function init() {
  if (!loading) {
    loading = (async () => {
      await loadScript("https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/ort.min.js");
      const fs = await FilesetResolver.forVisionTasks(WASM);
            const make = async delegate => {
        hand = await HandLandmarker.createFromOptions(fs, {
          baseOptions: { modelAssetPath: BASE + "hand_landmarker.task", delegate },
          runningMode: "VIDEO", numHands: 2 });
        pose = await PoseLandmarker.createFromOptions(fs, {
          baseOptions: { modelAssetPath: BASE + "pose_landmarker_lite.task", delegate },
          runningMode: "VIDEO" });
      };
      try { await make("GPU"); }
      catch (e) { console.warn("GPU not available, using CPU", e); await make("CPU"); }
      session = await ort.InferenceSession.create(BASE + "sign_gru.onnx");
      meta = await (await fetch(BASE + "labels.json")).json();
    })().catch(e => { loading = null; throw e; });
  }
  return loading;
}

async function supports(word) {
  await init();
  return Object.values(meta.word_of).includes(norm(word));
}

function flat(lms, n) {
  const a = new Float32Array(n * 3);
  if (lms) for (let i = 0; i < n; i++) {
    a[i * 3] = lms[i].x; a[i * 3 + 1] = lms[i].y; a[i * 3 + 2] = lms[i].z;
  }
  return a;
}

function frameVector(src, ts) {
  const h = hand.detectForVideo(src, ts);
  const p = pose.detectForVideo(src, ts);
  let left = null, right = null;
  h.landmarks.forEach((lms, i) => {
    if (h.handedness[i][0].categoryName === "Left") left = lms; else right = lms;
  });
  const body = p.landmarks.length ? p.landmarks[0] : null;
  const out = new Float32Array(225);
  out.set(flat(left, 21), 0);
  out.set(flat(right, 21), 63);
  out.set(flat(body, 33), 126);
  return out;
}

function median(arr) {
  const s = [...arr].sort((a, b) => a - b), m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

// Same steps as preprocess.py
function preprocess(frames) {
  const T = frames.length;
  const pts = frames.map(f => {
    const r = [];
    for (let k = 0; k < 75; k++) r.push([f[k * 3], f[k * 3 + 1], f[k * 3 + 2]]);
    return r;
  });
  const present = pts.map(fr => fr.map(q => Math.abs(q[0]) + Math.abs(q[1]) + Math.abs(q[2]) > 0));
  const LS = 42 + 11, RS = 42 + 12;
  const ok = [];
  for (let t = 0; t < T; t++) if (present[t][LS] && present[t][RS]) ok.push(t);
  if (!ok.length) return null;
  const ctr = [0, 1, 2].map(d => median(ok.map(t => (pts[t][LS][d] + pts[t][RS][d]) / 2)));
  const scale = median(ok.map(t => Math.hypot(
    pts[t][LS][0] - pts[t][RS][0], pts[t][LS][1] - pts[t][RS][1], pts[t][LS][2] - pts[t][RS][2])));
  if (scale < 1e-6) return null;

  const keep = [];
  for (let i = 0; i < 42; i++) keep.push(i);
  POSE_KEEP.forEach(i => keep.push(42 + i));

  const all = [], pk = [];
  for (let t = 0; t < T; t++) {
    const nm = pts[t].map((q, k) => present[t][k]
      ? [(q[0] - ctr[0]) / scale, (q[1] - ctr[1]) / scale, (q[2] - ctr[2]) / scale]
      : [0, 0, 0]);
    const kept = keep.map(k => nm[k]);
    const kp = keep.map(k => present[t][k]);
    const locals = [];
    for (const s of [0, 21]) {
      const h = kept.slice(s, s + 21);
      let size = Math.hypot(h[9][0] - h[0][0], h[9][1] - h[0][1], h[9][2] - h[0][2]);
      if (!(size > 1e-6)) size = 1;
      h.forEach((q, k) => locals.push(kp[s + k]
        ? [(q[0] - h[0][0]) / size, (q[1] - h[0][1]) / size, (q[2] - h[0][2]) / size]
        : [0, 0, 0]));
    }
    all.push(kept.concat(locals));
    pk.push(kp);
  }

  let first = -1, last = -1;
  for (let t = 0; t < T; t++) {
    if (pk[t].slice(0, 42).some(Boolean)) { if (first < 0) first = t; last = t; }
  }
  if (first < 0) return null;
  const seq = all.slice(first, last + 1).map(fr => fr.flat());
  const L = seq.length, D = seq[0].length;
  const out = new Float32Array(N_FRAMES * D);
  for (let i = 0; i < N_FRAMES; i++) {
    const pos = L === 1 ? 0 : (i / (N_FRAMES - 1)) * (L - 1);
    const i0 = Math.floor(pos), i1 = Math.min(i0 + 1, L - 1), w = pos - i0;
    for (let j = 0; j < D; j++) out[i * D + j] = seq[i0][j] * (1 - w) + seq[i1][j] * w;
  }
  return out;
}

// Returns the top 3 WORDS (variants like EAT1/EAT2 are added together)
async function predict(data) {
  const x = new ort.Tensor("float32", data, [1, N_FRAMES, 273]);
  const res = await session.run({ x });
  const logits = Array.from(res.logits.data);
  const mx = Math.max(...logits);
  const ex = logits.map(v => Math.exp(v - mx));
  const sum = ex.reduce((a, b) => a + b, 0);
  const byWord = {};
  ex.forEach((v, i) => {
    const w = meta.word_of[meta.labels[i]];
    byWord[w] = (byWord[w] || 0) + v / sum;
  });
  return Object.entries(byWord).sort((a, b) => b[1] - a[1]).slice(0, 3)
    .map(([word, p]) => ({ word, p }));
}

// video: the <video> element showing the webcam
// targets: array of acceptable words, e.g. ["Hello"] or ["Goodbye"]
// Returns { ok, top } or { error }
async function check(video, targets, onStatus = () => {}) {
  await init();
  if (!video || video.readyState < 2) return { error: "Turn on the camera first." };
  for (let n = 2; n > 0; n--) {
    onStatus("Hands down... starting in " + n);
    await sleep(1000);
  }
  onStatus("Sign now!");
  const shots = [];
  const t0 = performance.now();
  let lastTime = -1;
  await new Promise(done => {
    async function tick() {
      const now = performance.now();
      if (now - t0 > 2500) return done();
      if (video.currentTime !== lastTime) {
        lastTime = video.currentTime;
        shots.push({ ts: now, img: await createImageBitmap(video) });
      }
      requestAnimationFrame(tick);
    }
    tick();
  });
  const frames = [];
  for (let i = 0; i < shots.length; i += 4) {
    onStatus("Checking... " + Math.min(99, Math.round((i / shots.length) * 100)) + "%");
    await sleep(0);
    frames.push(frameVector(shots[i].img, shots[i].ts));
  }
  shots.forEach(s => s.img.close());
  const data = preprocess(frames);
  if (!data) return { error: "I couldn't see your hands and shoulders. Move back a little." };
  const top = await predict(data);
  const want = targets.map(norm);
  return { ok: top.some(t => want.includes(t.word)), top };
}

window.SignJudge = { init, supports, check, norm };
init().catch(() => {});