import React, { useState, useEffect } from 'react';
import { X, Ticket, Sparkles } from 'lucide-react';

export default function Banner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div 
      className="relative overflow-hidden bg-gradient-to-r from-[#116660] via-[#17847c] to-[#116660] text-white py-3 shadow-lg z-[60]"
      data-testid="promo-banner"
    >
      {/* Background Animated Sparkles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 animate-pulse"><Sparkles className="w-4 h-4" /></div>
        <div className="absolute bottom-0 right-1/4 animate-pulse delay-700"><Sparkles className="w-3 h-3" /></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
        <div className="flex items-center gap-3 overflow-hidden">
          <Ticket className="w-5 h-5 animate-bounce text-emerald-300 hidden md:block" />
          
          <p className="font-medium text-sm md:text-base tracking-wide text-center">
            <span className="opacity-90">🎉 EXCITING OFFER! FIRST TIME USERS GET</span>
            <span className="mx-2 font-black text-white text-lg">20% OFF</span>
            <span className="hidden sm:inline opacity-90">— USE CODE:</span>
            
            {/* Coupon Badge with Glow */}
            <span className="relative inline-flex ml-2 group cursor-pointer">
              <span className="absolute inset-0 bg-white blur-sm opacity-20 group-hover:opacity-50 transition-opacity"></span>
              <span className="relative bg-white text-[#17847c] px-4 py-0.5 rounded-full font-black text-xs md:text-sm tracking-tighter shadow-xl">
                FIRSTTIME
              </span>
            </span>
          </p>
        </div>
      </div>

      {/* Close Button - Clean & Minimal */}
      <button
        onClick={() => setShow(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-black/10 transition-all duration-300 group"
        data-testid="close-banner"
      >
        <X className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:rotate-90 transition-all" />
      </button>

      {/* Thin Bottom Shine Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20"></div>
    </div>
  );
}
