import React from 'react';
import { Award, Users, Target } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen py-16" data-testid="about-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="about-title">
            ABOUT WIGZO TAPE
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            We're on a mission to provide the most reliable, invisible, and skin-safe wig tape solutions for professionals and enthusiasts worldwide.
          </p>
        </div>

        {/* Image Section */}
        <div className="mb-16 rounded-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1629397683830-9805395892e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3R5bGlzdCUyMGFwcGx5aW5nJTIwd2lnfGVufDB8fHx8MTc3MzExNDU1NHww&ixlib=rb-4.1.0&q=85"
            alt="Professional stylist"
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-testid="values-title">
            OUR VALUES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center" data-testid="value-quality">
              <Award className="w-16 h-16 text-[#17847c] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">QUALITY FIRST</h3>
              <p className="text-gray-600">
                We use only medical-grade materials and rigorous testing to ensure every product meets the highest standards.
              </p>
            </div>
            <div className="text-center" data-testid="value-innovation">
              <Target className="w-16 h-16 text-[#17847c] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">INNOVATION</h3>
              <p className="text-gray-600">
                Constantly researching and developing new formulations to provide better hold, comfort, and invisibility.
              </p>
            </div>
            <div className="text-center" data-testid="value-community">
              <Users className="w-16 h-16 text-[#17847c] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">COMMUNITY</h3>
              <p className="text-gray-600">
                Supporting hair stylists, wig makers, and individuals with resources, education, and exceptional service.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gray-50 p-8 md:p-12 rounded-none">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="story-title">
            OUR STORY
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Wigzo Tape was founded with a simple vision: to create the best wig tape in the industry. After years of research and development, we've perfected our formula to provide unmatched hold, comfort, and invisibility.
            </p>
            <p>
              Our team consists of chemists, dermatologists, and hair professionals who understand the unique challenges of wig application. We've tested our products on thousands of customers and continually refine our formulas based on real-world feedback.
            </p>
            <p>
              Today, Wigzo Tape is trusted by professional salons, theatrical productions, and individuals worldwide. We're proud to be part of your journey to confidence and self-expression.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}