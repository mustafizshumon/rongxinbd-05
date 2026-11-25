/*
 * RONGXIN LOCAL-ONLY IMAGE SYSTEM
 * All active photographic assets are bundled in the website root as WebP files.
 * No remote image/CDN request is used. If a WebP is missing, a bundled local SVG
 * illustration is used as the fallback.
 */
(function () {
  const registry = {
    heroMain: { file: "hero-main.webp", fallback: "./img-hero-main.svg" },
    heroDetail: { file: "hero-detail.webp", fallback: "./img-hero-detail.svg" },
    aboutTeam: { file: "about-team.webp", fallback: "./img-about-team.svg" },
    capabilityProduction: { file: "capability-production.webp", fallback: "./img-capability-production.svg" },
    productDenim: { file: "product-denim.webp", fallback: "./img-product-denim.svg" },
    productWoven: { file: "product-woven.webp", fallback: "./img-product-woven.svg" },
    productShirts: { file: "product-shirts.webp", fallback: "./img-product-shirts.svg" },
    productKnit: { file: "product-knit.webp", fallback: "./img-product-knit.svg" },
    productLadies: { file: "product-ladies.webp", fallback: "./img-product-ladies.svg" },
    productKids: { file: "product-kids.webp", fallback: "./img-product-kids.svg" },
    supplyLogistics: { file: "supply-logistics.webp", fallback: "./img-capability-production.svg" },
    responsibleMaterials: { file: "responsible-materials.webp", fallback: "./img-hero-detail.svg" }
  };

  function probe(url) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  async function resolve(key) {
    const item = registry[key];
    if (!item) return null;
    const localPhoto = await probe("./" + item.file);
    if (localPhoto) return localPhoto;
    const localFallback = await probe(item.fallback);
    return localFallback || null;
  }

  window.RongxinImages = Object.fromEntries(
    Object.entries(registry).map(([key, item]) => [key, "./" + item.file])
  );
  window.RongxinImageFallbacks = Object.fromEntries(
    Object.entries(registry).map(([key, item]) => [key, item.fallback])
  );
  window.RongxinImageRegistry = registry;
  window.RongxinResolveImage = resolve;
})();
