import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { SITE } from '../data/site';

export default function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Floating WhatsApp + Call — bottom right */}
      <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
        <a
          href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
            'Hi IACT 2 Computers Education, I would like to know more about your courses.'
          )}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-6px_rgba(37,211,102,0.7)] transition-transform hover:scale-110"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
          <MessageCircle size={26} fill="currentColor" className="relative" />
        </a>
        <a
          href={`tel:${SITE.phoneRaw}`}
          aria-label="Call us"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-cyan-500 text-white shadow-[0_8px_30px_-6px_rgba(37,99,235,0.7)] transition-transform hover:scale-110"
        >
          <Phone size={24} />
        </a>
      </div>

      {/* Back to top */}
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-5 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0b1228]/90 text-white backdrop-blur-md transition-colors hover:text-brand-400 sm:bottom-6 sm:left-6"
          >
            <ArrowUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
