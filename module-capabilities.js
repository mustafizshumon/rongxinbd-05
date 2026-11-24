/* RONGXIN module: capabilities. Keep this section isolated from other page modules. */
window.RongxinModules = window.RongxinModules || {};
window.RongxinModules.capabilities = function(ctx) {
  const { A, icon, products, services, capabilities, filter, setFilter, shown, openInquiry, go } = ctx;
  return       A("section",{id:"capabilities",class:"section capabilities-section"},
        A("div",{class:"container-wide capabilities-grid"},
          A("div",{},A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"OUR CAPABILITIES"),A("h2",{},"One coordinated team. ",A("em",{},"Many moving parts.")),A("p",{class:"muted-copy"},"We bring structure to the details that matter in apparel sourcing, keeping product requirements, suppliers and timelines connected."),
            A("ul",{class:"capability-list"},...capabilities.map(c=>A("li",{},icon("check-circle-2","w-5 h-5 text-gold"),c))),
            A("button",{class:"btn btn-dark",onClick:()=>openInquiry()},"Discuss Your Requirements",icon("arrow-right","w-4 h-4"))
          ),
          A("div",{class:"capability-image"},A("img",{src:RongxinImageFallbacks.capabilityProduction,"data-image-key":"capabilityProduction",alt:"Garment production and textile work",loading:"lazy"}),A("div",{class:"image-note"},A("strong",{},"DETAILS MATTER"),A("span",{},"Every order deserves attention"))
          )
        )
      );
};
