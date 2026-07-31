/* ==========================================================================
   CHANDAN CARDS & WEDDING PLANNER — CENTRAL DATA FILE
   --------------------------------------------------------------------------
   EVERYTHING the owner may need to edit lives in THIS file:
     1. businessInfo   → name, phone, WhatsApp, address, maps link
     2. cardSamples    → the complete card catalogue (add/edit cards here)
     3. galleryImages  → business / shop photos
     4. services       → services shown on the website
   Nothing else in the code needs to be touched.
   ========================================================================== */

/* =====================================
   1. BUSINESS INFORMATION
   Change phone / address / maps in ONE place only.
   ===================================== */
const businessInfo = {
  name: "Chandan Cards & Wedding Planner",
  tagline: "Wedding Cards • Invitations • Event Planning",
  phone: "09234680825",              // shown to customers
  phoneDial: "+919234680825",        // used for tel: links
  whatsapp: "919234680825",          // international format, no + or spaces
  address:
    "Shop No 1, Refugee Market, New Kalimati Road, Sakchi, near Lakshmi Store, Jamshedpur, Jharkhand 831001",
  city: "Jamshedpur",
  area: "Sakchi",
  state: "Jharkhand",
  postalCode: "831001",
  // Google Maps link — replace with the exact share link if you have one.
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Chandan Cards & Wedding Planner, Shop No 1, Refugee Market, New Kalimati Road, Sakchi, Jamshedpur, Jharkhand 831001"
    )
};

/* =====================================
   CHANDAN CARDS — CARD CATALOGUE
   ADD NEW CARD SAMPLES HERE
   =====================================
   To add a card, copy any block below, give it a NEW unique id
   (CC-016, CC-017 ...) and paste the direct image URL into `image`.
   Optional: `download` — a separate high-quality file URL.
   If `image` is left "" the site shows an elegant placeholder,
   so nothing ever looks broken.
   ===================================== */
const cardSamples = [
  {
    id: "CC-001",
    title: "Royal Wedding Invitation",
    category: "Wedding",
    image: "", // PASTE CARD IMAGE URL HERE
    download: "",
    description:
      "Elegant traditional wedding invitation with a rich, royal layout — perfect for grand celebrations.",
    tags: ["Wedding", "Traditional", "Royal"],
    featured: true
  },
  {
    id: "CC-002",
    title: "Elegant Floral Wedding Card",
    category: "Wedding",
    image: "", // PASTE CARD IMAGE URL HERE
    download: "",
    description:
      "Soft floral artwork with graceful typography for a timeless wedding invitation.",
    tags: ["Wedding", "Floral", "Elegant"],
    featured: true
  },
  {
    id: "CC-003",
    title: "Traditional Wedding Card",
    category: "Traditional",
    image: "", // PASTE CARD IMAGE URL HERE
    download: "",
    description:
      "Classic Indian wedding card design with traditional motifs and warm tones.",
    tags: ["Wedding", "Traditional", "Classic"],
    featured: false
  },
  {
    id: "CC-004",
    title: "Premium Luxury Invitation",
    category: "Luxury",
    image: "", // PASTE CARD IMAGE URL HERE
    download: "",
    description:
      "A premium luxury invitation with refined detailing for couples who want something special.",
    tags: ["Wedding", "Luxury", "Premium"],
    featured: true
  },
  {
    id: "CC-005",
    title: "Modern Minimal Wedding Card",
    category: "Modern",
    image: "", // PASTE CARD IMAGE URL HERE
    download: "",
    description:
      "Clean, contemporary invitation design with minimal styling and modern typography.",
    tags: ["Wedding", "Modern", "Minimal"],
    featured: false
  },
  {
    id: "CC-006",
    title: "Engagement Invitation Card",
    category: "Engagement",
    image: "", // PASTE CARD IMAGE URL HERE
    download: "",
    description:
      "A graceful invitation designed for engagement and ring ceremonies.",
    tags: ["Engagement", "Elegant", "Ceremony"],
    featured: false
  },
  {
    id: "CC-007",
    title: "Royal Heritage Wedding Card",
    category: "Luxury",
    image: "", // PASTE CARD IMAGE URL HERE
    download: "",
    description:
      "Heritage-inspired royal design with ornate borders and a majestic feel.",
    tags: ["Wedding", "Royal", "Luxury", "Traditional"],
    featured: true
  },
  {
    id: "CC-008",
    title: "Reception Invitation Card",
    category: "Reception",
    image: "", // PASTE CARD IMAGE URL HERE
    download: "",
    description:
      "Beautiful reception invitation to welcome guests to your celebration.",
    tags: ["Reception", "Wedding", "Elegant"],
    featured: false
  },
  {
    id: "CC-009",
    title: "Classic Ivory Wedding Card",
    category: "Wedding",
    image: "", // PASTE CARD IMAGE URL HERE
    download: "",
    description:
      "Timeless ivory invitation with delicate accents — simple, warm and elegant.",
    tags: ["Wedding", "Classic", "Ivory", "Minimal"],
    featured: false
  },
  {
    id: "CC-010",
    title: "Designer Wedding Invitation",
    category: "Modern",
    image: "", // PASTE CARD IMAGE URL HERE
    download: "",
    description:
      "A designer invitation blending modern layout with festive Indian character.",
    tags: ["Wedding", "Modern", "Designer"],
    featured: false
  },
  {
    id: "CC-011",
    title: "Traditional Puja Invitation",
    category: "Puja",
    image: "", // PASTE CARD IMAGE URL HERE
    download: "",
    description:
      "Auspicious invitation card designed for puja and religious ceremonies.",
    tags: ["Puja", "Traditional", "Ceremony"],
    featured: false
  },
  {
    id: "CC-012",
    title: "Golden Accent Wedding Card",
    category: "Luxury",
    image: "", // PASTE CARD IMAGE URL HERE
    download: "",
    description:
      "Warm golden accents over a premium base — festive yet sophisticated.",
    tags: ["Wedding", "Luxury", "Gold"],
    featured: false
  },
  {
    id: "CC-013",
    title: "Anniversary Celebration Card",
    category: "Anniversary",
    image: "", // PASTE CARD IMAGE URL HERE
    download: "",
    description:
      "A charming invitation for anniversary celebrations and milestone moments.",
    tags: ["Anniversary", "Celebration", "Elegant"],
    featured: false
  },
  {
    id: "CC-014",
    title: "Birthday Invitation Card",
    category: "Birthday",
    image: "", // PASTE CARD IMAGE URL HERE
    download: "",
    description:
      "A cheerful, well-designed invitation for birthday parties and celebrations.",
    tags: ["Birthday", "Celebration", "Party"],
    featured: false
  },
  {
    id: "CC-015",
    title: "Premium Invitation Suite",
    category: "Luxury",
    image: "", // PASTE CARD IMAGE URL HERE
    download: "",
    description:
      "A complete premium invitation style for couples who want their card to make an impression.",
    tags: ["Wedding", "Luxury", "Premium", "Suite"],
    featured: false
  }
];

