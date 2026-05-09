import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, X, Loader2, ArrowRight } from 'lucide-react';
import api from '../api';
import { useCart } from '../CartContext';
import { toast } from 'sonner';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');

  .co-root {
    min-height: 100vh;
    background: #fcfcfc;
    font-family: 'Inter', sans-serif;
    padding: 80px 0 60px;
  }
  .co-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

  /* Header */
  .co-header { margin-bottom: 56px; opacity: 0; transform: translateY(20px); animation: coUp 0.6s ease forwards; }
  .co-eyebrow { font-size: 10px; font-weight: 900; letter-spacing: 0.3em; text-transform: uppercase; color: #17847c; margin-bottom: 10px; }
  .co-title { font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 900; letter-spacing: -0.04em; color: #111; line-height: 0.9; margin: 0; }
  .co-title em { font-style: italic; color: #17847c; padding-right: 8px; }
  .co-subtitle { font-size: 10px; font-weight: 900; letter-spacing: 0.25em; text-transform: uppercase; color: #bbb; margin-top: 14px; }

  /* Grid */
  .co-grid { display: grid; grid-template-columns: 1fr; gap: 24px; align-items: start; }
  @media (min-width: 1024px) { .co-grid { grid-template-columns: 1fr 400px; gap: 32px; } }

  /* Cards */
  .co-card {
    background: #fff; border: 1px solid #f0f0f0; border-radius: 2.5rem;
    padding: 40px; box-shadow: 0 20px 60px -20px rgba(0,0,0,0.05);
    opacity: 0; transform: translateY(24px); animation: coUp 0.6s ease 0.1s forwards;
  }
  .co-summary {
    background: #fff; border: 1px solid #f0f0f0; border-radius: 2.5rem;
    padding: 40px; box-shadow: 0 40px 80px -20px rgba(23,132,124,0.1);
    position: sticky; top: 28px;
    opacity: 0; transform: translateY(24px); animation: coUp 0.6s ease 0.25s forwards;
    height: fit-content;
  }
  .co-section-title {
    font-size: 1.3rem; font-weight: 900; letter-spacing: -0.03em; color: #111;
    margin: 0 0 28px; display: flex; align-items: center; gap: 10px;
  }
  .co-dot { width: 8px; height: 8px; border-radius: 50%; background: #17847c; flex-shrink: 0; }

  /* Form fields */
  .co-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .co-full { grid-column: 1 / -1; }
  @media (max-width: 600px) { .co-fields { grid-template-columns: 1fr; } .co-full { grid-column: 1; } }
  .co-label { display: block; font-size: 10px; font-weight: 900; letter-spacing: 0.2em; text-transform: uppercase; color: #aaa; margin-bottom: 8px; }
  .co-input {
    width: 100%; background: #f7f7f7 !important; border: 1.5px solid transparent !important;
    border-radius: 1rem !important; color: #111 !important;
    font-family: 'Inter', sans-serif !important; font-size: 0.95rem !important; font-weight: 500 !important;
    padding: 14px 18px !important; transition: all 0.25s !important; outline: none !important;
  }
  .co-input::placeholder { color: #ccc !important; font-weight: 400 !important; }
  .co-input:focus { background: #fff !important; border-color: #17847c !important; box-shadow: 0 0 0 4px rgba(23,132,124,0.1) !important; }

  /* Submit */
  .co-btn {
    width: 100%; margin-top: 28px; background: #17847c; border: none; border-radius: 1.5rem;
    color: #fff; font-family: 'Inter', sans-serif; font-size: 0.88rem; font-weight: 900;
    letter-spacing: 0.15em; text-transform: uppercase; padding: 20px 32px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: all 0.3s ease; box-shadow: 0 20px 50px -10px rgba(23,132,124,0.3);
  }
  .co-btn:hover:not(:disabled) { background: #111; box-shadow: 0 20px 50px -10px rgba(0,0,0,0.2); transform: translateY(-2px); }
  .co-btn:active:not(:disabled) { transform: scale(0.98); }
  .co-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  /* Coupon */
  .co-coupon { background: #f7fffe; border: 1.5px dashed rgba(23,132,124,0.25); border-radius: 1.5rem; padding: 20px; margin-bottom: 24px; }
  .co-coupon-lbl { font-size: 10px; font-weight: 900; letter-spacing: 0.2em; text-transform: uppercase; color: #17847c; margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }
  .co-coupon-row { display: flex; gap: 10px; }
  .co-coupon-input {
    flex: 1; background: #fff !important; border: 1.5px solid #eee !important;
    border-radius: 0.85rem !important; color: #111 !important;
    font-family: 'Inter', sans-serif !important; font-size: 0.85rem !important; font-weight: 700 !important;
    letter-spacing: 0.1em !important; padding: 12px 16px !important; outline: none !important; transition: all 0.25s !important;
  }
  .co-coupon-input:focus { border-color: #17847c !important; box-shadow: 0 0 0 4px rgba(23,132,124,0.1) !important; }
  .co-coupon-apply {
    background: #17847c; border: none; border-radius: 0.85rem; color: #fff;
    font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 900;
    letter-spacing: 0.15em; text-transform: uppercase; padding: 12px 18px; cursor: pointer;
    transition: background 0.2s; white-space: nowrap;
  }
  .co-coupon-apply:hover:not(:disabled) { background: #111; }
  .co-coupon-apply:disabled { opacity: 0.5; cursor: not-allowed; }
  .co-coupon-badge-row { display: flex; justify-content: space-between; align-items: center; background: #fff; border: 1.5px solid #17847c; border-radius: 0.85rem; padding: 12px 16px; animation: coUp 0.3s ease forwards; }
  .co-coupon-badge { font-weight: 900; color: #17847c; letter-spacing: 0.1em; }
  .co-coupon-rm { background: none; border: none; color: #ff5b5b; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px; font-family: 'Inter', sans-serif; padding: 0; }
  .co-coupon-saved { margin-top: 8px; font-size: 0.78rem; font-weight: 700; color: #17847c; }

  /* Lines */
  .co-lines { margin-bottom: 20px; }
  .co-line { display: flex; justify-content: space-between; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid #f5f5f5; opacity: 0; animation: coUp 0.4s ease forwards; }
  .co-line:last-child { border-bottom: none; }
  .co-line-name { font-size: 0.88rem; font-weight: 700; color: #111; }
  .co-line-qty { font-size: 0.75rem; font-weight: 500; color: #bbb; margin-top: 3px; }
  .co-line-price { font-size: 0.9rem; font-weight: 700; color: #111; }
  .co-line:nth-child(1) { animation-delay: 0.35s; }
  .co-line:nth-child(2) { animation-delay: 0.45s; }
  .co-line:nth-child(3) { animation-delay: 0.55s; }
  .co-line:nth-child(4) { animation-delay: 0.65s; }

  /* Totals */
  .co-totals { border-top: 1px solid #f0f0f0; padding-top: 20px; }
  .co-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .co-row-lbl { font-size: 10px; font-weight: 900; letter-spacing: 0.2em; text-transform: uppercase; color: #bbb; }
  .co-row-val { font-size: 0.9rem; font-weight: 700; color: #555; }
  .co-row-free { color: #17847c; font-weight: 900; }
  .co-row-disc { color: #17847c; }
  .co-grand { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 16px; padding-top: 16px; border-top: 1px solid #f0f0f0; }
  .co-grand-lbl { font-size: 10px; font-weight: 900; letter-spacing: 0.2em; text-transform: uppercase; color: #bbb; }
  .co-grand-val { font-size: 2.8rem; font-weight: 900; letter-spacing: -0.04em; color: #17847c; line-height: 1; }

  /* Secure */
  .co-secure { margin-top: 20px; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 10px; font-weight: 900; letter-spacing: 0.2em; text-transform: uppercase; color: #ccc; }
  .co-pulse { width: 6px; height: 6px; background: #4ade80; border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
  .co-legal { margin-top: 10px; font-size: 0.72rem; color: #ccc; text-align: center; line-height: 1.6; }

  /* Loading */
  .co-loading { min-height: 100vh; background: #fcfcfc; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; font-family: 'Inter', sans-serif; }
  .co-ring { width: 48px; height: 48px; border-radius: 50%; border: 3px solid #f0f0f0; border-top-color: #17847c; animation: coSpin 0.8s linear infinite; }
  .co-loading-txt { font-size: 10px; font-weight: 900; letter-spacing: 0.3em; text-transform: uppercase; color: #bbb; }

  @keyframes coUp { to { opacity: 1; transform: translateY(0); } }
  @keyframes coSpin { to { transform: rotate(360deg); } }
  @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.75); } }
  @media (max-width: 640px) { .co-card,.co-summary { padding: 24px; border-radius: 2rem; } .co-inner { padding: 0 16px; } .co-root { padding: 48px 0 40px; } }
`;

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', state: '', pincode: ''
  });

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    if (cart.length === 0) { navigate('/cart'); return; }
    fetchCartProducts();
  }, [cart]);

  const fetchCartProducts = async () => {
    try {
      setLoading(true);
      const res = await Promise.all(cart.map(i => api.get(`/products/${i.product_id}`)));
      setProducts(res.map(r => r.data));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const getQty = (id) => cart.find(i => i.product_id === id)?.quantity || 0;
  const calcTotal = () => products.reduce((t, p) => t + p.price * getQty(p.id), 0);
  const finalTotal = () => appliedCoupon ? appliedCoupon.final_amount : calcTotal();

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) { toast.error('Enter a coupon code'); return; }
    try {
      setCouponLoading(true);
      const res = await api.post('/coupons/validate', { code: couponCode, order_amount: calcTotal() });
      setAppliedCoupon(res.data);
      toast.success(`Saved ₹${res.data.discount.toFixed(2)}!`);
    } catch (e) {
      toast.error(e.response?.data?.detail || 'Invalid coupon');
      setAppliedCoupon(null);
    } finally { setCouponLoading(false); }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setProcessing(true);

  try {
    // 1. DB mein order banao
    const items = products.map(p => ({
      product_id: p.id, name: p.name, price: p.price,
      quantity: getQty(p.id), image_url: p.image_url
    }));

    const orderRes = await api.post('/orders/create', {
      items,
      total_amount: calcTotal(),   // subtotal bhejo, backend khud discount lagata hai
      shipping_address: formData,
      coupon_code: appliedCoupon?.coupon_details?.code || null
    });
    const orderId = orderRes.data.id;

    // 2. Razorpay order banao
    const rzpOrderRes = await api.post('/payments/create-order', {
      amount: finalTotal()
    });
    const rzpOrder = rzpOrderRes.data;

    // 3. Razorpay modal kholo
    await new Promise((resolve, reject) => {
      const options = {
        key: 'rzp_test_SnL4lcttenJnZV',
        amount: rzpOrder.amount,
        currency: 'INR',
        name: 'Wigzo Tape',
        description: 'Order Payment',
        order_id: rzpOrder.id,
        handler: async function (response) {
          try {
            // 4. Signature verify karo
            await api.post('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            // 5. Order ko paid mark karo
            await api.post(`/orders/${orderId}/payment`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
            });
            resolve();
          } catch (err) { reject(err); }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: '#17847c' },
        modal: { ondismiss: () => reject(new Error('cancelled')) }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    });

    toast.success('Order placed successfully! 🎉');
    await clearCart();
    navigate('/dashboard');

  } catch (err) {
    if (err?.message === 'cancelled') {
      toast.info('Payment cancelled.');
    } else {
      toast.error('Payment failed. Please try again.');
    }
  } finally {
    setProcessing(false);
  }
};

  const fields = [
    { id: 'fullName', label: 'Full Name', type: 'text', testid: 'fullname-input' },
    { id: 'email', label: 'Email Address', type: 'email', testid: 'email-input' },
    { id: 'phone', label: 'Phone Number', type: 'tel', testid: 'phone-input' },
    { id: 'address', label: 'Street Address', type: 'text', testid: 'address-input', full: true },
    { id: 'city', label: 'City', type: 'text', testid: 'city-input' },
    { id: 'state', label: 'State', type: 'text', testid: 'state-input' },
    { id: 'pincode', label: 'Pincode', type: 'text', testid: 'pincode-input' },
  ];

  if (loading) return (
    <div className="co-loading">
      <div className="co-ring" />
      <p className="co-loading-txt">Preparing Checkout...</p>
    </div>
  );

  return (
    <div className="co-root" data-testid="checkout-page">
      <div className="co-inner">

        <div className="co-header">
          <p className="co-eyebrow">Almost There</p>
          <h1 className="co-title" data-testid="checkout-title">CHECK<em>OUT</em></h1>
          <p className="co-subtitle">Secure &amp; Encrypted · Free Shipping</p>
        </div>

        <div className="co-grid">

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="co-card">
              <h2 className="co-section-title"><span className="co-dot" />Shipping Information</h2>
              <div className="co-fields">
                {fields.map(({ id, label, type, testid, full }) => (
                  <div key={id} className={full ? 'co-full' : ''}>
                    <label className="co-label" htmlFor={id}>{label} *</label>
                    <input
                      id={id} name={id} type={type}
                      value={formData[id]}
                      onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                      required placeholder={`Your ${label.toLowerCase()}`}
                      className="co-input" data-testid={testid}
                    />
                  </div>
                ))}
              </div>
              <button type="submit" className="co-btn" disabled={processing} data-testid="place-order-button">
                {processing
                  ? <><Loader2 size={16} style={{ animation: 'coSpin 0.7s linear infinite' }} /> Processing...</>
                  : <><ArrowRight size={16} /> Place Order</>}
              </button>
            </div>
          </form>

          {/* Summary */}
          <div className="co-summary">
            <h2 className="co-section-title"><span className="co-dot" />Order Summary</h2>

            <div className="co-coupon">
              <p className="co-coupon-lbl"><Tag size={11} /> Have a coupon?</p>
              {!appliedCoupon ? (
                <div className="co-coupon-row">
                  <input value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="ENTER CODE" className="co-coupon-input" data-testid="coupon-input" />
                  <button onClick={handleApplyCoupon} disabled={couponLoading} className="co-coupon-apply" type="button" data-testid="apply-coupon-button">
                    {couponLoading ? '...' : 'Apply'}
                  </button>
                </div>
              ) : (
                <>
                  <div className="co-coupon-badge-row">
                    <span className="co-coupon-badge">{appliedCoupon.coupon_details.code}</span>
                    <button onClick={() => { setAppliedCoupon(null); setCouponCode(''); toast.info('Coupon removed'); }} className="co-coupon-rm" type="button">
                      <X size={12} /> Remove
                    </button>
                  </div>
                  <p className="co-coupon-saved">🎉 Saved ₹{appliedCoupon.discount.toFixed(2)}!</p>
                </>
              )}
            </div>

            <div className="co-lines">
              {products.map(p => (
                <div key={p.id} className="co-line">
                  <div>
                    <div className="co-line-name">{p.name}</div>
                    <div className="co-line-qty">Qty: {getQty(p.id)}</div>
                  </div>
                  <div className="co-line-price">₹{(p.price * getQty(p.id)).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="co-totals">
              <div className="co-row">
                <span className="co-row-lbl">Subtotal</span>
                <span className="co-row-val">₹{calcTotal().toFixed(2)}</span>
              </div>
              <div className="co-row">
                <span className="co-row-lbl">Shipping</span>
                <span className="co-row-val co-row-free">COMPLIMENTARY</span>
              </div>
              {appliedCoupon && (
                <div className="co-row">
                  <span className="co-row-lbl">Discount</span>
                  <span className="co-row-val co-row-disc">−₹{appliedCoupon.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="co-grand">
                <span className="co-grand-lbl">Estimated Total</span>
                <span className="co-grand-val" data-testid="checkout-total">₹{finalTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="co-secure">
              <div className="co-pulse" />
              Secure &amp; Encrypted
            </div>
            <p className="co-legal">By placing this order, you agree to our terms &amp; conditions.</p>
          </div>

        </div>
      </div>
    </div>
  );
}