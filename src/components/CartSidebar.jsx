import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

export default function CartSidebar({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center">
              <ShoppingCart size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Your Cart</h3>
              <p className="text-xs text-slate-400">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart size={32} className="text-slate-300" />
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">Cart is empty</h4>
              <p className="text-sm text-slate-400 max-w-xs">
                Add products from your AI recommendations to get started.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-slate-200 transition-colors">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 truncate">{item.name}</h4>
                    <p className="text-xs text-slate-400 font-medium">{item.category}</p>
                    <p className="text-lg font-extrabold text-[#0f172a] mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="flex items-center gap-1 bg-white rounded-lg border border-slate-200 shadow-sm">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-bold text-slate-900 min-w-[20px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-slate-500">Subtotal</span>
              <span className="text-2xl font-extrabold text-[#0f172a]">${total.toFixed(2)}</span>
            </div>
            <button className="w-full py-3.5 rounded-xl bg-brand-gold hover:bg-amber-500 text-[#0f172a] font-bold shadow-lg shadow-brand-gold/25 transition-all active:scale-[0.98] text-sm">
              Checkout Now
            </button>
            <p className="text-xs text-slate-400 text-center mt-3">Free shipping on orders over $200</p>
          </div>
        )}
      </div>
    </>
  );
}
