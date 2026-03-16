import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import ProductCard from '../components/ProductCard';
import HomeCarousel from '../components/HomeCarousel';
import api from '../api';
import { ArrowRight, Shield, Zap, Award } from 'lucide-react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products');
      setFeaturedProducts(response.data.slice(0, 3));
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Carousel Hero Section */}
      <HomeCarousel />

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" data-testid="features-title">
            WHY CHOOSE WIGZO TAPE?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 border border-gray-100 bg-white hover:border-[#17847c] transition-colors duration-300 rounded-none" data-testid="feature-strong-hold">
              <Shield className="w-12 h-12 text-[#17847c] mb-4" />
              <h3 className="text-2xl font-bold mb-4">STRONG HOLD</h3>
              <p className="text-gray-600">
                Medical-grade adhesive that lasts for days, even in humid conditions.
              </p>
            </div>
            <div className="p-8 border border-gray-100 bg-white hover:border-[#17847c] transition-colors duration-300 rounded-none" data-testid="feature-invisible">
              <Zap className="w-12 h-12 text-[#17847c] mb-4" />
              <h3 className="text-2xl font-bold mb-4">INVISIBLE FINISH</h3>
              <p className="text-gray-600">
                Ultra-thin design blends seamlessly with your skin for a natural look.
              </p>
            </div>
            <div className="p-8 border border-gray-100 bg-white hover:border-[#17847c] transition-colors duration-300 rounded-none" data-testid="feature-skin-safe">
              <Award className="w-12 h-12 text-[#17847c] mb-4" />
              <h3 className="text-2xl font-bold mb-4">SKIN SAFE</h3>
              <p className="text-gray-600">
                Hypoallergenic formula suitable for sensitive skin, dermatologist tested.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" data-testid="featured-products-title">
              FEATURED PRODUCTS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/products">
                <Button className="btn-secondary" data-testid="view-all-products-button">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#17847c] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="cta-title">
            READY TO EXPERIENCE THE DIFFERENCE?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers who trust Wigzo Tape for their wig applications.
          </p>
          <Link to="/products">
            <Button className="bg-black text-white hover:bg-white hover:text-black rounded-none uppercase tracking-wider font-bold px-8 py-3 transition-all duration-300" data-testid="cta-button">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}