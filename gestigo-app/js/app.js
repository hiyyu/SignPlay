// ==========================================================================
// Gestigo - Master Story Opening Prologue Slides (RPG Dialogue Cutscene)
// Setting: Luma City • 3 Narrative Worldbuilding Slides + 5 Detective Gio Dialogue Slides
// ==========================================================================
// ==========================================================================
// Gestigo - Master Story Opening Prologue Slides (RPG Dialogue Cutscene)
// Setting: Luma City • Narrative Intro -> Open Envelope Cipher -> Gio Intro -> Gio Dialogue
// ==========================================================================
const GESTIGO_PROLOGUE_SLIDES = [
  // 1. DIALOGUE 1: The Festival of Stories Plaza (Festival background, not the museum yet!)
  {
    isNarrative: true,
    speaker: "Prologue",
    speakerBm: "Prolog",
    badge: "The Festival of Stories",
    badgeBm: "Festival Cerita",
    avatar: "assets/gestigo-logo.png",
    bg: "assets/festival-luma-city.jpg",
    bgPosition: "center 72%", // FESTIVAL STREET & CROWDS IN VIEW!
    showEnvelopeClue: false, // NO POPUP CARD!
    showGioFullBody: false,
    text: "Welcome to Luma City! Tonight is the opening of the grand Festival of Stories, where everyone in the city gathers to celebrate legendary tales told in sign language. But without the sacred Memory Book to open the ceremony, the entire festival cannot begin!",
    textBm: "Selamat datang ke Bandar Luma! Malam ini merupakan pembukaan Festival Cerita yang dinanti-nantikan oleh seluruh warga kota. Namun tanpa Buku Memori yang agung untuk merasmikan majlis, seluruh festival tidak dapat dimulakan!"
  },
  // 2. DIALOGUE 2: The Story Museum & Memory Book in Glass Vitrine (No popup, background is enough!)
  {
    isNarrative: true,
    speaker: "The Mystery",
    speakerBm: "Misteri Bermula",
    badge: "The Missing Memory Book",
    badgeBm: "Buku Memori Yang Hilang",
    avatar: "assets/gestigo-logo.png",
    bg: "assets/memory-book.jpg",
    bgPosition: "center 60%", // MEMORY BOOK & PEDESTAL IN VIEW!
    showEnvelopeClue: false, // NO POPUP CARD! Background is enough!
    showGioFullBody: false,
    text: "Every year, the festival opens by turning the pages of the interactive Memory Book, kept safe inside a locked glass display case at the Story Museum. But just hours before the opening ceremony, the glass was unlocked and the precious book vanished!",
    textBm: "Setiap tahun, festival dimulakan dengan membuka lembaran Buku Memori interaktif yang dikunci rapi di dalam peti kaca di Muzium Cerita. Namun beberapa jam sebelum majlis bermula, peti kaca telah dibuka dan buku berharga itu telah hilang!"
  },
  // 3. DIALOGUE 3: The Crime Scene (No popup, background is enough!)
  {
    isNarrative: true,
    speaker: "The Crime Scene",
    speakerBm: "Tempat Kejadian",
    badge: "Empty Display Pedestal",
    badgeBm: "Pedestal Pameran Kosong",
    avatar: "assets/gestigo-logo.png",
    bg: "assets/dialogue.png",
    bgPosition: "center 70%", // CRIME SCENE PEDESTAL & ENVELOPE IN VIEW! // CRIME SCENE WITH OPENED VITRINE & CAUTION TAPE!
    showEnvelopeClue: false, // NO POPUP CARD! Background is enough!
    showGioFullBody: false,
    text: "Inside the opened glass case on the display pedestal, only a single wax-sealed purple envelope remained, resting quietly where the Memory Book used to be.",
    textBm: "Di dalam peti kaca yang terbuka di atas tempat pameran, hanya tinggal satu sampul surat ungu bermeterai lilin, terletak di tempat Buku Memori pernah disimpan."
  },
  // 4. DIALOGUE 4: The Mysterious Envelope (DO NOT reveal inside of letter yet!)
  {
    isNarrative: true,
    speaker: "The Mysterious Clue",
    speakerBm: "Petunjuk Misteri",
    badge: "Wax-Sealed Envelope",
    badgeBm: "Sampul Surat Bermeterai",
    avatar: "assets/gestigo-logo.png",
    bg: "assets/dialogue.png",
    bgPosition: "center 70%", // CRIME SCENE PEDESTAL & ENVELOPE IN VIEW!
    showEnvelopeClue: true, // Show the unopened envelope!
    clueImg: "assets/clue-envelope.jpg", // UNOPENED WAX-SEALED ENVELOPE!
    clueLabel: "CLUE #1: WAX-SEALED PURPLE ENVELOPE",
    clueLabelBm: "PETUNJUK #1: SAMPUL UNGU BERMETERAI LILIN",
    lightboxCaption: "The wax-sealed purple envelope left behind inside the glass case. It is stamped with an ornate golden wax seal, left by the mysterious culprit.",
    lightboxCaptionBm: "Sampul surat ungu bermeterai lilin yang ditinggalkan di dalam peti kaca. Dimeterai dengan cap lilin keemasan, ditinggalkan oleh pelaku misteri.",
    showGioFullBody: false,
    text: "The culprit deliberately left behind a mysterious purple envelope, locked with a heavy golden wax seal. What kind of message could be inside?",
    textBm: "Pelaku sengaja meninggalkan satu sampul surat ungu misteri, dikunci kemas dengan meterai lilin emas. Apakah mesej yang berada di dalamnya?"
  },
  // 5. DIALOGUE 5: INTRODUCING GIO (Gio in CENTER, Full-Body & Large!)
  {
    isNarrative: true,
    speaker: "Meet Gio",
    speakerBm: "Kenali Gio",
    badge: "Museum Assistant & Partner",
    badgeBm: "Pembantu Muzium & Rakan Detektif",
    avatar: "assets/gio-avatar.png",
    bg: "assets/dialogue.png",
    bgPosition: "center 70%", // CRIME SCENE PEDESTAL & ENVELOPE IN VIEW!
    showEnvelopeClue: false,
    showGioFullBody: true,
    gioPosition: "center", // CENTER STAGE!
    text: "Meet Gio! He is an energetic museum assistant who dreams of becoming a detective. He knows Luma City and the museum well, but he is still learning sign language. When the book disappeared, the chief detective refused to let him investigate alone, so he is looking for a partner.",
    textBm: "Kenali Gio! Dia seorang pembantu muzium yang bercita-cita menjadi detektif. Dia mengenali Bandar Luma dan sejarah muzium, tetapi masih mempelajari bahasa isyarat. Apabila buku itu hilang, ketua detektif enggan membenarkannya menyiasat sendirian, jadi dia mencari seorang rakan kongsi."
  },
  // 6. DIALOGUE 6: GIO SPEAKS (Moves to LEFT side!)
  {
    isNarrative: false,
    speaker: "Gio",
    speakerBm: "Gio",
    badge: "Detective-in-Training",
    badgeBm: "Detektif Dalam Latihan",
    avatar: "assets/gio-excited.png",
    bg: "assets/dialogue.png",
    bgPosition: "center 70%", // CRIME SCENE PEDESTAL & ENVELOPE IN VIEW!
    showEnvelopeClue: false,
    showGioFullBody: true,
    gioPosition: "left", // MOVES TO LEFT!
    text: "Hey, you are just in time! You must be the new detective! I am Gio, the museum assistant. We have a big problem on our hands.",
    textBm: "Hai, tepat pada masanya! Awak mesti detektif baharu itu! Saya Gio, pembantu muzium. Kita ada masalah besar sekarang."
  },
  // 7. DIALOGUE 7: GIO REVEALS INSIDE OF THE LETTER WITH THE DETECTIVE!
  {
    isNarrative: false,
    speaker: "Gio",
    speakerBm: "Gio",
    badge: "The Cipher Note Revealed",
    badgeBm: "Nota Kod Didedahkan",
    avatar: "assets/gio-thinking.png",
    bg: "assets/dialogue.png",
    bgPosition: "center 70%", // CRIME SCENE PEDESTAL & ENVELOPE IN VIEW!
    showEnvelopeClue: true, // REVEAL OPEN ENVELOPE WITH GIO HERE!
    clueImg: "assets/clue-envelope-open.jpg", // OPENED ENVELOPE WITH PARCHMENT NOTE!
    clueLabel: "OPENED ENVELOPE: CIPHER NOTE & GLYPHS",
    clueLabelBm: "SAMPUL DIBUKA: NOTA KOD & SIMBOL ISYARAT",
    lightboxCaption: "The opened parchment letter found inside the purple envelope. It reads: 'If you want to find what was lost, follow the signs.' with four mysterious fingerspelling handshapes drawn below.",
    lightboxCaptionBm: "Lembaran surat purba di dalam sampul ungu. Tertulis: 'Jika mahu mencari apa yang hilang, ikutlah tanda-tandanya.' bersama empat simbol ejaan jari di bawahnya.",
    showGioFullBody: true,
    gioPosition: "left",
    text: "Look, when we open the wax seal, there is an ancient note inside! It says: 'If you want to find what was lost, follow the signs.' And look at these four mysterious handshape symbols drawn below!",
    textBm: "Lihat, bila kita buka meterai lilin ini, ada nota purba di dalamnya! Tertulis: 'Jika mahu mencari apa yang hilang, ikutlah tanda-tandanya.' Dan tengok empat simbol isyarat tangan yang dilukis di bawahnya!"
  },
  // 8. DIALOGUE 8: GIO SPEAKS (Final Direction to Stage 1)
  {
    isNarrative: false,
    speaker: "Gio",
    speakerBm: "Gio",
    badge: "Mission Briefing",
    badgeBm: "Taklimat Misi",
    avatar: "assets/gio-encouraging.png",
    bg: "assets/dialogue.png",
    bgPosition: "center 70%", // CRIME SCENE PEDESTAL & ENVELOPE IN VIEW!
    showEnvelopeClue: true,
    clueImg: "assets/clue-envelope-open.jpg",
    clueLabel: "ENCRYPTED CIPHER NOTE",
    clueLabelBm: "NOTA KOD DISULITKAN",
    lightboxCaption: "The opened parchment letter found inside the purple envelope. It reads: 'If you want to find what was lost, follow the signs.' with four mysterious fingerspelling handshapes drawn below.",
    lightboxCaptionBm: "Lembaran surat purba di dalam sampul ungu. Tertulis: 'Jika mahu mencari apa yang hilang, ikutlah tanda-tandanya.' bersama empat simbol ejaan jari di bawahnya.",
    showGioFullBody: true,
    gioPosition: "left",
    isFinalSlide: true,
    text: "Whoever took the book left these handshape symbols as a challenge. We need to investigate the museum, find the witnesses, and decode these clues to save the festival in time. Come on, partner, let's begin the mission!",
    textBm: "Sesiapa yang mengambil buku ini telah meninggalkan simbol isyarat ini sebagai cabaran. Kita perlu menyiasat muzium, menemui saksi, dan merungkai petunjuk ini demi menyelamatkan festival. Jom rakan kongsi, mari mulakan misi!"
  }
];

