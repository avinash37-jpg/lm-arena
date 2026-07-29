# Levernasia Bar & Club — Static Website

A fully static HTML/CSS/JS website for **Levernasia Bar & Club** (Gardens Galleria Mall, Sector 38, Noida). Works out of the box on **Hostinger static hosting**, **Vercel**, **Netlify** or any plain web host — no Node.js / server required.

---

## 📁 Structure

The website is split into **3 pages** (as requested):

| File | Section | Contents |
|---|---|---|
| `index.html` | **About** | Hero, About, Experience (Gallery), Location & VIP reservation form |
| `menu.html`  | **Menu**   | Food carousel, full food menu, drinks carousel, drinks menu, PDF print |
| `events.html`| **Events & Media** | Events & DJs, QuickPic QR, Video Highlights, Instagram feed, Reviews |

Other files:

- `admin.html` — built-in admin panel (password: **admin123** — change after first login)
- `css/style.css` — all custom styles
- `js/data.js` — **the single content file** (this is what the admin edits/publishes)
- `js/app.js` — shared helpers (data, SHA-256 login, header/footer injection, nav)
- `js/render.js` — shared rendering (hero, about, gallery, menus, events, reviews, etc.)
- `admin/admin.js` + `admin/admin.css` — admin panel logic & styles

---

## 🚀 Deploying (Hostinger / Vercel / any static host)

1. Upload **all** files/folders as-is to your web root (e.g. `public_html/` on Hostinger).
2. Visit your domain — `index.html` loads automatically.
3. Done. No build step, no npm install, no server.

---

## 🔐 Admin Panel

- Go to `yourdomain.com/admin.html`
- Default password: **admin123**
- Edit any section, then click **[Go] Publish / Export → Download data.js**
- Upload the downloaded `data.js` into the `js/` folder on your host (overwriting the existing one).
- Your changes are live.

> **Security tip:** Rename `admin.html` to something private (e.g. `lv-secret-7428.html`) and change the default password from the "Change Password" tab before going live.

> **Login bug fixed:** The admin login now works on plain HTTP, file:// and HTTPS — SHA-256 hashing has a built-in pure-JavaScript fallback so it doesn't require a "Secure Context" (which was why login failed on some hosts / when opened locally).

---

## 📸 QuickPic QR (Customer Photo Downloads)

From the admin panel → **[QR] QuickPic QR** tab:

1. Generate a QR code pointing to your photo gallery (Google Photos album, Google Drive folder, QuickPic gallery, photographer's page, etc.). You can use any free QR generator online.
2. Upload that QR image (or paste its URL) into the admin.
3. Paste the gallery URL.
4. Edit the 4 steps shown to customers.
5. Save, then Publish/Export.

A big QR card appears on the **Events & Media** page (`events.html#quickpic`). Customers scan it with their phone camera and instantly view/download their photos.

If you don't want the section, uncheck "Show QuickPic" in the admin.

---

## 🎨 Features

- Dark luxury crimson/red nightlife theme
- Fully responsive (mobile, tablet, desktop)
- Hero auto-slider, food & drink carousels, gallery with lightbox
- WhatsApp-powered reservations (opens WhatsApp with prefilled message)
- PDF menu print
- Auto-showing reservation modal on inactivity
- Floating call button + mobile bottom navigation
- Instagram embed feed
- Google Maps embed
- All content editable from the admin — no coding needed
- Tailwind CSS loaded from CDN + custom CSS
