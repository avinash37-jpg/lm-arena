/* Shared helpers used by both public site and admin panel */

// Retrieve the active data: localStorage override takes precedence over the built-in SITE_DATA
function getSiteData() {
  try {
    const saved = localStorage.getItem('levernasia_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      return deepMerge(window.SITE_DATA, parsed);
    }
  } catch (e) { console.warn('localStorage parse failed', e); }
  return JSON.parse(JSON.stringify(window.SITE_DATA));
}

function saveLocalDraft(data) {
  localStorage.setItem('levernasia_data', JSON.stringify(data));
  localStorage.setItem('levernasia_data_savedAt', new Date().toISOString());
}
function clearLocalDraft() {
  localStorage.removeItem('levernasia_data');
  localStorage.removeItem('levernasia_data_savedAt');
}
function hasLocalDraft() {
  return !!localStorage.getItem('levernasia_data');
}

function deepMerge(base, override) {
  if (Array.isArray(override)) return override;
  if (typeof override !== 'object' || override === null) return override;
  const out = { ...base };
  for (const k of Object.keys(override)) {
    if (base && typeof base[k] === 'object' && !Array.isArray(base[k]) && typeof override[k] === 'object' && !Array.isArray(override[k]) && override[k] !== null) {
      out[k] = deepMerge(base[k], override[k]);
    } else {
      out[k] = override[k];
    }
  }
  return out;
}

function exportDataFile(data) {
  const body = '/* ============================================================\n' +
               '   Levernasia – Site Content Data (published)\n' +
               '   Generated ' + new Date().toLocaleString() + '\n' +
               '   ============================================================ */\n\n' +
               'window.SITE_DATA = ' + JSON.stringify(data, null, 2) + ';\n';
  return body;
}
function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'application/javascript;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ---------- SHA-256 (pure JS fallback, works on http:// and file://) ---------- */
// Uses native crypto.subtle when available (Secure Context), otherwise a pure-JS impl.
async function sha256(str) {
  try {
    if (window.crypto && window.crypto.subtle && window.crypto.subtle.digest) {
      const buf = new TextEncoder().encode(str);
      const hash = await crypto.subtle.digest('SHA-256', buf);
      return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2,'0')).join('');
    }
  } catch (e) { /* fall through to pure JS */ }
  return sha256Pure(str);
}

// Pure-JS SHA-256 implementation (RFC 6234) – always works, no secure context needed.
function sha256Pure(message) {
  function rotr(n,x){return (x>>>n)|(x<<(32-n));}
  const K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
    0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
  function hash(H){
    for(let i=0;i<64;i++){
      const s0=rotr(2,H[0])^rotr(13,H[0])^rotr(22,H[0]);
      const maj=(H[0]&H[1])^(H[0]&H[2])^(H[1]&H[2]);
      const t2=s0+maj|0;
      const s1=rotr(6,H[4])^rotr(11,H[4])^rotr(25,H[4]);
      const ch=(H[4]&H[5])^((~H[4])&H[6]);
      const t1=H[7]+s1+ch+K[i]+W[i]|0;
      H[7]=H[6];H[6]=H[5];H[5]=H[4];H[4]=H[3]+t1|0;H[3]=H[2];H[2]=H[1];H[1]=H[0];
      H[0]=t1+t2|0;
    }
    return H;
  }
  const msg=new TextEncoder().encode(message);
  const l=msg.length*8;
  const padlen=((64-((msg.length+9)%64))%64)+9;
  const buf=new Uint8Array(msg.length+padlen);
  buf.set(msg);buf[msg.length]=0x80;
  const dv=new DataView(buf.buffer);
  dv.setUint32(buf.length-4,l>>>0,false);
  // Note: l < 2^32 so upper 32 bits are zero
  let H=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
  const W=new Array(64);
  for(let o=0;o<buf.length;o+=64){
    for(let i=0;i<16;i++) W[i]=dv.getUint32(o+i*4,false);
    for(let i=16;i<64;i++){
      const s0=rotr(7,W[i-15])^rotr(18,W[i-15])^(W[i-15]>>>3);
      const s1=rotr(17,W[i-2])^rotr(19,W[i-2])^(W[i-2]>>>10);
      W[i]=W[i-16]+s0+W[i-7]+s1|0;
    }
    const wH=H.slice();hash(wH);
    for(let i=0;i<8;i++) H[i]=H[i]+wH[i]|0;
  }
  return H.map(h=>(h>>>0).toString(16).padStart(8,'0')).join('');
}

