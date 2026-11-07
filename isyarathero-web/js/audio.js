/**
 * IsyaratHero - Audio & Speech Synthesis Engine
 * Provides zero-dependency Web Audio synthesizer sound effects
 * and bidirectional Web Speech API integration.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.ttsEnabled = true;
    this.sfxEnabled = true;
    this.initAudioContext();
  }

  initAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      this.ctx = new AudioContextClass();
    }
  }

  ensureContext() {
    if (!this.ctx) this.initAudioContext();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // High-pitch success chime
  playDing() {
    if (!this.sfxEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, this.ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.12); // E6

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.26);
  }

  // Alias for playDing
  playSuccess() {
    this.playDing();
  }

  // Fanfare for case completion
  playFanfare() {
    if (!this.sfxEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    chords.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);

      gain.gain.setValueAtTime(0.2, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.45);
    });
  }

  // Double harmonic chime for combo streaks
  playCombo() {
    if (!this.sfxEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [659.25, 880, 1318.5].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.2, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.31);
    });
  }

  // Low alert buzz for missed notes
  playMiss() {
    if (!this.sfxEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(160, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.18);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.21);
  }

  // Text-To-Speech (TTS) with Language Support
  speak(text, lang = "en-US") {
    if (!this.ttsEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = 1.0;
    utter.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const prefix = lang.substring(0, 2);
    const targetVoice = voices.find(v => v.lang.startsWith(prefix));
    if (targetVoice) {
      utter.voice = targetVoice;
    }

    window.speechSynthesis.speak(utter);
  }

  // Voice recognition for 2-way reverse translation
  listen(onResult, onError, lang = "en-US") {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      if (onError) onError("Browser does not support the Speech Recognition API.");
      return null;
    }

    const recognition = new SpeechRec();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);
    };

    recognition.onerror = (err) => {
      if (onError) onError(err.error);
    };

    try {
      recognition.start();
    } catch (e) {
      if (onError) onError(e.message);
    }

    return recognition;
  }
}

export const sound = new SoundEngine();
