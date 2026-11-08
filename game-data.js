// Shared game data + avatar helpers (used by dashboard.html and learn/learningpath.html)

// Badges: add or edit entries here
var BADGES = [
  { icon: "👋", name: "First Sign",       min: 1,  hint: "Complete 1 stage" },
  { icon: "🔢", name: "Number Whiz",      min: 2,  hint: "Complete 2 stages" },
  { icon: "🔍", name: "Clue Finder",      min: 5,  hint: "Complete 5 stages" },
  { icon: "👨‍👩‍👧", name: "Family Friend",    min: 6,  hint: "Complete 6 stages" },
  { icon: "🤝", name: "Dialogue Pro",     min: 10, hint: "Unlock at Lvl 2" },
  { icon: "😊", name: "Emotion Reader",   min: 11, hint: "Complete 11 stages" },
  { icon: "🚀", name: "Halfway Hero",     min: 15, hint: "Complete 15 stages" },
  { icon: "⚔️", name: "Boss Slayer",      min: 20, hint: "Beat 2 bosses" },
  { icon: "❓", name: "Question Master",  min: 22, hint: "Complete 22 stages" },
  { icon: "📖", name: "Storyteller",      min: 27, hint: "Complete 27 stages" },
  { icon: "🌍", name: "Culture Keeper",   min: 29, hint: "Complete 29 stages" },
  { icon: "🏆", name: "Sign Champion",    min: 30, hint: "Master all 30" }
];

// Level milestones shown in the activity feed
var LEVEL_EVENTS = [
  { min: 10, icon: "🎓", name: "Foundations" },
  { min: 20, icon: "🌟", name: "Everyday Life" },
  { min: 30, icon: "👑", name: "Conversational Fluency" }
];

// Player ranks (a new player level every 300 XP)
var RANKS = ["ROOKIE", "EXPLORER", "SIGNER", "STORYTELLER", "EXPERT", "MASTER", "LEGEND"];
var XP_PER_LEVEL = 300;

function isBoss(s) { return s % 10 === 0; }
function xpOf(n) {
  var t = 0;
  for (var i = 1; i <= n; i++) t += isBoss(i) ? 150 : 50;
  return t;
}

// ---------- Avatars ----------
var SP_AVATARS = [
  { e: "🦊", bg: "linear-gradient(135deg,#ffb36b,#ff6b57)" },
  { e: "🐼", bg: "linear-gradient(135deg,#9ad0ff,#3aa0ff)" },
  { e: "🐸", bg: "linear-gradient(135deg,#8be8c7,#1fb5a8)" },
  { e: "🦄", bg: "linear-gradient(135deg,#d6b8ff,#b48cff)" },
  { e: "🐯", bg: "linear-gradient(135deg,#ffe08a,#ffc83d)" },
  { e: "🐙", bg: "linear-gradient(135deg,#ff9ac2,#ec4899)" },
  { e: "🐧", bg: "linear-gradient(135deg,#a9b4ff,#5b3fd1)" },
  { e: "🦉", bg: "linear-gradient(135deg,#d9b38c,#a8743f)" }
];

// Avatar choice is stored in this browser, per account
function spGetAvatar(uid) {
  try {
    var v = localStorage.getItem("sp-avatar-" + uid);
    if (v === null) return null;
    return SP_AVATARS[parseInt(v, 10)] || null;
  } catch (e) { return null; }
}
function spSetAvatar(uid, index) {
  try {
    if (index < 0) localStorage.removeItem("sp-avatar-" + uid);
    else localStorage.setItem("sp-avatar-" + uid, String(index));
  } catch (e) {}
}
// Fill an avatar element: chosen emoji > Google photo > first letter
function spApplyAvatar(el, user, name) {
  el.textContent = "";
  el.style.background = "";
  var a = spGetAvatar(user.uid);
  if (a) {
    el.textContent = a.e;
    el.style.background = a.bg;
  } else if (user.photoURL) {
    var img = document.createElement("img");
    img.src = user.photoURL;
    img.alt = "";
    img.referrerPolicy = "no-referrer";
    img.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:50%";
    el.appendChild(img);
  } else {
    el.textContent = (name || "S").charAt(0).toUpperCase();
  }
}

