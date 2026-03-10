import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import api from '../api';
import { useCart } from '../CartContext';
import { toast } from 'sonner';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Prepare order items
      const orderItems = products.map(product => ({
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: getCartItemQuantity(product.id),
        image_url: product.image_url
      }));

      // Create order
      const orderResponse = await api.post('/orders/create', {
        items: orderItems,
        total_amount: calculateTotal(),
        shipping_address: formData
      });

      const orderId = orderResponse.data.id;

      // Simulate dummy Razorpay payment
      await simulatePayment(orderId);

      // Process payment
      await api.post(`/orders/${orderId}/payment`, {
        razorpay_payment_id: 'dummy_payment_id',
        razorpay_order_id: orderId
      });

      toast.success('Order placed successfully!');
      await clearCart();
      navigate('/dashboard');
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const simulatePayment = (orderId) => {
    return new Promise((resolve) => {
      // Simulate Razorpay payment modal
      const confirmed = window.confirm(
        `Complete payment of ₹${calculateTotal().toFixed(2)}?\n\n(This is a dummy payment for testing)`
      );
      if (confirmed) {
        resolve();
      } else {
        throw new Error('Payment cancelled');
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17847c] mx-auto mb-4"></div>
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16" data-testid="checkout-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-12" data-testid="checkout-title">CHECKOUT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border border-gray-200 p-6 rounded-none">
                <h2 className="text-2xl font-bold mb-6">SHIPPING INFORMATION</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 rounded-none"
                      data-testid="fullname-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 rounded-none"
                      data-testid="email-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1 rounded-none"
                      data-testid="phone-input"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="mt-1 rounded-none"
                      data-testid="address-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="mt-1 rounded-none"
                      data-testid="city-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="mt-1 rounded-none"
                      data-testid="state-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="mt-1 rounded-none"
                      data-testid="pincode-input"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full btn-primary"
                disabled={processing}
                data-testid="place-order-button"
              >
                {processing ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 p-6 rounded-none sticky top-24">
              <h2 className="text-2xl font-bold mb-6">ORDER SUMMARY</h2>
              <div className="space-y-4 mb-6">
                {products.map(product => {
                  const quantity = getCartItemQuantity(product.id);
                  return (
                    <div key={product.id} className="flex justify-between text-sm">
                      <span>{product.name} x {quantity}</span>
                      <span>₹{(product.price * quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
                <div className="border-t pt-4 flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span className="text-[#17847c]" data-testid="checkout-total">₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                By placing this order, you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}