// ==========================================================================
// Gestigo - Master Application Controller & State Engine
// ==========================================================================

class GestigoApp {
  constructor() {
    this.currentView = 'mystery'; // Main Game Pathway view by default
    this.currentLevel = 1;
    this.activeStageId = 1;

    // Load from localStorage or defaults
    this.prologueSlideIndex = 0;
    this.xp = parseInt(localStorage.getItem('gestigo_xp') || '150');
    this.unlockedStages = JSON.parse(localStorage.getItem('gestigo_unlocked') || '[1]');
    this.completedStages = JSON.parse(localStorage.getItem('gestigo_completed') || '{}');
    this.unlockedClues = JSON.parse(localStorage.getItem('gestigo_clues') || JSON.stringify([
      { name: "Security Monogram 'AVL'", desc: "Initials left on the glass point to former vault technician Arthur Vance Lloyd." }
    ]));

    this.pathway = null;
  }

  init() {
    try {
      const stages = (typeof window !== 'undefined' && window.GESTIGO_STAGES) 
        ? window.GESTIGO_STAGES 
        : ((typeof GESTIGO_STAGES !== 'undefined') ? GESTIGO_STAGES : []);

      // 1. Initialize Responsive 3D Stage Pathway FIRST to ensure instant UI rendering
      this.pathway = new GestigoPathway('pathwayContainer');
      this.pathway.unlockedStages = this.unlockedStages;
      this.pathway.completedStages = this.completedStages;
      this.pathway.activeStageId = this.activeStageId;
      this.pathway.setStages(stages);

      // Set callback when a stage on the pathway is clicked
      this.pathway.onStageSelect = (stage) => {
        this.handlePathwayStageClick(stage);
      };

      // Set callback when hovered
      this.pathway.onStageHover = (stage) => {
        this.updateStageHoverCard(stage);
      };
    } catch (err) {
      console.warn("Pathway init warning:", err);
    }

    try {
      // 2. Initialize Gesture Engine safely
      if (window.gestigoGesture) {
        gestigoGesture.init('webcamVideo', 'landmarkCanvas');
      }
    } catch (err) {
      console.warn("Gesture init warning:", err);
    }

    try {
      // 3. Render Stats & Evidence Board
      this.updateUserStatsUI();
      this.renderEvidenceBoard();
    } catch (err) {
      console.warn("Stats UI warning:", err);
    }

    try {
      // 4. Apply Bilingual Translations (EN/BM)
      if (window.gestigoI18n) {
        gestigoI18n.applyTranslations();
      }
    } catch (err) {
      console.warn("i18n warning:", err);
    }

    try {
      // 5. Update Gio Memory Gauge in header
      if (window.gestigoJournal) {
        gestigoJournal.updateHeaderMemory();
      }
    } catch (err) {
      console.warn("Journal warning:", err);
    }

    try {
      // 6. Init Lucide Icons safely
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    } catch (err) {
      console.warn("Lucide warning:", err);
    }

    // Automatic RPG story cutscene: Every time a new player starts, the story appears first!
    if (document.getElementById('storyPrologueModal')) {
      const isStory = window.location.pathname.endsWith('story.html');
      const urlParams = (typeof window !== 'undefined' && window.location) ? new URLSearchParams(window.location.search) : null;
      const explicitSkip = urlParams && urlParams.get('skipPrologue') === '1';
      const devMode = urlParams && urlParams.get('dev') === '1';
      const seenPrologue = localStorage.getItem('gestigo_prologue_seen') === 'true';
      const completedCount = Object.keys(this.completedStages || {}).filter(k => this.completedStages[k] > 0).length;
      const isNewPlayer = (completedCount === 0);

      // Story automatically appears first for every new player (0 completed stages) or if not yet seen
      if (!explicitSkip && !devMode && (isStory || !seenPrologue || isNewPlayer)) {
        setTimeout(() => this.openStoryPrologue(), 250);
      }
    }

    // Direct stage investigation via URL query param (e.g. index.html?stage=1)
    try {
      if (typeof window !== 'undefined' && window.location && window.location.search) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('scrollTo') === 'bottom') {
          setTimeout(() => {
            const hub = document.getElementById('level3WorldHubContainer');
            if (hub) hub.scrollIntoView({ behavior: 'instant' });
            else window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
          }, 400);
        }
        if ((urlParams.get('open3d') === '1' || urlParams.get('open3d') === 'true') && window.gestigoLuma3D) {
          setTimeout(() => {
            window.gestigoLuma3D.open();
            const teleportChar = urlParams.get('teleportNear');
            if (teleportChar) {
              setTimeout(() => {
                const char = window.gestigoLuma3D.characters.find(c => c.id === teleportChar);
                if (char) {
                  window.gestigoLuma3D.playerPos.set(char.pos3D.x, 0, char.pos3D.z + 4.2);
                  window.gestigoLuma3D.cameraYaw = 0;
                  window.gestigoLuma3D.cameraPitch = 0.12;
                }
              }, 350);
            }
            const openEvid = urlParams.get('openEvidence');
            if (openEvid === '1') {
              setTimeout(() => {
                if (window.gestigoLuma3D) window.gestigoLuma3D.openEvidenceBoard();
              }, 600);
            }
            const openInterrogChar = urlParams.get('openInterrogation');
            if (openInterrogChar) {
              setTimeout(() => {
                const char = window.gestigoLuma3D.characters.find(c => c.id === openInterrogChar);
                if (char) {
                  const qParam = urlParams.get('question') || null;
                  window.gestigoLuma3D.openInterrogationDialog(char, qParam);
                  if (urlParams.get('autoVerify') === '1') {
                    setTimeout(() => {
                      window.gestigoLuma3D.simulateInterrogationSign(char.targetSign || 'STOP');
                    }, 400);
                  }
                }
              }, 600);
            }
          }, 200);
        }
        const instructParam = parseInt(urlParams.get('instructions'), 10);
        if (instructParam && this.pathway && typeof this.pathway.showLevelInstructions === 'function') {
          setTimeout(() => {
            this.pathway.showLevelInstructions(instructParam);
          }, 400);
        }
        const stageParam = parseInt(urlParams.get('stage'), 10);
        if (stageParam && window.gestigoMystery && window.GESTIGO_STAGES) {
          const targetStage = window.GESTIGO_STAGES.find(s => s.id === stageParam);
          if (targetStage) {
            const stepParam = parseInt(urlParams.get('step'), 10);
            setTimeout(() => {
              window.gestigoMystery.startStage(targetStage);
              if (stepParam && stepParam > 1) {
                setTimeout(() => {
                  window.gestigoMystery.currentStepIdx = stepParam - 1;
                  window.gestigoMystery.renderCurrentStep();
                }, 250);
              }
            }, 300);
          }
        }
      }
    } catch (e) {
      console.warn('URL stage query warning:', e);
    }
  }

  openStoryPrologue() {
    this.prologueSlideIndex = 0;
    this._isTyping = false;
    this._typewriterInterval = null;
    const modal = document.getElementById('storyPrologueModal');
    if (!modal) return;

    modal.classList.remove('hidden');
    modal.style.opacity = '1';
    this.updatePrologueLanguageUi();

    const startOverlay = document.getElementById('prologueStartOverlay');
    // If user has not yet interacted with the page, show start overlay to guarantee audio unlock & language selection!
    if (!this._userAudioUnlocked && startOverlay) {
      startOverlay.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
      startOverlay.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      if (startOverlay) startOverlay.classList.add('hidden', 'opacity-0', 'pointer-events-none');
      if (window.gestigoAudio) gestigoAudio.playClick();
      this.renderPrologueSlide();
    }

    // Attach keyboard navigation (Space, Enter, A, ArrowRight)
    if (this._prologueKeyHandler) {
      window.removeEventListener('keydown', this._prologueKeyHandler);
    }
    this._prologueKeyHandler = (e) => {
      if (modal.classList.contains('hidden')) return;
      // If lightbox is open, Escape closes lightbox first
      if (e.key === 'h' || e.key === 'H') {
        this.togglePrologueUi();
        return;
      }
      if (e.code === 'Escape') {
        const lightbox = document.getElementById('prologueLightboxModal');
        if (lightbox && !lightbox.classList.contains('hidden')) {
          this.closeClueLightbox();
          return;
        }
        this.closeStoryPrologue();
        return;
      }
      if (e.code === 'Space' || e.code === 'Enter' || e.key === 'a' || e.key === 'A' || e.code === 'ArrowRight') {
        e.preventDefault();
        const startOverlay = document.getElementById('prologueStartOverlay');
        if (startOverlay && !startOverlay.classList.contains('hidden')) {
          this.beginPrologueWithAudio();
        } else {
          this.nextPrologueSlide();
        }
      }
    };
    if (window.addEventListener) {
      window.addEventListener('keydown', this._prologueKeyHandler);
    }
  }

  // Toggle Dialogue Box Visibility (Hide/Show to view full-screen background scene)
  togglePrologueUi(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const wrap = document.getElementById('prologueDialogueBoxWrap');
    const label = document.getElementById('prologueHideUiLabel');
    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));
    if (!wrap) return;
    if (wrap.classList.contains('opacity-0')) {
      wrap.classList.remove('opacity-0', 'pointer-events-none');
      if (label) label.textContent = isBm ? "Sembunyi Teks" : "View Scene";
    } else {
      wrap.classList.add('opacity-0', 'pointer-events-none');
      if (label) label.textContent = isBm ? "Tunjuk Teks" : "Show Dialogue";
    }
  }

  // Toggle cutscene language at the top bar (English <-> Bahasa Melayu)
  togglePrologueLanguage(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const current = (window.gestigoI18n && window.gestigoI18n.currentLang) ? window.gestigoI18n.currentLang : 'en';
    const nextLang = (current === 'en') ? 'bm' : 'en';
    if (window.gestigoI18n) {
      window.gestigoI18n.setLanguage(nextLang);
    }
    if (window.gestigoAudio) gestigoAudio.playClick();
    this.updatePrologueLanguageUi();
    // Re-render current slide immediately in the chosen language
    this.renderPrologueSlide();
  }

  // Update all prologue UI controls strictly in active single language (No bilingual slashes!)
  updatePrologueLanguageUi() {
    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));
    const flagEl = document.getElementById('prologueLangFlag');
    const textEl = document.getElementById('prologueLangText');
    const skipEl = document.getElementById('prologueSkipLabel');
    const startBtnText = document.getElementById('startInvestigationBtnText');
    const startCaseTitle = document.getElementById('startCaseTitle');
    const startCaseSub = document.getElementById('startCaseSub');
    const startCaseTag = document.getElementById('startCaseTag');
    const enlargeEl = document.getElementById('clueEnlargeBtnText');
    const lightboxClose = document.getElementById('lightboxCloseBtnText');
    const lightboxSub = document.getElementById('lightboxSub');

    if (flagEl) flagEl.textContent = isBm ? "🇲🇾" : "🇬🇧";
    if (textEl) textEl.textContent = isBm ? "BM" : "EN";
    if (skipEl) skipEl.textContent = isBm ? "Langkau" : "Skip Intro";
    if (startBtnText) startBtnText.textContent = isBm ? "MULA SIASATAN" : "START INVESTIGATION";
    if (startCaseTitle) startCaseTitle.textContent = isBm ? "Festival Cerita" : "The Festival of Stories";
    if (startCaseSub) startCaseSub.textContent = isBm ? "Muzium Cerita • Bandar Luma" : "Story Museum • Luma City";
    if (startCaseTag) startCaseTag.textContent = isBm ? "GESTIGO • KES #001" : "GESTIGO • CASE #001";
    if (enlargeEl) enlargeEl.textContent = isBm ? "Besarkan" : "Enlarge";
    if (lightboxClose) lightboxClose.textContent = isBm ? "Tutup [Esc]" : "Close [Esc]";
    if (lightboxSub) lightboxSub.textContent = isBm ? "Arkib Petunjuk Resolusi Tinggi" : "High-Resolution Clue Archive";
  }

  // Begins prologue with guaranteed audio unlock on direct user interaction
  beginPrologueWithAudio(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this._userAudioUnlocked = true;
    if (window.gestigoAudio) {
      window.gestigoAudio.init();
      window.gestigoAudio.playClick();
    }
    const startOverlay = document.getElementById('prologueStartOverlay');
    if (startOverlay) {
      startOverlay.classList.remove('opacity-100', 'pointer-events-auto');
      startOverlay.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => startOverlay.classList.add('hidden'), 350);
    }
    this.renderPrologueSlide();
  }

  // Open high-resolution clue lightbox (Enlarges missing book, empty pedestal, or cipher letter)
  openClueLightbox(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const modal = document.getElementById('prologueLightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const clueImg = document.getElementById('prologueClueImg');
    const clueLabel = document.getElementById('prologueClueLabel');
    if (!modal || !lightboxImg) return;

    if (clueImg && clueImg.src) {
      lightboxImg.src = clueImg.src;
    }
    if (clueLabel && lightboxTitle) {
      lightboxTitle.textContent = clueLabel.textContent;
    }

    const slide = GESTIGO_PROLOGUE_SLIDES[this.prologueSlideIndex];
    if (slide && lightboxCaption) {
      const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));
      lightboxCaption.textContent = (isBm && slide.lightboxCaptionBm) ? slide.lightboxCaptionBm : (slide.lightboxCaption || slide.text || "");
    }

    if (window.gestigoAudio) gestigoAudio.playClick();
    modal.classList.remove('hidden', 'pointer-events-none');
    modal.classList.add('flex', 'pointer-events-auto');
    void modal.offsetWidth;
    modal.classList.remove('opacity-0');
    modal.classList.add('opacity-100');
  }

  // Close clue lightbox
  closeClueLightbox(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const modal = document.getElementById('prologueLightboxModal');
    if (!modal) return;
    if (window.gestigoAudio) gestigoAudio.playClick();
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    setTimeout(() => {
      modal.classList.remove('flex', 'pointer-events-auto');
      modal.classList.add('hidden', 'pointer-events-none');
    }, 200);
  }

  // Typewriter Engine: Types out wording character by character with blinking cursor
  // Typewriter Engine: Realistic conversational pacing with natural punctuation pauses
  startTypewriter(fullText, element) {
    if (this._typewriterTimeout) {
      clearTimeout(this._typewriterTimeout);
      this._typewriterTimeout = null;
    }

    this._isTyping = true;
    this._currentFullText = fullText;
    this._typewriterElement = element;

    // Start authentic uploaded typing audio sound
    if (window.gestigoAudio && typeof window.gestigoAudio.startTypingSound === 'function') {
      window.gestigoAudio.startTypingSound();
    }

    let charIndex = 0;
    element.innerHTML = '<span class="typewriter-cursor"></span>';

    const typeNextChar = () => {
      if (!this._isTyping) return;
      if (charIndex < fullText.length) {
        const char = fullText[charIndex];
        charIndex++;

        const currentSlice = fullText.slice(0, charIndex);
        const safeHtml = currentSlice
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        element.innerHTML = safeHtml + '<span class="typewriter-cursor"></span>';

        // Play crisp typewriter audio blip on every character!
        if (window.gestigoAudio && typeof window.gestigoAudio.playTypewriterBlip === 'function') {
          window.gestigoAudio.playTypewriterBlip(char);
        }

        // Realistic conversational timing: Natural breathing pause at punctuations!
        let delay = 24; // Base speed: 24ms per character
        if (char === ',' || char === ':' || char === ';') {
          delay = 140; // Brief conversational breath
        } else if (char === '.' || char === '!' || char === '?') {
          // Check for ellipsis (...)
          if (charIndex >= 3 && fullText.slice(charIndex - 3, charIndex) === '...') {
            delay = 320; // Dramatic pause
          } else {
            delay = 230; // Sentence end pause
          }
        } else if (char === ' ') {
          delay = 32;
        }

        this._typewriterTimeout = setTimeout(typeNextChar, delay);
      } else {
        this.finishTypewriter();
      }
    };

    // Begin typing after brief 50ms initial beat
    this._typewriterTimeout = setTimeout(typeNextChar, 50);
  }

  // Instantly finish typewriter and reveal full text
  finishTypewriter() {
    if (this._typewriterTimeout) {
      clearTimeout(this._typewriterTimeout);
      this._typewriterTimeout = null;
    }
    this._isTyping = false;
    if (this._typewriterElement && this._currentFullText) {
      this._typewriterElement.textContent = this._currentFullText;
    }
    // Stop authentic typing sound immediately
    if (window.gestigoAudio && typeof window.gestigoAudio.stopTypingSound === 'function') {
      window.gestigoAudio.stopTypingSound();
    }
  }

  renderPrologueSlide() {
    const slide = GESTIGO_PROLOGUE_SLIDES[this.prologueSlideIndex];
    if (!slide) return;
    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));

    // Dynamic Full-Screen Cinematic Background Switch with custom focal position
    const bgImg = document.getElementById('prologueBgImg');
    if (bgImg && slide.bg) {
      if (slide.bgPosition) {
        bgImg.style.objectPosition = slide.bgPosition;
      } else {
        bgImg.style.objectPosition = 'center 70%';
      }
      const currentSrc = bgImg.getAttribute('src');
      if (currentSrc !== slide.bg) {
        bgImg.style.transition = 'opacity 0.3s ease-in-out';
        bgImg.style.opacity = '0';
        setTimeout(() => {
          bgImg.src = slide.bg;
          bgImg.style.opacity = '1';
        }, 150);
      }
    }

    // Update Header Chapter Tag (Narrative vs Detective Mission)
    const chapterTag = document.getElementById('prologueChapterTag');
    if (chapterTag) {
      if (slide.isNarrative) {
        chapterTag.textContent = isBm ? "✦ PROLOG: FESTIVAL CERITA" : "✦ PROLOGUE: THE FESTIVAL OF STORIES";
      } else {
        chapterTag.textContent = isBm ? "✦ MISI DETEKTIF: BERSAMA GIO" : "✦ DETECTIVE MISSION: GIO's PARTNER";
      }
    }

    // Update Speaker Name
    const speakerEl = document.getElementById('prologueSpeakerName');
    if (speakerEl) speakerEl.textContent = isBm ? slide.speakerBm : slide.speaker;

    // Update Speaker Badge
    const badgeEl = document.getElementById('prologueSpeakerBadge');
    if (badgeEl) badgeEl.textContent = isBm ? slide.badgeBm : slide.badge;

    // Update Avatar (Narrative emblem or Detective Gio's expressive avatar)
    const avatarWrap = document.getElementById('prologueAvatarWrap');
    const avatarImg = document.getElementById('prologueSpeakerAvatar');
    if (avatarWrap) avatarWrap.classList.remove('hidden');
    if (avatarImg) {
      avatarImg.src = slide.avatar || "assets/gio-excited.png";
      avatarImg.onerror = () => { avatarImg.src = "assets/gio-avatar.png"; };
    }

    // Toggle Floating Clue Spotlight Card (Sealed or Opened Envelope with Encrypted Message)
    const clueCard = document.getElementById('prologueClueCard');
    const clueImg = document.getElementById('prologueClueImg');
    const clueLabel = document.getElementById('prologueClueLabel');
    if (clueCard) {
      if (slide.showEnvelopeClue) {
        clueCard.classList.remove('hidden');
        if (clueImg && slide.clueImg) {
          clueImg.src = slide.clueImg;
        }
        if (clueLabel && (slide.clueLabel || slide.clueLabelBm)) {
          clueLabel.textContent = isBm ? (slide.clueLabelBm || slide.clueLabel) : slide.clueLabel;
        }
      } else {
        clueCard.classList.add('hidden');
      }
    }

    // Toggle Full-Body Detective Gio Sprite (Center for Slide 5, Left for Slide 6+)
    const gioSprite = document.getElementById('prologueGioSprite');
    const gioFullImg = document.getElementById('prologueGioFullImg');
    if (gioSprite) {
      if (slide.showGioFullBody) {
        gioSprite.classList.remove('opacity-0', 'pointer-events-none');
        gioSprite.classList.add('opacity-100');

        if (slide.gioPosition === 'center') {
          // Slide 5: Heroic full-body introduction center stage (a bit larger, clear of top wording)
          gioSprite.className = "absolute bottom-0 sm:bottom-1 md:bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-700 opacity-100 block";
          if (gioFullImg) {
            gioFullImg.className = "h-[450px] sm:h-[550px] md:h-[650px] lg:h-[730px] max-h-[78vh] sm:max-h-[81vh] w-auto max-w-[340px] sm:max-w-[440px] md:max-w-[520px] object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] filter brightness-[1.04] transition-all duration-500";
          }
        } else {
          // Slide 6+: Detective partner standing attentively on the left (a bit larger, clear of top wording)
          gioSprite.className = "absolute bottom-0 sm:bottom-1 md:bottom-2 left-1 sm:left-3 md:left-6 translate-x-0 z-20 pointer-events-none transition-all duration-700 opacity-100 block";
          if (gioFullImg) {
            gioFullImg.className = "h-[430px] sm:h-[530px] md:h-[630px] lg:h-[710px] max-h-[76vh] sm:max-h-[79vh] w-auto max-w-[320px] sm:max-w-[420px] md:max-w-[490px] object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] filter brightness-[1.04] transition-all duration-500";
          }
        }
      } else {
        gioSprite.classList.remove('opacity-100');
        gioSprite.classList.add('opacity-0', 'pointer-events-none');
      }
    }

    this.updatePrologueLanguageUi();

    // Launch Typewriter effect on dialogue text!
    const textEl = document.getElementById('prologueDialogueText');
    const targetText = isBm ? slide.textBm : slide.text;
    if (textEl) {
      this.startTypewriter(targetText, textEl);
    }

    // Update Slide Counter
    const counterEl = document.getElementById('prologueSlideCounter');
    if (counterEl) counterEl.textContent = `${this.prologueSlideIndex + 1} / ${GESTIGO_PROLOGUE_SLIDES.length}`;

    // Update Progress Dots
    const dotsEl = document.getElementById('prologueDotsContainer');
    if (dotsEl) {
      let dotsHtml = '';
      GESTIGO_PROLOGUE_SLIDES.forEach((_, idx) => {
        if (idx === this.prologueSlideIndex) {
          dotsHtml += `<span class="w-5 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)] transition-all"></span>`;
        } else {
          dotsHtml += `<span class="w-2 h-2 rounded-full bg-slate-700 transition-all"></span>`;
        }
      });
      dotsEl.innerHTML = dotsHtml;
    }

    // Update Continue Button Label on Slide 8 (Directing players to Stage 1!)
    const labelEl = document.getElementById('prologueContinueLabel');
    const isLast = (this.prologueSlideIndex === GESTIGO_PROLOGUE_SLIDES.length - 1);
    if (labelEl) {
      if (isLast) {
        labelEl.textContent = isBm ? 'Masuk Peringkat 1 →' : 'Enter Stage 1 →';
      } else {
        labelEl.textContent = isBm ? 'Teruskan →' : 'Continue →';
      }
    }
  }

  nextPrologueSlide(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Fast-Forward Typewriter: If text is still typing, clicking immediately shows the full sentence!
    if (this._isTyping) {
      this.finishTypewriter();
      if (window.gestigoAudio) gestigoAudio.playClick();
      return;
    }

    if (window.gestigoAudio) gestigoAudio.playClick();

    if (this.prologueSlideIndex < GESTIGO_PROLOGUE_SLIDES.length - 1) {
      this.prologueSlideIndex++;
      this.renderPrologueSlide();
    } else {
      this.closeStoryPrologue();
    }
  }

  closeStoryPrologue(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    // Cancel any active typewriter timer
    this.finishTypewriter();

    if (window.gestigoAudio) gestigoAudio.playSuccess();

    sessionStorage.setItem('gestigo_seen_prologue', 'true');
    localStorage.setItem('gestigo_prologue_seen', 'true');

    const isStoryPage = window.location.pathname.endsWith('story.html');
    // If on story.html, direct user to Case Map (index.html)
    if (isStoryPage) {
      window.location.href = 'index.html';
      return;
    }

    const modal = document.getElementById('storyPrologueModal');
    if (modal) {
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.classList.add('hidden');
        if (this.pathway) {
          this.pathway.scrollToActiveStage();
        }
      }, 250);
    }
    if (this._prologueKeyHandler && window.removeEventListener) {
      window.removeEventListener('keydown', this._prologueKeyHandler);
    }
  }

  switchView(viewName) {
    if (window.gestigoAudio) gestigoAudio.playClick();
    this.currentView = viewName;

    // Multi-page navigation mapping
    const pageMap = {
      'story': 'story.html',
      'prologue': 'story.html',
      'mystery': 'index.html',
      'casemap': 'index.html',
      'map': 'index.html',
      'journal': 'journal.html',
      'evidence': 'journal.html?tab=evidence',
      'map': 'index.html'
    };

    const targetPage = pageMap[viewName];
    if (targetPage) {
      const currentPath = window.location.pathname;
      const isCurrent = currentPath.endsWith(targetPage) || 
        (targetPage === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html') || currentPath === ''));
      if (!isCurrent) {
        window.location.href = targetPage;
        return;
      }
    }

    // In-page fallback if view container exists
    const views = ['mysteryView', 'evidenceView', 'profileView'];
    views.forEach(v => {
      const el = document.getElementById(v);
      if (el) el.classList.add('hidden');
    });

    const targetEl = document.getElementById(`${viewName}View`);
    if (targetEl) targetEl.classList.remove('hidden');

    // Update active state on nav links
    document.querySelectorAll('.nav-link-btn').forEach(btn => {
      if (btn.dataset.view === viewName) {
        btn.classList.add('text-emerald-400');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('text-emerald-400');
        btn.classList.add('text-slate-400');
      }
    });

    if (viewName === 'mystery' || viewName === 'casemap') {
      setTimeout(() => {
        if (this.pathway && typeof this.pathway.render === 'function') {
          this.pathway.render();
          this.pathway.scrollToActiveStage();
        }
      }, 100);
    } else if (viewName === 'evidence') {
      this.renderEvidenceBoard();
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  handlePathwayStageClick(stage) {
    if (window.gestigoMystery && typeof window.gestigoMystery.dismissToast === "function") {
      window.gestigoMystery.dismissToast();
    }
    if (!stage) return;
    const isUnlocked = this.unlockedStages.includes(stage.id) || stage.id === 1;
    if (!isUnlocked) {
      if (window.gestigoAudio) gestigoAudio.playError();
      const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));
      alert(isBm ? `Tahap ${stage.id} masih terkunci! Selesaikan kes terdahulu untuk membuka tahap ini.` : `Stage ${stage.id} is locked! Solve earlier cases to unlock.`);
      return;
    }

    this.activeStageId = stage.id;
    if (this.pathway) {
      this.pathway.activeStageId = stage.id;
      this.pathway.render();
    }
    if (window.gestigoMystery) {
      gestigoMystery.startStage(stage);
    }
  }

  updateStageHoverCard(stage) {
    const card = document.getElementById('stageHoverCard');
    if (!card) return;

    if (!stage) {
      card.classList.add('hidden');
      return;
    }

    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));
    const stageTitle = (typeof getStageTitle === 'function') ? getStageTitle(stage) : stage.title;
    const stageSub = (isBm && stage.subtitleBm) ? stage.subtitleBm : stage.subtitle;

    card.classList.remove('hidden');
    document.getElementById('hoverStageNum').textContent = stage.isBoss 
      ? (isBm ? `TAHAP BOSS ${stage.id}` : `BOSS STAGE ${stage.id}`) 
      : (isBm ? `TAHAP ${stage.id}` : `STAGE ${stage.id}`);
    document.getElementById('hoverStageTitle').textContent = stageTitle;
    document.getElementById('hoverStageSub').textContent = stageSub;
    document.getElementById('hoverStageXp').textContent = `+${stage.xp} XP`;
    
    const playBtn = document.getElementById('hoverLaunchBtn');
    if (playBtn) {
      const btnText = stage.unlocked 
        ? (isBm ? "Siasat Tempat Kejadian →" : "Investigate Crime Scene →") 
        : (isBm ? "Terkunci 🔒" : "Locked 🔒");
      playBtn.textContent = btnText;
      playBtn.className = stage.unlocked ? "btn-primary w-full justify-center text-xs" : "btn-secondary w-full justify-center text-xs opacity-50 cursor-not-allowed";
      playBtn.onclick = () => {
        if (stage.unlocked) {
          this.handlePathwayStageClick(stage);
        }
      };
    }
  }

    isLevel3Unlocked() {
    const isDev = (typeof window !== 'undefined' && window.location && (window.location.search.includes('dev=1') || window.location.search.includes('open3d=1')));
    return isDev || !!(this.completedStages && this.completedStages[20]) || (this.unlockedStages && this.unlockedStages.includes(21));
  }

  resetProgress() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('gestigo_unlocked');
      localStorage.removeItem('gestigo_completed');
      localStorage.removeItem('gestigo_xp');
      localStorage.removeItem('gestigo_clues');
      localStorage.removeItem('gestigo_level3_alibis');
      localStorage.removeItem('gestigo_level3_asked');
      localStorage.removeItem('gestigo_level3_clues');
      localStorage.removeItem('gestigo_level3_recovered_book');
    }
    this.unlockedStages = [1];
    this.completedStages = {};
    this.xp = 0;
    this.unlockedClues = [];
    if (this.pathway) {
      this.pathway.unlockedStages = [1];
      this.pathway.completedStages = {};
      this.pathway.render();
    }
    this.updateUserStatsUI();
    console.log("Progression reset: Only Stage 1 unlocked.");
  }

  unlockAllStages() {
    this.unlockedStages = Array.from({length: 30}, (_, i) => i + 1);
    for (let i = 1; i <= 20; i++) this.completedStages[i] = 3;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('gestigo_unlocked', JSON.stringify(this.unlockedStages));
      localStorage.setItem('gestigo_completed', JSON.stringify(this.completedStages));
    }
    if (this.pathway) {
      this.pathway.unlockedStages = this.unlockedStages;
      this.pathway.completedStages = this.completedStages;
      this.pathway.render();
    }
    this.updateUserStatsUI();
    console.log("All stages unlocked for testing.");
  }

  completeStage(stageId, stars, xpReward, clue) {
    this.xp += xpReward;
    this.completedStages[stageId] = Math.max(this.completedStages[stageId] || 0, stars);

    // Unlock next stage if exists
    const nextId = stageId + 1;
    if (nextId <= 30 && !this.unlockedStages.includes(nextId)) {
      this.unlockedStages.push(nextId);
    }

    // Add clue to evidence board if new
    if (clue && !this.unlockedClues.some(c => c.name === clue.name)) {
      this.unlockedClues.push(clue);
    }

    // Save to localStorage
    localStorage.setItem('gestigo_xp', this.xp.toString());
    localStorage.setItem('gestigo_unlocked', JSON.stringify(this.unlockedStages));
    localStorage.setItem('gestigo_completed', JSON.stringify(this.completedStages));
    localStorage.setItem('gestigo_clues', JSON.stringify(this.unlockedClues));

    // Update pathway safely
    if (this.pathway) {
      this.pathway.unlockedStages = this.unlockedStages;
      this.pathway.completedStages = this.completedStages;
      if (typeof this.pathway.layoutAllStages === 'function') this.pathway.layoutAllStages();
      if (typeof this.pathway.render === 'function') this.pathway.render();
    }

    this.updateUserStatsUI();
  }

  updateUserStatsUI() {
    // XP and Rank
    const rankFn = (typeof getRankForXp === 'function') 
      ? getRankForXp 
      : ((typeof window !== 'undefined' && window.getRankForXp) ? window.getRankForXp : function() { return { title: 'Junior Gumshoe', color: '#22c55e' }; });
    const rank = rankFn(this.xp);
    
    document.querySelectorAll('.user-xp-display').forEach(el => el.textContent = `${this.xp} XP`);
    document.querySelectorAll('.user-rank-display').forEach(el => {
      el.textContent = rank.title;
      el.style.color = rank.color;
    });

    // Stars count
    let totalStars = 0;
    Object.values(this.completedStages).forEach(s => totalStars += s);
    document.querySelectorAll('.user-stars-display').forEach(el => el.textContent = totalStars);

    // Clues count
    document.querySelectorAll('.user-clues-display').forEach(el => el.textContent = this.unlockedClues.length);

    // Gio Memory Gauge in header
    if (window.gestigoJournal) {
      gestigoJournal.updateHeaderMemory();
    }

    // Update ID elements on profile.html
    const rankEl = document.getElementById('playerRankDisplay');
    if (rankEl) {
      rankEl.textContent = rank.title;
      rankEl.style.color = rank.color;
    }
    const starsEl = document.getElementById('playerStarsDisplay');
    if (starsEl) {
      starsEl.textContent = `${totalStars} ★`;
    }
  }

  // Alias for profile.html compatibility
  updateStatsUi() {
    return this.updateUserStatsUI();
  }

  renderEvidenceBoard() {
    const container = document.getElementById('evidenceGrid');
    if (!container) return;

    const isBm = (window.gestigoI18n && (window.gestigoI18n.currentLang === 'bm' || window.gestigoI18n.currentLang === 'ms'));

    container.innerHTML = '';
    if (this.unlockedClues.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12 text-slate-500">
          <i data-lucide="folder-search" class="w-12 h-12 mx-auto mb-3 opacity-40"></i>
          <p class="text-sm">${isBm ? 'Tiada bukti forensik dijumpai lagi. Selesaikan kes untuk kumpul bahan bukti!' : 'No forensic evidence collected yet. Play to uncover case clues!'}</p>
        </div>
      `;
      return;
    }

    this.unlockedClues.forEach((clue, idx) => {
      const clueName = (typeof getClueName === 'function') ? getClueName(clue) : clue.name;
      const clueDesc = (typeof getClueDesc === 'function') ? getClueDesc(clue) : clue.desc;

      const pin = document.createElement('div');
      pin.className = "clue-pin shadow-xl";
      pin.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
            ${isBm ? 'Bahan Bukti' : 'Evidence Item'} #${idx + 1}
          </span>
          <span class="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"></span>
        </div>
        <h4 class="text-sm font-bold text-white mb-1">${clueName}</h4>
        <p class="text-xs text-slate-300 leading-relaxed">${clueDesc}</p>
        <div class="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-emerald-400 font-mono">
          <span>${isBm ? 'BUKTI DISAHKAN' : 'SECURED FORENSICS'}</span>
          <span>✓ ${isBm ? 'TERTUTUP' : 'VERIFIED'}</span>
        </div>
      `;
      container.appendChild(pin);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  toggleSound() {
    const isMuted = gestigoAudio.toggleMute();
    const btn = document.getElementById('soundToggleBtn');
    if (btn) {
      btn.innerHTML = isMuted 
        ? `<i data-lucide="volume-x" class="w-4 h-4 text-slate-400"></i>`
        : `<i data-lucide="volume-2" class="w-4 h-4 text-emerald-400"></i>`;
      if (window.lucide) window.lucide.createIcons();
    }
  }
}

const gestigoApp = new GestigoApp();
window.gestigoApp = gestigoApp;
window.GESTIGO_PROLOGUE_SLIDES = GESTIGO_PROLOGUE_SLIDES;

// Resilient Initialization (Guaranteed to execute immediately whether DOM is ready or already loaded)
function initGestigoMaster() {
  if (window.__gestigoAppInitialized) return;
  window.__gestigoAppInitialized = true;
  gestigoApp.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGestigoMaster);
} else {
  initGestigoMaster();
}

// Fallback timeout to guarantee execution even in unusual embedding contexts
setTimeout(initGestigoMaster, 100);
