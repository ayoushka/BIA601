import { ShoppingCart, User, Bell, X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const notifications = [
  { id: 1, text: 'New recommendation: Quantum Headphones are a 98% match!', time: '2m ago', read: false },
  { id: 2, text: 'Your genome profile has been updated with 12 new data points.', time: '1h ago', read: false },
  { id: 3, text: 'Mutation Discovery: Try our Lifestyle collection.', time: '3h ago', read: true },
  { id: 4, text: 'Algorithm evolved to Gen 4.2 — improved accuracy by 5%.', time: '1d ago', read: true },
];

export default function Header({ activePage, onNavigate, cartCount, onCartOpen, userProfile, activeUserId, onUserSwitch }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const notifRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
       try {
          const res = await fetch('http://localhost:8000/users');
          const data = await res.json();
          setUsersList(data.users || []);
       } catch(e) {}
    };
    fetchUsers();
    
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a] text-white shadow-xl border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('recommendations')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-md shadow-brand-gold/20 shrink-0">
            <span className="font-extrabold text-[#0f172a] text-sm tracking-tighter">AI</span>
          </div>
          <h1 className="text-xl font-bold tracking-wider text-white hidden sm:block">
            Evolver<span className="text-brand-gold">.net</span>
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
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              className="relative text-slate-400 hover:text-white transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold rounded-full border-2 border-[#0f172a] flex items-center justify-center">
                  <span className="text-[8px] font-bold text-[#0f172a]">{unreadCount}</span>
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">Notifications</h4>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={14} />
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-default ${
                        !notif.read ? 'bg-amber-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {!notif.read && (
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 shrink-0"></div>
                        )}
                        <div className={!notif.read ? '' : 'ml-5'}>
                          <p className="text-sm text-slate-700 leading-relaxed">{notif.text}</p>
                          <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <button 
            className="relative text-slate-400 hover:text-white transition-colors"
            onClick={onCartOpen}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-brand-gold rounded-full flex items-center justify-center shadow-md">
                <span className="text-[10px] font-bold text-[#0f172a]">{cartCount}</span>
              </span>
            )}
          </button>

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
