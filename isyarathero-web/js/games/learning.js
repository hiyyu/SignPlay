/**
 * IsyaratHero / SignBridge - Structured Learning Mode (Stages & Levels)
 * Beginner -> Intermediate -> Advanced with real reference illustrations.
 */

import { ASL_STAGES, ASL_SIGNS, getSign } from "../config.js";
import { i18n } from "../i18n.js";
import { sound } from "../audio.js";

export class LearningMode {
  constructor() {
    this.currentStage = "beginner";
    this.activeSignCode = "HELLO";
    this.holdDurationMs = 800;
    this.holdStartTime = null;
    this.currentHoldProgress = 0;
    this.isMasteredCelebration = false;

    // Load persisted mastered signs
    const saved = localStorage.getItem("signbridge_mastered_asl");
    this.masteredSigns = saved ? new Set(JSON.parse(saved)) : new Set();
  }

  saveMastered() {
    localStorage.setItem("signbridge_mastered_asl", JSON.stringify([...this.masteredSigns]));
  }

  setStage(stageKey) {
    if (!ASL_STAGES[stageKey.toUpperCase()]) return;
    this.currentStage = stageKey.toLowerCase();
    const stageInfo = ASL_STAGES[stageKey.toUpperCase()];
    if (stageInfo && stageInfo.signs.length > 0) {
      this.activeSignCode = stageInfo.signs[0];
    }
    this.holdStartTime = null;
    this.currentHoldProgress = 0;
    this.render();
  }

  selectSign(code) {
    if (!ASL_SIGNS[code]) return;
    this.activeSignCode = code;
    this.holdStartTime = null;
    this.currentHoldProgress = 0;
    this.isMasteredCelebration = false;
    this.renderActiveCard();
    this.renderSignList();
  }

  nextSign() {
    const stageInfo = ASL_STAGES[this.currentStage.toUpperCase()];
    if (!stageInfo) return;
    const idx = stageInfo.signs.indexOf(this.activeSignCode);
    if (idx !== -1 && idx < stageInfo.signs.length - 1) {
      this.selectSign(stageInfo.signs[idx + 1]);
    } else {
      // If at end of stage, check next stage
      if (this.currentStage === "beginner") this.setStage("intermediate");
      else if (this.currentStage === "intermediate") this.setStage("advanced");
    }
  }

  prevSign() {
    const stageInfo = ASL_STAGES[this.currentStage.toUpperCase()];
    if (!stageInfo) return;
    const idx = stageInfo.signs.indexOf(this.activeSignCode);
    if (idx > 0) {
      this.selectSign(stageInfo.signs[idx - 1]);
    }
  }

  update(detectedGesture, confidence) {
    if (!this.activeSignCode) return;

    const isMatch = detectedGesture === this.activeSignCode && confidence > 0.7;

    if (isMatch) {
      if (!this.holdStartTime) {
        this.holdStartTime = performance.now();
      }
      const elapsed = performance.now() - this.holdStartTime;
      this.currentHoldProgress = Math.min(1.0, elapsed / this.holdDurationMs);

      if (this.currentHoldProgress >= 1.0 && !this.isMasteredCelebration) {
        this.onSignMastered();
      }
    } else {
      this.holdStartTime = null;
      this.currentHoldProgress = 0;
    }

    const holdBar = document.getElementById("learn-hold-bar");
    if (holdBar) {
      holdBar.style.width = `${Math.round(this.currentHoldProgress * 100)}%`;
      if (this.currentHoldProgress >= 1.0) {
        holdBar.classList.replace("bg-cyan-400", "bg-emerald-400");
      } else {
        holdBar.classList.replace("bg-emerald-400", "bg-cyan-400");
      }
    }
  }

  onSignMastered() {
    this.isMasteredCelebration = true;
    this.masteredSigns.add(this.activeSignCode);
    this.saveMastered();

    sound.playSuccess();

    // Trigger UI pulse & celebration badge
    const badge = document.getElementById("learn-mastered-badge");
    if (badge) {
      badge.classList.remove("hidden");
    }

    this.renderSignList();
    this.renderStageTabs();

    // Auto advance after 1.4s
    setTimeout(() => {
      this.isMasteredCelebration = false;
      if (badge) badge.classList.add("hidden");
      this.nextSign();
    }, 1400);
  }

  render() {
    this.renderStageTabs();
    this.renderSignList();
    this.renderActiveCard();
  }

