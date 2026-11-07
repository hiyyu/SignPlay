/**
 * IsyaratHero / SignBridge - Master Application Controller
 * High-performance browser ASL neural vision suite with Structured Learning & Mystery Gameplay.
 */

import { getSign, ASL_SIGNS } from "./config.js";
import { i18n } from "./i18n.js";
import { VisionEngine } from "./vision.js";
import { GestureDetector } from "./gestures.js";
import { LearningMode } from "./games/learning.js";
import { MysteryMode } from "./games/mystery.js";
import { TranslatorMode } from "./games/translator.js";
import { BIMBlitzGame } from "./games/blitz.js";

class App {
  constructor() {
    this.video = document.getElementById("webcam-video");
    this.canvas = document.getElementById("output-canvas");
    this.vision = new VisionEngine(this.video, this.canvas);
    this.gestureDetector = new GestureDetector();

    // Mode Controllers
    this.modeLearning = new LearningMode();
    this.modeMystery = new MysteryMode();
    this.modeTranslator = new TranslatorMode();
    this.modeBlitz = new BIMBlitzGame();

    this.currentMode = "home";
    this.lastFrameTime = performance.now();
    this.fps = 0;
    this.isRunning = false;
    this.isStarting = false;
  }

  updateLoadingStatus(msg, isError = false) {
    const statusText = document.getElementById("loading-status-text");
    if (statusText) {
      if (isError) {
        statusText.innerHTML = `<span class="text-rose-400 font-semibold">${msg}</span>`;
      } else {
        statusText.textContent = msg;
      }
    }
  }

  async startApp() {
    if (this.isStarting) return;
    this.isStarting = true;

    const startBtn = document.getElementById("btn-manual-start");
    if (startBtn) {
      startBtn.innerHTML = `<span>⏳</span> <span>Connecting camera...</span>`;
      startBtn.classList.add("opacity-50", "pointer-events-none");
    }

    try {
      this.updateLoadingStatus("Step 1/2: Connecting camera feed...");
      await this.vision.startCamera((msg) => this.updateLoadingStatus(msg));

      this.updateLoadingStatus("Step 2/2: Loading neural vision pipeline...");
      await this.vision.initialize((msg) => this.updateLoadingStatus(msg));

      this.updateLoadingStatus("Ready. Launching workspace...");
      setTimeout(() => {
        document.getElementById("loading-overlay")?.classList.add("hidden");
        this.setMode("home");
        if (!this.isRunning) {
          this.isRunning = true;
          this.loop();
        }
      }, 200);

    } catch (err) {
      this.isStarting = false;
      console.error("[App] Startup error:", err);
      this.updateLoadingStatus(err.message, true);

      if (startBtn) {
        startBtn.innerHTML = `<span>📹</span> <span>Retry Camera Connection</span>`;
        startBtn.classList.remove("opacity-50", "pointer-events-none");
      }

      const retryContainer = document.getElementById("loading-action-container");
      if (retryContainer) {
        let helpNote = document.getElementById("camera-help-note");
        if (!helpNote) {
          helpNote = document.createElement("div");
          helpNote.id = "camera-help-note";
          helpNote.className = "text-[11px] text-zinc-400 mt-4 max-w-sm bg-zinc-900/90 p-3 rounded-lg border border-white/10 text-left leading-relaxed";
          helpNote.innerHTML = `
            <div class="font-bold text-amber-400 mb-1">Camera Troubleshooting:</div>
            <ol class="list-decimal ml-4 space-y-1 text-zinc-300">
              <li>Look at the address bar next to <strong>https://localhost:8443</strong>.</li>
              <li>Click the <strong>tune/camera icon 🎥</strong> or <strong>lock icon 🔒</strong>.</li>
              <li>Set <strong>Camera</strong> permission to <strong>Allow</strong>.</li>
              <li>Ensure no other app (Zoom, Teams, Discord) is currently using your webcam.</li>
            </ol>
          `;
          retryContainer.appendChild(helpNote);
        }
      }
    }
  }

  init() {
    console.log("[App] Initializing SignBridge ASL Suite...");
    i18n.applyTranslations();
    this.bindEvents();
    this.renderVocabularyStrip();

    this.updateLoadingStatus("Click the button below to enable camera and begin...");
  }

