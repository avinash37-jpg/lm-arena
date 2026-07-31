# Chandan Cards & Wedding Planner — Website

A premium, mobile-first **wedding invitation card catalogue + lead-generation website** for
**Chandan Cards & Wedding Planner**, Sakchi, Jamshedpur.

Pure **HTML + CSS + vanilla JavaScript** — no build step, no backend.
Deploy the `chandan-cards/` folder to any static host (GitHub Pages, Netlify, Vercel, cPanel, etc.).

---

## 📂 Files

| File | Purpose |
|---|---|
| `index.html` | Page structure (you rarely need to touch this) |
| `css/style.css` | All styling & animations |
| `js/data.js` | **⭐ EDIT THIS FILE** — business info, card catalogue, gallery photos, services |
| `js/app.js` | App logic (catalogue, search, modal, WhatsApp, downloads, shortlist) |

---

## ⭐ How to add your card images (IMPORTANT)

Open **`js/data.js`**. Every card entry looks like this:

```js
{
  id: "CC-001",
  title: "Royal Wedding Invitation",
  category: "Wedding",
  image: "",           // ← PASTE THE DIRECT IMAGE URL HERE
  download: "",        // ← optional: separate high-quality file URL
  description: "Elegant traditional wedding invitation...",
  tags: ["Wedding", "Traditional", "Royal"],
  featured: true       // true = also shown in "Featured" section
}
```

1. Paste each of the **15 wedding-card image URLs** into the matching card's `image` field.
2. Paste each of the **11 shop photo URLs** into `galleryImages` (same file, lower down).
3. Rename titles/categories if you like — everything updates automatically.

Until a URL is added, the site shows an elegant **"Card Preview Unavailable"** placeholder
instead of a broken image, so nothing ever looks broken.

### Adding a NEW card later

Copy any block, give it the next ID (`CC-016`, `CC-017`, …), paste the image URL — done.
Search, filters, modal, download and WhatsApp all pick it up automatically.

---

## ☎️ Changing business details

Everything lives in one object at the top of `js/data.js`:

```js
const businessInfo = {
  phone: "09234680825",
  whatsapp: "919234680825",   // international format, no + or spaces
  mapsUrl: "...",             // paste your exact Google Maps share link here
  ...
};
```

---

## ✅ Built-in features

- Card catalogue with **search, category filters and live result count**
- Full-screen **card preview modal** (ESC / arrows / swipe / prev-next)
- **Download Sample** on every card (with open-in-new-tab fallback)
- **"I Want This Card"** → opens WhatsApp with the Card ID + name pre-written
- **Shortlist** (♡) saved in the browser, sent as one WhatsApp message
- Floating WhatsApp button + mobile bottom bar (WhatsApp / Call / Directions)
- Business gallery with lightbox, services, how-it-works, map, SEO (LocalBusiness JSON-LD)
- Lazy-loaded images, graceful error fallbacks, reduced-motion support, keyboard accessible
