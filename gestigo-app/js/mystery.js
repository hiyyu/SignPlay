/**
 * GESTIGO - Detective Mystery & Pedagogical Question Engine
 * Provides distinct gameplay mechanics for each stage, non-spoiling questions,
 * interactive handshape observation, and automatic return to Case Map.
 */

class GestigoMysteryEngine {
  constructor() {
    this.currentStage = null;
    this.currentStepIdx = 0;
    this.hintsUsed = 0;
    this.startTime = 0;
    this.bossTimer = null;
    this.bossTimeLeft = 45;
    this.currentExpression = 'thinking';
    this.isBoss = false;
    this._isAnswering = false;
    this._mysteryTypewriterInterval = null;
    this._activeToastTimeout = null;
  }

  // Typewriter effect for Gio's partner dialogue
  typewriterText(element, fullText, callback) {
    if (!element) return;
    if (this._mysteryTypewriterInterval) {
      clearInterval(this._mysteryTypewriterInterval);
      this._mysteryTypewriterInterval = null;
    }

    element.innerHTML = '';
    let charIndex = 0;
    const speed = 16;

    if (window.gestigoAudio && typeof window.gestigoAudio.startTypingSound === 'function') {
      window.gestigoAudio.startTypingSound();
    }

    const tick = () => {
      if (charIndex <= fullText.length) {
        const currentSlice = fullText.slice(0, charIndex);
        element.innerHTML = currentSlice
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
        charIndex++;
      } else {
        this.finishMysteryTypewriter();
        if (typeof callback === 'function') callback();
      }
    };

    tick();
    this._mysteryTypewriterInterval = setInterval(tick, speed);
  }

  finishMysteryTypewriter() {
    if (this._mysteryTypewriterInterval) {
      clearInterval(this._mysteryTypewriterInterval);
      this._mysteryTypewriterInterval = null;
    }
    if (window.gestigoAudio && typeof window.gestigoAudio.stopTypingSound === 'function') {
      window.gestigoAudio.stopTypingSound();
    }
  }

    dismissToast() {
    if (this._activeToastTimeout) {
      clearTimeout(this._activeToastTimeout);
      this._activeToastTimeout = null;
    }
    const toast = document.getElementById('caseMapCompletionToast');
    if (toast) {
      toast.remove();
    }
  }

  openStage(stageOrId) {
    this.dismissToast();
    let stage = stageOrId;
    if (typeof stageOrId === 'number') {
      if (window.GESTIGO_STAGES) {
        stage = window.GESTIGO_STAGES.find(s => s.id === stageOrId);
      }
    }
    if (stage) {
      this.startStage(stage);
    }
  }

