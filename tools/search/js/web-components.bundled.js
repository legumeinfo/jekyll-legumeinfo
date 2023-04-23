/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),e=new WeakMap;class n{constructor(t,i,e){if(this._$cssResult$=!0,e!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const s=this.t;if(i&&void 0===t){const i=void 0!==s&&1===s.length;i&&(t=e.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&e.set(s,t))}return t}toString(){return this.cssText}}const r=(t,...i)=>{const e=1===t.length?t[0]:i.reduce(((i,s,e)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[e+1]),t[0]);return new n(e,t,s)},o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const h=window,a=h.trustedTypes,u=a?a.emptyScript:"",d=h.reactiveElementPolyfillSupport,c={toAttribute(t,i){switch(i){case Boolean:t=t?u:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},v=(t,i)=>i!==t&&(i==i||t==t),p={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:v};class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e))})),t}static createProperty(t,i=p){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e)}}static getPropertyDescriptor(t,i,s){return{get(){return this[i]},set(e){const n=this[t];this[i]=e,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)i.unshift(o(t))}else void 0!==t&&i.push(o(t));return i}static _$Ep(t,i){const s=i.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i])}))}createRenderRoot(){var s;const e=null!==(s=this.shadowRoot)&&void 0!==s?s:this.attachShadow(this.constructor.shadowRootOptions);return((s,e)=>{i?s.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((i=>{const e=document.createElement("style"),n=t.litNonce;void 0!==n&&e.setAttribute("nonce",n),e.textContent=i.cssText,s.appendChild(e)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$EO(t,i,s=p){var e;const n=this.constructor._$Ep(t,s);if(void 0!==n&&!0===s.reflect){const r=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:c).toAttribute(i,s.type);this._$El=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,i){var s;const e=this.constructor,n=e._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=e.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:c;this._$El=n,this[n]=r.fromAttribute(i,t.type),this._$El=null}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek()}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s)}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m;f.finalized=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==d||d({ReactiveElement:f}),(null!==(l=h.reactiveElementVersions)&&void 0!==l?l:h.reactiveElementVersions=[]).push("1.4.2");const b=window,g=b.trustedTypes,y=g?g.createPolicy("lit-html",{createHTML:t=>t}):void 0,k=`lit$${(Math.random()+"").slice(9)}$`,$="?"+k,w=`<${$}>`,_=document,S=(t="")=>_.createComment(t),x=t=>null===t||"object"!=typeof t&&"function"!=typeof t,A=Array.isArray,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,C=/>/g,E=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),M=/'/g,R=/"/g,L=/^(?:script|style|textarea|title)$/i,T=(t=>(i,...s)=>({_$litType$:t,strings:i,values:s}))(1),N=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),D=new WeakMap,P=_.createTreeWalker(_,129,null,!1),I=(t,i)=>{const s=t.length-1,e=[];let n,r=2===i?"<svg>":"",o=O;for(let i=0;i<s;i++){const s=t[i];let l,h,a=-1,u=0;for(;u<s.length&&(o.lastIndex=u,h=o.exec(s),null!==h);)u=o.lastIndex,o===O?"!--"===h[1]?o=j:void 0!==h[1]?o=C:void 0!==h[2]?(L.test(h[2])&&(n=RegExp("</"+h[2],"g")),o=E):void 0!==h[3]&&(o=E):o===E?">"===h[0]?(o=null!=n?n:O,a=-1):void 0===h[1]?a=-2:(a=o.lastIndex-h[2].length,l=h[1],o=void 0===h[3]?E:'"'===h[3]?R:M):o===R||o===M?o=E:o===j||o===C?o=O:(o=E,n=void 0);const d=o===E&&t[i+1].startsWith("/>")?" ":"";r+=o===O?s+w:a>=0?(e.push(l),s.slice(0,a)+"$lit$"+s.slice(a)+k+d):s+k+(-2===a?(e.push(void 0),i):d)}const l=r+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==y?y.createHTML(l):l,e]};class U{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let n=0,r=0;const o=t.length-1,l=this.parts,[h,a]=I(t,i);if(this.el=U.createElement(h,s),P.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(e=P.nextNode())&&l.length<o;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(k)){const s=a[r++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(k),i=/([.?@])?(.*)/.exec(s);l.push({type:1,index:n,name:i[2],strings:t,ctor:"."===i[1]?B:"?"===i[1]?Z:"@"===i[1]?J:H})}else l.push({type:6,index:n})}for(const i of t)e.removeAttribute(i)}if(L.test(e.tagName)){const t=e.textContent.split(k),i=t.length-1;if(i>0){e.textContent=g?g.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],S()),P.nextNode(),l.push({type:2,index:++n});e.append(t[i],S())}}}else if(8===e.nodeType)if(e.data===$)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=e.data.indexOf(k,t+1));)l.push({type:7,index:n}),t+=k.length-1}n++}}static createElement(t,i){const s=_.createElement("template");return s.innerHTML=t,s}}function G(t,i,s=t,e){var n,r,o,l;if(i===N)return i;let h=void 0!==e?null===(n=s._$Co)||void 0===n?void 0:n[e]:s._$Cl;const a=x(i)?void 0:i._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(r=null==h?void 0:h._$AO)||void 0===r||r.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,s,e)),void 0!==e?(null!==(o=(l=s)._$Co)&&void 0!==o?o:l._$Co=[])[e]=h:s._$Cl=h),void 0!==h&&(i=G(t,h._$AS(t,i.values),h,e)),i}class q{constructor(t,i){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var i;const{el:{content:s},parts:e}=this._$AD,n=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:_).importNode(s,!0);P.currentNode=n;let r=P.nextNode(),o=0,l=0,h=e[0];for(;void 0!==h;){if(o===h.index){let i;2===h.type?i=new z(r,r.nextSibling,this,t):1===h.type?i=new h.ctor(r,h.name,h.strings,this,t):6===h.type&&(i=new Q(r,this,t)),this.u.push(i),h=e[++l]}o!==(null==h?void 0:h.index)&&(r=P.nextNode(),o++)}return n}p(t){let i=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class z{constructor(t,i,s,e){var n;this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cm=null===(n=null==e?void 0:e.isConnected)||void 0===n||n}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=G(this,t,i),x(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==N&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>A(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==F&&x(this._$AH)?this._$AA.nextSibling.data=t:this.T(_.createTextNode(t)),this._$AH=t}$(t){var i;const{values:s,_$litType$:e}=t,n="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=U.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===n)this._$AH.p(s);else{const t=new q(n,this),i=t.v(this.options);t.p(s),this.T(i),this._$AH=t}}_$AC(t){let i=D.get(t.strings);return void 0===i&&D.set(t.strings,i=new U(t)),i}k(t){A(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const n of t)e===i.length?i.push(s=new z(this.O(S()),this.O(S()),this,this.options)):s=i[e],s._$AI(n),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cm=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class H{constructor(t,i,s,e,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=F}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const n=this.strings;let r=!1;if(void 0===n)t=G(this,t,i,0),r=!x(t)||t!==this._$AH&&t!==N,r&&(this._$AH=t);else{const e=t;let o,l;for(t=n[0],o=0;o<n.length-1;o++)l=G(this,e[s+o],i,o),l===N&&(l=this._$AH[o]),r||(r=!x(l)||l!==this._$AH[o]),l===F?t=F:t!==F&&(t+=(null!=l?l:"")+n[o+1]),this._$AH[o]=l}r&&!e&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class B extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}const W=g?g.emptyScript:"";class Z extends H{constructor(){super(...arguments),this.type=4}j(t){t&&t!==F?this.element.setAttribute(this.name,W):this.element.removeAttribute(this.name)}}class J extends H{constructor(t,i,s,e,n){super(t,i,s,e,n),this.type=5}_$AI(t,i=this){var s;if((t=null!==(s=G(this,t,i,0))&&void 0!==s?s:F)===N)return;const e=this._$AH,n=t===F&&e!==F||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,r=t!==F&&(e===F||n);n&&this.element.removeEventListener(this.name,this,e),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class Q{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const V=b.litHtmlPolyfillSupport;null==V||V(U,z),(null!==(m=b.litHtmlVersions)&&void 0!==m?m:b.litHtmlVersions=[]).push("2.4.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var K,Y;class X extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,i;const s=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=s.firstChild),s}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,s)=>{var e,n;const r=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==s?void 0:s.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new z(i.insertBefore(S(),t),t,void 0,null!=s?s:{})}return o._$AI(t),o})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return N}}X.finalized=!0,X._$litElement$=!0,null===(K=globalThis.litElementHydrateSupport)||void 0===K||K.call(globalThis,{LitElement:X});const tt=globalThis.litElementPolyfillSupport;null==tt||tt({LitElement:X}),(null!==(Y=globalThis.litElementVersions)&&void 0!==Y?Y:globalThis.litElementVersions=[]).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it=t=>i=>"function"==typeof i?((t,i)=>(customElements.define(t,i),i))(t,i):((t,i)=>{const{kind:s,elements:e}=i;return{kind:s,elements:e,finisher(i){customElements.define(t,i)}}})(t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,st=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(s){s.createProperty(i.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(s){s.createProperty(i.key,t)}};function et(t){return(i,s)=>void 0!==s?((t,i,s)=>{i.constructor.createProperty(s,t)})(t,i,s):st(t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function nt(t){return et({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rt=({finisher:t,descriptor:i})=>(s,e)=>{var n;if(void 0===e){const e=null!==(n=s.originalKey)&&void 0!==n?n:s.key,r=null!=i?{kind:"method",placement:"prototype",key:e,descriptor:i(s.key)}:{...s,key:e};return null!=t&&(r.finisher=function(i){t(i,e)}),r}{const n=s.constructor;void 0!==i&&Object.defineProperty(s,e,i(e)),null==t||t(n,e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;function ot(t,i){return rt({descriptor:s=>{const e={get(){var i,s;return null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(t))&&void 0!==s?s:null},enumerable:!0,configurable:!0};if(i){const i="symbol"==typeof s?Symbol():"__"+s;e.get=function(){var s,e;return void 0===this[i]&&(this[i]=null!==(e=null===(s=this.renderRoot)||void 0===s?void 0:s.querySelector(t))&&void 0!==e?e:null),this[i]}}return e}})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var lt;const ht=null!=(null===(lt=window.HTMLSlotElement)||void 0===lt?void 0:lt.prototype.assignedElements)?(t,i)=>t.assignedElements(i):(t,i)=>t.assignedNodes(i).filter((t=>t.nodeType===Node.ELEMENT_NODE));
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at=t=>void 0===t.strings,ut={},dt=1,ct=2,vt=3,pt=4,ft=t=>(...i)=>({_$litDirective$:t,values:i});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class mt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,s){this._$Ct=t,this._$AM=i,this._$Ci=s}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bt=(t,i)=>{var s,e;const n=t._$AN;if(void 0===n)return!1;for(const t of n)null===(e=(s=t)._$AO)||void 0===e||e.call(s,i,!1),bt(t,i);return!0},gt=t=>{let i,s;do{if(void 0===(i=t._$AM))break;s=i._$AN,s.delete(t),t=i}while(0===(null==s?void 0:s.size))},yt=t=>{for(let i;i=t._$AM;t=i){let s=i._$AN;if(void 0===s)i._$AN=s=new Set;else if(s.has(t))break;s.add(t),wt(i)}};function kt(t){void 0!==this._$AN?(gt(this),this._$AM=t,yt(this)):this._$AM=t}function $t(t,i=!1,s=0){const e=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(i)if(Array.isArray(e))for(let t=s;t<e.length;t++)bt(e[t],!1),gt(e[t]);else null!=e&&(bt(e,!1),gt(e));else bt(this,t)}const wt=t=>{var i,s,e,n;t.type==ct&&(null!==(i=(e=t)._$AP)&&void 0!==i||(e._$AP=$t),null!==(s=(n=t)._$AQ)&&void 0!==s||(n._$AQ=kt))};class _t extends mt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,s){super._$AT(t,i,s),yt(this),this.isConnected=t._$AU}_$AO(t,i=!0){var s,e;t!==this.isConnected&&(this.isConnected=t,t?null===(s=this.reconnected)||void 0===s||s.call(this):null===(e=this.disconnected)||void 0===e||e.call(this)),i&&(bt(this,t),gt(this))}setValue(t){if(at(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const St=()=>new xt;class xt{}const At=new WeakMap,Ot=ft(class extends _t{render(t){return F}update(t,[i]){var s;const e=i!==this.Y;return e&&void 0!==this.Y&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.Y=i,this.dt=null===(s=t.options)||void 0===s?void 0:s.host,this.rt(this.ct=t.element)),F}rt(t){var i;if("function"==typeof this.Y){const s=null!==(i=this.dt)&&void 0!==i?i:globalThis;let e=At.get(s);void 0===e&&(e=new WeakMap,At.set(s,e)),void 0!==e.get(this.Y)&&this.Y.call(this.dt,void 0),e.set(this.Y,t),void 0!==t&&this.Y.call(this.dt,t)}else this.Y.value=t}get lt(){var t,i,s;return"function"==typeof this.Y?null===(i=At.get(null!==(t=this.dt)&&void 0!==t?t:globalThis))||void 0===i?void 0:i.get(this.Y):null===(s=this.Y)||void 0===s?void 0:s.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class jt extends mt{constructor(t){if(super(t),this.it=F,t.type!==ct)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===F||null==t)return this._t=void 0,this.it=t;if(t===N)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const i=[t];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}}jt.directiveName="unsafeHTML",jt.resultType=1;const Ct=ft(jt);class Et{constructor(t){this._listeners=[],(this.host=t).addController(this),this._initialize()}hostConnected(){this._addEventListener()}hostDisconnected(){this.abortSignal.removeEventListener("abort",this._aborted.bind(this))}wrapPromise(t){const i=this._cancelState;return i.wrapCount+=1,Promise.race([t,i.promise])}addListener(t){this._listeners.push(t.bind(this.host))}cancel(){this._abortController.abort()}_addEventListener(){this.abortSignal.addEventListener("abort",this._aborted.bind(this),{once:!0})}_initialize(){this._abortController=new AbortController,this.abortSignal=this._abortController.signal,this._addEventListener();let t={abortSignal:this.abortSignal,wrapCount:0};t.promise=new Promise(((i,s)=>{t.abortSignal.addEventListener("abort",(t=>s(t)),{once:!0})})).catch((i=>{if(t.wrapCount>0)throw i})),this._cancelState=t}_aborted(t){this._initialize(),this.host.requestUpdate(),this.host.updateComplete.then((()=>{this._listeners.forEach((i=>{i(t)}))}))}}class Mt{constructor(t){this._listeners=[],(this.host=t).addController(this)}hostConnected(){document.addEventListener("DOMContentLoaded",this._contentLoaded.bind(this))}hostDisconnected(){document.removeEventListener("DOMContentLoaded",this._contentLoaded.bind(this))}addListener(t){this._listeners.push(t.bind(this.host))}_contentLoaded(t){this.host.requestUpdate(),this.host.updateComplete.then((()=>{this._listeners.forEach((i=>{i(t)}))}))}}class Rt{constructor(t){this._listeners=[],(this.host=t).addController(this)}hostConnected(){window.addEventListener("popstate",this._popState.bind(this))}hostDisconnected(){window.removeEventListener("popstate",this._popState.bind(this))}getParameter(t,i=""){const s=new URLSearchParams(window.location.search).get(t);return null!==s?s:i}setParameters(t){if(!this._differentValues(t))return;const i="?"+Object.entries(t).map((([t,i])=>`${t}=${i}`)).join("&");history.pushState(t,"",i)}addListener(t){this._listeners.push(t.bind(this.host))}_differentValues(t){const i=new URLSearchParams(window.location.search);return Object.entries(t).some((([t,s])=>s.toString()!==i.get(t)))}_popState(t){this.host.requestUpdate(),this.host.updateComplete.then((()=>{this._listeners.forEach((i=>{i(t)}))}))}}class Lt{constructor(t,...i){this._children=[],(this.host=t).addController(this),this._slotRefs=i}hostUpdate(){this._children=Array.from(this.host.children)}hostUpdated(){this._slotRefs.forEach((t=>{if(void 0===t.value)return;const i=t.value.getAttribute("name"),s=this._children.filter((t=>t.getAttribute("slot")===i)).map((t=>t instanceof HTMLTemplateElement?Array.from(t.children):t)).flat();if(s.length>0)try{t.value.replaceChildren(...s)}catch(t){}}))}}var Tt=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let Nt=class extends X{constructor(){super(),this.defaultSlotRef=St(),this.closeable=!1,this.content="",this.type="",this.slotController=new Lt(this,this.defaultSlotRef)}createRenderRoot(){return this}updateAlert(t,i){this.content=t,this.type=i}basic(t){this.updateAlert(t,"")}primary(t){this.updateAlert(t,"primary")}success(t){this.updateAlert(t,"success")}warning(t){this.updateAlert(t,"warning")}danger(t){this.updateAlert(t,"danger")}_renderClassModifier(){return""==this.type?"":`uk-alert-${this.type}`}_renderClose(){return this.closeable?T`<a class="uk-alert-close" uk-close></a>`:T``}render(){const t=this._renderClassModifier(),i=this._renderClose();return T`
      <div class="uk-alert ${t}" uk-alert>
        ${i}
        <p ${Ot(this.defaultSlotRef)}>${Ct(this.content)}</p>
      </div>
    `}};Nt.styles=r``,Tt([et({type:Boolean})],Nt.prototype,"closeable",void 0),Tt([et({type:String})],Nt.prototype,"content",void 0),Tt([et({type:String})],Nt.prototype,"type",void 0),Nt=Tt([it("lis-alert-element")],Nt);var Ft=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let Dt=class extends X{submit(){if(!this._forms.length)throw new Error("No form to submit");const t=this._forms[0],i=t.querySelector('[type="submit"]');null!==i?t.requestSubmit(i):t.requestSubmit()}_submit(t){t.preventDefault(),t.stopPropagation();const i={detail:{data:new FormData(t.target)},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("submit",i))}render(){return T`<slot @submit="${this._submit}"></slot>`}};Dt.styles=r``,Ft([function(t){const{slot:i,selector:s}=null!=t?t:{};return rt({descriptor:e=>({get(){var e;const n="slot"+(i?`[name=${i}]`:":not([name])"),r=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(n),o=null!=r?ht(r,t):[];return s?o.filter((t=>t.matches(s))):o},enumerable:!0,configurable:!0})})}({selector:"form"})],Dt.prototype,"_forms",void 0),Dt=Ft([it("lis-form-wrapper-element")],Dt);var Pt=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let It=class extends X{constructor(){super(...arguments),this.page=1,this.hasNext=!1}createRenderRoot(){return this}previous(t){void 0!==t&&t.preventDefault(),this.page>1&&(this.page-=1,this._dispatchPageChange())}next(t){void 0!==t&&t.preventDefault(),this.hasNext&&(this.page+=1,this._dispatchPageChange())}_dispatchPageChange(){const t={detail:{page:this.page},bubbles:!0,composed:!0},i=new CustomEvent("pageChange",t);this.dispatchEvent(i)}_renderPreviousClass(){return this.page>1?"":"uk-disabled"}_renderNextClass(){return this.hasNext?"":"uk-disabled"}render(){const t=this._renderPreviousClass(),i=this._renderNextClass();return T`
      <ul class="uk-pagination">
          <li class="${t}"><a href="" @click=${this.previous}><span class="uk-margin-small-right" uk-pagination-previous></span> Previous</a></li>
          <li class="uk-active"><span>Page ${this.page}</span></li>
          <li class="uk-margin-auto-left ${i}"><a href="" @click=${this.next}>Next <span class="uk-margin-small-left" uk-pagination-next></span></a></li>
      </ul>
    `}};It.styles=r``,Pt([et({type:Number,reflect:!0})],It.prototype,"page",void 0),Pt([et({type:Boolean})],It.prototype,"hasNext",void 0),It=Pt([it("lis-pagination-element")],It);var Ut=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let Gt=class extends X{constructor(){super(),this.defaultSlotRef=St(),this.caption="",this.dataAttributes=[],this.header={},this.data=[],this.slotController=new Lt(this,this.defaultSlotRef)}createRenderRoot(){return this}_objectToRow(t,i="td"){const s=`<${i}>`,e=`</${i}>`,n=this.dataAttributes.map((i=>{const n=t.hasOwnProperty(i)?t[i]:"";return s+n+e}));return T`<tr>${Ct(n.join(""))}</tr>`}_getCaption(){return this.caption?T`<caption>${this.caption}</caption>`:T``}_getHeader(){if(!this.header)return T``;const t=this._objectToRow(this.header,"th");return T`<thead>${t}</thead>`}_getBody(){if(!this.data)return T``;const t=this.data.map((t=>this._objectToRow(t)));return T`<tbody>${t}</tbody>`}render(){const t=this._getCaption(),i=this._getHeader(),s=this._getBody();return T`
      <table class="uk-table uk-table-divider uk-table-small" ${Ot(this.defaultSlotRef)}>
        ${t}
        ${i}
        ${s}
      </table>
    `}};Gt.styles=r``,Ut([et({type:String})],Gt.prototype,"caption",void 0),Ut([et({type:Array})],Gt.prototype,"dataAttributes",void 0),Ut([et({type:Object})],Gt.prototype,"header",void 0),Ut([et({type:Array,attribute:!1})],Gt.prototype,"data",void 0),Gt=Ut([it("lis-simple-table-element")],Gt);var qt=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let zt=class extends X{constructor(){super(),this.defaultSlotRef=St(),this.modalId="lis-modal",this.heading="",this.slotController=new Lt(this,this.defaultSlotRef)}createRenderRoot(){return this}_getHeading(){return this.heading?T`<div class="uk-modal-header">${Ct(this.heading)}</div>`:T``}render(){const t=this._getHeading();return T`
    <div id="${this.modalId}" uk-modal>
      <div class="uk-modal-dialog">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        ${t}
        <div class="uk-modal-body" uk-overflow-auto>
          <slot ${Ot(this.defaultSlotRef)}></slot>
        <div>
      </div>
    </div>
    `}};zt.styles=r``,qt([et({type:String})],zt.prototype,"modalId",void 0),qt([et({type:String})],zt.prototype,"heading",void 0),zt=qt([it("lis-modal-element")],zt);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht=ft(class extends mt{constructor(t){if(super(t),t.type!==vt&&t.type!==dt&&t.type!==pt)throw Error("The `live` directive is not allowed on child or event bindings");if(!at(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[i]){if(i===N||i===F)return i;const s=t.element,e=t.name;if(t.type===vt){if(i===s[e])return N}else if(t.type===pt){if(!!i===s.hasAttribute(e))return N}else if(t.type===dt&&s.getAttribute(e)===i+"")return N;return((t,i=ut)=>{t._$AH=i})(t),i}});var Bt=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};const Wt=t=>()=>{class i extends t{constructor(...t){super(...t),this.queryStringController=new Rt(this),this.domContentLoadedController=new Mt(this),this.cancelPromiseController=new Et(this),this.searchFunction=()=>Promise.reject(new Error("No search function provided")),this.requiredQueryStringParams=[],this.resultAttributes=[],this.searchResults=[],this.tableHeader={},this._searchData=void 0,this._alertRef=St(),this._searchPage=1,this.domContentLoadedController.addListener(this._queryStringSubmit),this.queryStringController.addListener(this._queryStringSubmit)}createRenderRoot(){return this}submit(){if(null===this._formWrapper)throw new Error("No form wrapper in the template");this._formWrapper.submit()}_queryStringSubmit(){this.requiredQueryStringParams.some((t=>t.length&&t.every((t=>Boolean(this.queryStringController.getParameter(t))))))&&this.requiredQueryStringParams.length?(this._searchPage=Number(this.queryStringController.getParameter("page","1")),this.submit()):this._resetComponent()}_changePage(t){t.preventDefault(),t.stopPropagation(),this._search()}_search(){var t;if(void 0!==this._searchData){const i=this._paginator.page,s=`<span uk-spinner></span> Loading page ${i}`;null===(t=this._alertRef.value)||void 0===t||t.primary(s),this.queryStringController.setParameters({page:i,...this._searchData}),this.cancelPromiseController.cancel();const e={abortSignal:this.cancelPromiseController.abortSignal},n=this.searchFunction(this._searchData,i,e);this.cancelPromiseController.wrapPromise(n).then((t=>this._searchSuccess(t)),(t=>{"abort"!==t.type&&this._searchFailure(t)}))}}_searchSuccess(t){var i;this._searchPage=1;const{hasNext:s,results:e}={hasNext:Boolean(t.results.length),...t},n=1==e.length?"":"s",r=`${e.length} result${n} found`,o=e.length?"success":"warning";null===(i=this._alertRef.value)||void 0===i||i.updateAlert(r,o),this.searchResults=e,this._paginator.hasNext=s}_searchFailure(t){var i;throw null===(i=this._alertRef.value)||void 0===i||i.danger("Search failed"),t}formToObject(t){return Object.fromEntries(t)}_resetComponent(){var t;this._searchData=void 0,null===(t=this._alertRef.value)||void 0===t||t.basic(""),this.searchResults=[],this._paginator.page=1,this._paginator.hasNext=!1}_updateData(t){t.preventDefault(),t.stopPropagation(),this._searchData=this.formToObject(t.detail.data),this._paginator.page=this._searchPage,this._search()}renderForm(){throw new Error("Method not implemented")}renderResults(){return T`
      <lis-simple-table-element
        caption="Search Results"
        .dataAttributes=${this.resultAttributes}
        .header=${this.tableHeader}
        .data=${this.searchResults}>
      </lis-simple-table-element>
    `}render(){var t;const i=this.renderForm(),s=this.renderResults();return T`

      <lis-form-wrapper-element @submit="${this._updateData}">
        ${i}
      </lis-form-wrapper-element>

      <lis-alert-element ${Ot(this._alertRef)} ?hidden=${!(null===(t=this._alertRef.value)||void 0===t?void 0:t.content)}></lis-alert-element>

      ${s}

      <lis-pagination-element
        page=${this.queryStringController.getParameter("page","1")}
        @pageChange=${this._changePage}>
      </lis-pagination-element>

    `}}return Bt([et({type:Function,attribute:!1})],i.prototype,"searchFunction",void 0),Bt([nt()],i.prototype,"requiredQueryStringParams",void 0),Bt([nt()],i.prototype,"resultAttributes",void 0),Bt([nt()],i.prototype,"searchResults",void 0),Bt([nt()],i.prototype,"tableHeader",void 0),Bt([nt()],i.prototype,"_searchData",void 0),Bt([ot("lis-pagination-element")],i.prototype,"_paginator",void 0),Bt([ot("lis-form-wrapper-element")],i.prototype,"_formWrapper",void 0),i};var Zt=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let Jt=class extends(Wt(X)()){constructor(){super(),this.formData={genuses:[]},this.formDataFunction=()=>Promise.reject(new Error("No form data function provided")),this.selectedGenus=0,this.selectedSpecies=0,this.selectedStrain=0,this.formDataCancelPromiseController=new Et(this),this._formAlertRef=St(),this.requiredQueryStringParams=[["genus"],["genus","species"],["genus","species","strain"],["identifier"],["description"],["family"]];const t={genuses:[]},i=this.queryStringController.getParameter("genus");if(i){t.genuses.push({genus:i,species:[]});const s=this.queryStringController.getParameter("species");if(s){t.genuses[0].species.push({species:s,strains:[]});const i=this.queryStringController.getParameter("strain");i&&t.genuses[0].species[0].strains.push({strain:i})}}this.formData=t}updated(t){t.has("formDataFunction")&&this._getFormData(),t.has("formData")&&this._initializeSelections()}_getFormData(){this._alertFormDataLoading(),this.formDataCancelPromiseController.cancel();const t={abortSignal:this.formDataCancelPromiseController.abortSignal},i=this.formDataFunction(t);this.formDataCancelPromiseController.wrapPromise(i).then((t=>{this._alertFormDataSuccess(),this.formData=t}),(t=>{"abort"!==t.type&&this._alertFormDataFailure}))}_initializeSelections(){const t=this.queryStringController.getParameter("genus");this.selectedGenus=t?this.formData.genuses.map((({genus:t})=>t)).indexOf(t)+1:0;const i=this.queryStringController.getParameter("species");this.selectedGenus&&i?this.selectedSpecies=this.formData.genuses[this.selectedGenus-1].species.map((({species:t})=>t)).indexOf(i)+1:this.selectedSpecies=0;const s=this.queryStringController.getParameter("strain");this.selectedSpecies&&s?this.selectedStrain=this.formData.genuses[this.selectedGenus-1].species[this.selectedSpecies-1].strains.map((({strain:t})=>t)).indexOf(s)+1:this.selectedStrain=0}_alertFormDataLoading(){var t;null===(t=this._formAlertRef.value)||void 0===t||t.primary("<span uk-spinner></span> Loading form data")}_alertFormDataSuccess(){var t;null===(t=this._formAlertRef.value)||void 0===t||t.success("I think this should be replaced by a spinner that goes away when the form data is loaded.")}_alertFormDataFailure(t){var i;throw null===(i=this._formAlertRef.value)||void 0===i||i.danger("Failed to load form data"),t}_selectGenus(t){this.selectedGenus=t.target.selectedIndex,this.selectedSpecies=0,this.selectedStrain=0}_renderGenusSelector(){const t=this.formData.genuses.map((({genus:t})=>T`<option value="${t}">${t}</option>`));return T`
      <select class="uk-select uk-form-small" name="genus"
        .selectedIndex=${Ht(this.selectedGenus)}
        @change="${this._selectGenus}">
        <option value="">-- any --</option>
        ${t}
      </select>
    `}_selectSpecies(t){this.selectedSpecies=t.target.selectedIndex,this.selectedStrain=0}_renderSpeciesSelector(){let t=[T``];return this.selectedGenus&&(t=this.formData.genuses[this.selectedGenus-1].species.map((({species:t})=>T`<option value="${t}">${t}</option>`))),T`
      <select class="uk-select uk-form-small" name="species"
        .selectedIndex=${Ht(this.selectedSpecies)}
        @change="${this._selectSpecies}">
        <option value="">-- any --</option>
        ${t}
      </select>
    `}_selectStrain(t){this.selectedStrain=t.target.selectedIndex}_renderStrainSelector(){let t=[T``];return this.selectedSpecies&&(t=this.formData.genuses[this.selectedGenus-1].species[this.selectedSpecies-1].strains.map((({strain:t})=>T`<option value="${t}">${t}</option>`))),T`
      <select class="uk-select uk-form-small" name="strain"
        .selectedIndex=${Ht(this.selectedStrain)}
        @change="${this._selectStrain}">
        <option value="">-- any --</option>
        ${t}
      </select>
    `}renderForm(){var t;const i=this._renderGenusSelector(),s=this._renderSpeciesSelector(),e=this._renderStrainSelector();return T`
      <form class="uk-form-stacked">
        <fieldset class="uk-fieldset">
          <lis-alert-element closeable="true" ${Ot(this._formAlertRef)} ?hidden=${!(null===(t=this._formAlertRef.value)||void 0===t?void 0:t.content)}></lis-alert-element>
          <div class="uk-margin uk-grid-small" uk-grid>
            <div class="uk-width-1-3@s">
              <label class="uk-form-label" for="genus">Genus</label>
              ${i}
            </div>
            <div class="uk-width-1-3@s">
              <label class="uk-form-label" for="species">Species</label>
              ${s}
            </div>
            <div class="uk-width-1-3@s">
              <label class="uk-form-label" for="strain">Strain</label>
              ${e}
            </div>
          </div>
          <div class="uk-margin uk-grid-small" uk-grid>
            <div class="uk-width-1-3@s">
              <label class="uk-form-label" for="identifier">Identifier</label>
              <input class="uk-input" type="text" name="identifier"
                .value=${this.queryStringController.getParameter("identifier")}/>
              <span class="uk-text-small">e.g. Glyma.13G357700</span>
            </div>
            <div class="uk-width-1-3@s">
              <label class="uk-form-label" for="description">Description</label>
              <input class="uk-input" type="text" name="description"
                .value=${this.queryStringController.getParameter("description")}/>
              <span class="uk-text-small">e.g. protein disulfide isomerase-like protein</span>
            </div>
            <div class="uk-width-1-3@s">
              <label class="uk-form-label" for="family">Gene Family ID</label>
              <input class="uk-input" type="text" name="family"
                .value=${this.queryStringController.getParameter("family")}/>
              <span class="uk-text-small">e.g. L_HZ6G4Z</span>
            </div>
          </div>
          <div class="uk-margin">
            <button type="submit" class="uk-button uk-button-primary">Search</button>
          </div>
        </fieldset>
      </form>
    `}_renderLocation(t){var i;if(!(null===(i=t.locations)||void 0===i?void 0:i.length))return T``;const[s,...e]=t.locations;let n=T``;if(null!==s.chromosome)n=T`<b>chromosome location:</b> ${Ct(s.chromosome.identifier)}`;else{if(null===s.supercontig)return T``;n=T`<b>supercontig location:</b> ${Ct(s.supercontig.identifier)}`}return T`
      <div>
        ${n}:${s.start}-${s.end} (${s.strand})
      </div>
    `}_renderGeneFamily(t){var i;if(!(null===(i=t.geneFamilyAssignments)||void 0===i?void 0:i.length))return T``;const[s,...e]=t.geneFamilyAssignments;return T`
      <div>
        <b>gene family:</b> ${Ct(s)}
      </div>
    `}_renderResult(t){const i=this._renderLocation(t),s=this._renderGeneFamily(t);return T`
      <div>
        <div>
          <b>${Ct(t.identifier)}</b> (${Ct(t.name)}) <span class="uk-text-italic">${Ct(t.genus)} ${Ct(t.species)}</span> ${Ct(t.strain)}
        </div>
        <div class="uk-text-italic">
          ${t.description}
        </div>
        ${i}
        ${s}
        <hr>
      </div>
    `}renderResults(){return this.searchResults.map((t=>this._renderResult(t)))}};Jt.styles=r``,Zt([et()],Jt.prototype,"formData",void 0),Zt([et({type:Function,attribute:!1})],Jt.prototype,"formDataFunction",void 0),Zt([nt()],Jt.prototype,"selectedGenus",void 0),Zt([nt()],Jt.prototype,"selectedSpecies",void 0),Zt([nt()],Jt.prototype,"selectedStrain",void 0),Jt=Zt([it("lis-gene-search-element")],Jt);var Qt=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let Vt=class extends(Wt(X)()){constructor(){super(),this.requiredQueryStringParams=[["query"]],this.resultAttributes=["name","identifier","description"],this.tableHeader={name:"Name",identifier:"Identifier",description:"Description"}}renderForm(){return T`
<form>
<fieldset class="uk-fieldset">
<legend class="uk-legend">Trait name search (e.g. flower)</legend>
<div class="uk-margin">
<input
name="query"
class="uk-input"
type="text"
placeholder="Input"
aria-label="Input"
.value=${this.queryStringController.getParameter("query")}>
</div>
<div class="uk-margin">
<button type="submit" class="uk-button uk-button-primary">Search</button>
</div>
</fieldset>
</form>
`}};Vt.styles=r``,Vt=Qt([it("lis-trait-search-element")],Vt);var Kt=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let Yt=class extends(Wt(X)()){constructor(){super(),this.requiredQueryStringParams=[["query"]],this.resultAttributes=["trait_name","identifier","linkageGroup_geneticMap_identifier","linkageGroup_identifier","start","end","markerNames"],this.tableHeader={trait_name:"Trait",identifier:"QTL",linkageGroup_geneticMap_identifier:"Genetic Map",linkageGroup_identifier:"Linkage Group",start:"Start",end:"End",markerNames:"Markers"}}renderForm(){return T`
<form>
<fieldset class="uk-fieldset">
<legend class="uk-legend">QTL trait name search (e.g. flower)</legend>
<div class="uk-margin">
<input
name="query"
class="uk-input"
type="text"
placeholder="Input"
aria-label="Input"
.value=${this.queryStringController.getParameter("query")}>
</div>
<div class="uk-margin">
<button type="submit" class="uk-button uk-button-primary">Search</button>
</div>
</fieldset>
</form>
`}};Yt.styles=r``,Yt=Kt([it("lis-qtl-search-element")],Yt);var Xt=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let ti=class extends(Wt(X)()){constructor(){super(),this.requiredQueryStringParams=[["query"]],this.resultAttributes=["year","title","journal","firstAuthor","doi","pubMedId"],this.tableHeader={year:"Year",title:"Title",journal:"Journal",firstAuthor:"First Author",doi:"DOI",pubMedId:"PubMed"}}renderForm(){return T`
<form>
<fieldset class="uk-fieldset">
<legend class="uk-legend">Publication title search (e.g. expression)</legend>
<div class="uk-margin">
<input
name="query"
class="uk-input"
type="text"
placeholder="Input"
aria-label="Input"
.value=${this.queryStringController.getParameter("query")}>
</div>
<div class="uk-margin">
<button type="submit" class="uk-button uk-button-primary">Search</button>
</div>
</fieldset>
</form>
`}};ti.styles=r``,ti=Xt([it("lis-publication-search-element")],ti);var ii=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let si=class extends X{constructor(){super(...arguments),this.cancelPromiseController=new Et(this),this.queryString="",this.service="gene_linkouts",this.linkoutFunction=()=>Promise.reject(new Error("No linkout function provided")),this._alertMessage="",this._alertModifier="primary"}createRenderRoot(){return this}getLinkouts(t){this._table.data=[];this._setAlert("<span uk-spinner></span> Loading linkouts","primary"),this.cancelPromiseController.cancel();const i={abortSignal:this.cancelPromiseController.abortSignal},s=this.linkoutFunction(t,i);this.cancelPromiseController.wrapPromise(s).then((t=>this._linkoutSuccess(t)),(t=>{"abort"!==t.type&&this._linkoutFailure(t)}))}_linkoutSuccess(t){const{results:i}=t,s=1==i.length?"":"s",e=`${i.length} link${s} loaded`,n=i.length?"success":"warning";this._setAlert(e,n);const r=i.map((t=>({linkout:`<a href="${t.href}">${t.text}.</a>`})));this._table.data=r}_linkoutFailure(t){throw this._setAlert("Linkout failed","danger"),t}_setAlert(t,i){this._alertMessage=t,this._alertModifier=i}render(){return T`
      <div class="uk-alert uk-alert-${this._alertModifier}">
        <p>${Ct(this._alertMessage)}</p>
      </div>
      <lis-simple-table-element
        caption=""
        .dataAttributes=${["linkout"]}
        .header=${{linkout:"Linkouts"}}>
      </lis-simple-table-element>
    `}};si.styles=r``,ii([et({type:String,reflect:!0})],si.prototype,"queryString",void 0),ii([et({type:String})],si.prototype,"service",void 0),ii([et({type:Function,attribute:!1})],si.prototype,"linkoutFunction",void 0),ii([nt()],si.prototype,"_alertMessage",void 0),ii([nt()],si.prototype,"_alertModifier",void 0),ii([ot("lis-simple-table-element")],si.prototype,"_table",void 0),si=ii([it("lis-linkout-element")],si);export{Nt as LisAlertElement,Dt as LisFormWrapperElement,Jt as LisGeneSearchElement,si as LisLinkoutElement,zt as LisModalElement,It as LisPaginationElement,ti as LisPublicationSearchElement,Yt as LisQTLSearchElement,Gt as LisSimpleTableElement,Vt as LisTraitSearchElement};
