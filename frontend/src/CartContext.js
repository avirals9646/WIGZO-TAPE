import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cart');
      setCart(response.data.items || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.post('/cart/add', { product_id: productId, quantity });
      await fetchCart();
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      await api.put('/cart/update', { product_id: productId, quantity });
      await fetchCart();
    } catch (error) {
      console.error('Failed to update cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart/clear');
      setCart([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, loading, addToCart, updateCartItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};