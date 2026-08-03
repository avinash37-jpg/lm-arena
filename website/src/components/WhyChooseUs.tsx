import { motion } from 'motion/react';
import { FEATURES } from '../data/site';
import Icon from './Icon';

export default function WhyChooseUs() {
  return (
    <section id="features" className="relative overflow-hidden bg-[#080f24] py-20 sm:py-28">
      <div className="absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left: heading */}
          <div className="lg:col-span-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-600/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-50">
              Why Choose Us
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Why Students <span className="text-gradient">Choose SMART</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-400">
              We don't just teach Coachings — we build careers. Here's what makes us the most trusted Coaching
              coaching centre in Tata, Chaibasa Main Road.
            </p>

            <div className="mt-8 hidden overflow-hidden rounded-3xl border border-white/10 shadow-2xl lg:block">
              <img src="https://i.ibb.co/CKPTrhjr/Screenshot-2026-07-31-151228.png" alt="SMART Coaching Center lab" className="aspect-[4/3] w-full object-cover" loading="lazy" />
            </div>
          </div>

          {/* Right: feature grid */}
          <div className="lg:col-span-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
                  className="group flex gap-4 rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-6 transition-all hover:border-brand-400/30 hover:from-brand-600/10"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-cyan-500 text-white shadow-[0_0_20px_-6px_rgba(37,99,235,0.8)] transition-transform group-hover:scale-110">
                    <Icon name={f.icon} size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{f.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
