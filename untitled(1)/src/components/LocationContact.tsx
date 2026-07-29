import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, Star, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export default function LocationContact() {
  const [intel, setIntel] = useState<string | null>(null);
  const [isLoadingIntel, setIsLoadingIntel] = useState(false);

  // Reservation form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2 VIP Guests');
  const [requests, setRequests] = useState('');

  const handleReservation = (e: FormEvent) => {
    e.preventDefault();
    
    const message = `Hello Levernasia! 🥂 I would like to reserve a VIP Table:
• Name: ${name.trim() || 'Not provided'}
• Phone: ${phone.trim() || 'Not provided'}
• Date: ${date || 'Upcoming'}
• Guests: ${guests}
• Special Requests: ${requests.trim() || 'None'}

Please confirm table availability and booking details for me. Thank you!`;

    const whatsappUrl = `https://wa.me/917428964646?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const fetchIntel = async () => {
      setIsLoadingIntel(true);
      try {
        const res = await fetch('/api/venue-intel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            query: 'Find the latest real-time user reviews and any recent updates for "Levernasia Bar and Restaurant Sector 38 Noida". Summarize the top 3 latest insights or reviews in a short bulleted list.',
            type: 'search'
          }),
        });
        const data = await res.json();
        if (data.result) {
          setIntel(data.result);
        }
      } catch (err) {
        console.error("Failed to load intel", err);
      } finally {
        setIsLoadingIntel(false);
      }
    };
    
    // Only fetch once
    fetchIntel();
  }, []);

  return (
    <section id="location" className="py-24 bg-zinc-950 relative border-t border-red-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Reservation / Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="reservation"
          >
            <h2 className="text-red-500 font-bold tracking-widest uppercase mb-2 text-xs flex items-center gap-2">
              <span className="w-8 h-[1px] bg-red-600"></span> Join Us
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase text-white mb-8 font-serif tracking-wide">
              Reserve A VIP Table
            </h3>
            
            <form className="space-y-6" onSubmit={handleReservation}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-black/60 border border-red-600/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:bg-zinc-900/80 focus:outline-none transition-all shadow-inner text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Phone</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-black/60 border border-red-600/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:bg-zinc-900/80 focus:outline-none transition-all shadow-inner text-sm"
                    placeholder="Your Phone Number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Date</label>
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full bg-black/60 border border-red-600/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:bg-zinc-900/80 focus:outline-none transition-all shadow-inner [color-scheme:dark] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Guests</label>
                  <select 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-black/60 border border-red-600/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:bg-zinc-900/80 focus:outline-none transition-all shadow-inner appearance-none cursor-pointer text-sm"
                  >
                    <option>2 VIP Guests</option>
                    <option>3 VIP Guests</option>
                    <option>4 VIP Guests</option>
                    <option>5 VIP Guests</option>
                    <option>6+ VIP Guests</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Special Requests</label>
                <textarea 
                  rows={4}
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                  className="w-full bg-black/60 border border-red-600/30 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:bg-zinc-900/80 focus:outline-none transition-all shadow-inner resize-none text-sm"
                  placeholder="Any special occasions, preferred seating, or birthday requests?"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] border border-red-400/30 text-xs active:scale-[0.99]"
                >
                  <Send size={18} />
                  Confirm VIP Reservation via WhatsApp
                </button>
                <p className="text-[11px] text-zinc-500 text-center mt-2 font-medium">
                  ⚡ Clicking will open WhatsApp with your pre-filled reservation details.
                </p>
              </div>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="bg-zinc-900/80 backdrop-blur-xl border border-red-600/30 p-8 rounded-2xl mb-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
              <h4 className="text-xl md:text-2xl font-bold uppercase text-white mb-6 font-serif">Direct Contact</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-zinc-400">
                  <MapPin className="text-red-500 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-white mb-1 font-semibold text-sm uppercase tracking-wider">Venue Location</strong>
                    Gardens Galleria Mall, Sector 38,<br />Noida, Uttar Pradesh 201301<br />
                    <span className="text-xs text-red-400 mt-1.5 block font-medium">Free Valet Parking Available</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-zinc-400">
                  <Phone className="text-red-500 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-white mb-1 font-semibold text-sm uppercase tracking-wider">VIP Desk & WhatsApp</strong>
                    <a href="tel:07428964646" className="hover:text-red-400 transition-colors font-mono font-medium text-white">+91 74289 64646</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-zinc-400">
                  <Clock className="text-red-500 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-white mb-1 font-semibold text-sm uppercase tracking-wider">Opening Hours</strong>
                    <p className="text-white font-medium text-sm">
                      Monday – Sunday: <span className="text-red-400 font-bold ml-1">12:00 PM – 1:00 AM</span>
                    </p>
                    <span className="text-[11px] text-zinc-400 mt-1 block">Open 7 Days a Week • Lunch, Dinner & Nightlife</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="flex-1 min-h-[300px] w-full bg-black/40 rounded-2xl overflow-hidden border border-red-600/30 relative shadow-xl">
              <iframe
                title="Levernasia Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7008.331665766269!2d77.3217906!3d28.564782599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce500441a4949%3A0x918e4c8c83eab8c6!2sLevernasia!5e0!3m2!1sen!2sin!4v1784782058207!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-[1.1] sepia-[20%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>

        {/* AI Grounded Insights Section */}
        <div className="bg-black/60 border border-red-600/30 rounded-2xl p-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={100} className="text-red-500" />
          </div>
          
          <div className="relative z-10">
            <h4 className="text-xl font-bold uppercase text-white mb-2 flex items-center gap-2 font-serif">
              <Sparkles className="text-red-500" size={20} />
              Real-Time AI Insights
            </h4>
            <p className="text-xs text-zinc-400 mb-6">
              Live reviews and updates powered by Google Search Grounding.
            </p>
            
            <div className="text-zinc-300 font-light text-sm md:text-base leading-relaxed">
              {isLoadingIntel ? (
                <div className="flex items-center gap-3 text-red-400 animate-pulse text-xs font-semibold">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  Fetching latest data...
                </div>
              ) : intel ? (
                <div className="prose prose-invert max-w-none text-zinc-300 text-sm">
                  {/* simple rendering of markdown-like bullets from gemini */}
                  <div dangerouslySetInnerHTML={{ __html: intel.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
              ) : (
                <p className="text-red-400 text-xs">Failed to load real-time insights.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
