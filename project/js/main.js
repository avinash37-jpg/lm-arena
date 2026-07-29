/* Public website renderer */
let DATA;
function closeVideo(){
  const m = document.getElementById('video-modal');
  m.classList.add('hidden'); m.classList.remove('flex');
  document.getElementById('video-frame').src='';
}

function renderAll() {
  DATA = getSiteData();
  renderSiteInfo();
  renderHero();
  renderAbout();
  renderGallery();
  renderFoodCarousel();
  renderDrinkCarousel();
  renderMenu();
  renderDrinks();
  renderEvents();
  renderReviews();
  renderVideos();
  renderInstagram();

  // draft banner
  if (hasLocalDraft() && !window.location.pathname.endsWith('admin.html')) {
    document.getElementById('draft-banner').classList.remove('hidden');
  }
}

function renderSiteInfo() {
  const s = DATA.site || {};
  document.title = (s.brandName||'Levernasia') + ' — Bar, Restaurant & Club | Noida';
  $('#topbar-address').textContent = s.address || '';
  const tel = 'tel:' + (s.phone||'').replace(/\s+/g,'');
  const wa = s.whatsapp || '917428964646';
  ['topbar-phone','mobile-phone-btn','floating-call','contact-phone-link','footer-call'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.href=tel;
  });
  $('#topbar-phone').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" class="inline mr-1"><path d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg> VIP Reservation: ' + (s.phone||'');
  $('#contact-phone-link').textContent = s.phone || '';
  $('#footer-phone').textContent = s.phone || '';
  ['nav-logo','mobile-logo','footer-logo'].forEach(id=>{ const el=document.getElementById(id); if(el) el.src = s.logoUrl; });
  $('#footer-insta').href = s.instagram || '#';
  $('#footer-whatsapp').href = waLink(wa,'Hello! I would like to reserve a table.');
  $('#footer-whatsapp-link').href = waLink(wa,'Hello! I want to reserve a table.');
  $('#contact-address').textContent = s.address || '';
  $('#footer-address-link').textContent = s.address || '';
  $('#footer-address-link').href = 'https://maps.google.com/?q='+encodeURIComponent(s.address||'');
  $('#hours-mon-thu').textContent = s.hoursMonThu || '';
  $('#hours-fri-sat').textContent = s.hoursFriSat || '';
  $('#hours-sun').textContent = s.hoursSun || '';
  $('#contact-hours').textContent = s.hoursMonThu || '';
  $('#gmap-embed').src = s.mapsEmbed || '';
  $('#year').textContent = new Date().getFullYear();
  $('#footer-brand').textContent = s.brandName || '';
}

/* Hero */
let heroIdx=0, heroTimer;
function renderHero(){
  const track=$('#hero-track'); track.innerHTML='';
  (DATA.heroImages||[]).forEach(src=>{
    const d=document.createElement('div');
    d.className='flex-[0_0_100%] min-w-0 relative h-full';
    d.innerHTML=`<img src="${src}" class="w-full h-full object-cover" referrerpolicy="no-referrer"><div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/95"></div>`;
    track.appendChild(d);
  });
  $('#hero-title').innerHTML = `${(DATA.site.tagline||'').split(' Meets ')[0]||'Where Luxury Food'}<br><span class="text-white drop-shadow-2xl">${((DATA.site.tagline||'').split(' Meets ')[1]||'Meets Beats & Vibes')}</span>`;
  $('#hero-subtitle').textContent = DATA.site.subTagline || '';
  const go=i=>{const slides=track.children;heroIdx=(i+slides.length)%slides.length;track.style.transform=`translateX(-${heroIdx*100}%)`;};
  $('#hero-prev').onclick=()=>{go(heroIdx-1);reset();};
  $('#hero-next').onclick=()=>{go(heroIdx+1);reset();};
  const reset=()=>{clearInterval(heroTimer);heroTimer=setInterval(()=>go(heroIdx+1),5000);};
  go(0);reset();
}

