// ==========================================================================
// Gestigo - Clean, Responsive, 100% Resilient Beginner-Friendly Pathway
// Zero Canvas Dependency • 100% Reliable Native DOM & SVG
// Guaranteed Dead-Center Alignment on Both Desktop and Mobile
// Level 1 at Top (1-10) -> Level 2 Middle (11-20) -> Level 3 Bottom (21-30)
// ==========================================================================

class GestigoPathway {
  constructor(containerId = 'pathwayContainer') {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.stages = [];
    this.allStages = [];
    this.activeStageId = 1;
    this.completedStages = {};
    this.unlockedStages = [1];
    this.currentFilter = 'all'; // 'all', 1, 2, or 3
    this.onStageSelect = null;
    this.onStageHover = null;

    // Auto-load stages if GESTIGO_STAGES is available globally
    if (typeof GESTIGO_STAGES !== 'undefined') {
      this.allStages = GESTIGO_STAGES;
      this.stages = GESTIGO_STAGES;
    }

    // Attempt initial render immediately if container is present
    if (this.container && this.stages.length > 0) {
      this.render();
    }
  }

  setStages(allStages) {
    this.allStages = allStages || [];
    this.stages = this.allStages;
    this.render();
  }

  layoutAllStages() {
    this.render();
  }

  filterByLevel(level) {
    this.currentFilter = level;
    if (window.gestigoAudio) gestigoAudio.playClick();
    this.render();

    // Scroll to top of list smoothly
    if (this.container) {
      this.container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToActiveStage() {
    setTimeout(() => {
      if (this.activeStageId === 1) {
        const scrollContainer = document.querySelector('.static-pathway-scroll-container');
        if (scrollContainer) {
          scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      const targetEl = document.getElementById(`stage-card-${this.activeStageId}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  }

  showLockedToast(msg) {
    const old = document.getElementById('gestigoLockedToast');
    if (old) old.remove();
    const toast = document.createElement('div');
    toast.id = 'gestigoLockedToast';
    toast.className = 'fixed bottom-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 max-w-md p-4 rounded-2xl bg-slate-950/95 border-2 border-red-500/80 shadow-[0_0_30px_rgba(239,68,68,0.4)] text-center text-xs sm:text-sm font-mono font-bold text-red-200 z-[9999] animate-bounce';
    toast.innerHTML = `
      <div class="flex items-center justify-center gap-2">
        <span class="text-lg">🔒</span>
        <span>${msg}</span>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      if (toast && toast.parentNode) toast.remove();
    }, 3200);
  }

  handleLevel3Click() {
    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));
    const isDev = (typeof window !== 'undefined' && window.location && (window.location.search.includes('dev=1') || window.location.search.includes('open3d=1')));
    const isUnlocked = isDev || (this.completedStages && this.completedStages[20]) || (this.unlockedStages && this.unlockedStages.includes(21));

    if (!isUnlocked) {
      if (window.gestigoAudio && typeof window.gestigoAudio.playError === 'function') {
        window.gestigoAudio.playError();
      }
      const completedCount = Object.keys(this.completedStages || {}).filter(id => parseInt(id) <= 20).length;
      const msg = isBm
        ? `🔒 Tahap 3 terkunci! Anda perlu menyelesaikan peringkat 1 hingga 20 dahulu (${completedCount}/20 selesai).`
        : `🔒 Level 3 is locked! Complete Stages 1 to 20 first (${completedCount}/20 completed).`;
      this.showLockedToast(msg);
      return;
    }

    if (localStorage.getItem('gestigo_level_seen_3') !== 'true') {
      this.showLevelInstructions(3, () => {
        localStorage.setItem('gestigo_level_seen_3', 'true');
        if (window.gestigoLuma3D) {
          window.gestigoLuma3D.open();
        }
      });
      return;
    }

    if (window.gestigoLuma3D) {
      window.gestigoLuma3D.open();
    }
  }

  handleStageClick(stageId) {
    if (window.gestigoMystery && typeof window.gestigoMystery.dismissToast === "function") {
      window.gestigoMystery.dismissToast();
    }
    const stage = this.allStages.find(s => s.id === stageId);
    if (!stage) return;

    const isUnlocked = (stageId === 1) || (this.unlockedStages && this.unlockedStages.includes(stageId));
    if (!isUnlocked) {
      if (window.gestigoAudio && typeof window.gestigoAudio.playError === 'function') {
        window.gestigoAudio.playError();
      }
      const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));
      const msg = isBm 
        ? `🔒 Tahap ${stageId} masih terkunci! Selesaikan Tahap ${stageId - 1} terlebih dahulu.` 
        : `🔒 Stage ${stageId} is locked! Complete Stage ${stageId - 1} first to unlock.`;
      this.showLockedToast(msg);
      return;
    }

    // Check if level briefing should be presented before starting
    const lvl = stage.level || (stageId <= 10 ? 1 : 2);
    const seenKey = 'gestigo_level_seen_' + lvl;
    if (localStorage.getItem(seenKey) !== 'true') {
      this.showLevelInstructions(lvl, () => {
        localStorage.setItem(seenKey, 'true');
        this.startStageActual(stage);
      });
      return;
    }

    this.startStageActual(stage);
  }


  startStageActual(stage) {
    if (window.gestigoAudio) gestigoAudio.playClick();

    // If new player clicking Stage 1 hasn't seen the prologue, show story first!
    if (stage.id === 1 && localStorage.getItem('gestigo_prologue_seen') !== 'true') {
      if (window.gestigoApp && typeof window.gestigoApp.openStoryPrologue === 'function') {
        window.gestigoApp.openStoryPrologue();
        return;
      }
    }

    if (this.onStageSelect) {
      this.onStageSelect(stage);
    } else if (window.gestigoMystery) {
      gestigoMystery.openStage(stage);
    }
  }

  getStagePropEmoji(stageId) {
    const propMap = {
      1: "🔤", // Stage 1: The Manual Alphabet (A–Z)
      2: "🔢", // Stage 2: Numbers & Counting (1–100)
      3: "⏰", // Stage 3: Time & Calendar
      4: "👋", // Stage 4: Core Survival & Greetings
      5: "🪪", // Stage 5: Personal Pronouns & Identity
      6: "👨‍👩‍👧", // Stage 6: Family & Relationships
      7: "🎨", // Stage 7: Colors, Shapes, & Clothes
      8: "🍎", // Stage 8: Food & Drink Essentials
      9: "🏠", // Stage 9: Home & Daily Routine
      10: "🏆", // Stage 10: Level 1 Boss (The Survival Challenge)
      11: "🎭", 12: "🩺", 13: "🍽️", 14: "💳", 15: "⚽",
      16: "🎒", 17: "💼", 18: "⛅", 19: "🗺️", 20: "🗝️",
      21: "🧭", 22: "❓", 23: "✈️", 24: "🚨", 25: "📱",
      26: "📐", 27: "📜", 28: "💡", 29: "🤝", 30: "👑"
    };
    return propMap[stageId] || "🔍";
  }

  renderPlatformSVG(stage, isUnlocked, isActive, isCompleted, isBoss) {
    const propEmoji = this.getStagePropEmoji(stage.id);
    const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');

    // Color definitions based on state and level
    let topGradStart = "#1e293b";
    let topGradEnd = "#0f172a";
    let sideLeftColor = "#0f172a";
    let sideRightColor = "#020617";
    let rimColor = "#334155";
    let glowFilter = "";

    if (isBoss) {
      topGradStart = "#f59e0b";
      topGradEnd = "#d97706";
      sideLeftColor = "#b45309";
      sideRightColor = "#92400e";
      rimColor = "#fde047";
      glowFilter = "filter: drop-shadow(0 0 16px rgba(245, 158, 11, 0.5));";
    } else if (isActive) {
      topGradStart = "#22c55e";
      topGradEnd = "#16a34a";
      sideLeftColor = "#15803d";
      sideRightColor = "#14532d";
      rimColor = "#86efac";
      glowFilter = "filter: drop-shadow(0 0 16px rgba(34, 197, 94, 0.6));";
    } else if (isCompleted) {
      topGradStart = "#059669";
      topGradEnd = "#047857";
      sideLeftColor = "#065f46";
      sideRightColor = "#064e3b";
      rimColor = "#6ee7b7";
      glowFilter = "filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.4));";
    } else if (isUnlocked) {
      topGradStart = "#0284c7";
      topGradEnd = "#0369a1";
      sideLeftColor = "#075985";
      sideRightColor = "#0c4a6e";
      rimColor = "#7dd3fc";
    }

    const uniqueId = `plat_grad_${stage.id}`;

    return `
      <div class="relative flex items-center justify-center select-none" style="width: 140px; height: 105px; ${glowFilter}">
        <svg width="140" height="105" viewBox="0 0 140 105" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
          <defs>
            <linearGradient id="${uniqueId}" x1="15" y1="12" x2="125" y2="65" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="${topGradStart}" />
              <stop offset="100%" stop-color="${topGradEnd}" />
            </linearGradient>
          </defs>

          <!-- Drop Shadow Base -->
          <ellipse cx="70" cy="85" rx="55" ry="15" fill="rgba(0, 0, 0, 0.45)" />

          <!-- Platform Left Side 3D Extrusion -->
          <polygon points="15,40 70,68 70,86 15,58" fill="${sideLeftColor}" stroke="rgba(0,0,0,0.3)" stroke-width="1" />

          <!-- Platform Right Side 3D Extrusion -->
          <polygon points="70,68 125,40 125,58 70,86" fill="${sideRightColor}" stroke="rgba(0,0,0,0.4)" stroke-width="1" />

          <!-- Platform Isometric Diamond Top Face -->
          <polygon points="70,12 125,40 70,68 15,40" fill="url(#${uniqueId})" stroke="${rimColor}" stroke-width="${isActive ? '2.5' : '1.5'}" />

          <!-- Inner Tech Circuit Inlay -->
          <polygon points="70,20 115,40 70,60 25,40" fill="none" stroke="${isUnlocked ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.1)'}" stroke-width="1.2" stroke-dasharray="4 2" />
        </svg>

        <!-- Thematic 3D Prop Artifact (Prominently centered on the square!) -->
        <div class="absolute top-[40px] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none flex items-center justify-center transition-transform duration-300 group-hover:scale-125 z-10">
          ${isUnlocked ? `
            <div class="w-11 h-11 rounded-2xl bg-slate-900/90 backdrop-blur-md border-2 ${isBoss ? 'border-amber-400 shadow-[0_0_22px_rgba(245,158,11,0.7)] animate-pulse' : (isActive ? 'border-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.7)]' : (isCompleted ? 'border-emerald-500/80 shadow-[0_0_14px_rgba(16,185,129,0.5)]' : 'border-slate-600/80 shadow-md'))} flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-all">
              <span class="text-2xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] filter contrast-125 leading-none">${propEmoji}</span>
            </div>
          ` : `
            <div class="w-9 h-9 rounded-xl bg-slate-950/90 border border-slate-700/80 flex items-center justify-center shadow-md">
              <span class="text-base text-slate-500 leading-none">🔒</span>
            </div>
          `}
        </div>

        <!-- Front Circular Progress Badge (Checkmark, Active, or Stage Number) -->
        <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
          ${isCompleted ? `
            <div class="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-black text-[11px] flex items-center justify-center border-2 border-white shadow-[0_0_12px_rgba(34,197,94,0.9)]">
              ✓
            </div>
          ` : (isActive ? `
            <div class="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[9px] uppercase tracking-wider border border-white shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse">
              ${isBm ? 'AKTIF' : 'ACTIVE'}
            </div>
          ` : `
            <div class="w-6 h-6 rounded-full bg-slate-800 text-slate-400 font-bold text-[10px] flex items-center justify-center border border-slate-700">
              ${stage.id}
            </div>
          `)}
        </div>
      </div>
    `;
  }

  renderLevelBanner(level) {
    const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');

    if (level === 1) {
      return `
        <div class="w-full mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-emerald-950/80 border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(34,197,94,0.25)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-2xl flex-shrink-0">
              🏛️
            </div>
            <div>
              <div class="text-[11px] font-mono font-bold text-emerald-400 tracking-widest uppercase">
                ${isBm ? 'TAHAP 1 • ASAS PENYIASATAN (PERINGKAT 1–10)' : 'LEVEL 1 • FOUNDATIONS (STAGES 1–10)'}
              </div>
              <h2 class="text-base sm:text-lg font-black text-white">
                ${isBm ? 'Muzium Cerita: Kehilangan Buku Memori' : 'The Story Museum: The Missing Memory Book'}
              </h2>
              <p class="text-xs text-slate-300 mt-0.5">
                ${isBm ? 'Bina memori otot abjad (A–Z), nombor (1–100), dan kosa kata penting bersama Gio.' : 'Master alphabet (A–Z), numbers (1–100), and immediate survival vocabulary with Gio.'}
              </p>
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center gap-2 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-emerald-500/30 text-xs font-mono font-bold text-emerald-300">
            <button onclick="gestigoApp.pathway.showLevelInstructions(1)" class="px-2.5 py-1 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-400/60 text-[11px] font-mono font-bold text-emerald-200 flex items-center gap-1 cursor-pointer transition-all shadow-sm"><span>📖</span><span>${isBm ? 'Panduan Tahap 1' : 'Level 1 Instructions'}</span></button>
            <span class="text-[10px] text-slate-400">(0% → 33%)</span>
          </div>
        </div>
      `;
    }

    if (level === 2) {
      return `
        <div class="w-full my-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-cyan-950/80 border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.25)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/60 flex items-center justify-center text-2xl flex-shrink-0">
              🌊
            </div>
            <div>
              <div class="text-[11px] font-mono font-bold text-cyan-400 tracking-widest uppercase">
                ${isBm ? 'TAHAP 2 • KEHIDUPAN HARIAN & KOMUNITI (PERINGKAT 11–20)' : 'LEVEL 2 • EVERYDAY LIFE & COMMUNITY (STAGES 11–20)'}
              </div>
              <h2 class="text-base sm:text-lg font-black text-white">
                ${isBm ? 'Bandar Rahsia: Menjejaki Saksi & Petunjuk Jenayah' : 'The City of Secrets: Tracking Witnesses & Crime Scene Clues'}
              </h2>
              <p class="text-xs text-slate-300 mt-0.5">
                ${isBm ? 'Terokai emosi, perubatan, restoran, dan petunjuk forensik di sekitar Bandar Luma.' : 'Investigate emotions, dining, shopping, and forensic evidence around Luma City.'}
              </p>
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center gap-2 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-cyan-500/30 text-xs font-mono font-bold text-cyan-300">
            <button onclick="gestigoApp.pathway.showLevelInstructions(2)" class="px-2.5 py-1 rounded-lg bg-cyan-900/80 hover:bg-cyan-800 border border-cyan-400/60 text-[11px] font-mono font-bold text-cyan-200 flex items-center gap-1 cursor-pointer transition-all shadow-sm"><span>📖</span><span>${isBm ? 'Panduan Tahap 2' : 'Level 2 Instructions'}</span></button>
            <span class="text-[10px] text-slate-400">(33% → 66%)</span>
          </div>
        </div>
      `;
    }

    if (level === 3) {
      return `
        <div class="w-full my-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-purple-950/80 border-2 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.25)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/60 flex items-center justify-center text-2xl flex-shrink-0">
              🔭
            </div>
            <div>
              <div class="text-[11px] font-mono font-bold text-purple-400 tracking-widest uppercase">
                ${isBm ? 'TAHAP 3 • KEFASIHAN & BUDAYA (PERINGKAT 21–30)' : 'LEVEL 3 • FLUENCY & DEAF CULTURE (STAGES 21–30)'}
              </div>
              <h2 class="text-base sm:text-lg font-black text-white">
                ${isBm ? 'Kebenaran Mutlak: Menyelamatkan Buku Memori' : 'The Final Truth: Restoring the Stolen Memory Book'}
              </h2>
              <p class="text-xs text-slate-300 mt-0.5">
                ${isBm ? 'Tatabahasa lanjutan, penceritaan, perlawanan kamera langsung, dan pemulihan memori 100%!' : 'Advanced grammar, storytelling, live webcam showdown, and 100% memory restoration!'}
              </p>
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center gap-2 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-purple-500/30 text-xs font-mono font-bold text-purple-300">
            <button onclick="gestigoApp.pathway.showLevelInstructions(3)" class="px-2.5 py-1 rounded-lg bg-purple-900/80 hover:bg-purple-800 border border-purple-400/60 text-[11px] font-mono font-bold text-purple-200 flex items-center gap-1 cursor-pointer transition-all shadow-sm"><span>📖</span><span>${isBm ? 'Panduan Tahap 3' : 'Level 3 Instructions'}</span></button>
            <span class="text-[10px] text-slate-400">(66% → 100%)</span>
          </div>
        </div>
      `;
    }

    return '';
  }

  renderConnectingPath() {
    return `
      <div class="w-full flex justify-center py-1 select-none pointer-events-none">
        <svg width="60" height="36" viewBox="0 0 60 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 30,0 C 30,12 30,24 30,36" stroke="#22c55e" stroke-width="3" stroke-dasharray="5 3" opacity="0.6" />
          <circle cx="30" cy="18" r="3.5" fill="#a3e635" />
        </svg>
      </div>
    `;
  }

    // Render the Grand Open-World 3D Luma City Investigation Hub (Level 3 Finale)
  renderLevel3WorldHub() {
    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));
    const completedCount = Object.keys(this.completedStages || {}).filter(id => parseInt(id) <= 20).length;
    const isDev = (typeof window !== 'undefined' && window.location && (window.location.search.includes('dev=1') || window.location.search.includes('open3d=1')));
    const isUnlocked = isDev || (this.completedStages && this.completedStages[20]) || (this.unlockedStages && this.unlockedStages.includes(21));
    const alibis = (window.gestigoLuma3D && gestigoLuma3D.alibisCollected) ? Object.keys(gestigoLuma3D.alibisCollected).length : 0;
    const isCompleted = (window.gestigoApp && gestigoApp.completedStages && gestigoApp.completedStages[30]);

