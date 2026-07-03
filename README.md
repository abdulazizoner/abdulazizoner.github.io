# Abdülaziz Öner — Portfolio

Professional portfolio for **Abdülaziz Öner**, an AI & Data Engineering student. The site is a static, bilingual (EN/TR) showcase of projects, skills, and detailed case studies — built for GitHub Pages with no backend runtime.

**Live site:** [https://abdulazizoner.github.io/](https://abdulazizoner.github.io/)

## Tech stack

| Layer | Choice |
|-------|--------|
| Site generator | [Astro](https://astro.build/) (static output) |
| Styling | Plain CSS (`src/styles/global.css`) |
| i18n / theme | Client-side JS (`public/assets/site.js`) + `localStorage` |
| Hosting | GitHub Pages from `/docs` |
| Language | TypeScript for data files and components |

### Why Astro (and not Django)

This repository was originally a Web Programming course Django project. The portfolio is now an **independent static site**: no database, API, Redis, or server runtime is needed. Astro provides component reuse, typed content data, and a clean build pipeline while outputting plain HTML/CSS/JS that GitHub Pages can serve directly.

Django and related backend files have been removed.

## Local development

```bash
npm install
npm run dev
```

Dev server: `http://localhost:4321/`

## Build & preview

```bash
npm run build    # outputs to ./docs
npm run preview  # serves built site locally
```

After every production build, `docs/.nojekyll` is written automatically so GitHub Pages serves `_astro/` assets correctly.

## GitHub Pages deployment

1. Build: `npm run build`
2. Commit the generated `docs/` folder
3. Repository **Settings → Pages → Build and deployment → Source:** Deploy from branch `main` (or your default branch), folder **`/docs`**

`astro.config.mjs` sets:

- `site: 'https://abdulazizoner.github.io'`
- `outDir: './docs'`

## Repository structure

```
.
├── src/
│   ├── components/     # Header, Footer, ProjectCard, Seo, etc.
│   ├── layouts/        # BaseLayout.astro
│   ├── data/           # site.ts, projects.ts, case-study-html.ts
│   ├── case-studies/   # EN/TR HTML fragments for case study bodies
│   ├── pages/          # index, 404, projects/[slug]
│   ├── styles/         # global.css
│   └── utils/          # base path helpers
├── public/assets/      # site.js, favicon.svg, og-image.svg
├── docs/               # Generated static output (do not edit by hand)
├── scripts/postbuild.mjs
├── astro.config.mjs
└── package.json
```

## Editing content

### Site copy (hero, about, skills, education)

Edit `src/data/site.ts`.

### Project cards (home page)

Edit `src/data/projects.ts` — titles, tags, status, SEO metadata, and card summaries.

### Case study pages

1. Update EN/TR HTML fragments in `src/case-studies/{slug}-en.html` and `{slug}-tr.html`
2. Register the slug in `src/data/case-study-html.ts` and `src/data/projects.ts`
3. Rebuild

### Adding a new case study

1. Add a `Project` entry in `src/data/projects.ts` (unique `slug`, `pageId`, SEO fields)
2. Create `src/case-studies/{slug}-en.html` and `{slug}-tr.html`
3. Import both in `src/data/case-study-html.ts`
4. Run `npm run build` — `src/pages/projects/[slug].astro` generates the page automatically

## Adding a CV later

Place a PDF at `public/assets/cv.pdf`, rebuild, then add a hero CTA in `src/pages/index.astro`. The Download CV button is intentionally omitted until a real file exists.

## Features

- EN/TR language toggle with `localStorage` persistence
- Dark / light theme toggle
- Detailed case studies: TrendAI, Turkish Legal-Risk NLP, FıratAsistan
- Responsive layout (320px+), accessible controls, skip link
- No API calls, no overclaimed metrics

## License

Personal portfolio — all rights reserved unless otherwise noted.