  startStage(stage) {
    this.dismissToast();
    if (!stage) return;
    this.currentStage = stage;
    this.currentStepIdx = 0;
    this.hintsUsed = 0;
    this.startTime = Date.now();
    this._isAnswering = false;
    this.isBoss = !!(stage.isBoss || stage.id === 10 || stage.id === 20 || stage.id === 30);

    const modal = document.getElementById('mysteryModal');
    if (modal) {
      modal.classList.remove('hidden');
    }

    const clearModal = document.getElementById('stageClearModal');
    if (clearModal) {
      clearModal.classList.add('hidden');
    }

    // Set initial Gio partner mood
    const initialMood = this.isBoss ? 'focused' : (stage.gioExpression || 'thinking');
    this.setGioExpression(initialMood);

    this.renderStoryBanner();
    this.renderCurrentStep();

    const timerBox = document.getElementById('bossTimerBox');
    if (this.isBoss) {
      if (timerBox) timerBox.classList.remove('hidden');
      this.bossTimeLeft = 45;
      this.startBossTimer();
      if (window.gestigoAudio && typeof window.gestigoAudio.playBossAlarm === 'function') {
        gestigoAudio.playBossAlarm();
      }
    } else {
      if (timerBox) timerBox.classList.add('hidden');
      if (this.bossTimer) clearInterval(this.bossTimer);
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  setGioExpression(mood) {
    this.currentExpression = mood;
    const img = document.getElementById('gioExpressionImg');
    const nameEl = document.getElementById('gioExpressionName');
    const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');

    const validMoods = ['excited', 'thinking', 'surprised', 'encouraging', 'focused', 'happy'];
    const safeMood = validMoods.includes(mood) ? mood : 'thinking';

    if (img) {
      img.src = `assets/gio-${safeMood}.png`;
      img.onerror = () => { img.src = 'assets/gio-avatar.png'; };
    }

    if (nameEl) {
      const moodLabels = {
        excited: isBm ? "Bersemangat!" : "Excited!",
        thinking: isBm ? "Menganalisis..." : "Analyzing...",
        surprised: isBm ? "Terkejut!" : "Astonished!",
        encouraging: isBm ? "Beri Panduan" : "Encouraging",
        focused: isBm ? "Fokus Maksimum" : "Deep Focus",
        happy: isBm ? "Tepat Sekali!" : "Brilliant!"
      };
      nameEl.textContent = moodLabels[safeMood] || safeMood;
    }
  }

  renderStoryBanner() {
    const s = this.currentStage;
    if (!s) return;

    const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');
    const caseTitle = isBm ? (s.titleBm || s.title) : s.title;

    const tagEl = document.getElementById('modalStageTag');
    if (tagEl) {
      const modeLabel = s.modeBadge ? ` • ${s.modeBadge}` : '';
      tagEl.textContent = s.isBoss 
        ? (isBm ? `⚡ KES BOSS #${s.id}` : `⚡ BOSS CASE #${s.id}`) 
        : (isBm ? `KES #${s.id}${modeLabel}` : `CASE #${s.id}${modeLabel}`);
    }

    const titleEl = document.getElementById('modalCaseTitle');
    if (titleEl) {
      titleEl.textContent = caseTitle.toUpperCase();
    }

    const subEl = document.getElementById('modalOrnateSubtitle');
    if (subEl) {
      const locText = (s.mystery && s.mystery.location) ? (isBm ? (s.mystery.locationBm || s.mystery.location) : s.mystery.location) : "Story Museum";
      subEl.textContent = `${locText} • STAGE ${s.id} OF 10`;
    }
  }

  renderCurrentStep() {
    const s = this.currentStage;
    if (!s || !s.mystery || !s.mystery.steps) return;
    const step = s.mystery.steps[this.currentStepIdx];
    if (!step) return;

    this._isAnswering = false;
    const totalSteps = s.mystery.steps.length;
    const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');

    // 1. Progress Bar & Step Counter
    const progressPercent = Math.round(((this.currentStepIdx + 1) / totalSteps) * 100);
    const barEl = document.getElementById('stepProgressBar');
    if (barEl) {
      barEl.style.width = `${progressPercent}%`;
    }

    const counterEl = document.getElementById('stepCounter');
    if (counterEl) {
      counterEl.textContent = isBm 
        ? `Soalan ${this.currentStepIdx + 1} drpd ${totalSteps}`
        : `Question ${this.currentStepIdx + 1} of ${totalSteps}`;
    }

    const clueHeader = document.getElementById('clueHeaderTitle');
    if (clueHeader) {
      const modeName = s.modeBadge || 'EVIDENCE CLUE';
      clueHeader.textContent = isBm 
        ? `${modeName} #${this.currentStepIdx + 1} DRDP ${totalSteps}`
        : `${modeName} #${this.currentStepIdx + 1} OF ${totalSteps}`;
    }

    // 2. Focal Evidence Sign Image & Mode Caption
    if (s.level !== 2) {
      const clueContainer = document.getElementById('clueHandImageContainer');
      if (clueContainer && !document.getElementById('clueHandImage')) {
        clueContainer.innerHTML = '<img id="clueHandImage" src="" alt="Mystery Hand Sign Clue" class="w-full h-full object-contain filter contrast-110 drop-shadow-md" />';
      }
      const clueHeader = document.getElementById('clueHeaderTitle');
      if (clueHeader) clueHeader.textContent = isBm ? "BAHAN BUKTI FORENSIK" : "FORENSIC SPECIMEN";
    }
    const clueImg = document.getElementById('clueHandImage');
    const captionEl = document.getElementById('clueCaptionText');

    if (clueImg) {
      clueImg.src = step.image || `assets/signs/forensic/clue_${step.targetSign}.png`;
      clueImg.alt = "Hand Sign Evidence";
    }

    if (captionEl) {
      const captions = {
        alphabet_static: isBm ? "Perhatikan kedudukan jari dan ibu jari untuk mencari huruf." : "Observe finger positions and thumb placement to deduce the letter.",
        numbers_counting: isBm ? "Kira bilangan jari tegak untuk menentukan angka yang betul." : "Count the extended fingers to deduce the correct number.",
        time_calendar: isBm ? "Kenal pasti isyarat masa atau hari yang ditunjukkan." : "Identify the temporal sign indicating day, time, or period.",
        survival_greetings: isBm ? "Kenal pasti isyarat ucapan santun atau permohonan bantuan." : "Recognize the essential sign used for greeting, gratitude, or help.",
        pronouns_identity: isBm ? "Perhatikan arah tunjuk isyarat bagi pengenalan diri atau orang lain." : "Determine the pointing direction identifying the person.",
        family_relations: isBm ? "Zon dahi untuk lelaki, zon dagu untuk wanita. Cari pertalian keluarga!" : "Notice the facial zone (chin = female, forehead = male) for family signs.",
        colors_clothes: isBm ? "Nyahkod isyarat warna atau pakaian berdasarkan pergerakan visual." : "Decode the visual descriptor sign for colors or clothing.",
        food_drink: isBm ? "Perhatikan aksi suapan atau minuman untuk mengenal pasti keperluan asas." : "Examine the nourishing action sign for food or drink essentials.",
        home_routine: isBm ? "Kenal pasti rutin harian atau persekitaran tempat tinggal." : "Recognize the daily routine sign for domestic activities and routine.",
        boss_survival: isBm ? "Lengkapkan simulasi dialog perjumpaan santun langkah demi langkah!" : "Simulate the casual meetup introduction sequence step-by-step!"
      };
      captionEl.textContent = captions[s.gameMode] || (isBm ? "Perhatikan isyarat tangan dengan teliti." : "Carefully observe the sign language handshape.");
    }

    // 3. Dialogue Speaker & Question Setup
    const isLevel2 = (s.level === 2);
    const speakerLabel = document.getElementById('dialogueSpeakerLabel');
    const avatarFrame = document.getElementById('dialogueAvatarFrame');
    const expName = document.getElementById('gioExpressionName');

    if (isLevel2) {
      // In Level 2, YOU (THE DETECTIVE) ask the questions directly!
      if (speakerLabel) {
        speakerLabel.innerHTML = isBm ? '🕵️ ANDA (DETEKTIF)' : '🕵️ YOU (DETECTIVE)';
        speakerLabel.className = 'text-[10px] font-mono font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5';
      }
      if (expName) {
        expName.textContent = isBm ? 'Menyoal Siasat...' : 'Interrogating...';
        expName.className = 'text-[9px] font-mono text-center block text-cyan-300 font-bold mt-1';
      }
      if (avatarFrame) {
        avatarFrame.innerHTML = '<img id="playerDetectiveImg" src="assets/player-detective.png" alt="Player Detective" class="w-full h-full object-cover" />';
        avatarFrame.className = 'w-14 h-14 rounded-2xl overflow-hidden border-2 border-cyan-400/80 bg-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.35)] flex items-center justify-center';
      }
    } else {
      // In Level 1, GIO (PARTNER) guides the apprentice detective
      if (speakerLabel) {
        speakerLabel.innerHTML = isBm ? 'GIO (RAKAN)' : 'GIO (PARTNER)';
        speakerLabel.className = 'text-[10px] font-mono font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5';
      }
      if (expName) {
        expName.className = 'text-[9px] font-mono text-center block text-purple-300 font-bold mt-1';
      }
      if (avatarFrame) {
        avatarFrame.innerHTML = '<img id="gioExpressionImg" src="assets/gio-thinking.png" alt="Gio Partner" class="w-full h-full object-cover" />';
        avatarFrame.className = 'w-14 h-14 rounded-2xl overflow-hidden border-2 border-purple-400/80 bg-[#1e293b] shadow-[0_0_15px_rgba(168,85,247,0.35)] flex items-center justify-center';
      }
    }

    if (s.level !== 2) {
      const promptText = isBm ? (step.promptBm || step.prompt) : step.prompt;
      const gioTextEl = document.getElementById('gioDialogueText');
      if (gioTextEl) {
        this.typewriterText(gioTextEl, `"${promptText}"`);
      }
    }

    // 4. Educational Hint Setup
    const hintText = isBm ? (step.hintBm || step.hint) : step.hint;
    const hintContent = document.getElementById('hintContentText');
    if (hintContent) {
      hintContent.textContent = hintText || (isBm ? "Perhatikan kedudukan jari dan tapak tangan." : "Observe finger positions and palm direction.");
    }
    const hintBox = document.getElementById('stepHint');
    if (hintBox) {
      hintBox.classList.add('hidden');
    }

    // 5. Reset Feedback Banner
    const feedbackBanner = document.getElementById('stepFeedbackBanner');
    if (feedbackBanner) {
      feedbackBanner.className = 'hidden';
      feedbackBanner.innerHTML = '';
    }

    // 6. Render 4 Deductive Choices (Level 1) OR Specialized Level 2 Detective Mechanics
    if (s.level === 2) {
      this.renderLevel2DetectiveMechanic(step);
    } else {
      this.renderSignChoiceCards(step);
    }
  }

  renderSignChoiceCards(step) {
    const grid = document.getElementById('signChoicesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const s = this.currentStage;
    const targetSign = (step.targetSign || 'A').toUpperCase().trim();
    const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');

    // Header label update based on stage curriculum
    const headerLabel = document.getElementById('choicesHeaderLabel');
    if (headerLabel) {
      const labels = {
        alphabet_static: isBm ? "PILIH HURUF ISYARAT:" : "SELECT THE MATCHING LETTER:",
        numbers_counting: isBm ? "PILIH NOMBOR ISYARAT:" : "SELECT THE MATCHING NUMBER:",
        time_calendar: isBm ? "PILIH ISYARAT MASA / HARI:" : "SELECT THE TIME / CALENDAR SIGN:",
        survival_greetings: isBm ? "PILIH ISYARAT SURVIVAL:" : "SELECT THE GREETING / SURVIVAL SIGN:",
        pronouns_identity: isBm ? "PILIH KATA GANTI / IDENTITI:" : "SELECT THE PRONOUN / IDENTITY SIGN:",
        family_relations: isBm ? "PILIH HUBUNGAN KELUARGA:" : "SELECT THE FAMILY RELATION SIGN:",
        colors_clothes: isBm ? "PILIH WARNA / PAKAIAN:" : "SELECT THE COLOR / CLOTHING SIGN:",
        food_drink: isBm ? "PILIH MAKANAN / MINUMAN:" : "SELECT THE FOOD / DRINK SIGN:",
        home_routine: isBm ? "PILIH RUTIN HARIAN:" : "SELECT THE DAILY ROUTINE SIGN:",
        boss_survival: isBm ? "PILIH RESPON SIMULASI:" : "SELECT THE ENCOUNTER RESPONSE:"
      };
      headerLabel.textContent = labels[s.gameMode] || (isBm ? "PILIH JAWAPAN YANG TEPAT:" : "SELECT THE MATCHING SIGN:");
    }

    const options = step.options || [targetSign, 'A', 'B', 'C'];
    const shuffledOptions = [...options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    shuffledOptions.forEach(opt => {
      const isCorrect = (opt.toUpperCase().trim() === targetSign);
      const btn = document.createElement('button');
      btn.type = 'button';

      let displayLabel = opt;
      let subLabel = isBm ? "Pilihan Isyarat" : "Sign Option";
      let badgeContent = opt;

      if (s.gameMode === 'alphabet_static') {
        displayLabel = `Letter ${opt}`;
        subLabel = isBm ? "Abjad Manual" : "Manual Alphabet";
        badgeContent = opt;
      } else if (s.gameMode === 'numbers_counting') {
        displayLabel = isBm ? `Nombor ${opt}` : `Number ${opt}`;
        subLabel = isBm ? "Kiraan Jari" : "Finger Count";
        badgeContent = opt;
      } else if (s.gameMode === 'time_calendar') {
        displayLabel = opt;
        subLabel = isBm ? "Masa & Kalendar" : "Time & Calendar";
        badgeContent = "⏰";
      } else if (s.gameMode === 'survival_greetings') {
        displayLabel = opt;
        subLabel = isBm ? "Ucapan & Bantuan" : "Greeting & Safety";
        badgeContent = "👋";
      } else if (s.gameMode === 'pronouns_identity') {
        displayLabel = opt;
        subLabel = isBm ? "Identiti / Diri" : "Identity & Pronoun";
        badgeContent = "🪪";
      } else if (s.gameMode === 'family_relations') {
        displayLabel = opt;
        subLabel = isBm ? "Pertalian Keluarga" : "Family Relation";
        badgeContent = "👨‍👩‍👧";
      } else if (s.gameMode === 'colors_clothes') {
        displayLabel = opt;
        subLabel = isBm ? "Warna & Pakaian" : "Color & Clothing";
        badgeContent = "🎨";
      } else if (s.gameMode === 'food_drink') {
        displayLabel = opt;
        subLabel = isBm ? "Makanan & Minuman" : "Food & Drink";
        badgeContent = "🍎";
      } else if (s.gameMode === 'home_routine') {
        displayLabel = opt;
        subLabel = isBm ? "Aktiviti Rumah" : "Household Routine";
        badgeContent = "🏠";
      } else if (s.gameMode === 'boss_survival') {
        displayLabel = opt;
        subLabel = isBm ? "Dialog Perjumpaan" : "Meetup Dialogue";
        badgeContent = "🏆";
      }

      btn.className = "choice-card p-3 sm:p-3.5 rounded-2xl bg-[#1a233a] hover:bg-[#222f4c] border-2 border-slate-700/80 hover:border-amber-400 text-left transition-all cursor-pointer flex items-center justify-between group shadow-md active:scale-95";
      btn.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center font-mono font-black text-amber-300 group-hover:scale-110 transition-transform text-lg shadow-sm">
            ${badgeContent}
          </div>
          <div>
            <span class="text-sm font-bold text-white block group-hover:text-amber-300 transition-colors">${displayLabel}</span>
            <span class="text-[10px] text-slate-400 font-mono">${subLabel}</span>
          </div>
        </div>
        <span class="text-xs text-slate-500 group-hover:text-amber-400 font-mono font-bold">→</span>
      `;

      btn.onclick = () => this.selectSign(opt, btn, isCorrect, step);
      grid.appendChild(btn);
    });
  }

  selectSign(selectedLetter, btnElement, isCorrect, step) {
    if (this._isAnswering) return;

    const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');
    const feedback = document.getElementById('stepFeedbackBanner');

    if (isCorrect) {
      this._isAnswering = true;
      if (window.gestigoAudio && typeof window.gestigoAudio.playSuccess === 'function') {
        gestigoAudio.playSuccess();
      }
      this.setGioExpression('happy');

      if (btnElement) {
        btnElement.classList.remove('bg-[#1a233a]', 'border-slate-700/80', 'hover:border-amber-400');
        btnElement.classList.add('bg-emerald-600/40', 'border-emerald-400', 'shadow-[0_0_20px_rgba(34,197,94,0.5)]');
      }

      if (feedback) {
        feedback.className = 'p-2.5 rounded-xl text-center text-xs font-bold bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 animate-fadeIn';
        const praiseMsg = step.praise 
          ? (isBm ? (step.praiseBm || step.praise) : step.praise)
          : (isBm ? `✨ Tepat sekali! "${selectedLetter}" adalah jawapan yang betul!` : `✨ Brilliant deduction! "${selectedLetter}" is correct!`);
        feedback.innerHTML = praiseMsg;
      }

      const gioTextEl = document.getElementById('gioDialogueText');
      if (gioTextEl && step.praise) {
        const praiseMsg = isBm ? (step.praiseBm || step.praise) : step.praise;
        this.typewriterText(gioTextEl, `"${praiseMsg}"`);
      }

      setTimeout(() => {
        this.handleStepSuccess();
      }, 500);

    } else {
      if (window.gestigoAudio && typeof window.gestigoAudio.playError === 'function') {
        gestigoAudio.playError();
      }
      this.setGioExpression('thinking');

      if (btnElement) {
        btnElement.classList.add('bg-red-950/60', 'border-red-500/80', 'animate-shake');
        setTimeout(() => {
          btnElement.classList.remove('animate-shake');
        }, 450);
      }

      if (feedback) {
        feedback.className = 'p-2.5 rounded-xl text-center text-xs font-bold bg-amber-950/80 border border-amber-500/60 text-amber-300 animate-fadeIn';
        feedback.innerHTML = isBm 
          ? `🤔 Bukan pilihan "${selectedLetter}". Perhatikan petunjuk dengan teliti!` 
          : `🤔 Not "${selectedLetter}". Check the clues and try again!`;
      }

      const hintBox = document.getElementById('stepHint');
      if (hintBox) {
        hintBox.classList.remove('hidden');
      }
    }
  }

  revealHint() {
    this.hintsUsed++;
    if (window.gestigoAudio && typeof window.gestigoAudio.playClick === 'function') {
      gestigoAudio.playClick();
    }
    this.setGioExpression('encouraging');
    const hintBox = document.getElementById('stepHint');
    if (hintBox) {
      hintBox.classList.toggle('hidden');
    }
  }

  handleStepSuccess() {
    this.currentStepIdx++;
    const totalSteps = this.currentStage.mystery.steps.length;

    if (this.currentStepIdx < totalSteps) {
      this.setGioExpression('thinking');
      this.renderCurrentStep();
    } else {
      if (this.bossTimer) clearInterval(this.bossTimer);
      this.setGioExpression('excited');
      setTimeout(() => {
        this.handleStageComplete();
      }, 350);
    }
  }

  // Automatically directs player back to Case Map upon completing all questions!
  handleStageComplete() {
    if (window.gestigoAudio) {
      if (typeof gestigoAudio.playClueFound === 'function') gestigoAudio.playClueFound();
      if (typeof gestigoAudio.playLevelUp === 'function') gestigoAudio.playLevelUp();
    }

    const elapsed = Math.round((Date.now() - this.startTime) / 1000);
    let stars = 3;
    if (this.hintsUsed > 1 || elapsed > 90) stars = 2;
    if (this.hintsUsed > 3 || elapsed > 150) stars = 1;

    const s = this.currentStage;
    const clue = s.mystery ? s.mystery.clueUnlocked : null;

    // Immediately close investigation modal to prevent any stuck screen or cliffhanger!
    const mysteryModal = document.getElementById('mysteryModal');
    if (mysteryModal) mysteryModal.classList.add('hidden');

    const clearModal = document.getElementById('stageClearModal');
    if (clearModal) clearModal.classList.add('hidden');

    // Save completion progress & unlock next stage
    if (window.gestigoApp && typeof gestigoApp.completeStage === 'function') {
      try {
        gestigoApp.completeStage(s.id, stars, s.xp || 150, clue);
      } catch (e) {
        console.warn("completeStage error:", e);
      }
    }

    // Direct back to Case Map: activate and smoothly scroll to next stage
    const nextStageId = s.id + 1;
    if (window.gestigoPathway) {
      gestigoPathway.activeStageId = Math.min(nextStageId, 30);
      if (typeof gestigoPathway.render === 'function') gestigoPathway.render();
      if (typeof gestigoPathway.scrollToActiveStage === 'function') gestigoPathway.scrollToActiveStage();
    }

    // Show celebratory floating toast on Case Map
    this.showCaseMapCompletionToast(s, nextStageId);

    if (window.gestigoJournal && typeof gestigoJournal.updateHeaderMemory === 'function') {
      gestigoJournal.updateHeaderMemory();
    }
  }

  // Celebratory Case Map Completion Notification Toast (Non-blocking, instant proceed!)
  showCaseMapCompletionToast(stage, nextStageId) {
    if (this._activeToastTimeout) {
      clearTimeout(this._activeToastTimeout);
      this._activeToastTimeout = null;
    }

    const existingToast = document.getElementById('caseMapCompletionToast');
    if (existingToast) existingToast.remove();

    const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');
    const stageTitle = isBm ? (stage.titleBm || stage.title) : stage.title;
    const nextStage = window.GESTIGO_STAGES ? window.GESTIGO_STAGES.find(s => s.id === nextStageId) : null;
    const nextTitle = nextStage ? (isBm ? (nextStage.titleBm || nextStage.title) : nextStage.title) : `Stage ${nextStageId}`;

    const toast = document.createElement('div');
    toast.id = 'caseMapCompletionToast';
    toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[92%] p-4 rounded-2xl bg-gradient-to-r from-emerald-950/95 via-slate-900/95 to-slate-950/95 border-2 border-emerald-400 shadow-[0_0_40px_rgba(34,197,94,0.5)] backdrop-blur-md flex items-center gap-4 animate-fadeIn';
    toast.innerHTML = `
      <div class="w-12 h-12 rounded-xl bg-emerald-500/25 border border-emerald-400 flex items-center justify-center text-2xl flex-shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.6)]">
        🎉
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
          <span>${isBm ? 'KES SELESAI!' : 'CASE SOLVED!'}</span>
          <span class="text-amber-400">+${stage.xp || 150} XP</span>
          <span>⭐⭐⭐</span>
        </div>
        <div class="text-sm font-black text-white truncate mt-0.5">
          ${stageTitle} ${isBm ? 'Berjaya Diselesaikan!' : 'Cleared!'}
        </div>
        <div class="text-xs text-slate-300 truncate">
          ${nextStage ? (isBm ? `Tahap ${nextStageId} kini dibuka!` : `Stage ${nextStageId}: ${nextTitle} is unlocked!`) : (isBm ? 'Tahap seterusnya sedia disiasat!' : 'Next stage is ready!')}
        </div>
      </div>
      ${nextStageId <= 30 ? `
        <button onclick="if(window.gestigoMystery) gestigoMystery.dismissToast(); gestigoMystery.openStage(${nextStageId});" class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-xs shadow-md cursor-pointer transition-all flex items-center gap-1.5 flex-shrink-0">
          <span>${isBm ? 'Siasat' : 'Investigate'}</span>
          <span>→</span>
        </button>
      ` : ''}
      <button onclick="if(window.gestigoMystery) gestigoMystery.dismissToast()" class="text-slate-400 hover:text-white text-xs p-1 cursor-pointer">
        ✕
      </button>
    `;
    document.body.appendChild(toast);

    // Auto-dismiss toast after 8 seconds
    this._activeToastTimeout = setTimeout(() => {
      const el = document.getElementById('caseMapCompletionToast');
      if (el) {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.5s ease';
        setTimeout(() => el.remove(), 500);
      }
    }, 8000);
  }

  proceedToNextStage() {
    this.closeStage();
  }

  startBossTimer() {
    const timerEl = document.getElementById('bossTimeLeft');
    if (this.bossTimer) clearInterval(this.bossTimer);

    this.bossTimer = setInterval(() => {
      this.bossTimeLeft--;
      if (timerEl) timerEl.textContent = `${this.bossTimeLeft}s`;

      if (this.bossTimeLeft <= 10) {
        if (window.gestigoAudio && typeof window.gestigoAudio.playBossAlarm === 'function') {
          gestigoAudio.playBossAlarm();
        }
        this.setGioExpression('focused');
      }

      if (this.bossTimeLeft <= 0) {
        clearInterval(this.bossTimer);
        if (window.gestigoAudio && typeof window.gestigoAudio.playError === 'function') {
          gestigoAudio.playError();
        }
        this.setGioExpression('surprised');
        const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');
        alert(isBm ? "Masa tamat! Petunjuk terlindung semula. Sila cuba lagi!" : "Time expired! The trail grew cold. Try again!");
        this.closeStage();
      }
    }, 1000);
  }

  closeStage() {
    this.closeModal();
  }

  closeModal() {
    this.dismissToast();
    if (this.bossTimer) clearInterval(this.bossTimer);
    this.finishMysteryTypewriter();

    const mysteryModal = document.getElementById('mysteryModal');
    if (mysteryModal) mysteryModal.classList.add('hidden');

    const clearModal = document.getElementById('stageClearModal');
    if (clearModal) clearModal.classList.add('hidden');

    // Direct user right back to Case Map & smoothly scroll to active stage
    if (window.gestigoPathway && typeof gestigoPathway.scrollToActiveStage === 'function') {
      setTimeout(() => {
        gestigoPathway.scrollToActiveStage();
        const activeCard = document.getElementById(`stage-card-${gestigoPathway.activeStageId}`);
        if (activeCard) {
          activeCard.classList.add('ring-4', 'ring-emerald-400', 'ring-offset-4', 'ring-offset-slate-900', 'transition-all');
          setTimeout(() => {
            activeCard.classList.remove('ring-4', 'ring-emerald-400', 'ring-offset-4', 'ring-offset-slate-900');
          }, 2000);
        }
      }, 150);
    }
  }

  // ==========================================================================
  // LEVEL 2 SPECIALIZED DETECTIVE MECHANICS (NO MORE SIMPLE 4-CHOICE TICKING!)
  // ==========================================================================

  renderLevel2DetectiveMechanic(step) {
    const s = this.currentStage;
    if (!s) return;

    // Reset container classes
    const grid = document.getElementById('signChoicesGrid');
    if (grid) {
      grid.className = "w-full space-y-3";
    }

    if (s.id >= 11 && s.id <= 13) {
      this.renderLieDetectorInterrogation(step);
    } else {
      // Unified Video / Forensic Motion Player for all Stages 14 to 20!
      this.renderForensicMotionQuestion(step);
    }
  }

  // Helper: Trigger Level 2 Success
  handleLevel2Success(praiseMessage) {
    if (this._isAnswering) return;
    this._isAnswering = true;
    if (window.gestigoAudio && typeof window.gestigoAudio.playSuccess === 'function') {
      gestigoAudio.playSuccess();
    }
    this.setGioExpression('happy');

    const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');
    const feedback = document.getElementById('stepFeedbackBanner');
    if (feedback) {
      feedback.className = 'p-3 rounded-xl text-center text-xs font-bold bg-emerald-950/90 border border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] animate-fadeIn block';
      feedback.innerHTML = praiseMessage || (isBm ? '✨ Analisis deduksi berjaya! Alibi disahkan.' : '✨ Forensic deduction verified! Clue confirmed.');
    }

    setTimeout(() => {
      this.handleStepSuccess();
    }, 700);
  }

  // Helper: Trigger Level 2 Error
  handleLevel2Error(errorMessage) {
    if (window.gestigoAudio && typeof window.gestigoAudio.playError === 'function') {
      gestigoAudio.playError();
    }
    this.setGioExpression('thinking');

    const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');
    const feedback = document.getElementById('stepFeedbackBanner');
    if (feedback) {
      feedback.className = 'p-3 rounded-xl text-center text-xs font-bold bg-red-950/90 border border-red-500 text-red-200 animate-fadeIn block';
      feedback.innerHTML = errorMessage || (isBm ? '🤔 Tidak tepat. Semak semula bukti dan isyarat tangan!' : '🤔 Clue mismatch. Re-examine the witness signs and statements!');
    }
    const hintBox = document.getElementById('stepHint');
    if (hintBox) hintBox.classList.remove('hidden');
  }

  // --------------------------------------------------------------------------
  // MECHANIC 1: FORENSIC LIE DETECTOR INTERROGATION (Stages 11, 12, 13)
  // Pure Visual Faceless Kinematic Motion + Matching Detective Questions (NO SPOILER BADGES!)
  // --------------------------------------------------------------------------
  renderLieDetectorInterrogation(step) {
    const s = this.currentStage;
    const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');
    const stepIdx = this.currentStepIdx || 0;

    const INTERROGATION_DB = {
      // Stage 11: The Frightened Witness (Emotions & Feelings)
      11: [
        {
          questionEn: "Witness, you claimed that the festival attendees were peaceful and in high spirits before the alarm?",
          questionBm: "Saksi, anda mendakwa pengunjung festival berada dalam keadaan tenang dan gembira sebelum penggera berbunyi?",
          targetSign: 'HAPPY',
          observedSign: 'ANGRY',
          isLie: true,
          signImg: 'assets/emotions/sign_angry.png',
          motionDescEn: 'Both hands at chest level with arched, bent fingers, sweeping sharply outward with sudden tension.',
          motionDescBm: 'Kedua-dua tangan pada aras dada dengan jari melengkung seperti cakar, ditarik keluar dengan tajam.',
          testimonyEn: 'Witness claims: "The festival was wonderful! Everyone was celebrating peacefully, feeling completely HAPPY with zero tension."',
          testimonyBm: 'Saksi mendakwa: "Festival itu sangat meriah! Semua orang menyambut dengan aman, berasa amat GEMBIRA tanpa sebarang ketegangan."'
        },
        {
          questionEn: "What was the emotional reaction of the crowd when the curator announced the relic theft?",
          questionBm: "Bagaimanakah reaksi emosi orang ramai apabila kurator mengumumkan kecurian relik itu?",
          targetSign: 'SAD',
          observedSign: 'SAD',
          isLie: false,
          signImg: 'assets/emotions/sign_sad.png',
          motionDescEn: 'Both open flat hands positioned in front of torso, drawing slowly and limply downward.',
          motionDescBm: 'Kedua-dua tapak tangan terbuka melurut perlahan dan terkulai ke bawah di hadapan badan.',
          testimonyEn: 'Witness claims: "It was heartbreaking... people were weeping and devastated. A deep feeling of SADNESS fell over the pavilion."',
          testimonyBm: 'Saksi mendakwa: "Ia amat memilukan... orang ramai menangis dan bersedih. Rasa SEDIH yang mendalam menyelubungi pavilion."'
        },
        {
          questionEn: "Did you observe any hostile behavior or aggression during the confrontation near the carousel?",
          questionBm: "Adakah anda melihat sebarang permusuhan atau keganasan semasa pertengkaran dekat karusel?",
          targetSign: 'ANGRY',
          observedSign: 'ANGRY',
          isLie: true,
          signImg: 'assets/emotions/sign_angry.png',
          motionDescEn: 'Both hands at chest level with arched, bent fingers, sweeping sharply outward with sudden tension.',
          motionDescBm: 'Kedua-dua tangan pada aras dada dengan jari melengkung seperti cakar, ditarik keluar dengan tajam.',
          testimonyEn: 'Witness claims: "Nobody was upset back there. Both people were laughing cheerfully and feeling completely HAPPY."',
          testimonyBm: 'Saksi mendakwa: "Tiada sesiapa yang bermusuhan di situ. Kedua-dua individu ketawa riang dan berasa amat GEMBIRA."'
        },
        {
          questionEn: "What was the physical condition of the fleeing suspect who sprinted past the fountain?",
          questionBm: "Bagaimanakah keadaan fizikal suspek yang melarikan diri melepasi air pancut?",
          targetSign: 'TIRED',
          observedSign: 'TIRED',
          isLie: false,
          signImg: 'assets/emotions/sign_tired.png',
          motionDescEn: 'Fingertips of bent hands resting on chest, rolling outward and slumping heavily downward.',
          motionDescBm: 'Hujung jari bengkok di dada bergolek ke bawah dan terkulai lesu.',
          testimonyEn: 'Witness claims: "I saw a hooded figure stumbling past the fountain. They were gasping for breath, looking utterly exhausted and TIRED."',
          testimonyBm: 'Saksi mendakwa: "Saya melihat kelibat berhud melepasi air pancut. Mereka tercungap-cungap dan kelihatan amat letih serta PENAT."'
        }
      ],

      // Stage 12: The Paramedic's Clinic Report (Health & The Body)
      12: [
        {
          questionEn: "Did the injured guard report any acute physical injury or ache during your triage examination?",
          questionBm: "Adakah pengawal yang cedera mengadu kesakitan fizikal atau sengal semasa pemeriksaan triage anda?",
          targetSign: 'PAIN',
          observedSign: 'PAIN',
          isLie: true,
          signImg: 'assets/emotions/sign_pain.png',
          motionDescEn: 'Both index fingers point directly toward each other and twist inward repeatedly near the chest.',
          motionDescBm: 'Kedua-dua jari telunjuk menghadap antara satu sama lain dan memulas ke dalam berulang kali berhampiran dada.',
          testimonyEn: 'Witness claims: "I did not feel any physical PAIN or hurt at all! I was completely unscathed during the incident."',
          testimonyBm: 'Saksi mendakwa: "Saya langsung tidak berasa SAKIT atau tercedera! Saya langsung tidak cedera semasa insiden itu."'
        },
        {
          questionEn: "Where specifically did the falling vitrine debris impact the casualty?",
          questionBm: "Di bahagian manakah serpihan vitrine yang jatuh menghentam mangsa?",
          targetSign: 'HEAD',
          observedSign: 'HEAD',
          isLie: false,
          signImg: 'assets/emotions/sign_head.png',
          motionDescEn: 'Fingertips reach up to tap temple area, then trace down toward the jawline.',
          motionDescBm: 'Hujung jari menyentuh pelipis dahi, kemudian beralih ke bahagian rahang.',
          testimonyEn: 'Witness claims: "Yes, heavy falling debris struck me hard on the side of my HEAD during the commotion!"',
          testimonyBm: 'Saksi mendakwa: "Ya, serpihan berat terjatuh dan menghentam kuat bahagian KEPALA saya semasa kekecohan berlaku!"'
        },
        {
          questionEn: "Did qualified medical personnel attend to you at the scene?",
          questionBm: "Adakah pegawai perubatan bertauliah merawat anda di tempat kejadian?",
          targetSign: 'DOCTOR',
          observedSign: 'DOCTOR',
          isLie: false,
          signImg: 'assets/emotions/sign_doctor.png',
          motionDescEn: 'Dominant fingertips tap twice firmly against the pulse of the inner wrist.',
          motionDescBm: 'Hujung jari dominan mengetuk dua kali dengan tegas pada nadi pergelangan tangan.',
          testimonyEn: 'Witness claims: "Yes, the attending DOCTOR arrived immediately to examine my vitals and check my pulse."',
          testimonyBm: 'Saksi mendakwa: "Ya, DOKTOR yang bertugas tiba dengan segera untuk memeriksa nadi dan tanda vital saya."'
        },
        {
          questionEn: "Were you transported to an emergency medical facility following the collapse?",
          questionBm: "Adakah anda dibawa ke fasiliti perubatan kecemasan selepas insiden tersebut?",
          targetSign: 'HOSPITAL',
          observedSign: 'HOSPITAL',
          isLie: true,
          signImg: 'assets/emotions/sign_hospital.png',
          motionDescEn: 'Fingers in H-handshape draw a medical cross mark on upper shoulder and arm.',
          motionDescBm: 'Jari dalam bentuk H melukis lambang palang perubatan pada bahu dan lengan atas.',
          testimonyEn: 'Witness claims: "No, I never went near the central HOSPITAL tonight! I just walked home without any medical transfer."',
          testimonyBm: 'Saksi mendakwa: "Tidak, saya langsung tidak pergi ke HOSPITAL pusat malam ini! Saya hanya berjalan pulang tanpa sebarang rujukan perubatan."'
        }
      ],

      // Stage 13: The Night Market Vendor (Food & Dining)
      13: [
        {
          questionEn: "Did the suspect place an order or consult the dining list at your stall?",
          questionBm: "Adakah suspek membuat pesanan atau merujuk senarai hidangan di gerai anda?",
          targetSign: 'MENU',
          observedSign: 'MENU',
          isLie: true,
          signImg: 'assets/emotions/sign_menu.png',
          motionDescEn: 'Both flat open palms held side-by-side, swinging outward like opening pages of a book.',
          motionDescBm: 'Kedua-dua tapak tangan terbuka dibuka keluar seperti membuka helaian buku.',
          testimonyEn: 'Witness claims: "I never even opened or looked at the MENU tonight! I ordered from memory without reading anything."',
          testimonyBm: 'Saksi mendakwa: "Saya langsung tidak membuka atau melihat MENU malam ini! Saya memesan hidangan dari ingatan tanpa membaca apa-apa."'
        },
        {
          questionEn: "Did the customer consume any beverages while waiting for their takeaway parcel?",
          questionBm: "Adakah pelanggan tersebut meminum sebarang minuman semasa menunggu bungkusan mereka?",
          targetSign: 'WATER',
          observedSign: 'WATER',
          isLie: false,
          signImg: 'assets/emotions/sign_water.png',
          motionDescEn: 'W-handshape with three upright fingers taps the center of chin twice.',
          motionDescBm: 'Tangan bentuk W dengan tiga jari tegak mengetuk bahagian tengah dagu dua kali.',
          testimonyEn: 'Witness claims: "Yes, I requested a cold glass of iced WATER while sitting at the bistro counter."',
          testimonyBm: 'Saksi mendakwa: "Ya, saya meminta segelas AIR sejuk berais semasa duduk di kaunter bistro."'
        },
        {
          questionEn: "Did the individual settle their transaction before hurrying toward the alleyway?",
          questionBm: "Adakah individu itu membayar bil mereka sebelum bergegas menuju ke lorong?",
          targetSign: 'PAY',
          observedSign: 'PAY',
          isLie: true,
          signImg: 'assets/emotions/sign_pay.png',
          motionDescEn: 'Dominant index finger slides forward firmly along the open flat palm of non-dominant hand.',
          motionDescBm: 'Jari telunjuk dominan menggelongsor ke hadapan dengan tegas di atas tapak tangan terbuka.',
          testimonyEn: 'Witness claims: "I never had to PAY because the restaurant manager comped my meal as a free courtesy!"',
          testimonyBm: 'Saksi mendakwa: "Saya langsung tidak perlu BAYAR kerana pengurus restoran memberikan hidangan percuma!"'
        },
        {
          questionEn: "Did the cashier provide an itemized paper receipt before the customer departed?",
          questionBm: "Adakah juruwang memberikan resit kertas sebelum pelanggan beredar?",
          targetSign: 'CHECK',
          observedSign: 'CHECK',
          isLie: false,
          signImg: 'assets/emotions/sign_check.png',
          motionDescEn: 'Index fingers and thumbs of both hands draw a rectangular card outline in the air.',
          motionDescBm: 'Jari telunjuk dan ibu jari kedua-dua belah tangan melukis garisan bentuk segi empat tepat di udara.',
          testimonyEn: 'Witness claims: "Yes, the waiter brought over the printed itemized CHECK and receipt before I stepped outside."',
          testimonyBm: 'Saksi mendakwa: "Ya, pelayan menyerahkan bil CHECK bercetak dan resit sebelum saya melangkah keluar."'
        }
      ]
    };

    const stageList = INTERROGATION_DB[s.id] || INTERROGATION_DB[11];
    const data = stageList[stepIdx % stageList.length];

    this._currentStepIsLie = data.isLie;
    this._currentObservedSign = data.observedSign;
    this._currentTargetSign = data.targetSign;

    const spokenStatement = isBm ? data.testimonyBm : data.testimonyEn;
    const motionDescription = isBm ? data.motionDescBm : data.motionDescEn;
    const detectiveInterrogationQuestion = isBm ? (data.questionBm || spokenStatement) : (data.questionEn || spokenStatement);

    // 1. Update Detective's dialogue speech bubble with the EXACT matching question!
    const gioTextEl = document.getElementById('gioDialogueText');
    if (gioTextEl) {
      this.typewriterText(gioTextEl, `"${detectiveInterrogationQuestion}"`);
    }

    // 2. Update Left Column: Neutral Forensic Biometric Scanner (NO SPOILER RED/GREEN OR TEXT LABELS!)
    const clueContainer = document.getElementById('clueHandImageContainer');
    const clueHeader = document.getElementById('clueHeaderTitle');
    if (clueHeader) {
      clueHeader.textContent = isBm ? "PENGIMBAS BIOMETRIK FORENSIK" : "FORENSIC BIOMETRIC SCANNER";
    }

    const captionEl = document.getElementById('clueCaptionText');
    if (captionEl) {
      captionEl.classList.add('hidden');
    }

    if (clueContainer) {
      clueContainer.innerHTML = `
        <div class="relative w-full p-3.5 sm:p-4 bg-slate-950 rounded-2xl border-2 border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.18)] text-slate-100 select-none flex flex-col gap-2.5">
          <!-- Neutral Forensic Telemetry Status Bar (NEVER SPOILS LIE/TRUTH!) -->
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 text-cyan-400">
              <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              ${isBm ? 'SENSOR TELEMETRI FORENSIK AKTIF' : 'FORENSIC TELEMETRY ACTIVE'}
            </span>
            <span class="text-[10px] font-mono font-black text-cyan-300 flex items-center gap-1">
              <span>💓</span>
              <span>PULSE: 78 BPM // REC</span>
            </span>
          </div>

          <!-- Faceless Sign Centerpiece (PURE VISUAL - NO TEXT BADGES SPOILING ANSWER!) -->
          <div class="flex flex-col items-center w-full">
            <div class="w-full flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 pb-1.5">
              <span class="flex items-center gap-1.5 text-cyan-400">
                <span>🤟</span>
                <span>${isBm ? 'RAKAMAN PERGERAKAN ISYARAT' : 'RECONSTRUCTED SIGN GESTURE'}</span>
              </span>
              <span class="text-slate-500 font-mono text-[9px] uppercase tracking-wider">SPECIMEN #${stepIdx + 1}</span>
            </div>

            <!-- FORENSIC MOTION VIDEO PLAYER (60 FPS Animated Hand Motion Demonstrations) -->
            <div id="forensicVideoViewport" class="relative w-full aspect-square max-w-[285px] sm:max-w-[305px] rounded-2xl overflow-hidden border-2 border-cyan-500/70 bg-[#060a12] shadow-[0_0_25px_rgba(6,182,212,0.3)] flex flex-col justify-between select-none">
              
              <!-- CCTV Overlay Header -->
              <div class="w-full px-3 py-1.5 bg-black/70 backdrop-blur-sm border-b border-cyan-500/30 flex items-center justify-between text-[10px] font-mono z-10">
                <div class="flex items-center gap-1.5 text-red-400 font-bold">
                  <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <span>REC • 60 FPS</span>
                </div>
                <div id="videoTimecodeDisplay" class="text-cyan-300 font-mono tracking-widest font-black">
                  00:01:24:18
                </div>
              </div>

              <!-- 60 FPS Kinetic Motion Canvas -->
              <div class="relative w-full flex-1 flex items-center justify-center overflow-hidden bg-[#0a101d]">
                <canvas id="forensicMotionCanvas" width="320" height="260" class="w-full h-full object-contain"></canvas>
              </div>

              <!-- CCTV Video Scrub Controls -->
              <div class="w-full px-2.5 py-1.5 bg-slate-950/90 backdrop-blur-sm border-t border-slate-800 flex flex-col gap-1 z-10">
                <div class="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div id="videoScrubProgress" class="h-full bg-cyan-400" style="width: 25%;"></div>
                </div>

                <div class="flex items-center justify-between text-[10px] font-mono">
                  <div class="flex items-center gap-1.5">
                    <button id="videoPlayPauseBtn" type="button" onclick="gestigoMystery.toggleMotionPlay()" class="px-2 py-0.5 rounded bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 font-bold flex items-center gap-1 cursor-pointer transition-colors">
                      <span id="videoPlayIcon">⏸️</span> <span id="videoPlayText">PAUSE</span>
                    </button>
                    <button id="videoSpeedBtn" type="button" onclick="gestigoMystery.toggleMotionSpeed()" class="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold flex items-center gap-1 cursor-pointer transition-colors">
                      <span id="videoSpeedText">0.5x SLOW</span>
                    </button>
                  </div>
                  <span class="text-slate-400 font-mono flex items-center gap-1">
                    <span>🔁</span> <span>LOOP</span>
                  </span>
                </div>
              </div>

            </div>
          </div>

          <!-- Pulsing Neutral Cyan EKG Waveform Ribbon -->
          <div class="w-full px-2 py-1 bg-slate-900/60 rounded-xl border border-slate-800">
            <svg class="w-full h-5" viewBox="0 0 300 30" preserveAspectRatio="none">
              <path d="M 0 15 L 60 15 L 70 4 L 80 26 L 90 12 L 100 20 L 110 15 L 200 15 L 210 5 L 220 25 L 230 15 L 300 15" 
                    fill="none" 
                    stroke="#06b6d4" 
                    stroke-width="2" 
                    class="animate-pulse" />
            </svg>
          </div>

          <!-- Neutral Physical Movement Observation (NEVER NAMES THE SIGN OR SPOILS ANSWER!) -->
          <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 text-xs font-mono">
            <div class="flex items-center justify-between border-b border-slate-800 pb-1">
              <span class="text-amber-400 font-bold">${isBm ? 'PANDUAN PERGERAKAN FORENSIK:' : 'FORENSIC SIGN GUIDE:'}</span>
              <span class="text-slate-400 text-[10px] font-mono">OPTICAL SENSOR</span>
            </div>
            
            <p class="text-slate-300 text-[11px] sm:text-xs leading-relaxed pt-0.5">
              ${motionDescription}
            </p>
          </div>
        </div>
      `;
      this.initForensicMotionPlayer(data.observedSign);
    }

    // 3. Update Right Column: Interrogation Action Deck (Compact, Wise Space Usage!)
    const grid = document.getElementById('signChoicesGrid');
    if (!grid) return;

    grid.innerHTML = `
      <div class="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div class="flex items-center justify-between border-b border-slate-800 pb-2">
          <span class="text-[10px] font-mono font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <span>🎙️</span>
            <span>${isBm ? 'KENYATAAN LISAN SAKSI' : 'WITNESS SPOKEN TESTIMONY'}</span>
          </span>
          <span class="text-[10px] font-mono text-cyan-400 font-semibold">
            ${isBm ? 'BANDINGKAN KATA DENGAN ISYARAT' : 'COMPARE TESTIMONY TO SIGN'}
          </span>
        </div>

        <div class="p-3.5 rounded-xl bg-slate-950/85 border border-slate-800">
          <p class="text-xs sm:text-sm text-slate-100 font-sans italic leading-relaxed">
            "${spokenStatement}"
          </p>
        </div>

        <!-- Two Prominent Detective Decisions -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button onclick="gestigoMystery.submitLieDetectorAnswer(true)" class="p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-red-950/80 to-rose-950/80 hover:from-red-900 hover:to-rose-900 border-2 border-red-500/70 hover:border-red-400 text-left transition-all cursor-pointer group shadow-[0_0_15px_rgba(239,68,68,0.2)] active:scale-[0.99]">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-base group-hover:scale-110 transition-transform">🚨</span>
              <strong class="text-xs sm:text-sm font-black text-red-300 font-mono tracking-wide uppercase">
                ${isBm ? 'PERCANGGAHAN (PENIPUAN)' : 'FLAG CONTRADICTION (LIE)'}
              </strong>
            </div>
            <p class="text-[11px] text-red-400/90 font-mono leading-snug">
              ${isBm ? 'Isyarat fizikal bercanggah dengan keterangan lisan!' : 'The physical gesture contradicts their spoken claim!'}
            </p>
          </button>

          <button onclick="gestigoMystery.submitLieDetectorAnswer(false)" class="p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 hover:from-emerald-900 hover:to-teal-900 border-2 border-emerald-500/70 hover:border-emerald-400 text-left transition-all cursor-pointer group shadow-[0_0_15px_rgba(160,185,129,0.2)] active:scale-[0.99]">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-base group-hover:scale-110 transition-transform">✅</span>
              <strong class="text-xs sm:text-sm font-black text-emerald-300 font-mono tracking-wide uppercase">
                ${isBm ? 'PENGESAHAN (KEBENARAN)' : 'VERIFY AS TRUTH'}
              </strong>
            </div>
            <p class="text-[11px] text-emerald-400/90 font-mono leading-snug">
              ${isBm ? 'Bentuk isyarat mengesahkan kata-kata saksi secara tepat.' : 'The physical gesture accurately confirms their words.'}
            </p>
          </button>
        </div>
      </div>
    `;
  }

  submitLieDetectorAnswer(userFlaggedAsLie) {
    const isCorrect = (userFlaggedAsLie === this._currentStepIsLie);
    const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');
    const signName = this._currentObservedSign || 'SIGN';

    if (isCorrect) {
      const msg = this._currentStepIsLie
        ? (isBm 
            ? `🚨 PERCANGGAHAN DIKESAN! Deduksi tajam: Kenyataan saksi bercanggah dengan isyarat fizikal '${signName}'!` 
            : `🚨 CONTRADICTION FLAGGED! Sharp deduction: The witness testimony directly contradicted their physical sign '${signName}'!`)
        : (isBm 
            ? `✅ KEBENARAN DISAHKAN! Tepat sekali: Keterangan saksi sepadan dengan isyarat fizikal '${signName}'.` 
            : `✅ TESTIMONY VERIFIED! Accurate deduction: Witness statement matches their physical sign '${signName}'.`);
      this.handleLevel2Success(msg);
    } else {
      const errMsg = this._currentStepIsLie
        ? (isBm 
            ? `❌ Kenyataan itu palsu! Isyarat fizikal '${signName}' bercanggah dengan apa yang didakwa saksi.` 
            : `❌ That testimony was deceptive! The observed sign '${signName}' contradicts what the witness claimed.`)
        : (isBm 
            ? `❌ Saksi sebenarnya bercakap benar di sini! Isyarat fizikal '${signName}' menyokong kenyataannya.` 
            : `❌ The witness was actually truthful here! Their physical sign '${signName}' confirms their statement.`);
      this.handleLevel2Error(errMsg);
    }
  }

    // --------------------------------------------------------------------------
  // UNIFIED MECHANIC: FORENSIC MOTION VIDEO PLAYER (Stages 14 through 20)
  // 60 FPS Faceless Mannequin Looping Real-Time ASL Signs + 4 Deductive Choices
  // ZERO SPOILERS: No pre-revealed text in prompts or hints!
  // --------------------------------------------------------------------------
  renderForensicMotionQuestion(step) {
    const s = this.currentStage;
    const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');
    const stepIdx = this.currentStepIdx || 0;
    const targetSign = (step.targetSign || 'MONEY').toUpperCase().trim();

    // 1. Detective Interrogation / Prompt in Dialogue Bubble
    const promptText = isBm ? (step.promptBm || step.prompt) : step.prompt;
    const gioTextEl = document.getElementById('gioDialogueText');
    if (gioTextEl) {
      this.typewriterText(gioTextEl, `"${promptText}"`);
    }

    // 2. Left Column: 60 FPS Forensic Motion Video Player
    const clueHeader = document.getElementById('clueHeaderTitle');
    if (clueHeader) {
      clueHeader.textContent = isBm ? "REKONSTRUKSI PERGERAKAN FORENSIK" : "FORENSIC MOTION RECONSTRUCTION";
    }

    const captionEl = document.getElementById('clueCaptionText');
    if (captionEl) {
      captionEl.classList.add('hidden');
    }

    const clueContainer = document.getElementById('clueHandImageContainer');
    if (clueContainer) {
      // Kinematic description (neutral, purely physical movement)
      let motionHint = isBm ? (step.hintBm || step.hint) : step.hint;
      if (!motionHint) {
        motionHint = isBm ? "Perhatikan kedudukan jari, tapak tangan, dan arah pergerakan dalam video." : "Carefully observe hand positions, palm orientations, and movement vectors in the video playback.";
      }

      clueContainer.innerHTML = `
        <div class="relative w-full p-3.5 sm:p-4 bg-slate-950 rounded-2xl border-2 border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.18)] text-slate-100 select-none flex flex-col gap-2.5">
          <!-- CCTV Recording Telemetry Bar -->
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <span class="text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 text-cyan-400">
              <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              ${isBm ? 'KAMERA PENGAWASAN FORENSIK' : 'SURVEILLANCE FORENSIC CAM'}
            </span>
            <span class="text-[10px] font-mono font-black text-cyan-300 flex items-center gap-1">
              <span>📹</span>
              <span>CCTV #42 // PLAYBACK</span>
            </span>
          </div>

          <!-- Video Viewport Centerpiece -->
          <div class="flex flex-col items-center w-full">
            <div class="w-full flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 pb-1.5">
              <span class="flex items-center gap-1.5 text-cyan-400">
                <span>🤟</span>
                <span>${isBm ? 'RAKAMAN PERGERAKAN ISYARAT' : 'RECONSTRUCTED SIGN GESTURE'}</span>
              </span>
              <span class="text-slate-500 font-mono text-[9px] uppercase tracking-wider">SPECIMEN #${stepIdx + 1}</span>
            </div>

            <!-- FORENSIC MOTION VIDEO PLAYER (60 FPS Animated Hand Motion Demonstrations) -->
            <div id="forensicVideoViewport" class="relative w-full aspect-square max-w-[285px] sm:max-w-[305px] rounded-2xl overflow-hidden border-2 border-cyan-500/70 bg-[#060a12] shadow-[0_0_25px_rgba(6,182,212,0.3)] flex flex-col justify-between select-none">
              
              <!-- CCTV Overlay Header -->
              <div class="w-full px-3 py-1.5 bg-black/70 backdrop-blur-sm border-b border-cyan-500/30 flex items-center justify-between text-[10px] font-mono z-10">
                <div class="flex items-center gap-1.5 text-red-400 font-bold">
                  <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <span>REC • 60 FPS</span>
                </div>
                <div id="videoTimecodeDisplay" class="text-cyan-300 font-mono tracking-widest font-black">
                  00:01:24:18
                </div>
              </div>

              <!-- 60 FPS Kinetic Motion Canvas -->
              <div class="relative w-full flex-1 flex items-center justify-center overflow-hidden bg-[#0a101d]">
                <canvas id="forensicMotionCanvas" width="320" height="260" class="w-full h-full object-contain"></canvas>
              </div>

              <!-- CCTV Video Scrub Controls -->
              <div class="w-full px-2.5 py-1.5 bg-slate-950/90 backdrop-blur-sm border-t border-slate-800 flex flex-col gap-1 z-10">
                <div class="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div id="videoScrubProgress" class="h-full bg-cyan-400" style="width: 25%;"></div>
                </div>

                <div class="flex items-center justify-between text-[10px] font-mono">
                  <div class="flex items-center gap-1.5">
                    <button id="videoPlayPauseBtn" type="button" onclick="gestigoMystery.toggleMotionPlay()" class="px-2 py-0.5 rounded bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 font-bold flex items-center gap-1 cursor-pointer transition-colors">
                      <span id="videoPlayIcon">⏸️</span> <span id="videoPlayText">PAUSE</span>
                    </button>
                    <button id="videoSpeedBtn" type="button" onclick="gestigoMystery.toggleMotionSpeed()" class="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold flex items-center gap-1 cursor-pointer transition-colors">
                      <span id="videoSpeedText">0.5x SLOW</span>
                    </button>
                  </div>
                  <span class="text-slate-400 font-mono flex items-center gap-1">
                    <span>🔁</span> <span>LOOP</span>
                  </span>
                </div>
              </div>

            </div>
          </div>

          <!-- Pulsing EKG Waveform Ribbon -->
          <div class="w-full px-2 py-1 bg-slate-900/60 rounded-xl border border-slate-800">
            <svg class="w-full h-5" viewBox="0 0 300 30" preserveAspectRatio="none">
              <path d="M 0 15 L 60 15 L 70 4 L 80 26 L 90 12 L 100 20 L 110 15 L 200 15 L 210 5 L 220 25 L 230 15 L 300 15" 
                    fill="none" 
                    stroke="#06b6d4" 
                    stroke-width="2" 
                    class="animate-pulse" />
            </svg>
          </div>

          <!-- Neutral Kinematic Movement Observation -->
          <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 text-xs font-mono">
            <div class="flex items-center justify-between border-b border-slate-800 pb-1">
              <span class="text-amber-400 font-bold">${isBm ? 'PANDUAN PERGERAKAN FORENSIK:' : 'FORENSIC SIGN GUIDE:'}</span>
              <span class="text-slate-400 text-[10px] font-mono">OPTICAL SENSOR</span>
            </div>
            
            <p class="text-slate-300 text-[11px] sm:text-xs leading-relaxed pt-0.5">
              ${motionHint}
            </p>
          </div>
        </div>
      `;
      this.initForensicMotionPlayer(targetSign);
    }

    // 3. Right Column: 4 Multiple-Choice Deductive Cards (Zero Pre-Revealed Spoilers!)
    const choicesHeader = document.getElementById('choicesHeaderLabel');
    if (choicesHeader) {
      choicesHeader.textContent = isBm ? "DEDUKSI ISYARAT DARI RAKAMAN VIDEO:" : "DEDUCE OBSERVED SIGN FROM VIDEO:";
    }

    const grid = document.getElementById('signChoicesGrid');
    if (!grid) return;
    grid.className = "grid grid-cols-1 sm:grid-cols-2 gap-3 w-full";
    grid.innerHTML = '';

    // Determine 4 distinct options (target + 3 coherent decoys)
    const FORENSIC_DECOY_MAP = {
      'MONEY': ['BUY', 'PAY', 'COST'],
      'BUY': ['MONEY', 'SELL', 'TAKE'],
      'EXPENSIVE': ['CHEAP', 'MONEY', 'VALUABLE'],
      'SMALL': ['BIG', 'SHORT', 'TINY'],
      'MUSIC': ['RUN', 'PLAY', 'DANCE'],
      'RUN': ['WALK', 'STOP', 'FAST'],
      'PLAY': ['WIN', 'GAME', 'LOSE'],
      'WIN': ['LOSE', 'PLAY', 'FIRST'],
      'CLASS': ['TEACHER', 'STUDENT', 'SCHOOL'],
      'TEACHER': ['STUDENT', 'PROFESSOR', 'DOCTOR'],
      'STUDENT': ['TEACHER', 'CLASS', 'CHILD'],
      'STUDY': ['READ', 'BOOK', 'WRITE'],
      'WORK': ['BOSS', 'OFFICE', 'REST'],
      'COMPUTER': ['PHONE', 'TYPE', 'SCREEN'],
      'BOSS': ['WORK', 'LEADER', 'MANAGER'],
      'ORDER': ['COMMAND', 'PAY', 'RULE'],
      'RAIN': ['SNOW', 'WATER', 'STORM'],
      'COLD': ['HOT', 'WIND', 'FREEZE'],
      'SUN': ['MOON', 'WARM', 'LIGHT'],
      'WIND': ['COLD', 'AIR', 'RAIN'],
      'PARK': ['GARDEN', 'TREE', 'PLAY'],
      'STORE': ['SHOP', 'BUY', 'MARKET'],
      'LIBRARY': ['BOOK', 'READ', 'SCHOOL'],
      'BANK': ['MONEY', 'VAULT', 'SAFE'],
      'HELP': ['SAVE', 'ASSIST', 'PLEASE'],
      'TIME': ['CLOCK', 'NOW', 'HOUR'],
      'TRUE': ['LIE', 'CORRECT', 'YES'],
      'FINISH': ['STOP', 'DONE', 'END']
    };

    let rawOptions = step.options;
    if (!rawOptions || rawOptions.length < 4) {
      const decoys = FORENSIC_DECOY_MAP[targetSign] || ['READ', 'BOOK', 'WRITE'];
      rawOptions = [targetSign, ...decoys.slice(0, 3)];
    }

    // Deterministic shuffle
    const shuffled = [...rawOptions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = (stepIdx * 7 + i * 3) % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const letters = ['A', 'B', 'C', 'D'];
    shuffled.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 hover:from-cyan-950/40 hover:to-slate-900 border-2 border-slate-700/80 hover:border-cyan-400 text-left transition-all cursor-pointer group shadow-lg flex items-center justify-between active:scale-[0.98] select-none';
      btn.onclick = () => this.submitForensicChoice(opt, targetSign, btn);

      btn.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="w-8 h-8 rounded-xl bg-slate-800 group-hover:bg-cyan-500/20 border border-slate-600 group-hover:border-cyan-400 text-slate-300 group-hover:text-cyan-300 font-mono font-black text-sm flex items-center justify-center transition-colors">
            ${letters[idx] || (idx + 1)}
          </span>
          <div class="flex flex-col">
            <span class="text-sm sm:text-base font-black font-mono tracking-wider text-slate-100 group-hover:text-cyan-200 uppercase">
              ${opt}
            </span>
            <span class="text-[10px] font-mono text-slate-400">
              ${isBm ? 'Pilihan Isyarat Forensik' : 'Forensic Sign Option'}
            </span>
          </div>
        </div>
        <span class="text-xs font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </span>
      `;

      grid.appendChild(btn);
    });
  }

  submitForensicChoice(chosenSign, targetSign, btnElement) {
    if (this._isAnswering) return;
    const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');
    const isCorrect = (chosenSign.toUpperCase().trim() === targetSign.toUpperCase().trim());

    if (isCorrect) {
      if (btnElement) {
        btnElement.classList.remove('border-slate-700/80');
        btnElement.classList.add('border-emerald-400', 'bg-emerald-950/80', 'shadow-[0_0_20px_rgba(16,185,129,0.5)]');
      }
      this.handleLevel2Success(
        isBm ? `✨ DEDUKSI TEPAT! Pergerakan video mengesahkan isyarat '${chosenSign}'!` 
             : `✨ ACCURATE DEDUCTION! The video motion confirms the sign '${chosenSign}'!`
      );
    } else {
      if (btnElement) {
        btnElement.classList.add('border-red-500', 'bg-red-950/60', 'animate-shake');
        setTimeout(() => btnElement.classList.remove('animate-shake'), 450);
      }
      this.handleLevel2Error(
        isBm ? `🤔 Bukan isyarat '${chosenSign}'. Perhatikan arah pergerakan tangan dalam video!` 
             : `🤔 '${chosenSign}' is incorrect. Watch the hand motion vectors in the video playback!`
      );
    }
  }

  // ==================== FORENSIC MOTION VIDEO / ANIMATED HANDS PLAYER ====================
  toggleMotionPlay() {
    this._motionPlaying = !this._motionPlaying;
    const icon = document.getElementById('videoPlayIcon');
    const text = document.getElementById('videoPlayText');
    if (icon) icon.textContent = this._motionPlaying ? '❚❚' : '▶';
    if (text) text.textContent = this._motionPlaying ? 'PAUSE' : 'PLAY';
  }

  toggleMotionSpeed() {
    this._motionSpeed = (this._motionSpeed === 1.0) ? 0.5 : 1.0;
    const text = document.getElementById('videoSpeedText');
    if (text) text.textContent = (this._motionSpeed === 0.5) ? '1.0x NORMAL' : '0.5x SLOW';
  }

  initForensicMotionPlayer(signName) {
    if (this._motionAnimId) {
      cancelAnimationFrame(this._motionAnimId);
      this._motionAnimId = null;
    }

    this._motionPlaying = true;
    this._motionSpeed = 1.0;
    this._motionTime = 0;
    this._activeSignName = (signName || 'ANGRY').toUpperCase();

    const canvas = document.getElementById('forensicMotionCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let lastTimestamp = performance.now();

    const loop = (timestamp) => {
      const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      if (this._motionPlaying) {
        this._motionTime += dt * this._motionSpeed;
      }

      this.renderMotionFrame(ctx, canvas.width, canvas.height, this._activeSignName, this._motionTime);

      // Update Timecode Display & Scrub Bar
      const totalSec = this._motionTime;
      const mm = String(Math.floor(totalSec / 60) % 60).padStart(2, '0');
      const ss = String(Math.floor(totalSec) % 60).padStart(2, '0');
      const ff = String(Math.floor((totalSec * 60) % 60)).padStart(2, '0');
      const timecodeEl = document.getElementById('videoTimecodeDisplay');
      if (timecodeEl) {
        timecodeEl.textContent = `00:${mm}:${ss}:${ff}`;
      }

      const loopCycle = 2.0; // 2 seconds per gesture loop
      const cycleProgress = (this._motionTime % loopCycle) / loopCycle;
      const scrubEl = document.getElementById('videoScrubProgress');
      if (scrubEl) {
        scrubEl.style.width = `${Math.round(cycleProgress * 100)}%`;
      }

      this._motionAnimId = requestAnimationFrame(loop);
    };

    this._motionAnimId = requestAnimationFrame(loop);
  }

  // Renders the articulated faceless humanoid and animated moving hands at 60 FPS
  renderMotionFrame(ctx, W, H, sign, time) {
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2; // 160
    const cy = H / 2; // 130
    const t = (time % 2.0) / 2.0; // 0.0 to 1.0

    // 1. Subtle Forensic Grid and Radar Rings in Background
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, 130, 95, 0, Math.PI * 2);
    ctx.arc(cx, 130, 65, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
    ctx.beginPath();
    ctx.moveTo(cx - 100, 130); ctx.lineTo(cx + 100, 130);
    ctx.moveTo(cx, 35); ctx.lineTo(cx, 225);
    ctx.stroke();

    // 2. Faceless Cyber Mannequin Torso
    // Neck
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(cx - 12, 85, 24, 30, 6) : ctx.fillRect(cx - 12, 85, 24, 30);
    ctx.fill();

    // Torso Body
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 65, 115); // Left Shoulder
    ctx.quadraticCurveTo(cx, 110, cx + 65, 115); // Right Shoulder
    ctx.lineTo(cx + 45, 235); // Right Waist
    ctx.lineTo(cx - 45, 235); // Left Waist
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Collar detail
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 20, 112);
    ctx.lineTo(cx, 126);
    ctx.lineTo(cx + 20, 112);
    ctx.stroke();

    // Faceless Head (Stylized oval with cyan scanner reticle)
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(cx, 55, 26, 34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Cyber visor line on head
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, 52, 20, 7, 0, 0, Math.PI);
    ctx.stroke();

    // 3. Render Articulated Motion Hands based on active Sign
    ctx.save();
    switch (sign) {
      case 'ANGRY':
        this.drawMotionAngry(ctx, cx, cy, t);
        break;
      case 'HAPPY':
        this.drawMotionHappy(ctx, cx, cy, t);
        break;
      case 'SAD':
        this.drawMotionSad(ctx, cx, cy, t);
        break;
      case 'TIRED':
        this.drawMotionTired(ctx, cx, cy, t);
        break;
      case 'PAIN':
        this.drawMotionPain(ctx, cx, cy, t);
        break;
      case 'HEAD':
        this.drawMotionHead(ctx, cx, cy, t);
        break;
      case 'DOCTOR':
        this.drawMotionDoctor(ctx, cx, cy, t);
        break;
      case 'HOSPITAL':
        this.drawMotionHospital(ctx, cx, cy, t);
        break;
      case 'MENU':
        this.drawMotionMenu(ctx, cx, cy, t);
        break;
      case 'WATER':
        this.drawMotionWater(ctx, cx, cy, t);
        break;
      case 'PAY':
        this.drawMotionPay(ctx, cx, cy, t);
        break;
      case 'CHECK':
        this.drawMotionCheck(ctx, cx, cy, t);
        break;
      case 'MONEY':
        this.drawMotionMoney(ctx, cx, cy, t);
        break;
      case 'BUY':
        this.drawMotionBuy(ctx, cx, cy, t);
        break;
      case 'EXPENSIVE':
        this.drawMotionExpensive(ctx, cx, cy, t);
        break;
      case 'SMALL':
        this.drawMotionSmall(ctx, cx, cy, t);
        break;
      case 'MUSIC':
        this.drawMotionMusic(ctx, cx, cy, t);
        break;
      case 'RUN':
        this.drawMotionRun(ctx, cx, cy, t);
        break;
      case 'PLAY':
        this.drawMotionPlay(ctx, cx, cy, t);
        break;
      case 'WIN':
        this.drawMotionWin(ctx, cx, cy, t);
        break;
      case 'CLASS':
        this.drawMotionClass(ctx, cx, cy, t);
        break;
      case 'TEACHER':
        this.drawMotionTeacher(ctx, cx, cy, t);
        break;
      case 'STUDENT':
        this.drawMotionStudent(ctx, cx, cy, t);
        break;
      case 'STUDY':
        this.drawMotionStudy(ctx, cx, cy, t);
        break;
      case 'WORK':
        this.drawMotionWork(ctx, cx, cy, t);
        break;
      case 'COMPUTER':
        this.drawMotionComputer(ctx, cx, cy, t);
        break;
      case 'BOSS':
        this.drawMotionBoss(ctx, cx, cy, t);
        break;
      case 'ORDER':
        this.drawMotionOrder(ctx, cx, cy, t);
        break;
      case 'RAIN':
        this.drawMotionRain(ctx, cx, cy, t);
        break;
      case 'COLD':
        this.drawMotionCold(ctx, cx, cy, t);
        break;
      case 'SUN':
        this.drawMotionSun(ctx, cx, cy, t);
        break;
      case 'WIND':
        this.drawMotionWind(ctx, cx, cy, t);
        break;
      case 'PARK':
        this.drawMotionPark(ctx, cx, cy, t);
        break;
      case 'STORE':
        this.drawMotionStore(ctx, cx, cy, t);
        break;
      case 'LIBRARY':
        this.drawMotionLibrary(ctx, cx, cy, t);
        break;
      case 'BANK':
        this.drawMotionBank(ctx, cx, cy, t);
        break;
      case 'HELP':
        this.drawMotionHelp(ctx, cx, cy, t);
        break;
      case 'TIME':
        this.drawMotionTime(ctx, cx, cy, t);
        break;
      case 'TRUE':
        this.drawMotionTrue(ctx, cx, cy, t);
        break;
      case 'FINISH':
        this.drawMotionFinish(ctx, cx, cy, t);
        break;
      default:
        this.drawMotionGeneric(ctx, cx, cy, t, sign);
    }
    ctx.restore();
  }

  // --- Hand Drawing Helpers ---
  drawArticulatedArm(ctx, sx, sy, ex, ey, wx, wy) {
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.lineTo(wx, wy);
    ctx.stroke();

    // Arm cyber contour
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // 1. ANGRY: Claw-5 hands pull sharply backward from chest with tension
  drawMotionAngry(ctx, cx, cy, t) {
    // Sharp pull outward & vibrate
    let pull = 0;
    let shake = 0;
    if (t < 0.25) {
      pull = t / 0.25;
    } else if (t < 0.7) {
      pull = 1.0;
      shake = (Math.sin(t * Math.PI * 30)) * 2;
    } else {
      pull = 1.0 - (t - 0.7) / 0.3;
    }

    const lx = (cx - 25) - pull * 38 + shake;
    const rx = (cx + 25) + pull * 38 - shake;
    const y = 165 - pull * 18;

    // Arms
    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 75, 175, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 75, 175, rx, y);

    // Claw Hands
    this.drawClawHand(ctx, lx, y, -1, pull);
    this.drawClawHand(ctx, rx, y, 1, pull);

    // Cyan outward motion arrows
    if (pull > 0.2) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx - 35, 170, 30, Math.PI * 0.8, Math.PI * 1.3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + 35, 170, 30, Math.PI * 1.7, Math.PI * 0.2);
      ctx.stroke();
    }
  }

  drawClawHand(ctx, x, y, dir, tension) {
    ctx.fillStyle = '#38bdf8';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;

    // Palm base
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 4 Arched Claw fingers
    for (let i = -1.5; i <= 1.5; i += 1) {
      const fx = x + dir * (i * 5 + 4);
      const fy = y - 8 - Math.abs(i) * 2;
      ctx.beginPath();
      ctx.moveTo(x + dir * (i * 4), y - 6);
      ctx.quadraticCurveTo(fx + dir * (4 + tension * 4), fy - 6, fx, fy - 12);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  }

  // 2. HAPPY: Upward buoyant brushing arcs across chest (repeats twice)
  drawMotionHappy(ctx, cx, cy, t) {
    const cycle = (t * 2) % 1.0;
    const lift = Math.sin(cycle * Math.PI);

    const lx = cx - 35 + lift * 8;
    const rx = cx + 35 - lift * 8;
    const y = 185 - lift * 45;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 70, 185, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 70, 185, rx, y);

    this.drawOpenFlatHand(ctx, lx, y, -0.2);
    this.drawOpenFlatHand(ctx, rx, y, 0.2);

    // Glowing upward trails
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.7)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(lx, y + 25);
    ctx.quadraticCurveTo(lx - 10, y + 10, lx, y);
    ctx.moveTo(rx, y + 25);
    ctx.quadraticCurveTo(rx + 10, y + 10, rx, y);
    ctx.stroke();
  }

