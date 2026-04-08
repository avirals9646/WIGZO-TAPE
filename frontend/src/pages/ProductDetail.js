import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ShoppingCart, Minus, Plus, ShieldCheck, Zap, Award, ArrowLeft } from 'lucide-react';
import api from '../api';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      toast.error('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    try {
      await addToCart(product.id, quantity);
      toast.success(`Added ${quantity} item(s) to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc]">
        <div className="w-16 h-16 border-4 border-[#17847c]/20 border-t-[#17847c] rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-black tracking-[0.3em] text-gray-400 uppercase">Loading Elite Item...</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20 relative overflow-hidden" data-testid="product-detail-page">
      {/* Aesthetic Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#17847c]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Back Button */}
        <button onClick={() => navigate('/products')} className="group mb-12 flex items-center gap-2 text-xs font-black tracking-widest text-gray-400 hover:text-[#17847c] transition-all">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          BACK TO COLLECTION
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Product Image - Luxury Frame */}
          <div className="animate-in fade-in slide-in-from-left-10 duration-1000">
            <div className="aspect-square bg-white rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-gray-100 group">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                data-testid="product-detail-image"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-in fade-in slide-in-from-right-10 duration-1000 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-[#17847c]/10 text-[#17847c] text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">Professional Choice</span>
                <span className="text-gray-300 text-xs">•</span>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{product.category}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9]" data-testid="product-detail-name">
                {product.name.split(' ')[0]} <br/>
                <span className="text-[#17847c] italic">{product.name.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-4xl font-black text-gray-900 tracking-tighter" data-testid="product-detail-price">
                ₹{product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-xl text-gray-500 font-light leading-relaxed max-w-xl">
              {product.description}
            </p>

            {/* Key Features Icons */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-white border border-gray-100 rounded-2xl text-center space-y-2">
                <ShieldCheck className="w-6 h-6 text-[#17847c] mx-auto" />
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Skin Safe</p>
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-2xl text-center space-y-2">
                <Zap className="w-6 h-6 text-[#17847c] mx-auto" />
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Extra Strong</p>
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-2xl text-center space-y-2">
                <Award className="w-6 h-6 text-[#17847c] mx-auto" />
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Elite Grade</p>
              </div>
            </div>

            {/* Selection Area */}
            <div className="space-y-6 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black tracking-widest text-gray-400 uppercase">Quantity</label>
                <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-black text-xl">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all"><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full h-20 bg-[#17847c] hover:bg-black text-white rounded-3xl text-lg font-black tracking-[0.2em] shadow-2xl shadow-[#17847c]/20 transition-all flex items-center justify-center gap-4"
                data-testid="add-to-cart-button"
              >
                <ShoppingCart className="w-6 h-6" />
                ADD TO BAG
              </Button>
            </div>

            {/* Inventory Status */}
            <div className="flex items-center justify-between text-[10px] font-black tracking-[0.2em] uppercase text-gray-400">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                {product.stock > 0 ? `${product.stock} Units in stock` : 'Out of stock'}
              </div>
              <span>SKU: WZ-{product.id.substring(0,6)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
