import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { GALLERY as IMAGES } from '../data/site';

// bento-ish layout classes
const SPAN = [
  'sm:col-span-2 sm:row-span-2',
  '',
  '',
  'sm:col-span-2',
  '',
  '',
  'sm:row-span-2',
  '',
];

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  const close = () => setIndex(null);
  const prev = () => setIndex((i) => (i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length));
  const next = () => setIndex((i) => (i === null ? null : (i + 1) % IMAGES.length));

  return (
    <section id="gallery" className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-600/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-50">
            <Camera size={13} /> Gallery
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            A Glimpse of <span className="text-gradient">Life at SMART</span>
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Modern labs, focused students and a friendly learning environment. Tap any photo to view it larger.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4">
          {IMAGES.map((img, i) => (
            <motion.button
              key={img.src}
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/8 ${SPAN[i]}`}
            >
              <img
                src={img.src}
                alt={img.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a18] via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 p-3 text-left">
                <span className="text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {img.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={close}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <button
              className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={28} />
            </button>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-h-[85vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={IMAGES[index].src}
                alt={IMAGES[index].label}
                className="max-h-[85vh] w-full rounded-2xl object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-gradient-to-t from-black/80 to-transparent p-5">
                <p className="text-center font-display text-lg font-semibold text-white">{IMAGES[index].label}</p>
              </div>
            </motion.div>
            <button
              className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
