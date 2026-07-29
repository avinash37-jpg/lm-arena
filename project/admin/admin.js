/* Levernasia Static Admin Panel — pure client-side */

const STORAGE_KEY = 'levernasia_data';
const AUTH_KEY = 'levernasia_auth';
let DATA = null;
let currentTab = 'dashboard';
let currentGalleryCat;
let currentMenuCat;
let currentDrinksCat;

const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];

/* ---------- Init & Auth ---------- */
document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem(AUTH_KEY) === '1') {
    showDashboard();
  } else {
    showLogin();
  }

  $('#login-form').addEventListener('submit', async e => {
    e.preventDefault();
    const pw = new FormData(e.target).get('password');
    const d = getData();
    try {
      const hash = await sha256(pw);
      if (hash === d.site.adminPasswordHash) {
        sessionStorage.setItem(AUTH_KEY,'1');
        showDashboard();
      } else {
        const err=$('#login-error');
        err.textContent='ERROR: Incorrect password.'; err.classList.remove('hidden');
      }
    } catch(err){
      console.error('Hash error', err);
      const er=$('#login-error');
      er.textContent='Login error: '+err.message; er.classList.remove('hidden');
    }
  });
  $('#logout-btn').addEventListener('click', () => {
    sessionStorage.removeItem(AUTH_KEY);
    showLogin();
  });

  $$('#admin-nav .nav-btn').forEach(b => b.addEventListener('click', ()=> switchTab(b.dataset.tab)));
  $$('.quick-btn').forEach(b => b.addEventListener('click', ()=> switchTab(b.dataset.go)));

  $('#preview-btn').addEventListener('click',()=>{ window.open('index.html','_blank'); });
  $('#view-draft').addEventListener('click',()=>{ window.open('index.html','_blank'); });
  $('#reset-btn').addEventListener('click',()=>{
    if(confirm('Clear all local edits and revert to the published version?')){
      clearLocalDraft(); DATA = getData(); location.reload();
    }
  });
  $('#export-btn').addEventListener('click', exportData);
  $('#clear-draft-btn').addEventListener('click',()=>{
    clearLocalDraft();
    toast('OK: Local draft cleared. Refresh to see published site.','ok');
  });

  setupForms();
});

function showLogin(){ $('#login-screen').classList.remove('hidden'); $('#dashboard').classList.add('hidden'); }
function showDashboard(){
  $('#login-screen').classList.add('hidden'); $('#dashboard').classList.remove('hidden');
  DATA = getData();
  if (hasLocalDraft()) $('#draft-info').classList.remove('hidden');
  else $('#draft-info').classList.add('hidden');
  switchTab('dashboard');
  fillSiteForm(); fillAboutForm(); fillQuickPicForm();
  renderHeroAdmin(); renderGalleryAdmin(); renderMenuAdmin(); renderDrinksAdmin();
  renderEventsAdmin(); renderVideosAdmin(); renderReviewsAdmin(); renderInstaAdmin();
  $('#save-status').textContent = hasLocalDraft() ? '● Unsaved draft' : '● All changes saved locally';
}

function switchTab(tab){
  currentTab = tab;
  $$('#admin-nav .nav-btn').forEach(x=>x.classList.toggle('active', x.dataset.tab===tab));
  $$('.tab-panel').forEach(p=>p.classList.add('hidden'));
  const panel = $('#tab-'+tab); if(panel) panel.classList.remove('hidden');
  const titles={dashboard:'Dashboard',site:'Site Settings',hero:'Hero Slider',about:'About Section',gallery:'Gallery Manager',menu:'Food Menu',drinks:'Drinks Menu',events:'Events',videos:'Video Gallery',reviews:'Customer Reviews',instagram:'Instagram Posts',quickpic:'QuickPic QR Code',password:'Change Password',publish:'Publish / Export'};
  $('#page-title').textContent=titles[tab]||'Dashboard';
  if(tab==='dashboard') renderDashboard();
}

