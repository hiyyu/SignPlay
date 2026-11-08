// Firestore sync for SignPlay (used by index.html, dashboard.html, profile.html)
//
// Data lives in:  users/{uid}  ->  { displayName, avatar, progress: { done, streak, week }, updatedAt }
//
// The learning path keeps reading/writing its progress in localStorage (sp-done, sp-streak, sp-week).
// This file makes that localStorage belong to the signed-in account:
//   - on sign-in / page load  -> restore the account's progress from Firestore into localStorage
//   - before logging out      -> save it to Firestore, then clear it from this browser

import { auth } from "./firebase-config.js";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const db = getFirestore(auth.app);

const K_DONE = "sp-done";
const K_STREAK = "sp-streak";
const K_WEEK = "sp-week";
const K_STARS = "sp-stars";   // best stars per stage, e.g. {"4":3}
const K_OWNER = "sp-owner";     // uid that the progress in this browser belongs to
const K_SYNCED = "sp-synced";   // last progress value that was saved to / loaded from Firestore

/* ---------- helpers ---------- */
export function withTimeout(promise, ms) {
    return Promise.race([
        Promise.resolve(promise).catch(function () {}),
        new Promise(function (resolve) { setTimeout(resolve, ms); })
    ]);
}

function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

function readLocal() {
    const p = {};
    try {
        const d = lsGet(K_DONE);
        if (d !== null) p.done = Math.min(30, Math.max(0, parseInt(d, 10) || 0));
        const s = JSON.parse(lsGet(K_STREAK) || "null");
        if (s && s.count) p.streak = { last: String(s.last || ""), count: Number(s.count) || 1 };
        const w = JSON.parse(lsGet(K_WEEK) || "null");
        if (w && w.key !== undefined) p.week = { key: String(w.key), base: Number(w.base) || 0 };
        const st = JSON.parse(lsGet(K_STARS) || "null");
        if (st && typeof st === "object") p.stars = cleanStars(st);
    } catch (e) {}
    return p;
}

function writeLocal(p) {
    if (p.done !== undefined) lsSet(K_DONE, String(p.done)); else lsDel(K_DONE);
    if (p.streak) lsSet(K_STREAK, JSON.stringify({ last: p.streak.last, count: p.streak.count })); else lsDel(K_STREAK);
    if (p.week) lsSet(K_WEEK, JSON.stringify({ key: p.week.key, base: p.week.base })); else lsDel(K_WEEK);
    if (p.stars && Object.keys(p.stars).length) lsSet(K_STARS, JSON.stringify(p.stars)); else lsDel(K_STARS);
}

function clearLocal() {
    [K_DONE, K_STREAK, K_WEEK, K_STARS, K_OWNER, K_SYNCED].forEach(lsDel);
}

// Firestore rejects undefined values, so keep only what exists
function clean(p) {
    const o = {};
    if (p.done !== undefined) o.done = p.done;
    if (p.streak) o.streak = { last: p.streak.last, count: p.streak.count };
    if (p.week) o.week = { key: p.week.key, base: p.week.base };
    if (p.stars && Object.keys(p.stars).length) o.stars = cleanStars(p.stars);
    return o;
}

// keep only valid stage -> 1..3 stars entries
function cleanStars(s) {
    const o = {};
    Object.keys(s || {}).forEach(function (k) {
        const n = parseInt(k, 10), v = Number(s[k]);
        if (n >= 1 && n <= 30 && v >= 1 && v <= 3) o[n] = Math.round(v);
    });
    return o;
}

// best stars per stage from two copies
function mergeStars(a, b) {
    const o = cleanStars(a);
    const c = cleanStars(b);
    Object.keys(c).forEach(function (k) { if (!o[k] || c[k] > o[k]) o[k] = c[k]; });
    return o;
}

function dateOf(str) {
    // "2026-11-8" style (not zero padded)
    const m = /^(\d+)-(\d+)-(\d+)$/.exec(str || "");
    return m ? new Date(+m[1], +m[2] - 1, +m[3]).getTime() : 0;
}

function pickStreak(a, b) {
    if (!a) return b;
    if (!b) return a;
    const da = dateOf(a.last), db_ = dateOf(b.last);
    if (da !== db_) return da > db_ ? a : b;
    return a.count >= b.count ? a : b;
}

async function pushProgress(user, p) {
    await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName || null,
        progress: clean(p),
        updatedAt: serverTimestamp()
    }, { merge: true });
    lsSet(K_SYNCED, JSON.stringify({ done: p.done === undefined ? null : p.done }));
}

/* ---------- public API ---------- */

// Call once the user is signed in + verified, BEFORE showing progress or opening the learning path.
export async function ensureUserProgress(user) {
    try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const remote = snap.exists() ? snap.data() : null;
        const rp = remote && remote.progress ? remote.progress : null;

        const owner = lsGet(K_OWNER);
        const local = readLocal();
        let finalP;

        if (owner === user.uid) {
            // This browser already holds this account's progress
            let synced = null;
            try { synced = JSON.parse(lsGet(K_SYNCED) || "null"); } catch (e) {}
            const localDone = local.done === undefined ? null : local.done;
            const changedHere = local.done !== undefined && (!synced || synced.done !== localDone);

            if (rp && !changedHere) {
                // Nothing new here: take the cloud copy (it may be newer from another device)
                finalP = {
                    done: rp.done !== undefined ? rp.done : local.done,
                    streak: pickStreak(local.streak, rp.streak),
                    week: rp.week || local.week,
                    stars: mergeStars(local.stars, rp.stars)
                };
            } else {
                finalP = local;   // progress was made here: this is the newest
                finalP.stars = mergeStars(local.stars, rp && rp.stars);
            }
        } else if (rp) {
            finalP = rp;          // different account (or fresh browser): restore from cloud
        } else if (!owner && local.done > 0) {
            finalP = local;       // progress from before accounts existed: first account adopts it
        } else {
            finalP = {};          // brand-new account: start fresh
        }

        writeLocal(finalP);
        lsSet(K_OWNER, user.uid);
        await pushProgress(user, finalP);

        // Avatar choice lives in the cloud too; mirror it for the pages that read localStorage
        if (remote && remote.avatar !== undefined && remote.avatar !== null) {
            if (remote.avatar >= 0) lsSet("sp-avatar-" + user.uid, String(remote.avatar));
            else lsDel("sp-avatar-" + user.uid);
        }
        return { ok: true };
    } catch (err) {
        console.warn("SignPlay sync skipped:", err && err.code ? err.code : err);
        return { ok: false, error: err };
    }
}

// Save profile fields (name + avatar) to Firestore
export async function saveProfileData(user, data) {
    const payload = { updatedAt: serverTimestamp() };
    if (data.displayName !== undefined) payload.displayName = data.displayName;
    if (data.avatar !== undefined) payload.avatar = data.avatar;
    await setDoc(doc(db, "users", user.uid), payload, { merge: true });
}

// Save this account's current progress (call after the learning path changes it)
export async function saveProgressNow(user) {
    try {
        if (user && lsGet(K_OWNER) === user.uid) await pushProgress(user, readLocal());
    } catch (e) {
        console.warn("SignPlay progress save skipped:", e && e.code ? e.code : e);
    }
}

// Call right before signOut(): saves this account's latest progress, then clears it from the browser
export async function endSession(user) {
    try {
        if (user && lsGet(K_OWNER) === user.uid) {
            await withTimeout(pushProgress(user, readLocal()), 3000);
        }
    } catch (e) {
        console.warn("SignPlay save-before-logout skipped:", e && e.code ? e.code : e);
    }
    clearLocal();
}
