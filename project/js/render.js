/* Shared rendering functions for all pages */

const ICONS = {
  Utensils: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,
  GlassWater: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.2 22H8.8a2 2 0 0 1-2-1.79L5 3h14l-1.81 17.21A2 2 0 0 1 15.2 22Z"/><path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0"/></svg>`,
  Music: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  Sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
  Calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  Clock: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  MapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  Phone: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  QrCode: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>`,
  Download: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`
};

function esc(s){return (s==null?'':String(s)).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

/* ---------- Fill common site info ---------- */
function fillSiteInfo(DATA){
  const s = DATA.site||{};
  document.title = (s.brandName||'Levernasia')+' — Bar, Restaurant & Club | Noida · '+({about:'About',menu:'Menu',events:'Events & Media'}[window.__PAGE__]||'');
  const tel='tel:'+(s.phone||'').replace(/\s+/g,'');
  ['footer-call'].forEach(id=>{const el=document.getElementById(id);if(el)el.href=tel;});
  ['nav-logo','mobile-logo','footer-logo'].forEach(id=>{const el=document.getElementById(id);if(el)el.src=s.logoUrl||'';});
  const fi=document.getElementById('footer-insta');if(fi)fi.href=s.instagram||'#';
  const fw=document.getElementById('footer-whatsapp');if(fw)fw.href=waLink(s.whatsapp||'', 'Hello! I would like to reserve a table.');
  const fa=document.getElementById('footer-address-link');if(fa){fa.textContent=s.address||'';fa.href='https://maps.google.com/?q='+encodeURIComponent(s.address||'');}
  const yr=document.getElementById('year');if(yr)yr.textContent=new Date().getFullYear();
  const fb=document.getElementById('footer-brand');if(fb)fb.textContent=s.brandName||'';
  const ta=document.getElementById('topbar-address');if(ta)ta.textContent=s.address||'';
  const tp=document.getElementById('topbar-phone');
  if(tp){tp.href=tel;tp.innerHTML='<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg> VIP Reservation: '+(s.phone||'');}
}

/* ---------- Hero (full-screen on About page) ---------- */
let heroIdx=0, heroTimer;
function renderHero(DATA){
  const track=$('#hero-track'); if(!track) return;
  track.innerHTML='';
  (DATA.heroImages||[]).forEach(src=>{
    const d=document.createElement('div');
    d.className='flex-[0_0_100%] min-w-0 relative h-full';
    d.innerHTML=`<img src="${src}" class="w-full h-full object-cover" referrerpolicy="no-referrer"><div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/95"></div>`;
    track.appendChild(d);
  });
  const titleEl=$('#hero-title'), subEl=$('#hero-subtitle');
  if(titleEl){
    const parts=(DATA.site.tagline||'Where Luxury Food Meets Beats & Vibes').split(' Meets ');
    titleEl.innerHTML=`${parts[0]||'Where Luxury Food'}<br><span class="text-white drop-shadow-2xl">${'Meets '+(parts[1]||'Beats & Vibes')}</span>`;
  }
  if(subEl) subEl.textContent=DATA.site.subTagline||'';
  const go=i=>{const slides=track.children;heroIdx=(i+slides.length)%slides.length;track.style.transform=`translateX(-${heroIdx*100}%)`;};
  const prev=$('#hero-prev'), next=$('#hero-next');
  const reset=()=>{clearInterval(heroTimer);heroTimer=setInterval(()=>go(heroIdx+1),5000);};
  if(prev)prev.onclick=()=>{go(heroIdx-1);reset();};
  if(next)next.onclick=()=>{go(heroIdx+1);reset();};
  go(0);reset();
}