  renderVocabularyStrip() {
    const strip = document.getElementById("active-vocabulary-strip");
    if (!strip) return;

    strip.innerHTML = Object.values(ASL_SIGNS).map(s => `
      <div class="inline-flex items-center gap-1.5 bg-zinc-900/90 border border-white/[0.08] px-2 py-1 rounded-md shrink-0 cursor-pointer hover:border-cyan-500/40 transition-colors" onclick="window.app.previewSign('${s.code}')">
        <img src="${s.image}" alt="${s.label_en}" class="w-5 h-5 rounded object-cover bg-white/5" />
        <span class="text-[11px] font-medium text-zinc-300 whitespace-nowrap">${s.code}</span>
      </div>
    `).join("");
  }

  previewSign(code) {
    this.setMode("learn");
    this.modeLearning.selectSign(code);
  }

  setMode(mode) {
    this.currentMode = mode;

    // Desktop top nav buttons
    document.querySelectorAll(".nav-btn").forEach(btn => {
      if (btn.dataset.mode === mode) {
        btn.classList.add("bg-zinc-800", "text-white", "border-zinc-700");
        btn.classList.remove("text-zinc-400", "border-transparent");
      } else {
        btn.classList.remove("bg-zinc-800", "text-white", "border-zinc-700");
        btn.classList.add("text-zinc-400", "border-transparent");
      }
    });

    // Mobile bottom bar tabs
    document.querySelectorAll(".mobile-tab-btn").forEach(btn => {
      if (btn.dataset.mode === mode) {
        btn.classList.add("text-cyan-400", "font-bold");
        btn.classList.remove("text-zinc-400");
      } else {
        btn.classList.remove("text-cyan-400", "font-bold");
        btn.classList.add("text-zinc-400");
      }
    });

    // Toggle panels
    document.querySelectorAll(".mode-panel").forEach(panel => panel.classList.add("hidden"));

    if (mode === "home") {
      document.getElementById("panel-home")?.classList.remove("hidden");
    } else if (mode === "learn") {
      document.getElementById("panel-learn")?.classList.remove("hidden");
      this.modeLearning.render();
    } else if (mode === "mystery") {
      document.getElementById("panel-mystery")?.classList.remove("hidden");
      this.modeMystery.start();
    } else if (mode === "translator") {
      document.getElementById("panel-translator")?.classList.remove("hidden");
      this.modeTranslator.renderSentence();
    } else if (mode === "blitz") {
      document.getElementById("panel-blitz")?.classList.remove("hidden");
      document.getElementById("blitz-summary-modal")?.classList.add("hidden");
      this.modeBlitz.start();
    }
  }

