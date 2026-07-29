import { motion } from 'motion/react';
import { ArrowRight, Phone, ChevronRight, ChevronLeft } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback } from 'react';

const HERO_IMAGES = [
  'https://i.ibb.co/1BYn38w/DSC00643.jpg',
  'https://i.ibb.co/0R5F9CBt/DSC00645.jpg',
  'https://i.ibb.co/rRq2c4K7/DSC00629.jpg',
  'https://i.ibb.co/YBNvH4W2/DSC00639.jpg',
  'https://i.ibb.co/HDvDZRGP/DSC00640.jpg'
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider / Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {HERO_IMAGES.map((src, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={index}>
              <img
                src={src}
                alt={`Levernasia Vibe ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/95" />
            </div>
          ))}
        </div>
      </div>

      <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors p-2 hidden sm:block">
        <ChevronLeft size={48} strokeWidth={1} />
      </button>
      <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors p-2 hidden sm:block">
        <ChevronRight size={48} strokeWidth={1} />
      </button>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center pt-36 sm:pt-40 lg:pt-44 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500/50 text-white text-[10px] md:text-xs font-bold tracking-wider mb-4 shadow-[0_0_20px_rgba(220,38,38,0.3)] backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          Sector 38, Gardens Galleria, Noida
        </motion.div>
        
        <motion.div
          animate={{ rotateY: [-5, 5, -5], rotateX: [2, -2, 2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
          className="relative"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95, translateZ: -50 }}
            animate={{ opacity: 1, scale: 1, translateZ: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-[0.95] mb-6 font-serif drop-shadow-2xl"
          >
            Where Luxury Food <br />
            <span className="text-white drop-shadow-2xl inline-block transform-gpu" style={{ transform: 'translateZ(30px)' }}>
              Meets Beats & Vibes
            </span>
          </motion.h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed"
        >
          Step into Noida's most extravagant bar, dining & lounge. Live DJ sets by DJ Mishi, chef-crafted global cuisine & signature cocktails.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-3 mb-12 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-300"
        >
          <span className="px-4 py-1.5 bg-black/80 border border-red-600/40 text-red-200 rounded-full backdrop-blur-md shadow-[0_4px_20px_rgba(220,38,38,0.25)]">🍸 Craft Cocktails</span>
          <span className="px-4 py-1.5 bg-black/80 border border-red-600/40 text-red-200 rounded-full backdrop-blur-md shadow-[0_4px_20px_rgba(220,38,38,0.25)]">🎧 Resident DJ Mishi</span>
          <span className="px-4 py-1.5 bg-black/80 border border-red-600/40 text-red-200 rounded-full backdrop-blur-md shadow-[0_4px_20px_rgba(220,38,38,0.25)]">✨ VIP Lounges</span>
          <span className="px-4 py-1.5 bg-black/80 border border-red-600/40 text-red-200 rounded-full backdrop-blur-md shadow-[0_4px_20px_rgba(220,38,38,0.25)]">🌙 Late Night Dining</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#reservation"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.55)] hover:shadow-[0_0_40px_rgba(239,68,68,0.8)] text-sm border border-red-400/30"
          >
            Book Table / VIP Access
            <ArrowRight size={18} />
          </a>
          <a
            href="#menu"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-950/80 border border-red-600/50 text-red-400 font-bold uppercase tracking-wider hover:bg-red-950/50 transition-all flex items-center justify-center gap-2 rounded-lg text-sm backdrop-blur-md"
          >
            Explore Menu & Drinks
          </a>
        </motion.div>
      </div>

      {/* Floating Call Button */}
      <a
        href="tel:07428964646"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform shadow-green-500/20"
      >
        <Phone size={24} />
      </a>
    </section>
  );
}
