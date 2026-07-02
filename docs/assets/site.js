'use strict';

(function () {
  const STORAGE_THEME = 'portfolio-theme';

  function applyTheme(mode) {
    const html = document.documentElement;
    html.classList.remove('dark', 'light');
    html.classList.add(mode);
    localStorage.setItem(STORAGE_THEME, mode);

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
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
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
  }

  function initYear() {
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function init() {
    applyTheme(localStorage.getItem(STORAGE_THEME) || 'dark');
    initProgressBar();
    initReveal();
    initMobileNav();
    initYear();

    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