function toast(msg,type='ok'){
  const t=$('#toast');
  t.textContent=msg;
  t.className='';
  t.classList.add(type);
  clearTimeout(t._t);
  t._t=setTimeout(()=>t.classList.add('hidden'),2500);
}
function persist(){
  saveLocalDraft(DATA);
  $('#draft-info').classList.remove('hidden');
  $('#save-status').textContent = '● Draft saved at '+new Date().toLocaleTimeString();
}
function getData(){ return getSiteData(); }

/* ---------- Dashboard ---------- */
function renderDashboard(){
  const stats=[
    {n:Object.values(DATA.menu||{}).reduce((a,c)=>a+c.length,0),l:'Menu Items'},
    {n:(DATA.events||[]).length,l:'Events'},
    {n:(DATA.gallery?Object.values(DATA.gallery).reduce((a,c)=>a+c.length,0):0),l:'Gallery Images'},
    {n:(DATA.reviews||[]).length,l:'Reviews'}
  ];
  $('#stats-grid').innerHTML=stats.map(s=>`<div class="stat-card"><div class="stat-number">${s.n}</div><div class="stat-label">${s.l}</div></div>`).join('');
}

/* ---------- Site Settings ---------- */
function fillSiteForm(){
  const s=DATA.site||{};
  $('#f-brand').value=s.brandName||'';
  $('#f-tagline').value=s.tagline||'';
  $('#f-sub').value=s.subTagline||'';
  $('#f-phone').value=s.phone||'';
  $('#f-wa').value=s.whatsapp||'';
  $('#f-email').value=s.email||'';
  $('#f-addr').value=s.address||'';
  $('#f-h1').value=s.hoursMonThu||'';
  $('#f-h2').value=s.hoursFriSat||'';
  $('#f-h3').value=s.hoursSun||'';
  $('#f-logo').value=s.logoUrl||'';
  $('#f-insta').value=s.instagram||'';
  $('#f-instadj').value=s.instagramDj||'';
  $('#f-maps').value=s.mapsEmbed||'';
}
$('#save-site').addEventListener('click',()=>{
  DATA.site={...DATA.site,
    brandName:$('#f-brand').value,tagline:$('#f-tagline').value,subTagline:$('#f-sub').value,
    phone:$('#f-phone').value,whatsapp:$('#f-wa').value,email:$('#f-email').value,
    address:$('#f-addr').value,hoursMonThu:$('#f-h1').value,hoursFriSat:$('#f-h2').value,hoursSun:$('#f-h3').value,
    logoUrl:$('#f-logo').value,instagram:$('#f-insta').value,instagramDj:$('#f-instadj').value,mapsEmbed:$('#f-maps').value
  };
  persist(); toast('OK: Site settings saved');
});

/* ---------- Hero ---------- */
function renderHeroAdmin(){
  const list=$('#hero-list');list.innerHTML='';
  (DATA.heroImages||[]).forEach((src,i)=>{
    const d=document.createElement('div');d.className='thumb-card';
    d.innerHTML=`<img src="${src}"><button class="thumb-del" data-i="${i}">✕</button>`;
    list.appendChild(d);
  });
  $$('#hero-list .thumb-del').forEach(b=>b.onclick=()=>{DATA.heroImages.splice(+b.dataset.i,1);persist();renderHeroAdmin();});
}
$('#hero-add-url').addEventListener('click',()=>{
  const v=$('#hero-url-input').value.trim();if(!v)return;
  DATA.heroImages=DATA.heroImages||[];DATA.heroImages.push(v);persist();
  $('#hero-url-input').value='';renderHeroAdmin();toast('Added');
});
$('#hero-upload').addEventListener('change',e=>handleImageUpload(e.target.files[0],dataUrl=>{
  DATA.heroImages.push(dataUrl);persist();renderHeroAdmin();toast('Uploaded');
}));

