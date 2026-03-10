import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import api from '../api';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'paid':
      case 'shipped':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-[#17847c]" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17847c] mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16" data-testid="dashboard-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2" data-testid="dashboard-title">MY DASHBOARD</h1>
          <p className="text-lg text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">ORDER HISTORY</h2>
          {orders.length === 0 ? (
            <div className="text-center py-12 border border-gray-200 rounded-none" data-testid="no-orders">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-500">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 p-6 rounded-none" data-testid={`order-${order.id}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(order.status)}
                        <span className="font-bold uppercase text-sm">{order.status}</span>
                      </div>
                      <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                      <p className="text-sm text-gray-600">
                        Date: {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#17847c]">
                        ₹{order.total_amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h3 className="font-bold mb-2">Items:</h3>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          {item.image_url && (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-none"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-bold mb-2">Shipping Address:</h3>
                    <p className="text-sm text-gray-600">
                      {order.shipping_address.fullName}<br />
                      {order.shipping_address.address}<br />
                      {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}<br />
                      Phone: {order.shipping_address.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}