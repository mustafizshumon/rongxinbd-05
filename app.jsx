// JSX-oriented source entry: this project uses the lightweight A()/h() view syntax for its no-build static deployment.
function App(){
  const [menu,setMenu]=createSignal(false), [enabledCategories,setEnabledCategories]=createSignal({DENIM:true,WOVEN:true,SHIRTS:true,KNIT:true,LADIES:true,KIDS:true}), [modal,setModal]=createSignal(false), [sent,setSent]=createSignal(false);
  const [form,setForm]=createSignal({name:"",email:"",company:"",product:"",message:""});
  const shown=()=>products.filter(p=>enabledCategories()[p.tag] !== false);
  const update=(key,value)=>setForm(v=>({...v,[key]:value}));
  const go=(id)=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMenu(false)};
  onMount(()=>{
    if(window.lucide)window.lucide.createIcons();
    fetch("./product-categories.json", {cache:"no-store"}).then(r=>{if(!r.ok)throw new Error("Category settings unavailable");return r.json();}).then(data=>{
      if(data && data.schemaVersion===1 && data.categories && typeof data.categories==="object"){
        const next={...enabledCategories()};
        for(const key of Object.keys(next)) if(typeof data.categories[key]==="boolean") next[key]=data.categories[key];
        setEnabledCategories(next);
      }
    }).catch(()=>{/* Safe fallback: all product categories remain visible. */});
  });
  const openInquiry=(product="")=>{update("product",product);setSent(false);setModal(true)};
  const submit=(e)=>{e.preventDefault();if(!COMPANY_EMAIL){alert("The inquiry email is not configured. Please contact info@rongxinbd.com.");return;}const f=form();const body=encodeURIComponent(`Name: ${f.name}\nCompany: ${f.company}\nEmail: ${f.email}\nProduct: ${f.product}\n\n${f.message}`);window.location.href=`mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent("Business Inquiry — Rongxin International")}&body=${body}`;setSent(true)};
  const ctx = { A, icon, products, services, capabilities, shown, openInquiry, go };
  return A("div",{class:"min-h-screen overflow-hidden"},
    A("div",{class:"topline"},A("div",{class:"container-wide flex justify-between items-center py-2 text-xs text-white/80"},
      A("span",{class:"flex items-center gap-2"},icon("map-pin","w-3.5 h-3.5 text-gold"),"Uttara, Dhaka, Bangladesh"),
      A("div",{class:"hidden sm:flex gap-5"},A("a",{href:`mailto:${COMPANY_EMAIL}`},"info@rongxinbd.com"),A("span",{},"Global Apparel Sourcing"))
    )),
    A("header",{class:"site-header sticky top-0 z-40 bg-white/95 backdrop-blur-xl"},
      A("div",{class:"container-wide nav-wrap"},
        A("a",{href:"#home",class:"brand",onClick:e=>{e.preventDefault();go("home")}},
          A("img",{src:"./rongxin-mark.png",alt:"Rongxin emblem",class:"brand-mark"}),
          A("span",{class:"brand-name"},A("strong",{},"RONGXIN"),A("small",{},"INTERNATIONAL TRADING"),A("small",{},"COMPANY LIMITED"))
        ),
        A("nav",{class:()=>`desktop-nav ${menu()?"is-open":""}`},...["Home","About","Products","Services","Capabilities","Network","Quality","Markets","Resources","Why Us","Contact"].map((n,i)=>{const ids=["home","about","products","services","capabilities","network","quality","markets","resources","why-us","contact"];return A("a",{href:"#"+ids[i],class:i===0?"active":"",onClick:e=>{e.preventDefault();go(ids[i])}},n)})),
        A("div",{class:"nav-actions"},A("button",{class:"btn btn-primary nav-cta",onClick:()=>openInquiry()},icon("mail","w-4 h-4")," Inquiry / RFQ"),A("button",{class:"menu-toggle", "aria-label":"Toggle navigation",onClick:()=>setMenu(!menu())},icon(menu()?"x":"menu","w-6 h-6")))
      )
    ),
    A("main",{},
      RongxinModules.hero(ctx),
      RongxinModules.trust_strip(ctx),
      RongxinModules.about(ctx),
      RongxinModules.products(ctx),
      RongxinModules.services(ctx),
      RongxinModules.capabilities(ctx),

      RongxinModules.network(ctx),
      RongxinModules.quality(ctx),
      RongxinModules.markets(ctx),
      RongxinModules.sustainability(ctx),
      RongxinModules.resources(ctx),
      RongxinModules.faq(ctx),
      RongxinModules.why_us(ctx),
      RongxinModules.cta_section(ctx),
      RongxinModules.contact(ctx)
    ),
    A("footer",{class:"footer"},A("div",{class:"container-wide footer-main"},
      A("a",{href:"#home",class:"brand footer-brand"},A("img",{src:"./rongxin-mark.png",alt:"Rongxin emblem",class:"brand-mark"}),A("span",{class:"brand-name"},A("strong",{},"RONGXIN"),A("small",{},"INTERNATIONAL TRADING"),A("small",{},"COMPANY LIMITED"))),
      A("p",{},"Connecting buyers, products and responsible sourcing opportunities."),
      A("div",{class:"footer-links"},A("a",{href:"#about"},"About"),A("a",{href:"#products"},"Products"),A("a",{href:"#services"},"Services"),A("a",{href:"#network"},"Network"),A("a",{href:"#quality"},"Quality"),A("a",{href:"#resources"},"Resources"),A("a",{href:"#contact"},"Contact"))
    ),A("div",{class:"container-wide footer-bottom"},A("span",{},"© "+new Date().getFullYear()+" Rongxin International Trading Company Limited. All rights reserved."),A("span",{},"Bangladesh · Global Trade"))
    ),
    A(Show,{when:()=>modal()},A("div",{class:"modal-backdrop",onClick:e=>{if(e.target===e.currentTarget)setModal(false)}},
      A("div",{class:"inquiry-modal",role:"dialog","aria-modal":"true","aria-labelledby":"inquiry-title"},
        A("button",{class:"modal-close","aria-label":"Close inquiry form",onClick:()=>setModal(false)},icon("x","w-5 h-5")),
        A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"START A PROJECT"),
        A("h2",{id:"inquiry-title"},"Business ",A("em",{},"Inquiry")),
        A("p",{},"Tell us a little about your requirement. Your email app will open with the details ready to send."),
        A("form",{onSubmit:submit,class:"inquiry-form"},
          A("label",{},"Your name",A("input",{required:true,value:form().name,onInput:e=>update("name",e.currentTarget.value),placeholder:"Full name"})),
          A("label",{},"Business email",A("input",{required:true,type:"email",value:form().email,onInput:e=>update("email",e.currentTarget.value),placeholder:"name@company.com"})),
          A("label",{},"Company",A("input",{value:form().company,onInput:e=>update("company",e.currentTarget.value),placeholder:"Company name"})),
          A("label",{},"Product / Category",A("input",{value:form().product,onInput:e=>update("product",e.currentTarget.value),placeholder:"e.g. Men's denim"})),
          A("label",{class:"full-field"},"Your requirement",A("textarea",{required:true,rows:4,value:form().message,onInput:e=>update("message",e.currentTarget.value),placeholder:"Product details, quantity, target market, timeline..."})),
          A("button",{class:"btn btn-primary full-field justify-center",type:"submit"},"Continue to Email",icon("send","w-4 h-4"))
        ),
        A("small",{class:"modal-footnote"},"No online data is stored by this demo form.")
      )
    ))
  );
}
render(App,document.getElementById("app"));
