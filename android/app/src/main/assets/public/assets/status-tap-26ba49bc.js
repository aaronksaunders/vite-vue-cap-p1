import{a8 as r,a9 as i,aa as c,ab as d,ac as l}from"./index-edb0c6b6.js";/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const m=()=>{const e=window;e.addEventListener("statusTap",()=>{r(()=>{const o=e.innerWidth,s=e.innerHeight,n=document.elementFromPoint(o/2,s/2);if(!n)return;const t=i(n);t&&new Promise(a=>c(t,a)).then(()=>{d(async()=>{t.style.setProperty("--overflow","hidden"),await l(t,300),t.style.removeProperty("--overflow")})})})})};export{m as startStatusTap};