/* About */
function renderAbout(){
  const a = DATA.about||{};
  $('#about-headline').innerHTML = `${a.headline||'A Complete Luxury'}<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">${a.headlineHighlight||'Nightlife Experience'}</span>`;
  $('#about-p1').textContent=a.paragraph1||'';
  $('#about-p2').textContent=a.paragraph2||'';
  $('#about-image').src=DATA.aboutImage||'';
  const iconMap = {
    Utensils: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,
    GlassWater: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.2 22H8.8a2 2 0 0 1-2-1.79L5 3h14l-1.81 17.21A2 2 0 0 1 15.2 22Z"/><path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0"/></svg>`,
    Music: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    Sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`
  };
  const g=$('#features-grid');g.innerHTML='';
  (DATA.features||[]).forEach(f=>{
    const d=document.createElement('div');
    d.className='feature-card';
    d.innerHTML=`<div class="feature-icon text-white">${iconMap[f.icon]||iconMap.Sparkles}</div><h3 class="feature-title">${f.title}</h3><p class="feature-desc">${f.desc}</p>`;
    g.appendChild(d);
  });
}

/* Gallery */
let galCat;
function renderGallery(){
  const cats=Object.keys(DATA.gallery||{});
  if(!galCat||!DATA.gallery[galCat]) galCat=cats[0];
  const tabs=$('#gallery-tabs');tabs.innerHTML='';
  cats.forEach(c=>{
    const b=document.createElement('button');
    b.className='gallery-tab '+(c===galCat?'active':'inactive');
    b.textContent=c;
    b.onclick=()=>{galCat=c;renderGallery();};
    tabs.appendChild(b);
  });
  const g=$('#gallery-grid');g.innerHTML='';
  (DATA.gallery[galCat]||[]).forEach(src=>{
    const d=document.createElement('div');
    d.className='gallery-item';
    d.innerHTML=`<img src="${src}" loading="lazy" referrerpolicy="no-referrer">`;
    d.onclick=()=>{$('#lightbox-img').src=src;const lb=$('#lightbox');lb.classList.remove('hidden');lb.classList.add('flex');};
    g.appendChild(d);
  });
}

/* Carousels */
function setupLinearCarousel(vpId,trId,prevId,nextId,autoMs){
  const vp=document.getElementById(vpId),tr=document.getElementById(trId);
  let pos=0;
  const update=()=>{
    const slides=tr.children; if(!slides.length) return;
    const sw=slides[0].getBoundingClientRect().width;
    const gap=16;
    const visible=Math.max(1,Math.floor(vp.offsetWidth/(sw+gap)));
    const max=Math.max(0,slides.length-visible);
    pos=Math.min(Math.max(pos,0),max);
    tr.style.transform=`translateX(-${pos*(sw+gap)}px)`;
  };
  document.getElementById(prevId).onclick=()=>{pos--;update();};
  document.getElementById(nextId).onclick=()=>{pos++;update();};
  window.addEventListener('resize',update);
  setTimeout(update,200);
  if(autoMs) setInterval(()=>{
    const slides=tr.children;if(!slides.length) return;
    const sw=slides[0].getBoundingClientRect().width,gap=16;
    const visible=Math.max(1,Math.floor(vp.offsetWidth/(sw+gap)));
    const max=Math.max(0,slides.length-visible);
    pos=pos>=max?0:pos+1;update();
  },autoMs);
}
function renderFoodCarousel(){
  const t=$('#food-track');t.innerHTML='';
  (DATA.foodCarousel||[]).forEach(src=>{
    const d=document.createElement('div');d.className='food-slide';
    d.innerHTML=`<div class="food-slide-inner"><img src="${src}" loading="lazy" referrerpolicy="no-referrer"></div>`;
    t.appendChild(d);
  });
  setupLinearCarousel('food-viewport','food-track','food-prev','food-next');
}
function renderDrinkCarousel(){
  const t=$('#drink-track');t.innerHTML='';
  (DATA.drinkImages||[]).forEach(src=>{
    const d=document.createElement('div');d.className='drink-slide';
    d.innerHTML=`<div class="drink-slide-inner"><img src="${src}" loading="lazy" referrerpolicy="no-referrer"></div>`;
    t.appendChild(d);
  });
  setupLinearCarousel('drink-viewport','drink-track','drink-prev','drink-next',4000);
}

