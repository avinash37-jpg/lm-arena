import { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, BarChart3, ArrowRight, Sparkles } from 'lucide-react';
import { COURSES } from '../data/site';
import { cn } from '../lib/utils';
import Icon from './Icon';

const CATEGORIES = [
  'All',
  'Popular',
  'Foundation',
  'Advanced',
  'Job-Oriented',
  'Creative',
  'Govt. Certified',
];

const levelColor: Record<string, string> = {
  Foundation: 'text-sky-300 bg-sky-500/10 border-sky-400/20',
  Advanced: 'text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-400/20',
  'Job-Oriented': 'text-emerald-300 bg-emerald-500/10 border-emerald-400/20',
  Creative: 'text-amber-300 bg-amber-500/10 border-amber-400/20',
  'Govt. Certified': 'text-cyan-300 bg-cyan-500/10 border-cyan-400/20',
};

export default function Courses() {
  const [active, setActive] = useState('All');

  const filtered = COURSES.filter((c) => {
    if (active === 'All') return true;
    if (active === 'Popular') return c.popular;
    return c.level === active;
  });

  return (
    <section id="courses" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-600/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-600/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-50">
            Our Courses
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Job-Oriented <span className="text-gradient">Coaching Courses</span> for Every Goal
          </h2>
          <p className="mt-4 text-base text-slate-400">
            From your first Coaching lesson to advanced professional skills — choose a course and start your
            journey to a successful career.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                'rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all',
                active === cat
                  ? 'border-transparent bg-gradient-to-r from-brand-600 to-cyan-500 text-white shadow-[0_0_20px_-5px_rgba(37,99,235,0.7)]'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-brand-400/40 hover:text-white'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course, i) => (
            <motion.article
              key={course.code}
              layout
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#0b1228] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-400/40 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.5)]"
            >
              {/* glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-600/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-start justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600/25 to-cyan-400/15 text-brand-400 ring-1 ring-brand-400/20 transition-transform duration-300 group-hover:scale-110">
                  <Icon name={course.icon} size={26} />
                </span>
                {course.popular && (
                  <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 ring-1 ring-amber-400/30">
                    <Sparkles size={11} /> Popular
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-brand-400">{course.code}</span>
                <span
                  className={cn(
                    'rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                    levelColor[course.level]
                  )}
                >
                  {course.level}
                </span>
              </div>

              <h3 className="mt-2 font-display text-lg font-bold leading-snug text-white">{course.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{course.description}</p>

              {/* topics */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {course.topics.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-medium text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* meta */}
              <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4 text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-brand-400" /> {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BarChart3 size={14} className="text-brand-400" /> {course.level}
                </span>
              </div>

              <a
                href="#admission"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-brand-400/30 bg-brand-600/10 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-50 transition-all hover:bg-gradient-to-r hover:from-brand-600 hover:to-cyan-500 hover:text-white"
              >
                Enquire / Enroll
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-400">
          Don't see what you're looking for?{' '}
          <a href="#contact" className="font-semibold text-brand-400 underline-offset-4 hover:underline">
            Contact us
          </a>{' '}
          — we offer many more short-term & custom courses.
        </p>
      </div>
    </section>
  );
}
