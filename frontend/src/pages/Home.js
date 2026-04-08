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
      <section className="relative py-32 bg-white overflow-hidden selection:bg-[#17847c] selection:text-white">
        {/* Decorative Background Blobs - Ye aesthetic vibes denge */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-[#17847c]/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-50 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          {/* Ultra Modern Header */}
          <div className="text-center mb-24 space-y-4">
            <div className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-[0.3em] uppercase bg-[#17847c]/10 text-[#17847c] rounded-full animate-bounce">
              The Gold Standard
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.2] tracking-tight py-2" data-testid="features-title">
              WHY WE CHOOSE <br />
              <span className="inline-block bg-gradient-to-r from-[#17847c] to-[#2db3a9] bg-clip-text text-transparent italic px-2 pb-2">
                WIGZO TAPE?
              </span>
            </h2>

            <p className="text-gray-400 max-w-xl mx-auto font-light text-lg">
              Engineered for perfection, trusted by icons.
            </p>
          </div>

          {/* Features Grid with Glassmorphism & Hover Glow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Shield,
                title: "STRONG HOLD",
                desc: "Medical-grade adhesive that lasts for days, even in humid conditions.",
                color: "from-emerald-500/20"
              },
              {
                icon: Zap,
                title: "INVISIBLE FINISH",
                desc: "Ultra-thin design blends seamlessly with your skin for a natural look.",
                color: "from-blue-500/20"
              },
              {
                icon: Award,
                title: "SKIN SAFE",
                desc: "Hypoallergenic formula suitable for sensitive skin, dermatologist tested.",
                color: "from-[#17847c]/20"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-12 bg-white/40 backdrop-blur-xl border border-gray-100 rounded-[2.5rem] transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(23,132,124,0.15)] hover:border-[#17847c]/30 overflow-hidden"
              >
                {/* Animated Background Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                {/* Icon Section */}
                <div className="relative z-10 w-20 h-20 mb-10 flex items-center justify-center bg-white shadow-xl rounded-[1.5rem] group-hover:rotate-[10deg] transition-all duration-500 group-hover:bg-[#17847c] group-hover:text-white">
                  <feature.icon className="w-10 h-10 transition-transform duration-500" />
                </div>

                {/* Text Content */}
                <div className="relative z-10 space-y-4">
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-lg leading-relaxed font-light transition-all duration-500 group-hover:text-gray-900">
                    {feature.desc}
                  </p>
                </div>

                {/* Modern Progress Line */}
                <div className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-[#17847c] to-emerald-300 w-0 group-hover:w-full transition-all duration-1000" />
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="relative py-24 bg-[#fcfcfc]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Header Section */}
            <div className="text-center mb-16 space-y-3">
              <span className="text-[#17847c] font-bold tracking-[0.3em] text-[10px] uppercase">
                Exclusive Items
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                FEATURED <span className="text-[#17847c]">PRODUCTS</span>
              </h2>
              <div className="w-16 h-1 bg-[#17847c] mx-auto rounded-full" />
            </div>

            {/* Grid: Safest way to show cards with hover animation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group transform transition-all duration-500 hover:-translate-y-3"
                >
                  {/* Direct ProductCard (Jo image wala design tumne manga tha) */}
                  <div className="bg-white rounded-[2.5rem] overflow-hidden hover:shadow-[0_30px_60px_rgba(23,132,124,0.1)] transition-shadow duration-500">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-20">
              <Link to="/products" className="inline-block">
                <button
                  className="px-10 py-4 font-bold text-white rounded-full bg-[#17847c] shadow-lg hover:shadow-[#17847c]/40 hover:scale-105 active:scale-95 transition-all duration-300"
                  data-testid="view-all-products-button"
                >
                  <span className="flex items-center gap-2">
                    View All Products
                    <svg xmlns="http://w3.org" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}





      {/* CTA Section */}
     <section className="relative py-20 md:py-24 bg-[#17847c] overflow-hidden">
  {/* Background Aesthetic Elements */}
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
    <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-[80px]" />
    <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-black/5 rounded-full blur-[80px]" />
  </div>

  <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
    {/* Minimal Icon */}
    <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-lg rounded-2xl mb-6 border border-white/20">
      <svg xmlns="http://w3.org" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
      </svg>
    </div>

    {/* Balanced Typography */}
    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight" data-testid="cta-title">
      READY TO EXPERIENCE <br />
      <span className="text-emerald-200 italic">THE DIFFERENCE?</span>
    </h2>

    <p className="text-lg md:text-xl text-emerald-50/70 mb-10 max-w-xl mx-auto font-light leading-relaxed">
      Join <span className="text-white font-semibold">10,000+</span> professionals who trust the world's most invisible hold.
    </p>

    {/* Luxury Pill Button */}
    <Link to="/products" className="inline-block group">
      <button 
        className="relative px-10 py-4 bg-black text-white rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-black/20"
        data-testid="cta-button"
      >
        <div className="relative z-10 flex items-center gap-3">
          <span className="text-xs font-bold tracking-[0.2em] uppercase">Shop Collection</span>
          <svg xmlns="http://w3.org" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </button>
    </Link>
  </div>
</section>


    </div>
  );
}