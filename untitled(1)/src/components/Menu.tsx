import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Download, ExternalLink, Printer } from 'lucide-react';
import FoodCarousel from './FoodCarousel';

type MenuCategory = 'Combos' | 'Starters' | 'Main Course' | 'Neapolitan Pizzas' | 'Pasta & Snacks' | 'Sushi & Asian' | 'Rice & Breads' | 'Beverages';

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  isVeg?: boolean;
}

const MENU_DATA: Record<MenuCategory, MenuItem[]> = {
  Combos: [
    { name: 'Veg Combo 1', desc: 'Dal Makhani [1 kg] + 4 Laccha Paratha + 4 Garlic Naan + Gulab Jamun [4 Pcs]', price: '₹699', isVeg: true },
    { name: 'Veg Combo 2', desc: 'Kadhai Paneer [1 kg] + 4 Laccha Paratha + 4 Garlic Naan + Gulab Jamun [4 Pcs]', price: '₹749', isVeg: true },
    { name: 'Veg Combo 3', desc: 'Paneer Lababdar [1 kg] + 4 Laccha Paratha + 4 Garlic Naan + Gulab Jamun [4 Pcs]', price: '₹799', isVeg: true },
    { name: 'Non Veg Combo 1', desc: 'Kadhai Chicken [1 kg] + 4 Laccha Paratha + 4 Garlic Naan + Gulab Jamun [4 Pcs]', price: '₹899', isVeg: false },
    { name: 'Non Veg Combo 2', desc: 'Butter Chicken [1 kg] + 4 Laccha Paratha + 4 Garlic Naan + Gulab Jamun [4 Pcs]', price: '₹949', isVeg: false },
  ],
  Starters: [
    { name: 'Dahi Ke Kebab', desc: 'Melt-in-mouth spiced yogurt patties with mint chutney', price: '₹425', isVeg: true },
    { name: 'Tandoori Paneer Tikka', desc: 'Clay oven roasted cottage cheese with bell peppers', price: '₹475', isVeg: true },
    { name: 'Crispy Lotus Stem', desc: 'Honey chili glaze, sesame seeds & scallions', price: '₹450', isVeg: true },
    { name: 'Honey Chilli Potato', desc: 'Crispy potato fries tossed in sweet & spicy sauce', price: '₹395', isVeg: true },
    { name: 'Classic Chicken Tikka', desc: 'Boneless chicken marinated in tandoori spices', price: '₹575', isVeg: false },
    { name: 'Murgh Malai Tikka', desc: 'Rich cream & cheese marinated tender chicken', price: '₹595', isVeg: false },
    { name: 'Dynamite Prawns', desc: 'Crispy fried prawns in spicy sriracha glaze', price: '₹750', isVeg: false },
    { name: 'Chilli Chicken Dry', desc: 'Indo-Chinese style tossed chicken with garlic', price: '₹545', isVeg: false },
  ],
  'Main Course': [
    { name: 'Dal Makhani', desc: '24-hr slow cooked black lentils with butter & cream', price: '₹525', isVeg: true },
    { name: 'Kadhai Paneer', desc: 'Cottage cheese with bell peppers & pounded spices', price: '₹575', isVeg: true },
    { name: 'Paneer Lababdar', desc: 'Soft paneer in rich tomato-onion gravy', price: '₹595', isVeg: true },
    { name: 'Butter Chicken', desc: 'Smoked chicken tikka in velvet tomato gravy', price: '₹675', isVeg: false },
    { name: 'Kadhai Chicken', desc: 'Traditional spiced chicken in a rich wok gravy', price: '₹645', isVeg: false },
    { name: 'Mutton Rogan Josh', desc: 'Slow cooked tender lamb in aromatic Kashmiri spices', price: '₹745', isVeg: false },
  ],
  'Neapolitan Pizzas': [
    { name: 'Margherita Neapolitan', desc: 'San Marzano sauce, fresh mozzarella & basil', price: '₹525', isVeg: true },
    { name: 'Paneer Tikka Pizza', desc: 'Tandoori paneer, red onions, jalapenos & mint swirl', price: '₹575', isVeg: true },
    { name: 'Exotic Mushroom Truffle Pizza', desc: 'Wild mushrooms, mozzarella & truffle oil drizzle', price: '₹625', isVeg: true },
    { name: 'Pepperoni & Chicken Pizza', desc: 'Spicy chicken sausage, pepperoni & mozzarella', price: '₹675', isVeg: false },
  ],
  'Pasta & Snacks': [
    { name: 'Penne Arrabbiata', desc: 'Spicy garlic tomato sauce with black olives & basil', price: '₹475', isVeg: true },
    { name: 'Alfredo White Sauce Pasta', desc: 'Creamy parmesan sauce with garlic crostini', price: '₹495', isVeg: true },
    { name: 'French Fries / Peri Peri Fries', desc: 'Crispy golden fries served with spicy mayo dip', price: '₹295', isVeg: true },
    { name: 'Loaded Cheese Nachos', desc: 'Tortilla chips, melted cheese blend, salsa & jalapenos', price: '₹375', isVeg: true },
  ],
  'Sushi & Asian': [
    { name: 'Veg California Sushi Roll', desc: 'Avocado, cucumber, asparagus & toasted sesame', price: '₹545', isVeg: true },
    { name: 'Exotic Mushroom Sushi Roll', desc: 'Shiitake, enoki, spicy mayo & tempura crunch', price: '₹595', isVeg: true },
    { name: 'Spicy Salmon Roll', desc: 'Fresh salmon, nori wrap, chili sauce & scallions', price: '₹675', isVeg: false },
    { name: 'Chicken Teriyaki Roll', desc: 'Grilled chicken, teriyaki glaze & cucumber', price: '₹625', isVeg: false },
  ],
  'Rice & Breads': [
    { name: 'Chicken Dum Biryani', desc: 'Hyderabadi layered chicken biryani with mirchi ka salan', price: '₹595', isVeg: false },
    { name: 'Veg Dum Biryani', desc: 'Fragrant basmati rice slow cooked with fresh veggies', price: '₹475', isVeg: true },
    { name: 'Garlic Naan / Butter Naan', desc: 'Tandoori baked leavened bread with garlic butter', price: '₹125', isVeg: true },
    { name: 'Cheese Stuffed Kulcha', desc: 'Molten cheese stuffed tandoori bread', price: '₹165', isVeg: true },
  ],
  Beverages: [
    { name: 'Levernasia Craft Cocktail', desc: 'Gin, elderflower, fresh rosemary & tonic', price: '₹650' },
    { name: 'Smoked Bourbon Old Fashioned', desc: 'Oakwood infused bourbon, bitters & orange zest', price: '₹695' },
    { name: 'Fresh Lime Soda / Cold Coffee', desc: 'Chilled refreshing citrus soda or rich blended espresso', price: '₹225', isVeg: true },
    { name: 'Red Bull Energy Drink', desc: 'Chilled energy booster', price: '₹250', isVeg: true },
  ],
};

