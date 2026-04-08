import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard, Search } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';
import { Button } from './ui/button';

export default function Header() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blogs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`sticky top-0 z-[60] transition-all duration-500 ${
        isScrolled 
        ? 'bg-white/80 backdrop-blur-lg py-3 shadow-sm' 
        : 'bg-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center group" data-testid="logo-link">
            <img 
              src="https://customer-assets.emergentagent.com/job_b4f0fc4c-96da-4399-b28f-8218e03f515b/artifacts/wouuvr44_IMG-20260212-WA0090.jpg" 
              alt="Wigzo Tape" 
              className="h-10 md:h-12 w-auto transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Navigation with Underline Animation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`relative text-[13px] font-black uppercase tracking-[0.15em] transition-colors duration-300 group ${
                  location.pathname === link.path ? 'text-[#17847c]' : 'text-gray-500 hover:text-black'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#17847c] transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-6">
            <button className="hidden md:block text-gray-500 hover:text-[#17847c] transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <div className="h-6 w-[1px] bg-gray-200 hidden md:block" />

            {user ? (
              <div className="flex items-center space-x-5">
                <Link to="/cart" className="relative group" data-testid="cart-link">
                  <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-[#17847c] transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#17847c] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-white animate-in zoom-in">
                      {cartCount}
                    </span>
                  )}
                </Link>
                
                <Link to="/dashboard" className="group" data-testid="dashboard-link">
                  <User className="w-6 h-6 text-gray-700 group-hover:text-[#17847c] transition-colors" />
                </Link>

                {user.is_admin && (
                  <Link to="/admin" className="group" data-testid="admin-link">
                    <LayoutDashboard className="w-6 h-6 text-gray-700 group-hover:text-[#17847c] transition-colors" />
                  </Link>
                )}

                <button 
                  onClick={logout} 
                  className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-all duration-300"
                  data-testid="logout-button"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <Button className="bg-[#17847c] hover:bg-[#116660] text-white px-8 py-6 rounded-2xl font-bold tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#17847c]/20">
                  LOGIN
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
