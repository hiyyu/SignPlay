/**
 * Mode 4: Speed Assessment (60s ASL Recall)
 * Real instructional hand illustrations, zero emojis.
 */

import { getSign } from "../config.js";
import { sound } from "../audio.js";
import { i18n } from "../i18n.js";

export class BIMBlitzGame {
  constructor() {
    this.duration = 60; // 60 seconds
    this.startTime = null;
    this.gameOver = false;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.completedCount = 0;

    this.pool = ["HELLO", "YES", "NO", "THANK_YOU", "HELP", "ILY", "STOP", "EAT", "DRINK", "WHERE"];
    this.currentTarget = null;
    this.targetStartTime = 0;
    this.holdStartTime = null;
    this.requiredHoldTime = 550; // ms
  }

  start() {
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.completedCount = 0;
    this.gameOver = false;
    this.startTime = Date.now();
    this.nextTarget();
    this.updateUI();
  }

  nextTarget() {
    const remaining = this.pool.filter(p => p !== this.currentTarget);
    this.currentTarget = remaining[Math.floor(Math.random() * remaining.length)];
    this.targetStartTime = Date.now();
    this.holdStartTime = null;
    this.renderTargetCard();
  }

  getTimeLeft() {
    if (!this.startTime || this.gameOver) return 0;
    const elapsed = (Date.now() - this.startTime) / 1000;
    const left = Math.max(0, Math.ceil(this.duration - elapsed));
    if (left === 0 && !this.gameOver) {
      this.endGame();
    }
    return left;
  }

  getHoldProgress() {
    if (!this.holdStartTime) return 0;
    return Math.min(1.0, (Date.now() - this.holdStartTime) / this.requiredHoldTime);
  }

  update(detectedGesture, confidence) {
    if (this.gameOver || !this.startTime) return;

    this.getTimeLeft();

    if (detectedGesture === this.currentTarget && confidence > 0.75) {
      if (!this.holdStartTime) {
        this.holdStartTime = Date.now();
      } else {
        const held = Date.now() - this.holdStartTime;
        if (held >= this.requiredHoldTime) {
          // Success!
          sound.playDing();
          const reactionSeconds = (Date.now() - this.targetStartTime) / 1000;
          const speedBonus = Math.max(10, Math.round((4.0 - reactionSeconds) * 25));

          this.streak++;
          this.maxStreak = Math.max(this.maxStreak, this.streak);
          this.completedCount++;
          this.score += (100 + speedBonus) * Math.min(this.streak, 5);

          this.nextTarget();
          this.updateUI();
        }
      }
    } else {
      this.holdStartTime = null;
    }
  }

  endGame() {
    this.gameOver = true;
    sound.playCombo();
    const modal = document.getElementById("blitz-summary-modal");
    if (modal) {
      modal.classList.remove("hidden");
      document.getElementById("blitz-final-score").textContent = this.score;
      document.getElementById("blitz-final-signs").textContent = this.completedCount;
      document.getElementById("blitz-final-streak").textContent = `${this.maxStreak}x`;
    }
  }

  renderTargetCard() {
    const sign = getSign(this.currentTarget);
    if (!sign) return;

    const imgEl = document.getElementById("blitz-target-img");
    const nameEl = document.getElementById("blitz-target-name");
    const descEl = document.getElementById("blitz-target-desc");

    if (imgEl) imgEl.src = sign.image;
    if (nameEl) nameEl.textContent = sign.label;
    if (descEl) descEl.textContent = sign.description;
  }

  updateUI() {
    const scoreEl = document.getElementById("blitz-score");
    const streakEl = document.getElementById("blitz-streak");
    const countEl = document.getElementById("blitz-count");

    if (scoreEl) scoreEl.textContent = this.score;
    if (streakEl) streakEl.textContent = `${this.streak}x`;
    if (countEl) countEl.textContent = this.completedCount;
  }
}
