import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, PartyPopper, X } from 'lucide-react';

export default function InactivityModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      if (!showModal) {
        timeoutId = setTimeout(() => {
          setShowModal(true);
        }, 30000); // 30 seconds
      }
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('click', resetTimer);

    // Initial start
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [showModal]);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.8, rotateX: 20 }}
            animate={{ scale: 1, rotateX: 0 }}
            exit={{ scale: 0.8, rotateX: -20 }}
            style={{ perspective: 1000 }}
            className="relative w-full max-w-lg bg-zinc-950 border border-red-500/50 rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.3)] overflow-hidden p-8 text-center"
          >
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="mx-auto w-16 h-16 bg-red-950/80 border border-red-500/40 rounded-full flex items-center justify-center text-red-500 mb-6 animate-pulse">
              <PartyPopper size={32} />
            </div>

            <h2 className="text-3xl font-black text-white uppercase tracking-tight font-serif mb-4">
              Still thirsty? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">
                The Party Awaits
              </span>
            </h2>

            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-8">
              Don't miss out on Noida's finest nightlife experience. Grab a VIP table now before we're fully booked for the night!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#reservation"
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold uppercase tracking-wider text-sm rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={16} className="text-amber-300" /> Reserve Now
              </a>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-zinc-900 border border-red-500/30 text-white font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-zinc-800 transition-all"
              >
                Keep Exploring
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
