import { motion } from 'motion/react';
import { CheckCircle2, Target, Eye, Heart } from 'lucide-react';
import { SITE } from '../data/site';

const POINTS = [
  'Trusted local institute since ' + SITE.established,
  'Modern study centre with one student per bench',
  'Friendly, qualified & experienced trainers',
  'Recognised certificate on completion',
  'Flexible morning, afternoon & evening batches',
  'Honest, affordable fees with easy instalments',
];

const CARDS = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To make quality coaching affordable and accessible to every student in Tata, Chaibasa and nearby areas, empowering them with exam success and career growth.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: "To be Tata's most trusted coaching centre, guiding students to board exam success and bright futures.",
  },
  {
    icon: Heart,
    title: 'Our Promise',
    text: 'Personal attention to every student, 100% practical learning and genuine placement support — we treat your career as our responsibility.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img
                src="https://i.ibb.co/GN22mDR/Screenshot-2026-07-31-151250.png"
                alt="About SMART Coaching Center"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a18]/80 to-transparent" />
            </div>
            {/* badge */}
            <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-[#0b1228]/95 p-5 shadow-xl backdrop-blur-md sm:left-auto sm:right-6 sm:w-72">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-cyan-400 text-2xl">
                  🎓
                </span>
                <div>
                  <div className="font-display text-lg font-bold text-white">Recognised Institute</div>
                  <div className="text-xs text-slate-400">Serving Tata since {SITE.established}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-600/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-50">
              About Us
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Tata's Trusted <span className="text-gradient">Coaching Centre</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300">
              <span className="font-semibold text-white">{SITE.name}</span> is a premier Coaching training
              institute located in {SITE.addressLine1}, {SITE.addressLine2}. For over a decade we have helped
              thousands of students — from school dropouts to college graduates — master board subjects and build
              skills and build successful careers.
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate-400">
              From Class 6 to 12 coaching, board exam preparation and career guidance, we focus on
              one thing: <span className="font-semibold text-white">practical, job-ready training</span> that
              truly makes a difference.
            </p>

            <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {POINTS.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-cyan-400" />
                  <span className="text-sm text-slate-300">{p}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mission / Vision / Promise */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-7 transition-colors hover:border-brand-400/30"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-600/10 blur-2xl transition-opacity group-hover:opacity-100" />
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600/30 to-cyan-400/20 text-brand-400 ring-1 ring-brand-400/20">
                <card.icon size={24} />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