  bindEvents() {
    // Language buttons
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        i18n.setLanguage(btn.dataset.lang);
      });
    });

    window.addEventListener("languageChanged", () => {
      if (this.currentMode === "learn") this.modeLearning.render();
      if (this.currentMode === "mystery") this.modeMystery.render();
      if (this.currentMode === "translator") this.modeTranslator.renderSentence();
      if (this.currentMode === "blitz") this.modeBlitz.renderTargetCard();
    });

    // Navigation buttons (desktop & mobile)
    document.querySelectorAll(".nav-btn, .mobile-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => this.setMode(btn.dataset.mode));
    });

    // Quick launch cards on Home
    document.querySelectorAll(".quick-launch-card").forEach(card => {
      card.addEventListener("click", () => this.setMode(card.dataset.mode));
    });

    // Learning controls
    document.getElementById("btn-learn-prev")?.addEventListener("click", () => {
      this.modeLearning.prevSign();
    });
    document.getElementById("btn-learn-next")?.addEventListener("click", () => {
      this.modeLearning.nextSign();
    });

    // Mystery controls
    document.getElementById("btn-mystery-replay")?.addEventListener("click", () => {
      this.modeMystery.start();
    });

    // Translator actions
    document.getElementById("btn-speak-sentence")?.addEventListener("click", () => {
      this.modeTranslator.speakFullSentence();
    });
    document.getElementById("btn-clear-sentence")?.addEventListener("click", () => {
      this.modeTranslator.clearSentence();
    });
    document.getElementById("btn-listen-voice")?.addEventListener("click", () => {
      this.modeTranslator.startVoiceInput();
    });

    // Blitz actions
    document.getElementById("btn-restart-blitz")?.addEventListener("click", () => {
      document.getElementById("blitz-summary-modal")?.classList.add("hidden");
      this.modeBlitz.start();
    });
    document.getElementById("btn-retry-blitz-modal")?.addEventListener("click", () => {
      document.getElementById("blitz-summary-modal")?.classList.add("hidden");
      this.modeBlitz.start();
    });

    // Start button
    document.getElementById("btn-manual-start")?.addEventListener("click", () => {
      this.startApp();
    });

    // Keyboard shortcuts
    window.addEventListener("keydown", (e) => {
      const key = e.key.toLowerCase();
      if (key === "1") this.setMode("learn");
      else if (key === "2") this.setMode("mystery");
      else if (key === "3") this.setMode("translator");
      else if (key === "4") this.setMode("blitz");
      else if (key === "m") this.setMode("home");
      else if (key === " " && this.currentMode === "translator") {
        e.preventDefault();
        this.modeTranslator.speakFullSentence();
      } else if (key === "c" && this.currentMode === "translator") {
        this.modeTranslator.clearSentence();
      } else if (key === "r" && this.currentMode === "blitz") {
        this.modeBlitz.start();
      } else if (key === "n" && this.currentMode === "learn") {
        this.modeLearning.nextSign();
      } else if (key === "p" && this.currentMode === "learn") {
        this.modeLearning.prevSign();
      }
    });
  }

  loop() {
    requestAnimationFrame(() => this.loop());

    const now = performance.now();
    this.fps = Math.round(1000 / (now - this.lastFrameTime + 1e-6));
    this.lastFrameTime = now;
    const fpsEl = document.getElementById("fps-indicator");
    if (fpsEl) fpsEl.textContent = `${this.fps} FPS`;

    const detectedHands = this.vision.processFrame();

    let detectedGesture = null;
    let confidence = 0.0;

    if (detectedHands && detectedHands.length > 0) {
      const primaryHand = detectedHands[0];
      const res = this.gestureDetector.classify(primaryHand.landmarks, primaryHand.handedness);
      detectedGesture = res.gesture;
      confidence = res.confidence;
    }

    this.updateLiveIndicator(detectedGesture, confidence);

    if (this.currentMode === "learn") {
      this.modeLearning.update(detectedGesture, confidence);
    } else if (this.currentMode === "mystery") {
      this.modeMystery.update(detectedGesture, confidence);
    } else if (this.currentMode === "translator") {
      this.modeTranslator.update(detectedGesture, confidence);
      const prog = this.modeTranslator.getHoldProgress();
      const holdBar = document.getElementById("translator-hold-bar");
      if (holdBar) holdBar.style.width = `${prog * 100}%`;
    } else if (this.currentMode === "blitz") {
      this.modeBlitz.update(detectedGesture, confidence);
      const prog = this.modeBlitz.getHoldProgress();
      const holdBar = document.getElementById("blitz-hold-bar");
      if (holdBar) holdBar.style.width = `${prog * 100}%`;
      const timeEl = document.getElementById("blitz-time-left");
      if (timeEl) timeEl.textContent = `${this.modeBlitz.getTimeLeft()}s`;
    }
  }

  updateLiveIndicator(gesture, confidence) {
    const nameEl = document.getElementById("live-detected-name");
    const confBar = document.getElementById("live-confidence-bar");
    const thumbImg = document.getElementById("live-detected-thumb");

    if (!nameEl) return;

    if (gesture && confidence > 0.7) {
      const sign = getSign(gesture);
      if (sign) {
        nameEl.innerHTML = `<span>${sign.label}</span>`;
        nameEl.className = "text-xs font-semibold text-zinc-100";
        if (thumbImg) {
          thumbImg.src = sign.image;
          thumbImg.classList.remove("hidden");
        }
      }
      if (confBar) confBar.style.width = `${Math.round(confidence * 100)}%`;
    } else {
      nameEl.textContent = i18n.t("scanning_hands");
      nameEl.className = "text-xs font-medium text-zinc-500";
      if (thumbImg) thumbImg.classList.add("hidden");
      if (confBar) confBar.style.width = "0%";
    }
  }
}

function boot() {
  if (window.app) return;
  window.app = new App();
  window.app.init();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