    if (!isUnlocked) {
      return `
        <div id="level3WorldHubNode" class="w-full max-w-xl my-5 p-5 sm:p-7 rounded-3xl bg-slate-950/90 border-2 border-slate-800 shadow-xl flex flex-col items-center text-center space-y-4 relative overflow-hidden">
          <!-- Locked Badge -->
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-red-950/80 text-red-400 border border-red-500/40 text-[11px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5">
              <span>🔒</span>
              <span>${isBm ? 'TAHAP 3 TERKUNCI • SELESAIKAN PERINGKAT 1–20' : 'LEVEL 3 FINALE LOCKED • COMPLETE STAGES 1–20'}</span>
            </span>
            <span class="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 border-amber-500/40 px-2.5 py-0.5 rounded border">
              ${completedCount}/20 ${isBm ? 'Selesai' : 'Completed'}
            </span>
          </div>

          <!-- Locked Scene Preview with Dimmed Overlay -->
          <div class="w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-800 relative bg-slate-900 opacity-60 filter grayscale">
            <img src="assets/pov-crime-scene.png" class="w-full h-full object-cover opacity-50" />
            <div class="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 p-4">
              <span class="text-4xl mb-2">🔒</span>
              <h4 class="text-sm sm:text-base font-black text-white">${isBm ? 'Penyiasatan 3D Bandar Luma' : 'The 3D City Investigation'}</h4>
              <p class="text-[11px] font-mono text-slate-400 mt-1 max-w-xs">
                ${isBm ? 'Selesaikan semua 20 peringkat penyiasatan untuk membuka akses penuh ke Bandar Luma.' : 'Complete all 20 investigation stages to unlock full access to Luma City.'}
              </p>
            </div>
          </div>

          <!-- Sequential Progress Bar -->
          <div class="w-full space-y-1.5 text-left">
            <div class="flex items-center justify-between text-[11px] font-mono font-bold text-slate-400">
              <span>${isBm ? 'KEMAJUAN PERINGKAT 1–20:' : 'STAGES 1–20 PROGRESSION:'}</span>
              <span class="text-amber-400">${Math.round((completedCount / 20) * 100)}%</span>
            </div>
            <div class="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div class="h-full bg-gradient-to-r from-purple-500 to-amber-400 transition-all duration-500" style="width: ${(completedCount / 20) * 100}%"></div>
            </div>
          </div>

          <!-- Locked Button -->
          <button onclick="gestigoApp.pathway.handleLevel3Click()" class="w-full py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 text-slate-400 border border-slate-700/80 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md">
            <span>🔒</span>
            <span>${isBm ? 'TERKUNCI • SELESAIKAN TAHAP 20 DAHULU' : 'LOCKED • COMPLETE STAGE 20 FIRST'}</span>
          </button>
        </div>
      `;
    }

