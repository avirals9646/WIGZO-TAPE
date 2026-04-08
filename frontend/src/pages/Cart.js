import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import api from '../api';
import { useCart } from '../CartContext';
import { toast } from 'sonner';

export default function Cart() {
  const { cart, updateCartItem, fetchCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartProducts();
  }, [cart]);

  const fetchCartProducts = async () => {
    try {
      setLoading(true);
      const productPromises = cart.map(item => api.get(`/products/${item.product_id}`));
      const responses = await Promise.all(productPromises);
      setProducts(responses.map(r => r.data));
    } catch (error) {
      console.error('Failed to fetch cart products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      await updateCartItem(productId, newQuantity);
      if (newQuantity === 0) toast.success('Item removed');
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const getCartItemQuantity = (productId) => {
    const item = cart.find(i => i.product_id === productId);
    return item ? item.quantity : 0;
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const quantity = getCartItemQuantity(product.id);
      return total + (product.price * quantity);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc]">
        <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-black tracking-widest text-gray-400 uppercase">Updating Bag...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc] px-6 text-center animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-200" />
        </div>
        <h2 className="text-4xl font-black tracking-tighter text-gray-900 mb-2">YOUR BAG IS EMPTY</h2>
        <p className="text-gray-400 font-light mb-8 max-w-xs leading-relaxed">Looks like you haven't added any elite adhesives to your collection yet.</p>
        <Link to="/products">
          <Button className="bg-[#17847c] hover:bg-black text-white px-10 py-6 rounded-2xl font-bold tracking-widest shadow-xl shadow-[#17847c]/20 transition-all">
            EXPLORE PRODUCTS
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter" data-testid="cart-title">
              YOUR <span className="text-primary italic pr-4">BAG</span>
            </h1>
            <p className="text-gray-400 font-light tracking-wide uppercase text-[10px]">Ready for Checkout</p>
          </div>
          <Link to="/products" className="group flex items-center gap-2 text-xs font-black tracking-widest text-gray-400 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            CONTINUE SHOPPING
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-8">
            {products.map((product, index) => {
              const quantity = getCartItemQuantity(product.id);
              return (
                <div 
                  key={product.id} 
                  className="group flex flex-col md:flex-row gap-8 p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] transition-all duration-500 animate-in fade-in slide-in-from-bottom-10 fill-mode-forwards"
                  style={{ animationDelay: `${index * 100}ms` }}
                  data-testid={`cart-item-${product.id}`}
                >
                  {/* Product Image */}
                  <div className="w-full md:w-40 h-40 bg-gray-50 rounded-[1.5rem] overflow-hidden flex-shrink-0">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-1">{product.name}</h3>
                        <p className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">Professional Series</p>
                      </div>
                      <p className="text-2xl font-black text-gray-900 leading-none">₹{product.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-8 md:mt-0">
                      <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100 shadow-inner">
                        <button
                          onClick={() => handleUpdateQuantity(product.id, quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-xl transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-black text-gray-900" data-testid={`quantity-${product.id}`}>{quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(product.id, quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-xl transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleUpdateQuantity(product.id, 0)}
                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 p-10 rounded-[3rem] sticky top-28 shadow-[0_40px_80px_-20px_rgba(23,132,124,0.1)]">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-8">ORDER SUMMARY</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-gray-400 font-medium">
                  <span className="text-xs tracking-widest uppercase">Subtotal</span>
                  <span className="text-gray-900">₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-medium">
                  <span className="text-xs tracking-widest uppercase">Shipping</span>
                  <span className="text-primary font-bold">COMPLIMENTARY</span>
                </div>
                <div className="h-[1px] bg-gray-50 w-full" />
                <div className="flex justify-between items-end">
                  <span className="text-xs font-black tracking-widest uppercase text-gray-400">Estimated Total</span>
                  <span className="text-4xl font-black text-[#17847c] tracking-tighter" data-testid="total">
                    ₹{calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => navigate('/checkout')}
                className="w-full h-16 bg-[#17847c] hover:bg-black text-white rounded-[1.5rem] font-bold tracking-[0.2em] shadow-2xl shadow-primary/20 transition-all active:scale-95 flex items-center gap-3"
              >
                <CreditCard className="w-5 h-5" />
                CHECKOUT NOW
              </Button>

              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black text-gray-300 tracking-[0.2em] uppercase">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Secure & Encrypted
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
