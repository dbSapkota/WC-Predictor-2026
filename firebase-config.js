/*
  1) Create a Firebase project.
  2) Add a web app and paste its config below.
  3) Enable Firestore Database.
  4) Enable Authentication > Anonymous sign-in.
  5) Change adminPassphrase before sharing the site.

  Firebase config values identify your project, but are not passwords.
*/
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyCoVTuhtvQnbsZc9wesuddzVEtdDADR1sI",
  authDomain: "wc-predictor-2026-dbb39.firebaseapp.com",
  projectId: "wc-predictor-2026-dbb39",
  storageBucket: "wc-predictor-2026-dbb39.firebasestorage.app",
  messagingSenderId: "513966780692",
  appId: "1:513966780692:web:31042f80a8e4db1ca41201",
  measurementId: "G-7F3HW2ZWEC"

};

window.BRACKET_APP_SETTINGS = {
  eventId: "worldcup2026",
  adminPassphrase: "dbs123",
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
