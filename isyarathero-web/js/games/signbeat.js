/**
 * Mode 2: Rhythm Precision Trainer (ASL)
 */

import { getSign, PALETTE } from "../config.js";
import { sound } from "../audio.js";
import { i18n } from "../i18n.js";

export class SignBeatGame {
  constructor() {
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.notes = [];
    this.lastSpawnTime = 0;
    this.spawnInterval = 2300; // ms
    this.rhythmPool = ["ILY", "GOOD", "PEACE", "L", "THANK_YOU", "THREE"];
    this.feedback = null;
    this.feedbackTimer = 0;

    this.lanes = [0.25, 0.50, 0.75];
    this.strikeY = 0.75; // 75% down canvas
    this.strikeTolerance = 0.075;
  }

  reset() {
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.notes = [];
    this.lastSpawnTime = Date.now();
    this.feedback = null;
    this.updateHUD();
  }

  spawnNote() {
    const code = this.rhythmPool[Math.floor(Math.random() * this.rhythmPool.length)];
    const laneIdx = Math.floor(Math.random() * this.lanes.length);
    this.notes.push({
      code: code,
      sign: getSign(code),
      lane: laneIdx,
      y: 0.08,
      speed: 0.0055,
      hit: false,
      missed: false
    });
  }

  update(detectedGesture, confidence) {
    const now = Date.now();
    if (now - this.lastSpawnTime > this.spawnInterval) {
      this.spawnNote();
      this.lastSpawnTime = now;
    }

    for (const note of this.notes) {
      if (note.hit || note.missed) continue;

      note.y += note.speed;

      // Inside Strike Zone
      if (Math.abs(note.y - this.strikeY) <= this.strikeTolerance) {
        if (detectedGesture === note.code && confidence > 0.7) {
          note.hit = true;
          this.combo++;
          this.maxCombo = Math.max(this.maxCombo, this.combo);

          const diff = Math.abs(note.y - this.strikeY);
          let points = 50;
          if (diff < this.strikeTolerance * 0.45) {
            points = 100 * Math.min(this.combo, 4);
            this.setFeedback("PERFECT", "#10B981");
            sound.playCombo();
          } else {
            points = 50 * Math.min(this.combo, 4);
            this.setFeedback("GOOD", "#38BDF8");
            sound.playDing();
          }

          this.score += points;
          this.updateHUD();
        }
      }
      // Missed Strike Zone
      else if (note.y > this.strikeY + this.strikeTolerance) {
        note.missed = true;
        this.combo = 0;
        this.setFeedback("MISS", "#F43F5E");
        sound.playMiss();
        this.updateHUD();
      }
    }

    this.notes = this.notes.filter(n => n.y < 1.05 && !n.hit);
  }

  setFeedback(text, color) {
    this.feedback = { text, color };
    this.feedbackTimer = Date.now();
  }

  updateHUD() {
    const scoreEl = document.getElementById("signbeat-score");
    const comboEl = document.getElementById("signbeat-combo");
    if (scoreEl) scoreEl.textContent = this.score.toString().padStart(6, "0");
    if (comboEl) comboEl.textContent = `${this.combo}x`;
  }

  render(ctx, w, h) {
    const strikeYPx = this.strikeY * h;
    const strikeHPx = this.strikeTolerance * 2 * h;

    // 1. Sleek Strike Zone Boundary
    ctx.save();
    ctx.fillStyle = "rgba(56, 189, 248, 0.05)";
    ctx.fillRect(40, strikeYPx - strikeHPx / 2, w - 80, strikeHPx);

    ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.strokeRect(40, strikeYPx - strikeHPx / 2, w - 80, strikeHPx);

    ctx.setLineDash([]);
    ctx.fillStyle = "#38BDF8";
    ctx.font = "600 11px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(i18n.t("strike_zone_label"), 55, strikeYPx - strikeHPx / 2 - 8);
    ctx.restore();

    // 2. Minimalist Note Tokens
    for (const note of this.notes) {
      if (note.hit || note.missed) continue;

      const x = this.lanes[note.lane] * w;
      const y = note.y * h;
      const radius = 32;

      ctx.save();
      // Outer subtle disc
      ctx.fillStyle = "rgba(18, 22, 31, 0.90)";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Sign Label
      ctx.font = "bold 13px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = "#F8FAFC";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(note.code, x, y - 2);

      // Category / Glyph subtitle
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#94A3B8";
      ctx.fillText(note.sign?.glyph || "ASL", x, y + 14);

      ctx.restore();
    }

    // 3. Precision Hit Feedback Popup
    if (this.feedback && Date.now() - this.feedbackTimer < 650) {
      ctx.save();
      ctx.font = "800 28px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = this.feedback.color;
      ctx.textAlign = "center";
      ctx.shadowColor = this.feedback.color;
      ctx.shadowBlur = 10;
      ctx.fillText(this.feedback.text, w / 2, strikeYPx - 35);
      ctx.restore();
    }
  }
}