/* ---------- About section ---------- */
function renderAbout(DATA){
  const a=DATA.about||{};
  const h=$('#about-headline');if(h)h.innerHTML=`${esc(a.headline||'A Complete Luxury')}<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">${esc(a.headlineHighlight||'Nightlife Experience')}</span>`;
  const p1=$('#about-p1');if(p1)p1.textContent=a.paragraph1||'';
  const p2=$('#about-p2');if(p2)p2.textContent=a.paragraph2||'';
  const ai=$('#about-image');if(ai)ai.src=DATA.aboutImage||'';
  const g=$('#features-grid');if(!g)return;
  g.innerHTML='';
  (DATA.features||[]).forEach(f=>{
    const d=document.createElement('div');
    d.className='feature-card';
    d.innerHTML=`<div class="feature-icon text-white">${ICONS[f.icon]||ICONS.Sparkles}</div><h3 class="feature-title">${esc(f.title)}</h3><p class="feature-desc">${esc(f.desc)}</p>`;
    g.appendChild(d);
  });
  const s=DATA.site||{};
  const h1=$('#hours-mon-thu');if(h1)h1.textContent=s.hoursMonThu||'';
  const h2=$('#hours-fri-sat');if(h2)h2.textContent=s.hoursFriSat||'';
  const h3=$('#hours-sun');if(h3)h3.textContent=s.hoursSun||'';
}

/* ---------- Gallery ---------- */
let galCat;
function renderGallery(DATA){
  const tabsEl=$('#gallery-tabs'), gridEl=$('#gallery-grid');
  if(!tabsEl||!gridEl)return;
  const cats=Object.keys(DATA.gallery||{});
  if(!galCat||!DATA.gallery[galCat]) galCat=cats[0];
  tabsEl.innerHTML='';
  cats.forEach(c=>{
    const b=document.createElement('button');
    b.className='gallery-tab '+(c===galCat?'active':'inactive');
    b.textContent=c;
    b.onclick=()=>{galCat=c;renderGallery(DATA);};
    tabsEl.appendChild(b);
  });
  gridEl.innerHTML='';
  (DATA.gallery[galCat]||[]).forEach(src=>{
    const d=document.createElement('div');
    d.className='gallery-item';
    d.innerHTML=`<img src="${src}" loading="lazy" referrerpolicy="no-referrer">`;
    d.onclick=()=>{$('#lightbox-img').src=src;const lb=$('#lightbox');lb.classList.remove('hidden');lb.classList.add('flex');};
    gridEl.appendChild(d);
  });
}

/* ---------- Linear carousel helper ---------- */
function setupLinearCarousel(vpId,trId,prevId,nextId,autoMs){
  const vp=document.getElementById(vpId),tr=document.getElementById(trId);
  if(!vp||!tr)return;
  let pos=0;
  const update=()=>{
    const slides=tr.children;if(!slides.length)return;
    const sw=slides[0].getBoundingClientRect().width;
    const gap=16;
    const visible=Math.max(1,Math.floor(vp.offsetWidth/(sw+gap)));
    const max=Math.max(0,slides.length-visible);
    pos=Math.min(Math.max(pos,0),max);
    tr.style.transform=`translateX(-${pos*(sw+gap)}px)`;
  };
  const p=document.getElementById(prevId),n=document.getElementById(nextId);
  if(p)p.onclick=()=>{pos--;update();};
  if(n)n.onclick=()=>{pos++;update();};
  window.addEventListener('resize',update);
  setTimeout(update,200);
  if(autoMs)setInterval(()=>{
    const slides=tr.children;if(!slides.length)return;
    const sw=slides[0].getBoundingClientRect().width,gap=16;
    const visible=Math.max(1,Math.floor(vp.offsetWidth/(sw+gap)));
    const max=Math.max(0,slides.length-visible);
    pos=pos>=max?0:pos+1;update();
  },autoMs);
}

