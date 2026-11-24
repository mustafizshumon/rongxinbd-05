/* RONGXIN module: markets. Keep this section isolated from other page modules. */
window.RongxinModules = window.RongxinModules || {};
window.RongxinModules.markets = function(ctx) {
  const { A, icon, products, services, capabilities, filter, setFilter, shown, openInquiry, go } = ctx;
  return       A("section",{id:"markets",class:"section module-section markets-section"},A("div",{class:"container-wide"},A("div",{class:"section-heading"},A("div",{},A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"GLOBAL BUSINESS"),A("h2",{},"Made in Bangladesh. ",A("em",{},"Connected to markets."))),A("p",{},"Rongxin welcomes apparel sourcing conversations from international buyers and brands. Market-specific requirements are reviewed project by project.")),A("div",{class:"market-grid"},...[ ["EU","Europe","Buyer and product requirements"],["UK","United Kingdom","Product and compliance brief"],["US","North America","Specification-led sourcing"],["GL","Other Markets","Discuss your destination market"] ].map(x=>A("div",{},A("span",{},x[0]),A("strong",{},x[1]),A("small",{},x[2]))))));
};
