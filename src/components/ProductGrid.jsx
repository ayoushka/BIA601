import ProductCard from './ProductCard';

export default function ProductGrid({ products, setId, onInteraction }) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center bg-white rounded-3xl border md:w-[600px] border-slate-200 border-dashed animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <span className="text-4xl animate-bounce">🧬</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-3">Chromosome Eradicated</h3>
        <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
          You have rejected all products in this set. This solution has failed natural selection.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 hidden md:block"></div>
      <div className="flex overflow-x-auto gap-6 pb-8 pt-4 hide-scrollbar snap-x snap-mandatory scroll-smooth">
        {products.map((product) => (
          <div key={product.id} className="snap-start shrink-0">
            <ProductCard
              product={product}
              setId={setId}
              onInteraction={onInteraction}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