function renderFoodCarousel(DATA){
  const t=$('#food-track');if(!t)return;
  t.innerHTML='';
  (DATA.foodCarousel||[]).forEach(src=>{
    const d=document.createElement('div');d.className='food-slide';
    d.innerHTML=`<div class="food-slide-inner"><img src="${src}" loading="lazy" referrerpolicy="no-referrer"></div>`;
    t.appendChild(d);
  });
  setupLinearCarousel('food-viewport','food-track','food-prev','food-next');
}
function renderDrinkCarousel(DATA){
  const t=$('#drink-track');if(!t)return;
  t.innerHTML='';
  (DATA.drinkImages||[]).forEach(src=>{
    const d=document.createElement('div');d.className='drink-slide';
    d.innerHTML=`<div class="drink-slide-inner"><img src="${src}" loading="lazy" referrerpolicy="no-referrer"></div>`;
    t.appendChild(d);
  });
  setupLinearCarousel('drink-viewport','drink-track','drink-prev','drink-next',4000);
}

/* ---------- Menu ---------- */
let menuCat, menuFilter='All';
function renderMenu(DATA){
  const catsEl=$('#menu-cats'), itemsEl=$('#menu-items'), filterBar=$$('.menu-filter');
  if(!catsEl||!itemsEl)return;
  const cats=Object.keys(DATA.menu||{});
  if(!menuCat||!DATA.menu[menuCat])menuCat=cats[0];
  catsEl.innerHTML='';
  cats.forEach(c=>{
    const b=document.createElement('button');
    b.className='menu-cat-btn '+(c===menuCat?'active':'inactive');
    b.textContent=c;b.onclick=()=>{menuCat=c;renderMenu(DATA);};
    catsEl.appendChild(b);
  });
  filterBar.forEach(b=>{
    b.classList.toggle('active',b.dataset.filter===menuFilter);
    b.onclick=()=>{menuFilter=b.dataset.filter;renderMenu(DATA);};
  });
  const items=(DATA.menu[menuCat]||[]).filter(it=>{
    if(menuFilter==='All')return true;
    if(menuFilter==='Veg')return it.isVeg===true;
    if(menuFilter==='Non-Veg')return it.isVeg===false;
  });
  itemsEl.innerHTML='';
  if(!items.length){itemsEl.innerHTML='<div class="col-span-2 text-zinc-500 text-center py-10 italic">No items.</div>';return;}
  items.forEach(it=>{
    const d=document.createElement('div');d.className='menu-row';
    d.innerHTML=`<div class="pr-4"><h4 class="menu-name">${esc(it.name)}${it.isVeg===true?'<span class="dot-veg"></span>':''}${it.isVeg===false?'<span class="dot-nv"></span>':''}${it.badge?`<span class="badge-signature">${esc(it.badge)}</span>`:''}</h4><p class="menu-desc">${esc(it.desc||'')}</p></div><div class="menu-price">${esc(it.price)}</div>`;
    itemsEl.appendChild(d);
  });
  const printBtn=$('#print-menu-btn');
  if(printBtn)printBtn.onclick=()=>printMenu(DATA);
}
let drinkCat;
function renderDrinks(DATA){
  const catsEl=$('#drinks-cats'), itemsEl=$('#drinks-items');
  if(!catsEl||!itemsEl)return;
  const cats=Object.keys(DATA.drinks||{});
  if(!drinkCat||!DATA.drinks[drinkCat])drinkCat=cats[0];
  catsEl.innerHTML='';
  cats.forEach(c=>{
    const b=document.createElement('button');
    b.className='menu-cat-btn '+(c===drinkCat?'active':'inactive');
    b.textContent=c;b.onclick=()=>{drinkCat=c;renderDrinks(DATA);};
    catsEl.appendChild(b);
  });
  itemsEl.innerHTML='';
  (DATA.drinks[drinkCat]||[]).forEach(it=>{
    const d=document.createElement('div');d.className='menu-row';
    d.innerHTML=`<div class="pr-4"><h4 class="menu-name">${esc(it.name)}${it.badge?`<span class="badge-signature">${esc(it.badge)}</span>`:''}</h4><p class="menu-desc">${esc(it.notes||'')}</p></div><div class="menu-price">${esc(it.price)}</div>`;
    itemsEl.appendChild(d);
  });
}

