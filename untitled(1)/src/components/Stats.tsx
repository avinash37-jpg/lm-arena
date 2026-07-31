import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { STATS } from '../data/site';

function useCounter(target: number, inView: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return value;
}

function StatItem({ stat, inView }: { stat: (typeof STATS)[number]; inView: boolean }) {
  const value = useCounter(stat.value, inView);
  return (
    <div className="relative text-center">
      <div className="font-display text-4xl font-bold text-gradient sm:text-5xl">
        {value}
        {stat.suffix}
      </div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:text-sm">
        {stat.label}
      </div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section className="relative bg-[#080f24]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-2 gap-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-8 sm:p-10 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <StatItem stat={stat} inView={inView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
