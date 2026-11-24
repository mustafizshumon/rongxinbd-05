/* RONGXIN module: cta_section. Keep this section isolated from other page modules. */
window.RongxinModules = window.RongxinModules || {};
window.RongxinModules.cta_section = function(ctx) {
  const { A, icon, products, services, capabilities, filter, setFilter, shown, openInquiry, go } = ctx;
  return       A("section",{class:"cta-section"},A("div",{class:"container-wide cta-inner"},A("div",{},A("span",{class:"cta-kicker"},"LET’S START A CONVERSATION"),A("h2",{},"Have a product in mind? ",A("em",{},"Let’s make it happen.")),A("p",{},"Share your requirements and our team will get back to you.")),A("button",{class:"btn btn-gold",onClick:()=>openInquiry()},"Send an Inquiry",icon("arrow-up-right","w-4 h-4"))));
};