/* ---------- Events ---------- */
function renderEvents(DATA){
  const g=$('#events-grid');if(!g)return;
  g.innerHTML='';
  const wa=(DATA.site&&DATA.site.whatsapp)||'';
  (DATA.events||[]).forEach(ev=>{
    const d=document.createElement('div');d.className='event-card';
    d.innerHTML=`<div class="event-img"><img src="${esc(ev.image)}" referrerpolicy="no-referrer"><div class="event-meta"><span>${ICONS.Calendar} ${esc(ev.date)}</span><span>${ICONS.Clock} ${esc(ev.time)}</span></div></div><div class="event-body"><h4 class="event-title">${ICONS.Music} ${esc(ev.title)}</h4><p class="event-desc">${esc(ev.desc)}</p><div class="event-cta"><a href="${waLink(wa,'Hello! I want to RSVP for '+ev.title+' ('+ev.date+').')}" target="_blank" rel="noopener">RSVP Now →</a></div></div>`;
    g.appendChild(d);
  });
}

/* ---------- Reviews ---------- */
function renderReviews(DATA){
  const g=$('#reviews-grid');if(!g)return;
  const revs=(DATA.reviews&&DATA.reviews.length)?DATA.reviews:[{name:'Guest',rating:5,text:'Amazing experience!',date:'Recently'}];
  g.innerHTML='';
  revs.slice(0,9).forEach(r=>{
    const d=document.createElement('div');d.className='review-card';
    const stars='★'.repeat(r.rating||5)+'☆'.repeat(5-(r.rating||5));
    d.innerHTML=`<div class="review-stars">${stars}</div><p class="review-text">"${esc(r.text)}"</p><div class="review-author"><div class="review-avatar">${esc((r.name||'G').charAt(0).toUpperCase())}</div><div><div class="review-name">${esc(r.name)}</div><div class="review-date">${esc(r.date||'')}</div></div></div>`;
    g.appendChild(d);
  });
  // Summary block
  const sum=$('#reviews-summary-avg');if(sum){const avg=(revs.reduce((a,b)=>a+(b.rating||5),0)/revs.length).toFixed(1);sum.textContent=avg;}
  const sumC=$('#reviews-summary-count');if(sumC)sumC.textContent=revs.length+'+'+' Reviews';
}

/* ---------- Videos ---------- */
function renderVideos(DATA){
  const g=$('#videos-grid');if(!g)return;
  g.innerHTML='';
  if(!DATA.videos||!DATA.videos.length){
    g.innerHTML='<div class="col-span-full text-center text-zinc-500 py-12 italic">Videos coming soon — add from admin.</div>';
    return;
  }
  DATA.videos.forEach(v=>{
    const d=document.createElement('div');d.className='video-card';
    const thumb=v.thumb||'';
    d.innerHTML=`<img src="${esc(thumb)}" referrerpolicy="no-referrer"><div class="video-play"><div class="video-play-btn">▶</div></div><div class="video-label">${esc(v.title||'Levernasia Moment')}</div>`;
    d.onclick=()=>{document.getElementById('video-frame').src=v.url;const m=document.getElementById('video-modal');m.classList.remove('hidden');m.classList.add('flex');};
    g.appendChild(d);
  });
}
function closeVideo(){
  const m=document.getElementById('video-modal');
  if(!m)return;
  m.classList.add('hidden');m.classList.remove('flex');
  document.getElementById('video-frame').src='';
}
window.closeVideo=closeVideo;

