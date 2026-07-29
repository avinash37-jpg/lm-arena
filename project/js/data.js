/* ============================================================
   Levernasia – Site Content Data
   ------------------------------------------------------------
   This is the single source of truth for the public website.
   The admin panel (/admin.html) edits this file.
   To go live: upload the updated file via Hostinger File Manager,
   replacing /js/data.js.
   ============================================================ */

window.SITE_DATA = {
  site: {
    brandName: 'Levernasia',
    tagline: 'Where Luxury Food Meets Beats & Vibes',
    subTagline: "Step into Noida's most extravagant bar, dining & lounge. Live DJ sets by DJ Mishi, chef-crafted global cuisine & signature cocktails.",
    phone: '+91 74289 64646',
    whatsapp: '917428964646',
    email: 'info@levernasia.com',
    address: 'Gardens Galleria Mall, Sector 38, Noida, Uttar Pradesh 201301',
    hoursMonThu: '12:00 PM – 1:00 AM',
    hoursFriSat: '12:00 PM – 3:00 AM',
    hoursSun: '12:00 PM – 2:00 AM',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7008.331665766269!2d77.3217906!3d28.564782599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce500441a4949%3A0x918e4c8c83eab8c6!2sLevernasia!5e0!3m2!1sen!2sin!4v1784782058207!5m2!1sen!2sin',
    instagram: 'https://instagram.com/levernasia_la',
    instagramDj: 'https://instagram.com/djmishi_',
    logoUrl: 'https://i.ibb.co/YBLLZ47d/24442826-a344-4187-b351-8734223a49bb.jpg',
    adminPasswordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'
    // ↑ SHA-256 hash of default password "admin123". Admin can change from the panel.
  },
  heroImages: [
    'https://i.ibb.co/1BYn38w/DSC00643.jpg',
    'https://i.ibb.co/0R5F9CBt/DSC00645.jpg',
    'https://i.ibb.co/rRq2c4K7/DSC00629.jpg',
    'https://i.ibb.co/YBNvH4W2/DSC00639.jpg',
    'https://i.ibb.co/HDvDZRGP/DSC00640.jpg'
  ],
  about: {
    headline: 'A Complete Luxury',
    headlineHighlight: 'Nightlife Experience',
    paragraph1: "Located at Gardens Galleria Mall, Sector 38 Noida, Levernasia is Noida's premier lifestyle hub. We seamlessly combine the culinary mastery of fine dining, the sophistication of a high-end cocktail bar, and the raw energy of an elite nightclub.",
    paragraph2: "Whether you're hosting an exclusive birthday bash, a romantic candlelit dinner, or dancing the night away to live sets by resident celebrity DJ Mishi, Levernasia sets the ultimate standard."
  },
  features: [
    { icon: 'Utensils', title: 'Fine Dining', desc: 'Savor gourmet global cuisines and chef-crafted delicacies.' },
    { icon: 'GlassWater', title: 'Mixology Bar', desc: 'Exclusive artisanal cocktails, imported spirits & champagne.' },
    { icon: 'Music', title: 'Nightclub & Lounge', desc: 'Resident DJ Mishi, laser light shows, and electric energy.' }
  ],
  aboutImage: 'https://i.ibb.co/1tvpJM3w/DSC00654.jpg',
  gallery: {
    Ambiance: [
      'https://i.ibb.co/1BYn38w/DSC00643.jpg',
      'https://i.ibb.co/0R5F9CBt/DSC00645.jpg',
      'https://i.ibb.co/1tvpJM3w/DSC00654.jpg',
      'https://i.ibb.co/YBNvH4W2/DSC00639.jpg',
      'https://i.ibb.co/HDvDZRGP/DSC00640.jpg'
    ],
    Crowd: [
      'https://i.ibb.co/BKcbzSS2/DSC00343.jpg',
      'https://i.ibb.co/5gdjFL3V/DSC00344.jpg',
      'https://i.ibb.co/rRq2c4K7/DSC00629.jpg',
      'https://i.ibb.co/mFz7XNqN/DSC00630.jpg',
      'https://i.ibb.co/yFT0ZmRZ/DSC00631.jpg'
    ],
    Bar: [
      'https://i.ibb.co/mF8brb3d/DSC00651.jpg',
      'https://i.ibb.co/tTPq3rNW/DSC00652.jpg',
      'https://i.ibb.co/v6LhjdsT/DSC00653.jpg',
      'https://i.ibb.co/hR17cjRJ/DSC00655.jpg',
      'https://i.ibb.co/tMNNhGxF/DSC00656.jpg'
    ],
    Food: [
      'https://i.ibb.co/4wn1GJVX/Lv-4.png',
      'https://i.ibb.co/HTFF1WKP/LV2.png',
      'https://i.ibb.co/fz1kybTf/Lv5.png',
      'https://i.ibb.co/679PsP3d/Lv8.png',
      'https://i.ibb.co/fznD1Ngv/Lv13.png'
    ]
  },
  foodCarousel: [
    'https://i.ibb.co/4wn1GJVX/Lv-4.png',
    'https://i.ibb.co/HTFF1WKP/LV2.png',
    'https://i.ibb.co/fz1kybTf/Lv5.png',
    'https://i.ibb.co/679PsP3d/Lv8.png',
    'https://i.ibb.co/fznD1Ngv/Lv13.png',
    'https://i.ibb.co/8DQ2mz98/Lv16.png',
    'https://i.ibb.co/G46S1GyK/Lv18.png',
    'https://i.ibb.co/SG1FWJp/Lv19.png'
  ],
  menu: {
    Combos: [
      { name: 'Veg Combo 1', desc: 'Dal Makhani + 4 Laccha Paratha + 4 Garlic Naan + Gulab Jamun', price: '₹699', isVeg: true },
      { name: 'Veg Combo 2', desc: 'Kadhai Paneer + 4 Laccha Paratha + 4 Garlic Naan + Gulab Jamun', price: '₹749', isVeg: true },
      { name: 'Non Veg Combo 1', desc: 'Kadhai Chicken + 4 Laccha Paratha + 4 Garlic Naan + Gulab Jamun', price: '₹899', isVeg: false },
      { name: 'Butter Chicken Combo', desc: 'Butter Chicken + 4 Laccha Paratha + 4 Garlic Naan + Gulab Jamun', price: '₹949', isVeg: false }
    ],
    Starters: [
      { name: 'Dahi Ke Kebab', desc: 'Melt-in-mouth spiced yogurt patties with mint chutney', price: '₹425', isVeg: true },
      { name: 'Tandoori Paneer Tikka', desc: 'Clay oven roasted cottage cheese with bell peppers', price: '₹475', isVeg: true },
      { name: 'Crispy Lotus Stem', desc: 'Honey chili glaze, sesame seeds & scallions', price: '₹450', isVeg: true },
      { name: 'Classic Chicken Tikka', desc: 'Boneless chicken marinated in tandoori spices', price: '₹575', isVeg: false },
      { name: 'Murgh Malai Tikka', desc: 'Rich cream & cheese marinated tender chicken', price: '₹595', isVeg: false },
      { name: 'Dynamite Prawns', desc: 'Crispy fried prawns in spicy sriracha glaze', price: '₹750', isVeg: false }
    ],
    'Main Course': [
      { name: 'Dal Makhani', desc: '24-hr slow cooked black lentils with butter & cream', price: '₹525', isVeg: true },
      { name: 'Kadhai Paneer', desc: 'Cottage cheese with bell peppers & pounded spices', price: '₹575', isVeg: true },
      { name: 'Paneer Lababdar', desc: 'Soft paneer in rich tomato-onion gravy', price: '₹595', isVeg: true },
      { name: 'Butter Chicken', desc: 'Smoked chicken tikka in velvet tomato gravy', price: '₹675', isVeg: false },
      { name: 'Kadhai Chicken', desc: 'Traditional spiced chicken in a rich wok gravy', price: '₹645', isVeg: false },
      { name: 'Mutton Rogan Josh', desc: 'Slow cooked tender lamb in aromatic Kashmiri spices', price: '₹745', isVeg: false }
    ],
    'Neapolitan Pizzas': [
      { name: 'Margherita Neapolitan', desc: 'San Marzano sauce, fresh mozzarella & basil', price: '₹525', isVeg: true },
      { name: 'Paneer Tikka Pizza', desc: 'Tandoori paneer, red onions, jalapenos & mint swirl', price: '₹575', isVeg: true },
      { name: 'Pepperoni & Chicken Pizza', desc: 'Spicy chicken sausage, pepperoni & mozzarella', price: '₹675', isVeg: false }
    ],
    'Pasta & Snacks': [
      { name: 'Penne Arrabbiata', desc: 'Spicy garlic tomato sauce with black olives & basil', price: '₹475', isVeg: true },
      { name: 'Alfredo White Sauce Pasta', desc: 'Creamy parmesan sauce with garlic crostini', price: '₹495', isVeg: true },
      { name: 'French Fries / Peri Peri Fries', desc: 'Crispy golden fries served with spicy mayo dip', price: '₹295', isVeg: true },
      { name: 'Loaded Cheese Nachos', desc: 'Tortilla chips, melted cheese blend, salsa & jalapenos', price: '₹375', isVeg: true }
    ],
    'Sushi & Asian': [
      { name: 'Veg California Sushi Roll', desc: 'Avocado, cucumber, asparagus & toasted sesame', price: '₹545', isVeg: true },
      { name: 'Chicken Teriyaki Roll', desc: 'Grilled chicken, teriyaki glaze & cucumber', price: '₹625', isVeg: false },
      { name: 'Spicy Salmon Roll', desc: 'Fresh salmon, nori wrap, chili sauce & scallions', price: '₹675', isVeg: false }
    ],
    'Rice & Breads': [
      { name: 'Chicken Dum Biryani', desc: 'Hyderabadi layered chicken biryani with mirchi ka salan', price: '₹595', isVeg: false },
      { name: 'Veg Dum Biryani', desc: 'Fragrant basmati rice slow cooked with fresh veggies', price: '₹475', isVeg: true },
      { name: 'Garlic Naan / Butter Naan', desc: 'Tandoori baked leavened bread with garlic butter', price: '₹125', isVeg: true },
      { name: 'Cheese Stuffed Kulcha', desc: 'Molten cheese stuffed tandoori bread', price: '₹165', isVeg: true }
    ],
    Beverages: [
      { name: 'Levernasia Craft Cocktail', desc: 'Gin, elderflower, fresh rosemary & tonic', price: '₹650' },
      { name: 'Smoked Bourbon Old Fashioned', desc: 'Oakwood infused bourbon, bitters & orange zest', price: '₹695' },
      { name: 'Fresh Lime Soda / Cold Coffee', desc: 'Chilled refreshing citrus soda or rich espresso', price: '₹225', isVeg: true },
      { name: 'Red Bull Energy Drink', desc: 'Chilled energy booster', price: '₹250', isVeg: true }
    ]
  },
  drinks: {
    Cocktails: [
      { name: 'Levernasia Smoked Old Fashioned', notes: 'Oak-smoked Bourbon, Angostura bitters, orange zest & maple', price: '₹695', badge: 'Signature' },
      { name: 'Gardens Galleria Sunset', notes: 'Vodka, passion fruit, cranberry, fresh lime & prosecco float', price: '₹650', badge: 'Bestseller' },
      { name: 'Velvet Espresso Martini', notes: 'Vodka, fresh espresso shot, Kahlua & roasted hazelnut', price: '₹625' },
      { name: 'Spiced Botanical Gin Tonic', notes: 'Artisanal Gin, elderflower, fresh rosemary, cucumber & tonic', price: '₹650' },
      { name: 'Fiery Jalapeno Margarita', notes: 'Tequila blanco, triple sec, muddled jalapeno, lime & chili salt rim', price: '₹675' }
    ],
    Mocktails: [
      { name: 'Tropical Paradise Breeze', notes: 'Fresh mango puree, passion fruit, coconut water & mint', price: '₹345', badge: 'Popular' },
      { name: 'Virgin Watermelon Mojito', notes: 'Muddled fresh watermelon, garden mint, lime & sparkling soda', price: '₹345' },
      { name: 'Berry Blast Fizz', notes: 'Crushed blueberries, raspberries, lemon juice & ginger ale', price: '₹375' }
    ],
    Whiskey: [
      { name: 'Glenfiddich 12 Y.O. Single Malt', notes: 'Scotch • Smooth, fruity, pear notes', price: '₹750 / 30ml' },
      { name: 'Macallan Double Cask 12 Y.O.', notes: 'Single Malt Scotch • Honey, citrus & ginger', price: '₹950 / 30ml', badge: 'Premium' },
      { name: 'Jameson Irish Whiskey', notes: 'Triple distilled • Smooth & versatile', price: '₹450 / 30ml' },
      { name: 'Johnnie Walker Black Label', notes: 'Blended Scotch • Rich, dark fruits, vanilla', price: '₹550 / 30ml' }
    ],
    Vodka: [
      { name: 'Grey Goose Original', notes: 'French Premium Vodka • Crisp, clean finish', price: '₹650 / 30ml', badge: 'Top Shelf' },
      { name: 'Absolut Original', notes: 'Swedish Vodka • Raspberry, Mandarin, Citron', price: '₹450 / 30ml' },
      { name: 'Belvedere Vodka', notes: 'Polish Rye Vodka • Subtle vanilla & velvet body', price: '₹695 / 30ml' }
    ],
    Gin: [
      { name: "Hendrick's Gin", notes: 'Infused with cucumber & rose petals', price: '₹650 / 30ml', badge: 'Artisanal' },
      { name: 'Roku Japanese Craft Gin', notes: '6 Japanese botanicals, sakura & yuzu', price: '₹595 / 30ml' },
      { name: 'Bombay Sapphire', notes: '10 exotic botanicals • Vapor infused', price: '₹450 / 30ml' }
    ]
  },
  drinkImages: [
    'https://iili.io/CNtlwNV.png',
    'https://iili.io/CNtlWSj.png',
    'https://iili.io/CNtljAQ.png',
    'https://iili.io/CNtlhHx.png',
    'https://iili.io/CNtlNDB.png',
    'https://iili.io/CNtlviF.png'
  ],
  events: [
    { title: 'Neon Nights w/ DJ Mishi', date: 'Every Friday', time: '9:00 PM Onwards', desc: 'Kick off the weekend with high-energy EDM and commercial hits.', image: 'https://i.ibb.co/BKcbzSS2/DSC00343.jpg' },
    { title: 'Sufi & Bollywood Retro', date: 'Every Wednesday', time: '8:00 PM Onwards', desc: 'A soulful evening featuring live acoustic bands and classic tunes.', image: 'https://i.ibb.co/mFz7XNqN/DSC00630.jpg' },
    { title: 'Sunday Sundowner', date: 'Every Sunday', time: '5:00 PM - 10:00 PM', desc: 'Relaxing techno vibes, special cocktail pitchers, and sunset views.', image: 'https://i.ibb.co/yFT0ZmRZ/DSC00631.jpg' }
  ],
  videos: [],
  reviews: [
    { name: 'Priya Sharma', rating: 5, text: 'Amazing vibe, great music by DJ Mishi, and the cocktails are on point! The VIP service was top-notch.', date: '2 weeks ago' },
    { name: 'Rahul Verma', rating: 5, text: 'Best nightlife in Noida. Food was surprisingly excellent, especially the Butter Chicken and Sushi.', date: '1 month ago' },
    { name: 'Anjali Kapoor', rating: 5, text: 'Celebrated my birthday here and the staff made it unforgettable. Decor and ambience are gorgeous!', date: '3 weeks ago' },
    { name: 'Vikram Singh', rating: 5, text: 'The neon lights, the music, the crowd – everything was perfect for a Saturday night out.', date: '2 months ago' },
    { name: 'Neha Gupta', rating: 5, text: 'Loved the signature cocktails and the lounge area. Will definitely be back!', date: '1 week ago' },
    { name: 'Arjun Mehta', rating: 4, text: 'Great place to party in NCR. Music is loud and fun, drinks are well made.', date: '1 month ago' }
  ],
  instagramPosts: {
    levernasia: [
      { shortcode: 'Da7hsOvP2fR', type: 'reel' },
      { shortcode: 'DbGEWy7PN6v', type: 'post' },
      { shortcode: 'DbBOiw7D96y', type: 'post' }
    ],
    djmishi: [
      { shortcode: 'DbDg2k7IpcQ', type: 'reel' },
      { shortcode: 'DavBjhJgvYl', type: 'reel' },
      { shortcode: 'Dap3Taxgo-9', type: 'reel' }
    ]
  }
};
