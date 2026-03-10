import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
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
      const productPromises = cart.map(item => 
        api.get(`/products/${item.product_id}`)
      );
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
      if (newQuantity === 0) {
        toast.success('Item removed from cart');
      }
    } catch (error) {
      toast.error('Failed to update cart');
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17847c] mx-auto mb-4"></div>
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="empty-cart">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">YOUR CART IS EMPTY</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link to="/products">
            <Button className="btn-primary" data-testid="continue-shopping">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16" data-testid="cart-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-12" data-testid="cart-title">YOUR CART</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {products.map((product) => {
              const quantity = getCartItemQuantity(product.id);
              return (
                <div key={product.id} className="flex gap-6 p-6 border border-gray-200 rounded-none" data-testid={`cart-item-${product.id}`}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-none"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-[#17847c] font-bold mb-4">₹{product.price.toFixed(2)}</p>
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={() => handleUpdateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 border border-black hover:bg-black hover:text-white rounded-none"
                        data-testid={`decrease-${product.id}`}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-bold" data-testid={`quantity-${product.id}`}>{quantity}</span>
                      <Button
                        onClick={() => handleUpdateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 border border-black hover:bg-black hover:text-white rounded-none"
                        data-testid={`increase-${product.id}`}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleUpdateQuantity(product.id, 0)}
                        className="ml-auto text-red-600 hover:text-red-800"
                        data-testid={`remove-${product.id}`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 p-6 rounded-none sticky top-24">
              <h2 className="text-2xl font-bold mb-6">ORDER SUMMARY</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span data-testid="subtotal">₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span className="text-[#17847c]" data-testid="total">₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              <Button
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary"
                data-testid="proceed-to-checkout"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}