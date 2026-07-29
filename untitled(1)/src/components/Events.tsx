import { motion } from 'motion/react';
import { Calendar, Clock, Music2 } from 'lucide-react';

const EVENTS = [
  {
    title: 'Neon Nights w/ DJ Mishi',
    date: 'Every Friday',
    time: '9:00 PM Onwards',
    desc: 'Kick off the weekend with high-energy EDM and commercial hits.',
    image: 'https://i.ibb.co/BKcbzSS2/DSC00343.jpg',
  },
  {
    title: 'Sufi & Bollywood Retro',
    date: 'Every Wednesday',
    time: '8:00 PM Onwards',
    desc: 'A soulful evening featuring live acoustic bands and classic tunes.',
    image: 'https://i.ibb.co/mFz7XNqN/DSC00630.jpg',
  },
  {
    title: 'Sunday Sundowner',
    date: 'Every Sunday',
    time: '5:00 PM - 10:00 PM',
    desc: 'Relaxing techno vibes, special cocktail pitchers, and sunset views.',
    image: 'https://i.ibb.co/yFT0ZmRZ/DSC00631.jpg',
  }
];

export default function Events() {
  return (
    <section id="events" className="py-24 bg-black relative border-t border-red-600/30 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-red-500 font-bold tracking-widest uppercase mb-2 text-xs flex items-center gap-2">
              <span className="w-8 h-[1px] bg-red-600"></span> Experience
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase text-white leading-tight font-serif">
              Live Events &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">DJ Nights</span>
            </h3>
          </div>
          <a
            href="#reservation"
            className="px-6 py-3 bg-red-950/80 border border-red-500/50 hover:bg-red-900/50 text-red-300 font-bold uppercase tracking-wider text-xs transition-all rounded-lg shadow-lg"
          >
            VIP Table Booking
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EVENTS.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group bg-zinc-950 rounded-2xl overflow-hidden border border-red-600/30 hover:border-red-500 transition-all shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-red-400 text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md p-2.5 rounded-lg border border-red-600/30">
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-red-500" /> {event.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-red-500" /> {event.time}</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2 font-serif">
                  <Music2 className="text-red-500 shrink-0" size={20} />
                  {event.title}
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">{event.desc}</p>
                <div className="mt-6 pt-4 border-t border-red-600/20">
                  <a
                    href="#reservation"
                    className="text-red-400 hover:text-red-300 font-bold uppercase tracking-wider text-xs flex items-center gap-1 transition-colors"
                  >
                    RSVP Now &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
