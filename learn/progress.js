/* SignPlay progress helper (loaded by every stage page).
   Progress is one number, sp-done = how many stages are completed (0-30).
   Badges, XP and rank on the dashboard and profile are all calculated from it,
   and sync.js copies it to the signed-in account. So passing a stage only has to update it.
   Per-stage stars are kept in sp-stars ({ "5": 3, ... }) and synced the same way. */
(function () {
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  window.SPProgress = {
    done: function () {
      return Math.min(30, Math.max(0, parseInt(get("sp-done"), 10) || 0));
    },

    // Call when a stage is passed.
    // If it is the next stage in order, it unlocks (sp-done goes up by one).
    // Replaying an earlier stage only keeps the better star score.
    complete: function (stage, pct, stars) {
      var d = this.done();
      var isNew = (stage === d + 1);
      if (isNew) set("sp-done", String(stage));

      var best = {};
      try { best = JSON.parse(get("sp-stars") || "{}") || {}; } catch (e) { best = {}; }
      if (!best[stage] || stars > best[stage]) best[stage] = stars;
      set("sp-stars", JSON.stringify(best));

      // The learning path reads this once, plays the celebration, then deletes it
      set("sp-celebrate", JSON.stringify({ stage: stage, isNew: isNew, pct: pct, stars: stars }));
      if (window.SPFx) { setTimeout(function () { SPFx.play("win"); SPFx.confetti(); }, 150); }
      return isNew;
    },

    // Which page runs each stage (same mapping as the learning path)
    stageUrl: function (s) {
      if (s % 10 === 0) return "stage-boss.html?stage=" + s;
      if (s <= 2) return "stage-1-2.html?stage=" + s;
      if (s === 21) return "stage-21.html";
      if (s === 22) return "stage-22.html";
      if (s === 29) return "stage-29.html";
      if (s >= 26 && s <= 28) return "stage-lesson.html?stage=" + s;
      return "stage.html?stage=" + s;
    },

    // Buttons under the results screen:
    //   passed -> "Next stage" (or "Start next level" after a boss) + "Back to the learning path"
    //   not passed -> "Back to the learning path"
    addBack: function (ok) {
      var m = document.getElementById("m");
      if (!m || document.getElementById("sp-back")) return;
      var self = this, id = (window.D && D.id) || 0;
      var box = document.createElement("div");
      box.id = "sp-back";
      box.style.cssText = "display:grid;gap:10px;margin-top:14px";
      if (ok && id >= 1 && id < 30) {
        var n = document.createElement("a");
        n.className = "btn";
        n.href = self.stageUrl(id + 1);
        n.textContent = (id % 10 === 0) ? "Start the next level" : "Next stage";
        // the celebration already played here, so don't replay it on the path
        n.addEventListener("click", function () { try { localStorage.removeItem("sp-celebrate"); } catch (e) {} });
        box.appendChild(n);
      }
      var a = document.createElement("a");
      a.className = (ok && id < 30) ? "btn alt" : "btn";
      a.href = "learningpath.html";
      a.textContent = "Back to the learning path";
      box.appendChild(a);
      m.appendChild(box);
    },

    // Locked stages can't be opened by typing the address
    guard: function () {
      var id = (window.D && D.id) || 0;
      if (id > this.done() + 1) window.location.replace("learningpath.html");
    }
  };
})();

/* ===== Sounds + confetti for the stage pages =====
   - every button press: soft tap
   - right / wrong answers: small chime / low blip
   - finishing a part (Learn, Quiz, Practise, Play ...): congratulation jingle
     (not played if the learner used a Skip button in that part)
   - passing the stage: big fanfare + confetti
   Uses the same mute setting as the learning path (sp-sound-enabled). */
