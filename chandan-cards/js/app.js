/* ==========================================================================
   CHANDAN CARDS & WEDDING PLANNER — APP LOGIC
   All catalogue rendering is dynamic; edit js/data.js to change content.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Small helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Sanitize dynamic text before injecting into HTML
  const esc = (str) =>
    String(str ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =====================================
     TOAST NOTIFICATIONS (reusable)
     ===================================== */
  const toastRoot = $("#toasts");
  function toast(message) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    toastRoot.appendChild(el);
    setTimeout(() => {
      el.classList.add("is-leaving");
      el.addEventListener("animationend", () => el.remove(), { once: true });
    }, 2400);
    // keep max 3 toasts
    while (toastRoot.children.length > 3) toastRoot.firstChild.remove();
  }

  /* =====================================
     WHATSAPP MESSAGE TEMPLATES
     ===================================== */
  const WA = {
    open(message) {
      const url =
        "https://wa.me/" +
        businessInfo.whatsapp +
        "?text=" +
        encodeURIComponent(message);
      toast("Opening WhatsApp...");
      window.open(url, "_blank", "noopener");
    },
    general() {
      this.open(
        `Hello ${businessInfo.name}, I want to know more about your wedding cards and event services.`
      );
    },
    card(card) {
      this.open(
        `Hello ${businessInfo.name}, I liked this card design.\n\n` +
          `Card ID: ${card.id}\nCard Name: ${card.title}\n\n` +
          `Please share the price and customization options.`
      );
    },
    shortlist(cards) {
      const list = cards.map((c) => `${c.id} — ${c.title}`).join("\n");
      this.open(
        `Hello ${businessInfo.name},\n\nI shortlisted these card designs:\n\n` +
          `${list}\n\nPlease share prices and customization details.`
      );
    }
  };

  /* =====================================
     GLOBAL ACTION LINKS (call / maps / whatsapp)
     ===================================== */
  document.addEventListener("click", (e) => {
    const wa = e.target.closest("[data-wa]");
    if (wa) {
      e.preventDefault();
      WA.general();
      return;
    }
    const call = e.target.closest("[data-call]");
    if (call) {
      e.preventDefault();
      window.location.href = "tel:" + businessInfo.phoneDial;
      return;
    }
    const maps = e.target.closest("[data-maps]");
    if (maps) {
      e.preventDefault();
      window.open(businessInfo.mapsUrl, "_blank", "noopener");
    }
  });

  /* =====================================
     PRELOADER
     ===================================== */
  const preloader = $("#preloader");
  window.addEventListener("load", () => {
    setTimeout(() => preloader.classList.add("is-done"), 350);
  });
  // Failsafe — never block the site
  setTimeout(() => preloader.classList.add("is-done"), 2500);

  /* =====================================
     NAVIGATION
     ===================================== */
  const nav = $("#nav");
  const navLinks = $("#navLinks");
  const burger = $("#navBurger");

  function onScrollNav() {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      navLinks.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  // Active link highlighting
  const sections = ["home", "catalogue", "services", "gallery", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const linkFor = (id) => $(`.nav__link[href="#${id}"]`);
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          $$(".nav__link").forEach((l) => l.classList.remove("is-active"));
          const link = linkFor(en.target.id);
          if (link) link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* =====================================
     SCROLL REVEAL (IntersectionObserver)
     ===================================== */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          revealObserver.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );
  function observeReveals(ctx = document) {
    $$(".reveal", ctx).forEach((el) => {
      if (prefersReducedMotion) el.classList.add("is-visible");
      else revealObserver.observe(el);
    });
  }
  observeReveals();

  /* =====================================
     SHORTLIST (localStorage, no login)
     ===================================== */
  const SAVED_KEY = "chandan-saved-cards";
  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
    if (!Array.isArray(saved)) saved = [];
  } catch (_) {
    saved = [];
  }
  const isSaved = (id) => saved.includes(id);
  function persistSaved() {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    } catch (_) {}
  }
  function toggleSaved(id) {
    if (isSaved(id)) {
      saved = saved.filter((s) => s !== id);
      toast("Card removed");
    } else {
      saved.push(id);
      toast("Card added to your shortlist");
    }
    persistSaved();
    updateSavedUI();
  }
  function updateSavedUI() {
    const n = saved.length;
    const navCount = $("#navSavedCount");
    const pill = $("#savedPill");
    navCount.hidden = pill.hidden = n === 0;
    navCount.textContent = pill.textContent = n;
    // sync heart buttons
    $$("[data-save-id]").forEach((btn) => {
      const on = isSaved(btn.dataset.saveId);
      btn.classList.toggle("is-saved", on);
      btn.setAttribute("aria-pressed", on);
      btn.setAttribute(
        "aria-label",
        on ? "Remove card from shortlist" : "Save card to shortlist"
      );
    });
    renderDrawer();
  }

  /* =====================================
     IMAGE HELPERS (lazy, fallback, download)
     ===================================== */
  const FALLBACK_HTML =
    '<span class="card__fallback"><svg class="icon" aria-hidden="true"><use href="#i-card"/></svg><span>Card Preview Unavailable</span></span>';

  function imgHTML(src, alt, cls = "") {
    return `<img src="${esc(src)}" alt="${esc(alt)}" class="${cls}"
      loading="lazy" decoding="async"
      onerror="this.closest('.card__media,.gallery__item,.modal__media,.drawer__thumb')?.classList.add('is-broken')">`;
  }

  function safeFilename(card) {
    return (
      "Chandan-Cards-" +
      card.id +
      "-" +
      card.title.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "")
    );
  }

  /* DOWNLOAD — tries a real download, falls back to opening in a new tab */
  async function downloadCard(card) {
    const url = card.download || card.image;
    if (!url) {
      toast("Sample not available yet — ask us on WhatsApp");
      return;
    }
    toast("Download started");
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const ext = (blob.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = safeFilename(card) + "." + ext;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    } catch (_) {
      // CORS or host restriction — graceful fallback
      window.open(url, "_blank", "noopener");
    }
  }

  function copyCardId(id) {
    const done = () => toast("Card ID copied — " + id);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(id).then(done, done);
    } else {
      done();
    }
  }

  /* =====================================
     CARD TEMPLATE
     ===================================== */
  function cardHTML(card, index) {
    const mediaInner = card.image
      ? imgHTML(card.image, `${card.title} — wedding invitation card ${card.id} by Chandan Cards, Jamshedpur`)
      : "";
    return `
    <article class="card" data-card-id="${esc(card.id)}" style="animation-delay:${Math.min(index * 45, 400)}ms">
      <div class="card__media ${card.image ? "" : "is-broken"}" data-open="${esc(card.id)}" role="button" tabindex="0"
           aria-label="Preview ${esc(card.title)}, card ${esc(card.id)}">
        ${mediaInner}
        ${FALLBACK_HTML}
        <button class="card__save ${isSaved(card.id) ? "is-saved" : ""}" data-save-id="${esc(card.id)}"
                aria-pressed="${isSaved(card.id)}" aria-label="Save card to shortlist">
          <svg class="icon" aria-hidden="true"><use href="#i-heart"/></svg>
        </button>
        <span class="card__hint">Tap to Preview</span>
      </div>
      <div class="card__body">
        <div class="card__idrow">
          <span class="card-id">${esc(card.id)}</span>
          <span class="card__cat">${esc(card.category)}</span>
        </div>
        <h3 class="card__title">${esc(card.title)}</h3>
        <div class="card__actions">
          <button class="card__mini" data-open="${esc(card.id)}">
            <svg class="icon" aria-hidden="true"><use href="#i-eye"/></svg> View
          </button>
          <button class="card__mini" data-download="${esc(card.id)}">
            <svg class="icon" aria-hidden="true"><use href="#i-download"/></svg> Download
          </button>
        </div>
        <button class="card__want" data-want="${esc(card.id)}">
          I Want This Card
          <svg class="icon icon--arrow" aria-hidden="true"><use href="#i-arrow"/></svg>
        </button>
      </div>
    </article>`;
  }

  const byId = (id) => cardSamples.find((c) => c.id === id);

  /* =====================================
     FEATURED GRID
     ===================================== */
  const featuredGrid = $("#featuredGrid");
  const featured = cardSamples.filter((c) => c.featured).slice(0, 4);
  featuredGrid.innerHTML = (featured.length ? featured : cardSamples.slice(0, 4))
    .map((c, i) => cardHTML(c, i))
    .join("");

  /* =====================================
     CATALOGUE — FILTER + SEARCH + RENDER
     ===================================== */
  const cardsGrid = $("#cardsGrid");
  const resultCount = $("#resultCount");
  const emptyState = $("#emptyState");
  const chipsWrap = $("#categoryChips");
  const searchInput = $("#searchInput");
  const searchClear = $("#searchClear");
  $("#heroCount").textContent = cardSamples.length;

  let activeCategory = "All Cards";
  let query = "";
  let visibleCards = cardSamples.slice();

  // Build category chips
  chipsWrap.innerHTML = cardCategories
    .map(
      (cat) =>
        `<button class="chip ${cat === activeCategory ? "is-active" : ""}"
           role="tab" aria-selected="${cat === activeCategory}"
           data-category="${esc(cat)}">${esc(cat)}</button>`
    )
    .join("");

  function matchesCategory(card) {
    if (activeCategory === "All Cards") return true;
    if (activeCategory === "Other Events")
      return !["Wedding", "Engagement", "Reception", "Traditional", "Modern", "Luxury", "Minimal"].includes(card.category);
    return (
      card.category === activeCategory ||
      (card.tags || []).some((t) => t.toLowerCase() === activeCategory.toLowerCase())
    );
  }
  function matchesQuery(card) {
    if (!query) return true;
    const hay = [card.title, card.id, card.category, ...(card.tags || [])]
      .join(" ")
      .toLowerCase();
    return query
      .toLowerCase()
      .split(/\s+/)
      .every((w) => hay.includes(w));
  }

  function renderCatalogue() {
    visibleCards = cardSamples.filter((c) => matchesCategory(c) && matchesQuery(c));
    const n = visibleCards.length;

    const label =
      activeCategory === "All Cards" ? "Designs" : `${activeCategory} Designs`;
    resultCount.innerHTML = n
      ? `Showing <strong>${n}</strong> ${esc(label)}`
      : "No matching card found.";

    emptyState.hidden = n !== 0;
    cardsGrid.innerHTML = visibleCards.map((c, i) => cardHTML(c, i)).join("");
    updateSavedUI();
  }

  chipsWrap.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    activeCategory = chip.dataset.category;
    $$(".chip", chipsWrap).forEach((c) => {
      const on = c === chip;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-selected", on);
    });
    renderCatalogue();
  });

  let searchTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      query = searchInput.value.trim();
      searchClear.hidden = !query;
      renderCatalogue();
    }, 160);
  });
  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    query = "";
    searchClear.hidden = true;
    renderCatalogue();
    searchInput.focus();
  });

  renderCatalogue();

  /* =====================================
     CARD ACTION DELEGATION (grids)
     ===================================== */
  document.addEventListener("click", (e) => {
    const save = e.target.closest("[data-save-id]");
    if (save) {
      e.stopPropagation();
      toggleSaved(save.dataset.saveId);
      return;
    }
    const open = e.target.closest("[data-open]");
    if (open) {
      openModal(open.dataset.open);
      return;
    }
    const dl = e.target.closest("[data-download]");
    if (dl) {
      const card = byId(dl.dataset.download);
      if (card) downloadCard(card);
      return;
    }
    const want = e.target.closest("[data-want]");
    if (want) {
      const card = byId(want.dataset.want);
      if (card) WA.card(card);
    }
  });
  // Keyboard access for card media "buttons"
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-open][role='button']")) {
      e.preventDefault();
      openModal(e.target.dataset.open);
    }
  });

  /* =====================================
     CARD PREVIEW MODAL
     ===================================== */
  const modal = $("#cardModal");
  const modalMedia = $("#modalMedia");
  let modalIndex = -1;
  let lastFocus = null;

  function openModal(id) {
    const list = visibleCards.length ? visibleCards : cardSamples;
    let idx = list.findIndex((c) => c.id === id);
    if (idx === -1) idx = 0;
    modalIndex = idx;
    lastFocus = document.activeElement;
    fillModal(list[idx]);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal__close", modal).focus();
  }

  function fillModal(card) {
    modalMedia.classList.remove("is-broken");
    modalMedia.innerHTML =
      (card.image
        ? imgHTML(card.image, `${card.title} — large preview of card ${card.id}`)
        : "") + FALLBACK_HTML;
    if (!card.image) modalMedia.classList.add("is-broken");

    $("#modalId").textContent = card.id;
    $("#modalTitle").textContent = card.title;
    $("#modalCategory").textContent = card.category;
    $("#modalDesc").textContent = card.description || "";
    const saveBtn = $("#modalSave");
    saveBtn.dataset.saveId = card.id;
    saveBtn.classList.toggle("is-saved", isSaved(card.id));
    modal.dataset.currentId = card.id;
  }

  function modalCard() {
    return byId(modal.dataset.currentId);
  }
  function modalStep(dir) {
    const list = visibleCards.length ? visibleCards : cardSamples;
    modalIndex = (modalIndex + dir + list.length) % list.length;
    fillModal(list[modalIndex]);
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  $("#modalPrev").addEventListener("click", () => modalStep(-1));
  $("#modalNext").addEventListener("click", () => modalStep(1));
  $("#modalDownload").addEventListener("click", () => downloadCard(modalCard()));
  $("#modalWant").addEventListener("click", () => WA.card(modalCard()));
  $("#modalAsk").addEventListener("click", () => WA.card(modalCard()));
  $("#modalCopy").addEventListener("click", () => copyCardId(modal.dataset.currentId));
  $$("[data-close-modal]", modal).forEach((el) =>
    el.addEventListener("click", closeModal)
  );

  // Swipe on mobile
  let touchX = null;
  modal.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  modal.addEventListener(
    "touchend",
    (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 60) modalStep(dx < 0 ? 1 : -1);
      touchX = null;
    },
    { passive: true }
  );

  /* =====================================
     GALLERY + LIGHTBOX
     ===================================== */
  const galleryGrid = $("#galleryGrid");
  galleryGrid.innerHTML = galleryImages
    .map(
      (g, i) => `
      <button class="gallery__item ${g.image ? "" : "is-broken"} ${i === 0 ? "gallery__item--tall" : ""}"
              data-gallery="${i}" aria-label="${esc(g.alt)} — open full size">
        ${g.image ? imgHTML(g.image, g.alt) : ""}
        ${FALLBACK_HTML}
      </button>`
    )
    .join("");

  const lightbox = $("#lightbox");
  const lbFigure = $("#lbFigure");
  let lbIndex = 0;

  function openLightbox(i) {
    const item = galleryImages[i];
    if (!item || !item.image) return;
    lbIndex = i;
    lbFigure.innerHTML = `<img src="${esc(item.image)}" alt="${esc(item.alt)}" decoding="async">`;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal__close", lightbox).focus();
  }
  function lbStep(dir) {
    const usable = galleryImages
      .map((g, i) => (g.image ? i : -1))
      .filter((i) => i !== -1);
    if (!usable.length) return;
    let pos = usable.indexOf(lbIndex);
    pos = (pos + dir + usable.length) % usable.length;
    openLightbox(usable[pos]);
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  galleryGrid.addEventListener("click", (e) => {
    const item = e.target.closest("[data-gallery]");
    if (item) openLightbox(Number(item.dataset.gallery));
  });
  $("#lbPrev").addEventListener("click", () => lbStep(-1));
  $("#lbNext").addEventListener("click", () => lbStep(1));
  $$("[data-close-lightbox]", lightbox).forEach((el) =>
    el.addEventListener("click", closeLightbox)
  );
  let lbTouchX = null;
  lightbox.addEventListener("touchstart", (e) => (lbTouchX = e.touches[0].clientX), { passive: true });
  lightbox.addEventListener(
    "touchend",
    (e) => {
      if (lbTouchX === null) return;
      const dx = e.changedTouches[0].clientX - lbTouchX;
      if (Math.abs(dx) > 60) lbStep(dx < 0 ? 1 : -1);
      lbTouchX = null;
    },
    { passive: true }
  );

  /* =====================================
     SAVED CARDS DRAWER
     ===================================== */
  const drawer = $("#savedDrawer");
  const drawerList = $("#drawerList");

  /* Queries elements at call time so it can run before this section loads */
  function renderDrawer() {
    const list = $("#drawerList");
    const empty = $("#drawerEmpty");
    const waBtn = $("#drawerWhatsApp");
    if (!list || !empty || !waBtn) return;
    const cards = saved.map(byId).filter(Boolean);
    empty.hidden = cards.length !== 0;
    waBtn.disabled = cards.length === 0;
    list.innerHTML = cards
      .map(
        (c) => `
        <div class="drawer__item">
          <span class="drawer__thumb">
            ${c.image
              ? imgHTML(c.image, `${c.title} thumbnail`)
              : '<svg class="icon" aria-hidden="true"><use href="#i-card"/></svg>'}
          </span>
          <span class="drawer__item-info">
            <small>${esc(c.id)}</small>
            <strong>${esc(c.title)}</strong>
          </span>
          <button class="drawer__remove" data-remove-saved="${esc(c.id)}"
                  aria-label="Remove ${esc(c.id)} from shortlist">&times;</button>
        </div>`
      )
      .join("");
  }
  function openDrawer() {
    renderDrawer();
    drawer.hidden = false;
    document.body.style.overflow = "hidden";
    $(".drawer__close", drawer).focus();
  }
  function closeDrawer() {
    drawer.hidden = true;
    document.body.style.overflow = "";
  }

  $("#navSavedBtn").addEventListener("click", openDrawer);
  $("#openSavedBtn").addEventListener("click", openDrawer);
  $$("[data-close-drawer]", drawer).forEach((el) =>
    el.addEventListener("click", closeDrawer)
  );
  drawerList.addEventListener("click", (e) => {
    const rm = e.target.closest("[data-remove-saved]");
    if (rm) toggleSaved(rm.dataset.removeSaved);
  });
  $("#drawerWhatsApp").addEventListener("click", () => {
    const cards = saved.map(byId).filter(Boolean);
    if (cards.length) WA.shortlist(cards);
  });

  /* =====================================
     GLOBAL KEYBOARD (ESC / arrows)
     ===================================== */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!modal.hidden) closeModal();
      if (!lightbox.hidden) closeLightbox();
      if (!drawer.hidden) closeDrawer();
    }
    if (!modal.hidden) {
      if (e.key === "ArrowRight") modalStep(1);
      if (e.key === "ArrowLeft") modalStep(-1);
    } else if (!lightbox.hidden) {
      if (e.key === "ArrowRight") lbStep(1);
      if (e.key === "ArrowLeft") lbStep(-1);
    }
  });

  /* =====================================
     SERVICES RENDERING
     ===================================== */
  const SERVICE_ICONS = {
    card: '<path fill="currentColor" d="M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1.5.9L12 18.6l-6.5 3.3A1 1 0 0 1 4 21V3a1 1 0 0 1 1-1Zm1 2v15.4l5.5-2.8a1 1 0 0 1 1 0l5.5 2.8V4H6Z"/>',
    ring: '<path fill="currentColor" d="m12 2 3 3-3 3-3-3 3-3Zm0 7a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"/>',
    glass: '<path fill="currentColor" d="M7 2h10l-1 8a4 4 0 0 1-3 3.9V20h3v2H8v-2h3v-6.1A4 4 0 0 1 8 10L7 2Zm2.2 2 .3 3h5l.3-3H9.2Z"/>',
    calendar: '<path fill="currentColor" d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1ZM5 9v11h14V9H5Zm3 3h3v3H8v-3Z"/>',
    heart: '<path fill="currentColor" d="M12 21s-7.5-4.9-10-9.3C.3 8.6 2.2 5 5.6 5c2 0 3.4 1.1 4.4 2.6h4C15 6.1 16.4 5 18.4 5c3.4 0 5.3 3.6 3.6 6.7C19.5 16.1 12 21 12 21Z"/>',
    pen: '<path fill="currentColor" d="M14.1 4.9 19 9.9 8 21H3v-5L14.1 4.9Zm1.4-1.4 2-2a1 1 0 0 1 1.4 0l3.6 3.6a1 1 0 0 1 0 1.4l-2 2-5-5Z"/>',
    sparkle: '<path fill="currentColor" d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Zm7 12 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z"/>'
  };
  $("#servicesGrid").innerHTML = services
    .map(
      (s, i) => `
      <div class="service reveal ${i % 4 ? "d-" + (i % 4) : ""}">
        <span class="service__icon">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${SERVICE_ICONS[s.icon] || SERVICE_ICONS.card}</svg>
        </span>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
      </div>`
    )
    .join("");
  observeReveals($("#servicesGrid"));

  /* Final sync */
  updateSavedUI();
})();
