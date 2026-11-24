/* RONGXIN module: products. Keep this section isolated from other page modules. */
window.RongxinModules = window.RongxinModules || {};
window.RongxinModules.products = function(ctx) {
  const { A, icon, products, services, capabilities, shown, openInquiry, go } = ctx;
  return       A("section",{id:"products",class:"section products-section"},
        A("div",{class:"container-wide"},
          A("div",{class:"section-heading"},A("div",{},A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"OUR PRODUCT RANGE"),A("h2",{},"Made for every ",A("em",{},"collection."))),A("p",{},"Tell us your market, price point and fabric. We develop the range around your brief.")),
          A("div",{class:"product-grid"},...shown().map((p,i)=>A("article",{class:"product-card"},
            A("div",{class:"product-image"},A("img",{src:RongxinImageFallbacks[p.imageKey],"data-image-key":p.imageKey,alt:p.name,loading:"lazy"}),A("span",{class:"product-tag"},p.tag),A("button",{class:"product-arrow","aria-label":"Request details for "+p.name,onClick:()=>openInquiry(p.name)},icon("arrow-up-right","w-5 h-5"))),
            A("div",{class:"product-info"},A("div",{},A("h3",{},p.name),A("p",{},p.sub)),A("span",{class:"product-index"},"0"+(products.indexOf(p)+1))
          ))))
        )
      );
};
