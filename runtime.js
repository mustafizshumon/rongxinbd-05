/* Local compatibility runtime: no SolidJS/CDN imports required to render this static corporate site. */
const __signalValues=[];
let __signalCursor=0, __root=null, __component=null, __rendering=false, __mounted=false;
const __mountCallbacks=[];
function createSignal(initial){
  const index=__signalCursor++;
  if(!(index in __signalValues)) __signalValues[index]=initial;
  const getter=()=>__signalValues[index];
  const setter=(next)=>{__signalValues[index]=typeof next==="function"?next(__signalValues[index]):next; if(!__rendering) __rerender();};
  return [getter,setter];
}
function onMount(fn){__mountCallbacks.push(fn);}
function Show(props){return props.when?props.children:null;}
function h(tag,props={},...children){return {__vnode:true,tag,props:props||{},children:children.flat()};}
function __value(v){return typeof v==="function"?v():v;}
function __append(parent,node){
  if(node===null||node===undefined||node===false||node===true)return;
  if(Array.isArray(node)){node.forEach(n=>__append(parent,n));return;}
  if(typeof node==="string"||typeof node==="number"){parent.appendChild(document.createTextNode(String(node)));return;}
  if(!node||!node.__vnode)return;
  if(node.tag===Show){if(__value(node.props.when)) __append(parent,node.children);return;}
  if(typeof node.tag==="function"){__append(parent,node.tag({...node.props,children:node.children}));return;}
  const el=document.createElement(node.tag);
  for(const [raw,value] of Object.entries(node.props||{})){
    if(raw==="children"||raw==="ref"||value===undefined||value===null)continue;
    const v=(raw.startsWith("on") && typeof value==="function") ? value : __value(value);
    if(raw.startsWith("on")&&typeof v==="function"){
      el.addEventListener(raw.slice(2).toLowerCase(),v);
    }else if(raw==="className"||raw==="class"){
      el.setAttribute("class",v||"");
    }else if(raw==="value" && (node.tag==="input"||node.tag==="textarea"||node.tag==="select")){
      el.value=v==null?"":v;
    }else if(raw==="disabled"||raw==="required"||raw==="multiple"||raw==="checked"){
      if(v)el.setAttribute(raw,"");
    }else if(raw==="htmlFor"){
      el.setAttribute("for",v);
    }else if(raw==="tabIndex"){
      el.setAttribute("tabindex",v);
    }else if(raw==="style"&&typeof v==="object"){
      for(const [k,val] of Object.entries(v)){el.style.setProperty(k.replace(/[A-Z]/g,m=>"-"+m.toLowerCase()),val);}
    }else if(typeof v==="object" && raw!=="dataset"){
      try{el.setAttribute(raw,JSON.stringify(v));}catch{}
    }else{
      el.setAttribute(raw,String(v));
    }
  }
  node.children.forEach(child=>__append(el,child));
  parent.appendChild(el);
}
function __renderNow(){
  if(!__root||!__component)return;
  const active=document.activeElement;
  let activeIndex=-1, selection=null;
  if(active&&__root.contains(active)&&(active.matches("input,textarea,select"))){
    activeIndex=[...__root.querySelectorAll("input,textarea,select")].indexOf(active);
    try{selection=[active.selectionStart,active.selectionEnd];}catch{}
  }
  __rendering=true; __signalCursor=0; __root.replaceChildren();
  try{__append(__root,__component());}catch(err){
    console.error("Rongxin render error:",err);
    const panel=document.createElement("div");panel.className="runtime-error";
    panel.textContent="The website could not render. Please refresh and check the browser console.";
    __root.appendChild(panel);
  }
  __rendering=false;
  if(activeIndex>=0){const fields=__root.querySelectorAll("input,textarea,select");const target=fields[activeIndex];if(target){target.focus({preventScroll:true});if(selection&&target.setSelectionRange){try{target.setSelectionRange(...selection);}catch{}}}}
  if(!__mounted){__mounted=true;__mountCallbacks.splice(0).forEach(fn=>{try{fn();}catch(e){console.warn(e);}});}
}
function __rerender(){__renderNow();}
function render(component,root){__component=component;__root=root;__renderNow();return ()=>{__root.replaceChildren();};}