/* ---------- Instagram ---------- */
function renderInstagram(DATA){
  const g=$('#insta-grid');if(!g)return;
  const posts=(DATA.instagramPosts&&DATA.instagramPosts.levernasia)||[];
  if(!posts.length){g.innerHTML='<div class="col-span-full text-center text-zinc-500 py-12 italic">Add Instagram posts from admin.</div>';return;}
  g.innerHTML='';
  posts.forEach(p=>{
    const d=document.createElement('div');d.className='insta-card';
    const embedUrl=`https://www.instagram.com/${p.type==='reel'?'reel':'p'}/${p.shortcode}/embed`;
    d.innerHTML=`<div class="insta-header"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span><span class="text-xs font-bold tracking-wider text-zinc-300 uppercase">levernasia_la</span></div><span class="insta-badge">${esc(p.type)}</span></div><div class="insta-embed"><iframe src="${embedUrl}" class="w-full h-[440px] border-none" loading="lazy" referrerpolicy="no-referrer"></iframe></div><a href="https://www.instagram.com/${p.type==='reel'?'reel':'p'}/${p.shortcode}/" target="_blank" rel="noopener" class="insta-cta">Instagram &#8599;</a>`;
    g.appendChild(d);
  });
}

/* ---------- QuickPic ---------- */
function renderQuickPic(DATA){
  const wrap=$('#quickpic-root');if(!wrap)return;
  const q=DATA.quickpic||{};
  if(q.enabled===false){wrap.closest('section')&&wrap.closest('section').classList.add('hidden');return;}
  const steps=(q.instructions||[]).map((t,i)=>`<div class="quickpic-step"><div class="qp-num">${i+1}</div><div class="qp-body"><h5>${['Scan QR Code','Open Gallery Link','Download Your Pic','Tag Us'][i]||'Step'}</h5><p>${esc(t)}</p></div></div>`).join('');
  wrap.innerHTML=`
    <div class="quickpic-wrap">
      <div class="order-2 md:order-1">
        <div class="pill">${ICONS.QrCode} QuickPic · Instant Photo Downloads</div>
        <h2 class="text-4xl md:text-5xl font-black text-white uppercase leading-none font-display mt-4">${esc(q.title||'Scan & Download Your Pics')}</h2>
        <p class="text-zinc-400 font-light text-base md:text-lg leading-relaxed mt-5 max-w-xl">${esc(q.subtitle||'Point your camera at the QR code to instantly view and download your photos taken tonight.')}</p>
        <div class="quickpic-steps">${steps}</div>
        <div class="mt-8 flex flex-wrap gap-3">
          <a href="${esc(q.galleryUrl||'#')}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black uppercase tracking-wider text-xs rounded-lg border border-red-400/30 shadow-[0_0_20px_rgba(220,38,38,.4)]">${ICONS.Download} Open Photo Gallery</a>
          <a href="${waLink((DATA.site&&DATA.site.whatsapp)||'','Hi! I need help finding my QuickPic photo from tonight.')}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-red-600/40 text-red-300 font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-red-950/40">Need Help? WhatsApp Us</a>
        </div>
      </div>
      <div class="order-1 md:order-2 flex justify-center">
        <div class="qr-frame">
          <div class="qr-code-img">
            ${q.qrImage?`<img src="${esc(q.qrImage)}" alt="QuickPic QR Code">`:`<div class="text-zinc-400 text-sm text-center p-8">Upload your QuickPic QR code from the Admin Panel.</div>`}
          </div>
          <div class="qr-caption">
            <div class="qr-title">${esc(DATA.site&&DATA.site.brandName||'Levernasia')} QuickPic</div>
            <div class="qr-sub">Scan with any phone camera</div>
          </div>
        </div>
      </div>
    </div>`;
}

