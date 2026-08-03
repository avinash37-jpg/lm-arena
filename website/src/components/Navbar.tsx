import { useState, useEffect } from 'react';
import { Menu, X, Phone, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { SITE } from '../data/site';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Courses', href: '#courses' },
    { name: 'Why Us', href: '#features' },
    { name: 'Teachers', href: '#teachers' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Top info bar */}
      <div
        className={cn(
          'hidden lg:block border-b border-white/5 bg-[#070d1f] text-xs text-slate-300 transition-all duration-300',
          isScrolled ? 'h-0 overflow-hidden py-0 opacity-0' : 'py-2 opacity-100'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="text-brand-400">📍</span> {SITE.addressFull}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-brand-400">🕘</span> {SITE.hours}
            </span>
          </div>
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="flex items-center gap-1.5 font-semibold text-brand-400 hover:text-brand-500"
          >
            <Phone size={13} /> {SITE.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={cn(
          'border-b border-white/5 backdrop-blur-2xl transition-all duration-300',
          isScrolled ? 'bg-[#070d1f]/95 py-2 shadow-[0_10px_40px_-10px_rgba(37,99,235,0.35)]' : 'bg-[#070d1f]/80 py-3'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 py-1" title={SITE.name}>
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-600 to-cyan-400 shadow-[0_0_25px_-5px_rgba(37,99,235,0.7)]">
              <img
                src="https://i.ibb.co/0pJpVt34/Whats-App-Image-2026-08-01-at-11-44-56-PM.jpg"
                alt="SMART Coaching Center logo"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="leading-tight">
              <span className="block font-display text-base font-bold tracking-tight text-white">
                SMART <span className="text-gradient">COACHING</span>
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                Coachings Education
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative py-2 text-[13px] font-semibold uppercase tracking-wide text-slate-300 transition-colors hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-brand-400 after:to-cyan-400 after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden items-center lg:flex">
            <a
              href="#admission"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_-5px_rgba(37,99,235,0.7)] transition-all hover:shadow-[0_0_35px_-3px_rgba(6,182,212,0.8)] hover:brightness-110"
            >
              <GraduationCap size={15} /> Admission Open
            </a>
          </div>

          {/* Mobile button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-brand-600 to-cyan-500 text-white shadow-md"
              aria-label="Call us"
            >
              <Phone size={18} />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden border-b border-white/5 bg-[#070d1f]/98 backdrop-blur-3xl lg:hidden"
            >
              <div className="space-y-1 px-4 py-5">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 + 0.05 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wide text-slate-200 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.name}
                    <span className="text-brand-400">→</span>
                  </motion.a>
                ))}
                <a
                  href="#admission"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-3 block rounded-xl bg-gradient-to-r from-brand-600 to-cyan-500 px-4 py-3.5 text-center text-sm font-bold uppercase tracking-wider text-white shadow-lg"
                >
                  🎓 Admission Open
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