    return `
      <div id="level3WorldHubNode" class="w-full max-w-xl my-5 p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-[#180a2b] via-[#0d1424] to-[#070b14] border-2 border-purple-500/80 shadow-[0_0_50px_rgba(168,85,247,0.35)] flex flex-col items-center text-center space-y-4 relative overflow-hidden animate-fadeIn">
        
        <div class="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/20 rounded-full blur-2xl pointer-events-none"></div>

        <!-- Mode Badge -->
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full bg-purple-500/25 text-purple-300 border border-purple-500/50 text-[11px] font-mono font-black uppercase tracking-wider">
            🏛️ ${isBm ? 'DUNIA 3D REALISTIK • PENYIASATAN AKHIR' : 'REALISTIC 3D WORLD • THE GRAND FINALE'}
          </span>
          <span class="text-xs font-mono font-bold ${isCompleted ? 'text-emerald-400 bg-emerald-950/80 border-emerald-500/40' : 'text-amber-300 bg-amber-950/80 border-amber-500/40'} px-2 py-0.5 rounded border">
            ${isCompleted ? (isBm ? '✓ KES SELESAI (100%)' : '✓ CASE SOLVED (100%)') : `${alibis}/10 ${isBm ? 'Alibi Dicatat' : 'Alibis Logged'}`}
          </span>
        </div>

        <!-- 3D Cinematic Scene Image Banner -->
        <div class="w-full h-44 sm:h-52 rounded-2xl overflow-hidden border-2 border-purple-500/40 relative shadow-2xl bg-black">
          <img src="assets/pov-crime-scene.png" class="w-full h-full object-cover opacity-85" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
          <div class="absolute bottom-3 left-4 right-4 text-left">
            <span class="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider block">REALISTIC 3D SCENARIO • LUMA CITY</span>
            <h3 class="text-base sm:text-lg font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              ${isBm ? 'Siasatan 3D Bandar Luma: Siapa Pencuri Buku Mitos?' : 'The 3D City Investigation: Who Stole the Myth Book?'}
            </h3>
          </div>
        </div>

        <!-- Description -->
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-md">
          ${isBm ? 'Terokai dunia 3D realistik Bandar Luma! Berjalan bersama Detektif Gio melintasi Dataran Festival, meneliti tempat kejadian Muzium Cerita, dan jeti terusan untuk menyoal siasat 10 saksi & suspek tentang alibi mereka, kemudian dakwa dalang sebenar!' : 'Explore the realistic 3D world of Luma City! Walk with Detective Gio across the Festival of Stories, inspect the Story Museum crime scene, and visit the canal pier to interrogate 10 suspects and expose the mastermind!'}
        </p>

        <!-- 10 Character Headshot Preview -->
        <div class="w-full py-2 border-y border-slate-800/80">
          <span class="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
            ${isBm ? '10 SAKSI & SUSPEK DALAM DUNIA 3D' : '10 CITIZENS & SUSPECTS IN 3D WORLD'}
          </span>
          <div class="flex items-center justify-center flex-wrap gap-2">
            ${(window.gestigoLuma3D ? gestigoLuma3D.characters : []).map(c => `
              <div class="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border-2 ${c.isSuspect ? 'border-purple-500' : 'border-sky-500'} bg-slate-900 shadow-md flex-shrink-0" title="${c.name} (${c.role})">
                <img src="${c.avatar}" class="w-full h-full object-cover" />
                ${(window.gestigoLuma3D && gestigoLuma3D.alibisCollected[c.id]) ? '<span class="absolute bottom-0 right-0 bg-emerald-500 text-slate-950 text-[8px] font-bold px-1 rounded-tl">✓</span>' : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Grand Launch Button -->
        <button onclick="gestigoLuma3D.open()" class="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-black text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(168,85,247,0.5)] cursor-pointer flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01]">
          <i data-lucide="compass" class="w-5 h-5 text-amber-300"></i>
          <span>${isBm ? 'MASUK KE PENYIASATAN 3D BANDAR LUMA' : 'ENTER 3D LUMA CITY INVESTIGATION'} →</span>
        </button>

      </div>
    `;
  }

  // ==================== LEVEL INSTRUCTIONS MODAL ====================
  showLevelInstructions(levelNum, onProceed = null) {
    if (window.gestigoAudio && typeof window.gestigoAudio.playClick === 'function') {
      window.gestigoAudio.playClick();
    }
    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));

    const levelData = {
      1: {
        badge: isBm ? "TAHAP 1 • ASAS BAHASA ISYARAT & KES MUZIUM" : "LEVEL 1 • SIGN LANGUAGE FOUNDATIONS & MUSEUM CASE",
        title: isBm ? "PANDUAN TAHAP 1: KES PECAH MASUK MUZIUM CERITA" : "LEVEL 1 BRIEFING: THE STORY MUSEUM BREAK-IN",
        stages: isBm ? "Peringkat 1–10 • Abjad Manual & Nombor" : "Stages 1–10 • Manual Alphabet & Numbers",
        goal: isBm 
          ? "Bantu Detektif Gio menyiasat vitrin pameran yang dipecahkan dan menjejaki kod rahsia yang ditinggalkan oleh penceroboh." 
          : "Team up with Detective Gio to investigate the shattered museum vitrine and decode the trail of mystery signs left behind by the intruder.",
        steps: [
          { icon: "🔤", title: isBm ? "1. Nyahsulit Meterai Lilin (A–Z)" : "1. Decipher Wax Seal Ciphers (A–Z)", desc: isBm ? "Bentuk huruf abjad ASL di hadapan kamera untuk membuka kunci vitrin." : "Fingerspell letters shown on the shattered vitrine to bypass the seal." },
          { icon: "🔢", title: isBm ? "2. Kod Pad Kekunci Nombor (1–100)" : "2. Keypad Number Codes (1–100)", desc: isBm ? "Gunakan isyarat nombor ASL untuk memecahkan kod keselamatan 4 digit." : "Use ASL number counting signs to crack the 4-digit security tumblers." },
          { icon: "🗝️", title: isBm ? "3. Raih Kunci Pintu (Key of Doors)" : "3. Earn the Key of Doors", desc: isBm ? "Kuasai kosa kata asas untuk menamatkan Tahap 1 dan membuka Tahap 2!" : "Master core vocabulary to complete Level 1 and unlock Level 2!" }
        ],
        controls: isBm 
          ? "📷 Kamera mengesan isyarat tangan masa-nyata. Anda juga boleh memilih jawapan pada skrin." 
          : "📷 Camera sensor tracks real-time hand signs. You can also click on-screen options as a fallback.",
        btnText: isBm ? "🚀 MULAKAN SIASATAN TAHAP 1 →" : "🚀 START LEVEL 1 INVESTIGATION →"
      },
      2: {
        badge: isBm ? "TAHAP 2 • KEHIDUPAN HARIAN & JEJAK SAKSI" : "LEVEL 2 • EVERYDAY LIFE & TRACKING WITNESSES",
        title: isBm ? "PANDUAN TAHAP 2: BANDAR RAHSIA" : "LEVEL 2 BRIEFING: THE CITY OF SECRETS",
        stages: isBm ? "Peringkat 11–20 • Emosi, Komuniti & Residu UV" : "Stages 11–20 • Emotions, Community & UV Residue",
        goal: isBm 
          ? "Jejaki laluan penceroboh melintasi pasar, akademi pekak, dan jeti pelabuhan dengan memerhatikan pergerakan saksi." 
          : "Trace the suspect's escape route across the city markets, deaf academy, and canal pier by observing witness testimonies.",
        steps: [
          { icon: "🎬", title: isBm ? "1. Perhatikan Video Isyarat Saksi" : "1. Watch Reconstructed Witness Sign Videos", desc: isBm ? "Tonton animasi pergerakan tangan saksi untuk memahami keterangan mereka." : "Observe high-definition animated ASL videos of citizens testifying in real time." },
          { icon: "🎭", title: isBm ? "2. Kenal Pasti Emosi & Aktiviti" : "2. Identify Emotions & Activities", desc: isBm ? "Nyahsulit isyarat emosi (gembira, marah, sedih) dan aktiviti (makan, belanja, wang)." : "Recognize emotional states (happy, angry, sad, nervous) and civic signs (food, money, shopping, work)." },
          { icon: "🔦", title: isBm ? "3. Imbas Residu Lampu UV & Kunci Memori" : "3. Sweep UV Residue & Earn Key of Memory", desc: isBm ? "Gunakan lampu UV untuk mengesan dakwat halimunan dan buka kunci Tahap 3 3D Finale!" : "Use the UV blacklight to uncover invisible sign residue and unlock the Level 3 3D Finale!" }
        ],
        controls: isBm 
          ? "🎬 Tonton video isyarat tangan. Gerakkan lampu UV untuk mengesan bukti pendarfluor." 
          : "🎬 Watch handshape motion videos. Sweep the UV blacklight torch to reveal glowing clues.",
        btnText: isBm ? "🚀 MULAKAN SIASATAN TAHAP 2 →" : "🚀 START LEVEL 2 INVESTIGATION →"
      },
      3: {
        badge: isBm ? "TAHAP 3 • DUNIA 3D & KES BUKU MITOS" : "LEVEL 3 FINALE • 3D OPEN WORLD INVESTIGATION",
        title: isBm ? "PANDUAN TAHAP 3: DUNIA 3D LUMA CITY" : "LEVEL 3 BRIEFING: 3D CITY CRIME INVESTIGATION",
        stages: isBm ? "Peringkat 21–30 / Kemuncak • Siasatan Terbuka 10 Warga" : "Level 3 Finale • 10 Citizens & The Stolen Myth Book",
        goal: isBm 
          ? "Terokai Bandar Luma secara 3D, cari Buku Mitos yang disorok di pasu bunga taman, soal siasat 10 warga menggunakan isyarat ASL, dan dakwa dalang utama!" 
          : "Explore 3D Luma City, search the garden planter to recover the Sacred Myth Book, interrogate all 10 citizens via webcam ASL signs, and confront the mastermind!",
        steps: [
          { icon: "🕹️", title: isBm ? "1. Terokai Bandar 3D (WASD / Kekunci)" : "1. Explore in 3D (WASD / Keypad)", desc: isBm ? "Gerakkan Detektif Gio menggunakan kekunci WASD / Anak Panah. Klik tanah tidak akan gerakkan watak." : "Move Detective Gio using WASD / Arrow keys. Ground click-movement is disabled." },
          { icon: "🌿", title: isBm ? "2. Geledah Pasu Batu di Taman [E]" : "2. Search Large Stone Planter in Garden [E]", desc: isBm ? "Dekati pasu batu di sebelah pondok kebun Mira Thorne dan tekan [E] untuk dapatkan Buku Mitos!" : "Approach the stone planter beside Mira Thorne's garden shed and press [E] to recover the Myth Book!" },
          { icon: "🤟", title: isBm ? "3. Soal Siasat 10 Warga (A, B, W, V, L)" : "3. Interrogate 10 Citizens with 5 ASL Signs", desc: isBm ? "Pilih kad soalan atau buat isyarat A, B, W, V, L di hadapan kamera untuk bertanya dan dengar jawapan!" : "Show hand signs A, B, W, V, or L to camera or choose a question card to interrogate citizens!" },
          { icon: "⚖️", title: isBm ? "4. Dakwa Dalang Utama (Maya Callen)" : "4. Confront & Accuse Mastermind (Maya Callen)", desc: isBm ? "Kumpul 8 bukti dalam Fail Kes, buka Dewan Dakwaan, dan saksikan pengakuan emosi Maya!" : "Collect 8 clues in Case File, open Accusation Chamber, and trigger Maya's emotional confession!" }
        ],
        controls: isBm 
          ? "⌨️ WASD: Jalan • [E]: Soal Siasat / Geledah • 📷 Kamera: Isyarat A, B, W, V, L • [F]: Bunga Api • [G]: Menari • [M]: Muzik" 
          : "⌨️ WASD: Walk • [E]: Talk / Search • 📷 Camera: Signs A, B, W, V, L • [F]: Fireworks • [G]: Dance • [M]: Music",
        btnText: isBm ? "🚀 MASUK KE BANDAR 3D LUMA →" : "🚀 ENTER 3D LUMA CITY →"
      }
    };

    const data = levelData[levelNum] || levelData[1];

    const modal = document.createElement('div');
    modal.id = 'gestigoLevelInstructionsModal';
    modal.className = "fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fadeIn text-slate-100";
    modal.innerHTML = `
      <div class="relative bg-slate-950/95 border-2 ${levelNum === 1 ? 'border-emerald-500 shadow-[0_0_80px_rgba(16,185,129,0.4)]' : (levelNum === 2 ? 'border-cyan-500 shadow-[0_0_80px_rgba(6,182,212,0.4)]' : 'border-purple-500 shadow-[0_0_80px_rgba(168,85,247,0.4)]')} rounded-3xl p-5 sm:p-7 max-w-2xl w-full mx-auto my-auto space-y-4 shadow-2xl backdrop-blur-2xl">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center gap-3">
            <span class="text-3xl">${levelNum === 1 ? '🏛️' : (levelNum === 2 ? '🌊' : '🏙️')}</span>
            <div>
              <span class="text-[10px] font-mono font-black ${levelNum === 1 ? 'text-emerald-400' : (levelNum === 2 ? 'text-cyan-400' : 'text-purple-400')} uppercase tracking-widest block">
                ${data.badge}
              </span>
              <h3 class="text-base sm:text-xl font-black text-white font-sans uppercase">
                ${data.title}
              </h3>
              <p class="text-xs font-mono text-slate-400">${data.stages}</p>
            </div>
          </div>
          <button onclick="document.getElementById('gestigoLevelInstructionsModal')?.remove()" class="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 cursor-pointer text-sm font-bold">
            ✕
          </button>
        </div>

        <!-- Mission Goal -->
        <div class="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <strong class="text-xs font-mono font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
            <span>🎯</span>
            <span>${isBm ? 'MATLAMAT PENYIASATAN TAHAP INI:' : 'LEVEL INVESTIGATION OBJECTIVE:'}</span>
          </strong>
          <p class="text-xs font-mono text-slate-200 leading-relaxed">
            ${data.goal}
          </p>
        </div>

        <!-- 3-4 Key Steps -->
        <div class="space-y-2">
          <strong class="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            ${isBm ? 'APA YANG ANDA AKAN LAKUKAN DI TAHAP INI:' : 'WHAT YOU WILL DO IN THIS LEVEL:'}
          </strong>
          <div class="space-y-2">
            ${data.steps.map(s => `
              <div class="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
                <span class="text-xl shrink-0 p-1 bg-slate-950 rounded-lg border border-slate-800">${s.icon}</span>
                <div>
                  <h4 class="text-xs font-mono font-black text-white">${s.title}</h4>
                  <p class="text-[11px] font-mono text-slate-300 leading-snug mt-0.5">${s.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Controls Overview -->
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400">
          <strong class="text-amber-400 block mb-0.5">${isBm ? '🎮 KAWALAN & MEKANIK:' : '🎮 CONTROLS & MECHANICS:'}</strong>
          <span>${data.controls}</span>
        </div>

        <!-- Action Button -->
        <div class="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
          <button onclick="document.getElementById('gestigoLevelInstructionsModal')?.remove()" class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs font-bold border border-slate-700 cursor-pointer">
            ${isBm ? 'Tutup' : 'Close'}
          </button>
          <button id="gestigoLevelInstructProceedBtn" class="px-6 py-2.5 rounded-xl bg-gradient-to-r ${levelNum === 1 ? 'from-emerald-500 to-green-600 text-slate-950' : (levelNum === 2 ? 'from-cyan-500 to-blue-600 text-slate-950' : 'from-purple-500 to-amber-500 text-slate-950')} font-mono text-xs font-black uppercase tracking-wider cursor-pointer shadow-lg hover:brightness-110 transition-transform active:scale-95">
            ${data.btnText}
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('gestigoLevelInstructProceedBtn').addEventListener('click', () => {
      modal.remove();
      if (typeof onProceed === 'function') {
        onProceed();
      }
    });
  }

  render() {
    this.container = document.getElementById(this.containerId) || document.getElementById('pathwayContainer');
    if (!this.container) return;

    const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');

    // Filter stages if selected
    let displayedStages = this.stages;
    if (this.currentFilter !== 'all') {
      const filterNum = parseInt(this.currentFilter);
      displayedStages = this.stages.filter(s => s.level === filterNum);
    }

    if (!displayedStages || displayedStages.length === 0) {
      this.container.innerHTML = `
        <div class="text-center py-16 text-slate-400">
          <p>${isBm ? 'Memuatkan 30 peringkat penyiasatan...' : 'Loading 30 investigation stages...'}</p>
        </div>
      `;
      return;
    }

    let html = `
      <div class="w-full max-w-4xl mx-auto flex flex-col items-center pb-20">

        <!-- ==================== LEVEL QUICK-JUMP FILTER TABS (Expanded & Spacious) ==================== -->
        <div class="w-full mb-6 flex flex-col md:flex-row items-center justify-between bg-slate-900/95 backdrop-blur-xl p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-700/60 shadow-[0_4px_24px_rgba(0,0,0,0.4)] gap-3 sm:gap-4 static">
          <div class="flex items-center gap-2.5 px-3 text-slate-300 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"></span>
            <span>${isBm ? 'PILIH TAHAP:' : 'SELECT LEVEL:'}</span>
          </div>
          <div class="flex items-center gap-2 sm:gap-3 flex-wrap justify-center w-full md:w-auto">
            <button onclick="gestigoApp.pathway.filterByLevel('all')" class="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold transition-all cursor-pointer whitespace-nowrap text-xs sm:text-sm shadow-md ${this.currentFilter === 'all' ? 'bg-emerald-500 text-slate-950 font-black shadow-[0_0_20px_rgba(34,197,94,0.5)] scale-[1.02]' : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/50'}">
              ${isBm ? 'Semua (1–30)' : 'All (1–30)'}
            </button>
            <button onclick="gestigoApp.pathway.filterByLevel(1)" class="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold transition-all cursor-pointer whitespace-nowrap text-xs sm:text-sm shadow-md ${this.currentFilter == 1 ? 'bg-emerald-500 text-slate-950 font-black shadow-[0_0_20px_rgba(34,197,94,0.5)] scale-[1.02]' : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/50'}">
              ${isBm ? 'Tahap 1' : 'Level 1'} (1–10)
            </button>
            <button onclick="gestigoApp.pathway.filterByLevel(2)" class="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold transition-all cursor-pointer whitespace-nowrap text-xs sm:text-sm shadow-md ${this.currentFilter == 2 ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-[1.02]' : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/50'}">
              ${isBm ? 'Tahap 2' : 'Level 2'} (11–20)
            </button>
            <button onclick="gestigoApp.pathway.filterByLevel(3)" class="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold transition-all cursor-pointer whitespace-nowrap text-xs sm:text-sm shadow-md ${this.currentFilter == 3 ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black shadow-[0_0_25px_rgba(168,85,247,0.5)] scale-[1.02] border border-purple-400/40' : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/50'}">
              ${isBm ? 'Tahap 3: Dunia 3D' : 'Level 3: 3D City'} (Open World)
            </button>
          </div>
        </div>
    `;

    // Render stages with level dividers
    let level3Rendered = false;

    displayedStages.forEach((stage, index) => {
      // For Level 3: Replace linear stages 21-30 with the 3D Luma City Investigation Hub!
      if (stage.level === 3) {
        if (!level3Rendered) {
          level3Rendered = true;
          html += this.renderLevelBanner(3);
          html += this.renderLevel3WorldHub();
        }
        return; // Do not render individual linear cards for level 3!
      }

      const isFirstOfLevel = (stage.id === 1 || stage.id === 11);
      
      if (isFirstOfLevel) {
        html += this.renderLevelBanner(stage.level);
      }

      const isUnlocked = this.unlockedStages.includes(stage.id);
      const isCompleted = !!this.completedStages[stage.id];
      const isActive = (stage.id === this.activeStageId);
      const isBoss = (stage.id === 10 || stage.id === 20 || stage.id === 30);
      const stars = this.completedStages[stage.id] || 0;

      const titleText = (isBm && stage.titleBm) ? stage.titleBm : stage.title;
      const subtitleText = (isBm && stage.subtitleBm) ? stage.subtitleBm : stage.subtitle;

      html += `
        <!-- Stage Item Node (Centered!) -->
        <div id="stage-card-${stage.id}" class="w-full flex flex-col items-center my-3 relative">
          
          <!-- Bouncing "Keep going!" Speech Bubble above active stage -->
          ${isActive ? `
            <div class="flex justify-center mb-1 animate-bounce z-20">
              <div class="px-4 py-1.5 rounded-full bg-[#a3e635] text-slate-950 font-black text-xs shadow-[0_0_20px_rgba(163,230,53,0.7)] flex items-center gap-1.5 border-2 border-white">
                <span class="text-sm">👉</span>
                <span>${isBm ? 'Teruskan Di Sini!' : 'Keep going!'}</span>
              </div>
            </div>
          ` : ''}

          <!-- Centered Interactive Game Node Container -->
          <div onclick="gestigoApp.pathway.handleStageClick(${stage.id})" class="w-full max-w-lg p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 ${isActive ? 'bg-gradient-to-b from-slate-900 to-[#0e1829] border-emerald-400 shadow-[0_0_25px_rgba(34,197,94,0.35)] scale-[1.01]' : (isCompleted ? 'bg-slate-900/90 border-slate-700 hover:border-emerald-500/60' : (isUnlocked ? 'bg-slate-900/80 border-slate-700 hover:border-sky-500/60' : 'bg-slate-950/80 border-slate-800/80 opacity-75'))} ${isUnlocked ? 'cursor-pointer hover:shadow-xl' : 'cursor-not-allowed'} flex flex-col sm:flex-row items-center gap-4">

            <!-- Isometric 3D Platform Tile -->
            <div class="flex-shrink-0 flex items-center justify-center">
              ${this.renderPlatformSVG(stage, isUnlocked, isActive, isCompleted, isBoss)}
            </div>

            <!-- Stage Details & Action Callout -->
            <div class="flex-1 min-w-0 text-center sm:text-left">
              <div class="flex items-center justify-center sm:justify-start gap-2 mb-1 flex-wrap">
                <span class="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded ${isBoss ? 'text-amber-300 bg-amber-950/80 border border-amber-500/50' : (stage.level === 3 ? 'text-purple-300 bg-purple-950/80 border border-purple-500/40' : (stage.level === 2 ? 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/40' : 'text-emerald-300 bg-emerald-950/80 border border-emerald-500/40'))}">
                  ${isBoss ? (isBm ? `⭐ KES BOSS ${stage.id}` : `⭐ BOSS STAGE ${stage.id}`) : (isBm ? `PERINGKAT ${stage.id}` : `STAGE ${stage.id}`)}
                </span>

                ${stage.modeBadge ? `
                  <span class="text-[9px] font-mono font-semibold text-slate-300 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700/80 hidden sm:inline-block shadow-sm">
                    ${stage.modeBadge}
                  </span>
                ` : ''}

                ${isCompleted ? `
                  <span class="text-xs font-mono font-bold text-yellow-300">
                    ${'★'.repeat(stars)}
                  </span>
                ` : ''}

                <span class="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                  +${stage.xp} XP
                </span>
              </div>

              <h3 class="text-sm sm:text-base font-extrabold text-white tracking-tight leading-snug">
                ${titleText}
              </h3>
              
              <p class="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                ${subtitleText}
              </p>

              <!-- Beginner-Friendly Action Button -->
              <div class="mt-3 flex items-center justify-center sm:justify-start">
                ${isUnlocked ? `
                  <button class="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${isActive ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : (isCompleted ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700')}">
                    <span>${isActive ? (isBm ? '🔍 Siasat Sekarang →' : '🔍 Investigate Now →') : (isCompleted ? (isBm ? '🔁 Ulang Kes' : '🔁 Replay Case') : (isBm ? '🚀 Mula Kes →' : '🚀 Start Case →'))}</span>
                  </button>
                ` : `
                  <div class="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-slate-500 bg-slate-950 border border-slate-800 flex items-center gap-1.5 select-none">
                    <span>🔒</span>
                    <span>${isBm ? 'Terkunci' : 'Locked'}</span>
                  </div>
                `}
              </div>

            </div>

          </div>

        </div>
      `;

      // Draw connecting circuit path between stages
      if (index < displayedStages.length - 1) {
        html += this.renderConnectingPath();
      }
    });

    html += `
        <!-- Victory Finish Milestone -->
        <div class="w-full mt-10 p-6 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-emerald-950 border-2 border-amber-500/60 shadow-[0_0_40px_rgba(245,158,11,0.3)] text-center">
          <div class="text-4xl mb-2 animate-bounce">🏆</div>
          <h3 class="text-lg font-black text-amber-300">
            ${isBm ? 'TAHNIAH DETEKTIF! MISTERI LUMA CITY SELESAI' : 'CONGRATULATIONS DETECTIVE! LUMA CITY SAVED'}
          </h3>
          <p class="text-xs text-slate-300 mt-1 max-w-md mx-auto">
            ${isBm ? 'Buku Memori telah dikembalikan ke Festival Cerita Luma City dan memori Detective Gio telah pulih 100%!' : 'The Memory Book is restored to Luma City\'s Festival of Stories, and Detective Gio\'s memory is 100% restored!'}
          </p>
        </div>

      </div>
    `;

    this.container.innerHTML = html;
  }
}

// Auto-instantiate globally
window.GestigoPathway = GestigoPathway;
