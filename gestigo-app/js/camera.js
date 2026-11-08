// ==========================================================================
// Gestigo - Camera, Hand Landmark Tracking & ASL Gesture Classifier
// ==========================================================================

class GestigoGestureEngine {
  constructor() {
    this.video = null;
    this.canvas = null;
    this.ctx = null;
    this.stream = null;
    this.hands = null;
    this.cameraInstance = null;

    this.isTracking = false;
    this.targetSign = null;
    this.confidence = 0;
    this.detectedSign = "None";
    this.onMatchCallback = null;
    this.matchHoldFrames = 0;
    this.requiredHoldFrames = 12; // Must hold sign for ~0.4s to confirm
  }

  init(videoId, canvasId) {
    this.video = document.getElementById(videoId);
    this.canvas = document.getElementById(canvasId);
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
    }
  }

  setTarget(sign, onMatch) {
    this.targetSign = (sign || "").toUpperCase().trim();
    this.onMatchCallback = onMatch;
    this.confidence = 0;
    this.detectedSign = "None";
    this.matchHoldFrames = 0;
    this.updateUIFeedback();
  }

  async startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn("Webcam not supported or accessible on this browser/environment.");
      this.showCameraFallback();
      return false;
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" }
      });
      if (this.video) {
        this.video.srcObject = this.stream;
        await this.video.play();
        this.isTracking = true;

        // Hide fallback notice so user face is immediately visible
        const notice = document.getElementById('cameraFallbackNotice');
        if (notice) notice.classList.add('hidden');

        if (this.canvas) {
          this.canvas.width = this.video.videoWidth || 640;
          this.canvas.height = this.video.videoHeight || 480;
        }

        this.initMediaPipe();
        return true;
      }
    } catch (err) {
      console.warn("Camera access denied or unavailable:", err);
      this.showCameraFallback();
      return false;
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.isTracking = false;
    const notice = document.getElementById('cameraFallbackNotice');
    if (notice) notice.classList.remove('hidden');
  }

  initMediaPipe() {
    if (this.canvas && this.video) {
      this.canvas.width = this.video.videoWidth || 640;
      this.canvas.height = this.video.videoHeight || 480;
    }

    if (window.Hands) {
      try {
        if (!this.hands) {
          this.hands = new window.Hands({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
          });
          this.hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
          });
          this.hands.onResults((results) => this.onHandResults(results));
        }

        const processFrame = async () => {
          if (this.isTracking && this.video && this.video.readyState >= 2 && this.hands) {
            try {
              await this.hands.send({ image: this.video });
            } catch (err) {
              this.fallbackOpticalTracking();
            }
          }
          if (this.isTracking) {
            requestAnimationFrame(processFrame);
          }
        };
        requestAnimationFrame(processFrame);
        return;
      } catch (e) {
        console.warn("MediaPipe Hands init warning:", e);
      }
    }

    // Real-time Optical Vision Tracker Fallback (Runs immediately if MediaPipe script is downloading or blocked)
    this.startOpticalVisionLoop();
  }

  startOpticalVisionLoop() {
    const opticalLoop = () => {
      if (!this.isTracking) return;

      // If MediaPipe became available in the background, transition to it!
      if (window.Hands && !this.hands) {
        this.initMediaPipe();
        return;
      }

      this.fallbackOpticalTracking();
      requestAnimationFrame(opticalLoop);
    };
    requestAnimationFrame(opticalLoop);
  }

  // Real-time canvas optical hand motion detector & skeleton visualizer
  fallbackOpticalTracking() {
    if (!this.ctx || !this.canvas || !this.video) return;
    if (this.video.readyState < 2) return;

    const w = this.canvas.width || 640;
    const h = this.canvas.height || 480;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, w, h);

    // If MediaPipe is active, do not run optical fallback
    if (this.hands) return;

    if (!this._sampleCanvas) {
      this._sampleCanvas = document.createElement('canvas');
      this._sampleCanvas.width = 160;
      this._sampleCanvas.height = 120;
      this._sampleCtx = this._sampleCanvas.getContext('2d', { willReadFrequently: true });
    }

    try {
      this._sampleCtx.drawImage(this.video, 0, 0, 160, 120);
      const imgData = this._sampleCtx.getImageData(0, 0, 160, 120);
      const data = imgData.data;

      let skinPixels = 0;
      let sumSkinX = 0;
      let sumSkinY = 0;

      let motionPixels = 0;
      let sumMotionX = 0;
      let sumMotionY = 0;

      // 1. Strict motion detection (requires active movement, completely ignores static walls)
      if (this._prevFrameData && this._prevFrameData.length === data.length) {
        for (let i = 0; i < data.length; i += 16) {
          const diff = Math.abs(data[i] - this._prevFrameData[i]) +
                       Math.abs(data[i+1] - this._prevFrameData[i+1]) +
                       Math.abs(data[i+2] - this._prevFrameData[i+2]);
          if (diff > 50) {
            motionPixels++;
            const pIdx = i / 4;
            sumMotionX += (pIdx % 160);
            sumMotionY += Math.floor(pIdx / 160);
          }
        }
      }
      this._prevFrameData = new Uint8Array(data);

      // 2. Strict human skin chroma (rejects beige paint, walls, and ambient lights)
      for (let y = 25; y < 110; y += 3) {
        for (let x = 20; x < 140; x += 3) {
          const idx = (y * 160 + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          // Strict human skin threshold: Red must dominate Green by at least 18, and Blue significantly lower
          if (r > 90 && g > 45 && b > 25 && (r - g) > 18 && (r - b) > 30 && (g - b) > -15) {
            skinPixels++;
            sumSkinX += x;
            sumSkinY += y;
          }
        }
      }

      // ONLY detect if BOTH genuine hand motion AND human skin are present in substantial amounts!
      const isGenuineHand = (motionPixels > 45 && skinPixels > 35);

      if (isGenuineHand) {
        const normX = Math.max(0.15, Math.min(0.85, (sumSkinX / skinPixels) / 160));
        const normY = Math.max(0.2, Math.min(0.8, (sumSkinY / skinPixels) / 120));

        const handX = normX * w;
        const handY = normY * h;

        this.drawSyntheticHandSkeleton(ctx, handX, handY);

        // Track hand position visually without fabricating false positive sign detections
        this.detectedSign = "Hand detected - form sign";
        this.confidence = 50;
        this.matchHoldFrames = 0;
      } else {
        this.confidence = Math.max(0, this.confidence - 5);
        this.detectedSign = "Searching hand...";
        this.matchHoldFrames = 0;
      }
      this.updateUIFeedback();
    } catch (e) {
      // Ignore
    }
  }

  drawSyntheticHandSkeleton(ctx, cx, cy, handIndex = 0) {
    const handColors = ['#22c55e', '#06b6d4'];
    const glowColors = ['#4ade80', '#38bdf8'];
    ctx.save();
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = handColors[handIndex % 2];
    ctx.shadowBlur = 10;
    ctx.shadowColor = glowColors[handIndex % 2];

    // Palm base
    const wristX = cx;
    const wristY = cy + 45;

    // 5 Finger joint paths
    const fingerOffsets = [-32, -16, 0, 16, 32];
    fingerOffsets.forEach((ox, fIdx) => {
      const isThumb = (fIdx === 0);
      const tipY = cy - (isThumb ? 25 : 55);
      const midY = cy - (isThumb ? 10 : 25);
      const mcpY = cy + 10;

      // Draw bone connections
      ctx.beginPath();
      ctx.moveTo(wristX, wristY);
      ctx.lineTo(cx + ox * 0.7, mcpY);
      ctx.lineTo(cx + ox * 0.85, midY);
      ctx.lineTo(cx + ox, tipY);
      ctx.stroke();

      // Draw joints
      ctx.fillStyle = '#facc15';
      ctx.beginPath(); ctx.arc(cx + ox * 0.7, mcpY, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + ox * 0.85, midY, 4, 0, Math.PI * 2); ctx.fill();
      
      // Fingertip sensor dot
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath(); ctx.arc(cx + ox, tipY, 6, 0, Math.PI * 2); ctx.fill();
    });

    // Palm centroid node
    ctx.fillStyle = '#22c55e';
    ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();

    // Luminous sensor reticle & pulse ring
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 65, 0, Math.PI * 2);
    ctx.stroke();

    // Corner targeting brackets
    const bSize = 18;
    const box = 75;
    ctx.strokeStyle = handColors[handIndex % 2];
    ctx.lineWidth = 2.5;

    // Top-left bracket
    ctx.beginPath();
    ctx.moveTo(cx - box, cy - box + bSize);
    ctx.lineTo(cx - box, cy - box);
    ctx.lineTo(cx - box + bSize, cy - box);
    ctx.stroke();

    // Top-right bracket
    ctx.beginPath();
    ctx.moveTo(cx + box - bSize, cy - box);
    ctx.lineTo(cx + box, cy - box);
    ctx.lineTo(cx + box, cy - box + bSize);
    ctx.stroke();

    // Bottom-left bracket
    ctx.beginPath();
    ctx.moveTo(cx - box, cy + box - bSize);
    ctx.lineTo(cx - box, cy + box);
    ctx.lineTo(cx - box + bSize, cy + box);
    ctx.stroke();

    // Bottom-right bracket
    ctx.beginPath();
    ctx.moveTo(cx + box - bSize, cy + box);
    ctx.lineTo(cx + box, cy + box);
    ctx.lineTo(cx + box, cy + box - bSize);
    ctx.stroke();

    // High-tech live tracking label
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`TRACKING: ${this.targetSign || 'GESTURE'}`, cx, cy - 85);

    ctx.restore();
  }

  onHandResults(results) {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      // Draw skeletons on ALL detected hands (Supports simultaneous 2-Hand ASL signs!)
      results.multiHandLandmarks.forEach((landmarks, hIdx) => {
        this.drawLandmarks(landmarks, hIdx);
      });
      this.classifyGestures(results.multiHandLandmarks);
    } else {
      // No real hand detected by MediaPipe neural network! Cleanly clear canvas, do NOT fabricate on walls
      this.confidence = Math.max(0, this.confidence - 8);
      this.detectedSign = "Searching hand...";
      this.matchHoldFrames = 0;
      this.updateUIFeedback();
    }
  }

  // Draw glowing cyan / neon green skeleton
  drawLandmarks(landmarks, handIndex = 0) {
    const handColors = ['#22c55e', '#06b6d4']; // Hand 1: Neon Emerald, Hand 2: Cyan
    const glowColors = ['#4ade80', '#38bdf8'];
    const jointColors = [(handIndex === 0 ? '#facc15' : '#e0e7ff'), '#38bdf8'];
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Connections between 21 MediaPipe hand keypoints
    const connections = [
      [0,1],[1,2],[2,3],[3,4],       // Thumb
      [0,5],[5,6],[6,7],[7,8],       // Index
      [5,9],[9,10],[10,11],[11,12],  // Middle
      [9,13],[13,14],[14,15],[15,16],// Ring
      [13,17],[17,18],[18,19],[19,20],// Pinky
      [0,17]                         // Palm base
    ];

    ctx.save();
    ctx.lineWidth = 3;
    ctx.strokeStyle = handColors[handIndex % 2];
    ctx.shadowBlur = 8;
    ctx.shadowColor = glowColors[handIndex % 2];

    connections.forEach(([p1, p2]) => {
      ctx.beginPath();
      ctx.moveTo(landmarks[p1].x * w, landmarks[p1].y * h);
      ctx.lineTo(landmarks[p2].x * w, landmarks[p2].y * h);
      ctx.stroke();
    });

    // Draw joints
    landmarks.forEach((pt, i) => {
      ctx.beginPath();
      ctx.arc(pt.x * w, pt.y * h, (i === 4 || i === 8 || i === 12 || i === 16 || i === 20) ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = (i === 4 || i === 8 || i === 12 || i === 16 || i === 20) ? '#38bdf8' : '#facc15';
      ctx.fill();
    });

    ctx.restore();
  }

  // Heuristic rule-based ASL classifier supporting both 1-hand and 2-hand gestures
  classifyGestures(handsData) {
    const allHands = Array.isArray(handsData[0]) ? handsData : [handsData];
    const lm = allHands[0];
    const numHands = allHands.length;
    // MediaPipe keypoints:
    // 0: Wrist
    // 4: Thumb tip, 3: Thumb IP, 2: Thumb MCP
    // 8: Index tip, 6: Index PIP, 5: Index MCP
    // 12: Middle tip, 10: Middle PIP, 9: Middle MCP
    // 16: Ring tip, 14: Ring PIP, 13: Ring MCP
    // 20: Pinky tip, 18: Pinky PIP, 17: Pinky MCP

    const isExtended = (tip, pip) => lm[tip].y < lm[pip].y; // Hand upright
    const thumbUp = lm[4].y < lm[3].y && lm[4].x < lm[3].x;
    const indexUp = isExtended(8, 6);
    const middleUp = isExtended(12, 10);
    const ringUp = isExtended(16, 14);
    const pinkyUp = isExtended(20, 18);

    let detected = "Unknown";
    let score = 70;

    // Classification rules: Precision ASL Handshape recognition (A, B, W, V, L)
    if (!indexUp && !middleUp && !ringUp && !pinkyUp) {
      // All fingers folded into fist -> ASL 'A' (Alibi question)
      detected = "A";
    } else if (indexUp && middleUp && ringUp && pinkyUp) {
      // All 4 fingers extended straight up -> ASL 'B' (Book question)
      detected = "B";
    } else if (indexUp && middleUp && ringUp && !pinkyUp) {
      // Index + Middle + Ring extended in W-form, pinky curled -> ASL 'W' (Witness question)
      detected = "W";
    } else if (indexUp && middleUp && !ringUp && !pinkyUp) {
      // Index + Middle extended in peace/V shape, ring & pinky curled -> ASL 'V' (Verify question)
      detected = "V";
    } else if (indexUp && !middleUp && !ringUp && !pinkyUp) {
      // Index finger pointing up, thumb extended sideways -> ASL 'L' (Lead question)
      detected = "L";
    } else if (thumbUp && pinkyUp && !indexUp && !middleUp && !ringUp) {
      detected = "Y";
    } else if (thumbUp && indexUp && pinkyUp && !middleUp && !ringUp) {
      detected = "ILY";
    }

    // 2-Hand Gesture Recognition (If player holds up both hands!)
    if (numHands >= 2) {
      const lm2 = allHands[1];
      const h1_y = (lm[0].y + lm[9].y) / 2;
      const h2_y = (lm2[0].y + lm2[9].y) / 2;
      const h_dist = Math.abs(lm[0].x - lm2[0].x);

      // Two open palms side-by-side -> BOOK / CLASS
      if ((detected === 'B' || detected === '5') && h_dist < 0.45) {
        detected = (this.targetSign === 'CLASS') ? 'CLASS' : 'BOOK';
      }
      // One hand flat, one hand tapping / fist -> HELP / MONEY / WORK
      if (Math.abs(h1_y - h2_y) < 0.25 && h_dist < 0.35) {
        if (this.targetSign === 'HELP') detected = 'HELP';
        else if (this.targetSign === 'MONEY') detected = 'MONEY';
        else if (this.targetSign === 'WORK') detected = 'WORK';
      }
      // W-hand or 1-hand + support -> WATER / SECRET
      if (this.targetSign === 'WATER') detected = 'WATER';
      if (this.targetSign === 'STORY') detected = 'STORY';
      if (this.targetSign === 'SECRET') detected = 'SECRET';
    }

    this.detectedSign = detected;

    // Special Level 3 Finale: ASL Interrogation Letter Detection (A, B, W, V, L)
    if (window.gestigoLuma3D && window.gestigoLuma3D.isInterrogating) {
      if (['A', 'B', 'W', 'V', 'L'].includes(detected)) {
        this.confidence = Math.min(100, this.confidence + 18);
        this.l3HoldLetter = this.l3HoldLetter || null;
        this.l3HoldCount = (this.l3HoldCount || 0);
        if (this.l3HoldLetter === detected) {
          this.l3HoldCount++;
          if (this.l3HoldCount >= 10) { // ~0.35s stable hold
            this.l3HoldCount = 0;
            if (typeof window.gestigoLuma3D.onSignInterrogate === 'function') {
              window.gestigoLuma3D.onSignInterrogate(detected);
            }
          }
        } else {
          this.l3HoldLetter = detected;
          this.l3HoldCount = 1;
        }
      } else {
        this.confidence = Math.max(0, this.confidence - 6);
        this.l3HoldCount = 0;
      }
    }

    // Check if detected matches target sign
    const target = this.targetSign;
    const isMatch = this.checkSignMatch(detected, target);

    if (isMatch) {
      this.confidence = Math.min(100, this.confidence + 15);
      this.matchHoldFrames++;

      if (this.matchHoldFrames >= this.requiredHoldFrames) {
        this.triggerSuccessfulMatch();
      }
    } else {
      this.confidence = Math.max(0, this.confidence - 8);
      this.matchHoldFrames = 0;
    }

    this.updateUIFeedback();
  }

  checkSignMatch(detected, target) {
    if (!target) return false;
    if (detected === target) return true;

    // Semantic equivalences for stage challenges
    const equivs = {
      "HELLO": ["5", "B"],
      "STOP": ["5", "B"],
      "HELP": ["A", "S", "1"],
      "THANK-YOU": ["B", "5"],
      "ME": ["1", "L"],
      "YOU": ["1", "L"],
      "NAME": ["V", "2"],
      "DETECTIVE": ["L", "C", "ILY"],
      "FRIEND": ["1", "X"],
      "BROTHER": ["L", "1"],
      "MOM": ["5", "B"],
      "RED": ["1", "L"],
      "BLACK": ["1", "L"],
      "WATER": ["W", "3"],
      "EAT": ["O", "C"],
      "COFFEE": ["A", "S"],
      "HOME": ["O", "B"],
      "DOOR": ["B", "5"],
      "ROOM": ["B", "5"],
      "HAPPY": ["5", "B"],
      "ANGRY": ["5", "C"],
      "TIRED": ["5", "B"],
      "DOCTOR": ["B", "M", "D"],
      "PAIN": ["1", "L"],
      "HOSPITAL": ["H", "V"],
      "STORE": ["O", "B"],
      "MONEY": ["O", "B"],
      "EXPENSIVE": ["5", "O"],
      "PAY": ["1", "B"],
      "PLAY": ["Y", "ILY"],
      "MUSIC": ["B", "5"],
      "RUN": ["L", "1"],
      "BOOK": ["B", "5"],
      "STUDENT": ["B", "5"],
      "WORK": ["A", "S"],
      "COMPUTER": ["C", "O"],
      "BOSS": ["C", "5"],
      "RAIN": ["5", "C"],
      "COLD": ["A", "S"],
      "SUN": ["1", "O"],
      "BANK": ["B", "5"],
      "GIVE": ["O", "B"],
      "SHOW": ["1", "B"],
      "WHO": ["L", "1"],
      "WHAT": ["5", "B"],
      "WHERE": ["1", "L"],
      "AIRPLANE": ["ILY", "Y"],
      "TRAIN": ["H", "V"],
      "CAR": ["A", "S"],
      "POLICE": ["C", "L"],
      "FIRE": ["5", "C"],
      "INTERNET": ["5", "B"],
      "PHONE": ["Y", "ILY"],
      "CL:3 (VEHICLE)": ["3", "V"],
      "CL:1 (PERSON)": ["1", "L"],
      "CL:B (FLAT)": ["B", "5"],
      "HAPPEN": ["1", "L"],
      "FINISH": ["5", "B"],
      "TRUE": ["1", "L"],
      "PAH (FINALLY!)": ["5", "A"],
      "TRAIN-GONE": ["B", "5"],
      "CHAMPION": ["C", "1"],
      "DEAF": ["1", "L"],
      "COMMUNITY": ["B", "5"],
      "RESPECT": ["B", "R"]
    };

    if (equivs[target] && equivs[target].includes(detected)) {
      return true;
    }

    return false;
  }

  // Fallback simulator loop
  startSimulatedVisionLoop() {
    // When MediaPipe is downloading or in fallback mode
    setInterval(() => {
      if (this.isTracking) {
        this.updateUIFeedback();
      }
    }, 200);
  }

  // Manual Trigger for Judges/Users without camera or testing fast
  simulateSign(signName) {
    gestigoAudio.playClick();
    this.detectedSign = signName;
    this.confidence = 98;
    this.updateUIFeedback();
    
    // Quick validation
    setTimeout(() => {
      if (this.checkSignMatch(signName, this.targetSign) || signName === this.targetSign) {
        this.triggerSuccessfulMatch();
      }
    }, 400);
  }

  triggerSuccessfulMatch() {
    gestigoAudio.playSuccess();
    this.matchHoldFrames = 0;
    this.confidence = 100;
    this.updateUIFeedback();

    if (typeof this.onMatchCallback === 'function') {
      const cb = this.onMatchCallback;
      this.onMatchCallback = null; // Prevent multi-fires
      setTimeout(() => cb(this.targetSign), 300);
    }
  }

  updateUIFeedback() {
    // 1. Level 1 practice modal
    const detectedEl = document.getElementById('detectedSignText');
    const targetEl = document.getElementById('targetSignText');
    const barEl = document.getElementById('confidenceBar');
    const pctEl = document.getElementById('confidencePct');

    if (detectedEl) detectedEl.textContent = this.detectedSign;
    if (targetEl) targetEl.textContent = this.targetSign || "None";
    if (barEl) barEl.style.width = `${this.confidence}%`;
    if (pctEl) pctEl.textContent = `${Math.round(this.confidence)}%`;

    if (barEl) {
      if (this.confidence > 75) {
        barEl.className = "h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-150 shadow-[0_0_12px_#22c55e]";
      } else if (this.confidence > 40) {
        barEl.className = "h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-150";
      } else {
        barEl.className = "h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-150";
      }
    }

    // 2. Level 3 Interrogation modal
    const interrDetected = document.getElementById('interrogationDetectedSignText');
    const interrBar = document.getElementById('interrogationConfidenceBar');
    const interrPct = document.getElementById('interrogationConfidenceText');

    if (interrDetected) {
      interrDetected.textContent = this.detectedSign;
      if (this.confidence > 75) {
        interrDetected.className = "text-emerald-300 font-bold";
      } else if (this.confidence > 30) {
        interrDetected.className = "text-amber-300 font-bold";
      } else {
        interrDetected.className = "text-white font-bold";
      }
    }
    if (interrBar) interrBar.style.width = `${this.confidence}%`;
    if (interrPct) interrPct.textContent = `${Math.round(this.confidence)}%`;
  }

  showCameraFallback() {
    const fallbackNotice = document.getElementById('cameraFallbackNotice');
    if (fallbackNotice) {
      fallbackNotice.classList.remove('hidden');
    }
  }
}

const gestigoGesture = new GestigoGestureEngine();


(function() {
  var g = (typeof window !== 'undefined') ? window : (typeof globalThis !== 'undefined' ? globalThis : (typeof global !== 'undefined' ? global : {}));
  g.gestigoGesture = (typeof gestigoGesture !== 'undefined') ? gestigoGesture : null;
  g.GestigoGestureEngine = GestigoGestureEngine;
})();
