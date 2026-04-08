import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../api';
import { ShoppingBag } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-medium tracking-widest text-muted-foreground uppercase text-xs">Loading Wigzo Elite...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 md:py-24" data-testid="products-page">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Title Section - Using Manrope & Oswald from your CSS */}
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-5 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground tracking-tighter" data-testid="products-title">
            OUR <span className="text-primary italic">PRODUCTS</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl font-light">
            Browse our complete range of professional-grade wig tapes engineered for an invisible hold.
          </p>
          <div className="w-20 h-1 bg-primary mt-6"></div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-muted/30 border border-dashed rounded-3xl" data-testid="no-products-message">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-xl text-muted-foreground font-medium italic">No products available yet.</p>
          </div>
        ) : (
          /* Grid with Staggered Animation */
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16" 
            data-testid="products-grid"
          >
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="animate-in fade-in slide-in-from-bottom-10 duration-700 fill-mode-forwards"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  opacity: loading ? 0 : 1 // Prevents flickering
                }}
              >
                <div className="group transition-all duration-500 hover:-translate-y-3">
                  <div className="relative rounded-[2rem] overflow-hidden transition-all duration-500 group-hover:shadow-[0_40px_80px_-15px_rgba(23,132,124,0.15)]">
                    <ProductCard product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
