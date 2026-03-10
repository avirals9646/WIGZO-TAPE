import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import api from '../api';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      toast.error('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    try {
      await addToCart(product.id, quantity);
      toast.success(`Added ${quantity} item(s) to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17847c] mx-auto mb-4"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/products">
            <Button className="btn-primary">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16" data-testid="product-detail-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 rounded-none overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
              data-testid="product-detail-image"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="product-detail-name">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-[#17847c] mb-6" data-testid="product-detail-price">
              ₹{product.price.toFixed(2)}
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">KEY FEATURES</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#17847c] mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-8">
              <label className="block text-sm font-bold mb-2">QUANTITY</label>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-black hover:bg-black hover:text-white rounded-none"
                  data-testid="decrease-quantity"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-bold w-12 text-center" data-testid="quantity-display">{quantity}</span>
                <Button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-black hover:bg-black hover:text-white rounded-none"
                  data-testid="increase-quantity"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="btn-primary w-full md:w-auto"
              data-testid="add-to-cart-button"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Category:</strong> {product.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}