// WhatsApp helper
function waLink(phone, msg) {
  return 'https://wa.me/' + (phone||'') + '?text=' + encodeURIComponent(msg||'');
}

const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];

function toast(msg, type='ok') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:9999;padding:12px 20px;border-radius:10px;font-weight:700;font-size:14px;box-shadow:0 10px 30px rgba(0,0,0,.5);transition:all .2s;color:#fff;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.background = type === 'err' ? '#b91c1c' : '#059669';
  t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity = '0'; setTimeout(()=>{t.style.opacity='1';t.classList.add('hidden');}, 200); }, 2600);
}

/* ---------- Shared header/footer injector ---------- */
// Three nav sections as requested:
//   About     -> index.html   (Experience, Location)
//   Menu      -> menu.html    (Food menu, Drinks menu)
//   Events    -> events.html  (Events & DJs, Highlights, Instagram, Reviews)
function injectLayout(currentPage) {
  const DATA = getSiteData();
  const s = DATA.site || {};
  const logo = s.logoUrl || '';
  const phone = (s.phone||'').replace(/\s+/g,'');
  const wa = s.whatsapp || '';

  // Build nav links based on current page
  const pages = [
    { key:'about',  href:'index.html',  label:'About',  sub:['Experience','Location'] },
    { key:'menu',   href:'menu.html',   label:'Menu',   sub:['Food','Drinks'] },
    { key:'events', href:'events.html', label:'Events & Media', sub:['Events & DJs','Highlights','Instagram','Reviews'] }
  ];

  const headerHTML = `
  <div id="draft-banner" class="hidden fixed top-0 left-0 right-0 z-[200] bg-amber-500 text-black text-xs md:text-sm font-bold px-4 py-2 text-center">
    You're viewing an unsaved local preview. <button id="draft-exit" class="underline ml-2 font-bold">Exit preview</button>
  </div>
  <header class="fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.95)]" id="site-header">
    <div id="top-bar" class="hidden lg:block bg-black border-b border-red-600/30 py-2 px-6 text-xs text-zinc-300">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center space-x-6">
          <span class="flex items-center gap-1.5 text-red-400 font-semibold">
            <svg class="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
            <span id="topbar-address">${s.address||''}</span>
          </span>
          <span class="flex items-center gap-1.5 text-zinc-300">
            <svg class="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" stroke-linecap="round"/></svg>
            Open Daily · ${s.hoursMonThu||'12 PM – 1 AM'}
          </span>
          <span class="flex items-center gap-1.5 text-red-400 font-bold bg-red-950/80 border border-red-500/40 px-2.5 py-0.5 rounded-full text-[11px] tracking-wider">
            <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            LIVE DJ NIGHTS EVERY WEEKEND
          </span>
        </div>
        <div class="flex items-center space-x-6 font-bold">
          <a id="topbar-phone" href="tel:${phone}" class="flex items-center gap-1.5 text-red-400 hover:text-red-300">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
            VIP Reservation: ${s.phone||''}
          </a>
        </div>
      </div>
    </div>
    <nav id="main-nav" class="bg-black/95 backdrop-blur-2xl border-b border-red-600/30 py-3.5 transition-all">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="index.html" class="flex items-center group shrink-0 py-1">
          <img id="nav-logo" src="${logo}" alt="${s.brandName||'Levernasia'}" class="h-10 sm:h-12 w-auto object-contain rounded-md shadow-[0_0_20px_rgba(220,38,38,0.3)] border border-red-600/30 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] group-hover:scale-105 transition-all">
        </a>
        <div class="hidden lg:flex items-center space-x-6 xl:space-x-8">
          ${pages.map(p => `<a href="${p.href}" class="nav-link ${p.key===currentPage?'active-page':''}">${p.label}</a>`).join('')}
        </div>
        <div class="hidden lg:flex items-center ml-8 xl:ml-12">
          <a href="https://wa.me/${wa}?text=${encodeURIComponent('Hello! I would like to reserve a VIP table at Levernasia.')}" target="_blank" rel="noopener" class="vip-btn px-6 py-2.5 text-xs">
            <svg class="w-3.5 h-3.5 text-amber-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            VIP Table
          </a>
        </div>
        <div class="lg:hidden flex items-center gap-3">
          <a href="tel:${phone}" class="p-2 bg-red-600 text-white rounded-lg shadow-md inline-flex">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
          </a>
          <button id="mobile-menu-btn" class="p-2 text-white hover:text-red-400 bg-zinc-950 border border-red-600/40 rounded-lg shadow-md">
            <svg id="icon-menu" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            <svg id="icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
      <div id="mobile-menu" class="hidden bg-black/98 border-b border-red-600/40 backdrop-blur-3xl lg:hidden overflow-hidden shadow-2xl">
        <div class="px-5 py-6 space-y-2 flex flex-col">
          <div class="flex items-center justify-between pb-4 border-b border-red-600/30 mb-2">
            <img id="mobile-logo" src="${logo}" alt="${s.brandName||'Levernasia'}" class="h-10 w-auto rounded-md border border-red-600/30">
            <span class="text-[11px] font-bold tracking-widest text-red-400 bg-red-950/80 px-2.5 py-1 rounded-full border border-red-600/30 uppercase">Gardens Galleria • Noida</span>
          </div>
          <div class="grid grid-cols-1 gap-1.5 py-1">
            ${pages.map(p => `
              <div class="mobile-nav-group ${p.key===currentPage?'mobile-nav-group-active':''}">
                <a href="${p.href}" class="mobile-link mobile-close">${p.label} <span class="text-red-500 font-serif">→</span></a>
                <div class="mobile-sub">${p.sub.map(sn=>`<span class="mobile-sub-item">${sn}</span>`).join('')}</div>
              </div>`).join('')}
          </div>
          <div class="pt-4 border-t border-red-600/30 flex flex-col gap-2.5">
            <a href="https://wa.me/${wa}?text=${encodeURIComponent('Hello! I would like to reserve a VIP table.')}" target="_blank" rel="noopener" class="mobile-close block text-center py-3.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black uppercase tracking-wider text-xs rounded-xl shadow-xl border border-red-400/30">
              Reserve VIP Table via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <a id="floating-call" href="tel:${phone}" class="fixed bottom-24 lg:bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform shadow-green-500/20">
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
  </a>
  <div class="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-2xl border-t border-red-600/30 px-2 py-2 flex justify-around items-center">
    <a href="index.html" class="mobile-bottom-link ${currentPage==='about'?'text-red-400':''}"><svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg><span>About</span></a>
    <a href="menu.html" class="mobile-bottom-link ${currentPage==='menu'?'text-red-400':''}"><svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg><span>Menu</span></a>
    <a href="events.html" class="mobile-bottom-link ${currentPage==='events'?'text-red-400':''}"><svg class="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg><span>Events</span></a>
    <a href="https://wa.me/${wa}?text=${encodeURIComponent('Hello! I want to book a VIP table.')}" target="_blank" rel="noopener" class="mobile-bottom-link vip"><svg class="w-4 h-4 mb-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><span>VIP</span></a>
  </div>`;

  const year = new Date().getFullYear();
  const footerHTML = `
  <footer class="bg-zinc-950 pt-20 pb-10 border-t border-red-600/30 relative" style="padding-bottom:90px">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <a href="index.html" class="inline-block mb-6"><img id="footer-logo" src="${logo}" alt="${s.brandName||'Levernasia'}" class="h-12 w-auto rounded-md border border-red-600/30"></a>
          <p class="text-zinc-400 font-light text-sm leading-relaxed mb-6">Noida's premier nightlife, luxury dining, and cocktail lounge experience.</p>
          <div class="flex gap-3">
            <a href="${s.instagram||'#'}" target="_blank" rel="noopener" class="w-10 h-10 rounded-xl border border-red-500 flex items-center justify-center text-white hover:bg-red-600 transition">
              <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01"/></svg>
            </a>
            <a href="https://wa.me/${wa}" target="_blank" rel="noopener" class="w-10 h-10 rounded-xl border border-emerald-500 flex items-center justify-center text-white hover:bg-emerald-600 transition">
              <svg class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </a>
            <a href="tel:${phone}" class="w-10 h-10 rounded-xl border border-red-500 flex items-center justify-center text-white hover:bg-red-600 transition">
              <svg class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h4 class="text-white font-display font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
            <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            Navigate
          </h4>
          <ul class="space-y-3 text-xs uppercase tracking-wider font-semibold">
            <li><a href="index.html" class="text-zinc-400 hover:text-red-400 flex items-center gap-2"><span class="w-1 h-1 rounded-full bg-red-500"></span>About · Experience · Location</a></li>
            <li><a href="menu.html" class="text-zinc-400 hover:text-red-400 flex items-center gap-2"><span class="w-1 h-1 rounded-full bg-red-500"></span>Food & Drinks Menu</a></li>
            <li><a href="events.html" class="text-zinc-400 hover:text-red-400 flex items-center gap-2"><span class="w-1 h-1 rounded-full bg-red-500"></span>Events & Media</a></li>
            <li><a href="events.html#quickpic" class="text-zinc-400 hover:text-red-400 flex items-center gap-2"><span class="w-1 h-1 rounded-full bg-red-500"></span>QuickPic · Download Your Photos</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-display font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
            <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
            Location & Contact
          </h4>
          <ul class="space-y-4 text-xs">
            <li class="flex items-start gap-3 text-zinc-300 leading-relaxed">
              <svg class="w-[18px] h-[18px] text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
              <a href="https://maps.google.com/?q=${encodeURIComponent(s.address||'')}" target="_blank" rel="noopener" class="hover:text-red-400">${s.address||''}</a>
            </li>
            <li class="pt-2">
              <div class="bg-gradient-to-r from-red-950/90 to-zinc-900 border border-red-500/40 rounded-xl p-3.5 shadow-lg">
                <span class="text-[10px] text-red-400 font-bold uppercase tracking-widest block mb-1">Instant Table Reservation</span>
                <a href="https://wa.me/${wa}?text=${encodeURIComponent('Hello! I want to reserve a table.')}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-white hover:text-emerald-400 font-bold text-xs">
                  <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                  <span>Call / WA: <strong class="text-emerald-400 font-extrabold">${s.phone||''}</strong></span>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-display font-bold uppercase tracking-wider mb-6 flex items-center gap-2"><svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg> VIP Guestlist</h4>
          <p class="text-zinc-400 text-xs mb-4 leading-relaxed">Join for DJ lineup updates, table offers & complimentary drinks.</p>
          <form id="subscribe-form" class="flex flex-col gap-2">
            <input type="email" name="email" required placeholder="Enter your email..." class="w-full bg-black border border-red-600/30 rounded-lg px-4 py-2.5 text-white text-xs focus:border-red-500 focus:outline-none">
            <button type="submit" class="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg hover:from-red-500 hover:to-rose-500 shadow-lg border border-red-400/30">Join VIP Guestlist</button>
            <p class="text-[10px] text-zinc-500">Opens WhatsApp to confirm your signup.</p>
          </form>
        </div>
      </div>
      <div class="pt-8 border-t border-red-600/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-zinc-500 text-xs uppercase tracking-wider">© <span id="year">${year}</span> <span id="footer-brand">${s.brandName||'Levernasia'}</span> · Gardens Galleria Noida. All rights reserved.</p>
        <p class="text-zinc-500 text-xs"><a href="admin.html" class="hover:text-red-400">Admin</a></p>
      </div>
    </div>
  </footer>
  <div id="toast" class="fixed bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-lg shadow-lg hidden text-sm font-bold text-white"></div>
  <div id="lightbox" class="fixed inset-0 z-[100] bg-black/95 hidden items-center justify-center p-4 cursor-zoom-out" onclick="this.classList.add('hidden');this.classList.remove('flex')">
    <img id="lightbox-img" src="" class="max-w-full max-h-full object-contain rounded-sm shadow-2xl">
  </div>
  <div id="video-modal" class="fixed inset-0 z-[100] bg-black/95 hidden items-center justify-center p-4 md:p-8">
    <button onclick="if(window.closeVideo){closeVideo();}" class="absolute top-6 right-6 text-white/50 hover:text-white text-sm z-10">✕ Close</button>
    <div class="w-full max-w-5xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl relative">
      <iframe id="video-frame" src="" class="absolute inset-0 w-full h-full border-0" allow="autoplay" allowfullscreen></iframe>
    </div>
  </div>`;

  const headerSlot = document.getElementById('site-header-slot');
  const footerSlot = document.getElementById('site-footer-slot');
  if (headerSlot) headerSlot.outerHTML = headerHTML;
  if (footerSlot) footerSlot.outerHTML = footerHTML;
}

