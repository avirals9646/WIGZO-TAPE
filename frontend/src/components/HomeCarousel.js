import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function HomeCarousel() {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1740198321840-398cec9cb256?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwzfHxiZWF1dGlmdWwlMjB3b21hbiUyMGxvbmclMjBoYWlyJTIwc2Fsb24lMjBjbG9zZSUyMHVwfGVufDB8fHx8MTc3MzExNDU2OHww&ixlib=rb-4.1.0&q=85',
      title: 'INVISIBLE HOLD',
      subtitle: 'Professional Grade Wig Tape',
      cta: 'Shop Now'
    },
    {
      image: 'https://images.unsplash.com/photo-1612041712051-ed5c64a4646f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxiZWF1dGlmdWwlMjB3b21hbiUyMGxvbmclMjBoYWlyJTIwc2Fsb24lMjBjbG9zZSUyMHVwfGVufDB8fHx8MTc3MzExNDU2OHww&ixlib=rb-4.1.0&q=85',
      title: 'LONG LASTING',
      subtitle: 'Up to 6-8 Weeks Hold',
      cta: 'Explore Products'
    },
    {
      image: 'https://images.unsplash.com/photo-1629397683830-9805395892e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3R5bGlzdCUyMGFwcGx5aW5nJTIwd2lnfGVufDB8fHx8MTc3MzExNDU1NHww&ixlib=rb-4.1.0&q=85',
      title: 'TRUSTED BY PROFESSIONALS',
      subtitle: 'Salon Quality Adhesive',
      cta: 'Learn More'
    }
  ];

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[600px] overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="hero-overlay absolute inset-0"></div>
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-xl text-gray-200 mb-8">
                      {slide.subtitle}
                    </p>
                    <a href="/products">
                      <button className="btn-primary text-lg">
                        {slide.cta} →
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}