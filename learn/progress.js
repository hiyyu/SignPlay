/* SignPlay progress helper (loaded by every stage page).
   Progress is one number, sp-done = how many stages are completed (0-30).
   Badges, XP and rank on the dashboard and profile are all calculated from it,
   and sync.js copies it to the signed-in account. So passing a stage only has to update it.
   Per-stage stars are kept in sp-stars ({ "5": 3, ... }) and synced the same way. */
(function () {
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  window.SPProgress = {
    done: function () {
      return Math.min(30, Math.max(0, parseInt(get("sp-done"), 10) || 0));
    },

    // Call when a stage is passed.
    // If it is the next stage in order, it unlocks (sp-done goes up by one).
    // Replaying an earlier stage only keeps the better star score.
    complete: function (stage, pct, stars) {
      var d = this.done();
      var isNew = (stage === d + 1);
      if (isNew) set("sp-done", String(stage));

      var best = {};
      try { best = JSON.parse(get("sp-stars") || "{}") || {}; } catch (e) { best = {}; }
      if (!best[stage] || stars > best[stage]) best[stage] = stars;
      set("sp-stars", JSON.stringify(best));

      // The learning path reads this once, plays the celebration, then deletes it
      set("sp-celebrate", JSON.stringify({ stage: stage, isNew: isNew, pct: pct, stars: stars }));
      return isNew;
    },

    // Adds the "Continue" button under the results screen
    addBack: function (ok) {
      var m = document.getElementById("m");
      if (!m || document.getElementById("sp-back")) return;
      var a = document.createElement("a");
      a.id = "sp-back";
      a.className = "btn";
      a.href = "learningpath.html";
      a.textContent = ok ? "Continue on the learning path" : "Back to the learning path";
      m.appendChild(a);
    }
  };
})();
