/**
 * IsyaratHero / SignBridge - Configuration & American Sign Language (ASL) Vocabulary
 * Grounded in official visual reference illustrations (Signs Everyone Should Know).
 */

import { i18n } from "./i18n.js";

export const ASL_STAGES = {
  BEGINNER: {
    id: "beginner",
    title_en: "Stage 1: Beginner Essentials",
    title_ms: "Tahap 1: Asas Permulaan",
    desc_en: "Essential greetings, confirmation, and emergency gestures.",
    desc_ms: "Ucapan asas, pengesahan, dan isyarat kecemasan harian.",
    signs: ["HELLO", "YES", "NO", "THANK_YOU", "HELP", "ILY"]
  },
  INTERMEDIATE: {
    id: "intermediate",
    title_en: "Stage 2: Daily Needs & Actions",
    title_ms: "Tahap 2: Keperluan & Tindakan Harian",
    desc_en: "Practical everyday requests, food, and social courtesy.",
    desc_ms: "Permintaan harian praktikal, makanan, dan kesopanan sosial.",
    signs: ["PLEASE", "SORRY", "STOP", "EAT", "DRINK", "MORE", "BATHROOM"]
  },
  ADVANCED: {
    id: "advanced",
    title_en: "Stage 3: Inquiries & Conversations",
    title_ms: "Tahap 3: Pertanyaan & Perbualan",
    desc_en: "Question words, identity phrasing, and conversational expression.",
    desc_ms: "Kata tanya, pengenalan diri, dan ekspresi perbualan.",
    signs: ["PAIN", "WHERE", "WHAT", "HOW", "WHEN", "MY_NAME_IS"]
  }
};

