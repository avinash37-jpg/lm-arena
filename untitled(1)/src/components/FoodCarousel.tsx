import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const FOOD_IMAGES = [
  'https://i.ibb.co/4wn1GJVX/Lv-4.png',
  'https://i.ibb.co/HTFF1WKP/LV2.png',
  'https://i.ibb.co/fz1kybTf/Lv5.png',
  'https://i.ibb.co/679PsP3d/Lv8.png',
  'https://i.ibb.co/fznD1Ngv/Lv13.png',
  'https://i.ibb.co/8DQ2mz98/Lv16.png',
  'https://i.ibb.co/G46S1GyK/Lv18.png',
  'https://i.ibb.co/SG1FWJp/Lv19.png',
  'https://i.ibb.co/5pmMtQL/Lv24.png',
  'https://i.ibb.co/ZpnN4jjd/Lv25.png',
  'https://i.ibb.co/1tLj6p5j/food-26.png',
  'https://i.ibb.co/wNTf52yL/LV-1.png',
  'https://i.ibb.co/hJWdMXV6/Lv3.png',
  'https://i.ibb.co/35MJg0C2/Lv6.png',
  'https://i.ibb.co/TM6D4Hd2/Lv9.png',
  'https://i.ibb.co/JRzgRMWh/Lv10.png',
  'https://i.ibb.co/ynndks8L/Lv11.png',
  'https://i.ibb.co/wN4TssF6/Lv12.png',
  'https://i.ibb.co/27CVbZ6j/Lv14.png',
  'https://i.ibb.co/JRL2vPMy/Lv15.png',
  'https://i.ibb.co/nMLXr74g/Lv17.png',
  'https://i.ibb.co/B5n0VGzQ/Lv20.png',
  'https://i.ibb.co/q3hcVQpF/Lv21.png',
  'https://i.ibb.co/m5HccFN6/Lv22.png',
  'https://i.ibb.co/HDhmXtRd/Lv23.png',
];

export default function FoodCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );
  
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative mb-20 max-w-full overflow-hidden px-4 md:px-0"
    >
      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        <h4 className="text-xl font-bold uppercase text-white tracking-wider font-serif">Featured Culinary Signatures</h4>
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
      
      <div className="overflow-hidden max-w-6xl mx-auto" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4">
          {FOOD_IMAGES.map((src, idx) => (
            <div key={idx} className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_30%] lg:flex-[0_0_25%] min-w-0 pl-4 relative group">
              <div className="aspect-square rounded-xl overflow-hidden bg-zinc-950 relative border border-red-600/30 shadow-lg group-hover:border-red-500/80 transition-all">
                <img loading="lazy" fetchPriority="low" 
                  src={src} 
                  alt={`Levernasia featured food ${idx + 1}`} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition-colors duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
