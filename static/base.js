/**
 * base.js — Aonware.ai Global Logic
 * Shared across all pages: theme, language, nav, footer injection.
 * Include BEFORE page-specific scripts.
 */
'use strict';

/* ═══════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════ */
const AO = window.AO = {
  API: 'http://127.0.0.1:8000/api/v1',

  /* ── Helpers ── */
  esc(s) {
    const d = document.createElement('div');
    d.textContent = s ?? '';
    return d.innerHTML;
  },

  fmtDate(iso) {
    if (!iso) return '—';
    try {
      const d  = new Date(iso);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      return `${dd}.${mm}.${d.getFullYear()}`;
    } catch { return '—'; }
  },

  getSlug() {
    return new URLSearchParams(window.location.search).get('slug') || '';
  },

  stagger(selector, baseDelay = 60, step = 70) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, baseDelay + i * step);
    });
  },
};

/* ═══════════════════════════════════════════
   THEME
═══════════════════════════════════════════ */
function applyTheme(mode) {
  const html = document.documentElement;
  html.classList.remove('dark', 'light');
  html.classList.add(mode);
  localStorage.setItem('ao-theme', mode);

  const track = document.getElementById('theme-track');
  const sun   = document.getElementById('icon-sun');
  const moon  = document.getElementById('icon-moon');
  if (!track) return;
  if (mode === 'light') {
    track.classList.add('on');
    sun  && sun.classList.remove('hidden');
    moon && moon.classList.add('hidden');
  } else {
    track.classList.remove('on');
    sun  && sun.classList.add('hidden');
    moon && moon.classList.remove('hidden');
  }
}

window.toggleTheme = function () {
  const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
};

/* ═══════════════════════════════════════════
   LANGUAGE
═══════════════════════════════════════════ */
let _lang = localStorage.getItem('ao-lang') || 'tr';

function applyLang(lang) {
  _lang = lang;
  localStorage.setItem('ao-lang', lang);
  document.documentElement.lang = lang;

  const btnTr = document.getElementById('btn-tr');
  const btnEn = document.getElementById('btn-en');
  if (btnTr) btnTr.classList.toggle('active', lang === 'tr');
  if (btnEn) btnEn.classList.toggle('active', lang === 'en');

  document.querySelectorAll('[data-tr]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (!val) return;
    if (/<[a-z][\s\S]*>/i.test(val)) el.innerHTML = val;
    else el.textContent = val;
  });

  /* Notify page-level listeners */
  window.dispatchEvent(new CustomEvent('ao-lang', { detail: lang }));
}

window.setLang = function (lang) { applyLang(lang); };
window.getLang = function ()      { return _lang; };

/* ═══════════════════════════════════════════
   SOCIAL SVGs
═══════════════════════════════════════════ */
const SOCIALS = [
  {
    title: 'LinkedIn',
    href:  'https://www.linkedin.com/in/abdülaziz-öner/',
    svg:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    title: 'GitHub',
    href:  'https://github.com/abdulazizoner',
    svg:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  },
  {
    title: 'Hugging Face',
    href:  'https://huggingface.co/abdulazizoner',
    svg:   `<svg width="15" height="15" viewBox="0 0 95 88" fill="currentColor"><path d="M47.2 0C21.2 0 0 19.7 0 44c0 24.2 21.2 44 47.2 44s47.2-19.8 47.2-44C94.4 19.7 73.2 0 47.2 0zm-14 58.5c-2.6 0-4.7-2.5-4.7-5.6s2.1-5.6 4.7-5.6 4.7 2.5 4.7 5.6-2.1 5.6-4.7 5.6zm28 0c-2.6 0-4.7-2.5-4.7-5.6s2.1-5.6 4.7-5.6 4.7 2.5 4.7 5.6-2.1 5.6-4.7 5.6zm11-18.4c-2.3-2.8-5.3-4.7-8.7-5.7l2.5-5.7c.3-.7 0-1.5-.7-1.9-.7-.3-1.5 0-1.9.7l-2.7 6.1c-2.2-.5-4.5-.8-6.8-.8-2.4 0-4.7.3-6.9.8l-2.7-6.1c-.4-.7-1.2-1-1.9-.7-.7.4-1 1.2-.7 1.9l2.5 5.7c-3.4 1-6.4 2.9-8.7 5.7-.5.6-.4 1.5.2 2 .6.5 1.5.4 2-.2 3.8-4.6 9.3-7.1 16.2-7.1s12.4 2.5 16.2 7.1c.5.6 1.4.7 2 .2.6-.5.7-1.4.2-2z"/></svg>`,
  },
  {
    title: 'Kaggle',
    href:  'https://www.kaggle.com/abdlazizoner',
    svg:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336"/></svg>`,
  },
];

