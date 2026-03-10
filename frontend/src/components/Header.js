import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';
import { Button } from './ui/button';

export default function Header() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center" data-testid="logo-link">
            <img 
              src="https://customer-assets.emergentagent.com/job_b4f0fc4c-96da-4399-b28f-8218e03f515b/artifacts/wouuvr44_IMG-20260212-WA0090.jpg" 
              alt="Wigzo Tape" 
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-sm font-bold uppercase tracking-wider hover:text-[#17847c] transition-colors"
              data-testid="nav-home"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-sm font-bold uppercase tracking-wider hover:text-[#17847c] transition-colors"
              data-testid="nav-products"
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-bold uppercase tracking-wider hover:text-[#17847c] transition-colors"
              data-testid="nav-about"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/cart" className="relative" data-testid="cart-link">
                  <ShoppingCart className="w-6 h-6 hover:text-[#17847c] transition-colors" />
                  {cartCount > 0 && (
                    <span className="cart-badge" data-testid="cart-badge">{cartCount}</span>
                  )}
                </Link>
                
                <Link to="/dashboard" data-testid="dashboard-link">
                  <User className="w-6 h-6 hover:text-[#17847c] transition-colors" />
                </Link>

                {user.is_admin && (
                  <Link to="/admin" data-testid="admin-link">
                    <LayoutDashboard className="w-6 h-6 hover:text-[#17847c] transition-colors" />
                  </Link>
                )}

                <button 
                  onClick={logout} 
                  className="text-sm font-bold uppercase tracking-wider hover:text-[#17847c] transition-colors"
                  data-testid="logout-button"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </>
            ) : (
              <Link to="/login">
                <Button className="btn-primary" data-testid="login-button">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}