export const ASL_SIGNS = {
  // === STAGE 1: BEGINNER ===
  "HELLO": {
    code: "HELLO",
    stage: "beginner",
    image: "assets/signs/hello.png",
    label_en: "Hello / Greet",
    label_ms: "Helo / Salam",
    category_en: "Greeting",
    category_ms: "Ucapan",
    description_en: "Open hand starting near the temple/forehead and extending forward in a warm salute.",
    description_ms: "Buka tapak tangan berhampiran dahi dan gerakkan ke hadapan seperti tabik hormat.",
    tip_en: "Keep palm facing forward with all four fingers neatly together.",
    tip_ms: "Pastikan tapak tangan menghadap ke hadapan dengan semua jari rapat."
  },
  "YES": {
    code: "YES",
    stage: "beginner",
    image: "assets/signs/yes.png",
    label_en: "Yes / Affirmation",
    label_ms: "Ya / Pengesahan",
    category_en: "Response",
    category_ms: "Jawapan",
    description_en: "Form a solid closed fist and nod it downward repeatedly from the wrist, like a nodding head.",
    description_ms: "Genggam tangan kemas dan anggukkan ke bawah dari pergelangan tangan seperti mengangguk kepala.",
    tip_en: "Keep your knuckles facing forward and pivot smoothly at the wrist.",
    tip_ms: "Pastikan buku lima menghadap hadapan dan gerakkan pergelangan tangan ke bawah."
  },
  "NO": {
    code: "NO",
    stage: "beginner",
    image: "assets/signs/no.png",
    label_en: "No / Negative",
    label_ms: "Tidak / Penolakan",
    category_en: "Response",
    category_ms: "Jawapan",
    description_en: "Snap the index and middle fingers down cleanly to tap against the extended thumb.",
    description_ms: "Rapatkan jari telunjuk dan jari tengah ke bawah untuk menyentuh ibu jari dengan pantas.",
    tip_en: "Keep ring and pinky fingers curled in. Snap index and middle down to meet the thumb.",
    tip_ms: "Lipat jari manis dan kelengkeng; temukan telunjuk dan tengah ke ibu jari."
  },
  "THANK_YOU": {
    code: "THANK_YOU",
    stage: "beginner",
    image: "assets/signs/thank_you.png",
    label_en: "Thank You",
    label_ms: "Terima Kasih",
    category_en: "Courtesy",
    category_ms: "Kesopanan",
    description_en: "Touch fingertips of flat hand to your chin or lips, then move outward toward the person.",
    description_ms: "Sentuh hujung jari tangan rata ke dagu/bibir, kemudian gerakkan ke hadapan ke arah penerima.",
    tip_en: "Start with hand flat near mouth level and extend outward with palm facing upward/forward.",
    tip_ms: "Mulakan tangan rata berhampiran bibir dan tolak ke hadapan dengan tapak tangan terbuka."
  },
  "HELP": {
    code: "HELP",
    stage: "beginner",
    image: "assets/signs/help.png",
    label_en: "Help / Assist",
    label_ms: "Tolong / Bantuan",
    category_en: "Emergency",
    category_ms: "Kecemasan",
    description_en: "Place a closed fist with thumb up onto a flat palm, and lift both hands together upward.",
    description_ms: "Letakkan genggaman penumbuk (ibu jari tegak) di atas tapak tangan satu lagi dan angkat ke atas.",
    tip_en: "Form a thumbs-up fist held firmly in front of chest or resting on palm.",
    tip_ms: "Genggam penumbuk dengan ibu jari tegak di hadapan dada."
  },
  "ILY": {
    code: "ILY",
    stage: "beginner",
    image: "assets/signs/ily.png",
    label_en: "I Love You",
    label_ms: "Saya Sayang Kamu",
    category_en: "Expression",
    category_ms: "Ekspresi",
    description_en: "Extend thumb, index, and pinky fingers upright simultaneously while keeping middle and ring curled.",
    description_ms: "Luruskan ibu jari, telunjuk, dan kelengkeng serentak; lipat kemas jari tengah dan manis.",
    tip_en: "Spread your thumb wide and keep index and pinky pointing straight up towards the ceiling.",
    tip_ms: "Buka ibu jari luas dan pastikan jari telunjuk serta kelengkeng tegak lurus."
  },

  // === STAGE 2: INTERMEDIATE ===
  "PLEASE": {
    code: "PLEASE",
    stage: "intermediate",
    image: "assets/signs/please.png",
    label_en: "Please",
    label_ms: "Sila / Tolonglah",
    category_en: "Courtesy",
    category_ms: "Kesopanan",
    description_en: "Place flat open hand over your chest and rub in a gentle clockwise circular motion.",
    description_ms: "Letakkan tapak tangan terbuka di atas dada dan pusingkan mengikut arah jam.",
    tip_en: "Fingers extended together, palm touching chest with circular motion.",
    tip_ms: "Rapatkan semua jari, letak pada dada dan pusing membulat secara santai."
  },
  "SORRY": {
    code: "SORRY",
    stage: "intermediate",
    image: "assets/signs/sorry.png",
    label_en: "Sorry / Apology",
    label_ms: "Maaf",
    category_en: "Courtesy",
    category_ms: "Kesopanan",
    description_en: "Make a closed fist (ASL 'A') and rub it in a circular motion over your heart/chest.",
    description_ms: "Genggam penumbuk (huruf A) dan gosok secara membulat di bahagian dada/jantung.",
    tip_en: "Keep knuckles facing outward as the fist circles your chest.",
    tip_ms: "Pastikan buku lima menghadap luar semasa menggerakkan penumbuk membulat."
  },
  "STOP": {
    code: "STOP",
    stage: "intermediate",
    image: "assets/signs/stop.png",
    label_en: "Stop / Halt",
    label_ms: "Berhenti",
    category_en: "Action",
    category_ms: "Tindakan",
    description_en: "Bring the edge of one flat hand down sharply like a blade onto the flat open palm of the other.",
    description_ms: "Bawa sisi tangan rata turun secara tegas seperti pisau ke atas tapak tangan sebelah lagi.",
    tip_en: "Active hand held flat vertically with fingers together, chopping down firmly.",
    tip_ms: "Tegakkan tangan secara mendatar dan lakukan gerakan memotong yang tegas."
  },
  "EAT": {
    code: "EAT",
    stage: "intermediate",
    image: "assets/signs/eat.png",
    label_en: "Eat / Food",
    label_ms: "Makan / Makanan",
    category_en: "Daily Needs",
    category_ms: "Keperluan",
    description_en: "Bring all fingertips together to touch the thumb (flat-O shape) and tap gently against lips.",
    description_ms: "Kumpulkan semua hujung jari menyentuh ibu jari dan sentuh bibir secara lembut.",
    tip_en: "Keep hand near mouth level with fingertips clustered together.",
    tip_ms: "Kumpulkan semua jari menyentuh ibu jari berhampiran paras mulut."
  },
  "DRINK": {
    code: "DRINK",
    stage: "intermediate",
    image: "assets/signs/drink.png",
    label_en: "Drink / Water",
    label_ms: "Minum / Air",
    category_en: "Daily Needs",
    category_ms: "Keperluan",
    description_en: "Form a C-shape hand as if holding a cup, and tilt it upward toward your mouth.",
    description_ms: "Bentuk tangan huruf C seolah-olah memegang cawan dan condongkan ke arah mulut.",
    tip_en: "Curve all fingers and thumb into a clear cup silhouette and tilt up.",
    tip_ms: "Lengkungkan jari membentuk siluet cawan dan condongkan ke mulut."
  },
  "MORE": {
    code: "MORE",
    stage: "intermediate",
    image: "assets/signs/more.png",
    label_en: "More / Additional",
    label_ms: "Lagi / Tambah",
    category_en: "Daily Needs",
    category_ms: "Keperluan",
    description_en: "Form both hands into flat-O shapes (fingertips touching thumbs) and tap fingertips together.",
    description_ms: "Bentuk kedua-dua tangan seperti kuncup bunga dan temukan hujung jari berulang kali.",
    tip_en: "Cluster fingertips together and bring both hands together in front of chest.",
    tip_ms: "Kuncupkan hujung jari dan temukan kedua-dua belah tangan di hadapan dada."
  },
  "BATHROOM": {
    code: "BATHROOM",
    stage: "intermediate",
    image: "assets/signs/bathroom.png",
    label_en: "Bathroom / Restroom",
    label_ms: "Tandas / Bilik Air",
    category_en: "Daily Needs",
    category_ms: "Keperluan",
    description_en: "Form an ASL 'T' fist (thumb tucked under index finger) and shake hand side-to-side.",
    description_ms: "Bentuk penumbuk huruf T (ibu jari di bawah jari telunjuk) dan goyangkan ke kiri dan kanan.",
    tip_en: "Tuck thumb between index and middle fingers, then shake gently side to side.",
    tip_ms: "Selitkan ibu jari antara telunjuk dan tengah, kemudian goyangkan perlahan."
  },

  // === STAGE 3: ADVANCED ===
  "PAIN": {
    code: "PAIN",
    stage: "advanced",
    image: "assets/signs/pain.png",
    label_en: "Pain / Hurt",
    label_ms: "Sakit / Cedera",
    category_en: "Medical",
    category_ms: "Perubatan",
    description_en: "Extend both index fingers and twist them inward toward each other without touching.",
    description_ms: "Luruskan kedua-dua jari telunjuk dan halakan hujungnya bertentangan sambil memusingkannya.",
    tip_en: "Point index fingers directly towards each other, twisting at wrists near location of pain.",
    tip_ms: "Halakan kedua-dua telunjuk bertentangan dengan jari lain digenggam."
  },
  "WHERE": {
    code: "WHERE",
    stage: "advanced",
    image: "assets/signs/where.png",
    label_en: "Where / Location",
    label_ms: "Di Mana / Lokasi",
    category_en: "Question",
    category_ms: "Pertanyaan",
    description_en: "Extend index finger straight up with palm facing forward, and wag the finger side-to-side.",
    description_ms: "Tegakkan jari telunjuk ke atas dan goyangkan ke kiri dan kanan seperti mencari arah.",
    tip_en: "Keep single index finger pointing up, waving it left and right gently.",
    tip_ms: "Tegakkan hanya jari telunjuk dan goyangkan ke kiri dan kanan."
  },
  "WHAT": {
    code: "WHAT",
    stage: "advanced",
    image: "assets/signs/what.png",
    label_en: "What / Inquiry",
    label_ms: "Apa / Pertanyaan",
    category_en: "Question",
    category_ms: "Pertanyaan",
    description_en: "Hold both hands in front with palms facing upward and shake them gently side-to-side.",
    description_ms: "Buka kedua-dua tapak tangan menghadap ke atas di hadapan dada dan goyangkan santai.",
    tip_en: "Palms facing up at chest height, fingers naturally open, shaking side-to-side.",
    tip_ms: "Tapak tangan menghadap ke atas pada paras dada, gerakkan ke kiri kanan."
  },
  "HOW": {
    code: "HOW",
    stage: "advanced",
    image: "assets/signs/how.png",
    label_en: "How / Manner",
    label_ms: "Bagaimana / Cara",
    category_en: "Question",
    category_ms: "Pertanyaan",
    description_en: "Place curved hands knuckles together facing down, then roll palms outward and upward.",
    description_ms: "Temukan bahagian belakang jari melengkung ke bawah, kemudian putarkan tapak tangan ke atas.",
    tip_en: "Knuckles touch pointing downward, then pivot hands outward so palms face up.",
    tip_ms: "Mulakan dengan buku jari bersentuh ke bawah, kemudian putar tapak tangan ke atas."
  },
  "WHEN": {
    code: "WHEN",
    stage: "advanced",
    image: "assets/signs/when.png",
    label_en: "When / Time",
    label_ms: "Bila / Masa",
    category_en: "Question",
    category_ms: "Pertanyaan",
    description_en: "Hold non-dominant index upright; circle dominant index around it and tap its tip, like a clock hand.",
    description_ms: "Tegakkan telunjuk bukan dominan; buat bulatan dengan telunjuk sebelah lagi seperti jarum jam.",
    tip_en: "Circle your index finger around the target finger tip once, tapping down at the end.",
    tip_ms: "Pusingkan jari telunjuk membentuk bulatan jam dan sentuh hujung jari bertentangan."
  },
  "MY_NAME_IS": {
    code: "MY_NAME_IS",
    stage: "advanced",
    image: "assets/signs/my_name_is.png",
    label_en: "My Name Is",
    label_ms: "Nama Saya",
    category_en: "Identity",
    category_ms: "Pengenalan",
    description_en: "Place flat open hand on chest (MY), then cross index and middle fingers of both hands tapping twice (NAME).",
    description_ms: "Letakkan tangan rata di dada (SAYA), kemudian ketuk jari telunjuk dan tengah kedua belah tangan (NAMA).",
    tip_en: "Touch chest with flat palm, followed by tapping index and middle fingers together.",
    tip_ms: "Sentuh dada dengan tapak tangan rata, kemudian ketuk jari telunjuk dan tengah."
  }
};

