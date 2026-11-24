/* Rongxin navigation manager — public runtime, Vanilla JavaScript only. */
(function () {
  "use strict";
  const DEFAULTS = {
    home: true, about: true, products: true, contact: true,
    services: true, capabilities: true, network: true, quality: true,
    markets: true, sustainability: true, resources: true, faq: true, "why-us": true
  };
  const SECTION_IDS = Object.keys(DEFAULTS).filter((key) => key !== "home");

  function normalise(config) {
    const incoming = config && config.navigation && typeof config.navigation === "object"
      ? config.navigation : config;
    const result = { ...DEFAULTS };
    for (const key of Object.keys(DEFAULTS)) {
      if (key !== "home" && incoming && typeof incoming[key] === "boolean") result[key] = incoming[key];
    }
    result.home = true; // Home is permanently enabled.
    return result;
  }

  function applyNavigation(config) {
    const state = normalise(config);
    document.querySelectorAll("[data-nav-key]").forEach((link) => {
      const key = link.getAttribute("data-nav-key");
      link.hidden = state[key] === false;
      if (state[key] === false) link.setAttribute("aria-hidden", "true");
      else link.removeAttribute("aria-hidden");
    });
    for (const key of SECTION_IDS) {
      const section = document.getElementById(key);
      if (section) section.hidden = state[key] === false;
    }
    document.querySelectorAll(".desktop-nav").forEach((nav) => {
      nav.querySelectorAll(".nav-row").forEach((row) => {
        row.hidden = !row.querySelector("a:not([hidden])");
      });
    });
    document.documentElement.dataset.navigationReady = "true";
  }

  async function load() {
    try {
      const response = await fetch("./navigation.json", { cache: "no-store", credentials: "same-origin" });
      if (!response.ok) throw new Error("navigation.json unavailable");
      applyNavigation(await response.json());
    } catch (error) {
      // A missing config never blanks the navigation: all known items stay enabled.
      applyNavigation(DEFAULTS);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load, { once: true });
  else load();
})();
