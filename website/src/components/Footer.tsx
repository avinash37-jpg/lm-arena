import { MapPin, Phone, Clock, Mail, MessageCircle, ArrowUp, Facebook, Instagram, Youtube } from 'lucide-react';
import { SITE, COURSES } from '../data/site';

const COURSE_LINKS = COURSES.slice(0, 6).map((c) => ({ name: c.title, href: '#courses' }));
const QUICK_LINKS = [
  { name: 'About Us', href: '#about' },
  { name: 'All Courses', href: '#courses' },
  { name: 'Why Choose Us', href: '#features' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Student Reviews', href: '#reviews' },
  { name: 'Admission', href: '#admission' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#060a18]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      {/* CTA strip */}
      <div className="relative border-b border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-10 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
          <div>
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to start your coaching journey?
            </h3>
            <p className="mt-1.5 text-sm text-slate-400">
              New batches open now. Talk to us today and reserve your seat.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-white/10"
            >
              <Phone size={16} className="text-brand-400" /> {SITE.phoneDisplay}
            </a>
            <a
              href="#admission"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_25px_-6px_rgba(37,99,235,0.8)] hover:brightness-110"
            >
              Enroll Now
            </a>
          </div>
        </div>
      </div>

      {/* main footer */}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-600 to-cyan-400">
              <img src="https://i.ibb.co/0pJpVt34/Whats-App-Image-2026-08-01-at-11-44-56-PM.jpg" alt="SMART Coaching Center" className="h-full w-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-base font-bold text-white">
                SMART <span className="text-gradient">COACHING</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Coaching Centre</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {SITE.name} — {SITE.addressLine1}'s trusted coaching centre, helping students succeed
            job-ready digital skills since {SITE.established}.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: Facebook, href: '#', label: 'Facebook' },
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Youtube, href: '#', label: 'YouTube' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-brand-400/40 hover:text-brand-400"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* quick links */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.name}>
                <a href={l.href} className="text-sm text-slate-400 transition-colors hover:text-brand-400">
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* courses */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Popular Courses</h4>
          <ul className="mt-4 space-y-2.5">
            {COURSE_LINKS.map((l) => (
              <li key={l.name}>
                <a href={l.href} className="text-sm text-slate-400 transition-colors hover:text-brand-400">
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Get in Touch</h4>
          <ul className="mt-4 space-y-3.5 text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin size={17} className="mt-0.5 shrink-0 text-brand-400" />
              <a href={SITE.mapsLink} target="_blank" rel="noreferrer" className="hover:text-brand-400">
                {SITE.addressFull}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={17} className="shrink-0 text-brand-400" />
              <a href={`tel:${SITE.phoneRaw}`} className="hover:text-brand-400">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={17} className="shrink-0 text-brand-400" />
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-brand-400">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock size={17} className="mt-0.5 shrink-0 text-brand-400" />
              <span>
                {SITE.hours}
                <br />
                {SITE.hoursSunday}
              </span>
            </li>
          </ul>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-emerald-300 ring-1 ring-emerald-400/30 hover:bg-emerald-500/25"
          >
            <MessageCircle size={15} /> WhatsApp Us
          </a>
        </div>
      </div>

      {/* bottom bar */}
      <div className="relative border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:px-6 md:flex-row lg:px-8">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Proudly serving students in Tata, Chaibasa Main Road, Jharkhand 🇮🇳
          </p>
          <a
            href="#home"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400 hover:text-brand-400"
          >
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
