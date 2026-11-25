/* RONGXIN module: hero. Keep this section isolated from other page modules. */
window.RongxinModules = window.RongxinModules || {};
window.RongxinModules.hero = function(ctx) {
  const { A, icon, products, services, capabilities, filter, setFilter, shown, openInquiry, go } = ctx;
  return       A("section",{id:"home",class:"hero-section"},
        A("div",{class:"hero-orb orb-one"}),A("div",{class:"hero-orb orb-two"}),
        A("div",{class:"container-wide hero-grid"},
          A("div",{class:"hero-copy"},
            A("div",{class:"eyebrow eyebrow-light"},A("span",{class:"eyebrow-line"}),"BANGLADESH · GLOBAL REACH"),
            A("h1",{},"Connecting ",A("em",{},"Ideas")," to ",A("em",{},"Apparel")," Excellence."),
            A("p",{class:"hero-lead"},"Your trusted partner in global apparel sourcing — bringing together product development, responsible manufacturing coordination and dependable delivery."),
            A("div",{class:"hero-points"},...["Sourcing & Development","Quality Assurance","Responsible Supply Chain"].map((x,i)=>A("span",{},icon(["handshake","shield-check","leaf"][i],"w-4 h-4 text-gold"),x))),
            A("div",{class:"hero-actions"},A("button",{class:"btn btn-gold",onClick:()=>go("products")},"Explore Products",icon("arrow-up-right","w-4 h-4")),A("button",{class:"btn btn-outline",onClick:()=>openInquiry()},"Talk to Our Team",icon("arrow-right","w-4 h-4"))),
            A("div",{class:"hero-note"},A("span",{class:"note-dot"}),"A sourcing partner built around clarity, quality and long-term relationships")
          ),
          A("div",{class:"hero-visual"},
            A("div",{class:"hero-photo-main image-loading", "data-image-key":"heroMain", "aria-label":"Apparel sourcing and garment production"}),
            A("div",{class:"hero-photo-small image-loading", "data-image-key":"heroDetail", "aria-label":"Textile and garment detail"}),
            A("div",{class:"hero-stamp"},A("span",{},"R"),A("small",{},"TRUSTED"),A("small",{},"SOURCING"))
          )
        ),
        A("div",{class:"hero-bottom container-wide"},A("span",{},"APPAREL SOURCING"),A("span",{},"PRODUCT DEVELOPMENT"),A("span",{},"QUALITY COORDINATION"),A("span",{},"GLOBAL TRADE"))
      );
};
