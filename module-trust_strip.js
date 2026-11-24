/* RONGXIN module: trust_strip. Keep this section isolated from other page modules. */
window.RongxinModules = window.RongxinModules || {};
window.RongxinModules.trust_strip = function(ctx) {
  const { A, icon, products, services, capabilities, filter, setFilter, shown, openInquiry, go } = ctx;
  return       A("section",{class:"trust-strip"},A("div",{class:"container-wide trust-inner"},
        A("p",{},"A connected sourcing approach for buyers who value"),
        A("div",{class:"trust-items"},...["Clear Communication","Consistent Quality","Reliable Follow-up","Responsible Practices"].map((t,i)=>A("span",{},icon(["messages-square","badge-check","clipboard-check","sprout"][i],"w-4 h-4"),t)))
      ));
};
