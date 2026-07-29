import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#gallery' },
    { name: 'Food Menu', href: '#menu' },
    { name: 'Drinks', href: '#drinks-menu' },
    { name: 'Events & DJs', href: '#events' },
    { name: 'Reviews', href: '#google-reviews' },
    { name: 'Highlights', href: '#videos' },
    { name: 'Instagram', href: '#instagram' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
      {/* WordPress Top Info Bar - Red Accent */}
      {!isScrolled && (
        <div className="hidden lg:block bg-black border-b border-red-600/30 py-2 px-6 text-xs text-zinc-300">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <span className="flex items-center gap-1.5 text-red-400 font-semibold">
                <MapPin size={13} className="text-red-500" />
                Gardens Galleria Mall, Sector 38, Noida
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Clock size={13} className="text-red-500" />
                Open Daily: 12:00 PM – 1:00 AM
              </span>
              <span className="flex items-center gap-1.5 text-red-400 font-bold bg-red-950/80 border border-red-500/40 px-2.5 py-0.5 rounded-full text-[11px] tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                LIVE DJ NIGHTS EVERY WEEKEND
              </span>
            </div>

            <div className="flex items-center space-x-6 font-bold">
              <a href="tel:07428964646" className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors">
                <Phone size={13} />
                VIP Reservation: +91 74289 64646
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Opaque Red & Noir luxury Navbar */}
      <nav
        className={cn(
          'bg-black/95 backdrop-blur-2xl border-b border-red-600/30 transition-all duration-300',
          isScrolled ? 'py-2.5 shadow-[0_10px_30px_rgba(220,38,38,0.15)]' : 'py-3.5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo Brand - Clean Official Artwork Image */}
          <a href="#home" className="flex items-center group shrink-0 py-1" title="Levernasia Bar & Club">
            <img 
              src="https://i.ibb.co/YBLLZ47d/24442826-a344-4187-b351-8734223a49bb.jpg" 
              alt="Levernasia Logo" 
              className="h-10 sm:h-12 w-auto object-contain rounded-md shadow-[0_0_20px_rgba(220,38,38,0.3)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] group-hover:scale-105 transition-all duration-300 border border-red-600/30"
              loading="eager"
              fetchPriority="high"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold tracking-widest text-zinc-300 hover:text-red-500 transition-colors uppercase relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-red-600 hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* VIP Table CTA Button */}
          <div className="hidden lg:flex items-center ml-8 xl:ml-12">
            <a
              href="#reservation"
              className="px-6 py-2.5 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black uppercase tracking-wider text-xs transition-all shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:shadow-[0_0_35px_rgba(239,68,68,0.8)] rounded-lg flex items-center gap-2 border border-red-400/30"
            >
              <Sparkles size={14} className="text-amber-300" /> VIP Table
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href="tel:07428964646"
              className="p-2 bg-red-600 text-white rounded-lg font-bold shadow-md"
            >
              <Phone size={18} />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-red-400 focus:outline-none bg-zinc-950 border border-red-600/40 rounded-lg shadow-md"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="bg-black/98 border-b border-red-600/40 backdrop-blur-3xl lg:hidden overflow-hidden shadow-2xl"
            >
              <div className="px-5 py-6 space-y-2 flex flex-col">
                <div className="flex items-center justify-between pb-4 border-b border-red-600/30 mb-2">
                  <img 
                    src="https://i.ibb.co/YBLLZ47d/24442826-a344-4187-b351-8734223a49bb.jpg" 
                    alt="Levernasia Logo" 
                    className="h-10 w-auto object-contain rounded-md border border-red-600/30 shadow-md"
                    loading="eager"
                    fetchPriority="high"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[11px] font-bold tracking-widest text-red-400 bg-red-950/80 px-2.5 py-1 rounded-full border border-red-600/30 uppercase">
                    Gardens Galleria • Noida
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-1.5 py-1">
                  {navLinks.map((link, idx) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 + 0.1 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-white hover:bg-red-950/60 rounded-xl border border-transparent hover:border-red-600/30 transition-all active:scale-[0.99]"
                    >
                      <span>{link.name}</span>
                      <span className="text-red-500 font-serif text-xs">→</span>
                    </motion.a>
                  ))}
                </div>

                <div className="pt-4 border-t border-red-600/30 flex flex-col gap-2.5">
                  <a
                    href="#reservation"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center py-3.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black uppercase tracking-wider text-xs rounded-xl shadow-xl border border-red-400/30"
                  >
                    ⚡ Reserve VIP Table via WhatsApp
                  </a>
                  <div className="flex gap-2">
                    <a
                      href="tel:07428964646"
                      className="flex-1 text-center py-2.5 bg-zinc-900 border border-red-600/40 text-red-400 font-bold uppercase text-xs rounded-lg flex items-center justify-center gap-1.5"
                    >
                      <Phone size={14} /> Call Desk
                    </a>
                    <a
                      href="https://wa.me/917428964646"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold uppercase text-xs rounded-lg flex items-center justify-center gap-1.5"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating Bottom Navigation Bar for Mobile Devices */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-2xl border-t border-red-600/30 px-2 py-2 flex justify-around items-center shadow-[0_-10px_25px_rgba(0,0,0,0.9)]">
        <a href="#home" className="flex flex-col items-center justify-center text-[10px] font-bold uppercase tracking-wider text-zinc-300 hover:text-red-400 transition-colors py-1 px-2">
          <span className="text-base mb-0.5">🏠</span>
          <span>Home</span>
        </a>
        <a href="#menu" className="flex flex-col items-center justify-center text-[10px] font-bold uppercase tracking-wider text-zinc-300 hover:text-red-400 transition-colors py-1 px-2">
          <span className="text-base mb-0.5">🍽️</span>
          <span>Food</span>
        </a>
        <a href="#drinks-menu" className="flex flex-col items-center justify-center text-[10px] font-bold uppercase tracking-wider text-zinc-300 hover:text-red-400 transition-colors py-1 px-2">
          <span className="text-base mb-0.5">🍸</span>
          <span>Drinks</span>
        </a>
        <a href="#events" className="flex flex-col items-center justify-center text-[10px] font-bold uppercase tracking-wider text-zinc-300 hover:text-red-400 transition-colors py-1 px-2">
          <span className="text-base mb-0.5">🎧</span>
          <span>Events</span>
        </a>
        <a href="#reservation" className="flex flex-col items-center justify-center text-[10px] font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-rose-600 px-3 py-1.5 rounded-lg border border-red-400/30 shadow-[0_0_12px_rgba(220,38,38,0.5)]">
          <span className="text-xs mb-0.5">⚡</span>
          <span>VIP Table</span>
        </a>
      </div>
    </header>
  );
}



