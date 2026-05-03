import { Share2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';

export default function StorePage({
  activeUserId,
  algorithmType,
  loading,
  recommendations,
  handleInteraction,
}) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10 mb-10 flex-grow">
      <div className="flex flex-col md:flex-row items-center justify-between bg-[#0f172a] p-6 rounded-3xl text-white shadow-xl shadow-brand-gold/10 border border-slate-800">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Share2 className="text-brand-gold" /> {algorithmType === 'GA' ? 'Genetic Algorithm' : 'Non-Genetic Baseline'} Recommendation Engine
          </h2>
          <p className="text-slate-400 mt-1 max-w-xl text-sm">
            {algorithmType === 'GA' 
              ? `The Genetic Algorithm has evaluated thousands of combinations to find the absolute best products tailored to User #${activeUserId}.`
              : `Showing baseline recommendations for User #${activeUserId} using standard filtering methods.`}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 mt-10">
          <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <span className="text-4xl animate-spin inline-block">
              {algorithmType === 'GA' ? '🧬' : '⚙️'}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            {algorithmType === 'GA' ? 'Analyzing Behavioral DNA & Running GA...' : 'Fetching Baseline Recommendations...'}
          </h3>
          <p className="text-slate-500">Generating optimal recommendations for User #{activeUserId}</p>
        </div>
      ) : (
        <div className="mt-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8 relative">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
              <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                Final {algorithmType === 'GA' ? 'Genetic Algorithm' : 'NGA'} Recommendations
              </h3>
              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Top 5 Best Fit</span>
              </div>
            </div>
            
            <ProductGrid 
              products={recommendations} 
              setId="Final"
              onInteraction={handleInteraction}
              activeUserId={activeUserId}
            />

            <div className="mt-12 text-center">
               <Link to="/selection" className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 font-bold px-6 py-3 rounded-xl border-2 border-slate-200 hover:border-amber-200 hover:bg-amber-50 transition-all">
                  <ArrowLeft size={18} /> Back to Selection
               </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
