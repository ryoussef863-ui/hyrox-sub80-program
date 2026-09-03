# Ledger — Personal Budget PWA

A small offline-first budget tracker for a single household: fixed monthly
expenses, a savings-goal slider, quick expense logging, a spending-pool
progress view, and monthly history. Plain HTML/CSS/JS, no build step, no
backend — all data lives in the browser's `localStorage` on your device.

## Features

- **Dashboard** — income, fixed expenses, savings target, spent so far, and
  the remaining spending pool, plus a progress bar and category breakdown.
- **Editable fixed expenses** — update amounts any month (e.g. Internet
  varies 1,200–2,000 EGP), add or remove line items.
- **Savings goal slider** — 5–30% range with the 15–20% recommended band
  highlighted, defaults to 17%.
- **Quick expense logging** — category, amount, optional note, timestamp.
- **Category breakdown** — hand-drawn canvas bar chart, no chart library.
- **Monthly history** — past months are frozen automatically once the
  calendar rolls over; tap a month to expand its full breakdown.
- **Backup / restore** — export the whole dataset to a JSON file, or import
  one back in (Settings → Backup). There's no cloud sync, so this is your
  safety net when switching phones or clearing browser data.

## Running locally

No build step — just serve the folder statically:

```bash
cd budget
python3 -m http.server 8080
```

Then open `http://localhost:8080`. (Service workers require either
`localhost` or HTTPS, so a plain `file://` open won't register offline
caching, though the app still works.)

## Deploying

### GitHub Pages (whole repo)

A workflow at `.github/workflows/pages.yml` deploys this entire repository
to GitHub Pages on every push to `main`. Enable it once:

1. Repo **Settings → Pages → Source** → select **GitHub Actions**.
2. Merge this branch into `main` (or push to `main` directly).
3. The Actions run publishes the repo root to Pages. The budget app is then
   available at `https://<your-username>.github.io/<repo>/budget/`, and the
   existing Hyrox program stays at the root URL.

### Netlify (just this app)

To give the budget app its own dedicated URL, create a **new Netlify site**
from this repository and set:

- **Base directory:** `budget`
- **Publish directory:** `budget`
- **Build command:** *(leave empty — it's static)*

`budget/netlify.toml` is already set up with that publish directory and
sets `Cache-Control: no-cache` on `manifest.json` and `sw.js` so updates
reach your phone promptly instead of being stuck behind a CDN cache.

## Installing on iPhone

1. Open the deployed URL in **Safari** (not Chrome — iOS only allows
   installing from Safari).
2. Tap the **Share** icon → **Add to Home Screen**.
3. Launch it from the home screen icon — it opens full-screen, without
   Safari's UI, and keeps working with the phone offline.

## Updating the app after a deploy

The service worker (`sw.js`) caches the app shell aggressively so it works
offline. When you push changes, bump `CACHE_NAME` in `sw.js` (e.g.
`ledger-v2`) — this forces installed clients to fetch the new files instead
of serving the stale cache. Without that bump, an already-installed phone
may keep the old version until the cache happens to expire.

## Data & privacy

Everything — income, fixed expenses, the savings goal, and every logged
expense — is stored only in this browser's `localStorage` on this device.
Nothing is sent anywhere. Clearing Safari's site data (or uninstalling the
home-screen app) deletes it permanently, so export a backup periodically
from Settings → Backup if that data matters to you.
