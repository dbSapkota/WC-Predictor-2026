# World Cup 2026 Bracket + Score Predictor

A tiny, shareable, unofficial World Cup 2026 Round-of-32 knockout predictor for a small private friend group. It is built as a static website with optional Firebase online sync. Made with the assistance of ChatGPT

This is for friendly no-money predictions only. Do not use it for betting, paid games, or anything involving gambling.

## Features

- Knockout-stage bracket layout instead of plain side-by-side round tables
- Round of 32 through Final winner picks
- Score prediction for every match
- Leaderboard with total points and point breakdown
- Rules popup with editable extra house rules / tie-breakers
- Online saved predictions using Firebase Firestore
- Name + private PIN login flow for a small group
- Admin tools to:
  - lock/unlock prediction editing
  - edit Round of 32 labels after actual teams are known
  - enter official winners and official scores as games finish
  - add extra rules text shown in the rules popup
- CSV export of all predictions and scores
- Demo mode with local browser storage when Firebase is not configured

## Current scoring

The scoring values are set in `firebase-config.js`:

```js
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
```

That means correct winner points are:

- Round of 32: 5 points
- Round of 16: 10 points
- Quarterfinals: 20 points
- Semifinals: 40 points
- Final: 80 points

Exact score and goal-difference bonuses stay constant for every round.

For score and goal-difference bonuses in later rounds, the predicted matchup must match the actual matchup for that match slot. This avoids giving score bonuses for a game between different teams.

## Files

- `index.html` — main webpage
- `styles.css` — knockout-stage styling
- `app.js` — bracket logic, score predictions, scoring, Firebase sync, admin tools
- `firebase-config.js` — paste your Firebase project config and scoring rules here
- `firestore.rules` — starter Firestore rules for a small trusted group

## Setup: Firebase online sync

1. Go to Firebase Console and create a new project.
2. Add a Web App to the project.
3. Copy the Firebase web config into `firebase-config.js`.
4. In Firebase, enable **Authentication → Sign-in method → Anonymous**.
5. In Firebase, create a **Firestore Database**.
6. Paste the contents of `firestore.rules` into **Firestore Database → Rules**, then publish.
7. In `firebase-config.js`, change:

```js
window.BRACKET_APP_SETTINGS = {
  eventId: "worldcup2026",
  adminPassphrase: "change-this-before-sharing",
  maxParticipants: 8
};
```

Use a real admin passphrase before sharing the site.

## Deploy on GitHub Pages

### Option A: Upload through the GitHub website

1. Create a new GitHub repository, for example `wc2026-bracket`.
2. Upload these files to the repository root:

```text
index.html
styles.css
app.js
firebase-config.js
firestore.rules   // optional after you publish the rules in Firebase
README.md         // optional
```

3. Commit the files.
4. Open the repository’s **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose the `main` branch and `/root`, then save.
7. Your site will be available at a URL like:

```text
https://YOUR-GITHUB-USERNAME.github.io/wc2026-bracket/
```

8. In Firebase, add your GitHub Pages domain to Authentication authorized domains if Firebase shows an unauthorized-domain error.

### Option B: Upload from terminal

```bash
cd wc2026-bracket-predictor
git init
git add .
git commit -m "Add World Cup 2026 bracket predictor"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/wc2026-bracket.git
git push -u origin main
```

Then enable GitHub Pages from **Settings → Pages** as described above.

## How participants use it

1. Open the shared URL.
2. Enter a display name.
3. Enter a private PIN with at least 4 characters.
4. Pick winners and predicted scores.
5. Click **Save prediction**.

They can return later using the same name and PIN.

## Admin workflow

1. Open **Admin tools**.
2. Enter the admin passphrase from `firebase-config.js`.
3. Edit team labels when the actual Round of 32 teams are known.
4. Add extra rules / tie-breakers in the Rules text box.
5. Lock predictions after your deadline.
6. Enter official winners and official scores as games finish.
7. Use **Export CSV** if you want a spreadsheet copy.

## Important security note

This project is intentionally simple for a trusted group of friends. The admin passphrase is client-side, so it is not strong security. For a public game, you would want real user accounts, custom claims, and server-side admin checks.


## Version note

This package is the v2.2 score-predictor / knockout-tree version. If the page still looks like five simple columns with no score inputs, your browser or GitHub Pages is serving an older cached copy. Hard-refresh the page, or update all files in the GitHub repo root and wait for the Pages deployment to finish.
