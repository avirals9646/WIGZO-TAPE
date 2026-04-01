import React from 'react';
import { Award, Users, Target } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Hero Section - Fade In Animation */}
        <div className="mb-20 border-l-4 border-[#17847c] pl-8 animate-in fade-in duration-1000 slide-in-from-left-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-gray-900">
            ABOUT <span className="text-[#17847c]">WIGZO TAPE</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed font-light">
            Crafting the future of hair aesthetics with medical-grade precision and invisible confidence.
          </p>
        </div>

        {/* Image Section - Working Image Link */}
        <div className="mb-24 relative group overflow-hidden shadow-2xl rounded-xl">
          <img
            src="https://unsplash.com"
            alt="Hair Professional"
            className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
            <p className="text-white font-medium">Trusted by Professionals Worldwide</p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-16 text-center tracking-widest uppercase text-gray-400">
            Core Philosophy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Quality */}
            <div className="group p-8 bg-white border border-gray-100 hover:border-[#17847c]/30 transition-all duration-500 shadow-sm hover:shadow-2xl text-center transform hover:-translate-y-2">
              <Award className="w-12 h-12 text-[#17847c] mx-auto mb-6 group-hover:rotate-12 transition-transform" />
              <h3 className="text-xl font-bold mb-4 tracking-tight">QUALITY FIRST</h3>
              <p className="text-gray-500 font-light">Medical-grade materials for ultimate skin safety.</p>
            </div>

            {/* Innovation */}
            <div className="group p-8 bg-white border border-gray-100 hover:border-[#17847c]/30 transition-all duration-500 shadow-sm hover:shadow-2xl text-center transform hover:-translate-y-2">
              <Target className="w-12 h-12 text-[#17847c] mx-auto mb-6 group-hover:scale-125 transition-transform" />
              <h3 className="text-xl font-bold mb-4 tracking-tight">INNOVATION</h3>
              <p className="text-gray-500 font-light">Continuous R&D for the world's thinnest hold.</p>
            </div>

            {/* Community */}
            <div className="group p-8 bg-white border border-gray-100 hover:border-[#17847c]/30 transition-all duration-500 shadow-sm hover:shadow-2xl text-center transform hover:-translate-y-2">
              <Users className="w-12 h-12 text-[#17847c] mx-auto mb-6 group-hover:bounce transition-transform" />
              <h3 className="text-xl font-bold mb-4 tracking-tight">COMMUNITY</h3>
              <p className="text-gray-500 font-light">Empowering stylists and creators worldwide.</p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-zinc-900 text-white p-12 md:p-20 relative overflow-hidden rounded-3xl shadow-2xl">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              OUR <br/> JOURNEY
            </h2>
            <div className="space-y-6 text-zinc-400 text-lg font-light leading-relaxed">
              <p>
                Wigzo Tape started in a small lab with a big dream: to make hair replacement feel like a second skin.
              </p>
              <p>
                Today, we're the gold standard for Broadway shows and top-tier salons, blending chemistry with artistry.
              </p>
            </div>
          </div>
          <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[#17847c]/10 rounded-full blur-[120px]" />
        </div>

      </div>
    </div>
  );
}
