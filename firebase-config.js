/*
  1) Create a Firebase project.
  2) Add a web app and paste its config below.
  3) Enable Firestore Database.
  4) Enable Authentication > Anonymous sign-in.
  5) Change adminPassphrase before sharing the site.

  Firebase config values identify your project, but are not passwords.
*/
window.FIREBASE_CONFIG = {
  apiKey: "PASTE_FIREBASE_API_KEY",
  authDomain: "PASTE_FIREBASE_AUTH_DOMAIN",
  projectId: "PASTE_FIREBASE_PROJECT_ID",
  storageBucket: "PASTE_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "PASTE_FIREBASE_MESSAGING_SENDER_ID",
  appId: "PASTE_FIREBASE_APP_ID"
};

window.BRACKET_APP_SETTINGS = {
  eventId: "worldcup2026",
  adminPassphrase: "change-this-before-sharing",
  maxParticipants: 8
};

// Change these values here if you want to change the automatic scoring later.
window.BRACKET_SCORING = {
  winBasePoints: 5,
  exactScorePoints: 2,
  goalDifferencePoints: 1,
  roundMultipliers: {
    "Round of 32": 1,
    "Round of 16": 2,
    "Quarterfinals": 4,
    "Semifinals": 8,
    "Final": 16
  }
};
