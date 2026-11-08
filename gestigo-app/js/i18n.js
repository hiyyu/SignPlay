// ==========================================================================
// Gestigo - Bilingual Engine (English & Bahasa Melayu)
// GESTIGO: The Mystery of the Missing Signs
// Setting: Luma City • 3 Levels • 30 Stages • 1 Connected Mystery
// Partner: Gio, Detective-in-Training & Museum Assistant
// ==========================================================================

const GESTIGO_I18N = {
  en: {
    appName: "GESTIGO",
    appTagline: "THE MYSTERY OF THE MISSING SIGNS",
    navMap: "Case Map",
    navStory: "Story",
    navJournal: "Journal",
    navEvidence: "Evidence",
    navDossier: "Dossier",
    replayPrologueBtn: "Story Prologue",
    xpLabel: "XP",
    itemsLabel: "Items",
    keepGoing: "Keep going",
    investigateBtn: "Investigate Mission →",
    lockedBtn: "Locked 🔒",
    caseSolved: "MISSION SOLVED",
    stageComplete: "Stage Completed",
    proceedBtn: "Proceed to Next Stage →",
    inventoryTitle: "EVIDENCE INVENTORY",
    leadInvestigator: "LEAD INVESTIGATOR",
    detectivePartner: "DETECTIVE PARTNER",
    onSceneForensics: "Luma City Forensics",
    consultClue: "Consult Detective Clue",
    countdown: "COUNTDOWN:",
    cipherTarget: "TARGET ASL SIGN:",
    detected: "DETECTED:",
    searchingHand: "Searching hand / camera...",
    matchScore: "ACCURACY",
    quickInputLabel: "RAPID EVIDENCE INPUT (Tap to sign):",
    toggleCam: "Toggle Camera Vision",
    enableCamPrompt: "WebCam Vision Scanner",
    enableCamBtn: "Activate WebCam",
    camSubtitle: "Show face & hand gestures to communicate and solve clues",
    povSceneTitle: "FIRST-PERSON MYSTERY POV",
    clickInspect: "Click to inspect evidence",
    rankRookie: "Rookie Sleuth",
    rankGumshoe: "Junior Gumshoe",
    rankInspector: "Field Inspector",
    rankChief: "Chief Detective",
    rankMaster: "Master Sleuth",
    
    // Header & Module Metadata (Luma City Storyline)
    module1Tag: "LEVEL 1 • THE FIRST CLUE (STAGES 1–10)",
    module1Title: "The Story Museum: The Missing Memory Book",
    module1Subtitle: "Team up with your partner Gio to investigate the vanished Memory Book and decode the trail of clues left in sign language.",
    
    level1Title: "LEVEL 1: THE FIRST CLUE (STAGES 1–10)",
    level1Subtitle: "Foundations • The Story Museum • Uncover who left the mysterious purple envelope.",
    level2Title: "LEVEL 2: THE CITY OF SECRETS (STAGES 11–20)",
    level2Subtitle: "Everyday Interactions • Explore Luma City • Follow suspicious clues to uncover why the book was safeguarded.",
    level3Title: "LEVEL 3: THE FINAL TRUTH (STAGES 21–30)",
    level3Subtitle: "Conversation & Culture • The Hidden Archive • Discover why the book was hidden and restore authentic Deaf stories.",
    
    // Detective Journal
    journalTitle: "Gio's Detective Journal",
    journalSub: "Forensic evidence, verified clues, and suspect dossiers.",
    tabKeys: "Keys & Archive Clues",
    tabClues: "Case Clues",
    tabSuspects: "Persons of Interest",
    tabVocab: "Sign Vocabulary",
    tabCinematics: "Story Cinematics",
    gioMemoryStatus: "Case Investigation Progress:",
    recoveredKeysTitle: "Preservation Keys Recovered:",
    key1Name: "The First Key (Key of Doors)",
    key1Desc: "Unlocks the museum's hidden subterranean corridor.",
    key2Name: "The Second Key (Key of Memory)",
    key2Desc: "Decodes the encrypted security transit recordings.",
    key3Name: "The Third Key (Key of Restoration)",
    key3Desc: "Restores the Memory Book's authentic signed stories to Luma City.",
    
    // Cinematics
    watchCinematicBtn: "Watch Story Cinematic →",
    continueAdventureBtn: "Continue the Investigation →",
    theoryPromptTitle: "MYSTERY DEDUCTION • GIO'S INQUIRY",
    evidenceLockerTitle: "Luma City Evidence Locker",
    evidenceLockerSub: "Recovered artifacts, receipts, notes, and keys from solved cases.",
    dossierTitle: "Lead Investigator & Detective Gio",
    dossierSub: "Luma City Silent Cipher Task Force • Master Sleuth Division",
    rankStanding: "Rank Standing",
    totalXp: "Total Experience",
    totalStars: "Total Stars",

    uvFilterOn: "UV Light: ON",
    uvFilterOff: "UV Light: OFF",
    magnifierTitle: "Evidence Inspection",
    evidenceInspectHint: "Click any inventory evidence below to examine forensic findings."
  },
  bm: {
    appName: "GESTIGO",
    appTagline: "MISTERI ISYARAT YANG HILANG",
    navMap: "Peta Kes",
    navStory: "Kisah",
    navJournal: "Jurnal",
    navEvidence: "Bilik Bukti",
    navDossier: "Profil",
    replayPrologueBtn: "Prolog Kisah",
    xpLabel: "XP",
    itemsLabel: "Item",
    keepGoing: "Teruskan",
    investigateBtn: "Siasat Misi →",
    lockedBtn: "Terkunci 🔒",
    caseSolved: "MISI SELESAI",
    stageComplete: "Tahap Selesai",
    proceedBtn: "Teruskan ke Tahap Seterusnya →",
    inventoryTitle: "INVENTORI BUKTI",
    leadInvestigator: "KETUA PENYIASAT",
    detectivePartner: "RAKAN DETEKTIF",
    onSceneForensics: "Forensik Bandar Luma",
    consultClue: "Rujuk Petunjuk Detektif",
    countdown: "MASA TINGGAL:",
    cipherTarget: "ISYARAT ASL SASARAN:",
    detected: "DIKESAN:",
    searchingHand: "Mengimbas tangan / kamera...",
    matchScore: "KETEPATAN",
    quickInputLabel: "INPUT PANTAS BUKTI (Ketik untuk berisyarat):",
    toggleCam: "Togol Kamera Penglihatan",
    enableCamPrompt: "Pengimbas Kamera AI",
    enableCamBtn: "Aktifkan Kamera",
    camSubtitle: "Tunjukkan wajah & isyarat tangan untuk berkomunikasi dan merungkai petunjuk",
    povSceneTitle: "SUDUT PANDANGAN (POV) MISTERI",
    clickInspect: "Ketik untuk siasat bahan bukti",
    rankRookie: "Detektif Pelatih",
    rankGumshoe: "Detektif Muda",
    rankInspector: "Inspektor Forensik",
    rankChief: "Ketua Detektif",
    rankMaster: "Detektif Pakar",
    
    // Header & Module Metadata (Luma City Storyline)
    module1Tag: "TAHAP 1 • PETUNJUK PERTAMA (PERINGKAT 1–10)",
    module1Title: "Muzium Cerita: Kehilangan Buku Memori",
    module1Subtitle: "Berganding bahu bersama rakan anda Gio untuk menyiasat kehilangan Buku Memori dan menyahsulit petunjuk bahasa isyarat.",
    
    level1Title: "TAHAP 1: PETUNJUK PERTAMA (PERINGKAT 1–10)",
    level1Subtitle: "Asas Isyarat • Muzium Cerita • Rungkai siapa yang meninggalkan sampul ungu misteri.",
    level2Title: "TAHAP 2: BANDAR BERAHSIA (PERINGKAT 11–20)",
    level2Subtitle: "Interaksi Seharian • Meneroka Bandar Luma • Jejak bukti mencurigakan untuk membongkar mengapa buku dilindungi.",
    level3Title: "TAHAP 3: KEBENARAN HAKIKI (PERINGKAT 21–30)",
    level3Subtitle: "Kefasihan & Budaya • Arkib Tersembunyi • Ketahui mengapa buku itu disembunyikan dan pulihkan cerita asli komuniti.",
    
    // Detective Journal
    journalTitle: "Jurnal Detektif Gio",
    journalSub: "Bahan bukti forensik, petunjuk disahkan, dan fail suspek.",
    tabKeys: "Kunci & Petunjuk Arkib",
    tabClues: "Bahan Bukti",
    tabSuspects: "Individu Berkaitan",
    tabVocab: "Glosari Isyarat",
    tabCinematics: "Sinematik Kisah",
    gioMemoryStatus: "Kemajuan Siasatan Kes:",
    recoveredKeysTitle: "Kunci Pemulihan Diperolehi:",
    key1Name: "Kunci Pertama (Kunci Pintu)",
    key1Desc: "Membuka koridor bawah tanah tersembunyi muzium.",
    key2Name: "Kunci Kedua (Kunci Memori)",
    key2Desc: "Membuka rakaman keselamatan transit yang disulitkan.",
    key3Name: "Kunci Ketiga (Kunci Pemulihan)",
    key3Desc: "Mengembalikan cerita bahasa isyarat asli Buku Memori kepada warga Luma.",
    
    // Cinematics
    watchCinematicBtn: "Tonton Sinematik Kisah →",
    continueAdventureBtn: "Teruskan Siasatan →",
    theoryPromptTitle: "DEDUKSI MISTERI • SOALAN GIO",
    evidenceLockerTitle: "Bilik Bukti Forensik Bandar Luma",
    evidenceLockerSub: "Artifak, resit, nota, dan kunci dari kes yang telah diselesaikan.",
    dossierTitle: "Ketua Penyiasat & Detektif Gio",
    dossierSub: "Skuad Khas Bahasa Isyarat Bandar Luma • Bahagian Detektif Pakar",
    rankStanding: "Pangkat Semasa",
    totalXp: "Jumlah Pengalaman",
    totalStars: "Jumlah Bintang",

    uvFilterOn: "Lampu UV: HIDUP",
    uvFilterOff: "Lampu UV: PADAM",
    magnifierTitle: "Pemeriksaan Forensik",
    evidenceInspectHint: "Ketik mana-mana bahan bukti di bawah untuk memeriksa penemuan forensik."
  }
};

