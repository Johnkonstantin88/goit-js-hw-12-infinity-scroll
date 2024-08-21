import{a as S,S as $,i as g}from"./assets/vendor-dfaf2a6e.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(e){if(e.ep)return;e.ep=!0;const n=a(e);fetch(e.href,n)}})();async function h(t=1,s,a){const o="42027897-ca60981f5971518ff8fefcb8b",e="https://pixabay.com/api/",n=new URLSearchParams({key:o,q:`${s}`,image_type:"photo",orientation:"horizontal",safesearcg:!0,page:t,per_page:`${a}`});return(await S.get(`${e}?${n}`)).data}function m(t){return t.map(({webformatURL:s,largeImageURL:a,tags:o,likes:e,views:n,comments:i,downloads:L})=>`<li class="photo-card">
  <a class="gallery__link" href="${a}">
  <img src="${s}" alt="${o}" class="gallery__image" width="300" height="200" loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${e}</b>
    </p>
    <p class="info-item">
      <b>Views ${n}</b>
    </p>
    <p class="info-item">
      <b>Comments ${i}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${L}</b>
    </p>
  </div>
</li>`).join("")}const r={form:document.querySelector("#search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),target:document.querySelector(".js-guard")};r.form.addEventListener("submit",P);const v=' <span class="css-loader"></span>';r.loader.insertAdjacentHTML("beforeend",v);r.loader.hidden=!0;let l=1,c="";const u=15,w={root:null,rootMargin:"350px",threshold:1};let p=new $(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}),d=new IntersectionObserver(q,w);function P(t){t.preventDefault(),d.unobserve(r.target),r.gallery.innerHTML="",r.loader.hidden=!1,l=1,console.log(l);const{searchQuery:s}=t.currentTarget.elements;if(c=s.value.trim().toLowerCase(),c===""){f("Sorry, but you must enter your search query. Please try again.");return}h(l,c,u).then(a=>{const{hits:o,totalHits:e}=a;o.length<1&&y("Sorry, there are no images matching your search query. Please try again."),r.gallery.insertAdjacentHTML("beforeend",m(o)),p.refresh(),o.length<1||g.success({title:"Success",message:`We found ${e} images for you.`}),e>u&&d.observe(r.target),o.length>0&&b(),r.loader.hidden=!0,r.form.reset()}).catch(f)}function q(t){t.forEach(s=>{s.isIntersecting&&(r.loader.hidden=!1,l+=1,h(l,c,u).then(a=>{const{hits:o}=a;r.gallery.insertAdjacentHTML("beforeend",m(o)),p.refresh(),o.length<u&&(d.unobserve(r.target),y("We're sorry, but you've reached the end of search results."),r.loader.hidden=!0),o.length>0&&b(),r.loader.hidden=!0}).catch(f))})}function f(t=`${t.name}: ${t.message}`){r.loader.hidden=!0,r.form.reset(),g.error({title:"Error",message:`${t}`})}function y(t){g.warning({title:"Warning",message:`${t}`})}function b(){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
