import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { SITE } from '../data/site';

export default function LocationContact() {
  const CARDS = [
    {
      icon: MapPin,
      title: 'Visit Us',
      lines: [SITE.addressLine1, SITE.addressLine2],
      action: { label: 'Open in Google Maps', href: SITE.mapsLink },
    },
    {
      icon: Phone,
      title: 'Call Us',
      lines: [SITE.phoneDisplay],
      action: { label: 'Call now', href: `tel:${SITE.phoneRaw}` },
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      lines: [SITE.hours, SITE.hoursSunday],
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: [SITE.email],
      action: { label: 'Send email', href: `mailto:${SITE.email}` },
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[#080f24] py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-600/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-50">
            Location & Contact
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Come Visit Our <span className="text-gradient">Centre</span>
          </h2>
          <p className="mt-4 text-base text-slate-400">
            We're located in {SITE.addressLine1}. Walk in for a free counselling session or reach out anytime.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {CARDS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-white/8 bg-[#0b1228] p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-cyan-500 text-white">
                  <c.icon size={20} />
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-white">{c.title}</h3>
                <div className="mt-1 flex-1 space-y-0.5">
                  {c.lines.map((l) => (
                    <p key={l} className="text-sm text-slate-400">
                      {l}
                    </p>
                  ))}
                </div>
                {c.action && (
                  <a
                    href={c.action.href}
                    target={c.action.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-400 hover:text-cyan-400"
                  >
                    {c.action.label} <ExternalLink size={12} />
                  </a>
                )}
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.32 }}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-5 text-center font-bold text-white shadow-[0_0_30px_-8px_rgba(16,185,129,0.7)] transition-all hover:brightness-110 sm:col-span-2"
            >
              <MessageCircle size={20} /> Chat with us on WhatsApp — {SITE.phoneDisplay}
            </motion.a>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
          >
            <iframe
              title="SMART Coaching Center location map"
              src={SITE.mapsEmbed}
              className="h-full min-h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