class GestigoI18n {
  constructor() {
    this.currentLang = localStorage.getItem('gestigo_lang') || 'en';
  }

  setLanguage(lang) {
    if (lang !== 'en' && lang !== 'bm') lang = 'en';
    this.currentLang = lang;
    localStorage.setItem('gestigo_lang', lang);
    this.updateDom();
    
    // Also re-render pathway, journal, and active prologue if available
    if (window.gestigoApp) {
      if (window.gestigoApp.pathway) window.gestigoApp.pathway.render();
      if (window.gestigoJournal) window.gestigoJournal.updateHeaderMemory();
      if (window.gestigoApp.currentView === 'profile') window.gestigoApp.renderProfileDossier();
      const prologueModal = document.getElementById('storyPrologueModal');
      if (prologueModal && !prologueModal.classList.contains('hidden')) {
        window.gestigoApp.renderPrologueSlide();
      }
    }
  }

  toggleLanguage() {
    const nextLang = this.currentLang === 'en' ? 'bm' : 'en';
    this.setLanguage(nextLang);
    return this.currentLang;
  }

  toggleLang() {
    return this.toggleLanguage();
  }

  applyTranslations() {
    return this.updateDom();
  }

  t(key, fallback = "") {
    const dict = GESTIGO_I18N[this.currentLang] || GESTIGO_I18N.en;
    if (dict[key]) return dict[key];
    if (GESTIGO_I18N.en[key]) return GESTIGO_I18N.en[key];
    return fallback || key;
  }

  updateDom() {
    // 1. Update elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (val) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // 2. Update language toggle button text
    const langBtnText = document.getElementById('langToggleText');
    if (langBtnText) {
      langBtnText.textContent = this.currentLang.toUpperCase();
    }
  }
}

// Global Singleton Instance
const gestigoI18n = new GestigoI18n();

// Explicit Global Export
(function() {
  var g = (typeof window !== 'undefined') ? window : (typeof globalThis !== 'undefined' ? globalThis : (typeof global !== 'undefined' ? global : {}));
  g.GESTIGO_I18N = GESTIGO_I18N;
  g.gestigoI18n = gestigoI18n;
})();
