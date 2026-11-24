/* RONGXIN module: about. Keep this section isolated from other page modules. */
window.RongxinModules = window.RongxinModules || {};
window.RongxinModules.about = function(ctx) {
  const { A, icon, products, services, capabilities, filter, setFilter, shown, openInquiry, go } = ctx;
  return       A("section",{id:"about",class:"section section-about"},
        A("div",{class:"container-wide about-grid"},
          A("div",{class:"about-visual"},
            A("img",{src:RongxinImageFallbacks.aboutTeam,"data-image-key":"aboutTeam",alt:"Professional team collaborating",loading:"lazy"}),
            A("div",{class:"about-caption"},A("span",{class:"caption-icon"},icon("compass","w-5 h-5")),A("div",{},A("strong",{},"Partnership-led"),A("small",{},"Sourcing with purpose")))
          ),
          A("div",{class:"about-copy"},
            A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"WHO WE ARE"),
            A("h2",{},"A thoughtful link between ",A("em",{},"buyers")," and ",A("em",{},"manufacturing.")),
            A("p",{},"Rongxin International Trading Company Limited works with apparel buyers from the first brief to the final shipment. We confirm requirements, develop samples, follow production, and coordinate shipping, so you deal with one clear point of contact."),
            A("p",{},"Our office is in Uttara, Dhaka. We keep communication plain and regular, so buyers always know where an order stands."),
            A("div",{class:"about-values"},A("div",{},icon("target","text-gold"),A("strong",{},"Buyer-focused"),A("small",{},"Requirements first")),A("div",{},icon("network","text-gold"),A("strong",{},"Connected"),A("small",{},"Supplier coordination")),A("div",{},icon("check-circle","text-gold"),A("strong",{},"Accountable"),A("small",{},"Clear follow-through")))
          )
        )
      );
};