  renderStageTabs() {
    const container = document.getElementById("learn-stage-tabs");
    if (!container) return;

    const stages = [
      { key: "beginner", info: ASL_STAGES.BEGINNER },
      { key: "intermediate", info: ASL_STAGES.INTERMEDIATE },
      { key: "advanced", info: ASL_STAGES.ADVANCED }
    ];

    const isEn = i18n.lang === "en";

    container.innerHTML = stages.map(s => {
      const active = s.key === this.currentStage;
      const count = s.info.signs.length;
      const masteredCount = s.info.signs.filter(c => this.masteredSigns.has(c)).length;
      const allDone = masteredCount === count;

      const title = isEn ? s.info.title_en : s.info.title_ms;

      return `
        <button data-stage="${s.key}" class="learn-stage-btn flex-1 py-2 px-3 rounded-lg text-xs font-medium border transition-all text-left flex flex-col justify-between ${
          active 
            ? "bg-zinc-800 text-white border-cyan-500/50 shadow-sm" 
            : "bg-zinc-900/60 text-zinc-400 border-white/[0.06] hover:text-white"
        }">
          <div class="flex items-center justify-between w-full">
            <span class="font-bold text-[11px] truncate">${title.split(":")[1] || title}</span>
            ${allDone ? '<span class="text-emerald-400 text-xs">✓</span>' : ''}
          </div>
          <div class="flex items-center justify-between text-[10px] text-zinc-400 mt-1 font-mono-metrics">
            <span>${masteredCount}/${count}</span>
            <div class="w-10 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div class="h-full bg-cyan-400" style="width: ${(masteredCount/count)*100}%"></div>
            </div>
          </div>
        </button>
      `;
    }).join("");

    container.querySelectorAll(".learn-stage-btn").forEach(btn => {
      btn.addEventListener("click", () => this.setStage(btn.dataset.stage));
    });
  }

  renderSignList() {
    const container = document.getElementById("learn-signs-grid");
    if (!container) return;

    const stageInfo = ASL_STAGES[this.currentStage.toUpperCase()];
    if (!stageInfo) return;

    container.innerHTML = stageInfo.signs.map(code => {
      const sign = getSign(code);
      if (!sign) return "";
      const isSelected = code === this.activeSignCode;
      const isMastered = this.masteredSigns.has(code);

      return `
        <button data-sign="${code}" class="learn-sign-pill flex items-center gap-2 p-1.5 rounded-lg border transition-all text-left ${
          isSelected 
            ? "bg-cyan-950/40 border-cyan-500/60 text-white ring-1 ring-cyan-500/30" 
            : "bg-zinc-900/80 border-white/[0.06] text-zinc-300 hover:border-white/20"
        }">
          <img src="${sign.image}" alt="${sign.label}" class="w-8 h-8 rounded object-cover bg-white/5 border border-white/10" />
          <div class="flex-1 min-w-0">
            <div class="text-[11px] font-semibold truncate">${sign.label}</div>
            <div class="text-[9px] text-zinc-400 font-mono">${sign.code}</div>
          </div>
          ${isMastered ? '<span class="text-emerald-400 text-xs pr-1 font-bold">✓</span>' : ''}
        </button>
      `;
    }).join("");

    container.querySelectorAll(".learn-sign-pill").forEach(btn => {
      btn.addEventListener("click", () => this.selectSign(btn.dataset.sign));
    });
  }

  renderActiveCard() {
    const sign = getSign(this.activeSignCode);
    if (!sign) return;

    const imgEl = document.getElementById("learn-target-img");
    const nameEl = document.getElementById("learn-target-name");
    const catEl = document.getElementById("learn-target-category");
    const descEl = document.getElementById("learn-target-desc");
    const tipEl = document.getElementById("learn-target-tip");
    const masteredBadge = document.getElementById("learn-mastered-badge");

    if (imgEl) imgEl.src = sign.image;
    if (nameEl) nameEl.textContent = sign.label;
    if (catEl) catEl.textContent = sign.category;
    if (descEl) descEl.textContent = sign.description;
    if (tipEl) tipEl.textContent = sign.tip;

    if (masteredBadge) {
      if (this.masteredSigns.has(this.activeSignCode)) {
        masteredBadge.classList.remove("hidden");
      } else {
        masteredBadge.classList.add("hidden");
      }
    }
  }
}
