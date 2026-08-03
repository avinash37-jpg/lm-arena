import { motion } from 'motion/react';
import { ArrowRight, Phone, Play, BadgeCheck } from 'lucide-react';
import { SITE } from '../data/site';

const PILL = 'px-4 py-1.5 rounded-full border border-brand-400/30 bg-white/5 text-brand-50 text-[11px] sm:text-xs font-semibold uppercase tracking-wider backdrop-blur-md';

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.ibb.co/99DTgnst/Screenshot-2026-07-31-151240.png"
          alt="SMART Coaching Center classroom"
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#060a18]/95 via-[#060a18]/80 to-[#060a18]/95" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        {/* glow blobs */}
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-600/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-50 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              Top Coaching Institute • Tata, Chaibasa Main Road
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Build Your Future with <span className="text-gradient">Coaching</span> That Wins Exams
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
            >
              Join <span className="font-semibold text-white">{SITE.name}</span> — a premier coaching centre at {SITE.addressLine1}. Board exam coaching for Class 6 to 12 with expert faculty, small batches and regular tests.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 flex flex-wrap gap-2.5"
            >
              <span className={PILL}>🎓 Recognised Certificate</span>
              <span className={PILL}>📚 Small Batch Learning</span>
              <span className={PILL}>💼 Placement Support</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#admission"
                className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-500 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_35px_-8px_rgba(37,99,235,0.8)] transition-all hover:brightness-110"
              >
                Enroll Now — Admission Open
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-colors hover:bg-white/10"
              >
                <Phone size={16} className="text-brand-400" /> {SITE.phoneDisplay}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-8 flex items-center gap-4 text-sm text-slate-400"
            >
              <div className="flex -space-x-2">
                {['from-brand-500 to-cyan-400', 'from-fuchsia-500 to-brand-500', 'from-cyan-400 to-emerald-400', 'from-amber-400 to-brand-500'].map(
                  (g, i) => (
                    <span
                      key={i}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#060a18] bg-gradient-to-br ${g} text-xs font-bold text-white`}
                    >
                      {['P', 'R', 'S', 'A'][i]}
                    </span>
                  )
                )}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
                <span className="text-xs">Trusted by 3500+ students in Tata • Chaibasa</span>
              </div>
            </motion.div>
          </div>

          {/* Right floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:col-span-5 lg:block"
          >
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <img
                  src="https://i.ibb.co/GN22mDR/Screenshot-2026-07-31-151250.png"
                  alt="Students learning at SMART Coaching Center"
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060a18] via-transparent to-transparent" />
              </div>

              {/* floating stat card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-8 top-10 rounded-2xl border border-white/10 bg-[#0b1228]/90 p-4 shadow-xl backdrop-blur-md"
              >
                <div className="text-3xl font-bold text-gradient">12+</div>
                <div className="text-[11px] uppercase tracking-wide text-slate-400">Years of Excellence</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1228]/90 p-4 shadow-xl backdrop-blur-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <BadgeCheck size={22} />
                </span>
                <div>
                  <div className="text-sm font-bold text-white">Recognised Certificate</div>
                  <div className="text-[11px] text-slate-400">On course completion</div>
                </div>
              </motion.div>

              <a
                href="#gallery"
                className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                aria-label="Watch campus"
              >
                <Play size={20} className="ml-0.5" fill="currentColor" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* curve bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" className="h-12 w-full fill-[#080f24] sm:h-16" preserveAspectRatio="none">
          <path d="M0,40 C360,90 1080,-10 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
