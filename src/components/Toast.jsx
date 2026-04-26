import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

export default function Toast({ message, isVisible, onClose, type = 'success' }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Small delay for mount animation
      requestAnimationFrame(() => setShow(true));
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-300 ${
      show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md ${
        type === 'success' 
          ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/30' 
          : 'bg-red-500 text-white border-red-400 shadow-red-500/30'
      }`}>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
          type === 'success' ? 'bg-white/20' : 'bg-white/20'
        }`}>
          <Check size={14} className="text-white" />
        </div>
        <span className="text-sm font-semibold">{message}</span>
        <button 
          onClick={() => { setShow(false); setTimeout(onClose, 300); }}
          className="ml-2 text-white/60 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
