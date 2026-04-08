import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

export default function HomeCarousel() {
  return (
    <div className="relative group/carousel w-full overflow-hidden bg-[#0a0a0a]">
      <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[Autoplay({ delay: 6000, stopOnInteraction: false })]}
        className="w-full"
      >
        <CarouselContent>
          {[
            {
              src: 'https://images.unsplash.com/photo-1629397683830-9805395892e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3R5bGlzdCUyMGFwcGx5aW5nJTIwd2lnfGVufDB8fHx8MTc3MzExNDU1NHww&ixlib=rb-4.1.0&q=85',
              title: 'INVISIBLE',
              highlight: 'HOLD',
              sub: 'The gold standard for a flawless, 8-week invisible bond.'
            },
            {
              src: 'https://images.unsplash.com/photo-1740198321840-398cec9cb256?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwzfHxiZWF1dGlmdWwlMjB3b21hbiUyMGxvbmclMjBoYWlyJTIwc2Fsb24lMjBjbG9zZSUyMHVwfGVufDB8fHx8MTc3MzExNDU2OHww&ixlib=rb-4.1.0&q=85',
              title: 'LONG',
              highlight: 'LASTING',
              sub: 'Engineered for 8 weeks of unmatched, skin-safe durability.'
            },
            {
              src: 'https://images.unsplash.com/photo-1612041712051-ed5c64a4646f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxiZWF1dGlmdWwlMjB3b21hbiUyMGxvbmclMjBoYWlyJTIwc2Fsb24lMjBjbG9zZSUyMHVwfGVufDB8fHx8MTc3MzExNDU2OHww&ixlib=rb-4.1.0&q=85',
              title: 'TRUSTED BY',
              highlight: 'PROFESSIONALS',
              sub: 'Salon-grade precision for an ultra-secure, seamless hold.'
            }
          ].map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[750px] md:h-[900px] w-full overflow-hidden">
                
                {/* 1. Ken Burns Effect (Slow Zoom) */}
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover opacity-60 scale-110 animate-[kenburns_20s_linear_infinite]"
                />
                
                {/* 2. Multi-layer Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />

                <div className="absolute inset-0 flex items-center z-20">
                  <div className="max-w-7xl mx-auto px-8 md:px-12 w-full">
                    <div className="max-w-4xl space-y-8">
                      
                      {/* Top Label Animation */}
                      <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-10 duration-700">
                        <span className="h-[2px] w-12 bg-[#17847c] rounded-full" />
                        <span className="text-[#17847c] font-black tracking-[0.4em] text-xs uppercase animate-pulse">
                          Wigzo Elite Series
                        </span>
                      </div>

                      {/* 3. Massive Luxury Title */}
                      <h2 className="text-7xl md:text-9xl font-black text-white leading-[0.8] tracking-tighter animate-in fade-in slide-in-from-left-20 duration-1000 delay-300">
                        {slide.title} <br/>
                        <span className="inline-block pt-4 pb-6 pr-16 bg-gradient-to-r from-[#17847c] to-emerald-400 bg-clip-text text-transparent italic">
                          {slide.highlight}
                        </span>
                      </h2>

                      {/* Description with Stagger */}
                      <p className="text-gray-400 text-xl md:text-2xl max-w-xl font-light leading-relaxed animate-in fade-in slide-in-from-left-10 duration-1000 delay-500">
                        {slide.sub}
                      </p>

                      {/* 4. Luxury Action Button (Matches Popup style) */}
                      <div className="pt-8 animate-in fade-in zoom-in duration-700 delay-700">
                        <a href="/products" className="group/btn relative inline-flex items-center gap-6 px-14 py-6 bg-[#17847c] text-white font-black rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(23,132,124,0.5)] hover:scale-105">
                          <span className="relative z-10 tracking-[0.2em] text-sm">SHOP COLLECTION</span>
                          <ShoppingBag className="relative z-10 w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-[#17847c] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 5. Modern Magnetic Nav Buttons */}
        <div className="absolute bottom-16 right-16 flex items-center gap-8 z-30">
          <CarouselPrevious className="group/nav relative static translate-y-0 w-20 h-20 rounded-2xl border-white/10 bg-white/5 backdrop-blur-2xl text-white transition-all duration-500 hover:bg-[#17847c] hover:border-[#17847c] shadow-2xl flex items-center justify-center overflow-hidden">
            <ArrowLeft className="w-6 h-6 group-hover/nav:-translate-x-1 transition-transform" />
          </CarouselPrevious>

          <CarouselNext className="group/nav relative static translate-y-0 w-20 h-20 rounded-2xl border-white/10 bg-white/5 backdrop-blur-2xl text-white transition-all duration-500 hover:bg-[#17847c] hover:border-[#17847c] shadow-2xl flex items-center justify-center overflow-hidden">
            <ArrowRight className="w-6 h-6 group-hover/nav:translate-x-1 transition-transform" />
          </CarouselNext>
        </div>

      </Carousel>
      
      {/* Decorative Bottom Shadow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
    </div>
  );
}
