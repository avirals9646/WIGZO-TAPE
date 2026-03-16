import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img 
              src="https://customer-assets.emergentagent.com/job_b4f0fc4c-96da-4399-b28f-8218e03f515b/artifacts/wouuvr44_IMG-20260212-WA0090.jpg" 
              alt="Wigzo Tape" 
              className="h-16 w-auto mb-4"
            />
            <p className="text-sm text-gray-400">
              Premium wig tape solutions for professionals and enthusiasts.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-400 hover:text-[#17847c] transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-sm text-gray-400 hover:text-[#17847c] transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-sm text-gray-400 hover:text-[#17847c] transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg uppercase mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-400 hover:text-[#17847c] transition-colors">Contact Us</Link></li>
              <li><Link to="/" className="text-sm text-gray-400 hover:text-[#17847c] transition-colors">Shipping Info</Link></li>
              <li><Link to="/" className="text-sm text-gray-400 hover:text-[#17847c] transition-colors">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg uppercase mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#17847c] transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#17847c] transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#17847c] transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2026 Wigzo Tape. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}