/* Shared setup that runs on every page after injectLayout */
function setupShared() {
  // Draft banner
  if (hasLocalDraft()) {
    const b = document.getElementById('draft-banner');
    if (b) b.classList.remove('hidden');
  }
  const exit = document.getElementById('draft-exit');
  if (exit) exit.addEventListener('click', () => {
    if (confirm('Exit preview and discard local edits?')) {
      clearLocalDraft();
      location.reload();
    }
  });

  // Nav scroll effect
  const top = document.getElementById('top-bar');
  const nav = document.getElementById('main-nav');
  if (top && nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) { top.classList.add('hidden'); nav.classList.add('py-2.5'); nav.classList.remove('py-3.5'); }
      else { top.classList.remove('hidden'); nav.classList.remove('py-2.5'); nav.classList.add('py-3.5'); }
    });
  }
  // Mobile menu toggle
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      if (iconMenu) iconMenu.classList.toggle('hidden');
      if (iconClose) iconClose.classList.toggle('hidden');
    });
  }
  $$('.mobile-close').forEach(a => a.addEventListener('click', () => {
    if (menu) menu.classList.add('hidden');
    if (iconMenu) iconMenu.classList.remove('hidden');
    if (iconClose) iconClose.classList.add('hidden');
  }));

  // Subscribe form
  const sub = document.getElementById('subscribe-form');
  if (sub) {
    sub.addEventListener('submit', e => {
      e.preventDefault();
      const email = new FormData(e.target).get('email');
      const DATA = getSiteData();
      const wa = (DATA.site && DATA.site.whatsapp) || '';
      const msg = `Hello Levernasia! I joined the VIP Guestlist with email: ${email}. Please send me exclusive table offers and DJ lineup updates!`;
      window.open(waLink(wa, msg), '_blank');
      toast('Opening WhatsApp to confirm your VIP signup...');
      e.target.reset();
    });
  }

  // Inactivity modal (optional – only exists on pages that include it)
  const m = document.getElementById('inactivity-modal');
  if (m) {
    let t;
    const show = () => { m.classList.remove('hidden'); m.classList.add('flex'); };
    const reset = () => { clearTimeout(t); if (m.classList.contains('hidden')) t = setTimeout(show, 90000); };
    ['mousemove','keydown','scroll','touchstart','click'].forEach(e => window.addEventListener(e, reset));
    reset();
  }
}
