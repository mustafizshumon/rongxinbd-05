/* Rongxin adaptive header controller — Vanilla JavaScript, no dependencies. */
(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const wrap = header?.querySelector('.nav-wrap');
  const nav = header?.querySelector('.desktop-nav');
  const actions = header?.querySelector('.nav-actions');
  const toggle = header?.querySelector('.menu-toggle');
  if (!header || !wrap || !nav || !actions || !toggle) return;

  let frame = 0;
  let lastCompact = null;
  const mobileQuery = window.matchMedia('(max-width: 640px)');

  function naturalNavWidth() {
    header.classList.add('is-measuring');
    const width = nav.scrollWidth;
    header.classList.remove('is-measuring');
    return width;
  }

  function setMenu(open) {
    const shouldOpen = Boolean(open) && (header.classList.contains('nav-compact') || mobileQuery.matches);
    nav.classList.toggle('is-open', shouldOpen);
    toggle.setAttribute('aria-expanded', String(shouldOpen));
    toggle.setAttribute('aria-label', shouldOpen ? 'Close navigation' : 'Open navigation');
    toggle.innerHTML = shouldOpen
      ? '<i data-lucide="x" aria-hidden="true"></i>'
      : '<i data-lucide="menu" aria-hidden="true"></i>';
    if (window.lucide?.createIcons) window.lucide.createIcons({ root: toggle });
  }

  function measure() {
    frame = 0;
    const navWidth = naturalNavWidth();
    const actionWidth = actions.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(wrap).columnGap || getComputedStyle(wrap).gap) || 0;
    const required = navWidth + actionWidth + gap + 4;
    const compact = mobileQuery.matches || required > wrap.clientWidth;
    if (compact !== lastCompact) {
      lastCompact = compact;
      header.classList.toggle('nav-compact', compact);
      if (!compact) setMenu(false);
      else if (!nav.classList.contains('is-open')) setMenu(false);
    }
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }

  function scheduleMeasure() {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(measure);
  }

  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('pointerdown', (event) => {
    if (nav.classList.contains('is-open') && !header.contains(event.target)) setMenu(false);
  });
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }, { passive: true });
  window.addEventListener('resize', scheduleMeasure, { passive: true });
  window.addEventListener('orientationchange', scheduleMeasure, { passive: true });
  mobileQuery.addEventListener?.('change', scheduleMeasure);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(wrap);
    observer.observe(document.documentElement);
  }
  const navObserver = new MutationObserver(scheduleMeasure);
  navObserver.observe(nav, { subtree: true, attributes: true, attributeFilter: ['hidden'] });
  if (document.fonts?.ready) document.fonts.ready.then(scheduleMeasure);
  scheduleMeasure();
})();
