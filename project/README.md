# 🍸 Levernasia Bar & Club — Website + Built-in Admin Panel

**100% static HTML/CSS/JS — no server required.** You can upload the entire folder directly to **Hostinger (or any static hosting)** and it works out of the box. The admin panel lives **inside** the website at `/admin.html` — no online admin, no backend, no database needed.

## 📁 Files

```
project/
├── index.html        ← Public website (your client's site)
├── admin.html        ← Admin panel (edit everything)
├── css/style.css     ← Theme styles (dark/red luxury look)
├── js/
│   ├── data.js       ← ALL website content (text, images, menu, events, etc.)
│   ├── app.js        ← Shared helpers
│   └── main.js       ← Public site renderer
├── admin/
│   ├── admin.css     ← Admin panel styles
│   └── admin.js      ← Admin panel logic
├── uploads/          ← (optional) you can keep uploaded images here manually
└── README.md
```

## 🚀 How to use

### 1. Open locally
Just open `index.html` in your browser by double-clicking it. No install needed.

### 2. Log in to the admin
Visit **`admin.html`** (open it in the browser too) and enter the password:

```
Default password: admin123
```

You can change the password from inside the admin panel (🔑 Change Password) after logging in.

### 3. Edit anything
Inside admin you can change:
- ⚙️ **Site Settings** — brand name, phone, WhatsApp, address, hours, logo, Instagram, Google Maps embed
- 🖼️ **Hero Slider** — paste image URLs OR upload images from your computer
- 📝 **About & Features** — headlines, paragraphs, about image, 3 feature cards (add/delete)
- 🖼️ **Gallery** — add/remove categories, upload or paste images, delete
- 🍽️ **Food Menu** — add/delete categories, add/edit/delete items, veg/non-veg toggle, price; manage food carousel too
- 🍸 **Drinks Menu** — same as food, for cocktails/mocktails/spirits + drinks carousel
- 🎵 **Events** — title, date, time, image, description
- 🎬 **Videos** — YouTube/Google Drive embeds with thumbnails
- ⭐ **Reviews** — customer testimonials
- 📷 **Instagram** — shortcodes for @levernasia_la and @djmishi_
- 🔑 **Password** — change admin password

**Everything you edit auto-saves in your browser** (a "local draft"). To preview, click **👁 Preview Changes** — it opens the public site with your draft applied. You'll see an orange "unsaved draft" banner at the top of the site during preview.

### 4. Publish to Hostinger (go live)
When you're happy with the edits:

1. In admin, go to **🚀 Publish / Export**.
2. Click **⬇ Download data.js**. You'll get a new `data.js` file containing **all** your edits (including uploaded images, which are embedded inside it).
3. Log in to **Hostinger hPanel → File Manager**, open `public_html`, then open the `js/` folder.
4. **Upload** the new `data.js`, replacing/overwriting the existing one.
5. Open your website in an incognito tab to verify — changes are live! ✅
6. Back in admin, click **🧹 Clear Local Draft** so future edits start from the live version.

> 💡 Uploaded images from your computer are embedded directly inside `data.js` as data URLs. That means you don't need a separate upload folder on Hostinger — just the one file.

## 🔐 Security note

Because the site is fully static, the admin "login" is a client-side password gate that prevents random visitors from opening the admin. For real production security on static hosting:
- **Do NOT link to `admin.html`** from the public site (I've left a tiny "🔐 Admin" link in the footer for you; you can delete it by removing the line near the end of `index.html` that says `<a href="admin.html"...>`).
- Rename `admin.html` to something hard-to-guess like `panel-levernasia-7829.html` and bookmark it.
- Never share the admin URL publicly.

## 🎨 Customizing look & feel
- Colors, fonts, borders, shadows: edit `css/style.css` (and `admin/admin.css` for the admin panel).
- Main color is `#dc2626` (crimson red) — search & replace with your preferred hex code across the CSS files to rebrand.

## 📱 Features of the public site
- Full-screen rotating hero with CTAs
- About with 3 feature cards & VIP hours
- Filterable gallery (Ambiance/Crowd/Bar/Food) with lightbox
- Food carousel + categorized food menu with Veg/Non-Veg filter + Print-to-PDF menu
- Drinks carousel + categorized drinks menu
- Event cards
- Customer reviews
- Video gallery (popup player)
- Instagram embeds
- WhatsApp-powered reservation form (guest fills form → WhatsApp opens pre-filled)
- VIP guestlist signup
- Google Maps embed
- Sticky nav (hides top-bar on scroll), mobile hamburger menu + bottom tab bar
- Floating call button
- Inactivity "reserve now" popup
- Fully responsive (desktop / tablet / mobile)

## ❓ Troubleshooting
- **Edits don't show on the live site?** Make sure you replaced `js/data.js` (not `data.html` or another file) in Hostinger, then hard-refresh (Ctrl+F5).
- **Forgot password?** Open `js/data.js` in a text editor, find `adminPasswordHash`, and replace the hash with `240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9` (that resets it to `admin123`).
- **Images not loading?** External image hosts (ibb.co, iili.io, Google Drive) sometimes block hotlinking. Use the Upload button in admin instead — those are embedded directly.
