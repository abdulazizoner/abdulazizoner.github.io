'use strict';

(function () {
  const STORAGE_THEME = 'portfolio-theme';
  const STORAGE_LANG = 'portfolio-lang';
  const THEME_COLORS = { dark: '#0d1117', light: '#f8fafc' };

  const PAGE_TITLES = {
    home: {
      en: 'Abdülaziz Öner — AI & Data Engineering Student',
      tr: 'Abdülaziz Öner — Yapay Zeka ve Veri Mühendisliği Öğrencisi',
    },
    trendai: {
      en: 'TrendAI — Case Study | Abdülaziz Öner',
      tr: 'TrendAI — Proje İncelemesi | Abdülaziz Öner',
    },
    legal: {
      en: 'Turkish Legal-Risk NLP — Case Study | Abdülaziz Öner',
      tr: 'Türkçe Hukuki Risk NLP — Proje İncelemesi | Abdülaziz Öner',
    },
    firat: {
      en: 'FıratAsistan — Case Study | Abdülaziz Öner',
      tr: 'FıratAsistan — Proje İncelemesi | Abdülaziz Öner',
    },
    error404: {
      en: '404 — Abdülaziz Öner',
      tr: '404 — Abdülaziz Öner',
    },
  };

  function applyTheme(mode) {
    const html = document.documentElement;
    html.classList.remove('dark', 'light');
    html.classList.add(mode);
    localStorage.setItem(STORAGE_THEME, mode);

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', THEME_COLORS[mode] || THEME_COLORS.dark);

    const track = document.getElementById('theme-track');
    const sun = document.getElementById('icon-sun');
    const moon = document.getElementById('icon-moon');
    if (!track) return;

    const isLight = mode === 'light';
    track.classList.toggle('on', isLight);
    if (sun) sun.classList.toggle('hidden', !isLight);
    if (moon) moon.classList.toggle('hidden', isLight);
  }

  function toggleTheme() {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_LANG, lang);

    document.querySelectorAll('[data-aria-en]').forEach((el) => {
      const val = el.getAttribute('data-aria-' + lang);
      if (val != null) el.setAttribute('aria-label', val);
    });

    document.querySelectorAll('[data-en]').forEach((el) => {
      const val = el.getAttribute('data-' + lang);
      if (val == null) return;
      if (el.hasAttribute('data-i18n-html') || /<[a-z][\s\S]*>/i.test(val)) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });

    document.querySelectorAll('[data-lang-block]').forEach((el) => {
      el.hidden = el.getAttribute('data-lang-block') !== lang;
    });

    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      const active = btn.getAttribute('data-lang-btn') === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    const page = document.body.getAttribute('data-page');
    if (page && PAGE_TITLES[page]) {
      const title = document.querySelector('title');
      if (title) title.textContent = PAGE_TITLES[page][lang];
    }

    window.dispatchEvent(new CustomEvent('portfolio-lang', { detail: lang }));
    debouncedStabilizeI18n();
  }

  let stabilizeTimer = null;
  let stabilizing = false;

  function measureI18nText(el, attr, isHtml) {
    const val = el.getAttribute(attr);
    if (!val) return 0;

    const width = el.getBoundingClientRect().width;
    if (width <= 0) return 0;

    const probe = document.createElement(el.tagName.toLowerCase());
    probe.className = el.className;
    probe.style.cssText =
      'position:absolute;visibility:hidden;pointer-events:none;left:0;width:' + width + 'px;height:auto;min-height:0';
    if (isHtml) probe.innerHTML = val;
    else probe.textContent = val;

    el.parentNode.appendChild(probe);
    const height = probe.offsetHeight;
    probe.remove();
    return height;
  }

  function stabilizeInlineBadge(badge) {
    const textEl = badge.querySelector('[data-en][data-tr]');
    if (!textEl) return;

    badge.style.minWidth = '';
    badge.style.minHeight = '';

    const measure = (lang) => {
      const clone = badge.cloneNode(true);
      const cloneText = clone.querySelector('[data-en][data-tr]');
      if (!cloneText) {
        clone.remove();
        return { w: 0, h: 0 };
      }
      cloneText.textContent = cloneText.getAttribute('data-' + lang) || '';
      clone.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;left:0;top:0;max-width:none';
      badge.parentNode.appendChild(clone);
      const size = { w: clone.offsetWidth, h: clone.offsetHeight };
      clone.remove();
      return size;
    };

    const en = measure('en');
    const tr = measure('tr');
    const maxH = Math.max(en.h, tr.h);
    if (maxH > 0) badge.style.minHeight = maxH + 'px';

    if (window.innerWidth >= 360) {
      const maxW = Math.max(en.w, tr.w);
      if (maxW > 0) badge.style.minWidth = maxW + 'px';
    }
  }

  function stabilizeI18nHeights() {
    if (stabilizing) return;
    stabilizing = true;

    requestAnimationFrame(() => {
      document.querySelectorAll('[data-i18n-stable]').forEach((el) => {
        el.style.minHeight = '';
      });

      document.querySelectorAll('[data-i18n-stable-inline]').forEach((el) => {
        el.style.minWidth = '';
        el.style.minHeight = '';
      });

      document.querySelectorAll('[data-i18n-stable-inline]').forEach(stabilizeInlineBadge);

      document.querySelectorAll('[data-i18n-stable]').forEach((el) => {
        const blocks = el.querySelectorAll(':scope > [data-lang-block]');
        if (blocks.length >= 2) {
          let maxH = 0;
          const saved = [];

          blocks.forEach((block) => {
            saved.push({ block, hidden: block.hidden });
            block.hidden = false;
            block.style.visibility = 'hidden';
            block.style.position = 'absolute';
            block.style.left = '0';
            block.style.right = '0';
            block.style.top = '0';
            maxH = Math.max(maxH, block.scrollHeight);
          });

          saved.forEach(({ block, hidden }) => {
            block.style.visibility = '';
            block.style.position = '';
            block.style.left = '';
            block.style.right = '';
            block.style.top = '';
            block.hidden = hidden;
          });

          if (maxH > 0) el.style.minHeight = maxH + 'px';
          return;
        }

        if (!el.hasAttribute('data-en') || !el.hasAttribute('data-tr')) return;

        const isHtml =
          el.hasAttribute('data-i18n-html') ||
          /<[a-z][\s\S]*>/i.test(el.getAttribute('data-en') || '') ||
          /<[a-z][\s\S]*>/i.test(el.getAttribute('data-tr') || '');

        const maxH = Math.max(measureI18nText(el, 'data-en', isHtml), measureI18nText(el, 'data-tr', isHtml));
        if (maxH > 0) el.style.minHeight = maxH + 'px';
      });

      stabilizing = false;
    });
  }

  function debouncedStabilizeI18n() {
    if (stabilizeTimer) clearTimeout(stabilizeTimer);
    stabilizeTimer = setTimeout(stabilizeI18nHeights, 80);
  }

  function initLangToggle() {
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyLang(btn.getAttribute('data-lang-btn') || 'en');
      });
    });
  }

  function initProgressBar() {
    const bar = document.getElementById('progress-bar');
    if (!bar) return;

    window.addEventListener(
      'scroll',
      () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
        bar.style.width = pct + '%';
      },
      { passive: true }
    );
  }

  function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    elements.forEach((el) => observer.observe(el));
  }

  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const mobile = document.getElementById('nav-mobile');
    if (!toggle || !mobile) return;

    function setMenuOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      const labelEn = open ? 'Close menu' : 'Open menu';
      const labelTr = open ? 'Menüyü kapat' : 'Menüyü aç';
      const lang = localStorage.getItem(STORAGE_LANG) || 'en';
      toggle.setAttribute('aria-label', lang === 'tr' ? labelTr : labelEn);
      mobile.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', () => {
      setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    mobile.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        setMenuOpen(false);
      }
    });

    window.addEventListener('portfolio-lang', (e) => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      const labelEn = open ? 'Close menu' : 'Open menu';
      const labelTr = open ? 'Menüyü kapat' : 'Menüyü aç';
      toggle.setAttribute('aria-label', e.detail === 'tr' ? labelTr : labelEn);
    });
  }

  function initYear() {
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function init() {
    applyTheme(localStorage.getItem(STORAGE_THEME) || 'dark');
    applyLang(localStorage.getItem(STORAGE_LANG) || 'en');
    initLangToggle();
    initProgressBar();
    initReveal();
    initMobileNav();
    initYear();

    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    stabilizeI18nHeights();
    window.addEventListener('resize', debouncedStabilizeI18n, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(debouncedStabilizeI18n);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