// =====================================================================
// Gestigo (Mystery Gameplay) data - used by dashboard.html
// Progress itself is saved by the game under localStorage keys "gestigo_*"
// =====================================================================
var GAME_RANKS = [
  { minXp: 0,    title: "Rookie Sleuth" },
  { minXp: 500,  title: "Junior Gumshoe" },
  { minXp: 1600, title: "Field Inspector" },
  { minXp: 3800, title: "Chief Detective" },
  { minXp: 7200, title: "Master Sleuth" }
];

// Game achievements. type: stages = N stages cleared, stage = a specific stage cleared,
// clues = N clues found, stars = N stars collected, book = Memory Book recovered
var GAME_BADGES = [
  { icon: "🕵️", name: "First Case",       type: "stages", n: 1,  hint: "Clear your first stage" },
  { icon: "🔎", name: "Sharp Eye",        type: "stages", n: 5,  hint: "Clear 5 stages" },
  { icon: "🚪", name: "Level 1 Cleared",  type: "stage",  n: 10, hint: "Beat the Level 1 boss (stage 10)" },
  { icon: "🧩", name: "Clue Hunter",      type: "clues",  n: 5,  hint: "Find 5 clues" },
  { icon: "🌃", name: "City Detective",   type: "stages", n: 15, hint: "Clear 15 stages" },
  { icon: "🧠", name: "Level 2 Cleared",  type: "stage",  n: 20, hint: "Beat the Level 2 boss (stage 20)" },
  { icon: "⭐", name: "Star Collector",   type: "stars",  n: 30, hint: "Collect 30 stars" },
  { icon: "📖", name: "Book Recovered",   type: "book",   n: 1,  hint: "Recover the Memory Book" },
  { icon: "🏆", name: "Master Detective", type: "stage",  n: 30, hint: "Beat the final boss (stage 30)" },
  { icon: "💯", name: "Perfect Run",      type: "stars",  n: 90, hint: "Collect all 90 stars" }
];

function spGameRank(xp) {
  var r = GAME_RANKS[0], next = null;
  for (var i = 0; i < GAME_RANKS.length; i++) {
    if (xp >= GAME_RANKS[i].minXp) { r = GAME_RANKS[i]; next = GAME_RANKS[i + 1] || null; }
  }
  return { rank: r, next: next };
}

function spGameJson(key, fallback) {
  try {
    var v = localStorage.getItem(key);
    return v === null ? fallback : JSON.parse(v);
  } catch (e) { return fallback; }
}

// Read the game's progress from localStorage and work out the numbers the dashboard shows
function spGameStats() {
  var xpRaw = parseInt(localStorage.getItem("gestigo_xp"), 10);
  var xp = isNaN(xpRaw) ? 150 : xpRaw;           // the game starts new players on 150 XP
  var completed = spGameJson("gestigo_completed", {});
  var clues = spGameJson("gestigo_clues", []);
  var clues3 = spGameJson("gestigo_level3_clues", []);
  var ids = Object.keys(completed).map(Number).filter(function (id) { return completed[id] > 0; }).sort(function (a, b) { return a - b; });
  var stars = 0;
  ids.forEach(function (id) { stars += Math.min(3, Number(completed[id]) || 0); });

  var perLevel = [0, 0, 0];
  ids.forEach(function (id) { if (id >= 1 && id <= 30) perLevel[Math.floor((id - 1) / 10)]++; });

  var clueCount = (Array.isArray(clues) ? clues.length : 0) + (Array.isArray(clues3) ? clues3.length : 0);
  var info = spGameRank(xp);
  return {
    xp: xp,
    rank: info.rank,
    nextRank: info.next,
    stagesDone: ids.length,
    stageIds: ids,
    completed: completed,
    stars: stars,
    perLevel: perLevel,
    percent: Math.round(ids.length / 30 * 100),
    bosses: [10, 20, 30].filter(function (b) { return completed[b] > 0; }).length,
    clues: Array.isArray(clues) ? clues : [],
    clueCount: clueCount,
    bookRecovered: localStorage.getItem("gestigo_level3_book_recovered") === "true"
  };
}

function spGameBadgeEarned(b, s) {
  if (b.type === "stages") return s.stagesDone >= b.n;
  if (b.type === "stage")  return s.completed[b.n] > 0;
  if (b.type === "clues")  return s.clueCount >= b.n;
  if (b.type === "stars")  return s.stars >= b.n;
  if (b.type === "book")   return s.bookRecovered;
  return false;
}
