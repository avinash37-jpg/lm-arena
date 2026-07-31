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

## ⭐ How the card images work (IMPORTANT)

Card photos live in **`images/cards/`** and are named after their card ID:

```
images/cards/CC-001.jpg   → Royal Jharokha Wedding Card
images/cards/CC-002.jpg   → Vintage Rose Ganesha Card
...
images/cards/CC-015.jpg   → Shubh Aarambh Radha Krishna Card
```

See **`images/cards/README.md`** for the full photo-to-ID mapping table.

Shop/business photos live in **`images/gallery/`** as `g-01.jpg` … `g-11.jpg`.

Every card entry in `js/data.js` looks like this:

```js
{
  id: "CC-001",
  title: "Royal Jharokha Wedding Card",
  category: "Luxury",
  image: "images/cards/CC-001.jpg",
  download: "",        // optional: separate high-quality file URL
  description: "Lattice-cut jharokha style cover...",
  tags: ["Wedding", "Royal", "Traditional", "Luxury"],
  featured: true       // true = also shown in "Featured" section
}
```

Until an image file exists, the site shows an elegant **"Card Preview Unavailable"**
placeholder instead of a broken image, so nothing ever looks broken.

### Adding a NEW card later

1. Save the photo as `images/cards/CC-016.jpg` (next free ID).
2. Copy any block in `js/data.js`, set `id: "CC-016"` and `image: "images/cards/CC-016.jpg"`.

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
