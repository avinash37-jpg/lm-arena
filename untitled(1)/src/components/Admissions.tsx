import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import { SITE, COURSES, STEPS } from '../data/site';

export default function Admissions() {
  const [form, setForm] = useState({ name: '', phone: '', course: COURSES[0].title });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `🎓 *Admission Enquiry — ${SITE.name}*%0A%0A*Name:* ${encodeURIComponent(
      form.name
    )}%0A*Phone:* ${encodeURIComponent(form.phone)}%0A*Course:* ${encodeURIComponent(
      form.course
    )}%0A%0APlease share the course details, fees and batch timings. Thank you!`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${msg}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <section id="admission" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-brand-600/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-2">
          {/* Left: steps + pitch */}
          <div className="flex flex-col">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              ● Admission Open
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Start Your Computer Journey <span className="text-gradient">in 4 Easy Steps</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              New batches starting now! Reserve your seat today. Fill the quick form and we'll reach out with all
              the details, or simply call us.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.no}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative rounded-2xl border border-white/5 bg-white/5 p-5"
                >
                  <div className="font-display text-3xl font-bold text-gradient">{s.no}</div>
                  <h3 className="mt-1 font-display text-base font-bold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.text}</p>
                </motion.div>
              ))}
            </div>

            {/* quick contact */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
              >
                <Phone size={16} className="text-brand-400" /> {SITE.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-emerald-400"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right: form card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-brand-400/20 bg-[#0b1228] p-7 shadow-[0_30px_70px_-30px_rgba(37,99,235,0.6)] sm:p-9">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-600/20 blur-3xl" />
              <h3 className="font-display text-2xl font-bold text-white">Request a Free Call Back</h3>
              <p className="mt-2 text-sm text-slate-400">
                Fill the form below — it opens WhatsApp with your details pre-filled. We'll reply with course
                info, fees & timings.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-white/10 bg-[#060a18] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Mobile Number
                  </label>
                  <input
                    required
                    type="tel"
                    pattern="[0-9+\s-]{10,15}"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. 80925 76269"
                    className="w-full rounded-xl border border-white/10 bg-[#060a18] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Interested Course
                  </label>
                  <select
                    value={form.course}
                    onChange={(e) => setForm({ ...form, course: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#060a18] px-4 py-3 text-sm text-white focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  >
                    {COURSES.map((c) => (
                      <option key={c.code} value={c.title} className="bg-[#0b1228]">
                        {c.title}
                      </option>
                    ))}
                    <option value="Other / Not Sure" className="bg-[#0b1228]">
                      Other / Not Sure
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-500 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_30px_-8px_rgba(37,99,235,0.8)] transition-all hover:brightness-110"
                >
                  <Send size={16} /> Send Enquiry via WhatsApp
                </button>

                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300"
                  >
                    <CheckCircle2 size={18} /> Opening WhatsApp… if it didn't open,{' '}
                    <a className="underline" href={`tel:${SITE.phoneRaw}`}>
                      call us
                    </a>
                    .
                  </motion.div>
                )}

                <p className="text-center text-[11px] text-slate-500">
                  🔒 Your details are safe. We only call/message about your enquiry.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
