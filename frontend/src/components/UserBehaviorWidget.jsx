import { Activity, BrainCircuit, RefreshCw, AlertTriangle, Fingerprint, MousePointerClick, Eye, ShoppingCart } from 'lucide-react';

// this widget shows the user's history and behavior on the side
export default function UserBehaviorWidget({ rejectedCount, dna }) {
  if (!dna) return null;

  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
           <div>
               <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                 <BrainCircuit className="text-brand-gold" size={24} />
                 Historical DNA log
               </h3>
               <p className="text-xs text-slate-500 mt-1.5 font-medium flex items-center gap-1">
                 <Fingerprint size={12} /> Mapping baseline behavior
               </p>
           </div>
           <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-400 shadow-sm">
               <Activity size={22} className={rejectedCount > 0 ? "text-brand-gold animate-pulse" : "text-blue-500"} />
           </div>
        </div>

        {/* Dynamic State */}
        <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-200 transition-colors duration-500">
          <div className="flex items-center gap-3 mb-2">
            <RefreshCw 
              size={16} 
              className={`${rejectedCount > 0 ? 'text-brand-gold animate-[spin_3s_linear_infinite]' : 'text-blue-500'}`} 
            />
            <span className="text-sm font-bold text-slate-800">
              {rejectedCount > 0 ? `Adapting to Rejection...` : 'Algorithm Locked'}
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed min-h-[30px]">
            {rejectedCount > 0 
              ? `You've specifically rejected ${rejectedCount} item(s) from this session's pool.` 
              : `Generations are currently built exactly on the historical DNA listed below.`}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
           <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center transition-all hover:bg-emerald-50 hover:border-emerald-200 group">
              <ShoppingCart size={16} className="text-emerald-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xl font-black text-slate-800">{dna.purchases}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bought</div>
           </div>
           <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center transition-all hover:bg-blue-50 hover:border-blue-200 group">
              <MousePointerClick size={16} className="text-blue-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xl font-black text-slate-800">{dna.clicks}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clicks</div>
           </div>
           <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center transition-all hover:bg-purple-50 hover:border-purple-200 group">
              <Eye size={16} className="text-purple-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xl font-black text-slate-800">{dna.views}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Views</div>
           </div>
        </div>

        {/* Progress Bars */}
        <div className="mt-2">
          <h4 className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-4">Historical Alignment Matrix</h4>
          <div className="flex flex-col gap-4">
            {dna.distribution.map((stat, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-end mb-1.5">
                  <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">{stat.category}</span>
                  <span className="text-sm font-black text-slate-800">{stat.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`${stat.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${stat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insight Alert */}
        <div className="mt-2 bg-amber-50/80 text-amber-900 p-4 rounded-xl text-sm flex items-start gap-3 border border-amber-200 shadow-sm">
           <AlertTriangle size={16} className="text-brand-gold shrink-0 mt-0.5" />
           <p className="text-xs font-medium leading-relaxed">
             <strong>Baseline Rule:</strong> This Active User historically defaults heavily to <span className="underline decoration-amber-300 underline-offset-2 font-bold">{dna.top_category}</span>. The genetic cross-overs above are heavily weighted from this initial anchor.
           </p>
        </div>
      </div>
    </div>
  );
}