/* Menu */
let menuCat, menuFilter='All';
function renderMenu(){
  const cats=Object.keys(DATA.menu||{});
  if(!menuCat||!DATA.menu[menuCat]) menuCat=cats[0];
  const t=$('#menu-cats');t.innerHTML='';
  cats.forEach(c=>{
    const b=document.createElement('button');
    b.className='menu-cat-btn '+(c===menuCat?'active':'inactive');
    b.textContent=c;b.onclick=()=>{menuCat=c;renderMenu();};
    t.appendChild(b);
  });
  $$('.menu-filter').forEach(b=>{
    b.classList.toggle('bg-red-600',b.dataset.filter===menuFilter);
    b.classList.toggle('text-white',b.dataset.filter===menuFilter);
    b.classList.toggle('text-zinc-400',b.dataset.filter!==menuFilter);
    b.onclick=()=>{menuFilter=b.dataset.filter;renderMenu();};
  });
  const items=(DATA.menu[menuCat]||[]).filter(it=>{
    if(menuFilter==='All') return true;
    if(menuFilter==='Veg') return it.isVeg===true;
    if(menuFilter==='Non-Veg') return it.isVeg===false;
  });
  const g=$('#menu-items');g.innerHTML='';
  if(!items.length){g.innerHTML='<div class="col-span-2 text-zinc-500 text-center py-10 italic">No items.</div>';return;}
  items.forEach(it=>{
    const d=document.createElement('div');d.className='menu-row';
    d.innerHTML=`<div class="pr-4"><h4 class="menu-name">${it.name}${it.isVeg===true?'<span class="dot-veg"></span>':''}${it.isVeg===false?'<span class="dot-nv"></span>':''}${it.badge?`<span class="badge-signature">${it.badge}</span>`:''}</h4><p class="menu-desc">${it.desc||''}</p></div><div class="menu-price">${it.price}</div>`;
    g.appendChild(d);
  });
}

/* Drinks */
let drinkCat;
function renderDrinks(){
  const cats=Object.keys(DATA.drinks||{});
  if(!drinkCat||!DATA.drinks[drinkCat]) drinkCat=cats[0];
  const t=$('#drinks-cats');t.innerHTML='';
  cats.forEach(c=>{
    const b=document.createElement('button');
    b.className='menu-cat-btn '+(c===drinkCat?'active':'inactive');
    b.textContent=c;b.onclick=()=>{drinkCat=c;renderDrinks();};
    t.appendChild(b);
  });
  const g=$('#drinks-items');g.innerHTML='';
  (DATA.drinks[drinkCat]||[]).forEach(it=>{
    const d=document.createElement('div');d.className='menu-row';
    d.innerHTML=`<div class="pr-4"><h4 class="menu-name">${it.name}${it.badge?`<span class="badge-signature">${it.badge}</span>`:''}</h4><p class="menu-desc">${it.notes||''}</p></div><div class="menu-price">${it.price}</div>`;
    g.appendChild(d);
  });
}

/* Events */
function renderEvents(){
  const g=$('#events-grid');g.innerHTML='';
  (DATA.events||[]).forEach(ev=>{
    const d=document.createElement('div');d.className='event-card';
    const calSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>';
    const clockSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
    const musicSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
    d.innerHTML=`<div class="event-img"><img src="${ev.image}" referrerpolicy="no-referrer"><div class="event-meta"><span>${calSvg} ${ev.date}</span><span>${clockSvg} ${ev.time}</span></div></div><div class="event-body"><h4 class="event-title">${musicSvg} ${ev.title}</h4><p class="event-desc">${ev.desc}</p><div class="event-cta"><a href="#reservation">RSVP Now →</a></div></div>`;
    g.appendChild(d);
  });
}

