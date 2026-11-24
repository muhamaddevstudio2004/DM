/* Academic Builder — offline cache for the Report app (scope: this folder only) */
const C="ab-report-v1";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(["./","manifest.json","icon-192.png","/codes.js"]).catch(()=>{})))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n.indexOf("ab-report-")===0&&n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
const put=(req,res)=>{if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(C).then(c=>c.put(req,cp)).catch(()=>{})}return res};
/* app page + codes.js: always the newest when online (4 s limit), the saved copy when offline */
const netFirst=req=>new Promise(res=>{let done=false;const fb=()=>caches.match(req,{ignoreSearch:true}).then(r=>r||caches.match("./"));
 const t=setTimeout(()=>{fb().then(r=>{if(r&&!done){done=true;res(r)}})},4000);
 fetch(req).then(r=>{clearTimeout(t);put(req,r);if(!done){done=true;res(r)}}).catch(()=>{clearTimeout(t);fb().then(r=>{if(!done){done=true;res(r||Response.error())}})})});
/* libraries and font files never change at the same address: saved copy first */
const cacheFirst=req=>caches.match(req).then(r=>r||fetch(req).then(x=>put(req,x)));
/* Google font list: saved copy at once, refreshed in the background */
const swr=req=>caches.match(req).then(r=>{const f=fetch(req).then(x=>put(req,x)).catch(()=>r);return r||f});
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!=="GET")return;let u;try{u=new URL(q.url)}catch(x){return}
 if(/supabase\.co$/.test(u.hostname))return;                       /* codes and downloads: always live */
 if(u.hostname==="cdnjs.cloudflare.com"||u.hostname==="fonts.gstatic.com")return e.respondWith(cacheFirst(q));
 if(u.hostname==="fonts.googleapis.com")return e.respondWith(swr(q));
 if(u.origin===location.origin){
  if(q.mode==="navigate"||u.pathname==="/codes.js")return e.respondWith(netFirst(q));
  if(u.pathname.indexOf(new URL("./",self.registration.scope).pathname)===0)return e.respondWith(swr(q))}
});
