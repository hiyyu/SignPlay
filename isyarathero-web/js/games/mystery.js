/**
 * IsyaratHero / SignBridge - Mystery Detective Gameplay
 * "The Silent Detective: Sign Mystery"
 * Solve crime cases, unlock doors, and calm witnesses using ASL gestures.
 */

import { MYSTERY_CASE, getSign } from "../config.js";
import { i18n } from "../i18n.js";
import { sound } from "../audio.js";

export class MysteryMode {
  constructor() {
    this.caseData = MYSTERY_CASE;
    this.currentStepIdx = 0;
    this.holdDurationMs = 850;
    this.holdStartTime = null;
    this.currentHoldProgress = 0;
    this.isStepTransitioning = false;
    this.isCaseClosed = false;
    this.caseStartTime = null;
  }

  start() {
    this.currentStepIdx = 0;
    this.holdStartTime = null;
    this.currentHoldProgress = 0;
    this.isStepTransitioning = false;
    this.isCaseClosed = false;
    this.caseStartTime = performance.now();
    this.render();
  }

  get currentStep() {
    return this.caseData.steps[this.currentStepIdx];
  }

  update(detectedGesture, confidence) {
    if (this.isCaseClosed || this.isStepTransitioning) return;

    const step = this.currentStep;
    if (!step) return;

    const isMatch = detectedGesture === step.targetSign && confidence > 0.7;

    if (isMatch) {
      if (!this.holdStartTime) {
        this.holdStartTime = performance.now();
      }
      const elapsed = performance.now() - this.holdStartTime;
      this.currentHoldProgress = Math.min(1.0, elapsed / this.holdDurationMs);

      if (this.currentHoldProgress >= 1.0) {
        this.onClueSolved();
      }
    } else {
      this.holdStartTime = null;
      this.currentHoldProgress = 0;
    }

    const scanBar = document.getElementById("mystery-scan-bar");
    if (scanBar) {
      scanBar.style.width = `${Math.round(this.currentHoldProgress * 100)}%`;
      if (this.currentHoldProgress >= 1.0) {
        scanBar.classList.replace("bg-cyan-400", "bg-emerald-400");
      } else {
        scanBar.classList.replace("bg-emerald-400", "bg-cyan-400");
      }
    }
  }

  onClueSolved() {
    this.isStepTransitioning = true;
    sound.playSuccess();

    const isEn = i18n.lang === "en";
    const step = this.currentStep;

    const resultBox = document.getElementById("mystery-result-box");
    const resultText = document.getElementById("mystery-result-text");
    if (resultBox && resultText) {
      resultText.textContent = isEn ? step.successDialogue_en : step.successDialogue_ms;
      resultBox.classList.remove("hidden");
    }

    // Advance to next chapter or conclude case after 2 seconds
    setTimeout(() => {
      this.isStepTransitioning = false;
      if (resultBox) resultBox.classList.add("hidden");

      if (this.currentStepIdx < this.caseData.steps.length - 1) {
        this.currentStepIdx++;
        this.holdStartTime = null;
        this.currentHoldProgress = 0;
        this.render();
      } else {
        this.concludeCase();
      }
    }, 2200);
  }

  concludeCase() {
    this.isCaseClosed = true;
    const elapsedSeconds = Math.round((performance.now() - (this.caseStartTime || performance.now())) / 1000);

    const activeCard = document.getElementById("mystery-active-step-card");
    const closedCard = document.getElementById("mystery-case-closed-card");
    const timeEl = document.getElementById("mystery-elapsed-time");

    if (activeCard) activeCard.classList.add("hidden");
    if (closedCard) closedCard.classList.remove("hidden");
    if (timeEl) timeEl.textContent = `${elapsedSeconds}s`;

    sound.playFanfare();
  }

  render() {
    const isEn = i18n.lang === "en";
    const activeCard = document.getElementById("mystery-active-step-card");
    const closedCard = document.getElementById("mystery-case-closed-card");

    if (this.isCaseClosed) {
      if (activeCard) activeCard.classList.add("hidden");
      if (closedCard) closedCard.classList.remove("hidden");
      return;
    }

    if (activeCard) activeCard.classList.remove("hidden");
    if (closedCard) closedCard.classList.add("hidden");

    const step = this.currentStep;
    if (!step) return;

    const sign = getSign(step.targetSign);

    // Progress counter
    const stepNumEl = document.getElementById("mystery-step-num");
    const titleEl = document.getElementById("mystery-step-title");
    const briefingEl = document.getElementById("mystery-briefing");
    const dialogueEl = document.getElementById("mystery-dialogue");
    const clueEl = document.getElementById("mystery-clue");

    const targetImg = document.getElementById("mystery-target-img");
    const targetName = document.getElementById("mystery-target-name");
    const targetTip = document.getElementById("mystery-target-tip");

    if (stepNumEl) stepNumEl.textContent = `Scene ${this.currentStepIdx + 1} of ${this.caseData.steps.length}`;
    if (titleEl) titleEl.textContent = isEn ? step.title_en : step.title_ms;
    if (briefingEl) briefingEl.textContent = isEn ? step.briefing_en : step.briefing_ms;
    if (dialogueEl) dialogueEl.textContent = isEn ? step.dialogue_en : step.dialogue_ms;
    if (clueEl) clueEl.textContent = isEn ? step.clue_en : step.clue_ms;

    if (sign) {
      if (targetImg) targetImg.src = sign.image;
      if (targetName) targetName.textContent = sign.label;
      if (targetTip) targetTip.textContent = sign.tip;
    }

    // Step dots
    const dotsContainer = document.getElementById("mystery-step-dots");
    if (dotsContainer) {
      dotsContainer.innerHTML = this.caseData.steps.map((s, idx) => {
        let colorClass = "bg-zinc-800 border-white/10";
        if (idx < this.currentStepIdx) colorClass = "bg-emerald-400 border-emerald-300";
        else if (idx === this.currentStepIdx) colorClass = "bg-cyan-400 border-cyan-300 animate-pulse";

        return `<div class="w-3 h-3 rounded-full border ${colorClass}"></div>`;
      }).join("");
    }
  }
}