/* ---------- Location / Contact ---------- */
function renderLocation(DATA){
  const s=DATA.site||{};
  const ca=document.getElementById('contact-address');if(ca)ca.textContent=s.address||'';
  const cp=document.getElementById('contact-phone-link');if(cp){cp.href='tel:'+(s.phone||'').replace(/\s+/g,'');cp.textContent=s.phone||'';}
  const ch=document.getElementById('contact-hours');if(ch)ch.textContent=s.hoursMonThu||'';
  const mp=document.getElementById('gmap-embed');if(mp)mp.src=s.mapsEmbed||'';
  // Reservation form
  const f=document.getElementById('reserve-form');if(f){
    f.onsubmit=(e)=>{
      e.preventDefault();
      const fd=new FormData(e.target);
      const o=Object.fromEntries(fd.entries());
      const msg=`Hello Levernasia! I would like to reserve a VIP Table:\n• Name: ${o.name||'N/A'}\n• Phone: ${o.phone||'N/A'}\n• Date: ${o.date||'Upcoming'}\n• Guests: ${o.guests}\n• Requests: ${o.requests||'None'}\n\nPlease confirm table availability.`;
      window.open(waLink(s.whatsapp,msg),'_blank');
      toast('Opening WhatsApp to confirm your reservation...');
      e.target.reset();
    };
  }
}

/* ---------- Print Menu ---------- */
function printMenu(DATA){
  const w=window.open('','_blank');
  if(!w){alert('Allow popups.');return;}
  let html=`<!doctype html><html><head><title>${esc(DATA.site.brandName)} Menu</title><style>body{font-family:Arial;padding:40px;color:#111;background:#fff}h1{color:#dc2626;text-align:center;text-transform:uppercase;letter-spacing:3px}h2{color:#dc2626;border-bottom:2px solid #222;padding-bottom:5px;text-transform:uppercase;margin-top:30px}.item{display:flex;justify-content:space-between;border-bottom:1px dashed #ccc;padding:8px 0}.name{font-weight:bold}.desc{color:#666;font-size:13px}.price{color:#dc2626;font-weight:bold;font-family:monospace}.veg{color:#16a34a;font-size:11px;margin-left:4px}button{background:#dc2626;color:#fff;border:none;padding:10px 20px;border-radius:6px;font-weight:bold;cursor:pointer}</style></head><body><button onclick="window.print()">Print / Save PDF</button><h1>${esc(DATA.site.brandName)} - Menu</h1><p style="text-align:center;color:#555">${esc(DATA.site.address)} • ${esc(DATA.site.phone)}</p>`;
  Object.entries(DATA.menu||{}).forEach(([cat,items])=>{
    html+=`<h2>${esc(cat)}</h2>`;
    items.forEach(it=>{
      html+=`<div class="item"><div><div class="name">${esc(it.name)}${it.isVeg===true?'<span class="veg">[VEG]</span>':''}${it.isVeg===false?'<span class="veg" style="color:#dc2626">[NV]</span>':''}</div><div class="desc">${esc(it.desc||'')}</div></div><div class="price">${esc(it.price)}</div></div>`;
    });
  });
  html+=`<h2>Drinks</h2>`;
  Object.entries(DATA.drinks||{}).forEach(([cat,items])=>{
    html+=`<h2 style="font-size:16px">${esc(cat)}</h2>`;
    items.forEach(it=>{
      html+=`<div class="item"><div><div class="name">${esc(it.name)}</div><div class="desc">${esc(it.notes||'')}</div></div><div class="price">${esc(it.price)}</div></div>`;
    });
  });
  html+=`<script>window.onload=()=>setTimeout(()=>window.print(),500)</script></body></html>`;
  w.document.write(html);w.document.close();
}

/* ---------- Common: wire up global lightbox/modal close ---------- */
function setupModals(){
  const inact=document.getElementById('inactivity-modal');
  if(inact){
    let t;const show=()=>{inact.classList.remove('hidden');inact.classList.add('flex');};
    const reset=()=>{clearTimeout(t);if(inact.classList.contains('hidden'))t=setTimeout(show,90000);};
    ['mousemove','keydown','scroll','touchstart','click'].forEach(e=>window.addEventListener(e,reset));reset();
  }
}
