!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager");let t=(e,t,r)=>{var a;return!!r(e,t.prototype)||(null===(a=e.constructor)||void 0===a?void 0:a.name)===t.name},r=e=>{let r=typeof e;return null===e?"null":"object"===r&&Array.isArray(e)?"array":"object"===r&&t(e,String,(e,t)=>t.isPrototypeOf(e))?"string":r},a=e=>t=>r(t)===e,l=a("string"),o=a("object"),i=a("array"),s=e=>null==e,n=e=>!s(e);class c{constructor(e,t){this.tag=e,this.value=t}static some(e){return new c(!0,e)}static none(){return c.singletonNone}fold(e,t){return this.tag?t(this.value):e()}isSome(){return this.tag}isNone(){return!this.tag}map(e){return this.tag?c.some(e(this.value)):c.none()}bind(e){return this.tag?e(this.value):c.none()}exists(e){return this.tag&&e(this.value)}forall(e){return!this.tag||e(this.value)}filter(e){return!this.tag||e(this.value)?this:c.none()}getOr(e){return this.tag?this.value:e}or(e){return this.tag?this:e}getOrThunk(e){return this.tag?this.value:e()}orThunk(e){return this.tag?this:e()}getOrDie(e){if(this.tag)return this.value;throw Error(null!=e?e:"Called getOrDie on None")}static from(e){return n(e)?c.some(e):c.none()}getOrNull(){return this.tag?this.value:null}getOrUndefined(){return this.value}each(e){this.tag&&e(this.value)}toArray(){return this.tag?[this.value]:[]}toString(){return this.tag?`some(${this.value})`:"none()"}}c.singletonNone=new c(!1);let m=Array.prototype.push,u=(e,t)=>{for(let r=0,a=e.length;r<a;r++){let a=e[r];t(a,r)}},d=e=>{let t=[];for(let r=0,a=e.length;r<a;++r){if(!i(e[r]))throw Error("Arr.flatten item "+r+" was not an array, input: "+e);m.apply(t,e[r])}return t},h=e=>{let t=e;return{get:()=>t,set:e=>{t=e}}},p=Object.keys,g=Object.hasOwnProperty,b=(e,t)=>{let r=p(e);for(let a=0,l=r.length;a<l;a++){let l=r[a],o=e[l];t(o,l)}},w=(e,t)=>v(e,t)?c.from(e[t]):c.none(),v=(e,t)=>g.call(e,t),y=e=>t=>t.options.get(e),f=e=>{let t=e.options.register;t("audio_template_callback",{processor:"function"}),t("video_template_callback",{processor:"function"}),t("iframe_template_callback",{processor:"function"}),t("media_live_embeds",{processor:"boolean",default:!0}),t("media_filter_html",{processor:"boolean",default:!0}),t("media_url_resolver",{processor:"function"}),t("media_alt_source",{processor:"boolean",default:!0}),t("media_poster",{processor:"boolean",default:!0}),t("media_dimensions",{processor:"boolean",default:!0})},x=y("audio_template_callback"),_=y("video_template_callback"),j=y("iframe_template_callback"),k=y("media_live_embeds"),O=y("media_filter_html"),S=y("media_url_resolver"),A=y("media_alt_source"),$=y("media_poster"),C=y("media_dimensions");var T=tinymce.util.Tools.resolve("tinymce.util.Tools"),D=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),F=tinymce.util.Tools.resolve("tinymce.html.DomParser");let z=D.DOM,M=e=>e.replace(/px$/,""),N=e=>{let t=e.attr("style"),r=t?z.parseStyle(t):{};return{type:"ephox-embed-iri",source:e.attr("data-ephox-embed-iri"),altsource:"",poster:"",width:w(r,"max-width").map(M).getOr(""),height:w(r,"max-height").map(M).getOr("")}},R=(e,t)=>{let r={},a=F({validate:!1,forced_root_block:!1},t),l=a.parse(e);for(let e=l;e;e=e.walk())if(1===e.type){let t=e.name;if(e.attr("data-ephox-embed-iri")){r=N(e);break}r.source||"param"!==t||(r.source=e.attr("movie")),("iframe"===t||"object"===t||"embed"===t||"video"===t||"audio"===t)&&(r.type||(r.type=t),r=T.extend(e.attributes.map,r)),"script"===t&&(r={type:"script",source:e.attr("src")}),"source"!==t||(r.source?r.altsource||(r.altsource=e.attr("src")):r.source=e.attr("src")),"img"!==t||r.poster||(r.poster=e.attr("src"))}return r.source=r.source||r.src||"",r.altsource=r.altsource||"",r.poster=r.poster||"",r},E=e=>{var t;let r=null!==(t=e.toLowerCase().split(".").pop())&&void 0!==t?t:"";return w({mp3:"audio/mpeg",m4a:"audio/x-m4a",wav:"audio/wav",mp4:"video/mp4",webm:"video/webm",ogg:"video/ogg",swf:"application/x-shockwave-flash"},r).getOr("")};var U=tinymce.util.Tools.resolve("tinymce.html.Node"),P=tinymce.util.Tools.resolve("tinymce.html.Serializer");let L=(e,t={})=>F({forced_root_block:!1,validate:!1,allow_conditional_comments:!0,...t},e),I=D.DOM,B=e=>/^[0-9.]+$/.test(e)?e+"px":e,G=(e,t)=>{let r=t.attr("style"),a=r?I.parseStyle(r):{};n(e.width)&&(a["max-width"]=B(e.width)),n(e.height)&&(a["max-height"]=B(e.height)),t.attr("style",I.serializeStyle(a))},W=["source","altsource"],q=(e,t,r,a)=>{let l=0,o=0,i=L(a);i.addNodeFilter("source",e=>l=e.length);let s=i.parse(e);for(let e=s;e;e=e.walk())if(1===e.type){let a=e.name;if(e.attr("data-ephox-embed-iri")){G(t,e);break}switch(a){case"video":case"object":case"embed":case"img":case"iframe":void 0!==t.height&&void 0!==t.width&&(e.attr("width",t.width),e.attr("height",t.height))}if(r)switch(a){case"video":e.attr("poster",t.poster),e.attr("src",null);for(let r=l;r<2;r++)if(t[W[r]]){let a=new U("source",1);a.attr("src",t[W[r]]),a.attr("type",t[W[r]+"mime"]||null),e.append(a)}break;case"iframe":e.attr("src",t.source);break;case"object":let i=e.getAll("img").length>0;if(t.poster&&!i){e.attr("src",t.poster);let r=new U("img",1);r.attr("src",t.poster),r.attr("width",t.width),r.attr("height",t.height),e.append(r)}break;case"source":if(o<2&&(e.attr("src",t[W[o]]),e.attr("type",t[W[o]+"mime"]||null),!t[W[o]])){e.remove();continue}o++;break;case"img":t.poster||e.remove()}}return P({},a).serialize(s)},H=[{regex:/youtu\.be\/([\w\-_\?&=.]+)/i,type:"iframe",w:560,h:314,url:"www.youtube.com/embed/$1",allowFullscreen:!0},{regex:/youtube\.com(.+)v=([^&]+)(&([a-z0-9&=\-_]+))?/i,type:"iframe",w:560,h:314,url:"www.youtube.com/embed/$2?$4",allowFullscreen:!0},{regex:/youtube.com\/embed\/([a-z0-9\?&=\-_]+)/i,type:"iframe",w:560,h:314,url:"www.youtube.com/embed/$1",allowFullscreen:!0},{regex:/vimeo\.com\/([0-9]+)\?h=(\w+)/,type:"iframe",w:425,h:350,url:"player.vimeo.com/video/$1?h=$2&title=0&byline=0&portrait=0&color=8dc7dc",allowFullscreen:!0},{regex:/vimeo\.com\/(.*)\/([0-9]+)\?h=(\w+)/,type:"iframe",w:425,h:350,url:"player.vimeo.com/video/$2?h=$3&title=0&amp;byline=0",allowFullscreen:!0},{regex:/vimeo\.com\/([0-9]+)/,type:"iframe",w:425,h:350,url:"player.vimeo.com/video/$1?title=0&byline=0&portrait=0&color=8dc7dc",allowFullscreen:!0},{regex:/vimeo\.com\/(.*)\/([0-9]+)/,type:"iframe",w:425,h:350,url:"player.vimeo.com/video/$2?title=0&amp;byline=0",allowFullscreen:!0},{regex:/maps\.google\.([a-z]{2,3})\/maps\/(.+)msid=(.+)/,type:"iframe",w:425,h:350,url:'maps.google.com/maps/ms?msid=$2&output=embed"',allowFullscreen:!1},{regex:/dailymotion\.com\/video\/([^_]+)/,type:"iframe",w:480,h:270,url:"www.dailymotion.com/embed/video/$1",allowFullscreen:!0},{regex:/dai\.ly\/([^_]+)/,type:"iframe",w:480,h:270,url:"www.dailymotion.com/embed/video/$1",allowFullscreen:!0}],J=e=>{let t=e.match(/^(https?:\/\/|www\.)(.+)$/i);return t&&t.length>1?"www."===t[1]?"https://":t[1]:"https://"},K=(e,t)=>{let r=J(t),a=e.regex.exec(t),l=r+e.url;if(n(a))for(let e=0;e<a.length;e++)l=l.replace("$"+e,()=>a[e]?a[e]:"");return l.replace(/\?$/,"")},Q=e=>{let t=H.filter(t=>t.regex.test(e));return t.length>0?T.extend({},t[0],{url:K(t[0],e)}):null},V=(e,t)=>{if(t)return t(e);{let t=e.allowfullscreen?' allowFullscreen="1"':"";return'<iframe src="'+e.source+'" width="'+e.width+'" height="'+e.height+'"'+t+"></iframe>"}},X=e=>{let t='<object data="'+e.source+'" width="'+e.width+'" height="'+e.height+'" type="application/x-shockwave-flash">';return e.poster&&(t+='<img src="'+e.poster+'" width="'+e.width+'" height="'+e.height+'" />'),t+="</object>"},Y=(e,t)=>t?t(e):'<audio controls="controls" src="'+e.source+'">'+(e.altsource?'\n<source src="'+e.altsource+'"'+(e.altsourcemime?' type="'+e.altsourcemime+'"':"")+" />\n":"")+"</audio>",Z=(e,t)=>t?t(e):'<video width="'+e.width+'" height="'+e.height+'"'+(e.poster?' poster="'+e.poster+'"':"")+' controls="controls">\n<source src="'+e.source+'"'+(e.sourcemime?' type="'+e.sourcemime+'"':"")+" />\n"+(e.altsource?'<source src="'+e.altsource+'"'+(e.altsourcemime?' type="'+e.altsourcemime+'"':"")+" />\n":"")+"</video>",ee=e=>'<script src="'+e.source+'"></script>',et=(e,t)=>{var r;let a=T.extend({},t);if(!a.source&&(T.extend(a,R(null!==(r=a.embed)&&void 0!==r?r:"",e.schema)),!a.source))return"";a.altsource||(a.altsource=""),a.poster||(a.poster=""),a.source=e.convertURL(a.source,"source"),a.altsource=e.convertURL(a.altsource,"source"),a.sourcemime=E(a.source),a.altsourcemime=E(a.altsource),a.poster=e.convertURL(a.poster,"poster");let l=Q(a.source);if(l&&(a.source=l.url,a.type=l.type,a.allowfullscreen=l.allowFullscreen,a.width=a.width||String(l.w),a.height=a.height||String(l.h)),a.embed)return q(a.embed,a,!0,e.schema);{let t=x(e),r=_(e),l=j(e);return(a.width=a.width||"300",a.height=a.height||"150",T.each(a,(t,r)=>{a[r]=e.dom.encode(""+t)}),"iframe"===a.type)?V(a,l):"application/x-shockwave-flash"===a.sourcemime?X(a):-1!==a.sourcemime.indexOf("audio")?Y(a,t):"script"===a.type?ee(a):Z(a,r)}},er=e=>e.hasAttribute("data-mce-object")||e.hasAttribute("data-ephox-embed-iri"),ea=e=>{e.on("click keyup touchend",()=>{let t=e.selection.getNode();t&&e.dom.hasClass(t,"mce-preview-object")&&e.dom.getAttrib(t,"data-mce-selected")&&t.setAttribute("data-mce-selected","2")}),e.on("ObjectSelected",e=>{let t=e.target.getAttribute("data-mce-object");"script"===t&&e.preventDefault()}),e.on("ObjectResized",t=>{let r=t.target;if(r.getAttribute("data-mce-object")){let a=r.getAttribute("data-mce-html");a&&(a=unescape(a),r.setAttribute("data-mce-html",escape(q(a,{width:String(t.width),height:String(t.height)},!1,e.schema))))}})},el={},eo=(e,t,r)=>new Promise((a,l)=>{let o=r=>(r.html&&(el[e.source]=r),a({url:e.source,html:r.html?r.html:t(e)}));el[e.source]?o(el[e.source]):r({url:e.source},o,l)}),ei=(e,t)=>Promise.resolve({html:t(e),url:e.source}),es=e=>t=>et(e,t),en=(e,t)=>{let r=S(e);return r?eo(t,es(e),r):ei(t,es(e))},ec=e=>v(el,e),em=(e,t)=>w(t,e).bind(e=>w(e,"meta")),eu=(e,t,r)=>a=>{let l=()=>w(e,a),i=()=>w(t,a),s=e=>w(e,"value").bind(e=>e.length>0?c.some(e):c.none());return{[a]:(a===r?l().bind(e=>o(e)?s(e).orThunk(i):i().orThunk(()=>c.from(e))):i().orThunk(()=>l().bind(e=>o(e)?s(e):c.from(e)))).getOr("")}},ed=(e,t)=>{let r={};return w(e,"dimensions").each(e=>{u(["width","height"],a=>{w(t,a).orThunk(()=>w(e,a)).each(e=>r[a]=e)})}),r},eh=(e,t)=>{let r=t&&"dimensions"!==t?em(t,e).getOr({}):{},a=eu(e,r,t);return{...a("source"),...a("altsource"),...a("poster"),...a("embed"),...ed(e,r)}},ep=e=>{let t={...e,source:{value:w(e,"source").getOr("")},altsource:{value:w(e,"altsource").getOr("")},poster:{value:w(e,"poster").getOr("")}};return u(["width","height"],r=>{w(e,r).each(e=>{let a=t.dimensions||{};a[r]=e,t.dimensions=a})}),t},eg=e=>t=>{let r=t&&t.msg?"Media embed handler error: "+t.msg:"Media embed handler threw unknown error.";e.notificationManager.open({type:"error",text:r})},eb=e=>{let t=e.selection.getNode(),r=er(t)?e.serializer.serialize(t,{selection:!0}):"",a=R(r,e.schema),l=(()=>{if(!ef(a.source,a.type))return{};{let r=e.dom.getRect(t);return{width:r.w.toString().replace(/px$/,""),height:r.h.toString().replace(/px$/,"")}}})();return{embed:r,...a,...l}},ew=(e,t)=>r=>{if(l(r.url)&&r.url.trim().length>0){let a=r.html,l=R(a,t.schema),o={...l,source:r.url,embed:a};e.setData(ep(o))}},ev=(e,t)=>{let r=e.dom.select("*[data-mce-object]");for(let e=0;e<t.length;e++)for(let a=r.length-1;a>=0;a--)t[e]===r[a]&&r.splice(a,1);e.selection.select(r[0])},ey=(e,t)=>{let r=e.dom.select("*[data-mce-object]");e.insertContent(t),ev(e,r),e.nodeChanged()},ef=(e,t)=>n(t)&&"ephox-embed-iri"===t&&n(Q(e)),ex=(e,t)=>(e.width!==t.width||e.height!==t.height)&&ef(t.source,e.type),e_=(e,t,r)=>{var a;t.embed=ex(e,t)&&C(r)?et(r,{...t,embed:""}):q(null!==(a=t.embed)&&void 0!==a?a:"",t,!1,r.schema),t.embed&&(e.source===t.source||ec(t.source))?ey(r,t.embed):en(r,t).then(e=>{ey(r,e.html)}).catch(eg(r))},ej=e=>{let t=eb(e),r=h(t),a=ep(t),l=(t,r)=>{let a=eh(r.getData(),"source");t.source!==a.source&&(ew(u,e)({url:a.source,html:""}),en(e,a).then(ew(u,e)).catch(eg(e)))},o=t=>{var r;let a=eh(t.getData()),l=R(null!==(r=a.embed)&&void 0!==r?r:"",e.schema);t.setData(ep(l))},i=(t,r,a)=>{let l=eh(t.getData(),r),o=ex(a,l)&&C(e)?{...l,embed:""}:l,i=et(e,o);t.setData(ep({...o,embed:i}))},s=C(e)?[{type:"sizeinput",name:"dimensions",label:"Constrain proportions",constrain:!0}]:[],n={title:"General",name:"general",items:d([[{name:"source",type:"urlinput",filetype:"media",label:"Source"}],s])},c=[];A(e)&&c.push({name:"altsource",type:"urlinput",filetype:"media",label:"Alternative source URL"}),$(e)&&c.push({name:"poster",type:"urlinput",filetype:"image",label:"Media poster (Image URL)"});let m=[n,{title:"Embed",items:[{type:"textarea",name:"embed",label:"Paste your embed code below:"}]}];c.length>0&&m.push({title:"Advanced",name:"advanced",items:c});let u=e.windowManager.open({title:"Insert/Edit Media",size:"normal",body:{type:"tabpanel",tabs:m},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],onSubmit:t=>{let a=eh(t.getData());e_(r.get(),a,e),t.close()},onChange:(e,t)=>{switch(t.name){case"source":l(r.get(),e);break;case"embed":o(e);break;case"dimensions":case"altsource":case"poster":i(e,t.name,r.get())}r.set(eh(e.getData()))},initialData:a})},ek=e=>({showDialog:()=>{ej(e)}}),eO=e=>{e.addCommand("mceMedia",()=>{ej(e)})},eS=(e,t,r)=>""===t||e.length>=t.length&&e.substr(r,r+t.length)===t,eA=(e,t)=>eS(e,t,0);var e$=tinymce.util.Tools.resolve("tinymce.Env");let eC=e=>{let t=e.name;return"iframe"===t||"video"===t||"audio"===t},eT=(e,t,r,a=null)=>{let l=e.attr(r);return n(l)?l:v(t,r)?null:a},eD=(e,t,r)=>{let a="img"===t.name||"video"===e.name,l="audio"===e.name?"30":"150",o=a?l:null;t.attr({width:eT(e,r,"width",a?"300":null),height:eT(e,r,"height",o)})},eF=(e,t,r,a)=>{let l=L(e.schema).parse(a,{context:t});for(;l.firstChild;)r.append(l.firstChild)},ez=(e,t)=>{let r=t.name,a=new U("img",1);return eN(e,t,a),eD(t,a,{}),a.attr({style:t.attr("style"),src:e$.transparentSrc,"data-mce-object":r,class:"mce-object mce-object-"+r}),a},eM=(e,t)=>{var r;let a=t.name,l=new U("span",1);l.attr({contentEditable:"false",style:t.attr("style"),"data-mce-object":a,class:"mce-preview-object mce-object-"+a}),eN(e,t,l);let o=e.dom.parseStyle(null!==(r=t.attr("style"))&&void 0!==r?r:""),i=new U(a,1);if(eD(t,i,o),i.attr({src:t.attr("src"),style:t.attr("style"),class:t.attr("class")}),"iframe"===a)i.attr({allowfullscreen:t.attr("allowfullscreen"),frameborder:"0"});else{u(["controls","crossorigin","currentTime","loop","muted","poster","preload"],e=>{i.attr(e,t.attr(e))});let r=l.attr("data-mce-html");n(r)&&eF(e,a,i,unescape(r))}let s=new U("span",1);return s.attr("class","mce-shim"),l.append(i),l.append(s),l},eN=(e,t,r)=>{var a;let l=null!==(a=t.attributes)&&void 0!==a?a:[],o=l.length;for(;o--;){let t=l[o].name,a=l[o].value;"width"===t||"height"===t||"style"===t||eA(t,"data-mce-")||(("data"===t||"src"===t)&&(a=e.convertURL(a,t)),r.attr("data-mce-p-"+t,a))}let i=P({inner:!0},e.schema),s=new U("div",1);u(t.children(),e=>s.append(e));let n=i.serialize(s);n&&(r.attr("data-mce-html",escape(n)),r.empty())},eR=e=>{let t=e.attr("class");return l(t)&&/\btiny-pageembed\b/.test(t)},eE=e=>{let t=e;for(;t=t.parent;)if(t.attr("data-ephox-embed-iri")||eR(t))return!0;return!1},eU=e=>t=>{let r,a=t.length;for(;a--;)!(!(r=t[a]).parent||r.parent.attr("data-mce-object"))&&(eC(r)&&k(e)?eE(r)||r.replace(eM(e,r)):eE(r)||r.replace(ez(e,r)))},eP=(e,t,r)=>{let a=e.options.get,l=a("xss_sanitization"),o=O(e);return L(e.schema,{sanitize:l,validate:o}).parse(r,{context:t})},eL=e=>{e.on("PreInit",()=>{let{schema:t,serializer:r,parser:a}=e,l=t.getBoolAttrs();u("webkitallowfullscreen mozallowfullscreen".split(" "),e=>{l[e]={}}),b({embed:["wmode"]},(e,r)=>{let a=t.getElementRule(r);a&&u(e,e=>{a.attributes[e]={},a.attributesOrder.push(e)})}),a.addNodeFilter("iframe,video,audio,object,embed,script",eU(e)),r.addAttributeFilter("data-mce-object",(t,r)=>{var a;let l=t.length;for(;l--;){let o=t[l];if(!o.parent)continue;let i=o.attr(r),s=new U(i,1);if("audio"!==i&&"script"!==i){let e=o.attr("class");e&&-1!==e.indexOf("mce-preview-object")&&o.firstChild?s.attr({width:o.firstChild.attr("width"),height:o.firstChild.attr("height")}):s.attr({width:o.attr("width"),height:o.attr("height")})}s.attr({style:o.attr("style")});let n=null!==(a=o.attributes)&&void 0!==a?a:[],c=n.length;for(;c--;){let e=n[c].name;0===e.indexOf("data-mce-p-")&&s.attr(e.substr(11),n[c].value)}"script"===i&&s.attr("type","text/javascript");let m=o.attr("data-mce-html");if(m){let t=eP(e,i,unescape(m));u(t.children(),e=>s.append(e))}o.replace(s)}})}),e.on("SetContent",()=>{let t=e.dom;u(t.select("span.mce-preview-object"),e=>{0===t.select("span.mce-shim",e).length&&t.add(e,"span",{class:"mce-shim"})})})},eI=e=>{e.on("ResolveName",e=>{let t;1===e.target.nodeType&&(t=e.target.getAttribute("data-mce-object"))&&(e.name=t)})},eB=e=>t=>{let r=()=>{t.setEnabled(e.selection.isEditable())};return e.on("NodeChange",r),r(),()=>{e.off("NodeChange",r)}},eG=e=>{let t=()=>e.execCommand("mceMedia");e.ui.registry.addToggleButton("media",{tooltip:"Insert/edit media",icon:"embed",onAction:t,onSetup:t=>{let r=e.selection;t.setActive(er(r.getNode()));let a=r.selectorChangedWithUnbind("img[data-mce-object],span[data-mce-object],div[data-ephox-embed-iri]",t.setActive).unbind,l=eB(e)(t);return()=>{a(),l()}}}),e.ui.registry.addMenuItem("media",{icon:"embed",text:"Media...",onAction:t,onSetup:eB(e)})};e.add("media",e=>(f(e),eO(e),eG(e),eI(e),eL(e),ea(e),ek(e)))}();