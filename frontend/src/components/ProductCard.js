import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import { toast } from 'sonner';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault(); // Navigation rokne ke liye
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    try {
      await addToCart(product.id, 1);
      toast.success('Added to bag!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <Link 
      to={`/products/${product.id}`} 
      className="group relative block bg-white rounded-[2rem] p-3 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(23,132,124,0.12)] border border-transparent hover:border-gray-100"
      data-testid={`product-card-${product.id}`}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-gray-50">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          data-testid={`product-image-${product.id}`}
        />
        
        {/* Floating Add Button (Quick Action) */}
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg text-[#17847c] transition-all duration-300 hover:bg-[#17847c] hover:text-white translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-20"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-black/10 backdrop-blur-md text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-black/5">
            Elite Series
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-[#17847c] transition-colors" data-testid={`product-name-${product.id}`}>
            {product.name}
          </h3>
          <span className="text-lg font-black text-[#17847c] tracking-tighter" data-testid={`product-price-${product.id}`}>
            ₹{product.price.toFixed(0)}
          </span>
        </div>
        
        <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* View Details Label */}
        <div className="flex items-center gap-2 pt-2 text-[10px] font-black text-gray-300 tracking-[0.2em] uppercase group-hover:text-[#17847c] transition-colors">
          <span>View Details</span>
          <div className="h-[1px] flex-1 bg-gray-100 group-hover:bg-[#17847c]/30 transition-colors" />
        </div>
      </div>
    </Link>
  );
}
