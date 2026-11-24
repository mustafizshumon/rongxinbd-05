/* RONGXIN module: why_us. Keep this section isolated from other page modules. */
window.RongxinModules = window.RongxinModules || {};
window.RongxinModules.why_us = function(ctx) {
  const { A, icon, products, services, capabilities, filter, setFilter, shown, openInquiry, go } = ctx;
  return       A("section",{id:"why-us",class:"why-section"},
        A("div",{class:"container-wide why-inner"},
          A("div",{class:"why-heading"},A("div",{class:"eyebrow eyebrow-light"},A("span",{class:"eyebrow-line"}),"WHY RONGXIN"),A("h2",{},"Built on the things that ",A("em",{},"build trust.")),A("p",{},"A practical, relationship-driven approach to international apparel trading.")),
          A("div",{class:"why-cards"},...[
            ["01","Clarity at every step","Open communication around product details, timelines and expectations."],
            ["02","Quality-minded execution","Attention to specifications, approvals and quality checkpoints."],
            ["03","A connected network","Coordinated sourcing and manufacturing relationships across markets."],
            ["04","Long-term partnership","A collaborative mindset focused on repeat business and shared success."]
          ].map(x=>A("article",{class:"why-card"},A("span",{},x[0]),A("h3",{},x[1]),A("p",{},x[2]))))
        )
      );
};
