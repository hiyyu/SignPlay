// ==========================================================================
// Gestigo - Master Curriculum & Mystery Case Engine Data (30 Stages)
// GESTIGO: The Mystery of the Missing Signs
// Setting: Luma City • 3 Levels • 30 Stages • 1 Connected Mystery
// Partner: Gio, Detective-in-Training & Museum Assistant
// ==========================================================================

const GESTIGO_LEVELS = [
  {
    id: 1,
    name: "Level 1: The First Clue",
    nameBm: "Tahap 1: Petunjuk Pertama",
    stagesRange: "Stages 1–10 • The Story Museum",
    stagesRangeBm: "Tahap 1–10 • Muzium Cerita",
    focus: "Building core muscle memory, manual alphabet, numbers, and immediate survival vocabulary.",
    focusBm: "Membina memori otot asas, abjad manual, nombor, dan kosa kata asas kelangsungan hidup.",
    color: "#22c55e",
    accent: "from-emerald-500 to-green-600",
    keyUnlocked: "The First Key (Key of Doors)",
    keyUnlockedBm: "Kunci Pertama (Kunci Pintu)",
    cinematicId: "cinematicLevel1"
  },
  {
    id: 2,
    name: "Level 2: The City of Secrets",
    nameBm: "Tahap 2: Bandar Berahsia",
    stagesRange: "Stages 11–20 • Explore Luma City",
    stagesRangeBm: "Tahap 11–20 • Meneroka Bandar Luma",
    focus: "Expanding vocabulary into community spaces, emotions, dining, shopping, and work interactions.",
    focusBm: "Memperluas kosa kata ke ruang komuniti, emosi, perbualan makan, membeli-belah, dan kerjaya.",
    color: "#06b6d4",
    accent: "from-cyan-500 to-blue-600",
    keyUnlocked: "The Second Key (Key of Memory)",
    keyUnlockedBm: "Kunci Kedua (Kunci Memori)",
    cinematicId: "cinematicLevel2"
  },
  {
    id: 3,
    name: "Level 3: The Final Truth",
    nameBm: "Tahap 3: Kebenaran Hakiki",
    stagesRange: "Stages 21–30 • The Hidden Archive",
    stagesRangeBm: "Tahap 21–30 • Arkib Tersembunyi",
    focus: "Advanced grammar, storytelling, spatial markers, classifiers, and the final restorative dialogue.",
    focusBm: "Tatabahasa lanjutan, penceritaan, penanda ruang, pengelas (classifiers), dan dialog pemulihan.",
    color: "#a855f7",
    accent: "from-purple-500 to-pink-600",
    keyUnlocked: "The Third Key (Key of Restoration)",
    keyUnlockedBm: "Kunci Ketiga (Kunci Pemulihan)",
    cinematicId: "cinematicLevel3"
  }
];

const GESTIGO_STORY_CINEMATICS = {
  level1: {
    title: "Level 1 Ending: The Planned Trail of Clues",
    titleBm: "Pengakhiran Tahap 1: Jejak Petunjuk Terancang",
    badge: "KEY UNLOCKED: 1 OF 3 • THE INVESTIGATION DEEPENS",
    badgeBm: "KUNCI DIPEROLEH: 1 DARI 3 • SIASATAN SEMAKIN MENDALAM",
    artwork: "assets/pov-crime-scene.png",
    paragraphs: [
      "Museum volunteer Maya smiles warmly and hands over an ornate brass key: 'You decoded the fingerspelling cipher! Someone entrusted me to pass this key only to detectives who truly take the time to learn our signs.'",
      "She hands you a map of Luma City with several meeting points marked: Moon Café, the Community Hospital, and Central Library. The envelope reads: \"The first key unlocks the museum transit corridor. The second key reveals why the book was hidden.\"",
      "Gio's eyes light up with enthusiasm: 'A planned trail of clues?! Partner, that means whoever moved the Memory Book didn't steal it for greed—they wanted someone who truly respects sign language to find it! Let's explore the city!'"
    ],
    paragraphsBm: [
      "Sukarelawan muzium, Maya, tersenyum mesra dan menyerahkan sebilah kunci loyang antik. 'Anda berjaya merungkai kod ejaan jari! Seseorang mengamanahkan saya untuk menyerahkan kunci ini hanya kepada detektif yang sudi mempelajari bahasa isyarat kita.'",
      "Dia memberikan peta Bandar Luma dengan beberapa lokasi pertemuan rahsia ditandakan: Moon Café, Hospital Komuniti, dan Perpustakaan Pusat. Tertera pada sampul surat: \"Kunci pertama membuka pintu koridor muzium. Kunci kedua mendedahkan mengapa buku ini disembunyikan.\"",
      "Mata Gio bersinar dengan penuh semangat: 'Jejak petunjuk yang dirancang?! Rakan kongsi, ini bermakna sesiapa yang memindahkan Buku Memori bukan berniat mencuri kerana tamak—mereka mahu seseorang yang benar-benar menghormati bahasa isyarat untuk mencarinya! Mari kita terokai bandar!'"
    ],
    rewardKey: "The First Key (Key of Doors)",
    rewardKeyBm: "Kunci Pertama (Kunci Pintu)",
    nextChapter: "Level 2: The City of Secrets",
    nextChapterBm: "Tahap 2: Bandar Rahsia"
  },
  level2: {
    title: "Level 2 Ending: The Preservation Secret",
    titleBm: "Pengakhiran Tahap 2: Rahsia Pemeliharaan",
    badge: "KEY UNLOCKED: 2 OF 3 • THE MOTIVE REVEALED",
    badgeBm: "KUNCI DIPEROLEH: 2 DARI 3 • MOTIF TERBONGKAR",
    artwork: "assets/pov-harbor-scene.jpg",
    paragraphs: [
      "Across Luma City's café, hospital, and library, you and Gio piece together the shocking truth behind the disappearance.",
      "The Memory Book was never stolen by a villain. It was secretly moved into safe storage to prevent a former museum administrator from deleting and replacing its authentic signed recordings with cheap, incomplete automated translations!",
      "Gio clutches his detective notebook: 'They were trying to protect the Deaf community's authentic heritage from being erased! The second key opens the transit tunnel leading straight into the underground archive. Come on, partner, let's finish what we started!'"
    ],
    paragraphsBm: [
      "Di serata kafe, hospital, dan perpustakaan Bandar Luma, anda dan Gio berjaya mencantumkan kepingan kebenaran di sebalik kehilangan itu.",
      "Buku Memori sebenarnya tidak dicuri oleh penjenayah. Ia dipindahkan secara rahsia ke tempat simpanan selamat bagi menghalang bekas pentadbir muzium daripada memadamkan cerita isyarat asli dan menggantikannya dengan terjemahan automatik yang tidak tepat!",
      "Gio memegang buku nota detektifnya: 'Mereka cuba melindungi warisan asli komuniti Pekak daripada dipadamkan! Kunci kedua membuka terowong transit menuju ke arkib bawah tanah. Mari, rakan kongsi, kita selesaikan misi ini!'"
    ],
    rewardKey: "The Second Key (Key of Memory)",
    rewardKeyBm: "Kunci Kedua (Kunci Memori)",
    nextChapter: "Level 3: The Final Truth",
    nextChapterBm: "Tahap 3: Kebenaran Mutlak"
  },
  level3: {
    title: "Level 3 Grand Finale: The Living Archive",
    titleBm: "Kemuncak Tahap 3: Arkib Hidup",
    badge: "KEY UNLOCKED: 3 OF 3 • MEMORY BOOK RESTORED",
    badgeBm: "KUNCI DIPEROLEH: 3 DARI 3 • BUKU MEMORI DIPULIHKAN",
    artwork: "assets/pov-observatory-scene.jpg",
    paragraphs: [
      "Inside the secret subterranean archive beneath Luma City, you and Gio meet the guardian: Deaf archivist Mira Reed.",
      "Using fluent sign language, storytelling, and classifiers you mastered across 30 stages, you communicate with Mira, confirming your dedication to preserving the city's living stories.",
      "Mira smiles and unlocks the gilded display case, presenting the glowing Memory Book. Gio cheers triumphantly: 'We did it, partner! You started by learning your very first sign, and now you\'ve solved the mystery and protected our entire community\'s stories!'",
      "Together, you bring the Memory Book back to the Festival of Stories, where stories are celebrated in their authentic, living sign language."
    ],
    paragraphsBm: [
      "Di dalam arkib rahsia bawah tanah Bandar Luma, anda dan Gio bertemu penjaganya: arkivis komuniti Pekak, Mira Reed.",
      "Menggunakan bahasa isyarat yang fasih, penceritaan ekspresif, dan pengelas ruang yang anda kuasai merentasi 30 peringkat, anda berkomunikasi dengan Mira membuktikan komitmen untuk memelihara warisan cerita bandar ini.",
      "Mira tersenyum lalu membuka peti pameran bersadur emas, menyerahkan Buku Memori yang bersinar. Gio bersorak gembira: 'Kita berjaya, rakan kongsi! Awak bermula daripada mempelajari isyarat pertama, dan kini awak merungkai misteri serta melindungi warisan kisah seluruh komuniti kita!'",
      "Bersama-sama, anda membawa Buku Memori kembali ke Festival Cerita, di mana kisah-kisah terus diraikan dalam bahasa isyarat yang asli dan hidup."
    ],
    rewardKey: "The Third Key (Key of Restoration)",
    rewardKeyBm: "Kunci Ketiga (Kunci Pemulihan)",
    nextChapter: "Epilogue: Festival of Stories Celebrated",
    nextChapterBm: "Epilog: Festival Cerita Diraikan"
  }
};

const GESTIGO_SUSPECTS = [
  {
    id: "elias",
    name: "Prof. Elias Carter",
    role: "Head Curator",
    roleBm: "Ketua Kurator",
    avatar: "assets/suspects/suspect_elias.png",
    status: "Prime Suspect #1",
    statusBm: "Suspek Utama #1",
    description: "A respected scholar of myths who has special access to the rare collection and the museum's innermost vaults.",
    descriptionBm: "Cendekiawan mitos dihormati yang mempunyai akses khas ke koleksi arkib terhad dan bilik kebal muzium.",
    suspicionLevel: "High Access Privilege",
    suspicionLevelBm: "Akses Khas Tahap Tinggi",
    icon: "book",
    unlockedAtStage: 1
  },
  {
    id: "lina",
    name: "Lina Arvelle",
    role: "Archivist",
    roleBm: "Arkivis",
    avatar: "assets/suspects/suspect_lina.png",
    status: "Prime Suspect #2",
    statusBm: "Suspek Utama #2",
    description: "Organises and handles important artefacts, including the Myth Book. Holds the physical master key to the display vitrine.",
    descriptionBm: "Menyusun dan mengendalikan artifak penting, termasuk Buku Mitos. Memegang kunci fizikal vitrin pameran.",
    suspicionLevel: "Direct Handling Access",
    suspicionLevelBm: "Akses Pengendalian Langsung",
    icon: "clipboard",
    unlockedAtStage: 1
  },
  {
    id: "rex",
    name: "Rex Kendall",
    role: "Maintenance Staff",
    roleBm: "Kakitangan Penyelenggaraan",
    avatar: "assets/suspects/suspect_rex.png",
    status: "Prime Suspect #3",
    statusBm: "Suspek Utama #3",
    description: "In charge of the museum's security, lighting and lock systems. Knows every blind spot in the surveillance camera network.",
    descriptionBm: "Bertanggungjawab terhadap keselamatan, pencahayaan dan sistem kunci muzium. Mengetahui setiap titik buta kamera litar tertutup.",
    suspicionLevel: "System Override Ability",
    suspicionLevelBm: "Keupayaan Pintasan Sistem",
    icon: "wrench",
    unlockedAtStage: 1
  },
  {
    id: "maya",
    name: "Maya Callen",
    role: "Visiting Folklore Fellow and Scholar",
    roleBm: "Sarjana Pelawat dan Penyelidik Budaya",
    avatar: "assets/suspects/suspect_maya.png",
    specialCard: "assets/suspects/maya_villain_card.png",
    isMastermind: true,
    status: "Suspect #7 Under Interrogation",
    statusBm: "Suspek #7 Disoal Siasat",
    description: "A visiting rare folklore fellow and manuscript conservator studying ancient Luma mythology, folklore legends, and ceremonial festival storytelling.",
    descriptionBm: "Felo sastera rakyat pelawat dan penyelidik manuskrip kuno yang mengkaji mitologi Luma, legenda tradisi, dan penceritaan upacara festival.",
    suspicionLevel: "High Suspicion",
    suspicionLevelBm: "Kecurigaan Tinggi",
    icon: "mask",
    unlockedAtStage: 1
  },
  {
    id: "adrian",
    name: "Adrian Vale",
    role: "Private Collector",
    roleBm: "Pengumpul Persendirian",
    avatar: "assets/suspects/suspect_adrian.png",
    status: "Prime Suspect #5",
    statusBm: "Suspek Utama #5",
    description: "A well-known artefact collector with vast wealth who has shown relentless interest in acquiring the Myth Book for his private estate.",
    descriptionBm: "Pengumpul artifak terkenal berharta besar yang menunjukkan minat mendalam untuk memiliki Buku Mitos bagi koleksi peribadinya.",
    suspicionLevel: "Financial Motive",
    suspicionLevelBm: "Motif Kewangan & Pemilikan",
    icon: "crown",
    unlockedAtStage: 1
  },
  {
    id: "sora",
    name: "Sora Dain",
    role: "Museum Visitor",
    roleBm: "Pelawat Muzium",
    avatar: "assets/suspects/suspect_sora.png",
    status: "Prime Suspect #6",
    statusBm: "Suspek Utama #6",
    description: "A frequent visitor who loves history and was caught repeatedly taking unauthorized flash photos around restricted security areas.",
    descriptionBm: "Pelawat kerap yang meminati sejarah dan sering dilihat mengambil gambar di kawasan kawalan keselamatan terhad.",
    suspicionLevel: "Suspicious Surveillance",
    suspicionLevelBm: "Pengintipan Mencurigakan",
    icon: "camera",
    unlockedAtStage: 1
  },
  {
    id: "chen",
    name: "Officer Chen",
    role: "Night Security Guard",
    roleBm: "Pengawal Keselamatan Malam",
    avatar: "assets/suspects/suspect_chen.png",
    status: "Key Eyewitness",
    statusBm: "Saksi Utama",
    description: "Patrolling the perimeter gates when the emergency alarm tripped at 2:08 AM. Logged the breached emergency fire door.",
    descriptionBm: "Meronda pintu pagar utama apabila penggera kecemasan berbunyi jam 2:08 pagi. Merekod pintu kecemasan yang diceroboh.",
    suspicionLevel: "First Responder (Cleared)",
    suspicionLevelBm: "Petugas Pertama (Bebas Syak)",
    icon: "shield",
    unlockedAtStage: 1
  },
  {
    id: "kaelen",
    name: "Kaelen Vance",
    role: "Canal Boatman & Transit Operator",
    roleBm: "Pengemudi Bot Transit Terusan",
    avatar: "assets/suspects/suspect_kaelen.png",
    status: "Canal Harbor Witness",
    statusBm: "Saksi Dermaga Terusan",
    description: "Operates the midnight water transit boat. Observed a runner in a purple beret trying to board with a heavy leather-wrapped relic.",
    descriptionBm: "Mengendalikan bot transit air tengah malam. Memerhatikan individu berberet ungu cuba menaiki bot bersama artifak berbalut kulit tebal.",
    suspicionLevel: "Neutral Witness",
    suspicionLevelBm: "Saksi Berkecuali",
    icon: "anchor",
    unlockedAtStage: 1
  },
  {
    id: "mira",
    name: "Mira Thorne",
    role: "Antique Bookseller",
    roleBm: "Penjual Buku Antik",
    avatar: "assets/suspects/suspect_mira.png",
    status: "Opposite Street Witness",
    statusBm: "Saksi Seberang Jalan",
    description: "Owner of the 24-hour antique bookshop facing the museum. Witnessed rapid signed exchange: 'TRAIN-GONE-SORRY' between conspirators.",
    descriptionBm: "Pemilik kedai buku antik 24 jam bertentangan muzium. Menyaksikan isyarat pantas: 'TRAIN-GONE-SORRY' antara individu mencurigakan.",
    suspicionLevel: "Community Witness",
    suspicionLevelBm: "Saksi Komuniti",
    icon: "book-open",
    unlockedAtStage: 1
  },
  {
    id: "tessa",
    name: "Tessa Gray",
    role: "Archive Volunteer",
    roleBm: "Sukarelawan Arkib",
    avatar: "assets/suspects/suspect_tessa.png",
    status: "Library Archive Witness",
    statusBm: "Saksi Arkib Perpustakaan",
    description: "Spotted Maya Callen violating archive etiquette and sneaking through the restricted rare manuscript stacks wearing a violet beret.",
    descriptionBm: "Melihat Maya Callen melanggar etika arkib dan menyelinap melalui rak manuskrip terhad memakai beret ungu.",
    suspicionLevel: "Star Witness (Cleared)",
    suspicionLevelBm: "Saksi Bintang (Bebas Syak)",
    icon: "user-check",
    unlockedAtStage: 1
  }
]

const GESTIGO_GLOSSARY = [
  {
    category: "Alphabet & Fingerspelling",
    categoryBm: "Abjad & Ejaan Jari",
    signs: [
      { sign: "L", desc: "Index finger and thumb form an 'L' shape.", tip: "Keep palm outward.", level: 1 },
      { sign: "U", desc: "Index and middle fingers upright together.", tip: "Fingers joined closely.", level: 1 },
      { sign: "M", desc: "Thumb tucked under first three folded fingers.", tip: "Three knuckles over thumb.", level: 1 },
      { sign: "A", desc: "Fist with thumb resting along side of index finger.", tip: "Thumb beside fist, not tucked.", level: 1 },
      { sign: "B", desc: "Four fingers upright with thumb tucked across palm.", tip: "Open flat four fingers.", level: 1 },
      { sign: "C", desc: "Curved hand forming the letter C.", tip: "Think of holding a cup.", level: 1 },
      { sign: "D", desc: "Index finger straight up, thumb touching middle finger.", tip: "Looks like lowercase d.", level: 1 },
      { sign: "O", desc: "All fingers curved to touch thumb tip.", tip: "O-tube shape.", level: 1 }
    ]
  },
  {
    category: "Numbers & Counting",
    categoryBm: "Nombor & Kiraan",
    signs: [
      { sign: "1", desc: "Index finger upright.", tip: "Palm facing inward or outward.", level: 1 },
      { sign: "2", desc: "Index and middle fingers upright.", tip: "ASL 2 handshape.", level: 1 },
      { sign: "3", desc: "Thumb, index, and middle finger extended.", tip: "ASL uses thumb for 3!", level: 1 },
      { sign: "5", desc: "All five fingers fully open.", tip: "Open palm.", level: 1 },
      { sign: "10", desc: "Thumbs up shaken slightly from side to side.", tip: "Thumb waggle.", level: 1 }
    ]
  },
  {
    category: "Survival & Greetings",
    categoryBm: "Asas & Ucapan Harian",
    signs: [
      { sign: "HELLO", desc: "Flat hand moves outward from temple like a salute.", tip: "Gentle outward salute.", level: 1 },
      { sign: "PLEASE", desc: "Flat palm circles over chest clockwise.", tip: "Heart circle.", level: 1 },
      { sign: "THANK YOU", desc: "Fingertips touch chin, then move downward & outward.", tip: "Gratitude forward.", level: 1 },
      { sign: "HELP", desc: "Closed fist rests on flat palm and both move up together.", tip: "Lifting support.", level: 1 },
      { sign: "WATER", desc: "'W' handshape taps twice against the chin.", tip: "Letter W on chin.", level: 1 }
    ]
  },
  {
    category: "Emotions & Health",
    categoryBm: "Emosi & Kesihatan",
    signs: [
      { sign: "HAPPY", desc: "Open palms brush upward against chest twice.", tip: "Rising joy.", level: 2 },
      { sign: "TIRED", desc: "Bent hands on chest slump downward.", tip: "Exhaustion drop.", level: 2 },
      { sign: "PAIN", desc: "Both index fingers twist toward each other near hurt area.", tip: "Twisting ache.", level: 2 },
      { sign: "DOCTOR", desc: "Bent fingertips tap twice on inside wrist like feeling pulse.", tip: "Wrist pulse check.", level: 2 }
    ]
  },
  {
    category: "City, Dining & Commerce",
    categoryBm: "Bandar, Makan & Membeli-Belah",
    signs: [
      { sign: "COFFEE", desc: "Two fists stacked, top fist grinding in small circles.", tip: "Coffee bean grinder.", level: 2 },
      { sign: "EAT", desc: "Squished O-hand taps lips twice.", tip: "Bringing food to mouth.", level: 2 },
      { sign: "MONEY", desc: "Squished fingers tap twice into open upward palm.", tip: "Counting coins.", level: 2 },
      { sign: "STORE", desc: "Both hands in squished O-shape flick forward twice.", tip: "Shop shelves.", level: 2 }
    ]
  },
  {
    category: "Grammar, Spatial Verbs & Classifiers",
    categoryBm: "Tatabahasa, Kata Kerja Ruang & Pengelas",
    signs: [
      { sign: "I-HELP-YOU", desc: "Help sign moves outward from self toward other person.", tip: "Directional verb.", level: 3 },
      { sign: "YOU-HELP-ME", desc: "Help sign moves inward from other person toward self.", tip: "Reversed direction.", level: 3 },
      { sign: "CL:3 (VEHICLE)", desc: "Horizontal 3-handshape representing a moving vehicle.", tip: "Car driving along curves.", level: 3 },
      { sign: "EYEBROW-WH", desc: "Furrowed eyebrows for Who, What, Where, When, Why.", tip: "Lowered brows for inquiry.", level: 3 },
      { sign: "EYEBROW-YESNO", desc: "Raised eyebrows for Yes/No question questions.", tip: "Inquiring raised brows.", level: 3 }
    ]
  }
];


