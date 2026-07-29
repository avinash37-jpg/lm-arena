import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Download, GlassWater, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

// High resolution drink images for the carousel
const DRINK_IMAGES = [
  'https://iili.io/CNtlwNV.png',
  'https://iili.io/CNtlWSj.png',
  'https://iili.io/CNtljAQ.png',
  'https://iili.io/CNtlhHx.png',
  'https://iili.io/CNtlNDB.png',
  'https://iili.io/CNtlviF.png',
  'https://iili.io/CNtlSKg.png',
  'https://iili.io/CNtlUla.png',
  'https://iili.io/CNtlgUJ.png',
  'https://iili.io/CNtl4Hv.png',
  'https://iili.io/CNtl6RR.png',
  'https://iili.io/CNtlPNp.png',
  'https://iili.io/CNtliDN.png',
  'https://iili.io/CNtlLxI.png',
  'https://iili.io/CNtlQVt.png',
  'https://iili.io/CNtlDfn.png',
  'https://iili.io/CNtlbls.png',
  'https://iili.io/CNtlmUG.png',
  'https://iili.io/CNt09R4.png',
  'https://iili.io/CNt0HOl.png',
  'https://iili.io/CNt0Jb2.png',
  'https://iili.io/CNt02xS.png',
  'https://iili.io/CNt03W7.png',
  'https://iili.io/CNt0Fs9.png'
];

interface DrinkItem {
  name: string;
  notes: string;
  price: string;
  badge?: string;
}

const DRINKS_DATA: Record<string, DrinkItem[]> = {
  cocktails: [
    { name: 'Levernasia Smoked Old Fashioned', notes: 'Oak-smoked Bourbon, Angostura bitters, orange zest & maple', price: '₹695', badge: 'Signature' },
    { name: 'Gardens Galleria Sunset', notes: 'Vodka, passion fruit, cranberry, fresh lime & prosecco float', price: '₹650', badge: 'Bestseller' },
    { name: 'Velvet Espresso Martini', notes: 'Vodka, fresh espresso shot, Kahlúa & roasted hazelnut', price: '₹625' },
    { name: 'Spiced Botanical Gin Tonic', notes: 'Artisanal Gin, elderflower, fresh rosemary, cucumber & tonic', price: '₹650' },
    { name: 'Fiery Jalapeño Margarita', notes: 'Tequila blanco, triple sec, muddled jalapeño, lime & chili salt rim', price: '₹675' },
  ],
  mocktails: [
    { name: 'Tropical Paradise Breeze', notes: 'Fresh mango puree, passion fruit, coconut water & mint', price: '₹345', badge: 'Popular' },
    { name: 'Electric Blue Lagoon Zero', notes: 'Blue curaçao syrup, sprite, fresh lime juice & maraschino cherry', price: '₹325' },
    { name: 'Virgin Watermelon Mojito', notes: 'Muddled fresh watermelon, garden mint, lime & sparkling soda', price: '₹345' },
    { name: 'Berry Blast Fizz', notes: 'Crushed blueberries, raspberries, lemon juice & ginger ale', price: '₹375' },
  ],
  whiskey: [
    { name: 'Glenfiddich 12 Y.O. Single Malt', notes: 'Scotch • Smooth, fruity, pear notes', price: '₹750 / 30ml' },
    { name: 'Macallan Double Cask 12 Y.O.', notes: 'Single Malt Scotch • Honey, citrus & ginger', price: '₹950 / 30ml', badge: 'Premium' },
    { name: 'Jameson Irish Whiskey', notes: 'Triple distilled • Smooth & versatile', price: '₹450 / 30ml' },
    { name: 'Johnnie Walker Black Label', notes: 'Blended Scotch • Rich, dark fruits, vanilla', price: '₹550 / 30ml' },
  ],
  vodka: [
    { name: 'Grey Goose Original', notes: 'French Premium Vodka • Crisp, clean finish', price: '₹650 / 30ml', badge: 'Top Shelf' },
    { name: 'Absolut Original / Flavored', notes: 'Swedish Vodka • Raspberry, Mandarin, Citron', price: '₹450 / 30ml' },
    { name: 'Belvedere Vodka', notes: 'Polish Rye Vodka • Subtle vanilla & velvet body', price: '₹695 / 30ml' },
  ],
  gin: [
    { name: 'Hendrick’s Gin', notes: 'Infused with cucumber & rose petals', price: '₹650 / 30ml', badge: 'Artisanal' },
    { name: 'Roku Japanese Craft Gin', notes: '6 Japanese botanicals, sakura & yuzu', price: '₹595 / 30ml' },
    { name: 'Bombay Sapphire', notes: '10 exotic botanicals • Vapor infused', price: '₹450 / 30ml' },
  ],
  wine: [
    { name: 'Sula Cabernet Shiraz (Red)', notes: 'India • Dark fruits, spices & subtle oak', price: '₹650 / Glass • ₹2800 / Bottle' },
    { name: 'Jacob’s Creek Chardonnay (White)', notes: 'Australia • Citrus, melon & delicate oak', price: '₹700 / Glass • ₹3100 / Bottle' },
    { name: 'Moët & Chandon Brut Imperial', notes: 'Champagne, France • Vibrant, elegant & fruity', price: '₹11500 / Bottle', badge: 'Luxury' },
  ],
  beer: [
    { name: 'Corona Extra (330ml)', notes: 'Imported Mexican Lager • Crisp & refreshing', price: '₹425' },
    { name: 'Hoegaarden White Ale (330ml)', notes: 'Belgian Wheat Beer • Orange peel & coriander', price: '₹450', badge: 'Imported' },
    { name: 'Heineken Lager (330ml)', notes: 'Premium Dutch Pilsner', price: '₹375' },
    { name: 'Kingfisher Ultra Max (330ml)', notes: 'Full-bodied Indian Lager', price: '₹295' },
  ]
};

