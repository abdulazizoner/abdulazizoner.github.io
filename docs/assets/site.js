"use strict";
(() => {
  const html = document.documentElement;
  // Preferences are optional: the site also works when storage is unavailable.
  const read = (key, fallback) => {
    try {
      return localStorage.getItem(key) || fallback;
    } catch {
      return fallback;
    }
  };
  const save = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {}
  };
  const themeButton = document.getElementById("theme-btn");
  function theme(mode) {
    mode = mode === "dark" ? "dark" : "light";
    html.classList.remove("dark", "light");
    html.classList.add(mode);
    save("portfolio-theme", mode);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", mode === "dark" ? "#14202c" : "#fafaf8");
    document
      .getElementById("icon-sun")
      ?.classList.toggle("hidden", mode !== "dark");
    document
      .getElementById("icon-moon")
      ?.classList.toggle("hidden", mode === "dark");
  }
  const toggle = document.getElementById("nav-toggle");
  const mobile = document.getElementById("nav-mobile");
  function menu(open) {
    if (!toggle || !mobile) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      html.lang === "tr"
        ? open
          ? "Menüyü kapat"
          : "Menüyü aç"
        : open
          ? "Close menu"
          : "Open menu",
    );
    mobile.classList.toggle("open", open);
  }
  function language(lang) {
    lang = lang === "tr" ? "tr" : "en";
    html.lang = lang;
    save("portfolio-lang", lang);
    document.querySelectorAll("[data-en]").forEach((el) => {
      const text = el.getAttribute("data-" + lang);
      if (text === null) return;
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = text;
      else el.textContent = text;
    });
    document.querySelectorAll("[data-aria-en]").forEach((el) => {
      const text = el.getAttribute("data-aria-" + lang);
      if (text !== null) el.setAttribute("aria-label", text);
    });
    document.querySelectorAll("[data-lang-btn]").forEach((el) => {
      const active = el.getAttribute("data-lang-btn") === lang;
      el.classList.toggle("active", active);
      el.setAttribute("aria-pressed", String(active));
    });
    if (document.body.dataset.page === "home") {
      document.title =
        lang === "tr"
          ? "Abdülaziz Öner — Yapay Zeka ve Veri Mühendisliği Öğrencisi"
          : "Abdülaziz Öner — AI & Data Engineering Student";
    }
    menu(toggle?.getAttribute("aria-expanded") === "true");
  }
  theme(read("portfolio-theme", "light"));
  language(read("portfolio-lang", "en"));
  themeButton?.addEventListener("click", () =>
    theme(html.classList.contains("dark") ? "light" : "dark"),
  );
  document
    .querySelectorAll("[data-lang-btn]")
    .forEach((el) =>
      el.addEventListener("click", () =>
        language(el.getAttribute("data-lang-btn")),
      ),
    );
  toggle?.addEventListener("click", () =>
    menu(toggle.getAttribute("aria-expanded") !== "true"),
  );
  mobile
    ?.querySelectorAll("a")
    .forEach((el) => el.addEventListener("click", () => menu(false)));
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle?.getAttribute("aria-expanded") === "true"
    ) {
      menu(false);
      toggle.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) menu(false);
  });
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
