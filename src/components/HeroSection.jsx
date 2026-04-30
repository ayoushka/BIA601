import { Dna, Zap } from 'lucide-react';

// this is the big introduction banner at the top of the page
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0f172a] text-white py-16 sm:py-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-600/15 via-[#0f172a]/0 to-transparent"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-gold-light opacity-5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-amber-400 mb-8 backdrop-blur-md shadow-lg">
            <Zap size={14} className="animate-pulse" />
            <span>Gen 4.2 Algorithm Currently Active</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Genetic Algorithm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
              Recommendations
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10 mx-auto md:mx-0">
            We don't just filter products. We use genetic algorithms to evolve lists based on your unique behavior. Survival of the fittest means only the perfect match makes it to your screen.
          </p>
        </div>
        
        <div className="hidden lg:flex flex-1 justify-end perspective-[1000px]">
           <div className="w-[400px] h-[400px] glass-panel bg-white/5 rounded-3xl p-6 border border-white/10 shadow-2xl relative rotate-[5deg] hover:rotate-[2deg] transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:bg-white/10 cursor-default">
              <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-4">
                  <div className="bg-gradient-to-br from-amber-500/20 to-amber-500/5 rounded-2xl border border-amber-500/20 shadow-inner flex flex-col justify-end p-4">
                      <div className="w-12 h-2 bg-amber-500/40 rounded-full mb-2"></div>
                      <div className="w-20 h-2 bg-amber-500/20 rounded-full"></div>
                  </div>
                  <div className="bg-white/5 rounded-2xl border border-white/5 shadow-inner"></div>
                  <div className="bg-white/5 rounded-2xl border border-white/5 shadow-inner flex items-center justify-center overflow-hidden">
                     <div className="w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
                     <Dna size={48} className="text-amber-500/40 absolute drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                  </div>
                  <div className="bg-gradient-to-tl from-[#0f172a] to-slate-800 rounded-2xl border border-white/5 shadow-inner p-4">
                      <div className="flex gap-1 items-end h-full">
                         {[40, 70, 45, 90, 60].map((h, i) => (
                             <div key={i} className="w-full bg-slate-600 rounded-t-sm" style={{height: `${h}%`}}></div>
                         ))}
                      </div>
                  </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-brand-gold text-[#0f172a] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-[#0f172a]">
                  98% Confidence
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
