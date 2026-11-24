/*
 * RONGXIN resilient image system
 * Priority: root-level real photo -> CDN -> designed local SVG fallback.
 * Supported root photo names (examples):
 *   hero-main.webp / hero-main.jpg / img-hero-main.png
 *   product-denim.webp / product-denim.jpg / img-product-denim.png
 * Existing SVG artwork is always retained as the final offline fallback.
 */
(function () {
  const cdn = (id, width = 1400, quality = 84) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`;

  const registry = {
    heroMain: {
      local: ["hero-main.webp","hero-main.jpg","hero-main.jpeg","hero-main.png","hero-main.svg","img-hero-main.webp","img-hero-main.jpg","img-hero-main.png"],
      cdn: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1400&q=90",
      fallback: "./img-hero-main.svg"
    },
    heroDetail: {
      local: ["hero-detail.webp","hero-detail.jpg","hero-detail.jpeg","hero-detail.png","hero-detail.svg","img-hero-detail.webp","img-hero-detail.jpg","img-hero-detail.png"],
      cdn: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=700&q=85",
      fallback: "./img-hero-detail.svg"
    },
    aboutTeam: {
      local: ["about-team.webp","about-team.jpg","about-team.jpeg","about-team.png","about-team.svg","img-about-team.webp","img-about-team.jpg","img-about-team.png"],
      cdn: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85",
      fallback: "./img-about-team.svg"
    },
    capabilityProduction: {
      local: ["capability-production.webp","capability-production.jpg","capability-production.jpeg","capability-production.png","capability-production.svg","img-capability-production.webp","img-capability-production.jpg","img-capability-production.png"],
      cdn: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1200&q=85",
      fallback: "./img-capability-production.svg"
    },
    productDenim: {
      local: ["product-denim.webp","product-denim.jpg","product-denim.jpeg","product-denim.png","product-denim.svg","img-product-denim.webp","img-product-denim.jpg","img-product-denim.png"],
      cdn: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
      fallback: "./img-product-denim.svg"
    },
    productWoven: {
      local: ["product-woven.webp","product-woven.jpg","product-woven.jpeg","product-woven.png","product-woven.svg","img-product-woven.webp","img-product-woven.jpg","img-product-woven.png"],
      cdn: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",
      fallback: "./img-product-woven.svg"
    },
    productShirts: {
      local: ["product-shirts.webp","product-shirts.jpg","product-shirts.jpeg","product-shirts.png","product-shirts.svg","img-product-shirts.webp","img-product-shirts.jpg","img-product-shirts.png"],
      cdn: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
      fallback: "./img-product-shirts.svg"
    },
    productKnit: {
      local: ["product-knit.webp","product-knit.jpg","product-knit.jpeg","product-knit.png","product-knit.svg","img-product-knit.webp","img-product-knit.jpg","img-product-knit.png"],
      cdn: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
      fallback: "./img-product-knit.svg"
    },
    productLadies: {
      local: ["product-ladies.webp","product-ladies.jpg","product-ladies.jpeg","product-ladies.png","product-ladies.svg","img-product-ladies.webp","img-product-ladies.jpg","img-product-ladies.png"],
      cdn: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
      fallback: "./img-product-ladies.svg"
    },
    productKids: {
      local: ["product-kids.webp","product-kids.jpg","product-kids.jpeg","product-kids.png","product-kids.svg","img-product-kids.webp","img-product-kids.jpg","img-product-kids.png"],
      cdn: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=85",
      fallback: "./img-product-kids.svg"
    },
    supplyLogistics: {
      local: ["supply-logistics.webp","supply-logistics.jpg","supply-logistics.jpeg","supply-logistics.png"],
      cdn: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
      fallback: "./img-capability-production.svg"
    },
    responsibleMaterials: {
      local: ["responsible-materials.webp","responsible-materials.jpg","responsible-materials.jpeg","responsible-materials.png"],
      cdn: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1000&q=85",
      fallback: "./img-hero-detail.svg"
    }
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
    for (const path of item.local) {
      // Root-level assets are preferred for the simple upload workflow.
      const found = await probe("./" + path);
      if (found) return found;
      // Also support an images/ folder without requiring code changes.
      const nested = await probe("./images/" + path);
      if (nested) return nested;
    }
    const remote = await probe(item.cdn);
    return remote || item.fallback;
  }

  window.RongxinImages = Object.fromEntries(
    Object.entries(registry).map(([key, item]) => [key, item.cdn])
  );
  window.RongxinImageFallbacks = Object.fromEntries(
    Object.entries(registry).map(([key, item]) => [key, item.fallback])
  );
  window.RongxinImageRegistry = registry;
  window.RongxinResolveImage = resolve;
})();
