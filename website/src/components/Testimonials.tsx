import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/site';

const AVATAR_GRADIENTS = [
  'from-brand-500 to-cyan-400',
  'from-fuchsia-500 to-brand-500',
  'from-cyan-400 to-emerald-400',
  'from-amber-400 to-brand-500',
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 4500, stopOnInteraction: false }),
  ]);

  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section id="reviews" className="relative overflow-hidden bg-[#080f24] py-20 sm:py-28">
      <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-brand-600/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-600/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-50">
            Student Reviews
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            What Our <span className="text-gradient">Students Say</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex text-amber-400">
              {'★★★★★'.split('').map((s, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-300">4.9 / 5 from 5000+ happy students</span>
          </div>
        </div>

        <div className="relative mt-12">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {TESTIMONIALS.map((t, i) => (
                <div key={t.name} className="min-w-0 flex-[0_0_100%] px-3 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                    className="flex h-full flex-col rounded-2xl border border-white/8 bg-[#0b1228] p-7"
                  >
                    <Quote size={36} className="text-brand-500/40" />
                    <div className="mt-2 flex text-amber-400">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <Star key={s} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">"{t.text}"</p>
                    <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${
                          AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]
                        } font-bold text-white`}
                      >
                        {t.name.charAt(0)}
                      </span>
                      <div>
                        <div className="font-display text-sm font-bold text-white">{t.name}</div>
                        <div className="text-xs text-brand-400">{t.course}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    selected === i ? 'w-6 bg-gradient-to-r from-brand-500 to-cyan-400' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