const GESTIGO_STAGES = [
  {
    "id": 1,
    "level": 1,
    "gameMode": "alphabet_static",
    "modeBadge": "Manual Alphabet (A–Z)",
    "title": "The Wax Seal Cipher",
    "titleBm": "Sifir Meterai Lilin",
    "shortTitle": "Wax Seal Cipher",
    "shortTitleBm": "Abjad Manual",
    "subtitle": "Examine the broken vitrine and decipher the 4 mysterious fingerspelled letters stamped into the intruder's purple wax seal.",
    "subtitleBm": "Periksa vitrin pecah dan nyahkod 4 huruf isyarat misteri yang dicop pada meterai lilin ungu penceroboh.",
    "prop": "alphabet",
    "icon": "type",
    "xp": 150,
    "mystery": {
      "caseName": "Case #1: The Thief's Escape Cipher",
      "location": "Story Museum • Shattered Glass Vitrine",
      "locationBm": "Muzium Cerita • Vitrin Kaca Pecah",
      "clueUnlocked": {
        "id": "clue_wax_envelope",
        "name": "Decoded Getaway Cipher ('LUMA')",
        "nameBm": "Sifir Pelarian Dinyahkod ('LUMA')",
        "desc": "The 4-letter cipher on the envelope spelled LUMA, proving the thief fled via the central transit line.",
        "descBm": "Sifir 4 huruf mengeja LUMA, membuktikan pencuri melarikan diri melalui laluan transit bandar.",
        "icon": "mail"
      },
      "steps": [
        {
          "prompt": "Gio points his magnifying glass at the purple wax seal: \"Look at the first impression pressed into the wax! The index finger points straight up while the thumb extends at a 90° angle. Which letter did the thief stamp first?\"",
          "promptBm": "Gio menghalakan kanta pembesarnya pada meterai lilin ungu: \"Lihat cap pertama pada lilin! Jari telunjuk menunjuk tegak ke atas manakala ibu jari membentuk sudut 90°. Huruf apakah yang dicop dahulu?\"",
          "image": "assets/signs/forensic/clue_L.png",
          "targetSign": "L",
          "options": [
            "L",
            "A",
            "V",
            "C"
          ],
          "hint": "The index finger points straight up while the thumb forms a 90-degree right angle.",
          "hintBm": "Jari telunjuk tegak ke atas manakala ibu jari membentuk sudut tepat 90 darjah.",
          "praise": "First Seal Letter Cracked: 'L'! The wax cipher begins to unravel!",
          "praiseBm": "Huruf Meterai Pertama Berjaya: 'L'! Sifir lilin mula terungkai!"
        },
        {
          "prompt": "Gio shines his forensic light on the second wax impression: \"Two fingers are held tightly upright together with zero gap between them, while the thumb folds across. Which letter does this handshape form?\"",
          "promptBm": "Gio menyuluh lampu forensik pada cap lilin kedua: \"Dua jari ditegakkan rapat bersama tanpa ruang di antaranya, manakala ibu jari dilipat ke sisi. Huruf apakah ini?\"",
          "image": "assets/signs/forensic/clue_U.png",
          "targetSign": "U",
          "options": [
            "U",
            "V",
            "H",
            "R"
          ],
          "hint": "Two fingers are locked tightly side-by-side with no gap between them.",
          "hintBm": "Dua jari tegak rapat sebelah-menyebelah tanpa sebarang ruang.",
          "praise": "Second Seal Letter Cracked: 'U'! Excellent deduction, detective!",
          "praiseBm": "Huruf Meterai Kedua Berjaya: 'U'! Deduksi yang cemerlang, detektif!"
        },
        {
          "prompt": "Gio carefully inspects the third seal mark: \"Three fingers fold forward over the thumb, with the thumb tip peeking out beneath the third finger. Which letter did the thief stamp here?\"",
          "promptBm": "Gio meneliti cap ketiga dengan teliti: \"Tiga jari dilipat ke hadapan di atas ibu jari, dengan hujung ibu jari terkeluar di bawah jari ketiga. Huruf apakah ini?\"",
          "image": "assets/signs/forensic/clue_M.png",
          "targetSign": "M",
          "options": [
            "M",
            "N",
            "E",
            "T"
          ],
          "hint": "Three fingers fold forward over the thumb.",
          "hintBm": "Tiga jari dilipat ke hadapan di atas ibu jari.",
          "praise": "Third Seal Letter Cracked: 'M'! Only one letter remains on the seal!",
          "praiseBm": "Huruf Meterai Ketiga Berjaya: 'M'! Tinggal satu huruf sahaja lagi!"
        },
        {
          "prompt": "Gio examines the final stamp on the seal: \"All four fingers are clenched into a compact fist, with the thumb resting vertically alongside the index finger. Which letter completes the 4-letter seal cipher?\"",
          "promptBm": "Gio memeriksa cap terakhir pada meterai: \"Kesemua empat jari digenggam rapat, dengan ibu jari berehat tegak di sisi jari telunjuk. Huruf apakah melengkapkan meterai?\"",
          "image": "assets/signs/forensic/clue_A.png",
          "targetSign": "A",
          "options": [
            "A",
            "S",
            "T",
            "O"
          ],
          "hint": "A compact fist with the thumb resting upright alongside the index finger.",
          "hintBm": "Genggaman tangan kemas dengan ibu jari tegak di sisi jari telunjuk.",
          "praise": "The Complete Cipher Spells: L - U - M - A! The sacred city's name!",
          "praiseBm": "Sifir Lengkap Mengeja: L - U - M - A! Nama bandar suci kita!"
        }
      ]
    }
  },
  {
    "id": 2,
    "level": 1,
    "gameMode": "numbers_counting",
    "modeBadge": "Numbers & Counting (1–100)",
    "title": "The Vault Keypad Code",
    "titleBm": "Kod Pintasan Kebal",
    "shortTitle": "Vault Keypad Code",
    "shortTitleBm": "Nombor & Kiraan",
    "subtitle": "Crack the vault safe's 4-tumbler digital keypad bypass code by decoding the intruder's forensic ASL number handshapes.",
    "subtitleBm": "Pecahkan kod pintasan pad kunci digital 4-tumbler peti besi dengan menyahkod bentuk tangan nombor ASL forensik penceroboh.",
    "prop": "numbers",
    "icon": "hash",
    "xp": 150,
    "mystery": {
      "caseName": "Case #2: Crime Scene Forensics & Safe Breach",
      "location": "Story Museum • Vitrine Security Keypad",
      "locationBm": "Muzium Cerita • Papan Kekunci Keselamatan Vitrin",
      "clueUnlocked": {
        "id": "clue_keypad_code",
        "name": "Intruder Vault Forensic Code (3-7-9-6)",
        "nameBm": "Kod Forensik Bilik Kebal Penceroboh (3-7-9-6)",
        "desc": "Keypad breached: The intruder bypassed security using the ASL 4-digit master sequence 3-7-9-6.",
        "descBm": "Pad kunci ditembusi: Penceroboh melepasi keselamatan menggunakan jujukan 4-digit ASL 3-7-9-6.",
        "icon": "lock"
      },
      "steps": [
        {
          "prompt": "Gio inspects keypad tumbler #1: \"The first digital tumbler displays a handshape with the thumb, index finger, and middle finger extended, while the ring and pinky fingers are curled against the palm. Which digit unlocks tumbler #1?\"",
          "promptBm": "Gio memeriksa tumbler #1 pad kunci: \"Tumbler digital pertama memaparkan bentuk tangan dengan ibu jari, telunjuk, dan hantu terbuka, manakala jari manis dan kelengkeng digenggam. Angka apakah membuka tumbler #1?\"",
          "image": "assets/signs/forensic/clue_num3.png",
          "targetSign": "3",
          "options": [
            "3",
            "2",
            "6",
            "1"
          ],
          "hint": "In ASL counting, extending the thumb along with the index and middle fingers represents this number (not 3 fingers without thumb).",
          "hintBm": "Dalam kiraan ASL, membuka ibu jari bersama telunjuk dan hantu mewakili angka ini (bukan 3 jari tanpa ibu jari).",
          "praise": "Keypad Tumbler #1 Bypassed: Digit '3' verified!",
          "praiseBm": "Tumbler #1 Dilepasi: Angka '3' disahkan!"
        },
        {
          "prompt": "Gio observes keypad tumbler #2: \"The second tumbler displays a hand where the ring finger is bent down touching the thumb tip, leaving the index, middle, and pinky fingers extended upright. What digit matches this sign?\"",
          "promptBm": "Gio memerhati tumbler #2: \"Tumbler kedua memaparkan tangan di mana jari manis bersentuhan dengan hujung ibu jari, manakala telunjuk, hantu, dan kelengkeng tegak. Angka apakah ini?\"",
          "image": "assets/signs/forensic/clue_num7.png",
          "targetSign": "7",
          "options": [
            "7",
            "6",
            "8",
            "9"
          ],
          "hint": "In ASL counting from 6 through 9, touching the thumb to the ring finger represents 7.",
          "hintBm": "Dalam kiraan ASL dari 6 hingga 9, menyentuh ibu jari ke jari manis mewakili 7.",
          "praise": "Keypad Tumbler #2 Bypassed: Digit '7' accepted!",
          "praiseBm": "Tumbler #2 Dilepasi: Angka '7' diterima!"
        },
        {
          "prompt": "Gio analyzes keypad tumbler #3: \"The third tumbler screen reveals the index finger touching the tip of the thumb in an open loop, with the middle, ring, and pinky fingers standing tall. Which number completes this input?\"",
          "promptBm": "Gio menganalisis tumbler #3: \"Skrin tumbler ketiga menunjukkan telunjuk menyentuh hujung ibu jari membentuk bulatan, dengan hantu, manis, dan kelengkeng tegak. Angka apakah ini?\"",
          "image": "assets/signs/forensic/clue_num9.png",
          "targetSign": "9",
          "options": [
            "9",
            "6",
            "7",
            "8"
          ],
          "hint": "In ASL counting, touching the index finger to the thumb tip represents the highest single digit.",
          "hintBm": "Dalam kiraan ASL, menyentuh jari telunjuk ke ibu jari mewakili angka tunggal tertinggi.",
          "praise": "Keypad Tumbler #3 Bypassed: Digit '9' accepted!",
          "praiseBm": "Tumbler #3 Dilepasi: Angka '9' diterima!"
        },
        {
          "prompt": "Gio studies the final master tumbler #4: \"The master tumbler illuminates with the pinky finger touching the thumb tip, while the index, middle, and ring fingers are held upright. Which digit completes the bypass code?\"",
          "promptBm": "Gio meneliti tumbler utama #4 terakhir: \"Tumbler utama menyala dengan kelengkeng menyentuh hujung ibu jari, manakala telunjuk, hantu, dan manis tegak. Angka apakah melengkapkan kod?\"",
          "image": "assets/signs/forensic/clue_num6.png",
          "targetSign": "6",
          "options": [
            "6",
            "7",
            "8",
            "3"
          ],
          "hint": "In ASL, touching the smallest finger (pinky) to the thumb represents the number 6.",
          "hintBm": "Dalam ASL, menyentuh jari terkecil (kelengkeng) ke ibu jari mewakili angka 6.",
          "praise": "Vault Keypad Cracked: Master code 3-7-9-6 verified! The heavy titanium doors disengage!",
          "praiseBm": "Pad Kunci Peti Besi Terbuka: Kod induk 3-7-9-6 disahkan! Pintu titanium terbuka!"
        }
      ]
    }
  },
  {
    "id": 3,
    "level": 1,
    "gameMode": "time_calendar",
    "modeBadge": "Time & Calendar",
    "title": "The Watchman's Midnight Timeline",
    "titleBm": "Garis Masa Tengah Malam",
    "shortTitle": "Watchman's Timeline",
    "shortTitleBm": "Masa & Kalendar",
    "subtitle": "Reconstruct the crime timeline from the night guard's logbook by deducing the temporal signs.",
    "subtitleBm": "Bina semula garis masa jenayah dari buku log pengawal malam dengan menyahkod isyarat masa.",
    "prop": "calendar",
    "icon": "clock",
    "xp": 150,
    "mystery": {
      "caseName": "Case #3: When Was the Book Lost?",
      "location": "Story Museum • Security Booth Ledger",
      "locationBm": "Muzium Cerita • Lejar Pondok Keselamatan",
      "clueUnlocked": {
        "id": "clue_watchman_ledger",
        "name": "Verified Theft Timeline (Monday Night)",
        "nameBm": "Garis Masa Kecurian Sah (Malam Isnin)",
        "desc": "Timeline established: The Memory Book was stolen on Monday Night right after inspection time.",
        "descBm": "Garis masa sah: Buku Memori dicuri pada Malam Isnin sejurus waktu pemeriksaan.",
        "icon": "calendar"
      },
      "steps": [
        {
          "prompt": "The curator arrives at the crime scene in distress: \"We must establish the exact timeline!\" The night watchman taps his wrist where a wristwatch is worn. Which temporal concept is the guard recording?",
          "promptBm": "Kurator tiba di tempat kejadian dengan cemas: \"Kita perlu tentukan garis masa tepat!\" Pengawal mengetuk pergelangan tangannya di mana jam dipakai. Konsep masa apakah yang direkodkan?",
          "image": "assets/signs/forensic/clue_time.png",
          "targetSign": "TIME",
          "options": [
            "TIME",
            "NIGHT",
            "MONDAY",
            "HOUR"
          ],
          "hint": "Tapping the wrist where a wristwatch is traditionally worn.",
          "hintBm": "Mengetuk pergelangan tangan tempat jam tangan dipakai.",
          "praise": "Timeline Entry Logged: TIME established!",
          "praiseBm": "Entri Garis Masa Direkodkan: MASA dikenal pasti!"
        },
        {
          "prompt": "Gio reviews the security camera footage: \"Under what ambient conditions did the intruder break in?\" The guard makes an arching hand gesture downward over his flat arm like the sun sinking below the horizon. Which period is indicated?",
          "promptBm": "Gio menyemak rakaman kamera keselamatan: \"Dalam keadaan cahaya apakah penceroboh masuk?\" Pengawal melengkungkan tangan ke bawah lengan mendatar seperti matahari terbenam. Waktu apakah ini?",
          "image": "assets/signs/forensic/clue_night.png",
          "targetSign": "NIGHT",
          "options": [
            "NIGHT",
            "DAY",
            "MORNING",
            "AFTERNOON"
          ],
          "hint": "The cupped hand curving down over the flat arm represents darkness falling beneath the horizon.",
          "hintBm": "Tangan melengkung ke bawah lengan mendatar melambangkan kegelapan menyelubungi ufuk.",
          "praise": "Timeline Entry Logged: Breach occurred at NIGHT under darkness!",
          "praiseBm": "Entri Garis Masa Direkodkan: Pencerobohan berlaku pada waktu MALAM!"
        },
        {
          "prompt": "Gio checks the festival setup calendar on the wall: \"The thief struck right before opening day!\" The guard circles an initial handshape clockwise in the air. Which day of the week is being signed?",
          "promptBm": "Gio menyemak kalendar persiapan festival di dinding: \"Pencuri bertindak sebelum hari pembukaan!\" Pengawal memusingkan isyarat tangan mengikut arah jam di udara. Hari apakah ini?",
          "image": "assets/signs/forensic/clue_monday.png",
          "targetSign": "MONDAY",
          "options": [
            "MONDAY",
            "TUESDAY",
            "FRIDAY",
            "SUNDAY"
          ],
          "hint": "Three fingers folded over the thumb moving in a clockwise circle.",
          "hintBm": "Tiga jari di atas ibu jari bergerak dalam bulatan mengikut arah jam.",
          "praise": "Timeline Complete: Target was opening day on MONDAY!",
          "praiseBm": "Garis Masa Lengkap: Sasaran ialah hari pembukaan pada hari ISNIN!"
        }
      ]
    }
  },
  {
    "id": 4,
    "level": 1,
    "gameMode": "survival_greetings",
    "modeBadge": "Core Survival & Greetings",
    "title": "The Lobby Distress Call",
    "titleBm": "Panggilan Cemas Lobi",
    "shortTitle": "Lobby Distress Call",
    "shortTitleBm": "Ucapan & Bantuan",
    "subtitle": "Triage emergency communications with the trapped receptionist through the intercom using vital survival signs.",
    "subtitleBm": "Lakukan komunikasi kecemasan dengan penyambut tetamu yang terperangkap melalui interkom menggunakan isyarat penting.",
    "prop": "greetings",
    "icon": "message-circle",
    "xp": 150,
    "mystery": {
      "caseName": "Case #4: The Panicked Lobby Witness",
      "location": "Story Museum • Front Entrance Lobby",
      "locationBm": "Muzium Cerita • Lobi Pintu Masuk Utama",
      "clueUnlocked": {
        "id": "clue_witness_rapport",
        "name": "Receptionist Eyewitness Deposition",
        "nameBm": "Kenyataan Saksi Mata Penyambut Tetamu",
        "desc": "The receptionist calmed down and revealed the intruder trapped the curator in the vault.",
        "descBm": "Penyambut tetamu bertenang dan mendedahkan pencuri mengunci kurator dalam bilik kebal.",
        "icon": "smile"
      },
      "steps": [
        {
          "prompt": "The lobby receptionist is trembling behind the counter. Gio says: \"We need to reassure her first!\" Which welcoming sign should you gesture to calm the frightened witness?",
          "promptBm": "Penyambut tetamu lobi menggigil di belakang kaunter. Gio berkata: \"Kita perlu tenangkan dia dahulu!\" Isyarat mesra manakah yang patut diisyaratkan?",
          "image": "assets/signs/forensic/clue_hello.png",
          "targetSign": "HELLO",
          "options": [
            "HELLO",
            "HELP",
            "THANK-YOU",
            "SORRY"
          ],
          "hint": "An open hand salute moving forward from the temple.",
          "hintBm": "Tabik tangan terbuka bergerak ke hadapan dari pelipis.",
          "praise": "Witness Calmed: Warm HELLO delivered!",
          "praiseBm": "Saksi Bertenang: Ucapan HELLO berjaya disampaikan!"
        },
        {
          "prompt": "The receptionist points toward the elevator with an urgent gesture: a thumbs-up fist lifting upward from a flat base palm. Which crucial safety message is she communicating?",
          "promptBm": "Penyambut tetamu menunjuk ke arah lif dengan isyarat cemas: penumbuk dengan ibu jari tegak diangkat ke atas dari tapak tangan. Mesej keselamatan apakah ini?",
          "image": "assets/signs/forensic/clue_help.png",
          "targetSign": "HELP",
          "options": [
            "HELP",
            "STOP",
            "WAIT",
            "HELLO"
          ],
          "hint": "A fist with thumb up being lifted upward by a supporting flat palm.",
          "hintBm": "Genggaman ibu jari ke atas diangkat oleh tapak tangan yang menyokong.",
          "praise": "Emergency Message Understood: She is calling for HELP!",
          "praiseBm": "Mesej Kecemasan Difahami: Dia meminta BANTUAN (HELP)!"
        },
        {
          "prompt": "The receptionist hands over the emergency security keycard. Gio touches his chin and extends his flat hand forward with deep gratitude. Which polite sign acknowledges her assistance?",
          "promptBm": "Penyambut tetamu menyerahkan kad kunci keselamatan kecemasan. Gio menyentuh dagunya dan menghulurkan tangan ke hadapan dengan penuh penghargaan. Isyarat santun manakah ini?",
          "image": "assets/signs/forensic/clue_thankyou.png",
          "targetSign": "THANK-YOU",
          "options": [
            "THANK-YOU",
            "PLEASE",
            "SORRY",
            "GOODBYE"
          ],
          "hint": "Fingertips touching the chin and moving forward toward the person.",
          "hintBm": "Hujung jari menyentuh dagu dan bergerak ke hadapan ke arah orang berkenaan.",
          "praise": "Gratitude Expressed: Sincere THANK-YOU acknowledged!",
          "praiseBm": "Penghargaan Disampaikan: Ucapan TERIMA KASIH (THANK-YOU) diakui!"
        }
      ]
    }
  },
  {
    "id": 5,
    "level": 1,
    "gameMode": "pronouns_identity",
    "modeBadge": "Personal Pronouns & Identity",
    "title": "The Witness Identity Lineup",
    "titleBm": "Barisan Saksi Mata",
    "shortTitle": "Witness Lineup",
    "shortTitleBm": "Kata Ganti & Identiti",
    "subtitle": "Interrogate gallery eyewitnesses and decipher identities, pronouns, and the scratched name on the visitor badge.",
    "subtitleBm": "Soal siasat saksi mata galeri dan kenal pasti identiti, kata ganti, serta nama tergores pada lencana pelawat.",
    "prop": "identity",
    "icon": "user-check",
    "xp": 150,
    "mystery": {
      "caseName": "Case #5: Who Last Saw the Suspect?",
      "location": "Story Museum • Reception Desk & Corridor",
      "locationBm": "Muzium Cerita • Kaunter & Koridor Pintu Masuk",
      "clueUnlocked": {
        "id": "clue_staff_badge",
        "name": "Eyewitness Identification & Dropped Badge",
        "nameBm": "Pengecaman Saksi Mata & Lencana Tercicir",
        "desc": "The curator confirmed: 'I last saw the thief', and recovered a badge with a scratched-out NAME.",
        "descBm": "Kurator mengesahkan: 'SAYA kali terakhir melihat pencuri', dan menemui lencana dengan NAMA dicalar.",
        "icon": "badge"
      },
      "steps": [
        {
          "prompt": "Gio lines up the gallery staff: \"Who was stationed near the vitrine when the glass shattered?\" A staff member points their index finger firmly at their own chest. Who is the witness identifying?",
          "promptBm": "Gio membariskan staf galeri: \"Siapa yang bertugas berhampiran vitrin semasa kaca pecah?\" Seorang staf menuding jari telunjuk tepat ke dadanya sendiri. Siapakah yang dikenal pasti?",
          "image": "assets/signs/forensic/clue_me.png",
          "targetSign": "ME / I",
          "options": [
            "ME / I",
            "YOU",
            "THEY",
            "NAME"
          ],
          "hint": "An index finger pointing directly to one's own chest.",
          "hintBm": "Jari telunjuk menuding tepat ke dada sendiri.",
          "praise": "Witness Identified: 'ME / I' confirms on-duty presence!",
          "praiseBm": "Saksi Dikenal Pasti: 'SAYA / ME' mengesahkan keberadaan bertugas!"
        },
        {
          "prompt": "The staff member points their index finger directly forward across the table at the lead detective. Who is being indicated by this directional sign?",
          "promptBm": "Staf berkenaan menuding jari telunjuk tepat ke hadapan merentasi meja ke arah detektif. Siapakah yang dimaksudkan dengan isyarat arah ini?",
          "image": "assets/signs/forensic/clue_you.png",
          "targetSign": "YOU",
          "options": [
            "YOU",
            "ME",
            "HE",
            "THEY"
          ],
          "hint": "An index finger pointing straight forward at the conversational partner.",
          "hintBm": "Jari telunjuk menuding tepat ke hadapan ke arah rakan perbualan.",
          "praise": "Direction Decoded: 'YOU' directed back at the detective!",
          "praiseBm": "Arah Dinyahkod: 'ANDA / YOU' ditujukan kepada detektif!"
        },
        {
          "prompt": "A dropped visitor badge was recovered with scratched lettering. Two 'H' fingers tap crosswise across each other. Which personal identity attribute does this sign represent?",
          "promptBm": "Sekeping lencana pelawat tercicir ditemui dengan tulisan tergores. Dua jari 'H' mengetuk bersilang di antara satu sama lain. Atribut identiti apakah ini?",
          "image": "assets/signs/forensic/clue_name.png",
          "targetSign": "NAME",
          "options": [
            "NAME",
            "AGE",
            "ADDRESS",
            "BADGE"
          ],
          "hint": "Two extended fingers tapping twice in an X-cross over another pair of fingers.",
          "hintBm": "Dua jari mengetuk dua kali secara bersilang 'X' di atas sepasang jari lagi.",
          "praise": "Credential Decoded: The badge holds a secret NAME!",
          "praiseBm": "Kredensial Dinyahkod: Lencana memegang satu NAMA rahsia!"
        }
      ]
    }
  },
  {
    "id": 6,
    "level": 1,
    "gameMode": "family_relations",
    "modeBadge": "Family & Relationships",
    "title": "The Curator's Family Feud",
    "titleBm": "Sindiket Pusaka Warisan",
    "shortTitle": "Curator's Family Feud",
    "shortTitleBm": "Keluarga & Hubungan",
    "subtitle": "Untangle motives behind the ancestral Memory Book by questioning the curator's feuding relatives and close circle.",
    "subtitleBm": "Rungkai motif di sebalik kehilangan Buku Memori warisan dengan menyoal saudara-mara kurator yang bertelagah.",
    "prop": "family",
    "icon": "users",
    "xp": 150,
    "mystery": {
      "caseName": "Case #6: The Founder's Heirloom Feud",
      "location": "Story Museum • Founder's Archive Hall",
      "locationBm": "Muzium Cerita • Dewan Arkib Pengasas",
      "clueUnlocked": {
        "id": "clue_founder_diary",
        "name": "Betrayed Family Friendship Record",
        "nameBm": "Rekod Persahabatan Keluarga yang Dikhianati",
        "desc": "The suspect claimed ancestral rights to the book and betrayed their lifelong family FRIENDSHIP.",
        "descBm": "Suspek menuntut hak warisan ke atas buku dan mengkhianati PERSAHABATAN keluarga.",
        "icon": "heart"
      },
      "steps": [
        {
          "prompt": "Gio examines the museum bequest records: \"The donor of the sacred book was the founder's matriarch.\" A hand with fingers spread touches the chin with the thumb. Whose familial bequest was stolen?",
          "promptBm": "Gio meneliti rekod wasiat muzium: \"Penderma buku suci ini ialah tokoh wanita pengasas.\" Tangan terbuka menyentuh dagu dengan ibu jari. Wasiat kekeluargaan siapakah ini?",
          "image": "assets/signs/forensic/clue_mom.png",
          "targetSign": "MOM",
          "options": [
            "MOM",
            "DAD",
            "FRIEND",
            "SISTER"
          ],
          "hint": "The lower chin area is the maternal/female sign zone in sign language.",
          "hintBm": "Kawasan dagu bawah ialah zon isyarat wanita/ibu.",
          "praise": "Motive Line Traced: Ancestral bequest from MOM!",
          "praiseBm": "Laluan Motif Dikesan: Wasiat warisan daripada IBU!"
        },
        {
          "prompt": "The thief left a bitter note: \"This relic belongs to my forefather!\" pointing to a portrait while placing an open thumb at the forehead. Whose familial legacy does the suspect claim?",
          "promptBm": "Pencuri meninggalkan nota marah: \"Pusaka ini milik datuk moyang saya!\" sambil menunjuk potret dengan ibu jari di dahi. Warisan kekeluargaan siapakah yang dituntut?",
          "image": "assets/signs/forensic/clue_dad.png",
          "targetSign": "DAD",
          "options": [
            "DAD",
            "MOM",
            "BROTHER",
            "FRIEND"
          ],
          "hint": "The upper forehead area is the paternal/male sign zone in sign language.",
          "hintBm": "Kawasan dahi atas ialah zon isyarat lelaki/bapa.",
          "praise": "Lineage Established: Suspect claims paternal ties to DAD!",
          "praiseBm": "Keturunan Dikenal Pasti: Suspek menuntut pertalian dengan BAPA!"
        },
        {
          "prompt": "The curator reveals a close relationship: \"The suspect was once trusted as a close companion.\" Two hooked index fingers interlock together like a chain link. What bond did the suspect betray?",
          "promptBm": "Kurator mendedahkan hubungan rapat: \"Suspek dahulunya dipercayai sebagai teman rapat.\" Dua jari telunjuk berkait seperti pautan rantai. Hubungan apakah yang dikhianati?",
          "image": "assets/signs/forensic/clue_friend.png",
          "targetSign": "FRIEND",
          "options": [
            "FRIEND",
            "STRANGER",
            "ENEMY",
            "RIVAL"
          ],
          "hint": "Two index fingers hooked together in an interlocking bond.",
          "hintBm": "Dua jari telunjuk saling berkait membentuk ikatan.",
          "praise": "Alliance Unmasked: The betrayal of a trusted FRIEND!",
          "praiseBm": "Pakatan Dibongkar: Pengkhianatan seorang KAWAN (FRIEND)!"
        }
      ]
    }
  },
  {
    "id": 7,
    "level": 1,
    "gameMode": "colors_clothes",
    "modeBadge": "Colors, Shapes & Clothes",
    "title": "The Crimson Fiber Clue",
    "titleBm": "Jejak Gentian Merah",
    "shortTitle": "Crimson Fiber Clue",
    "shortTitleBm": "Warna & Pakaian",
    "subtitle": "Analyze microfibers, coat lapels, and chromatic trace evidence left across the shattered showcase glass.",
    "subtitleBm": "Analisis gentian mikro, lapel kot, dan bukti warna yang ditinggalkan pada serpihan kaca pameran.",
    "prop": "colors",
    "icon": "palette",
    "xp": 150,
    "mystery": {
      "caseName": "Case #7: Reconstructing the Suspect's Disguise",
      "location": "Story Museum • Cloakroom & West Exit",
      "locationBm": "Muzium Cerita • Bilik Persalinan & Pintu Keluar Barat",
      "clueUnlocked": {
        "id": "clue_disguise_profile",
        "name": "Suspect Visual Disguise Dossier",
        "nameBm": "Dossier Samaran Visual Suspek",
        "desc": "Witnesses confirmed: The suspect fled wearing a heavy COAT with a RED scarf and BLUE mantle.",
        "descBm": "Saksi mengesahkan: Suspek melarikan diri memakai KOT tebal dengan selendang MERAH dan mantel BIRU.",
        "icon": "shirt"
      },
      "steps": [
        {
          "prompt": "The surveillance camera caught a bright splash of color on the suspect's neck. The witness strokes an index finger downward from the lips. What color was the suspect's scarf?",
          "promptBm": "Kamera litar tertutup merakam warna terang pada leher suspek. Saksi mengusap jari telunjuk ke bawah dari bibir. Apakah warna selendang suspek?",
          "image": "assets/signs/forensic/clue_red.png",
          "targetSign": "RED",
          "options": [
            "RED",
            "BLUE",
            "GREEN",
            "BLACK"
          ],
          "hint": "An index finger stroking downward from the lips represents this color.",
          "hintBm": "Jari telunjuk mengusap ke bawah dari bibir mewakili warna ini.",
          "praise": "Color Identified: Vibrant RED scarf logged!",
          "praiseBm": "Warna Dikenal Pasti: Selendang MERAH (RED) direkodkan!"
        },
        {
          "prompt": "A wool fiber was found snagged on the broken showcase glass. The forensic expert twists an upright flat hand with thumb folded across at the wrist. What color was the suspect's cloak?",
          "promptBm": "Gentian benang ditemui tersangkut pada kaca pecah. Pakar forensik memusingkan tangan tegak dengan ibu jari berlipat di pergelangan tangan. Apakah warna jubah suspek?",
          "image": "assets/signs/forensic/clue_blue.png",
          "targetSign": "BLUE",
          "options": [
            "BLUE",
            "RED",
            "YELLOW",
            "WHITE"
          ],
          "hint": "An upright hand with thumb across twisting gently at the wrist.",
          "hintBm": "Tangan tegak dengan ibu jari berlipat memusing di pergelangan tangan.",
          "praise": "Fiber Match: Deep BLUE garment detected!",
          "praiseBm": "Padanan Gentian: Pakaian BIRU (BLUE) dikesan!"
        },
        {
          "prompt": "Witnesses outside spotted a figure fleeing in the rain holding a bulky object, signing hands grasping heavy lapels and drawing them across the torso. What outerwear garment was the thief wearing?",
          "promptBm": "Saksi di luar melihat kelibat melarikan diri dalam hujan, mengisyaratkan tangan memegang lapel tebal dan menariknya merentasi dada. Pakaian luar apakah dipakai pencuri?",
          "image": "assets/signs/forensic/clue_coat.png",
          "targetSign": "COAT",
          "options": [
            "COAT",
            "SHIRT",
            "HAT",
            "SHOES"
          ],
          "hint": "Miming pulling heavy lapels inward across your chest.",
          "hintBm": "Aksi menarik lapel tebal ke dalam merentasi dada.",
          "praise": "Attire Confirmed: Heavy winter COAT identified!",
          "praiseBm": "Pakaian Disahkan: KOT (COAT) musim sejuk dikenal pasti!"
        }
      ]
    }
  },
  {
    "id": 8,
    "level": 1,
    "gameMode": "food_drink",
    "modeBadge": "Food & Drink Essentials",
    "title": "The Spiked Tearoom Goblet",
    "titleBm": "Jejak Cawan Beracun",
    "shortTitle": "Spiked Goblet Trail",
    "shortTitleBm": "Makanan & Minuman",
    "subtitle": "Trace the sleeping draught in the night guard's poisoned tea goblet across the museum cafe and pantry.",
    "subtitleBm": "Kesan ubat tidur di dalam cawan teh pengawal yang diracun merentasi kafe dan pantri muzium.",
    "prop": "food",
    "icon": "coffee",
    "xp": 150,
    "mystery": {
      "caseName": "Case #8: Tracking the Tearoom Escape Route",
      "location": "Story Museum • Heritage Tea Salon",
      "locationBm": "Muzium Cerita • Salon Teh Warisan",
      "clueUnlocked": {
        "id": "clue_cafe_receipt",
        "name": "Spilled Cafe Tray & Cellar Footprints",
        "nameBm": "Dulang Kafe Tumpah & Jejak Kaki Bawah Tanah",
        "desc": "The suspect knocked over water, dropped pantry food, and left hot tea before bolting down to the basement.",
        "descBm": "Suspek menumpahkan air, mencicirkan makanan, dan meninggalkan teh panas sebelum lari ke bilik bawah tanah.",
        "icon": "coffee"
      },
      "steps": [
        {
          "prompt": "The thief crashed through the museum tearoom! Gio inspects the floor: \"Look at this spilled pitcher!\" Three upright spread fingers tap the chin twice. What spilled liquid left the wet trail we are following?",
          "promptBm": "Pencuri merempuh kafe muzium! Gio memeriksa lantai: \"Lihat jag tertumpah ini!\" Tiga jari tegak mengetuk dagu dua kali. Cecair apakah yang meninggalkan jejak basah ini?",
          "image": "assets/signs/forensic/clue_water.png",
          "targetSign": "WATER",
          "options": [
            "WATER",
            "TEA",
            "MILK",
            "JUICE"
          ],
          "hint": "Three upright fingers (W-hand) tapping the chin twice.",
          "hintBm": "Tiga jari tegak (isyarat W) mengetuk dagu dua kali.",
          "praise": "Liquid Traced: Fresh WATER footprints lead outward!",
          "praiseBm": "Cecair Dikesan: Jejak AIR (WATER) membawa keluar!"
        },
        {
          "prompt": "Gio finds crumbs on a pantry table: \"The suspect hid here for hours before the heist!\" A pinched hand brings all fingertips to touch the lips repeatedly. Which action was the suspect doing while lying in wait?",
          "promptBm": "Gio menemui serpihan di meja pantri: \"Suspek bersembunyi di sini berjam-jam!\" Hujung jari dirapatkan menyentuh bibir berulang kali. Tindakan apakah sedang dilakukan suspek?",
          "image": "assets/signs/forensic/clue_eat.png",
          "targetSign": "EAT",
          "options": [
            "EAT",
            "DRINK",
            "SLEEP",
            "COOK"
          ],
          "hint": "Pinching fingertips together and tapping them to the lips.",
          "hintBm": "Merapatkan hujung jari dan mengetuknya ke bibir.",
          "praise": "Pantry Evidence: Suspect stopped to EAT while hiding!",
          "praiseBm": "Bukti Pantri: Suspek sempat MAKAN (EAT) semasa bersembunyi!"
        },
        {
          "prompt": "A steaming teacup sits on the counter, still warm! A hand shaped like a cup tilts upward toward the lips. Which action proves the thief bolted mere moments ago?",
          "promptBm": "Cawan teh masih berasap dan hangat! Tangan melengkung seperti cawan menyenget ke arah bibir. Aksi manakah membuktikan pencuri baru sahaja beredar?",
          "image": "assets/signs/forensic/clue_drink.png",
          "targetSign": "DRINK",
          "options": [
            "DRINK",
            "EAT",
            "POUR",
            "WASH"
          ],
          "hint": "Tilting a C-shaped hand toward the mouth like a cup.",
          "hintBm": "Menyengetkan tangan berbentuk C ke mulut seperti memegang cawan.",
          "praise": "Trail Hot: Suspect was having a DRINK seconds ago!",
          "praiseBm": "Jejak Panas: Suspek baru sahaja MINUM (DRINK) sebentar tadi!"
        }
      ]
    }
  },
  {
    "id": 9,
    "level": 1,
    "gameMode": "home_routine",
    "modeBadge": "Home & Daily Routine",
    "title": "The Caretaker's Secret Quarters",
    "titleBm": "Bilik Rahsia Penjaga",
    "shortTitle": "Caretaker's Quarters",
    "shortTitleBm": "Rumah & Rutin",
    "subtitle": "Uncover the caretaker's hidden living quarters and concealed escape passage behind the maintenance closet.",
    "subtitleBm": "Bongkar bilik kediaman rahsia penjaga dan laluan melarikan diri tersembunyi di sebalik almari utiliti.",
    "prop": "home",
    "icon": "home",
    "xp": 150,
    "mystery": {
      "caseName": "Case #9: Infiltrating the Secret Lair",
      "location": "Story Museum • Sub-Level Caretaker Lair",
      "locationBm": "Muzium Cerita • Bilik Bawah Tanah Penjaga",
      "clueUnlocked": {
        "id": "clue_basement_map",
        "name": "Thief's Midnight Gate Escape Blueprint",
        "nameBm": "Pelan Pelarian Pintu Pagar Tengah Malam Pencuri",
        "desc": "Found on the hideout cot: A marked blueprint confirming the thief is heading to the Rear Midnight Gates!",
        "descBm": "Ditemui di katil persembunyian: Pelan bertanda mengesahkan pencuri menuju ke Pintu Pagar Belakang!",
        "icon": "map"
      },
      "steps": [
        {
          "prompt": "The wet footprints lead straight to the caretaker's living quarters below the museum! Fingertips touch the mouth, then transition to touch the cheek. Which domicile concept does this sign describe?",
          "promptBm": "Jejak basah menuju terus ke bilik kediaman penjaga di bawah muzium! Hujung jari menyentuh mulut, kemudian beralih menyentuh pipi. Konsep kediaman apakah ini?",
          "image": "assets/signs/forensic/clue_home.png",
          "targetSign": "HOME",
          "options": [
            "HOME",
            "OFFICE",
            "STREET",
            "STORE"
          ],
          "hint": "Touching near the mouth then moving to touch the cheek (where you eat and sleep).",
          "hintBm": "Menyentuh bibir kemudian beralih menyentuh pipi (tempat makan dan tidur).",
          "praise": "Hideout Located: Suspect's secret HOME uncovered!",
          "praiseBm": "Tempat Sembunyi Ditemui: RUMAH (HOME) rahsia suspek dibongkar!"
        },
        {
          "prompt": "Gio checks the cot in the corner: \"The sheets are rumpled!\" A hand draws down across the face as the eyes shut. Which daily routine proves the suspect stayed here overnight?",
          "promptBm": "Gio memeriksa katil bujang di sudut: \"Cadarnya berkedut!\" Tangan menarik ke bawah merentasi muka sambil mata terpejam. Rutin manakah membuktikan suspek bermalam di sini?",
          "image": "assets/signs/forensic/clue_sleep.png",
          "targetSign": "SLEEP",
          "options": [
            "SLEEP",
            "WAKE",
            "REST",
            "DREAM"
          ],
          "hint": "Hand drawing downward across the face as eyes close.",
          "hintBm": "Tangan meluncur ke bawah merentasi muka sambil mata terpejam.",
          "praise": "Routine Confirmed: Suspect stayed overnight to SLEEP!",
          "praiseBm": "Rutin Disahkan: Suspek bermalam di sini untuk TIDUR (SLEEP)!"
        },
        {
          "prompt": "The washbasin shows soapy residue: \"The suspect tried to wipe away mud and fingerprints!\" One flat palm sweeps smoothly across the other palm. Which maintenance chore was the suspect performing to destroy evidence?",
          "promptBm": "Sinki memaparkan kesan sabun: \"Suspek cuba menyapu lumpur dan cap jari!\" Satu tapak tangan menyapu rata di atas tapak tangan lain. Kerja pembersihan manakah ini?",
          "image": "assets/signs/forensic/clue_clean.png",
          "targetSign": "CLEAN",
          "options": [
            "CLEAN",
            "DIRTY",
            "WASH",
            "DUST"
          ],
          "hint": "One flat palm wiping smoothly across the other flat palm from heel to fingertips.",
          "hintBm": "Satu tapak tangan menyapu rata di atas tapak tangan lain dari pangkal ke hujung jari.",
          "praise": "Cover-up Foiled: Suspect was trying to CLEAN up the scene!",
          "praiseBm": "Helah Digagalkan: Suspek cuba MEMBERSIHKAN (CLEAN) bukti!"
        }
      ]
    }
  },
  {
    "id": 10,
    "level": 1,
    "isBoss": true,
    "gameMode": "boss_survival",
    "modeBadge": "Level 1 Boss: Survival Challenge",
    "title": "Showdown at Foggy Canal Harbor",
    "titleBm": "Pertarungan Dermaga Berkabus",
    "shortTitle": "Harbor Showdown",
    "shortTitleBm": "Boss: Cabaran Survival",
    "subtitle": "Confront the smuggler informant at midnight in real-time sign language dialogue to secure the Key of Doors!",
    "subtitleBm": "Berdepan dengan pemberi maklumat penyeludup pada tengah malam dalam dialog isyarat langsung untuk mendapatkan Kunci Pintu!",
    "prop": "boss_key",
    "icon": "award",
    "xp": 300,
    "mystery": {
      "caseName": "Case #10: The Midnight Gate Standoff",
      "location": "Story Museum • Rear Midnight Iron Gates",
      "locationBm": "Muzium Cerita • Pintu Pagar Besi Belakang",
      "clueUnlocked": {
        "id": "clue_first_key",
        "name": "The First Ancient Key (The Key of Doors)",
        "nameBm": "Kunci Kuno Pertama (Kunci Pintu)",
        "desc": "The first of three legendary master keys, unlocking the passage to Level 2: Everyday Life & Interactions!",
        "descBm": "Kunci utama pertama daripada tiga kunci legenda, membuka laluan ke Tahap 2: Kehidupan Seharian & Interaksi!",
        "icon": "key"
      },
      "steps": [
        {
          "prompt": "Under the cold moonlight by the canal gates, the informant stands warily by the iron latch. You must initiate formal contact politely without alarming him. Which greeting sign opens the dialogue?",
          "promptBm": "Di bawah sinaran bulan di pintu terusan, pemberi maklumat berdiri cemas di tepi pagar besi. Anda mesti memulakan hubungan secara sopan. Isyarat salam pembuka manakah patut digunakan?",
          "image": "assets/signs/forensic/clue_hello.png",
          "targetSign": "HELLO",
          "options": [
            "HELLO",
            "STOP",
            "LEAVE",
            "LOOK"
          ],
          "hint": "A polite open hand salute moving forward from the temple.",
          "hintBm": "Tabik tangan terbuka bergerak ke hadapan dari pelipis.",
          "praise": "Contact Initiated: HELLO established mutual contact!",
          "praiseBm": "Hubungan Bermula: Ucapan HELLO mewujudkan hubungan awal!"
        },
        {
          "prompt": "The informant demands identification: \"Who approaches at midnight?!\" Two 'H' fingers tap crosswise across each other. Which identity sign proves your official credentials?",
          "promptBm": "Pemberi maklumat menuntut pengenalan: \"Siapa yang datang tengah malam ini?!\" Dua jari 'H' mengetuk bersilang. Isyarat identiti manakah membuktikan kredensial anda?",
          "image": "assets/signs/forensic/clue_name.png",
          "targetSign": "NAME",
          "options": [
            "NAME",
            "BADGE",
            "TITLE",
            "RANK"
          ],
          "hint": "Two fingers tapping in an X-cross over another pair of fingers.",
          "hintBm": "Dua jari mengetuk bersilang 'X' di atas sepasang jari lagi.",
          "praise": "Credential Verified: Official NAME recognized!",
          "praiseBm": "Kredensial Disahkan: NAMA rasmi dikenali!"
        },
        {
          "prompt": "The informant warns of syndicate patrols closing in: \"The canal locks are being sealed!\" A fist with thumb up lifts from a flat palm. Which urgent survival sign appeals for his assistance?",
          "promptBm": "Pemberi maklumat memberi amaran rondaan sindiket semakin dekat: \"Pintu terusan sedang dikunci!\" Penumbuk ibu jari ke atas diangkat dari tapak tangan. Isyarat bantuan cemas manakah ini?",
          "image": "assets/signs/forensic/clue_help.png",
          "targetSign": "HELP",
          "options": [
            "HELP",
            "RUN",
            "HIDE",
            "WAIT"
          ],
          "hint": "A thumbs-up fist being lifted upward on a supporting flat palm.",
          "hintBm": "Genggaman ibu jari ke atas diangkat di atas tapak tangan yang menyokong.",
          "praise": "Alliance Sealed: He agrees to HELP!",
          "praiseBm": "Pakatan Termeterai: Dia bersetuju untuk MEMBANTU (HELP)!"
        },
        {
          "prompt": "The informant hands over the golden Key of Doors before fading into the shadows! Fingertips touch the chin and extend forward in deep gratitude. Which polite closing sign concludes the encounter?",
          "promptBm": "Pemberi maklumat menyerahkan Kunci Pintu emas sebelum beredar ke dalam bayang! Hujung jari menyentuh dagu dan dihulurkan ke hadapan dengan penuh rasa terima kasih. Isyarat santun manakah melengkapkan pertemuan ini?",
          "image": "assets/signs/forensic/clue_thankyou.png",
          "targetSign": "THANK-YOU",
          "options": [
            "THANK-YOU",
            "GOODBYE",
            "PLEASE",
            "WELCOME"
          ],
          "hint": "Fingertips touching the chin and moving forward toward the person.",
          "hintBm": "Hujung jari menyentuh dagu dan bergerak ke hadapan ke arah orang berkenaan.",
          "praise": "Level 1 Boss Cleared! The Key of Doors is in your hands!",
          "praiseBm": "Tahap 1 Boss Berjaya! Kunci Pintu kini di tangan anda!"
        }
      ]
    }
  },
  {
    "id": 11,
    "level": 2,
    "title": "The Frightened Witness",
    "titleBm": "Saksi Yang Ketakutan",
    "shortTitle": "Frightened Witness",
    "shortTitleBm": "Saksi Bimbang",
    "subtitle": "Read the emotional reactions of museum visitors to detect deception, anxiety, and hidden guilt.",
    "subtitleBm": "Baca reaksi emosi pelawat muzium untuk mengesan penipuan, kegelisahan, dan rasa bersalah.",
    "prop": "brain",
    "icon": "smile",
    "xp": 240,
    "memoryRecovery": 36,
    "gioExpression": "thinking",
    "learning": {
      "summary": "Emotions and feelings: happy, sad, angry, tired, excited, and anxious.",
      "coreSigns": [
        {
          "sign": "HAPPY",
          "desc": "Flat open hands brush upward against the chest repeatedly",
          "tip": "Upward joyful energy."
        },
        {
          "sign": "SAD",
          "desc": "Open hands in front of face drop down as shoulders sag",
          "tip": "Face and hands drop in sorrow."
        },
        {
          "sign": "ANGRY",
          "desc": "Claw hand pulls outward from face with intense expression",
          "tip": "Fierce claw motion."
        },
        {
          "sign": "TIRED",
          "desc": "Bent fingertips on chest roll outward and drop down",
          "tip": "Shoulders slump with fatigue."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #11: The Park Pavilion",
      "caseNameBm": "Kes #11: Pavilion Taman",
      "location": "Luma Central Park Pavilion",
      "locationBm": "Pavilion Taman Pusat Luma",
      "narrative": "A park gardener was trimming hedges near the museum fence when the thunderstorm hit. He saw a person fleeing with a heavy parcel. You ask: 'Did the person look angry or frightened?'",
      "narrativeBm": "Tukang kebun sedang memangkas pokok dekat pagar muzium ketika ribut petir melanda. Dia melihat seseorang berlari membawa bungkusan berat. Gio bertanya: 'Adakah orang itu kelihatan marah atau ketakutan?'",
      "steps": [
        {
                "prompt": "The witness signed with both flat open hands repeatedly brushing upward across their chest in a lively motion. Which emotion sign did they demonstrate?",
                "promptBm": "Saksi membuat isyarat dengan kedua-dua tapak tangan terbuka mengusap ke atas di dada berulang kali. Isyarat emosi manakah yang ditunjukkan?",
                "targetSign": "HAPPY",
                "hint": "Both flat open hands brush upward across the chest in fluid rhythmic strokes.",
                "hintBm": "Kedua-dua tapak tangan terbuka mengusap ke atas di dada dalam pergerakan lancar."
        },
        {
                "prompt": "Surveillance recorded the bystander signing with both open flat hands dropping limply downward in front of their face. Which emotional state sign was recorded?",
                "promptBm": "Kamera keselamatan merakam saksi membuat isyarat kedua-dua tapak tangan terbuka melurut lemah ke bawah di hadapan muka. Isyarat emosi manakah yang dirakam?",
                "targetSign": "SAD",
                "hint": "Open flat hands positioned in front of torso draw slowly and limply downward.",
                "hintBm": "Tapak tangan terbuka melurut perlahan dan terkulai ke bawah di hadapan badan."
        },
        {
                "prompt": "The park vendor described the confrontation where the suspect signed with arched claw-5 hands pulling sharply outward from the chest with sudden tension. Which hostile emotion sign was observed?",
                "promptBm": "Peniaga taman menceritakan pertengkaran di mana suspek membuat isyarat tangan cakar-5 ditarik keluar dengan tajam dari dada. Isyarat emosi marah manakah yang dilihat?",
                "targetSign": "ANGRY",
                "hint": "Claw-5 hand pulls sharply outward and away from chest with forceful motion.",
                "hintBm": "Tangan bentuk cakar-5 ditarik keluar dengan tajam dari dada dengan pergerakan tegas."
        },
        {
                "prompt": "The fleeing figure paused by the fountain signing with bent hands resting on the chest, rolling outward and slumping heavily downward. Which physical exhaustion sign was demonstrated?",
                "promptBm": "Kelibat yang melarikan diri berhenti dekat air pancut membuat isyarat jari bengkok di dada bergolek ke bawah dan terkulai lesu. Isyarat keletihan manakah yang ditunjukkan?",
                "targetSign": "TIRED",
                "hint": "Fingertips of bent hands resting on chest roll outward and slump heavily downward.",
                "hintBm": "Hujung jari bengkok di dada bergolek ke bawah dan terkulai lesu."
        }
],
      "clueUnlocked": {
        "name": "Witness Emotion Profile",
        "nameBm": "Profil Emosi Saksi",
        "desc": "Witness confirms the runner was anxious and exhausted, clutching the book like a guardian.",
        "descBm": "Saksi mengesahkan pelari itu cemas dan keletihan, memeluk buku itu bagai seorang pelindung."
      }
    },
    "modeBadge": "Emotions & Feelings"
  },
  {
    "id": 12,
    "level": 2,
    "title": "The Paramedic's Clinic Report",
    "titleBm": "Laporan Klinik Paramedik",
    "shortTitle": "Clinic Report",
    "shortTitleBm": "Pesakit Hilang",
    "subtitle": "Examine medical treatment notes and injury signs from the night guard's emergency examination.",
    "subtitleBm": "Teliti nota rawatan perubatan dan isyarat kecederaan daripada pemeriksaan kecemasan pengawal malam.",
    "prop": "shield",
    "icon": "activity",
    "xp": 250,
    "memoryRecovery": 40,
    "gioExpression": "focused",
    "learning": {
      "summary": "Health, anatomy, and medical assistance: head, stomach, pain, doctor, and hospital.",
      "coreSigns": [
        {
          "sign": "HEAD",
          "desc": "Fingertips touch temple then jaw",
          "tip": "Touches upper and lower head area."
        },
        {
          "sign": "PAIN",
          "desc": "Index fingers point toward each other and twist sharply",
          "tip": "Sharp inward twisting motion."
        },
        {
          "sign": "DOCTOR",
          "desc": "M-hand or bent fingertips tap inside of wrist like taking pulse",
          "tip": "Taking pulse at the wrist."
        },
        {
          "sign": "HOSPITAL",
          "desc": "H-fingers draw a cross on the upper arm",
          "tip": "Draws medical cross emblem."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #12: The Midnight Triage",
      "caseNameBm": "Kes #12: Rawatan Tengah Malam",
      "location": "Luma Community Health Clinic",
      "locationBm": "Klinik Kesihatan Komuniti Luma",
      "narrative": "Dr. Lee at the night clinic remembers someone rushing in around 00:30 AM with a scraped wrist from broken glass. Gio checks the patient log: 'Let us ask about their symptoms!'",
      "narrativeBm": "Dr. Lee di klinik malam mengingati seseorang bergegas masuk sekitar jam 00:30 dengan calar kaca pada pergelangan tangan. Gio menyemak log pesakit: 'Mari tanya tentang gejalanya!'",
      "steps": [
        {
                "prompt": "The paramedic noted the injured guard signing: both extended index fingers pointing directly toward each other and twisting repeatedly near the torso. Which symptom sign was recorded?",
                "promptBm": "Paramedik mencatat pengawal membuat isyarat: kedua-dua jari telunjuk menghadap antara satu sama lain dan memulas berulang kali berhampiran dada. Isyarat gejala manakah yang dirakam?",
                "targetSign": "PAIN",
                "hint": "Both index fingers point directly toward each other and twist inward repeatedly near the chest.",
                "hintBm": "Kedua-dua jari telunjuk menghadap antara satu sama lain dan memulas ke dalam berulang kali berhampiran dada."
        },
        {
                "prompt": "The injured victim indicated the impact site by touching fingertips to the temple and tracing down toward the jawline. Which anatomical location sign is this?",
                "promptBm": "Mangsa yang cedera menunjukkan lokasi hentaman dengan menyentuh hujung jari ke pelipis dahi dan melurut ke rahang. Isyarat bahagian badan manakah ini?",
                "targetSign": "HEAD",
                "hint": "Fingertips reach up to tap temple area, then trace down toward the jawline.",
                "hintBm": "Hujung jari menyentuh pelipis dahi, kemudian beralih ke bahagian rahang."
        },
        {
                "prompt": "The triage nurse identified the attending specialist by tapping the fingertips of their dominant hand twice firmly against the pulse of the inner wrist. Which professional sign was shown?",
                "promptBm": "Jururawat mengenal pasti pakar yang hadir dengan mengetuk hujung jari dua kali pada nadi pergelangan tangan. Isyarat profesion perubatan manakah ini?",
                "targetSign": "DOCTOR",
                "hint": "Dominant fingertips tap twice firmly against the pulse of the inner wrist.",
                "hintBm": "Hujung jari dominan mengetuk dua kali dengan tegas pada nadi pergelangan tangan."
        },
        {
                "prompt": "The ambulance dispatch log recorded the destination using an 'H' handshape drawing a medical cross on the upper arm and shoulder. Which facility sign was demonstrated?",
                "promptBm": "Log ambulans merekodkan destinasi menggunakan bentuk jari 'H' melukis lambang palang perubatan pada bahu dan lengan atas. Isyarat kemudahan perubatan manakah ini?",
                "targetSign": "HOSPITAL",
                "hint": "Fingers in H-handshape draw a medical cross mark on upper shoulder and arm.",
                "hintBm": "Jari dalam bentuk H melukis lambang palang perubatan pada bahu dan lengan atas."
        }
],
      "clueUnlocked": {
        "name": "Misplaced Clinic Visitor Badge",
        "nameBm": "Pas Pelawat Klinik Yang Tertinggal",
        "desc": "A visitor clip left on the triage counter with the Moon Café stamp.",
        "descBm": "Klip pas pelawat di kaunter rawatan dengan cop Kafe Moon."
      }
    },
    "modeBadge": "Health & The Body"
  },
  {
    "id": 13,
    "level": 2,
    "title": "The Grand Bistro Alibi",
    "titleBm": "Alibi Bistro Grand",
    "shortTitle": "Bistro Alibi",
    "shortTitleBm": "Perbualan Kafe",
    "subtitle": "Verify the prime suspect's dining alibi, order receipts, and payment logs at the canal restaurant.",
    "subtitleBm": "Sahkan alibi makan malam suspek utama, resit pesanan, dan log bayaran di restoran terusan.",
    "prop": "conveyor",
    "icon": "utensils",
    "xp": 260,
    "memoryRecovery": 43,
    "gioExpression": "happy",
    "learning": {
      "summary": "Restaurant dining, menu choices, asking for the check, and tipping etiquette.",
      "coreSigns": [
        {
          "sign": "MENU",
          "desc": "Flat hands open like a book",
          "tip": "Opening a menu book."
        },
        {
          "sign": "PAY",
          "desc": "Index finger slides forward along the flat non-dominant palm",
          "tip": "Sliding money across a counter."
        },
        {
          "sign": "WATER",
          "desc": "W-hand taps chin twice",
          "tip": "Three fingers W tapping chin."
        },
        {
          "sign": "CHECK",
          "desc": "Index fingers and thumbs draw a small rectangle card in the air",
          "tip": "Drawing bill/receipt shape."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #13: The Barista's Testimony",
      "caseNameBm": "Kes #13: Kesaksian Barista",
      "location": "Moon Café Counter",
      "locationBm": "Kaunter Kafe Moon",
      "narrative": "Barista Jax recognizes the clinic badge immediately. 'She sat in the corner booth writing frantically. To get her trust, you had to communicate clearly in ASL!'",
      "narrativeBm": "Barista Jax mengenali pas klinik itu serta-merta. 'Dia duduk di sudut menulis tanpa henti. Untuk mendapat kepercayaannya, kami berisyarat dalam ASL!'",
      "steps": [
        {
                "prompt": "The bistro waiter remembers the suspect browsing a document signed by holding both flat hands together like a folder and opening them outward. Which dining item sign was requested?",
                "promptBm": "Pelayan bistro mengingati suspek meneliti dokumen yang diisyaratkan dengan kedua-dua tapak tangan rapat kemudian dibuka seperti buku. Isyarat item restoran manakah yang diminta?",
                "targetSign": "MENU",
                "hint": "Both flat open palms held together opening outward like a folded booklet.",
                "hintBm": "Kedua-dua tapak tangan rata rapat kemudian dibuka seperti helaian menu."
        },
        {
                "prompt": "The caf\u00e9 barista observed the customer signing by tapping a 'W' handshape (index, middle, ring fingers spread upright) twice against the chin. Which beverage sign was ordered?",
                "promptBm": "Barista kafe melihat pelanggan membuat isyarat bentuk 'W' mengetuk dagu dua kali. Isyarat minuman manakah yang dipesan?",
                "targetSign": "WATER",
                "hint": "Three upright fingers in W-handshape tap the chin twice lightly.",
                "hintBm": "Tiga jari menegak bentuk W mengetuk dagu dua kali perlahan-lahan."
        },
        {
                "prompt": "The cashier verified the financial transaction where the suspect signed: dominant index finger sliding forward across an open upward palm. Which transaction sign was performed?",
                "promptBm": "Juruwang mengesahkan transaksi di mana suspek membuat isyarat: jari telunjuk dominan meluncur ke hadapan di atas tapak tangan terbuka. Isyarat bayaran manakah yang dilakukan?",
                "targetSign": "PAY",
                "hint": "Dominant index finger slides smoothly forward and outward across open flat palm.",
                "hintBm": "Jari telunjuk dominan meluncur ke hadapan di atas tapak tangan terbuka."
        },
        {
                "prompt": "The counter clerk handed over the final invoice, signing with both index fingers and thumbs tracing a rectangular slip card in the air. Which billing sign was exchanged?",
                "promptBm": "Kerani kaunter menyerahkan invois akhir, membuat isyarat ibu jari dan telunjuk melukis bentuk kad segi empat tepat di udara. Isyarat bil manakah yang ditunjukkan?",
                "targetSign": "CHECK",
                "hint": "Index fingers and thumbs trace the perimeter of a rectangular bill in mid-air.",
                "hintBm": "Ibu jari dan telunjuk melukis sempadan segi empat tepat bil di udara."
        }
],
      "clueUnlocked": {
        "name": "Barista's Hidden Napkin Note",
        "nameBm": "Nota Napkin Rahsia Barista",
        "desc": "Contains an address for an electronics shop: 'Tech Plaza, Stall #4'.",
        "descBm": "Mengandungi alamat kedai elektronik: 'Plaza Teknologi, Gerai #4'."
      }
    },
    "modeBadge": "Restaurant & Dining Out"
  },
  {
    "id": 14,
    "level": 2,
    "title": "The Black Market Appraisal",
    "titleBm": "Penilaian Pasaran Gelap",
    "shortTitle": "Black Market Appraisal",
    "shortTitleBm": "Pembelian Ganjil",
    "subtitle": "Intercept encrypted price tags and underground currency signs at the antique pawnshop.",
    "subtitleBm": "Pintas tanda harga tersulit dan isyarat mata wang pasaran gelap di kedai pajak gadai antik.",
    "prop": "chain",
    "icon": "shopping-bag",
    "xp": 270,
    "memoryRecovery": 47,
    "gioExpression": "thinking",
    "learning": {
      "summary": "Shopping and money: prices, buying, cheap, expensive, and hardware sizes.",
      "coreSigns": [
        {
          "sign": "MONEY",
          "desc": "Flat O-hand repeatedly taps flat upward palm",
          "tip": "Tapping bills into hand."
        },
        {
          "sign": "BUY",
          "desc": "Flat O-hand moves forward and down from non-dominant palm",
          "tip": "Handing payment across."
        },
        {
          "sign": "EXPENSIVE",
          "desc": "Sign MONEY, then toss hand upward opening fingers in shock",
          "tip": "Money flying away."
        },
        {
          "sign": "SMALL",
          "desc": "Both flat hands face each other closely showing narrow gap",
          "tip": "Compact width between palms."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #14: Tech Plaza Transaction",
      "caseNameBm": "Kes #14: Transaksi Plaza Teknologi",
      "location": "Tech Plaza Hardware Kiosk",
      "locationBm": "Kiosk Perkakasan Plaza Teknologi",
      "narrative": "The electronics vendor remembers Mira Reed visiting right before the storm hit. She didn't buy a toy or gadget; she purchased an industrial-grade secure storage drive.",
      "narrativeBm": "Peniaga elektronik mengingati Mira Reed berkunjung sejurus sebelum ribut. Dia bukan membeli gajet biasa; dia membeli pemacu storan berkeselamatan tinggi.",
      "steps": [
        {
                "prompt": "Under the UV blacklight, residue on the counter reveals the transaction sign: Flat-O dominant hand repeatedly tapping a flat upward palm. Which asset sign was exchanged?",
                "promptBm": "Di bawah lampu UV, sisa pada kaunter mendedahkan isyarat transaksi: bentuk O leper mengetuk tapak tangan terbuka berulang kali. Isyarat aset berharga manakah yang ditukar?",
                "targetSign": "MONEY",
                "hint": "Flat O taps open palm repeatedly.",
                "hintBm": "Bentuk O leper mengetuk tapak tangan terbuka berulang kali."
        },
        {
                "prompt": "Surveillance footage shows the customer delivering cash signed by moving a Flat-O hand forward and outward from an open palm. Which purchasing sign was performed?",
                "promptBm": "Rakaman kamera menunjukkan pelanggan menyerahkan wang dengan menggerakkan tangan bentuk O leper ke hadapan dari tapak tangan. Isyarat pembelian manakah yang dilakukan?",
                "targetSign": "BUY",
                "hint": "Hand moves forward from palm as if handing over cash.",
                "hintBm": "Tangan bergerak ke hadapan dari tapak tangan seolah-olah menghulurkan wang."
        },
        {
                "prompt": "The antique dealer appraised the stolen relic by signing the money sign, then dramatically tossing the hand upward with fingers bursting open. Which valuation sign was expressed?",
                "promptBm": "Penilai antik menilai artifak dengan membuat isyarat wang, kemudian melambungkan tangan ke atas dengan jari terbuka luas. Isyarat nilai mahal manakah yang ditunjukkan?",
                "targetSign": "EXPENSIVE",
                "hint": "Money sign tossed upward opening fingers dramatically.",
                "hintBm": "Isyarat wang dilambung ke atas dengan jari terbuka luas."
        },
        {
                "prompt": "The locksmith described the secret hidden compartment by holding two flat vertical palms facing each other with a very narrow gap. Which dimension sign was demonstrated?",
                "promptBm": "Tukang kunci menggambarkan ruang rahsia dengan menunjukkan kedua-dua tapak tangan rata berhadapan dalam jarak yang sangat sempit. Isyarat saiz manakah yang ditunjukkan?",
                "targetSign": "SMALL",
                "hint": "Hands face each other closely with a narrow gap.",
                "hintBm": "Kedua-dua tangan berhadapan rapat dengan ruang sempit."
        }
],
      "clueUnlocked": {
        "name": "High-Capacity Storage Drive Serial",
        "nameBm": "Siri Pemacu Storan Berkapasiti Tinggi",
        "desc": "A 10TB encrypted archive drive designed for preserving high-definition sign videos.",
        "descBm": "Pemacu arkib 10TB disulitkan untuk menyimpan video isyarat definisi tinggi."
      }
    },
    "modeBadge": "Shopping & Money"
  },
  {
    "id": 15,
    "level": 2,
    "title": "The Underground Club Match",
    "titleBm": "Perlawanan Kelab Bawah Tanah",
    "shortTitle": "Underground Match",
    "shortTitleBm": "Pertembungan Taman",
    "subtitle": "Infiltrate a secluded sports arena where syndicate couriers bet on athletic games to exchange passphrases.",
    "subtitleBm": "Menyusup masuk ke arena sukan tersembunyi tempat kurier sindiket bertaruh sukan untuk bertukar kata laluan.",
    "prop": "car",
    "icon": "zap",
    "xp": 280,
    "memoryRecovery": 50,
    "gioExpression": "focused",
    "learning": {
      "summary": "Hobbies and sports: soccer, reading, music, running, and outdoor activities.",
      "coreSigns": [
        {
          "sign": "BOOK",
          "desc": "Both flat hands open together like turning pages of a book",
          "tip": "Palms open like book covers."
        },
        {
          "sign": "MUSIC",
          "desc": "Dominant flat hand waves rhythmically across non-dominant forearm",
          "tip": "Conducting rhythm over arm."
        },
        {
          "sign": "RUN",
          "desc": "Both L-hands hook index finger to opposite thumb, wiggling forward in a sprint",
          "tip": "Mimicking sprinting legs."
        },
        {
          "sign": "SOCCER",
          "desc": "B-hand kicks against non-dominant hand",
          "tip": "Striking the ball."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #15: The Park Trail Sighting",
      "caseNameBm": "Kes #15: Penampakan Di Denai Taman",
      "location": "Luma Park Amphitheater",
      "locationBm": "Amfiteater Taman Luma",
      "narrative": "A street violinist was practicing under the amphitheater roof when the storm broke. She saw someone sprint across the lawn carrying a padded bag shaped like a book.",
      "narrativeBm": "Seorang pemain biola jalanan sedang berlatih di bawah bumbung amfiteater ketika ribut melanda. Dia melihat seseorang memecut membawa beg berlapik berbentuk buku.",
      "steps": [
        {
                "prompt": "The amphitheater technician saw the runner adjust the audio gear, signing with an open flat hand waving rhythmically back and forth across the forearm. Rotate the tumbler to this sign:",
                "promptBm": "Juruteknik melihat pelari melaraskan alat audio sambil membuat isyarat tangan melambai mengikut irama melintasi lengan. Pusingkan tumbler ke isyarat ini:",
                "targetSign": "MUSIC",
                "hint": "Hand waves rhythmically back and forth across forearm.",
                "hintBm": "Tangan melambai mengikut irama ke depan dan belakang melintasi lengan."
        },
        {
                "prompt": "Bouncers at the side exit spotted a figure bolting into the alleyway, signing: both hooked 'L' hands wiggling forward rapidly in a sprinting rhythm. Rotate the tumbler to this action sign:",
                "promptBm": "Pengawal pintu ternampak suspek memecut sambil membuat isyarat: kedua-dua tangan bentuk 'L' cangkuk bergetar ke hadapan dalam ritma larian pantas. Pusingkan tumbler ke isyarat ini:",
                "targetSign": "RUN",
                "hint": "Hooked L-hands wiggle forward rapidly in sprinting rhythm.",
                "hintBm": "Tangan bentuk L bercangkuk bergetar ke hadapan dalam ritma larian pantas."
        },
        {
                "prompt": "The stage referee observed the competitors signing with both hands in 'Y' handshapes twisting vigorously back and forth with lively wrist snaps. Rotate the tumbler to this activity sign:",
                "promptBm": "Pengadil pentas melihat peserta membuat isyarat kedua-dua tangan bentuk 'Y' memulas rancak ke depan dan belakang. Pusingkan tumbler ke isyarat ini:",
                "targetSign": "PLAY",
                "hint": "Both Y-hands shake back and forth with active wrist twists.",
                "hintBm": "Kedua-dua tangan bentuk Y digoncang ke depan dan belakang dengan pulasan pergelangan tangan."
        },
        {
                "prompt": "The syndicate victor finalized the challenge by sweeping their dominant hand inward and clamping it into a triumphant victory fist over the other hand. Rotate the tumbler to this victory sign:",
                "promptBm": "Pemenang sindiket mengesahkan cabaran dengan menyapu tangan ke dalam dan menguncinya menjadi penumbuk kejayaan. Pusingkan tumbler ke isyarat ini:",
                "targetSign": "WIN",
                "hint": "Dominant hand sweeps in and closes firmly into victory fist over stationary hand.",
                "hintBm": "Tangan dominan menyapu masuk dan mengunci menjadi penumbuk kemenangan."
        }
],
      "clueUnlocked": {
        "name": "Time Window 00:15 AM",
        "nameBm": "Tingkap Masa 00:15 AM",
        "desc": "Pins the runner's movement across the park at exactly fifteen minutes past midnight.",
        "descBm": "Menetapkan pergerakan pelari melintasi taman tepat jam 12:15 tengah malam."
      }
    },
    "modeBadge": "Hobbies & Sports"
  },
  {
    "id": 16,
    "level": 2,
    "title": "The Academy Manuscript Archive",
    "titleBm": "Arkib Manuskrip Akademi",
    "shortTitle": "Academy Archive",
    "shortTitleBm": "Buku Nota",
    "subtitle": "Cross-reference ancient historical curriculum manuscripts with the missing chapters in the university library.",
    "subtitleBm": "Rujuk silang manuskrip kurikulum sejarah kuno dengan bab yang hilang di perpustakaan universiti.",
    "prop": "rabbit",
    "icon": "book-open",
    "xp": 290,
    "memoryRecovery": 53,
    "gioExpression": "surprised",
    "learning": {
      "summary": "School and education: classroom items, teacher, student, subjects, and studying.",
      "coreSigns": [
        {
          "sign": "CLASS",
          "desc": "Both C-hands circle outward to touch pinky-to-pinky",
          "tip": "Forming an enclosed class group."
        },
        {
          "sign": "TEACHER",
          "desc": "Both flat O-hands move forward from temples, then flat hands drop down for agent marker",
          "tip": "Passing knowledge forward + person."
        },
        {
          "sign": "STUDENT",
          "desc": "Dominant hand scoops knowledge from palm to forehead, followed by agent marker",
          "tip": "Taking knowledge into mind + person."
        },
        {
          "sign": "STUDY",
          "desc": "Fingers flutter and wiggle toward the open palm",
          "tip": "Focusing eyes and mind on page."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #16: Luma Deaf Academy Archive",
      "caseNameBm": "Kes #16: Arkib Akademi Pekak Luma",
      "location": "Luma Deaf Academy, Room 102",
      "locationBm": "Akademi Pekak Luma, Bilik 102",
      "narrative": "At the local Deaf academy, a student shows Gio a notebook found tucked inside a school desk. On the cover is the identical keyhole emblem that Gio remembers from his awakening!",
      "narrativeBm": "Di akademi Pekak tempatan, seorang pelajar menunjukkan Gio buku nota yang terselit di meja sekolah. Pada kulitnya terdapat lambang lubang kunci yang sama persis seperti yang Gio ingati!",
      "steps": [
        {
                "prompt": "The academy registrar signed: both 'C' hands starting with thumbs together and circling outward to touch pinky-to-pinky in an enclosed group. Which group sign was demonstrated?",
                "promptBm": "Pendaftar akademi membuat isyarat: kedua-dua tangan bentuk 'C' bermula bersama dan berpusing keluar sehingga bertemu jari kelengkeng. Isyarat kumpulan manakah ini?",
                "targetSign": "CLASS",
                "hint": "Both C-hands form a circular boundary.",
                "hintBm": "Kedua-dua tangan bentuk C membentuk sempadan bulatan."
        },
        {
                "prompt": "The archival clerk identified the instructor by signing with flat-O hands moving forward from the temples, followed by the downward agent marker. Which educational role sign was shown?",
                "promptBm": "Kerani arkib mengenal pasti pengajar dengan membuat isyarat tangan bentuk O leper bergerak ke hadapan dari pelipis, diikuti penanda orang. Isyarat peranan guru manakah ini?",
                "targetSign": "TEACHER",
                "hint": "Hands from temple move forward followed by person marker.",
                "hintBm": "Tangan dari pelipis bergerak ke hadapan diikuti penanda orang."
        },
        {
                "prompt": "A library witness signed: scooping knowledge from an open flat palm up to the forehead, followed by the downward agent marker. Which learner sign was demonstrated?",
                "promptBm": "Saksi perpustakaan membuat isyarat: mengaut pengetahuan dari tapak tangan ke dahi, diikuti penanda orang ke bawah. Isyarat pelajar manakah ini?",
                "targetSign": "STUDENT",
                "hint": "Scoop from palm to forehead followed by person marker.",
                "hintBm": "Mengaut dari tapak tangan ke dahi diikuti penanda orang."
        },
        {
                "prompt": "The catalog supervisor observed reading activity signed by continuously fluttering and wiggling the fingers of the dominant hand over an open flat palm. Which academic action sign was performed?",
                "promptBm": "Penyelia katalog melihat aktiviti membaca yang diisyaratkan dengan jari bergetar berterusan di atas tapak tangan terbuka. Isyarat belajar manakah ini?",
                "targetSign": "STUDY",
                "hint": "Wiggling fingers over open flat palm continuously.",
                "hintBm": "Jari bergetar berterusan di atas tapak tangan terbuka."
        }
],
      "clueUnlocked": {
        "name": "Torn Blueprint Page: Security Robotics",
        "nameBm": "Cebisan Pelan: Robotik Keselamatan",
        "desc": "A technical sketch showing an intelligent companion robot with deerstalker hat: Unit G-10.",
        "descBm": "Lakaran teknikal menunjukkan robot pendamping dengan topi detektif: Unit G-10."
      }
    },
    "modeBadge": "School & Education"
  },
  {
    "id": 17,
    "level": 2,
    "title": "The Locksmith Syndicate Roster",
    "titleBm": "Senarai Sindiket Tukang Kunci",
    "shortTitle": "Locksmith Roster",
    "shortTitleBm": "Bengkel Jurutera",
    "subtitle": "Identify the trade specialist who fabricated the counterfeit picklocks among city professional guilds.",
    "subtitleBm": "Kenal pasti pakar pertukangan yang menempa kunci palsu dalam kalangan persatuan profesion bandar.",
    "prop": "brain",
    "icon": "cpu",
    "xp": 300,
    "memoryRecovery": 57,
    "gioExpression": "surprised",
    "learning": {
      "summary": "Work and professions: office, computer, boss, meeting, and technical trades.",
      "coreSigns": [
        {
          "sign": "OFFICE",
          "desc": "Both O-hands form boundary walls in front of body",
          "tip": "Outlining a four-walled office room."
        },
        {
          "sign": "COMPUTER",
          "desc": "C-hand moves upward along the horizontal forearm",
          "tip": "C scanning up the arm screen."
        },
        {
          "sign": "BOSS",
          "desc": "Claw hand taps the shoulder rank insignia",
          "tip": "Showing military or rank epaulet."
        },
        {
          "sign": "WORK",
          "desc": "Dominant fist taps the wrist of the non-dominant fist twice",
          "tip": "Fists tapping wrists."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #17: Blueprint of Unit G-10",
      "caseNameBm": "Kes #17: Pelan Reka Bentuk Unit G-10",
      "location": "Vance Automation Labs",
      "locationBm": "Makmal Automasi Vance",
      "narrative": "Engineer Vance looks at Gio with wide eyes: 'Unit G-10! You were built right here five years ago as the museum's automated cultural guardian. Mira Reed helped program your language core!'",
      "narrativeBm": "Jurutera Vance memandang Gio dengan mata terbeliak: 'Unit G-10! Awak dicipta di sini lima tahun lalu sebagai penjaga budaya muzium. Mira Reed membantu memprogramkan teras bahasa awak!'",
      "steps": [
        {
                "prompt": "The syndicate informant identified the maintenance crew by signing: dominant 'A' fist tapping firmly twice on top of the stationary wrist. Which occupational sign was demonstrated?",
                "promptBm": "Pemberi maklumat mengenal pasti kru penyelenggaraan dengan membuat isyarat: penumbuk 'A' mengetuk dua kali di atas pergelangan tangan. Isyarat kerja manakah ini?",
                "targetSign": "WORK",
                "hint": "Dominant A-fist taps firmly on top of stationary wrist twice.",
                "hintBm": "Penumbuk A dominan mengetuk dengan tegas dua kali di atas pergelangan tangan."
        },
        {
                "prompt": "The electronic terminal logs recorded an intruder signing with a curved 'C' hand moving up the forearm in repeated arches. Which digital device sign was identified?",
                "promptBm": "Log terminal merekodkan penceroboh membuat isyarat tangan bentuk 'C' melengkung bergerak ke atas lengan. Isyarat komputer manakah ini?",
                "targetSign": "COMPUTER",
                "hint": "Curved C-hand moves up the forearm repeatedly in small arcs.",
                "hintBm": "Tangan bentuk C melengkung bergerak ke atas lengan dalam lengkungan kecil."
        },
        {
                "prompt": "The intercepted syndicate hierarchy memo identified the ringleader by placing a curved claw hand on the shoulder epaulet. Which leadership authority sign was demonstrated?",
                "promptBm": "Memo hierarki sindiket mengenal pasti ketua dengan meletakkan tangan cakar melengkung pada bahagian bahu. Isyarat ketua manakah ini?",
                "targetSign": "BOSS",
                "hint": "Curved claw hand touches shoulder epaulet twice.",
                "hintBm": "Tangan bentuk cakar melengkung menyentuh bahu dua kali."
        },
        {
                "prompt": "The warehouse foreman signed an urgent directive: extended index finger pointing forward and striking downward decisively onto an open palm. Which directive sign was demonstrated?",
                "promptBm": "Ketua gudang memberi arahan tegas: jari telunjuk dihulur ke hadapan dan menghentak ke bawah pada tapak tangan terbuka. Isyarat arahan manakah ini?",
                "targetSign": "ORDER",
                "hint": "Index finger points forward from lips then strikes downward firmly.",
                "hintBm": "Jari telunjuk bergerak dari bibir kemudian menghentak ke bawah dengan tegas."
        }
],
      "clueUnlocked": {
        "name": "Museum Robotics Log: Unit G-10 ('Gio')",
        "nameBm": "Log Robotik Muzium: Unit G-10 ('Gio')",
        "desc": "Confirms Gio was designed as an archive companion programmed to protect signed stories.",
        "descBm": "Mengesahkan Gio dicipta sebagai robot arkib untuk melindungi cerita bahasa isyarat."
      }
    },
    "modeBadge": "Work & Professions"
  },
  {
    "id": 18,
    "level": 2,
    "title": "The Stormy Canal Crossing",
    "titleBm": "Lintasan Terusan Ribut",
    "shortTitle": "Canal Crossing",
    "shortTitleBm": "Malam Ribut",
    "subtitle": "Track the syndicate's boat across swollen floodgates and tempestuous gale winds through the locks.",
    "subtitleBm": "Kesan bot sindiket merentasi pintu air banjir dan tiupan ribut kencang melalui pintu terusan.",
    "prop": "shield",
    "icon": "cloud-rain",
    "xp": 310,
    "memoryRecovery": 60,
    "gioExpression": "thinking",
    "learning": {
      "summary": "Weather and nature: sun, rain, snow, hot, cold, and seasonal storm changes.",
      "coreSigns": [
        {
          "sign": "RAIN",
          "desc": "Both claw hands drop downward repeatedly like rainfall",
          "tip": "Fingers fluttering down like raindrops."
        },
        {
          "sign": "SUN",
          "desc": "C-hand draws a circle in the sky then bursts open rays",
          "tip": "Circular radiant burst."
        },
        {
          "sign": "COLD",
          "desc": "Fists shake in front of body while shivering",
          "tip": "Shivering with cold."
        },
        {
          "sign": "STORM",
          "desc": "Both hands swirl and crash together with turbulent wind motion",
          "tip": "Turbulent wind and lightning."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #18: The Blackout Logs",
      "caseNameBm": "Kes #18: Log Terputus Bekalan",
      "location": "Luma Meteorological Center",
      "locationBm": "Pusat Meteorologi Luma",
      "narrative": "The city's electrical grid suffered a massive surge at 00:08 AM. A high-voltage lightning strike hit the museum roof, rebooting all digital servers and wiping cached memories.",
      "narrativeBm": "Grid elektrik bandar mengalami lonjakan besar pada 00:08 AM. Panahan kilat bervoltan tinggi mengenai bumbung muzium, memulakan semula pelayan digital dan memadamkan memori sementara.",
      "steps": [
        {
                "prompt": "The harbor weather sensor logged the atmospheric downpour signed with both claw-5 hands dropping downward repeatedly in fluid dripping motions. Which weather sign was recorded?",
                "promptBm": "Penderia cuaca pelabuhan merekodkan hujan lebat yang diisyaratkan dengan kedua-dua tangan cakar-5 turun ke bawah berulang kali. Isyarat hujan manakah ini?",
                "targetSign": "RAIN",
                "hint": "Both claw-5 hands drop downward repeatedly in fluid dripping motions.",
                "hintBm": "Kedua-dua tangan cakar-5 turun ke bawah berulang kali dalam pergerakan menitis."
        },
        {
                "prompt": "The canal ferryman shivered in the sudden storm, signing with both clenched fists trembling and shaking close to the chest. Which temperature sign was observed?",
                "promptBm": "Pemandu feri menggigil dalam ribut, membuat isyarat kedua-dua penumbuk tertutup menggigil berhampiran dada. Isyarat sejuk manakah ini?",
                "targetSign": "COLD",
                "hint": "Both clenched fists tremble close to chest with shivering tension.",
                "hintBm": "Kedua-dua penumbuk menggigil berhampiran dada dengan ketegangan."
        },
        {
                "prompt": "The beacon keeper signaled the break in the clouds: index finger drawing a circle high in the sky, then bursting outward into open radiant rays. Which celestial sign was shown?",
                "promptBm": "Penjaga rumah api memberi isyarat awan berpecah: jari telunjuk melukis bulatan di langit kemudian membuka pancaran cahaya. Isyarat matahari manakah ini?",
                "targetSign": "SUN",
                "hint": "Index finger circles in sky then opens wide radiant rays.",
                "hintBm": "Jari telunjuk melukis bulatan di langit kemudian membuka pancaran luas."
        },
        {
                "prompt": "The coastal meteorologist recorded gale gusts signed with open flat palms wafting side to side in sweeping horizontal drafts. Which atmospheric sign was demonstrated?",
                "promptBm": "Ahli meteorologi merekodkan tiupan angin kencang yang diisyaratkan dengan tapak tangan terbuka melambai ke kiri dan kanan. Isyarat angin manakah ini?",
                "targetSign": "WIND",
                "hint": "Open flat hands waft rhythmically side to side in sweeping horizontal drafts.",
                "hintBm": "Tapak tangan terbuka melambai berirama ke kiri dan kanan mengikut arus angin."
        }
],
      "clueUnlocked": {
        "name": "Automated System Firmware Override Record",
        "nameBm": "Rekod Pintasan Perisian Tegar Sistem",
        "desc": "Proves an automated digital update failed during the blackout, triggering safety protocols.",
        "descBm": "Membuktikan kemas kini automatik gagal ketika blackout, mencetuskan protokol kecemasan."
      }
    },
    "modeBadge": "Weather & Nature"
  },
  {
    "id": 19,
    "level": 2,
    "title": "The Luma Landmark Hunt",
    "titleBm": "Pencarian Mercu Tanda Luma",
    "shortTitle": "Landmark Hunt",
    "shortTitleBm": "Lokasi Tersembunyi",
    "subtitle": "Triangulate the fugitive's drop-off point across the central bank, clocktower square, and transit hub.",
    "subtitleBm": "Tentukan titik serahan buruan merentasi bank pusat, dataran menara jam, dan hab transit.",
    "prop": "conveyor",
    "icon": "map-pin",
    "xp": 320,
    "memoryRecovery": 63,
    "gioExpression": "focused",
    "learning": {
      "summary": "Places around town: park, store, library, bank, and asking for directions.",
      "coreSigns": [
        {
          "sign": "PARK",
          "desc": "Fingerspell P-A-R-K or sign GREEN AREA",
          "tip": "Fingerspelled civic park."
        },
        {
          "sign": "STORE",
          "desc": "Both flat O-hands swing outward from wrists twice",
          "tip": "Displaying wares outward."
        },
        {
          "sign": "LIBRARY",
          "desc": "L-hand circles in a clockwise motion in front of chest",
          "tip": "Letter L moving in circle."
        },
        {
          "sign": "BANK",
          "desc": "Fingerspell B-A-N-K quickly",
          "tip": "Fingerspelled civic bank."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #19: The City Triangulation",
      "caseNameBm": "Kes #19: Triangulasi Bandar",
      "location": "Old Town Crossroads",
      "locationBm": "Simpang Pekan Lama",
      "narrative": "Gio aligns the map coordinates with the witness sightings. The lines intersect at the Old City Library, an ornate stone building closed for renovation.",
      "narrativeBm": "Gio memadankan koordinat peta dengan penampakan saksi. Garisan bersilang di Perpustakaan Bandar Lama, sebuah bangunan batu yang ditutup untuk pengubahsuaian.",
      "steps": [
        {
                "prompt": "The getaway driver's route intercepted at the public recreation grounds, signed by fingerspelling P-A-R-K in a crisp sequence across the chest. Which location sign was demonstrated?",
                "promptBm": "Laluan pemandu pintasan melalui kawasan riadah awam, diisyaratkan dengan mengeja jari P-A-R-K di hadapan dada. Isyarat taman manakah ini?",
                "targetSign": "PARK",
                "hint": "Fingerspell P-A-R-K across the chest in rapid crisp sequence.",
                "hintBm": "Eja abjad jari P-A-R-K secara pantas dan tepat di hadapan dada."
        },
        {
                "prompt": "The commercial checkpoint witness signed by swinging both flat-O hands outward from the chest twice as if opening shopfront doors. Which commercial venue sign was observed?",
                "promptBm": "Saksi di kawasan komersial membuat isyarat kedua-dua tangan bentuk O leper berayun ke luar dari dada seolah-olah membuka pintu kedai. Isyarat kedai manakah ini?",
                "targetSign": "STORE",
                "hint": "Both flat-O hands swing outward from chest twice.",
                "hintBm": "Kedua-dua tangan bentuk O leper berayun ke luar dari dada dua kali."
        },
        {
                "prompt": "The historical archive was identified by the witness signing: an 'L' handshape circling smoothly in an upright clockwise loop. Which research repository sign was shown?",
                "promptBm": "Arkib sejarah dikenal pasti apabila saksi membuat isyarat: tangan bentuk 'L' membuat bulatan lancar mengikut arah jam. Isyarat perpustakaan manakah ini?",
                "targetSign": "LIBRARY",
                "hint": "L-hand circles smoothly in an upright clockwise loop.",
                "hintBm": "Tangan bentuk L membuat bulatan lancar mengikut arah jam."
        },
        {
                "prompt": "The municipal vault guard signed with a 'B' hand tapping the temple, then moving down to establish a solid foundation on the palm. Which financial institution sign was recorded?",
                "promptBm": "Pengawal peti besi perbandaran membuat isyarat tangan bentuk 'B' mengetuk pelipis dan turun ke tapak tangan. Isyarat bank manakah ini?",
                "targetSign": "BANK",
                "hint": "B-hand touches temple then settles firmly onto palm foundation.",
                "hintBm": "Tangan bentuk B menyentuh pelipis kemudian mendarat kukuh di atas tapak tangan."
        }
],
      "clueUnlocked": {
        "name": "Underground Archive Coordinates",
        "nameBm": "Koordinat Arkib Bawah Tanah",
        "desc": "The coordinates lead to the sealed basement beneath the Old City Library.",
        "descBm": "Koordinat menghala ke bilik bawah tanah di bawah Perpustakaan Bandar Lama."
      }
    },
    "modeBadge": "Places Around Town"
  },
  {
    "id": 20,
    "level": 2,
    "title": "The Grand Bazaar Standoff",
    "titleBm": "Konfrontasi Bazar Utama",
    "shortTitle": "Bazaar Standoff",
    "shortTitleBm": "BOSS: Pengejaran Perpustakaan",
    "subtitle": "Corner the fence broker amidst the crowded night market through high-speed everyday community signing!",
    "subtitleBm": "Kepung broker barang curi di tengah-tengah pasar malam melalui isyarat komuniti pantas!",
    "prop": "trophy",
    "icon": "award",
    "xp": 450,
    "isBoss": true,
    "memoryRecovery": 67,
    "gioExpression": "surprised",
    "learning": {
      "summary": "Cumulative mastery of Level 2 Everyday Interactions: shopping, dining, emotions, and timing.",
      "coreSigns": [
        {
          "sign": "HELP",
          "desc": "Lifted thumbs up on palm",
          "tip": "Offering assistance."
        },
        {
          "sign": "TIME",
          "desc": "Tap wrist twice",
          "tip": "Checking critical deadline."
        },
        {
          "sign": "BUY",
          "desc": "Hand forward from palm",
          "tip": "Reference to storage purchase."
        },
        {
          "sign": "HAPPY",
          "desc": "Brush upward on chest",
          "tip": "Calming tension."
        },
        {
          "sign": "LIBRARY",
          "desc": "L-hand circle",
          "tip": "Confirming the archive location."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #20: The Terminal Intercept",
      "caseNameBm": "Kes #20: Pintasan Terminal",
      "location": "Old City Library, Archive Terminal",
      "locationBm": "Perpustakaan Bandar Lama, Terminal Arkib",
      "narrative": "Inside the shadowed library, a terminal screen blinks red! A secure drive is being formatted. You and Gio must input the correct sequence of signed credentials before the file is lost forever!",
      "narrativeBm": "Di dalam perpustakaan yang suram, skrin terminal berkelip merah! Pemacu selamat sedang diformat. Anda dan Gio mesti memasukkan kredensial isyarat sebelum fail hilang selamanya!",
      "steps": [
        {
                "prompt": "The security terminal flashes an emergency distress call: a thumbs-up fist placed firmly on an open flat palm and lifted upward together. Which urgent response sign was transmitted?",
                "promptBm": "Terminal keselamatan memaparkan panggilan kecemasan: penumbuk ibu jari tegak di atas tapak tangan dan diangkat ke atas. Isyarat tolong manakah ini?",
                "targetSign": "HELP",
                "hint": "Thumbs-up fist placed on open palm and lifted upward together.",
                "hintBm": "Penumbuk ibu jari tegak di atas tapak tangan terbuka diangkat ke atas bersama."
        },
        {
                "prompt": "The archive countdown timer blinks rapidly, signed by the index finger tapping twice firmly against the wrist where a watch rests. Which chronological constraint sign was verified?",
                "promptBm": "Kiraan detik arkib berkedip pantas, diisyaratkan dengan jari telunjuk mengetuk dua kali pada pergelangan tangan. Isyarat masa manakah ini?",
                "targetSign": "TIME",
                "hint": "Index finger taps the wrist twice where a watch is worn.",
                "hintBm": "Jari telunjuk mengetuk dua kali pada pergelangan tangan di mana jam dipakai."
        },
        {
                "prompt": "To bypass the final syndicate firewall, you must verify the statement's veracity signed: dominant index finger pointing upright and moving straight forward from the lips. Which truth sign was confirmed?",
                "promptBm": "Untuk melepasi firewall sindiket, anda mesti mengesahkan kebenaran yang diisyaratkan: jari telunjuk tegak bergerak lurus ke hadapan dari bibir. Isyarat benar manakah ini?",
                "targetSign": "TRUE",
                "hint": "Index finger points upright and moves straight forward from lips.",
                "hintBm": "Jari telunjuk tegak bergerak lurus ke hadapan dari bibir."
        },
        {
                "prompt": "The master vault unlock sequence concludes with the completion sign: both open-5 hands starting palms-up, then snapping downward decisively with palms facing away. Which completion sign finalized the case?",
                "promptBm": "Kunci peti besi utama selesai dengan isyarat penamat: kedua-dua tangan terbuka-5 bermula menghadap ke atas kemudian disentap ke bawah. Isyarat selesai manakah ini?",
                "targetSign": "FINISH",
                "hint": "Open-5 hands start palms-up, then snap downward with palms facing away.",
                "hintBm": "Kedua-dua tangan terbuka-5 menghadap ke atas kemudian disentap ke bawah."
        }
],
      "clueUnlocked": {
        "name": "The Second Key & Security Recording",
        "nameBm": "Kunci Kedua & Rakaman Keselamatan",
        "desc": "Footage shows Gio entering the vault at midnight! Screen: 'MEMORY RECOVERY: 67% — ACCESS RESTRICTED.'",
        "descBm": "Rakaman menunjukkan Gio masuk ke bilik kebal tengah malam! Skrin: 'MEMORI: 67% — DISEKAT.'"
      }
    },
    "modeBadge": "Level 2 Boss: Community Challenge"
  },
  {
    "id": 21,
    "level": 3,
    "title": "The Clocktower Rooftop Pursuit",
    "titleBm": "Pengejaran Bumbung Menara Jam",
    "shortTitle": "Rooftop Pursuit",
    "shortTitleBm": "Laluan Bawah Tanah",
    "subtitle": "Direct tactical detective teams across roofs and ledges using spatial directional verb pathways.",
    "subtitleBm": "Arahkan pasukan detektif taktikal merentasi bumbung menggunakan kata kerja arah ruang.",
    "prop": "chain",
    "icon": "navigation",
    "xp": 330,
    "memoryRecovery": 70,
    "gioExpression": "focused",
    "learning": {
      "summary": "Direction and spatial verbs: changing direction to show who is acting on whom (I-HELP-YOU vs YOU-HELP-ME).",
      "coreSigns": [
        {
          "sign": "HELP",
          "desc": "Directional: moved from self to partner (I help you) or partner to self (You help me)",
          "tip": "Move toward the recipient of help."
        },
        {
          "sign": "GO",
          "desc": "Both index fingers point and arc forward toward target location",
          "tip": "Moving forward into the path."
        },
        {
          "sign": "YOU",
          "desc": "Index finger points clearly to partner",
          "tip": "Clear spatial marker."
        },
        {
          "sign": "ME",
          "desc": "Index finger points to own chest",
          "tip": "Referencing the speaker."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #21: The Subterranean Corridor",
      "caseNameBm": "Kes #21: Koridor Bawah Tanah",
      "location": "Library Deep Vault Tunnels",
      "locationBm": "Terowong Bilik Kebal Perpustakaan",
      "narrative": "A steel trapdoor leads beneath the library. Stone walls bear carved directional arrows indicating how to navigate past automatic security sensors without tripping alarms.",
      "narrativeBm": "Pintu perangkap keluli menghala ke bawah perpustakaan. Dinding batu mempunyai ukiran anak panah menunjukkan cara melepasi sensor keselamatan automatik tanpa membunyikan penggera.",
      "steps": [
        {
          "prompt": "Instruct Gio directional navigation: sign GO.",
          "promptBm": "Arahkan panduan arah kepada Gio: buat isyarat PERGI (GO).",
          "targetSign": "GO",
          "hint": "Both index fingers arc forward. GO.",
          "hintBm": "Kedua-dua jari telunjuk melengkung ke hadapan. PERGI."
        },
        {
          "prompt": "Direct help toward Gio: directional sign HELP (I-help-you).",
          "promptBm": "Hulurkan bantuan ke arah Gio: isyarat arah BANTU (Saya bantu awak).",
          "targetSign": "HELP",
          "hint": "Move HELP sign forward toward partner.",
          "hintBm": "Gerakkan isyarat BANTU ke hadapan ke arah rakan."
        },
        {
          "prompt": "Specify the agent: sign YOU.",
          "promptBm": "Tentukan sasaran: buat isyarat AWAK (YOU).",
          "targetSign": "YOU",
          "hint": "Point to partner. YOU.",
          "hintBm": "Tunjuk ke rakan. AWAK."
        },
        {
          "prompt": "Reaffirm connection: sign ME.",
          "promptBm": "Tegaskan kerjasama: buat isyarat SAYA (ME).",
          "targetSign": "ME",
          "hint": "Point to chest. ME.",
          "hintBm": "Tunjuk ke dada. SAYA."
        }
      ],
      "clueUnlocked": {
        "name": "Archivist Navigational Glyph",
        "nameBm": "Glif Navigasi Arkivis",
        "desc": "Carved symbols showing the safe sequence through the electrified corridor.",
        "descBm": "Simbol ukiran menunjukkan urutan selamat melalui koridor berkuasa elektrik."
      }
    },
    "modeBadge": "Direction & Spatial Verbs"
  },
  {
    "id": 22,
    "level": 3,
    "title": "The Chief Inspector's Query",
    "titleBm": "Soalan Ketua Inspektor",
    "shortTitle": "Inspector's Query",
    "shortTitleBm": "Soal Siasat",
    "subtitle": "Conduct a formal inquiry using furrowed brows, Wh-questions, and rapid facial non-manual signals.",
    "subtitleBm": "Kendalikan pertanyaan rasmi menggunakan kening berkerut, soalan Wh, dan isyarat muka bukan manual.",
    "prop": "brain",
    "icon": "help-circle",
    "xp": 340,
    "memoryRecovery": 74,
    "gioExpression": "thinking",
    "learning": {
      "summary": "Questions & non-manual markers: furrowing eyebrows for Wh-questions and raising eyebrows for Yes/No questions.",
      "coreSigns": [
        {
          "sign": "WHO",
          "desc": "Index finger wiggles near chin while eyebrows furrow",
          "tip": "Furrow eyebrows: WH-question."
        },
        {
          "sign": "WHAT",
          "desc": "Open palms face upward and shake side-to-side with furrowed brow",
          "tip": "Palms up questioning motion."
        },
        {
          "sign": "WHERE",
          "desc": "Index finger wags side-to-side with questioning face",
          "tip": "Side to side finger wag."
        },
        {
          "sign": "WHY",
          "desc": "Hand touches temple then pulls outward changing to Y-handshape",
          "tip": "From forehead pulling out into Y."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #22: The Antechamber Guardian",
      "caseNameBm": "Kes #22: Penjaga Dewan Antechamber",
      "location": "Sanctuary Antechamber",
      "locationBm": "Dewan Menunggu Santuari",
      "narrative": "A tall cloaked figure blocks the archway. It is Soren, a senior Deaf archivist and former colleague of Mira Reed. He tests your true understanding before permitting entry.",
      "narrativeBm": "Satu susuk berjubah menghalang pintu gerbang. Dia ialah Soren, arkivis kanan Pekak dan bekas rakan sekerja Mira Reed. Dia menguji kefahaman anda sebelum membenarkan masuk.",
      "steps": [
        {
          "prompt": "Ask the guardian's identity: sign WHO (with furrowed eyebrows).",
          "promptBm": "Tanya identiti penjaga: buat isyarat SIAPA (WHO) (kening berkerut).",
          "targetSign": "WHO",
          "hint": "Wiggling index finger at chin with furrowed brow. WHO.",
          "hintBm": "Jari telunjuk bergetar di dagu dengan kening berkerut. SIAPA."
        },
        {
          "prompt": "Ask about the mission: sign WHAT.",
          "promptBm": "Tanya tentang matlamatnya: buat isyarat APA (WHAT).",
          "targetSign": "WHAT",
          "hint": "Open palms facing upward shake side to side. WHAT.",
          "hintBm": "Tapak tangan terbuka ke atas digoncang ke sisi. APA."
        },
        {
          "prompt": "Ask for the book's location: sign WHERE.",
          "promptBm": "Tanya di mana buku itu berada: buat isyarat DI MANA (WHERE).",
          "targetSign": "WHERE",
          "hint": "Index finger wags side to side. WHERE.",
          "hintBm": "Jari telunjuk bergoyang ke sisi. DI MANA."
        },
        {
          "prompt": "Ask for the motive: sign WHY.",
          "promptBm": "Tanya tujuan sebenar: buat isyarat KENAPA (WHY).",
          "targetSign": "WHY",
          "hint": "Touch temple then pull out into Y-hand. WHY.",
          "hintBm": "Sentuh pelipis dan tarik keluar menjadi Y. KENAPA."
        }
      ],
      "clueUnlocked": {
        "name": "Guardian's Seal of Intent",
        "nameBm": "Meterai Niat Penjaga",
        "desc": "Soren nods in approval: 'You do not just speak words; your face reveals genuine sincerity.'",
        "descBm": "Soren mengangguk tanda setuju: 'Anda bukan sekadar berisyarat; wajah anda memancarkan keikhlasan.'"
      }
    },
    "modeBadge": "Questions & Non-Manual Markers"
  },
  {
    "id": 23,
    "level": 3,
    "title": "The Cargo Express Manifest",
    "titleBm": "Manifes Kargo Ekspres",
    "shortTitle": "Cargo Manifest",
    "shortTitleBm": "Perjalanan Hilang",
    "subtitle": "Intercept the syndicate's international flight itinerary, train luggage, and steamship bill of lading.",
    "subtitleBm": "Pintas jadual penerbangan antarabangsa, bagasi kereta api, dan bil muatan kapal wap sindiket.",
    "prop": "car",
    "icon": "compass",
    "xp": 350,
    "memoryRecovery": 77,
    "gioExpression": "surprised",
    "learning": {
      "summary": "Travel and transportation: airports, trains, hotels, luggage, and booking journeys.",
      "coreSigns": [
        {
          "sign": "TRAIN",
          "desc": "Both H-hands: dominant fingers rub back and forth across non-dominant fingers",
          "tip": "Train gliding along dual tracks."
        },
        {
          "sign": "HOTEL",
          "desc": "H-hand flags backward like a flapping banner on flagpole",
          "tip": "Flapping flag on hotel pole."
        },
        {
          "sign": "TICKET",
          "desc": "Bent V-fingers clip the side of the flat non-dominant hand",
          "tip": "Hole puncher clipping a ticket."
        },
        {
          "sign": "CAR",
          "desc": "Both hands steer an imaginary steering wheel",
          "tip": "Steering wheel motion."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #23: The Ticket Stub",
      "caseNameBm": "Kes #23: Keratan Tiket",
      "location": "Vault Dispatch Room",
      "locationBm": "Bilik Penghantaran Bilik Kebal",
      "narrative": "On a metal desk lies a train ticket stub for the midnight express out of Luma City. Gio looks bewildered: 'Did Mira intend to run away with the Memory Book?'",
      "narrativeBm": "Di atas meja logam terletak keratan tiket kereta api ekspres tengah malam. Gio kelihatan keliru: 'Adakah Mira berniat melarikan diri bersama Buku Memori?'",
      "steps": [
        {
          "prompt": "Examine the mode of transport: sign TRAIN.",
          "promptBm": "Periksa mod pengangkutan: buat isyarat KERETA API (TRAIN).",
          "targetSign": "TRAIN",
          "hint": "H-fingers slide back and forth over tracks. TRAIN.",
          "hintBm": "Jari H menggelongsor atas landasan. KERETA API."
        },
        {
          "prompt": "Inspect the boarding credential: sign TICKET.",
          "promptBm": "Periksa tiket perjalanan: buat isyarat TIKET (TICKET).",
          "targetSign": "TICKET",
          "hint": "Bent V clips edge of hand. TICKET.",
          "hintBm": "Jari V bengkok mengetip tepi tangan. TIKET."
        },
        {
          "prompt": "Check the rendezvous accommodation: sign HOTEL.",
          "promptBm": "Semak penginapan pertemuan: buat isyarat HOTEL.",
          "targetSign": "HOTEL",
          "hint": "H-hand flags backward. HOTEL.",
          "hintBm": "Tangan H berkibar ke belakang. HOTEL."
        },
        {
          "prompt": "Confirm vehicular transport: sign CAR.",
          "promptBm": "Sahkan kenderaan persendirian: buat isyarat KERETA (CAR).",
          "targetSign": "CAR",
          "hint": "Steer steering wheel. CAR.",
          "hintBm": "Pegang stereng kereta. KERETA."
        }
      ],
      "clueUnlocked": {
        "name": "Preservation Archive Sanctuary Map",
        "nameBm": "Peta Santuari Arkib Pemuliharaan",
        "desc": "Reveals the ticket was bought for a digital preservation specialist coming TO Luma City, not leaving!",
        "descBm": "Mendedahkan tiket dibeli untuk pakar digital yang datang KE Bandar Luma, bukan melarikan diri!"
      }
    },
    "modeBadge": "Travel & Transportation"
  },
  {
    "id": 24,
    "level": 3,
    "title": "The Emergency Vault Lockout",
    "titleBm": "Kunci Masuk Kecemasan Kebal",
    "shortTitle": "Emergency Lockout",
    "shortTitleBm": "Amaran Kecemasan",
    "subtitle": "Override the central vault's lockdown klaxons and laser tripwires with urgent emergency safety signs.",
    "subtitleBm": "Batalkan siren sekatan kebal utama dan wayar laser dengan isyarat keselamatan kecemasan segera.",
    "prop": "shield",
    "icon": "alert-triangle",
    "xp": 360,
    "memoryRecovery": 80,
    "gioExpression": "surprised",
    "learning": {
      "summary": "Emergencies and safety: police, fire, warning sirens, emergency stops, and urgent requests.",
      "coreSigns": [
        {
          "sign": "DANGER",
          "desc": "Both open hands push outward defensively with tense posture",
          "tip": "Warning hands pushing hazard away."
        },
        {
          "sign": "STOP",
          "desc": "Open dominant hand chops down firmly across the open upward palm",
          "tip": "Decisive, firm stop chop."
        },
        {
          "sign": "EMERGENCY",
          "desc": "E-hand shakes urgently side to side in the air",
          "tip": "Urgent vibrating letter E."
        },
        {
          "sign": "SAFE",
          "desc": "Both S-fists cross in front of chest then open outward and uncross",
          "tip": "Breaking out of handcuffs to safety."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #24: The Automated Purge Alarm",
      "caseNameBm": "Kes #24: Penggera Pemadaman Automatik",
      "location": "Vault Central Terminal Hub",
      "locationBm": "Hab Terminal Pusat Bilik Kebal",
      "narrative": "A siren wails! Red strobe lights bathe the vault in crimson. A robotic voice counts down: 'UNKNOWN ACCESS DETECTED. PURGING UNAPPROVED DATA IN 45 SECONDS.' Gio cries: 'Detective, we must sign the emergency safety override!'",
      "narrativeBm": "Siren kecemasan berbunyi nyaring! Lampu strob merah menyinari bilik kebal. Suara robot mengira: 'AKSES TIDAK DIKENALI. MEMADAM DATA DALAM 45 SAAT.' Gio menjerit: 'Detektif, kita mesti masukkan isyarat pintasan kecemasan!'",
      "steps": [
        {
          "prompt": "Acknowledge the immediate hazard: sign DANGER.",
          "promptBm": "Akui bahaya serta-merta: buat isyarat BAHAYA (DANGER).",
          "targetSign": "DANGER",
          "hint": "Defensive open hands push outward. DANGER.",
          "hintBm": "Tangan terbuka menolak ke hadapan. BAHAYA."
        },
        {
          "prompt": "Declare a critical state: sign EMERGENCY.",
          "promptBm": "Isytiharkan keadaan kritikal: buat isyarat KECEMASAN (EMERGENCY).",
          "targetSign": "EMERGENCY",
          "hint": "E-hand shakes urgently in air. EMERGENCY.",
          "hintBm": "Tangan E bergetar cemas di udara. KECEMASAN."
        },
        {
          "prompt": "Command the system halt: sign STOP.",
          "promptBm": "Arahkan sistem berhenti: buat isyarat HENTI (STOP).",
          "targetSign": "STOP",
          "hint": "Firm downward hand chop across palm. STOP.",
          "hintBm": "Tangan memotong tegas atas tapak tangan. HENTI."
        },
        {
          "prompt": "Confirm all records are SECURE and SAFE.",
          "promptBm": "Sahkan semua rekod SELAMAT (SAFE).",
          "targetSign": "SAFE",
          "hint": "Crossed fists open outward to safety. SAFE.",
          "hintBm": "Penumbuk bersilang dibuka keluar. SELAMAT."
        }
      ],
      "clueUnlocked": {
        "name": "System Purge Override Code",
        "nameBm": "Kod Pintasan Pemadaman Sistem",
        "desc": "The siren silences. The automatic erasure is halted with seconds to spare.",
        "descBm": "Siren terhenti. Pemadaman data automatik berjaya dibatalkan tepat pada masanya."
      }
    },
    "modeBadge": "Emergencies & Safety"
  },
  {
    "id": 25,
    "level": 3,
    "title": "The Mastermind's Terminal Hack",
    "titleBm": "Penggodaman Terminal Dalang",
    "shortTitle": "Terminal Hack",
    "shortTitleBm": "Mesej Dilupakan",
    "subtitle": "Decrypt digital server backups, encrypted smartphones, and cyber transmission coordinates.",
    "subtitleBm": "Nyahkod sandaran pelayan digital, telefon pintar tersulit, dan koordinat transmisi siber.",
    "prop": "brain",
    "icon": "video",
    "xp": 370,
    "memoryRecovery": 84,
    "gioExpression": "happy",
    "learning": {
      "summary": "Modern technology: smartphones, internet, video calls, typing, and digital files.",
      "coreSigns": [
        {
          "sign": "PHONE",
          "desc": "Y-hand rests thumb on ear and pinky at corner of mouth",
          "tip": "Classic telephone handshape."
        },
        {
          "sign": "INTERNET",
          "desc": "Open 5 hands with middle fingers touching, rotating back and forth",
          "tip": "Middle fingers interwoven spinning."
        },
        {
          "sign": "VIDEO",
          "desc": "Non-dominant flat palm acts as camera screen; dominant hand moves like lens",
          "tip": "Camera filming onto palm screen."
        },
        {
          "sign": "TYPE",
          "desc": "Fingers wiggle like typing on an invisible keyboard",
          "tip": "Typing on keyboard keys."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #25: Mira Reed's Transmission",
      "caseNameBm": "Kes #25: Transmisi Mira Reed",
      "location": "Vault Master Console",
      "locationBm": "Konsol Utama Bilik Kebal",
      "narrative": "The terminal boots up. A video file labeled 'G-10_MIRA_FINAL.mp4' begins streaming. On screen appears Mira Reed, smiling warmly into the camera lens as she signs!",
      "narrativeBm": "Terminal dihidupkan. Fail video berlabel 'G-10_MIRA_FINAL.mp4' mula dimainkan. Di skrin terpapar wajah Mira Reed, tersenyum mesra ke lensa kamera sambil berisyarat!",
      "steps": [
        {
          "prompt": "Establish modern link: sign PHONE.",
          "promptBm": "Wujudkan sambungan komunikasi: buat isyarat TELEFON (PHONE).",
          "targetSign": "PHONE",
          "hint": "Y-hand at ear and mouth. PHONE.",
          "hintBm": "Tangan Y di telinga dan mulut. TELEFON."
        },
        {
          "prompt": "Connect through the network: sign INTERNET.",
          "promptBm": "Sambung melalui rangkaian: buat isyarat INTERNET.",
          "targetSign": "INTERNET",
          "hint": "Middle fingers touch and rotate. INTERNET.",
          "hintBm": "Jari tengah bersentuhan dan berputar. INTERNET."
        },
        {
          "prompt": "Enter the decryption key: sign TYPE.",
          "promptBm": "Masukkan kunci penyahsulitan: buat isyarat TAIP (TYPE).",
          "targetSign": "TYPE",
          "hint": "Fingers wiggle as if typing on keyboard. TYPE.",
          "hintBm": "Jari menaip pada papan kekunci maya. TAIP."
        },
        {
          "prompt": "Playback the transmission: sign VIDEO.",
          "promptBm": "Mainkan semula transmisi: buat isyarat VIDEO.",
          "targetSign": "VIDEO",
          "hint": "Hand gestures filming onto palm. VIDEO.",
          "hintBm": "Tangan merakam ke atas tapak tangan. VIDEO."
        }
      ],
      "clueUnlocked": {
        "name": "Mira Reed's Personal Video Log",
        "nameBm": "Log Video Peribadi Mira Reed",
        "desc": "Mira: 'Gio, if you are watching this, my plan succeeded. You protected the stories from erasure.'",
        "descBm": "Mira: 'Gio, jika awak menonton ini, rancangan saya berjaya. Awak lindungi cerita ini dari dipadam.'"
      }
    },
    "modeBadge": "Technology & Modern Life"
  },
  {
    "id": 26,
    "level": 3,
    "title": "The Spatial Collision Grid",
    "titleBm": "Grid Perlanggaran Ruang",
    "shortTitle": "Spatial Collision Grid",
    "shortTitleBm": "Teka-Teki Hologram",
    "subtitle": "Reconstruct vehicle crash trajectories, physical object dimensions, and getaway maneuvers using classifiers.",
    "subtitleBm": "Bina semula trajektori perlanggaran kenderaan, dimensi objek, dan pergerakan pelarian menggunakan pengelas.",
    "prop": "conveyor",
    "icon": "layers",
    "xp": 380,
    "memoryRecovery": 87,
    "gioExpression": "focused",
    "learning": {
      "summary": "ASL Classifiers: using handshapes to depict object shapes, sizes, pathways, and movement dynamics.",
      "coreSigns": [
        {
          "sign": "V",
          "desc": "CL:V representing a person's two legs walking, jumping, or crouching",
          "tip": "Two legs traversing path."
        },
        {
          "sign": "1",
          "desc": "CL:1 representing a person upright or an upright pole",
          "tip": "Upright pencil/person marker."
        },
        {
          "sign": "3",
          "desc": "CL:3 representing a moving ground vehicle or rolling cart",
          "tip": "Vehicle classifier."
        },
        {
          "sign": "C",
          "desc": "CL:C representing a curved container, cup, or cylindrical tube",
          "tip": "Cylindrical shape."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #26: The Spatial Hologram",
      "caseNameBm": "Kes #26: Hologram Ruang",
      "location": "Hologram Simulation Chamber",
      "locationBm": "Bilik Simulasi Hologram",
      "narrative": "Cyan light beams project a 3D hologram of the museum interior. The simulation shows the route taken by the small robot carrying the rectangular book safely past the display corridors.",
      "narrativeBm": "Cahaya sian memancarkan hologram 3D bahagian dalam muzium. Simulasi menunjukkan laluan yang diambil oleh robot kecil membawa buku segi empat melepasi koridor pameran.",
      "steps": [
        {
          "prompt": "Depict the small robot walking: classifier CL:V.",
          "promptBm": "Gambarkan robot kecil berjalan: pengelas CL:V.",
          "targetSign": "V",
          "hint": "V-hand represents two walking legs. Classifier V.",
          "hintBm": "Tangan V mewakili dua kaki berjalan. Pengelas V."
        },
        {
          "prompt": "Trace the upright pillar bypass: classifier CL:1.",
          "promptBm": "Jejak laluan melepasi tiang tegak: pengelas CL:1.",
          "targetSign": "1",
          "hint": "Index finger stands upright. Classifier 1.",
          "hintBm": "Telunjuk tegak mewakili tiang. Pengelas 1."
        },
        {
          "prompt": "Depict the transport cart: classifier CL:3.",
          "promptBm": "Gambarkan kereta sorong pemindahan: pengelas CL:3.",
          "targetSign": "3",
          "hint": "Thumb, index, middle extended for vehicle. Classifier 3.",
          "hintBm": "Tangan 3 mewakili kenderaan. Pengelas 3."
        },
        {
          "prompt": "Show the cylindrical container: classifier CL:C.",
          "promptBm": "Tunjukkan bekas silinder kalis cuaca: pengelas CL:C.",
          "targetSign": "C",
          "hint": "Curved C-handshape for cylinder. Classifier C.",
          "hintBm": "Tangan C melengkung membentuk silinder. Pengelas C."
        }
      ],
      "clueUnlocked": {
        "name": "Visual Extraction Path Simulation",
        "nameBm": "Simulasi Laluan Pemindahan Visual",
        "desc": "Proves the book was carefully cushioned in a protective case, not stolen by force.",
        "descBm": "Membuktikan buku diletakkan dalam bekas pelindung dengan teliti, bukan dirampas secara ganas."
      }
    },
    "modeBadge": "Classifiers & Visual Scaling"
  },
  {
    "id": 27,
    "level": 3,
    "title": "The Ancient Chronicler's Tale",
    "titleBm": "Kisah Penulis Sejarah Kuno",
    "shortTitle": "Chronicler's Tale",
    "shortTitleBm": "Kisah Yang Benar",
    "subtitle": "Follow the elder storyteller's flowing visual narrative revealing why the Memory Book was created.",
    "subtitleBm": "Ikuti naratif visual pencerita berpengalaman yang mendedahkan punca Buku Memori dicipta.",
    "prop": "rabbit",
    "icon": "book",
    "xp": 390,
    "memoryRecovery": 90,
    "gioExpression": "thinking",
    "learning": {
      "summary": "Storytelling & narratives: pacing, character perspective shifting, and linking narrative ideas.",
      "coreSigns": [
        {
          "sign": "STORY",
          "desc": "Both flat O-hands pull apart and rejoin in fluid loops",
          "tip": "Weaving a story together."
        },
        {
          "sign": "TRUE",
          "desc": "Index finger held vertically moves forward from the mouth",
          "tip": "Direct truth coming from lips."
        },
        {
          "sign": "REMEMBER",
          "desc": "Thumb of dominant A-hand touches forehead then presses thumb of non-dominant A-hand",
          "tip": "Securing thought into memory."
        },
        {
          "sign": "CONNECT",
          "desc": "Both open F-hands interlink thumb and index finger circles together",
          "tip": "Interlinked chain of ideas."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #27: The Curator Board Revelation",
      "caseNameBm": "Kes #27: Pendedahan Lembaga Kurator",
      "location": "Sanctuary Inner Library",
      "locationBm": "Perpustakaan Dalam Santuari",
      "narrative": "Mira's full audio-visual log plays. She explains that the museum board had contracted an outside tech company to replace original signed video stories with machine-generated text. The living expressions would have been deleted!",
      "narrativeBm": "Log penuh Mira dimainkan. Dia menjelaskan lembaga muzium melantik syarikat teknologi luar untuk menggantikan video cerita bahasa isyarat asal dengan teks janaan mesin. Ekspresi hidup itu bakal dipadamkan!",
      "steps": [
        {
          "prompt": "Acknowledge the community heritage: sign STORY.",
          "promptBm": "Hormati warisan penceritaan komuniti: buat isyarat CERITA (STORY).",
          "targetSign": "STORY",
          "hint": "Both hands weave fluid loops. STORY.",
          "hintBm": "Kedua-dua tangan menganyam gelung. CERITA."
        },
        {
          "prompt": "Affirm the authentic facts: sign TRUE.",
          "promptBm": "Sahkan fakta yang hakiki: buat isyarat BENAR (TRUE).",
          "targetSign": "TRUE",
          "hint": "Index finger moves straight from lips. TRUE.",
          "hintBm": "Jari telunjuk tegak ke hadapan dari bibir. BENAR."
        },
        {
          "prompt": "Restore Gio's core identity: sign REMEMBER.",
          "promptBm": "Pulihkan identiti teras Gio: buat isyarat INGAT (REMEMBER).",
          "targetSign": "REMEMBER",
          "hint": "Thumb from forehead seals onto other thumb. REMEMBER.",
          "hintBm": "Ibu jari dari dahi mengunci ibu jari lain. INGAT."
        },
        {
          "prompt": "Unite the pieces of the puzzle: sign CONNECT.",
          "promptBm": "Hubungkan semua cebisan misteri: buat isyarat HUBUNG (CONNECT).",
          "targetSign": "CONNECT",
          "hint": "F-rings interlink together. CONNECT.",
          "hintBm": "Cincin jari F berpaut bersama. HUBUNG."
        }
      ],
      "clueUnlocked": {
        "name": "The Story of the Erased Voices",
        "nameBm": "Kisah Suara Yang Hampir Padam",
        "desc": "Mira Reed hid the book to prevent the board from erasing authentic signed cultural records.",
        "descBm": "Mira Reed menyembunyikan buku untuk menghalang pemadaman rekod budaya isyarat asli."
      }
    },
    "modeBadge": "Storytelling & Narratives"
  },
  {
    "id": 28,
    "level": 3,
    "title": "The Shadow Guild Cant",
    "titleBm": "Bahasa Kiasan Sindiket Bayang",
    "shortTitle": "Shadow Guild Cant",
    "shortTitleBm": "Pesanan Rahsia",
    "subtitle": "Translate cryptic idioms and visual metaphors used exclusively by the inner syndicate circle.",
    "subtitleBm": "Terjemahkan simpulan bahasa kriptik dan metafora visual yang hanya digunakan oleh kumpulan dalam sindiket.",
    "prop": "chain",
    "icon": "message-circle",
    "xp": 400,
    "memoryRecovery": 93,
    "gioExpression": "encouraging",
    "learning": {
      "summary": "Idioms, cultural expressions, and expressive nuances in authentic ASL discourse.",
      "coreSigns": [
        {
          "sign": "EXPRESS",
          "desc": "Both curved 5-hands pull upward and outward from chest opening wide",
          "tip": "Feelings welling up and expressed."
        },
        {
          "sign": "FEEL",
          "desc": "Middle finger bent inward strokes upward against the chest",
          "tip": "Heart feeling sign."
        },
        {
          "sign": "UNDERSTAND",
          "desc": "Fist by temple flicks index finger upward like a lightbulb turning on",
          "tip": "Lightbulb clicking on at temple."
        },
        {
          "sign": "HEART",
          "desc": "Middle finger gently taps the left chest over the heart",
          "tip": "Tapping over the heart."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #28: Cultural Decoding",
      "caseNameBm": "Kes #28: Nyahsulit Budaya",
      "location": "Archival Inner Chamber",
      "locationBm": "Bilik Arkib Suci",
      "narrative": "The police report stated that Mira signed 'DESTROY' in the security booth. In reality, her signs were an idiom meaning 'SHAKE AWAKE THE COMMUNITY' so people would treasure their stories before it was too late.",
      "narrativeBm": "Laporan polis mendakwa Mira berisyarat 'MUSNAH' di pondok keselamatan. Hakikatnya, isyarat itu ialah simpulan bahasa yang bermaksud 'BANGKITKAN KOMUNITI' agar mereka menghargai warisan mereka.",
      "steps": [
        {
          "prompt": "Convey sincere emotion: sign FEEL.",
          "promptBm": "Sampaikan rasa yang tulus: buat isyarat RASA (FEEL).",
          "targetSign": "FEEL",
          "hint": "Bent middle finger strokes chest. FEEL.",
          "hintBm": "Jari tengah bengkok mengusap dada. RASA."
        },
        {
          "prompt": "Express the cultural message: sign EXPRESS.",
          "promptBm": "Ungkapkan mesej budaya: buat isyarat UNGKAP (EXPRESS).",
          "targetSign": "EXPRESS",
          "hint": "Hands pull from chest opening wide. EXPRESS.",
          "hintBm": "Tangan ditarik dari dada membuka luas. UNGKAP."
        },
        {
          "prompt": "Affirm mutual comprehension: sign UNDERSTAND.",
          "promptBm": "Tegaskan persefahaman bersama: buat isyarat FAHAM (UNDERSTAND).",
          "targetSign": "UNDERSTAND",
          "hint": "Index finger flicks up at temple. UNDERSTAND.",
          "hintBm": "Telunjuk menjentik ke atas di pelipis. FAHAM."
        },
        {
          "prompt": "Sign from the soul: sign HEART.",
          "promptBm": "Berisyarat dari lubuk jiwa: buat isyarat HATI (HEART).",
          "targetSign": "HEART",
          "hint": "Middle finger taps over heart. HEART.",
          "hintBm": "Jari tengah ketuk di atas jantung. HATI."
        }
      ],
      "clueUnlocked": {
        "name": "Vindication of Mira Reed",
        "nameBm": "Pembuktian Tidak Bersalah Mira Reed",
        "desc": "Proves the archivist was acting out of deep cultural dedication, not criminal intent.",
        "descBm": "Membuktikan arkivis bertindak demi dedikasi budaya yang mendalam, bukan niat jenayah."
      }
    },
    "modeBadge": "Idioms & Expressive Nuance"
  },
  {
    "id": 29,
    "level": 3,
    "title": "The Deaf Sanctuary Concord",
    "titleBm": "Protokol Tempat Perlindungan Pekak",
    "shortTitle": "Sanctuary Concord",
    "shortTitleBm": "Janji Penjaga",
    "subtitle": "Demonstrate respectful cultural etiquette, turn-taking visual rules, and historical community honors.",
    "subtitleBm": "Tunjukkan etika budaya menghormati, giliran visual perbualan, dan penghormatan sejarah komuniti.",
    "prop": "shield",
    "icon": "heart",
    "xp": 420,
    "memoryRecovery": 97,
    "gioExpression": "happy",
    "learning": {
      "summary": "Deaf culture, etiquette, eye-contact norms, and respectful signing in the community.",
      "coreSigns": [
        {
          "sign": "RESPECT",
          "desc": "R-hand moves from forehead forward and downward in a sweeping bow",
          "tip": "Respectful R honor movement."
        },
        {
          "sign": "DEAF",
          "desc": "Index finger touches near the ear then moves to touch near the mouth",
          "tip": "Ear to mouth trajectory."
        },
        {
          "sign": "COMMUNITY",
          "desc": "Fingertips of both flat hands touch together, twisting and touching like roofs",
          "tip": "Cluster of homes/roofs."
        },
        {
          "sign": "TOGETHER",
          "desc": "Both A-hands held together with palms facing, circling horizontally as one",
          "tip": "Circling together as one unit."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #29: The Meeting with Mira",
      "caseNameBm": "Kes #29: Pertemuan Dengan Mira",
      "location": "The Sanctuary of Stories",
      "locationBm": "Santuari Cerita Luma",
      "narrative": "Mira Reed steps into the warm lantern light. Her eyes fill with tears as she sees Gio safe and sound. Gio runs forward and hugs her trench coat! She looks at you with profound gratitude.",
      "narrativeBm": "Mira Reed melangkah ke bawah cahaya tanglung. Matanya berkaca melihat Gio selamat. Gio berlari memeluk kot Mira! Dia memandang anda dengan rasa terima kasih yang mendalam.",
      "steps": [
        {
          "prompt": "Show reverence to Deaf traditions: sign RESPECT.",
          "promptBm": "Tunjukkan penghormatan kepada tradisi Pekak: buat isyarat HORMAT (RESPECT).",
          "targetSign": "RESPECT",
          "hint": "R-hand sweeps forward from forehead. RESPECT.",
          "hintBm": "Tangan R menyapu ke hadapan dari dahi. HORMAT."
        },
        {
          "prompt": "Acknowledge the community identity: sign DEAF.",
          "promptBm": "Iktiraf identiti komuniti: buat isyarat PEKAK (DEAF).",
          "targetSign": "DEAF",
          "hint": "Index finger touches ear then mouth. DEAF.",
          "hintBm": "Telunjuk sentuh telinga kemudian bibir. PEKAK."
        },
        {
          "prompt": "Celebrate the collective: sign COMMUNITY.",
          "promptBm": "Raikan kesatuan komuniti: buat isyarat KOMUNITI (COMMUNITY).",
          "targetSign": "COMMUNITY",
          "hint": "Fingertips touch forming cluster of roofs. COMMUNITY.",
          "hintBm": "Hujung jari bersentuhan membentuk bumbung. KOMUNITI."
        },
        {
          "prompt": "Promise solidarity: sign TOGETHER.",
          "promptBm": "Berjanji untuk bersatu padu: buat isyarat BERSAMA (TOGETHER).",
          "targetSign": "TOGETHER",
          "hint": "Hands together circling horizontally. TOGETHER.",
          "hintBm": "Dua tangan bersama berpusing mendatar. BERSAMA."
        }
      ],
      "clueUnlocked": {
        "name": "The Community Covenant",
        "nameBm": "Perjanjian Suci Komuniti",
        "desc": "A pact between Deaf storytellers and hearing allies to preserve authentic signed voices.",
        "descBm": "Perjanjian antara pencerita Pekak dan sekutu mendengar untuk memelihara suara isyarat asli."
      }
    },
    "modeBadge": "Deaf Culture & Etiquette"
  },
  {
    "id": 30,
    "level": 3,
    "title": "The High Court Masterclass Trial",
    "titleBm": "Perbicaraan Mahkamah Tinggi",
    "shortTitle": "High Court Trial",
    "shortTitleBm": "BOSS AKHIR: Perbualan Terakhir",
    "subtitle": "Present the ultimate live signing testimony in the grand courtroom to convict the mastermind and save Luma!",
    "subtitleBm": "Bentangkan kesaksian isyarat langsung mutlak di mahkamah agung untuk mensabitkan dalang dan menyelamatkan Luma!",
    "prop": "crown",
    "icon": "crown",
    "xp": 600,
    "isBoss": true,
    "memoryRecovery": 100,
    "gioExpression": "happy",
    "learning": {
      "summary": "Mastery of conversational fluency: multi-turn dialogue, facial markers, and heartfelt narrative communication.",
      "coreSigns": [
        {
          "sign": "HELLO",
          "desc": "Warm welcoming greeting",
          "tip": "Salute outward."
        },
        {
          "sign": "STORY",
          "desc": "Fluid weaving story loops",
          "tip": "Weaving narratives."
        },
        {
          "sign": "RESPECT",
          "desc": "Honorable R sweep",
          "tip": "Cultural humility."
        },
        {
          "sign": "DEAF",
          "desc": "Ear to mouth index touch",
          "tip": "Core heritage sign."
        },
        {
          "sign": "TOGETHER",
          "desc": "Circling united hands",
          "tip": "Collective unity."
        },
        {
          "sign": "SAFE",
          "desc": "Uncrossing wrists to freedom",
          "tip": "Security restored."
        }
      ]
    },
    "mystery": {
      "caseName": "Case #30: The Festival Restored",
      "caseNameBm": "Kes #30: Festival Dipulihkan",
      "location": "Luma City Grand Amphitheater",
      "locationBm": "Amfiteater Agung Bandar Luma",
      "narrative": "At dawn, the museum board, curators, and the Deaf community gather at the Grand Amphitheater. You, Gio, and Mira take the stage. With all three keys combined, the Memory Book unlocks its golden hologram, projecting signed stories into the sunrise!",
      "narrativeBm": "Pada waktu fajar, lembaga muzium, kurator, dan komuniti Pekak berhimpun di Amfiteater Agung. Anda, Gio, dan Mira menaiki pentas. Dengan ketiga-tiga kunci disatukan, Buku Memori membuka hologram emasnya, memancarkan cerita bahasa isyarat ke arah fajar!",
      "steps": [
        {
          "prompt": "Greet the gathered citizens of Luma City: sign HELLO.",
          "promptBm": "Sapa warga Bandar Luma yang berhimpun: buat isyarat HELLO.",
          "targetSign": "HELLO",
          "hint": "Open friendly salute. HELLO.",
          "hintBm": "Tabik salam mesra. HELLO."
        },
        {
          "prompt": "Introduce the recovered treasure: sign STORY.",
          "promptBm": "Perkenalkan khazanah yang diselamatkan: buat isyarat CERITA (STORY).",
          "targetSign": "STORY",
          "hint": "Weaving hands together. STORY.",
          "hintBm": "Dua tangan menganyam gelung. CERITA."
        },
        {
          "prompt": "Honor the language of the community: sign DEAF.",
          "promptBm": "Iktiraf bahasa warisan komuniti: buat isyarat PEKAK (DEAF).",
          "targetSign": "DEAF",
          "hint": "Ear to mouth touch. DEAF.",
          "hintBm": "Sentuh telinga kemudian bibir. PEKAK."
        },
        {
          "prompt": "Pledge enduring cultural preservation: sign RESPECT.",
          "promptBm": "Ikrar pemeliharaan budaya abadi: buat isyarat HORMAT (RESPECT).",
          "targetSign": "RESPECT",
          "hint": "R-hand sweeps forward from forehead. RESPECT.",
          "hintBm": "Tangan R menyapu ke hadapan dari dahi. HORMAT."
        },
        {
          "prompt": "Unite hearing and Deaf worlds as one: sign TOGETHER.",
          "promptBm": "Satukan dunia mendengar dan Pekak sebagai satu: buat isyarat BERSAMA (TOGETHER).",
          "targetSign": "TOGETHER",
          "hint": "Circling united hands. TOGETHER.",
          "hintBm": "Dua tangan bersama berpusing mendatar. BERSAMA."
        },
        {
          "prompt": "Declare the Memory Book is permanently SAFE.",
          "promptBm": "Isytiharkan Buku Memori kini SELAMAT (SAFE) selamanya.",
          "targetSign": "SAFE",
          "hint": "Crossed fists open outward. SAFE.",
          "hintBm": "Penumbuk bersilang dibuka keluar. SELAMAT."
        }
      ],
      "clueUnlocked": {
        "name": "The Third Key & The Memory Book Restored",
        "nameBm": "Kunci Ketiga & Buku Memori Dipulihkan",
        "desc": "The three keys combine into the Golden Seal of Luma! The Festival of Stories begins!",
        "descBm": "Ketiga-tiga kunci bersatu menjadi Meterai Emas Luma! Festival Cerita bermula!"
      }
    },
    "modeBadge": "Level 3 Boss: Fluent Masterclass"
  }
];

const DETECTIVE_RANKS = [
  { minXp: 0, title: "Rookie Sleuth", titleBm: "Detektif Pelatih", icon: "search", color: "#94a3b8" },
  { minXp: 500, title: "Junior Gumshoe", titleBm: "Detektif Muda", icon: "shield", color: "#22c55e" },
  { minXp: 1600, title: "Field Inspector", titleBm: "Inspektor Forensik", icon: "award", color: "#06b6d4" },
  { minXp: 3800, title: "Chief Detective", titleBm: "Ketua Detektif", icon: "badge-check", color: "#f59e0b" },
  { minXp: 7200, title: "Master Sleuth", titleBm: "Detektif Pakar", icon: "crown", color: "#a855f7" }
];

function getStageTitle(stage) {
  if (!stage) return '';
  const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');
  return isBm ? (stage.titleBm || stage.title) : stage.title;
}

function getStageShortTitle(stage) {
  if (!stage) return '';
  const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');
  return isBm ? (stage.shortTitleBm || stage.shortTitle || stage.titleBm || stage.title) : (stage.shortTitle || stage.title);
}

function getRankForXp(xp) {
  let currentRank = DETECTIVE_RANKS[0];
  for (const rank of DETECTIVE_RANKS) {
    if (xp >= rank.minXp) {
      currentRank = rank;
    }
  }
  const isBm = (window.gestigoI18n && window.gestigoI18n.currentLang === 'bm');
  return {
    ...currentRank,
    title: isBm ? currentRank.titleBm : currentRank.title
  };
}

// Explicit Global Exports for Browser and Worker contexts
(function() {
  var g = (typeof window !== 'undefined') ? window : (typeof globalThis !== 'undefined' ? globalThis : (typeof global !== 'undefined' ? global : {}));
  g.GESTIGO_STAGES = GESTIGO_STAGES;
  g.GESTIGO_LEVELS = GESTIGO_LEVELS;
  g.DETECTIVE_RANKS = DETECTIVE_RANKS;
  g.GESTIGO_SUSPECTS = (typeof GESTIGO_SUSPECTS !== 'undefined') ? GESTIGO_SUSPECTS : [];
  g.GESTIGO_GLOSSARY = (typeof GESTIGO_GLOSSARY !== 'undefined') ? GESTIGO_GLOSSARY : [];
  g.GESTIGO_STORY_CINEMATICS = (typeof GESTIGO_STORY_CINEMATICS !== 'undefined') ? GESTIGO_STORY_CINEMATICS : {};
  g.getRankForXp = getRankForXp;
  g.getStageTitle = getStageTitle;
  g.getStageShortTitle = getStageShortTitle;
})();
