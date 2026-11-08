/**
 * GESTIGO - Level 3: 3D Luma City Investigation Engine (Realistic Scenario)
 * Complete 3D World: Festival of Stories, Story Museum Crime Scene, Luma Canal & Harbor,
 * Historic Townhouses & Clock Tower, Playable Detective Gio, and 10 Suspect Standees.
 */

// ==================== PROCEDURAL FESTIVAL AUDIO SYNTHESIZER ====================
class FestivalAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timerId = null;
    this.step = 0;
    this.masterGain = null;
    this.melody = [
      { f: 523.3, d: 0.22, b: 130.8 }, // C5, C3
      { f: 587.3, d: 0.18, b: null },  // D5
      { f: 659.3, d: 0.35, b: 196.0 }, // E5, G3
      { f: 523.3, d: 0.22, b: null },  // C5
      { f: 784.0, d: 0.45, b: 130.8 }, // G5, C3
      { f: 659.3, d: 0.25, b: null },  // E5
      { f: 587.3, d: 0.22, b: 146.8 }, // D5, D3
      { f: 659.3, d: 0.18, b: null },  // E5
      { f: 587.3, d: 0.35, b: 196.0 }, // D5, G3
      { f: 493.9, d: 0.22, b: null },  // B4
      { f: 392.0, d: 0.45, b: 196.0 }, // G4, G3
      { f: 440.0, d: 0.25, b: null },  // A4
      { f: 440.0, d: 0.22, b: 110.0 }, // A4, A2
      { f: 523.3, d: 0.22, b: 164.8 }, // C5, E3
      { f: 659.3, d: 0.35, b: null },  // E5
      { f: 587.3, d: 0.22, b: 146.8 }, // D5, D3
      { f: 523.3, d: 0.35, b: 196.0 }, // C5, G3
      { f: 493.9, d: 0.22, b: null },  // B4
      { f: 523.3, d: 0.55, b: 130.8 }, // C5, C3
      { f: null, d: 0.15, b: null },   // rest
      { f: 659.3, d: 0.25, b: 196.0 }, // E5, G3
      { f: 784.0, d: 0.35, b: 130.8 }, // G5, C3
      { f: 1046.5, d: 0.65, b: 130.8 } // C6, C3
    ];
  }

  init() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) {
        this.ctx = new AC();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  startMusic() {
    this.init();
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;
    this.step = 0;
    this.playNextNote();
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  playNextNote() {
    if (!this.isPlaying || !this.ctx) return;
    const item = this.melody[this.step % this.melody.length];
    const now = this.ctx.currentTime;

    if (item.f) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + item.d);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + item.d);

      if (this.step % 2 === 0) {
        const bell = this.ctx.createOscillator();
        const bellGain = this.ctx.createGain();
        bell.type = 'sine';
        bell.frequency.setValueAtTime(item.f * 2, now);
        bellGain.gain.setValueAtTime(0.04, now);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, now + item.d * 0.8);
        bell.connect(bellGain);
        bellGain.connect(this.masterGain);
        bell.start(now);
        bell.stop(now + item.d * 0.8);
      }
    }

    if (item.b) {
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(item.b, now);
      bassGain.gain.setValueAtTime(0.16, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + item.d * 0.9);
      bassOsc.connect(bassGain);
      bassGain.connect(this.masterGain);
      bassOsc.start(now);
      bassOsc.stop(now + item.d * 0.9);
    }

    this.step++;
    const nextDelay = item.d * 1000;
    this.timerId = setTimeout(() => this.playNextNote(), nextDelay);
  }

  playFireworkRocket() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.65);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.65);
  }

  playFireworkBoom() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const boom = this.ctx.createOscillator();
    const boomGain = this.ctx.createGain();
    boom.type = 'sine';
    boom.frequency.setValueAtTime(140, now);
    boom.frequency.exponentialRampToValueAtTime(35, now + 0.8);
    boomGain.gain.setValueAtTime(0.35, now);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    boom.connect(boomGain);
    boomGain.connect(this.masterGain);
    boom.start(now);
    boom.stop(now + 0.8);

    for (let c = 0; c < 5; c++) {
      setTimeout(() => {
        if (!this.ctx) return;
        const cNow = this.ctx.currentTime;
        const noise = this.ctx.createOscillator();
        const nGain = this.ctx.createGain();
        noise.type = 'triangle';
        noise.frequency.setValueAtTime(800 + Math.random() * 600, cNow);
        nGain.gain.setValueAtTime(0.08, cNow);
        nGain.gain.exponentialRampToValueAtTime(0.001, cNow + 0.05);
        noise.connect(nGain);
        nGain.connect(this.masterGain);
        noise.start(cNow);
        noise.stop(cNow + 0.05);
      }, 150 + c * 70);
    }
  }

  playWheelClick() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(650, now);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.035);
  }

  playWheelWin() {
    this.init();
    if (!this.ctx) return;
    [523.3, 659.3, 784.0, 1046.5].forEach((f, i) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.4);
      }, i * 90);
    });
  }

  playCelebrateFanfare() {
    this.init();
    if (!this.ctx) return;
    const notes = [440, 554.4, 659.3, 880];
    notes.forEach((f, i) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.35);
      }, i * 80);
    });
  }

  playCrowdCheer() {
    this.init();
    if (!this.ctx) return;
    [329.6, 440, 523.3, 659.3].forEach((f, i) => {
      const now = this.ctx.currentTime + i * 0.04;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.7);
    });
  }
}

class GestigoLuma3DEngine {
  constructor() {
    this.isOpen = false;
    this.isInterrogating = false;
    this.alibisCollected = {};
    try {
      this.collectedClues = JSON.parse(localStorage.getItem('gestigo_level3_clues') || '[]');
      this.questionsAsked = JSON.parse(localStorage.getItem('gestigo_level3_asked') || '{}');
      this.isBookRecovered = localStorage.getItem('gestigo_level3_book_recovered') === 'true';
    } catch(e) {
      this.collectedClues = [];
      this.questionsAsked = {};
      this.isBookRecovered = false;
    }
    this.isNearPlanter = false;
    this.activeQuestionLetter = 'A';

    // Three.js Core
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animFrameId = null;
    this.clock = null;
    this.raycaster = null;
    this.mouse = null;

    // Camera Orbit Controls
    this.cameraTarget = new THREE.Vector3(0, 1.2, 0);
    this.camDistance = 11;
    this.camAzimuth = Math.PI * 0.75;
    this.camElevation = 0.55;
    this.isDragging = false;
    this.prevMousePos = { x: 0, y: 0 };

    // Player (Detective Gio)
    this.playerGroup = null;
    this.playerPos = new THREE.Vector3(0, 0, 12);
    this.playerTargetPos = null;
    this.playerAngle = 0;
    this.playerSpeed = 9.0;
    this.isWalking = false;
    this.walkCycle = 0;
    this.keysDown = { up: false, down: false, left: false, right: false };

    // Interactive Objects
    this.characters = [];
    this.characterMeshes = [];
    this.nearestChar = null;
    this.groundMesh = null;
    this.animatedObjects = []; // water, beacons, lanterns
    this.crowdWalkers = [];
    this.crowdVignettes = [];
    this.jugglerOrbs = [];
    this.clappingArmL = null;
    this.clappingArmR = null;
    this.childBalloon = null;
    this.nearestCrowdQuote = null;

    // Lively Festival Elements
    this.festivalAudio = new FestivalAudioEngine();
    this.isMusicPlaying = true;
    this.fireworks = [];
    this.fireworkTimer = 0;
    this.confettiParticles = [];
    this.lanternGarlands = [];
    this.carnivalWheelMesh = null;
    this.isWheelSpinning = false;
    this.wheelSpeed = 0;
    this.wheelAngle = 0;
    this.isNearWheel = false;
    this.isDancing = false;
    this.danceTimer = 0;
    this.activeBuff = null;
    this.buffTimer = 0;

    // Suspect Data
    this.initCharacterData();

    // Load saved alibis
    try {
      const saved = localStorage.getItem('gestigo_level3_alibis');
      if (saved) this.alibisCollected = JSON.parse(saved);
    } catch (e) {}
  }

  // ==================== 10 CITIZENS & SUSPECTS DATA ====================
  initCharacterData() {
    if (window.GESTIGO_INTERVIEWS && Array.isArray(window.GESTIGO_INTERVIEWS.characters)) {
      this.characters = window.GESTIGO_INTERVIEWS.characters.map(c => {
        const id = c.id;
        const isSuspect = (c.category || '').toUpperCase() === 'SUSPECT';
        return {
          id: id,
          name: c.name,
          nameBm: c.nameBm || c.name,
          role: c.role,
          roleBm: c.roleBm || c.role,
          category: isSuspect ? 'suspect' : 'witness',
          isSuspect: isSuspect,
          isCulprit: !!c.isCulprit,
          avatar: c.avatar || `assets/suspects/${id}_avatar.png`,
          avatarCutout: `assets/suspects/${id}_avatar_cutout.png`,
          illustratedCard: `assets/suspects/suspect_${id}.png`,
pos3D: c.pos3D || { x: 0, y: 0.8, z: 0 },
          locationName: c.location || 'Luma City',
          locationNameBm: c.locationBm || c.location || 'Bandar Luma',
          dialogue: c.dialogue || {},
          statement: (c.dialogue && c.dialogue.A) ? c.dialogue.A.reply : '',
          statementBm: (c.dialogue && c.dialogue.A) ? (c.dialogue.A.replyBm || c.dialogue.A.reply) : ''
        };
      });
    } else {
      console.warn("window.GESTIGO_INTERVIEWS not found, characters will load when available.");
      this.characters = [];
    }
  }

