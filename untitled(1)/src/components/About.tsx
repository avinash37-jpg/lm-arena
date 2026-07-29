import { motion } from 'motion/react';
import { GlassWater, Utensils, Music, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Utensils className="w-8 h-8 text-white" />,
      title: 'Fine Dining',
      desc: 'Savor gourmet global cuisines and chef-crafted delicacies.'
    },
    {
      icon: <GlassWater className="w-8 h-8 text-white" />,
      title: 'Mixology Bar',
      desc: 'Exclusive artisanal cocktails, imported spirits & champagne.'
    },
    {
      icon: <Music className="w-8 h-8 text-white" />,
      title: 'Nightclub & Lounge',
      desc: 'Resident DJ Mishi, laser light shows, and electric energy.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-black relative border-t border-red-600/30">
      {/* Subtle crimson glow effect */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
              <Sparkles size={14} /> Noida's Finest Destination
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mb-6 leading-tight font-serif">
              A Complete Luxury <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">
                Nightlife Experience
              </span>
            </h2>
            
            <p className="text-zinc-300 mb-6 font-light leading-relaxed text-base sm:text-lg">
              Located at <strong className="text-red-400 font-semibold">Gardens Galleria Mall, Sector 38 Noida</strong>, Levernasia is Noida's premier lifestyle hub. We seamlessly combine the culinary mastery of fine dining, the sophistication of a high-end cocktail bar, and the raw energy of an elite nightclub.
            </p>
            
            <p className="text-zinc-400 mb-8 font-light leading-relaxed text-base sm:text-lg">
              Whether you're hosting an exclusive birthday bash, a romantic candlelit dinner, or dancing the night away to live sets by resident celebrity DJ Mishi, Levernasia sets the ultimate standard.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="p-5 bg-gradient-to-b from-zinc-950 to-black rounded-xl border border-red-600/30 hover:border-red-500 transition-all shadow-xl group">
                  <div className="mb-3 p-2.5 bg-red-950/80 rounded-lg border border-red-500/30 w-fit group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-bold uppercase tracking-wider mb-1 text-sm font-serif">{feature.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[550px] w-full rounded-2xl overflow-hidden border border-red-600/40 shadow-[0_20px_50px_rgba(220,38,38,0.2)] group"
          >
            <img loading="lazy" fetchPriority="low" 
              src="https://i.ibb.co/1tvpJM3w/DSC00654.jpg"
              alt="Levernasia Luxury Interior"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 bg-black/90 backdrop-blur-xl border border-red-600/50 p-6 rounded-xl shadow-2xl">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-red-600/30">
                <h3 className="text-red-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2 font-serif">
                  <ShieldCheck size={18} /> VIP Operating Hours
                </h3>
                <span className="text-[10px] bg-red-950 text-red-300 font-bold uppercase px-2.5 py-0.5 rounded-full border border-red-500/40">
                  Gardens Galleria
                </span>
              </div>
              <ul className="text-zinc-300 space-y-2.5 text-xs font-medium">
                <li className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span>Monday - Thursday</span> <span className="text-red-400 font-mono font-bold">12:00 PM – 1:00 AM</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="flex items-center gap-1 text-red-300 font-semibold">Friday - Saturday (DJ Nights)</span> <span className="text-red-400 font-mono font-bold">12:00 PM – 3:00 AM</span>
                </li>
                <li className="flex justify-between items-center pt-0.5">
                  <span>Sunday Sundowner</span> <span className="text-red-400 font-mono font-bold">12:00 PM – 2:00 AM</span>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