/**
 * Returns localized sign object based on current language
 */
export function getSign(code) {
  const s = ASL_SIGNS[code];
  if (!s) return null;
  const isEn = i18n.lang === "en";
  return {
    code: s.code,
    stage: s.stage,
    image: s.image,
    label: isEn ? s.label_en : s.label_ms,
    category: isEn ? s.category_en : s.category_ms,
    description: isEn ? s.description_en : s.description_ms,
    tip: isEn ? s.tip_en : s.tip_ms
  };
}

/**
 * Mystery Game Storyline: "The Silent Detective"
 */
export const MYSTERY_CASE = {
  id: "case_01",
  title_en: "Case #01: The Whispering Gallery Heist",
  title_ms: "Kes #01: Misteri Galeri Bisik",
  subtitle_en: "An interactive sign-language forensic investigation",
  subtitle_ms: "Siasatan forensik interaktif menggunakan bahasa isyarat",
  totalSteps: 5,
  steps: [
    {
      step: 1,
      targetSign: "HELLO",
      title_en: "Scene 1: The Midnight Intercom",
      title_ms: "Babak 1: Interkom Tengah Malam",
      briefing_en: "You have arrived outside the underground forensic archive. The digital door scanner requires the secret security greeting to grant entrance.",
      briefing_ms: "Anda tiba di arkib forensik bawah tanah. Pengimbas pintu memerlukan isyarat salam keselamatan untuk membuka akses.",
      dialogue_en: "System Prompt: 'Identity verification required. Please perform the official ASL Greeting before the security camera.'",
      dialogue_ms: "Arahan Sistem: 'Pengesahan identiti diperlukan. Sila lakukan isyarat Salam ASL di hadapan kamera keselamatan.'",
      clue_en: "Sign 'HELLO' firmly into the scanner camera to unlock the blast door.",
      clue_ms: "Tunjukkan isyarat 'HELLO' secara jelas ke kamera untuk membuka pintu kebal.",
      successDialogue_en: "BEEP! 'Access Granted. Welcome, Detective Alex.' The heavy titanium doors slide open.",
      successDialogue_ms: "BIP! 'Akses Diterima. Selamat datang, Detektif Alex.' Pintu titanium terbuka luas."
    },
    {
      step: 2,
      targetSign: "HELP",
      title_en: "Scene 2: The Panicked Witness",
      title_ms: "Babak 2: Saksi Yang Panik",
      briefing_en: "Inside, the deaf night guard is trembling in fear behind a overturned desk, unable to speak and terrified after the intruder escaped.",
      briefing_ms: "Di dalam bilik arkib, pengawal keselamatan yang pekak menggigil ketakutan di sebalik meja, tidak mampu bersuara selepas penceroboh melarikan diri.",
      dialogue_en: "Guard's Note: '[Trembling] Who are you?! Are you with the thieves?! Please don't hurt me!'",
      dialogue_ms: "Nota Pengawal: '[Menggigil] Siapa kamu?! Kamu kawan pencuri tu ke?! Tolong jangan cederakan saya!'",
      clue_en: "Calm the guard immediately by communicating 'HELP' in ASL to show you are here to rescue him.",
      clue_ms: "Tenangkan pengawal dengan membuat isyarat 'HELP' (Tolong/Bantuan) untuk membuktikan anda datang menyelamatkannya.",
      successDialogue_en: "The guard sighs with relief: 'Thank heavens... You are the detective! The thief rushed into the vault room!'",
      successDialogue_ms: "Pengawal menghela nafas lega: 'Syukurlah... Awak detektif bantuan! Pencuri itu telah meluru ke bilik kebal!'"
    },
    {
      step: 3,
      targetSign: "YES",
      title_en: "Scene 3: Verifying the Suspect",
      title_ms: "Babak 3: Mengesahkan Suspek",
      briefing_en: "The guard points to a surveillance still showing a shadowy figure in a blue hoodie carrying a duffle bag. He asks you if this matches the suspect profile.",
      briefing_ms: "Pengawal menunjukkan gambar kamera litar tertutup suspek berjaket biru memegang beg hitam. Dia meminta pengesahan daripada anda.",
      dialogue_en: "Guard asks via signs: 'Is this the perpetrator from the headquarters bulletin?'",
      dialogue_ms: "Pengawal bertanya dengan isyarat: 'Adakah ini pelaku yang dicari oleh ibu pejabat?'",
      clue_en: "Affirm the match clearly by signing 'YES' (nodding fist) to the camera.",
      clue_ms: "Sahkan suspek dengan membuat isyarat 'YES' (angguk penumbuk) dengan tegas.",
      successDialogue_en: "'Understood!' nods the guard. 'I am pulling up the vault hallway camera right now.'",
      successDialogue_ms: "'Faham!' angguk pengawal. 'Saya akan buka paparan kamera lorong bilik kebal sekarang.'"
    },
    {
      step: 4,
      targetSign: "STOP",
      title_en: "Scene 4: The Laser Tripwire Countdown",
      title_ms: "Babak 4: Kiraan Detik Penggera Laser",
      briefing_en: "As you step into the vault corridor, the intruder's saboteur tripwire triggers! A red laser barrier activates with a 10-second self-destruct lockdown timer!",
      briefing_ms: "Sebaik melangkah ke koridor bilik kebal, perangkap penceroboh tercetus! Halangan laser merah aktif dengan kiraan detik penguncian kecemasan!",
      dialogue_en: "Emergency AI Siren: 'WARNING: Laser lockdown in progress. Emergency manual gesture override required immediately!'",
      dialogue_ms: "Siren AI Kecemasan: 'AMARAN: Penguncian laser sedang berjalan. Isyarat pintasan kecemasan diperlukan segera!'",
      clue_en: "Execute the emergency 'STOP' gesture (flat chopping hand) before the timer runs out!",
      clue_ms: "Lakukan isyarat kecemasan 'STOP' (tangan rata memotong) sebelum masa tamat!",
      successDialogue_en: "CHIRP! The laser barrier powers down instantly! 'Lockdown aborted. Corridor secure.'",
      successDialogue_ms: "KLIK! Halangan laser terpadam serta-merta! 'Penguncian dibatalkan. Koridor selamat.'"
    },
    {
      step: 5,
      targetSign: "ILY",
      title_en: "Scene 5: The Safe Haven",
      title_ms: "Babak 5: Pelukan Penyelamat",
      briefing_en: "At the end of the vault, you find the museum curator's little daughter hiding in the safe deposit locker, safe from harm. She recognizes ASL and smiles warmly at you.",
      briefing_ms: "Di hujung bilik kebal, anda menemui anak perempuan kurator muzium bersembunyi di dalam loker dengan selamat. Dia tersenyum melihat lencana anda.",
      dialogue_en: "Little Girl: '[Looking up with bright eyes] Are we safe now, Detective?'",
      dialogue_ms: "Kanak-kanak perempuan: '[Memandang dengan mata bersinar] Kita dah selamat ke, Detektif?'",
      clue_en: "Reassure the child with the universal ASL sign for 'I LOVE YOU' (ILY) to conclude the case with heartfelt compassion.",
      clue_ms: "Tenangkan kanak-kanak itu dengan isyarat universal 'I LOVE YOU' (ILY) untuk menamatkan kes dengan penuh kasih sayang.",
      successDialogue_en: "The girl beams with joy and hands you the recovered Golden Cipher! CASE SOLVED!",
      successDialogue_ms: "Kanak-kanak itu tersenyum riang dan menyerahkan Kunci Emas yang diselamatkan! KES BERJAYA DISELESAIKAN!"
    }
  ]
};
