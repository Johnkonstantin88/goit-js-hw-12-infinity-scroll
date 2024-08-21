import{a as S,S as v,i as g}from"./assets/vendor-dfaf2a6e.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();async function h(t=1,a,n){const s="42027897-ca60981f5971518ff8fefcb8b",e="https://pixabay.com/api/",o=new URLSearchParams({key:s,q:`${a}`,image_type:"photo",orientation:"horizontal",safesearcg:!0,page:t,per_page:`${n}`});return(await S.get(`${e}?${o}`)).data}function m(t){return t.map(({webformatURL:a,largeImageURL:n,tags:s,likes:e,views:o,comments:i,downloads:L})=>`<li class="photo-card">
  <a class="gallery__link" href="${n}">
  <img src="${a}" alt="${s}" class="gallery__image" width="300" height="200" loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${e}</b>
    </p>
    <p class="info-item">
      <b>Views ${o}</b>
    </p>
    <p class="info-item">
      <b>Comments ${i}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${L}</b>
    </p>
  </div>
</li>`).join("")}const r={form:document.querySelector("#search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),target:document.querySelector(".js-guard")};r.form.addEventListener("submit",P);const $=' <span class="css-loader"></span>';r.loader.insertAdjacentHTML("beforeend",$);r.loader.hidden=!0;let c=1,l="";const u=15,w={root:null,rootMargin:"200px",threshold:1};let p=new v(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}),d=new IntersectionObserver(q,w);async function P(t){t.preventDefault(),d.unobserve(r.target),r.gallery.innerHTML="",r.loader.hidden=!1,c=1;const{searchQuery:a}=t.currentTarget.elements;if(l=a.value.trim().toLowerCase(),l===""){f("Sorry, but you must enter your search query. Please try again.");return}try{const{hits:n,totalHits:s}=await h(c,l,u);n.length<1&&y("Sorry, there are no images matching your search query. Please try again."),r.gallery.insertAdjacentHTML("beforeend",m(n)),p.refresh(),n.length<1||g.success({title:"Success",message:`We found ${s} images for you.`}),s>u&&d.observe(r.target),n.length>0&&b(),r.loader.hidden=!0,r.form.reset()}catch(n){f(n.message)}}function q(t){t.forEach(a=>{a.isIntersecting&&(r.loader.hidden=!1,c+=1,h(c,l,u).then(n=>{const{hits:s}=n;r.gallery.insertAdjacentHTML("beforeend",m(s)),p.refresh(),s.length<u&&(d.unobserve(r.target),y("We're sorry, but you've reached the end of search results."),r.loader.hidden=!0),s.length>0&&b(),r.loader.hidden=!0}).catch(f))})}function f(t){r.loader.hidden=!0,r.form.reset(),g.error({title:"Error",message:`${t}`})}function y(t){g.warning({title:"Warning",message:`${t}`})}function b(){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
