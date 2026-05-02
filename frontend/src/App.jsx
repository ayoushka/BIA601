import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import DataDNAPage from './components/DataDNAPage';
import SettingsPage from './components/SettingsPage';
import CartSidebar from './components/CartSidebar';
import Toast from './components/Toast';
import { Share2 } from 'lucide-react';

const DUMMY_IMAGES = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop',
];

function App() {
  // creating all our state variables to keep track of the page and data
  const [activePage, setActivePage] = useState('recommendations');
  const [activeUserId, setActiveUserId] = useState(141);
  
  // Recommendations State
  const [recommendations, setRecommendations] = useState([]);
  
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  // Init Recommendations
  useEffect(() => {
    // getting the recommended products from our python backend api
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await fetch(`${API_BASE_URL}/recommend/${activeUserId}`);
        if (!response.ok) throw new Error('Failed to fetch recommendations');
        
        const data = await response.json();
        if (data.user_profile) setUserProfile(data.user_profile);
        
        // Map images
        const mappedProducts = data.recommendations.map((item, index) => ({
             ...item,
             image: DUMMY_IMAGES[index % DUMMY_IMAGES.length]
        }));
        setRecommendations(mappedProducts);

      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (activePage === 'recommendations') {
      fetchRecommendations();
    }
  }, [activePage, activeUserId]);

  const handleInteraction = useCallback(async (setId, type, actionProduct) => {
      // handling what happens when a user clicks buttons like add to cart or skip
      if (type === 'pass') {
          try {
             const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
             const response = await fetch(`${API_BASE_URL}/mutate/${activeUserId}`);
             if (!response.ok) throw new Error('Failed to mutate node');
             const mutatedItem = await response.json();
             
             const newItem = {
                 ...mutatedItem,
                 image: DUMMY_IMAGES[Math.floor(Math.random() * DUMMY_IMAGES.length)]
             };

             setRecommendations(prev => prev.map(p => p.id === actionProduct.id ? newItem : p));
             setToast({ visible: true, message: `Product skipped & replaced via mutation.` });
          } catch (e) {
             console.error("Mutation failed: ", e);
             setToast({ visible: true, message: `Product skipped.` });
          }
      } else if (type === 'view') {
          // just view, no action needed for simple UI
      } else if (type === 'cart') {
          setCartItems((current) => {
            const existing = current.find((item) => item.id === actionProduct.id);
            if (existing) {
              return current.map((item) => item.id === actionProduct.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...current, { ...actionProduct, quantity: 1 }];
          });
          setToast({ visible: true, message: `${actionProduct.name} added to cart!` });
      } else if (type === 'purchase') {
          setToast({ visible: true, message: `Simulated purchase of ${actionProduct.name} recorded!` });
      }
  }, [activeUserId]);

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCartItems((current) => current.filter((item) => item.id !== id));
    } else {
      setCartItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    // deciding which page to show on the screen
    switch (activePage) {
      case 'data-dna': return <DataDNAPage />;
      case 'settings': return <SettingsPage />;
      case 'recommendations':
      default:
        return (
          <>
            <HeroSection />
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 mb-10">
                <div className="flex flex-col md:flex-row items-center justify-between bg-[#0f172a] p-6 rounded-3xl text-white shadow-xl shadow-brand-gold/10 border border-slate-800">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                           <Share2 className="text-brand-gold" /> Genetic Algorithm Recommendation Engine
                        </h2>
                        <p className="text-slate-400 mt-1 max-w-xl text-sm">
                           The Genetic Algorithm has evaluated thousands of combinations to find the absolute best products tailored to this user's profile.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 mt-10">
                       <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                          <span className="text-4xl animate-spin inline-block">🧬</span>
                       </div>
                       <h3 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Behavioral DNA & Running GA...</h3>
                       <p className="text-slate-500">Generating optimal recommendations for User #{activeUserId}</p>
                    </div>
                ) : (
                    <div className="mt-10">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8">
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                                    Final Genetic Algorithm Recommendations
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
                        </div>
                    </div>
                )}
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900 flex flex-col">
      <Header
        activePage={activePage}
        onNavigate={setActivePage}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        userProfile={userProfile}
        activeUserId={activeUserId}
        onUserSwitch={setActiveUserId}
      />
      <main className="flex-grow flex flex-col gap-10 pb-16">
        {renderPage()}
      </main>

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={(id) => handleUpdateQuantity(id, 0)}
      />

      <Toast message={toast.message} isVisible={toast.visible} onClose={() => setToast({ visible: false, message: '' })} />
    </div>
  );
}

export default App;
