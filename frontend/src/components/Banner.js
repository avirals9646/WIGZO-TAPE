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
      className="bg-[#17847c] text-white py-3 px-4 relative animate-pulse"
      data-testid="promo-banner"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center pr-10">
        <p className="font-bold text-sm md:text-base text-center">
          🎉 Exciting Offer! First Time User Will Get Discount Up To 20% - USE COUPON CODE: <span className="bg-white text-[#17847c] px-3 py-1 rounded font-black ml-2">FIRSTTIME</span>
        </p>
      </div>
      <button
        onClick={() => setShow(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-white/20 p-1 rounded transition-colors"
        data-testid="close-banner"
        aria-label="Close banner"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}