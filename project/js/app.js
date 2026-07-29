/* Shared helpers used by both public site and admin panel */

// Retrieve the active data: localStorage override takes precedence over the built-in SITE_DATA
function getSiteData() {
  try {
    const saved = localStorage.getItem('levernasia_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      // deep-merge fallback for newly-added fields
      return deepMerge(window.SITE_DATA, parsed);
    }
  } catch (e) { console.warn('localStorage parse failed', e); }
  return JSON.parse(JSON.stringify(window.SITE_DATA));
}

// Save data to localStorage (preview/local draft)
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

// Deep-merge helper
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

// Convert data object into a downloadable data.js file (for publishing)
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

// Password hashing (SHA-256, for admin gate on static site)
async function sha256(str) {
  const buf = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2,'0')).join('');
}

// WhatsApp helper
function waLink(phone, msg) {
  return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
}

// Tiny DOM helpers
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];

function toast(msg, type='ok') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999;padding:12px 20px;border-radius:10px;font-weight:700;font-size:14px;box-shadow:0 10px 30px rgba(0,0,0,.5);transition:all .2s;color:#fff;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.background = type === 'err' ? '#b91c1c' : '#059669';
  t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity = '0'; setTimeout(()=>{t.style.opacity='1';t.classList.add('hidden');}, 200); }, 2600);
}
