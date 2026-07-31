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
   (CC-016, CC-017 ...) and save the card photo as
   images/cards/CC-016.jpg  (filename = card ID).
   Optional: `download` — a separate high-quality file URL.
   If an image file is missing the site shows an elegant placeholder,
   so nothing ever looks broken.
   ===================================== */
const cardSamples = [
  {
    id: "CC-001",
    title: "Royal Jharokha Wedding Card",
    category: "Luxury",
    image: "images/cards/CC-001.jpg",
    download: "",
    description:
      "Lattice-cut jharokha style cover with an ornate gold oval frame and a regal bride-and-groom artwork, set against a floral lantern backdrop.",
    tags: ["Wedding", "Royal", "Traditional", "Luxury", "Couple", "Lattice"],
    featured: true
  },
  {
    id: "CC-002",
    title: "Vintage Rose Ganesha Card",
    category: "Traditional",
    image: "images/cards/CC-002.jpg",
    download: "",
    description:
      "Ivory invitation wrapped in vintage peach and pink roses with a gold filigree border and a Ganesha emblem framed by a ring of flowers.",
    tags: ["Wedding", "Traditional", "Floral", "Ganesha", "Roses"],
    featured: true
  },
  {
    id: "CC-003",
    title: "Gold Vine Minimal Invitation",
    category: "Minimal",
    image: "images/cards/CC-003.jpg",
    download: "",
    description:
      "A refined blush square card covered in fine gold-line floral vines with an antique metal Ganesha accent — understated and elegant.",
    tags: ["Wedding", "Minimal", "Modern", "Gold", "Ganesha", "Elegant"],
    featured: true
  },
  {
    id: "CC-004",
    title: "Blossom Crest Wedding Card",
    category: "Traditional",
    image: "images/cards/CC-004.jpg",
    download: "",
    description:
      "Soft beige card bordered with cream wildflowers and eucalyptus leaves, centred on a gold crest holding a Ganesha motif.",
    tags: ["Wedding", "Floral", "Traditional", "Ganesha", "Pastel"],
    featured: false
  },
  {
    id: "CC-005",
    title: "Krishna Melody Wedding Card",
    category: "Traditional",
    image: "images/cards/CC-005.jpg",
    download: "",
    description:
      "Powder-blue invitation featuring Krishna with his flute in rich gold foil detail, paired with a royal blue couple panel — serene and majestic.",
    tags: ["Wedding", "Traditional", "Krishna", "Blue", "Gold Foil", "Royal"],
    featured: true
  },
  {
    id: "CC-006",
    title: "Cherry Blossom Laser-Cut Card",
    category: "Modern",
    image: "images/cards/CC-006.jpg",
    download: "",
    description:
      "Peach-pink laser-cut lattice card blooming with cherry blossoms and a ribbon-tied insert — a fresh, contemporary style.",
    tags: ["Wedding", "Modern", "Floral", "Laser Cut", "Pink", "Pastel"],
    featured: false
  },
  {
    id: "CC-007",
    title: "Royal Darbar Boxed Invitation",
    category: "Luxury",
    image: "images/cards/CC-007.jpg",
    download: "",
    description:
      "Sky-blue boxed invitation with a royal couple beneath a Mughal arch, flanked by caparisoned elephants and finished with a golden tassel.",
    tags: ["Wedding", "Luxury", "Royal", "Boxed", "Elephants", "Tassel"],
    featured: true
  },
  {
    id: "CC-008",
    title: "Radha Krishna Clouds Invitation",
    category: "Luxury",
    image: "images/cards/CC-008.jpg",
    download: "",
    description:
      "Dreamy blush card with Radha and Krishna rendered in gold foil above the clouds, with peacock pillars and a rose-wreathed monogram.",
    tags: ["Wedding", "Luxury", "Radha Krishna", "Gold Foil", "Premium"],
    featured: false
  },
  {
    id: "CC-009",
    title: "Pichwai Heritage Wedding Card",
    category: "Luxury",
    image: "images/cards/CC-009.jpg",
    download: "",
    description:
      "Museum-style pichwai artwork of Radha Krishna under golden temple arches with sacred cows — a heritage keepsake invitation.",
    tags: ["Wedding", "Luxury", "Traditional", "Pichwai", "Radha Krishna", "Royal", "Heritage"],
    featured: false
  },
  {
    id: "CC-010",
    title: "Garden Ribbon Laser-Cut Card",
    category: "Wedding",
    image: "images/cards/CC-010.jpg",
    download: "",
    description:
      "Peach invitation with painted dahlias, gold-foiled laser-cut florals and a ribbon-bound insert with name cut-out panel — suits nikah, walima and reception invites.",
    tags: ["Wedding", "Floral", "Laser Cut", "Ribbon", "Nikah", "Walima", "Reception"],
    featured: false
  },
  {
    id: "CC-012",
    title: "Baraat Procession Invitation",
    category: "Traditional",
    image: "images/cards/CC-012.jpg",
    download: "",
    description:
      "A grand baraat procession with elephants and royal attendants around a white jaali balcony, crowned with a Ganesha medallion.",
    tags: ["Wedding", "Traditional", "Royal", "Baraat", "Elephants", "Jaali"],
    featured: false
  },
  {
    id: "CC-013",
    title: "Royal Couple Portrait Card",
    category: "Wedding",
    image: "images/cards/CC-013.jpg",
    download: "",
    description:
      "Elegant mauve-toned portrait of a royal couple framed by palace arches, roses and a gold Ganesha crest.",
    tags: ["Wedding", "Royal", "Couple", "Traditional", "Elegant"],
    featured: false
  },
  {
    id: "CC-014",
    title: "Golden Emboss Classic Card",
    category: "Traditional",
    image: "images/cards/CC-014.jpg",
    download: "",
    description:
      "Peach card with embossed texture, golden cross-jaal pattern, foiled floral corners and a black-and-gold calligraphy medallion — a timeless classic for weddings, nikah and walima.",
    tags: ["Wedding", "Traditional", "Classic", "Gold", "Emboss", "Nikah", "Walima"],
    featured: false
  },
  {
    id: "CC-015",
    title: "Shubh Aarambh Radha Krishna Card",
    category: "Traditional",
    image: "images/cards/CC-015.jpg",
    download: "",
    description:
      "Vibrant sunset-orange invitation pairing a blessing Ganesha with a beautifully painted Radha Krishna — festive and auspicious.",
    tags: ["Wedding", "Traditional", "Radha Krishna", "Ganesha", "Vibrant", "Orange"],
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
   Save the 11 shop photos into  images/gallery/  using the
   filenames below (see images/gallery/README.md for the
   photo-to-filename mapping table).
   `alt` is used for accessibility & SEO.
   ===================================== */
const galleryImages = [
  {
    image: "images/gallery/g-01.jpg",
    alt: "Chandan Cards shop front at night with glowing sign, Refugee Market, Sakchi, Jamshedpur"
  },
  {
    image: "images/gallery/g-02.jpg",
    alt: "Daytime view of Chandan Cards & Wedding Planner storefront with card display windows, Sakchi"
  },
  {
    image: "images/gallery/g-03.jpg",
    alt: "Wedding card sample display wall inside Chandan Cards, Sakchi"
  },
  {
    image: "images/gallery/g-04.jpg",
    alt: "Card catalogue counter with organised sample boxes at Chandan Cards"
  },
  {
    image: "images/gallery/g-05.jpg",
    alt: "Booking desk and lit card display cabinets inside Chandan Cards"
  },
  {
    image: "images/gallery/g-06.jpg",
    alt: "Wedding planning and event decoration showcase lounge at Chandan Cards"
  },
  {
    image: "images/gallery/g-07.jpg",
    alt: "Red and gold Ganesha wedding card sample at Chandan Cards"
  },
  {
    image: "images/gallery/g-08.jpg",
    alt: "Silver and gold lattice-cut wedding invitation samples at Chandan Cards"
  },
  {
    image: "images/gallery/g-09.jpg",
    alt: "Floral rose-gold wedding invitation sample at Chandan Cards"
  }
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
