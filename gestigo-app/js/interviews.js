window.GESTIGO_INTERVIEWS = {
  "case": {
    "title": "The Missing Myth Book",
    "subtitle": "Complete Game Specification & AI Developer Handoff",
    "timeline": [
      {
        "time": "17:30",
        "event": "Myth Book confirmed inside display case",
        "significance": "Book verified secure before closing."
      },
      {
        "time": "17:47",
        "event": "Cafe purchase of wrapping paper",
        "significance": "Suspect prepares concealed disguise parcel."
      },
      {
        "time": "17:52-18:04",
        "event": "Scheduled camera reset & outage",
        "significance": "12-minute surveillance blackout in archive wing."
      },
      {
        "time": "17:58",
        "event": "Figure seen near side exit",
        "significance": "Photographed wearing purple sleeve & gold accessory."
      },
      {
        "time": "18:02",
        "event": "Patrol officer notices parcel at side gate",
        "significance": "Person in dark purple hurried toward garden."
      },
      {
        "time": "18:10",
        "event": "Missing book discovered",
        "significance": "Glass vitrine unlocked and display pedestal empty."
      }
    ],
    "trueCulpritId": "maya",
    "recoveredLocation": "beneath_garden_planter",
    "confrontationRequirements": [
      "clue_archive_access",
      "clue_camera_reset",
      "clue_sora_photo",
      "clue_chen_purple",
      "clue_cafe_receipt",
      "clue_displaced_planter",
      "clue_artist_sketch",
      "clue_recovered_book"
    ]
  },
  "questions": [
    {
      "letter": "A",
      "action": "Alibi",
      "actionBm": "Alibi",
      "prompt": "Where were you between 5:30 and 6:10 PM?",
      "promptBm": "Di manakah anda berada antara jam 5:30 hingga 6:10 petang?",
      "handDescription": "Fist with thumb resting upright beside index finger (ASL 'A')"
    },
    {
      "letter": "B",
      "action": "Book",
      "actionBm": "Buku Mitos",
      "prompt": "What do you know about the missing Myth Book?",
      "promptBm": "Apakah yang anda tahu tentang Buku Mitos yang hilang itu?",
      "handDescription": "Open flat 4 fingers upright, thumb folded across palm (ASL 'B')"
    },
    {
      "letter": "W",
      "action": "Witness",
      "actionBm": "Saksi Mencurigakan",
      "prompt": "Did you notice anything suspicious?",
      "promptBm": "Adakah anda melihat sesuatu yang mencurigakan?",
      "handDescription": "Index, middle, and ring fingers extended upward in a 'W', thumb holding pinky (ASL 'W')"
    },
    {
      "letter": "V",
      "action": "Verify",
      "actionBm": "Bukti Pengesahan",
      "prompt": "What evidence supports your statement?",
      "promptBm": "Apakah bukti yang menyokong kenyataan anda?",
      "handDescription": "Index and middle fingers extended upward in a 'V', thumb holding ring and pinky (ASL 'V')"
    },
    {
      "letter": "L",
      "action": "Lead",
      "actionBm": "Petunjuk Seterusnya",
      "prompt": "Who or what should I investigate next?",
      "promptBm": "Siapa atau apakah yang patut saya siasat seterusnya?",
      "handDescription": "Index finger pointing straight up, thumb pointing outward forming an 'L' (ASL 'L')"
    }
  ],
  "characters": [
    {
      "id": "elias",
      "name": "Prof. Elias Carter",
      "nameBm": "Prof. Elias Carter",
      "role": "Head Curator",
      "roleBm": "Ketua Kurator",
      "category": "SUSPECT",
      "categoryBm": "SUSPEK",
      "isCulprit": false,
      "avatar": "assets/suspects/suspect_elias.png",
      "pos3D": {
        "x": 0,
        "y": 0,
        "z": -12
      },
      "location": "Story Museum Grand Entrance",
      "locationBm": "Pintu Masuk Utama Muzium Cerita",
      "dialogue": {
        "A": {
          "reply": "I was in my office reviewing exhibition documents until 6 PM.",
          "replyBm": "Saya berada di pejabat saya menyemak dokumen pameran sehingga jam 6 petang.",
          "clueNote": "The curator office computer was active at 5:55 PM, but this does not confirm his location.",
          "clueNoteBm": "Komputer pejabat kurator aktif pada jam 5:55 petang, namun ini tidak mengesahkan kedudukan fizikalnya.",
          "clueId": "clue_elias_computer",
          "verified": false
        },
        "B": {
          "reply": "It is a rare manuscript containing legends about a forgotten civilisation.",
          "replyBm": "Ia adalah manuskrip nadir yang mengandungi legenda tentang tamadun purba yang telah dilupakan.",
          "clueNote": "Elias knows the book's historical significance.",
          "clueNoteBm": "Elias memahami kepentingan sejarah dan nilai manuskrip kuno tersebut.",
          "clueId": "clue_elias_book_lore",
          "verified": true
        },
        "W": {
          "reply": "I noticed Lina speaking to a student earlier that afternoon.",
          "replyBm": "Saya ternampak Lina sedang berbual dengan seorang pelajar pada petang tadi.",
          "clueNote": "Lina and Maya had contact earlier in the afternoon.",
          "clueNoteBm": "Lina dan Maya berhubung pada sebelah petang berhampiran arkib.",
          "clueId": "clue_elias_lina_contact",
          "verified": true
        },
        "V": {
          "reply": "My office access log will confirm where I was.",
          "replyBm": "Log akses pejabat saya akan mengesahkan di mana saya berada.",
          "clueNote": "Computer activity supports but does not conclusively prove his alibi.",
          "clueNoteBm": "Aktiviti log komputer menyokong tetapi tidak membuktikan alibinya secara muktamad.",
          "clueId": "clue_elias_access_log",
          "verified": true
        },
        "L": {
          "reply": "Speak with Lina. She manages the archive records.",
          "replyBm": "Bercakaplah dengan Lina. Dia yang menguruskan semua rekod arkib.",
          "clueNote": "Lead: Lina Arvelle.",
          "clueNoteBm": "Petunjuk: Siasat Lina Arvelle.",
          "clueId": "lead_lina",
          "verified": true
        }
      }
    },
    {
      "id": "lina",
      "name": "Lina Arvelle",
      "nameBm": "Lina Arvelle",
      "role": "Archivist",
      "roleBm": "Kurator Arkib",
      "category": "SUSPECT",
      "categoryBm": "SUSPEK",
      "isCulprit": false,
      "avatar": "assets/suspects/suspect_lina.png",
      "pos3D": {
        "x": -8,
        "y": 0,
        "z": -14
      },
      "location": "Museum Manuscript Archive",
      "locationBm": "Arkib Manuskrip Muzium",
      "dialogue": {
        "A": {
          "reply": "I was organising returned manuscripts in the records room.",
          "replyBm": "Saya sedang menyusun manuskrip yang dipulangkan di bilik rekod arkib.",
          "clueNote": "Lina worked close to the archive.",
          "clueNoteBm": "Lina bertugas sangat dekat dengan bilik simpanan arkib.",
          "clueId": "clue_lina_records",
          "verified": true
        },
        "B": {
          "reply": "I prepared the Myth Book for display earlier. It was in perfect condition.",
          "replyBm": "Saya sendiri menyediakan Buku Mitos untuk dipamerkan tadi. Ia berada dalam keadaan sempurna.",
          "clueNote": "Book was confirmed present before the theft.",
          "clueNoteBm": "Buku disahkan ada di tempat pameran sebelum kecurian berlaku.",
          "clueId": "clue_book_condition",
          "verified": true
        },
        "W": {
          "reply": "Maya asked me about the archive old entrance.",
          "replyBm": "Maya pernah bertanyakan saya tentang laluan pintu lama bilik arkib.",
          "clueNote": "Maya knew about the seldom-used route.",
          "clueNoteBm": "Maya mengetahui tentang laluan pintu masuk arkib yang jarang digunakan.",
          "clueId": "clue_archive_access",
          "verified": true
        },
        "V": {
          "reply": "I recorded her research request, but the archive access card was missing for a short time.",
          "replyBm": "Saya merekodkan permohonan penyelidikannya, namun kad akses arkib hilang seketika waktu itu.",
          "clueNote": "Clue: temporarily missing access card.",
          "clueNoteBm": "Petunjuk: Kad akses arkib hilang untuk tempoh seketika.",
          "clueId": "clue_missing_keycard",
          "verified": true
        },
        "L": {
          "reply": "Check the archive request register. The timestamps might help.",
          "replyBm": "Semak buku daftar permohonan arkib. Cap masa di situ mungkin membantu.",
          "clueNote": "Lead: research register.",
          "clueNoteBm": "Petunjuk: Semak daftar penyelidikan arkib.",
          "clueId": "lead_register",
          "verified": true
        }
      }
    },
    {
      "id": "rex",
      "name": "Rex Kendall",
      "nameBm": "Rex Kendall",
      "role": "Maintenance Staff",
      "roleBm": "Kakitangan Penyelenggaraan",
      "category": "SUSPECT",
      "categoryBm": "SUSPEK",
      "isCulprit": false,
      "avatar": "assets/suspects/suspect_rex.png",
      "pos3D": {
        "x": 10,
        "y": 0,
        "z": -12
      },
      "location": "East Wing Service Corridor",
      "locationBm": "Koridor Servis Sayap Timur",
      "dialogue": {
        "A": {
          "reply": "I was repairing lights in the east wing.",
          "replyBm": "Saya sedang membaiki sistem lampu di sayap timur muzium.",
          "clueNote": "Rex was near electrical systems.",
          "clueNoteBm": "Rex berada berhampiran panel sistem elektrik.",
          "clueId": "clue_rex_electrical",
          "verified": true
        },
        "B": {
          "reply": "I do not know much about ancient books. I am responsible for equipment.",
          "replyBm": "Saya tidak tahu banyak tentang buku purba. Tugas saya menjaga peralatan teknikal.",
          "clueNote": "No obvious interest in the book.",
          "clueNoteBm": "Tiada minat langsung terhadap manuskrip kuno itu.",
          "clueId": "clue_rex_no_motive",
          "verified": true
        },
        "W": {
          "reply": "A student asked me when the cameras would be serviced.",
          "replyBm": "Seorang pelajar bertanyakan saya bila kamera keselamatan akan diselenggara.",
          "clueNote": "Someone knew about the camera outage.",
          "clueNoteBm": "Seseorang mengetahui lebih awal tentang gangguan kamera litar tertutup.",
          "clueId": "clue_camera_inquiry",
          "verified": true
        },
        "V": {
          "reply": "The maintenance record shows a scheduled camera reset from 5:52 to 6:04 PM.",
          "replyBm": "Rekod penyelenggaraan menunjukkan tetapan semula kamera dijadualkan dari jam 5:52 hingga 6:04 petang.",
          "clueNote": "Clue: scheduled outage from 5:52 to 6:04 PM.",
          "clueNoteBm": "Petunjuk Kritikal: Kamera ditutup untuk penyelenggaraan dari 5:52 hingga 6:04 petang.",
          "clueId": "clue_camera_reset",
          "verified": true
        },
        "L": {
          "reply": "Ask who had access to the maintenance schedule.",
          "replyBm": "Siasat siapa yang mempunyai akses kepada jadual penyelenggaraan itu.",
          "clueNote": "Lead: maintenance notice.",
          "clueNoteBm": "Petunjuk: Papan kenyataan penyelenggaraan.",
          "clueId": "lead_maintenance",
          "verified": true
        }
      }
    },
    {
      "id": "maya",
      "name": "Maya Callen",
      "nameBm": "Maya Callen",
      "role": "Research Intern",
      "roleBm": "Pelatih Penyelidik",
      "category": "SUSPECT",
      "categoryBm": "SUSPEK",
      "isCulprit": true,
      "avatar": "assets/suspects/suspect_maya.png",
      "pos3D": {
        "x": -4,
        "y": 0,
        "z": -4
      },
      "location": "Folklore Study Reading Pavilion",
      "locationBm": "Pavilion Membaca Cerita Rakyat",
      "dialogue": {
        "A": {
          "reply": "I was studying in the public reading room until 6 PM.",
          "replyBm": "Saya sedang belajar di bilik bacaan awam sehingga jam 6 petang.",
          "clueNote": "Alibi lacks independent verification.",
          "clueNoteBm": "Alibi Maya tidak mempunyai saksi atau bukti bebas.",
          "clueId": "clue_maya_alibi_gap",
          "verified": false
        },
        "B": {
          "reply": "I only needed the Myth Book for my thesis. I would never take it.",
          "replyBm": "Saya hanya perlukan Buku Mitos itu untuk tesis saya. Saya tidak akan sekali-kali mencurinya.",
          "clueNote": "Strong interest; denial.",
          "clueNoteBm": "Minat yang sangat mendalam; penafian tegas.",
          "clueId": "clue_maya_denial",
          "verified": false
        },
        "W": {
          "reply": "I saw Adrian examining the rare collection. He seemed very interested.",
          "replyBm": "Saya melihat Adrian meneliti koleksi nadir itu. Dia kelihatan amat berminat.",
          "clueNote": "Attempts to redirect suspicion toward Adrian.",
          "clueNoteBm": "Percubaan mengalihkan syak wasangka kepada Adrian.",
          "clueId": "clue_maya_accuse_adrian",
          "verified": false
        },
        "V": {
          "reply": "My research notes should prove that I was studying.",
          "replyBm": "Nota penyelidikan saya membuktikan saya sedang belajar.",
          "clueNote": "Notes do not place her in the reading room at 5:52-6:04 PM.",
          "clueNoteBm": "Nota kajian tidak membuktikan keberadaannya di bilik bacaan pada 5:52-6:04 petang.",
          "clueId": "clue_maya_unverified_notes",
          "verified": false
        },
        "L": {
          "reply": "You should question Adrian. Collectors would pay a fortune for that book.",
          "replyBm": "Awak patut menyoal Adrian. Pengumpul sanggup membayar harga lumayan untuk buku itu.",
          "clueNote": "Repeated attempt to implicate Adrian.",
          "clueNoteBm": "Percubaan berulang kali mengaitkan Adrian Vale.",
          "clueId": "lead_deflect_adrian",
          "verified": false
        }
      }
    },
    {
      "id": "adrian",
      "name": "Adrian Vale",
      "nameBm": "Adrian Vale",
      "role": "Private Collector",
      "roleBm": "Pengumpul Peribadi",
      "category": "SUSPECT",
      "categoryBm": "SUSPEK",
      "isCulprit": false,
      "avatar": "assets/suspects/suspect_adrian.png",
      "pos3D": {
        "x": 14,
        "y": 0,
        "z": 4
      },
      "location": "Antique Gallery Promenade",
      "locationBm": "Promenad Galeri Antik",
      "dialogue": {
        "A": {
          "reply": "I was at an antique auction across town.",
          "replyBm": "Saya berada di lelongan barang antik di seberang bandar.",
          "clueNote": "Claim requires verification.",
          "clueNoteBm": "Pengakuan ini memerlukan pengesahan bebas.",
          "clueId": "clue_adrian_auction_claim",
          "verified": true
        },
        "B": {
          "reply": "I offered to purchase the Myth Book, but the museum refused.",
          "replyBm": "Saya pernah membuat tawaran untuk membeli Buku Mitos itu, tetapi pihak muzium menolak.",
          "clueNote": "Possible financial motive.",
          "clueNoteBm": "Ada kemungkinan motif kewangan tetapi telus mengakui tawarannya.",
          "clueId": "clue_adrian_offer",
          "verified": true
        },
        "W": {
          "reply": "I saw Maya researching its value last week.",
          "replyBm": "Saya melihat Maya sedang mengkaji nilainya pada minggu lepas.",
          "clueNote": "Maya researched the book's value.",
          "clueNoteBm": "Maya menyiasat nilai pasaran manuskrip tersebut.",
          "clueId": "clue_maya_value_research",
          "verified": true
        },
        "V": {
          "reply": "The auction organiser can confirm I attended until 6:15 PM.",
          "replyBm": "Penganjur lelongan boleh mengesahkan kehadiran saya sehingga jam 6:15 petang.",
          "clueNote": "Independent organiser attendance record supports alibi.",
          "clueNoteBm": "Rekod kehadiran rasmi penganjur lelongan mengesahkan alibinya kukuh.",
          "clueId": "clue_adrian_cleared",
          "verified": true
        },
        "L": {
          "reply": "Find out why Maya was researching the book hidden symbols.",
          "replyBm": "Siasat mengapa Maya begitu taksub mengkaji simbol rahsia dalam buku itu.",
          "clueNote": "Lead: Myth Book symbols.",
          "clueNoteBm": "Petunjuk: Simbol rahsia manuskrip purba.",
          "clueId": "lead_symbols",
          "verified": true
        }
      }
    },
    {
      "id": "sora",
      "name": "Sora Dain",
      "nameBm": "Sora Dain",
      "role": "Museum Visitor / Photographer",
      "roleBm": "Pelawat Muzium & Jurugambar",
      "category": "SUSPECT",
      "categoryBm": "SUSPEK",
      "isCulprit": false,
      "avatar": "assets/suspects/suspect_sora.png",
      "pos3D": {
        "x": 0,
        "y": 0,
        "z": 8
      },
      "location": "Central Piazza Fountain",
      "locationBm": "Air Pancut Dataran Pusat",
      "dialogue": {
        "A": {
          "reply": "I was taking photos near the museum entrance.",
          "replyBm": "Saya sedang mengambil gambar pemandangan dekat pintu masuk muzium.",
          "clueNote": "Outside the archive during the outage.",
          "clueNoteBm": "Sora berada di luar bilik arkib sepanjang tempoh gangguan kamera.",
          "clueId": "clue_sora_fountain",
          "verified": true
        },
        "B": {
          "reply": "I wanted to photograph the rare exhibit, but its display area was closed.",
          "replyBm": "Saya ingin merakam gambar pameran nadir, tetapi kawasan pamerannya telah ditutup.",
          "clueNote": "Did not see the book directly.",
          "clueNoteBm": "Sora tidak melihat buku itu secara terus.",
          "clueId": "clue_sora_no_book",
          "verified": true
        },
        "W": {
          "reply": "I noticed someone carrying a wrapped rectangular object.",
          "replyBm": "Saya ternampak seseorang membawa bungkusan bersegi empat tepat yang dibalut.",
          "clueNote": "Clue: suspicious parcel.",
          "clueNoteBm": "Petunjuk: Bungkusan mencurigakan dibawa keluar.",
          "clueId": "clue_suspicious_parcel",
          "verified": true
        },
        "V": {
          "reply": "Look at this photo I took at 5:58 PM. There is someone near the side exit.",
          "replyBm": "Tengok foto yang saya ambil pada jam 5:58 petang ini. Ada kelibat dekat pintu keluar sisi.",
          "clueNote": "Clue: time-stamped photo of purple sleeve and gold accessory at 5:58 PM.",
          "clueNoteBm": "Petunjuk Kritikal: Foto berstempel jam 5:58 petang menunjukkan lengan baju ungu dan aksesori emas.",
          "clueId": "clue_sora_photo",
          "verified": true
        },
        "L": {
          "reply": "Ask people outside the museum. Someone may recognise that outfit.",
          "replyBm": "Tanya saksi di luar muzium. Mungkin ada orang yang mengecam pakaian itu.",
          "clueNote": "Lead: external witnesses.",
          "clueNoteBm": "Petunjuk: Tanya saksi di luar kawasan muzium.",
          "clueId": "lead_external_witnesses",
          "verified": true
        }
      }
    },
    {
      "id": "chen",
      "name": "Officer Chen",
      "nameBm": "Pegawai Chen",
      "role": "Neighbourhood Patrol Officer",
      "roleBm": "Pegawai Peronda Kejiranan",
      "category": "WITNESS",
      "categoryBm": "SAKSI",
      "isCulprit": false,
      "avatar": "assets/suspects/suspect_chen.png",
      "pos3D": {
        "x": -14,
        "y": 0,
        "z": 6
      },
      "location": "Museum Street Police Post",
      "locationBm": "Pos Polis Jalan Muzium",
      "dialogue": {
        "A": {
          "reply": "I was patrolling the museum street from 5:40 to 6:15 PM.",
          "replyBm": "Saya meronda sepanjang jalan muzium dari jam 5:40 hingga 6:15 petang.",
          "clueNote": "Patrol route includes side entrance.",
          "clueNoteBm": "Laluan rondaan Chen merangkumi pintu masuk sisi muzium.",
          "clueId": "clue_chen_patrol",
          "verified": true
        },
        "B": {
          "reply": "I heard about the missing manuscript from museum security.",
          "replyBm": "Saya dimaklumkan tentang kehilangan manuskrip itu daripada pengawal keselamatan muzium.",
          "clueNote": "No personal connection to the book.",
          "clueNoteBm": "Tiada kaitan peribadi dengan buku tersebut.",
          "clueId": "clue_chen_alert",
          "verified": true
        },
        "W": {
          "reply": "I noticed someone leaving the side gate around 6 PM with a large parcel.",
          "replyBm": "Saya perasan seseorang keluar melalui pintu pagar sisi sekitar jam 6 petang membawa bungkusan besar.",
          "clueNote": "Clue: side-gate sighting around 6:00 PM.",
          "clueNoteBm": "Petunjuk: Kelibat bergegas keluar melalui pintu sisi pada jam 6 petang.",
          "clueId": "clue_side_gate",
          "verified": true
        },
        "V": {
          "reply": "My patrol notebook records a sighting at 6:02 PM. The person wore dark purple.",
          "replyBm": "Buku nota rondaan saya mencatatkan kelibat pada jam 6:02 petang. Individu itu memakai pakaian ungu gelap.",
          "clueNote": "Supports Sora's photo: dark purple clothing confirmed at 6:02 PM.",
          "clueNoteBm": "Petunjuk Kritikal: Nota rondaan mengesahkan pakaian ungu gelap pada 6:02 petang (sepadan foto Sora).",
          "clueId": "clue_chen_purple",
          "verified": true
        },
        "L": {
          "reply": "The cafe opposite the museum has a clear view of the entrance.",
          "replyBm": "Kafe di seberang muzium mempunyai pandangan jelas ke arah pintu masuk.",
          "clueNote": "Lead: Kaelen cafe.",
          "clueNoteBm": "Petunjuk: Kafe Kaelen Vance di seberang jalan.",
          "clueId": "lead_kaelen",
          "verified": true
        }
      }
    },
    {
      "id": "kaelen",
      "name": "Kaelen Vance",
      "nameBm": "Kaelen Vance",
      "role": "Cafe Owner",
      "roleBm": "Pemilik Kafe",
      "category": "WITNESS",
      "categoryBm": "SAKSI",
      "isCulprit": false,
      "avatar": "assets/suspects/suspect_kaelen.png",
      "pos3D": {
        "x": 12,
        "y": 0,
        "z": 12
      },
      "location": "Bistro Terrace Opposite Museum",
      "locationBm": "Teres Bistro Berhadapan Muzium",
      "dialogue": {
        "A": {
          "reply": "I was serving customers throughout the evening.",
          "replyBm": "Saya sedang melayan pelanggan sepanjang petang dan malam tadi.",
          "clueNote": "Cafe overlooks the museum entrance.",
          "clueNoteBm": "Kafe mempunyai pandangan terus ke pintu masuk muzium.",
          "clueId": "clue_kaelen_cafe",
          "verified": true
        },
        "B": {
          "reply": "Museum researchers sometimes discuss old manuscripts while having coffee.",
          "replyBm": "Penyelidik muzium kadang-kadang berbincang tentang manuskrip lama sambil minum kopi.",
          "clueNote": "May have overheard conversations.",
          "clueNoteBm": "Kaelen sering mendengar perbincangan para penyelidik muzium.",
          "clueId": "clue_kaelen_conversations",
          "verified": true
        },
        "W": {
          "reply": "A woman bought wrapping paper and a takeaway drink shortly before closing.",
          "replyBm": "Seorang wanita membeli kertas pembalut dan minuman bawa pulang sejurus sebelum kami tutup.",
          "clueNote": "Clue: suspicious purchase of wrapping paper.",
          "clueNoteBm": "Petunjuk Kritikal: Pembelian kertas pembalut sejurus sebelum waktu tutup.",
          "clueId": "clue_cafe_wrapping_paper",
          "verified": true
        },
        "V": {
          "reply": "The receipt was printed at 5:47 PM. She wore purple and carried a research notebook.",
          "replyBm": "Resit dicetak pada jam 5:47 petang. Dia memakai baju ungu dan membawa buku nota penyelidikan.",
          "clueNote": "Clue: receipt printed at 5:47 PM. Wore purple and carried a research notebook.",
          "clueNoteBm": "Petunjuk Kritikal: Resit 5:47 petang. Wanita berbaju ungu membawa buku nota penyelidikan.",
          "clueId": "clue_cafe_receipt",
          "verified": true
        },
        "L": {
          "reply": "Ask the gardener. The woman walked towards the garden path.",
          "replyBm": "Tanya tukang kebun. Wanita itu berjalan menuju ke laluan taman bunga.",
          "clueNote": "Lead: Mira garden.",
          "clueNoteBm": "Petunjuk: Tukang kebun Mira di taman sebelah.",
          "clueId": "lead_mira",
          "verified": true
        }
      }
    },
    {
      "id": "mira",
      "name": "Mira Thorne",
      "nameBm": "Mira Thorne",
      "role": "Neighbourhood Gardener",
      "roleBm": "Tukang Kebun Kejiranan",
      "category": "WITNESS",
      "categoryBm": "SAKSI",
      "isCulprit": false,
      "avatar": "assets/suspects/mira_avatar.png",
      "pos3D": {
        "x": -16,
        "y": 0,
        "z": -2
      },
      "location": "Botanical Planters beside Garden Shed",
      "locationBm": "Pasu Botani Bersebelahan Bangsal Taman",
      "dialogue": {
        "A": {
          "reply": "I was watering plants along the side path until 6:20 PM.",
          "replyBm": "Saya sedang menyiram pokok di sepanjang laluan sisi sehingga jam 6:20 petang.",
          "clueNote": "Near possible escape route.",
          "clueNoteBm": "Mira berada dekat dengan laluan keluar sisi.",
          "clueId": "clue_mira_gardening",
          "verified": true
        },
        "B": {
          "reply": "I have heard the Myth Book is valuable, but I have never seen it.",
          "replyBm": "Saya pernah dengar Buku Mitos itu amat berharga, tetapi saya tidak pernah melihatnya.",
          "clueNote": "Little apparent motive.",
          "clueNoteBm": "Tiada motif untuk mencuri.",
          "clueId": "clue_mira_no_motive",
          "verified": true
        },
        "W": {
          "reply": "I spotted someone moving a wrapped item behind the large planters.",
          "replyBm": "Saya ternampak seseorang meletakkan barang berbalut di belakang pasu bunga besar.",
          "clueNote": "Clue: hidden package behind planters.",
          "clueNoteBm": "Petunjuk Utama: Barang berbalut disorok di belakang pasu bunga besar.",
          "clueId": "clue_hidden_package",
          "verified": true
        },
        "V": {
          "reply": "One planter was moved. I also found a small purple ribbon in the leaves.",
          "replyBm": "Salah satu pasu telah digerakkan. Saya juga terjumpa cebisan reben ungu di celah daun.",
          "clueNote": "Clue: displaced planter and small purple ribbon in leaves.",
          "clueNoteBm": "Petunjuk Kritikal: Pasu batu telah beralih dan ada cebisan reben ungu di celah daun.",
          "clueId": "clue_displaced_planter",
          "verified": true
        },
        "L": {
          "reply": "Look beneath the large stone planter beside the garden shed.",
          "replyBm": "Cari di bawah pasu batu besar di sebelah bangsal taman.",
          "clueNote": "Lead: possible hiding place beneath large stone planter.",
          "clueNoteBm": "Lokasi Rahsia: Cari di bawah pasu batu besar sebelah bangsal taman!",
          "clueId": "lead_stone_planter",
          "verified": true
        }
      }
    },
    {
      "id": "tessa",
      "name": "Tessa Gray",
      "nameBm": "Tessa Gray",
      "role": "Local Street Artist",
      "roleBm": "Artis Jalanan Tempatan",
      "category": "WITNESS",
      "categoryBm": "SAKSI",
      "isCulprit": false,
      "avatar": "assets/suspects/suspect_tessa.png",
      "pos3D": {
        "x": 6,
        "y": 0,
        "z": 16
      },
      "location": "Canal Promenade Easel",
      "locationBm": "Kekuda Lukisan Promenad Terusan",
      "dialogue": {
        "A": {
          "reply": "I was drawing in the courtyard from 5:30 to 6:10 PM.",
          "replyBm": "Saya sedang melukis di halaman luar dari jam 5:30 hingga 6:10 petang.",
          "clueNote": "Sketchbook independent record.",
          "clueNoteBm": "Buku lakaran Tessa menjadi rekod bebas yang boleh dipercayai.",
          "clueId": "clue_tessa_sketching",
          "verified": true
        },
        "B": {
          "reply": "I was sketching the museum, not the manuscript.",
          "replyBm": "Saya melukis seni bina muzium, bukan manuskrip itu.",
          "clueNote": "No direct interest in the book.",
          "clueNoteBm": "Tiada kepentingan peribadi terhadap manuskrip.",
          "clueId": "clue_tessa_art",
          "verified": true
        },
        "W": {
          "reply": "I remember a person with glasses walking quickly towards the garden.",
          "replyBm": "Saya ingat seorang individu berkaca mata berjalan pantas ke arah taman bunga.",
          "clueNote": "Clue: distinctive glasses walking towards the garden.",
          "clueNoteBm": "Petunjuk: Individu berkaca mata bergegas ke arah taman bunga.",
          "clueId": "clue_glasses_person",
          "verified": true
        },
        "V": {
          "reply": "I made a sketch around 6 PM. It shows a purple beret and gold hair accessory.",
          "replyBm": "Saya melukis lakaran sekitar jam 6 petang. Ia menunjukkan beret ungu dan aksesori rambut berwarna emas.",
          "clueNote": "Clue: sketch shows purple beret, glasses, and gold hair accessory matching Maya.",
          "clueNoteBm": "Petunjuk Kritikal: Lakaran jam 6 petang menunjukkan beret ungu, cermin mata, dan aksesori rambut emas (sepadan Maya).",
          "clueId": "clue_artist_sketch",
          "verified": true
        },
        "L": {
          "reply": "Compare my drawing with Sora's photograph. I think we saw the same person.",
          "replyBm": "Bandingkan lukisan saya dengan gambar foto Sora. Saya rasa kami berdua melihat orang yang sama.",
          "clueNote": "Lead: corroborate eyewitnesses.",
          "clueNoteBm": "Petunjuk: Bandingkan lakaran Tessa dengan foto Sora Dain.",
          "clueId": "lead_compare_sora_tessa",
          "verified": true
        }
      }
    }
  ]
};
