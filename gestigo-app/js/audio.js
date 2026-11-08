// ==========================================================================
// Gestigo - Web Audio Procedural Sound Engine & Authentic Typing Engine
// ==========================================================================

class GestigoAudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.typingAudio = null;
    this.typingBuffer = null;
    this.typingSource = null;
    this.typingGain = null;
    this.isTypingSoundActive = false;
    this.initTypingSound();
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  initTypingSound() {
    if (typeof window !== 'undefined') {
      try {
        const el = document.getElementById('gestigoTypingAudio');
        if (el) {
          this.typingAudio = el;
        } else if (typeof Audio !== 'undefined') {
          this.typingAudio = new Audio('assets/typing.mp3');
        }
        if (this.typingAudio) {
          this.typingAudio.loop = true;
          this.typingAudio.volume = 0.75;
          this.typingAudio.preload = 'auto';
        }
      } catch (e) {
        console.warn('Typing audio init warning:', e);
      }
      this.preloadTypingBuffer();
    }
  }

  preloadTypingBuffer() {
    if (typeof window === 'undefined' || typeof fetch === 'undefined') return;
    fetch('assets/typing.mp3')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.arrayBuffer();
      })
      .then(arrayBuffer => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const tempCtx = this.ctx || new AudioContext();
        if (!this.ctx) this.ctx = tempCtx;
        return tempCtx.decodeAudioData(arrayBuffer).then(decoded => {
          this.typingBuffer = decoded;
        });
      })
      .catch(() => {
        // Graceful fallback to HTML5 Audio element
      });
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopTypingSound();
    }
    return this.muted;
  }

  startTypingSound() {
    if (this.muted) return;
    this.init();
    if (this.isTypingSoundActive) return;
    this.isTypingSoundActive = true;

    // Prefer Web Audio API buffer playback for zero latency, smooth looping & organic variations
    if (this.ctx && this.typingBuffer) {
      try {
        if (this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
        const source = this.ctx.createBufferSource();
        source.buffer = this.typingBuffer;
        source.loop = true;

        // Start from a varied offset so repeated dialogues don't sound completely identical
        const maxOffset = Math.max(0, this.typingBuffer.duration - 2);
        const offset = Math.random() * maxOffset;

        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.75, now + 0.04);

        source.connect(gain);
        gain.connect(this.ctx.destination);
        source.start(0, offset);

        this.typingSource = source;
        this.typingGain = gain;
        return;
      } catch (e) {
        // Fall through to HTML5 audio fallback
      }
    }

    // HTML5 Audio fallback
    if (!this.typingAudio && typeof document !== 'undefined') {
      this.typingAudio = document.getElementById('gestigoTypingAudio');
    }
    if (this.typingAudio) {
      try {
        this.typingAudio.loop = true;
        this.typingAudio.volume = 0.75;
        if (this.typingAudio.duration && !isNaN(this.typingAudio.duration)) {
          this.typingAudio.currentTime = Math.random() * Math.max(0, this.typingAudio.duration - 2);
        }
        const p = this.typingAudio.play();
        if (p && typeof p.catch === 'function') {
          p.catch(() => {});
        }
      } catch (e) {}
    }
  }

  stopTypingSound() {
    if (!this.isTypingSoundActive) return;
    this.isTypingSoundActive = false;

    // Web Audio Stop with smooth click-free fade
    if (this.typingGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.typingGain.gain.cancelScheduledValues(now);
        this.typingGain.gain.setValueAtTime(this.typingGain.gain.value, now);
        this.typingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        const currentSource = this.typingSource;
        setTimeout(() => {
          try {
            if (currentSource) currentSource.stop();
          } catch (_) {}
        }, 50);
      } catch (e) {}
      this.typingSource = null;
      this.typingGain = null;
    }

    // HTML5 Audio Stop
    if (this.typingAudio) {
      try {
        this.typingAudio.pause();
      } catch (_) {}
    }
  }

  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playHover() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  playSuccess() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.18, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.25);
    });
  }

  playError() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.2);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.2);
  }

  playClueFound() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.15, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.4);
    });
  }

  playStageClear() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const fanfare = [
      { f: 523.25, t: 0.0, d: 0.15 },
      { f: 523.25, t: 0.16, d: 0.15 },
      { f: 523.25, t: 0.32, d: 0.15 },
      { f: 659.25, t: 0.48, d: 0.35 },
      { f: 783.99, t: 0.85, d: 0.45 },
      { f: 1046.50, t: 1.32, d: 0.7 }
    ];

    fanfare.forEach(item => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.f, now + item.t);

      gain.gain.setValueAtTime(0.2, now + item.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + item.t + item.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + item.t);
      osc.stop(now + item.t + item.d);
    });
  }

  playTypewriterBlip(char = '') {
    if (this.muted) return;
    // When authentic typing audio file is actively playing, avoid redundant oscillator overlap
    if (this.isTypingSoundActive) return;

    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (char === ' ') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(130, now + 0.028);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.028);
      } else {
        osc.type = 'sine';
        const freq = 740 + Math.random() * 240;
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.48, now + 0.025);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.025);
      }
    } catch (e) {}
  }

  playBossAlarm() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(600, now + 0.15);
    osc.frequency.linearRampToValueAtTime(300, now + 0.3);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.3);
  }
}

const gestigoAudio = new GestigoAudioEngine();

(function() {
  var g = (typeof window !== 'undefined') ? window : (typeof globalThis !== 'undefined' ? globalThis : (typeof global !== 'undefined' ? global : {}));
  g.gestigoAudio = gestigoAudio;
  g.GestigoAudioEngine = GestigoAudioEngine;
})();

// Global AudioContext Unlocker on first user touch/click/keypress
if (typeof window !== 'undefined') {
  const unlockAudioMaster = () => {
    if (window.gestigoAudio) {
      window.gestigoAudio.init();
      if (window.gestigoAudio.ctx && window.gestigoAudio.ctx.state === 'suspended') {
        window.gestigoAudio.ctx.resume().catch(() => {});
      }
      if (window.gestigoAudio.typingAudio && window.gestigoAudio.typingAudio.paused && window.gestigoAudio.isTypingSoundActive) {
        window.gestigoAudio.typingAudio.play().catch(() => {});
      }
    }
  };
  ['click', 'keydown', 'pointerdown', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, unlockAudioMaster, { once: false, passive: true });
  });
}
