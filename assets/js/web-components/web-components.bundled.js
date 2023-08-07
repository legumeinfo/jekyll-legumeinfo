/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),e=new WeakMap;let n=class{constructor(t,i,e){if(this._$cssResult$=!0,e!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const s=this.t;if(i&&void 0===t){const i=void 0!==s&&1===s.length;i&&(t=e.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&e.set(s,t))}return t}toString(){return this.cssText}};const r=(t,...i)=>{const e=1===t.length?t[0]:i.reduce(((i,s,e)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[e+1]),t[0]);return new n(e,t,s)},o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const h=window,a=h.trustedTypes,u=a?a.emptyScript:"",d=h.reactiveElementPolyfillSupport,c={toAttribute(t,i){switch(i){case Boolean:t=t?u:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},v=(t,i)=>i!==t&&(i==i||t==t),p={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:v},f="finalized";let m=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e))})),t}static createProperty(t,i=p){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e)}}static getPropertyDescriptor(t,i,s){return{get(){return this[i]},set(e){const n=this[t];this[i]=e,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty(f))return!1;this[f]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)i.unshift(o(t))}else void 0!==t&&i.push(o(t));return i}static _$Ep(t,i){const s=i.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i])}))}createRenderRoot(){var s;const e=null!==(s=this.shadowRoot)&&void 0!==s?s:this.attachShadow(this.constructor.shadowRootOptions);return((s,e)=>{i?s.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((i=>{const e=document.createElement("style"),n=t.litNonce;void 0!==n&&e.setAttribute("nonce",n),e.textContent=i.cssText,s.appendChild(e)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$EO(t,i,s=p){var e;const n=this.constructor._$Ep(t,s);if(void 0!==n&&!0===s.reflect){const r=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:c).toAttribute(i,s.type);this._$El=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,i){var s;const e=this.constructor,n=e._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=e.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:c;this._$El=n,this[n]=r.fromAttribute(i,t.type),this._$El=null}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek()}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s)}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var b;m[f]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==d||d({ReactiveElement:m}),(null!==(l=h.reactiveElementVersions)&&void 0!==l?l:h.reactiveElementVersions=[]).push("1.6.2");const g=window,$=g.trustedTypes,k=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,y="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,_="?"+w,S=`<${_}>`,x=document,j=()=>x.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,A=Array.isArray,C="[ \t\n\f\r]",E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,T=/>/g,N=RegExp(`>|${C}(?:([^\\s"'>=/]+)(${C}*=${C}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),M=/'/g,P=/"/g,I=/^(?:script|style|textarea|title)$/i,L=(t=>(i,...s)=>({_$litType$:t,strings:i,values:s}))(1),D=Symbol.for("lit-noChange"),U=Symbol.for("lit-nothing"),F=new WeakMap,G=x.createTreeWalker(x,129,null,!1);function q(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(i):i}class z{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let n=0,r=0;const o=t.length-1,l=this.parts,[h,a]=((t,i)=>{const s=t.length-1,e=[];let n,r=2===i?"<svg>":"",o=E;for(let i=0;i<s;i++){const s=t[i];let l,h,a=-1,u=0;for(;u<s.length&&(o.lastIndex=u,h=o.exec(s),null!==h);)u=o.lastIndex,o===E?"!--"===h[1]?o=R:void 0!==h[1]?o=T:void 0!==h[2]?(I.test(h[2])&&(n=RegExp("</"+h[2],"g")),o=N):void 0!==h[3]&&(o=N):o===N?">"===h[0]?(o=null!=n?n:E,a=-1):void 0===h[1]?a=-2:(a=o.lastIndex-h[2].length,l=h[1],o=void 0===h[3]?N:'"'===h[3]?P:M):o===P||o===M?o=N:o===R||o===T?o=E:(o=N,n=void 0);const d=o===N&&t[i+1].startsWith("/>")?" ":"";r+=o===E?s+S:a>=0?(e.push(l),s.slice(0,a)+y+s.slice(a)+w+d):s+w+(-2===a?(e.push(void 0),i):d)}return[q(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]})(t,i);if(this.el=z.createElement(h,s),G.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(e=G.nextNode())&&l.length<o;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith(y)||i.startsWith(w)){const s=a[r++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+y).split(w),i=/([.?@])?(.*)/.exec(s);l.push({type:1,index:n,name:i[2],strings:t,ctor:"."===i[1]?J:"?"===i[1]?V:"@"===i[1]?K:Z})}else l.push({type:6,index:n})}for(const i of t)e.removeAttribute(i)}if(I.test(e.tagName)){const t=e.textContent.split(w),i=t.length-1;if(i>0){e.textContent=$?$.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],j()),G.nextNode(),l.push({type:2,index:++n});e.append(t[i],j())}}}else if(8===e.nodeType)if(e.data===_)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=e.data.indexOf(w,t+1));)l.push({type:7,index:n}),t+=w.length-1}n++}}static createElement(t,i){const s=x.createElement("template");return s.innerHTML=t,s}}function H(t,i,s=t,e){var n,r,o,l;if(i===D)return i;let h=void 0!==e?null===(n=s._$Co)||void 0===n?void 0:n[e]:s._$Cl;const a=O(i)?void 0:i._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(r=null==h?void 0:h._$AO)||void 0===r||r.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,s,e)),void 0!==e?(null!==(o=(l=s)._$Co)&&void 0!==o?o:l._$Co=[])[e]=h:s._$Cl=h),void 0!==h&&(i=H(t,h._$AS(t,i.values),h,e)),i}class B{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,n=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:x).importNode(s,!0);G.currentNode=n;let r=G.nextNode(),o=0,l=0,h=e[0];for(;void 0!==h;){if(o===h.index){let i;2===h.type?i=new W(r,r.nextSibling,this,t):1===h.type?i=new h.ctor(r,h.name,h.strings,this,t):6===h.type&&(i=new Y(r,this,t)),this._$AV.push(i),h=e[++l]}o!==(null==h?void 0:h.index)&&(r=G.nextNode(),o++)}return G.currentNode=x,n}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class W{constructor(t,i,s,e){var n;this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(n=null==e?void 0:e.isConnected)||void 0===n||n}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=H(this,t,i),O(t)?t===U||null==t||""===t?(this._$AH!==U&&this._$AR(),this._$AH=U):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>A(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==U&&O(this._$AH)?this._$AA.nextSibling.data=t:this.$(x.createTextNode(t)),this._$AH=t}g(t){var i;const{values:s,_$litType$:e}=t,n="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=z.createElement(q(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===n)this._$AH.v(s);else{const t=new B(n,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t}}_$AC(t){let i=F.get(t.strings);return void 0===i&&F.set(t.strings,i=new z(t)),i}T(t){A(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const n of t)e===i.length?i.push(s=new W(this.k(j()),this.k(j()),this,this.options)):s=i[e],s._$AI(n),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class Z{constructor(t,i,s,e,n){this.type=1,this._$AH=U,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=U}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const n=this.strings;let r=!1;if(void 0===n)t=H(this,t,i,0),r=!O(t)||t!==this._$AH&&t!==D,r&&(this._$AH=t);else{const e=t;let o,l;for(t=n[0],o=0;o<n.length-1;o++)l=H(this,e[s+o],i,o),l===D&&(l=this._$AH[o]),r||(r=!O(l)||l!==this._$AH[o]),l===U?t=U:t!==U&&(t+=(null!=l?l:"")+n[o+1]),this._$AH[o]=l}r&&!e&&this.j(t)}j(t){t===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class J extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===U?void 0:t}}const Q=$?$.emptyScript:"";class V extends Z{constructor(){super(...arguments),this.type=4}j(t){t&&t!==U?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class K extends Z{constructor(t,i,s,e,n){super(t,i,s,e,n),this.type=5}_$AI(t,i=this){var s;if((t=null!==(s=H(this,t,i,0))&&void 0!==s?s:U)===D)return;const e=this._$AH,n=t===U&&e!==U||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,r=t!==U&&(e===U||n);n&&this.element.removeEventListener(this.name,this,e),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class Y{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){H(this,t)}}const X=g.litHtmlPolyfillSupport;null==X||X(z,W),(null!==(b=g.litHtmlVersions)&&void 0!==b?b:g.litHtmlVersions=[]).push("2.7.5");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var tt,it;let st=class extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,i;const s=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=s.firstChild),s}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,s)=>{var e,n;const r=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==s?void 0:s.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new W(i.insertBefore(j(),t),t,void 0,null!=s?s:{})}return o._$AI(t),o})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return D}};st.finalized=!0,st._$litElement$=!0,null===(tt=globalThis.litElementHydrateSupport)||void 0===tt||tt.call(globalThis,{LitElement:st});const et=globalThis.litElementPolyfillSupport;null==et||et({LitElement:st}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt=t=>i=>"function"==typeof i?((t,i)=>(customElements.define(t,i),i))(t,i):((t,i)=>{const{kind:s,elements:e}=i;return{kind:s,elements:e,finisher(i){customElements.define(t,i)}}})(t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,rt=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(s){s.createProperty(i.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(s){s.createProperty(i.key,t)}},ot=(t,i,s)=>{i.constructor.createProperty(s,t)};function lt(t){return(i,s)=>void 0!==s?ot(t,i,s):rt(t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function ht(t){return lt({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const at=({finisher:t,descriptor:i})=>(s,e)=>{var n;if(void 0===e){const e=null!==(n=s.originalKey)&&void 0!==n?n:s.key,r=null!=i?{kind:"method",placement:"prototype",key:e,descriptor:i(s.key)}:{...s,key:e};return null!=t&&(r.finisher=function(i){t(i,e)}),r}{const n=s.constructor;void 0!==i&&Object.defineProperty(s,e,i(e)),null==t||t(n,e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;function ut(t,i){return at({descriptor:s=>{const e={get(){var i,s;return null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(t))&&void 0!==s?s:null},enumerable:!0,configurable:!0};if(i){const i="symbol"==typeof s?Symbol():"__"+s;e.get=function(){var s,e;return void 0===this[i]&&(this[i]=null!==(e=null===(s=this.renderRoot)||void 0===s?void 0:s.querySelector(t))&&void 0!==e?e:null),this[i]}}return e}})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var dt;const ct=null!=(null===(dt=window.HTMLSlotElement)||void 0===dt?void 0:dt.prototype.assignedElements)?(t,i)=>t.assignedElements(i):(t,i)=>t.assignedNodes(i).filter((t=>t.nodeType===Node.ELEMENT_NODE));
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt=t=>void 0===t.strings,pt={},ft=1,mt=2,bt=3,gt=4,$t=t=>(...i)=>({_$litDirective$:t,values:i});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class kt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,s){this._$Ct=t,this._$AM=i,this._$Ci=s}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yt=(t,i)=>{var s,e;const n=t._$AN;if(void 0===n)return!1;for(const t of n)null===(e=(s=t)._$AO)||void 0===e||e.call(s,i,!1),yt(t,i);return!0},wt=t=>{let i,s;do{if(void 0===(i=t._$AM))break;s=i._$AN,s.delete(t),t=i}while(0===(null==s?void 0:s.size))},_t=t=>{for(let i;i=t._$AM;t=i){let s=i._$AN;if(void 0===s)i._$AN=s=new Set;else if(s.has(t))break;s.add(t),jt(i)}};function St(t){void 0!==this._$AN?(wt(this),this._$AM=t,_t(this)):this._$AM=t}function xt(t,i=!1,s=0){const e=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(i)if(Array.isArray(e))for(let t=s;t<e.length;t++)yt(e[t],!1),wt(e[t]);else null!=e&&(yt(e,!1),wt(e));else yt(this,t)}const jt=t=>{var i,s,e,n;t.type==mt&&(null!==(i=(e=t)._$AP)&&void 0!==i||(e._$AP=xt),null!==(s=(n=t)._$AQ)&&void 0!==s||(n._$AQ=St))};class Ot extends kt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,s){super._$AT(t,i,s),_t(this),this.isConnected=t._$AU}_$AO(t,i=!0){var s,e;t!==this.isConnected&&(this.isConnected=t,t?null===(s=this.reconnected)||void 0===s||s.call(this):null===(e=this.disconnected)||void 0===e||e.call(this)),i&&(yt(this,t),wt(this))}setValue(t){if(vt(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const At=()=>new Ct;let Ct=class{};const Et=new WeakMap,Rt=$t(class extends Ot{render(t){return U}update(t,[i]){var s;const e=i!==this.G;return e&&void 0!==this.G&&this.ot(void 0),(e||this.rt!==this.lt)&&(this.G=i,this.ct=null===(s=t.options)||void 0===s?void 0:s.host,this.ot(this.lt=t.element)),U}ot(t){var i;if("function"==typeof this.G){const s=null!==(i=this.ct)&&void 0!==i?i:globalThis;let e=Et.get(s);void 0===e&&(e=new WeakMap,Et.set(s,e)),void 0!==e.get(this.G)&&this.G.call(this.ct,void 0),e.set(this.G,t),void 0!==t&&this.G.call(this.ct,t)}else this.G.value=t}get rt(){var t,i,s;return"function"==typeof this.G?null===(i=Et.get(null!==(t=this.ct)&&void 0!==t?t:globalThis))||void 0===i?void 0:i.get(this.G):null===(s=this.G)||void 0===s?void 0:s.value}disconnected(){this.rt===this.lt&&this.ot(void 0)}reconnected(){this.ot(this.lt)}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Tt extends kt{constructor(t){if(super(t),this.et=U,t.type!==mt)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===U||null==t)return this.ft=void 0,this.et=t;if(t===D)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const i=[t];return i.raw=i,this.ft={_$litType$:this.constructor.resultType,strings:i,values:[]}}}Tt.directiveName="unsafeHTML",Tt.resultType=1;const Nt=$t(Tt);class Mt{constructor(t){this._listeners=[],(this.host=t).addController(this),this._initialize()}hostConnected(){this._addEventListener()}hostDisconnected(){this.abortSignal.removeEventListener("abort",this._aborted.bind(this))}wrapPromise(t){const i=this._cancelState;return i.wrapCount+=1,Promise.race([t,i.promise])}addListener(t){this._listeners.push(t.bind(this.host))}cancel(){this._abortController.abort()}_addEventListener(){this.abortSignal.addEventListener("abort",this._aborted.bind(this),{once:!0})}_initialize(){this._abortController=new AbortController,this.abortSignal=this._abortController.signal,this._addEventListener();let t={abortSignal:this.abortSignal,wrapCount:0};t.promise=new Promise(((i,s)=>{t.abortSignal.addEventListener("abort",(t=>s(t)),{once:!0})})).catch((i=>{if(t.wrapCount>0)throw i})),this._cancelState=t}_aborted(t){this._initialize(),this.host.requestUpdate(),this.host.updateComplete.then((()=>{this._listeners.forEach((i=>{i(t)}))}))}}class Pt{constructor(t){this._listeners=[],(this.host=t).addController(this)}hostConnected(){document.addEventListener("DOMContentLoaded",this._contentLoaded.bind(this))}hostDisconnected(){document.removeEventListener("DOMContentLoaded",this._contentLoaded.bind(this))}addListener(t){this._listeners.push(t.bind(this.host))}_contentLoaded(t){this.host.requestUpdate(),this.host.updateComplete.then((()=>{this._listeners.forEach((i=>{i(t)}))}))}}class It{constructor(t){this._preUpdateListeners=[],this._listeners=[],(this.host=t).addController(this)}hostConnected(){window.addEventListener("popstate",this._popState.bind(this))}hostDisconnected(){window.removeEventListener("popstate",this._popState.bind(this))}getParameter(t,i=""){const s=new URLSearchParams(window.location.search).get(t);return null!==s?s:i}setParameters(t){if(!this._differentValues(t))return;const i="?"+Object.entries(t).map((([t,i])=>`${t}=${i}`)).join("&");history.pushState(t,"",i)}addPreUpdateListener(t){this._preUpdateListeners.push(t.bind(this.host))}addListener(t){this._listeners.push(t.bind(this.host))}_differentValues(t){const i=new URLSearchParams(window.location.search);return Object.entries(t).some((([t,s])=>s.toString()!==i.get(t)))}_popState(t){this._preUpdateListeners.forEach((i=>{i(t)})),this.host.requestUpdate(),this.host.updateComplete.then((()=>{this._listeners.forEach((i=>{i(t)}))}))}}class Lt{constructor(t,...i){this._children=[],(this.host=t).addController(this),this._slotRefs=i}hostUpdate(){this._children=Array.from(this.host.children)}hostUpdated(){this._slotRefs.forEach((t=>{if(void 0===t.value)return;const i=t.value.getAttribute("name"),s=this._children.filter((t=>t.getAttribute("slot")===i)).map((t=>t instanceof HTMLTemplateElement?Array.from(t.children):t)).flat();if(s.length>0)try{t.value.replaceChildren(...s)}catch(t){}}))}}var Dt=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let Ut=class extends st{createRenderRoot(){return this}constructor(){super(),this.defaultSlotRef=At(),this.closeable=!1,this.content="",this.type="",this.slotController=new Lt(this,this.defaultSlotRef)}updateAlert(t,i){this.content=t,this.type=i}basic(t){this.updateAlert(t,"")}primary(t){this.updateAlert(t,"primary")}success(t){this.updateAlert(t,"success")}warning(t){this.updateAlert(t,"warning")}danger(t){this.updateAlert(t,"danger")}_renderClassModifier(){return""==this.type?"":`uk-alert-${this.type}`}_renderClose(){return this.closeable?L`<a class="uk-alert-close" uk-close></a>`:L``}render(){const t=this._renderClassModifier(),i=this._renderClose();return L`
      <div class="uk-alert ${t}" uk-alert>
        ${i}
        <p ${Rt(this.defaultSlotRef)}>${Nt(this.content)}</p>
      </div>
    `}};Ut.styles=r``,Dt([lt({type:Boolean})],Ut.prototype,"closeable",void 0),Dt([lt({type:String})],Ut.prototype,"content",void 0),Dt([lt({type:String})],Ut.prototype,"type",void 0),Ut=Dt([nt("lis-alert-element")],Ut);var Ft=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let Gt=class extends st{submit(){if(!this._forms.length)throw new Error("No form to submit");const t=this._forms[0],i=t.querySelector('[type="submit"]');null!==i?t.requestSubmit(i):t.requestSubmit()}_submit(t){t.preventDefault(),t.stopPropagation();const i={detail:{data:new FormData(t.target)},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("submit",i))}render(){return L`<slot @submit="${this._submit}"></slot>`}};Gt.styles=r``,Ft([function(t){const{slot:i,selector:s}=null!=t?t:{};return at({descriptor:e=>({get(){var e;const n="slot"+(i?`[name=${i}]`:":not([name])"),r=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(n),o=null!=r?ct(r,t):[];return s?o.filter((t=>t.matches(s))):o},enumerable:!0,configurable:!0})})}({selector:"form"})],Gt.prototype,"_forms",void 0),Gt=Ft([nt("lis-form-wrapper-element")],Gt);var qt=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let zt=class extends st{constructor(){super(...arguments),this.page=1,this.hasNext=!1,this.scrollTarget=null}createRenderRoot(){return this}previous(t){void 0!==t&&t.preventDefault(),this.page>1&&(this.page-=1,this._dispatchPageChange(),this._scrollToTarget())}next(t){void 0!==t&&t.preventDefault(),this._hasNext()&&(this.page+=1,this._dispatchPageChange(),this._scrollToTarget())}_hasNext(){return void 0!==this.numPages?this.page<this.numPages:this.hasNext}_scrollToTarget(){null!=this.scrollTarget&&this.scrollTarget.scrollIntoView({behavior:"smooth"})}_dispatchPageChange(){const t={detail:{page:this.page},bubbles:!0,composed:!0},i=new CustomEvent("pageChange",t);this.dispatchEvent(i)}_renderPreviousClass(){return this.page>1?"uk-active":"uk-disabled"}_pageInfo(){return this.numPages?L`Page ${this.page.toLocaleString()} of ${this.numPages.toLocaleString()}`:L`Page ${this.page.toLocaleString()}`}_renderNextClass(){return this._hasNext()?"uk-active":"uk-disabled"}render(){const t=this._renderPreviousClass(),i=this._pageInfo(),s=this._renderNextClass();return L`
      <ul class="uk-pagination">
          <li class="${t}"><a href="" @click=${this.previous}><span class="uk-margin-small-right" uk-pagination-previous></span> Previous</a></li>
          <li class="uk-active"><span>${i}</span></li>
          <li class="uk-margin-auto-left ${s}"><a href="" @click=${this.next}>Next <span class="uk-margin-small-left" uk-pagination-next></span></a></li>
      </ul>
    `}};zt.styles=r``,qt([lt({type:Number,reflect:!0})],zt.prototype,"page",void 0),qt([lt()],zt.prototype,"numPages",void 0),qt([lt({type:Boolean})],zt.prototype,"hasNext",void 0),qt([lt({type:HTMLElement,attribute:!1})],zt.prototype,"scrollTarget",void 0),zt=qt([nt("lis-pagination-element")],zt);var Ht=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let Bt=class extends st{createRenderRoot(){return this}constructor(){super(),this.defaultSlotRef=At(),this.caption="",this.dataAttributes=[],this.header={},this.data=[],this.slotController=new Lt(this,this.defaultSlotRef)}_objectToRow(t,i="td"){const s=`<${i}>`,e=`</${i}>`,n=this.dataAttributes.map((i=>{const n=t.hasOwnProperty(i)?t[i]:"";return s+n+e}));return L`<tr>${Nt(n.join(""))}</tr>`}_getCaption(){return this.caption?L`<caption>${this.caption}</caption>`:L``}_getHeader(){if(!this.header)return L``;const t=this._objectToRow(this.header,"th");return L`<thead>${t}</thead>`}_getBody(){if(!this.data)return L``;const t=this.data.map((t=>this._objectToRow(t)));return L`<tbody>${t}</tbody>`}render(){const t=this._getCaption(),i=this._getHeader(),s=this._getBody();return L`
      <table class="uk-table uk-table-divider uk-table-small" ${Rt(this.defaultSlotRef)}>
        ${t}
        ${i}
        ${s}
      </table>
    `}};Bt.styles=r``,Ht([lt({type:String})],Bt.prototype,"caption",void 0),Ht([lt({type:Array})],Bt.prototype,"dataAttributes",void 0),Ht([lt({type:Object})],Bt.prototype,"header",void 0),Ht([lt({type:Array,attribute:!1})],Bt.prototype,"data",void 0),Bt=Ht([nt("lis-simple-table-element")],Bt);var Wt=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let Zt=class extends st{constructor(){super(...arguments),this.dataType="data",this.state="loaded",this._alertRef=At()}createRenderRoot(){return this}loading(){this.state="loading"}success(){this.state="loaded"}noResults(){var t;const i=`No ${this.dataType} found`;null===(t=this._alertRef.value)||void 0===t||t.warning(i),this.state="message"}failure(){var t;const i=`Failed to load ${this.dataType}`;null===(t=this._alertRef.value)||void 0===t||t.danger(i),this.state="message"}render(){return L`
      <div class="uk-overlay-default uk-position-cover uk-flex uk-flex-center uk-flex-middle"
        ?hidden=${"loading"!=this.state}>
        <span uk-spinner></span>
      </div>
      <lis-alert-element ${Rt(this._alertRef)} ?hidden=${"message"!=this.state}></lis-alert-element>
    `}};Zt.styles=r``,Wt([lt({type:String})],Zt.prototype,"dataType",void 0),Wt([ht()],Zt.prototype,"state",void 0),Zt=Wt([nt("lis-loading-element")],Zt);var Jt=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let Qt=class extends st{createRenderRoot(){return this}constructor(){super(),this.defaultSlotRef=At(),this.modalId="lis-modal",this.heading="",this.slotController=new Lt(this,this.defaultSlotRef)}_getHeading(){return this.heading?L`<div class="uk-modal-header">${Nt(this.heading)}</div>`:L``}render(){const t=this._getHeading();return L`
    <div id="${this.modalId}" uk-modal>
      <div class="uk-modal-dialog">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        ${t}
        <div class="uk-modal-body" uk-overflow-auto>
          <slot ${Rt(this.defaultSlotRef)}></slot>
        <div>
      </div>
    </div>
    `}};Qt.styles=r``,Jt([lt({type:String})],Qt.prototype,"modalId",void 0),Jt([lt({type:String})],Qt.prototype,"heading",void 0),Qt=Jt([nt("lis-modal-element")],Qt);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vt=$t(class extends kt{constructor(t){if(super(t),t.type!==bt&&t.type!==ft&&t.type!==gt)throw Error("The `live` directive is not allowed on child or event bindings");if(!vt(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[i]){if(i===D||i===U)return i;const s=t.element,e=t.name;if(t.type===bt){if(i===s[e])return D}else if(t.type===gt){if(!!i===s.hasAttribute(e))return D}else if(t.type===ft&&s.getAttribute(e)===i+"")return D;return((t,i=pt)=>{t._$AH=i})(t),i}});var Kt=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};const Yt=t=>()=>{class i extends t{constructor(...t){super(...t),this.queryStringController=new It(this),this.domContentLoadedController=new Pt(this),this.cancelPromiseController=new Mt(this),this.searchFunction=()=>Promise.reject(new Error("No search function provided")),this.requiredQueryStringParams=[],this.resultAttributes=[],this.searchResults=[],this.resultsInfo="",this.tableHeader={},this._searchData=void 0,this._formRef=At(),this._loadingRef=At(),this._searchPage=1,this.domContentLoadedController.addListener(this._queryStringSubmit),this.queryStringController.addListener(this._queryStringSubmit)}createRenderRoot(){return this}submit(){var t;if(void 0===this._formRef.value)throw new Error("No form wrapper in the template");null===(t=this._formRef.value)||void 0===t||t.submit()}_queryStringSubmit(){this.requiredQueryStringParams.some((t=>t.length&&t.every((t=>Boolean(this.queryStringController.getParameter(t))))))&&this.requiredQueryStringParams.length?(this._searchPage=Number(this.queryStringController.getParameter("page","1")),this.submit()):this._resetComponent()}_changePage(t){t.preventDefault(),t.stopPropagation(),this._search()}_search(){var t;if(void 0!==this._searchData){const i=this._paginator.page;null===(t=this._loadingRef.value)||void 0===t||t.loading(),this.queryStringController.setParameters({page:i,...this._searchData}),this.cancelPromiseController.cancel();const s={abortSignal:this.cancelPromiseController.abortSignal},e=this.searchFunction(this._searchData,i,s);this.cancelPromiseController.wrapPromise(e).then((t=>this._searchSuccess(t)),(t=>{var i;if("abort"!==t.type)throw null===(i=this._loadingRef.value)||void 0===i||i.failure(),t}))}}_searchSuccess(t){var i,s;this._searchPage=1;const{pageSize:e,hasNext:n,numResults:r,numPages:o,results:l}={hasNext:Boolean(t.results.length),...t};l.length?null===(i=this._loadingRef.value)||void 0===i||i.success():null===(s=this._loadingRef.value)||void 0===s||s.noResults(),this.resultsInfo=this._getResultsInfo(l.length,this._paginator.page,{pageSize:e,totalResults:r}),this.searchResults=l,this._paginator.hasNext=n,this._paginator.numPages=o}formToObject(t){return Object.fromEntries(t)}_resetComponent(){var t;this._searchData=void 0,null===(t=this._loadingRef.value)||void 0===t||t.success(),this.resultsInfo="",this.searchResults=[],this._paginator.page=1,this._paginator.numPages=void 0,this._paginator.hasNext=!1}_updateData(t){t.preventDefault(),t.stopPropagation(),this._searchData=this.formToObject(t.detail.data),this._paginator.page=this._searchPage,this._search()}_getResultsInfo(t,i,s){const e=[];if(t>0&&null!=s.pageSize){const n=(i-1)*s.pageSize+1,r=n+t-1,o=`${n.toLocaleString()}-${r.toLocaleString()}`;e.push(o)}if(void 0!==s.totalResults){e.length>0&&e.push("of");const t=1==s.totalResults?"":"s",i=`${s.totalResults.toLocaleString()} result${t}`;e.push(i)}return e.join(" ")}renderForm(){throw new Error("Method not implemented")}renderResultsInfo(){return this.resultsInfo?L`<p>${this.resultsInfo}</p>`:L``}renderResults(){return L`
      <lis-simple-table-element
        .dataAttributes=${this.resultAttributes}
        .header=${this.tableHeader}
        .data=${this.searchResults}>
      </lis-simple-table-element>
    `}render(){const t=this.renderForm(),i=this.renderResultsInfo(),s=this.renderResults();return L`

      <lis-form-wrapper-element ${Rt(this._formRef)} @submit="${this._updateData}">
        ${t}
      </lis-form-wrapper-element>

      ${i}

      <div class="uk-inline uk-width-1-1">
        <lis-loading-element ${Rt(this._loadingRef)}></lis-loading-element>
        ${s}
      </div>

      <lis-pagination-element
        .scrollTarget=${this._formRef.value}
        page=${this.queryStringController.getParameter("page","1")}
        @pageChange=${this._changePage}>
      </lis-pagination-element>

    `}}return Kt([lt({type:Function,attribute:!1})],i.prototype,"searchFunction",void 0),Kt([ht()],i.prototype,"requiredQueryStringParams",void 0),Kt([ht()],i.prototype,"resultAttributes",void 0),Kt([ht()],i.prototype,"searchResults",void 0),Kt([ht()],i.prototype,"resultsInfo",void 0),Kt([ht()],i.prototype,"tableHeader",void 0),Kt([ht()],i.prototype,"_searchData",void 0),Kt([ut("lis-pagination-element")],i.prototype,"_paginator",void 0),i};var Xt=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let ti=class extends(Yt(st)()){constructor(){super(),this.formData={genuses:[]},this.formDataFunction=()=>Promise.reject(new Error("No form data function provided")),this.selectedGenus=0,this.selectedSpecies=0,this.selectedStrain=0,this.formDataCancelPromiseController=new Mt(this),this._formLoadingRef=At(),this.requiredQueryStringParams=[["genus"],["genus","species"],["genus","species","strain"],["identifier"],["description"],["family"]];const t={genuses:[]},i=this.queryStringController.getParameter("genus");if(i){t.genuses.push({genus:i,species:[]});const s=this.queryStringController.getParameter("species");if(s){t.genuses[0].species.push({species:s,strains:[]});const i=this.queryStringController.getParameter("strain");i&&t.genuses[0].species[0].strains.push({strain:i})}}this.formData=t,this.queryStringController.addPreUpdateListener((t=>{this._initializeSelections()}))}updated(t){t.has("formDataFunction")&&this._getFormData(),t.has("formData")&&this._initializeSelections()}_getFormData(){var t;null===(t=this._formLoadingRef.value)||void 0===t||t.loading(),this.formDataCancelPromiseController.cancel();const i={abortSignal:this.formDataCancelPromiseController.abortSignal},s=this.formDataFunction(i);this.formDataCancelPromiseController.wrapPromise(s).then((t=>{var i;null===(i=this._formLoadingRef.value)||void 0===i||i.success(),this.formData=t}),(t=>{var i;if("abort"!==t.type)throw null===(i=this._formLoadingRef.value)||void 0===i||i.failure(),t}))}_initializeSelections(){const t=this.queryStringController.getParameter("genus");this.selectedGenus=t?this.formData.genuses.map((({genus:t})=>t)).indexOf(t)+1:0;const i=this.queryStringController.getParameter("species");this.selectedGenus&&i?this.selectedSpecies=this.formData.genuses[this.selectedGenus-1].species.map((({species:t})=>t)).indexOf(i)+1:this.selectedSpecies=0;const s=this.queryStringController.getParameter("strain");this.selectedSpecies&&s?this.selectedStrain=this.formData.genuses[this.selectedGenus-1].species[this.selectedSpecies-1].strains.map((({strain:t})=>t)).indexOf(s)+1:this.selectedStrain=0}_selectGenus(t){this.selectedGenus=t.target.selectedIndex,this.selectedSpecies=0,this.selectedStrain=0}_renderGenusSelector(){const t=this.formData.genuses.map((({genus:t})=>L`<option value="${t}">${t}</option>`));return L`
      <select class="uk-select uk-form-small" name="genus"
        .selectedIndex=${Vt(this.selectedGenus)}
        @change="${this._selectGenus}">
        <option value="">-- any --</option>
        ${t}
      </select>
    `}_selectSpecies(t){this.selectedSpecies=t.target.selectedIndex,this.selectedStrain=0}_renderSpeciesSelector(){let t=[L``];return this.selectedGenus&&(t=this.formData.genuses[this.selectedGenus-1].species.map((({species:t})=>L`<option value="${t}">${t}</option>`))),L`
      <select class="uk-select uk-form-small" name="species"
        .selectedIndex=${Vt(this.selectedSpecies)}
        @change="${this._selectSpecies}">
        <option value="">-- any --</option>
        ${t}
      </select>
    `}_selectStrain(t){this.selectedStrain=t.target.selectedIndex}_renderStrainSelector(){let t=[L``];return this.selectedSpecies&&(t=this.formData.genuses[this.selectedGenus-1].species[this.selectedSpecies-1].strains.map((({strain:t})=>L`<option value="${t}">${t}</option>`))),L`
      <select class="uk-select uk-form-small" name="strain"
        .selectedIndex=${Vt(this.selectedStrain)}
        @change="${this._selectStrain}">
        <option value="">-- any --</option>
        ${t}
      </select>
    `}renderForm(){const t=this._renderGenusSelector(),i=this._renderSpeciesSelector(),s=this._renderStrainSelector();return L`
      <form class="uk-form-stacked uk-inline">
        <fieldset class="uk-fieldset">
          <legend class="uk-legend">Gene Search</legend>
          <lis-loading-element ${Rt(this._formLoadingRef)}></lis-loading-element>
          <div class="uk-margin uk-grid-small" uk-grid>
            <div class="uk-width-1-3@s">
              <label class="uk-form-label" for="genus">Genus</label>
              ${t}
            </div>
            <div class="uk-width-1-3@s">
              <label class="uk-form-label" for="species">Species</label>
              ${i}
            </div>
            <div class="uk-width-1-3@s">
              <label class="uk-form-label" for="strain">Strain</label>
              ${s}
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
    `}_renderLocation(t){var i;const s=L`<b>location:</b>`;if(!(null===(i=t.locations)||void 0===i?void 0:i.length))return L`${s} None`;const[e,...n]=t.locations;return L`
      <div>
        ${s} ${Nt(e)}
      </div>
    `}_renderGeneFamily(t){var i;const s=L`<b>gene family:</b>`;if(!(null===(i=t.geneFamilyAssignments)||void 0===i?void 0:i.length))return L`${s} None`;const[e,...n]=t.geneFamilyAssignments;return L`
      <div>
        ${s} ${Nt(e)}
      </div>
    `}_renderResult(t){const i=this._renderLocation(t),s=this._renderGeneFamily(t),e=null!=(null==t?void 0:t.name)?L`${Nt(t.name)}`:L`no name`;return L`
      <div>
        <div>
          <b>${Nt(t.identifier)}</b> (${e}) <span class="uk-text-italic">${Nt(t.genus)} ${Nt(t.species)}</span> ${Nt(t.strain)}
        </div>
        <div class="uk-text-italic">
          ${Nt(t.description)}
        </div>
        ${i}
        ${s}
        <hr>
      </div>
    `}renderResults(){return this.searchResults.map((t=>this._renderResult(t)))}};ti.styles=r``,Xt([lt()],ti.prototype,"formData",void 0),Xt([lt({type:Function,attribute:!1})],ti.prototype,"formDataFunction",void 0),Xt([ht()],ti.prototype,"selectedGenus",void 0),Xt([ht()],ti.prototype,"selectedSpecies",void 0),Xt([ht()],ti.prototype,"selectedStrain",void 0),ti=Xt([nt("lis-gene-search-element")],ti);var ii=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let si=class extends(Yt(st)()){constructor(){super(),this.requiredQueryStringParams=[["query"]],this.resultAttributes=["name","identifier","description"],this.tableHeader={name:"Name",identifier:"Identifier",description:"Description"}}renderForm(){return L`
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
`}};si.styles=r``,si=ii([nt("lis-trait-search-element")],si);var ei=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let ni=class extends(Yt(st)()){constructor(){super(),this.requiredQueryStringParams=[["query"]],this.resultAttributes=["trait_name","identifier","linkageGroup_geneticMap_identifier","linkageGroup_identifier","start","end","markerNames"],this.tableHeader={trait_name:"Trait",identifier:"QTL",linkageGroup_geneticMap_identifier:"Genetic Map",linkageGroup_identifier:"Linkage Group",start:"Start",end:"End",markerNames:"Markers"}}renderForm(){return L`
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
`}};ni.styles=r``,ni=ei([nt("lis-qtl-search-element")],ni);var ri=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let oi=class extends(Yt(st)()){constructor(){super(),this.requiredQueryStringParams=[["query"]],this.resultAttributes=["year","title","journal","firstAuthor","doi","pubMedId"],this.tableHeader={year:"Year",title:"Title",journal:"Journal",firstAuthor:"First Author",doi:"DOI",pubMedId:"PubMed"}}renderForm(){return L`
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
`}};oi.styles=r``,oi=ri([nt("lis-publication-search-element")],oi);var li=function(t,i,s,e){for(var n,r=arguments.length,o=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,s,o):n(i,s))||o);return r>3&&o&&Object.defineProperty(i,s,o),o};let hi=class extends st{constructor(){super(...arguments),this.cancelPromiseController=new Mt(this),this.queryString="",this.service="gene_linkouts",this.linkoutFunction=()=>Promise.reject(new Error("No linkout function provided")),this._loadingRef=At()}createRenderRoot(){return this}getLinkouts(t){var i;this._table.data=[],null===(i=this._loadingRef.value)||void 0===i||i.loading(),this.cancelPromiseController.cancel();const s={abortSignal:this.cancelPromiseController.abortSignal},e=this.linkoutFunction(t,s);this.cancelPromiseController.wrapPromise(e).then((t=>this._linkoutSuccess(t)),(t=>{var i;if("abort"!==t.type)throw null===(i=this._loadingRef.value)||void 0===i||i.failure(),t}))}_linkoutSuccess(t){var i,s;const{results:e}=t;e.length?null===(i=this._loadingRef.value)||void 0===i||i.success():null===(s=this._loadingRef.value)||void 0===s||s.noResults();const n=e.map((t=>({linkout:`<a href="${t.href}">${t.text}.</a>`})));this._table.data=n}render(){return L`
      <div class="uk-inline uk-width-1-1">
        <lis-loading-element ${Rt(this._loadingRef)}></lis-loading-element>
        <lis-simple-table-element
          caption=""
          .dataAttributes=${["linkout"]}
          .header=${{linkout:"Linkouts"}}>
        </lis-simple-table-element>
      </div>
    `}};hi.styles=r``,li([lt({type:String,reflect:!0})],hi.prototype,"queryString",void 0),li([lt({type:String})],hi.prototype,"service",void 0),li([lt({type:Function,attribute:!1})],hi.prototype,"linkoutFunction",void 0),li([ut("lis-simple-table-element")],hi.prototype,"_table",void 0),hi=li([nt("lis-linkout-element")],hi);export{Ut as LisAlertElement,Gt as LisFormWrapperElement,ti as LisGeneSearchElement,hi as LisLinkoutElement,Zt as LisLoadingElement,Qt as LisModalElement,zt as LisPaginationElement,oi as LisPublicationSearchElement,ni as LisQTLSearchElement,Bt as LisSimpleTableElement,si as LisTraitSearchElement};
