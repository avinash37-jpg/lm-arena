import { motion } from 'motion/react';
import { Instagram, ExternalLink, Video, Image as ImageIcon, Sparkles } from 'lucide-react';

interface InstaPost {
  id: string;
  type: 'reel' | 'post';
  shortcode: string;
  url: string;
  embedUrl: string;
}

const LEVERNASIA_POSTS: InstaPost[] = [
  {
    id: '1',
    type: 'reel',
    shortcode: 'Da7hsOvP2fR',
    url: 'https://www.instagram.com/reel/Da7hsOvP2fR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/reel/Da7hsOvP2fR/embed',
  },
  {
    id: '2',
    type: 'post',
    shortcode: 'DbGEWy7PN6v',
    url: 'https://www.instagram.com/p/DbGEWy7PN6v/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/p/DbGEWy7PN6v/embed',
  },
  {
    id: '3',
    type: 'post',
    shortcode: 'DbBOiw7D96y',
    url: 'https://www.instagram.com/p/DbBOiw7D96y/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/p/DbBOiw7D96y/embed',
  },
  {
    id: '4',
    type: 'reel',
    shortcode: 'Da2OvvxPXIP',
    url: 'https://www.instagram.com/reel/Da2OvvxPXIP/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/reel/Da2OvvxPXIP/embed',
  },
  {
    id: '5',
    type: 'reel',
    shortcode: 'Dao_lvXPcTd',
    url: 'https://www.instagram.com/reel/Dao_lvXPcTd/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/reel/Dao_lvXPcTd/embed',
  },
  {
    id: '6',
    type: 'post',
    shortcode: 'DavFT9FP9FM',
    url: 'https://www.instagram.com/p/DavFT9FP9FM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/p/DavFT9FP9FM/embed',
  },
];

const DJ_MISHI_POSTS: InstaPost[] = [
  {
    id: '1',
    type: 'reel',
    shortcode: 'DbDg2k7IpcQ',
    url: 'https://www.instagram.com/reel/DbDg2k7IpcQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/reel/DbDg2k7IpcQ/embed',
  },
  {
    id: '2',
    type: 'reel',
    shortcode: 'DavBjhJgvYl',
    url: 'https://www.instagram.com/reel/DavBjhJgvYl/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/reel/DavBjhJgvYl/embed',
  },
  {
    id: '3',
    type: 'reel',
    shortcode: 'Dap3Taxgo-9',
    url: 'https://www.instagram.com/reel/Dap3Taxgo-9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/reel/Dap3Taxgo-9/embed',
  },
  {
    id: '4',
    type: 'post',
    shortcode: 'DapO4RqgP4a',
    url: 'https://www.instagram.com/p/DapO4RqgP4a/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/p/DapO4RqgP4a/embed',
  },
  {
    id: '5',
    type: 'reel',
    shortcode: 'DaksmURp4wI',
    url: 'https://www.instagram.com/reel/DaksmURp4wI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/reel/DaksmURp4wI/embed',
  },
  {
    id: '6',
    type: 'post',
    shortcode: 'DahYzwOJYc1',
    url: 'https://www.instagram.com/p/DahYzwOJYc1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    embedUrl: 'https://www.instagram.com/p/DahYzwOJYc1/embed',
  },
];

