# Chandan Cards & Wedding Planner — Website

Live wedding-card catalogue website for **Chandan Cards & Wedding Planner**, Sakchi, Jamshedpur.

- Website source: [`chandan-cards/`](chandan-cards/) — pure HTML/CSS/JS, no build step
- Deployment config: [`vercel.json`](vercel.json) — ready for Vercel one-click deploy

## 🚀 Deploy to Vercel

### Option A — via the Vercel dashboard (easiest)

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repository.
2. Vercel reads `vercel.json` automatically — **no settings need changing**
   (framework: none, no build command, output directory: `chandan-cards`).
3. Click **Deploy**. Done — you get a `https://<project>.vercel.app` link to share on WhatsApp.

### Option B — via the CLI

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

Run from the repository root (where `vercel.json` lives).

### After deployment

1. Open `chandan-cards/index.html` and replace the two `https://example.com/`
   placeholders (canonical + og:url) with your real Vercel/custom domain.
2. Optionally update the `Sitemap:` line in `chandan-cards/robots.txt`.

## 🖼️ Adding the images

The site is fully wired for 15 card photos + 11 shop photos:

- Card photos → `chandan-cards/images/cards/CC-001.jpg` … `CC-015.jpg`
  (mapping table: `chandan-cards/images/cards/README.md`)
- Shop photos → `chandan-cards/images/gallery/g-01.jpg` … `g-11.jpg`
  (mapping table: `chandan-cards/images/gallery/README.md`)

Commit + push, and Vercel redeploys automatically. Until files exist the site
shows elegant placeholders — nothing looks broken.

## ✏️ Editing content

Everything editable lives in **`chandan-cards/js/data.js`**:
business info & WhatsApp number, the card catalogue, gallery photos and services.
See `chandan-cards/README.md` for details.
