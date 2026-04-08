import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import api from '../api';
import { Package, Clock, CheckCircle, XCircle, ShoppingBag, MapPin, Hash } from 'lucide-react';

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

  const getStatusStyles = (status) => {
    switch (status) {
      case 'pending':
        return { icon: <Clock className="w-4 h-4" />, color: 'bg-amber-50 text-amber-600 border-amber-100' };
      case 'paid':
      case 'shipped':
        return { icon: <CheckCircle className="w-4 h-4" />, color: 'bg-blue-50 text-blue-600 border-blue-100' };
      case 'delivered':
        return { icon: <CheckCircle className="w-4 h-4" />, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
      case 'cancelled':
        return { icon: <XCircle className="w-4 h-4" />, color: 'bg-red-50 text-red-600 border-red-100' };
      default:
        return { icon: <Package className="w-4 h-4" />, color: 'bg-gray-50 text-gray-600 border-gray-100' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc]">
        <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-black tracking-widest text-gray-400 uppercase">Synchronizing Account...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20 relative overflow-hidden" data-testid="dashboard-page">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Profile Header */}
        <div className="mb-16 space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-1000">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-xl shadow-primary/20">
               {user?.name?.charAt(0).toUpperCase()}
             </div>
             <div>
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter" data-testid="dashboard-title">
                  MY <span className="text-primary italic pr-4">DASHBOARD</span>
                </h1>
                <p className="text-gray-400 font-light tracking-wide">Elite Member: <span className="text-gray-900 font-bold">{user?.name}</span></p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* Order History Section */}
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-black tracking-tight text-gray-900 uppercase">Order History</h2>
              <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-3 py-1 rounded-full">{orders.length} Orders</span>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm" data-testid="no-orders">
                <ShoppingBag className="w-16 h-16 text-gray-100 mx-auto mb-6" />
                <p className="text-xl font-bold text-gray-400 italic">No orders in your vault yet.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {orders.map((order, index) => {
                  const status = getStatusStyles(order.status);
                  return (
                    <div 
                      key={order.id} 
                      className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(23,132,124,0.1)] transition-all duration-500 animate-in fade-in slide-in-from-bottom-10 fill-mode-forwards"
                      style={{ animationDelay: `${index * 100}ms` }}
                      data-testid={`order-${order.id}`}
                    >
                      {/* Order Info Bar */}
                      <div className="p-8 border-b border-gray-50 flex flex-wrap justify-between items-center gap-6">
                        <div className="flex items-center gap-6">
                          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${status.color}`}>
                            {status.icon}
                            {order.status}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                             <Hash className="w-3 h-3" />
                             <span className="text-[11px] font-bold tracking-tighter uppercase">{order.id.substring(0, 12)}</span>
                          </div>
                          <p className="text-gray-400 text-[11px] font-bold uppercase">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <p className="text-3xl font-black text-primary tracking-tighter">
                          ₹{order.total_amount.toFixed(2)}
                        </p>
                      </div>

                      {/* Items & Shipping Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* Items Section */}
                        <div className="lg:col-span-8 p-8 space-y-6">
                           <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">Included Items</p>
                           {order.items.map((item, i) => (
                             <div key={i} className="flex items-center gap-6 group">
                               <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                                 {item.image_url && (
                                   <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                 )}
                               </div>
                               <div className="flex-1">
                                 <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{item.name}</h4>
                                 <p className="text-xs text-gray-400 font-medium tracking-wide">Quantity: {item.quantity}</p>
                               </div>
                               <p className="font-black text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                             </div>
                           ))}
                        </div>

                        {/* Shipping Info - Vertical Bar Style */}
                        <div className="lg:col-span-4 bg-gray-50/50 p-8 border-l border-gray-50">
                           <div className="flex items-center gap-2 mb-6">
                              <MapPin className="w-4 h-4 text-primary" />
                              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Delivery Destination</p>
                           </div>
                           <div className="text-sm font-medium text-gray-600 space-y-1">
                              <p className="text-gray-900 font-black">{order.shipping_address.fullName}</p>
                              <p>{order.shipping_address.address}</p>
                              <p>{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}</p>
                              <p className="pt-4 text-xs font-bold text-primary italic">M: {order.shipping_address.phone}</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
