const A = (tag, props={}, ...children) => h(tag, props, ...children.flat());
const COMPANY_EMAIL = "info@rongxinbd.com";
const products = [
  {name:"Men’s Denim",sub:"Jeans · Jackets · Shirts",image:RongxinImages.productDenim,imageKey:"productDenim",tag:"DENIM"},
  {name:"Men’s Non-Denim",sub:"Chinos · Trousers · Casualwear",image:RongxinImages.productWoven,imageKey:"productWoven",tag:"WOVEN"},
  {name:"Denim & Woven Shirts",sub:"Long sleeve · Casual · Smart",image:RongxinImages.productShirts,imageKey:"productShirts",tag:"SHIRTS"},
  {name:"Knitwear",sub:"T-Shirts · Polo · Sweatshirts",image:RongxinImages.productKnit,imageKey:"productKnit",tag:"KNIT"},
  {name:"Ladies Collection",sub:"Denim · Shorts · Trousers",image:RongxinImages.productLadies,imageKey:"productLadies",tag:"LADIES"},
  {name:"Kids Collection",sub:"Everyday · Denim · Knit",image:RongxinImages.productKids,imageKey:"productKids",tag:"KIDS"}
];
const services = [
  ["globe-2","Global Sourcing","We match your product, price and timeline to suitable suppliers."],
  ["layers-3","Product Development","Tech packs, fabric choices, samples and fit approvals, handled together."],
  ["badge-check","Quality Assurance","Checks during and after production, set against your quality requirements."],
  ["factory","Factory Coordination","Production planning and regular updates, so nothing is a surprise."],
  ["package-check","Compliance Support","Help with the documents and responsible-sourcing information buyers ask for."],
  ["truck","Shipment Coordination","Packing, shipping documents and delivery follow-up."]
];
const capabilities = ["Product & supplier sourcing","Fabric, trims and accessories","Sample development & approvals","Merchandising & order follow-up","Inline and final quality coordination","Shipment & export documentation support"];
function icon(name, cls="icon-fallback") {
  const glyphs={"map-pin":"⌖","mail":"✉","globe":"◎","globe-2":"◎","layers-3":"▤","badge-check":"✓","factory":"▦","package-check":"✓","truck":"⇢","handshake":"↔","shield-check":"✓","leaf":"❧","arrow-up-right":"↗","arrow-right":"→","check-circle-2":"✓","target":"◎","network":"⌘","check-circle":"✓","x":"×","menu":"☰","send":"➤"};
  return A("span",{class:(cls||"")+" icon-fallback","aria-hidden":"true"},glyphs[name]||"•");
}