  drawOpenFlatHand(ctx, x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = '#34d399';
    // Flat hand palm
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(-8, -14, 16, 20, 4) : ctx.fillRect(-8, -14, 16, 20);
    ctx.fill();
    // Fingers
    for (let i = -6; i <= 6; i += 4) {
      ctx.beginPath();
      ctx.moveTo(i, -14);
      ctx.lineTo(i, -24);
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    ctx.restore();
  }

  // 3. SAD: Both flat hands slide limply downward in melancholy arc
  drawMotionSad(ctx, cx, cy, t) {
    const drop = Math.min(1.0, t * 1.4);
    const y = 130 + drop * 75;

    const lx = cx - 30;
    const rx = cx + 30;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 170, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 170, rx, y);

    this.drawDroopingHand(ctx, lx, y, -1);
    this.drawDroopingHand(ctx, rx, y, 1);

    // Blue downward flow trails
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lx, y - 20); ctx.lineTo(lx, y);
    ctx.moveTo(rx, y - 20); ctx.lineTo(rx, y);
    ctx.stroke();
  }

  drawDroopingHand(ctx, x, y, dir) {
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
    // Limp drooping fingers
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(x + (i - 1.5) * 4, y);
      ctx.lineTo(x + (i - 1.5) * 4 + dir * 2, y + 14);
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  }

  // 4. TIRED: Fingertips on chest roll outward and slump heavily
  drawMotionTired(ctx, cx, cy, t) {
    const slump = Math.min(1.0, t * 1.3);
    const y = 135 + slump * 65;

    const lx = cx - 25 - slump * 12;
    const rx = cx + 25 + slump * 12;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 70, 170, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 70, 170, rx, y);

    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(lx, y, 8, 0, Math.PI * 2);
    ctx.arc(rx, y, 8, 0, Math.PI * 2);
    ctx.fill();

    // Curved downward arc lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(lx, y - 10, 16, 0, Math.PI * 0.7);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(rx, y - 10, 16, Math.PI * 0.3, Math.PI);
    ctx.stroke();
  }

  // 5. PAIN: Index fingers point at each other and twist inward with pain pulses
  drawMotionPain(ctx, cx, cy, t) {
    const jab = Math.abs(Math.sin(t * Math.PI * 5));
    const lx = cx - 45 + jab * 20;
    const rx = cx + 45 - jab * 20;
    const y = 160;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 175, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 75, 175, rx, y);

    // Left Pointing Hand
    this.drawPointingFinger(ctx, lx, y, 1);
    // Right Pointing Hand
    this.drawPointingFinger(ctx, rx, y, -1);

    // Concentric Pain Ripple in center
    const rippleRadius = 8 + jab * 22;
    ctx.strokeStyle = `rgba(244, 63, 94, ${0.9 - jab * 0.6})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, y, rippleRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(cx, y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  drawPointingFinger(ctx, x, y, dir) {
    ctx.fillStyle = '#38bdf8';
    // Fist base
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
    // Extended index finger
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + dir * 20, y);
    ctx.stroke();
  }

  // 6. HEAD: Index finger reaches up and taps temple with radar rings
  drawMotionHead(ctx, cx, cy, t) {
    const tap = Math.sin(t * Math.PI * 4) > 0 ? 0 : -8;
    const rx = cx + 34 + tap;
    const ry = 58;

    // Left arm relaxed
    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 70, 180, cx - 50, 215);
    // Right arm reaching to temple
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 80, 110, rx, ry);

    this.drawPointingFinger(ctx, rx, ry, -1);

    // Sonar radar rings from temple
    const ringR = 8 + ((t * 4) % 1.0) * 20;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(cx + 26, 58, ringR, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 7. DOCTOR: Right fingers tap twice on left wrist pulse with EKG waves
  drawMotionDoctor(ctx, cx, cy, t) {
    const wx = cx - 20;
    const wy = 175;

    // Left arm held horizontally
    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 55, 175, wx, wy);
    // Left open palm
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(wx, wy, 8, 0, Math.PI * 2);
    ctx.fill();

    // Right arm tapping wrist
    const tap = Math.sin(t * Math.PI * 4) > 0.2 ? -10 : 0;
    const rx = wx + 15 + tap * 0.5;
    const ry = wy - 15 + tap;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 50, 150, rx, ry);

    // Two fingers extended tapping
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(rx, ry);
    ctx.lineTo(wx, wy);
    ctx.stroke();

    // Mini EKG Waveform over wrist
    if (tap === 0) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(wx - 25, wy - 20);
      ctx.lineTo(wx - 10, wy - 20);
      ctx.lineTo(wx - 5, wy - 32);
      ctx.lineTo(wx, wy - 12);
      ctx.lineTo(wx + 5, wy - 20);
      ctx.lineTo(wx + 25, wy - 20);
      ctx.stroke();
    }
  }

  // 8. HOSPITAL: H-handshape draws a medical cross on the upper left arm
  drawMotionHospital(ctx, cx, cy, t) {
    const armX = cx - 45;
    const armY = 135;

    // Left arm
    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 175, cx - 45, 210);

    // Right hand drawing
    let rx = armX;
    let ry = armY;
    if (t < 0.45) {
      // Stroke 1: Vertical down
      const p = t / 0.45;
      rx = armX;
      ry = (armY - 18) + p * 36;
    } else {
      // Stroke 2: Horizontal across
      const p = (t - 0.45) / 0.45;
      rx = (armX - 18) + p * 36;
      ry = armY;
    }

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 40, 150, rx, ry);
    this.drawPointingFinger(ctx, rx, ry, -1);

    // Persistent Glowing Medical Cross on left arm
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(armX, armY - 16); ctx.lineTo(armX, armY + 16);
    ctx.moveTo(armX - 16, armY); ctx.lineTo(armX + 16, armY);
    ctx.stroke();
  }

  // 9. MENU: Both hands start closed together like book, then pivot open
  drawMotionMenu(ctx, cx, cy, t) {
    const open = Math.sin(t * Math.PI);
    const lx = cx - 12 - open * 35;
    const rx = cx + 12 + open * 35;
    const y = 175;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 180, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 180, rx, y);

    this.drawOpenFlatHand(ctx, lx, y, -open * 0.5);
    this.drawOpenFlatHand(ctx, rx, y, open * 0.5);

    // Glowing page-turn arcs
    if (open > 0.2) {
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx - 20, y, 25, Math.PI * 0.8, Math.PI * 1.2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + 20, y, 25, Math.PI * 1.8, Math.PI * 0.2);
      ctx.stroke();
    }
  }

  // 10. WATER: 'W' handshape taps center of chin twice with droplet ripples
  drawMotionWater(ctx, cx, cy, t) {
    const tap = Math.sin(t * Math.PI * 4) > 0 ? 0 : -8;
    const chinX = cx + tap;
    const chinY = 90;

    // Left arm down
    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 70, 180, cx - 50, 215);
    // Right arm to chin
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 60, 130, chinX + 10, chinY + 15);

    // 3 upright fingers for W
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(chinX + 10, chinY + 15);
      ctx.lineTo(chinX + i * 5, chinY - 8);
      ctx.stroke();
    }

    // Water droplet ripples from chin
    const ripR = 6 + ((t * 4) % 1.0) * 18;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(cx, 90, ripR, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 11. PAY: Right index finger glides briskly forward off left palm
  drawMotionPay(ctx, cx, cy, t) {
    const lx = cx - 25;
    const ly = 185;

    // Left hand tray
    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 180, lx, ly);
    this.drawOpenFlatHand(ctx, lx, ly, Math.PI / 2);

    // Right hand sliding forward
    const slide = Math.min(1.0, t * 1.4);
    const rx = lx + 10 + slide * 45;
    const ry = ly - 5 - slide * 10;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 165, rx, ry);
    this.drawPointingFinger(ctx, rx, ry, 1);

    // Motion arrow gliding across
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(lx, ly - 10);
    ctx.lineTo(rx, ry - 10);
    ctx.stroke();
  }

  // 12. CHECK: Index & thumb pinch and pull apart tracing a bill receipt
  drawMotionCheck(ctx, cx, cy, t) {
    const pull = Math.sin(t * Math.PI);
    const lx = cx - 15 - pull * 35;
    const rx = cx + 15 + pull * 35;
    const y = 160;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 175, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 175, rx, y);

    this.drawPointingFinger(ctx, lx, y, -1);
    this.drawPointingFinger(ctx, rx, y, 1);

    // Luminous bill rectangle trace
    if (pull > 0.15) {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(lx, y - 18, rx - lx, 36);
      ctx.setLineDash([]);
    }
  }

  // ==========================================================================
  // COMPLETE SUITE OF 28 FORENSIC MOTION KINEMATIC DRAWERS (Stages 14–20)
  // 60 FPS Faceless Articulated Anatomy with Luminous Vector Physics
  // ==========================================================================

  // 13. MONEY: Right flat-O taps open left palm repeatedly
  drawMotionMoney(ctx, cx, cy, t) {
    const lx = cx - 22;
    const ly = 185;
    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 175, lx, ly);
    this.drawOpenFlatHand(ctx, lx, ly, Math.PI / 2);

    const tap = Math.abs(Math.sin(t * Math.PI * 4));
    const rx = lx + 8;
    const ry = 150 + tap * 32;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 160, rx, ry);
    this.drawCurvedClawHand(ctx, rx, ry, 1);

    // Downward pulsing tap arrows & coin ripples
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(rx, ry - 14);
    ctx.lineTo(rx, ry + 12);
    ctx.stroke();

    if (tap > 0.8) {
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.8)';
      ctx.beginPath();
      ctx.arc(lx, ly, 18, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // 14. BUY: Flat hand delivering cash forward from open palm
  drawMotionBuy(ctx, cx, cy, t) {
    const lx = cx - 24;
    const ly = 185;
    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 175, lx, ly);
    this.drawOpenFlatHand(ctx, lx, ly, Math.PI / 2);

    const fwd = Math.min(1.0, t * 1.5);
    const rx = lx + 12 + fwd * 45;
    const ry = ly - 5 - fwd * 12;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 160, rx, ry);
    this.drawOpenFlatHand(ctx, rx, ry, 0);

    // Dynamic sweeping arrow forward
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(lx + 10, ly - 8);
    ctx.lineTo(rx, ry - 8);
    ctx.stroke();
  }

  // 15. EXPENSIVE: Money sign tossed upward with burst of fingers
  drawMotionExpensive(ctx, cx, cy, t) {
    const burst = Math.sin(t * Math.PI);
    const rx = cx + 18 + burst * 48;
    const ry = 180 - burst * 60;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 160, rx, ry);
    this.drawOpenFlatHand(ctx, rx, ry, burst * 0.5);

    // Sparkling currency bursts
    if (burst > 0.3) {
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
        ctx.beginPath();
        ctx.moveTo(rx + Math.cos(a) * 8, ry + Math.sin(a) * 8);
        ctx.lineTo(rx + Math.cos(a) * 22, ry + Math.sin(a) * 22);
        ctx.stroke();
      }
    }
  }

  // 16. SMALL: Both flat vertical hands facing with narrow gap
  drawMotionSmall(ctx, cx, cy, t) {
    const squeeze = Math.abs(Math.sin(t * Math.PI * 3));
    const gap = 12 + squeeze * 16;
    const lx = cx - gap;
    const rx = cx + gap;
    const y = 175;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 175, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 175, rx, y);

    this.drawOpenFlatHand(ctx, lx, y, Math.PI / 2);
    this.drawOpenFlatHand(ctx, rx, y, -Math.PI / 2);

    // Inward compression arrows
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lx - 12, y); ctx.lineTo(lx - 2, y);
    ctx.moveTo(rx + 12, y); ctx.lineTo(rx + 2, y);
    ctx.stroke();
  }

  // 17. MUSIC: Left forearm as violin, right hand conducting back and forth
  drawMotionMusic(ctx, cx, cy, t) {
    const wave = Math.sin(t * Math.PI * 4) * 36;
    const lx = cx - 25;
    const ly = 180;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 40, 175, lx + 30, ly);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 50, 150, cx + wave, 155);
    this.drawOpenFlatHand(ctx, cx + wave, 155, wave * 0.015);

    // Musical note ripples
    ctx.fillStyle = '#a855f7';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('♪', cx - 20, 135);
    ctx.fillText('♫', cx + 30, 125);
  }

  // 18. RUN: Both hands pumping forward and backward in sprint
  drawMotionRun(ctx, cx, cy, t) {
    const pump = Math.sin(t * Math.PI * 5) * 30;
    const ly = 170 + pump;
    const ry = 170 - pump;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 70, 160, cx - 25, ly);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 70, 160, cx + 25, ry);

    this.drawPointingFinger(ctx, cx - 25, ly, 1);
    this.drawPointingFinger(ctx, cx + 25, ry, 1);

    // Speed trails
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 35, ly); ctx.lineTo(cx - 55, ly);
    ctx.moveTo(cx + 35, ry); ctx.lineTo(cx + 55, ry);
    ctx.stroke();
  }

  // 19. PLAY: Both Y-hands shaking side-to-side playfully
  drawMotionPlay(ctx, cx, cy, t) {
    const shake = Math.sin(t * Math.PI * 6) * 16;
    const lx = cx - 35 + shake;
    const rx = cx + 35 + shake;
    const y = 170;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 75, 165, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 75, 165, rx, y);

    this.drawCurvedClawHand(ctx, lx, y, -1);
    this.drawCurvedClawHand(ctx, rx, y, 1);

    // Playful rotation brackets
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(lx, y, 18, -0.6, 0.6);
    ctx.arc(rx, y, 18, Math.PI - 0.6, Math.PI + 0.6);
    ctx.stroke();
  }

  // 20. WIN: Left fist holds steady, right hand pulls upward into victorious fist
  drawMotionWin(ctx, cx, cy, t) {
    const lift = Math.sin(t * Math.PI);
    const ry = 185 - lift * 55;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 175, cx - 20, 185);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 155, cx + 20, ry);

    this.drawCurvedClawHand(ctx, cx - 20, 185, -1);
    this.drawCurvedClawHand(ctx, cx + 20, ry, 1);

    // Upward celebration sparks
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx + 20, ry + 16); ctx.lineTo(cx + 20, ry - 14);
    ctx.stroke();
  }

  // 21. CLASS: Both C-hands starting together and circling to enclose group
  drawMotionClass(ctx, cx, cy, t) {
    const ang = t * Math.PI;
    const lx = cx - 10 - Math.sin(ang) * 36;
    const rx = cx + 10 + Math.sin(ang) * 36;
    const y = 175;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 175, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 175, rx, y);

    this.drawCurvedClawHand(ctx, lx, y, -1);
    this.drawCurvedClawHand(ctx, rx, y, 1);

    // Circular group perimeter dashed outline
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.ellipse(cx, y, 45, 20, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // 22. TEACHER: Flat-O hands from temples forward, then downward agent marker
  drawMotionTeacher(ctx, cx, cy, t) {
    const fwd = Math.min(1.0, t * 1.8);
    const lx = cx - 25 - fwd * 15;
    const rx = cx + 25 + fwd * 15;
    const y = 80 + fwd * 45;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 70, 95, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 70, 95, rx, y);

    this.drawCurvedClawHand(ctx, lx, y, -1);
    this.drawCurvedClawHand(ctx, rx, y, 1);

    // Forward instruction vectors
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(lx, y - 10); ctx.lineTo(lx, y + 10);
    ctx.moveTo(rx, y - 10); ctx.lineTo(rx, y + 10);
    ctx.stroke();
  }

  // 23. STUDENT: Right hand scoops from flat left palm, lifts to forehead
  drawMotionStudent(ctx, cx, cy, t) {
    const lx = cx - 20;
    const ly = 185;
    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 175, lx, ly);
    this.drawOpenFlatHand(ctx, lx, ly, Math.PI / 2);

    const lift = Math.sin(t * Math.PI);
    const rx = cx + 15 - lift * 15;
    const ry = 180 - lift * 95;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 140, rx, ry);
    this.drawCurvedClawHand(ctx, rx, ry, 1);

    // Upward learning arc
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lx, ly - 5);
    ctx.quadraticCurveTo(cx, 130, rx, ry);
    ctx.stroke();
  }

  // 24. STUDY: Left flat palm stationary, right fingers fluttering above
  drawMotionStudy(ctx, cx, cy, t) {
    const lx = cx - 20;
    const ly = 185;
    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 175, lx, ly);
    this.drawOpenFlatHand(ctx, lx, ly, Math.PI / 2);

    const flutter = Math.sin(t * Math.PI * 8) * 8;
    const rx = cx + 10 + flutter;
    const ry = 155;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 60, 145, rx, ry);
    this.drawOpenFlatHand(ctx, rx, ry, 0.4);

    // Light scan beam onto book palm
    ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.beginPath();
    ctx.moveTo(rx, ry + 10);
    ctx.lineTo(lx - 15, ly);
    ctx.lineTo(lx + 20, ly);
    ctx.closePath();
    ctx.fill();
  }

  // 25. WORK: Dominant A-fist taps firmly on top of stationary wrist twice
  drawMotionWork(ctx, cx, cy, t) {
    const lx = cx - 20;
    const ly = 185;
    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 175, lx, ly);
    this.drawCurvedClawHand(ctx, lx, ly, -1);

    const tap = Math.abs(Math.sin(t * Math.PI * 4));
    const rx = lx + 5;
    const ry = 150 + tap * 32;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 160, rx, ry);
    this.drawCurvedClawHand(ctx, rx, ry, 1);

    // Firm downward impact lines
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(rx, ry - 14);
    ctx.lineTo(rx, ry + 8);
    ctx.stroke();

    if (tap > 0.8) {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
      ctx.beginPath();
      ctx.arc(lx, ly, 16, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // 26. COMPUTER: C-hand sweeping an arc along the stationary forearm
  drawMotionComputer(ctx, cx, cy, t) {
    const lx = cx - 25;
    const ly = 180;
    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 40, 175, lx + 40, ly);

    const sweep = ((t * 1.5) % 1.0) * 55;
    const rx = lx + sweep;
    const ry = ly - 20;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 55, 145, rx, ry);
    this.drawCurvedClawHand(ctx, rx, ry, 1);

    // Luminous cyber trajectory arc
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(lx, ly - 10);
    ctx.quadraticCurveTo(lx + 25, ly - 35, lx + 55, ly - 10);
    ctx.stroke();
  }

  // 27. BOSS: Claw-hand tapping twice firmly on the right shoulder
  drawMotionBoss(ctx, cx, cy, t) {
    const tap = Math.abs(Math.sin(t * Math.PI * 4));
    const rx = cx + 55;
    const ry = 115 - tap * 16;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 75, 110, rx, ry);
    this.drawCurvedClawHand(ctx, rx, ry, 1);

    // Rank insignia epaulet glow
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rx - 12, 115); ctx.lineTo(rx + 12, 115);
    ctx.moveTo(rx - 8, 120); ctx.lineTo(rx + 8, 120);
    ctx.stroke();
  }

  // 28. ORDER: Finger points from lips directly forward with command
  drawMotionOrder(ctx, cx, cy, t) {
    const fwd = Math.min(1.0, t * 1.6);
    const rx = cx + 10 + fwd * 55;
    const ry = 95 + fwd * 40;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 110, rx, ry);
    this.drawPointingFinger(ctx, rx, ry, 1);

    // Direct command arrow
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx + 10, 95); ctx.lineTo(rx, ry);
    ctx.stroke();
  }

  // 29. RAIN: Both hands dropping repeatedly with rippling fingers
  drawMotionRain(ctx, cx, cy, t) {
    const drop = ((t * 2.0) % 1.0) * 60;
    const y = 135 + drop;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 150, cx - 25, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 150, cx + 25, y);

    this.drawCurvedClawHand(ctx, cx - 25, y, -1);
    this.drawCurvedClawHand(ctx, cx + 25, y, 1);

    // Blue falling raindrops
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    for (let i = -3; i <= 3; i++) {
      const rx = cx + i * 16;
      ctx.beginPath();
      ctx.moveTo(rx, y - 18); ctx.lineTo(rx - 2, y + 10);
      ctx.stroke();
    }
  }

  // 30. COLD: Both fists shivering tightly against chest
  drawMotionCold(ctx, cx, cy, t) {
    const shiver = Math.sin(t * Math.PI * 14) * 6;
    const lx = cx - 22 + shiver;
    const rx = cx + 22 - shiver;
    const y = 165;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 160, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 160, rx, y);

    this.drawCurvedClawHand(ctx, lx, y, -1);
    this.drawCurvedClawHand(ctx, rx, y, 1);

    // Shiver vibration brackets
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lx - 12, y - 10); ctx.lineTo(lx - 16, y); ctx.lineTo(lx - 12, y + 10);
    ctx.moveTo(rx + 12, y - 10); ctx.lineTo(rx + 16, y); ctx.lineTo(rx + 12, y + 10);
    ctx.stroke();
  }

  // 31. SUN: Circle in air that opens into bright ray burst
  drawMotionSun(ctx, cx, cy, t) {
    const burst = Math.sin(t * Math.PI);
    const ry = 80;
    const rx = cx + 25;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 95, rx, ry);
    this.drawOpenFlatHand(ctx, rx, ry, 0);

    // Radiant sunbeams
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2.5;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
      ctx.beginPath();
      ctx.moveTo(rx + Math.cos(a) * 12, ry + Math.sin(a) * 12);
      ctx.lineTo(rx + Math.cos(a) * (18 + burst * 20), ry + Math.sin(a) * (18 + burst * 20));
      ctx.stroke();
    }
  }

  // 32. WIND: Both open hands swaying side to side in breeze
  drawMotionWind(ctx, cx, cy, t) {
    const sway = Math.sin(t * Math.PI * 3) * 38;
    const lx = cx - 25 + sway;
    const rx = cx + 25 + sway;
    const y = 165;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 155, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 155, rx, y);

    this.drawOpenFlatHand(ctx, lx, y, sway * 0.01);
    this.drawOpenFlatHand(ctx, rx, y, sway * 0.01);

    // Breeze gust ribbon
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 50, 140);
    ctx.quadraticCurveTo(cx + sway, 130, cx + 50, 140);
    ctx.stroke();
  }

  // 33. PARK: Arm like tree trunk with branching fingers swaying
  drawMotionPark(ctx, cx, cy, t) {
    const lx = cx - 25;
    const ly = 195;
    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 40, 185, lx + 50, ly);

    const sway = Math.sin(t * Math.PI * 3) * 12;
    const rx = cx + 10 + sway;
    const ry = 140;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 25, 185, rx, ry);
    this.drawOpenFlatHand(ctx, rx, ry, sway * 0.02);

    // Green foliage aura
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(rx, ry - 10, 20, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 34. STORE: Both flat-O hands pivoting outward repeatedly
  drawMotionStore(ctx, cx, cy, t) {
    const pivot = Math.sin(t * Math.PI * 4) * 0.35;
    const lx = cx - 25;
    const rx = cx + 25;
    const y = 175;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 160, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 160, rx, y);

    this.drawCurvedClawHand(ctx, lx, y, -1 - pivot);
    this.drawCurvedClawHand(ctx, rx, y, 1 + pivot);

    // Outward display arcs
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(lx, y, 16, -Math.PI / 2, 0);
    ctx.arc(rx, y, 16, Math.PI, Math.PI * 1.5);
    ctx.stroke();
  }

  // 35. LIBRARY: Right L-hand drawing a clockwise circle
  drawMotionLibrary(ctx, cx, cy, t) {
    const ang = t * Math.PI * 2;
    const rx = cx + 20 + Math.cos(ang) * 26;
    const ry = 150 + Math.sin(ang) * 26;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 145, rx, ry);
    this.drawPointingFinger(ctx, rx, ry, 1);

    // Circular orbital trace
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(cx + 20, 150, 26, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // 36. BANK: Crisp fingerspelled B-A-N-K with vault shimmer
  drawMotionBank(ctx, cx, cy, t) {
    const rx = cx + 25;
    const ry = 160;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 150, rx, ry);
    this.drawOpenFlatHand(ctx, rx, ry, 0);

    // Vault shimmer square
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.strokeRect(rx - 15, ry - 18, 30, 36);
  }

  // 37. HELP: Left flat palm lifting right A-fist with thumb up
  drawMotionHelp(ctx, cx, cy, t) {
    const lift = Math.sin(t * Math.PI);
    const y = 185 - lift * 32;
    const lx = cx - 10;
    const rx = cx + 5;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 175, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 165, rx, y - 8);

    this.drawOpenFlatHand(ctx, lx, y, Math.PI / 2);
    this.drawCurvedClawHand(ctx, rx, y - 8, 1);

    // Upward support vector arrows
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, y + 14); ctx.lineTo(cx, y - 24);
    ctx.stroke();
  }

  // 38. TIME: Right index finger tapping twice on left wrist
  drawMotionTime(ctx, cx, cy, t) {
    const lx = cx - 20;
    const ly = 185;
    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 65, 175, lx, ly);
    this.drawCurvedClawHand(ctx, lx, ly, -1);

    const tap = Math.abs(Math.sin(t * Math.PI * 4));
    const rx = lx + 4;
    const ry = 150 + tap * 32;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 160, rx, ry);
    this.drawPointingFinger(ctx, rx, ry, 1);

    // Wristwatch dial pulse
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(lx, ly, 10, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 39. TRUE: Index finger from lips shooting straight forward
  drawMotionTrue(ctx, cx, cy, t) {
    const fwd = Math.min(1.0, t * 1.5);
    const rx = cx + 15 + fwd * 45;
    const ry = 95 + fwd * 25;

    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 65, 110, rx, ry);
    this.drawPointingFinger(ctx, rx, ry, 1);

    // Golden truth vector ray
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx + 10, 95); ctx.lineTo(rx, ry);
    ctx.stroke();
  }

  // 40. FINISH: Both 5-hands flicking outward with palms forward
  drawMotionFinish(ctx, cx, cy, t) {
    const flick = Math.min(1.0, t * 1.8);
    const lx = cx - 25 - flick * 25;
    const rx = cx + 25 + flick * 25;
    const y = 165;

    this.drawArticulatedArm(ctx, cx - 60, 120, cx - 75, 155, lx, y);
    this.drawArticulatedArm(ctx, cx + 60, 120, cx + 75, 155, rx, y);

    this.drawOpenFlatHand(ctx, lx, y, -flick * 0.4);
    this.drawOpenFlatHand(ctx, rx, y, flick * 0.4);

    // Outward flick completion waves
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(lx + 10, y); ctx.lineTo(lx - 20, y);
    ctx.moveTo(rx - 10, y); ctx.lineTo(rx + 20, y);
    ctx.stroke();
  }
}

const gestigoMystery = new GestigoMysteryEngine();
if (typeof window !== 'undefined') {
  window.gestigoMystery = gestigoMystery;
  window.GestigoMysteryEngine = GestigoMysteryEngine;
}
