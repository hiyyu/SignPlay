/**
 * Mode 3: Assistive Two-Way Communicator (ASL)
 * Real instructional hand illustrations, zero emojis.
 */

import { getSign, ASL_SIGNS } from "../config.js";
import { sound } from "../audio.js";
import { i18n } from "../i18n.js";

export class TranslatorMode {
  constructor() {
    this.sentence = [];
    this.candidate = null;
    this.candidateStartTime = null;
    this.holdThreshold = 750; // ms to commit sign
    this.lastCommitTime = 0;
    this.isListening = false;
    this.reverseText = "";
  }

  update(detectedGesture, confidence) {
    const now = Date.now();
    if (now - this.lastCommitTime < 1100) return;

    if (detectedGesture && confidence > 0.75) {
      if (detectedGesture === this.candidate) {
        if (this.candidateStartTime && now - this.candidateStartTime >= this.holdThreshold) {
          this.commitWord(detectedGesture);
          this.lastCommitTime = now;
          this.candidate = null;
          this.candidateStartTime = null;
        }
      } else {
        this.candidate = detectedGesture;
        this.candidateStartTime = now;
      }
    } else {
      this.candidate = null;
      this.candidateStartTime = null;
    }
  }

  commitWord(wordCode) {
    const sign = getSign(wordCode);
    if (!sign) return;

    if (this.sentence.length === 0 || this.sentence[this.sentence.length - 1].code !== wordCode) {
      this.sentence.push(sign);
      sound.playDing();
      sound.speak(sign.label, i18n.lang === "en" ? "en-US" : "ms-MY");
      this.renderSentence();
    }
  }

  clearSentence() {
    this.sentence = [];
    this.renderSentence();
  }

  speakFullSentence() {
    if (this.sentence.length === 0) return;
    const text = this.sentence.map(s => s.label).join(" ");
    sound.speak(text, i18n.lang === "en" ? "en-US" : "ms-MY");
  }

  renderSentence() {
    const container = document.getElementById("translator-sentence-container");
    if (!container) return;

    if (this.sentence.length === 0) {
      container.innerHTML = `
        <div class="text-zinc-500 italic text-xs py-3">
          ${i18n.t("sentence_empty")}
        </div>
      `;
      return;
    }

    container.innerHTML = this.sentence.map((item, idx) => `
      <div class="inline-flex items-center gap-2 bg-zinc-900/90 border border-zinc-700/60 px-3 py-1.5 rounded-md text-zinc-100 font-medium text-xs shadow-sm">
        <img src="${item.image}" alt="${item.label}" class="w-6 h-6 rounded object-cover bg-white/5 border border-white/10" />
        <span class="font-semibold">${item.label}</span>
        ${idx < this.sentence.length - 1 ? '<span class="text-zinc-600 font-bold ml-1">→</span>' : ''}
      </div>
    `).join("");
  }

  getHoldProgress() {
    if (!this.candidateStartTime) return 0;
    const elapsed = Date.now() - this.candidateStartTime;
    return Math.min(1.0, elapsed / this.holdThreshold);
  }

  startVoiceInput() {
    const reverseOutput = document.getElementById("reverse-translation-output");
    if (!reverseOutput) return;

    reverseOutput.innerHTML = `<span class="text-cyan-400 animate-pulse text-xs font-mono">${i18n.t("listening_active")}</span>`;

    const lang = i18n.lang === "en" ? "en-US" : "ms-MY";
    sound.listen(
      (transcript) => {
        this.reverseText = transcript;
        this.renderReverseSigns(transcript);
      },
      (error) => {
        reverseOutput.innerHTML = `<span class="text-rose-400 text-xs">${error}</span>`;
      },
      lang
    );
  }

  renderReverseSigns(text) {
    const container = document.getElementById("reverse-translation-output");
    if (!container) return;

    const lower = text.toLowerCase();
    const matched = [];

    // Match keywords across English & Malay against 19 ASL dataset
    if (lower.includes("love") || lower.includes("sayang") || lower.includes("ily")) {
      matched.push(getSign("ILY"));
    }
    if (lower.includes("thank") || lower.includes("terima kasih")) {
      matched.push(getSign("THANK_YOU"));
    }
    if (lower.includes("hello") || lower.includes("hi") || lower.includes("helo") || lower.includes("salam")) {
      matched.push(getSign("HELLO"));
    }
    if (lower.includes("yes") || lower.includes("ya") || lower.includes("confirm")) {
      matched.push(getSign("YES"));
    }
    if (lower.includes("no") || lower.includes("tidak") || lower.includes("bukan")) {
      matched.push(getSign("NO"));
    }
    if (lower.includes("help") || lower.includes("tolong") || lower.includes("bantuan")) {
      matched.push(getSign("HELP"));
    }
    if (lower.includes("stop") || lower.includes("berhenti") || lower.includes("halt")) {
      matched.push(getSign("STOP"));
    }
    if (lower.includes("eat") || lower.includes("makan") || lower.includes("food")) {
      matched.push(getSign("EAT"));
    }
    if (lower.includes("drink") || lower.includes("minum") || lower.includes("water") || lower.includes("air")) {
      matched.push(getSign("DRINK"));
    }
    if (lower.includes("more") || lower.includes("lagi") || lower.includes("tambah")) {
      matched.push(getSign("MORE"));
    }
    if (lower.includes("toilet") || lower.includes("bathroom") || lower.includes("tandas")) {
      matched.push(getSign("BATHROOM"));
    }
    if (lower.includes("pain") || lower.includes("sakit") || lower.includes("hurt")) {
      matched.push(getSign("PAIN"));
    }
    if (lower.includes("where") || lower.includes("mana")) {
      matched.push(getSign("WHERE"));
    }
    if (lower.includes("please") || lower.includes("sila")) {
      matched.push(getSign("PLEASE"));
    }
    if (lower.includes("sorry") || lower.includes("maaf")) {
      matched.push(getSign("SORRY"));
    }

    if (matched.length === 0) {
      container.innerHTML = `
        <div class="text-xs text-zinc-300">
          <span class="text-zinc-500 font-mono">Input:</span> "${text}"
          <p class="text-[11px] text-amber-400/90 mt-1.5">Try speaking keywords like: "Hello", "Yes", "Help", "Thank you", "Stop", "Eat", "Drink", "Where".</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="w-full">
        <div class="text-[11px] text-zinc-500 font-mono mb-2">Recognized Speech: "${text}"</div>
        <div class="flex flex-wrap gap-2.5">
          ${matched.map(s => `
            <div class="bg-zinc-900/90 border border-cyan-500/30 p-2.5 rounded-lg flex items-center gap-3">
              <img src="${s.image}" alt="${s.label}" class="w-10 h-10 rounded object-cover bg-white/5 border border-white/10" />
              <div>
                <div class="font-semibold text-cyan-300 text-xs">${s.label}</div>
                <div class="text-[11px] text-zinc-400">${s.description}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }
}
