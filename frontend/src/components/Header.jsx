import { User, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

// this is the top menu bar of the website where you can switch users
export default function Header({ activePage, onNavigate, userProfile, activeUserId, onUserSwitch }) {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
       try {
          const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
          const res = await fetch(`${API_BASE_URL}/users`);
          const data = await res.json();
          setUsersList(data.users || []);
       } catch(e) {}
    };
    fetchUsers();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a] text-white shadow-xl border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('recommendations')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-md shadow-brand-gold/20 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m8 22 8-20"/><path d="m16 22-8-20"/><path d="M14 6h-4"/><path d="M15.5 10.5h-7"/><path d="M16 14h-8"/><path d="M14 18h-4"/></svg>
          </div>
          <h1 className="text-xl font-bold tracking-wider text-white hidden sm:block">
            Genetic Algorithm Recommendations
          </h1>
        </div>
        
        {/* Central Demographic Information */}
        <div className="hidden md:flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2">
           <span className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-0.5">Active Subject Profile</span>
           {userProfile ? (
              <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700 shadow-inner">
                 <User size={14} className="text-brand-gold" />
                 <span className="text-sm font-semibold tracking-wide text-white">Age {userProfile.age}</span>
                 <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                 <span className="text-sm font-semibold tracking-wide text-white">{userProfile.country}</span>
              </div>
           ) : (
              <div className="text-sm text-slate-400 font-medium bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700 animate-pulse">
                Fetching Data Logs...
              </div>
           )}
        </div>

        <div className="flex items-center gap-5 relative z-10">
          {/* User Switcher Simulator */}
          <div className="flex items-center pl-5 border-l border-slate-700">
            <div className="relative group">
               <span className="absolute -top-5 right-1 text-[9px] uppercase tracking-widest text-[#0f172a] font-extrabold bg-brand-gold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">Swap Matrix</span>
               <select 
                  className="appearance-none bg-slate-800 border border-slate-600 text-white text-xs font-semibold rounded-lg pl-3 pr-8 py-2.5 hover:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold cursor-pointer transition-all max-w-[220px] shadow-sm truncate"
                  value={activeUserId}
                  onChange={(e) => onUserSwitch(Number(e.target.value))}
               >
                  {usersList.length === 0 && <option value={activeUserId}>User #{activeUserId}</option>}
                  {usersList.map(u => (
                     <option key={u.id} value={u.id}>{u.display}</option>
                  ))}
               </select>
               <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-brand-gold" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