export default function InstagramFeed() {
  return (
    <section id="instagram" className="py-24 bg-black relative border-t border-red-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* LEVERNASIA_LA SECTION */}
        <div className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-semibold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
            <Instagram size={14} /> Official Live Feed
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-4 flex items-center justify-center gap-3 font-serif">
            <a 
              href="https://instagram.com/levernasia_la" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-red-500 transition-colors inline-flex items-center gap-2"
            >
              @levernasia_la <ExternalLink size={24} className="text-zinc-500" />
            </a>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto mb-10">
            Recent night moments, crowd vibes, and exclusive events live from Levernasia.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEVERNASIA_POSTS.map((item, idx) => (
              <motion.div
                key={item.shortcode}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-zinc-950 rounded-2xl overflow-hidden border border-red-600/30 hover:border-red-500 transition-all shadow-xl flex flex-col group"
              >
                {/* Header bar */}
                <div className="p-3 bg-black flex items-center justify-between border-b border-red-600/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-xs font-bold tracking-wider text-zinc-300 uppercase">
                      levernasia_la
                    </span>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    item.type === 'reel' ? 'bg-red-950/80 text-red-400 border border-red-500/40' : 'bg-red-950/80 text-red-300 border border-red-500/40'
                  }`}>
                    {item.type === 'reel' ? <Video size={10} /> : <ImageIcon size={10} />}
                    {item.type}
                  </span>
                </div>

                {/* Embed container with Fallback Card so media never disappears on hosting */}
                <div className="relative w-full bg-black overflow-hidden flex-1 min-h-[440px] flex items-center justify-center">
                  <iframe 
                    src={item.embedUrl}
                    title={`Instagram ${item.type} ${item.shortcode}`}
                    className="w-full h-[460px] border-none overflow-hidden relative z-10"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  />
                  {/* Fallback card if iframe is blocked by domain security policies */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-900 via-black to-zinc-950 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/50 flex items-center justify-center mb-4 text-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                      <Instagram size={32} />
                    </div>
                    <p className="text-white text-sm font-bold uppercase tracking-wider mb-2 font-serif">Levernasia Official Instagram</p>
                    <p className="text-zinc-400 text-xs mb-6 max-w-xs">Tap below to view live reel & nightlife video on Instagram</p>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                      <Sparkles size={12} /> View Reel
                    </span>
                  </div>
                </div>

                {/* Direct Action Link Footer */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 bg-black hover:bg-red-600 hover:text-white text-zinc-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border-t border-red-600/20"
                >
                  <Instagram size={14} /> Open on Instagram <ExternalLink size={12} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DJ MISHI SECTION */}
        <div className="text-center border-t border-red-600/20 pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-semibold tracking-widest uppercase mb-4">
            <Instagram size={14} /> Resident DJ
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-4 flex items-center justify-center gap-3 font-serif">
            <a 
              href="https://instagram.com/djmishi_" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-red-400 transition-colors inline-flex items-center gap-2"
            >
              @djmishi_ <ExternalLink size={24} className="text-zinc-500" />
            </a>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto mb-10">
            Live sets, beat drops, and behind-the-decks energy from DJ Mishi at Levernasia.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DJ_MISHI_POSTS.map((item, idx) => (
              <motion.div
                key={item.shortcode}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-zinc-950 rounded-2xl overflow-hidden border border-red-600/30 hover:border-red-500 transition-all shadow-xl flex flex-col group"
              >
                {/* Header bar */}
                <div className="p-3 bg-black flex items-center justify-between border-b border-red-600/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-xs font-bold tracking-wider text-zinc-300 uppercase">
                      djmishi_
                    </span>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    item.type === 'reel' ? 'bg-red-950/80 text-red-400 border border-red-500/40' : 'bg-red-950/80 text-red-300 border border-red-500/40'
                  }`}>
                    {item.type === 'reel' ? <Video size={10} /> : <ImageIcon size={10} />}
                    {item.type}
                  </span>
                </div>

                {/* Embed container with Fallback Card so media never disappears on hosting */}
                <div className="relative w-full bg-black overflow-hidden flex-1 min-h-[440px] flex items-center justify-center">
                  <iframe 
                    src={item.embedUrl}
                    title={`Instagram ${item.type} ${item.shortcode}`}
                    className="w-full h-[460px] border-none overflow-hidden relative z-10"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  />
                  {/* Fallback card if iframe is blocked by domain security policies */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-900 via-black to-zinc-950 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/50 flex items-center justify-center mb-4 text-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                      <Instagram size={32} />
                    </div>
                    <p className="text-white text-sm font-bold uppercase tracking-wider mb-2 font-serif">DJ Mishi Official Instagram</p>
                    <p className="text-zinc-400 text-xs mb-6 max-w-xs">Tap below to watch live DJ set & beat drop on Instagram</p>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                      <Sparkles size={12} /> Watch Set
                    </span>
                  </div>
                </div>

                {/* Direct Action Link Footer */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 bg-black hover:bg-red-600 hover:text-white text-zinc-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border-t border-red-600/20"
                >
                  <Instagram size={14} /> Open on Instagram <ExternalLink size={12} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