(function () {
  var ctx = null;
  function on() { try { return localStorage.getItem("sp-sound-enabled") !== "false"; } catch (e) { return true; } }
  function ac() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
    if (ctx && ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
    return ctx;
  }
  function note(freq, at, len, type, vol) {
    var c = ctx, o = c.createOscillator(), g = c.createGain(), t = c.currentTime + at;
    o.type = type || "triangle";
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(vol || 0.22, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + len);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + len);
  }
  var SOUNDS = {
    tap: function () {
      var c = ctx, o = c.createOscillator(), g = c.createGain(), t = c.currentTime;
      o.type = "sine";
      o.frequency.setValueAtTime(420, t);
      o.frequency.exponentialRampToValueAtTime(740, t + 0.08);
      g.gain.setValueAtTime(0.2, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + 0.08);
    },
    ok: function () { note(660, 0, 0.18, "sine", 0.22); note(880, 0.09, 0.25, "sine", 0.22); },
    no: function () { note(220, 0, 0.22, "sine", 0.18); },
    part: function () { [523.25, 659.25, 783.99, 1046.5].forEach(function (f, i) { note(f, i * 0.09, 0.35, "triangle", 0.25); }); },
    win: function () {
      [[523.25, 659.25], [587.33, 739.99], [783.99, 1046.5], [1046.5, 1318.5]].forEach(function (ch, i) {
        ch.forEach(function (f) { note(f, i * 0.14, 0.45, "triangle", 0.2); });
      });
    }
  };
  function play(name) {
    if (!on()) return;
    try { if (ac()) SOUNDS[name](); } catch (e) {}
  }

  var cv = null, parts = [], raf = 0;
  function confetti() {
    if (!cv) {
      cv = document.createElement("canvas");
      cv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999";
      document.body.appendChild(cv);
    }
    cv.width = innerWidth; cv.height = innerHeight;
    var cols = ["#ffd43b", "#ff6b57", "#3aa0ff", "#1fb5a8", "#b48cff", "#ec4899"];
    for (var i = 0; i < 140; i++) {
      parts.push({
        x: innerWidth / 2 + (Math.random() - 0.5) * 200, y: innerHeight * 0.4,
        vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4,
        s: 6 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
        c: cols[i % cols.length], life: 0
      });
    }
    if (!raf) raf = requestAnimationFrame(step);
  }
  function step() {
    var g = cv.getContext("2d");
    g.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(function (p) { return p.life < 150 && p.y < cv.height + 20; });
    parts.forEach(function (p) {
      p.life++; p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.r += p.vr;
      g.save(); g.translate(p.x, p.y); g.rotate(p.r);
      g.globalAlpha = Math.max(0, 1 - p.life / 150);
      g.fillStyle = p.c; g.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      g.restore();
    });
    if (parts.length) raf = requestAnimationFrame(step);
    else { raf = 0; g.clearRect(0, 0, cv.width, cv.height); }
  }

  window.SPFx = { play: play, confetti: confetti };

  // --- wire up after the page's own script has defined go() and fb() ---
  var skipped = false;
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("button, a.btn, [data-a]");
    if (!b || b.disabled) return;
    var a = b.dataset ? (b.dataset.a || "") : "";
    if (/skip/i.test(a) || /skip/i.test(b.textContent || "")) skipped = true;
    play("tap");
  }, true);

  document.addEventListener("DOMContentLoaded", function () {
    if (window.SPProgress) SPProgress.guard();
    var _go = window.go;
    if (typeof _go === "function") {
      window.go = function (n) {
        var from = (window.S && typeof S.st === "number") ? S.st : 0;
        var r = _go.apply(this, arguments);
        if (typeof n === "number" && n !== from) {
          var last = (window.STEPS && n >= STEPS.length - 1);   // the results screen has its own fanfare
          if (n > from && from >= 1 && !skipped && !last) play("part");
          skipped = false;   // a new part starts clean
        }
        return r;
      };
    }
    var _fb = window.fb;
    if (typeof _fb === "function") {
      window.fb = function (t, c) {
        var r = _fb.apply(this, arguments);
        if (c && /green/.test(c)) play("ok"); else if (c && /coral|red/.test(c)) play("no");
        return r;
      };
    }
  });
})();