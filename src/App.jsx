import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import UserBehaviorWidget from './components/UserBehaviorWidget';
import DataDNAPage from './components/DataDNAPage';
import SettingsPage from './components/SettingsPage';
import CartSidebar from './components/CartSidebar';
import Toast from './components/Toast';
import { Share2, RefreshCw } from 'lucide-react';

const DUMMY_IMAGES = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop',
];

function App() {
  const [activePage, setActivePage] = useState('recommendations');
  const [activeUserId, setActiveUserId] = useState(141);
  
  // Genetic Algorithm State
  const [generationNum, setGenerationNum] = useState(1);
  const [population, setPopulation] = useState([]);
  const [populationFitness, setPopulationFitness] = useState({});
  
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEvolving, setIsEvolving] = useState(false);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  // Init Generation 1
  useEffect(() => {
    const fetchInitGeneration = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/generation/init/${activeUserId}`);
        if (!response.ok) throw new Error('Failed to init population');
        
        const data = await response.json();
        
        if (data.user_profile) setUserProfile(data.user_profile);
        setGenerationNum(data.generation);
        
        // Map images to incoming sets
        const mappedPopulation = data.population.map(set => ({
           ...set,
           products: set.products.map((item, index) => ({
             ...item,
             image: DUMMY_IMAGES[index % DUMMY_IMAGES.length]
           }))
        }));
        
        setPopulation(mappedPopulation);
        
        // Initialize Fitness dictionary
        const initialFitness = {};
        mappedPopulation.forEach(s => initialFitness[s.setId] = 0);
        setPopulationFitness(initialFitness);

      } catch (err) {
        console.error("Initialization failed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (activePage === 'recommendations') {
      fetchInitGeneration();
    }
  }, [activePage, activeUserId]);

  const handleInteraction = useCallback(async (setId, type, actionProduct) => {
      let scoreIncrement = 0;
      if (type === 'pass') {
          scoreIncrement = 0; 
          setRejectedCount(prev => prev + 1);
          
          try {
             // Academic exclusion: fetching an entirely unviewed node
             const response = await fetch(`http://localhost:8000/mutate/${activeUserId}`);
             if (!response.ok) throw new Error('Failed to mutate node');
             const mutatedItem = await response.json();
             
             // Append random image placeholder natively
             const newItem = {
                 ...mutatedItem,
                 image: DUMMY_IMAGES[Math.floor(Math.random() * DUMMY_IMAGES.length)]
             };

             // Triggers actual array replacement from specific card seamlessly
             setPopulation(prevPopulation => prevPopulation.map(setObj => {
                if (setObj.setId === setId) {
                   const itemIndex = setObj.products.findIndex(p => p.id === actionProduct.id);
                   if (itemIndex > -1) {
                       const newProducts = [...setObj.products];
                       newProducts[itemIndex] = newItem; 
                       return { ...setObj, products: newProducts };
                   }
                }
                return setObj;
             }));
          } catch (e) {
             console.error("Mutation failed: ", e);
          }
          
      } else if (type === 'view') {
          scoreIncrement = 1;
      } else if (type === 'cart') {
          scoreIncrement = 5;
          setCartItems((current) => {
            const existing = current.find((item) => item.id === actionProduct.id);
            if (existing) {
              return current.map((item) => item.id === actionProduct.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...current, { ...actionProduct, quantity: 1 }];
          });
          setToast({ visible: true, message: `${actionProduct.name} added to cart!` });
      } else if (type === 'purchase') {
          scoreIncrement = 10;
          setToast({ visible: true, message: `Simulated purchase of ${actionProduct.name} recorded!` });
      }

      if (type !== 'pass') {
          setPopulationFitness(prev => ({
              ...prev,
              [setId]: prev[setId] + scoreIncrement
          }));
      }
  }, [activeUserId]);

  const handleEvolve = async () => {
      setIsEvolving(true);
      
      const payload = {
          user_id: activeUserId,
          current_generation: generationNum,
          population_fitness: population.map(set => ({
              setId: set.setId,
              fitness: populationFitness[set.setId],
              product_ids: set.products.map(p => p.id)
          }))
      };

      try {
          const response = await fetch('http://localhost:8000/generation/evolve', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
          });
          
          if (!response.ok) throw new Error('Evolve request failed');
          
          const data = await response.json();
          setGenerationNum(data.generation);
          
          const mappedPopulation = data.population.map(set => ({
           ...set,
           products: set.products.map((item, index) => ({
             ...item,
             image: DUMMY_IMAGES[index % DUMMY_IMAGES.length]
           }))
          }));
          
          setPopulation(mappedPopulation);
          
          // Reset Fitness for new generation
          const updatedFitness = {};
          mappedPopulation.forEach(s => updatedFitness[s.setId] = 0);
          setPopulationFitness(updatedFitness);
          
      } catch(err) {
          console.error("Evolution failed:", err);
      } finally {
          setIsEvolving(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  };

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
                           <Share2 className="text-brand-gold" /> AI Natural Selection Simulator
                        </h2>
                        <p className="text-slate-400 mt-1 max-w-xl text-sm">
                           Interact with the specific sets below to train the algorithm. Clicking 'Add to Cart' or 'Purchase' increases that set's local fitness score. Once finished testing, execute the evolution.
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0 flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Generation</p>
                            <p className="text-4xl font-black text-brand-gold">{generationNum}</p>
                        </div>
                        <button 
                            onClick={handleEvolve}
                            disabled={isEvolving}
                            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                                isEvolving 
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                                : 'bg-brand-gold text-[#0f172a] hover:bg-yellow-400 hover:scale-105 hover:shadow-lg shadow-brand-gold/20'
                            }`}
                        >
                            <RefreshCw size={18} className={isEvolving ? 'animate-spin' : ''} />
                            {isEvolving ? 'Evolving DNA...' : 'Execute Evolution'}
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 mt-10">
                       <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                          <span className="text-4xl animate-spin inline-block">🧬</span>
                       </div>
                       <h3 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Behavioral DNA...</h3>
                       <p className="text-slate-500">Mapping interactions for User #{activeUserId}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-10">
                        {/* 2-Column Academic Layout: Product Sets Left, Behavior Analytics Right */}
                        <div className="xl:col-span-8 flex flex-col gap-16">
                            {population.map((setObj) => (
                                <div key={setObj.setId} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                                        <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                                            Solution Set <span className="text-brand-gold bg-amber-50 px-2 py-0.5 rounded-md">{setObj.setId}</span>
                                        </h3>
                                        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Local Fitness:</span>
                                            <span className={`text-lg font-black ${populationFitness[setObj.setId] > 0 ? 'text-emerald-500' : 'text-slate-700'}`}>
                                                {populationFitness[setObj.setId]}
                                            </span>
                                        </div>
                                    </div>
                                    <ProductGrid 
                                        products={setObj.products} 
                                        setId={setObj.setId}
                                        onInteraction={handleInteraction}
                                        activeUserId={activeUserId}
                                    />
                                </div>
                            ))}
                        </div>
                        
                        {/* Dedicated Sidebar for Explicit Tracking Logs */}
                        <div className="xl:col-span-4 relative">
                           <UserBehaviorWidget 
                              rejectedCount={rejectedCount} 
                              dna={userProfile?.dna} 
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
