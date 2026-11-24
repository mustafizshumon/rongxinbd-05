/* RONGXIN module: faq. Keep this section isolated from other page modules. */
window.RongxinModules = window.RongxinModules || {};
window.RongxinModules.faq = function(ctx) {
  const { A, icon, products, services, capabilities, filter, setFilter, shown, openInquiry, go } = ctx;
  return       A("section",{id:"faq",class:"section module-section faq-section"},
        A("div",{class:"container-wide faq-layout"},
          A("div",{},
            A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"BUYER FAQ"),
            A("h2",{},"Good questions. ",A("em",{},"Clear answers.")),
            A("p",{class:"muted-copy"},"A few starting points for a sourcing conversation.")
          ),
          A("div",{class:"faq-list"},...[ 
            ["What product categories can I discuss?","Men’s, ladies’ and kids’ denim, woven apparel and knitwear categories are included in the current product range. Share your specific product brief for confirmation."],
            ["Can you support product development and sampling?","Product development and sample coordination can be discussed according to the product, technical requirements and project scope."],
            ["Can you coordinate quality checks?","Quality checkpoints and inspection arrangements can be discussed against buyer requirements and confirmed order arrangements."],
            ["What should I include in an RFQ?","Include product images, tech pack, material details, estimated quantity, target price, destination market and required delivery timeline where available."],
            ["How do I start a business inquiry?","Use the Inquiry / RFQ form and provide your business contact details and product requirements. The official company email must be configured before the form can send an email."]
          ].map(x=>A("details",{},A("summary",{},x[0]),A("p",{},x[1]))))
        )
      );
};
