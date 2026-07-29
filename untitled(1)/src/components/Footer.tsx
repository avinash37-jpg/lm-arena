import { useState, FormEvent } from 'react';
import { Instagram, MapPin, Phone, Sparkles, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showModal, setShowModal] = useState<'privacy' | 'terms' | null>(null);

  const handleVipSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    const message = `Hello Levernasia! 🥂 I joined the VIP Guestlist from your website with email: ${emailInput.trim()}. Please send me exclusive table offers & DJ lineup updates!`;
    const whatsappUrl = `https://wa.me/917428964646?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer className="bg-zinc-950 pt-20 pb-10 border-t border-red-600/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div>
            <a href="#home" className="inline-block mb-6 group" title="Levernasia Bar & Club">
              <img loading="lazy" fetchPriority="low" 
                src="https://i.ibb.co/YBLLZ47d/24442826-a344-4187-b351-8734223a49bb.jpg" 
                alt="Levernasia Logo" 
                className="h-12 w-auto object-contain rounded-md shadow-[0_0_20px_rgba(220,38,38,0.3)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] group-hover:scale-105 transition-all duration-300 border border-red-600/30"
                referrerPolicy="no-referrer"
              />
            </a>
            <p className="text-zinc-400 font-light text-sm leading-relaxed mb-6">
              Noida's premier nightlife, luxury dining, and cocktail lounge experience. Live beats by DJ Mishi, chef specials, and VIP table services.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://instagram.com/levernasia_la" 
                target="_blank" 
                rel="noreferrer" 
                title="Levernasia Instagram"
                className="w-10 h-10 rounded-xl bg-transparent border border-red-500 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all shadow-md"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://instagram.com/djmishi_" 
                target="_blank" 
                rel="noreferrer" 
                title="DJ Mishi Instagram"
                className="w-10 h-10 rounded-xl bg-transparent border border-red-500 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all shadow-md"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://wa.me/917428964646?text=Hello%20Levernasia%20Bar%20%26%20Club!%20I%20would%20like%20to%20reserve%20a%20table." 
                target="_blank" 
                rel="noreferrer"
                title="WhatsApp Reservation"
                className="w-10 h-10 rounded-xl bg-transparent border border-emerald-500 flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all shadow-md"
              >
                <MessageSquare size={18} />
              </a>
              <a 
                href="tel:07428964646" 
                title="Call Desk"
                className="w-10 h-10 rounded-xl bg-transparent border border-red-500 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all shadow-md"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
              <Sparkles size={16} className="text-red-500" /> Explore
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Experience Gallery', href: '#gallery' },
                { label: 'Food Menu', href: '#menu' },
                { label: 'Drinks & Cocktails', href: '#drinks-menu' },
                { label: 'Events & DJ Lineup', href: '#events' },
                { label: 'Google Verified Reviews', href: '#reviews' },
                { label: 'Instagram Reels', href: '#instagram' },
                { label: 'Location & Map', href: '#location' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-zinc-400 hover:text-red-400 transition-colors text-xs uppercase tracking-wider font-semibold flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-red-500"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
              <MapPin size={16} className="text-red-500" /> Location & Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-300 text-xs leading-relaxed">
                <MapPin size={18} className="text-red-500 shrink-0 mt-0.5" />
                <a href="https://maps.app.goo.gl/b8GtwNDP5mijc4zN7" target="_blank" rel="noreferrer" className="hover:text-red-400 transition-colors">
                  Gardens Galleria Mall, Sector 38,<br />Noida, Uttar Pradesh 201301
                </a>
              </li>
              
              {/* WhatsApp Instant Reservation Callout */}
              <li className="pt-2">
                <div className="bg-gradient-to-r from-red-950/90 to-zinc-900 border border-red-500/40 rounded-xl p-3.5 shadow-lg">
                  <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest block mb-1">Instant Table Reservation</span>
                  <a 
                    href="https://wa.me/917428964646?text=Hello%20Levernasia%20Bar%20%26%20Club!%20I%20would%20like%20to%20reserve%20a%20table%20for%20tonight."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-white hover:text-emerald-400 font-bold text-xs transition-colors font-mono"
                  >
                    <MessageSquare size={16} className="text-emerald-400 shrink-0" />
                    <span>Contact us at <strong className="text-emerald-400 font-extrabold">+91 7428964646</strong></span>
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
              <Sparkles size={16} className="text-red-500" /> VIP Guestlist
            </h4>
            <p className="text-zinc-400 text-xs mb-4 leading-relaxed">
              Join the Levernasia VIP Club for instant access to secret DJ lineup updates, table offers & complimentary drinks.
            </p>
            <form className="flex flex-col gap-2" onSubmit={handleVipSubmit}>
              <input 
                type="email" 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email address..." 
                required
                className="w-full bg-black border border-red-600/30 rounded-lg px-4 py-2.5 text-white text-xs focus:border-red-500 focus:outline-none"
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg hover:from-red-500 hover:to-rose-500 transition-all shadow-lg border border-red-400/30 active:scale-95 cursor-pointer"
              >
                {subscribed ? '✓ Joined! Opening WhatsApp...' : 'Join VIP Guestlist'}
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-red-600/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-xs uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Levernasia Bar & Club • Gardens Galleria Noida. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button 
              onClick={() => setShowModal('privacy')} 
              className="text-zinc-500 hover:text-red-400 text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setShowModal('terms')} 
              className="text-zinc-500 hover:text-red-400 text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Working Modal for Privacy / Terms */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-red-600/40 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <h3 className="text-xl font-bold uppercase text-white mb-4 font-serif flex items-center gap-2">
              <ShieldCheck className="text-red-500" />
              {showModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed mb-6">
              {showModal === 'privacy'
                ? 'Levernasia respects your privacy. Any personal information provided for table reservations or VIP guestlists is strictly used to confirm bookings and share promotional offers.'
                : 'Levernasia Bar & Club reserves rights regarding admission, dress code standards, and table reservation timings at Gardens Galleria Mall, Noida.'}
            </p>
            <button
              onClick={() => setShowModal(null)}
              className="w-full py-2.5 bg-red-600 text-white font-bold uppercase text-xs rounded-xl hover:bg-red-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}