/* =====================================
   CATEGORIES — shown as filter chips.
   Keep "All Cards" first. Add/remove freely.
   ===================================== */
const cardCategories = [
  "All Cards",
  "Wedding",
  "Engagement",
  "Reception",
  "Birthday",
  "Anniversary",
  "Puja",
  "Traditional",
  "Modern",
  "Luxury",
  "Minimal",
  "Other Events"
];

/* =====================================
   3. BUSINESS / SHOP GALLERY PHOTOS
   PASTE the 11 shop photo URLs into `image` below.
   `alt` is used for accessibility & SEO.
   ===================================== */
const galleryImages = [
  { image: "", alt: "Chandan Cards & Wedding Planner shop front in Sakchi, Jamshedpur" },
  { image: "", alt: "Wedding card display inside Chandan Cards, Sakchi" },
  { image: "", alt: "Collection of wedding invitation cards at Chandan Cards" },
  { image: "", alt: "Premium invitation card samples on display" },
  { image: "", alt: "Traditional wedding card designs at the store" },
  { image: "", alt: "Customers browsing invitation designs at Chandan Cards" },
  { image: "", alt: "Luxury wedding invitation samples, Chandan Cards Jamshedpur" },
  { image: "", alt: "Event planning showcase at Chandan Cards & Wedding Planner" },
  { image: "", alt: "Invitation card shelves at the Sakchi shop" },
  { image: "", alt: "Wedding stationery collection at Chandan Cards" },
  { image: "", alt: "Chandan Cards & Wedding Planner store interior" }
];

/* =====================================
   4. SERVICES — edit names/descriptions freely.
   ===================================== */
const services = [
  {
    icon: "card",
    title: "Wedding Invitation Cards",
    text: "Traditional, modern, luxury and customized invitation designs."
  },
  {
    icon: "ring",
    title: "Engagement Invitations",
    text: "Elegant invitations for engagement ceremonies."
  },
  {
    icon: "glass",
    title: "Reception Invitations",
    text: "Beautiful reception invitation designs."
  },
  {
    icon: "calendar",
    title: "Event Planning",
    text: "Professional planning support for memorable celebrations."
  },
  {
    icon: "heart",
    title: "Wedding Planning",
    text: "Complete wedding planning assistance."
  },
  {
    icon: "pen",
    title: "Custom Invitations",
    text: "Personalized designs according to your requirements."
  },
  {
    icon: "sparkle",
    title: "Event Decoration",
    text: "Decoration solutions for celebrations and special events."
  }
];
