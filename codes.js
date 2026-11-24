/* =====================================================================
   Academic Builder — shared download codes, print-shop mode and admin panel
   Used by BOTH report.html and seminar.html (one Supabase for both).
   ===================================================================== */
(function(){
"use strict";
/* ---- one Supabase for both systems ---- */
const CFG={
 url:"https://niiznyukddmmdqajmpcl.supabase.co",      /* Project Settings > API > Project URL */
 key:"sb_publishable_wnhwx9LqUR5JnI4A_iVFjA_qvIGv7Lj",  /* Project Settings > API > anon / publishable key */
 wa:"9647509628683"                                   /* your WhatsApp number */
};
const A=window.ACodes={};
let APP="report",LEG=null,VER="",LANG=()=>"en",ON=()=>{};
const X=s=>String(s==null?"":s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const LS={g:(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:v}catch(x){return d}},s:(k,v)=>{try{localStorage.setItem(k,v)}catch(x){}},r:k=>{try{localStorage.removeItem(k)}catch(x){}}};
const cfgOk=()=>CFG.url.indexOf("YOUR_")!==0&&CFG.key.indexOf("YOUR_")!==0;
const call=async(base,key,fn,body)=>{const r=await fetch(base.replace(/\/+$/,"")+"/rest/v1/rpc/"+fn,{method:"POST",headers:{"Content-Type":"application/json","apikey":key,"Authorization":"Bearer "+key},body:JSON.stringify(body)});
 if(r.status===404){const er=new Error("missing");er.missing=1;throw er}if(!r.ok)throw new Error("http "+r.status);return await r.json()};
const rpc=async(fn,body)=>{if(!cfgOk())return{error:"cfg"};try{const v=await call(CFG.url,CFG.key,fn,body);return v&&typeof v==="object"?v:{error:"net"}}catch(x){return{error:x&&x.missing?"sql":"net"}}};
A.rpc=rpc;

/* ---- this device ---- */
const DID=(()=>{let v=LS.g("ab-device","");if(!/^[A-Za-z0-9-]{8,64}$/.test(v)){try{v=crypto.randomUUID?crypto.randomUUID():Array.from(crypto.getRandomValues(new Uint8Array(16)),b=>b.toString(16).padStart(2,"0")).join("")}catch(x){v="d"+Date.now().toString(36)+Math.random().toString(36).slice(2,12)}LS.s("ab-device",v)}return v})();
const devOf=()=>{const u=navigator.userAgent||"",ip=/iPhone|iPad|iPod/.test(u)||(navigator.maxTouchPoints>1&&/Macintosh/.test(u)),tb=/iPad|Tablet/i.test(u)||(/Android/i.test(u)&&!/Mobile/i.test(u))||(ip&&!/iPhone|iPod/.test(u)),k=tb?"tablet":/Mobi|iPhone|Android/i.test(u)?"mobile":"desktop",os=ip?"iOS":/Android/i.test(u)?"Android":/Windows/i.test(u)?"Windows":/Mac/i.test(u)?"macOS":/Linux/i.test(u)?"Linux":"?",br=/Edg\//.test(u)?"Edge":/OPR\//.test(u)?"Opera":/Firefox|FxiOS/.test(u)?"Firefox":/Chrome|CriOS/.test(u)?"Chrome":/Safari/.test(u)?"Safari":"?";return k+"|"+os+"|"+br};

/* ---- print-shop subscription stored on this device (shared by Report and Seminar on the same website) ---- */
const SHK="ab-shop";
const shopGet=()=>{try{const o=JSON.parse(LS.g(SHK,"null"));return o&&o.t?o:null}catch(x){return null}};
const shopSet=o=>LS.s(SHK,JSON.stringify(o));
const shopDel=()=>LS.r(SHK);
const daysLeft=iso=>iso?Math.ceil((new Date(iso)-Date.now())/864e5):null;
const fdate=iso=>{const d=new Date(iso);return isNaN(d)?"":d.getFullYear()+"/"+String(d.getMonth()+1).padStart(2,"0")+"/"+String(d.getDate()).padStart(2,"0")};

/* ---- texts (English / Kurdish / Arabic) ---- */
const TX={
 en:{inst:"Install as an app",instD:"Opens faster, full screen, from your home screen.",instIos:"In Safari tap Share ⬆ then “Add to Home Screen”.",instB:"Install",t:"Download code",dr:"You need a code to download the report. The watermark is not in the downloaded file.",ds:"You need a code to download the seminar. The watermark is not in the downloaded file.",shopHint:"Print shop? Enter your monthly code once. It then works on this device for the whole month without a code.",ph:"Enter code",ok:"Confirm",wa:"Get a code on WhatsApp",x:"Close",chk:"Checking…",
  invalid:"Invalid code.",used:"This code was already used.",expired:"This code has expired.",paused:"This code is paused. Please contact us.",wrong_report:"This code works only in the Seminar system.",wrong_seminar:"This code works only in the Report system.",devices:"This code is already active on the maximum number of devices.",limit:"Too many attempts. Please wait a moment and try again.",net:"No internet connection. Please try again.",cfg:"The system is not configured.",
  msg:"Hello, I would like to get a download code.",shop:"Print shop",act:"Print shop activated ✓ until {d}",left:"{k} days left",lastDay:"Last day",soon:"Your subscription ends in {k} day(s).",ended:"Your print-shop subscription has ended.",pausedB:"Your print-shop subscription is paused.",renew:"Renew on WhatsApp",renewMsg:"Hello, I would like to renew the print-shop subscription: {n}",out:"Sign out",sure:"Sure? Tap again",otherApp:"This subscription is not for this system.",checking:"Checking subscription…"},
 ckb:{inst:"وەک ئەپ دایبمەزرێنە",instD:"خێراتر دەکرێتەوە، پڕ بە شاشە، ڕاستەوخۆ لە شاشەی سەرەکی.",instIos:"لە Safari دوگمەی Share ⬆ دابگرە، پاشان «Add to Home Screen».",instB:"دامەزراندن",t:"کۆدی دابەزاندن",dr:"بۆ دابەزاندنی ڕاپۆرتەکە کۆدێکت پێویستە. watermark لە فایلی دابەزێنراودا نابێت.",ds:"بۆ دابەزاندنی سیمینارەکە کۆدێکت پێویستە. watermark لە فایلی دابەزێنراودا نابێت.",shopHint:"پەراوگەیت؟ کۆدی مانگانەکەت تەنها یەکجار بنووسە، دواتر بۆ هەموو ماوەی بەشداربوونەکەت لەسەر ئەم ئامێرە بێ کۆد دادەبەزێنیت.",ph:"کۆد بنووسە",ok:"دڵنیاکردنەوە",wa:"وەرگرتنی کۆد لە واتساپ",x:"داخستن",chk:"پشکنین…",
  invalid:"کۆدەکە هەڵەیە.",used:"ئەم کۆدە پێشتر بەکارهێنراوە.",expired:"ئەم کۆدە بەسەرچووە.",paused:"ئەم کۆدە ڕاگیراوە. پەیوەندیمان پێوە بکە.",wrong_report:"ئەم کۆدە تەنها لە سیستەمی سیمینار کار دەکات.",wrong_seminar:"ئەم کۆدە تەنها لە سیستەمی ڕاپۆرت کار دەکات.",devices:"ئەم کۆدە لەسەر زۆرترین ژمارەی ئامێری ڕێگەپێدراو چالاک کراوە.",limit:"هەوڵی زۆر درا. کەمێک چاوەڕێ بکە و دووبارە هەوڵ بدەوە.",net:"پەیوەندی بە ئینتەرنێتەوە نییە. دووبارە هەوڵ بدەوە.",cfg:"سیستەمەکە ڕێکنەخراوە.",
  msg:"سڵاو، دەمەوێت کۆدی دابەزاندن وەربگرم.",shop:"پەراوگە",act:"پەراوگە چالاک کرا ✓ تا {d}",left:"{k} ڕۆژ ماوە",lastDay:"دوایین ڕۆژە",soon:"بەشداربوونەکەت {k} ڕۆژی تر تەواو دەبێت.",ended:"بەشداربوونی پەراوگەکەت تەواو بووە.",pausedB:"بەشداربوونی پەراوگەکەت ڕاگیراوە.",renew:"نوێکردنەوە بە واتساپ",renewMsg:"سڵاو، دەمەوێت بەشداربوونی پەراوگە نوێ بکەمەوە: {n}",out:"دەرچوون",sure:"دڵنیایت؟ دووبارە دابگرە",otherApp:"ئەم بەشداربوونە بۆ ئەم سیستەمە نییە.",checking:"پشکنینی بەشداربوون…"},
 ar:{inst:"ثبّته كتطبيق",instD:"يفتح أسرع وبملء الشاشة من الشاشة الرئيسية.",instIos:"في Safari اضغط مشاركة ⬆ ثم «إضافة إلى الشاشة الرئيسية».",instB:"تثبيت",t:"رمز التحميل",dr:"تحتاج إلى رمز لتحميل التقرير. العلامة المائية لا تكون في الملف الذي يتم تنزيله.",ds:"تحتاج إلى رمز لتحميل السمنار. العلامة المائية لا تكون في الملف الذي يتم تنزيله.",shopHint:"مكتبة طباعة؟ أدخل رمزك الشهري مرة واحدة فقط، وبعدها تحمّل على هذا الجهاز طوال مدة الاشتراك بدون رمز.",ph:"اكتب الرمز",ok:"تأكيد",wa:"الحصول على الرمز عبر واتساب",x:"إغلاق",chk:"جارٍ التحقق…",
  invalid:"الرمز غير صحيح.",used:"تم استخدام هذا الرمز من قبل.",expired:"انتهت صلاحية هذا الرمز.",paused:"هذا الرمز موقوف. تواصل معنا.",wrong_report:"هذا الرمز يعمل في نظام السمنار فقط.",wrong_seminar:"هذا الرمز يعمل في نظام التقرير فقط.",devices:"هذا الرمز مفعّل على الحد الأقصى من الأجهزة.",limit:"محاولات كثيرة. انتظر قليلاً ثم أعد المحاولة.",net:"لا يوجد اتصال بالإنترنت. أعد المحاولة.",cfg:"النظام غير مُعدّ.",
  msg:"مرحباً، أريد الحصول على رمز التحميل.",shop:"مكتبة",act:"تم تفعيل المكتبة ✓ حتى {d}",left:"متبقٍ {k} يوم",lastDay:"اليوم الأخير",soon:"ينتهي اشتراكك بعد {k} يوم.",ended:"انتهى اشتراك المكتبة.",pausedB:"اشتراك المكتبة موقوف.",renew:"التجديد عبر واتساب",renewMsg:"مرحباً، أريد تجديد اشتراك المكتبة: {n}",out:"خروج",sure:"متأكد؟ اضغط مرة أخرى",otherApp:"هذا الاشتراك ليس لهذا النظام.",checking:"جارٍ التحقق من الاشتراك…"}};
const TL=()=>TX[LANG()]||TX.en;
const msgFor=r=>{const L=TL(),k=r&&r.r;if(k==="wrong_app")return L["wrong_"+APP];return L[k]||L.net};

/* ---- small UI helpers ---- */
const IC={dl:'<path d="M12 3v12m0 0l-5-5m5 5l5-5M4 19h16"/>',shop:'<path d="M3 9l1.5-5h15L21 9M3 9h18M3 9v1.5a3 3 0 006 0V9m0 1.5a3 3 0 006 0V9m0 1.5a3 3 0 006 0V9M5 13v8h14v-8M10 21v-5h4v5"/>',wa:'<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z"/>',out:'<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>'};
const svg=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]}</svg>`;
function css(){if(document.getElementById("ab-css"))return;const s=document.createElement("style");s.id="ab-css";s.textContent=`
.abb{display:flex;align-items:center;gap:12px;margin:0 0 12px;padding:12px 14px;border:1.5px solid var(--bd);border-inline-start:5px solid #2e7d4f;border-radius:14px;background:var(--card,#fff);color:var(--fg)}
.abb.warn{border-inline-start-color:#c98a00;background:#fffaf0}.abb.bad{border-inline-start-color:#b00020;background:#fff5f6}
.abb .abb-ic{flex:none;width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:var(--ac);color:var(--yl)}.abb .abb-ic svg{width:22px;height:22px}
.abb .abb-tx{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.abb .abb-tx b{font-size:15px;color:var(--ac);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.abb .abb-tx small{font-size:13px;color:var(--mut);line-height:1.4}
.abb.warn .abb-tx small{color:#8a5a00;font-weight:700}.abb.bad .abb-tx small{color:#b00020;font-weight:700}
.abb button{flex:none;min-height:40px;padding:6px 10px;border-radius:10px;font-size:12px;font-weight:700;gap:5px}.abb button svg{width:17px;height:17px}
.abb .abb-wa{background:var(--ac);color:var(--yl);border-color:var(--ac)}.abb .abb-out.arm{color:#b00020;border-color:#b00020}
.abi{display:flex;align-items:center;gap:12px;margin:0 0 12px;padding:10px 12px;border:1.5px dashed var(--bd);border-radius:14px;background:var(--card,#fff);color:var(--fg)}
.abi .abb-ic{flex:none;width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:var(--yl);color:var(--ac)}.abi .abb-ic svg{width:20px;height:20px}
.abi .abb-tx{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.abi .abb-tx b{font-size:14px;color:var(--ac)}.abi .abb-tx small{font-size:12.5px;color:var(--mut);line-height:1.45}
.abi button{flex:none;min-height:38px;padding:6px 12px;border-radius:10px;font-size:13px;font-weight:700}.abi .abi-go{background:var(--ac);color:var(--yl);border-color:var(--ac)}.abi .abi-x{min-width:38px;padding:0;font-size:18px;line-height:1;color:var(--mut);background:none;border:none}
.abb-row{display:flex;flex-direction:column;gap:6px}@media(max-width:420px){.abb{flex-wrap:wrap}.abb .abb-tx{flex:1 1 60%}.abb-row{flex-direction:row;width:100%}.abb-row button{flex:1}}
#abt{position:fixed;left:50%;transform:translateX(-50%);bottom:96px;background:#2b2340;color:#fff;padding:10px 18px;border-radius:22px;font:600 14px/1.3 system-ui,sans-serif;z-index:100001;max-width:86vw;text-align:center;box-shadow:0 4px 14px rgba(0,0,0,.3)}`;document.head.appendChild(s)}
function toast(m,ms){let t=document.getElementById("abt");if(!t){t=document.createElement("div");t.id="abt";document.body.appendChild(t)}t.textContent=m;t.hidden=!m;clearTimeout(t._t);if(ms)t._t=setTimeout(()=>{t.hidden=true},ms)}

/* ---- code dialog ---- */
async function redeemAll(c){
 const r=await rpc("redeem",{p_code:c,p_app:APP,p_device:DID,p_info:devOf()});
 /* codes sold before the merge still work: they are checked in the old project */
 if(LEG&&(r.error==="sql"||r.r==="invalid")){try{const v=await call(LEG.url,LEG.key,"redeem_any",{p_code:c});if(v==="ok"){try{call(LEG.url,LEG.key,"log_code_use",{p_code:c,p_device:devOf()}).catch(()=>{})}catch(x){}return{r:"ok",legacy:1}}if(r.error&&typeof v==="string")return{r:v}}catch(x){}}
 if(r.error)return{r:r.error==="sql"?"cfg":r.error};return r}
function dialog(action,pre){
 if(document.getElementById("dlg"))return;
 const L=TL(),o=document.createElement("div");o.id="dlg";
 o.style.cssText="position:fixed;inset:0;z-index:99999;background:rgba(15,25,50,.5);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;padding:18px;padding-top:calc(18px + env(safe-area-inset-top,0px));padding-bottom:calc(18px + env(safe-area-inset-bottom,0px))";
 o.innerHTML=`<style>
 #dlg .dc{background:var(--card,#fff);color:var(--fg,#0f2a52);border:1px solid var(--bd,#c9d6ea);border-top:4px solid var(--yl,#d8bb74);border-radius:14px;max-width:380px;width:100%;box-sizing:border-box;padding:22px 20px 16px;box-shadow:0 16px 44px rgba(15,42,82,.28);max-height:100%;overflow:auto}
 #dlg h3{margin:0;color:var(--ac,#143a7b);font-size:19px;font-weight:700}
 #dlg .rule{width:44px;height:2px;background:var(--yl,#d8bb74);margin:8px 0 12px;border-radius:2px}
 #dlg p.d{margin:0 0 10px;font-size:14px;color:var(--mut,#51627f);line-height:1.6}
 #dlg p.sh{display:flex;gap:8px;align-items:flex-start;margin:0 0 14px;padding:9px 11px;border-radius:10px;background:#fbf6e8;border:1px solid #e8d9a8;font-size:12.5px;line-height:1.55;color:#5a4a1a}#dlg p.sh svg{flex:none;width:18px;height:18px;margin-top:1px}
 #dlg #dlgc{width:100%;box-sizing:border-box;height:50px;text-align:center;letter-spacing:2px;font-weight:700;font-size:17px;border:1.5px solid var(--bd,#c9d6ea);border-radius:10px;background:var(--card,#fff);color:inherit;outline:none;transition:border-color .15s,box-shadow .15s;-webkit-user-select:text;user-select:text}
 #dlg #dlgc:focus{border-color:var(--ac,#143a7b);box-shadow:0 0 0 3px rgba(20,58,123,.14)}
 #dlg #dlgc::placeholder{letter-spacing:0;font-weight:400;color:var(--mut,#51627f);opacity:.7}
 #dlg .btn{width:100%;min-height:46px;border-radius:10px;font-weight:600;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box}
 #dlg #dlgok{background:var(--ac,#143a7b);color:var(--yl,#d8bb74);border:1px solid var(--ac,#143a7b)}
 #dlg #dlgok:disabled{opacity:.6}
 #dlg #dlgwa{background:transparent;color:var(--ac,#143a7b);border:1px solid var(--bd,#c9d6ea);margin-top:8px}
 #dlg #dlgwa svg{width:18px;height:18px}
 #dlg #dlgx{background:transparent;border:0;color:var(--mut,#51627f);font-weight:500;font-size:14px;min-height:40px;margin-top:4px}
 </style>
 <div class="dc" role="dialog" aria-modal="true">
 <h3>${X(L.t)}</h3><div class="rule"></div><p class="d">${X(APP==="seminar"?L.ds:L.dr)}</p><p class="sh">${svg("shop")}<span>${X(L.shopHint)}</span></p>
 <input id="dlgc" type="text" dir="ltr" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="${X(L.ph)}">
 <p id="dlge" style="min-height:20px;margin:8px 0 6px;color:#b00020;font-size:13px;text-align:center">${X(pre||"")}</p>
 <button id="dlgok" class="btn" type="button">${X(L.ok)}</button>
 <button id="dlgwa" class="btn" type="button">${svg("wa")}${X(L.wa)}</button>
 <button id="dlgx" class="btn" type="button">${X(L.x)}</button></div>`;
 document.body.appendChild(o);
 const inp=o.querySelector("#dlgc"),er=o.querySelector("#dlge"),ok=o.querySelector("#dlgok");let busy=false;
 const msg=(t,bad)=>{er.style.color=bad?"#b00020":"var(--mut,#51627f)";er.textContent=t};
 const close=()=>o.remove();
 const go=async()=>{if(busy)return;const c=inp.value.toUpperCase().replace(/[^A-Z0-9]/g,"");
  if(c.length<4){msg(L.invalid,true);return}
  busy=true;ok.disabled=true;msg(L.chk,false);const r=await redeemAll(c);busy=false;ok.disabled=false;
  if(r.r==="ok"){if(r.shop){shopSet({t:r.shop.token,title:r.shop.title||"",exp:r.shop.expires_at,apps:r.shop.apps||[APP],ok:Date.now(),st:"ok"});try{ON()}catch(x){}toast(TL().act.replace("{d}",fdate(r.shop.expires_at)),6000)}close();action();return}
  msg(msgFor(r),true)};
 ok.onclick=go;inp.onkeydown=ev=>{if(ev.key==="Enter")go()};
 o.querySelector("#dlgwa").onclick=()=>{window.open("https://wa.me/"+CFG.wa+"?text="+encodeURIComponent(L.msg),"_blank")};
 o.querySelector("#dlgx").onclick=close;
 setTimeout(()=>inp.focus(),50)}

/* one code / one active print-shop subscription = one download action */
A.gate=async function(action){
 if(document.getElementById("dlg")||A._busy)return;
 const sh=shopGet();
 if(sh&&(sh.apps||[]).includes(APP)){
  A._busy=true;toast(TL().checking);
  let r;try{r=await rpc("shop_use",{p_token:sh.t,p_app:APP,p_device:DID,p_info:devOf()})}finally{A._busy=false;toast("")}
  if(r.r==="ok"){shopSet(Object.assign(sh,{title:r.title||sh.title,exp:r.expires_at,apps:r.apps||sh.apps,ok:Date.now(),st:"ok"}));try{ON()}catch(x){}return action()}
  /* no internet for a moment: an active subscription that was checked in the last 24 hours keeps working */
  if(r.error==="net"&&sh.st==="ok"&&sh.exp&&new Date(sh.exp)>Date.now()&&Date.now()-(sh.ok||0)<864e5)return action();
  if(r.r==="invalid")shopDel();else if(r.r)shopSet(Object.assign(sh,{st:r.r,exp:r.expires_at||sh.exp,apps:r.apps||sh.apps}));
  try{ON()}catch(x){}
  return dialog(action,r.r&&r.r!=="invalid"?msgFor(r):"")}
 dialog(action)};

/* ---- print-shop status card on the home screen ---- */
/* ---- install as an app (PWA) ---- */
let BIP=null;
const standalone=()=>{try{return matchMedia("(display-mode: standalone)").matches||navigator.standalone===true}catch(x){return false}};
const iosSafari=()=>{const u=navigator.userAgent||"";return (/iPhone|iPad|iPod/.test(u)||(navigator.maxTouchPoints>1&&/Macintosh/.test(u)))&&/Safari\//.test(u)&&!/CriOS|FxiOS|EdgiOS|OPiOS/.test(u)};
addEventListener("beforeinstallprompt",ev=>{ev.preventDefault();BIP=ev;try{ON()}catch(x){}});
addEventListener("appinstalled",()=>{BIP=null;LS.s("ab-inst-x","1");try{ON()}catch(x){}});
A.installCard=function(){if(standalone()||LS.g("ab-inst-x","")==="1"||!document.querySelector('link[rel="manifest"]'))return"";const ios=iosSafari();if(!BIP&&!ios)return"";const L=TL();
 return `<div class="abi"><span class="abb-ic">${svg("dl")}</span><span class="abb-tx"><b>${X(L.inst)}</b><small>${X(ios?L.instIos:L.instD)}</small></span>${ios?"":`<button type="button" class="abi-go" data-ab="inst">${X(L.instB)}</button>`}<button type="button" class="abi-x" data-ab="instx" aria-label="${X(L.x)}">×</button></div>`};
A.homeBadge=function(){return badge()+A.installCard()};
const badge=function(){const sh=shopGet();if(!sh)return"";const L=TL(),n=sh.title||L.shop,k=daysLeft(sh.exp),st=sh.st||"ok",forApp=(sh.apps||[]).includes(APP);
 const bad=st!=="ok"||(k!=null&&k<=0),soon=!bad&&k!=null&&k<=3;
 const line=!forApp?L.otherApp:st==="paused"?L.pausedB:bad?L.ended:soon?(k<=1?L.lastDay:L.soon.replace("{k}",k)):(k==null?"":L.left.replace("{k}",k)+" · "+fdate(sh.exp));
 return `<div class="abb${bad||!forApp?" bad":soon?" warn":""}" role="status"><span class="abb-ic">${svg("shop")}</span><span class="abb-tx"><b dir="auto">${X(n)}</b><small>${X(line)}</small></span><span class="abb-row">${bad||soon?`<button type="button" class="abb-wa" data-ab="renew">${svg("wa")}<span>${X(L.renew)}</span></button>`:""}<button type="button" class="abb-out" data-ab="out">${svg("out")}<span>${X(L.out)}</span></button></span></div>`};
document.addEventListener("click",async ev=>{const b=ev.target.closest&&ev.target.closest("[data-ab]");if(!b)return;const a=b.dataset.ab,L=TL(),sh=shopGet();
 if(a==="inst"){if(BIP){const p=BIP;BIP=null;try{await p.prompt();await p.userChoice}catch(x){}try{ON()}catch(x){}}return}
 if(a==="instx"){LS.s("ab-inst-x","1");const c=b.closest(".abi");if(c)c.remove();return}
 if(a==="renew"){window.open("https://wa.me/"+CFG.wa+"?text="+encodeURIComponent(L.renewMsg.replace("{n}",(sh&&sh.title)||"")),"_blank");return}
 if(a==="out"){if(!b.dataset.arm){b.dataset.arm=1;b.classList.add("arm");const h=b.innerHTML;b.textContent=L.sure;setTimeout(()=>{if(b.isConnected){delete b.dataset.arm;b.classList.remove("arm");b.innerHTML=h}},3000);return}
  if(sh)rpc("shop_logout",{p_token:sh.t,p_device:DID});shopDel();try{ON()}catch(x){}}});
A.refresh=async function(){const sh=shopGet();if(!sh)return;const r=await rpc("shop_status",{p_token:sh.t,p_device:DID});if(r.error)return;
 if(r.r==="invalid")shopDel();else shopSet(Object.assign(sh,{title:r.title||sh.title,exp:r.expires_at,apps:r.apps||sh.apps,st:r.r,ok:r.r==="ok"?Date.now():sh.ok}));try{ON()}catch(x){}};

/* ---- error reporting ---- */
function errs(){
 if(!window.__cap){window.__errq=window.__errq||[];window.__onerr=null;
  window.__cap=function(m,w,st){try{m=String(m==null?"":m);if(!m||/^Script error\.?$/i.test(m)||/ResizeObserver loop/i.test(m)||/Non-Error promise rejection/i.test(m)||/Failed to fetch|Load failed|NetworkError|\[object Object\]/i.test(m))return;const o={m:m.slice(0,400),w:String(w||"js").slice(0,40),st:String(st||"").slice(0,1500)};window.__lastErr=o;window.__errq.push(o);if(window.__onerr)window.__onerr()}catch(x){}};
  window.logAppError=window.logAppError||function(x,w){window.__cap(x&&x.message?x.message:x,w,x&&x.stack)};
  window.addEventListener("error",ev=>{if(ev.target&&ev.target!==window)return;window.__cap((ev.message||"")+(ev.filename?" @"+String(ev.filename).split("/").pop()+":"+ev.lineno:""),"js",ev.error&&ev.error.stack)});
  window.addEventListener("unhandledrejection",ev=>{const r=ev.reason;if(r&&r.code=="declined")return;window.__cap(r&&r.message?r.message:r,"promise",r&&r.stack)})}
 const seen=new Set();let n=0;
 const flush=()=>{while(window.__errq.length){const o=window.__errq.shift(),k=o.w+"|"+o.m;if(seen.has(k)||n>=12)continue;seen.add(k);n++;rpc("log_app_error",{p_msg:o.m,p_where:o.w,p_stack:o.st,p_device:devOf(),p_ver:VER,p_url:String(location.pathname||"").slice(0,120),p_app:APP})}};
 window.__onerr=flush;flush()}

A.init=function(o){o=o||{};APP=o.app==="seminar"?"seminar":"report";LEG=o.legacy||null;VER=o.ver||"";if(o.lang)LANG=o.lang;if(o.onChange)ON=o.onChange;
 css();errs();
 try{if("serviceWorker" in navigator&&document.querySelector('link[rel="manifest"]')&&(location.protocol==="https:"||location.hostname==="localhost"))
  {const rg=()=>navigator.serviceWorker.register("sw.js",{scope:"./"}).catch(()=>{});if(document.readyState==="complete")rg();else addEventListener("load",rg,{once:true})}}catch(x){}
 /* admin panel: tap the footer three times */
 let taps=0,tm=0;document.addEventListener("click",ev=>{const t=ev.target;if(!t.closest||!t.closest(".ftr")||t.closest("a"))return;taps++;clearTimeout(tm);tm=setTimeout(()=>{taps=0},700);if(taps>=3){taps=0;clearTimeout(tm);openAdmin()}},true);
 setTimeout(()=>{A.refresh()},700);
 const wm=()=>setTimeout(()=>{(window.requestIdleCallback||(f=>f()))(()=>{try{window.ARender&&ARender.warm()}catch(x){}})},1200);
 if(document.readyState==="complete")wm();else addEventListener("load",wm,{once:true})};
A.device=()=>DID;A.app=()=>APP;

/* =====================================================================
   NATIVE PAGE RENDERER — the browser itself draws each page/slide exactly as in Live
   (SVG <foreignObject> → canvas). Same engine, same CSS, same fonts as Live, and many times
   faster than html2canvas. If the browser refuses (some Safari versions) the caller falls back
   to html2canvas automatically.
   ===================================================================== */
const R=window.ARender={};
const NKEY="ar-native-ok";
const isWK=()=>{const u=navigator.userAgent||"";return /iPhone|iPad|iPod/.test(u)||(navigator.maxTouchPoints>1&&/Macintosh/.test(u))||(/Safari\//.test(u)&&!/Chrome|Chromium|CriOS|Edg|OPR|Android/.test(u))};
R.enabled=()=>{if(window.__forceH2C)return false;return LS.g(NKEY,"")!=="0"};
/* libraries load in the background after the page opens, not before it (faster first paint) */
const LIBS={jspdf:["https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",()=>window.jspdf&&window.jspdf.jsPDF],
 html2canvas:["https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",()=>window.html2canvas]},LIBP={};
R.lib=function(name){const L=LIBS[name];if(!L)return Promise.reject(new Error("lib "+name));if(L[1]())return Promise.resolve(true);
 if(!LIBP[name])LIBP[name]=new Promise((res,rej)=>{const s=document.createElement("script");s.src=L[0];s.async=true;s.crossOrigin="anonymous";
  const t=setTimeout(()=>{s.onload=s.onerror=null;s.remove();rej(new Error(name+" timeout"))},25000);
  s.onload=()=>{clearTimeout(t);L[1]()?res(true):rej(new Error(name))};s.onerror=()=>{clearTimeout(t);s.remove();rej(new Error(name))};document.head.appendChild(s)})
  .catch(x=>{delete LIBP[name];throw x});
 return LIBP[name]};
const blob2data=b=>new Promise((res,rej)=>{const f=new FileReader();f.onload=()=>res(f.result);f.onerror=rej;f.readAsDataURL(b)});
const FONTCACHE=new Map();let GCSS=null;
const GFAM=["Amiri","Cairo","Noto Naskh Arabic","Noto Sans Arabic","Scheherazade New","Vazirmatn"];
/* web fonts must be embedded, an SVG image cannot use the page's fonts */
async function fontCSS(fams){
 if(!fams.length)return"";
 const link=[...document.querySelectorAll('link[rel="stylesheet"]')].find(l=>/fonts\.googleapis\.com/.test(l.href));if(!link)return"";
 if(!GCSS)GCSS=fetch(link.href).then(r=>{if(!r.ok)throw new Error("font css");return r.text()}).catch(x=>{GCSS=null;throw x});
 const css=await GCSS,out=[];
 const re=/(?:\/\*\s*([\w-]+)\s*\*\/\s*)?(@font-face\s*\{[^}]*\})/g;let m;
 while((m=re.exec(css))){const sub=m[1]||"",blk=m[2],fam=(blk.match(/font-family:\s*['"]?([^;'"]+)['"]?\s*;/)||[])[1];
  if(!fam||!fams.includes(fam.trim()))continue;if(sub&&!/^(arabic|latin|latin-ext)$/.test(sub))continue;
  const um=blk.match(/url\(([^)]+)\)/);if(!um){out.push(blk);continue}const url=um[1].replace(/['"]/g,"");
  if(!FONTCACHE.has(url))FONTCACHE.set(url,fetch(url).then(r=>{if(!r.ok)throw new Error("font");return r.blob()}).then(blob2data).catch(x=>{FONTCACHE.delete(url);throw x}));
  out.push(blk.replace(um[0],"url("+await FONTCACHE.get(url)+")"))}
 return out.join("\n")}
/* the page CSS, with html / body / :root selectors pointed at the wrapper */
function pageCSS(){return [...document.querySelectorAll("style")].filter(s=>s.id!=="ab-css"&&s.id!=="wmcss"&&!s.closest("#dlg,#adm,#isheet,#lsh")).map(s=>s.textContent).join("\n")
 .replace(/:root/g,".fo-root").replace(/(^|[\s,{}>+~(])html(?=[\s.\[:#,{>)])/g,"$1.fo-root").replace(/(^|[\s,{}>+~(])body(?=[\s.\[:#,{>)])/g,"$1.fo-body")}
async function inlineImgs(node){const im=[...node.querySelectorAll("img")];await Promise.all(im.map(async i=>{const s=i.getAttribute("src")||"";if(!s||/^data:/i.test(s))return;try{const r=await fetch(s,{mode:"cors"});if(r.ok)i.setAttribute("src",await blob2data(await r.blob()))}catch(x){}}))}
function usedFams(nodes){const set=new Set(),st=document.documentElement.style,add=v=>String(v||"").split(",").forEach(f=>{f=f.trim().replace(/^["']|["']$/g,"");if(GFAM.includes(f))set.add(f)});
 add(st.getPropertyValue("--ff"));add(st.getPropertyValue("--cf"));
 if(nodes.some(n=>n.classList.contains("rtl"))){set.add("Noto Naskh Arabic");if(nodes.some(n=>n.classList.contains("slide")))set.add("Noto Sans Arabic")}
 return [...set]}
const blankCheck=c=>{try{const t=document.createElement("canvas");t.width=24;t.height=24;const x=t.getContext("2d");x.drawImage(c,0,0,24,24);const d=x.getImageData(0,0,24,24).data;let n=0;for(let i=0;i<d.length;i+=4)if(d[i]<235||d[i+1]<235||d[i+2]<235)n++;return n<2}catch(x){throw x}};
const toBlob=(c,q)=>new Promise((res,rej)=>{try{c.toBlob(b=>b?res(b):rej(new Error("toBlob")),"image/jpeg",q)}catch(x){rej(x)}});
/* warm-up: jsPDF + the fonts used now are fetched while the user is typing, so Download starts at once */
R.warm=function(){try{
 const cn=navigator.connection||{};R.lib("jspdf").catch(()=>{});
 if(!document.querySelector('link[data-h2c]')){const l=document.createElement("link");l.rel="prefetch";l.as="script";l.href=LIBS.html2canvas[0];l.setAttribute("data-h2c","");document.head.appendChild(l)}
 if(cn.saveData||!R.enabled())return;
 const st=document.documentElement.style,f=new Set(),add=v=>String(v||"").split(",").forEach(x=>{x=x.trim().replace(/^["']|["']$/g,"");if(GFAM.includes(x))f.add(x)});
 add(st.getPropertyValue("--ff"));add(st.getPropertyValue("--cf"));f.add("Noto Naskh Arabic");if(APP==="seminar")f.add("Noto Sans Arabic");
 fontCSS([...f]).catch(()=>{})}catch(x){}};
/* Safari (iPhone/iPad/Mac) draws the semi-transparent pixels of an image (e.g. the soft window shadow in a
   screenshot) as a solid grey band in the downloaded file. Before export, on Safari only, each transparent image
   in the temporary copy is blended by hand onto the colour behind it — the same result Live shows. */
const bgOf=el=>{for(let e=el.parentElement;e;e=e.parentElement){const c=getComputedStyle(e).backgroundColor;if(c&&!/rgba\(\s*0,\s*0,\s*0,\s*0\s*\)|transparent/.test(c))return c}return"rgb(255,255,255)"};
const rgbOf=c=>{const m=String(c).match(/[\d.]+/g)||[255,255,255];return[+m[0],+m[1],+m[2]]};
const loadImg=src=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src});
const FLATC=new Map();
async function flatSrc(src,bg){const k=bg+"|"+src.length+"|"+src.slice(-64);if(FLATC.has(k))return FLATC.get(k);
 const p=(async()=>{const i=await loadImg(src);if(!i||!i.naturalWidth||Math.max(i.naturalWidth,i.naturalHeight)>5000)return null;const c=document.createElement("canvas");
  c.width=i.naturalWidth;c.height=i.naturalHeight;const x=c.getContext("2d",{willReadFrequently:true});x.drawImage(i,0,0,c.width,c.height);
  const d=x.getImageData(0,0,c.width,c.height),a=d.data,[R,G,B]=rgbOf(bg);let t=false;
  for(let n=3;n<a.length;n+=4){const al=a[n];if(al===255)continue;t=true;const f=al/255,g=1-f;a[n-3]=a[n-3]*f+R*g+.5;a[n-2]=a[n-2]*f+G*g+.5;a[n-1]=a[n-1]*f+B*g+.5;a[n]=255}
  if(!t){c.width=c.height=0;return null}x.putImageData(d,0,0);const u=c.toDataURL("image/png");c.width=c.height=0;return u})().catch(()=>null);
 FLATC.set(k,p);return p}
R.flatten=async function(root){if(!isWK()||!root)return;
 await Promise.all([...root.querySelectorAll("img")].map(async im=>{try{let src=im.getAttribute("src")||"";if(!src||/^data:image\/jpe?g/i.test(src))return;
  if(!/^data:/i.test(src)){try{const r=await fetch(src,{mode:"cors"});if(!r.ok)return;src=await blob2data(await r.blob())}catch(x){return}if(/^data:image\/jpe?g/i.test(src))return}
  const u=await flatSrc(src,bgOf(im));if(!u)return;im.setAttribute("src",u);try{await im.decode()}catch(x){}}catch(x){}}))};
/* nodes: .page / .slide elements (already built, attached). Returns [{blob,u8,d}] in order. */
R.render=async function(nodes,o){o=o||{};const W=o.w,H=o.h,sc=o.scale||2,q=o.quality||.9,prog=o.progress||(()=>{});
 if(!R.enabled())throw new Error("native disabled");
 const fonts=await fontCSS(usedFams(nodes));
 const de=document.documentElement,css=pageCSS()+"\n"+fonts+"\n.fo-root,.fo-body{margin:0;padding:0;width:"+W+"px;height:"+H+"px;overflow:hidden}";
 const wk=isWK(),out=new Array(nodes.length);let done=0;
 const one=async i=>{const n=nodes[i].cloneNode(true);n.querySelectorAll(".wm,.pic-x").forEach(x=>x.remove());await inlineImgs(n);
  const root=document.createElement("div");root.className=("fo-root "+de.className).trim();["dir","lang"].forEach(a=>{if(de.getAttribute(a))root.setAttribute(a,de.getAttribute(a))});if(de.dataset.ui)root.setAttribute("data-ui",de.dataset.ui);root.setAttribute("style",de.style.cssText);
  const stl=document.createElement("style");stl.textContent=css;root.appendChild(stl);
  const body=document.createElement("div");body.className="fo-body x";body.appendChild(n);root.appendChild(body);
  const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'"><foreignObject x="0" y="0" width="'+W+'" height="'+H+'">'+new XMLSerializer().serializeToString(root)+"</foreignObject></svg>";
  const img=new Image();img.decoding="sync";
  await new Promise((res,rej)=>{img.onload=res;img.onerror=()=>rej(new Error("svg image"));img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg)});
  try{await img.decode()}catch(x){}
  const c=document.createElement("canvas");c.width=Math.round(W*sc);c.height=Math.round(H*sc);const x=c.getContext("2d");
  const draw=()=>{x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(img,0,0,c.width,c.height)};
  draw();if(wk){await new Promise(r=>setTimeout(r,120));draw()}           /* Safari paints embedded images/fonts on the 2nd draw */
  if(blankCheck(c))throw new Error("blank page");                         /* also throws SecurityError if the canvas is tainted */
  const b=await toBlob(c,q),u8=new Uint8Array(await b.arrayBuffer()),d=o.dataURL?await blob2data(b):null;c.width=c.height=0;
  out[i]={blob:b,u8,d};prog(++done,nodes.length)};
 try{let k=0;const N=Math.min(wk?1:3,nodes.length);await Promise.all(Array.from({length:N},async()=>{while(k<nodes.length)await one(k++)}));LS.s(NKEY,"1");return out}
 catch(x){if(x&&(x.name==="SecurityError"||/blank page|svg image/.test(x.message||"")))LS.s(NKEY,"0");throw x}};

/* =====================================================================
   ADMIN PANEL (Kurdish) — one panel for both systems
   ===================================================================== */
function openAdmin(){
if(document.getElementById("adm"))return;
const ic=p=>`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const I={copy:ic('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>'),wa:ic('<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z"/>'),edit:ic('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),trash:ic('<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/>'),refresh:ic('<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/>'),close:ic('<path d="M18 6 6 18M6 6l12 12"/>'),search:ic('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),chev:ic('<path d="m6 9 6 6 6-6"/>'),lock:ic('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),eye:ic('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),plus:ic('<path d="M12 5v14M5 12h14"/>'),clock:ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),pause:ic('<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>'),play:ic('<path d="M7 5v14l12-7z"/>'),check:ic('<path d="m5 12 5 5 9-10"/>'),phone:ic('<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>'),monitor:ic('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'),back:ic('<path d="M5 12h14M13 6l6 6-6 6"/>'),chart:ic('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),list:ic('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'),tune:ic('<path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),left:ic('<path d="m15 6-6 6 6 6"/>'),shop:ic(IC.shop),reset:ic('<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>'),cash:ic('<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>'),bell:ic('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>'),home:ic('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>'),dl:ic('<path d="M12 3v12m0 0-5-5m5 5 5-5M4 19h16"/>'),rcpt:ic('<path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6M9 11h6M9 15h4"/>'),gear:ic('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),key:ic('<circle cx="8" cy="15" r="4"/><path d="m10.8 12.2 9.2-9.2M17 6l3 3M15 8l2 2"/>')};
const DK=`--ok:#6fd09a;--okb:#16322a;--okd:#2c6b4d;--us:#8db8ff;--usb:#172a47;--usd:#2f5287;--ex:#ff8f88;--exb:#3b1b1c;--exd:#7d3a3a;--pa:#f0b95a;--pab:#3a2d12;--pad:#7a5d22;--oc:#10151c;--on:#1a1a1c;--fg:#f1f3f7;--mut:#aeb6c4;--bd:#3b414d;--card:#23262c;--bg:#17181b`;
const CSS=`#ov{position:absolute;inset:0;font-family:inherit;line-height:1.5;text-align:start;background:var(--bg,#fff);color:var(--fg);--ok:#1f7a46;--okb:#e4f5ea;--okd:#9bd5b2;--us:#1f5fbf;--usb:#e3edfb;--usd:#9fbdea;--ex:#b3261e;--exb:#fde8e7;--exd:#efa5a1;--pa:#9a6200;--pab:#fdf0d2;--pad:#e7c26a;--oc:#fff;--on:var(--yl,#d8bb74);--s2:rgba(127,127,127,.1);--fg:#14213d;--mut:#55647f;--bd:#cfd8e8;--card:#fff;--bg:#f4f6fb}
#ov.dk{${DK}}
*{box-sizing:border-box}
button{font:inherit;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}
h3{margin:0;font-size:18px;color:var(--ac)}h4{margin:0;font-size:15.5px;color:var(--ac)}
.sub{margin:2px 0 0;font-size:12.5px;color:var(--mut);line-height:1.6}
.k-ok{--c:var(--ok);--cb:var(--okb);--cd:var(--okd)}.k-us{--c:var(--us);--cb:var(--usb);--cd:var(--usd)}.k-ex{--c:var(--ex);--cb:var(--exb);--cd:var(--exd)}.k-pa{--c:var(--pa);--cb:var(--pab);--cd:var(--pad)}
.app{max-width:780px;margin:0 auto;height:100%;display:flex;flex-direction:column;background:var(--bg,#fff)}
@media(min-width:800px){.app{border-inline:1px solid var(--bd)}}
.top{flex:none;display:flex;align-items:center;gap:10px;padding:calc(10px + env(safe-area-inset-top,0px)) 12px 10px;background:var(--ac);color:var(--on);border-bottom:3px solid var(--yl,#d8bb74)}.top h3{color:var(--on)}.top .sub{color:var(--on);opacity:.75}.top .ib{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.25);color:var(--on)}
.top .tt{flex:1;min-width:0}
.main{flex:1;overflow-y:auto;overscroll-behavior:contain;padding:14px 14px 28px;display:grid;gap:14px;align-content:start}
.nv{flex:none;display:grid;grid-template-columns:repeat(5,1fr);background:var(--card,#fff);border-top:1px solid var(--bd);padding:6px 6px calc(6px + env(safe-area-inset-bottom,0px))}
.ni{border:0;background:transparent;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 0;font-size:12px;font-weight:700;color:var(--mut);border-radius:12px}
.ni.on{color:var(--ac)}.ni.on .ii{background:var(--ac);color:var(--on)}.ii{display:grid;place-items:center;width:46px;height:30px;border-radius:15px}
.ni.mid .ii{background:var(--ac);color:var(--on);width:54px;height:34px}
.ib{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:42px;padding:0 12px;border:1.5px solid var(--bd);border-radius:12px;background:var(--card,#fff);font-size:13px;font-weight:700;color:var(--ac)}
.b.dg{color:var(--ex);border-color:var(--exd)}.b.wn{color:var(--pa);border-color:var(--pad)}.row input{flex:1;width:auto;min-width:0}.ib.sq{width:42px;padding:0}.ib.dg{color:var(--ex);border-color:var(--exd)}.ib.wn{color:var(--pa);border-color:var(--pad)}.ib.on{background:var(--ac);border-color:var(--ac);color:var(--oc)}.ib:disabled{opacity:.45}
.spin svg{animation:admr .8s linear infinite}@keyframes admr{to{transform:rotate(360deg)}}
.seg{display:flex;flex-wrap:wrap;gap:4px;padding:4px;border-radius:14px;background:var(--s2)}
.seg button{flex:1 1 28%;min-width:0;padding:0 2px;min-height:42px;border:0;border-radius:11px;background:transparent;font-weight:800;font-size:13px;color:var(--mut);display:flex;align-items:center;justify-content:center;gap:6px}
.seg button.on{background:var(--ac);color:var(--oc)}.seg em{font-style:normal;font-size:12px;opacity:.85}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.sc{border:1.5px solid var(--cd,var(--bd));background:var(--cb,var(--s2));border-radius:16px;padding:14px 8px;text-align:center}
.sc b{display:block;font-size:32px;line-height:1.2;color:var(--c,var(--ac))}.sc span{display:block;font-size:14px;font-weight:800;color:var(--c,var(--ac))}
.bar{display:flex;gap:3px;height:12px;border-radius:8px;overflow:hidden;background:var(--s2)}.bar i{display:block;background:var(--c)}
.nt{font-size:13.5px;font-weight:600;color:var(--ac);display:flex;flex-wrap:wrap;gap:4px 16px}
.pn{border:1px solid var(--bd);border-radius:16px;padding:14px;display:grid;gap:10px;background:var(--card,#fff)}
.ph{display:flex;align-items:center;gap:8px}.ph h4{flex:1}.ph small{color:var(--mut);font-size:12px}
.sn{width:26px;height:26px;border-radius:50%;background:var(--ac);color:var(--oc);display:grid;place-items:center;font-size:13px;font-weight:800;flex:none}
.fl{font-size:13px;font-weight:700;color:var(--mut)}
input,textarea{width:100%;border:1.5px solid var(--bd);border-radius:12px;background:var(--card,#fff);color:inherit;font:inherit;font-size:15px;outline:none;-webkit-user-select:text;user-select:text}
input{height:48px;padding:0 14px}textarea{padding:10px 12px;line-height:1.7;resize:vertical;font-size:14px}
input:focus,textarea:focus,button:focus-visible{border-color:var(--ac);box-shadow:0 0 0 3px rgba(127,127,127,.28);outline:0}
.row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.stp{display:flex;align-items:center;gap:4px}.stp input{width:68px;text-align:center;font-weight:800;font-size:17px}
.stp button{width:44px;height:48px;border:1.5px solid var(--bd);border-radius:12px;background:transparent;font-size:22px;color:var(--ac)}
.chp{min-height:38px;padding:0 14px;border:1.5px solid var(--bd);border-radius:20px;background:var(--card,#fff);font-size:13px;font-weight:700;color:var(--mut)}
.chp.on{background:var(--c,var(--ac));border-color:var(--c,var(--ac));color:var(--oc)}.chp em{font-style:normal;opacity:.8;margin-inline-start:5px}
.sm{font-size:14px;font-weight:700;padding:12px 14px;border-radius:14px;background:var(--s2);text-align:center}
.b{width:100%;min-height:50px;border-radius:14px;border:1.5px solid var(--bd);background:var(--card,#fff);font-weight:800;font-size:15px;display:flex;align-items:center;justify-content:center;gap:8px;color:var(--ac)}
.b.p{background:var(--ac);border-color:var(--ac);color:var(--on)}.b.d2{background:var(--ex);border-color:var(--ex);color:#fff}.b.t{border:0;background:transparent;color:var(--mut);font-weight:600}.b:disabled{opacity:.6}
.er{margin:0;min-height:18px;font-size:13px;text-align:center;color:var(--ex)}
.nw{border:2px dashed var(--okd);background:var(--okb);border-radius:18px;padding:14px;display:grid;gap:10px}
.nh{display:flex;align-items:center;justify-content:space-between}.nh b{color:var(--ok);font-size:15px}
.x{border:0;background:transparent;color:var(--mut);display:grid;place-items:center;width:34px;height:34px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.cd{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;direction:ltr;border:0;background:transparent;padding:0;font-family:ui-monospace,Menlo,Consolas,monospace;font-weight:700;font-size:16px;letter-spacing:.06em;color:var(--fg);text-align:left;word-break:break-all;-webkit-user-select:text;user-select:text}
.cd svg{flex:none;color:var(--mut)}.cd.big{padding:12px 14px;border-radius:12px;background:var(--card,#fff);font-size:17px}
.sec{display:flex;align-items:baseline;justify-content:space-between}.sec h4{margin:0}.sec span{font-size:13px;color:var(--mut)}
.srch{position:relative}.srch input{padding-inline-start:44px;padding-inline-end:40px;text-align:right}
.srch .si{position:absolute;inset-inline-start:13px;top:14px;color:var(--mut);pointer-events:none}
.srch .qx{position:absolute;inset-inline-end:4px;top:5px;width:38px;height:38px;border:0;background:transparent;color:var(--mut);display:grid;place-items:center}
.tb,.bk{display:flex;flex-wrap:wrap;gap:8px}
.lst{display:grid;gap:10px}
.rw{display:flex;align-items:center;gap:10px;border:1.5px solid var(--cd);background:var(--cb);border-radius:16px;padding:12px;cursor:pointer}
.rw.sl{outline:3px solid var(--ac);outline-offset:1px}
.rb{flex:1;min-width:0;display:grid;gap:5px}
.r1{display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-height:26px}
.nm{font-weight:800;font-size:15px;color:var(--fg);margin-inline-end:auto}.nm.e{font-weight:500;color:var(--mut);font-size:13px}
.pl{font-size:12px;font-weight:800;padding:3px 11px;border-radius:12px;background:var(--c);color:var(--oc);white-space:nowrap}
.rc{direction:ltr;text-align:left;font-family:ui-monospace,Menlo,Consolas,monospace;font-weight:700;font-size:14.5px;letter-spacing:.05em;color:var(--fg);word-break:break-all}
.rm{font-size:12.5px;color:var(--c);font-weight:700}
.cb{flex:none;width:42px;height:42px;border-radius:12px;border:1.5px solid var(--cd);background:var(--card,#fff);color:var(--c);display:grid;place-items:center}
.ck{width:26px;height:26px;border:2px solid var(--cd);border-radius:8px;display:grid;place-items:center;flex:none;color:transparent;background:var(--card,#fff)}.ck svg{width:16px;height:16px}.ck.on{background:var(--c);border-color:var(--c);color:var(--oc)}
.gp{border:1px solid var(--bd);border-radius:18px;padding:8px;display:grid;gap:10px;background:var(--s2)}
.gh{display:flex;align-items:center;gap:8px;width:100%;min-height:42px;border:0;background:transparent;padding:0 6px;text-align:right}
.gh b{flex:1;font-size:15px;color:var(--ac)}.gh .n{font-size:12.5px;color:var(--mut)}
.gs{font-size:12.5px;color:var(--mut);padding:0 6px;margin-top:-8px}
.ch{display:inline-flex;transition:transform .2s;color:var(--mut)}.ch.o{transform:rotate(180deg)}
.ga{display:flex;gap:8px}.ga .ib{flex:1}
.em{text-align:center;color:var(--mut);font-size:14px;padding:26px 10px;border:2px dashed var(--bd);border-radius:16px;line-height:1.9;display:grid;gap:10px;justify-items:center}
.sbr{flex:none;background:var(--card,#fff);border-top:1px solid var(--bd);box-shadow:0 -8px 20px rgba(0,0,0,.12);padding:10px 14px;display:grid;gap:8px}.sbr[hidden]{display:none}
.sr{display:flex;align-items:center;gap:8px}.sr b{flex:1;font-size:14.5px;color:var(--ac)}
.sa{display:grid;grid-template-columns:repeat(auto-fit,minmax(78px,1fr));gap:8px}
.hero{border:2px solid var(--cd);background:var(--cb);border-radius:22px;padding:18px 14px;display:grid;gap:12px;justify-items:center;text-align:center}
.hero .pl{font-size:14px;padding:5px 16px}.hero .hcode{direction:ltr;font-family:ui-monospace,Menlo,Consolas,monospace;font-weight:800;font-size:21px;letter-spacing:.06em;word-break:break-all;color:var(--fg);border:0;background:transparent;display:flex;gap:8px;align-items:center}
.hero .hname{font-weight:800;font-size:16px;color:var(--fg)}
.kv{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid var(--bd);font-size:14px}.kv:last-child{border:0}.kv span{color:var(--mut)}.kv b{text-align:left;color:var(--fg)}.kv bdi{direction:ltr}
.act{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.hl{display:grid;gap:8px}.hi{display:flex;gap:10px;align-items:center;border:1px solid var(--bd);border-radius:12px;padding:9px 11px;width:100%;text-align:right;background:var(--card,#fff)}.hi b{font-size:14px;color:var(--fg);display:block}.hi small{font-size:12.5px;color:var(--mut)}.hi small bdi{direction:ltr}.hc{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--s2);color:var(--ac);flex:none}
.hi.ar{cursor:pointer}
.mini{display:flex;gap:10px;align-items:center;border:1.5px solid var(--cd);background:var(--cb);border-radius:14px;padding:10px 12px;width:100%;text-align:right;cursor:pointer}.mini div{flex:1;min-width:0}.mini b{display:block;font-size:14px;color:var(--fg)}.mini small{font-size:12.5px;font-weight:700;color:var(--c)}
.ok-n{padding:12px 14px;border-radius:14px;background:var(--okb);border:1.5px solid var(--okd);color:var(--ok);font-weight:700;font-size:14px}
.lg{min-height:100%;display:grid;place-content:center;padding:24px;gap:14px;text-align:center;justify-items:stretch}
.lk{width:60px;height:60px;margin:0 auto;border-radius:50%;display:grid;place-items:center;background:var(--ac);color:var(--on)}.lk svg{width:28px;height:28px}
.pwr{display:flex;gap:6px}.pwr input{text-align:center;font-size:16px;height:50px}
.md{position:absolute;inset:0;z-index:5;background:rgba(10,20,40,.55);display:flex;align-items:center;justify-content:center;padding:18px}
.mc{background:var(--card,#fff);color:var(--fg);border:1px solid var(--bd);border-radius:18px;width:100%;max-width:400px;max-height:88%;overflow-y:auto;padding:18px;display:grid;gap:12px;box-shadow:0 16px 44px rgba(0,0,0,.3)}
.ts{position:absolute;bottom:calc(92px + env(safe-area-inset-bottom,0px));left:50%;transform:translate(-50%,20px);opacity:0;pointer-events:none;background:var(--fg);color:var(--card,#fff);padding:11px 20px;border-radius:24px;font-size:14px;font-weight:700;transition:.2s;z-index:9;max-width:90%;text-align:center}
.ts.on{opacity:1;transform:translate(-50%,0)}.ts.bad{background:var(--ex);color:#fff}
@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
.kp{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.kc{border:1px solid var(--bd);background:var(--card);border-radius:16px;padding:12px 13px;display:grid;gap:3px;align-content:start;text-align:start;position:relative;overflow:hidden}
.kc:before{content:"";position:absolute;inset-inline-start:0;top:0;bottom:0;width:4px;background:var(--c,var(--ac))}
.kc .kl{font-size:12.5px;font-weight:700;color:var(--mut);display:flex;align-items:center;gap:6px}.kc .kl svg{width:16px;height:16px;color:var(--c,var(--ac))}
.kc b{font-size:22px;line-height:1.25;color:var(--fg);direction:ltr;text-align:right;unicode-bidi:plaintext}.kc small{font-size:12px;color:var(--mut);line-height:1.5}.kc small.up{color:var(--ok);font-weight:700}.kc small.dn{color:var(--ex);font-weight:700}
button.kc{font:inherit;cursor:pointer}
.dash{display:grid;gap:14px;align-content:start}
.bc{display:flex;align-items:flex-end;gap:3px;height:96px;padding-top:6px;direction:ltr}
.bc .cc{flex:1;min-width:0;height:100%;display:flex;flex-direction:column-reverse;gap:1px;position:relative}
.bc .cc i{display:block;border-radius:3px 3px 0 0;min-height:0}.bc .cc i.r{background:var(--ac)}.bc .cc i.s{background:var(--yl,#d8bb74)}
.bc .cc.t i{opacity:1}.bc .cc:not(.t) i{opacity:.85}
.cl{display:flex;justify-content:space-between;font-size:11px;color:var(--mut);direction:ltr}
.lgd{display:flex;gap:14px;font-size:12px;color:var(--mut);flex-wrap:wrap}.lgd i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-inline-end:5px;vertical-align:-1px}
.wk .cc{gap:2px}.wkl{display:flex;gap:3px;direction:ltr}.wkl span{flex:1;text-align:center;font-size:10.5px;color:var(--mut)}
.rnw{display:grid;gap:8px}
.rn{display:flex;align-items:center;gap:10px;border:1.5px solid var(--cd);background:var(--cb);border-radius:14px;padding:10px 12px}
.rn .rb{cursor:pointer}.rn b{font-size:14.5px;color:var(--fg)}.rn small{font-size:12.5px;font-weight:700;color:var(--c)}
.qa{display:flex;gap:6px;flex:none}.qa .ib{min-height:40px;padding:0 10px;font-size:12.5px}.qa .ib.sq{width:40px}
.qa .ib.pay{background:var(--ac);border-color:var(--ac);color:var(--on)}
.tp{display:grid;gap:8px}.tr{display:flex;align-items:center;gap:10px;font-size:13.5px}.tr .tn{flex:0 0 38%;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:700;color:var(--fg);cursor:pointer}
.tr .tb2{flex:1;height:10px;border-radius:6px;background:var(--s2);overflow:hidden;display:flex}.tr .tb2 i{display:block;height:100%}.tr .tb2 i.r{background:var(--ac)}.tr .tb2 i.s{background:var(--yl,#d8bb74)}.tr .tv{flex:none;min-width:30px;text-align:end;font-weight:800;color:var(--ac)}
.rw.shp{align-items:stretch;flex-direction:column;gap:8px}
.pg{height:7px;border-radius:6px;background:rgba(127,127,127,.18);overflow:hidden}.pg i{display:block;height:100%;background:var(--c);border-radius:6px}
.ms{display:flex;flex-wrap:wrap;gap:6px}.mt{font-size:12px;font-weight:700;color:var(--fg);background:var(--card);border:1px solid var(--bd);border-radius:10px;padding:3px 9px;white-space:nowrap}.mt b{color:var(--ac)}.mt.mo{color:var(--ok);border-color:var(--okd)}
.shf{display:flex;align-items:center;gap:8px}.shf .qa{margin-inline-start:auto}
.srt{display:flex;gap:6px;flex-wrap:wrap;align-items:center}.srt span{font-size:12.5px;color:var(--mut);font-weight:700}.srt .chp{min-height:32px;padding:0 11px;font-size:12px}
.fab{position:absolute;inset-inline-end:18px;bottom:calc(84px + env(safe-area-inset-bottom,0px));width:56px;height:56px;border-radius:18px;border:0;background:var(--ac);color:var(--on);display:grid;place-items:center;box-shadow:0 8px 22px rgba(0,0,0,.28);z-index:3}.fab svg{width:26px;height:26px}
.pt{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.py{display:flex;align-items:center;gap:10px;border:1px solid var(--bd);border-radius:12px;padding:9px 11px;background:var(--card)}
.py .pa{flex:none;font-weight:800;color:var(--ok);direction:ltr;font-size:14px}.py .pi{flex:1;min-width:0}.py .pi b{display:block;font-size:14px;color:var(--fg);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.py .pi small{font-size:12px;color:var(--mut)}
.mh{font-size:12.5px;font-weight:800;color:var(--mut);margin:6px 2px 0;display:flex;justify-content:space-between}
.amt{font-size:22px!important;font-weight:800;text-align:center;height:56px!important}
.pk{display:grid;gap:8px;max-height:52vh;overflow-y:auto}
.rcp{white-space:pre-wrap;font-size:14px;line-height:1.8;border:1.5px dashed var(--bd);border-radius:14px;padding:12px 14px;background:var(--s2)}
.sql2{border:1.5px solid var(--pad);background:var(--pab);color:var(--pa);border-radius:14px;padding:12px 14px;font-size:13.5px;font-weight:700;line-height:1.7}
.gr{display:grid;gap:14px;align-content:start}.dash{align-items:start}.pn{align-content:start}.mh span:last-child{direction:ltr;unicode-bidi:isolate}#admc [dir="auto"]:not(input):not(textarea){text-align:right}
@media(min-width:980px){.app{max-width:1120px}.kp{grid-template-columns:repeat(4,1fr)}.dash{grid-template-columns:1.25fr 1fr}.lst.sg{grid-template-columns:1fr 1fr}.gr2{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:start}.fab{inset-inline-end:calc(50% - 540px)}}
.seg button{flex:1 1 28%}.ap{display:flex;gap:8px;flex-wrap:wrap}.ap .chp{flex:1}.kd{display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:700;color:var(--mut)}.dvl{display:grid;gap:8px}.ksub{font-size:12.5px;color:var(--mut);line-height:1.7;margin:-2px 0 0}`;
const host=document.createElement("div");host.id="adm";host.style.cssText="position:fixed;inset:0;z-index:99999";
const root=host.attachShadow({mode:"open"});
const isDark=()=>{try{const p=document.createElement("div");p.style.cssText="position:absolute;visibility:hidden;color:var(--fg,#000)";document.body.appendChild(p);const c=(getComputedStyle(p).color.match(/[\d.]+/g)||[0,0,0]).map(Number);p.remove();return(c[0]*299+c[1]*587+c[2]*114)/1000>140}catch(x){return false}};
root.innerHTML=`<style>${CSS}</style><div id="ov" class="${isDark()?"dk":""}"><div class="app" dir="rtl" id="admc"></div><div class="ts" id="ts" role="status"></div></div>`;
document.body.appendChild(host);
const o=root.querySelector("#ov"),box=root.querySelector("#admc"),ts=root.querySelector("#ts");
let pw="",R=null,REV=null,DAILY=null,PAY=null,PREV="stats",srt=LS.g("adm-srt","left"),LOG=null,LOGM=null,ERR=null,ERRG=[],CHK=null,CHKB=false,tab="shop",view="stats",det=null,DET={},q="",flt="all",NEW=null,tm=0,tk=0,idle=0,upd=new Date(),selMode=false,SH=[],SC=0;
const SEL=new Set(),CF={k:"shop",apps:["report","seminar"],d:30,n:5,m:2,t:""},OPENG=new Set();
let LOCKMIN=+LS.g("adm-lock","5");
const key=ev=>{if(ev.key==="Escape"){const m=o.querySelector(".md");if(m)m.remove();else if(view==="det")back();else close()}};
const close=()=>{clearInterval(tk);clearTimeout(idle);document.removeEventListener("keydown",key);host.remove()};
const bump=()=>{clearTimeout(idle);if(pw&&LOCKMIN>0)idle=setTimeout(close,LOCKMIN*6e4)};
document.addEventListener("keydown",key);["click","input","keydown","touchstart"].forEach(n=>root.addEventListener(n,bump,true));
const toastA=(t,bad)=>{ts.textContent=t;ts.className="ts on"+(bad?" bad":"");clearTimeout(tm);tm=setTimeout(()=>{ts.className="ts"},2400)};
const AE={bad:"پاسۆردەکە هەڵەیە.",limit:"هەوڵی زۆر درا. کەمێک چاوەڕێ بکە و دووبارە هەوڵ بدەوە.",net:"پەیوەندی بە ئینتەرنێتەوە نییە.",cfg:"سیستەمەکە ڕێکنەخراوە.",sql:"فایلی supabase.sql هێشتا لە Supabase جێبەجێ نەکراوە.",apps:"لانیکەم یەک سیستەم هەڵبژێرە.",short:"پاسۆرد دەبێت لانیکەم ٦ پیت بێت.",missing:"کۆدەکە نەدۆزرایەوە.",amount:"بڕی پارە هەڵەیە."};
const SQL2="بۆ پارەدان و ئاماری پەراوگەکان، فایلی supabase_update_v2.sql لە Supabase › SQL Editor جێبەجێ بکە.";
const aerr=x=>AE[x&&x.error]||AE.net;
const copy=async t=>{try{await navigator.clipboard.writeText(t);return true}catch(x){try{const a=document.createElement("textarea");a.value=t;a.style.cssText="position:fixed;opacity:0";o.appendChild(a);a.select();const k=document.execCommand("copy");a.remove();return k}catch(y){return false}}};
const doCopy=async(t,m)=>{const k=await copy(t);toastA(k?(m||"کۆپی کرا ✓"):"دەستی دیاری بکە و کۆپی بکە",!k)};
const pad=n=>String(n).padStart(2,"0"),fd=i=>{const d=new Date(i);return isNaN(d)?"":d.getFullYear()+"/"+pad(d.getMonth()+1)+"/"+pad(d.getDate())},ft=i=>{const d=new Date(i);return isNaN(d)?"":fd(i)+" "+pad(d.getHours())+":"+pad(d.getMinutes())};
const timeLeft=iso=>{const ms=new Date(iso)-Date.now();if(!(ms>0))return"بەسەرچوو";const m=Math.floor(ms/6e4),d=Math.floor(m/1440),h=Math.floor(m%1440/60);return d>0?d+" ڕۆژ و "+h+" کاتژمێر":h>0?h+" کاتژمێر و "+(m%60)+" خولەک":m+" خولەک"};
const fc=c=>String(c||"").length===8?c.slice(0,4)+"-"+c.slice(4):String(c||"");
const KN={single:"یەکجاری",timed:"کاتی",shop:"پەراوگە"};
const KD={single:"کۆدێک بۆ یەک دابەزاندن (بۆ خوێندکار).",timed:"کۆدێک کە تا ماوەکەی تەواو دەبێت بێسنوور کار دەکات. ماوەکە لە کاتی دروستکردنەوە دەست پێدەکات.",shop:"پەراوگە تەنها یەکجار کۆدەکە دەنووسێت، دواتر لەسەر ئامێرەکانی بێ کۆد دادەبەزێنێت. ماوەکە لە یەکەم چالاککردنەوە دەست پێدەکات."};
const appsL=a=>{a=a||[];return a.includes("report")&&a.includes("seminar")?"ڕاپۆرت + سیمینار":a.includes("seminar")?"سیمینار":"ڕاپۆرت"};
const APN={report:"ڕاپۆرت",seminar:"سیمینار"};
const all=()=>R||[];
const listOf=k=>all().filter(c=>c.kind===k);
const list=()=>listOf(tab);
const byCode=l=>all().find(c=>c.code===l);
const st=c=>{if(!c)return{k:"ex",t:"—"};const now=Date.now(),e=c.expires_at?new Date(c.expires_at).getTime():null,ex=e!==null&&e<=now,soon=e!==null&&!ex&&e-now<3*864e5;
 if(c.revoked)return{k:"pa",t:"ڕاگیراو"};
 if(c.kind==="single"){if(c.used_at)return{k:"us",t:"بەکارهێنراو"};if(ex)return{k:"ex",t:"بەسەرچوو"};return{k:"ok",t:"بەکارنەهاتوو",soon}}
 if(c.kind==="shop"&&!c.activated_at)return{k:"us",t:"چالاک نەکراوە"};
 if(ex)return{k:"ex",t:"بەسەرچوو"};return{k:"ok",t:"چالاک",soon}};
const dv=d=>{const p=String(d||"").split("|"),k=p[0]==="mobile"?"مۆبایل":p[0]==="tablet"?"تابلێت":p[0]==="desktop"?"کۆمپیوتەر":"ئامێر";return{k,ic:p[0]==="desktop"?I.monitor:I.phone,t:k+" • "+(p[1]||"?")+" • "+(p[2]||"?")}};
const nameOf=c=>c?(c.title||c.group_title||""):"";
const modal=(h,bind)=>{const m=document.createElement("div");m.className="md";m.innerHTML=`<div class="mc" dir="rtl" role="dialog">${h}</div>`;o.appendChild(m);const cl=()=>m.remove();m.addEventListener("click",ev=>{if(ev.target===m)cl()});bind(m,cl)};
const sure=(title,note,label,run)=>modal(`<h4>${title}</h4>${note?`<p class="sub">${note}</p>`:""}<div class="two"><button class="b d2" id="ok">${label}</button><button class="b" id="no">پاشگەزبوونەوە</button></div>`,(m,cl)=>{m.querySelector("#no").onclick=cl;m.querySelector("#ok").onclick=async()=>{const bt=m.querySelector("#ok");bt.disabled=true;await run(bt);cl()}});
const rename=(c,g)=>{const cur=g?(c.group_title||""):(c.title||"");
 modal(`<h4>${g?"ناوی گرووپ":"ناونیشانی کۆد"}</h4><input id="rn" maxlength="60" dir="auto" value="${X(cur)}" placeholder="ناوی پەراوگە یان کەس"><div class="two"><button class="b p" id="rs">هەڵگرتن</button><button class="b" id="rc">پاشگەزبوونەوە</button></div>`,(m,cl)=>{
  const i=m.querySelector("#rn"),sv=async()=>{const x=await rpc("admin_set_title",{p_pw:pw,p_code:c.code,p_group:g?c.group_id:"",p_title:i.value.trim()});cl();if(x.ok){await reload();toastA("هەڵگیرا ✓")}else toastA(aerr(x),true)};
  m.querySelector("#rs").onclick=sv;m.querySelector("#rc").onclick=cl;i.onkeydown=ev=>{if(ev.key==="Enter")sv()};setTimeout(()=>{i.focus();i.select()},30)})};
const DEFTPL="سڵاو {name} 👋\n\nکۆدی دابەزاندن:\n{codes}\n\nچۆن بەکاری بهێنیت:\n١. ئەم بەستەرە بکەرەوە: {link}\n٢. دوگمەی دابەزاندن (Download) دابگرە و کۆدەکە بنووسە\n\nسوپاس ❤️";
const DEFSHOP="سڵاو {name} 👋\n\nکۆدی مانگانەی پەراوگەکەت:\n{codes}\n\nتەنها یەکجار بینووسە:\n١. ئەم بەستەرە بکەرەوە: {link}\n٢. دوگمەی دابەزاندن (Download) دابگرە و کۆدەکە بنووسە\nدواتر بۆ ماوەی {days} ڕۆژ ({apps}) بێ کۆد دادەبەزێنیت.\n\nسوپاس ❤️";
const CCODE=()=>String(CFG.wa||"964").slice(0,3);
const waNum=v=>{let d=String(v).replace(/\D/g,"");if(d.startsWith("00"))d=d.slice(2);else if(d.startsWith("0"))d=CCODE()+d.slice(1);else if(d.length===10&&d[0]==="7")d=CCODE()+d;return d};
const siteLink=()=>{try{return new URL("./",location.href).href}catch(x){return location.href.split("#")[0].split("?")[0]}};
const waSend=(title,msg,phone,code)=>modal(`<h4>${title}</h4><label class="fl" for="wp">ژمارەی مۆبایل <small>(ئارەزوومەندانە)</small></label><input id="wp" type="tel" dir="ltr" inputmode="tel" autocomplete="off" placeholder="0750 123 4567" value="${X(phone||"")}"><p class="sub" id="wv" style="margin:-4px 0 0"></p><label class="fl" for="wm">نامە <small>(دەتوانیت بیگۆڕیت)</small></label><textarea id="wm" rows="9" dir="auto">${X(msg)}</textarea><div class="two"><button class="b p" id="wg">${I.wa}<span>ناردن</span></button><button class="b" id="wc">${I.copy}<span>کۆپی نامە</span></button></div><button class="b t" id="wx">داخستن</button>`,(m,cl)=>{
  const p=m.querySelector("#wp"),v=m.querySelector("#wv"),t=m.querySelector("#wm"),hint="ئەگەر ژمارە نەنووسیت، لە واتساپ خۆت کەسەکە هەڵدەبژێریت.";
  const chk=()=>{const n=waNum(p.value),g=n.length>=10&&n.length<=15;v.style.color=!p.value?"":(g?"var(--ok)":"var(--ex)");v.textContent=!p.value?hint:(g?"دەنێردرێت بۆ +"+n+(code?" • ژمارەکە بۆ ئەم پەراوگەیە هەڵدەگیرێت":""):"ژمارەکە تەواو نییە")};p.oninput=chk;chk();
  m.querySelector("#wg").onclick=()=>{const n=waNum(p.value);if(p.value&&(n.length<10||n.length>15)){p.focus();return}window.open("https://wa.me/"+n+"?text="+encodeURIComponent(t.value),"_blank");cl();
   const c=code&&byCode(code);if(c&&n&&waNum(c.phone||"")!==n)rpc("admin_set_info",{p_pw:pw,p_code:c.code,p_phone:"+"+n,p_note:c.note||""}).then(x=>{if(x.ok)c.phone="+"+n})};
  m.querySelector("#wc").onclick=()=>doCopy(t.value,"نامەکە کۆپی کرا ✓");m.querySelector("#wx").onclick=cl;if(!phone)setTimeout(()=>p.focus(),40)});
const waOpen=labels=>{if(!labels||!labels.length)return;const cs=labels.map(byCode).filter(Boolean),f=cs[0]||{},isShop=cs.length&&cs.every(c=>c.kind==="shop"),nm=labels.length===1?nameOf(f):(f.group_title||"");
 const dl=f.kind==="shop"&&f.activated_at?Math.max(0,Math.ceil((new Date(f.expires_at)-Date.now())/864e5)):f.days||30;
 const msg=(isShop?LS.g("adm-tpl-shop",DEFSHOP):LS.g("adm-tpl",DEFTPL)).replace("{name}",nm).replace("{codes}",labels.map(fc).join("\n")).replace("{link}",siteLink()).replace("{days}",dl).replace("{apps}",appsL(f.apps)).replace(/ {2,}/g," ");
 waSend("ناردن بە واتساپ",msg,labels.length===1?f.phone:"",labels.length===1&&f.kind==="shop"?f.code:"")};
/* ---- money, renewals, payments ---- */
const DEFRMD="سڵاو {name} 👋\n\nبەشداربوونی پەراوگەکەت ({apps}) {when}.\nبۆ نوێکردنەوە تەنها وەڵامی ئەم نامەیە بدەرەوە.\n\nسوپاس ❤️";
const DEFRCP="🧾 وەسڵی پارەدان #{no}\n\nپەراوگە: {name}\nبڕی پارە: {amount}\nماوە: {days}\nبەشداربوون تا: {until}\nبەروار: {date}{note}\n\nسوپاس بۆ متمانەتان ❤️\nDevMuhamad.com";
const nf=v=>{const n=Number(v)||0;return n.toLocaleString("en-US",{maximumFractionDigits:2})};
const mon=(a,cur)=>cur==="USD"?"$"+nf(a):nf(a)+" IQD";
const money=o=>{const e=Object.entries(o||{}).filter(([,v])=>+v);return e.length?e.sort((a,b)=>a[0]==="IQD"?-1:1).map(([k,v])=>mon(v,k)).join(" + "):"0"};
const dleft=c=>c&&c.expires_at?Math.ceil((new Date(c.expires_at)-Date.now())/864e5):null;
const renewing=c=>{if(c.kind!=="shop"||!c.activated_at||c.revoked||!c.expires_at)return false;const k=dleft(c);return k<=7&&k>-15};
const dlTxt=c=>{const k=dleft(c);return k==null?"":k>1?k+" ڕۆژ ماوە":k===1?"دوایین ڕۆژ":k===0?"ئەمڕۆ تەواو دەبێت":"بەسەرچووە "+(-k)+" ڕۆژ لەمەوبەر"};
const rmdMsg=c=>{const k=dleft(c);return LS.g("adm-tpl-rmd",DEFRMD).replace("{name}",nameOf(c)).replace("{apps}",appsL(c.apps)).replace("{date}",fd(c.expires_at)).replace("{days}",Math.max(0,k||0)).replace("{when}",k>0?"لە "+fd(c.expires_at)+" تەواو دەبێت ("+k+" ڕۆژی ماوە)":"لە "+fd(c.expires_at)+" تەواو بووە").replace(/ {2,}/g," ")};
const remind=l=>{const c=byCode(l);if(c)waSend("بیرخستنەوەی نوێکردنەوە",rmdMsg(c),c.phone,c.code)};
const rcpMsg=(c,p)=>LS.g("adm-tpl-rcp",DEFRCP).replace("{no}",p.id||"").replace("{name}",nameOf(c)||fc(c.code)).replace("{amount}",mon(p.amount,p.currency)).replace("{days}",+p.days?"+"+p.days+" ڕۆژ":"—").replace("{until}",c.expires_at?fd(c.expires_at):(c.kind==="shop"&&!c.activated_at?c.days+" ڕۆژ لە یەکەم چالاککردنەوە":"—")).replace("{date}",fd(p.paid_at||new Date())).replace("{note}",p.note?"\nتێبینی: "+p.note:"");
const receipt=(c,p)=>modal(`<h4>${I.rcpt} وەسڵ ئامادەیە</h4><div class="rcp" dir="auto">${X(rcpMsg(c,p))}</div><div class="two"><button class="b p" id="rw">${I.wa}<span>ناردن بە واتساپ</span></button><button class="b" id="rc">${I.copy}<span>کۆپی</span></button></div><button class="b t" id="rx">داخستن</button>`,(m,cl)=>{
 m.querySelector("#rw").onclick=()=>{cl();waSend("ناردنی وەسڵ",rcpMsg(c,p),c.phone,c.code)};m.querySelector("#rc").onclick=()=>doCopy(rcpMsg(c,p),"وەسڵەکە کۆپی کرا ✓");m.querySelector("#rx").onclick=cl});
const AMTS={IQD:[15000,20000,25000,35000,50000],USD:[10,15,20,30,50]};
const payModal=l=>{const c=byCode(l);if(!c)return;let cur=c.last_currency||LS.g("adm-cur","IQD"),days=c.kind==="single"?0:30;
 const defA=k=>c.last_amount&&c.last_currency===k?+c.last_amount:+LS.g("adm-amt-"+k,k==="USD"?20:25000);
 modal(`<h4>${I.cash} تۆمارکردنی پارە</h4><p class="sub" style="margin-top:-6px"><b dir="auto">${X(nameOf(c)||fc(c.code))}</b> • ${KN[c.kind]}${c.expires_at?" • "+X(dlTxt(c)):""}</p>
 <div class="seg" id="pcur">${["IQD","USD"].map(k=>`<button data-c="${k}">${k==="IQD"?"دینار (IQD)":"دۆلار ($)"}</button>`).join("")}</div>
 <input id="pam" class="amt" type="number" inputmode="decimal" dir="ltr" min="0" step="any" aria-label="بڕی پارە"><div class="row" id="pch"></div>
 ${c.kind==="single"?"":`<label class="fl">زیادکردنی ماوە</label><div class="row" id="pdy">${[[0,"بێ گۆڕین"],[30,"+٣٠ ڕۆژ"],[60,"+٦٠"],[90,"+٩٠"],[365,"+ساڵێک"]].map(z=>`<button class="chp" data-d="${z[0]}">${z[1]}</button>`).join("")}</div><p class="sub" id="pnx" style="margin:-4px 0 0"></p>`}
 <label class="fl" for="pnt">تێبینی <small>(ئارەزوومەندانە)</small></label><input id="pnt" maxlength="200" dir="auto" placeholder="بۆ نموونە: کاش، FIB، زەین کاش">
 <p class="er" id="per"></p><div class="two"><button class="b p" id="psv">${I.check}<span>هەڵگرتن و وەسڵ</span></button><button class="b" id="pcl">پاشگەزبوونەوە</button></div>`,(m,cl)=>{
  const am=m.querySelector("#pam"),ch=m.querySelector("#pch"),nx=m.querySelector("#pnx");
  const paint=()=>{m.querySelectorAll("#pcur button").forEach(b=>b.classList.toggle("on",b.dataset.c===cur));
   ch.innerHTML=AMTS[cur].map(v=>`<button class="chp${+am.value===v?" on":""}" data-v="${v}">${cur==="USD"?"$"+v:nf(v)}</button>`).join("");
   m.querySelectorAll("#pdy .chp").forEach(b=>b.classList.toggle("on",+b.dataset.d===days));
   if(nx){if(c.kind==="shop"&&!c.activated_at)nx.textContent="کۆی ماوە: "+(c.days+days)+" ڕۆژ لە یەکەم چالاککردنەوە";
    else{const base=Math.max(Date.now(),c.expires_at?new Date(c.expires_at).getTime():Date.now());nx.textContent=days?"بەشداربوون دەگاتە: "+fd(base+days*864e5):"بەرواری کۆتایی ناگۆڕێت ("+(c.expires_at?fd(c.expires_at):"—")+")"}}};
  am.value=defA(cur);paint();
  m.querySelector("#pcur").onclick=ev=>{const b=ev.target.closest("button");if(!b)return;cur=b.dataset.c;am.value=defA(cur);paint()};
  ch.onclick=ev=>{const b=ev.target.closest("button");if(!b)return;am.value=b.dataset.v;paint()};am.oninput=()=>ch.querySelectorAll(".chp").forEach(b=>b.classList.toggle("on",+b.dataset.v===+am.value));
  const dy=m.querySelector("#pdy");if(dy)dy.onclick=ev=>{const b=ev.target.closest("button");if(!b)return;days=+b.dataset.d;paint()};
  m.querySelector("#pcl").onclick=cl;
  m.querySelector("#psv").onclick=async()=>{const bt=m.querySelector("#psv"),er=m.querySelector("#per"),a=parseFloat(am.value);if(!(a>=0)){er.textContent=AE.amount;am.focus();return}
   bt.disabled=true;er.textContent="";const note=m.querySelector("#pnt").value.trim();
   const x=await rpc("admin_pay",{p_pw:pw,p_code:c.code,p_amount:a,p_days:days,p_note:note,p_currency:cur});bt.disabled=false;
   if(!x.ok){er.textContent=x.error==="sql"?SQL2:aerr(x);return}
   LS.s("adm-cur",cur);LS.s("adm-amt-"+cur,a);cl();PAY=null;await reload();const c2=byCode(c.code)||c;
   receipt(c2,{id:x.id,amount:a,currency:cur,days,note,paid_at:new Date().toISOString()})}})};
const pickShop=()=>{const L=listOf("shop").slice().sort((a,b)=>(renewing(b)-renewing(a))||nameOf(a).localeCompare(nameOf(b)));
 if(!L.length){toastA("هێشتا هیچ پەراوگەیەک نییە",true);return}
 modal(`<h4>پارەدان بۆ کام پەراوگە؟</h4><div class="srch"><span class="si">${I.search}</span><input id="pq" type="search" dir="auto" autocomplete="off" placeholder="گەڕان"></div><div class="pk" id="pk"></div><button class="b t" id="px">داخستن</button>`,(m,cl)=>{
  const pk=m.querySelector("#pk"),pq=m.querySelector("#pq"),draw=()=>{const qq=pq.value.trim().toLowerCase();pk.innerHTML=L.filter(c=>!qq||(c.code+" "+nameOf(c)).toLowerCase().includes(qq)).map(c=>{const s=st(c);return `<button class="mini k-${renewing(c)?"pa":s.k}" data-l="${X(c.code)}"><div><b dir="auto">${X(nameOf(c)||fc(c.code))}</b><small>${X(s.t)}${c.expires_at?" • "+X(dlTxt(c)):""}</small></div>${I.left}</button>`}).join("")||`<p class="sub">هیچ ئەنجامێک نییە</p>`};
  draw();pq.oninput=draw;pk.onclick=ev=>{const b=ev.target.closest("[data-l]");if(!b)return;cl();payModal(b.dataset.l)};m.querySelector("#px").onclick=cl})};
const infoModal=l=>{const c=byCode(l);if(!c)return;modal(`<h4>زانیاری پەیوەندی</h4><label class="fl" for="iph">ژمارەی مۆبایل (واتساپ)</label><input id="iph" type="tel" dir="ltr" inputmode="tel" placeholder="0750 123 4567" value="${X(c.phone||"")}"><label class="fl" for="int">تێبینی</label><textarea id="int" rows="3" dir="auto" maxlength="300" placeholder="ناونیشان، ناوی خاوەن، شێوازی پارەدان…">${X(c.note||"")}</textarea><p class="er" id="ier"></p><div class="two"><button class="b p" id="isv">${I.check}<span>هەڵگرتن</span></button><button class="b" id="icl">پاشگەزبوونەوە</button></div>`,(m,cl)=>{
 m.querySelector("#icl").onclick=cl;m.querySelector("#isv").onclick=async()=>{const ph=m.querySelector("#iph").value.trim(),n=ph?waNum(ph):"";if(ph&&(n.length<10||n.length>15)){m.querySelector("#ier").textContent="ژمارەکە تەواو نییە";return}
  const x=await rpc("admin_set_info",{p_pw:pw,p_code:c.code,p_phone:n?"+"+n:"",p_note:m.querySelector("#int").value});if(x.ok){cl();await reload();toastA("هەڵگیرا ✓")}else m.querySelector("#ier").textContent=x.error==="sql"?SQL2:aerr(x)}})};
/* ---- small charts ---- */
const bars=(rows,lab)=>{const mx=Math.max(1,...rows.map(z=>z.r+z.s));return `<div class="bc${lab?" wk":""}">${rows.map((z,i)=>`<div class="cc${i===rows.length-1?" t":""}" title="${X(z.t||"")}: ڕاپۆرت ${z.r} • سیمینار ${z.s}"><i class="r" style="height:${z.r/mx*100}%"></i><i class="s" style="height:${z.s/mx*100}%"></i></div>`).join("")}</div>`+(lab?`<div class="wkl">${rows.map(z=>`<span>${X(z.l)}</span>`).join("")}</div>`:"")};
const legend=()=>`<div class="lgd"><span><i style="background:var(--ac)"></i>ڕاپۆرت</span><span><i style="background:var(--yl,#d8bb74)"></i>سیمینار</span></div>`;
const loadPay=async()=>{const x=await rpc("admin_payments",{p_pw:pw});PAY=x&&x.ok?x:{err:x&&x.error||"net"};if(view==="pay")render()};
const loadLog=async()=>{const x=await rpc("admin_log",{p_pw:pw});if(x&&x.ok&&Array.isArray(x.items)){LOG=x.items;LOGM=x.month||null}else{LOG=null;LOGM=null}};
const loadErrs=async()=>{const x=await rpc("admin_errors",{p_pw:pw});ERR=x&&x.ok&&Array.isArray(x.items)?x.items:null};
const loadDet=async l=>{const x=await rpc("admin_code_detail",{p_pw:pw,p_code:l});if(x&&x.ok){DET[l]=x;if(view==="det"&&det===l)render()}};
const reload=async top=>{const x=await rpc("admin_list",{p_pw:pw});if(!x.ok){toastA(aerr(x),true);render();return false}R=x.items||[];REV=x.rev||null;DAILY=x.daily||null;await Promise.all([loadLog(),loadErrs()].concat(view==="pay"?[loadPay()]:[]));if(view==="det"&&det)loadDet(det);upd=new Date();render(top);return true};
const setRev=async(labels,val)=>{const x=await rpc("admin_set_revoked",{p_pw:pw,p_codes:labels,p_revoked:val});if(!x.ok)toastA(aerr(x),true);await reload();if(x.ok)toastA(val?"ڕاگیرا ✓":"چالاک کرایەوە ✓")};
const delMany=async ls=>{const x=await rpc("admin_delete",{p_pw:pw,p_codes:ls});if(!x.ok){toastA(aerr(x),true);return}ls.forEach(l=>SEL.delete(l));if(NEW)NEW=NEW.filter(z=>!ls.includes(z));await reload();toastA("سڕانەوە ✓")};
const extend=async(l,d)=>{const x=await rpc("admin_extend",{p_pw:pw,p_code:l,p_days:d});if(!x.ok){toastA(aerr(x),true);return}await reload();toastA((d>0?"+":"")+d+" ڕۆژ ✓")};
/* ---- errors ---- */
const errGroups=()=>{const m={};(ERR||[]).forEach(e=>{const k=e.app+"|"+e.src+"|"+e.msg;if(!m[k])m[k]={msg:e.msg||"",src:e.src||"",app:e.app||"",n:0,last:e.at,stack:e.stack||"",device:e.device||"",ver:e.ver||""};m[k].n++});return Object.values(m).sort((a,b)=>new Date(b.last)-new Date(a.last))};
const errTxt=g=>"Error: "+g.msg+"\nApp: "+g.app+"\nWhere: "+g.src+"\nCount: "+g.n+"\nLast: "+ft(g.last)+"\nDevice: "+g.device+"\nVersion: "+g.ver+(g.stack?"\nStack:\n"+g.stack:"");
const errBanner=()=>{const n=(ERR||[]).filter(e=>Date.now()-new Date(e.at)<864e5).length;return n?`<button class="mini k-ex" data-a="go" data-v="set"><div><b>⚠ ${n} هەڵە لە ٢٤ کاتژمێری ڕابردوو</b><small>بۆ بینین دابگرە</small></div>${I.left}</button>`:""};
const errH=()=>{if(ERR===null)return `<div class="pn"><div class="ph"><h4>هەڵەکان</h4></div><p class="sub">${AE.sql}</p></div>`;
 const G=errGroups();ERRG=G;
 return `<div class="pn"><div class="ph"><h4>هەڵەکان</h4><small>${ERR.length} تۆمار</small></div>`+(G.length?`<div class="hl">${G.slice(0,15).map((g,i)=>`<button class="hi ar" data-a="errcp" data-i="${i}"><span class="hc">${I.copy}</span><div><b dir="auto">${X(g.msg.slice(0,140))}</b><small>${X(APN[g.app]||g.app)} • ${X(g.src)} • ${g.n} جار • <bdi>${ft(g.last)}</bdi></small></div></button>`).join("")}</div><p class="sub" style="margin:0">لەسەر هەر هەڵەیەک دابگرە بۆ کۆپیکردنی وردەکاری.</p><button class="b dg" data-a="errclr">${I.trash}<span>سڕینەوەی هەموو هەڵەکان</span></button>`:`<div class="ok-n">${I.check} هیچ هەڵەیەک تۆمار نەکراوە</div>`)+`</div>`};
/* ---- system check: server part here, document part comes from the app (window.APP_SELFTEST) ---- */
const CKP={t:0,t0:0,cur:""};
const ckBar=()=>{if(!CHKB)return"";const n=(CHK||[]).length,t=Math.max(CKP.t,n+1),p=Math.min(99,Math.round(n/t*100)),el=(Date.now()-CKP.t0)/1000,rem=n>=2?Math.max(1,Math.round(el/n*(t-n))):0,fm=r=>r>=60?Math.floor(r/60)+" خولەک "+(r%60)+" چرکە":r+" چرکە";
 return `<div style="margin:12px 0 4px"><div style="display:flex;justify-content:space-between;gap:10px;font-size:13px;margin-bottom:6px"><b>${p}%</b><span>${n} / ${t}${rem?" • ماوە ~"+fm(rem):""}</span></div><div style="height:8px;border-radius:99px;background:var(--s2);overflow:hidden"><div style="height:100%;width:${p}%;background:var(--ac);border-radius:99px;transition:width .3s"></div></div><small style="display:block;margin-top:6px;opacity:.75" dir="auto">${X(CKP.cur)}</small></div>`};
const chkH=()=>{const rows=(CHK||[]).filter(r=>!r.ok).map(r=>`<div class="kv"><span>❌ ${X(r.n)}</span><b dir="auto">${X(r.m||"هەڵە")}</b></div>`).join(""),done=CHK&&!CHKB,bad=(CHK||[]).filter(r=>!r.ok).length;
 return `<div class="pn"><div class="ph"><h4>پشکنینی سیستەم (${APN[APP]})</h4></div><p class="sub" style="margin:0">سێرڤەر و کۆدەکان تاقی دەکاتەوە${window.APP_SELFTEST?"، پاشان ڕاپۆرتێکی نموونە دروست دەکات و PDF و Word تاقی دەکاتەوە. ڕاپۆرتەکەی ئێستات ناگۆڕێت":""}.</p>${ckBar()}${rows?`<div>${rows}</div>`:""}${done?`<div class="sm" style="color:var(--${bad?"ex":"ok"})">${bad?bad+" کێشە دۆزرایەوە":"سەرکەوتوو بوو ✓"}</div>`:""}<button class="b p" data-a="chk"${CHKB?" disabled":""}>${I.play}<span>${CHKB?"پشکنین…":"دەستپێکردنی پشکنین"}</span></button>${done&&bad?`<button class="b" data-a="chkcp">${I.copy}<span>کۆپی ئیرۆرەکان</span></button>`:""}</div>`};
const SRV=6;
const serverChecks=async T=>{
 const other=APP==="report"?"seminar":"report",tid=()=>"selftest-"+Math.random().toString(36).slice(2,12);
 const inList=async c=>{const x=await rpc("admin_list",{p_pw:pw});return !!(x.ok&&(x.items||[]).some(i=>i.code===c))};
 await T("پەیوەندی بە Supabase",async()=>{const x=await rpc("admin_list",{p_pw:pw});return x.ok?true:"admin_list: "+aerr(x)});
 await T("کۆدی هەڵە ڕەت دەکرێتەوە",async()=>{const x=await rpc("redeem",{p_code:"ZZZZ0000",p_app:APP,p_device:tid(),p_info:"selftest"});return x.r==="invalid"||x.r==="limit"?true:"redeem: "+(x.r||aerr(x))});
 await T("تۆمارکردنی هەڵەکان",async()=>{const x=await rpc("log_app_error",{p_msg:"ping",p_where:"check",p_stack:"",p_device:"",p_ver:VER,p_url:"",p_app:APP});return x.ok?true:"log_app_error: "+aerr(x)});
 const cyc=async(kind,body)=>{let code=null;try{const m=await rpc("admin_make",{p_pw:pw,p_kind:kind,p_apps:[APP],p_count:1,p_days:1,p_max_devices:1,p_title:"selftest"});code=m.codes&&m.codes[0];if(!code)return "دروست نەکرا ("+aerr(m)+")";if(!await inList(code))return "لە لیستەکەدا نەبینرا";return await body(code)}
  catch(x){return String(x&&x.message||x)}finally{if(code){const d=await rpc("admin_delete",{p_pw:pw,p_codes:[code]});if(!d.ok)return "کۆدی تاقیکردنەوە نەسڕایەوە: "+code}}};
 await T("کۆدی یەکجاری: سیستەمی هەڵە، بەکارهێنان، دووبارە",()=>cyc("single",async c=>{const d=tid();let r=await rpc("redeem",{p_code:fc(c),p_app:other,p_device:d,p_info:"selftest"});if(r.r!=="wrong_app")return "سیستەمی تر: "+r.r;r=await rpc("redeem",{p_code:c,p_app:APP,p_device:d,p_info:"selftest"});if(r.r!=="ok")return "بەکارهێنان: "+r.r;r=await rpc("redeem",{p_code:c,p_app:APP,p_device:d,p_info:"selftest"});return r.r==="used"?true:"دووبارە: "+r.r}));
 await T("کۆدی کاتی: ڕاگرتن، چالاککردنەوە، درێژکردنەوە",()=>cyc("timed",async c=>{const d=tid();let x=await rpc("admin_set_revoked",{p_pw:pw,p_codes:[c],p_revoked:true});if(!x.ok)return "ڕاگرتن: "+aerr(x);let r=await rpc("redeem",{p_code:c,p_app:APP,p_device:d,p_info:"selftest"});if(r.r!=="paused")return "کۆدی ڕاگیراو: "+r.r;await rpc("admin_set_revoked",{p_pw:pw,p_codes:[c],p_revoked:false});r=await rpc("redeem",{p_code:c,p_app:APP,p_device:d,p_info:"selftest"});if(r.r!=="ok")return "دوای چالاککردنەوە: "+r.r;x=await rpc("admin_extend",{p_pw:pw,p_code:c,p_days:30});return x.ok?true:"درێژکردنەوە: "+aerr(x)}));
 await T("کۆدی پەراوگە: چالاککردن، دابەزاندن، سنووری ئامێر",()=>cyc("shop",async c=>{const a=tid(),b=tid();let r=await rpc("redeem",{p_code:c,p_app:APP,p_device:a,p_info:"selftest"});if(r.r!=="ok"||!r.shop||!r.shop.token)return "چالاککردن: "+r.r;const tok=r.shop.token;
  r=await rpc("shop_use",{p_token:tok,p_app:APP,p_device:a,p_info:"selftest"});if(r.r!=="ok")return "دابەزاندن: "+r.r;
  r=await rpc("shop_status",{p_token:tok,p_device:a});if(r.r!=="ok")return "دۆخ: "+r.r;
  r=await rpc("redeem",{p_code:c,p_app:APP,p_device:b,p_info:"selftest"});if(r.r!=="devices")return "ئامێری دووەم ڕەت نەکرایەوە: "+r.r;
  const x=await rpc("admin_reset_devices",{p_pw:pw,p_code:c});if(!x.ok)return "سڕینەوەی ئامێر: "+aerr(x);
  r=await rpc("shop_use",{p_token:tok,p_app:APP,p_device:a,p_info:"selftest"});return r.r==="invalid"?true:"دوای سڕینەوەی ئامێر: "+r.r}));};
const runCheck=async()=>{if(CHKB)return;CHKB=true;CHK=[];render();const STT=window.APP_SELFTEST;CKP.t=SRV+(STT&&STT.count||0);CKP.t0=Date.now();CKP.cur="";
 const iv=setInterval(()=>{if(!CHKB){clearInterval(iv);return}const el=box.querySelector("#chk");if(el)el.innerHTML=chkH()},500);
 const add=(n,ok,m,ms)=>{CHK.push({n,ok,m,ms});const el=box.querySelector("#chk");if(el)el.innerHTML=chkH()};
 const T=async(n,fn)=>{CKP.cur=n;const t0=Date.now();try{const r=await fn();if(r===true)add(n,true,"",Date.now()-t0);else add(n,false,String(r))}catch(x){add(n,false,(x&&x.message)||String(x))}};
 try{await serverChecks(T);if(STT&&STT.run)await STT.run(T,add)}finally{clearInterval(iv);CHKB=false;render()}};
/* ---- views ---- */
const short=c=>{const s=st(c),m=[appsL(c.apps)];
 if(c.kind==="single"){if(c.used_at)m.push("بەکارهێنراوە لە "+fd(c.used_at));else if(s.k==="ok")m.push("ماوە: "+timeLeft(c.expires_at));else if(c.expires_at)m.push("بەسەرچووە لە "+fd(c.expires_at))}
 else if(c.kind==="shop"&&!c.activated_at)m.push(c.days+" ڕۆژ لە یەکەم چالاککردنەوە");
 else{if(s.k==="ok")m.push("ماوە: "+timeLeft(c.expires_at));else if(c.expires_at)m.push((s.k==="pa"?"تا ":"بەسەرچووە لە ")+fd(c.expires_at));if(c.kind==="shop")m.push("ئامێر "+(c.devices||0)+"/"+c.max_devices);m.push((c.uses||0)+" دابەزاندن")}
 return m.join(" • ")+(s.soon?" ⚠ بەزوویی بەسەردەچێت":"")};
const shopRow=c=>{const s=st(c),L=X(c.code),sl=SEL.has(c.code),k=dleft(c),rn=renewing(c),kk=rn&&s.k==="ok"?"pa":s.k,tot=Math.max(c.days||30,k||0),pc=c.activated_at&&k!=null?Math.max(0,Math.min(100,k/tot*100)):c.activated_at?0:100;
 const sub=appsL(c.apps)+" • "+(!c.activated_at?c.days+" ڕۆژ لە یەکەم چالاککردنەوە • هێشتا چالاک نەکراوە":(s.k==="pa"?"ڕاگیراوە • تا "+fd(c.expires_at):dlTxt(c)+" • تا "+fd(c.expires_at))+" • ئامێر "+(c.devices||0)+"/"+c.max_devices);
 const has=c.r30!=null;
 return `<div class="rw shp k-${kk}${sl?" sl":""}" data-a="${selMode?"sel":"open"}" data-l="${L}"><div class="shf">${selMode?`<span class="ck${sl?" on":""}">${I.check}</span>`:""}<div class="rb"><div class="r1">${c.title||c.group_title?`<span class="nm" dir="auto">${X(c.title||c.group_title)}</span>`:'<span class="nm e">بێ ناو</span>'}<span class="pl">${rn&&s.k==="ok"?"نوێکردنەوە":s.t}</span></div><div class="rc" style="font-size:13px">${X(fc(c.code))}</div></div>${selMode?"":`<div class="qa"><button class="ib sq" data-a="rmd" data-l="${L}" aria-label="بیرخستنەوە بە واتساپ" title="بیرخستنەوە بە واتساپ">${I.wa}</button><button class="ib pay" data-a="pay" data-l="${L}">${I.cash}<span>پارە</span></button></div>`}</div>
 ${c.activated_at?`<div class="pg"><i style="width:${pc}%"></i></div>`:""}<div class="rm">${X(sub)}</div>
 ${has?`<div class="ms"><span class="mt" title="ڕاپۆرت ${c.r7} • سیمینار ${c.s7}">هەفتە <b>${c.r7+c.s7}</b></span><span class="mt" title="ڕاپۆرت ${c.r30} • سیمینار ${c.s30}">مانگ <b>${c.r30+c.s30}</b> <small>(ڕ${c.r30} • س${c.s30})</small></span><span class="mt">کۆ <b>${c.rt+c.st}</b></span>${c.last_paid?`<span class="mt mo">${I.cash.replace('width="20" height="20"','width="13" height="13"')} <bdi>${X(mon(c.last_amount,c.last_currency))}</bdi> • <bdi>${fd(c.last_paid)}</bdi></span>`:`<span class="mt">هێشتا پارە تۆمار نەکراوە</span>`}</div>`:""}</div>`};
const rowH=c=>{if(c.kind==="shop")return shopRow(c);const s=st(c),L=X(c.code),sl=SEL.has(c.code),nm=c.group_id?'<span class="nm"></span>':(c.title?`<span class="nm" dir="auto">${X(c.title)}</span>`:'<span class="nm e">بێ ناونیشان</span>');
 return `<div class="rw k-${s.k}${sl?" sl":""}" data-a="${selMode?"sel":"open"}" data-l="${L}">${selMode?`<span class="ck${sl?" on":""}">${I.check}</span>`:""}<div class="rb"><div class="r1">${nm}<span class="pl">${s.t}</span></div><div class="rc">${X(fc(c.code))}</div><div class="rm">${X(short(c))}</div></div>${selMode?"":`<button class="cb" data-a="cp" data-l="${L}" aria-label="کۆپی">${I.copy}</button>`}</div>`};
const matchQ=c=>{if(!q)return true;return(c.code+" "+fc(c.code)+" "+(c.title||"")+" "+(c.group_title||"")+" "+(c.phone||"")+" "+(c.note||"")).toLowerCase().includes(q)};
const fOK=(c,k)=>k==="all"||(k==="wk"?renewing(c):st(c).k===k);
const SRT={left:(a,b)=>(a.activated_at?0:1)-(b.activated_at?0:1)||(dleft(a)??1e9)-(dleft(b)??1e9),dl:(a,b)=>((b.r30||0)+(b.s30||0))-((a.r30||0)+(a.s30||0)),name:(a,b)=>nameOf(a).localeCompare(nameOf(b)),new:(a,b)=>new Date(b.created_at)-new Date(a.created_at)};
const FL={single:[["all","هەموو"],["ok","بەکارنەهاتوو"],["us","بەکارهێنراو"],["ex","بەسەرچوو"],["pa","ڕاگیراو"]],timed:[["all","هەموو"],["ok","چالاک"],["pa","ڕاگیراو"],["ex","بەسەرچوو"]],shop:[["all","هەموو"],["wk","نوێکردنەوەی ئەم هەفتەیە"],["ok","چالاک"],["us","چالاک نەکراوە"],["pa","ڕاگیراو"],["ex","بەسەرچوو"]]};
const renderSb=()=>{const sb=box.querySelector("#sb");if(!sb)return;const exs=new Set(list().map(c=>c.code));[...SEL].forEach(l=>{if(!exs.has(l))SEL.delete(l)});
 if(!selMode||(view!=="codes"&&view!=="shops")){sb.hidden=true;sb.innerHTML="";return}
 const n=SEL.size,cs=list().filter(c=>SEL.has(c.code)),live=cs.some(c=>!c.revoked),d=n?"":" disabled";
 sb.hidden=false;sb.innerHTML=`<div class="sr"><b>${n?n+" هەڵبژێردراو":"کۆدەکان هەڵبژێرە"}</b><button class="chp" data-a="selall">هەموو</button><button class="chp" data-a="selnone">هیچ</button><button class="ib sq" data-a="selmode" aria-label="تەواو">${I.close}</button></div><div class="sa"><button class="ib" data-a="scp"${d}>${I.copy}<span>کۆپی</span></button><button class="ib" data-a="swa"${d}>${I.wa}<span>واتساپ</span></button><button class="ib wn" data-a="srev"${d}>${live?I.pause+"<span>ڕاگرتن</span>":I.play+"<span>چالاککردن</span>"}</button><button class="ib dg" data-a="sdel"${d}>${I.trash}<span>سڕینەوە</span></button></div>`};
const renderList=()=>{const lstEl=box.querySelector("#lst");if(!lstEl)return;const L=list(),fl=FL[tab],cnt=k=>L.filter(c=>fOK(c,k)).length;
 const shown=L.filter(c=>fOK(c,flt)&&matchQ(c));if(tab==="shop")shown.sort(SRT[srt]||SRT.left);SH=shown.map(c=>c.code);
 const gs=[],gm={},free=[];shown.forEach(c=>{const g=c.group_id;if(g){if(!gm[g]){gm[g]=[];gs.push(g)}gm[g].push(c)}else free.push(c)});
 const av=shown.filter(c=>st(c).k==="ok").map(c=>c.code),nex=cnt("ex");
 box.querySelector("#tb").innerHTML=`<div class="tb">${fl.map(f=>`<button class="chp${f[0]==="all"?"":" k-"+(f[0]==="wk"?"pa":f[0])}${flt===f[0]?" on":""}" data-a="flt" data-v="${f[0]}">${f[1]}<em>${cnt(f[0])}</em></button>`).join("")}</div>`+(L.length?`<div class="bk" style="margin-top:10px"><button class="ib${selMode?" on":""}" data-a="selmode">${I.check}<span>${selMode?"تەواوبوون":"هەڵبژاردنی چەند کۆدێک"}</span></button>${!selMode&&av.length?`<button class="ib" data-a="bcp">${I.copy}<span>کۆپی ${tab==="single"?"بەکارنەهاتووەکان":"چالاکەکان"} (${av.length})</span></button>`:""}${!selMode&&nex?`<button class="ib dg" data-a="bdel">${I.trash}<span>سڕینەوەی بەسەرچووەکان (${nex})</span></button>`:""}</div>`:"");
 box.querySelector("#cnt").textContent=(shown.length===L.length?L.length:shown.length+" لە "+L.length)+(tab==="shop"?" پەراوگە":" کۆد");
 lstEl.classList.toggle("sg",tab==="shop");
 const open=g=>OPENG.has(g)||!!q||flt!=="all"||selMode;
 lstEl.innerHTML=shown.length?gs.map(g=>{const cs=gm[g],a=cs.filter(c=>st(c).k==="ok").length,u=cs.filter(c=>st(c).k==="us").length,op=open(g),allSel=cs.every(c=>SEL.has(c.code)),gt=cs[0].group_title||"بێ ناونیشان";
  return `<div class="gp"><button class="gh" data-a="gv" data-g="${X(g)}" aria-expanded="${op}"><span class="ch${op?" o":""}">${I.chev}</span><b dir="auto">${X(gt)}</b><span class="n">${cs.length} کۆد</span></button><div class="gs">${a} بەردەست • ${u} ${tab==="single"?"بەکارهاتوو":"چالاک نەکراو"} • ${X(appsL(cs[0].apps))}</div>`+(op?(selMode?`<div class="ga"><button class="ib${allSel?" on":""}" data-a="selg" data-g="${X(g)}">${I.check}<span>${allSel?"لابردنی هەڵبژاردنی گرووپ":"هەڵبژاردنی هەموو گرووپەکە"}</span></button></div>`:`<div class="ga"><button class="ib" data-a="cpg" data-g="${X(g)}">${I.copy}<span>کۆپی هەموو</span></button><button class="ib" data-a="wag" data-g="${X(g)}">${I.wa}<span>واتساپ</span></button><button class="ib" data-a="reng" data-g="${X(g)}">${I.edit}<span>ناو</span></button></div>`)+cs.map(rowH).join(""):"")+`</div>`}).join("")+(free.length&&gs.length?`<div class="sec"><h4>کۆدی تاک</h4><span>${free.length}</span></div>`:"")+free.map(rowH).join("")
 :`<div class="em">${L.length?(flt==="wk"?"هیچ پەراوگەیەک لەم هەفتەیەدا نوێکردنەوەی نییە ✓":"هیچ شتێک لەگەڵ گەڕانەکەت نەگونجا."):"هێشتا هیچ "+(tab==="shop"?"پەراوگەیەک":"کۆدێکی "+KN[tab])+" نییە."}${!L.length?`<button class="b p" style="width:auto;padding:0 26px" data-a="gonew">${I.plus}<span>دروستکردنی کۆدی ${KN[tab]}</span></button>`:""}</div>`;
 renderSb()};
const seg=()=>`<div class="seg">${["single","timed"].map(k=>`<button data-a="tab" data-k="${k}" class="${tab===k?"on":""}">${KN[k]}<em>${listOf(k).length}</em></button>`).join("")}</div>`;
const mini=(c,k,sub)=>`<button class="mini k-${k}" data-a="opentab" data-k="${c.kind}" data-l="${X(c.code)}"><div><b dir="auto">${X(nameOf(c)||fc(c.code))}</b><small>${sub}</small></div>${I.left}</button>`;
const vStats=()=>{const sh=listOf("shop"),act=sh.filter(c=>st(c).k==="ok"),sg=listOf("single"),tm2=listOf("timed"),rn=sh.filter(renewing).sort((a,b)=>dleft(a)-dleft(b)),has=sh.some(c=>c.r30!=null);
 const dlR=DAILY?DAILY.reduce((t,z)=>t+z.r,0):(LOGM?LOGM.report||0:0),dlS=DAILY?DAILY.reduce((t,z)=>t+z.s,0):(LOGM?LOGM.seminar||0:0);
 const mIQ=REV?+(REV.month&&REV.month.IQD||0):0,lIQ=REV?+(REV.last&&REV.last.IQD||0):0,dd=lIQ?Math.round((mIQ-lIQ)/lIQ*100):null;
 const kc=(c,ic,l,v,sub,cls,go)=>`<${go?"button":"div"} class="kc k-${c}"${go?` data-a="go" data-v="${go}"`:""}><span class="kl">${ic}${l}</span><b>${v}</b><small${cls?` class="${cls}"`:""}>${sub}</small></${go?"button":"div"}>`;
 const kpis=`<div class="kp">${kc("ok",I.shop,"پەراوگەی چالاک",act.length,"لە کۆی "+sh.length+" پەراوگە","", "shops")}${kc("us",I.cash,"داهاتی ئەم مانگە",REV?money(REV.month):"—",REV?(dd==null?"مانگی پێشوو: "+money(REV.last):(dd>=0?"▲ ":"▼ ")+Math.abs(dd)+"% بە بەراورد بە مانگی پێشوو"):"SQL v2 پێویستە",dd==null?"":dd>=0?"up":"dn","pay")}${kc("",I.dl,"دابەزاندن (٣٠ ڕۆژ)",dlR+dlS,"ڕاپۆرت "+dlR+" • سیمینار "+dlS,"")}${kc("pa",I.bell,"نوێکردنەوەی ئەم هەفتەیە",rn.length,rn.length?"کرتە بکە بۆ بینین":"هیچ پەراوگەیەک نییە ✓","","shopswk")}</div>`;
 const chart=DAILY?`<div class="pn"><div class="ph"><h4>دابەزاندن لە ٣٠ ڕۆژی ڕابردوو</h4>${legend()}</div>${bars(DAILY.map(z=>({r:z.r,s:z.s,t:z.d})))}<div class="cl"><span>${X(fd(DAILY[0].d))}</span><span>ئەمڕۆ</span></div></div>`:"";
 const rnw=`<div class="pn"><div class="ph"><h4>${I.bell} ئەم هەفتەیە نوێکردنەوە دەکەن</h4><small>${rn.length}</small></div>`+(rn.length?`<div class="rnw">${rn.slice(0,8).map(c=>{const k=dleft(c),kk=k>0?"pa":"ex";return `<div class="rn k-${kk}"><div class="rb" data-a="open" data-l="${X(c.code)}"><b dir="auto">${X(nameOf(c)||fc(c.code))}</b><small>${X(dlTxt(c))} • <bdi>${fd(c.expires_at)}</bdi>${c.last_paid?" • دوایین پارە <bdi>"+X(mon(c.last_amount,c.last_currency))+"</bdi>":""}</small></div><div class="qa"><button class="ib sq" data-a="rmd" data-l="${X(c.code)}" aria-label="بیرخستنەوە بە واتساپ" title="بیرخستنەوە بە واتساپ">${I.wa}</button><button class="ib pay" data-a="pay" data-l="${X(c.code)}">${I.cash}<span>پارە</span></button></div></div>`}).join("")}</div>`+(rn.length>8?`<button class="b t" data-a="go" data-v="shopswk">بینینی هەموو (${rn.length})</button>`:""):`<div class="ok-n">${I.check} هیچ پەراوگەیەک لە ٧ ڕۆژی داهاتوودا بەسەرناچێت</div>`)+`</div>`;
 const top=sh.filter(c=>(c.r30||0)+(c.s30||0)>0).sort(SRT.dl).slice(0,6),tmx=Math.max(1,...top.map(c=>c.r30+c.s30));
 const tops=has?`<div class="pn"><div class="ph"><h4>چالاکترین پەراوگەکان</h4><small>٣٠ ڕۆژ</small></div>${top.length?`<div class="tp">${top.map(c=>`<div class="tr"><span class="tn" dir="auto" data-a="open" data-l="${X(c.code)}">${X(nameOf(c)||fc(c.code))}</span><span class="tb2"><i class="r" style="width:${c.r30/tmx*100}%"></i><i class="s" style="width:${c.s30/tmx*100}%"></i></span><span class="tv">${c.r30+c.s30}</span></div>`).join("")}</div>`:`<p class="sub">هێشتا هیچ دابەزاندنێک لە ٣٠ ڕۆژی ڕابردوودا نییە.</p>`}</div>`:"";
 let acts;if(LOG===null)acts=`<div class="pn"><h4>دوایین بەکارهێنانەکان</h4><p class="sub">${AE.sql}</p></div>`;
 else acts=`<div class="pn"><h4>دوایین بەکارهێنانەکان</h4>${LOG.length?`<div class="hl">${LOG.slice(0,8).map(ev=>{const d=dv(ev.info),c=byCode(ev.code);return `<button class="hi${c?" ar":""}"${c?` data-a="opentab" data-k="${c.kind}" data-l="${X(c.code)}"`:""}><span class="hc">${d.ic}</span><div><b dir="auto">${X(c?nameOf(c)||fc(c.code):fc(ev.code))}</b><small>${X(APN[ev.app]||ev.app||"")}${ev.action==="activate"?" • چالاککردن":""} • <bdi>${ft(ev.at)}</bdi> • ${X(d.t)}</small></div></button>`}).join("")}</div>`:`<p class="sub">هێشتا هیچ بەکارهێنانێک تۆمار نەکراوە.</p>`}</div>`;
 const codes=`<div class="pn"><div class="ph"><h4>کۆدەکانی خوێندکار</h4><button class="ib" data-a="go" data-v="codes">${I.list}<span>بینین</span></button></div><div class="nt"><span>یەکجاری ئامادە: ${sg.filter(c=>st(c).k==="ok").length}</span><span>کاتی چالاک: ${tm2.filter(c=>st(c).k==="ok").length}</span></div></div>`;
 return errBanner()+(has||!sh.length?"":`<div class="sql2">${SQL2}</div>`)+kpis+`<div class="dash"><div class="gr">${rnw}${chart}</div><div class="gr">${tops}${codes}${acts}</div></div>`};
const vPay=()=>{if(PAY===null)return `<div class="pn"><p class="sub">بارکردن…</p></div>`;if(PAY.err)return `<div class="sql2">${PAY.err==="sql"?SQL2:X(aerr({error:PAY.err}))}</div>`;
 const it=PAY.items||[],ms=PAY.months||[],mx=Math.max(1,...ms.map(z=>+(z.sum&&z.sum.IQD||0)));const MN=["","کانوونی دووەم","شوبات","ئازار","نیسان","ئایار","حوزەیران","تەممووز","ئاب","ئەیلوول","تشرینی یەکەم","تشرینی دووەم","کانوونی یەکەم"];
 const groups=[],gm={};it.forEach((p,i)=>{const k=String(p.paid_at).slice(0,7);if(!gm[k]){gm[k]=[];groups.push(k)}gm[k].push([p,i])});
 return `<div class="pt">${[["ئەم مانگە",PAY.month,"ok"],["مانگی پێشوو",PAY.last,"us"],["کۆی گشتی",PAY.all,""]].map(z=>`<div class="kc${z[2]?" k-"+z[2]:""}"><span class="kl">${z[0]}</span><b style="font-size:17px">${money(z[1])}</b></div>`).join("")}</div>
 <button class="b p" data-a="paynew">${I.plus}<span>تۆمارکردنی پارەی نوێ</span></button>
 <div class="pn"><div class="ph"><h4>داهاتی ٦ مانگ (دینار)</h4></div><div class="bc" style="height:110px">${ms.map(z=>{const v=+(z.sum&&z.sum.IQD||0);return `<div class="cc" title="${X(z.m)}: ${X(money(z.sum))}"><i class="r" style="height:${v/mx*100}%"></i></div>`}).join("")}</div><div class="wkl">${ms.map(z=>`<span>${X(MN[+z.m.slice(5)]||z.m)}</span>`).join("")}</div></div>
 <div class="pn"><div class="ph"><h4>پارەدانەکان</h4><small>${it.length}</small></div>${it.length?groups.map(k=>{const sum={};gm[k].forEach(([p])=>{sum[p.currency]=(sum[p.currency]||0)+ +p.amount});return `<div class="mh"><span>${X(MN[+k.slice(5)]||"")} ${k.slice(0,4)}</span><span>${money(sum)}</span></div>`+gm[k].map(([p,i])=>`<div class="py"><span class="pa">${X(mon(p.amount,p.currency))}</span><div class="pi" ${byCode(p.code)?`data-a="open" data-l="${X(p.code)}" style="cursor:pointer"`:""}><b dir="auto">${X(p.title||fc(p.code))}</b><small><bdi>${ft(p.paid_at)}</bdi>${+p.days?" • +"+p.days+" ڕۆژ":""}${p.note?" • "+X(p.note):""}</small></div><button class="ib sq" data-a="prcp" data-i="${i}" aria-label="وەسڵ" title="وەسڵ">${I.rcpt}</button><button class="ib sq dg" data-a="pdel" data-i="${i}" aria-label="سڕینەوە" title="سڕینەوە">${I.trash}</button></div>`).join("")}).join(""):`<div class="em">هێشتا هیچ پارەیەک تۆمار نەکراوە.<br>لە کارتی هەر پەراوگەیەک دوگمەی «پارە» دابگرە.</div>`}</div>`};
const vShops=()=>`<div class="srch"><span class="si">${I.search}</span><input id="q" type="search" dir="auto" autocomplete="off" placeholder="گەڕان بە ناو، کۆد یان ژمارە" value="${X(q)}">${q?`<button class="qx" data-a="qx" aria-label="سڕینەوەی گەڕان">${I.close}</button>`:""}</div><div class="srt"><span>ڕیزکردن:</span>${[["left","ماوەی ماو"],["dl","زۆرترین دابەزاندن"],["name","ناو"],["new","نوێترین"]].map(z=>`<button class="chp${srt===z[0]?" on":""}" data-a="srt" data-v="${z[0]}">${z[1]}</button>`).join("")}</div><div id="tb"></div><div class="sec"><h4>پەراوگەکان</h4><span id="cnt"></span></div><div class="lst" id="lst"></div><div style="height:60px"></div>`;
const vCodes=()=>seg()+`<p class="ksub">${X(KD[tab])}</p><div class="srch"><span class="si">${I.search}</span><input id="q" type="search" dir="auto" autocomplete="off" placeholder="گەڕان بە کۆد یان ناو" value="${X(q)}">${q?`<button class="qx" data-a="qx" aria-label="سڕینەوەی گەڕان">${I.close}</button>`:""}</div><div id="tb"></div><div class="sec"><h4>کۆدەکان</h4><span id="cnt"></span></div><div class="lst" id="lst"></div>`;
const newH=()=>NEW&&NEW.length?`<div class="nw"><div class="nh"><b>${NEW.length>1?NEW.length+" کۆدی نوێ دروست کران ✓":"کۆدی نوێ دروست کرا ✓"}</b><button class="x" data-a="nx" aria-label="داخستن">${I.close}</button></div>${NEW.map(c=>`<button class="cd big" data-a="cp" data-l="${X(c)}">${X(fc(c))}${I.copy}</button>`).join("")}<div class="two"><button class="b p" data-a="cpn">${I.copy}<span>${NEW.length>1?"کۆپی هەموو":"کۆپی"}</span></button><button class="b" data-a="wan">${I.wa}<span>واتساپ</span></button></div><button class="b t" data-a="seeall">بینین لە لیستی کۆدەکان</button></div>`:"";
const sumTxt=()=>{const a=appsL(CF.apps);return CF.k==="shop"?"١ کۆدی پەراوگە • "+a+" • "+CF.d+" ڕۆژ لە یەکەم چالاککردنەوە • "+CF.m+" ئامێر":CF.k==="timed"?CF.n+" کۆدی کاتی • "+a+" • "+CF.d+" ڕۆژ لە ئێستاوە":CF.n+" کۆدی یەکجاری • "+a+" • هەریەکەیان "+CF.d+" ڕۆژ بەکاردێت"};
const vNew=()=>{const ch=(a,v,t,cur)=>`<button class="chp${String(cur)===String(v)?" on":""}" data-a="${a}" data-v="${v}">${t}</button>`,stp=(f,id,mx)=>`<div class="stp"><button data-a="st" data-f="${f}" data-s="-1" aria-label="کەمکردن">−</button><input id="${id}" type="number" min="1" max="${mx}" inputmode="numeric" value="${CF[f]}"><button data-a="st" data-f="${f}" data-s="1" aria-label="زیادکردن">+</button></div>`,K=CF.k;let n=0;const sn=()=>`<span class="sn">${"١٢٣٤٥٦"[n++]}</span>`;
 return `<div class="seg">${["shop","single","timed"].map(k=>`<button data-a="ck" data-v="${k}" class="${K===k?"on":""}">${KN[k]}</button>`).join("")}</div><p class="ksub">${X(KD[K])}</p>`+newH()
 +`<div class="pn"><div class="ph">${sn()}<h4>${K==="shop"?"ناوی پەراوگە":"ناونیشان"}</h4><small>ئارەزوومەندانە</small></div><input id="tt" type="text" dir="auto" maxlength="60" value="${X(CF.t)}" placeholder="${K==="shop"?"بۆ نموونە: پەراوگەی ئاسۆ – سۆران":"بۆ نموونە: ناوی کەس یان گرووپ"}"></div>`
 +`<div class="pn"><div class="ph">${sn()}<h4>بۆ کام سیستەم</h4></div><div class="ap">${[["both","هەردووکی"],["report","ڕاپۆرت"],["seminar","سیمینار"]].map(([v,t])=>ch("ca",v,t,CF.apps.length>1?"both":CF.apps[0])).join("")}</div></div>`
 +(K==="shop"?"":`<div class="pn"><div class="ph">${sn()}<h4>ژمارەی کۆدەکان</h4><small>١ تا ٥٠</small></div><div class="row">${stp("n","dn",50)}${[1,5,10,25].map(v=>ch("cn",v,v,CF.n)).join("")}</div></div>`)
 +`<div class="pn"><div class="ph">${sn()}<h4>ماوە</h4><small>ڕۆژ</small></div><div class="row">${stp("d","dd",3650)}${[[7,"هەفتەیەک"],[30,"مانگێک"],[90,"٣ مانگ"],[365,"ساڵێک"]].map(z=>ch("cd",z[0],z[1],CF.d)).join("")}</div></div>`
 +(K==="shop"?`<div class="pn"><div class="ph">${sn()}<h4>ژمارەی ئامێر</h4><small>چەند ئامێری پەراوگە</small></div><div class="row">${stp("m","dm",50)}${[1,2,3,5].map(v=>ch("cm",v,v,CF.m)).join("")}</div></div>`:"")
 +`<div class="sm" id="sum"></div><button class="b p" id="mk" data-a="mk"></button><p class="er" id="er"></p>`};
const syncCF=()=>{const set=(id,v)=>{const e=box.querySelector("#"+id);if(e)e.value=v};set("dd",CF.d);set("dn",CF.n);set("dm",CF.m);const s=box.querySelector("#sum"),m=box.querySelector("#mk");if(s)s.textContent=sumTxt();if(m&&!m.disabled)m.textContent=CF.k==="shop"?"دروستکردنی کۆدی پەراوگە":"دروستکردنی "+CF.n+" کۆد";
 box.querySelectorAll('[data-a="cd"]').forEach(b=>b.classList.toggle("on",+b.dataset.v===CF.d));box.querySelectorAll('[data-a="cn"]').forEach(b=>b.classList.toggle("on",+b.dataset.v===CF.n));box.querySelectorAll('[data-a="cm"]').forEach(b=>b.classList.toggle("on",+b.dataset.v===CF.m))};
const make=async()=>{const b=box.querySelector("#mk"),er=box.querySelector("#er");b.disabled=true;b.textContent="دروستکردن…";er.textContent="";
 const m=await rpc("admin_make",{p_pw:pw,p_kind:CF.k,p_apps:CF.apps,p_count:CF.k==="shop"?1:Math.max(1,Math.min(50,CF.n||1)),p_days:Math.max(1,Math.min(3650,CF.d||30)),p_max_devices:Math.max(1,Math.min(50,CF.m||1)),p_title:CF.t.trim()});
 b.disabled=false;syncCF();if(!Array.isArray(m.codes)){er.textContent=aerr(m);return}
 CF.t="";NEW=m.codes;tab=CF.k;await reload(true);toastA("کۆدەکە دروست کرا ✓")};
const kv=(k,v)=>`<div class="kv"><span>${k}</span><b>${v}</b></div>`;
const vDet=()=>{const c=byCode(det),s=st(c),L=X(c.code),D=DET[c.code],rows=[],ev=D?D.log||[]:[];
 rows.push(kv("جۆر",KN[c.kind]),kv("سیستەم",appsL(c.apps)));
 if(c.kind==="single")rows.push(kv("بەکارهێنان",c.used_at?`<bdi>${ft(c.used_at)}</bdi>`:"هێشتا نەبەکارهاتووە"),kv("کۆتایی",c.expires_at?`<bdi>${ft(c.expires_at)}</bdi>`:"—"));
 else if(c.kind==="shop"&&!c.activated_at)rows.push(kv("ماوە",c.days+" ڕۆژ (لە یەکەم چالاککردنەوە)"),kv("ئامێر",(c.devices||0)+" / "+c.max_devices));
 else{rows.push(kv("ماوە",s.k==="ok"?timeLeft(c.expires_at):s.k==="pa"?"ڕاگیراوە":"بەسەرچووە"),kv("کۆتایی",c.expires_at?`<bdi>${ft(c.expires_at)}</bdi>`:"—"));if(c.activated_at)rows.push(kv("چالاککرا",`<bdi>${ft(c.activated_at)}</bdi>`));if(c.kind==="shop")rows.push(kv("ئامێر",(c.devices||0)+" / "+c.max_devices))}
 rows.push(kv("دابەزاندن",(c.uses||0)+" جار"));if(c.created_at)rows.push(kv("دروستکراوە",`<bdi>${ft(c.created_at)}</bdi>`));if(c.last_use)rows.push(kv("دوایین بەکارهێنان",`<bdi>${ft(c.last_use)}</bdi>`));
 const ext=c.kind==="single"?"":`<div class="pn"><div class="ph"><h4>${c.kind==="shop"?"نوێکردنەوەی بەشداربوون":"درێژکردنەوەی ماوە"}</h4></div><div class="row">${[7,30,90,365].map(d=>`<button class="chp" data-a="ext" data-l="${L}" data-v="${d}">+${d} ڕۆژ</button>`).join("")}</div><div class="row"><input id="exd" type="number" inputmode="numeric" style="flex:1;width:auto;min-width:0" placeholder="ژمارەی ڕۆژ (بۆ کەمکردنەوە: −)"><button class="ib" data-a="extc" data-l="${L}">${I.clock}<span>جێبەجێکردن</span></button></div></div>`;
 const apps=`<div class="pn"><div class="ph"><h4>بۆ کام سیستەم</h4></div><div class="ap">${[["both","هەردووکی"],["report","ڕاپۆرت"],["seminar","سیمینار"]].map(([v,t])=>`<button class="chp${(c.apps.length>1?"both":c.apps[0])===v?" on":""}" data-a="sapps" data-l="${L}" data-v="${v}">${t}</button>`).join("")}</div></div>`;
 const devs=c.kind!=="shop"?"":`<div class="pn"><div class="ph"><h4>ئامێرەکان</h4><small>${c.devices||0} / ${c.max_devices}</small></div><div class="row"><span class="fl" style="flex:1">زۆرترین ژمارەی ئامێر</span><div class="stp"><button data-a="mdv" data-l="${L}" data-s="-1" aria-label="کەمکردن">−</button><input type="number" readonly value="${c.max_devices}"><button data-a="mdv" data-l="${L}" data-s="1" aria-label="زیادکردن">+</button></div></div>${D?(D.devices.length?`<div class="dvl">${D.devices.map(d=>{const x=dv(d.info);return `<div class="hi"><span class="hc">${x.ic}</span><div><b>${X(x.t)}</b><small>چالاککرا <bdi>${ft(d.created_at)}</bdi> • دوایین جار <bdi>${ft(d.last_seen)}</bdi></small></div></div>`}).join("")}</div><button class="b wn" data-a="rstd" data-l="${L}">${I.reset}<span>سڕینەوەی ئامێرەکان</span></button><p class="sub" style="margin:0">دوای سڕینەوە، پەراوگە دەبێت کۆدەکە دووبارە بنووسێت (بۆ نموونە کاتێک ئامێرەکەی گۆڕیوە).</p>`:`<p class="sub">هێشتا هیچ ئامێرێک چالاک نەکراوە.</p>`):`<p class="sub">بارکردن…</p>`}</div>`;
 const hist=!D?`<p class="sub">بارکردن…</p>`:ev.length?`<div class="hl">${ev.slice(0,50).map(e=>{const d=dv(e.info);return `<div class="hi"><span class="hc">${d.ic}</span><div><b><bdi>${ft(e.at)}</bdi></b><small>${X(APN[e.app]||e.app||"")}${e.action==="activate"?" • چالاککردن":""} • ${X(d.t)}</small></div></div>`}).join("")}</div>`:`<p class="sub">هێشتا هیچ بەکارهێنانێک تۆمار نەکراوە.</p>`;
 const wk=D&&D.weeks?D.weeks:null,pays=D&&D.payments?D.payments:null;
 const stx=c.r30==null?"":`<div class="pn"><div class="ph"><h4>ئاماری دابەزاندن</h4>${legend()}</div><div class="pt">${[["٧ ڕۆژ",c.r7,c.s7],["٣٠ ڕۆژ",c.r30,c.s30],["کۆی گشتی",c.rt,c.st]].map(z=>`<div class="kc"><span class="kl">${z[0]}</span><b>${z[1]+z[2]}</b><small>ڕ ${z[1]} • س ${z[2]}</small></div>`).join("")}</div>${wk?`<h4 style="font-size:13.5px;margin-top:4px">٨ هەفتەی ڕابردوو</h4>`+bars(wk.map((z,i)=>({r:z.r,s:z.s,t:z.w,l:i===wk.length-1?"ئەم هەفتە":String(z.w).slice(5).replace("-","/")})),1):D?"":`<p class="sub">بارکردن…</p>`}</div>`;
 const pyH=c.r30==null?"":`<div class="pn"><div class="ph"><h4>${I.cash} پارەدانەکان</h4><small>${pays?pays.length:""}</small></div><button class="b p" data-a="pay" data-l="${L}">${I.plus}<span>تۆمارکردنی پارە${c.kind==="shop"?" و نوێکردنەوە":""}</span></button>${pays?(pays.length?pays.map((p,i)=>`<div class="py"><span class="pa">${X(mon(p.amount,p.currency))}</span><div class="pi"><b><bdi>${ft(p.paid_at)}</bdi></b><small>${+p.days?"+"+p.days+" ڕۆژ":"بێ گۆڕینی ماوە"}${p.note?" • "+X(p.note):""}</small></div><button class="ib sq" data-a="drcp" data-l="${L}" data-i="${i}" aria-label="وەسڵ" title="وەسڵ">${I.rcpt}</button><button class="ib sq dg" data-a="dpdel" data-l="${L}" data-i="${i}" aria-label="سڕینەوە">${I.trash}</button></div>`).join(""):`<p class="sub">هێشتا هیچ پارەیەک تۆمار نەکراوە.</p>`):`<p class="sub">بارکردن…</p>`}</div>`;
 const ctc=c.kind!=="shop"||c.r30==null?"":`<div class="pn"><div class="ph"><h4>پەیوەندی</h4><button class="ib" data-a="info" data-l="${L}">${I.edit}<span>دەستکاری</span></button></div>${kv("مۆبایل",c.phone?`<bdi>${X(c.phone)}</bdi>`:"—")}${c.note?kv("تێبینی",`<span dir="auto">${X(c.note)}</span>`):""}${c.activated_at?`<button class="b" data-a="rmd" data-l="${L}">${I.wa}<span>بیرخستنەوەی نوێکردنەوە</span></button>`:""}</div>`;
 return `<div class="hero k-${s.k}"><span class="pl">${s.t}</span><div class="hname">${KN[c.kind]}${nameOf(c)?" • "+X(nameOf(c)):""}</div><button class="hcode" data-a="cp" data-l="${L}" aria-label="کۆپی">${X(fc(c.code))}${I.copy}</button>${s.soon?'<div class="rm" style="color:var(--pa)">⚠ بەزوویی بەسەردەچێت</div>':""}</div>
 <div class="gr2"><div class="gr"><div class="pn">${rows.join("")}</div>${stx}</div><div class="gr">${pyH}${ctc}</div></div>
 <div class="act"><button class="b" data-a="wa" data-l="${L}">${I.wa}<span>واتساپ</span></button><button class="b" data-a="cp" data-l="${L}">${I.copy}<span>کۆپی</span></button><button class="b wn" data-a="rev" data-l="${L}">${c.revoked?I.play+"<span>چالاککردنەوە</span>":I.pause+"<span>ڕاگرتن</span>"}</button><button class="b dg" data-a="del" data-l="${L}">${I.trash}<span>سڕینەوە</span></button></div>
 ${ext}${devs}${apps}
 <div class="pn"><div class="ph"><h4>${c.kind==="shop"?"ناوی پەراوگە":"ناونیشان"}</h4></div>${c.group_id?`<p class="sub">ئەم کۆدە لە گرووپی «${X(c.group_title||"")}» دایە.</p><button class="ib" data-a="reng" data-g="${X(c.group_id)}">${I.edit}<span>گۆڕینی ناوی گرووپ</span></button>`:`<div class="row"><input id="dtt" style="flex:1;width:auto;min-width:0" maxlength="60" dir="auto" value="${X(c.title||"")}" placeholder="ناوی پەراوگە یان کەس"><button class="ib" data-a="savt" data-l="${L}">${I.check}<span>هەڵگرتن</span></button></div>`}</div>
 <div class="pn"><div class="ph"><h4>مێژووی بەکارهێنان</h4>${ev.length?`<small>${ev.length}${ev.length>=60?"+":""} جار</small>`:""}</div>${hist}</div>`};
const vSet=()=>{const lm=[[2,"٢ خولەک"],[5,"٥ خولەک"],[15,"١٥ خولەک"],[0,"هەرگیز"]],yn=(g,a,b)=>`<b style="color:var(--${g?"ok":"ex"})">${g?a:b}</b>`;
 return `<div id="chk">${chkH()}</div>${errH()}<div class="pn"><div class="ph"><h4>داخستنی خۆکار</h4></div><p class="sub" style="margin:0">دوای ئەم ماوە بێچالاکییە، پەنێلەکە خۆی دادەخات و دووبارە پاسۆرد دەپرسێتەوە.</p><div class="row">${lm.map(z=>`<button class="chp${LOCKMIN===z[0]?" on":""}" data-a="lockm" data-v="${z[0]}">${z[1]}</button>`).join("")}</div></div>
 <div class="pn"><div class="ph"><h4>نامەی واتساپ (یەکجاری و کاتی)</h4></div><p class="sub" style="margin:0">{name} ناو • {codes} کۆدەکان • {link} بەستەری ماڵپەڕ</p><textarea id="tpl" rows="9" dir="auto">${X(LS.g("adm-tpl",DEFTPL))}</textarea><div class="two"><button class="b p" data-a="tpls">${I.check}<span>هەڵگرتن</span></button><button class="b" data-a="tplr">گەڕاندنەوە</button></div></div>
 <div class="pn"><div class="ph"><h4>نامەی واتساپ (پەراوگە)</h4></div><p class="sub" style="margin:0">{name} ناوی پەراوگە • {codes} کۆد • {link} بەستەر • {days} ڕۆژ • {apps} سیستەم</p><textarea id="tpls2" rows="10" dir="auto">${X(LS.g("adm-tpl-shop",DEFSHOP))}</textarea><div class="two"><button class="b p" data-a="tpls2">${I.check}<span>هەڵگرتن</span></button><button class="b" data-a="tplr2">گەڕاندنەوە</button></div></div>
 <div class="pn"><div class="ph"><h4>نامەی بیرخستنەوەی نوێکردنەوە</h4></div><p class="sub" style="margin:0">{name} ناو • {when} کەی تەواو دەبێت • {date} بەروار • {days} ڕۆژی ماوە • {apps} سیستەم</p><textarea id="tplm" rows="7" dir="auto">${X(LS.g("adm-tpl-rmd",DEFRMD))}</textarea><div class="two"><button class="b p" data-a="tsv" data-k="adm-tpl-rmd" data-i="tplm">${I.check}<span>هەڵگرتن</span></button><button class="b" data-a="trs" data-k="adm-tpl-rmd">گەڕاندنەوە</button></div></div>
 <div class="pn"><div class="ph"><h4>وەسڵی پارەدان</h4></div><p class="sub" style="margin:0">{no} ژمارە • {name} ناو • {amount} بڕ • {days} ماوە • {until} تا • {date} بەروار • {note} تێبینی</p><textarea id="tplc" rows="10" dir="auto">${X(LS.g("adm-tpl-rcp",DEFRCP))}</textarea><div class="two"><button class="b p" data-a="tsv" data-k="adm-tpl-rcp" data-i="tplc">${I.check}<span>هەڵگرتن</span></button><button class="b" data-a="trs" data-k="adm-tpl-rcp">گەڕاندنەوە</button></div></div>
 <div class="pn"><div class="ph"><h4>گۆڕینی پاسۆرد</h4></div><input id="npw" type="password" dir="ltr" autocomplete="new-password" placeholder="پاسۆردی نوێ (لانیکەم ٦ پیت)"><button class="b" data-a="setpw">${I.lock}<span>گۆڕین</span></button></div>
 <div class="pn"><div class="ph"><h4>دۆخی سیستەم</h4></div>${kv("پەیوەندی بە سێرڤەر",yn(true,"باشە",""))}${kv("مێژووی بەکارهێنان",yn(LOG!==null,"چالاکە","SQL پێویستە"))}${kv("پارەدان و ئامار (v2)",yn(listOf("shop").every(c=>c.r30!=null)&&!!REV,"چالاکە","supabase_update_v2.sql"))}${kv("ئەم پەنێلە کراوەتەوە لە",APN[APP])}</div>
 <button class="b dg" data-a="lk">${I.lock}<span>دەرچوون و داخستنی پەنێل</span></button>`};
const TT={stats:"داشبۆرد",shops:"پەراوگەکان",codes:"کۆدی خوێندکار",pay:"پارەکان",new:"دروستکردنی کۆد",set:"ڕێکخستن",det:"وردەکاری"};
const render=top=>{if(!R)return;if(view==="det"&&!byCode(det)){view=PREV||"stats";det=null}
 const old=box.querySelector("#mn"),sc=old?old.scrollTop:0,mid=[["stats","داشبۆرد",I.home],["shops","پەراوگەکان",I.shop],["new","دروستکردن",I.plus,1],["codes","کۆدەکان",I.key],["pay","پارەکان",I.cash]],dv0=view==="det"?(PREV||"stats"):view;
 box.innerHTML=`<div class="top"><button class="ib sq" data-a="back" aria-label="گەڕانەوە">${I.back}</button><div class="tt"><h3>${TT[view]}</h3><p class="sub">پەنێلی بەڕێوەبەر • ڕاپۆرت + سیمینار • ${pad(upd.getHours())}:${pad(upd.getMinutes())}</p></div><button class="ib sq" data-a="rf" aria-label="نوێکردنەوە">${I.refresh}</button><button class="ib sq" data-a="go" data-v="set" aria-label="ڕێکخستن">${I.gear}</button></div><div class="main" id="mn">${view==="stats"?vStats():view==="shops"?vShops():view==="codes"?vCodes():view==="pay"?vPay():view==="new"?vNew():view==="set"?vSet():vDet()}</div>${view==="shops"&&!selMode?`<button class="fab" data-a="gonew" aria-label="پەراوگەی نوێ">${I.plus}</button>`:""}<div class="sbr" id="sb" hidden></div><div class="nv">${mid.map(z=>`<button class="ni${z[3]?" mid":""}${dv0===z[0]?" on":""}" data-a="go" data-v="${z[0]}"><span class="ii">${z[2]}</span>${z[1]}</button>`).join("")}</div>`;
 if(view==="codes"||view==="shops")renderList();if(view==="new")syncCF();if(view==="pay"&&PAY===null)loadPay();box.querySelector("#mn").scrollTop=top?0:sc};
const go=v=>{selMode=false;SEL.clear();det=null;let f="all";if(v==="shopswk"){v="shops";f="wk"}if(v==="shops"){tab="shop";flt=f;q=""}else if(v==="codes"){if(tab==="shop"){tab="single";flt="all"}q=""}if(v==="new")CF.k=view==="shops"?"shop":view==="codes"?tab:CF.k;if(v==="pay")PAY=null;view=v;render(true)};
const openDet=(l,k)=>{const c=byCode(l);if(!c)return;tab=c.kind;if(view!=="det"){PREV=view;SC=box.querySelector("#mn")?box.querySelector("#mn").scrollTop:0}det=l;view="det";render(true);loadDet(l)};
const back=()=>{if(view==="det"){det=null;view=PREV||"stats";if(view==="pay")PAY=null;render();box.querySelector("#mn").scrollTop=SC}else if(view!=="stats"){go("stats")}else close()};
o.addEventListener("input",ev=>{const i=ev.target,v=i.value;if(i.id==="q"){q=v.trim().toLowerCase();renderList()}else if(i.id==="tt")CF.t=v;else if(i.id==="dd"||i.id==="dn"||i.id==="dm"){const f=i.id[1],mx=f==="d"?3650:50;CF[f]=Math.max(0,Math.min(mx,parseInt(v,10)||0));const s=box.querySelector("#sum");if(s)s.textContent=sumTxt()}});
o.addEventListener("click",async ev=>{const b=ev.target.closest("[data-a]");if(!b||!o.contains(b))return;const a=b.dataset.a,l=b.dataset.l,g=b.dataset.g;
 switch(a){
 case"back":back();break;
 case"rf":b.classList.add("spin");await reload();break;
 case"go":go(b.dataset.v);break;
 case"gonew":CF.k=view==="shops"?"shop":tab;NEW=null;view="new";render(true);break;
 case"srt":srt=b.dataset.v;LS.s("adm-srt",srt);box.querySelectorAll('[data-a="srt"]').forEach(x=>x.classList.toggle("on",x===b));renderList();break;
 case"pay":payModal(l);break;
 case"paynew":pickShop();break;
 case"rmd":remind(l);break;
 case"info":infoModal(l);break;
 case"prcp":{const p=PAY&&PAY.items&&PAY.items[+b.dataset.i];if(p)receipt(byCode(p.code)||{code:p.code,title:p.title,kind:"x"},p);break}
 case"drcp":{const p=DET[l]&&DET[l].payments&&DET[l].payments[+b.dataset.i],c=byCode(l);if(p&&c)receipt(c,p);break}
 case"pdel":case"dpdel":{const p=a==="pdel"?(PAY&&PAY.items||[])[+b.dataset.i]:((DET[l]||{}).payments||[])[+b.dataset.i];if(!p)break;
  sure("ئەم پارەدانە بسڕدرێتەوە؟",X(mon(p.amount,p.currency))+" • "+fd(p.paid_at)+"<br>تێبینی: ماوەی بەشداربوون کەم ناکرێتەوە؛ ئەگەر پێویست بوو لە وردەکاری بە − کەمی بکەرەوە.","سڕینەوە",async()=>{const x=await rpc("admin_pay_delete",{p_pw:pw,p_id:p.id});if(x.ok){PAY=null;await reload();if(view==="det")loadDet(det);toastA("سڕایەوە ✓")}else toastA(aerr(x),true)});break}
 case"tsv":LS.s(b.dataset.k,box.querySelector("#"+b.dataset.i).value);toastA("نامەکە هەڵگیرا ✓");break;
 case"trs":LS.r(b.dataset.k);render();toastA("گەڕایەوە ✓");break;
 case"tab":tab=b.dataset.k;flt="all";q="";SEL.clear();selMode=false;render(true);break;
 case"flt":flt=b.dataset.v;renderList();break;
 case"open":openDet(l);break;
 case"opentab":openDet(l,b.dataset.k);break;
 case"seeall":q="";flt="all";NEW=null;go(tab==="shop"?"shops":"codes");break;
 case"ck":CF.k=b.dataset.v;NEW=null;render();break;
 case"ca":CF.apps=b.dataset.v==="both"?["report","seminar"]:[b.dataset.v];box.querySelectorAll('[data-a="ca"]').forEach(x=>x.classList.toggle("on",x===b));syncCF();break;
 case"cd":CF.d=+b.dataset.v;syncCF();break;
 case"cn":CF.n=+b.dataset.v;syncCF();break;
 case"cm":CF.m=+b.dataset.v;syncCF();break;
 case"st":{const f=b.dataset.f;CF[f]=Math.max(1,Math.min(f==="d"?3650:50,(CF[f]||1)+ +b.dataset.s));syncCF();break}
 case"mk":make();break;
 case"cp":doCopy(fc(l));break;
 case"cpn":doCopy(NEW.map(fc).join("\n"),"هەموو کۆدەکان کۆپی کران ✓");break;
 case"wan":waOpen(NEW);break;
 case"nx":NEW=null;render();break;
 case"wa":waOpen([l]);break;
 case"cpg":doCopy(list().filter(c=>c.group_id===g).map(c=>fc(c.code)).join("\n"),"کۆدەکانی گرووپ کۆپی کران ✓");break;
 case"wag":waOpen(list().filter(c=>c.group_id===g).map(c=>c.code));break;
 case"gv":if(OPENG.has(g))OPENG.delete(g);else OPENG.add(g);renderList();break;
 case"reng":{const c=all().find(x=>x.group_id===g);if(c)rename(c,true);break}
 case"savt":{const x=await rpc("admin_set_title",{p_pw:pw,p_code:l,p_group:"",p_title:box.querySelector("#dtt").value.trim()});if(x.ok){await reload();toastA("هەڵگیرا ✓")}else toastA(aerr(x),true);break}
 case"rev":{const c=byCode(l);if(c)setRev([l],!c.revoked);break}
 case"ext":extend(l,+b.dataset.v);break;
 case"extc":{const d=parseInt(box.querySelector("#exd").value,10);if(d)extend(l,d);break}
 case"sapps":{const x=await rpc("admin_set_apps",{p_pw:pw,p_code:l,p_apps:b.dataset.v==="both"?["report","seminar"]:[b.dataset.v]});if(x.ok){await reload();toastA("هەڵگیرا ✓")}else toastA(aerr(x),true);break}
 case"mdv":{const c=byCode(l);if(!c)break;const n=Math.max(1,Math.min(50,c.max_devices+ +b.dataset.s));if(n===c.max_devices)break;const x=await rpc("admin_set_max_devices",{p_pw:pw,p_code:l,p_n:n});if(x.ok){await reload();toastA(n+" ئامێر ✓")}else toastA(aerr(x),true);break}
 case"rstd":sure("ئامێرەکانی ئەم پەراوگەیە بسڕدرێنەوە؟","پەراوگە دەبێت کۆدەکە دووبارە لەسەر ئامێرەکانی بنووسێت.","سڕینەوە",async()=>{const x=await rpc("admin_reset_devices",{p_pw:pw,p_code:l});if(x.ok){await reload();toastA("ئامێرەکان سڕانەوە ✓")}else toastA(aerr(x),true)});break;
 case"del":sure("ئەم کۆدە بسڕدرێتەوە؟",`<bdi>${X(fc(l))}</bdi>`+(byCode(l)&&byCode(l).kind==="shop"?"<br>مێژووی پارەدانەکانی ئەم پەراوگەیەش دەسڕێتەوە.":""),"سڕینەوە",async()=>{det=null;view=PREV||"stats";await delMany([l])});break;
 case"bcp":doCopy(list().filter(c=>st(c).k==="ok"&&(flt==="all"||flt==="ok")&&matchQ(c)).map(c=>fc(c.code)).join("\n"),"کۆدەکان کۆپی کران ✓");break;
 case"bdel":{const ex=list().filter(c=>st(c).k==="ex").map(c=>c.code);if(ex.length)sure("سڕینەوەی "+ex.length+" کۆدی بەسەرچوو؟","ئەم کردارە ناگەڕێتەوە.","سڕینەوە",()=>delMany(ex));break}
 case"selmode":selMode=!selMode;SEL.clear();renderList();break;
 case"sel":if(SEL.has(l))SEL.delete(l);else SEL.add(l);renderList();break;
 case"selg":{const ls=list().filter(c=>c.group_id===g).map(c=>c.code),allS=ls.every(z=>SEL.has(z));ls.forEach(z=>allS?SEL.delete(z):SEL.add(z));renderList();break}
 case"selall":SH.forEach(z=>SEL.add(z));renderList();break;
 case"selnone":SEL.clear();renderList();break;
 case"scp":doCopy([...SEL].map(fc).join("\n"),SEL.size+" کۆد کۆپی کران ✓");break;
 case"swa":waOpen([...SEL]);break;
 case"srev":{const cs=list().filter(c=>SEL.has(c.code)),pause=cs.some(c=>!c.revoked);setRev(cs.map(c=>c.code),pause);break}
 case"sdel":{const ls=[...SEL];if(ls.length)sure("سڕینەوەی "+ls.length+" کۆد؟","ئەم کردارە ناگەڕێتەوە.","سڕینەوە",()=>delMany(ls));break}
 case"qx":q="";render();break;
 case"eye":{const i=box.querySelector("#pw");i.type=i.type==="password"?"text":"password";break}
 case"lockm":LOCKMIN=+b.dataset.v;LS.s("adm-lock",LOCKMIN);bump();render();toastA("هەڵگیرا ✓");break;
 case"tpls":LS.s("adm-tpl",box.querySelector("#tpl").value);toastA("نامەکە هەڵگیرا ✓");break;
 case"tplr":LS.s("adm-tpl",DEFTPL);render();toastA("گەڕایەوە ✓");break;
 case"tpls2":LS.s("adm-tpl-shop",box.querySelector("#tpls2").value);toastA("نامەکە هەڵگیرا ✓");break;
 case"tplr2":LS.s("adm-tpl-shop",DEFSHOP);render();toastA("گەڕایەوە ✓");break;
 case"setpw":{const v=box.querySelector("#npw").value;const x=await rpc("admin_set_password",{p_pw:pw,p_new:v});if(x.ok){pw=v;box.querySelector("#npw").value="";toastA("پاسۆرد گۆڕدرا ✓")}else toastA(aerr(x),true);break}
 case"chk":runCheck();break;
 case"chkcp":doCopy("Fix ONLY the following errors found by the admin system test. Do not change anything else in the file.\n\n"+(CHK||[]).filter(r=>!r.ok).map((r,i)=>(i+1)+". Location: "+r.n+"\n   Error type: "+r.m).join("\n\n"),"ئیرۆرەکان کۆپی کران ✓");break;
 case"errcp":{const gg=ERRG[+b.dataset.i];if(gg)doCopy(errTxt(gg),"هەڵەکە کۆپی کرا ✓");break}
 case"errclr":sure("هەموو هەڵەکان بسڕدرێنەوە؟","ئەم کردارە ناگەڕێتەوە.","سڕینەوە",async()=>{const x=await rpc("admin_errors_clear",{p_pw:pw});if(x.ok){await loadErrs();render();toastA("سڕانەوە ✓")}else toastA(aerr(x),true)});break;
 case"lk":pw="";close();break;
 }});
const login=()=>{
 box.innerHTML=`<div class="top"><button class="ib sq" data-a="back" aria-label="گەڕانەوە">${I.back}</button><div class="tt"><h3>پەنێلی بەڕێوەبەر</h3><p class="sub">ڕاپۆرت + سیمینار</p></div></div><div class="main"><div class="lg"><div class="lk">${I.lock}</div><div><h3>چوونەژوورەوە</h3><p class="sub">بۆ بەڕێوەبردنی کۆد و پەراوگەکان، پاسۆردەکەت بنووسە</p></div>
 <div class="pwr"><input id="pw" type="password" dir="ltr" autocomplete="off" placeholder="پاسۆرد"><button class="ib sq" style="height:50px;width:50px" data-a="eye" aria-label="پیشاندانی پاسۆرد">${I.eye}</button></div>
 <p class="er" id="er"></p><button class="b p" id="go">چوونەژوورەوە</button></div></div>`;
 const inp=box.querySelector("#pw"),er=box.querySelector("#er"),ok=box.querySelector("#go");let busy=false;
 const go2=async()=>{if(busy||!inp.value)return;busy=true;ok.disabled=true;er.style.color="var(--mut)";er.textContent="پشکنین…";
  const r=await rpc("admin_list",{p_pw:inp.value});busy=false;ok.disabled=false;er.style.color="";
  if(r.ok){pw=inp.value;R=r.items||[];REV=r.rev||null;DAILY=r.daily||null;await Promise.all([loadLog(),loadErrs()]);upd=new Date();view="stats";PREV="stats";bump();tk=setInterval(()=>{if(R&&!CHKB&&!o.querySelector(".md")&&root.activeElement&&root.activeElement.tagName!=="INPUT"&&root.activeElement.tagName!=="TEXTAREA"&&(view==="stats"||view==="codes"||view==="shops"))render()},6e4);render(true)}else er.textContent=aerr(r)};
 ok.onclick=go2;inp.onkeydown=ev=>{if(ev.key==="Enter")go2()};setTimeout(()=>inp.focus(),50)};
login()}
A.openAdmin=openAdmin;
})();