  // ==================== PROCEDURAL HIGH-DEF TEXTURE GENERATORS ====================
  // Generates realistic cobblestone pavement with stone variations and grout
  createCobblestoneCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Base dark earthy mortar
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 512, 512);

    const cols = 16;
    const rows = 16;
    const cw = 512 / cols;
    const ch = 512 / rows;

    for (let y = 0; y < rows; y++) {
      const offsetX = (y % 2 === 0) ? 0 : cw * 0.5;
      for (let x = -1; x <= cols + 1; x++) {
        const stoneX = x * cw + offsetX + 2;
        const stoneY = y * ch + 2;
        const stoneW = cw - 4;
        const stoneH = ch - 4;

        // Rich stone color variations (slate blues, warm grays, muted purples)
        const rand = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
        const shade = Math.floor(45 + rand * 40);
        const r = shade + 5;
        const g = shade + 8;
        const b = shade + 22;

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(stoneX, stoneY, stoneW, stoneH, 4) : ctx.rect(stoneX, stoneY, stoneW, stoneH);
        ctx.fill();

        // Inner stone bevel / highlight
        ctx.strokeStyle = `rgba(255, 255, 255, 0.12)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Stone texture noise
        ctx.fillStyle = 'rgba(0,0,0,0.18)';
        ctx.fillRect(stoneX + 4, stoneY + stoneH - 6, stoneW - 8, 4);
      }
    }

    return new THREE.CanvasTexture(canvas);
  }

  // Generates polished marble tiles for the Story Museum terrace
  createMarbleCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 512, 512);

    const tileSize = 64;
    for (let y = 0; y < 512; y += tileSize) {
      for (let x = 0; x < 512; x += tileSize) {
        const isAlt = ((x / tileSize) + (y / tileSize)) % 2 === 0;
        ctx.fillStyle = isAlt ? '#334155' : '#1e293b';
        ctx.fillRect(x + 1, y + 1, tileSize - 2, tileSize - 2);

        // Marble veins
        ctx.strokeStyle = isAlt ? 'rgba(255,255,255,0.08)' : 'rgba(168,85,247,0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + 5, y + tileSize - 5);
        ctx.quadraticCurveTo(x + tileSize * 0.5, y + 10, x + tileSize - 10, y + 5);
        ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  // Generates animated translucent canal water texture
  createWaterCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 256, 256);
    grad.addColorStop(0, '#0284c7');
    grad.addColorStop(0.5, '#0369a1');
    grad.addColorStop(1, '#082f49');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    // Subtle wave ripples
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2;
    for (let y = 20; y < 256; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(64, y - 10, 128, y + 10, 192, y - 5);
      ctx.bezierCurveTo(220, y - 12, 240, y + 5, 256, y);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 8);
    return tex;
  }

  // Generates striped festival awning fabric
  createAwningCanvas(col1, col2) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const stripeW = 32;
    for (let x = 0; x < 256; x += stripeW * 2) {
      ctx.fillStyle = col1;
      ctx.fillRect(x, 0, stripeW, 256);
      ctx.fillStyle = col2;
      ctx.fillRect(x + stripeW, 0, stripeW, 256);
    }

    // Fabric texture shadow
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, 'rgba(0,0,0,0.3)');
    grad.addColorStop(0.5, 'transparent');
    grad.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    return new THREE.CanvasTexture(canvas);
  }

  // Generates historic townhouse facade with glowing candlelight windows
  createBuildingFacadeCanvas(wallColor, windowGlow) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Wall base
    ctx.fillStyle = wallColor;
    ctx.fillRect(0, 0, 512, 512);

    // Brick mortar lines
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 2;
    for (let y = 0; y < 512; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Windows in 3 rows
    const winRows = [80, 200, 320];
    const winCols = [80, 220, 360];

    winRows.forEach(wy => {
      winCols.forEach(wx => {
        // Window stone frame
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(wx - 4, wy - 4, 68, 88);

        // Glass with warm amber candlelight glow
        ctx.fillStyle = windowGlow;
        ctx.fillRect(wx, wy, 60, 80);

        // Window mullions (cross)
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(wx + 30, wy);
        ctx.lineTo(wx + 30, wy + 80);
        ctx.moveTo(wx, wy + 40);
        ctx.lineTo(wx + 60, wy + 40);
        ctx.stroke();

        // Soft glass reflection
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(wx + 4, wy + 4, 24, 32);
      });
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  // Generates the deep celestial starry sky sphere with full moon
  createStarrySkyCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep midnight purple-blue gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#030712');
    grad.addColorStop(0.4, '#070f26');
    grad.addColorStop(0.8, '#0d1838');
    grad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Glowing Full Moon
    const moonX = 320;
    const moonY = 120;
    const moonRad = 45;

    // Moon halo
    const halo = ctx.createRadialGradient(moonX, moonY, moonRad * 0.8, moonX, moonY, moonRad * 3.5);
    halo.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
    halo.addColorStop(0.5, 'rgba(192, 132, 252, 0.2)');
    halo.addColorStop(1, 'transparent');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRad * 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Moon disc
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRad, 0, Math.PI * 2);
    ctx.fill();

    // Moon craters
    ctx.fillStyle = 'rgba(202, 138, 4, 0.25)';
    ctx.beginPath();
    ctx.arc(moonX - 12, moonY - 10, 12, 0, Math.PI * 2);
    ctx.arc(moonX + 15, moonY + 8, 9, 0, Math.PI * 2);
    ctx.arc(moonX - 5, moonY + 18, 14, 0, Math.PI * 2);
    ctx.fill();

    // 800 Twinkling stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 700; i++) {
      const sx = Math.random() * 1024;
      const sy = Math.random() * 380;
      const r = Math.random() * 1.8 + 0.3;
      const alpha = Math.random() * 0.8 + 0.2;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }

  // Generates soft radial glow for streetlamps and beacons
  createGlowSpriteTexture(colorStr) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, colorStr);
    grad.addColorStop(0.3, colorStr.replace('1)', '0.5)'));
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }

  // Generates Gothic Roman numeral clock face showing 02:15 AM
  createClockCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Dial face
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(128, 128, 120, 0, Math.PI * 2);
    ctx.fill();

    // Dark ring
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Roman numeral markers
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 24px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const numerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const nx = 128 + Math.cos(angle) * 92;
      const ny = 128 + Math.sin(angle) * 92;
      ctx.fillText(numerals[i], nx, ny);
    }

    // Hands showing 02:15 AM (hour hand pointing towards II, minute hand pointing towards III)
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(128, 128);
    // Hour hand towards 2 (angle -30 deg)
    ctx.lineTo(128 + Math.cos(-30 * Math.PI / 180) * 55, 128 + Math.sin(-30 * Math.PI / 180) * 55);
    ctx.stroke();

    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(128, 128);
    // Minute hand pointing right to III (angle 0 deg)
    ctx.lineTo(128 + 78, 128);
    ctx.stroke();

    // Center pin
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(128, 128, 8, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }

  // ==================== THREE.JS SCENARIO BUILDER ====================
  initWorld() {
    const container = document.getElementById('luma3dCanvasContainer');
    if (!container) return;

    // Reset container
    container.innerHTML = '';

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060b17);
    this.scene.fog = new THREE.FogExp2(0x081024, 0.018);

    this.camera = new THREE.PerspectiveCamera(48, width / height, 0.5, 300);
    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(1.0);
    this.renderer.shadowMap.enabled = false;
    container.appendChild(this.renderer.domElement);

    // 2. Build World Components
    this.buildAtmosphereAndLighting();
    this.buildGroundAndPlaza();
    this.buildStoryMuseumCrimeScene();
    this.buildFestivalMarketplace();
    this.buildLumaCanalAndPier();
    this.buildHistoricTownhousesAndClockTower();
    this.buildLandscapingAndStreetlamps();
    this.buildCharacterStandees();
    this.buildPlayableDetectiveGio();
    this.buildFestivalCrowdAndPerformers();
    this.buildFestoonLanternCanopy();
    this.buildCarnivalWheelAndSweets();
    this.buildFestivalStageAndMusicians();
    this.buildFestivalConfettiSystem();
    this.buildGrandFestivalArchway();
    this.buildGardenAndPlanter();

    // 3. Setup Interactions & Loop
    this.setupOrbitAndMovementControls(container);
    this.startRenderLoop();
  }

  // ==================== ATMOSPHERE & LIGHTING ====================
  buildAtmosphereAndLighting() {
    // A. Starry Sky Sphere Dome
    const skyGeo = new THREE.SphereGeometry(140, 32, 16);
    const skyMat = new THREE.MeshBasicMaterial({
      map: this.createStarrySkyCanvas(),
      side: THREE.BackSide
    });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(skyMesh);

    // B. Soft Moonlight & Ambient Lighting
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 0.7);
    this.scene.add(hemiLight);

    const moonLight = new THREE.DirectionalLight(0xc084fc, 1.2);
    moonLight.position.set(-45, 55, 35);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = 1024;
    moonLight.shadow.mapSize.height = 1024;
    moonLight.shadow.camera.near = 10;
    moonLight.shadow.camera.far = 150;
    moonLight.shadow.camera.left = -40;
    moonLight.shadow.camera.right = 40;
    moonLight.shadow.camera.top = 40;
    moonLight.shadow.camera.bottom = -40;
    moonLight.shadow.bias = -0.001;
    this.scene.add(moonLight);

    // C. Ambient Fill Light for Festival Center
    const festivalPiazzaLight = new THREE.PointLight(0xf59e0b, 1.6, 35, 1.5);
    festivalPiazzaLight.position.set(0, 6, 8);
    this.scene.add(festivalPiazzaLight);
  }

  // ==================== GROUND & FESTIVAL PIAZZA ====================
  buildGroundAndPlaza() {
    // 1. Cobblestone Base Ground Plane
    const groundGeo = new THREE.PlaneGeometry(160, 160);
    const cobbleTex = this.createCobblestoneCanvas();
    cobbleTex.wrapS = THREE.RepeatWrapping;
    cobbleTex.wrapT = THREE.RepeatWrapping;
    cobbleTex.repeat.set(16, 16);

    const groundMat = new THREE.MeshLambertMaterial({
      map: cobbleTex
    });

    this.groundMesh = new THREE.Mesh(groundGeo, groundMat);
    this.groundMesh.rotation.x = -Math.PI / 2;
    this.groundMesh.position.y = -0.05;
    this.groundMesh.receiveShadow = true;
    this.scene.add(this.groundMesh);

    // 2. Central Festival Piazza (Decorative Stone Ring)
    const piazzaGeo = new THREE.CylinderGeometry(18, 18.2, 0.15, 32);
    const piazzaMat = new THREE.MeshLambertMaterial({
      map: this.createMarbleCanvas()
    });
    const piazzaMesh = new THREE.Mesh(piazzaGeo, piazzaMat);
    piazzaMesh.position.set(0, 0.05, 8);
    piazzaMesh.receiveShadow = true;
    this.scene.add(piazzaMesh);

    // 3. Central Plaza Fountain
    const fountainGroup = new THREE.Group();
    fountainGroup.position.set(0, 0.1, 5);

    // Lower Basin
    const basinGeo = new THREE.CylinderGeometry(4.2, 4.5, 0.8, 16);
    const basinMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
    const basin = new THREE.Mesh(basinGeo, basinMat);
    basin.position.y = 0.4;
    basin.receiveShadow = true;
    basin.castShadow = true;
    fountainGroup.add(basin);

    // Basin Water
    const waterGeo = new THREE.CylinderGeometry(3.8, 3.8, 0.1, 16);
    const waterMat = new THREE.MeshLambertMaterial({
      map: this.createWaterCanvas(),
      transparent: true,
      opacity: 0.85
    });
    const basinWater = new THREE.Mesh(waterGeo, waterMat);
    basinWater.position.y = 0.75;
    fountainGroup.add(basinWater);
    this.animatedObjects.push({ type: 'water', mesh: basinWater });

    // Center Spire Pillar
    const spireGeo = new THREE.CylinderGeometry(0.5, 0.8, 2.5, 8);
    const spire = new THREE.Mesh(spireGeo, basinMat);
    spire.position.y = 1.6;
    spire.castShadow = true;
    fountainGroup.add(spire);

    // Upper Tier Bowl
    const topBowlGeo = new THREE.CylinderGeometry(1.6, 1.2, 0.4, 12);
    const topBowl = new THREE.Mesh(topBowlGeo, basinMat);
    topBowl.position.y = 2.8;
    fountainGroup.add(topBowl);

    // Turquoise Underwater Glow Light
    const fountainLight = new THREE.PointLight(0x38bdf8, 1.8, 10);
    fountainLight.position.set(0, 1.2, 0);
    fountainGroup.add(fountainLight);

    this.scene.add(fountainGroup);
  }

  // ==================== STORY MUSEUM & VITRINE CRIME SCENE ====================
  buildStoryMuseumCrimeScene() {
    const museumGroup = new THREE.Group();
    museumGroup.position.set(0, 0, -32);

    // 1. Grand Elevated Museum Terrace (Plinth)
    const terraceGeo = new THREE.BoxGeometry(40, 1.2, 22);
    const terraceMat = new THREE.MeshLambertMaterial({
      map: this.createMarbleCanvas()
    });
    const terrace = new THREE.Mesh(terraceGeo, terraceMat);
    terrace.position.set(0, 0.6, 0);
    terrace.receiveShadow = true;
    terrace.castShadow = true;
    museumGroup.add(terrace);

    // 2. Grand Entrance Marble Staircase (5 Steps)
    for (let i = 0; i < 5; i++) {
      const stepGeo = new THREE.BoxGeometry(22 - i * 0.8, 0.24, 0.8);
      const step = new THREE.Mesh(stepGeo, terraceMat);
      step.position.set(0, (5 - i) * 0.24 - 0.12, 11 + i * 0.75);
      step.receiveShadow = true;
      step.castShadow = true;
      museumGroup.add(step);
    }

    // 3. Museum Classical Facade Wall
    const facadeGeo = new THREE.BoxGeometry(36, 15, 14);
    const facadeMat = new THREE.MeshLambertMaterial({
      color: 0x1e293b
    });
    const facade = new THREE.Mesh(facadeGeo, facadeMat);
    facade.position.set(0, 8.7, -5);
    facade.receiveShadow = true;
    facade.castShadow = true;
    museumGroup.add(facade);

    // 4. Six Classical Portico Fluted Pillars
    const colX = [-14, -8.5, -3, 3, 8.5, 14];
    colX.forEach(x => {
      const colGeo = new THREE.CylinderGeometry(0.65, 0.75, 10.5, 16);
      const colMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
      const col = new THREE.Mesh(colGeo, colMat);
      col.position.set(x, 6.45, 6);
      col.castShadow = true;
      col.receiveShadow = true;
      museumGroup.add(col);

      // Column Capital & Base
      const capGeo = new THREE.BoxGeometry(1.8, 0.45, 1.8);
      const cap = new THREE.Mesh(capGeo, colMat);
      cap.position.set(x, 11.5, 6);
      museumGroup.add(cap);

      const baseGeo = new THREE.BoxGeometry(1.8, 0.45, 1.8);
      const base = new THREE.Mesh(baseGeo, colMat);
      base.position.set(x, 1.45, 6);
      museumGroup.add(base);
    });

    // 5. Portico Entablature & Pediment (Roof Triangle)
    const entablatureGeo = new THREE.BoxGeometry(34, 1.4, 5.5);
    const entablature = new THREE.Mesh(entablatureGeo, terraceMat);
    entablature.position.set(0, 12.2, 5.5);
    entablature.castShadow = true;
    museumGroup.add(entablature);

    // Triangular Pediment
    const pedimentGeo = new THREE.ConeGeometry(17.5, 4.5, 4);
    pedimentGeo.rotateY(Math.PI * 0.25);
    const pediment = new THREE.Mesh(pedimentGeo, terraceMat);
    pediment.position.set(0, 15.1, 5.5);
    pediment.scale.set(1, 1, 0.35);
    museumGroup.add(pediment);

    // Pediment Relief Badge (Luma Symbol)
    const badgeGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.2, 16);
    badgeGeo.rotateX(Math.PI / 2);
    const badgeMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b });
    const badge = new THREE.Mesh(badgeGeo, badgeMat);
    badge.position.set(0, 14.5, 6.6);
    museumGroup.add(badge);

    // 6. Arched Grand Entrance Doors
    const doorGeo = new THREE.BoxGeometry(5.5, 7.5, 0.4);
    const doorMat = new THREE.MeshLambertMaterial({ color: 0x451a03 });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, 4.95, 1.8);
    museumGroup.add(door);

    // 7. Glowing Upper-Story Arched Windows
    const winX = [-11, -4.5, 4.5, 11];
    winX.forEach(wx => {
      const winGeo = new THREE.PlaneGeometry(3.5, 5);
      const winMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
      const win = new THREE.Mesh(winGeo, winMat);
      win.position.set(wx, 11.2, 2.1);
      museumGroup.add(win);
    });

    // 8. Copper Rooftop Dome & Spire
    const domeGeo = new THREE.SphereGeometry(4.5, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const domeMat = new THREE.MeshLambertMaterial({ color: 0x0d9488 });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.set(0, 16.2, -5);
    museumGroup.add(dome);

    const spireGeo = new THREE.CylinderGeometry(0.15, 0.4, 4, 8);
    const spire = new THREE.Mesh(spireGeo, badgeMat);
    spire.position.set(0, 22.5, -5);
    museumGroup.add(spire);

    // ==================== THE CRIME SCENE VITRINE (SHATTERED DOME) ====================
    const vitrineGroup = new THREE.Group();
    vitrineGroup.position.set(0, 1.2, 7.5);

    // Octagonal Stone Display Pedestal
    const pedGeo = new THREE.CylinderGeometry(1.6, 1.9, 1.2, 8);
    const pedMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });
    const vitrinePed = new THREE.Mesh(pedGeo, pedMat);
    vitrinePed.position.y = 0.6;
    vitrinePed.castShadow = true;
    vitrinePed.receiveShadow = true;
    vitrineGroup.add(vitrinePed);

    // Royal Purple Velvet Cushion (Where the Myth Book sat)
    const cushionGeo = new THREE.BoxGeometry(1.8, 0.25, 1.4);
    const cushionMat = new THREE.MeshLambertMaterial({ color: 0x7c3aed });
    const cushion = new THREE.Mesh(cushionGeo, cushionMat);
    cushion.position.y = 1.3;
    vitrineGroup.add(cushion);

    // Shattered Glass Shards (Reflective transparent angled planes)
    const glassMat = new THREE.MeshLambertMaterial({
      color: 0xc4b5fd,
      transparent: true,
      opacity: 0.5
    });

    for (let g = 0; g < 7; g++) {
      const shardGeo = new THREE.ConeGeometry(0.35 + (g % 3) * 0.2, 0.8 + (g % 2) * 0.4, 3);
      const shard = new THREE.Mesh(shardGeo, glassMat);
      const ang = (g / 7) * Math.PI * 2;
      shard.position.set(Math.cos(ang) * 1.3, 1.35, Math.sin(ang) * 1.1);
      shard.rotation.set((g * 0.5) % 1, ang, (g * 0.8) % 1);
      vitrineGroup.add(shard);
    }

    // Overhead Spotlight Focused on Broken Vitrine
    const vitrineSpot = new THREE.SpotLight(0xa855f7, 2.5, 18, Math.PI * 0.2, 0.3, 1.2);
    vitrineSpot.position.set(0, 9, 6.5);
    vitrineSpot.target = vitrinePed;
    vitrineSpot.castShadow = true;
    museumGroup.add(vitrineSpot);

    // 4 Brass Stanchions with Police Caution Ribbons
    const stanPositions = [
      { x: -2.2, z: -1.8 }, { x: 2.2, z: -1.8 },
      { x: -2.2, z: 1.8 }, { x: 2.2, z: 1.8 }
    ];
    stanPositions.forEach(sp => {
      const poleGeo = new THREE.CylinderGeometry(0.08, 0.1, 1.1, 8);
      const poleMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(sp.x, 0.55, sp.z);
      pole.castShadow = true;
      vitrineGroup.add(pole);

      const sphereGeo = new THREE.SphereGeometry(0.18, 8, 8);
      const sphere = new THREE.Mesh(sphereGeo, poleMat);
      sphere.position.set(sp.x, 1.15, sp.z);
      vitrineGroup.add(sphere);
    });

    // Red Police Caution Tape Strip
    const tapeGeo = new THREE.BoxGeometry(4.4, 0.12, 0.05);
    const tapeMat = new THREE.MeshLambertMaterial({ color: 0xef4444 });
    const tapeFront = new THREE.Mesh(tapeGeo, tapeMat);
    tapeFront.position.set(0, 0.9, 1.8);
    vitrineGroup.add(tapeFront);

    const tapeBack = new THREE.Mesh(tapeGeo, tapeMat);
    tapeBack.position.set(0, 0.9, -1.8);
    vitrineGroup.add(tapeBack);

    museumGroup.add(vitrineGroup);

    // Emergency Flashing Beacon at Officer Chen's Post
    const beaconLight = new THREE.PointLight(0xef4444, 2.0, 12);
    beaconLight.position.set(-16, 2.5, 6);
    museumGroup.add(beaconLight);
    this.animatedObjects.push({ type: 'beacon', light: beaconLight });

    this.scene.add(museumGroup);
  }

  // ==================== FESTIVAL MARKETPLACE STALLS ====================
  buildFestivalMarketplace() {
    // 4 Distinctive Festival Market Pavilions
    const stallConfigs = [
      {
        x: -12, z: 12, angle: Math.PI * 0.15,
        c1: '#b91c1c', c2: '#fef08a',
        sign: 'Tessa Gray Bakery'
      },
      {
        x: 14, z: 11, angle: -Math.PI * 0.18,
        c1: '#6b21a8', c2: '#fbbf24',
        sign: 'Myth & Lore Scrolls'
      },
      {
        x: -16, z: 2, angle: Math.PI * 0.45,
        c1: '#0284c7', c2: '#ffffff',
        sign: 'Clock Tower Relics'
      },
      {
        x: 16, z: 0, angle: -Math.PI * 0.4,
        c1: '#059669', c2: '#fef08a',
        sign: 'Festival Herbalist'
      }
    ];

    stallConfigs.forEach((cfg) => {
      const stallGroup = new THREE.Group();
      stallGroup.position.set(cfg.x, 0, cfg.z);
      stallGroup.rotation.y = cfg.angle;

      const woodTex = this.createCobblestoneCanvas(); // or wood
      const woodMat = new THREE.MeshLambertMaterial({ color: 0x3f2314 });

      // Wooden Table Counter
      const counterGeo = new THREE.BoxGeometry(4.2, 1.1, 2.2);
      const counter = new THREE.Mesh(counterGeo, woodMat);
      counter.position.set(0, 0.55, 0);
      counter.castShadow = true;
      counter.receiveShadow = true;
      stallGroup.add(counter);

      // 4 Corner Timber Support Posts
      const postPositions = [
        { x: -1.9, z: -0.9 }, { x: 1.9, z: -0.9 },
        { x: -1.9, z: 0.9 }, { x: 1.9, z: 0.9 }
      ];
      postPositions.forEach(p => {
        const postGeo = new THREE.BoxGeometry(0.2, 3.2, 0.2);
        const post = new THREE.Mesh(postGeo, woodMat);
        post.position.set(p.x, 1.6, p.z);
        post.castShadow = true;
        stallGroup.add(post);
      });

      // Curved Striped Awning Canopy
      const awningGeo = new THREE.BoxGeometry(4.8, 0.4, 2.8);
      const awningMat = new THREE.MeshLambertMaterial({
        map: this.createAwningCanvas(cfg.c1, cfg.c2)
      });
      const awning = new THREE.Mesh(awningGeo, awningMat);
      awning.position.set(0, 3.3, 0.1);
      awning.rotation.x = 0.15;
      awning.castShadow = true;
      stallGroup.add(awning);

      // Warm Festival Paper Lantern
      const lanternGeo = new THREE.SphereGeometry(0.35, 12, 12);
      const lanternMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
      const lantern = new THREE.Mesh(lanternGeo, lanternMat);
      lantern.position.set(0, 2.6, 0.8);
      stallGroup.add(lantern);

      // Lantern sphere is already glowing MeshBasicMaterial

      // Decorative Props on Counter: Crates, bread, barrels
      const crateGeo = new THREE.BoxGeometry(0.8, 0.6, 0.8);
      const crateMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
      const crate1 = new THREE.Mesh(crateGeo, crateMat);
      crate1.position.set(-1.2, 1.35, 0.2);
      crate1.castShadow = true;
      stallGroup.add(crate1);

      const barrelGeo = new THREE.CylinderGeometry(0.5, 0.55, 1.2, 10);
      const barrel = new THREE.Mesh(barrelGeo, crateMat);
      barrel.position.set(2.4, 0.6, 0);
      barrel.castShadow = true;
      stallGroup.add(barrel);

      this.scene.add(stallGroup);
    });

    // Festive Bunting Garland Ribbons strung across the Piazza
    const garlandCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-14, 4.5, 12),
      new THREE.Vector3(-5, 3.8, 8),
      new THREE.Vector3(5, 3.8, 8),
      new THREE.Vector3(14, 4.5, 12)
    ]);
    const garlandGeo = new THREE.TubeGeometry(garlandCurve, 20, 0.05, 6, false);
    const garlandMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const garland = new THREE.Mesh(garlandGeo, garlandMat);
    this.scene.add(garland);
  }

  // ==================== LUMA CANAL & MOONLIT HARBOR PIER ====================
  buildLumaCanalAndPier() {
    const canalGroup = new THREE.Group();
    canalGroup.position.set(34, 0, 0);

    // 1. Canal Waterway (Lowered water plane)
    const waterGeo = new THREE.PlaneGeometry(24, 90);
    const waterMat = new THREE.MeshLambertMaterial({
      map: this.createWaterCanvas(),
      transparent: true,
      opacity: 0.9
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(5, -0.6, 0);
    canalGroup.add(waterMesh);
    this.animatedObjects.push({ type: 'canal_water', mesh: waterMesh });

    // 2. Stone Quay Wall & Promenade Edge
    const quayGeo = new THREE.BoxGeometry(4, 2.5, 90);
    const quayMat = new THREE.MeshLambertMaterial({
      map: this.createMarbleCanvas()
    });
    const quayWall = new THREE.Mesh(quayGeo, quayMat);
    quayWall.position.set(-7, -0.25, 0);
    quayWall.receiveShadow = true;
    quayWall.castShadow = true;
    canalGroup.add(quayWall);

    // Decorative Wrought-Iron Quayside Railing
    for (let rz = -40; rz <= 40; rz += 8) {
      const postGeo = new THREE.CylinderGeometry(0.08, 0.1, 1.2, 8);
      const postMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });
      const post = new THREE.Mesh(postGeo, postMat);
      post.position.set(-5.2, 0.6, rz);
      canalGroup.add(post);

      const railGeo = new THREE.BoxGeometry(0.06, 0.08, 8);
      const rail = new THREE.Mesh(railGeo, postMat);
      rail.position.set(-5.2, 1.1, rz + 4);
      canalGroup.add(rail);
    }

    // 3. Wooden Mooring Dock & Pier (Extending out over water)
    const pierGeo = new THREE.BoxGeometry(10, 0.35, 14);
    const woodMat = new THREE.MeshLambertMaterial({ color: 0x451a03 });
    const pier = new THREE.Mesh(pierGeo, woodMat);
    pier.position.set(0, -0.2, 14);
    pier.receiveShadow = true;
    pier.castShadow = true;
    canalGroup.add(pier);

    // Wooden Pier Support Pilings (In water)
    const pilPositions = [
      { x: -4, z: 8 }, { x: 4, z: 8 },
      { x: -4, z: 20 }, { x: 4, z: 20 }
    ];
    pilPositions.forEach(p => {
      const pilGeo = new THREE.CylinderGeometry(0.25, 0.25, 2.5, 8);
      const pil = new THREE.Mesh(pilGeo, woodMat);
      pil.position.set(p.x, -1.2, p.z);
      canalGroup.add(pil);
    });

    // Nautical Mooring Bollards
    const bollardGeo = new THREE.CylinderGeometry(0.2, 0.25, 0.6, 8);
    const bollardMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
    const bollard1 = new THREE.Mesh(bollardGeo, bollardMat);
    bollard1.position.set(4, 0.2, 9);
    canalGroup.add(bollard1);

    const bollard2 = new THREE.Mesh(bollardGeo, bollardMat);
    bollard2.position.set(4, 0.2, 19);
    canalGroup.add(bollard2);

    // 4. Arched Stone Bridge across Canal (In distant background)
    const bridgeGeo = new THREE.BoxGeometry(22, 5, 8);
    const bridge = new THREE.Mesh(bridgeGeo, quayMat);
    bridge.position.set(6, 1.8, -36);
    bridge.castShadow = true;
    canalGroup.add(bridge);

    const archHoleGeo = new THREE.CylinderGeometry(4.5, 4.5, 9, 16, 1, false, 0, Math.PI);
    archHoleGeo.rotateZ(Math.PI / 2);
    // Visual arch cutout effect
    const archLipGeo = new THREE.TorusGeometry(4.5, 0.4, 8, 16, Math.PI);
    const archLip = new THREE.Mesh(archLipGeo, quayMat);
    archLip.position.set(6, -0.6, -32);
    canalGroup.add(archLip);

    this.scene.add(canalGroup);
  }

  // ==================== TOWNHOUSES & CLOCK TOWER ====================
  buildHistoricTownhousesAndClockTower() {
    // 1. Gothic Historic Clock Tower (West Plaza)
    const towerGroup = new THREE.Group();
    towerGroup.position.set(-24, 0, -5);

    // Tower Base
    const towerBaseGeo = new THREE.BoxGeometry(7, 24, 7);
    const towerMat = new THREE.MeshLambertMaterial({
      map: this.createMarbleCanvas()
    });
    const towerBase = new THREE.Mesh(towerBaseGeo, towerMat);
    towerBase.position.y = 12;
    towerBase.castShadow = true;
    towerBase.receiveShadow = true;
    towerGroup.add(towerBase);

    // Illuminated Clock Face (Four sides)
    const clockCanvas = this.createClockCanvas();
    const clockMat = new THREE.MeshBasicMaterial({ map: clockCanvas });

    const clockDirections = [
      { x: 0, z: 3.52, ry: 0 },
      { x: 3.52, z: 0, ry: Math.PI / 2 },
      { x: 0, z: -3.52, ry: Math.PI },
      { x: -3.52, z: 0, ry: -Math.PI / 2 }
    ];
    clockDirections.forEach(cd => {
      const clockGeo = new THREE.PlaneGeometry(3.4, 3.4);
      const clockMesh = new THREE.Mesh(clockGeo, clockMat);
      clockMesh.position.set(cd.x, 20, cd.z);
      clockMesh.rotation.y = cd.ry;
      towerGroup.add(clockMesh);
    });

    // Clock Glow Light
    const clockLight = new THREE.PointLight(0xfef08a, 1.5, 12);
    clockLight.position.set(0, 20, 0);
    towerGroup.add(clockLight);

    // Spire Roof
    const towerSpireGeo = new THREE.ConeGeometry(4.5, 8, 4);
    towerSpireGeo.rotateY(Math.PI * 0.25);
    const spireMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });
    const towerSpire = new THREE.Mesh(towerSpireGeo, spireMat);
    towerSpire.position.y = 28;
    towerGroup.add(towerSpire);

    this.scene.add(towerGroup);

    // 2. Historic Multi-Story Townhouses Surrounding Piazza
    const houseConfigs = [
      // North-West Street Townhouses
      { x: -28, z: 16, w: 10, h: 14, d: 8, col: '#1e293b', glow: '#fde047', rotY: 0.1 },
      { x: -26, z: 28, w: 9, h: 12, d: 8, col: '#0f172a', glow: '#fef08a', rotY: 0 },
      // South Perimeter Townhouses
      { x: -14, z: 34, w: 12, h: 13, d: 8, col: '#334155', glow: '#facc15', rotY: -Math.PI * 0.45 },
      { x: 4, z: 34, w: 11, h: 15, d: 8, col: '#1e293b', glow: '#fef08a', rotY: -Math.PI * 0.5 },
      { x: 18, z: 30, w: 10, h: 12, d: 8, col: '#0f172a', glow: '#fed7aa', rotY: -Math.PI * 0.6 }
    ];

    houseConfigs.forEach(h => {
      const houseGroup = new THREE.Group();
      houseGroup.position.set(h.x, 0, h.z);
      houseGroup.rotation.y = h.rotY;

      // House Body with Window Texture
      const bodyGeo = new THREE.BoxGeometry(h.w, h.h, h.d);
      const facadeTex = this.createBuildingFacadeCanvas(h.col, h.glow);
      const bodyMat = new THREE.MeshLambertMaterial({
        map: facadeTex
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = h.h * 0.5;
      body.castShadow = true;
      body.receiveShadow = true;
      houseGroup.add(body);

      // Pitched Tiled Roof
      const roofGeo = new THREE.ConeGeometry(h.w * 0.75, 4.5, 4);
      roofGeo.rotateY(Math.PI * 0.25);
      const roofMat = new THREE.MeshLambertMaterial({ color: 0x450a0a });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = h.h + 2.25;
      roof.scale.set(1, 1, h.d / h.w);
      houseGroup.add(roof);

      // Stone Chimney
      const chimGeo = new THREE.BoxGeometry(1.2, 3, 1.2);
      const chim = new THREE.Mesh(chimGeo, roofMat);
      chim.position.set(h.w * 0.25, h.h + 3, 0);
      houseGroup.add(chim);

      this.scene.add(houseGroup);
    });
  }

  // ==================== STREETLAMPS & FOLIAGE ====================
  buildLandscapingAndStreetlamps() {
    // 1. Victorian Gas Streetlamps (Warm pools of light on cobblestone)
    const lampPositions = [
      // Museum Terrace Stairs
      { x: -9, z: -20 }, { x: 9, z: -20 },
      // Central Piazza
      { x: -10, z: -4 }, { x: 10, z: -4 },
      { x: -11, z: 16 }, { x: 11, z: 16 },
      // Canal Quayside
      { x: 26, z: -16 }, { x: 26, z: 0 }, { x: 26, z: 18 }
    ];

    lampPositions.forEach(lp => {
      const lampGroup = new THREE.Group();
      lampGroup.position.set(lp.x, 0, lp.z);

      const metalMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });

      // Post
      const postGeo = new THREE.CylinderGeometry(0.12, 0.2, 4.2, 8);
      const post = new THREE.Mesh(postGeo, metalMat);
      post.position.y = 2.1;
      post.castShadow = true;
      lampGroup.add(post);

      // Lantern Glass Head
      const headGeo = new THREE.CylinderGeometry(0.4, 0.25, 0.7, 6);
      const headMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 4.3;
      lampGroup.add(head);

      // Light Cap
      const capGeo = new THREE.ConeGeometry(0.55, 0.4, 6);
      const cap = new THREE.Mesh(capGeo, metalMat);
      cap.position.y = 4.8;
      lampGroup.add(cap);

      // Glowing glass head already acts as visual light source
      this.scene.add(lampGroup);
    });

    // 2. Stylized Street Trees with Foliage
    const treePositions = [
      { x: -16, z: -12 }, { x: 16, z: -12 },
      { x: -22, z: 6 }, { x: -6, z: 22 }, { x: 8, z: 22 }
    ];

    treePositions.forEach(tp => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(tp.x, 0, tp.z);

      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.3, 0.45, 3.5, 8);
      const trunkMat = new THREE.MeshLambertMaterial({ color: 0x451a03 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 1.75;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Lush Autumn/City Canopy (Multi-spheres)
      const foliageMat = new THREE.MeshLambertMaterial({ color: 0x15803d });
      const mainFoliage = new THREE.Mesh(new THREE.SphereGeometry(2.2, 8, 8), foliageMat);
      mainFoliage.position.y = 4.5;
      mainFoliage.castShadow = true;
      treeGroup.add(mainFoliage);

      const topFoliage = new THREE.Mesh(new THREE.SphereGeometry(1.6, 8, 8), foliageMat);
      topFoliage.position.set(0.4, 5.8, -0.2);
      treeGroup.add(topFoliage);

      this.scene.add(treeGroup);
    });
  }

  // ==================== 10 CITIZENS & SUSPECTS 3D ROBLOX AVATARS ====================
  buildCharacterStandees() {
    this.characterMeshes = [];

    this.characters.forEach(char => {
      const charGroup = new THREE.Group();
      charGroup.position.set(char.pos3D.x, char.pos3D.y, char.pos3D.z);
      charGroup.userData = { id: char.id, character: char };

      const isSolved = !!this.alibisCollected[char.id];

      // 1. Glowing Pedestal Base
      const ringColor = isSolved ? 0x10b981 : (char.isSuspect ? 0xa855f7 : 0x06b6d4);
      const pedGeo = new THREE.CylinderGeometry(1.25, 1.4, 0.25, 24);
      const pedMat = new THREE.MeshLambertMaterial({
        color: ringColor,
        emissive: ringColor,
        emissiveIntensity: 0.35
      });
      const pedestal = new THREE.Mesh(pedGeo, pedMat);
      pedestal.position.y = 0.12;
      pedestal.castShadow = true;
      pedestal.receiveShadow = true;
      charGroup.add(pedestal);
      charGroup.userData.pedestalMesh = pedestal;

      // 2. Full 3D Roblox Avatar Humanoid
      const avatarMesh = this.buildSuspectRobloxAvatar(char, isSolved);
      charGroup.add(avatarMesh);
      charGroup.userData.avatarMesh = avatarMesh;

      // 3. 3D Floating Nameplate Canvas Badge (Elevated to 4.3m so it floats cleanly above hair/head at 3.55m)
      const nameplateMesh = this.createNameplateMesh(char, isSolved);
      nameplateMesh.position.set(0, 4.3, 0);
      charGroup.add(nameplateMesh);
      charGroup.userData.nameplateMesh = nameplateMesh;

      // (Black billboard box removed per player request - suspects clearly marked by nameplate & pedestal)
      charGroup.userData.photoGroup = null;

      this.scene.add(charGroup);
      this.characterMeshes.push(charGroup);
    });
  }

  // Builds a complete, high-fidelity 3D Roblox avatar matching the suspect's official avatar photo
  buildSuspectRobloxAvatar(char, isSolved) {
    const avatarGroup = new THREE.Group();
    avatarGroup.position.y = 0.25; // Stands on top of the pedestal

    const configs = {
      maya: {
        coatColor: 0x381254, // Deep violet scholar robe
        trimColor: 0xeab308, // Gold clasps & accents
        pantsColor: 0x18181b, // Charcoal slacks
        hairColor: 0x1e1528, // Dark violet/plum wavy hair
        hatColor: 0x581c87,  // Violet tilted beret
        skinColor: 0xfed7aa,
        hatType: 'beret',
        hasGlasses: true,
        glassesColor: 0xd4af37,
        faceExpr: 'cunning',
        cutout: 'assets/suspects/maya_avatar_cutout.png',
        avatarPhoto: 'assets/suspects/maya_avatar.png'
      },
      elias: {
        coatColor: 0xf8fafc, // Ivory white curator coat
        trimColor: 0xeab308, // Gold epaulets & buttons
        vestColor: 0x4a044e, // Deep purple scholar vest
        pantsColor: 0x0f172a, // Black slacks
        hairColor: 0xd1d5db, // Silver layered hair
        skinColor: 0xfed7aa,
        hatType: 'scholar',
        hasMonocle: true,
        glassesColor: 0xeab308,
        faceExpr: 'wise',
        cutout: 'assets/suspects/elias_avatar_cutout.png',
        avatarPhoto: 'assets/suspects/elias_avatar.png'
      },
      lina: {
        coatColor: 0x4c1d95, // Royal amethyst archivist dress
        trimColor: 0xffffff, // White lace collar
        pantsColor: 0x3b0764, // Deep violet skirt
        hairColor: 0x5c3826, // Chestnut brown hair
        hatColor: 0xffffff,  // White silk ribbon bow
        skinColor: 0xfed7aa,
        hatType: 'ribbon_bow',
        faceExpr: 'sweet',
        cutout: 'assets/suspects/lina_avatar_cutout.png',
        avatarPhoto: 'assets/suspects/lina_avatar.png'
      },
      chen: {
        coatColor: 0x166534, // Forest green night watch tunic
        trimColor: 0xeab308, // Gold security badge
        pantsColor: 0x0f172a, // Dark security trousers
        hairColor: 0x3e2723, // Dark brown hair
        hatColor: 0xd97706,  // Straw sunhat
        skinColor: 0xfed7aa,
        hatType: 'straw_hat',
        hasBadge: true,
        faceExpr: 'vigilant',
        cutout: 'assets/suspects/chen_avatar_cutout.png',
        avatarPhoto: 'assets/suspects/chen_avatar.png'
      },
      rex: {
        coatColor: 0x1e1b4b, // Midnight navy tech hoodie
        trimColor: 0x4338ca, // Purple highlights
        accentColor: 0xf59e0b,// Hazard gold zipper
        pantsColor: 0x1f2937, // Cargo work pants
        hairColor: 0xb91c1c, // Spiky crimson red hair
        skinColor: 0xfed7aa,
        hatType: 'headphones',
        headphonesColor: 0x2563eb,
        faceExpr: 'smirk',
        cutout: 'assets/suspects/rex_avatar_cutout.png',
        avatarPhoto: 'assets/suspects/rex_avatar.png'
      },
      sora: {
        coatColor: 0xf59e0b, // Sunburst yellow hoodie
        trimColor: 0x1e293b, // Navy photographer vest
        pantsColor: 0x0f172a, // Dark sports shorts
        hairColor: 0xec4899, // Anime pink twin-tails
        hatColor: 0x1e3a8a,  // Navy cap with star
        skinColor: 0xfed7aa,
        hatType: 'baseball_cap',
        hasCamera: true,
        faceExpr: 'wink',
        cutout: 'assets/suspects/sora_avatar_cutout.png',
        avatarPhoto: 'assets/suspects/sora_avatar.png'
      },
      tessa: {
        coatColor: 0xfef3c7, // Cream baker blouse
        trimColor: 0x78350f, // Warm coffee-brown apron
        pantsColor: 0x451a03, // Rustic brown skirt
        hairColor: 0x653b24, // Warm chocolate brown curly hair
        hatColor: 0xffffff,  // White baker bandana headband
        skinColor: 0xfed7aa,
        hatType: 'bandana',
        faceExpr: 'baker_smile',
        cutout: 'assets/suspects/tessa_avatar_cutout.png',
        avatarPhoto: 'assets/suspects/tessa_avatar.png'
      },
      adrian: {
        coatColor: 0x1e293b, // Tailored dark charcoal frock coat
        trimColor: 0x881337, // Burgundy velvet waistcoat
        pantsColor: 0x0f172a, // Charcoal pinstripe slacks
        hairColor: 0x94a3b8, // Sleek swept silver-slate hair
        skinColor: 0xfed7aa,
        hatType: 'cane',
        hasGlasses: true,
        glassesColor: 0xd4af37,
        faceExpr: 'aristocrat',
        cutout: 'assets/suspects/adrian_avatar_cutout.png',
        avatarPhoto: 'assets/suspects/adrian_avatar.png'
      },
      kaelen: {
        coatColor: 0x92400e, // Rugged cognac leather vest
        trimColor: 0xf5f5f4, // Off-white rolled-sleeve sailor shirt
        pantsColor: 0x292524, // Canvas boatman trousers
        hairColor: 0x271c19, // Dark wavy sailor curls
        hatColor: 0x78350f,  // Brown newsboy flat cap
        skinColor: 0xfed7aa,
        hatType: 'newsboy',
        faceExpr: 'sailor',
        cutout: 'assets/suspects/kaelen_avatar_cutout.png',
        avatarPhoto: 'assets/suspects/kaelen_avatar.png'
      },
      mira: {
        coatColor: 0xffffff, // White crisp blouse
        trimColor: 0x451a03, // Espresso historian apron
        pantsColor: 0x261208, // Mahogany historian skirt
        hairColor: 0x5c3826, // Brunette curls
        hatColor: 0xf8fafc,  // White embroidered headband
        skinColor: 0xfed7aa,
        hatType: 'headband',
        hasBook: true,
        faceExpr: 'gentle',
        cutout: 'assets/suspects/mira_avatar_cutout.png',
        avatarPhoto: 'assets/suspects/mira_avatar.png'
      }
    };

    const cfg = configs[char.id] || configs.maya;

    const skinMat = new THREE.MeshLambertMaterial({ color: cfg.skinColor || 0xfed7aa });
    const coatMat = new THREE.MeshLambertMaterial({ color: cfg.coatColor });
    const trimMat = new THREE.MeshLambertMaterial({ color: cfg.trimColor || cfg.coatColor });
    const pantsMat = new THREE.MeshLambertMaterial({ color: cfg.pantsColor });
    const hairMat = new THREE.MeshLambertMaterial({ color: cfg.hairColor });
    const goldMat = new THREE.MeshLambertMaterial({ color: 0xfbbf24, emissive: 0xb45309, emissiveIntensity: 0.25 });

    // 1. Classic Roblox Blocky Legs (0.44 x 1.10 x 0.44)
    const legGeo = new THREE.BoxGeometry(0.44, 1.10, 0.44);
    const leftLeg = new THREE.Mesh(legGeo, pantsMat);
    leftLeg.position.set(-0.24, 0.55, 0);
    leftLeg.castShadow = true;
    leftLeg.receiveShadow = true;
    avatarGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, pantsMat);
    rightLeg.position.set(0.24, 0.55, 0);
    rightLeg.castShadow = true;
    rightLeg.receiveShadow = true;
    avatarGroup.add(rightLeg);

    // 2. Classic Roblox Blocky Torso (0.92 x 1.12 x 0.50)
    const torsoGeo = new THREE.BoxGeometry(0.92, 1.12, 0.50);
    const torso = new THREE.Mesh(torsoGeo, coatMat);
    torso.position.y = 1.66;
    torso.castShadow = true;
    torso.receiveShadow = true;
    avatarGroup.add(torso);

    // Accent Collar / Trim Mesh
    const collarGeo = new THREE.BoxGeometry(0.72, 0.18, 0.54);
    const collar = new THREE.Mesh(collarGeo, trimMat);
    collar.position.y = 2.18;
    avatarGroup.add(collar);

    // 3. Classic Roblox Blocky Head (Cube 0.72 x 0.72 x 0.72)
    const headGeo = new THREE.BoxGeometry(0.72, 0.72, 0.72);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 2.58;
    head.castShadow = true;
    avatarGroup.add(head);

    // Expressive Roblox Anime Face on Front of Head Cube
    const faceGeo = new THREE.PlaneGeometry(0.70, 0.70);
    const faceTex = this.createRobloxAnimeFaceCanvas(cfg.faceExpr || 'smile');
    const faceMat = new THREE.MeshLambertMaterial({
      map: faceTex,
      transparent: true,
      polygonOffset: true,
      polygonOffsetFactor: -1
    });
    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    faceMesh.position.set(0, 2.58, 0.365);
    avatarGroup.add(faceMesh);

    // 4. Hair & Hats / Headwear
    const hairTopGeo = new THREE.BoxGeometry(0.78, 0.22, 0.78);
    const hairTop = new THREE.Mesh(hairTopGeo, hairMat);
    hairTop.position.set(0, 2.92, -0.02);
    avatarGroup.add(hairTop);

    const sideHairGeo = new THREE.BoxGeometry(0.14, 0.48, 0.70);
    const leftHair = new THREE.Mesh(sideHairGeo, hairMat);
    leftHair.position.set(-0.38, 2.62, 0);
    avatarGroup.add(leftHair);

    const rightHair = new THREE.Mesh(sideHairGeo, hairMat);
    rightHair.position.set(0.38, 2.62, 0);
    avatarGroup.add(rightHair);

    const backHairGeo = new THREE.BoxGeometry(0.76, 0.48, 0.14);
    const backHair = new THREE.Mesh(backHairGeo, hairMat);
    backHair.position.set(0, 2.62, -0.36);
    avatarGroup.add(backHair);

    // Custom Headwear
    if (cfg.hatType === 'beret') {
      const beretMat = new THREE.MeshLambertMaterial({ color: cfg.hatColor });
      const beretGeo = new THREE.CylinderGeometry(0.48, 0.54, 0.16, 16);
      const beret = new THREE.Mesh(beretGeo, beretMat);
      beret.position.set(0.06, 3.02, 0.02);
      beret.rotation.z = -0.22;
      beret.rotation.x = 0.1;
      avatarGroup.add(beret);
    } else if (cfg.hatType === 'straw_hat') {
      const strawMat = new THREE.MeshLambertMaterial({ color: cfg.hatColor });
      const brimGeo = new THREE.CylinderGeometry(0.68, 0.72, 0.06, 16);
      const brim = new THREE.Mesh(brimGeo, strawMat);
      brim.position.y = 2.96;
      avatarGroup.add(brim);
      const domeGeo = new THREE.ConeGeometry(0.42, 0.28, 16);
      const dome = new THREE.Mesh(domeGeo, strawMat);
      dome.position.y = 3.12;
      avatarGroup.add(dome);
    } else if (cfg.hatType === 'baseball_cap') {
      const capMat = new THREE.MeshLambertMaterial({ color: cfg.hatColor });
      const capGeo = new THREE.BoxGeometry(0.82, 0.22, 0.82);
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.y = 2.96;
      avatarGroup.add(cap);
      const visorGeo = new THREE.BoxGeometry(0.86, 0.06, 0.38);
      const visor = new THREE.Mesh(visorGeo, capMat);
      visor.position.set(0, 2.88, 0.46);
      avatarGroup.add(visor);
    } else if (cfg.hatType === 'newsboy') {
      const capMat = new THREE.MeshLambertMaterial({ color: cfg.hatColor });
      const capGeo = new THREE.BoxGeometry(0.82, 0.20, 0.82);
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.y = 2.96;
      avatarGroup.add(cap);
      const visorGeo = new THREE.BoxGeometry(0.80, 0.05, 0.32);
      const visor = new THREE.Mesh(visorGeo, capMat);
      visor.position.set(0, 2.88, 0.42);
      avatarGroup.add(visor);
    } else if (cfg.hatType === 'ribbon_bow') {
      const bowMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
      const bowGeo = new THREE.BoxGeometry(0.42, 0.16, 0.16);
      const bow = new THREE.Mesh(bowGeo, bowMat);
      bow.position.set(0, 3.02, 0.1);
      avatarGroup.add(bow);
    } else if (cfg.hatType === 'bandana' || cfg.hatType === 'headband') {
      const bandMat = new THREE.MeshLambertMaterial({ color: cfg.hatColor || 0xffffff });
      const bandGeo = new THREE.BoxGeometry(0.82, 0.14, 0.82);
      const band = new THREE.Mesh(bandGeo, bandMat);
      band.position.y = 2.84;
      avatarGroup.add(band);
    }

    // Glasses / Monocle
    if (cfg.hasGlasses) {
      const gMat = new THREE.MeshLambertMaterial({ color: cfg.glassesColor || 0xd4af37 });
      const rimGeo = new THREE.BoxGeometry(0.24, 0.18, 0.04);
      const gLeft = new THREE.Mesh(rimGeo, gMat);
      gLeft.position.set(-0.16, 2.58, 0.38);
      avatarGroup.add(gLeft);
      const gRight = new THREE.Mesh(rimGeo, gMat);
      gRight.position.set(0.16, 2.58, 0.38);
      avatarGroup.add(gRight);
      const bridgeGeo = new THREE.BoxGeometry(0.12, 0.04, 0.04);
      const bridge = new THREE.Mesh(bridgeGeo, gMat);
      bridge.position.set(0, 2.60, 0.38);
      avatarGroup.add(bridge);
    } else if (cfg.hasMonocle) {
      const mMat = new THREE.MeshLambertMaterial({ color: 0xeab308 });
      const mGeo = new THREE.BoxGeometry(0.24, 0.24, 0.04);
      const mono = new THREE.Mesh(mGeo, mMat);
      mono.position.set(0.16, 2.60, 0.38);
      avatarGroup.add(mono);
    }

    // 5. Classic Roblox Blocky Arms
    const armGeo = new THREE.BoxGeometry(0.42, 1.08, 0.42);
    armGeo.translate(0, -0.48, 0);

    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.68, 2.14, 0);
    const leftArm = new THREE.Mesh(armGeo, coatMat);
    leftArm.castShadow = true;
    leftArmGroup.add(leftArm);
    avatarGroup.add(leftArmGroup);
    avatarGroup.userData.leftArm = leftArmGroup;

    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.68, 2.14, 0);
    const rightArm = new THREE.Mesh(armGeo, coatMat);
    rightArm.castShadow = true;
    rightArmGroup.add(rightArm);
    avatarGroup.add(rightArmGroup);
    avatarGroup.userData.rightArm = rightArmGroup;

    // 6. Seamless Integration of Official 3D Roblox Avatar Artwork
    const texLoader = new THREE.TextureLoader();
    const cutoutUrl = cfg.cutout || ('assets/suspects/' + char.id + '_avatar_cutout.png');
    texLoader.load(cutoutUrl, (tex) => {
      tex.generateMipmaps = true;
      const cutoutGeo = new THREE.PlaneGeometry(1.75, 2.55);
      const cutoutMat = new THREE.MeshLambertMaterial({
        map: tex,
        transparent: true,
        alphaTest: 0.08,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      const cutoutMesh = new THREE.Mesh(cutoutGeo, cutoutMat);
      cutoutMesh.position.set(0, 1.45, 0.32);
      cutoutMesh.castShadow = true;
      avatarGroup.add(cutoutMesh);
      avatarGroup.userData.cutoutMesh = cutoutMesh;
    });

    return avatarGroup;
  }

  // Generates 3D floating canvas nameplate above character
  createNameplateMesh(char, isSolved) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 72;
    const ctx = canvas.getContext('2d');

    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));

    // Dark badge background
    ctx.fillStyle = 'rgba(10, 15, 29, 0.9)';
    ctx.roundRect ? ctx.roundRect(4, 4, 248, 64, 12) : ctx.rect(4, 4, 248, 64);
    ctx.fill();

    // Border
    ctx.strokeStyle = isSolved ? '#10b981' : (char.isSuspect ? '#a855f7' : '#06b6d4');
    ctx.lineWidth = 3;
    ctx.stroke();

    // Name text
    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(char.name, 128, 30);

    // Role / Status subtext
    ctx.font = 'bold 13px monospace';
    ctx.fillStyle = isSolved ? '#34d399' : '#f59e0b';
    const sub = isSolved ? (isBm ? '✓ ALIBI DISAHKAN' : '✓ ALIBI RECORDED') : (isBm ? (char.roleBm || char.role) : char.role);
    ctx.fillText(sub, 128, 54);

    const texture = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(2.4, 0.7, 1);
    return sprite;
  }

  // Generates 2D anime photo billboard floating above character
  createPhotoBillboardGroup(char, isSolved) {
    const group = new THREE.Group();

    // 1. Glowing Outer Border Frame
    const borderColor = isSolved ? 0x10b981 : (char.isSuspect ? 0xa855f7 : 0x06b6d4);
    const borderGeo = new THREE.PlaneGeometry(0.96, 0.96);
    const borderMat = new THREE.MeshBasicMaterial({
      color: borderColor,
      side: THREE.DoubleSide
    });
    const borderMesh = new THREE.Mesh(borderGeo, borderMat);
    group.add(borderMesh);
    group.userData.borderMesh = borderMesh;

    // 2. Card Dark Background Backing
    const backGeo = new THREE.PlaneGeometry(0.92, 0.92);
    const backMat = new THREE.MeshBasicMaterial({
      color: 0x090d16,
      side: THREE.DoubleSide
    });
    const backMesh = new THREE.Mesh(backGeo, backMat);
    backMesh.position.z = 0.005;
    group.add(backMesh);

    // 3. 2D Anime Portrait Image Plane
    const photoGeo = new THREE.PlaneGeometry(0.88, 0.88);
    const texture = new THREE.TextureLoader().load(char.illustratedCard || char.avatar);
    texture.colorSpace = THREE.SRGBColorSpace;
    const photoMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    const photoMesh = new THREE.Mesh(photoGeo, photoMat);
    photoMesh.position.z = 0.01;
    group.add(photoMesh);
    group.userData.photoMesh = photoMesh;

    // 4. Floating Status Badge Sprite on top of photo card
    const statusSprite = this.createPhotoStatusSprite(char, isSolved);
    statusSprite.position.set(0, 0.58, 0.02);
    group.add(statusSprite);
    group.userData.statusSprite = statusSprite;

    return group;
  }

  // Creates floating status pill above 2D photo (e.g. [✓ INTERVIEWED] or [SUSPECT])
  createPhotoStatusSprite(char, isSolved) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));

    if (isSolved) {
      // Emerald Glowing Badge
      ctx.fillStyle = 'rgba(6, 78, 59, 0.95)';
      ctx.roundRect ? ctx.roundRect(8, 8, 240, 48, 12) : ctx.fillRect(8, 8, 240, 48);
      ctx.fill();
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.font = 'bold 22px sans-serif';
      ctx.fillStyle = '#6ee7b7';
      ctx.textAlign = 'center';
      ctx.fillText(isBm ? '✓ TELAH DITEMUDUGA' : '✓ INTERVIEWED', 128, 40);
    } else {
      // Pending Status Badge
      ctx.fillStyle = char.isSuspect ? 'rgba(88, 28, 135, 0.92)' : 'rgba(14, 116, 144, 0.92)';
      ctx.roundRect ? ctx.roundRect(8, 8, 240, 48, 12) : ctx.fillRect(8, 8, 240, 48);
      ctx.fill();
      ctx.strokeStyle = char.isSuspect ? '#c084fc' : '#22d3ee';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.font = 'bold 20px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      const label = char.isSuspect ? (isBm ? '🔍 SUSPEK' : '🔍 SUSPECT') : (isBm ? '👁️ SAKSI' : '👁️ WITNESS');
      ctx.fillText(label, 128, 39);
    }

    const texture = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(1.05, 0.26, 1);
    return sprite;
  }

  // Updates all 2D photos and nameplates to face the camera smoothly every frame
  updateCharacterBillboards() {
    if (!this.characterMeshes || !this.camera) return;
    for (let i = 0; i < this.characterMeshes.length; i++) {
      const charGroup = this.characterMeshes[i];
      if (charGroup.userData.photoGroup) {
        charGroup.userData.photoGroup.quaternion.copy(this.camera.quaternion);
      }
      if (charGroup.userData.nameplateMesh) {
        charGroup.userData.nameplateMesh.quaternion.copy(this.camera.quaternion);
      }
    }
  }

  // ==================== ROBLOX ANIME FACE DECAL & EYE GENERATORS ====================
  createRobloxAnimeFaceCanvas(expression) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Peach skin background for full blocky face decal
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(0, 0, 256, 256);

    // Cute Anime Blush on Cheeks
    ctx.fillStyle = 'rgba(244, 63, 94, 0.42)';
    ctx.beginPath();
    ctx.ellipse(52, 160, 26, 14, 0, 0, Math.PI * 2);
    ctx.ellipse(204, 160, 26, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Classic 3 anime blush tick marks
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 2.5;
    [-8, 0, 8].forEach(dx => {
      ctx.beginPath();
      ctx.moveTo(52 + dx - 4, 165);
      ctx.lineTo(52 + dx + 4, 153);
      ctx.moveTo(204 + dx - 4, 165);
      ctx.lineTo(204 + dx + 4, 153);
      ctx.stroke();
    });

    // Large Roblox Anime Eyes (Left & Right)
    const eyeY = 120;
    const eyeH = 34;
    const eyeW = 26;
    this.drawRobloxAnimeEye(ctx, 74, eyeY, eyeW, eyeH, expression);
    this.drawRobloxAnimeEye(ctx, 182, eyeY, eyeW, eyeH, expression);

    // Expressive Roblox Anime Eyebrows
    ctx.strokeStyle = '#271004';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    if (expression === 'detective' || expression === 'confident') {
      // Left Eyebrow (Sharp determined slant)
      ctx.beginPath();
      ctx.moveTo(48, 80);
      ctx.quadraticCurveTo(74, 66, 102, 76);
      ctx.stroke();
      // Right Eyebrow (Slight arch)
      ctx.beginPath();
      ctx.moveTo(154, 76);
      ctx.quadraticCurveTo(182, 66, 208, 80);
      ctx.stroke();
    } else {
      // Cheerful / Friendly Eyebrows
      ctx.beginPath();
      ctx.moveTo(50, 78);
      ctx.quadraticCurveTo(74, 68, 98, 78);
      ctx.moveTo(158, 78);
      ctx.quadraticCurveTo(182, 68, 206, 78);
      ctx.stroke();
    }

    // Small Anime Nose Mark
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(128, 156, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Roblox Anime Mouth
    ctx.strokeStyle = '#3b1803';
    ctx.lineWidth = 4.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    if (expression === 'detective') {
      // Confident detective smirk
      ctx.moveTo(110, 186);
      ctx.quadraticCurveTo(128, 200, 152, 184);
    } else if (expression === 'smile') {
      // Open anime smile
      ctx.moveTo(110, 182);
      ctx.quadraticCurveTo(128, 204, 146, 182);
    } else {
      // Curious smile
      ctx.moveTo(112, 184);
      ctx.quadraticCurveTo(128, 196, 144, 184);
    }
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  }

  drawRobloxAnimeEye(ctx, cx, cy, rw, rh, expr) {
    // Sclera White
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(cx, cy, rw, rh, 0, 0, Math.PI * 2);
    ctx.fill();

    // Thick Upper Anime Eyelash
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(cx, cy - 3, rw + 2, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();

    // Iris Gradient (Warm Honey Amber for Gio, or Violet/Blue for crowd)
    const irisGrad = ctx.createLinearGradient(cx, cy - rh * 0.7, cx, cy + rh * 0.7);
    irisGrad.addColorStop(0, '#260e03');
    irisGrad.addColorStop(0.45, '#9a3412');
    irisGrad.addColorStop(1, '#f59e0b');
    ctx.fillStyle = irisGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 2, rw * 0.82, rh * 0.88, 0, 0, Math.PI * 2);
    ctx.fill();

    // Dark Pupil
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 2, rw * 0.44, rh * 0.48, 0, 0, Math.PI * 2);
    ctx.fill();

    // Big Roblox Sparkle Highlights
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx - rw * 0.32, cy - rh * 0.35, rw * 0.32, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + rw * 0.3, cy + rh * 0.28, rw * 0.18, 0, Math.PI * 2);
    ctx.fill();
  }
  // ==================== PLAYER IDENTITY & OVERHEAD USERNAME ====================
  getPlayerName() {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('gestigo_player_name') || localStorage.getItem('gestigo_username');
      if (saved && saved.trim()) return saved.trim();
    }
    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));
    return isBm ? 'PEMAIN (ANDA)' : 'PLAYER (YOU)';
  }

  setPlayerName(newName) {
    if (!newName || !newName.trim()) return;
    const clean = newName.trim().slice(0, 24);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('gestigo_player_name', clean);
    }
    this.syncPlayerNameUI();
    this.updatePlayerOverheadBadge();
  }

  promptChangePlayerName() {
    const current = this.getPlayerName();
    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));
    const promptMsg = isBm 
      ? 'Masukkan nama atau username detektif anda:' 
      : 'Enter your detective username:';
    const defaultVal = (current === 'PLAYER (YOU)' || current === 'PEMAIN (ANDA)') ? '' : current;
    const result = prompt(promptMsg, defaultVal);
    if (result !== null && result.trim()) {
      this.setPlayerName(result.trim());
    }
  }

  syncPlayerNameUI() {
    const name = this.getPlayerName();
    const displayEl = document.getElementById('luma3dPlayerNameDisplay');
    if (displayEl) {
      displayEl.textContent = name;
    }
  }

  updatePlayerOverheadBadge() {
    if (!this.playerGroup) return;

    if (this.playerBadgeSprite) {
      this.playerGroup.remove(this.playerBadgeSprite);
      if (this.playerBadgeSprite.material) {
        if (this.playerBadgeSprite.material.map) this.playerBadgeSprite.material.map.dispose();
        this.playerBadgeSprite.material.dispose();
      }
      this.playerBadgeSprite = null;
    }

    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));
    const playerName = this.getPlayerName();

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 72;
    const bctx = canvas.getContext('2d');

    // High-tech dark badge background
    bctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
    bctx.roundRect ? bctx.roundRect(4, 4, 248, 64, 14) : bctx.rect(4, 4, 248, 64);
    bctx.fill();

    // Vibrant golden detective border
    bctx.strokeStyle = '#f59e0b';
    bctx.lineWidth = 3.5;
    bctx.stroke();

    // Player Username (Prominent gold text)
    bctx.font = 'bold 20px sans-serif';
    bctx.fillStyle = '#fef08a';
    bctx.textAlign = 'center';
    bctx.fillText(`🕵️ ${playerName.toUpperCase()}`, 128, 28);

    // Player Role / Status
    bctx.font = 'bold 12px monospace';
    bctx.fillStyle = '#38bdf8';
    const subtext = isBm ? '⭐ DETEKTIF UTAMA (PEMAIN)' : '⭐ LEAD DETECTIVE (PLAYER)';
    bctx.fillText(subtext, 128, 52);

    const badgeTex = new THREE.CanvasTexture(canvas);
    const badgeMat = new THREE.SpriteMaterial({ map: badgeTex });
    this.playerBadgeSprite = new THREE.Sprite(badgeMat);
    this.playerBadgeSprite.scale.set(2.6, 0.72, 1);
    this.playerBadgeSprite.position.set(0, 4.3, 0); // Elevated to 4.3m so it floats cleanly above player's fedora at 3.4m
    this.playerGroup.add(this.playerBadgeSprite);
  }

  // ==================== PLAYABLE ROBLOX ANIME DETECTIVE GIO ====================
  buildPlayableDetectiveGio() {
    this.playerGroup = new THREE.Group();
    this.playerGroup.position.copy(this.playerPos);

    // 1. Roblox Materials
    const coatMat = new THREE.MeshLambertMaterial({ color: 0x1e3a8a }); // Navy Detective Coat
    const scarfMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b }); // Amber Scarf
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xfed7aa }); // Peach Anime Skin
    const hatMat = new THREE.MeshLambertMaterial({ color: 0x78350f }); // Tweed Hat
    const hairMat = new THREE.MeshLambertMaterial({ color: 0x451a03 }); // Chestnut Anime Hair
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x0f172a }); // Dark Detective Pants
    const goldMat = new THREE.MeshLambertMaterial({ color: 0xfbbf24 });

    // 2. Roblox Blocky Torso (width: 0.96, height: 1.18, depth: 0.54)
    const torsoGeo = new THREE.BoxGeometry(0.96, 1.18, 0.54);
    const torso = new THREE.Mesh(torsoGeo, coatMat);
    torso.position.y = 1.18;
    torso.castShadow = true;
    torso.receiveShadow = true;
    this.playerGroup.add(torso);

    // Detective Belt with Brass Buckle
    const beltGeo = new THREE.BoxGeometry(1.0, 0.16, 0.58);
    const beltMat = new THREE.MeshLambertMaterial({ color: 0x271406 });
    const belt = new THREE.Mesh(beltGeo, beltMat);
    belt.position.y = 0.82;
    this.playerGroup.add(belt);

    const buckleGeo = new THREE.BoxGeometry(0.24, 0.2, 0.06);
    const buckle = new THREE.Mesh(buckleGeo, goldMat);
    buckle.position.set(0, 0.82, 0.31);
    this.playerGroup.add(buckle);

    // Brass Buttons down Torso
    for (let b = 0; b < 3; b++) {
      const btnGeo = new THREE.BoxGeometry(0.08, 0.08, 0.04);
      const btn = new THREE.Mesh(btnGeo, goldMat);
      btn.position.set(0, 1.45 - b * 0.22, 0.29);
      this.playerGroup.add(btn);
    }

    // Detective Golden Star Shield on Chest
    const starGeo = new THREE.BoxGeometry(0.18, 0.18, 0.04);
    const starMesh = new THREE.Mesh(starGeo, goldMat);
    starMesh.position.set(-0.28, 1.45, 0.29);
    starMesh.rotation.z = Math.PI * 0.25;
    this.playerGroup.add(starMesh);

    // Scarf Collar & Fluttering Scarf Tails
    const collarGeo = new THREE.BoxGeometry(0.72, 0.2, 0.64);
    const collar = new THREE.Mesh(collarGeo, scarfMat);
    collar.position.y = 1.8;
    this.playerGroup.add(collar);

    this.scarfTails = new THREE.Group();
    this.scarfTails.position.set(-0.18, 1.76, -0.34);
    const tailGeo = new THREE.BoxGeometry(0.24, 0.72, 0.05);
    const tailMesh = new THREE.Mesh(tailGeo, scarfMat);
    tailMesh.position.y = -0.34;
    this.scarfTails.add(tailMesh);
    this.playerGroup.add(this.scarfTails);

    // 3. Classic Roblox Blocky Head (Cube: 0.72 x 0.72 x 0.72)
    const headGeo = new THREE.BoxGeometry(0.72, 0.72, 0.72);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 2.12;
    head.castShadow = true;
    this.playerGroup.add(head);

    // Roblox Anime Face Decal on Front of Cube (z = +0.365)
    const faceGeo = new THREE.PlaneGeometry(0.7, 0.7);
    const faceCanvasTex = this.createRobloxAnimeFaceCanvas('detective');
    const faceMat = new THREE.MeshLambertMaterial({
      map: faceCanvasTex,
      transparent: true,
      polygonOffset: true,
      polygonOffsetFactor: -1
    });
    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    faceMesh.position.set(0, 2.12, 0.365);
    this.playerGroup.add(faceMesh);

    // Load official cropped anime face artwork for pixel-perfect sharpness
    const texLoader = new THREE.TextureLoader();
    texLoader.load('assets/gio-face-features.png', (tex) => {
      tex.generateMipmaps = true;
      faceMat.map = tex;
      faceMat.needsUpdate = true;
    });

    // 4. Blocky Anime Hair (Spiky / layered hair blocks on top & sides)
    const hairTopGeo = new THREE.BoxGeometry(0.78, 0.24, 0.78);
    const hairTop = new THREE.Mesh(hairTopGeo, hairMat);
    hairTop.position.set(0, 2.48, -0.02);
    this.playerGroup.add(hairTop);

    // Side hair blocks
    const sideHairGeo = new THREE.BoxGeometry(0.14, 0.48, 0.7);
    const leftHair = new THREE.Mesh(sideHairGeo, hairMat);
    leftHair.position.set(-0.38, 2.18, 0);
    this.playerGroup.add(leftHair);

    const rightHair = new THREE.Mesh(sideHairGeo, hairMat);
    rightHair.position.set(0.38, 2.18, 0);
    this.playerGroup.add(rightHair);

    // Back hair block
    const backHairGeo = new THREE.BoxGeometry(0.76, 0.48, 0.14);
    const backHair = new THREE.Mesh(backHairGeo, hairMat);
    backHair.position.set(0, 2.18, -0.36);
    this.playerGroup.add(backHair);

    // 5. Roblox Blocky Deerstalker Detective Cap
    const hatGeo = new THREE.BoxGeometry(0.86, 0.26, 0.86);
    const hat = new THREE.Mesh(hatGeo, hatMat);
    hat.position.y = 2.58;
    this.playerGroup.add(hat);

    const hatBrimGeo = new THREE.BoxGeometry(0.92, 0.05, 0.34);
    const brimFront = new THREE.Mesh(hatBrimGeo, hatMat);
    brimFront.position.set(0, 2.46, 0.44);
    this.playerGroup.add(brimFront);

    const brimBack = new THREE.Mesh(hatBrimGeo, hatMat);
    brimBack.position.set(0, 2.46, -0.44);
    this.playerGroup.add(brimBack);

    // 6. Classic Roblox Blocky Arms (Pivot at shoulder top)
    const armGeo = new THREE.BoxGeometry(0.44, 1.1, 0.44);
    armGeo.translate(0, -0.48, 0);

    // Left Arm (Swings in classic Roblox stride)
    this.leftArmGroup = new THREE.Group();
    this.leftArmGroup.position.set(-0.72, 1.72, 0);
    const leftArmMesh = new THREE.Mesh(armGeo, coatMat);
    leftArmMesh.castShadow = true;
    this.leftArmGroup.add(leftArmMesh);
    this.playerGroup.add(this.leftArmGroup);

    // Right Arm (Holds Forward Investigation Flashlight)
    this.rightArmGroup = new THREE.Group();
    this.rightArmGroup.position.set(0.72, 1.72, 0);
    const rightArmMesh = new THREE.Mesh(armGeo, coatMat);
    rightArmMesh.castShadow = true;
    this.rightArmGroup.add(rightArmMesh);

    // Brass Flashlight in Right Arm
    const torchGroup = new THREE.Group();
    torchGroup.position.set(0, -0.92, 0.28);
    torchGroup.rotation.x = Math.PI * 0.45;

    const torchBodyGeo = new THREE.BoxGeometry(0.18, 0.38, 0.18);
    const torchBody = new THREE.Mesh(torchBodyGeo, goldMat);
    torchGroup.add(torchBody);

    const torchLensGeo = new THREE.BoxGeometry(0.2, 0.05, 0.2);
    const torchLens = new THREE.Mesh(torchLensGeo, new THREE.MeshBasicMaterial({ color: 0xfef08a }));
    torchLens.position.y = 0.2;
    torchGroup.add(torchLens);

    // Lightweight Cartoon Flashlight Beam Cone (0 GPU Lighting Cost!)
    const beamGeo = new THREE.ConeGeometry(0.75, 6.0, 8, 1, true);
    beamGeo.rotateX(Math.PI / 2);
    beamGeo.translate(0, 0, 3.0);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    torchGroup.add(beamMesh);

    this.rightArmGroup.add(torchGroup);
    this.playerGroup.add(this.rightArmGroup);

    // 7. Classic Roblox Blocky Legs (Pivot at hip top)
    const legGeo = new THREE.BoxGeometry(0.46, 1.18, 0.46);
    legGeo.translate(0, -0.54, 0);

    this.leftLegGroup = new THREE.Group();
    this.leftLegGroup.position.set(-0.25, 0.62, 0);
    const leftLeg = new THREE.Mesh(legGeo, pantsMat);
    leftLeg.castShadow = true;
    this.leftLegGroup.add(leftLeg);
    this.playerGroup.add(this.leftLegGroup);

    this.rightLegGroup = new THREE.Group();
    this.rightLegGroup.position.set(0.25, 0.62, 0);
    const rightLeg = new THREE.Mesh(legGeo, pantsMat);
    rightLeg.castShadow = true;
    this.rightLegGroup.add(rightLeg);
    this.playerGroup.add(this.rightLegGroup);

    // 8. Glowing Golden Detective Aura Pedestal (Beneath Gio's Feet)
    const auraGeo = new THREE.RingGeometry(0.7, 0.95, 24);
    auraGeo.rotateX(-Math.PI / 2);
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide
    });
    this.playerAuraMesh = new THREE.Mesh(auraGeo, auraMat);
    this.playerAuraMesh.position.y = 0.03;
    this.playerGroup.add(this.playerAuraMesh);

    // Detective has forward spotlight and glowing aura disk

    // 9. Floating Player Overhead Nameplate Badge (Displays Player's Username, NOT Gio!)
    this.updatePlayerOverheadBadge();

    this.scene.add(this.playerGroup);
  }

  // ==================== FESTIVAL CROWD, CITIZENS & STREET PERFORMERS ====================
  // ==================== ROBLOX AVATAR CREATOR FOR FESTIVAL CROWD ====================
  createStylizedHumanoid(cfg) {
    const scale = cfg.scale || 1.0;
    const group = new THREE.Group();
    group.scale.set(scale, scale, scale);

    const skinMat = new THREE.MeshLambertMaterial({ color: cfg.skinColor || 0xfed7aa });
    const shirtMat = new THREE.MeshLambertMaterial({ color: cfg.coatColor || 0x059669 });
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });
    const hairMat = new THREE.MeshLambertMaterial({ color: cfg.hatColor || 0x1e293b });
    const hatMat = new THREE.MeshLambertMaterial({ color: cfg.hatColor || 0x1e293b });

    // 1. Blocky Torso (width: 0.9, height: 1.12, depth: 0.5)
    const torsoGeo = new THREE.BoxGeometry(0.9, 1.12, 0.5);
    const torso = new THREE.Mesh(torsoGeo, shirtMat);
    torso.position.y = cfg.isSeated ? 0.68 : 1.12;
    torso.castShadow = true;
    torso.receiveShadow = true;
    group.add(torso);

    if (cfg.scarfColor) {
      const scarfMat = new THREE.MeshLambertMaterial({ color: cfg.scarfColor });
      const collarGeo = new THREE.BoxGeometry(0.68, 0.16, 0.58);
      const collar = new THREE.Mesh(collarGeo, scarfMat);
      collar.position.y = cfg.isSeated ? 1.25 : 1.68;
      group.add(collar);
    }

    // 2. Blocky Head (Cube: 0.68 x 0.68 x 0.68)
    const headGeo = new THREE.BoxGeometry(0.68, 0.68, 0.68);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = cfg.isSeated ? 1.54 : 1.98;
    head.castShadow = true;
    group.add(head);

    // Roblox Anime Face Decal
    const faceGeo = new THREE.PlaneGeometry(0.66, 0.66);
    const faceTex = this.createRobloxAnimeFaceCanvas(cfg.faceExpr || 'smile');
    const faceMat = new THREE.MeshLambertMaterial({
      map: faceTex,
      transparent: true,
      polygonOffset: true,
      polygonOffsetFactor: -1
    });
    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    faceMesh.position.set(0, cfg.isSeated ? 1.54 : 1.98, 0.345);
    group.add(faceMesh);

    // Blocky Hair Layer
    const hairGeo = new THREE.BoxGeometry(0.74, 0.22, 0.74);
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, cfg.isSeated ? 1.86 : 2.3, -0.02);
    group.add(hair);

    // Hat styling
    if (cfg.hatType === 'cap') {
      const capBrimGeo = new THREE.BoxGeometry(0.74, 0.04, 0.3);
      const capBrim = new THREE.Mesh(capBrimGeo, hatMat);
      capBrim.position.set(0, cfg.isSeated ? 1.8 : 2.24, 0.42);
      group.add(capBrim);
    } else if (cfg.hatType === 'beret') {
      const beretGeo = new THREE.CylinderGeometry(0.46, 0.4, 0.14, 12);
      const beret = new THREE.Mesh(beretGeo, hatMat);
      beret.position.set(0.06, cfg.isSeated ? 1.88 : 2.32, 0);
      beret.rotation.z = -0.16;
      group.add(beret);
    }

    // 3. Blocky Arms (Pivot at shoulder top)
    const armGeo = new THREE.BoxGeometry(0.42, 1.02, 0.42);
    armGeo.translate(0, -0.45, 0);

    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.66, cfg.isSeated ? 1.2 : 1.64, 0);
    const leftArm = new THREE.Mesh(armGeo, shirtMat);
    leftArm.castShadow = true;
    leftArmGroup.add(leftArm);
    group.add(leftArmGroup);

    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.66, cfg.isSeated ? 1.2 : 1.64, 0);
    const rightArm = new THREE.Mesh(armGeo, shirtMat);
    rightArm.castShadow = true;
    rightArmGroup.add(rightArm);
    group.add(rightArmGroup);

    // 4. Blocky Legs (Pivot at hip top)
    const legGeo = new THREE.BoxGeometry(0.44, 1.12, 0.44);
    legGeo.translate(0, -0.5, 0);

    const leftLegGroup = new THREE.Group();
    const rightLegGroup = new THREE.Group();

    if (cfg.isSeated) {
      leftLegGroup.position.set(-0.24, 0.64, 0);
      rightLegGroup.position.set(0.24, 0.64, 0);
      leftLegGroup.rotation.x = Math.PI * 0.45;
      rightLegGroup.rotation.x = Math.PI * 0.45;
    } else {
      leftLegGroup.position.set(-0.24, 0.58, 0);
      rightLegGroup.position.set(0.24, 0.58, 0);
    }

    const leftLeg = new THREE.Mesh(legGeo, pantsMat);
    leftLeg.castShadow = true;
    leftLegGroup.add(leftLeg);
    group.add(leftLegGroup);

    const rightLeg = new THREE.Mesh(legGeo, pantsMat);
    rightLeg.castShadow = true;
    rightLegGroup.add(rightLeg);
    group.add(rightLegGroup);

    // Special Props
    if (cfg.prop === 'lantern') {
      const stickGeo = new THREE.BoxGeometry(0.06, 0.8, 0.06);
      const stickMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
      const stick = new THREE.Mesh(stickGeo, stickMat);
      stick.rotation.x = Math.PI * 0.35;
      stick.position.set(0.1, -0.2, 0.25);
      rightArmGroup.add(stick);

      const lanternGeo = new THREE.BoxGeometry(0.3, 0.36, 0.3);
      const lanternMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
      const lantern = new THREE.Mesh(lanternGeo, lanternMat);
      lantern.position.set(0.1, -0.42, 0.55);
      rightArmGroup.add(lantern);

      // Lantern mesh is already luminous
    } else if (cfg.prop === 'balloon') {
      const stringGeo = new THREE.CylinderGeometry(0.012, 0.012, 1.3, 4);
      const stringMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
      const stringMesh = new THREE.Mesh(stringGeo, stringMat);
      stringMesh.position.set(0.1, 0.65, 0.2);
      rightArmGroup.add(stringMesh);

      const balloonGeo = new THREE.BoxGeometry(0.48, 0.48, 0.48);
      const balloonMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
      const balloon = new THREE.Mesh(balloonGeo, balloonMat);
      balloon.position.set(0.1, 1.35, 0.2);
      balloon.rotation.set(0.2, 0.3, 0.1);
      rightArmGroup.add(balloon);
      group.userData.balloonMesh = balloon;
    } else if (cfg.prop === 'bread') {
      const breadGeo = new THREE.BoxGeometry(0.24, 0.18, 0.28);
      const breadMat = new THREE.MeshLambertMaterial({ color: 0xd97706 });
      const bread = new THREE.Mesh(breadGeo, breadMat);
      bread.position.set(0, -0.4, 0.25);
      rightArmGroup.add(bread);
      rightArmGroup.rotation.x = -Math.PI * 0.35;
    } else if (cfg.prop === 'book') {
      const bookGeo = new THREE.BoxGeometry(0.36, 0.08, 0.48);
      const bookMat = new THREE.MeshLambertMaterial({ color: 0x9333ea });
      const book = new THREE.Mesh(bookGeo, bookMat);
      book.position.set(0, -0.38, 0.28);
      rightArmGroup.add(book);
      rightArmGroup.rotation.x = -Math.PI * 0.25;
      leftArmGroup.rotation.x = -Math.PI * 0.25;
    }

    // Floor drop shadow
    const shadowGeo = new THREE.BoxGeometry(1.2, 0.02, 0.9);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.4 });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.position.y = 0.01;
    group.add(shadow);

    group.userData.leftLeg = leftLegGroup;
    group.userData.rightLeg = rightLegGroup;
    group.userData.leftArm = leftArmGroup;
    group.userData.rightArm = rightArmGroup;

    return group;
  }

  buildFestivalCrowdAndPerformers() {
    this.crowdWalkers = [];
    this.crowdVignettes = [];

    // ==================== A. 5 ROAMING / WALKING FESTIVAL CITIZENS ====================
    // Walker 1: The Lantern Stroller (Walking between fountain & bakery)
    const walker1 = this.createStylizedHumanoid({
      coatColor: 0x047857, scarfColor: 0xfde047, hatColor: 0x064e3b, hatType: 'beret', prop: 'lantern'
    });
    walker1.position.set(-6, 0, 7);
    this.scene.add(walker1);
    this.crowdWalkers.push({
      mesh: walker1,
      speed: 2.1,
      walkCycle: 0,
      pauseTimer: 0,
      currentWpIndex: 0,
      waypoints: [
        new THREE.Vector3(-6, 0, 7),
        new THREE.Vector3(-10, 0, 11),
        new THREE.Vector3(-14, 0, 6),
        new THREE.Vector3(-8, 0, 0),
        new THREE.Vector3(5, 0, 6),
        new THREE.Vector3(12, 0, 10),
        new THREE.Vector3(15, 0, 3),
        new THREE.Vector3(5, 0, 1)
      ],
      quote: "🏮 'Happy Festival of Stories! The lanterns look so warm!'"
    });

    // Walker 2 & 3: Festival Couple (Walking Side-by-Side along plaza promenade)
    const walker2 = this.createStylizedHumanoid({
      coatColor: 0x991b1b, scarfColor: 0xfef08a, hatColor: 0x450a0a, hatType: 'cap'
    });
    const walker3 = this.createStylizedHumanoid({
      coatColor: 0x1e3a8a, scarfColor: 0xf59e0b, hatColor: 0x0f172a, hatType: 'hood'
    });
    walker2.position.set(-14, 0, 3);
    walker3.position.set(-15.2, 0, 3.2);
    this.scene.add(walker2);
    this.scene.add(walker3);

    const coupleWaypoints = [
      new THREE.Vector3(-14, 0, 3),
      new THREE.Vector3(-7, 0, -8),
      new THREE.Vector3(0, 0, -12),
      new THREE.Vector3(9, 0, -8),
      new THREE.Vector3(17, 0, -4),
      new THREE.Vector3(15, 0, 5),
      new THREE.Vector3(7, 0, 7),
      new THREE.Vector3(-4, 0, 5)
    ];

    this.crowdWalkers.push({
      mesh: walker2,
      speed: 1.8,
      walkCycle: 0,
      pauseTimer: 0,
      currentWpIndex: 0,
      waypoints: coupleWaypoints,
      quote: "✨ 'The Story Museum facade looks majestic tonight under moonlight!'"
    });

    this.crowdWalkers.push({
      mesh: walker3,
      speed: 1.8,
      walkCycle: 0.3,
      pauseTimer: 0,
      currentWpIndex: 0,
      waypoints: coupleWaypoints.map(p => new THREE.Vector3(p.x - 1.2, p.y, p.z + 0.2)),
      quote: "✨ 'I hope they reopen the rare book exhibit tomorrow.'"
    });

    // Walker 4: Festival Scholar with Satchel & Book
    const walker4 = this.createStylizedHumanoid({
      coatColor: 0x581c87, scarfColor: 0x38bdf8, hatColor: 0x3b0764, hatType: 'beret', prop: 'book'
    });
    walker4.position.set(10, 0, 6);
    this.scene.add(walker4);
    this.crowdWalkers.push({
      mesh: walker4,
      speed: 1.9,
      walkCycle: 0,
      pauseTimer: 2.0,
      currentWpIndex: 0,
      waypoints: [
        new THREE.Vector3(10, 0, 6),
        new THREE.Vector3(6, 0, 12),
        new THREE.Vector3(-3, 0, 14),
        new THREE.Vector3(-12, 0, 6),
        new THREE.Vector3(-7, 0, -1),
        new THREE.Vector3(3, 0, 2)
      ],
      quote: "📖 'These ancient Luma folktales are rich with Deaf history!'"
    });

    // Walker 5: Playful Child with Star Balloon (Circling the Central Fountain)
    const walker5 = this.createStylizedHumanoid({
      coatColor: 0xeab308, scarfColor: 0xf43f5e, hatColor: 0x854d0e, hatType: 'cap', scale: 0.72, prop: 'balloon'
    });
    walker5.position.set(2, 0, 8);
    this.scene.add(walker5);
    if (walker5.userData.balloonMesh) this.childBalloon = walker5.userData.balloonMesh;

    this.crowdWalkers.push({
      mesh: walker5,
      speed: 2.8,
      walkCycle: 0,
      pauseTimer: 0,
      currentWpIndex: 0,
      waypoints: [
        new THREE.Vector3(3, 0, 8),
        new THREE.Vector3(6.5, 0, 5),
        new THREE.Vector3(4, 0, 1.5),
        new THREE.Vector3(-1.5, 0, 2),
        new THREE.Vector3(-4.5, 0, 6.5),
        new THREE.Vector3(0, 0, 9)
      ],
      quote: "🎈 'Wheee! Look at my star balloon fly!'"
    });

    // ==================== B. STATIONARY FESTIVAL VIGNETTES ====================
    // 1. Street Firefly Juggler & Spectators (South Piazza)
    const juggler = this.createStylizedHumanoid({
      coatColor: 0xc026d3, scarfColor: 0xfbbf24, hatColor: 0x701a75, hatType: 'beret'
    });
    juggler.position.set(7, 0, 15);
    juggler.rotation.y = -Math.PI * 0.75;
    this.scene.add(juggler);

    // 3 Glowing Juggler Orbs
    const orbColors = [0x38bdf8, 0xfbbf24, 0xa855f7];
    this.jugglerOrbs = [];
    orbColors.forEach((col, idx) => {
      const orbMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 8, 8),
        new THREE.MeshBasicMaterial({ color: col })
      );
      orbMesh.position.set(7, 1.5, 15);
      this.scene.add(orbMesh);

      this.jugglerOrbs.push(orbMesh);
    });

    // Spectator 1: Clapping enthusiast
    const spec1 = this.createStylizedHumanoid({
      coatColor: 0x0369a1, scarfColor: 0xfef08a, hatColor: 0x0c4a6e, hatType: 'hood'
    });
    spec1.position.set(8.5, 0, 13.8);
    spec1.rotation.y = Math.PI * 0.65;
    this.scene.add(spec1);
    this.clappingArmL = spec1.userData.leftArm;
    this.clappingArmR = spec1.userData.rightArm;

    // Spectator 2: Cheering visitor
    const spec2 = this.createStylizedHumanoid({
      coatColor: 0xb45309, scarfColor: 0xfde047, hatColor: 0x78350f, hatType: 'cap'
    });
    spec2.position.set(5.5, 0, 14.2);
    spec2.rotation.y = Math.PI * 0.35;
    if (spec2.userData.leftArm) spec2.userData.leftArm.rotation.x = -Math.PI * 0.65;
    if (spec2.userData.rightArm) spec2.userData.rightArm.rotation.x = -Math.PI * 0.65;
    this.scene.add(spec2);

    this.crowdVignettes.push({
      center: new THREE.Vector3(7, 0, 14.5),
      quote: "🎪 'Bravo! The firefly juggle trick gets more brilliant every year!'"
    });

    // 2. Fountain Friends (Seated on Fountain Rim chatting in ASL)
    const chatter1 = this.createStylizedHumanoid({
      coatColor: 0x0284c7, scarfColor: 0xfde047, hatColor: 0x0369a1, hatType: 'beret', isSeated: true
    });
    chatter1.position.set(-2.8, 0.35, 3.2);
    chatter1.rotation.y = Math.PI * 0.3;
    this.scene.add(chatter1);
    this.fountainChatterArm = chatter1.userData.rightArm;

    const chatter2 = this.createStylizedHumanoid({
      coatColor: 0x7c3aed, scarfColor: 0x38bdf8, hatColor: 0x4c1d95, hatType: 'hood', isSeated: true
    });
    chatter2.position.set(-1.8, 0.35, 2.0);
    chatter2.rotation.y = -Math.PI * 0.45;
    this.scene.add(chatter2);

    this.crowdVignettes.push({
      center: new THREE.Vector3(-2.3, 0.35, 2.6),
      quote: "💬 'Signing with friends by the fountain is my favorite festival tradition.'"
    });

    // 3. Bakery Customers (In front of Tessa's stall savoring brioche)
    const bakeryCust1 = this.createStylizedHumanoid({
      coatColor: 0xd97706, scarfColor: 0xfef08a, hatColor: 0x92400e, hatType: 'cap', prop: 'bread'
    });
    bakeryCust1.position.set(-10.5, 0, 7.6);
    bakeryCust1.rotation.y = Math.PI * 0.7;
    this.scene.add(bakeryCust1);

    const bakeryCust2 = this.createStylizedHumanoid({
      coatColor: 0x0f766e, scarfColor: 0xf59e0b, hatColor: 0x115e59, hatType: 'beret'
    });
    bakeryCust2.position.set(-11.5, 0, 7.8);
    bakeryCust2.rotation.y = Math.PI * 0.45;
    this.scene.add(bakeryCust2);

    this.crowdVignettes.push({
      center: new THREE.Vector3(-11, 0, 7.7),
      quote: "🥐 'Tessa\'s warm cinnamon brioches are fresh and delicious!'"
    });

    // 4. Canal Promenade Stargazers (Leaning on harbor railing)
    const gazer1 = this.createStylizedHumanoid({
      coatColor: 0x374151, scarfColor: 0x60a5fa, hatColor: 0x1f2937, hatType: 'cap'
    });
    gazer1.position.set(24.8, 0, 3);
    gazer1.rotation.y = Math.PI * 0.5;
    if (gazer1.userData.leftArm) gazer1.userData.leftArm.rotation.x = -Math.PI * 0.4;
    this.scene.add(gazer1);

    const gazer2 = this.createStylizedHumanoid({
      coatColor: 0xbe123c, scarfColor: 0xfde047, hatColor: 0x881337, hatType: 'beret'
    });
    gazer2.position.set(24.8, 0, 5);
    gazer2.rotation.y = Math.PI * 0.5;
    if (gazer2.userData.rightArm) gazer2.userData.rightArm.rotation.x = -Math.PI * 0.4;
    this.scene.add(gazer2);

    this.crowdVignettes.push({
      center: new THREE.Vector3(24.8, 0, 4),
      quote: "✨ 'The full moon reflecting across Luma Canal is breathtaking.'"
    });

    // 5. Seated Storybook Reader on Plaza Bench
    const benchReader = this.createStylizedHumanoid({
      coatColor: 0x4338ca, scarfColor: 0xfef08a, hatColor: 0x312e81, hatType: 'hood', isSeated: true, prop: 'book'
    });
    benchReader.position.set(-18, 0.25, 9);
    benchReader.rotation.y = Math.PI * 0.45;
    this.scene.add(benchReader);

    this.crowdVignettes.push({
      center: new THREE.Vector3(-18, 0.25, 9),
      quote: "📖 'Reading the chronicles of the Myth Book under the festival gaslight.'"
    });
  }

  // Animates walking crowd members, street performers, and nearby ambient banter
  updateFestivalCrowd(delta, time) {
    // 1. Update 5 Roaming Walkers
    this.crowdWalkers.forEach(walker => {
      if (walker.pauseTimer > 0) {
        walker.pauseTimer -= delta;
        if (walker.mesh.userData.leftLeg) walker.mesh.userData.leftLeg.rotation.x *= 0.8;
        if (walker.mesh.userData.rightLeg) walker.mesh.userData.rightLeg.rotation.x *= 0.8;
        return;
      }

      const targetWp = walker.waypoints[walker.currentWpIndex];
      const curPos = walker.mesh.position;
      const dx = targetWp.x - curPos.x;
      const dz = targetWp.z - curPos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist > 0.35) {
        const moveStep = walker.speed * delta;
        curPos.x += (dx / dist) * moveStep;
        curPos.z += (dz / dist) * moveStep;

        // Smooth facing rotation
        const targetAng = Math.atan2(dx, dz);
        let diff = targetAng - walker.mesh.rotation.y;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        walker.mesh.rotation.y += diff * 0.15;

        // Walking leg & arm swing
        walker.walkCycle += delta * 8;
        const swing = Math.sin(walker.walkCycle) * 0.5;
        if (walker.mesh.userData.leftLeg) walker.mesh.userData.leftLeg.rotation.x = swing;
        if (walker.mesh.userData.rightLeg) walker.mesh.userData.rightLeg.rotation.x = -swing;
        if (walker.mesh.userData.leftArm && !walker.mesh.userData.balloonMesh) {
          walker.mesh.userData.leftArm.rotation.x = -swing * 0.6;
        }
      } else {
        // Reached waypoint: pick next & occasionally pause
        walker.currentWpIndex = (walker.currentWpIndex + 1) % walker.waypoints.length;
        if (Math.random() < 0.4) {
          walker.pauseTimer = 2.0 + Math.random() * 2.5;
        }
      }
    });

    // 2. Animate Juggler's 3 Glowing Firefly Orbs
    if (this.jugglerOrbs && this.jugglerOrbs.length === 3) {
      const jPos = new THREE.Vector3(7, 0, 15);
      const phases = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];

      this.jugglerOrbs.forEach((orb, i) => {
        const t = time * 3.8 + phases[i];
        const cycle = t % Math.PI;
        const arcY = 1.35 + Math.sin(cycle) * 1.7;
        const arcX = jPos.x + Math.cos(t * 0.5) * 0.65;
        const arcZ = jPos.z + Math.sin(t * 0.5) * 0.45;
        orb.position.set(arcX, arcY, arcZ);
      });
    }

    // 3. Animate Clapping Spectator
    if (this.clappingArmL && this.clappingArmR) {
      const clap = Math.sin(time * 9) * 0.22;
      this.clappingArmL.rotation.z = -0.5 + clap;
      this.clappingArmR.rotation.z = 0.5 - clap;
    }

    // 4. Animate Child Floating Star Balloon
    if (this.childBalloon) {
      this.childBalloon.position.y = 1.35 + Math.sin(time * 3.2) * 0.12;
      this.childBalloon.rotation.z = Math.sin(time * 2.2) * 0.12;
    }

    // 5. Animate Fountain Chatter Signing
    if (this.fountainChatterArm) {
      this.fountainChatterArm.rotation.x = -Math.PI * 0.35 + Math.sin(time * 4) * 0.15;
      this.fountainChatterArm.rotation.z = Math.sin(time * 3) * 0.2;
    }

    // 6. Proximity Ambient Citizen Thoughts / Banter
    let nearestQuote = null;
    let minGroupDist = 9999;

    // Check walkers
    this.crowdWalkers.forEach(w => {
      const d = w.mesh.position.distanceTo(this.playerPos);
      if (d < 4.0 && d < minGroupDist) {
        minGroupDist = d;
        nearestQuote = w.quote;
      }
    });

    // Check vignettes
    this.crowdVignettes.forEach(v => {
      const d = v.center.distanceTo(this.playerPos);
      if (d < 4.5 && d < minGroupDist) {
        minGroupDist = d;
        nearestQuote = v.quote;
      }
    });

    // Only touch DOM when quote changes (prevents 60fps layout thrashing!)
    if (nearestQuote && !this.nearestChar && !this.isInterrogating) {
      if (this.currentBanterQuote !== nearestQuote) {
        this.currentBanterQuote = nearestQuote;
        const promptEl = document.getElementById('luma3dProximityPrompt');
        const promptText = document.getElementById('luma3dPromptText');
        if (promptEl) promptEl.classList.remove('hidden');
        if (promptText) {
          promptText.innerHTML = `<span class="text-amber-300 font-sans italic">${nearestQuote}</span>`;
        }
      }
    } else if (!nearestQuote && this.currentBanterQuote) {
      this.currentBanterQuote = null;
    }
  }

  // ==================== ORBIT CAMERA & CONTROLS ====================
  setupOrbitAndMovementControls(container) {
    // 1. Mouse Drag to Orbit Camera
    container.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging && !this.isInterrogating) {
        const deltaX = e.clientX - this.prevMousePos.x;
        const deltaY = e.clientY - this.prevMousePos.y;

        this.camAzimuth -= deltaX * 0.006;
        this.camElevation = Math.max(0.15, Math.min(1.25, this.camElevation + deltaY * 0.005));

        this.prevMousePos = { x: e.clientX, y: e.clientY };
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // 2. Mouse Wheel to Zoom Camera
    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.camDistance = Math.max(6, Math.min(24, this.camDistance + e.deltaY * 0.015));
    }, { passive: false });

    // 3. Click Ground or Characters to Walk/Interrogate
    container.addEventListener('click', (e) => {
      if (this.isInterrogating) return;
      const rect = container.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);

      // Check character click first
      const charIntersects = this.raycaster.intersectObjects(this.characterMeshes, true);
      if (charIntersects.length > 0) {
        let parent = charIntersects[0].object;
        while (parent && !parent.userData.id && parent.parent) {
          parent = parent.parent;
        }
        if (parent && parent.userData.id) {
          this.walkToAndInterrogate(parent.userData.id);
          return;
        }
      }

      // (Ground click-to-move disabled per player request: player ONLY moves with keypad WASD / Arrow keys!)
      // Clicking on the ground or screen will NEVER move the character.
    });

    // 4. Keyboard Navigation (WASD / Arrows / E)
    window.addEventListener('keydown', (e) => {
      if (!this.isOpen || this.isInterrogating) return;
      if (e.code === 'KeyW' || e.code === 'ArrowUp') this.keysDown.up = true;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') this.keysDown.down = true;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.keysDown.left = true;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') this.keysDown.right = true;

      // Keyboard question triggers when interrogating
      if (this.isInterrogating && this.activeCharacter) {
        if (e.code === 'KeyA') { e.preventDefault(); this.askQuestion(this.activeCharacter.id, 'A'); return; }
        if (e.code === 'KeyB') { e.preventDefault(); this.askQuestion(this.activeCharacter.id, 'B'); return; }
        if (e.code === 'KeyW') { e.preventDefault(); this.askQuestion(this.activeCharacter.id, 'W'); return; }
        if (e.code === 'KeyV') { e.preventDefault(); this.askQuestion(this.activeCharacter.id, 'V'); return; }
        if (e.code === 'KeyL') { e.preventDefault(); this.askQuestion(this.activeCharacter.id, 'L'); return; }
      }

      if (e.code === 'KeyE' || e.code === 'Space' || e.code === 'Enter') {
        if (this.isNearPlanter) {
          e.preventDefault();
          this.searchGardenPlanter();
          return;
        }
        if (this.isNearWheel) {
          e.preventDefault();
          this.spinCarnivalWheel();
        } else if (this.nearestChar) {
          e.preventDefault();
          this.walkToAndInterrogate(this.nearestChar.id);
        }
      }
      if (e.code === 'KeyF') {
        e.preventDefault();
        this.launchFestivalFireworks();
      }
      if (e.code === 'KeyG') {
        e.preventDefault();
        this.triggerCelebrateEmote();
      }
      if (e.code === 'KeyM') {
        e.preventDefault();
        this.toggleFestivalMusic();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'KeyW' || e.code === 'ArrowUp') this.keysDown.up = false;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') this.keysDown.down = false;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') this.keysDown.left = false;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') this.keysDown.right = false;
    });

    // 5. Window Resize Handler
    window.addEventListener('resize', () => {
      if (!this.isOpen || !this.renderer || !this.camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  // Touch pad on mobile
  setTouchDir(dir, active) {
    if (dir === 'up') this.keysDown.up = active;
    if (dir === 'down') this.keysDown.down = active;
    if (dir === 'left') this.keysDown.left = active;
    if (dir === 'right') this.keysDown.right = active;
  }

  // ==================== MAIN RENDER & ANIMATION LOOP ====================
  startRenderLoop() {
    const loop = () => {
      if (!this.isOpen) return;

      const delta = this.clock.getDelta();
      const time = this.clock.getElapsedTime();

      this.updatePlayerMovement(delta);
      this.updateCameraFollow();
      this.updateEnvironmentAnimations(time);
      this.updateFestivalCrowd(delta, time);
      this.updateLanternCanopy(time);
      this.updateFireworks(delta);
      this.updateConfetti(delta);
      this.updateCarnivalWheel(delta);
      this.updateFestivalBand(delta, time);
      this.updateCelebrateEmote(delta);
      this.proximityFrameCount = (this.proximityFrameCount || 0) + 1;
      if (this.proximityFrameCount % 6 === 0) {
        this.checkCharacterProximity();
      }

      this.updateCharacterBillboards();
      this.renderer.render(this.scene, this.camera);
      this.animFrameId = requestAnimationFrame(loop);
    };

    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    this.animFrameId = requestAnimationFrame(loop);
  }

  // Updates Detective Gio's movement and walking animation
  updatePlayerMovement(delta) {
    if (this.isInterrogating) return;

    let moveX = 0;
    let moveZ = 0;

    // 1. Keyboard Input relative to camera azimuth
    const forward = new THREE.Vector3(-Math.sin(this.camAzimuth), 0, -Math.cos(this.camAzimuth)).normalize();
    const right = new THREE.Vector3(Math.cos(this.camAzimuth), 0, -Math.sin(this.camAzimuth)).normalize();

    if (this.keysDown.up) { moveX += forward.x; moveZ += forward.z; this.playerTargetPos = null; }
    if (this.keysDown.down) { moveX -= forward.x; moveZ -= forward.z; this.playerTargetPos = null; }
    if (this.keysDown.left) { moveX -= right.x; moveZ -= right.z; this.playerTargetPos = null; }
    if (this.keysDown.right) { moveX += right.x; moveZ += right.z; this.playerTargetPos = null; }

    // 2. Keypad-Only Movement (Click-to-walk disabled)
    this.playerTargetPos = null;

    const moveMag = Math.sqrt(moveX * moveX + moveZ * moveZ);
    this.isWalking = (moveMag > 0.01);

    if (this.isWalking) {
      const normX = (moveX / moveMag) * this.playerSpeed * delta;
      const normZ = (moveZ / moveMag) * this.playerSpeed * delta;

      // Constrain inside scenario bounds
      this.playerPos.x = Math.max(-36, Math.min(36, this.playerPos.x + normX));
      this.playerPos.z = Math.max(-38, Math.min(36, this.playerPos.z + normZ));

      // Calculate terrain elevation (Museum terrace has height = 1.2)
      let targetHeight = 0;
      if (this.playerPos.z < -22 && Math.abs(this.playerPos.x) < 18) {
        targetHeight = 1.2;
      } else if (this.playerPos.x > 26 && this.playerPos.z > 8 && this.playerPos.z < 20) {
        targetHeight = -0.2; // Pier
      }
      this.playerPos.y += (targetHeight - this.playerPos.y) * 0.15;

      // Smooth facing rotation
      const targetAngle = Math.atan2(moveX, moveZ);
      let diff = targetAngle - this.playerAngle;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.playerAngle += diff * 0.18;

      // Classic Roblox Anime Walk Cycle (Arms & Legs swinging in opposition)
      this.walkCycle += delta * 11;
      const legSwing = Math.sin(this.walkCycle) * 0.72;
      if (this.leftLegGroup) this.leftLegGroup.rotation.x = legSwing;
      if (this.rightLegGroup) this.rightLegGroup.rotation.x = -legSwing;
      if (this.leftArmGroup) this.leftArmGroup.rotation.x = -legSwing * 0.85;
      if (this.rightArmGroup) this.rightArmGroup.rotation.x = legSwing * 0.45;
    } else {
      if (this.leftLegGroup) this.leftLegGroup.rotation.x *= 0.8;
      if (this.rightLegGroup) this.rightLegGroup.rotation.x *= 0.8;
      if (this.leftArmGroup) this.leftArmGroup.rotation.x *= 0.8;
      if (this.rightArmGroup) this.rightArmGroup.rotation.x *= 0.8;
    }

    if (this.playerGroup) {
      this.playerGroup.position.copy(this.playerPos);
      this.playerGroup.rotation.y = this.playerAngle;
    }

    // Rotate Hero Detective Aura & Bob Overhead Badge
    if (this.playerAuraMesh) {
      this.playerAuraMesh.rotation.z += delta * 1.5;
    }
    if (this.playerBadgeSprite) {
      this.playerBadgeSprite.position.y = 3.0 + Math.sin(Date.now() * 0.005) * 0.08;
    }
    if (this.scarfTails) {
      this.scarfTails.rotation.x = this.isWalking ? (0.4 + Math.sin(this.walkCycle) * 0.25) : 0.08;
    }
    if (this.playerLeftArm) {
      this.playerLeftArm.rotation.x = this.isWalking ? (Math.sin(this.walkCycle) * 0.5) : 0;
    }
  }

  // Smooth Third-Person Camera Follow
  updateCameraFollow() {
    this.cameraTarget.lerp(new THREE.Vector3(this.playerPos.x, this.playerPos.y + 1.2, this.playerPos.z), 0.1);

    const x = this.cameraTarget.x + this.camDistance * Math.sin(this.camAzimuth) * Math.cos(this.camElevation);
    const y = this.cameraTarget.y + this.camDistance * Math.sin(this.camElevation);
    const z = this.cameraTarget.z + this.camDistance * Math.cos(this.camAzimuth) * Math.cos(this.camElevation);

    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.cameraTarget);
  }

  // Animates environmental elements: water, flashing emergency beacons, banners
  updateEnvironmentAnimations(time) {
    this.animatedObjects.forEach(obj => {
      if (obj.type === 'beacon' && obj.light) {
        // Red flashing emergency beacon (rotates intensity)
        obj.light.intensity = 1.0 + Math.sin(time * 8) * 1.5;
      }
      if (obj.type === 'canal_water' && obj.mesh && obj.mesh.material.map) {
        obj.mesh.material.map.offset.y = (time * 0.04) % 1;
        obj.mesh.material.map.offset.x = (time * 0.02) % 1;
      }
    });

    // Animate 3D Roblox Suspects: Subtle idle breathing, arm sway, and swivel to greet Detective Gio
    this.characterMeshes.forEach((mesh, idx) => {
      const avatar = mesh.userData.avatarMesh;
      if (avatar) {
        // Idle breathing bob
        avatar.position.y = 0.25 + Math.sin(time * 2.2 + idx * 0.7) * 0.02;

        // Gentle arm breathing sway
        if (avatar.userData.leftArm) {
          avatar.userData.leftArm.rotation.x = Math.sin(time * 2.0 + idx) * 0.05;
        }
        if (avatar.userData.rightArm) {
          avatar.userData.rightArm.rotation.x = -Math.sin(time * 2.0 + idx) * 0.05;
        }

        // When Detective Gio approaches within 14 units, smoothly swivel to look at Detective Gio!
        if (this.playerGroup) {
          const dx = this.playerGroup.position.x - mesh.position.x;
          const dz = this.playerGroup.position.z - mesh.position.z;
          const dist = Math.sqrt(dx * dx + dz * dz);
          if (dist < 14) {
            const targetAngle = Math.atan2(dx, dz);
            let diff = targetAngle - avatar.rotation.y;
            while (diff < -Math.PI) diff += Math.PI * 2;
            while (diff > Math.PI) diff -= Math.PI * 2;
            avatar.rotation.y += diff * 0.08;
          }
        }
      }
    });
  }

  // ==================== LIVELY FESTIVAL: FIREWORKS, CONFETTI, STAGE & CARNIVAL ====================
  buildFestoonLanternCanopy() {
    // 4 Grand Festoon Garlands crossing the sky
    const canopyCurves = [
      [ new THREE.Vector3(-14, 5.2, -16), new THREE.Vector3(-6, 4.4, -4), new THREE.Vector3(0, 4.2, 5) ],
      [ new THREE.Vector3(14, 5.2, -16), new THREE.Vector3(6, 4.4, -4), new THREE.Vector3(0, 4.2, 5) ],
      [ new THREE.Vector3(0, 4.2, 5), new THREE.Vector3(0, 3.8, 12), new THREE.Vector3(0, 4.5, 18) ],
      [ new THREE.Vector3(-16, 4.8, 2), new THREE.Vector3(0, 4.2, 5), new THREE.Vector3(16, 4.8, 4) ]
    ];

    const lanternColors = [0xfbbf24, 0xf43f5e, 0x38bdf8, 0xa855f7, 0x10b981];
    const sharedSphereGeo = new THREE.SphereGeometry(0.25, 8, 6);

    canopyCurves.forEach((pts, gIdx) => {
      const curve = new THREE.CatmullRomCurve3(pts);
      const points = curve.getPoints(24);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x475569 });
      const rope = new THREE.Line(lineGeo, lineMat);
      this.scene.add(rope);

      // Lightweight glowing paper lantern spheres (shared geometry)
      const count = 5;
      for (let i = 1; i < count; i++) {
        const u = i / count;
        const pt = curve.getPoint(u);
        const col = lanternColors[(gIdx + i) % lanternColors.length];
        const mat = new THREE.MeshBasicMaterial({ color: col });
        const sphere = new THREE.Mesh(sharedSphereGeo, mat);
        sphere.position.set(pt.x, pt.y - 0.22, pt.z);
        this.scene.add(sphere);
      }
    });
  }

  updateLanternCanopy(time) {
    // Static canopy - 0 CPU overhead
  }

  buildCarnivalWheelAndSweets() {
    // 1. CARNIVAL WHEEL OF FORTUNE BOOTH (x = -6.5, z = 14)
    const boothGroup = new THREE.Group();
    boothGroup.position.set(-6.5, 0, 14);
    boothGroup.rotation.y = Math.PI * 0.25;

    const woodMat = new THREE.MeshLambertMaterial({ color: 0x451a03 });
    const deckGeo = new THREE.BoxGeometry(3.6, 0.25, 3.0);
    const deck = new THREE.Mesh(deckGeo, woodMat);
    deck.position.y = 0.12;
    deck.receiveShadow = true;
    boothGroup.add(deck);

    [[-1.6, -1.3], [1.6, -1.3], [-1.6, 1.3], [1.6, 1.3]].forEach(([px, pz]) => {
      const pGeo = new THREE.BoxGeometry(0.16, 3.4, 0.16);
      const post = new THREE.Mesh(pGeo, woodMat);
      post.position.set(px, 1.7, pz);
      boothGroup.add(post);
    });

    const cGeo = new THREE.BoxGeometry(4.0, 0.4, 3.4);
    const cMat = new THREE.MeshLambertMaterial({
      map: this.createAwningCanvas('#7e22ce', '#fbbf24')
    });
    const canopy = new THREE.Mesh(cGeo, cMat);
    canopy.position.set(0, 3.5, 0);
    canopy.rotation.x = 0.12;
    boothGroup.add(canopy);

    const signCanvas = document.createElement('canvas');
    signCanvas.width = 256;
    signCanvas.height = 64;
    const sctx = signCanvas.getContext('2d');
    sctx.fillStyle = '#1e1b4b';
    sctx.fillRect(0, 0, 256, 64);
    sctx.strokeStyle = '#fbbf24';
    sctx.lineWidth = 4;
    sctx.strokeRect(4, 4, 248, 56);
    sctx.fillStyle = '#fef08a';
    sctx.font = 'bold 22px sans-serif';
    sctx.textAlign = 'center';
    sctx.fillText('🎡 LUCKY WHEEL', 128, 38);
    const signTex = new THREE.CanvasTexture(signCanvas);
    const signMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 0.6),
      new THREE.MeshBasicMaterial({ map: signTex })
    );
    signMesh.position.set(0, 3.9, 0.1);
    boothGroup.add(signMesh);

    const standGeo = new THREE.CylinderGeometry(0.08, 0.14, 2.2, 8);
    const standMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
    const standL = new THREE.Mesh(standGeo, standMat);
    standL.position.set(-0.55, 1.2, 0.3);
    standL.rotation.z = -0.18;
    boothGroup.add(standL);
    const standR = new THREE.Mesh(standGeo, standMat);
    standR.position.set(0.55, 1.2, 0.3);
    standR.rotation.z = 0.18;
    boothGroup.add(standR);

    const wheelCanvas = document.createElement('canvas');
    wheelCanvas.width = 512;
    wheelCanvas.height = 512;
    const wctx = wheelCanvas.getContext('2d');
    const segColors = ['#f43f5e', '#fbbf24', '#10b981', '#06b6d4', '#8b5cf6', '#f97316', '#ec4899', '#3b82f6'];
    const segLabels = ['SPEED', 'AURA', 'SPARKS', 'BALLOON', 'BRIOCHE', 'MYTH', 'CONFETTI', 'LUCK'];
    const arc = (Math.PI * 2) / 8;
    wctx.translate(256, 256);
    for (let i = 0; i < 8; i++) {
      wctx.beginPath();
      wctx.moveTo(0, 0);
      wctx.arc(0, 0, 240, i * arc, (i + 1) * arc);
      wctx.closePath();
      wctx.fillStyle = segColors[i];
      wctx.fill();
      wctx.strokeStyle = '#ffffff';
      wctx.lineWidth = 4;
      wctx.stroke();

      wctx.save();
      wctx.rotate(i * arc + arc / 2);
      wctx.fillStyle = '#ffffff';
      wctx.font = 'bold 22px sans-serif';
      wctx.textAlign = 'right';
      wctx.fillText(segLabels[i], 215, 8);
      wctx.restore();
    }
    wctx.beginPath();
    wctx.arc(0, 0, 36, 0, Math.PI * 2);
    wctx.fillStyle = '#fbbf24';
    wctx.fill();
    wctx.strokeStyle = '#78350f';
    wctx.lineWidth = 6;
    wctx.stroke();

    const wheelTex = new THREE.CanvasTexture(wheelCanvas);
    const wheelGeo = new THREE.CylinderGeometry(1.35, 1.35, 0.12, 32);
    wheelGeo.rotateX(Math.PI / 2);
    const wheelMat = new THREE.MeshLambertMaterial({
      map: wheelTex
    });
    this.carnivalWheelMesh = new THREE.Mesh(wheelGeo, wheelMat);
    this.carnivalWheelMesh.position.set(0, 2.1, 0.38);
    boothGroup.add(this.carnivalWheelMesh);

    const ptrGeo = new THREE.ConeGeometry(0.18, 0.45, 8);
    ptrGeo.rotateZ(Math.PI);
    const ptrMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const pointer = new THREE.Mesh(ptrGeo, ptrMat);
    pointer.position.set(0, 3.48, 0.46);
    boothGroup.add(pointer);

    // Neon sign and wheel are visually luminous

    this.scene.add(boothGroup);

    // 2. SWEET CONFECTION & COTTON CANDY CART (x = 6.5, z = 14)
    const cartGroup = new THREE.Group();
    cartGroup.position.set(6.5, 0, 14);
    cartGroup.rotation.y = -Math.PI * 0.25;

    const cartMat = new THREE.MeshLambertMaterial({ color: 0xbe185d });
    const cBodyGeo = new THREE.BoxGeometry(2.8, 1.2, 1.8);
    const cartBody = new THREE.Mesh(cBodyGeo, cartMat);
    cartBody.position.y = 0.95;
    cartGroup.add(cartBody);

    const wheelRimGeo = new THREE.TorusGeometry(0.48, 0.05, 8, 16);
    const wheelRimMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
    [-1.2, 1.2].forEach(wx => {
      const wMesh = new THREE.Mesh(wheelRimGeo, wheelRimMat);
      wMesh.position.set(wx, 0.48, 0.95);
      cartGroup.add(wMesh);
      const wMesh2 = new THREE.Mesh(wheelRimGeo, wheelRimMat);
      wMesh2.position.set(wx, 0.48, -0.95);
      cartGroup.add(wMesh2);
    });

    const candyAwningGeo = new THREE.BoxGeometry(3.2, 0.35, 2.2);
    const candyAwningMat = new THREE.MeshLambertMaterial({
      map: this.createAwningCanvas('#ec4899', '#ffffff')
    });
    const candyAwning = new THREE.Mesh(candyAwningGeo, candyAwningMat);
    candyAwning.position.set(0, 2.8, 0);
    cartGroup.add(candyAwning);

    const ccColors = [0xf472b6, 0x38bdf8, 0xfde047, 0xa78bfa];
    [[-0.8, -0.2], [-0.3, 0.2], [0.3, -0.1], [0.8, 0.15]].forEach(([cx, cz], i) => {
      const stickGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 4);
      const stick = new THREE.Mesh(stickGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      stick.position.set(cx, 1.9, cz);
      cartGroup.add(stick);

      const cloudGeo = new THREE.DodecahedronGeometry(0.32, 1);
      const cloudMat = new THREE.MeshLambertMaterial({
        color: ccColors[i],
        emissive: ccColors[i],
        emissiveIntensity: 0.35
      });
      const cloud = new THREE.Mesh(cloudGeo, cloudMat);
      cloud.position.set(cx, 2.3, cz);
      cartGroup.add(cloud);
    });

    // Cotton candy clouds are already emissive

    this.scene.add(cartGroup);
  }

  updateCarnivalWheel(delta) {
    if (!this.isWheelSpinning || !this.carnivalWheelMesh) return;

    this.carnivalWheelMesh.rotation.z += this.wheelSpeed * delta;
    this.wheelSpeed *= 0.985;

    this.wheelAngle = (this.wheelAngle || 0) + this.wheelSpeed * delta;
    if (this.wheelAngle >= Math.PI / 4) {
      this.wheelAngle -= Math.PI / 4;
      if (this.festivalAudio) this.festivalAudio.playWheelClick();
    }

    if (this.wheelSpeed < 0.18) {
      this.isWheelSpinning = false;
      this.wheelSpeed = 0;
      this.onWheelSpinComplete();
    }
  }

  spinCarnivalWheel() {
    if (this.isWheelSpinning) return;
    this.isWheelSpinning = true;
    this.wheelSpeed = 16.0 + Math.random() * 8.0;
    this.wheelAngle = 0;

    const promptText = document.getElementById('luma3dPromptText');
    if (promptText) {
      promptText.textContent = '🎡 WHEEL IS SPINNING...';
    }
  }

  onWheelSpinComplete() {
    const prizes = [
      { name: '🌟 Golden Detective Aura', buff: 'aura', desc: 'Gio shines with brilliant golden prestige!' },
      { name: '👟 Detective Turbo Speed', buff: 'speed', desc: '+40% Faster Stride across Luma City!' },
      { name: '✨ Festival Sparkler Dust', buff: 'sparks', desc: 'Leaves a trail of glittering festival sparks!' },
      { name: '🎉 Grand Confetti Storm', buff: 'confetti', desc: 'Vibrant celebratory confetti shower!' },
      { name: '🥐 Fresh Honey Brioche', buff: 'snack', desc: 'Delicious warm pastry enjoyed at the festival!' },
      { name: '🔮 Myth Luminescence', buff: 'glow', desc: 'Enhanced nocturnal illumination across town!' }
    ];
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    this.activeBuff = prize.buff;
    this.buffTimer = 35.0;

    if (prize.buff === 'speed') {
      this.playerSpeed = 13.0;
    } else {
      this.playerSpeed = 9.0;
    }

    if (this.festivalAudio) {
      this.festivalAudio.playWheelWin();
      this.festivalAudio.playCrowdCheer();
    }

    this.launchFestivalFireworks(-6.5, 14, 0xfbbf24);
    this.showFestivalNotification(`🎉 WON: ${prize.name}!`, prize.desc);
  }

  showFestivalNotification(title, subtitle) {
    let notif = document.getElementById('luma3dFestivalNotif');
    if (!notif) {
      notif = document.createElement('div');
      notif.id = 'luma3dFestivalNotif';
      notif.className = 'absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-slate-950/95 border-2 border-amber-400 px-6 py-3 rounded-2xl shadow-[0_0_35px_rgba(245,158,11,0.7)] backdrop-blur-md flex flex-col items-center pointer-events-none transition-all duration-300 animate-bounce';
      const container = document.getElementById('luma3DModal');
      if (container) container.appendChild(notif);
    }
    notif.innerHTML = `
      <span class="text-amber-300 font-black text-sm font-sans flex items-center gap-1.5">${title}</span>
      <span class="text-slate-200 text-xs font-mono mt-0.5">${subtitle}</span>
    `;
    notif.style.display = 'flex';
    notif.style.opacity = '1';

    if (this.notifTimeout) clearTimeout(this.notifTimeout);
    this.notifTimeout = setTimeout(() => {
      if (notif) {
        notif.style.opacity = '0';
        setTimeout(() => { if (notif) notif.style.display = 'none'; }, 300);
      }
    }, 4500);
  }

  buildFestivalStageAndMusicians() {
    const stageGroup = new THREE.Group();
    stageGroup.position.set(0, 0, 18);

    const deckGeo = new THREE.CylinderGeometry(4.8, 5.0, 0.65, 8);
    const woodMat = new THREE.MeshLambertMaterial({ color: 0x451a03 });
    const deck = new THREE.Mesh(deckGeo, woodMat);
    deck.position.y = 0.32;
    deck.receiveShadow = true;
    stageGroup.add(deck);

    const carpetGeo = new THREE.CylinderGeometry(4.2, 4.2, 0.05, 8);
    const carpetMat = new THREE.MeshLambertMaterial({ color: 0x991b1b });
    const carpet = new THREE.Mesh(carpetGeo, carpetMat);
    carpet.position.y = 0.66;
    stageGroup.add(carpet);

    const postMat = new THREE.MeshLambertMaterial({ color: 0xfbbf24 });
    const radius = 4.4;
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2;
      const px = Math.cos(ang) * radius;
      const pz = Math.sin(ang) * radius;

      const pGeo = new THREE.CylinderGeometry(0.1, 0.1, 3.6, 6);
      const post = new THREE.Mesh(pGeo, postMat);
      post.position.set(px, 2.4, pz);
      stageGroup.add(post);
    }

    const roofGeo = new THREE.ConeGeometry(5.4, 2.2, 8);
    const roofMat = new THREE.MeshLambertMaterial({
      map: this.createAwningCanvas('#047857', '#fbbf24')
    });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 4.8;
    stageGroup.add(roof);

    const stageLight = new THREE.PointLight(0xf59e0b, 2.2, 12, 1.2);
    stageLight.position.set(0, 3.5, 0);
    stageGroup.add(stageLight);
    this.stageFootlight = stageLight;

    const accordionist = this.createStylizedHumanoid({
      coatColor: 0x0284c7, scarfColor: 0xfef08a, hatColor: 0x0c4a6e, hatType: 'beret', faceExpr: 'sing'
    });
    accordionist.position.set(-1.4, 0.65, 0.4);
    accordionist.rotation.y = Math.PI * 0.15;
    stageGroup.add(accordionist);

    const bellowsGeo = new THREE.BoxGeometry(0.7, 0.5, 0.35);
    const bellowsMat = new THREE.MeshLambertMaterial({ color: 0x991b1b });
    this.accordionBellows = new THREE.Mesh(bellowsGeo, bellowsMat);
    this.accordionBellows.position.set(0, -0.35, 0.35);
    if (accordionist.userData.leftArm) accordionist.userData.leftArm.add(this.accordionBellows);

    const violinist = this.createStylizedHumanoid({
      coatColor: 0x7c3aed, scarfColor: 0xfde047, hatColor: 0x4c1d95, hatType: 'cap', faceExpr: 'smile'
    });
    violinist.position.set(1.4, 0.65, 0.4);
    violinist.rotation.y = -Math.PI * 0.15;
    stageGroup.add(violinist);

    const violinGeo = new THREE.BoxGeometry(0.25, 0.6, 0.12);
    const violinMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
    const violin = new THREE.Mesh(violinGeo, violinMat);
    violin.rotation.z = Math.PI * 0.35;
    violin.position.set(-0.25, -0.2, 0.25);
    if (violinist.userData.leftArm) violinist.userData.leftArm.add(violin);

    this.violinArm = violinist.userData.rightArm;

    const dancer1 = this.createStylizedHumanoid({
      coatColor: 0xe11d48, scarfColor: 0x38bdf8, hatColor: 0x9f1239, hatType: 'beret', faceExpr: 'excited'
    });
    dancer1.position.set(-2.2, 0, 14.5);
    dancer1.rotation.y = Math.PI * 0.9;
    this.scene.add(dancer1);
    this.stageDancer1 = dancer1;

    const dancer2 = this.createStylizedHumanoid({
      coatColor: 0x059669, scarfColor: 0xfbbf24, hatColor: 0x064e3b, hatType: 'cap', faceExpr: 'cheerful'
    });
    dancer2.position.set(2.2, 0, 14.5);
    dancer2.rotation.y = -Math.PI * 0.9;
    this.scene.add(dancer2);
    this.stageDancer2 = dancer2;

    this.scene.add(stageGroup);
  }

  updateFestivalBand(delta, time) {
    if (this.accordionBellows) {
      const scaleX = 0.85 + Math.sin(time * 6) * 0.3;
      this.accordionBellows.scale.set(scaleX, 1, 1);
    }
    if (this.violinArm) {
      this.violinArm.rotation.x = -Math.PI * 0.3 + Math.sin(time * 7) * 0.35;
      this.violinArm.rotation.z = Math.cos(time * 7) * 0.2;
    }
    if (this.stageDancer1) {
      this.stageDancer1.position.y = Math.abs(Math.sin(time * 6)) * 0.35;
      if (this.stageDancer1.userData.leftArm) this.stageDancer1.userData.leftArm.rotation.x = -Math.PI * 0.65 + Math.sin(time * 6) * 0.3;
      if (this.stageDancer1.userData.rightArm) this.stageDancer1.userData.rightArm.rotation.x = -Math.PI * 0.65 - Math.sin(time * 6) * 0.3;
    }
    if (this.stageDancer2) {
      this.stageDancer2.position.y = Math.abs(Math.sin(time * 6 + 1)) * 0.35;
      this.stageDancer2.rotation.y = -Math.PI * 0.9 + Math.sin(time * 4) * 0.3;
      if (this.stageDancer2.userData.leftArm) this.stageDancer2.userData.leftArm.rotation.x = -Math.PI * 0.5 + Math.cos(time * 6) * 0.3;
      if (this.stageDancer2.userData.rightArm) this.stageDancer2.userData.rightArm.rotation.x = -Math.PI * 0.5 - Math.cos(time * 6) * 0.3;
    }
    if (this.stageFootlight) {
      this.stageFootlight.intensity = 2.0 + Math.sin(time * 5) * 0.8;
    }
  }

  buildFestivalConfettiSystem() {
    const count = 100;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = [];

    const palette = [
      [0.96, 0.62, 0.04], // gold
      [0.96, 0.25, 0.37], // rose
      [0.22, 0.74, 0.97], // cyan
      [0.66, 0.33, 0.97], // purple
      [0.06, 0.73, 0.51], // emerald
      [0.99, 0.88, 0.28]  // yellow
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 18 + 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const col = palette[i % palette.length];
      colors[i * 3] = col[0];
      colors[i * 3 + 1] = col[1];
      colors[i * 3 + 2] = col[2];

      velocities.push({
        vy: 1.5 + Math.random() * 2.0,
        phase: Math.random() * Math.PI * 2
      });
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.38,
      vertexColors: true,
      transparent: true,
      opacity: 0.95
    });

    this.confettiPoints = new THREE.Points(geo, mat);
    this.confettiVelocities = velocities;
    this.scene.add(this.confettiPoints);
  }

  updateConfetti(delta) {
    if (!this.confettiPoints) return;
    const pos = this.confettiPoints.geometry.attributes.position.array;
    const vels = this.confettiVelocities;
    const time = this.clock ? this.clock.getElapsedTime() : 0;
    const count = vels.length;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx + 1] -= vels[i].vy * delta;
      pos[idx] += Math.sin(time * 1.5 + vels[i].phase) * delta * 0.5;
      pos[idx + 2] += Math.cos(time * 1.2 + vels[i].phase) * delta * 0.4;

      if (pos[idx + 1] < 0.15) {
        pos[idx + 1] = 18 + Math.random() * 2;
        pos[idx] = (Math.random() - 0.5) * 50;
        pos[idx + 2] = (Math.random() - 0.5) * 50;
      }
    }
    this.confettiPoints.geometry.attributes.position.needsUpdate = true;
  }

  launchFestivalFireworks(originX, originZ, colorHex) {
    if (!this.scene) return;
    const startX = (originX !== undefined) ? originX : (this.playerPos.x + (Math.random() - 0.5) * 16);
    const startZ = (originZ !== undefined) ? originZ : (this.playerPos.z + (Math.random() - 0.5) * 16);
    const targetY = 24 + Math.random() * 14;

    const colors = [0xf43f5e, 0xfbbf24, 0x38bdf8, 0xa855f7, 0x34d399, 0xf97316];
    const burstColor = colorHex || colors[Math.floor(Math.random() * colors.length)];

    const rocketGeo = new THREE.SphereGeometry(0.18, 6, 6);
    const rocketMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const rocketMesh = new THREE.Mesh(rocketGeo, rocketMat);
    rocketMesh.position.set(startX, 0.5, startZ);
    this.scene.add(rocketMesh);

    if (this.festivalAudio) this.festivalAudio.playFireworkRocket();

    this.fireworks.push({
      type: 'rocket',
      mesh: rocketMesh,
      pos: rocketMesh.position,
      targetY: targetY,
      color: burstColor,
      vy: 24 + Math.random() * 8
    });
  }

  createFireworkBurst(pos, colorHex) {
    const count = 55;
    const positions = new Float32Array(count * 3);
    const velocities = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;

      const phi = Math.random() * Math.PI * 2;
      const costheta = Math.random() * 2 - 1;
      const theta = Math.acos(costheta);
      const speed = 7.0 + Math.random() * 8.0;

      velocities.push({
        vx: speed * Math.sin(theta) * Math.cos(phi),
        vy: speed * Math.sin(theta) * Math.sin(phi),
        vz: speed * Math.cos(theta)
      });
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.45,
      color: colorHex,
      transparent: true,
      opacity: 1.0
    });

    const burstMesh = new THREE.Points(geo, mat);
    this.scene.add(burstMesh);

    if (this.festivalAudio) this.festivalAudio.playFireworkBoom();

    this.fireworks.push({
      type: 'burst',
      mesh: burstMesh,
      velocities: velocities,
      life: 1.3,
      maxLife: 1.3
    });
  }

  updateFireworks(delta) {
    if (!this.fireworks) return;

    this.fireworkTimer = (this.fireworkTimer || 0) + delta;
    if (this.fireworkTimer > 8.0) {
      this.fireworkTimer = 0;
      const origins = [
        { x: -14, z: -26 },
        { x: 14, z: -26 },
        { x: -18, z: 0 },
        { x: 20, z: 12 },
        { x: 0, z: 6 }
      ];
      const spot = origins[Math.floor(Math.random() * origins.length)];
      this.launchFestivalFireworks(spot.x, spot.z);
    }

    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      const fw = this.fireworks[i];
      if (fw.type === 'rocket') {
        fw.pos.y += fw.vy * delta;
        if (fw.pos.y >= fw.targetY) {
          this.scene.remove(fw.mesh);
          fw.mesh.geometry.dispose();
          this.createFireworkBurst(fw.pos, fw.color);
          this.fireworks.splice(i, 1);
        }
      } else if (fw.type === 'burst') {
        fw.life -= delta;
        const progress = Math.max(0, fw.life / fw.maxLife);
        fw.mesh.material.opacity = progress;

        const pos = fw.mesh.geometry.attributes.position.array;
        const vels = fw.velocities;
        const count = vels.length;

        for (let p = 0; p < count; p++) {
          const idx = p * 3;
          pos[idx] += vels[p].vx * delta;
          pos[idx + 1] += vels[p].vy * delta;
          pos[idx + 2] += vels[p].vz * delta;

          vels[p].vy -= 9.8 * delta * 0.45;
          vels[p].vx *= 0.96;
          vels[p].vz *= 0.96;
        }
        fw.mesh.geometry.attributes.position.needsUpdate = true;

        if (fw.life <= 0) {
          this.scene.remove(fw.mesh);
          fw.mesh.geometry.dispose();
          fw.mesh.material.dispose();
          this.fireworks.splice(i, 1);
        }
      }
    }
  }

  buildGrandFestivalArchway() {
    const archGroup = new THREE.Group();
    archGroup.position.set(0, 0, 24);

    const stoneMat = new THREE.MeshLambertMaterial({
      map: this.createMarbleCanvas()
    });

    [-5.5, 5.5].forEach(px => {
      const pGeo = new THREE.BoxGeometry(1.4, 7.5, 1.4);
      const pillar = new THREE.Mesh(pGeo, stoneMat);
      pillar.position.set(px, 3.75, 0);
      pillar.castShadow = true;
      archGroup.add(pillar);

      const capGeo = new THREE.SphereGeometry(0.5, 12, 12);
      const capMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(px, 7.8, 0);
      archGroup.add(cap);

      // Glowing gold spheres at pillar caps
    });

    const beamGeo = new THREE.BoxGeometry(12.8, 1.6, 1.6);
    const beam = new THREE.Mesh(beamGeo, stoneMat);
    beam.position.set(0, 7.2, 0);
    archGroup.add(beam);

    const signCanvas = document.createElement('canvas');
    signCanvas.width = 512;
    signCanvas.height = 128;
    const sctx = signCanvas.getContext('2d');
    sctx.fillStyle = '#0f172a';
    sctx.fillRect(0, 0, 512, 128);
    sctx.strokeStyle = '#fbbf24';
    sctx.lineWidth = 6;
    sctx.strokeRect(6, 6, 500, 116);
    sctx.fillStyle = '#fef08a';
    sctx.font = 'bold 30px sans-serif';
    sctx.textAlign = 'center';
    sctx.fillText('⭐ LUMA CITY FESTIVAL ⭐', 256, 55);
    sctx.font = 'bold 22px monospace';
    sctx.fillStyle = '#38bdf8';
    sctx.fillText('OF STORIES & MYTHS', 256, 95);

    const signTex = new THREE.CanvasTexture(signCanvas);
    const signMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(8.5, 2.1),
      new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide })
    );
    signMesh.position.set(0, 7.2, 0.85);
    archGroup.add(signMesh);

    this.scene.add(archGroup);
  }

  triggerCelebrateEmote() {
    if (this.isDancing || this.isInterrogating) return;
    this.isDancing = true;
    this.danceTimer = 2.8;

    if (this.festivalAudio) {
      this.festivalAudio.playCelebrateFanfare();
      this.festivalAudio.playCrowdCheer();
    }

    this.launchFestivalFireworks(this.playerPos.x, this.playerPos.z, 0xf43f5e);
    this.showFestivalNotification('🎉 DETECTIVE CELEBRATION!', 'Gio dances with the festival crowd!');
  }

  updateCelebrateEmote(delta) {
    if (!this.isDancing) return;
    this.danceTimer -= delta;

    if (this.playerGroup) {
      this.playerAngle += delta * 7.5;
      this.playerGroup.rotation.y = this.playerAngle;

      this.playerPos.y = Math.abs(Math.sin(this.danceTimer * 10)) * 0.6;
      this.playerGroup.position.y = this.playerPos.y;

      if (this.leftArmGroup) this.leftArmGroup.rotation.x = -Math.PI * 0.85 + Math.sin(this.danceTimer * 12) * 0.4;
      if (this.rightArmGroup) this.rightArmGroup.rotation.x = -Math.PI * 0.85 - Math.sin(this.danceTimer * 12) * 0.4;
      if (this.leftLegGroup) this.leftLegGroup.rotation.x = Math.sin(this.danceTimer * 12) * 0.6;
      if (this.rightLegGroup) this.rightLegGroup.rotation.x = -Math.sin(this.danceTimer * 12) * 0.6;
    }

    if (this.danceTimer <= 0) {
      this.isDancing = false;
      this.playerPos.y = 0;
      if (this.playerGroup) this.playerGroup.position.y = 0;
    }
  }

  toggleFestivalMusic() {
    this.isMusicPlaying = !this.isMusicPlaying;
    const stateEl = document.getElementById('luma3dMusicState');
    if (stateEl) {
      stateEl.textContent = this.isMusicPlaying ? 'ON' : 'OFF';
      stateEl.className = this.isMusicPlaying ? 'text-emerald-400 font-bold' : 'text-slate-400 font-bold';
    }
    if (this.isMusicPlaying) {
      if (this.festivalAudio) this.festivalAudio.startMusic();
    } else {
      if (this.festivalAudio) this.festivalAudio.stopMusic();
    }
  }

  // Proximity Detection for nearest character (Optimized with cached state)
  checkCharacterProximity() {
    let closestChar = null;
    let closestDist = 9999;

    // Check Carnival Wheel proximity
    const dxW = -6.5 - this.playerPos.x;
    const dzW = 14 - this.playerPos.z;
    const distWheel = Math.sqrt(dxW * dxW + dzW * dzW);

    this.characters.forEach(char => {
      const dx = char.pos3D.x - this.playerPos.x;
      const dz = char.pos3D.z - this.playerPos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < closestDist) {
        closestDist = dist;
        closestChar = char;
      }
    });

    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));
    let targetPrompt = null;

    const distPlanter = this.playerPos.distanceTo(new THREE.Vector3(-17.5, 0, -4.5));
    if (distPlanter < 3.8 && !this.isInterrogating) {
      this.isNearPlanter = true;
      this.isNearWheel = false;
      this.nearestChar = null;
      targetPrompt = 'planter';
    } else if (distWheel < 3.8 && !this.isInterrogating) {
      this.isNearPlanter = false;
      this.isNearWheel = true;
      this.nearestChar = null;
      targetPrompt = 'wheel';
    } else if (closestDist < 3.8 && closestChar && !this.isInterrogating) {
      this.isNearPlanter = false;
      this.isNearWheel = false;
      this.nearestChar = closestChar;
      targetPrompt = 'char_' + closestChar.id;
    } else {
      this.isNearPlanter = false;
      this.isNearWheel = false;
      this.nearestChar = null;
      targetPrompt = null;
    }

    if (this.lastPromptState !== targetPrompt) {
      this.lastPromptState = targetPrompt;
      const promptEl = document.getElementById('luma3dProximityPrompt');
      const promptText = document.getElementById('luma3dPromptText');
      if (promptEl && promptText) {
        if (!targetPrompt) {
          promptEl.classList.add('hidden');
        } else if (targetPrompt === 'planter') {
          promptEl.classList.remove('hidden');
          promptText.textContent = this.isBookRecovered 
            ? '🌿 EXAMINE STONE PLANTER (MYTH BOOK RECOVERED) [E]' 
            : '🌿 SEARCH LARGE STONE PLANTER [E]';
        } else if (targetPrompt === 'wheel') {
          promptEl.classList.remove('hidden');
          promptText.textContent = '🎡 SPIN LUCKY CARNIVAL WHEEL [E]';
        } else if (closestChar) {
          promptEl.classList.remove('hidden');
          promptText.textContent = (isBm ? 'SOAL SIASAT ' : 'INTERVIEW ') + closestChar.name.toUpperCase();
        }
      }
    }

    let targetLoc = isBm ? 'Dataran Festival Cerita' : 'Festival Central Piazza';
    if (this.playerPos.z < -18) {
      targetLoc = isBm ? 'Muzium Cerita • Tempat Kejadian' : 'Story Museum • Crime Scene Forecourt';
    } else if (this.playerPos.x > 22) {
      targetLoc = isBm ? 'Terusan Luma & Jeti Pelabuhan' : 'Luma Canal & Mooring Pier';
    }

    if (this.lastLocText !== targetLoc) {
      this.lastLocText = targetLoc;
      const locBadge = document.getElementById('luma3dLocationName');
      if (locBadge) locBadge.textContent = targetLoc;
    }
  }

  // Walk Gio directly to character and trigger interrogation
  walkToAndInterrogate(charId) {
    const char = this.characters.find(c => c.id === charId);
    if (!char) return;

    if (window.gestigoAudio && typeof window.gestigoAudio.playClick === 'function') {
      window.gestigoAudio.playClick();
    }

    // Open in initial question-selection invitation mode (no pre-revealed answer)
    this.playerTargetPos = null;
    this.openInterrogationDialog(char, null);
  }

  // Trigger from Proximity Button [E]
  triggerNearestInteraction() {
    if (this.isNearPlanter) {
      this.searchGardenPlanter();
      return;
    }
    if (this.isNearWheel) {
      this.spinCarnivalWheel();
      return;
    }
    if (this.nearestChar) {
      this.walkToAndInterrogate(this.nearestChar.id);
    }
  }

  // ==================== INTERROGATION DIALOGUE (LANDSCAPE FORMAT) ====================
  // Overhauled 50/50 Split Screen matching SignBridge Communicator:
  // LEFT: Massive 50% Screen Live Webcam with 21-Joint Skeletal Hand Tracking
  // RIGHT: Suspect Profile, Alibi Testimony, Required Sign, and Live Real-Time Bridge
  openInterrogationDialog(char, activeQuestion = null) {
    this.activeCharacter = char;
    this.isInterrogating = true;

    let normQ = null;
    if (activeQuestion) {
      normQ = String(activeQuestion).toUpperCase().trim();
      if (normQ === 'ALIBI') normQ = 'A';
      if (normQ === 'BOOK') normQ = 'B';
      if (normQ === 'WITNESS') normQ = 'W';
      if (normQ === 'VERIFY') normQ = 'V';
      if (normQ === 'LEAD') normQ = 'L';
      if (!['A', 'B', 'W', 'V', 'L'].includes(normQ)) normQ = null;
    }
    this.activeQuestionLetter = normQ;

    const dialog = document.getElementById('luma3dInterrogationBox');
    if (!dialog) return;

    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));
    const photoUrl = char.illustratedCard || char.avatar;
    const isSuspect = char.isSuspect;
    
    // Questions definitions
    const questionsMeta = [
      { letter: 'A', name: 'Alibi', nameBm: 'Alibi', prompt: 'Where were you between 5:30 and 6:10 PM?', promptBm: 'Di manakah anda berada antara jam 5:30 hingga 6:10 petang?', img: 'assets/signs/hand_A_alibi.png' },
      { letter: 'B', name: 'Book', nameBm: 'Buku Mitos', prompt: 'What do you know about the missing Myth Book?', promptBm: 'Apakah yang anda tahu tentang Buku Mitos yang hilang itu?', img: 'assets/signs/hand_B_book.png' },
      { letter: 'W', name: 'Witness', nameBm: 'Saksi', prompt: 'Did you notice anything suspicious?', promptBm: 'Adakah anda melihat sesuatu yang mencurigakan?', img: 'assets/signs/hand_W_witness.png' },
      { letter: 'V', name: 'Verify', nameBm: 'Pengesahan', prompt: 'What evidence supports your statement?', promptBm: 'Apakah bukti yang menyokong kenyataan anda?', img: 'assets/signs/hand_V_verify.png' },
      { letter: 'L', name: 'Lead', nameBm: 'Petunjuk', prompt: 'Who or what should I investigate next?', promptBm: 'Siapa atau apakah yang patut saya siasat seterusnya?', img: 'assets/signs/hand_L_lead.png' }
    ];

    const askedMap = this.questionsAsked[char.id] || {};
    const askedCount = Object.keys(askedMap).length;
    const activeQ = normQ ? questionsMeta.find(q => q.letter === normQ) : null;
    const activeData = (activeQ && char.dialogue && char.dialogue[activeQ.letter]) ? char.dialogue[activeQ.letter] : null;

    dialog.className = "fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto";

    dialog.innerHTML = `
      <div class="relative bg-slate-950/95 border-2 ${isSuspect ? 'border-purple-500/80 shadow-[0_0_60px_rgba(168,85,247,0.35)]' : 'border-cyan-500/80 shadow-[0_0_60px_rgba(6,182,212,0.35)]'} rounded-3xl max-w-7xl w-full mx-auto max-h-[94vh] flex flex-col overflow-hidden backdrop-blur-2xl animate-fadeIn text-slate-100 shadow-2xl">
        
        <!-- TOP DIALOGUE HEADER -->
        <div class="px-5 py-3 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full ${isSuspect ? 'bg-purple-400' : 'bg-cyan-400'} animate-ping"></span>
            <div>
              <span class="text-xs sm:text-sm font-mono font-black ${isSuspect ? 'text-purple-300' : 'text-cyan-300'} tracking-wider uppercase">
                ${isSuspect ? (isBm ? 'SESI SOAL SIASAT SUSPEK' : 'SUSPECT INTERROGATION') : (isBm ? 'SESI TEMU BUAL SAKSI' : 'WITNESS INTERVIEW')} • ${char.name}
              </span>
              <span class="hidden sm:inline text-xs font-mono text-slate-400 ml-2">
                (${isBm ? (char.roleBm || char.role) : char.role} — ${char.locationName})
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800 text-amber-300 border border-slate-700">
              QUESTIONS LOGGED: ${askedCount}/5
            </span>
            <button onclick="gestigoLuma3D.closeInterrogationDialog()" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer font-bold text-sm" title="Close [Esc]">
              ✕
            </button>
          </div>
        </div>

        <!-- 50/50 SPLIT SCREEN -->
        <div class="flex-1 flex flex-col lg:flex-row overflow-y-auto min-h-0">
          
          <!-- LEFT HALF: LIVE CAMERA & ASL SENSOR -->
          <div class="w-full lg:w-1/2 p-4 sm:p-5 flex flex-col justify-between bg-slate-900/40 border-b lg:border-b-0 lg:border-r border-slate-800">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span>ASL WEBCAM SENSOR (A, B, W, V, L)</span>
                </span>
                <span class="text-[10px] font-mono text-slate-400">
                  Hold hand shape 0.4s to ask question
                </span>
              </div>

              <!-- CAMERA CONTAINER -->
              <div id="interrogationCameraContainer" class="relative w-full h-[320px] sm:h-[400px] md:h-[440px] rounded-2xl overflow-hidden bg-slate-950 border-2 border-cyan-400/80 shadow-[0_0_40px_rgba(6,182,212,0.3)] flex items-center justify-center">
                <video id="interrogationWebcamVideo" autoplay playsinline muted class="w-full h-full object-cover transform -scale-x-100"></video>
                <canvas id="interrogationLandmarkCanvas" class="absolute inset-0 w-full h-full object-cover pointer-events-none transform -scale-x-100"></canvas>

                <div id="interrogationCameraFallback" class="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/95 text-cyan-400 p-4 space-y-2">
                  <div class="relative w-14 h-14 flex items-center justify-center">
                    <span class="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-30"></span>
                    <span class="text-3xl">📷</span>
                  </div>
                  <p class="text-xs font-mono font-bold tracking-wide text-cyan-300">OPTICAL ASL DETECTOR READY</p>
                  <p class="text-[10px] font-mono text-slate-400 text-center max-w-xs">Show fingerspelled letter (A, B, W, V, or L) in camera frame, or press key / click question cards.</p>
                  <p id="interrogationCamError" class="hidden text-[11px] font-mono font-bold text-amber-300 text-center max-w-sm leading-relaxed"></p>
                </div>

                <!-- Live Detection Badge -->
                <div class="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/60 flex items-center gap-2 shadow-lg">
                  <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span class="text-[10px] font-mono font-bold text-slate-300">DETECTED:</span>
                  <strong id="interrogationDetectedSignText" class="text-xs font-mono font-black text-cyan-300">WAITING...</strong>
                  <span id="interrogationConfidenceText" class="text-[10px] font-mono font-bold text-amber-400">0%</span>
                </div>

                <!-- Camera Toggle -->
                <div class="absolute top-3 right-3 flex items-center gap-1">
                  <button type="button" onclick="gestigoLuma3D.toggleInterrogationCamera()" class="bg-slate-900/90 hover:bg-slate-800 text-cyan-300 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border border-cyan-500/40 transition-colors">
                    <span id="interrogationCamStatusText">CAMERA ON</span>
                  </button>
                </div>

                <!-- Target letter overlay guide -->
                <div class="absolute bottom-3 inset-x-3 bg-slate-950/90 backdrop-blur-md p-2 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span class="text-slate-400">Status:</span>
                  <span class="text-amber-300 font-bold">${activeQ ? `Asking [${activeQ.letter}] — ${activeQ.name}` : (isBm ? 'Sedia: Buat Isyarat A, B, W, V, atau L' : 'Ready: Show Sign A, B, W, V, or L')}</span>
                </div>
              </div>
            </div>

            <!-- Accessibility One-Click Sign Simulators -->
            <div class="mt-3 pt-3 border-t border-slate-800">
              <span class="text-[10px] font-mono text-slate-400 block mb-1.5 uppercase tracking-wider">
                ${isBm ? 'Pintasan Papan Kekunci / Klik (Isyarat Huruf):' : 'Keyboard / Click Fallback (Fingerspell Signs):'}
              </span>
              <div class="grid grid-cols-5 gap-1.5">
                ${questionsMeta.map(q => `
                  <button onclick="gestigoLuma3D.onSignInterrogate('${q.letter}')" class="py-1.5 px-1 rounded-lg bg-slate-800 hover:bg-slate-700 border ${normQ === q.letter ? 'border-cyan-400 bg-cyan-950/80 text-cyan-200 shadow' : 'border-slate-700 text-slate-300'} text-[11px] font-mono font-bold transition-all flex flex-col items-center">
                    <span class="text-amber-400 font-black">${q.letter}</span>
                    <span class="text-[9px] text-slate-400 truncate w-full text-center">${q.name}</span>
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- RIGHT HALF: CHARACTER PROFILE & 5-QUESTION DECK -->
          <div class="w-full lg:w-1/2 p-4 sm:p-5 flex flex-col justify-between space-y-4">
            
            <!-- Character Header Card -->
            <div class="flex items-center gap-3.5 bg-slate-900/70 p-3 rounded-2xl border border-slate-800">
              <div class="w-14 h-14 rounded-2xl overflow-hidden border-2 ${isSuspect ? 'border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'} bg-slate-950 shrink-0">
                <img src="${photoUrl}" alt="${char.name}" class="w-full h-full object-cover">
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <h3 class="text-sm sm:text-base font-extrabold text-white truncate">${char.name}</h3>
                  <span class="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${isSuspect ? 'bg-purple-950 text-purple-300 border border-purple-500/50' : 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'}">
                    ${isSuspect ? 'SUSPECT' : 'WITNESS'}
                  </span>
                </div>
                <p class="text-xs text-amber-300 font-mono">${isBm ? (char.roleBm || char.role) : char.role}</p>
                <p class="text-[10px] text-slate-400 font-mono truncate">📍 ${char.locationName}</p>
              </div>
            </div>

            <!-- THE 5 QUESTION CARDS -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                  ${isBm ? 'PILIH SOALAN SIASATAN:' : 'SELECT INVESTIGATION QUESTION:'}
                </span>
                <span class="text-[10px] font-mono text-slate-400">
                  Click card, press [A, B, W, V, L] or show hand sign
                </span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-5 gap-2">
                ${questionsMeta.map(q => {
                  const isCur = (normQ === q.letter);
                  const isQAsked = !!(askedMap && askedMap[q.letter]);
                  return `
                    <button onclick="gestigoLuma3D.askQuestion('${char.id}', '${q.letter}')" class="p-2 rounded-xl border-2 transition-all flex flex-col items-center text-center cursor-pointer relative group ${isCur ? 'border-amber-400 bg-amber-950/60 shadow-[0_0_20px_rgba(245,158,11,0.5)] ring-2 ring-amber-400/50' : (isQAsked ? 'border-emerald-500/60 bg-emerald-950/30' : 'border-slate-800 bg-slate-900/60 hover:border-slate-600')}">
                      <div class="w-12 h-12 rounded-lg overflow-hidden bg-white mb-1.5 shadow">
                        <img src="${q.img}" alt="${q.name}" class="w-full h-full object-cover">
                      </div>
                      <strong class="text-xs font-mono font-black ${isCur ? 'text-amber-300' : 'text-slate-200'}">
                        ${q.letter} — ${q.name}
                      </strong>
                      <span class="text-[8px] font-mono ${isQAsked ? 'text-emerald-400 font-bold' : 'text-slate-400'} mt-0.5">
                        ${isQAsked ? '✓ LOGGED' : 'PRESS [' + q.letter + ']'}
                      </span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- DIALOGUE CONTENT AREA: INVITATION OR SPOKEN ANSWER -->
            ${!normQ ? `
              <!-- INVITATION STATE: Prompts player to choose question and sign first! -->
              <div class="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-2 border-dashed border-cyan-500/50 text-center space-y-3 animate-fadeIn my-auto">
                <div class="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-bounce">
                  🤟
                </div>
                <div>
                  <h4 class="text-sm sm:text-base font-black text-cyan-300 font-sans tracking-wide uppercase">
                    ${isBm ? 'Pilih Soalan Yang Ingin Ditanya Dahulu!' : 'Choose Which Question You Want To Ask First!'}
                  </h4>
                  <p class="text-xs font-mono text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                    ${isBm 
                      ? 'Buat bentuk isyarat tangan ASL (A, B, W, V, atau L) di hadapan kamera untuk bertanya kepada ' + char.name + ', atau tekan kekunci [A, B, W, V, L].' 
                      : 'Show the fingerspelled sign (A, B, W, V, or L) in front of the camera, or press [A, B, W, V, L] to interrogate ' + char.name + '.'}
                  </p>
                </div>
                <div class="inline-flex items-center gap-2 bg-slate-900/90 px-3.5 py-1.5 rounded-xl border border-cyan-500/40 text-[11px] font-mono text-amber-300 shadow">
                  <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>${isBm ? 'KAMERA AKTIF • BENTUKKAN ISYARAT UNTUK BERTANYA' : 'CAMERA ACTIVE • MAKE HAND SIGN TO ASK QUESTION'}</span>
                </div>
              </div>
            ` : `
              <!-- REVEALED QUESTION & SPOKEN TESTIMONY POPUP -->
              <div class="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 space-y-2.5 animate-fadeIn">
                <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span class="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                    <span>❓</span>
                    <span>${(localStorage.getItem('gestigo_player_username') || (isBm ? 'Anda' : 'You'))} ${(localStorage.getItem('gestigo_player_username') && localStorage.getItem('gestigo_player_username') !== 'You' && localStorage.getItem('gestigo_player_username') !== 'Anda') ? (isBm ? 'bertanya' : 'asks') : (isBm ? 'bertanya' : 'ask')} [${activeQ.letter}]: "${isBm ? activeQ.promptBm : activeQ.prompt}"</span>
                  </span>
                  <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                    TESTIMONY
                  </span>
                </div>

                <!-- Spoken Dialogue -->
                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <p class="text-xs sm:text-sm font-sans italic text-slate-100 leading-relaxed">
                    "${isBm ? (activeData.replyBm || activeData.reply) : activeData.reply}"
                  </p>
                </div>

                <!-- Gio Forensic Deduction Note -->
                <div class="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs font-mono space-y-1">
                  <div class="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
                    <span>🔍</span>
                    <span>DETECTIVE GIO'S FORENSIC ANALYSIS:</span>
                  </div>
                  <p class="text-[11px] text-amber-200/90 leading-snug">
                    ${isBm ? (activeData.clueNoteBm || activeData.clueNote) : activeData.clueNote}
                  </p>
                  ${activeData.clueId ? `
                    <div class="pt-1 flex items-center gap-2 text-[10px] font-bold text-emerald-400">
                      <span>✨ Evidence Clue Added:</span>
                      <span class="bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/50">${activeData.clueId}</span>
                    </div>
                  ` : ''}
                </div>
              </div>
            `}

            <!-- Footer Return Link & Action Button -->
            <div class="flex items-center justify-between pt-1">
              <button onclick="gestigoLuma3D.closeInterrogationDialog()" class="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                ← ${isBm ? 'Kembali ke Peta Festival' : 'Return to Festival Map'}
              </button>
              <button onclick="gestigoLuma3D.openEvidenceBoard()" class="px-3 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer">
                <span>📋</span>
                <span>Open Case File</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    `;

    this.startInterrogationCamera();
    this.renderCarousel();
    this.updateHUD();
  }
  closeInterrogationDialog() {
    this.isInterrogating = false;
    this.activeCharacter = null;
    this.stopInterrogationCamera();
    const dialog = document.getElementById('luma3dInterrogationBox');
    if (dialog) dialog.className = "hidden";
  }

  // Show the real reason the camera could not start (instead of silently falling back)
  showInterrogationCamError(err) {
    const el = document.getElementById('interrogationCamError');
    if (!el) return;
    const name = err && err.name ? err.name : '';
    let msg;
    if (name === 'NotAllowedError' || name === 'PermissionDeniedError' || name === 'SecurityError') {
      msg = '🚫 Camera is blocked. Click the camera/lock icon in the address bar, choose "Allow", then press the camera button (top right) to try again.';
    } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
      msg = '📷 No camera found. Plug in a webcam, or play with the keyboard (A, B, W, V, L) or by clicking the question cards.';
    } else if (name === 'NotReadableError' || name === 'TrackStartError' || name === 'AbortError') {
      msg = '⚠️ The camera is being used by another app or browser tab (Zoom, Teams, another SignPlay tab...). Close it, then press the camera button (top right) to try again.';
    } else if (!window.isSecureContext) {
      msg = '🔒 The camera only works on https:// or localhost. Open the game from http://localhost:5500 instead of an IP address.';
    } else {
      msg = '⚠️ The camera could not start' + (name ? ' (' + name + ')' : '') + '. Press the camera button (top right) to try again, or use the keyboard.';
    }
    el.textContent = msg;
    el.classList.remove('hidden');
  }

  async startInterrogationCamera() {
    this.stopInterrogationCamera();
    const video = document.getElementById('interrogationWebcamVideo');
    const canvas = document.getElementById('interrogationLandmarkCanvas');
    const fallback = document.getElementById('interrogationCameraFallback');
    const statusText = document.getElementById('interrogationCamStatusText');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (video) video.classList.add('hidden');
      if (fallback) fallback.classList.remove('hidden');
      if (statusText) statusText.textContent = 'SENSOR SIMULATION';
      this.showInterrogationCamError(null);
      return;
    }

    try {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
          audio: false
        });
      } catch (firstErr) {
        // Some webcams reject the size/facing preferences: retry with any camera
        if (firstErr && firstErr.name === 'OverconstrainedError') {
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        } else {
          throw firstErr;
        }
      }
      this.interrogationStream = stream;
      if (video) {
        video.srcObject = stream;
        video.classList.remove('hidden');
        await video.play();
      }
      if (fallback) fallback.classList.add('hidden');
      const camErr = document.getElementById('interrogationCamError');
      if (camErr) camErr.classList.add('hidden');
      if (statusText) statusText.textContent = 'CAMERA ACTIVE';

      if (window.gestigoGesture) {
        window.gestigoGesture.init('interrogationWebcamVideo', 'interrogationLandmarkCanvas');
        window.gestigoGesture.stream = stream;
        window.gestigoGesture.video = video;
        window.gestigoGesture.canvas = canvas;
        if (canvas) {
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
        }
        window.gestigoGesture.isTracking = true;
        window.gestigoGesture.initMediaPipe();
      }
    } catch (err) {
      console.warn("Interrogation camera access error:", err);
      if (video) video.classList.add('hidden');
      if (fallback) fallback.classList.remove('hidden');
      if (statusText) statusText.textContent = 'RETRY CAMERA';
      this.showInterrogationCamError(err);
    }
  }

  stopInterrogationCamera() {
    if (this.interrogationStream) {
      try {
        this.interrogationStream.getTracks().forEach(t => t.stop());
      } catch (e) {}
      this.interrogationStream = null;
    }
    const video = document.getElementById('interrogationWebcamVideo');
    if (video) video.srcObject = null;
  }

  toggleInterrogationCamera() {
    if (this.interrogationStream) {
      this.stopInterrogationCamera();
      const video = document.getElementById('interrogationWebcamVideo');
      const fallback = document.getElementById('interrogationCameraFallback');
      const statusText = document.getElementById('interrogationCamStatusText');
      if (video) video.classList.add('hidden');
      if (fallback) fallback.classList.remove('hidden');
      if (statusText) statusText.textContent = 'CAM PAUSED';
    } else {
      this.startInterrogationCamera();
    }
  }

  // Real-time ASL Interrogation input from camera or key
  onSignInterrogate(letter) {
    if (!this.isInterrogating || !this.activeCharacter) return;
    const l = (letter || '').toUpperCase().trim();
    if (!['A', 'B', 'W', 'V', 'L'].includes(l)) return;

    this.askQuestion(this.activeCharacter.id, l);
  }

  // Select question and log clue
  askQuestion(charId, letter) {
    const char = this.characters.find(c => c.id === charId) || this.activeCharacter;
    if (!char) return;

    this.activeQuestionLetter = letter;
    this.questionsAsked[char.id] = this.questionsAsked[char.id] || {};
    this.questionsAsked[char.id][letter] = true;
    localStorage.setItem('gestigo_level3_asked', JSON.stringify(this.questionsAsked));

    const qData = (char.dialogue && char.dialogue[letter]) ? char.dialogue[letter] : null;
    if (qData && qData.clueId) {
      if (!this.collectedClues.includes(qData.clueId)) {
        this.collectedClues.push(qData.clueId);
        localStorage.setItem('gestigo_level3_clues', JSON.stringify(this.collectedClues));
      }
    }

    this.alibisCollected[char.id] = true;
    localStorage.setItem('gestigo_level3_alibis', JSON.stringify(this.alibisCollected));

    if (window.gestigoAudio && typeof window.gestigoAudio.playSuccess === 'function') {
      window.gestigoAudio.playSuccess();
    }

    this.openInterrogationDialog(char, letter);
    this.renderCarousel();
    this.updateHUD();
  }

  // ==================== 3D GARDEN SHED & STONE PLANTER OBJECT ====================
  buildGardenAndPlanter() {
    // 1. Garden Shed beside Mira Thorne at (-18.5, 0, -2)
    const shedGroup = new THREE.Group();
    shedGroup.position.set(-18.5, 0, -2);

    const woodMat = new THREE.MeshLambertMaterial({ color: 0x5c2b0e });
    const roofMat = new THREE.MeshLambertMaterial({ color: 0x27272a });

    const shedBase = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.8, 3.2), woodMat);
    shedBase.position.y = 1.4;
    shedBase.castShadow = true;
    shedGroup.add(shedBase);

    const shedRoof = new THREE.Mesh(new THREE.ConeGeometry(2.8, 1.4, 4), roofMat);
    shedRoof.position.y = 3.5;
    shedRoof.rotation.y = Math.PI / 4;
    shedGroup.add(shedRoof);
    this.scene.add(shedGroup);

    // 2. Large Stone Planter at (-17.5, 0, -4.5)
    const planterGroup = new THREE.Group();
    planterGroup.position.set(-17.5, 0, -4.5);
    planterGroup.userData = { isPlanter: true };

    const stoneMat = new THREE.MeshLambertMaterial({ color: 0x71717a });
    const basin = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, 1.2, 16), stoneMat);
    basin.position.y = 0.6;
    basin.castShadow = true;
    basin.receiveShadow = true;
    planterGroup.add(basin);

    const soilMat = new THREE.MeshLambertMaterial({ color: 0x271c14 });
    const soil = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.35, 0.2, 16), soilMat);
    soil.position.y = 1.15;
    planterGroup.add(soil);

    const bushMat = new THREE.MeshLambertMaterial({ color: 0x166534 });
    const bush1 = new THREE.Mesh(new THREE.SphereGeometry(0.85, 8, 8), bushMat);
    bush1.position.set(0, 1.6, 0);
    planterGroup.add(bush1);

    const flowerMat = new THREE.MeshLambertMaterial({ color: 0xa855f7 });
    const flower = new THREE.Mesh(new THREE.SphereGeometry(0.35, 6, 6), flowerMat);
    flower.position.set(0.3, 1.9, 0.2);
    planterGroup.add(flower);

    // Displaced stone and purple ribbon fragment!
    const ribbonMat = new THREE.MeshBasicMaterial({ color: 0xc084fc });
    const ribbon = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.05, 0.2), ribbonMat);
    ribbon.position.set(1.2, 0.1, 0.4);
    ribbon.rotation.y = 0.5;
    planterGroup.add(ribbon);

    this.scene.add(planterGroup);
    this.planterMesh = planterGroup;
  }

  // Player presses [E] or clicks near the stone planter
  searchGardenPlanter() {
    if (this.isBookRecovered) {
      this.showDiscoveryModal(
        "📖 THE MYTH BOOK HAS ALREADY BEEN RECOVERED",
        "You already recovered the Stolen Myth Book from beneath this displaced planter! It is safely cataloged in your Case File.",
        "assets/signs/forensic/clue_book.png"
      );
      return;
    }

    this.isBookRecovered = true;
    localStorage.setItem('gestigo_level3_book_recovered', 'true');
    if (!this.collectedClues.includes('clue_recovered_book')) {
      this.collectedClues.push('clue_recovered_book');
      localStorage.setItem('gestigo_level3_clues', JSON.stringify(this.collectedClues));
    }

    if (window.gestigoAudio && typeof window.gestigoAudio.playLevelComplete === 'function') {
      window.gestigoAudio.playLevelComplete();
    }

    this.updateHUD();
    this.showDiscoveryModal(
      "📦 SACRED MYTH BOOK RECOVERED!",
      "Beneath the displaced stone planter beside Mira's shed, you uncover a heavy parcel wrapped in coarse brown butcher paper and tied with a purple ribbon!\n\nUnwrapping it reveals... THE MISSING SACRED MYTH BOOK! The ancient illuminated pages and handwritten translation notes on myth symbols are completely intact!\n\n✨ Critical Physical Evidence Logged into Case File!",
      "assets/signs/forensic/clue_book.png"
    );
  }

  showDiscoveryModal(title, text, imageSrc) {
    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn";
    modal.innerHTML = `
      <div class="bg-slate-950 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-4 shadow-[0_0_80px_rgba(245,158,11,0.5)]">
        <div class="w-20 h-20 mx-auto rounded-2xl bg-amber-500/20 border-2 border-amber-400 p-2 flex items-center justify-center">
          <img src="${imageSrc}" class="w-full h-full object-contain filter drop-shadow" onerror="this.src='assets/player-detective.png'">
        </div>
        <h3 class="text-lg sm:text-xl font-black text-amber-300 font-sans tracking-wide uppercase">${title}</h3>
        <p class="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed whitespace-pre-line">${text}</p>
        <button onclick="this.closest('.fixed').remove()" class="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs font-mono uppercase tracking-wider cursor-pointer shadow-lg">
          ${isBm ? 'FAHAM • TERUSKAN SIASATAN' : 'UNDERSTOOD • CONTINUE INVESTIGATION'}
        </button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // ==================== EVIDENCE BOARD & CASE FILE MODAL ====================
  openEvidenceBoard(activeTab = 'timeline') {
    const modal = document.getElementById('luma3dEvidenceModal');
    if (!modal) return;
    modal.className = "fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto";

    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));
    const cluesList = [
      { id: 'clue_archive_access', title: 'Archive Access Inquiry', titleBm: 'Pertanyaan Kunci Arkib', desc: 'Lina confirms Maya asked about the restricted archive key.', source: 'Lina Arvelle' },
      { id: 'clue_camera_reset', title: 'Camera Maintenance Outage', titleBm: 'Penyelenggaraan Kamera', desc: 'Rex confirms 12-minute surveillance reset at 17:52-18:04.', source: 'Rex Kendall' },
      { id: 'clue_chen_purple', title: 'Side Gate Purple Sleeve', titleBm: 'Lengan Baju Ungu', desc: 'Officer Chen saw figure in purple rushing toward garden.', source: 'Officer Chen' },
      { id: 'clue_sora_photo', title: '5:58 PM Museum Photo', titleBm: 'Foto 5:58 Petang', desc: 'Sora photographed a person in purple sleeve and gold pin.', source: 'Sora Dain' },
      { id: 'clue_cafe_receipt', title: 'Butcher Wrapping Paper', titleBm: 'Kertas Pembalut Kafe', desc: 'Kaelen sold coarse butcher wrapping paper at 17:47.', source: 'Kaelen Vance' },
      { id: 'clue_displaced_planter', title: 'Displaced Stone Planter & Ribbon', titleBm: 'Pasu Batu Beralih & Reben', desc: 'Mira found displaced planter and purple ribbon near shed.', source: 'Mira Thorne' },
      { id: 'clue_artist_sketch', title: 'Witness Sketch (Purple Beret)', titleBm: 'Lakaran Saksi (Beret Ungu)', desc: 'Tessa sketched figure in purple beret, glasses, and gold pin.', source: 'Tessa Gray' },
      { id: 'clue_recovered_book', title: 'Recovered Stolen Myth Book', titleBm: 'Buku Mitos Dijumpai', desc: 'Stolen book discovered under large stone planter in garden.', source: 'Garden Search' }
    ];

    const timeline = (window.GESTIGO_INTERVIEWS && window.GESTIGO_INTERVIEWS.case && window.GESTIGO_INTERVIEWS.case.timeline) || [
      { time: '17:30', event: 'Myth Book confirmed secure inside vitrine' },
      { time: '17:47', event: 'Cafe purchase of butcher wrapping paper' },
      { time: '17:52–18:04', event: '12-minute camera maintenance outage' },
      { time: '17:58', event: 'Figure in purple photographed near side exit' },
      { time: '18:02', event: 'Officer Chen spots figure heading toward garden' },
      { time: '18:05', event: 'Displaced planter and purple ribbon near shed' },
      { time: '18:08', event: 'Witness sketch of purple beret, glasses, gold pin' },
      { time: '18:10', event: 'Theft discovered; glass vitrine unlocked' }
    ];

    modal.innerHTML = `
      <div class="relative bg-slate-950/95 border-2 border-cyan-500 rounded-3xl p-5 sm:p-7 max-w-4xl w-full mx-auto my-auto space-y-5 shadow-[0_0_80px_rgba(6,182,212,0.5)] backdrop-blur-2xl animate-fadeIn text-slate-100 max-h-[88vh] flex flex-col overflow-hidden">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center gap-3">
            <span class="text-2xl">📋</span>
            <div>
              <h2 class="text-lg sm:text-xl font-black text-cyan-300 font-sans uppercase">
                ${isBm ? 'FAIL KES: BUKU MITOS YANG HILANG' : 'CASE FILE: THE MISSING MYTH BOOK'}
              </h2>
              <p class="text-xs font-mono text-slate-400">
                ${isBm ? 'Papan Bukti Forensik & Rekod Kronologi Siasatan' : 'Forensic Evidence Board & Case Chronology'}
              </p>
            </div>
          </div>
          <button onclick="document.getElementById('luma3dEvidenceModal').classList.add('hidden')" class="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer">
            ✕
          </button>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button onclick="gestigoLuma3D.openEvidenceBoard('timeline')" class="px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${activeTab === 'timeline' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}">
            🕒 Case Timeline
          </button>
          <button onclick="gestigoLuma3D.openEvidenceBoard('clues')" class="px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${activeTab === 'clues' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}">
            🔍 Corroborating Clues (${this.collectedClues.length}/8)
          </button>
          <button onclick="gestigoLuma3D.openEvidenceBoard('dossiers')" class="px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${activeTab === 'dossiers' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}">
            👥 10 Characters
          </button>
        </div>

        <!-- Tab Content -->
        <div class="max-h-[60vh] overflow-y-auto pr-1">
          ${activeTab === 'timeline' ? `
            <div class="space-y-2.5">
              ${timeline.map(t => `
                <div class="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span class="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-black shrink-0">
                    ${t.time}
                  </span>
                  <div class="flex-1">
                    <p class="text-xs sm:text-sm font-sans font-bold text-white">${t.event}</p>
                    ${t.significance ? `<p class="text-[11px] font-mono text-slate-400 mt-0.5">${t.significance}</p>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : activeTab === 'clues' ? `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${cluesList.map(c => {
                const isAcquired = this.collectedClues.includes(c.id);
                return `
                  <div class="p-3.5 rounded-2xl border ${isAcquired ? 'border-emerald-500/80 bg-emerald-950/40' : 'border-slate-800 bg-slate-900/40 opacity-60'} space-y-1">
                    <div class="flex items-center justify-between">
                      <strong class="text-xs font-mono font-black ${isAcquired ? 'text-emerald-300' : 'text-slate-400'}">
                        ${isBm ? c.titleBm : c.title}
                      </strong>
                      <span class="text-[9px] font-mono px-2 py-0.5 rounded ${isAcquired ? 'bg-emerald-900 text-emerald-200 border border-emerald-500' : 'bg-slate-800 text-slate-400'}">
                        ${isAcquired ? '✓ VERIFIED' : '? UNCOLLECTED'}
                      </span>
                    </div>
                    <p class="text-[11px] font-mono text-slate-300 leading-snug">${c.desc}</p>
                    <span class="text-[10px] font-mono text-cyan-400 block pt-1">Source: ${c.source}</span>
                  </div>
                `;
              }).join('')}
            </div>
          ` : `
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
              ${this.characters.map(c => {
                const asked = Object.keys(this.questionsAsked[c.id] || {}).length;
                return `
                  <div onclick="document.getElementById('luma3dEvidenceModal').classList.add('hidden'); gestigoLuma3D.walkToAndInterrogate('${c.id}')" class="p-3 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-400 cursor-pointer flex flex-col items-center text-center space-y-2 transition-all">
                    <div class="w-14 h-14 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                      <img src="${c.avatar}" class="w-full h-full object-cover">
                    </div>
                    <div>
                      <h4 class="text-xs font-bold text-white truncate max-w-[110px]">${c.name}</h4>
                      <p class="text-[10px] font-mono text-amber-300 truncate max-w-[110px]">${isBm ? (c.roleBm || c.role) : c.role}</p>
                      <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 mt-1 inline-block">
                        ${asked}/5 Asked
                      </span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <div class="flex items-center justify-between border-t border-slate-800 pt-3">
          <button onclick="document.getElementById('luma3dEvidenceModal').classList.add('hidden')" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-mono text-xs font-bold">
            Close Case File
          </button>
          <button onclick="document.getElementById('luma3dEvidenceModal').classList.add('hidden'); gestigoLuma3D.openAccusationChamber()" class="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-mono text-xs font-black">
            Proceed to Accusation →
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
  }

  // ==================== ACCUSATION CHAMBER & MAYA CONFESSION ====================
  openAccusationChamber() {
    if (window.gestigoAudio && typeof window.gestigoAudio.playBossAlarm === 'function') {
      window.gestigoAudio.playBossAlarm();
    }

    const modal = document.getElementById('luma3dAccusationModal');
    if (!modal) return;
    modal.className = "fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto";

    const suspects = this.characters.filter(c => c.isSuspect);
    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));

    modal.innerHTML = `
      <div class="relative bg-slate-950/95 border-3 border-amber-500 rounded-3xl p-5 sm:p-8 max-w-4xl w-full mx-auto my-auto space-y-6 shadow-[0_0_80px_rgba(245,158,11,0.5)] backdrop-blur-2xl animate-fadeIn max-h-[88vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b-2 border-amber-500/30 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              ⚖️
            </div>
            <div>
              <h2 class="text-lg sm:text-2xl font-black text-amber-300 tracking-wide uppercase font-sans">
                ${isBm ? 'SIDANG DEDUKSI AKHIR: DAKWA DALANG UTAMA' : 'THE FINAL DEDUCTION: ACCUSE THE MASTERMIND'}
              </h2>
              <p class="text-xs text-slate-300 font-mono mt-0.5">
                ${isBm ? 'Pilih suspek yang mengambil Buku Mitos dan bentangkan bukti forensik:' : 'Select the suspect who stole the Myth Book and confront them with evidence:'}
              </p>
            </div>
          </div>
          <button onclick="document.getElementById('luma3dAccusationModal').classList.add('hidden')" class="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer border border-slate-700">
            ✕
          </button>
        </div>

        <!-- 6 Suspect Cards Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          ${suspects.map(s => `
            <div onclick="gestigoLuma3D.selectAccusedSuspect('${s.id}')" id="accuse_card_${s.id}" class="accuse-suspect-card p-3 rounded-2xl border-2 border-slate-800 bg-slate-900/80 hover:border-amber-400 cursor-pointer transition-all flex flex-col items-center text-center space-y-2 group">
              <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-slate-700 group-hover:border-amber-400 shadow-md bg-slate-950">
                <img src="${s.avatar}" class="w-full h-full object-cover" />
              </div>
              <div>
                <h4 class="text-sm font-extrabold text-white group-hover:text-amber-300">${s.name}</h4>
                <p class="text-[10px] text-amber-400 font-mono">${isBm ? (s.roleBm || s.role) : s.role}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Forensic Proof Form -->
        <div id="luma3dProofForm" class="hidden p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 to-slate-900 border-2 border-purple-500/50 space-y-3">
          <span class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
            CONFRONT SUSPECT WITH PHYSICAL PROOF CHAIN:
          </span>
          <div class="space-y-2 text-xs">
            <button onclick="gestigoLuma3D.confirmFinalProof('book_ribbon')" class="w-full text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border-2 border-amber-500 text-slate-200 cursor-pointer font-sans shadow-lg">
              [A] <strong class="text-amber-300">The 17:52-18:04 camera outage matches Sora's photo and Tessa's sketch (purple beret, glasses, gold pin), and the Myth Book was recovered wrapped in Kaelen's butcher paper tied with purple ribbon beneath Mira's planter!</strong>
            </button>
            <button onclick="gestigoLuma3D.confirmFinalProof('wrong_money')" class="w-full text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-slate-200 cursor-pointer font-sans">
              [B] The suspect was seen paying 10,000 gold coins at the canal barge.
            </button>
            <button onclick="gestigoLuma3D.confirmFinalProof('wrong_alarm')" class="w-full text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-slate-200 cursor-pointer font-sans">
              [C] The vitrine glass was broken with an iron hammer from the festival stage.
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-slate-800">
          <button onclick="document.getElementById('luma3dAccusationModal')?.classList.add('hidden')" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold cursor-pointer border border-slate-700">
            ${isBm ? 'Kembali Menyiasat' : 'Resume Investigation'}
          </button>
          <span class="text-xs font-mono text-slate-400">
            ${isBm ? "Pastikan anda menyemak lakaran saksi dan pasu bunga Mira." : "Check Tessa's sketch and Mira's stone planter before accusing."}
          </span>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
  }

  selectAccusedSuspect(suspectId) {
    if (window.gestigoAudio && typeof window.gestigoAudio.playClick === 'function') {
      window.gestigoAudio.playClick();
    }
    this.selectedSuspectId = suspectId;
    document.querySelectorAll('.accuse-suspect-card').forEach(card => {
      card.className = "accuse-suspect-card p-3 rounded-2xl border-2 border-slate-800 bg-slate-900/80 hover:border-amber-400 cursor-pointer transition-all flex flex-col items-center text-center space-y-2 group";
    });
    const chosen = document.getElementById(`accuse_card_${suspectId}`);
    if (chosen) {
      chosen.className = "accuse-suspect-card p-3 rounded-2xl border-2 border-amber-400 bg-amber-950/60 shadow-[0_0_25px_rgba(245,158,11,0.5)] cursor-pointer transition-all flex flex-col items-center text-center space-y-2";
    }

    const proofForm = document.getElementById('luma3dProofForm');
    if (proofForm) proofForm.classList.remove('hidden');
  }

  confirmFinalProof(proofType) {
    const isCorrectSuspect = (this.selectedSuspectId === 'maya');
    const isCorrectProof = (proofType === 'book_ribbon');
    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));

    if (isCorrectSuspect && isCorrectProof) {
      this.playMastermindVictoryEnding();
    } else {
      if (window.gestigoAudio && typeof window.gestigoAudio.playError === 'function') {
        window.gestigoAudio.playError();
      }
      if (this.selectedSuspectId === 'elias') {
        alert(isBm ? "Prof. Elias berada di pejabatnya dan tiada pakaian ungu atau rekod pergerakan di pintu sisi." : "Prof. Elias was in his office; his computer was active at 5:55 PM and his alibi is confirmed. Re-examine the witness sketches!");
      } else if (this.selectedSuspectId === 'adrian') {
        alert(isBm ? "Adrian Vale baru tiba di bandar dan mendaftar masuk hotel. Beliau tiada kunci akses ke bilik arkib." : "Adrian Vale checked into the hotel and had no access keys to the archive room!");
      } else if (this.selectedSuspectId === 'rex') {
        alert(isBm ? "Rex Kendall sibuk membaiki lampu di sayap timur semasa lampu amaran berkelip." : "Rex Kendall was repairing electrical wiring in the east wing during the outage.");
      } else if (this.selectedSuspectId === 'sora') {
        alert(isBm ? "Sora Dain merakam gambar pemandangan festival sepanjang masa di air pancut." : "Sora Dain was taking photos at the central fountain; metadata clears her.");
      } else {
        alert(isBm ? "Bukti tidak konsisten! Semak semula lakaran saksi, kamera litar tertutup, dan pasu bunga di taman." : "The evidence does not align! Compare Tessa's sketch, the 17:58 photo, and the garden planter!");
      }
    }
  }

  // Dramatic Maya Confession Cutscene & 100% Victory
  playMastermindVictoryEnding() {
    if (window.gestigoAudio && typeof window.gestigoAudio.playSuccess === 'function') {
      window.gestigoAudio.playSuccess();
    }
    const modal = document.getElementById('luma3dAccusationModal');
    if (!modal) return;
    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));

    const speechEn = "Detective Gio... you figured it out. (Maya looks down, signing with slight trembling). It was me. But please believe me - I never stole it for money or to sell it on the black market! I dedicated three years to researching the lost civilization myth symbols of Luma. The museum board was going to seal the Myth Book away in a locked private vault forever next week! I could not bear to let our heritage vanish from the deaf academy and researchers. When Rex started the 12-minute camera maintenance reset at 5:52 PM, I retrieved the book, wrapped it in butcher paper from Kaelen's cafe, and concealed it beneath Mira's planter until I could transcribe its glyphs... I am so sorry!";
    const speechBm = "Detektif Gio... awak berjaya membongkarnya. (Maya menundukkan kepalanya, tangannya terketar-ketar berisyarat). Memang saya yang mengambil Buku Mitos itu. Tetapi tolong percaya saya - saya tidak mencurinya untuk wang atau menjualnya di pasaran gelap! Saya telah mendedikasikan tiga tahun untuk mengkaji simbol mitos tamadun purba Luma. Lembaga muzium merancang untuk mengunci buku itu selama-lamanya di bilik kebal persendirian minggu hadapan! Saya tidak sanggup membiarkan warisan budaya kita hilang daripada tatapan anak-anak pekak dan para penyelidik. Semasa Rex memulakan penyelenggaraan kamera 12 minit pada jam 5:52 petang, saya mengambilnya, membalutnya dengan kertas daripada kafe Kaelen, dan menyembunyikannya di bawah pasu Mira untuk disalin sebelum dikembalikan... Saya benar-benar minta maaf!";

    const speechText = isBm ? speechBm : speechEn;

    modal.innerHTML = `
      <div class="bg-gradient-to-b from-[#1a052b] via-[#0f172a] to-black border-3 border-amber-400 rounded-3xl p-6 sm:p-10 max-w-2xl w-full mx-auto space-y-5 shadow-[0_0_100px_rgba(245,158,11,0.6)] text-center animate-fadeIn">
        <div class="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400 font-mono text-xs font-black uppercase tracking-widest animate-bounce">
          ✨ CASE RESOLUTION: THE TRUTH REVEALED
        </div>

        <div class="w-28 h-28 mx-auto rounded-3xl overflow-hidden border-3 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.6)] bg-slate-950">
          <img src="assets/suspects/maya_avatar.png" class="w-full h-full object-cover">
        </div>

        <div class="space-y-2">
          <h2 class="text-xl sm:text-3xl font-black text-amber-300 uppercase font-sans">
            Maya Callen's Confession
          </h2>
          <p class="text-xs font-mono text-amber-400">
            Research Intern • The Missing Myth Book
          </p>
        </div>

        <!-- Confession Dialogue Box -->
        <div class="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/40 text-left space-y-3">
          <p class="text-xs sm:text-sm font-sans italic text-slate-200 leading-relaxed">
            "${speechText}"
          </p>
          <div class="pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center gap-2">
            <span>🛡️</span>
            <span>Inspector Chen and Detective Gio safely return the Sacred Myth Book to the museum vitrine!</span>
          </div>
        </div>

        <!-- Master Detective Badge -->
        <div class="p-3 rounded-2xl bg-amber-950/60 border border-amber-400 text-amber-300 font-mono text-xs flex items-center justify-center gap-2">
          <span>🏆</span>
          <span class="font-bold">LUMA CITY MASTER DETECTIVE BADGE AWARDED (100% COMPLETE!)</span>
        </div>

        <!-- Celebration Action Buttons -->
        <div class="flex items-center justify-center gap-3 pt-2">
          <button onclick="gestigoLuma3D.launchFestivalFireworks(); gestigoLuma3D.triggerCelebrateEmote();" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs font-mono uppercase tracking-wider cursor-pointer shadow-lg transition-transform hover:scale-105">
            🎆 Launch Grand Fireworks
          </button>
          <button onclick="document.getElementById('luma3dAccusationModal').classList.add('hidden'); gestigoLuma3D.openEvidenceBoard('timeline');" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs font-mono cursor-pointer border border-slate-700">
            📋 Review Complete Case File
          </button>
        </div>
      </div>
    `;

    this.launchFestivalFireworks();
  }

  renderCarousel() {
    const container = document.getElementById('luma3dCarouselStrip');
    if (!container) return;

    container.innerHTML = this.characters.map(char => {
      const isSolved = !!this.alibisCollected[char.id];
      const asked = Object.keys(this.questionsAsked[char.id] || {}).length;
      return `
        <button onclick="gestigoLuma3D.walkToAndInterrogate('${char.id}')" class="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 ${isSolved ? 'border-emerald-500 bg-emerald-950/60' : (char.isSuspect ? 'border-purple-500/70 bg-purple-950/40 hover:border-purple-400' : 'border-slate-700 bg-slate-900/60 hover:border-cyan-400')} transition-all cursor-pointer text-left group">
          <div class="relative w-8 h-8 rounded-lg overflow-hidden border ${isSolved ? 'border-emerald-400' : 'border-slate-600'} bg-slate-950">
            <img src="${char.avatar}" alt="${char.name}" class="w-full h-full object-cover" />
            ${isSolved ? '<span class="absolute bottom-0 right-0 bg-emerald-500 text-slate-950 text-[8px] font-black px-1 rounded-tl">✓</span>' : ''}
          </div>
          <div>
            <span class="text-xs font-bold text-white block group-hover:text-amber-300 truncate max-w-[100px]">${char.name}</span>
            <span class="text-[9px] font-mono ${isSolved ? 'text-emerald-400 font-bold' : 'text-slate-400'} block truncate max-w-[100px]">${isSolved ? `✓ ${asked}/5 ASKED` : 'INTERVIEW'}</span>
          </div>
        </button>
      `;
    }).join('');
  }

  updateHUD() {
    const countEl = document.getElementById('luma3dAlibiCount');
    const totalSolved = Object.keys(this.alibisCollected).length;
    if (countEl) countEl.textContent = totalSolved;

    const clueCountEl = document.getElementById('luma3dClueCountText');
    if (clueCountEl) clueCountEl.textContent = `${this.collectedClues.length}/8`;

    const accuseBtn = document.getElementById('luma3dAccuseBtn');
    if (accuseBtn) {
      if (totalSolved >= 4 || this.isBookRecovered) {
        accuseBtn.classList.remove('opacity-50', 'pointer-events-none');
        accuseBtn.classList.add('animate-bounce', 'ring-2', 'ring-amber-300');
      }
    }
  }

  // ==================== MODAL OPEN / CLOSE ====================
  open() {
    // Strictly enforce sequential stage completion: Level 3 is locked until Stages 1–20 are cleared!
    if (window.gestigoApp && typeof window.gestigoApp.isLevel3Unlocked === 'function') {
      const urlParams = new URLSearchParams(window.location.search);
      const isDev = urlParams.get('dev') === '1' || urlParams.get('open3d') === '1';
      if (!window.gestigoApp.isLevel3Unlocked() && !isDev) {
        if (window.gestigoPathway && typeof window.gestigoPathway.showLockedToast === 'function') {
          window.gestigoPathway.showLockedToast('🔒 Level 3 Finale is locked! Complete Stages 1–20 first.');
        }
        return;
      }
    }
    this.isOpen = true;
    const modal = document.getElementById('luma3DModal');
    if (!modal) return;
    modal.classList.remove('hidden');

    this.initWorld();
    this.renderCarousel();
    this.updateHUD();

    if (window.gestigoAudio && typeof window.gestigoAudio.playLevelUp === 'function') {
      window.gestigoAudio.playLevelUp();
    }
    if (this.isMusicPlaying && this.festivalAudio) {
      this.festivalAudio.startMusic();
    }
  }

  close() {
    this.closeInterrogationDialog();
    if (this.evaluationTimerInterval) {
      clearInterval(this.evaluationTimerInterval);
      this.evaluationTimerInterval = null;
    }
    this.isOpen = false;
    const modal = document.getElementById('luma3DModal');
    if (modal) modal.classList.add('hidden');
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
    if (this.festivalAudio) {
      this.festivalAudio.stopMusic();
    }
  }
}

const gestigoLuma3D = new GestigoLuma3DEngine();
window.gestigoLuma3D = gestigoLuma3D;

(function() {
  var g = (typeof window !== 'undefined') ? window : (typeof globalThis !== 'undefined' ? globalThis : (typeof global !== 'undefined' ? global : {}));
  g.gestigoLuma3D = (typeof gestigoLuma3D !== 'undefined') ? gestigoLuma3D : null;
  g.GestigoLuma3DEngine = GestigoLuma3DEngine;
})();
