import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Banner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show banner on every page load
    setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div 
      className="bg-[#17847c] text-white py-3 px-4 relative z-50 animate-pulse"
      data-testid="promo-banner"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center">
          <p className="font-bold text-lg">
            🎉 Exciting Offer! First Time User Will Get Discount Up To 20% - USE COUPON CODE: <span className="bg-white text-[#17847c] px-3 py-1 rounded font-black">FIRSTTIME</span>
          </p>
        </div>
        <button
          onClick={() => setShow(false)}
          className="ml-4 hover:bg-white/20 p-1 rounded transition-colors"
          data-testid="close-banner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}