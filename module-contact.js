/* RONGXIN module: contact. Keep this section isolated from other page modules. */
window.RongxinModules = window.RongxinModules || {};
window.RongxinModules.contact = function(ctx) {
  const { A, icon, products, services, capabilities, filter, setFilter, shown, openInquiry, go } = ctx;
  return       A("section",{id:"contact",class:"contact-section"},A("div",{class:"container-wide contact-grid"},
        A("div",{},A("div",{class:"eyebrow eyebrow-light"},A("span",{class:"eyebrow-line"}),"CONTACT"),A("h2",{},"Let’s talk ",A("em",{},"business.")),A("p",{class:"contact-intro"},"Have a product, a sourcing request or a partnership in mind? Write to our team."),
          A("div",{class:"contact-details"},A("div",{},icon("map-pin","w-5 h-5 text-gold"),A("span",{},A("strong",{},"Bangladesh Office"),A("small",{},"House No. 11 (1st Floor), Road No. 06, Sector 16/A, Uttara, Dhaka-1230, Bangladesh"))),A("div",{},icon("mail","w-5 h-5 text-gold"),A("span",{},A("strong",{},"Email"),A("a",{href:`mailto:${COMPANY_EMAIL}`},"info@rongxinbd.com"))),A("div",{},icon("globe","w-5 h-5 text-gold"),A("span",{},A("strong",{},"Website"),A("a",{href:"https://www.rongxinbd.com/",target:"_blank",rel:"noopener noreferrer",class:"contact-website-link"},"www.rongxinbd.com"))))
        ),
        A("div",{class:"contact-panel"},A("span",{class:"panel-kicker"},"BUSINESS ENQUIRIES"),A("h3",{},"Tell us what you’re looking for."),A("p",{},"Send a short brief with product type, quantity and target market. We’ll reply with next steps."),A("button",{class:"btn btn-gold w-full justify-center",onClick:()=>openInquiry()},"Write your inquiry",icon("arrow-up-right","w-4 h-4")),A("small",{},"Your email application will open with the inquiry details ready to send."))
      ));
};