/* ---------- About ---------- */
function fillAboutForm(){
  const a=DATA.about||{};
  $('#a-h1').value=a.headline||''; $('#a-h2').value=a.headlineHighlight||'';
  $('#a-p1').value=a.paragraph1||''; $('#a-p2').value=a.paragraph2||'';
  $('#a-img').value=DATA.aboutImage||'';
  renderFeatures();
}
function renderFeatures(){
  const list=$('#features-list');list.innerHTML='';
  (DATA.features||[]).forEach((f,i)=>{
    const d=document.createElement('div');
    d.className='grid grid-cols-1 md:grid-cols-4 gap-2 bg-zinc-900 p-3 rounded-lg border border-zinc-800';
    d.innerHTML=`
      <input class="admin-input md:col-span-1" data-f="title" placeholder="Title" value="${esc(f.title||'')}">
      <input class="admin-input md:col-span-2" data-f="desc" placeholder="Description" value="${esc(f.desc||'')}">
      <button class="admin-btn-danger" data-i="${i}">Delete</button>`;
    list.appendChild(d);
    d.querySelector('.admin-btn-danger').onclick=()=>{DATA.features.splice(i,1);renderFeatures();persist();};
    d.querySelectorAll('input').forEach(inp=>inp.addEventListener('input',()=>{DATA.features[i][inp.dataset.f]=inp.value;}));
  });
}
$('#add-feature').addEventListener('click',()=>{DATA.features=DATA.features||[];DATA.features.push({icon:'Sparkles',title:'New Feature',desc:'Describe here.'});renderFeatures();persist();});
$('#a-img-upload').addEventListener('change',e=>handleImageUpload(e.target.files[0],dataUrl=>{
  DATA.aboutImage=dataUrl;$('#a-img').value=dataUrl;persist();toast('Uploaded');
}));
$('#save-about').addEventListener('click',()=>{
  DATA.about={headline:$('#a-h1').value,headlineHighlight:$('#a-h2').value,paragraph1:$('#a-p1').value,paragraph2:$('#a-p2').value};
  DATA.aboutImage=$('#a-img').value;
  persist();toast('OK: About saved');
});

/* ---------- QuickPic ---------- */
function fillQuickPicForm(){
  const q=DATA.quickpic||{};
  $('#qp-enabled').checked = q.enabled !== false;
  $('#qp-title').value = q.title||'Scan & Download Your Pics';
  $('#qp-sub').value = q.subtitle||'Point your camera at the QR code to instantly view and download your photos taken tonight.';
  $('#qp-img-url').value = q.qrImage||'';
  $('#qp-url').value = q.galleryUrl||'';
  $('#qp-instructions').value = (q.instructions||[]).join('\n');
  const pv=$('#qp-preview'); if(pv){pv.src=q.qrImage||'';}
}
$('#qp-save').addEventListener('click',()=>{
  DATA.quickpic={
    enabled: $('#qp-enabled').checked,
    title: $('#qp-title').value,
    subtitle: $('#qp-sub').value,
    qrImage: $('#qp-img-url').value,
    galleryUrl: $('#qp-url').value,
    instructions: $('#qp-instructions').value.split('\n').map(s=>s.trim()).filter(Boolean)
  };
  persist();
  const pv=$('#qp-preview'); if(pv)pv.src=DATA.quickpic.qrImage||'';
  toast('OK: QuickPic settings saved');
});
$('#qp-upload').addEventListener('change',e=>handleImageUpload(e.target.files[0],dataUrl=>{
  DATA.quickpic=DATA.quickpic||{};
  DATA.quickpic.qrImage=dataUrl;
  $('#qp-img-url').value=dataUrl;
  const pv=$('#qp-preview'); if(pv)pv.src=dataUrl;
  persist();
  toast('QR image uploaded');
}));
$('#qp-img-url').addEventListener('input',e=>{
  const pv=$('#qp-preview'); if(pv)pv.src=e.target.value;
});

