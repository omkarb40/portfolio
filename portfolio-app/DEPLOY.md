# Portfolio — React source

This is the source for the live site at the repo root (`index.html`, `assets/`, etc.).
The deployed files are a static production build — this folder is what you edit.

## Edit content
Almost everything (projects, experience, publications, skills) lives in one file:
`src/data/portfolio.js`. Edit that first for any copy change.

## Run locally
```
npm install
npm run dev
```

## Rebuild and redeploy
```
npm run build
```
This outputs to `dist/`. Copy the contents of `dist/` into the repo root
(overwriting `index.html`, `assets/`, `fontawesome/`, `images/`, `files/`) to publish.

## Notes
- Built with Vite + React, `base: './'` so it works from any static host (GitHub Pages,
  Netlify, Vercel, or opened as a plain file) without path config.
- The `useGithubStats` hook fetches live star counts from the public GitHub API
  client-side — no API key needed, fails silently if rate-limited.
- Contact form posts to Formspree (`https://formspree.io/f/mojwowya`) via fetch,
  no page reload.
