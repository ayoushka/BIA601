import { Dna, TrendingUp, Eye, Clock, MousePointerClick, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';

const genomeTraits = [
  { label: 'Tech Enthusiast', strength: 92, trend: 'up', color: 'from-blue-500 to-cyan-400' },
  { label: 'Design Seeker', strength: 78, trend: 'up', color: 'from-violet-500 to-purple-400' },
  { label: 'Value Hunter', strength: 65, trend: 'down', color: 'from-emerald-500 to-green-400' },
  { label: 'Early Adopter', strength: 88, trend: 'up', color: 'from-amber-500 to-yellow-400' },
  { label: 'Quality Oriented', strength: 95, trend: 'up', color: 'from-rose-500 to-pink-400' },
  { label: 'Impulse Buyer', strength: 23, trend: 'down', color: 'from-slate-500 to-gray-400' },
];

const browsingHistory = [
  { time: '2 min ago', action: 'Viewed', item: 'Quantum Headphones', category: 'Electronics', icon: Eye },
  { time: '5 min ago', action: 'Clicked', item: 'Mesh Chair v2', category: 'Workspace', icon: MousePointerClick },
  { time: '12 min ago', action: 'Viewed', item: 'Smart Desk Organizer', category: 'Accessories', icon: Eye },
  { time: '18 min ago', action: 'Clicked', item: 'Mechanical Keyboard', category: 'Electronics', icon: MousePointerClick },
  { time: '25 min ago', action: 'Viewed', item: 'Pour-Over Coffee Kit', category: 'Lifestyle', icon: Eye },
  { time: '1 hr ago', action: 'Clicked', item: 'Wireless Charger Pro', category: 'Electronics', icon: MousePointerClick },
];

const stats = [
  { label: 'Products Viewed', value: '247', change: '+12%', up: true },
  { label: 'Avg. Session', value: '8m 42s', change: '+23%', up: true },
  { label: 'Recommendations Accepted', value: '68%', change: '+5%', up: true },
  { label: 'Mutations Explored', value: '14', change: '-3%', up: false },
];

// this is the page that shows the user their behavior stats like dna traits
export default function DataDNAPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-500 to-purple-400 flex items-center justify-center shadow-lg">
            <Dna size={20} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Your Data DNA</h2>
        </div>
        <p className="text-slate-500 max-w-2xl">A deep dive into your behavioral genome. Every interaction shapes your recommendation profile — here's what we see.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-extrabold text-slate-900">{stat.value}</span>
              <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
              }`}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Genome Traits */}
        <div className="xl:col-span-2 bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 size={20} className="text-violet-500" />
                Behavioral Genome
              </h3>
              <p className="text-xs text-slate-500 mt-1">Trait analysis based on 247 data points</p>
            </div>
            <span className="text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">Last 30 days</span>
          </div>

          <div className="grid gap-5">
            {genomeTraits.map((trait, i) => (
              <div key={i} className="group">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors flex items-center gap-2">
                    {trait.label}
                    {trait.trend === 'up' ? (
                      <ArrowUpRight size={14} className="text-emerald-500" />
                    ) : (
                      <ArrowDownRight size={14} className="text-red-400" />
                    )}
                  </span>
                  <span className="font-bold text-slate-900">{trait.strength}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden ring-1 ring-inset ring-slate-200/50">
                  <div
                    className={`bg-gradient-to-r ${trait.color} h-3 rounded-full transition-all duration-1000 ease-out shadow-sm`}
                    style={{ width: `${trait.strength}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="xl:col-span-1 bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock size={20} className="text-amber-500" />
              Activity Feed
            </h3>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {browsingHistory.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-default">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    item.action === 'Clicked' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'
                  }`}>
                    <Icon size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      <span className={`font-medium ${item.action === 'Clicked' ? 'text-amber-600' : 'text-blue-500'}`}>{item.action}</span>
                      {' '}{item.item}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">{item.time}</span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs text-slate-500 font-medium">{item.category}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Genome Evolution Timeline */}
      <div className="mt-8 bg-gradient-to-br from-[#0f172a] to-slate-800 rounded-3xl p-6 lg:p-8 text-white shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp size={20} className="text-amber-400" />
              Genome Evolution
            </h3>
            <p className="text-sm text-slate-400 mt-1">How your preference profile has evolved over time</p>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 items-end h-48">
          {[
            { day: 'Mon', vals: [65, 40, 20] },
            { day: 'Tue', vals: [70, 45, 25] },
            { day: 'Wed', vals: [60, 50, 30] },
            { day: 'Thu', vals: [80, 35, 22] },
            { day: 'Fri', vals: [85, 55, 28] },
            { day: 'Sat', vals: [75, 60, 35] },
            { day: 'Sun', vals: [92, 48, 30] },
          ].map((col, i) => (
            <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
              <div className="flex gap-0.5 items-end flex-1 w-full">
                <div className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-sm transition-all duration-500 hover:opacity-80" style={{ height: `${col.vals[0]}%` }}></div>
                <div className="w-full bg-gradient-to-t from-amber-500 to-yellow-400 rounded-t-sm transition-all duration-500 hover:opacity-80" style={{ height: `${col.vals[1]}%` }}></div>
                <div className="w-full bg-gradient-to-t from-emerald-500 to-green-400 rounded-t-sm transition-all duration-500 hover:opacity-80" style={{ height: `${col.vals[2]}%` }}></div>
              </div>
              <span className="text-xs text-slate-400 mt-2 font-medium">{col.day}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-400">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-gradient-to-r from-blue-500 to-cyan-400"></div>Electronics</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-gradient-to-r from-amber-500 to-yellow-400"></div>Workspace</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-gradient-to-r from-emerald-500 to-green-400"></div>Lifestyle</div>
        </div>
      </div>
    </div>
  );
}