const CATEGORIES = [
  { id: 'cocktails', label: 'Cocktails' },
  { id: 'mocktails', label: 'Mocktails' },
  { id: 'whiskey', label: 'Whiskey' },
  { id: 'vodka', label: 'Vodka' },
  { id: 'gin', label: 'Gin' },
  { id: 'wine', label: 'Wine & Champagne' },
  { id: 'beer', label: 'Beer' }
];

export default function DrinksCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [activeCategory, setActiveCategory] = useState('cocktails');

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const handleDownloadPDFDrinks = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to view and print the Drinks Menu.');
      return;
    }

    const drinksHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Levernasia Bar & Club - Official Drinks Menu</title>
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
          .badge { font-size: 10px; background: #fef2f2; border: 1px solid #dc2626; color: #dc2626; padding: 2px 6px; border-radius: 4px; margin-left: 6px; text-transform: uppercase; }
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
            🖨️ Save as PDF / Print Drinks Menu
          </button>
        </div>

        <div class="header">
          <h1>LEVERNASIA LIBATIONS</h1>
          <p>Bar • Lounge • Nightlife • Gardens Galleria Mall, Noida</p>
          <p>Over 100+ Premium Cocktails, Single Malts, Artisanal Gins & Imported Beers</p>
        </div>

        ${Object.entries(DRINKS_DATA).map(([catKey, items]) => `
          <div class="section-title">${catKey.toUpperCase()}</div>
          ${items.map(i => `
            <div class="item">
              <div>
                <div class="item-name">
                  ${i.name}
                  ${i.badge ? `<span class="badge">${i.badge}</span>` : ''}
                </div>
                <div class="item-desc">${i.notes}</div>
              </div>
              <div class="item-price">${i.price}</div>
            </div>
          `).join('')}
        `).join('')}

        <div class="footer">
          <p>© ${new Date().getFullYear()} Levernasia Bar & Club • Government statutory taxes & service charges as applicable.</p>
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

    printWindow.document.write(drinksHTML);
    printWindow.document.close();
  };

  const displayedDrinks = DRINKS_DATA[activeCategory] || [];

  return (
    <section id="drinks-menu" className="py-24 bg-black relative border-t border-red-600/30">
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
            Libations & Spirits
            <span className="w-8 h-[1px] bg-red-600"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase text-white mb-4 font-serif tracking-wide">
            Premium Drinks Collection
          </h3>
          <p className="text-zinc-400 font-light text-base sm:text-lg">
            100+ Signature Cocktails, Mocktails, Single Malts & Fine Wines
          </p>
        </motion.div>

        {/* Drinks Carousel */}
        <div className="relative mb-16 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest font-serif flex items-center gap-1.5">
              <Sparkles size={14} /> Tap or Swipe to Explore Cocktail Gallery
            </span>
            <div className="flex gap-2">
              <button 
                onClick={scrollPrev} 
                disabled={!canScrollPrev}
                className="p-2.5 border border-red-600/30 rounded-lg hover:bg-red-950/40 disabled:opacity-40 transition-all bg-black/60"
              >
                <ChevronLeft size={20} className="text-red-400" />
              </button>
              <button 
                onClick={scrollNext} 
                disabled={!canScrollNext}
                className="p-2.5 border border-red-600/30 rounded-lg hover:bg-red-950/40 disabled:opacity-40 transition-all bg-black/60"
              >
                <ChevronRight size={20} className="text-red-400" />
              </button>
            </div>
          </div>
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-4">
              {DRINK_IMAGES.map((src, idx) => (
                <div key={idx} className="flex-[0_0_70%] sm:flex-[0_0_35%] md:flex-[0_0_25%] lg:flex-[0_0_20%] min-w-0 pl-4 relative group">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-zinc-950 relative border border-red-600/30 shadow-xl group-hover:border-red-500/80 transition-all">
                    <img 
                      src={src} 
                      alt={`Levernasia Premium Drink ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition-colors duration-300 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Categories Header */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md font-serif border",
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] border-red-400/50 scale-105"
                  : "bg-black/80 text-zinc-400 border-zinc-800 hover:border-red-600/40 hover:text-red-300"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Drink Items Table */}
        <div className="bg-zinc-950 border border-red-600/30 rounded-2xl p-6 md:p-8 mb-12 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6"
            >
              {displayedDrinks.map((drink, idx) => (
                <div key={idx} className="flex justify-between items-start border-b border-red-950/80 pb-4 group hover:border-red-600/40 transition-colors">
                  <div className="pr-4">
                    <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2 font-serif">
                      {drink.name}
                      {drink.badge && (
                        <span className="text-[10px] font-sans uppercase font-extrabold px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-600/40">
                          {drink.badge}
                        </span>
                      )}
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{drink.notes}</p>
                  </div>
                  <div className="text-red-400 font-black text-base whitespace-nowrap font-mono">
                    {drink.price}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={handleDownloadPDFDrinks}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black uppercase tracking-wider transition-all rounded-xl text-center text-xs shadow-[0_0_25px_rgba(220,38,38,0.4)] border border-red-400/30 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <Download size={18} />
            <span>Download PDF Drinks Menu</span>
          </button>
          <a
            href="#reservation"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-950 border border-red-600/40 text-red-400 font-bold uppercase tracking-wider hover:bg-red-950/40 transition-all rounded-xl text-center text-xs flex items-center justify-center gap-2"
          >
            <GlassWater size={18} />
            <span>Reserve Table & Bottle Service</span>
          </a>
        </div>
      </div>
    </section>
  );
}
