import { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import SelectionPage from './components/SelectionPage';
import StorePage from './components/StorePage';
import CartSidebar from './components/CartSidebar';
import Toast from './components/Toast';

// Removed static dummy images array

function App() {
  const [activeUserId, setActiveUserId] = useState('');
  const [algorithmType, setAlgorithmType] = useState('GA'); // 'GA' or 'NGA'
  
  // Recommendations State
  const [recommendations, setRecommendations] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const location = useLocation();

  // Init Recommendations only when on /store route
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:8000';
        const endpoint = algorithmType === 'NGA' 
          ? `/api/recommend/nga/${activeUserId}` 
          : `/api/recommend/${activeUserId}`;
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error('Failed to fetch recommendations');
        
        const data = await response.json();
        if (data.user_profile) setUserProfile(data.user_profile);
        
        // Map images based on category dynamically from local public folders
        const mappedProducts = data.recommendations.map((item) => {
             const normalizedCategory = item.category.toLowerCase().replace(/\s+/g, '');
             return {
                 ...item,
                 image: `/${normalizedCategory}/${item.id}.jpg`
             };
        });
        setRecommendations(mappedProducts);

      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (location.pathname === '/store') {
      fetchRecommendations();
    }
  }, [activeUserId, algorithmType, location.pathname]);

  const handleInteraction = useCallback(async (setId, type, actionProduct) => {
      if (type === 'pass') {
          try {
             const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:8000';
             const response = await fetch(`${API_BASE_URL}/api/mutate/${activeUserId}`);
             if (!response.ok) throw new Error('Failed to mutate node');
             const mutatedItem = await response.json();
             
             const normalizedCategory = mutatedItem.category.toLowerCase().replace(/\s+/g, '');
             const newItem = {
                 ...mutatedItem,
                 image: `/${normalizedCategory}/${mutatedItem.id}.jpg`
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

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900 flex flex-col">
      <Header
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        userProfile={userProfile}
        activeUserId={activeUserId}
        onUserSwitch={setActiveUserId}
      />
      
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/selection" element={
            <SelectionPage 
              activeUserId={activeUserId} 
              onUserSwitch={setActiveUserId} 
              setAlgorithmType={setAlgorithmType} 
            />
          } />
          <Route path="/store" element={
            <StorePage 
              activeUserId={activeUserId}
              algorithmType={algorithmType}
              loading={loading}
              recommendations={recommendations}
              handleInteraction={handleInteraction}
            />
          } />
        </Routes>
      </main>

      <Footer />

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
