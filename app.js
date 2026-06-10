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
    saveResultsBtn: document.getElementById("saveResultsBtn"),
    deleteBracketBtn: null
  };

  const state = {
    online: false,
    db: null,
    gameRef: null,
    predictionsRef: null,
    // v2.3 account mode: the Firestore document id is based on the username,
    // while the PIN is stored as a hash inside that document. This lets the same
    // username + PIN open the same bracket from any computer.
    playerId: localStorage.getItem("wc26_playerKey") || "",
    playerName: localStorage.getItem("wc26_playerName") || "",
    playerPinHash: localStorage.getItem("wc26_playerPinHash") || "",
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
      lockAt: typeof data?.lockAt === "string" ? data.lockAt : "",
      labelOverrides: data?.labelOverrides || {},
      codeOverrides: data?.codeOverrides || {},
      // Kept only for backwards compatibility with older saved data.
      // New versions use 3-letter country codes instead of manual flag emojis.
      flagOverrides: data?.flagOverrides || {},
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

  function lockTimestamp() {
    if (!state.config.lockAt) return null;
    const ts = Date.parse(state.config.lockAt);
    return Number.isFinite(ts) ? ts : null;
  }

  function deadlineHasPassed() {
    const ts = lockTimestamp();
    return ts !== null && Date.now() >= ts;
  }

  function predictionsAreLocked() {
    return Boolean(state.config.locked || deadlineHasPassed());
  }

  function formatDateTime(value) {
    if (!value) return "not set";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "invalid date";
    return d.toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  }

  function toDatetimeLocalValue(value) {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  }

  function fromDatetimeLocalValue(value) {
    if (!value) return "";
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? "" : d.toISOString();
  }

  function lockStatusText() {
    if (state.config.locked) return "Predictions are manually locked. You can view your bracket, but not edit it.";
    if (deadlineHasPassed()) return `Predictions are locked because the deadline passed: ${formatDateTime(state.config.lockAt)}.`;
    if (state.config.lockAt) return `Predictions are open until ${formatDateTime(state.config.lockAt)}.`;
    return "Predictions are open. Remember to save after making changes.";
  }

  function clearCurrentPlayer() {
    state.playerId = "";
    state.playerName = "";
    state.playerPinHash = "";
    state.userPicks = {};
    state.userScorePredictions = {};
    localStorage.removeItem("wc26_playerKey");
    localStorage.removeItem("wc26_playerName");
    localStorage.removeItem("wc26_playerPinHash");
    if (els.nameInput) els.nameInput.value = "";
    if (els.pinInput) els.pinInput.value = "";
  }

  function ensureDeleteBracketButton() {
    if (els.deleteBracketBtn) return els.deleteBracketBtn;
    const joinPanel = document.getElementById("joinPanel");
    const actionsRow = joinPanel?.querySelector(".actions");
    if (!actionsRow) return null;

    actionsRow.classList.add("join-actions");
    const btn = document.createElement("button");
    btn.id = "deleteBracketBtn";
    btn.type = "button";
    btn.className = "danger delete-bracket-btn hidden";
    btn.textContent = "Delete my bracket";
    btn.title = "Permanently remove your bracket from the database";
    actionsRow.appendChild(btn);
    els.deleteBracketBtn = btn;
    return btn;
  }

  function ensureDeadlineControls() {
    if (document.getElementById("lockDeadlineInput")) return;
    if (!els.labelEditor) return;
    const wrap = document.createElement("div");
    wrap.className = "lock-deadline-card";
    wrap.innerHTML = `
      <div>
        <label>Auto-lock deadline
          <input id="lockDeadlineInput" type="datetime-local" />
        </label>
        <p id="lockDeadlineStatus" class="muted lock-deadline-status"></p>
      </div>
      <div class="deadline-actions">
        <button id="saveLockDeadlineBtn" type="button" class="primary">Save deadline</button>
        <button id="clearLockDeadlineBtn" type="button" class="secondary">Clear deadline</button>
      </div>
    `;
    els.labelEditor.parentNode.insertBefore(wrap, els.labelEditor);

    wrap.querySelector("#saveLockDeadlineBtn").addEventListener("click", () => {
      const raw = wrap.querySelector("#lockDeadlineInput").value;
      const lockAt = fromDatetimeLocalValue(raw);
      if (!lockAt) {
        alert("Choose a valid date and time, or use Clear deadline.");
        return;
      }
      saveConfig({ lockAt });
    });

    wrap.querySelector("#clearLockDeadlineBtn").addEventListener("click", () => saveConfig({ lockAt: "" }));
  }

  function renderDeadlineControls() {
    ensureDeadlineControls();
    const input = document.getElementById("lockDeadlineInput");
    const status = document.getElementById("lockDeadlineStatus");
    if (input) input.value = toDatetimeLocalValue(state.config.lockAt);
    if (status) {
      status.textContent = state.config.lockAt
        ? `Deadline: ${formatDateTime(state.config.lockAt)}. Current status: ${predictionsAreLocked() ? "locked" : "open"}.`
        : "No automatic deadline set. Use the manual lock button or set a date/time here.";
    }
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
    const manualName = String(state.config.labelOverrides?.[teamId] || "").trim();
    if (manualName) return manualName;

    const manualCode = normalizeCountryCode(state.config.codeOverrides?.[teamId]);
    if (manualCode) return countryNameFromCode(manualCode) || manualCode;

    // Placeholder display until the actual 2026 knockout teams are known.
    return "USA";
  }

  function normalizeCountryCode(value) {
    return String(value || "")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(0, 3);
  }

  function normalizeCountryKey(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, " and ")
      .replace(/\./g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function codeForTeam(teamId) {
    const id = String(teamId || "").trim().toUpperCase();
    if (id === "TBD" || /^W\d+$/.test(id)) return "TBD";

    const manual = normalizeCountryCode(state.config.codeOverrides?.[teamId]);
    if (manual) return manual;

    const detected = countryCodeFromLabel(labelForTeam(teamId));
    return detected || "USA";
  }

  function countryRecordFromCode(code) {
    return COUNTRY_BY_CODE[normalizeCountryCode(code)] || null;
  }

  function countryNameFromCode(code) {
    return countryRecordFromCode(code)?.name || "";
  }

  function flagForTeam(teamId) {
    const flagFromCode = flagEmojiFromCode(codeForTeam(teamId));
    if (flagFromCode) return flagFromCode;

    // Backwards compatibility for brackets created with the older manual-flag field.
    const oldManualFlag = state.config.flagOverrides?.[teamId];
    if (oldManualFlag && String(oldManualFlag).trim()) return String(oldManualFlag).trim();

    return "🏳️";
  }

  function flagEmojiFromCode(code) {
    return countryRecordFromCode(code)?.flag || "";
  }

  function countryCodeFromFlag(flag) {
    return COUNTRY_CODE_BY_FLAG[String(flag || "").trim()] || "";
  }

  function countryCodeFromLabel(label) {
    const raw = String(label || "").trim();
    const normalizedCode = normalizeCountryCode(raw);
    if (normalizedCode.length === 3 && countryRecordFromCode(normalizedCode)) return normalizedCode;

    return COUNTRY_NAME_TO_CODE[normalizeCountryKey(raw)] || "";
  }

  const COUNTRY_RECORDS = [
    { code: "TBD", name: "TBD", flag: "🏳️", aliases: ["To Be Determined", "Pending", "Winner", "Winner TBD"] },
    { code: "USA", name: "United States", flag: "🇺🇸", aliases: ["USA", "US", "United States of America", "America"] },
    { code: "MEX", name: "Mexico", flag: "🇲🇽" },
    { code: "CAN", name: "Canada", flag: "🇨🇦" },
    { code: "CRC", name: "Costa Rica", flag: "🇨🇷" },
    { code: "PAN", name: "Panama", flag: "🇵🇦" },
    { code: "JAM", name: "Jamaica", flag: "🇯🇲" },
    { code: "HON", name: "Honduras", flag: "🇭🇳" },
    { code: "SLV", name: "El Salvador", flag: "🇸🇻" },
    { code: "GUA", name: "Guatemala", flag: "🇬🇹" },
    { code: "HAI", name: "Haiti", flag: "🇭🇹" },
    { code: "TRI", name: "Trinidad and Tobago", flag: "🇹🇹", aliases: ["Trinidad", "Tobago"] },
    { code: "CUB", name: "Cuba", flag: "🇨🇺" },
    { code: "DOM", name: "Dominican Republic", flag: "🇩🇴" },

    { code: "ARG", name: "Argentina", flag: "🇦🇷" },
    { code: "BRA", name: "Brazil", flag: "🇧🇷" },
    { code: "URU", name: "Uruguay", flag: "🇺🇾" },
    { code: "COL", name: "Colombia", flag: "🇨🇴" },
    { code: "ECU", name: "Ecuador", flag: "🇪🇨" },
    { code: "CHI", name: "Chile", flag: "🇨🇱" },
    { code: "PER", name: "Peru", flag: "🇵🇪" },
    { code: "PAR", name: "Paraguay", flag: "🇵🇾" },
    { code: "VEN", name: "Venezuela", flag: "🇻🇪" },
    { code: "BOL", name: "Bolivia", flag: "🇧🇴" },

    { code: "ENG", name: "England", flag: "🏴" },
    { code: "SCO", name: "Scotland", flag: "🏴" },
    { code: "WAL", name: "Wales", flag: "🏴" },
    { code: "NIR", name: "Northern Ireland", flag: "🇬🇧" },
    { code: "IRL", name: "Republic of Ireland", flag: "🇮🇪", aliases: ["Ireland"] },
    { code: "FRA", name: "France", flag: "🇫🇷" },
    { code: "ESP", name: "Spain", flag: "🇪🇸" },
    { code: "GER", name: "Germany", flag: "🇩🇪", aliases: ["Deutschland"] },
    { code: "ITA", name: "Italy", flag: "🇮🇹" },
    { code: "POR", name: "Portugal", flag: "🇵🇹" },
    { code: "NED", name: "Netherlands", flag: "🇳🇱", aliases: ["Holland"] },
    { code: "BEL", name: "Belgium", flag: "🇧🇪" },
    { code: "CRO", name: "Croatia", flag: "🇭🇷" },
    { code: "SUI", name: "Switzerland", flag: "🇨🇭" },
    { code: "DEN", name: "Denmark", flag: "🇩🇰" },
    { code: "POL", name: "Poland", flag: "🇵🇱" },
    { code: "SWE", name: "Sweden", flag: "🇸🇪" },
    { code: "NOR", name: "Norway", flag: "🇳🇴" },
    { code: "FIN", name: "Finland", flag: "🇫🇮" },
    { code: "AUT", name: "Austria", flag: "🇦🇹" },
    { code: "CZE", name: "Czech Republic", flag: "🇨🇿", aliases: ["Czechia"] },
    { code: "SVK", name: "Slovakia", flag: "🇸🇰" },
    { code: "SVN", name: "Slovenia", flag: "🇸🇮" },
    { code: "SRB", name: "Serbia", flag: "🇷🇸" },
    { code: "BIH", name: "Bosnia and Herzegovina", flag: "🇧🇦", aliases: ["Bosnia", "Bosnia & Herzegovina"] },
    { code: "ALB", name: "Albania", flag: "🇦🇱" },
    { code: "HUN", name: "Hungary", flag: "🇭🇺" },
    { code: "ROU", name: "Romania", flag: "🇷🇴" },
    { code: "UKR", name: "Ukraine", flag: "🇺🇦" },
    { code: "TUR", name: "Türkiye", flag: "🇹🇷", aliases: ["Turkey"] },
    { code: "GRE", name: "Greece", flag: "🇬🇷" },
    { code: "ISL", name: "Iceland", flag: "🇮🇸" },
    { code: "ISR", name: "Israel", flag: "🇮🇱" },
    { code: "GEO", name: "Georgia", flag: "🇬🇪" },
    { code: "ARM", name: "Armenia", flag: "🇦🇲" },
    { code: "AZE", name: "Azerbaijan", flag: "🇦🇿" },
    { code: "KAZ", name: "Kazakhstan", flag: "🇰🇿" },

    { code: "MAR", name: "Morocco", flag: "🇲🇦" },
    { code: "EGY", name: "Egypt", flag: "🇪🇬" },
    { code: "ALG", name: "Algeria", flag: "🇩🇿" },
    { code: "TUN", name: "Tunisia", flag: "🇹🇳" },
    { code: "NGA", name: "Nigeria", flag: "🇳🇬" },
    { code: "GHA", name: "Ghana", flag: "🇬🇭" },
    { code: "CIV", name: "Côte d'Ivoire", flag: "🇨🇮", aliases: ["Cote d'Ivoire", "Ivory Coast"] },
    { code: "SEN", name: "Senegal", flag: "🇸🇳" },
    { code: "CMR", name: "Cameroon", flag: "🇨🇲" },
    { code: "RSA", name: "South Africa", flag: "🇿🇦", aliases: ["ZAF"] },
    { code: "COD", name: "DR Congo", flag: "🇨🇩", aliases: ["Congo DR", "Democratic Republic of the Congo"] },
    { code: "MLI", name: "Mali", flag: "🇲🇱" },
    { code: "BFA", name: "Burkina Faso", flag: "🇧🇫" },
    { code: "CPV", name: "Cape Verde", flag: "🇨🇻" },
    { code: "MOZ", name: "Mozambique", flag: "🇲🇿" },
    { code: "ANG", name: "Angola", flag: "🇦🇴" },
    { code: "ZAM", name: "Zambia", flag: "🇿🇲" },
    { code: "UGA", name: "Uganda", flag: "🇺🇬" },
    { code: "GUI", name: "Guinea", flag: "🇬🇳" },
    { code: "GAM", name: "Gambia", flag: "🇬🇲", aliases: ["The Gambia"] },
    { code: "EQG", name: "Equatorial Guinea", flag: "🇬🇶" },

    { code: "JPN", name: "Japan", flag: "🇯🇵" },
    { code: "KOR", name: "South Korea", flag: "🇰🇷", aliases: ["Korea Republic", "Republic of Korea"] },
    { code: "AUS", name: "Australia", flag: "🇦🇺" },
    { code: "IRN", name: "Iran", flag: "🇮🇷" },
    { code: "IRQ", name: "Iraq", flag: "🇮🇶" },
    { code: "KSA", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "QAT", name: "Qatar", flag: "🇶🇦" },
    { code: "UAE", name: "United Arab Emirates", flag: "🇦🇪", aliases: ["UAE"] },
    { code: "OMA", name: "Oman", flag: "🇴🇲" },
    { code: "JOR", name: "Jordan", flag: "🇯🇴" },
    { code: "UZB", name: "Uzbekistan", flag: "🇺🇿" },
    { code: "CHN", name: "China PR", flag: "🇨🇳", aliases: ["China"] },
    { code: "IDN", name: "Indonesia", flag: "🇮🇩" },
    { code: "THA", name: "Thailand", flag: "🇹🇭" },
    { code: "VIE", name: "Vietnam", flag: "🇻🇳", aliases: ["Viet Nam"] },
    { code: "NZL", name: "New Zealand", flag: "🇳🇿" }
  ];

  const COUNTRY_BY_CODE = Object.fromEntries(COUNTRY_RECORDS.map(record => [record.code, record]));
  const COUNTRY_NAME_TO_CODE = COUNTRY_RECORDS.reduce((map, record) => {
    [record.name, record.code, ...(record.aliases || [])].forEach(value => {
      map[normalizeCountryKey(value)] = record.code;
    });
    return map;
  }, {});
  const COUNTRY_CODE_BY_FLAG = COUNTRY_RECORDS.reduce((map, record) => {
    if (!map[record.flag]) map[record.flag] = record.code;
    return map;
  }, {});

  function displaySeedLabel(teamId) {
    return BASE_LABELS[teamId] || teamId;
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

  function championDetails(picks) {
    const championId = picks?.m104;
    if (!championId) {
      return { flag: "🏳️", code: "TBD", name: "—" };
    }
    return {
      flag: flagForTeam(championId),
      code: codeForTeam(championId),
      name: labelForTeam(championId)
    };
  }

  function championCardMarkup(picks) {
    const champ = championDetails(picks);
    return `
      <div class="champion-heading">
        <span class="champion-trophy" aria-hidden="true">🏆</span>
        <span>Champion</span>
      </div>
      <div class="champion-team" title="${escapeHtml(champ.name)}">
        <span class="champion-flag" aria-hidden="true">${escapeHtml(champ.flag)}</span>
        <span class="champion-code">${escapeHtml(champ.code)}</span>
      </div>
    `;
  }

  function matchupMatchesActual(matchId, userPicks, actualPicks) {
    const userTeams = availableTeams(matchId, userPicks);
    const actualTeams = availableTeams(matchId, actualPicks);
    return userTeams.every((team, idx) => !team.pending && team.id === actualTeams[idx]?.id);
  }

  function scoreConsistentWithWinner(winnerId, score, teams) {
    if (!winnerId || !isCompleteScore(score)) return true;
    const winnerIndex = teams.findIndex(team => team.id === winnerId);
    if (winnerIndex < 0) return true;
    if (score.a === score.b) return true; // draw means winner was chosen by penalties
    return winnerIndex === 0 ? score.a > score.b : score.b > score.a;
  }

  function firstContradictingScore(picks, scores) {
    const cleanCurrentPicks = cleanPicks(picks || {});
    const cleanScores = cleanScoreMap(scores || {});
    for (const matchId of ALL_MATCH_IDS) {
      const winnerId = cleanCurrentPicks[matchId];
      const score = cleanScores[matchId];
      if (!winnerId || !isCompleteScore(score)) continue;
      const teams = availableTeams(matchId, cleanCurrentPicks);
      if (!teams.every(team => !team.pending)) continue;
      if (!scoreConsistentWithWinner(winnerId, score, teams)) {
        return {
          matchId,
          title: MATCHES[matchId].title,
          winner: labelForTeam(winnerId),
          score: scoreText(score)
        };
      }
    }
    return null;
  }

  function scoreConflictMessage(matchId, winnerId, score) {
    return "The score of the winner should be equal or higher than of the loser.";
  }

  function scoreConflictPopupMessage(scoreConflict) {
    const suffix = scoreConflict ? `\n\nCheck ${scoreConflict.title}${scoreConflict.score ? ` (${scoreConflict.score})` : ""}.` : "";
    return `The score of the winner should be equal or higher than of the loser.${suffix}`;
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

  function slotCenterPercent(column, index) {
    const count = Math.max(1, column?.ids?.length || 1);
    return ((index + 0.5) / count) * 100;
  }

  function renderBracket(container, picks, scores, options = {}) {
    const isAdmin = options.mode === "admin";
    const isUser = options.mode === "user";
    const isViewer = options.mode === "viewer";
    const compareResults = Boolean(options.compareResults);
    const cleanCurrentPicks = cleanPicks(picks || {});
    const cleanCurrentScores = cleanScoreMap(scores || {});
    container.innerHTML = "";
    container.classList.toggle("viewer-bracket", isViewer);

    BRACKET_LAYOUT.forEach(column => {
      const columnEl = document.createElement("section");
      columnEl.className = `bracket-column ${column.side}-side ${column.key === "final" ? "final-column" : ""}`.trim();
      columnEl.dataset.round = column.round;
      columnEl.dataset.side = column.side;

      const title = document.createElement("div");
      title.className = "round-title";
      title.textContent = column.round;
      columnEl.appendChild(title);

      const stack = document.createElement("div");
      stack.className = "match-stack";
      column.ids.forEach((matchId, index) => {
        const card = renderMatchCard(matchId, cleanCurrentPicks, cleanCurrentScores, { mode: options.mode, isAdmin, isUser, isViewer, compareResults });
        card.style.setProperty("--slot-center", String(slotCenterPercent(column, index)));
        stack.appendChild(card);
      });

      if (column.key === "final") {
        const champ = document.createElement("div");
        champ.className = "champion-card";
        champ.innerHTML = championCardMarkup(cleanCurrentPicks);
        stack.appendChild(champ);
      }

      columnEl.appendChild(stack);
      container.appendChild(columnEl);
    });

    scheduleConnectorDraw(container);
  }

  function renderMatchCard(matchId, picks, scores, options) {
    const { isAdmin, isUser, isViewer, compareResults } = options;
    const round = roundOfMatch(matchId);
    const teams = availableTeams(matchId, picks);
    const selectedWinner = picks[matchId];
    const currentScore = cleanScoreMap(scores)[matchId];
    const hasConflict = selectedWinner && isCompleteScore(currentScore) && !scoreConsistentWithWinner(selectedWinner, currentScore, teams);
    const card = document.createElement("article");
    card.className = `match-card fixture-card ${isViewer ? "view-only" : ""} ${hasConflict ? "has-score-conflict" : ""}`.trim();
    card.dataset.matchId = matchId;

    const meta = document.createElement("div");
    meta.className = "match-meta fixture-meta";
    meta.innerHTML = `<span>${escapeHtml(MATCHES[matchId].title)}<small>${escapeHtml(round.name)}</small></span><span>World Cup 2026</span>`;
    card.appendChild(meta);

    card.appendChild(renderFlagMatchBody(matchId, teams, currentScore, {
      isAdmin,
      isUser,
      isViewer,
      compareResults,
      selectedWinner,
      disabled: isViewer || (isUser && predictionsAreLocked())
    }));

    if (compareResults && state.config.results?.[matchId]) {
      const b = matchBreakdown(picks, scores, matchId);
      const points = document.createElement("p");
      points.className = "match-points";
      points.innerHTML = `Points: <strong>${b.total}</strong> <span class="breakdown">winner ${b.win} · score ${b.exact} · GD ${b.gd}</span>`;
      card.appendChild(points);
    }

    return card;
  }

  function renderFlagMatchBody(matchId, teams, score, options) {
    const body = document.createElement("div");
    body.className = "match-body";

    const grid = document.createElement("div");
    grid.className = "matchup-grid";

    const currentPicks = options.isAdmin ? state.officialDraft : state.userPicks;
    const currentScores = options.isAdmin ? state.officialScoreDraft : state.userScorePredictions;

    const makeTeamButton = (team, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "team-pick";
      btn.dataset.matchId = matchId;
      btn.dataset.teamId = team.id;
      btn.disabled = team.pending || options.disabled;

      const selected = options.selectedWinner === team.id;
      if (selected) btn.classList.add("selected");

      if (options.compareResults && state.config.results?.[matchId]) {
        if (selected && state.config.results[matchId] === team.id) btn.classList.add("correct");
        if (selected && state.config.results[matchId] !== team.id) btn.classList.add("incorrect");
      }

      const flag = flagForTeam(team.id);
      const code = codeForTeam(team.id);
      const label = team.pending ? "TBD" : labelForTeam(team.id);
      const seed = team.pending ? "TBD" : displaySeedLabel(team.id);
      btn.title = `${label} · ${seed}`;
      btn.innerHTML = `
        <span class="flag-bubble" aria-hidden="true">${escapeHtml(flag)}</span>
        <span class="team-code">${escapeHtml(code)}</span>
      `;

      if (options.isAdmin || options.isUser) {
        btn.addEventListener("click", () => {
          const latestScore = cleanScoreMap(currentScores || {})[matchId];
          if (!scoreConsistentWithWinner(team.id, latestScore, teams)) {
            alert(scoreConflictMessage(matchId, team.id, latestScore));
            return;
          }

          if (options.isAdmin) {
            state.officialDraft[matchId] = team.id;
            state.officialDraft = cleanPicks(state.officialDraft);
            state.officialScoreDraft = cleanScoreMap(state.officialScoreDraft);
            renderAdminTools();
          } else if (!predictionsAreLocked()) {
            state.userPicks[matchId] = team.id;
            state.userPicks = cleanPicks(state.userPicks);
            state.userScorePredictions = cleanScoreMap(state.userScorePredictions);
            renderAll();
          }
        });
      }
      return btn;
    };

    grid.appendChild(makeTeamButton(teams[0], 0));
    grid.appendChild(renderScoreInputs(matchId, teams, score, {
      isAdmin: options.isAdmin,
      isUser: options.isUser,
      isViewer: options.isViewer,
      selectedWinner: options.selectedWinner,
      compareResults: options.compareResults,
      disabled: teams.some(team => team.pending) || options.disabled
    }));
    grid.appendChild(makeTeamButton(teams[1], 1));

    body.appendChild(grid);
    return body;
  }

  function renderScoreInputs(matchId, teams, score, options) {
    const center = document.createElement("div");
    center.className = "score-center";
    const disabled = options.disabled ? "disabled" : "";
    const conflict = options.selectedWinner && isCompleteScore(score) && !scoreConsistentWithWinner(options.selectedWinner, score, teams);
    if (conflict) center.classList.add("score-conflict");

    center.innerHTML = `
      <span class="score-label">Score</span>
      <div class="score-inputs">
        <input ${disabled} inputmode="numeric" type="text" pattern="[0-9]*" maxlength="2" value="${escapeHtml(score?.a ?? "")}" aria-label="Left team score" />
        <span class="dash">–</span>
        <input ${disabled} inputmode="numeric" type="text" pattern="[0-9]*" maxlength="2" value="${escapeHtml(score?.b ?? "")}" aria-label="Right team score" />
      </div>
    `;

    const inputs = center.querySelectorAll("input");
    if (options.compareResults && isCompleteScore(state.config.resultScores?.[matchId]) && isCompleteScore(score)) {
      const actual = state.config.resultScores[matchId];
      const exact = score.a === actual.a && score.b === actual.b;
      inputs.forEach(input => input.classList.add(exact ? "correct-score" : "incorrect-score"));
    }

    inputs.forEach(input => {
      input.addEventListener("input", () => {
        // Scores are manual numeric entries only: strip letters, symbols, spaces, etc.
        inputs.forEach(el => {
          const cleaned = String(el.value || "").replace(/\D/g, "").slice(0, 2);
          if (el.value !== cleaned) el.value = cleaned;
        });
        const nextScore = {
          a: readScoreInput(inputs[0].value),
          b: readScoreInput(inputs[1].value)
        };
        const targetScores = options.isAdmin ? state.officialScoreDraft : state.userScorePredictions;
        const targetPicks = options.isAdmin ? state.officialDraft : state.userPicks;
        if (options.isAdmin) {
          targetScores[matchId] = nextScore;
        } else if (options.isUser && !predictionsAreLocked()) {
          targetScores[matchId] = nextScore;
        }

        const currentWinner = targetPicks?.[matchId];
        const invalid = currentWinner && isCompleteScore(nextScore) && !scoreConsistentWithWinner(currentWinner, nextScore, teams);
        center.classList.toggle("score-conflict", Boolean(invalid));
        inputs.forEach(el => el.setCustomValidity(invalid ? scoreConflictMessage(matchId, currentWinner, nextScore) : ""));
      });
    });

    return center;
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
      card.className = "label-card flag-label-card";
      const fields = match.slots.map(slot => {
        const label = labelForTeam(slot.teamId);
        const code = codeForTeam(slot.teamId);
        const flag = flagEmojiFromCode(code) || "🏳️";
        return `
          <div class="team-edit-row">
            <label>Team ${escapeHtml(slot.teamId)}
              <input data-label-team="${escapeHtml(slot.teamId)}" value="${escapeHtml(label)}" placeholder="United States" />
            </label>
            <label>3-letter code
              <div class="code-field-row">
                <input data-code-team="${escapeHtml(slot.teamId)}" value="${escapeHtml(code)}" maxlength="3" placeholder="USA" />
                <span class="flag-preview" data-flag-preview="${escapeHtml(slot.teamId)}" title="Auto flag from code">${escapeHtml(flag)}</span>
              </div>
            </label>
          </div>
        `;
      }).join("");
      card.innerHTML = `<h4>${escapeHtml(match.title)}</h4><div class="slot-grid flag-slot-grid">${fields}</div>`;
      els.labelEditor.appendChild(card);
    });

    document.querySelectorAll("[data-label-team]").forEach(input => {
      input.addEventListener("input", () => syncCountryEditorFromName(input.dataset.labelTeam, { canonicalize: false }));
      input.addEventListener("change", () => syncCountryEditorFromName(input.dataset.labelTeam, { canonicalize: true }));
      input.addEventListener("blur", () => syncCountryEditorFromName(input.dataset.labelTeam, { canonicalize: true }));
    });

    document.querySelectorAll("[data-code-team]").forEach(input => {
      input.addEventListener("input", () => syncCountryEditorFromCode(input.dataset.codeTeam));
      input.addEventListener("change", () => syncCountryEditorFromCode(input.dataset.codeTeam));
      input.addEventListener("blur", () => syncCountryEditorFromCode(input.dataset.codeTeam));
    });
  }

  function syncCountryEditorFromName(teamId, options = {}) {
    const nameInput = document.querySelector(`[data-label-team="${teamId}"]`);
    const codeInput = document.querySelector(`[data-code-team="${teamId}"]`);
    if (!nameInput || !codeInput) return;

    const detectedCode = countryCodeFromLabel(nameInput.value);
    if (detectedCode) {
      codeInput.value = detectedCode;
      if (options.canonicalize) {
        const canonicalName = countryNameFromCode(detectedCode);
        if (canonicalName) nameInput.value = canonicalName;
      }
    }
    updateFlagPreview(teamId);
  }

  function syncCountryEditorFromCode(teamId) {
    const nameInput = document.querySelector(`[data-label-team="${teamId}"]`);
    const codeInput = document.querySelector(`[data-code-team="${teamId}"]`);
    if (!nameInput || !codeInput) return;

    codeInput.value = normalizeCountryCode(codeInput.value);
    const record = countryRecordFromCode(codeInput.value);
    if (record) nameInput.value = record.name;
    updateFlagPreview(teamId);
  }

  function updateFlagPreview(teamId) {
    const codeInput = document.querySelector(`[data-code-team="${teamId}"]`);
    const preview = document.querySelector(`[data-flag-preview="${teamId}"]`);
    if (!preview || !codeInput) return;
    preview.textContent = flagEmojiFromCode(codeInput.value) || "🇺🇸";
  }

  function renderAdminTools() {
    if (!state.adminUnlocked) return;
    renderDeadlineControls();
    renderLabels();
    els.extraRulesInput.value = state.config.extraRulesText || "";
    state.officialDraft = cleanPicks(state.officialDraft || state.config.results || {});
    state.officialScoreDraft = cleanScoreMap(state.officialScoreDraft || state.config.resultScores || {});
    renderBracket(els.officialBracket, state.officialDraft, state.officialScoreDraft, { mode: "admin" });
    els.toggleLockBtn.textContent = state.config.locked ? "Unlock manual lock" : "Lock now manually";
  }

  function medalForRank(rank) {
    if (rank === 1) return '<span class="rank-medal gold" title="Gold medal">1</span>';
    if (rank === 2) return '<span class="rank-medal silver" title="Silver medal">2</span>';
    if (rank === 3) return '<span class="rank-medal bronze" title="Bronze medal">3</span>';
    return `<span class="rank-number">${rank}</span>`;
  }

  function renderLeaderboard() {
    const rows = state.allPredictions
      .map(entry => {
        const picks = cleanPicks(entry.picks || {});
        const scores = cleanScoreMap(entry.scorePredictions || {});
        const scored = scoreEntry(picks, scores);
        return {
          playerId: entry.playerId || entry.usernameKey || usernameKey(entry.name),
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

    els.leaderboard.className = "leaderboard leaderboard-layout";
    const otherRows = rows.filter(row => !state.playerId || row.playerId !== state.playerId);
    const quickButtons = otherRows.map(row => `
      <button type="button" class="member-pill" data-view-player="${escapeHtml(row.playerId)}" aria-label="View ${escapeHtml(row.name)}'s picks">
        <span>${escapeHtml(row.name)}</span>
        <small>${row.score} pts</small>
      </button>
    `).join("");

    const viewerPanel = otherRows.length
      ? `<div class="member-list">${quickButtons}</div>`
      : `
        <div class="empty-state">
          <strong>No other brackets yet.</strong>
          <span>Once your friends save their brackets, their usernames will appear here.</span>
        </div>
      `;

    const body = rows.map((row, index) => `
      <tr class="leaderboard-row">
        <td>${medalForRank(index + 1)}</td>
        <td><span class="leaderboard-name-static">${escapeHtml(row.name)}</span></td>
        <td><strong>${row.score}</strong><div class="breakdown">W ${row.winnerPoints} · Score ${row.exactPoints} · GD ${row.gdPoints}</div></td>
        <td>${escapeHtml(row.champion)}</td>
      </tr>
    `).join("");

    els.leaderboard.innerHTML = `
      <section class="other-picks-panel">
        <div class="mini-section-header">
          <div>
            <p class="eyebrow">League view</p>
            <h3>View other's picks</h3>
            <p class="muted">Click a username below to open their full bracket and score predictions.</p>
          </div>
        </div>
        ${viewerPanel}
      </section>

      <section class="leaderboard-table-panel">
        <div class="mini-section-header leaderboard-mini-header">
          <div>
            <p class="eyebrow">Standings</p>
            <h3><span class="trophy-icon" aria-hidden="true">🏆</span> Leaderboard</h3>
          </div>
        </div>
        <table>
          <thead><tr><th>Rank</th><th>Name</th><th>Total points</th><th>Champion pick</th></tr></thead>
          <tbody>${body}</tbody>
        </table>
      </section>
    `;

    els.leaderboard.querySelectorAll(".member-pill[data-view-player]").forEach(el => {
      el.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        openPredictionViewer(el.dataset.viewPlayer);
      });
      el.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPredictionViewer(el.dataset.viewPlayer);
        }
      });
    });
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
          <li>A tied score is allowed in knockout games. It means the team you selected as winner advances on penalties.</li>
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



  function ensurePredictionDialog() {
    if (els.predictionDialog) return;
    const dialog = document.createElement("dialog");
    dialog.id = "predictionDialog";
    dialog.className = "prediction-dialog";
    dialog.innerHTML = `
      <div class="viewer-card">
        <div class="section-header viewer-header">
          <div>
            <p class="eyebrow">Friend bracket</p>
            <h2 id="predictionViewerTitle">Bracket</h2>
            <p id="predictionViewerSummary" class="muted"></p>
          </div>
          <button id="closePredictionViewerBtn" class="secondary">Close</button>
        </div>
        <div class="viewer-scroll">
          <div id="predictionViewerBracket" class="bracket knockout-board viewer-board"></div>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);
    els.predictionDialog = dialog;
    els.predictionViewerTitle = dialog.querySelector("#predictionViewerTitle");
    els.predictionViewerSummary = dialog.querySelector("#predictionViewerSummary");
    els.predictionViewerBracket = dialog.querySelector("#predictionViewerBracket");
    dialog.querySelector("#closePredictionViewerBtn").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
  }

  function openPredictionViewer(playerId) {
    ensurePredictionDialog();
    const entry = state.allPredictions.find(item => (item.playerId || item.usernameKey || usernameKey(item.name)) === playerId);
    if (!entry) return;
    const picks = cleanPicks(entry.picks || {});
    const scores = cleanScoreMap(entry.scorePredictions || {});
    const scored = scoreEntry(picks, scores);
    els.predictionViewerTitle.textContent = `${entry.name || "Unnamed"}'s picks`;
    els.predictionViewerSummary.innerHTML = `Total: <strong>${scored.total}</strong> · Champion: <strong>${escapeHtml(championFrom(picks))}</strong> · Winner ${scored.win} · Exact score ${scored.exact} · Goal difference ${scored.gd}`;
    if (typeof els.predictionDialog.showModal === "function" && !els.predictionDialog.open) els.predictionDialog.showModal();
    renderBracket(els.predictionViewerBracket, picks, scores, { mode: "viewer", compareResults: true });
  }

  function scheduleConnectorDraw(container) {
    window.requestAnimationFrame(() => drawConnectors(container));
  }

  function drawConnectors(container) {
    if (!container || !container.isConnected) return;
    container.querySelectorAll(".connector-svg").forEach(el => el.remove());

    const boardRect = container.getBoundingClientRect();
    const width = Math.max(container.scrollWidth, Math.ceil(boardRect.width));
    const height = Math.max(container.scrollHeight, Math.ceil(boardRect.height));
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "connector-svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("aria-hidden", "true");

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.setAttribute("id", "connectorGlow");
    filter.innerHTML = `<feGaussianBlur stdDeviation="2.1" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>`;
    defs.appendChild(filter);

    const arrow = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    arrow.setAttribute("id", "connectorArrow");
    arrow.setAttribute("markerWidth", "9");
    arrow.setAttribute("markerHeight", "9");
    arrow.setAttribute("refX", "7.6");
    arrow.setAttribute("refY", "4.5");
    arrow.setAttribute("orient", "auto");
    arrow.setAttribute("markerUnits", "strokeWidth");
    arrow.innerHTML = `<path d="M 0 0 L 9 4.5 L 0 9 z" class="connector-arrow-head"></path>`;
    defs.appendChild(arrow);

    svg.appendChild(defs);

    const addVisibleArrowHead = (x, y, direction, extraClass = "") => {
      const size = Math.max(9, Math.min(15, width * 0.006));
      let points;
      if (direction === "right") {
        points = `${x.toFixed(1)},${y.toFixed(1)} ${(x - size).toFixed(1)},${(y - size * 0.56).toFixed(1)} ${(x - size).toFixed(1)},${(y + size * 0.56).toFixed(1)}`;
      } else if (direction === "left") {
        points = `${x.toFixed(1)},${y.toFixed(1)} ${(x + size).toFixed(1)},${(y - size * 0.56).toFixed(1)} ${(x + size).toFixed(1)},${(y + size * 0.56).toFixed(1)}`;
      } else {
        points = `${x.toFixed(1)},${y.toFixed(1)} ${(x - size * 0.56).toFixed(1)},${(y - size).toFixed(1)} ${(x + size * 0.56).toFixed(1)},${(y - size).toFixed(1)}`;
      }
      const head = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      head.setAttribute("points", points);
      head.setAttribute("class", `visible-arrow-head ${extraClass}`.trim());
      svg.appendChild(head);
    };

    const cardFor = id => container.querySelector(`.match-card[data-match-id="${id}"]`);
    ALL_MATCH_IDS.forEach(parentId => {
      const parent = cardFor(parentId);
      if (!parent) return;
      MATCHES[parentId].slots.forEach(slot => {
        if (!slot.winnerOf) return;
        const child = cardFor(slot.winnerOf);
        if (!child) return;
        const p = parent.getBoundingClientRect();
        const c = child.getBoundingClientRect();
        const childIsLeft = (c.left + c.width / 2) < (p.left + p.width / 2);
        const isFinalEntry = parentId === "m104";
        const arrowGap = isFinalEntry ? Math.max(10, Math.min(18, p.width * 0.06)) : 0;
        const x1 = childIsLeft ? c.right - boardRect.left : c.left - boardRect.left;
        const y1 = c.top - boardRect.top + c.height / 2;
        const x2 = childIsLeft
          ? p.left - boardRect.left - arrowGap
          : p.right - boardRect.left + arrowGap;
        const y2 = p.top - boardRect.top + p.height / 2;
        const mid = x1 + (x2 - x1) * 0.5;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${mid.toFixed(1)} ${y1.toFixed(1)}, ${mid.toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`);
        path.setAttribute("class", isFinalEntry ? "connector-path final-stage-connector final-entry-arrow" : "connector-path");
        svg.appendChild(path);
        if (isFinalEntry) addVisibleArrowHead(x2, y2, childIsLeft ? "right" : "left", "final-visible-arrow");
      });
    });

    const finalCard = cardFor("m104");
    const championCard = container.querySelector(".final-column .champion-card");
    if (finalCard && championCard) {
      const f = finalCard.getBoundingClientRect();
      const ch = championCard.getBoundingClientRect();
      const x = f.left - boardRect.left + f.width / 2;
      const y1 = f.bottom - boardRect.top + 4;
      const y2 = ch.top - boardRect.top - Math.max(8, Math.min(14, f.height * 0.08));
      if (y2 > y1) {
        const yMid = y1 + (y2 - y1) * 0.52;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M ${x.toFixed(1)} ${y1.toFixed(1)} C ${x.toFixed(1)} ${yMid.toFixed(1)}, ${x.toFixed(1)} ${yMid.toFixed(1)}, ${x.toFixed(1)} ${y2.toFixed(1)}`);
        path.setAttribute("class", "connector-path final-stage-connector champion-connector");
        svg.appendChild(path);
        addVisibleArrowHead(x, y2, "down", "champion-visible-arrow");
      }
    }

    container.prepend(svg);
  }

  function renderAll() {
    const joined = Boolean(state.playerId && state.playerName);
    ensureDeleteBracketButton();
    if (els.deleteBracketBtn) els.deleteBracketBtn.classList.toggle("hidden", !joined);
    els.nameInput.value = state.playerName || els.nameInput.value;
    els.playerPanel.classList.toggle("hidden", !joined);
    els.bracketSection.classList.toggle("hidden", !joined);
    els.leaderboardSection.classList.toggle("hidden", false);

    if (joined) {
      const scored = scoreEntry(state.userPicks, state.userScorePredictions);
      els.yourTotalPoints.textContent = String(scored.total);
      els.playerTitle.textContent = `${state.playerName}'s bracket`;
      els.lockNotice.textContent = lockStatusText();
      els.saveBtn.disabled = predictionsAreLocked();
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
        await state.gameRef.set({ locked: false, lockAt: "", labelOverrides: {}, codeOverrides: {}, flagOverrides: {}, results: {}, resultScores: {}, extraRulesText: "", updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
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
        state.allPredictions = snapshot.docs.map(doc => ({ playerId: doc.id, ...doc.data() }));
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

    const playerKey = usernameKey(name);
    if (!playerKey) return setMessage("Use at least one letter or number in the username.", "error");

    const pinHash = await sha256(`wc26-account-v2|${SETTINGS.eventId}|${playerKey}|${pin}`);

    if (state.online) {
      const docRef = state.predictionsRef.doc(playerKey);
      const doc = await docRef.get();

      if (doc.exists) {
        const data = doc.data() || {};
        if (data.pinHash && data.pinHash !== pinHash) {
          return setMessage("That username already exists, but the PIN is wrong.", "error");
        }
        state.playerId = playerKey;
        state.playerName = data.name || name;
        state.playerPinHash = pinHash;
        state.userPicks = cleanPicks(data.picks || {});
        state.userScorePredictions = cleanScoreMap(data.scorePredictions || {});
        setMessage("Existing bracket loaded from the online database.", "good");
      } else {
        if (state.allPredictions.length >= SETTINGS.maxParticipants) {
          return setMessage(`This private game is set to ${SETTINGS.maxParticipants} participants. Ask the admin to raise the limit.`, "error");
        }
        state.playerId = playerKey;
        state.playerName = name;
        state.playerPinHash = pinHash;
        state.userPicks = {};
        state.userScorePredictions = {};
        await docRef.set({
          playerId: playerKey,
          usernameKey: playerKey,
          name,
          pinHash,
          picks: {},
          scorePredictions: {},
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        setMessage("New online bracket account created. Make your picks, then save them.", "good");
      }
    } else {
      const existing = state.allPredictions.find(entry => entry.playerId === playerKey || entry.usernameKey === playerKey);
      if (existing?.pinHash && existing.pinHash !== pinHash) {
        return setMessage("That username already exists, but the PIN is wrong.", "error");
      }
      state.playerId = playerKey;
      state.playerName = existing?.name || name;
      state.playerPinHash = pinHash;
      state.userPicks = cleanPicks(existing?.picks || {});
      state.userScorePredictions = cleanScoreMap(existing?.scorePredictions || {});
      setMessage("Bracket loaded in demo/local mode. It will not sync until Firebase is online.", "good");
    }

    localStorage.setItem("wc26_playerKey", state.playerId);
    localStorage.setItem("wc26_playerName", state.playerName);
    localStorage.setItem("wc26_playerPinHash", state.playerPinHash);
    renderAll();
  }

  async function savePrediction() {
    if (!state.playerId || !state.playerName || !state.playerPinHash) return setMessage("Load your bracket with username + PIN first.", "error");
    if (predictionsAreLocked()) return setMessage(lockStatusText(), "error");

    const existing = state.allPredictions.find(entry => entry.playerId === state.playerId || entry.usernameKey === state.playerId);
    if (existing?.pinHash && existing.pinHash !== state.playerPinHash) {
      return setMessage("PIN mismatch. Reload the bracket using the correct username and PIN.", "error");
    }
    if (!existing && state.allPredictions.length >= SETTINGS.maxParticipants) {
      return setMessage(`This private game is set to ${SETTINGS.maxParticipants} participants. Ask the admin to raise the limit.`, "error");
    }

    const scoreConflict = firstContradictingScore(state.userPicks, state.userScorePredictions);
    if (scoreConflict) {
      alert(scoreConflictPopupMessage(scoreConflict));
      return;
    }

    const data = {
      playerId: state.playerId,
      usernameKey: state.playerId,
      name: state.playerName,
      pinHash: state.playerPinHash,
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
      const idx = state.allPredictions.findIndex(entry => entry.playerId === state.playerId || entry.usernameKey === state.playerId);
      if (idx >= 0) state.allPredictions[idx] = data;
      else state.allPredictions.push(data);
      saveLocalData();
      renderAll();
    }

    setMessage("Saved to the online database.", "good");
  }

  async function deleteMyBracket() {
    if (!state.playerId || !state.playerName || !state.playerPinHash) {
      return setMessage("Load your bracket with username + PIN first, then delete it.", "error");
    }

    const confirmText = window.prompt(
      `This permanently deletes ${state.playerName}'s bracket from the database.\n\nType DELETE to confirm.`
    );
    if (confirmText !== "DELETE") {
      return setMessage("Delete cancelled.", "");
    }

    try {
      if (state.online) {
        const docRef = state.predictionsRef.doc(state.playerId);
        const doc = await docRef.get();
        if (doc.exists) {
          const data = doc.data() || {};
          if (data.pinHash && data.pinHash !== state.playerPinHash) {
            return setMessage("PIN mismatch. Reload with the correct username and PIN before deleting.", "error");
          }
          await docRef.delete();
        }
      } else {
        state.allPredictions = state.allPredictions.filter(entry =>
          entry.playerId !== state.playerId && entry.usernameKey !== state.playerId
        );
        saveLocalData();
      }

      if (els.predictionDialog?.open) els.predictionDialog.close();
      clearCurrentPlayer();
      renderAll();
      setMessage("Your bracket was deleted. You can create a new one anytime.", "good");
    } catch (err) {
      console.error(err);
      setMessage("Could not delete your bracket. Check Firebase rules and try again.", "error");
    }
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
      if (value && value !== "USA") overrides[teamId] = value;
    });
    return overrides;
  }

  function collectCodeOverrides() {
    const overrides = {};
    document.querySelectorAll("[data-code-team]").forEach(input => {
      const teamId = input.dataset.codeTeam;
      const value = normalizeCountryCode(input.value);
      const labelInput = document.querySelector(`[data-label-team="${teamId}"]`);
      const detected = countryCodeFromLabel(labelInput?.value || "");
      if (value && value !== detected) overrides[teamId] = value;
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


  function usernameKey(name) {
    return String(name || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);
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
    const versionBadge = document.getElementById("appVersionBadge");
    if (versionBadge) versionBadge.textContent = "v2.22 · visible final arrows";
    ensureDeleteBracketButton();
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
    if (els.deleteBracketBtn) els.deleteBracketBtn.addEventListener("click", deleteMyBracket);
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
    window.addEventListener("resize", () => {
      document.querySelectorAll(".knockout-board").forEach(board => scheduleConnectorDraw(board));
    });
    setInterval(() => {
      if (state.config.lockAt) renderAll();
    }, 30000);

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
    els.saveLabelsBtn.addEventListener("click", () => saveConfig({
      labelOverrides: collectLabelOverrides(),
      codeOverrides: collectCodeOverrides(),
      flagOverrides: {}
    }));
    els.saveRulesBtn.addEventListener("click", () => saveConfig({ extraRulesText: els.extraRulesInput.value.trim() }));
    els.saveResultsBtn.addEventListener("click", () => {
      const scoreConflict = firstContradictingScore(state.officialDraft, state.officialScoreDraft);
      if (scoreConflict) {
        alert(scoreConflictPopupMessage(scoreConflict));
        return;
      }
      saveConfig({ results: cleanPicks(state.officialDraft), resultScores: cleanScoreMap(state.officialScoreDraft) });
    });
  }

  attachEvents();
  initFirebase();
})();
