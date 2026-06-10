(() => {
  const SETTINGS = window.BRACKET_APP_SETTINGS || {
    eventId: "worldcup2026",
    adminPassphrase: "change-this-before-sharing",
    maxParticipants: 8
  };

  const SCORING = {
    winBasePoints: 5,
    exactScorePoints: 2,
    goalDifferencePoints: 1,
    roundMultipliers: {
      "Round of 32": 1,
      "Round of 16": 2,
      "Quarterfinals": 4,
      "Semifinals": 8,
      "Final": 16
    },
    ...(window.BRACKET_SCORING || {})
  };

  const ROUNDS = [
    { name: "Round of 32", ids: ["m73", "m74", "m75", "m76", "m77", "m78", "m79", "m80", "m81", "m82", "m83", "m84", "m85", "m86", "m87", "m88"] },
    { name: "Round of 16", ids: ["m89", "m90", "m91", "m92", "m93", "m94", "m95", "m96"] },
    { name: "Quarterfinals", ids: ["m97", "m98", "m99", "m100"] },
    { name: "Semifinals", ids: ["m101", "m102"] },
    { name: "Final", ids: ["m104"] }
  ];

  const MATCHES = {
    m73: { title: "Match 73", slots: [{ teamId: "2A", label: "Runner-up Group A" }, { teamId: "2B", label: "Runner-up Group B" }] },
    m74: { title: "Match 74", slots: [{ teamId: "1E", label: "Winner Group E" }, { teamId: "3ABCDF", label: "3rd Group A/B/C/D/F" }] },
    m75: { title: "Match 75", slots: [{ teamId: "1F", label: "Winner Group F" }, { teamId: "2C", label: "Runner-up Group C" }] },
    m76: { title: "Match 76", slots: [{ teamId: "1C", label: "Winner Group C" }, { teamId: "2F", label: "Runner-up Group F" }] },
    m77: { title: "Match 77", slots: [{ teamId: "1I", label: "Winner Group I" }, { teamId: "3CDFGH", label: "3rd Group C/D/F/G/H" }] },
    m78: { title: "Match 78", slots: [{ teamId: "2E", label: "Runner-up Group E" }, { teamId: "2I", label: "Runner-up Group I" }] },
    m79: { title: "Match 79", slots: [{ teamId: "1A", label: "Winner Group A" }, { teamId: "3CEFHI", label: "3rd Group C/E/F/H/I" }] },
    m80: { title: "Match 80", slots: [{ teamId: "1L", label: "Winner Group L" }, { teamId: "3EHIJK", label: "3rd Group E/H/I/J/K" }] },
    m81: { title: "Match 81", slots: [{ teamId: "1D", label: "Winner Group D" }, { teamId: "3BEFIJ", label: "3rd Group B/E/F/I/J" }] },
    m82: { title: "Match 82", slots: [{ teamId: "1G", label: "Winner Group G" }, { teamId: "3AEHIJ", label: "3rd Group A/E/H/I/J" }] },
    m83: { title: "Match 83", slots: [{ teamId: "2K", label: "Runner-up Group K" }, { teamId: "2L", label: "Runner-up Group L" }] },
    m84: { title: "Match 84", slots: [{ teamId: "1H", label: "Winner Group H" }, { teamId: "2J", label: "Runner-up Group J" }] },
    m85: { title: "Match 85", slots: [{ teamId: "1B", label: "Winner Group B" }, { teamId: "3EFGIJ", label: "3rd Group E/F/G/I/J" }] },
    m86: { title: "Match 86", slots: [{ teamId: "1J", label: "Winner Group J" }, { teamId: "2H", label: "Runner-up Group H" }] },
    m87: { title: "Match 87", slots: [{ teamId: "1K", label: "Winner Group K" }, { teamId: "3DEIJL", label: "3rd Group D/E/I/J/L" }] },
    m88: { title: "Match 88", slots: [{ teamId: "2D", label: "Runner-up Group D" }, { teamId: "2G", label: "Runner-up Group G" }] },

    m89: { title: "Match 89", slots: [{ winnerOf: "m74" }, { winnerOf: "m77" }] },
    m90: { title: "Match 90", slots: [{ winnerOf: "m73" }, { winnerOf: "m75" }] },
    m91: { title: "Match 91", slots: [{ winnerOf: "m76" }, { winnerOf: "m78" }] },
    m92: { title: "Match 92", slots: [{ winnerOf: "m79" }, { winnerOf: "m80" }] },
    m93: { title: "Match 93", slots: [{ winnerOf: "m83" }, { winnerOf: "m84" }] },
    m94: { title: "Match 94", slots: [{ winnerOf: "m81" }, { winnerOf: "m82" }] },
    m95: { title: "Match 95", slots: [{ winnerOf: "m86" }, { winnerOf: "m88" }] },
    m96: { title: "Match 96", slots: [{ winnerOf: "m85" }, { winnerOf: "m87" }] },

    m97: { title: "Match 97", slots: [{ winnerOf: "m89" }, { winnerOf: "m90" }] },
    m98: { title: "Match 98", slots: [{ winnerOf: "m93" }, { winnerOf: "m94" }] },
    m99: { title: "Match 99", slots: [{ winnerOf: "m91" }, { winnerOf: "m92" }] },
    m100: { title: "Match 100", slots: [{ winnerOf: "m95" }, { winnerOf: "m96" }] },

    m101: { title: "Match 101", slots: [{ winnerOf: "m97" }, { winnerOf: "m98" }] },
    m102: { title: "Match 102", slots: [{ winnerOf: "m99" }, { winnerOf: "m100" }] },

    m104: { title: "Final", slots: [{ winnerOf: "m101" }, { winnerOf: "m102" }] }
  };

  const BRACKET_LAYOUT = [
    { key: "left-r32", side: "left", round: "Round of 32", ids: ["m74", "m77", "m73", "m75", "m83", "m84", "m81", "m82"] },
    { key: "left-r16", side: "left", round: "Round of 16", ids: ["m89", "m90", "m93", "m94"] },
    { key: "left-qf", side: "left", round: "Quarterfinals", ids: ["m97", "m98"] },
    { key: "left-sf", side: "left", round: "Semifinals", ids: ["m101"] },
    { key: "final", side: "center", round: "Final", ids: ["m104"] },
    { key: "right-sf", side: "right", round: "Semifinals", ids: ["m102"] },
    { key: "right-qf", side: "right", round: "Quarterfinals", ids: ["m99", "m100"] },
    { key: "right-r16", side: "right", round: "Round of 16", ids: ["m91", "m92", "m95", "m96"] },
    { key: "right-r32", side: "right", round: "Round of 32", ids: ["m76", "m78", "m79", "m80", "m86", "m88", "m85", "m87"] }
  ];

  const ALL_MATCH_IDS = ROUNDS.flatMap(round => round.ids);
  const BASE_LABELS = {};
  Object.values(MATCHES).forEach(match => {
    match.slots.forEach(slot => {
      if (slot.teamId) BASE_LABELS[slot.teamId] = slot.label;
    });
  });

  const els = {
    connectionDot: document.getElementById("connectionDot"),
    connectionStatus: document.getElementById("connectionStatus"),
    nameInput: document.getElementById("nameInput"),
    pinInput: document.getElementById("pinInput"),
    joinBtn: document.getElementById("joinBtn"),
    copyLinkBtn: document.getElementById("copyLinkBtn"),
    joinMessage: document.getElementById("joinMessage"),
    playerPanel: document.getElementById("playerPanel"),
    playerTitle: document.getElementById("playerTitle"),
    lockNotice: document.getElementById("lockNotice"),
    yourTotalPoints: document.getElementById("yourTotalPoints"),
    saveBtn: document.getElementById("saveBtn"),
    resetBtn: document.getElementById("resetBtn"),
    bracketSection: document.getElementById("bracketSection"),
    bracket: document.getElementById("bracket"),
    leaderboardSection: document.getElementById("leaderboardSection"),
    leaderboard: document.getElementById("leaderboard"),
    exportCsvBtn: document.getElementById("exportCsvBtn"),
    viewRulesBtn: document.getElementById("viewRulesBtn"),
    viewRulesBtn2: document.getElementById("viewRulesBtn2"),
    rulesDialog: document.getElementById("rulesDialog"),
    closeRulesBtn: document.getElementById("closeRulesBtn"),
    rulesContent: document.getElementById("rulesContent"),
    adminKeyInput: document.getElementById("adminKeyInput"),
    adminUnlockBtn: document.getElementById("adminUnlockBtn"),
    adminControls: document.getElementById("adminControls"),
    toggleLockBtn: document.getElementById("toggleLockBtn"),
    saveLabelsBtn: document.getElementById("saveLabelsBtn"),
    labelEditor: document.getElementById("labelEditor"),
    extraRulesInput: document.getElementById("extraRulesInput"),
    saveRulesBtn: document.getElementById("saveRulesBtn"),
    officialBracket: document.getElementById("officialBracket"),
    saveResultsBtn: document.getElementById("saveResultsBtn")
  };

  const state = {
    online: false,
    db: null,
    gameRef: null,
    predictionsRef: null,
    playerId: localStorage.getItem("wc26_playerId") || "",
    playerName: localStorage.getItem("wc26_playerName") || "",
    userPicks: {},
    userScorePredictions: {},
    allPredictions: [],
    config: normalizeConfig({}),
    adminUnlocked: false,
    officialDraft: {},
    officialScoreDraft: {}
  };

  function normalizeConfig(data) {
    return {
      locked: Boolean(data?.locked),
      labelOverrides: data?.labelOverrides || {},
      results: cleanPicksRaw(data?.results || {}),
      resultScores: cleanScoreMap(data?.resultScores || {}),
      extraRulesText: String(data?.extraRulesText || "")
    };
  }

  function hasFirebaseConfig() {
    const cfg = window.FIREBASE_CONFIG || {};
    return Boolean(cfg.apiKey && cfg.projectId && !String(cfg.apiKey).startsWith("PASTE_") && !String(cfg.projectId).startsWith("PASTE_"));
  }

  function setStatus(kind, text) {
    els.connectionDot.className = `dot ${kind}`;
    els.connectionStatus.textContent = text;
  }

  function setMessage(text, type = "") {
    els.joinMessage.textContent = text;
    els.joinMessage.className = `message ${type}`.trim();
  }

  function roundOfMatch(matchId) {
    return ROUNDS.find(round => round.ids.includes(matchId));
  }

  function multiplierFor(matchId) {
    return Number(SCORING.roundMultipliers?.[roundOfMatch(matchId)?.name] || 1);
  }

  function winnerPointsFor(matchId) {
    return Number(SCORING.winBasePoints || 0) * multiplierFor(matchId);
  }

  function labelForTeam(teamId) {
    return state.config.labelOverrides?.[teamId] || BASE_LABELS[teamId] || teamId;
  }

  function slotToTeam(slot, picks) {
    if (slot.teamId) {
      return { id: slot.teamId, label: labelForTeam(slot.teamId), pending: false };
    }
    if (slot.winnerOf) {
      const winnerId = picks[slot.winnerOf];
      if (!winnerId) {
        return { id: `W${slot.winnerOf.replace("m", "")}`, label: `Winner ${MATCHES[slot.winnerOf].title}`, pending: true };
      }
      return { id: winnerId, label: labelForTeam(winnerId), pending: false };
    }
    return { id: "TBD", label: "TBD", pending: true };
  }

  function availableTeams(matchId, picks) {
    return MATCHES[matchId].slots.map(slot => slotToTeam(slot, picks));
  }

  function cleanPicksRaw(picks) {
    const cleaned = {};
    ALL_MATCH_IDS.forEach(matchId => {
      if (typeof picks?.[matchId] === "string") cleaned[matchId] = picks[matchId];
    });
    return cleaned;
  }

  function cleanPicks(picks) {
    const cleaned = {};
    for (const round of ROUNDS) {
      for (const matchId of round.ids) {
        const available = availableTeams(matchId, cleaned).filter(team => !team.pending).map(team => team.id);
        if (available.includes(picks?.[matchId])) {
          cleaned[matchId] = picks[matchId];
        }
      }
    }
    return cleaned;
  }

  function cleanScoreMap(scores) {
    const cleaned = {};
    ALL_MATCH_IDS.forEach(matchId => {
      const score = scores?.[matchId];
      if (!score || typeof score !== "object") return;
      const a = normalizeScoreNumber(score.a);
      const b = normalizeScoreNumber(score.b);
      if (a !== null || b !== null) cleaned[matchId] = { a, b };
    });
    return cleaned;
  }

  function normalizeScoreNumber(value) {
    if (value === "" || value === null || value === undefined) return null;
    const n = Number(value);
    if (!Number.isInteger(n) || n < 0 || n > 99) return null;
    return n;
  }

  function readScoreInput(value) {
    return normalizeScoreNumber(String(value).trim());
  }

  function isCompleteScore(score) {
    return Number.isInteger(score?.a) && Number.isInteger(score?.b);
  }

  function scoreText(score) {
    return isCompleteScore(score) ? `${score.a}-${score.b}` : "";
  }

  function championFrom(picks) {
    return picks?.m104 ? labelForTeam(picks.m104) : "—";
  }

  function matchupMatchesActual(matchId, userPicks, actualPicks) {
    const userTeams = availableTeams(matchId, userPicks);
    const actualTeams = availableTeams(matchId, actualPicks);
    return userTeams.every((team, idx) => !team.pending && team.id === actualTeams[idx]?.id);
  }

  function matchBreakdown(picks, scores, matchId) {
    const userPicks = cleanPicks(picks || {});
    const actualPicks = cleanPicks(state.config.results || {});
    const actualWinner = actualPicks[matchId];
    const userWinner = userPicks[matchId];
    const predScore = cleanScoreMap(scores || {})[matchId];
    const actualScore = state.config.resultScores?.[matchId];

    let win = 0;
    let exact = 0;
    let gd = 0;
    if (actualWinner && userWinner === actualWinner) {
      win = winnerPointsFor(matchId);
    }

    const sameMatchup = actualWinner && matchupMatchesActual(matchId, userPicks, actualPicks);
    if (sameMatchup && isCompleteScore(predScore) && isCompleteScore(actualScore)) {
      if (predScore.a === actualScore.a && predScore.b === actualScore.b) exact = Number(SCORING.exactScorePoints || 0);
      if ((predScore.a - predScore.b) === (actualScore.a - actualScore.b)) gd = Number(SCORING.goalDifferencePoints || 0);
    }

    return { win, exact, gd, total: win + exact + gd };
  }

  function scoreEntry(picks, scores) {
    return ALL_MATCH_IDS.reduce((sum, matchId) => {
      const b = matchBreakdown(picks, scores, matchId);
      sum.win += b.win;
      sum.exact += b.exact;
      sum.gd += b.gd;
      sum.total += b.total;
      return sum;
    }, { win: 0, exact: 0, gd: 0, total: 0 });
  }

  function renderBracket(container, picks, scores, options = {}) {
    const isAdmin = options.mode === "admin";
    const isUser = options.mode === "user";
    const compareResults = Boolean(options.compareResults);
    const cleanCurrentPicks = cleanPicks(picks || {});
    const cleanCurrentScores = cleanScoreMap(scores || {});
    container.innerHTML = "";

    BRACKET_LAYOUT.forEach(column => {
      const columnEl = document.createElement("section");
      columnEl.className = `bracket-column ${column.side}-side ${column.key === "final" ? "final-column" : ""}`.trim();
      columnEl.dataset.round = column.round;

      const title = document.createElement("div");
      title.className = "round-title";
      title.textContent = column.round;
      columnEl.appendChild(title);

      const stack = document.createElement("div");
      stack.className = "match-stack";
      column.ids.forEach(matchId => {
        stack.appendChild(renderMatchCard(matchId, cleanCurrentPicks, cleanCurrentScores, { isAdmin, isUser, compareResults }));
      });

      if (column.key === "final") {
        const champ = document.createElement("div");
        champ.className = "champion-card";
        champ.innerHTML = `<span class="muted">Champion</span><strong>${escapeHtml(championFrom(cleanCurrentPicks))}</strong>`;
        stack.appendChild(champ);
      }

      columnEl.appendChild(stack);
      container.appendChild(columnEl);
    });
  }

  function renderMatchCard(matchId, picks, scores, options) {
    const { isAdmin, isUser, compareResults } = options;
    const round = roundOfMatch(matchId);
    const teams = availableTeams(matchId, picks);
    const bothTeamsKnown = teams.every(team => !team.pending);
    const selectedWinner = picks[matchId];
    const card = document.createElement("article");
    card.className = "match-card";

    const meta = document.createElement("div");
    meta.className = "match-meta";
    meta.innerHTML = `<span>${escapeHtml(MATCHES[matchId].title)}<small>${escapeHtml(round.name)}</small></span><span>Win: ${winnerPointsFor(matchId)} pts</span>`;
    card.appendChild(meta);

    teams.forEach(team => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.disabled = team.pending || (isUser && state.config.locked);
      btn.dataset.matchId = matchId;
      btn.dataset.teamId = team.id;

      const selected = selectedWinner === team.id;
      if (selected) btn.classList.add("selected");

      if (compareResults && state.config.results?.[matchId]) {
        if (selected && state.config.results[matchId] === team.id) btn.classList.add("correct");
        if (selected && state.config.results[matchId] !== team.id) btn.classList.add("incorrect");
      }

      btn.innerHTML = `<span>${escapeHtml(team.label)}</span>${selected ? '<span class="badge">picked</span>' : ''}`;
      btn.addEventListener("click", () => {
        if (isAdmin) {
          state.officialDraft[matchId] = team.id;
          state.officialDraft = cleanPicks(state.officialDraft);
          state.officialScoreDraft = cleanScoreMap(state.officialScoreDraft);
          renderAdminTools();
        } else {
          state.userPicks[matchId] = team.id;
          state.userPicks = cleanPicks(state.userPicks);
          state.userScorePredictions = cleanScoreMap(state.userScorePredictions);
          renderAll();
        }
      });
      card.appendChild(btn);
    });

    card.appendChild(renderScoreInputs(matchId, teams, cleanScoreMap(scores)[matchId], { isAdmin, isUser, compareResults, disabled: !bothTeamsKnown || (isUser && state.config.locked) }));

    if (compareResults && state.config.results?.[matchId]) {
      const b = matchBreakdown(picks, scores, matchId);
      const points = document.createElement("p");
      points.className = "match-points";
      points.innerHTML = `Your points: <strong>${b.total}</strong> <span class="breakdown">winner ${b.win} · score ${b.exact} · GD ${b.gd}</span>`;
      card.appendChild(points);
    }

    return card;
  }

  function renderScoreInputs(matchId, teams, score, options) {
    const row = document.createElement("div");
    row.className = "score-row";
    const disabled = options.disabled ? "disabled" : "";
    const labelA = teams[0]?.pending ? "TBD" : teams[0]?.label;
    const labelB = teams[1]?.pending ? "TBD" : teams[1]?.label;

    row.innerHTML = `
      <label title="${escapeHtml(labelA)}">${escapeHtml(shortLabel(labelA))}
        <input ${disabled} inputmode="numeric" type="number" min="0" max="99" step="1" value="${escapeHtml(score?.a ?? "")}" aria-label="${escapeHtml(labelA)} score" />
      </label>
      <span class="dash">–</span>
      <label title="${escapeHtml(labelB)}">${escapeHtml(shortLabel(labelB))}
        <input ${disabled} inputmode="numeric" type="number" min="0" max="99" step="1" value="${escapeHtml(score?.b ?? "")}" aria-label="${escapeHtml(labelB)} score" />
      </label>
    `;

    const inputs = row.querySelectorAll("input");
    if (options.compareResults && isCompleteScore(state.config.resultScores?.[matchId]) && isCompleteScore(score)) {
      const actual = state.config.resultScores[matchId];
      const exact = score.a === actual.a && score.b === actual.b;
      inputs.forEach(input => input.classList.add(exact ? "correct-score" : "incorrect-score"));
    }

    inputs.forEach(input => {
      input.addEventListener("input", () => {
        const nextScore = {
          a: readScoreInput(inputs[0].value),
          b: readScoreInput(inputs[1].value)
        };
        if (options.isAdmin) {
          state.officialScoreDraft[matchId] = nextScore;
        } else {
          state.userScorePredictions[matchId] = nextScore;
        }
      });
    });

    return row;
  }

  function shortLabel(label) {
    const text = String(label || "TBD");
    if (text.length <= 18) return text;
    return `${text.slice(0, 16)}…`;
  }

  function renderLabels() {
    els.labelEditor.innerHTML = "";
    ROUNDS[0].ids.forEach(matchId => {
      const match = MATCHES[matchId];
      const card = document.createElement("article");
      card.className = "label-card";
      const fields = match.slots.map(slot => {
        const label = labelForTeam(slot.teamId);
        return `<label>${escapeHtml(slot.teamId)}<input data-label-team="${escapeHtml(slot.teamId)}" value="${escapeHtml(label)}" /></label>`;
      }).join("");
      card.innerHTML = `<h4>${escapeHtml(match.title)}</h4><div class="slot-grid">${fields}</div>`;
      els.labelEditor.appendChild(card);
    });
  }

  function renderAdminTools() {
    if (!state.adminUnlocked) return;
    renderLabels();
    els.extraRulesInput.value = state.config.extraRulesText || "";
    state.officialDraft = cleanPicks(state.officialDraft || state.config.results || {});
    state.officialScoreDraft = cleanScoreMap(state.officialScoreDraft || state.config.resultScores || {});
    renderBracket(els.officialBracket, state.officialDraft, state.officialScoreDraft, { mode: "admin" });
    els.toggleLockBtn.textContent = state.config.locked ? "Unlock predictions" : "Lock predictions";
  }

  function renderLeaderboard() {
    const rows = state.allPredictions
      .map(entry => {
        const picks = cleanPicks(entry.picks || {});
        const scores = cleanScoreMap(entry.scorePredictions || {});
        const scored = scoreEntry(picks, scores);
        return {
          name: entry.name || "Unnamed",
          score: scored.total,
          winnerPoints: scored.win,
          exactPoints: scored.exact,
          gdPoints: scored.gd,
          champion: championFrom(picks),
          picks,
          scores,
          updatedAt: entry.updatedAt
        };
      })
      .sort((a, b) => b.score - a.score || String(a.name).localeCompare(String(b.name)));

    if (!rows.length) {
      els.leaderboard.className = "leaderboard empty";
      els.leaderboard.textContent = "No predictions yet.";
      return;
    }

    els.leaderboard.className = "leaderboard";
    const body = rows.map((row, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(row.name)}</td>
        <td><strong>${row.score}</strong><div class="breakdown">W ${row.winnerPoints} · Score ${row.exactPoints} · GD ${row.gdPoints}</div></td>
        <td>${escapeHtml(row.champion)}</td>
      </tr>
    `).join("");

    els.leaderboard.innerHTML = `
      <table>
        <thead><tr><th>Rank</th><th>Name</th><th>Total points</th><th>Champion pick</th></tr></thead>
        <tbody>${body}</tbody>
      </table>
    `;
  }

  function renderRules() {
    const roundRows = ROUNDS.map(round => {
      const mult = Number(SCORING.roundMultipliers?.[round.name] || 1);
      return `<div><span>${escapeHtml(round.name)}</span><strong>${Number(SCORING.winBasePoints || 0) * mult}</strong><small> winner points</small></div>`;
    }).join("");

    const extra = state.config.extraRulesText
      ? `<div class="rules-box"><h3>Extra house rules</h3><p>${escapeHtml(state.config.extraRulesText).replaceAll("\n", "<br />")}</p></div>`
      : `<div class="rules-box"><h3>Extra house rules</h3><p class="muted">No extra rules added yet. Admin can add rules or tie-breakers in Admin tools.</p></div>`;

    els.rulesContent.innerHTML = `
      <div class="rules-box">
        <h3>Point rules</h3>
        <ul>
          <li>Correct winner prediction: <strong>${Number(SCORING.winBasePoints || 0)} × round multiplier</strong>.</li>
          <li>Correct exact score prediction: <strong>${Number(SCORING.exactScorePoints || 0)} point${Number(SCORING.exactScorePoints || 0) === 1 ? "" : "s"}</strong>, constant for every round.</li>
          <li>Correct goal-difference prediction: <strong>${Number(SCORING.goalDifferencePoints || 0)} point${Number(SCORING.goalDifferencePoints || 0) === 1 ? "" : "s"}</strong>, constant for every round.</li>
          <li>For score and goal-difference bonuses in later rounds, your predicted matchup must match the actual matchup for that match slot.</li>
        </ul>
      </div>
      <div class="rules-box">
        <h3>Winner points by round</h3>
        <div class="round-points-grid">${roundRows}</div>
      </div>
      ${extra}
      <p class="muted">This app is intended for a friendly, no-money pool only.</p>
    `;
  }

  function showRules() {
    renderRules();
    if (typeof els.rulesDialog.showModal === "function") els.rulesDialog.showModal();
  }

  function renderAll() {
    const joined = Boolean(state.playerId && state.playerName);
    els.nameInput.value = state.playerName || els.nameInput.value;
    els.playerPanel.classList.toggle("hidden", !joined);
    els.bracketSection.classList.toggle("hidden", !joined);
    els.leaderboardSection.classList.toggle("hidden", false);

    if (joined) {
      const scored = scoreEntry(state.userPicks, state.userScorePredictions);
      els.yourTotalPoints.textContent = String(scored.total);
      els.playerTitle.textContent = `${state.playerName}'s bracket`;
      els.lockNotice.textContent = state.config.locked
        ? "Predictions are locked. You can view your bracket, but not edit it."
        : "Predictions are open. Remember to save after making changes.";
      els.saveBtn.disabled = state.config.locked;
      renderBracket(els.bracket, state.userPicks, state.userScorePredictions, { mode: "user", compareResults: true });
    }

    renderLeaderboard();
    renderAdminTools();
  }

  async function initFirebase() {
    try {
      if (!hasFirebaseConfig() || !window.firebase) {
        setStatus("offline", "Demo mode");
        loadLocalData();
        renderAll();
        return;
      }

      firebase.initializeApp(window.FIREBASE_CONFIG);
      await firebase.auth().signInAnonymously();
      state.db = firebase.firestore();
      state.gameRef = state.db.collection("games").doc(SETTINGS.eventId);
      state.predictionsRef = state.gameRef.collection("predictions");
      state.online = true;
      setStatus("online", "Online sync on");

      const initial = await state.gameRef.get();
      if (!initial.exists) {
        await state.gameRef.set({ locked: false, labelOverrides: {}, results: {}, resultScores: {}, extraRulesText: "", updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
      }

      state.gameRef.onSnapshot(snapshot => {
        state.config = normalizeConfig(snapshot.data() || {});
        if (!state.adminUnlocked) {
          state.officialDraft = { ...state.config.results };
          state.officialScoreDraft = { ...state.config.resultScores };
        }
        renderAll();
      });

      state.predictionsRef.onSnapshot(snapshot => {
        state.allPredictions = snapshot.docs.map(doc => doc.data());
        renderAll();
      });
    } catch (err) {
      console.error(err);
      setStatus("error", "Firebase error; demo mode");
      loadLocalData();
      renderAll();
    }
  }

  function loadLocalData() {
    try {
      state.config = normalizeConfig(JSON.parse(localStorage.getItem("wc26_config") || "null") || {});
      state.allPredictions = JSON.parse(localStorage.getItem("wc26_predictions") || "[]");
    } catch {
      state.allPredictions = [];
    }
  }

  function saveLocalData() {
    localStorage.setItem("wc26_config", JSON.stringify(state.config));
    localStorage.setItem("wc26_predictions", JSON.stringify(state.allPredictions));
  }

  async function joinBracket() {
    const name = els.nameInput.value.trim();
    const pin = els.pinInput.value.trim();
    if (!name) return setMessage("Enter a display name first.", "error");
    if (pin.length < 4) return setMessage("Use a private PIN with at least 4 characters.", "error");

    const hash = await sha256(`${name.toLowerCase()}|${pin}`);
    state.playerId = `p_${hash.slice(0, 24)}`;
    state.playerName = name;
    localStorage.setItem("wc26_playerId", state.playerId);
    localStorage.setItem("wc26_playerName", state.playerName);

    if (state.online) {
      const doc = await state.predictionsRef.doc(state.playerId).get();
      const data = doc.exists ? doc.data() : {};
      state.userPicks = cleanPicks(data.picks || {});
      state.userScorePredictions = cleanScoreMap(data.scorePredictions || {});
    } else {
      const existing = state.allPredictions.find(entry => entry.playerId === state.playerId);
      state.userPicks = cleanPicks(existing?.picks || {});
      state.userScorePredictions = cleanScoreMap(existing?.scorePredictions || {});
    }

    setMessage("Bracket loaded. Make your winner and score picks, then save them.", "good");
    renderAll();
  }

  async function savePrediction() {
    if (!state.playerId || !state.playerName) return setMessage("Load your bracket first.", "error");
    if (state.config.locked) return setMessage("Predictions are locked.", "error");

    const existing = state.allPredictions.find(entry => entry.playerId === state.playerId);
    if (!existing && state.allPredictions.length >= SETTINGS.maxParticipants) {
      return setMessage(`This private game is set to ${SETTINGS.maxParticipants} participants. Ask the admin to raise the limit.`, "error");
    }

    const data = {
      playerId: state.playerId,
      name: state.playerName,
      picks: cleanPicks(state.userPicks),
      scorePredictions: cleanScoreMap(state.userScorePredictions),
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (state.online) {
      const saveData = {
        ...data,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      if (!existing) saveData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      await state.predictionsRef.doc(state.playerId).set(saveData, { merge: true });
    } else {
      const idx = state.allPredictions.findIndex(entry => entry.playerId === state.playerId);
      if (idx >= 0) state.allPredictions[idx] = data;
      else state.allPredictions.push(data);
      saveLocalData();
      renderAll();
    }

    setMessage("Saved.", "good");
  }

  async function saveConfig(partial) {
    state.config = normalizeConfig({ ...state.config, ...partial });
    if (state.online) {
      await state.gameRef.set({ ...partial, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
    } else {
      saveLocalData();
      renderAll();
    }
  }

  function collectLabelOverrides() {
    const overrides = {};
    document.querySelectorAll("[data-label-team]").forEach(input => {
      const teamId = input.dataset.labelTeam;
      const value = input.value.trim();
      if (value && value !== BASE_LABELS[teamId]) overrides[teamId] = value;
    });
    return overrides;
  }

  function exportCsv() {
    const rows = state.allPredictions
      .map(entry => {
        const picks = cleanPicks(entry.picks || {});
        const scores = cleanScoreMap(entry.scorePredictions || {});
        const scored = scoreEntry(picks, scores);
        return { name: entry.name || "Unnamed", picks, scores, scored };
      })
      .sort((a, b) => b.scored.total - a.scored.total || String(a.name).localeCompare(String(b.name)));

    const header = ["Rank", "Name", "Total", "Winner points", "Exact score points", "Goal-difference points", "Champion", ...ALL_MATCH_IDS.flatMap(id => [`${MATCHES[id].title} winner`, `${MATCHES[id].title} score`])];
    const lines = [header.map(csvCell).join(",")];
    rows.forEach((row, idx) => {
      const values = [idx + 1, row.name, row.scored.total, row.scored.win, row.scored.exact, row.scored.gd, championFrom(row.picks)];
      ALL_MATCH_IDS.forEach(id => {
        values.push(row.picks[id] ? labelForTeam(row.picks[id]) : "");
        values.push(scoreText(row.scores[id]));
      });
      lines.push(values.map(csvCell).join(","));
    });

    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "worldcup2026_predictions.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return `"${text.replaceAll('"', '""')}"`;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  async function sha256(text) {
    if (globalThis.crypto?.subtle) {
      const buffer = await globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, "0")).join("");
    }
    let hash = 0;
    for (let i = 0; i < text.length; i++) hash = Math.imul(31, hash) + text.charCodeAt(i) | 0;
    return String(Math.abs(hash)).padStart(24, "0");
  }

  function attachEvents() {
    els.nameInput.value = state.playerName;
    els.joinBtn.addEventListener("click", joinBracket);
    els.pinInput.addEventListener("keydown", event => { if (event.key === "Enter") joinBracket(); });
    els.nameInput.addEventListener("keydown", event => { if (event.key === "Enter") els.pinInput.focus(); });
    els.copyLinkBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setMessage("Share link copied.", "good");
      } catch {
        setMessage("Copy failed. Copy the address from your browser bar.", "error");
      }
    });
    els.saveBtn.addEventListener("click", savePrediction);
    els.resetBtn.addEventListener("click", () => {
      state.userPicks = {};
      state.userScorePredictions = {};
      renderAll();
      setMessage("Picks and scores reset locally. Save if you want to overwrite your online entry.", "");
    });
    els.exportCsvBtn.addEventListener("click", exportCsv);
    els.viewRulesBtn.addEventListener("click", showRules);
    els.viewRulesBtn2.addEventListener("click", showRules);
    els.closeRulesBtn.addEventListener("click", () => els.rulesDialog.close());
    els.rulesDialog.addEventListener("click", event => {
      if (event.target === els.rulesDialog) els.rulesDialog.close();
    });

    els.adminUnlockBtn.addEventListener("click", () => {
      const entered = els.adminKeyInput.value;
      if (entered && entered === SETTINGS.adminPassphrase && entered !== "change-this-before-sharing") {
        state.adminUnlocked = true;
        state.officialDraft = { ...state.config.results };
        state.officialScoreDraft = { ...state.config.resultScores };
        els.adminControls.classList.remove("hidden");
        renderAdminTools();
      } else {
        alert("Admin passphrase is incorrect, or you did not change the default passphrase.");
      }
    });
    els.toggleLockBtn.addEventListener("click", () => saveConfig({ locked: !state.config.locked }));
    els.saveLabelsBtn.addEventListener("click", () => saveConfig({ labelOverrides: collectLabelOverrides() }));
    els.saveRulesBtn.addEventListener("click", () => saveConfig({ extraRulesText: els.extraRulesInput.value.trim() }));
    els.saveResultsBtn.addEventListener("click", () => saveConfig({ results: cleanPicks(state.officialDraft), resultScores: cleanScoreMap(state.officialScoreDraft) }));
  }

  attachEvents();
  initFirebase();
})();