/* Reviews */
function renderReviews(){
  const g=$('#reviews-grid');g.innerHTML='';
  const revs=(DATA.reviews&&DATA.reviews.length)?DATA.reviews:[
    {name:'Guest',rating:5,text:'Amazing experience!',date:'Recently'}
  ];
  revs.slice(0,9).forEach(r=>{
    const d=document.createElement('div');d.className='review-card';
    const stars='★'.repeat(r.rating||5)+'☆'.repeat(5-(r.rating||5));
    d.innerHTML=`<div class="review-stars">${stars}</div><p class="review-text">"${r.text}"</p><div class="review-author"><div class="review-avatar">${(r.name||'G').charAt(0).toUpperCase()}</div><div><div class="review-name">${r.name}</div><div class="review-date">${r.date||''}</div></div></div>`;
    g.appendChild(d);
  });
}

/* Videos */
function renderVideos(){
  const g=$('#videos-grid');g.innerHTML='';
  if(!DATA.videos||!DATA.videos.length){
    g.innerHTML='<div class="col-span-full text-center text-zinc-500 py-12 italic">Videos coming soon — add from admin.</div>';
    return;
  }
  DATA.videos.forEach(v=>{
    const d=document.createElement('div');d.className='video-card';
    d.innerHTML=`<img src="${v.thumb||''}" referrerpolicy="no-referrer"><div class="video-play"><div class="video-play-btn">▶</div></div><div class="video-label">${v.title||'Levernasia Moment'}</div>`;
    d.onclick=()=>{document.getElementById('video-frame').src=v.url;const m=document.getElementById('video-modal');m.classList.remove('hidden');m.classList.add('flex');};
    g.appendChild(d);
  });
}

/* Instagram */
function renderInstagram(){
  const g=$('#insta-grid');g.innerHTML='';
  const posts=(DATA.instagramPosts&&DATA.instagramPosts.levernasia)||[];
  if(!posts.length){g.innerHTML='<div class="col-span-full text-center text-zinc-500 py-12 italic">Add Instagram posts from admin.</div>';return;}
  posts.forEach(p=>{
    const d=document.createElement('div');d.className='insta-card';
    const embedUrl=`https://www.instagram.com/${p.type==='reel'?'reel':'p'}/${p.shortcode}/embed`;
    d.innerHTML=`<div class="insta-header"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span><span class="text-xs font-bold tracking-wider text-zinc-300 uppercase">levernasia_la</span></div><span class="insta-badge">${p.type}</span></div><div class="insta-embed"><iframe src="${embedUrl}" class="w-full h-[440px] border-none" loading="lazy" referrerpolicy="no-referrer"></iframe></div><a href="https://www.instagram.com/${p.type==='reel'?'reel':'p'}/${p.shortcode}/" target="_blank" rel="noopener" class="insta-cta">Instagram &#8599;</a>`;
    g.appendChild(d);
  });
}

