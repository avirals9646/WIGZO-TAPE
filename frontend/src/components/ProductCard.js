import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import { toast } from 'sonner';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    try {
      await addToCart(product.id, 1);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card group" data-testid={`product-card-${product.id}`}>
      <div className="border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-300 rounded-none overflow-hidden">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            data-testid={`product-image-${product.id}`}
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold uppercase mb-2" data-testid={`product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-[#17847c]" data-testid={`product-price-${product.id}`}>
              ₹{product.price.toFixed(2)}
            </span>
            <Button
              onClick={handleAddToCart}
              className="btn-primary"
              data-testid={`add-to-cart-${product.id}`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}