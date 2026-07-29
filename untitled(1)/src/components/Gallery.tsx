import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type Category = 'Ambiance' | 'Crowd' | 'Bar' | 'Food';

const GALLERY_DATA: Record<Category, string[]> = {
  Ambiance: [
    'https://i.ibb.co/1BYn38w/DSC00643.jpg',
    'https://i.ibb.co/0R5F9CBt/DSC00645.jpg',
    'https://i.ibb.co/1tvpJM3w/DSC00654.jpg',
    'https://i.ibb.co/YBNvH4W2/DSC00639.jpg',
    'https://i.ibb.co/HDvDZRGP/DSC00640.jpg',
    'https://i.ibb.co/s9Y0ZZ6G/DSC00646.jpg',
    'https://i.ibb.co/5gf01h5r/DSC00648.jpg',
    'https://i.ibb.co/BHpgPktC/DSC00649.jpg',
    'https://i.ibb.co/mF8brb3d/DSC00651.jpg',
    'https://i.ibb.co/v6LhjdsT/DSC00653.jpg',
    'https://i.ibb.co/tTPq3rNW/DSC00652.jpg',
    'https://i.ibb.co/hR17cjRJ/DSC00655.jpg',
    'https://i.ibb.co/tMNNhGxF/DSC00656.jpg',
  ],
  Crowd: [
    'https://i.ibb.co/BKcbzSS2/DSC00343.jpg',
    'https://i.ibb.co/5gdjFL3V/DSC00344.jpg',
    'https://i.ibb.co/rRq2c4K7/DSC00629.jpg',
    'https://i.ibb.co/mFz7XNqN/DSC00630.jpg',
    'https://i.ibb.co/yFT0ZmRZ/DSC00631.jpg',
    'https://i.ibb.co/cSgFdVKV/DSC00632.jpg',
    'https://i.ibb.co/N2fMgR94/DSC00633.jpg',
    'https://i.ibb.co/HDtyFkqF/DSC00634.jpg',
    'https://i.ibb.co/FkNLXGmK/DSC00636.jpg',
    'https://i.ibb.co/vvkJtSsW/DSC00637.jpg',
    'https://i.ibb.co/zhDFjCyt/DSC00638.jpg',
  ],
  Bar: [
    'https://i.ibb.co/mF8brb3d/DSC00651.jpg',
    'https://i.ibb.co/tTPq3rNW/DSC00652.jpg',
    'https://i.ibb.co/v6LhjdsT/DSC00653.jpg',
    'https://i.ibb.co/hR17cjRJ/DSC00655.jpg',
    'https://i.ibb.co/tMNNhGxF/DSC00656.jpg',
    'https://i.ibb.co/RprtDFF8/DSC00647.jpg',
  ],
  Food: [
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
  ],
};

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<Category>('Ambiance');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories: Category[] = ['Ambiance', 'Crowd', 'Bar', 'Food'];

  return (
    <section id="gallery" className="py-24 bg-zinc-950 relative border-t border-red-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-red-500 font-bold tracking-widest uppercase mb-2 text-xs flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-red-600"></span>
            Visuals
            <span className="w-8 h-[1px] bg-red-600"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase text-white mb-6 font-serif tracking-wide">
            The Levernasia Experience
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all shadow-md",
                  activeTab === cat 
                    ? "bg-gradient-to-r from-red-600 to-rose-600 text-white border-transparent shadow-[0_0_20px_rgba(220,38,38,0.5)]" 
                    : "bg-black/60 border border-red-600/30 text-zinc-400 hover:text-red-400 hover:border-red-500 hover:bg-red-950/20 backdrop-blur-md"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {GALLERY_DATA[activeTab].map((src, idx) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="relative group aspect-square overflow-hidden rounded-xl border border-red-600/20 cursor-pointer shadow-lg hover:border-red-500/60 transition-all"
                onClick={() => setSelectedImage(src)}
              >
                <img
                  src={src}
                  alt={`Levernasia ${activeTab}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Enlarged view"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-full object-contain rounded-sm shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