/* ---------- Gallery ---------- */
function renderGalleryAdmin(){
  const cats=Object.keys(DATA.gallery||{});
  if(!currentGalleryCat||!DATA.gallery[currentGalleryCat]) currentGalleryCat=cats[0];
  const tabs=$('#gallery-cat-tabs');tabs.innerHTML='';
  cats.forEach(cat=>{
    const b=document.createElement('button');b.className='cat-tab '+(cat===currentGalleryCat?'active':'');
    b.textContent=cat;b.onclick=()=>{currentGalleryCat=cat;renderGalleryAdmin();};
    tabs.appendChild(b);
  });
  const list=$('#gallery-list');list.innerHTML='';
  (DATA.gallery[currentGalleryCat]||[]).forEach((src,i)=>{
    const d=document.createElement('div');d.className='thumb-card';
    d.innerHTML=`<img src="${src}"><button class="thumb-del" data-i="${i}">✕</button>`;
    list.appendChild(d);
  });
  $$('#gallery-list .thumb-del').forEach(b=>b.onclick=()=>{DATA.gallery[currentGalleryCat].splice(+b.dataset.i,1);persist();renderGalleryAdmin();});
}
$('#gallery-add-url').addEventListener('click',()=>{
  const v=$('#gallery-url-input').value.trim();if(!v)return;
  DATA.gallery[currentGalleryCat]=DATA.gallery[currentGalleryCat]||[];DATA.gallery[currentGalleryCat].push(v);persist();
  $('#gallery-url-input').value='';renderGalleryAdmin();toast('Added');
});
$('#gallery-upload').addEventListener('change',e=>handleImageUpload(e.target.files[0],dataUrl=>{
  DATA.gallery[currentGalleryCat].push(dataUrl);persist();renderGalleryAdmin();toast('Uploaded');
}));
$('#add-gallery-cat').addEventListener('click',()=>{
  const name=prompt('New category name:');if(!name)return;
  DATA.gallery[name]=[];currentGalleryCat=name;persist();renderGalleryAdmin();toast('Added');
});
$('#del-gallery-cat').addEventListener('click',()=>{
  if(!currentGalleryCat)return;
  if(confirm('Delete category '+currentGalleryCat+'?')){
    delete DATA.gallery[currentGalleryCat];
    currentGalleryCat=Object.keys(DATA.gallery)[0];persist();renderGalleryAdmin();
  }
});

/* ---------- Food Menu ---------- */
function renderMenuAdmin(){
  const cats=Object.keys(DATA.menu||{});
  if(!currentMenuCat||!DATA.menu[currentMenuCat]) currentMenuCat=cats[0];
  const tabs=$('#menu-cat-tabs');tabs.innerHTML='';
  cats.forEach(cat=>{
    const b=document.createElement('button');b.className='cat-tab '+(cat===currentMenuCat?'active':'');
    b.textContent=cat;b.onclick=()=>{currentMenuCat=cat;renderMenuAdmin();};
    tabs.appendChild(b);
  });
  const list=$('#menu-items-list');list.innerHTML='';
  (DATA.menu[currentMenuCat]||[]).forEach((it,i)=>{
    const d=document.createElement('div');d.className='item-row';
    d.innerHTML=`
      <div class="item-fields">
        <input data-f="name" value="${esc(it.name)}" placeholder="Item name">
        <input data-f="desc" value="${esc(it.desc)}" placeholder="Description">
        <input data-f="price" value="${esc(it.price)}" placeholder="₹" style="max-width:110px">
        <select data-f="isVeg">
          <option value="" ${it.isVeg===undefined?'selected':''}>—</option>
          <option value="1" ${it.isVeg===true?'selected':''}>Veg</option>
          <option value="0" ${it.isVeg===false?'selected':''}>Non-Veg</option>
        </select>
      </div>
      <div class="row-actions"><button class="admin-btn-danger" data-i="${i}">Delete</button></div>`;
    list.appendChild(d);
    d.querySelector('.admin-btn-danger').onclick=()=>{DATA.menu[currentMenuCat].splice(i,1);persist();renderMenuAdmin();};
    d.querySelectorAll('input,select').forEach(el=>el.addEventListener('change',()=>{
      const k=el.dataset.f;let v=el.value;
      if(k==='isVeg') v=v===''?undefined:v==='1';
      DATA.menu[currentMenuCat][i][k]=v;persist();
    }));
  });
  const fl=$('#food-images-list');fl.innerHTML='';
  (DATA.foodCarousel||[]).forEach((src,i)=>{
    const d=document.createElement('div');d.className='thumb-card';
    d.innerHTML=`<img src="${src}"><button class="thumb-del" data-i="${i}">✕</button>`;
    fl.appendChild(d);
  });
  $$('#food-images-list .thumb-del').forEach(b=>b.onclick=()=>{DATA.foodCarousel.splice(+b.dataset.i,1);persist();renderMenuAdmin();});
}
$('#add-menu-cat').addEventListener('click',()=>{
  const n=$('#new-cat-name').value.trim();if(!n)return;
  DATA.menu=DATA.menu||{};DATA.menu[n]=[];currentMenuCat=n;persist();$('#new-cat-name').value='';renderMenuAdmin();
});
$('#add-menu-item').addEventListener('click',()=>{
  if(!currentMenuCat){toast('Add a category first','err');return;}
  DATA.menu[currentMenuCat].push({name:'New Item',desc:'Describe dish',price:'₹0',isVeg:true});persist();renderMenuAdmin();
});
$('#add-food-img').addEventListener('click',()=>{
  const v=$('#food-img-url').value.trim();if(!v)return;
  DATA.foodCarousel.push(v);persist();$('#food-img-url').value='';renderMenuAdmin();
});
$('#food-upload').addEventListener('change',e=>handleImageUpload(e.target.files[0],url=>{DATA.foodCarousel.push(url);persist();renderMenuAdmin();toast('Uploaded');}));

