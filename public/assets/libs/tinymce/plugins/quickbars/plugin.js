!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager");let t=(e,t,r)=>{var o;return!!r(e,t.prototype)||(null===(o=e.constructor)||void 0===o?void 0:o.name)===t.name},r=e=>{let r=typeof e;return null===e?"null":"object"===r&&Array.isArray(e)?"array":"object"===r&&t(e,String,(e,t)=>t.isPrototypeOf(e))?"string":r},o=e=>t=>typeof t===e,i=e=>"string"===r(e),n=o("boolean"),l=e=>null==e,a=e=>!l(e),s=o("function"),u=e=>t=>t.options.get(e),c=e=>{let t=e.options.register,r=e=>t=>{let r=n(t)||i(t);return r?n(t)?{value:t?e:"",valid:r}:{value:t.trim(),valid:r}:{valid:!1,message:"Must be a boolean or string."}},o="bold italic | quicklink h2 h3 blockquote";t("quickbars_selection_toolbar",{processor:r(o),default:o});let l="quickimage quicktable";t("quickbars_insert_toolbar",{processor:r(l),default:l});let a="alignleft aligncenter alignright";t("quickbars_image_toolbar",{processor:r(a),default:a})},d=u("quickbars_selection_toolbar"),m=u("quickbars_insert_toolbar"),h=u("quickbars_image_toolbar"),g=0,f=e=>{let t=new Date,r=t.getTime();return e+"_"+Math.floor(1e9*Math.random())+ ++g+String(r)},b=(e,t,r)=>{e.execCommand("mceInsertTable",!1,{rows:r,columns:t})},p=(e,t,r)=>{let o=e.editorUpload.blobCache,i=o.create(f("mceu"),r,t);o.add(i),e.insertContent(e.dom.createHTML("img",{src:i.blobUri()}))},v=e=>new Promise(t=>{let r=new FileReader;r.onloadend=()=>{t(r.result.split(",")[1])},r.readAsDataURL(e)});var y=tinymce.util.Tools.resolve("tinymce.util.Delay");let k=e=>new Promise(t=>{let r=!1,o=document.createElement("input");o.type="file",o.accept="image/*",o.style.position="fixed",o.style.left="0",o.style.top="0",o.style.opacity="0.001",document.body.appendChild(o);let i=e=>{var i;r||(null===(i=o.parentNode)||void 0===i||i.removeChild(o),r=!0,t(e))},n=e=>{i(Array.prototype.slice.call(e.target.files))};o.addEventListener("input",n),o.addEventListener("change",n);let l=t=>{let o=()=>{i([])};r||("focusin"===t.type?y.setEditorTimeout(e,o,1e3):o()),e.off("focusin remove",l)};e.on("focusin remove",l),o.click()}),w=e=>{e.ui.registry.addButton("quickimage",{icon:"image",tooltip:"Insert image",onAction:()=>{k(e).then(t=>{if(t.length>0){let r=t[0];v(r).then(t=>{p(e,t,r)})}})}}),e.ui.registry.addButton("quicktable",{icon:"table",tooltip:"Insert table",onAction:()=>{b(e,2,2)}})},T=()=>!1;class N{constructor(e,t){this.tag=e,this.value=t}static some(e){return new N(!0,e)}static none(){return N.singletonNone}fold(e,t){return this.tag?t(this.value):e()}isSome(){return this.tag}isNone(){return!this.tag}map(e){return this.tag?N.some(e(this.value)):N.none()}bind(e){return this.tag?e(this.value):N.none()}exists(e){return this.tag&&e(this.value)}forall(e){return!this.tag||e(this.value)}filter(e){return!this.tag||e(this.value)?this:N.none()}getOr(e){return this.tag?this.value:e}or(e){return this.tag?this:e}getOrThunk(e){return this.tag?this.value:e()}orThunk(e){return this.tag?this:e()}getOrDie(e){if(this.tag)return this.value;throw Error(null!=e?e:"Called getOrDie on None")}static from(e){return a(e)?N.some(e):N.none()}getOrNull(){return this.tag?this.value:null}getOrUndefined(){return this.value}each(e){this.tag&&e(this.value)}toArray(){return this.tag?[this.value]:[]}toString(){return this.tag?`some(${this.value})`:"none()"}}N.singletonNone=new N(!1),"undefined"!=typeof window?window:Function("return this;")();let E=e=>{let t=e.dom.nodeName;return t.toLowerCase()},q=(e,t)=>{let r=e.dom;return!!r&&!!r.hasAttribute&&r.hasAttribute(t)};var M=(e,t,r,o,i)=>e(r,o)?N.some(r):s(i)&&i(r)?N.none():t(r,o,i);let _=e=>{if(null==e)throw Error("Node cannot be null or undefined");return{dom:e}},C={fromHtml:(e,t)=>{let r=(t||document).createElement("div");if(r.innerHTML=e,!r.hasChildNodes()||r.childNodes.length>1){let t="HTML does not have a single root node";throw console.error(t,e),Error(t)}return _(r.childNodes[0])},fromTag:(e,t)=>{let r=(t||document).createElement(e);return _(r)},fromText:(e,t)=>{let r=(t||document).createTextNode(e);return _(r)},fromDom:_,fromPoint:(e,t,r)=>N.from(e.dom.elementFromPoint(t,r)).map(_)},S=(e,t)=>{let r=e.dom;if(1!==r.nodeType)return!1;if(void 0!==r.matches)return r.matches(t);if(void 0!==r.msMatchesSelector)return r.msMatchesSelector(t);if(void 0!==r.webkitMatchesSelector)return r.webkitMatchesSelector(t);if(void 0!==r.mozMatchesSelector)return r.mozMatchesSelector(t);throw Error("Browser lacks native selectors")},x=(e,t,r)=>{let o=e.dom,i=s(r)?r:T;for(;o.parentNode;){o=o.parentNode;let e=C.fromDom(o);if(t(e))return N.some(e);if(i(e))break}return N.none()},A=(e,t,r)=>M((e,t)=>t(e),x,e,t,r),D=(e,t,r)=>A(e,t,r).isSome(),L=(e,t,r)=>x(e,e=>S(e,t),r),O=(e,t,r)=>M((e,t)=>S(e,t),L,e,t,r),P=e=>{let t=m(e);t.length>0&&e.ui.registry.addContextToolbar("quickblock",{predicate:t=>{let r=C.fromDom(t),o=e.schema.getTextBlockElements(),i=t=>t.dom===e.getBody();return!q(r,"data-mce-bogus")&&O(r,'table,[data-mce-bogus="all"]',i).fold(()=>D(r,t=>E(t) in o&&e.dom.isEmpty(t.dom),i),T)},items:t,position:"line",scope:"editor"})},B=e=>{let t=t=>e.dom.isEditable(t),r=e=>t(e.parentElement),o=e=>"IMG"===e.nodeName||"FIGURE"===e.nodeName&&/image/i.test(e.className)&&r(e),i=h(e);i.length>0&&e.ui.registry.addContextToolbar("imageselection",{predicate:o,items:i,position:"node"});let n=d(e);n.length>0&&e.ui.registry.addContextToolbar("textselection",{predicate:r=>!o(r)&&!e.selection.isCollapsed()&&t(r),items:n,position:"selection",scope:"editor"})};e.add("quickbars",e=>{c(e),w(e),P(e),B(e)})}();