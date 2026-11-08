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
