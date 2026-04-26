import { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Sliders, ChevronRight, Moon, Sun, Globe, LogOut, Save, Check, ToggleLeft, ToggleRight } from 'lucide-react';

const Toggle = ({ enabled, onToggle, label, description }) => (
  <div className="flex items-center justify-between py-4 group">
    <div>
      <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">{label}</span>
      {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
    </div>
    <button
      onClick={onToggle}
      className="transition-colors"
      aria-label={`Toggle ${label}`}
    >
      {enabled ? (
        <ToggleRight size={32} className="text-amber-500" />
      ) : (
        <ToggleLeft size={32} className="text-slate-300" />
      )}
    </button>
  </div>
);

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    emailAlerts: true,
    mutationDiscovery: true,
    dataSharing: false,
    autoRefine: true,
    language: 'English',
    algorithmSpeed: 75,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const settingSections = [
    {
      title: 'Profile',
      icon: User,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0f172a] to-slate-700 flex items-center justify-center shadow-md">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">User #141</h4>
              <p className="text-sm text-slate-500">Member since March 2026</p>
              <p className="text-xs text-amber-600 font-medium mt-1">Gold Tier • 247 interactions</p>
            </div>
          </div>
          <div className="grid gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Display Name</label>
              <input type="text" defaultValue="User #141" className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</label>
              <input type="email" defaultValue="user141@evolver.net" className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Notifications',
      icon: Bell,
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-50',
      content: (
        <div className="divide-y divide-slate-100">
          <Toggle label="Push Notifications" description="Get notified when new recommendations arrive" enabled={settings.notifications} onToggle={() => toggleSetting('notifications')} />
          <Toggle label="Email Alerts" description="Weekly digest of top recommendations" enabled={settings.emailAlerts} onToggle={() => toggleSetting('emailAlerts')} />
        </div>
      ),
    },
    {
      title: 'Algorithm Preferences',
      icon: Sliders,
      iconColor: 'text-violet-500',
      iconBg: 'bg-violet-50',
      content: (
        <div className="space-y-5">
          <Toggle label="Mutation Discovery" description="Allow surprise recommendations outside your profile" enabled={settings.mutationDiscovery} onToggle={() => toggleSetting('mutationDiscovery')} />
          <Toggle label="Auto-Refine Profile" description="Automatically improve recommendations based on behavior" enabled={settings.autoRefine} onToggle={() => toggleSetting('autoRefine')} />
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-slate-800">Algorithm Speed</span>
              <span className="text-sm font-bold text-amber-600">{settings.algorithmSpeed}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={settings.algorithmSpeed}
              onChange={(e) => {
                setSettings(prev => ({ ...prev, algorithmSpeed: Number(e.target.value)}));
                setSaved(false);
              }}
              className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Conservative</span>
              <span>Aggressive</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Appearance',
      icon: Palette,
      iconColor: 'text-pink-500',
      iconBg: 'bg-pink-50',
      content: (
        <div className="space-y-4">
          <Toggle label="Dark Mode" description="Switch to a darker color scheme" enabled={settings.darkMode} onToggle={() => toggleSetting('darkMode')} />
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Language</label>
            <select
              value={settings.language}
              onChange={(e) => {
                setSettings(prev => ({ ...prev, language: e.target.value }));
                setSaved(false);
              }}
              className="mt-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all appearance-none cursor-pointer"
            >
              <option>English</option>
              <option>Arabic</option>
              <option>French</option>
              <option>Spanish</option>
              <option>German</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-50',
      content: (
        <div className="space-y-4">
          <Toggle label="Data Sharing" description="Share anonymized behavioral data to improve AI" enabled={settings.dataSharing} onToggle={() => toggleSetting('dataSharing')} />
          <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-between group">
            <div>
              <span className="text-sm font-semibold text-slate-800">Export Your Data</span>
              <p className="text-xs text-slate-400 mt-0.5">Download all your behavioral data as JSON</p>
            </div>
            <ChevronRight size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
          </button>
          <button className="w-full text-left p-4 rounded-xl border border-red-100 hover:bg-red-50 transition-colors flex items-center justify-between group">
            <div>
              <span className="text-sm font-semibold text-red-600">Delete Account</span>
              <p className="text-xs text-red-400 mt-0.5">Permanently remove all data and preferences</p>
            </div>
            <ChevronRight size={16} className="text-red-300 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Page Header */}
      <div className="mb-10 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-700 to-slate-500 flex items-center justify-center shadow-lg">
              <SettingsIcon size={20} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h2>
          </div>
          <p className="text-slate-500">Manage your profile, algorithm preferences, and privacy settings.</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all active:scale-95 ${
            saved
              ? 'bg-emerald-500 text-white shadow-emerald-200'
              : 'bg-[#0f172a] text-white hover:bg-slate-800 shadow-slate-200'
          }`}
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6 max-w-3xl">
        {settingSections.map((section, i) => {
          const Icon = section.icon;
          return (
            <div key={i} className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className={`w-9 h-9 rounded-xl ${section.iconBg} flex items-center justify-center`}>
                  <Icon size={18} className={section.iconColor} />
                </div>
                <h3 className="text-md font-bold text-slate-900">{section.title}</h3>
              </div>
              {section.content}
            </div>
          );
        })}
      </div>

      {/* Sign Out */}
      <div className="mt-8 max-w-3xl">
        <button className="flex items-center gap-2 px-5 py-3 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all font-medium text-sm border border-transparent hover:border-red-100">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
