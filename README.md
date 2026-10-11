# Abdülaziz Öner — Portfolio

Bilingual (English / Turkish) personal website with education, skills, interests and contact information. Built with Astro and plain CSS; no backend or tracking.

Live: https://abdulazizoner.github.io/

## Development

Use Node.js 24 or later.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

Content: `src/data/site.ts`. Layout: `src/pages/index.astro`. Styles: `src/styles/global.css`.

Language and theme preferences are stored locally in the browser. The site works without JavaScript; preference controls require it.

## Publishing

Build and commit `docs/` alongside source changes. GitHub Pages serves `main`, `/docs`. `scripts/postbuild.mjs` creates `.nojekyll` so generated assets are served correctly.

Project listings and case studies are intentionally not published. CV files are kept locally and are not published on the site.

Personal portfolio — all rights reserved unless otherwise noted.
