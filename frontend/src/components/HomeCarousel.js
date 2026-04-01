import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function HomeCarousel() {
  return (
    <div className="relative group/carousel w-full overflow-hidden bg-black">
      <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
        className="w-full"
      >
        <CarouselContent>
          {[
            {
              src: 'https://images.unsplash.com/photo-1629397683830-9805395892e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3R5bGlzdCUyMGFwcGx5aW5nJTIwd2lnfGVufDB8fHx8MTc3MzExNDU1NHww&ixlib=rb-4.1.0&q=85',
              title: 'INVISIBLE',
              highlight: 'HOLD',
              sub: 'Professional Grade Wig Tape for Seamless Confidence'
            },
            {
              src: 'https://images.unsplash.com/photo-1740198321840-398cec9cb256?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwzfHxiZWF1dGlmdWwlMjB3b21hbiUyMGxvbmclMjBoYWlyJTIwc2Fsb24lMjBjbG9zZSUyMHVwfGVufDB8fHx8MTc3MzExNDU2OHww&ixlib=rb-4.1.0&q=85',
              title: 'LONG',
              highlight: 'LASTING',
              sub: 'Engineered to stay, up to 6-8 weeks of reliable hold'
            },

             {
              src: 'https://images.unsplash.com/photo-1612041712051-ed5c64a4646f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxiZWF1dGlmdWwlMjB3b21hbiUyMGxvbmclMjBoYWlyJTIwc2Fsb24lMjBjbG9zZSUyMHVwfGVufDB8fHx8MTc3MzExNDU2OHww&ixlib=rb-4.1.0&q=85',
              title: 'TRUSTED BY ',
              highlight: 'PROFESSIONALS',
              sub: 'The gold standard for a flawless, 8-week invisible bond'
            }
          ].map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[700px] md:h-[850px] w-full overflow-hidden bg-zinc-900">
                
                {/* 1. Zooming Image Animation */}
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover opacity-70 transition-transform duration-[10s] scale-110 group-hover:scale-100"
                />
                
                {/* 2. Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-8 md:px-12 w-full">
                    <div className="max-w-3xl space-y-6">
                      
                      {/* Top Label */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-[1px] bg-[#17847c]" />
                        <span className="text-[#17847c] font-bold tracking-[0.3em] text-xs uppercase">Premium Quality</span>
                      </div>

                      {/* 3. Fixed Title with Gradient & Padding (No Black Box) */}
                      <h2 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter">
                        {slide.title} <br/>
                        <span className="inline-block pt-2 pb-4 pr-12 bg-gradient-to-r from-[#17847c] to-emerald-400 bg-clip-text text-transparent italic">
                          {slide.highlight}
                        </span>
                      </h2>

                      {/* Description */}
                      <p className="text-gray-300 text-lg md:text-xl max-w-xl font-light leading-relaxed">
                        {slide.sub}
                      </p>

                      {/* 4. Luxury Button Style */}
                      <div className="pt-10">
                        <a href="/products" className="group/btn relative inline-flex items-center gap-4 px-12 py-5 bg-[#17847c] text-white font-black rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(23,132,124,0.4)]">
                          <span className="relative z-10 tracking-widest text-sm">SHOP COLLECTION</span>
                          <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                          <span className="relative z-10 text-white group-hover/btn:text-[#17847c] transition-colors">→</span>
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 5. Modern Nav Buttons */}
        <div className="absolute bottom-12 right-12 flex gap-4 z-30">
          <CarouselPrevious className="static translate-y-0 w-14 h-14 rounded-full border-white/20 bg-white/5 backdrop-blur-lg text-white hover:bg-[#17847c] transition-all duration-500" />
          <CarouselNext className="static translate-y-0 w-14 h-14 rounded-full border-white/20 bg-white/5 backdrop-blur-lg text-white hover:bg-[#17847c] transition-all duration-500" />
        </div>
      </Carousel>
    </div>
  );
}