function socialIconsHtml(size = 34) {
  return SOCIALS.map(s => `
    <a href="${s.href}" target="_blank" rel="noopener noreferrer" class="s-icon" title="${s.title}"
       style="width:${size}px;height:${size}px;">
      ${s.svg}
    </a>
  `).join('');
}

/* ═══════════════════════════════════════════
   NAV INJECTION
═══════════════════════════════════════════ */
function buildNav(opts = {}) {
  const { backHref = 'aonware-index.html', showBack = false } = opts;

  const nav = document.getElementById('ao-nav');
  if (!nav) return;

  nav.innerHTML = `
    <div class="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between gap-4">

      ${ showBack ? `
      <a href="${backHref}" class="flex items-center gap-1.5 font-mono text-xs group" style="color:var(--muted)">
        <svg class="w-3.5 h-3.5" style="color:var(--blue)" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        <span class="group-hover:text-blue transition-colors" data-tr="$ cd .." data-en="$ cd ..">$ cd ..</span>
      </a>` : `
      <a href="aonware-index.html" class="flex items-center gap-2 group">
        <span class="font-mono text-xs border rounded px-2 py-0.5 transition-colors group-hover:text-blue"
              style="color:var(--dim);border-color:var(--subtle)">
          &lt; aonware.ai /&gt;
        </span>
      </a>`}

      <div class="hidden md:flex items-center gap-5 font-mono text-xs" style="color:var(--muted)">
        <a href="aonware-index.html#about"     class="hover:text-blue transition-colors" data-tr="./hakkında"  data-en="./about">./hakkında</a>
        <a href="aonware-index.html#arsenal"   class="hover:text-blue transition-colors" data-tr="./arsenal"   data-en="./arsenal">./arsenal</a>
        <a href="aonware-index.html#portfolio" class="hover:text-blue transition-colors" data-tr="./projeler"  data-en="./projects">./projeler</a>
        <a href="aonware-index.html#blog"      class="hover:text-blue transition-colors" data-tr="./kayıtlar"  data-en="./logs">./kayıtlar</a>
      </div>

      <div class="flex items-center gap-3">
        <!-- Lang -->
        <div class="flex items-center gap-1 rounded-lg p-0.5" style="border:1px solid var(--border);background:var(--surf)">
          <button id="btn-tr" class="lang-btn active" onclick="setLang('tr')">TR</button>
          <button id="btn-en" class="lang-btn"        onclick="setLang('en')">EN</button>
        </div>
        <!-- Theme -->
        <button onclick="toggleTheme()" class="flex items-center gap-1.5" style="color:var(--muted)" title="Toggle theme">
          <svg id="icon-sun" class="w-4 h-4 hidden" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1"  x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78"  x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
          </svg>
          <svg id="icon-moon" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
          </svg>
          <div id="theme-track" class="toggle-track">
            <div class="toggle-thumb"></div>
          </div>
        </button>
        <!-- Status dot (desktop) -->
        <div class="hidden sm:flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" style="background:var(--emerald)"></span>
          <span class="font-mono text-xs" style="color:var(--emerald)">online</span>
        </div>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════
   FOOTER INJECTION
═══════════════════════════════════════════ */
function buildFooter() {
  const footer = document.getElementById('ao-footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="max-w-5xl mx-auto px-5 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="font-mono text-xs" style="color:var(--dim)">
        <span style="color:var(--blue)">$</span>
        echo "Abdülaziz Öner &copy; <span id="year"></span> — Zero defect."
      </div>
      <div class="flex items-center gap-2">
        ${socialIconsHtml(32)}
      </div>
    </div>
  `;
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
}

/* ═══════════════════════════════════════════
   PROGRESS BAR
═══════════════════════════════════════════ */
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ═══════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════ */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ═══════════════════════════════════════════
   BOOT — call after DOM ready
═══════════════════════════════════════════ */
window.aoInit = function (navOpts = {}) {
  buildNav(navOpts);
  buildFooter();
  applyTheme(localStorage.getItem('ao-theme') || 'dark');
  applyLang(localStorage.getItem('ao-lang')  || 'tr');
  initProgressBar();
  initReveal();
};
