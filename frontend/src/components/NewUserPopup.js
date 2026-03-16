import React, { useState, useEffect } from 'react';
import { X, Tag } from 'lucide-react';
import { Button } from './ui/button';

export default function NewUserPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopup');
    
    if (!hasSeenPopup) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setShow(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('hasSeenWelcomePopup', 'true');
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-none max-w-md w-full p-8 relative animate-in zoom-in duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 hover:bg-gray-100 p-2 rounded-full transition-colors"
          data-testid="close-popup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-[#17847c] p-4 rounded-full">
              <Tag className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-4">WELCOME TO WIGZO TAPE!</h2>
          
          <p className="text-lg text-gray-600 mb-6">
            As a new visitor, enjoy an exclusive
          </p>

          <div className="bg-[#F0FDFD] border-2 border-[#17847c] p-6 mb-6">
            <p className="text-4xl font-bold text-[#17847c] mb-2">10% OFF</p>
            <p className="text-sm text-gray-600">ON YOUR FIRST ORDER</p>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Sign up now and start shopping to claim your discount!
          </p>

          <Button
            onClick={handleClose}
            className="btn-primary w-full"
            data-testid="claim-offer-button"
          >
            START SHOPPING
          </Button>
        </div>
      </div>
    </div>
  );
}