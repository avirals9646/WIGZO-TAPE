import React, { useState, useEffect } from 'react';
import { X, Sparkles, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';

export default function NewUserPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Har refresh par ye timer chalega aur popup dikhayega
    const timer = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false); // Yahan pehle 'true' tha, ise 'false' kar diya taaki popup band ho
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2.5rem] max-w-lg w-full overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-700">
        
        {/* Top Decorative Banner */}
        <div className="h-32 bg-gradient-to-r from-[#17847c] to-[#2db3a9] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-xl animate-bounce">
                <Sparkles className="w-10 h-10 text-white" />
             </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-black/20 p-2 rounded-full transition-all z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10 text-center">
          <span className="text-[#17847c] font-black tracking-[0.3em] text-xs uppercase mb-3 block">
            Exclusive Invitation
          </span>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 leading-none">
            WELCOME TO <br/>
            <span className="text-[#17847c] italic">WIGZO TAPE</span>
          </h2>
          
          <p className="text-gray-500 font-light text-lg mb-8">
            Your journey to invisible confidence starts here.
          </p>

          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#17847c] to-emerald-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#fcfcfc] border border-gray-100 p-8 rounded-3xl">
              <p className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-1">Limited Offer</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-6xl font-black text-[#17847c] tracking-tighter">10% OFF</span>
              </div>
              <p className="text-gray-500 font-medium mt-2">ON YOUR FIRST ORDER</p>
            </div>
          </div>

          <Button
            onClick={handleClose}
            className="w-full h-16 bg-[#17847c] hover:bg-[#116660] text-white rounded-2xl text-lg font-bold shadow-xl shadow-[#17847c]/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <ShoppingBag className="w-5 h-5" />
            START SHOPPING NOW
          </Button>

          <button 
            onClick={handleClose}
            className="mt-6 text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors underline underline-offset-4"
          >
            No thanks, I'll pay full price
          </button>
        </div>

        <div className="h-2 bg-gradient-to-r from-[#17847c] via-emerald-400 to-[#17847c]" />
      </div>
    </div>
  );
}
