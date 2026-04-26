import { Sparkles, X, ShoppingCart, Check, Star, Eye, Flame, CreditCard } from 'lucide-react';
import { useState } from 'react';

export default function ProductCard({ product, setId, onInteraction }) {
  const [isEvolving, setIsEvolving] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [justBought, setJustBought] = useState(false);

  const handleRemove = () => {
    setIsEvolving(true);
    // Academic Requirement: Wait 1.5s to show mutation loading state visually
    setTimeout(() => {
      onInteraction(setId, 'pass', product);
    }, 1500); 
  };

  const handleAddToCart = () => {
    setJustAdded(true);
    onInteraction(setId, 'cart', product);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handlePurchase = () => {
    setJustBought(true);
    onInteraction(setId, 'purchase', product);
    setTimeout(() => setJustBought(false), 1200);
  };

  return (
    <div 
      className={`min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:-translate-y-2 hover:shadow-2xl hover:border-slate-300 relative ${
        product.isMutation ? 'ring-2 ring-brand-gold ring-offset-2' : ''
      }`}
    >
      {/* Mutating 'Academic' Overlay */}
      {isEvolving && (
         <div className="absolute inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center animate-in fade-in duration-300">
             <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner border border-brand-gold/50">
                <span className="text-3xl animate-spin inline-block">🧬</span>
             </div>
             <h3 className="text-lg font-bold text-brand-gold mb-1 tracking-wider uppercase">Evolving Generation...</h3>
             <p className="text-xs text-slate-300">Injecting unviewed parameters derived from genetic crossover.</p>
         </div>
      )}

      {/* Top Badges overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-md backdrop-blur-md border border-white/20 inline-flex w-max ${
          product.fitnessScore > 90 ? 'bg-emerald-500/90 text-white' : 
          product.fitnessScore > 80 ? 'bg-blue-500/90 text-white' : 
          'bg-amber-500/90 text-[#0f172a]'
        }`}>
          {product.fitnessScore}% Match
        </div>
        
        {/* Academic Location Social Proof */}
        {product.trendingBadge && (
           <div className="px-3 py-1.5 rounded-full bg-rose-500/90 text-white text-[10px] font-bold shadow-md backdrop-blur-md border border-white/20 inline-flex items-center gap-1 w-max">
              <Flame size={12} fill="currentColor" /> {product.trendingBadge}
           </div>
        )}
      </div>

      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
        {product.isMutation && (
          <div className="bg-brand-gold text-[#0f172a] p-1.5 rounded-full shadow-lg border border-white flex items-center justify-center shrink-0 w-8 h-8">
            <Sparkles size={16} className="animate-pulse absolute" />
          </div>
        )}
      </div>

      {/* Image container */}
      <div className="relative h-48 sm:h-56 bg-slate-100 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex justify-between items-center">
            {product.category}
            {product.isMutation && <span className="text-brand-gold font-bold normal-case tracking-normal text-[10px] bg-slate-900 px-1.5 py-0.5 rounded">Discovery</span>}
        </div>
        
        <h3 className="text-lg font-bold text-slate-800 leading-tight mb-2 group-hover:text-[#0f172a] transition-colors truncate">
          {product.name}
        </h3>
        
        {/* Ratings & Insights */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
           <div className="flex items-center text-amber-500 text-sm font-bold tracking-tight bg-amber-50 px-2 py-0.5 rounded">
              <Star size={12} fill="currentColor" className="mr-1" />
              {product.averageRating || '4.5'}
           </div>

           {product.isTopRated && (
               <div className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                   Top Rated
               </div>
           )}
           
           {product.userInsight && (
               <div className="flex items-center text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded text-[10px] font-semibold">
                   <Eye size={10} className="mr-1" />
                   Viewed Previously
               </div>
           )}
        </div>

        <p className="text-2xl font-extrabold text-[#0f172a] mt-auto pb-4">
          ${product.price.toFixed(2)}
        </p>
        
        <div className="flex flex-col gap-2 mt-auto">
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={handleAddToCart}
              disabled={justAdded}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all font-semibold text-xs shadow-sm active:scale-95 group/btn ${
                justAdded
                  ? 'bg-emerald-500 text-white shadow-emerald-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-2 focus:ring-slate-300'
              }`}
            >
              {justAdded ? (
                <><Check size={14} /><span>Added</span></>
              ) : (
                <><ShoppingCart size={14} className="group-hover/btn:scale-110 transition-transform" /><span>Cart (+5)</span></>
              )}
            </button>

            <button 
              onClick={handlePurchase}
              disabled={justBought}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all font-bold text-xs shadow-sm active:scale-95 group/btn ${
                justBought
                  ? 'bg-brand-gold text-white shadow-brand-gold/30'
                  : 'bg-[#0f172a] text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-[#0f172a]/20'
              }`}
            >
              {justBought ? (
                <><Check size={14} /><span>Bought!</span></>
              ) : (
                <><CreditCard size={14} className="group-hover/btn:scale-110 transition-transform" /><span>Buy (+10)</span></>
              )}
            </button>
          </div>
          
          <button 
            onClick={handleRemove}
            className="flex items-center justify-center gap-1.5 py-2 w-full rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-all font-semibold text-xs shadow-none active:scale-95 group/btn"
            aria-label="Remove item"
          >
            <X size={14} className="group-hover/btn:scale-110 transition-transform" />
            <span>Remove (Unfit)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
