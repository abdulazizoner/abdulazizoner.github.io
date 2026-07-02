# Abdülaziz Öner — Portfolio

Personal portfolio for **AI & Data Engineering** student work. The public site is a **static GitHub Pages** deployment under `/docs`. The Django backend in this repository is kept for local development experiments and is **not** required to view the published site.

**Live site (after GitHub Pages is enabled):** [https://abdulazizoner.github.io/Aonware.ai/](https://abdulazizoner.github.io/Aonware.ai/)

## Repository layout

| Path | Purpose |
|------|---------|
| `docs/` | **Published static portfolio** (GitHub Pages source) |
| `docs/index.html` | Main portfolio page |
| `docs/404.html` | Custom 404 page |
| `docs/assets/` | CSS and JavaScript (no build step) |
| `aonware_ai/`, `core/`, `portfolio/`, `blog/` | Django backend (optional, local dev only) |

## GitHub Pages deployment

1. Push this repository to GitHub (`abdulazizoner/Aonware.ai`).
2. Open **Settings → Pages** in the repository.
3. Under **Build and deployment → Source**, select:
   - **Branch:** `main`
   - **Folder:** `/docs`
4. Save. GitHub will publish the site within a few minutes.
5. Confirm the site loads at: `https://abdulazizoner.github.io/Aonware.ai/`

`docs/.nojekyll` is included so GitHub Pages serves files as-is (no Jekyll processing).

## Local preview (static site)

From the repository root:

```bash
cd docs
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) and verify:

- Home page, CSS, and JS load
- Navigation anchor links work
- Theme toggle works
- No console errors (no API calls)

## Local Django backend (optional)

The backend is **not** used by the GitHub Pages site. To run it locally for API/admin experiments:

```bash
cp .env.template .env   # fill in values
poetry install
docker compose up -d    # PostgreSQL + Redis
poetry run python manage.py migrate
poetry run python manage.py runserver
```

## What gets published

Only files under `docs/` are served on GitHub Pages. The following are **not** deployed:

- `.env`, database files, `staticfiles/`, `__pycache__/`
- Django templates and API endpoints

## Contact

- **Email:** abdulazizoner@gmail.com
- **GitHub:** [github.com/abdulazizoner](https://github.com/abdulazizoner)
- **LinkedIn:** [linkedin.com/in/abdülaziz-öner](https://www.linkedin.com/in/abdülaziz-öner/)

## License

Portfolio content © Abdülaziz Öner. Backend code follows the repository license where applicable.
