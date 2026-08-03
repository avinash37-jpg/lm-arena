import { Star, Award, User } from 'lucide-react';
import { TEACHERS } from '../data/site';

export default function Teachers() {
  return (
    <section id="teachers" className="py-16 md:py-24 bg-[#0a0f1a]">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-gradient">Teachers</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Meet our experienced faculty ranked by expertise and dedication at SMART Coaching Center.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TEACHERS.map((t) => (
            <div
              key={t.rank}
              className="relative bg-[#0f1525] border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition group"
            >
              <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-400 to-amber-600 text-[#060a18] font-extrabold text-sm px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Award size={14} /> Rank #{t.rank}
              </div>
              <div className="aspect-[3/4] overflow-hidden bg-gradient-to-b from-[#0f1525] to-[#060a18]">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-top object-cover group-hover:scale-[1.07] transition duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-xl font-bold text-white mb-0.5">{t.name}</h3>
                <p className="text-amber-300 text-sm font-medium mb-1">{t.role}</p>
                <p className="text-amber-200/90 text-xs font-medium mb-3">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
