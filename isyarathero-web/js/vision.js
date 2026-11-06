/**
 * IsyaratHero / SignBridge - Vision Engine via MediaPipe Tasks Vision (WebAssembly)
 * Fast local loading with robust timeout handling and CPU-optimized instant startup.
 */

import { FilesetResolver, HandLandmarker } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";

export class VisionEngine {
  constructor(videoElement, canvasElement) {
    this.video = videoElement;
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext("2d");
    this.handLandmarker = null;
    this.runningMode = "VIDEO";
    this.isReady = false;
    this.lastVideoTime = -1;

    // Bone connections for 21 hand landmarks
    this.connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
      [0, 5], [5, 6], [6, 7], [7, 8],       // Index
      [0, 9], [9, 10], [10, 11], [11, 12],  // Middle
      [0, 13], [13, 14], [14, 15], [15, 16],// Ring
      [0, 17], [17, 18], [18, 19], [19, 20],// Pinky
      [5, 9], [9, 13], [13, 17]             // Palm base
    ];
  }

  async startCamera(onProgress) {
    if (onProgress) onProgress("Requesting camera access... Please click 'Allow' if prompted.");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Webcam API is unavailable. Please ensure you are accessing via HTTPS or http://localhost.");
    }

    try {
      // Race getUserMedia against a 6-second timeout so it never hangs silently
      const streamPromise = navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: false
      });

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Camera request timed out. Please check the URL bar (top-left) to see if camera permission is waiting or blocked."));
        }, 6000);
      });

      const stream = await Promise.race([streamPromise, timeoutPromise]);
      this.video.srcObject = stream;

      // Ensure video is playing and ready
      await new Promise((resolve) => {
        if (this.video.readyState >= 2 && this.video.videoWidth > 0) {
          resolve();
        } else {
          const timeout = setTimeout(() => {
            console.log("[VisionEngine] Fast camera ready timeout fallback...");
            resolve();
          }, 1000);

          this.video.onloadeddata = () => {
            clearTimeout(timeout);
            resolve();
          };
        }
      });

      try {
        await this.video.play();
      } catch (e) {
        console.warn("[VisionEngine] Video play notice:", e);
      }

      this.canvas.width = this.video.videoWidth || 1280;
      this.canvas.height = this.video.videoHeight || 720;
      this.isReady = true;
      console.log("[VisionEngine] Camera connected successfully!", this.canvas.width, this.canvas.height);
      return true;

    } catch (err) {
      console.error("[VisionEngine] Camera access error:", err);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        throw new Error("Camera permission denied. Please click the lock 🔒 or camera 🎥 icon in the address bar to allow camera access, then reload.");
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        throw new Error("No physical webcam device detected on your system.");
      } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
        throw new Error("Camera is currently in use by another application (Zoom, Teams, etc.). Please close other camera apps.");
      } else {
        throw new Error(err.message || "Failed to initialize webcam.");
      }
    }
  }

  async initialize(onProgress) {
    if (onProgress) onProgress("Loading WebAssembly neural model...");

    let vision = null;
    const origin = window.location.origin;

    // 1. Try local WASM directory first
    try {
      console.log("[VisionEngine] Loading WASM from:", `${origin}/wasm`);
      vision = await FilesetResolver.forVisionTasks(`${origin}/wasm`);
      console.log("[VisionEngine] Local WASM loaded successfully!");
    } catch (e) {
      console.warn("[VisionEngine] Local WASM failed, falling back to CDN...", e);
      if (onProgress) onProgress("Loading WASM via CDN...");
      vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
      );
    }

    if (onProgress) onProgress("Initializing hand landmarker pipeline...");

    // 2. Load model with CPU delegate for instant startup (no WebGL shader compilation lag)
    const modelUrl = `${origin}/models/hand_landmarker.task`;
    try {
      this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: modelUrl,
          delegate: "CPU"
        },
        runningMode: this.runningMode,
        numHands: 2,
        minHandDetectionConfidence: 0.6,
        minHandPresenceConfidence: 0.6,
        minTrackingConfidence: 0.5
      });
      console.log("[VisionEngine] HandLandmarker loaded with CPU delegate!");
    } catch (cpuErr) {
      console.warn("[VisionEngine] Local model failed, attempting CDN model...", cpuErr);
      if (onProgress) onProgress("Loading CDN model fallback...");
      this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "CPU"
        },
        runningMode: this.runningMode,
        numHands: 2
      });
      console.log("[VisionEngine] HandLandmarker loaded via CDN!");
    }

    return true;
  }

  processFrame() {
    if (!this.isReady || !this.handLandmarker) return null;

    const w = this.canvas.width;
    const h = this.canvas.height;
    this.ctx.clearRect(0, 0, w, h);

    let results = null;
    if (this.video.currentTime !== this.lastVideoTime) {
      this.lastVideoTime = this.video.currentTime;
      try {
        results = this.handLandmarker.detectForVideo(this.video, performance.now());
      } catch (err) {
        return null;
      }
    }

    const detectedHands = [];
    if (results && results.landmarks) {
      for (let i = 0; i < results.landmarks.length; i++) {
        const landmarks = results.landmarks[i];
        const handedness = results.handednesses[i]?.[0]?.categoryName || "Right";
        const flippedHandedness = handedness === "Right" ? "Left" : "Right";

        detectedHands.push({
          landmarks: landmarks,
          handedness: flippedHandedness
        });

        this.drawStyledSkeleton(landmarks, w, h);
      }
    }

    return detectedHands;
  }

  drawStyledSkeleton(landmarks, w, h) {
    // 1. Sleek connecting bones
    this.ctx.save();
    this.ctx.strokeStyle = "rgba(56, 189, 248, 0.85)";
    this.ctx.lineWidth = 2.5;
    this.ctx.shadowColor = "rgba(56, 189, 248, 0.4)";
    this.ctx.shadowBlur = 6;

    for (const [p1, p2] of this.connections) {
      const pt1 = landmarks[p1];
      const pt2 = landmarks[p2];

      this.ctx.beginPath();
      this.ctx.moveTo((1 - pt1.x) * w, pt1.y * h);
      this.ctx.lineTo((1 - pt2.x) * w, pt2.y * h);
      this.ctx.stroke();
    }
    this.ctx.restore();

    // 2. Refined Joint Nodes
    for (let i = 0; i < landmarks.length; i++) {
      const pt = landmarks[i];
      const isFingertip = [4, 8, 12, 16, 20].includes(i);
      const isWrist = i === 0;

      this.ctx.save();
      this.ctx.fillStyle = isFingertip ? "#10B981" : (isWrist ? "#38BDF8" : "#94A3B8");
      this.ctx.beginPath();
      this.ctx.arc((1 - pt.x) * w, pt.y * h, isFingertip ? 5 : 3.5, 0, 2 * Math.PI);
      this.ctx.fill();

      // Inner crisp white core
      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.beginPath();
      this.ctx.arc((1 - pt.x) * w, pt.y * h, 1.5, 0, 2 * Math.PI);
      this.ctx.fill();

      this.ctx.restore();
    }
  }
}
