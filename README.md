# Levernasia — Full Website with Built-in Admin Panel

The complete project is in **`project/`**. It's **100% static HTML/CSS/JS** — no Node, no server, no database — perfect for **Hostinger static hosting**. The admin panel lives *inside* the website at `admin.html`.

## 🚀 Run it
Just open `project/index.html` in a browser.

- 🌐 **Public site:** `project/index.html`
- 🔐 **Admin panel:** `project/admin.html`
  - Default password: **`admin123`** (change from inside admin after login)

## 📦 Deploy to Hostinger
Upload the entire contents of the `project/` folder into Hostinger's `public_html/` (via hPanel → File Manager). Done.

## ✏️ How to edit content
1. Visit `yourdomain.com/admin.html` and log in.
2. Edit any section (site info, hero, gallery, menu, drinks, events, videos, reviews, Instagram, password).
3. Click **👁 Preview Changes** to see drafts on the public site (saved in your browser only).
4. When happy, go to **🚀 Publish / Export**, download `data.js`, and upload it to Hostinger into the `js/` folder, overwriting the old one. Your changes are live.

Full instructions, screenshots, tips for renaming the admin URL, and troubleshooting are in **[project/README.md](project/README.md)**.
