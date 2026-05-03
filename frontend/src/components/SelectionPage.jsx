import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Activity, LayoutGrid } from 'lucide-react';

export default function SelectionPage({ activeUserId, onUserSwitch, setAlgorithmType }) {
  const navigate = useNavigate();

  // Generate 1000 users for the dropdown
  const userOptions = Array.from({ length: 1000 }, (_, i) => i + 1);

  const handleSelection = (algoType) => {
    setAlgorithmType(algoType);
    navigate('/store');
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/30">
            <User size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Configure Session</h2>
          <p className="text-slate-500">Select a user profile and the recommendation algorithm.</p>
        </div>

        <div className="mb-10">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
            Choose User Profile
          </label>
          <div className="relative">
            <select
              value={activeUserId}
              onChange={(e) => onUserSwitch(Number(e.target.value))}
              className="block w-full pl-4 pr-10 py-4 text-base border-2 border-slate-200 focus:outline-none focus:ring-0 focus:border-amber-500 sm:text-lg rounded-2xl appearance-none bg-slate-50 font-semibold text-slate-800 transition-colors cursor-pointer"
            >
              {userOptions.map((id) => (
                <option key={id} value={id}>
                  User #{id}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
            Select Algorithm & Enter Store
          </label>
          <div className="grid sm:grid-cols-2 gap-4">
            
            <button
              onClick={() => handleSelection('GA')}
              className="flex flex-col items-center justify-center p-8 bg-white border-2 border-slate-200 rounded-2xl hover:border-amber-500 hover:bg-amber-50 group transition-all"
            >
              <Activity size={40} className="text-slate-400 group-hover:text-amber-500 mb-4 transition-colors" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">GA</h3>
              <p className="text-sm text-slate-500 text-center font-medium">Genetic Algorithm</p>
            </button>

            <button
              onClick={() => handleSelection('NGA')}
              className="flex flex-col items-center justify-center p-8 bg-white border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 group transition-all"
            >
              <LayoutGrid size={40} className="text-slate-400 group-hover:text-blue-500 mb-4 transition-colors" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">NGA</h3>
              <p className="text-sm text-slate-500 text-center font-medium">Non-Genetic Baseline</p>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