const PARTNER_LINKS = [
  {
    name: 'Zomato',
    url: 'https://www.zomato.com/ncr/levernasia-lounge-bar-sector-38-noida/order',
    badge: 'Order Online',
    color: 'bg-black/90 hover:bg-red-950/40 text-white border-2 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.25)]',
    badgeClass: 'bg-red-950/80 text-red-300 border border-red-500/40',
  },
  {
    name: 'Swiggy',
    url: 'https://www.swiggy.com/swiggy-diners/?v=1&af_dp=swiggydiners%3A%2F%2Fdetails%2F597733%3Fsource%3D',
    badge: 'Order / Diners',
    color: 'bg-black/90 hover:bg-orange-950/40 text-white border-2 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.25)]',
    badgeClass: 'bg-orange-950/80 text-orange-300 border border-orange-500/40',
  },
  {
    name: 'Dineout',
    url: 'https://www.swiggy.com/swiggy-diners/?v=1&af_dp=swiggydiners%3A%2F%2Fdetails%2F597733%3Fsource%3D',
    badge: 'Book & Offers',
    color: 'bg-black/90 hover:bg-rose-950/40 text-white border-2 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.25)]',
    badgeClass: 'bg-rose-950/80 text-rose-300 border border-rose-500/40',
  },
  {
    name: 'EazyDiner',
    url: 'https://www.eazydiner.com/delhi-ncr/levernasia-gardens-galleria-mall-sector-38-noida-698519',
    badge: 'VIP Booking',
    color: 'bg-black/90 hover:bg-amber-950/40 text-white border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
    badgeClass: 'bg-amber-950/80 text-amber-300 border border-amber-500/40',
  },
  {
    name: 'District',
    url: 'https://www.district.in/dining/ncr/levernasia-lounge-bar-sector-38-noida/book?utm_source=rwg',
    badge: 'Reserve Table',
    color: 'bg-black/90 hover:bg-emerald-950/40 text-white border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
    badgeClass: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40',
  },
];