/* Forms */
function setupForms(){
  $('#reserve-form').addEventListener('submit',e=>{
    e.preventDefault();
    const fd=new FormData(e.target);
    const o=Object.fromEntries(fd.entries());
    const msg=`Hello Levernasia! I would like to reserve a VIP Table:\n• Name: ${o.name||'N/A'}\n• Phone: ${o.phone||'N/A'}\n• Date: ${o.date||'Upcoming'}\n• Guests: ${o.guests}\n• Requests: ${o.requests||'None'}\n\nPlease confirm table availability.`;
    window.open(waLink(DATA.site.whatsapp,msg),'_blank');
    toast('Opening WhatsApp to confirm your reservation...');
    e.target.reset();
  });
  $('#subscribe-form').addEventListener('submit',e=>{
    e.preventDefault();
    const email=new FormData(e.target).get('email');
    const msg=`Hello Levernasia! I joined the VIP Guestlist with email: ${email}. Please send me exclusive table offers and DJ lineup updates!`;
    window.open(waLink(DATA.site.whatsapp,msg),'_blank');
    toast('Opening WhatsApp to confirm your VIP signup...');
    e.target.reset();
  });
  $('#print-menu-btn').addEventListener('click',printMenu);
}
function printMenu(){
  const w=window.open('','_blank');
  if(!w){alert('Allow popups.');return;}
  let html=`<!doctype html><html><head><title>${DATA.site.brandName} Menu</title><style>body{font-family:Arial;padding:40px;color:#111;background:#fff}h1{color:#dc2626;text-align:center;text-transform:uppercase;letter-spacing:3px}h2{color:#dc2626;border-bottom:2px solid #222;padding-bottom:5px;text-transform:uppercase;margin-top:30px}.item{display:flex;justify-content:space-between;border-bottom:1px dashed #ccc;padding:8px 0}.name{font-weight:bold}.desc{color:#666;font-size:13px}.price{color:#dc2626;font-weight:bold;font-family:monospace}.veg{color:#16a34a;font-size:11px;margin-left:4px}button{background:#dc2626;color:#fff;border:none;padding:10px 20px;border-radius:6px;font-weight:bold;cursor:pointer}</style></head><body><button onclick="window.print()">🖨️ Print / Save PDF</button><h1>${DATA.site.brandName} - Menu</h1><p style="text-align:center;color:#555">${DATA.site.address} • ${DATA.site.phone}</p>`;
  Object.entries(DATA.menu||{}).forEach(([cat,items])=>{
    html+=`<h2>${cat}</h2>`;
    items.forEach(it=>{
      html+=`<div class="item"><div><div class="name">${it.name}${it.isVeg===true?'<span class="veg">[VEG]</span>':''}${it.isVeg===false?'<span class="veg" style="color:#dc2626">[NV]</span>':''}</div><div class="desc">${it.desc||''}</div></div><div class="price">${it.price}</div></div>`;
    });
  });
  html+=`<script>window.onload=()=>setTimeout(()=>window.print(),500)</script></body></html>`;
  w.document.write(html);w.document.close();
}

/* Nav */
function setupNav(){
  const top=$('#top-bar'),nav=$('#main-nav');
  window.addEventListener('scroll',()=>{
    if(window.scrollY>30){top.classList.add('hidden');nav.classList.add('py-2.5');nav.classList.remove('py-3.5');}
    else{top.classList.remove('hidden');nav.classList.remove('py-2.5');nav.classList.add('py-3.5');}
  });
  const btn=$('#mobile-menu-btn'),menu=$('#mobile-menu');
  const iconMenu=$('#icon-menu'), iconClose=$('#icon-close');
  if(btn){
    btn.addEventListener('click',()=>{
      menu.classList.toggle('hidden');
      if(iconMenu) iconMenu.classList.toggle('hidden');
      if(iconClose) iconClose.classList.toggle('hidden');
    });
  }
  $$('.mobile-close').forEach(a=>a.addEventListener('click',()=>{
    menu.classList.add('hidden');
    if(iconMenu) iconMenu.classList.remove('hidden');
    if(iconClose) iconClose.classList.add('hidden');
  }));
}

/* Inactivity modal */
function setupInactivity(){
  let t;const m=$('#inactivity-modal');
  const show=()=>{m.classList.remove('hidden');m.classList.add('flex');};
  const reset=()=>{clearTimeout(t);if(m.classList.contains('hidden'))t=setTimeout(show,60000);};
  ['mousemove','keydown','scroll','touchstart','click'].forEach(e=>window.addEventListener(e,reset));reset();
}

/* Draft preview exit */
function setupDraftExit(){
  const btn = document.getElementById('draft-exit');
  if(btn) btn.addEventListener('click',()=>{
    if(confirm('Exit preview and discard local edits?')){
      clearLocalDraft();
      location.reload();
    }
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  renderAll();
  setupNav();
  setupForms();
  setupInactivity();
  setupDraftExit();
});
