import { User, ChevronDown, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Header({ userProfile, activeUserId, onUserSwitch }) {
  const [usersList, setUsersList] = useState([]);
  const location = useLocation();

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

  const isLandingPage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a] text-white shadow-xl border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-md shadow-brand-gold/20 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m8 22 8-20"/><path d="m16 22-8-20"/><path d="M14 6h-4"/><path d="M15.5 10.5h-7"/><path d="M16 14h-8"/><path d="M14 18h-4"/></svg>
          </div>
          <h1 className="text-xl font-bold tracking-wider text-white hidden sm:block">
            Genetic Recommendations
          </h1>
        </Link>
        
        {/* Central Demographic Information */}
        {!isLandingPage && (
          <div className="hidden md:flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2">
             <span className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-0.5">Active Subject Profile</span>
             {userProfile ? (
                <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700 shadow-inner">
                   <User size={14} className="text-amber-500" />
                   <span className="text-sm font-semibold tracking-wide text-white">Age {userProfile.age}</span>
                   <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                   <span className="text-sm font-semibold tracking-wide text-white">{userProfile.country}</span>
                </div>
             ) : (
                <div className="text-sm text-slate-400 font-medium bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700">
                  User #{activeUserId}
                </div>
             )}
          </div>
        )}

        <div className="flex items-center gap-5 relative z-10">
          {/* Right side actions removed per user request */}
        </div>
      </div>
    </header>
  );
}