export default function Menu() {
  const [activeTab, setActiveTab] = useState<MenuCategory>('Combos');
  const [filter, setFilter] = useState<'All' | 'Veg' | 'Non-Veg'>('All');

  const categories: MenuCategory[] = [
    'Combos',
    'Starters',
    'Main Course',
    'Neapolitan Pizzas',
    'Pasta & Snacks',
    'Sushi & Asian',
    'Rice & Breads',
    'Beverages',
  ];

  const displayedItems = MENU_DATA[activeTab].filter((item) => {
    if (filter === 'All') return true;
    if (filter === 'Veg') return item.isVeg === true;
    if (filter === 'Non-Veg') return item.isVeg === false;
    return true;
  });

  const handleDownloadPDFMenu = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to view and print the PDF Menu.');
      return;
    }

    const menuHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Levernasia Bar & Club - Official Menu</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #111; background: #fff; }
          .header { text-align: center; border-bottom: 3px solid #dc2626; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { font-size: 32px; letter-spacing: 3px; margin: 0; color: #dc2626; text-transform: uppercase; }
          .header p { margin: 5px 0 0 0; color: #555; font-size: 14px; }
          .section-title { font-size: 20px; text-transform: uppercase; border-bottom: 2px solid #222; padding-bottom: 5px; margin-top: 30px; color: #dc2626; }
          .item { display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px dashed #ccc; padding-bottom: 8px; }
          .item-name { font-weight: bold; font-size: 16px; }
          .item-desc { font-size: 13px; color: #666; margin-top: 3px; }
          .item-price { font-weight: bold; font-size: 16px; color: #dc2626; font-family: monospace; }
          .veg { color: #16a34a; font-size: 12px; margin-left: 6px; }
          .nonveg { color: #dc2626; font-size: 12px; margin-left: 6px; }
          .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #ddd; padding-top: 20px; }
          @media print {
            body { padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="text-align: right; margin-bottom: 20px;">
          <button onclick="window.print()" style="background: #dc2626; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer;">
            🖨️ Save as PDF / Print
          </button>
        </div>

        <div class="header">
          <h1>LEVERNASIA</h1>
          <p>Gardens Galleria Mall, Sector 38, Noida • VIP Desk: +91 74289 64646</p>
          <p>Opening Hours: Everyday 12:00 PM – 1:00 AM</p>
        </div>

        ${Object.entries(MENU_DATA)
          .map(
            ([catName, items]) => `
          <div class="section-title">${catName}</div>
          ${items
            .map(
              (i) => `
            <div class="item">
              <div>
                <div class="item-name">
                  ${i.name}
                  ${i.isVeg === true ? '<span class="veg">[VEG]</span>' : ''}
                  ${i.isVeg === false ? '<span class="nonveg">[NON-VEG]</span>' : ''}
                </div>
                <div class="item-desc">${i.desc}</div>
              </div>
              <div class="item-price">${i.price}</div>
            </div>
          `
            )
            .join('')}
        `
          )
          .join('')}

        <div class="footer">
          <p>© ${new Date().getFullYear()} Levernasia Bar & Club • Prices are exclusive of applicable taxes and service charge.</p>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(menuHTML);
    printWindow.document.close();
  };

  return (
    <section id="menu" className="py-24 bg-zinc-950 relative border-t border-red-600/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-red-500 font-bold tracking-widest uppercase mb-2 text-xs flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-red-600"></span>
            Culinary Arts
            <span className="w-8 h-[1px] bg-red-600"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase text-white mb-4 font-serif tracking-wide">
            Our Gourmet Menu
          </h3>
          <p className="text-zinc-400 font-light max-w-2xl mx-auto text-sm sm:text-base">
            From signature combos and succulent star appetizers to artisanal Neapolitan pizzas and chef specials.
          </p>
        </motion.div>

        <FoodCarousel />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-red-600/20 pb-6 mb-8 mt-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  'px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all border font-serif',
                  activeTab === cat
                    ? 'border-red-500 bg-red-950/80 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                    : 'border-zinc-800 bg-black/40 text-zinc-400 hover:text-white hover:border-zinc-700'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Veg / Non-Veg Filters */}
          <div className="flex bg-black/80 border border-red-600/30 rounded-xl p-1 shrink-0">
            {['All', 'Veg', 'Non-Veg'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={cn(
                  'px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all',
                  filter === f
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                    : 'text-zinc-400 hover:text-white'
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6"
            >
              {displayedItems.length === 0 ? (
                <div className="col-span-2 text-zinc-500 text-center py-10 italic">
                  No items found for this filter selection.
                </div>
              ) : (
                displayedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start border-b border-red-950/80 pb-4 group hover:border-red-600/40 transition-colors"
                  >
                    <div className="pr-4">
                      <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2 font-serif">
                        {item.name}
                        {item.isVeg === true && (
                          <span
                            className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shrink-0"
                            title="Vegetarian"
                          />
                        )}
                        {item.isVeg === false && (
                          <span
                            className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block shrink-0"
                            title="Non-Vegetarian"
                          />
                        )}
                      </h4>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="text-red-400 font-black text-lg whitespace-nowrap font-mono">
                      {item.price}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Working PDF Menu Download Button */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleDownloadPDFMenu}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black uppercase tracking-wider text-xs flex items-center gap-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] border border-red-400/30 active:scale-95"
          >
            <Download size={18} />
            <span>Download / Print PDF Menu</span>
          </button>
        </div>

        {/* Official Partner Links Bar */}
        <div className="mt-20 pt-16 border-t border-red-600/20 text-center">
          <h4 className="text-lg font-bold uppercase text-white mb-2 tracking-wider font-serif">
            Order Online & Reserve Table Via Official Partners
          </h4>
          <p className="text-zinc-400 text-xs mb-8">
            Click any platform below to place your order or book your table directly
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto">
            {PARTNER_LINKS.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  'px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all active:scale-95',
                  partner.color
                )}
              >
                <span>{partner.name}</span>
                <span className={cn('text-[10px] px-2 py-0.5 rounded font-semibold', partner.badgeClass)}>
                  {partner.badge}
                </span>
                <ExternalLink size={14} className="opacity-80" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