/* ---------- Drinks ---------- */
function renderDrinksAdmin(){
  const cats=Object.keys(DATA.drinks||{});
  if(!currentDrinksCat||!DATA.drinks[currentDrinksCat]) currentDrinksCat=cats[0];
  const tabs=$('#drinks-cat-tabs');tabs.innerHTML='';
  cats.forEach(cat=>{
    const b=document.createElement('button');b.className='cat-tab '+(cat===currentDrinksCat?'active':'');
    b.textContent=cat;b.onclick=()=>{currentDrinksCat=cat;renderDrinksAdmin();};
    tabs.appendChild(b);
  });
  const list=$('#drinks-items-list');list.innerHTML='';
  (DATA.drinks[currentDrinksCat]||[]).forEach((it,i)=>{
    const d=document.createElement('div');d.className='item-row';
    d.innerHTML=`
      <div class="item-fields">
        <input data-f="name" value="${esc(it.name)}" placeholder="Drink name">
        <input data-f="notes" value="${esc(it.notes)}" placeholder="Tasting notes">
        <input data-f="price" value="${esc(it.price)}" placeholder="₹" style="max-width:130px">
        <input data-f="badge" value="${esc(it.badge||'')}" placeholder="Badge" style="max-width:110px">
      </div>
      <div class="row-actions"><button class="admin-btn-danger" data-i="${i}">Delete</button></div>`;
    list.appendChild(d);
    d.querySelector('.admin-btn-danger').onclick=()=>{DATA.drinks[currentDrinksCat].splice(i,1);persist();renderDrinksAdmin();};
    d.querySelectorAll('input').forEach(el=>el.addEventListener('change',()=>{
      DATA.drinks[currentDrinksCat][i][el.dataset.f]=el.value;persist();
    }));
  });
  const dil=$('#drink-images-list');dil.innerHTML='';
  (DATA.drinkImages||[]).forEach((src,i)=>{
    const d=document.createElement('div');d.className='thumb-card';
    d.innerHTML=`<img src="${src}"><button class="thumb-del" data-i="${i}">✕</button>`;dil.appendChild(d);
  });
  $$('#drink-images-list .thumb-del').forEach(b=>b.onclick=()=>{DATA.drinkImages.splice(+b.dataset.i,1);persist();renderDrinksAdmin();});
}
$('#add-drinks-cat').addEventListener('click',()=>{
  const n=$('#new-dcat-name').value.trim();if(!n)return;
  DATA.drinks=DATA.drinks||{};DATA.drinks[n]=[];currentDrinksCat=n;persist();$('#new-dcat-name').value='';renderDrinksAdmin();
});
$('#add-drinks-item').addEventListener('click',()=>{
  if(!currentDrinksCat){toast('Add a category first','err');return;}
  DATA.drinks[currentDrinksCat].push({name:'New Drink',notes:'Notes',price:'₹0',badge:''});persist();renderDrinksAdmin();
});
$('#add-drink-img').addEventListener('click',()=>{
  const v=$('#drink-img-url').value.trim();if(!v)return;
  DATA.drinkImages.push(v);persist();$('#drink-img-url').value='';renderDrinksAdmin();
});
$('#drink-upload').addEventListener('change',e=>handleImageUpload(e.target.files[0],url=>{DATA.drinkImages.push(url);persist();renderDrinksAdmin();toast('Uploaded');}));

