/**
 * Mode 4: Posture Calibration & Skeletal Alignment (ASL)
 */

import { getSign, ASL_SIGNS } from "../config.js";
import { sound } from "../audio.js";
import { i18n } from "../i18n.js";

export class GhostMirrorMode {
  constructor() {
    this.keys = Object.keys(ASL_SIGNS);
    this.currentIndex = 0;
    this.currentTarget = this.keys[this.currentIndex];
    this.isMatched = false;
    this.congratulated = false;
  }

  nextSign() {
    this.currentIndex = (this.currentIndex + 1) % this.keys.length;
    this.currentTarget = this.keys[this.currentIndex];
    this.isMatched = false;
    this.congratulated = false;
    this.renderTarget();
  }

  prevSign() {
    this.currentIndex = (this.currentIndex - 1 + this.keys.length) % this.keys.length;
    this.currentTarget = this.keys[this.currentIndex];
    this.isMatched = false;
    this.congratulated = false;
    this.renderTarget();
  }

  renderTarget() {
    const sign = getSign(this.currentTarget);
    if (!sign) return;

    const glyphEl = document.getElementById("mirror-target-glyph");
    const nameEl = document.getElementById("mirror-target-name");
    const descEl = document.getElementById("mirror-target-desc");
    const tipEl = document.getElementById("mirror-target-tip");

    if (glyphEl) glyphEl.textContent = sign.glyph;
    if (nameEl) nameEl.textContent = sign.label;
    if (descEl) descEl.textContent = sign.description;
    if (tipEl) tipEl.textContent = sign.tip;
  }

  update(detectedGesture, confidence) {
    if (detectedGesture === this.currentTarget && confidence > 0.8) {
      this.isMatched = true;
      if (!this.congratulated) {
        sound.playDing();
        this.congratulated = true;
      }
    } else {
      this.isMatched = false;
      this.congratulated = false;
    }

    this.updateStatus(confidence, detectedGesture);
  }

  updateStatus(confidence, detectedGesture) {
    const matchBar = document.getElementById("mirror-match-bar");
    const matchText = document.getElementById("mirror-match-pct");
    const statusText = document.getElementById("mirror-status-text");

    let pct = 0;
    if (detectedGesture === this.currentTarget) {
      pct = Math.round(confidence * 100);
    } else if (confidence > 0) {
      pct = Math.round(confidence * 25);
    }

    if (matchBar) matchBar.style.width = `${pct}%`;
    if (matchText) matchText.textContent = `${pct}%`;

    if (statusText) {
      if (this.isMatched) {
        statusText.innerHTML = `<span class="text-emerald-400 font-semibold">${i18n.t("status_perfect")}</span>`;
      } else {
        statusText.innerHTML = `<span class="text-zinc-500">${i18n.t("status_adjust")}</span>`;
      }
    }
  }
}
