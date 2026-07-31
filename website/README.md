# IACT 2 Computers Education — Website

A modern, responsive website for **IACT 2 Computers Education**, a computer training
institute in **Phuldungri, Ghatshila, Jharkhand 832303**.

Built with **React + Vite + TypeScript + Tailwind CSS v4 + Motion**. 100% static —
**no server, no API keys, no database** — so it deploys anywhere for free.

---

## 🎯 Business details

| Field | Value |
| --- | --- |
| Name | IACT 2 Computers Education |
| Address | Phuldungri, Ghatshila, Jharkhand 832303 |
| Phone | 080925 76269 |
| Google Maps | https://maps.app.goo.gl/H19HUGiC8LkqbVzE6 |

All of these live in one file → [`src/data/site.ts`](src/data/site.ts).

---

## ✨ Sections

Navbar · Hero · Stats · About (Mission/Vision/Promise) · Courses (filterable) ·
Why Choose Us · Admissions (4-step + **WhatsApp enquiry form**) · Gallery (lightbox) ·
Student Reviews · FAQ · Location & Contact (Google Map) · Footer · Floating WhatsApp/Call buttons.

---

## 🚀 Run locally

```bash
npm install      # install dependencies
npm run dev      # start dev server → http://localhost:5173
```

```bash
npm run build    # production build → dist/
npm run preview  # preview the build locally
```

---

## ☁️ Deploy to Vercel (recommended — free)

This project is Vercel-ready. A [`vercel.json`](vercel.json) is included so the
framework, build command and output directory are pre-configured.

### Option A — One-click via dashboard (easiest)
1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. Go to **[vercel.com/new](https://vercel.com/new)** and import the repo.
3. Vercel auto-detects **Vite**. Confirm:
   - **Framework Preset:** Vite
   - **Build Command:** `vite build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click **Deploy**. Done in ~1 minute — you get a free `*.vercel.app` URL.

### Option B — Via Vercel CLI
```bash
npm i -g vercel       # install the CLI once
vercel                # preview deploy
vercel --prod         # production deploy (your live URL)
```

### Option C — Drag & drop (no Git needed)
Run `npm run build`, then drag the generated **`dist/`** folder onto
**[vercel.com/new](https://vercel.com/new)**.

> 🎉 No environment variables or secrets are required. Everything works out of the box.
> You can later attach a custom domain (e.g. `iact2.com`) for free in
> **Project → Settings → Domains**.

---

## ✏️ How to edit content

- **Business info** (name, phone, address, map, hours): `src/data/site.ts` → `SITE`
- **Courses**: `src/data/site.ts` → `COURSES`
- **Student reviews**: `src/data/site.ts` → `TESTIMONIALS`
- **FAQs**: `src/data/site.ts` → `FAQS`
- **Colours / theme**: `src/index.css` (the `--color-brand-*` variables)

No code changes needed for everyday content updates — just edit `site.ts`.

---

## 🖼️ Images

All images in `public/images/` were AI-generated as placeholders. Replace them with
real photos of the institute (logo, classroom, lab, students, certificates) by saving
new files into `public/images/` using the **same filenames**.