/* ---------- Events ---------- */
function renderEventsAdmin(){
  const list=$('#events-list');list.innerHTML='';
  (DATA.events||[]).forEach((ev,i)=>{
    const d=document.createElement('div');d.className='event-edit';
    d.innerHTML=`
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input data-f="title" value="${esc(ev.title)}" placeholder="Title">
        <input data-f="date" value="${esc(ev.date)}" placeholder="Date (e.g. Every Friday)">
        <input data-f="time" value="${esc(ev.time)}" placeholder="Time (e.g. 9PM onwards)">
        <input data-f="image" value="${esc(ev.image)}" placeholder="Image URL">
        <textarea data-f="desc" rows="2" placeholder="Description">${esc(ev.desc)}</textarea>
      </div>
      <div class="row-actions mt-2"><button class="admin-btn-danger">Delete</button></div>`;
    list.appendChild(d);
    d.querySelector('.admin-btn-danger').onclick=()=>{DATA.events.splice(i,1);persist();renderEventsAdmin();};
    d.querySelectorAll('input,textarea').forEach(el=>el.addEventListener('change',()=>{DATA.events[i][el.dataset.f]=el.value;persist();}));
  });
}
$('#add-event').addEventListener('click',()=>{DATA.events=DATA.events||[];DATA.events.push({title:'New Event',date:'TBA',time:'',desc:'Description',image:''});persist();renderEventsAdmin();});

/* ---------- Videos ---------- */
function renderVideosAdmin(){
  const list=$('#videos-list');list.innerHTML='';
  (DATA.videos||[]).forEach((v,i)=>{
    const d=document.createElement('div');d.className='video-edit';
    d.innerHTML=`
      <input data-f="title" value="${esc(v.title)}" placeholder="Title">
      <input data-f="url" value="${esc(v.url)}" placeholder="Embed URL (YouTube / Drive preview)">
      <input data-f="thumb" value="${esc(v.thumb||'')}" placeholder="Thumbnail URL (optional)">
      <div class="row-actions mt-2"><button class="admin-btn-danger">Delete</button></div>`;
    list.appendChild(d);
    d.querySelector('.admin-btn-danger').onclick=()=>{DATA.videos.splice(i,1);persist();renderVideosAdmin();};
    d.querySelectorAll('input').forEach(el=>el.addEventListener('change',()=>{DATA.videos[i][el.dataset.f]=el.value;persist();}));
  });
}
$('#add-video').addEventListener('click',()=>{
  const url=prompt('Video embed URL (YouTube / Google Drive preview):');
  if(!url)return;
  const title=prompt('Title:')||'Levernasia Moment';
  DATA.videos=DATA.videos||[];DATA.videos.push({title,url,thumb:''});persist();renderVideosAdmin();
});

/* ---------- Reviews ---------- */
function renderReviewsAdmin(){
  const list=$('#reviews-list');list.innerHTML='';
  (DATA.reviews||[]).forEach((r,i)=>{
    const d=document.createElement('div');d.className='review-edit';
    d.innerHTML=`
      <input data-f="name" value="${esc(r.name)}" placeholder="Name">
      <select data-f="rating"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select>
      <textarea data-f="text" rows="3" placeholder="Review text">${esc(r.text)}</textarea>
      <input data-f="date" value="${esc(r.date||'')}" placeholder="Date (e.g. 2 weeks ago)">
      <div class="row-actions"><button class="admin-btn-danger">Delete</button></div>`;
    list.appendChild(d);
    d.querySelector('select').value=r.rating||5;
    d.querySelector('.admin-btn-danger').onclick=()=>{DATA.reviews.splice(i,1);persist();renderReviewsAdmin();};
    d.querySelectorAll('input,textarea,select').forEach(el=>el.addEventListener('change',()=>{
      const k=el.dataset.f;DATA.reviews[i][k]=k==='rating'?+el.value:el.value;persist();
    }));
  });
}
$('#add-review').addEventListener('click',()=>{DATA.reviews=DATA.reviews||[];DATA.reviews.push({name:'Guest',rating:5,text:'Great experience!',date:'Just now'});persist();renderReviewsAdmin();});

