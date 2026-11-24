/* RONGXIN module: services. Keep this section isolated from other page modules. */
window.RongxinModules = window.RongxinModules || {};
window.RongxinModules.services = function(ctx) {
  const { A, icon, products, services, capabilities, filter, setFilter, shown, openInquiry, go } = ctx;
  return       A("section",{id:"services",class:"section services-section"},
        A("div",{class:"container-wide"},
          A("div",{class:"section-heading section-heading-light"},A("div",{},A("div",{class:"eyebrow eyebrow-light"},A("span",{class:"eyebrow-line"}),"WHAT WE DO"),A("h2",{},"From first brief to ",A("em",{},"final shipment."))),A("p",{},"Support at every step, from the first brief to the final shipment.")),
          A("div",{class:"services-grid"},...services.map((s,i)=>A("article",{class:"service-card"},A("div",{class:"service-icon"},icon(s[0],"w-6 h-6")),A("span",{class:"service-no"},"0"+(i+1)),A("h3",{},s[1]),A("p",{},s[2]),A("span",{class:"service-rule"}))))
        )
      );
};
