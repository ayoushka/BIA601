import { Dna, Zap, BookOpen, BrainCircuit, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex-grow flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0f172a] text-white py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-600/15 via-[#0f172a]/0 to-transparent"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-gold-light opacity-5 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-amber-400 mb-8 backdrop-blur-md shadow-lg">
              <Zap size={14} className="animate-pulse" />
              <span>BIA601 Academic Project</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              E-Commerce <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">
                Genetic Algorithm
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10 mx-auto md:mx-0">
              Welcome to the Genetic Store. We don't just filter products; we use a genetic algorithm to evolve product recommendations based on simulated user profiles and behavior.
            </p>
            <Link to="/selection" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95">
              Get Started <ArrowRight size={20} />
            </Link>
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

      {/* User Guide & How GA Works */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-16 grid md:grid-cols-2 gap-12">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
            <BookOpen size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">User Guide</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            This dashboard simulates an e-commerce platform that adapts to users. Here is how to use it:
          </p>
          <ul className="space-y-3 text-slate-600 list-disc list-inside">
            <li>Click <strong>Get Started</strong> to navigate to the selection page.</li>
            <li>Select a user profile from the dataset. Each user has unique preferences.</li>
            <li>Choose either the <strong>Genetic Algorithm (GA)</strong> or a <strong>Non-Genetic Algorithm (NGA)</strong> baseline.</li>
            <li>View the resulting product recommendations in the store interface.</li>
            <li>Interact with products (Add to Cart, Skip) to simulate shopping behavior.</li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
            <BrainCircuit size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            How Genetic Algorithms Work <Dna size={20} className="text-amber-500" />
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify">
            A Genetic Algorithm (GA) is an optimization technique that mimics biological evolution to improve product recommendations in e-commerce. It starts with random lists of products (chromosomes) and evolves them step by step based on user behavior. The algorithm works through selection, crossover, and mutation. In each generation, the best performing recommendation lists (highest fitness) are chosen, combined, and slightly altered to create new lists. Over time, this cycle increases the chance of showing products the user is likely to buy. Genetic Algorithms are ideal for recommendation systems because they explore many combinations and adapt to individual preferences. By simulating evolution, our engine continuously refines product suggestions, turning clicks and purchases into smarter, personalized shopping experiences.
          </p>
        </div>
      </section>
    </div>
  );
}