/* ---------- Instagram ---------- */
function instaRow(item,list,i,which){
  const d=document.createElement('div');d.className='insta-row';
  d.innerHTML=`<input data-f="shortcode" value="${esc(item.shortcode)}" placeholder="Shortcode"><select data-f="type" class="admin-input"><option value="post" ${item.type==='post'?'selected':''}>post</option><option value="reel" ${item.type==='reel'?'selected':''}>reel</option></select><button class="admin-btn-danger">✕</button>`;
  list.appendChild(d);
  d.querySelector('.admin-btn-danger').onclick=()=>{ DATA.instagramPosts[which].splice(i,1);renderInstaAdmin();persist(); };
  d.querySelectorAll('input,select').forEach(el=>el.addEventListener('change',()=>{ DATA.instagramPosts[which][i][el.dataset.f]=el.value;persist(); }));
}
function renderInstaAdmin(){
  DATA.instagramPosts=DATA.instagramPosts||{levernasia:[],djmishi:[]};
  const l1=$('#insta-list');l1.innerHTML='';
  DATA.instagramPosts.levernasia.forEach((it,i)=>instaRow(it,l1,i,'levernasia'));
  const l2=$('#insta-dj-list');l2.innerHTML='';
  DATA.instagramPosts.djmishi.forEach((it,i)=>instaRow(it,l2,i,'djmishi'));
}
$('#add-insta').addEventListener('click',()=>{DATA.instagramPosts.levernasia.push({shortcode:'',type:'reel'});renderInstaAdmin();persist();});
$('#add-insta-dj').addEventListener('click',()=>{DATA.instagramPosts.djmishi.push({shortcode:'',type:'reel'});renderInstaAdmin();persist();});
$('#save-insta').addEventListener('click',()=>{persist();toast('Instagram saved');});

/* ---------- Password ---------- */
$('#change-pw').addEventListener('click',async()=>{
  const np=$('#np').value,np2=$('#np2').value,m=$('#pw-msg');
  m.classList.add('hidden');
  if(np!==np2){m.textContent='ERROR: Passwords do not match.';m.className='text-sm rounded-lg p-3 bg-red-950/40 border border-red-600/40 text-red-300';m.classList.remove('hidden');return;}
  if(np.length<4){m.textContent='ERROR: Password must be at least 4 characters.';m.className='text-sm rounded-lg p-3 bg-red-950/40 border border-red-600/40 text-red-300';m.classList.remove('hidden');return;}
  try{
    DATA.site.adminPasswordHash = await sha256(np);
    persist();
    m.textContent='OK: Password updated. Remember to publish to make it permanent.';
    m.className='text-sm rounded-lg p-3 bg-emerald-950/40 border border-emerald-600/40 text-emerald-300';
    m.classList.remove('hidden');
    $('#np').value='';$('#np2').value='';
  }catch(err){
    m.textContent='Hash error: '+err.message;m.className='text-sm rounded-lg p-3 bg-red-950/40 border border-red-600/40 text-red-300';m.classList.remove('hidden');
  }
});

/* ---------- Export / Publish ---------- */
function exportData(){
  DATA = { ...DATA, site:{...DATA.site}, quickpic:{...DATA.quickpic} };
  const file = exportDataFile(DATA);
  downloadText('data.js', file);
  toast('OK: data.js downloaded — upload to Hostinger /js/ folder to go live.','ok');
}

/* ---------- Helpers ---------- */
function esc(s){return (s==null?'':String(s)).replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function setupForms(){}
function handleImageUpload(file, cb){
  if(!file) return;
  if(!file.type.startsWith('image/')){toast('Please choose an image','err');return;}
  if(file.size>4*1024*1024) toast('Warning: Image >4MB — will still be embedded but file will be large.','err');
  const r=new FileReader();
  r.onload=e=>cb(e.target.result);
  r.readAsDataURL(file);
}
