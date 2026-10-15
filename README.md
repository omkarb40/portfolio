# Omkar Badadale — Data Science Portfolio

Live site: https://omkarb40.github.io/portfolio/

- `portfolio-app/` — React + Vite source. Edit content in `portfolio-app/src/data/portfolio.js`.
- Repo root — the built site that GitHub Pages serves.

## Update and redeploy
```
cd portfolio-app
npm install
npm run build
cp -R dist/. ..        # copy the build to the repo root
cd .. && git add -A && git commit -m "Update portfolio" && git push
```
Replacing the resume: overwrite `portfolio-app/public/files/Omkar_Badadale_Resume.pdf`, bump the `?v=` value on `resume` in `portfolio.js`, rebuild.
