import React from 'react';
import { Award, Users, Target, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        
        {/* Background Decorative Blob */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" />

        {/* Hero Section - Bold & Animated */}
        <div className="mb-24 space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="flex items-center gap-4">
            <span className="h-[2px] w-12 bg-primary"></span>
            <span className="text-primary font-black tracking-[0.4em] text-xs uppercase">Est. 2026</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.85]">
            BEYOND <br />
            <span className="text-primary italic pr-4">ADHESION.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-light leading-relaxed pt-4">
            Wigzo Tape is the convergence of medical science and hair artistry. We don’t just hold; we empower your invisible confidence.
          </p>
        </div>

        {/* Image Section - Interactive Reveal */}
        <div className="mb-32 relative group rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-1000 delay-300">
          <img
            src="https://images.unsplash.com/photo-1740198321840-398cec9cb256?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwzfHxiZWF1dGlmdWwlMjB3b21hbiUyMGxvbmclMjBoYWlyJTIwc2Fsb24lMjBjbG9zZSUyMHVwfGVufDB8fHx8MTc3MzExNDU2OHww&ixlib=rb-4.1.0&q=85"
            alt="Hair Professional"
            className="w-full h-[600px] object-cover transition-transform duration-[2s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-12">
            <div className="space-y-2">
              <p className="text-primary font-bold tracking-widest text-sm uppercase">Global Standard</p>
              <h3 className="text-white text-3xl font-black italic">TRUSTED BY 10K+ STYLISTS</h3>
            </div>
          </div>
        </div>

        {/* Values Section - Staggered Grid */}
        {/* Values Section - Guaranteed Visibility */}
<div className="mb-32">
  <div className="text-center mb-20 space-y-4">
    <h2 className="text-sm font-black tracking-[0.5em] uppercase text-gray-400">
      Our Core Philosophy
    </h2>
    <div className="w-12 h-1 bg-[#17847c] mx-auto"></div>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
    {[
      { icon: Award, title: "QUALITY FIRST", desc: "Medical-grade materials for ultimate skin safety.", num: "01" },
      { icon: Target, title: "INNOVATION", desc: "Continuous R&D for the world's thinnest hold.", num: "02" },
      { icon: Users, title: "COMMUNITY", desc: "Empowering stylists and creators worldwide.", num: "03" }
    ].map((item, index) => (
      <div 
        key={index}
        className="group relative p-10 bg-white border border-gray-100 rounded-[2rem] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(23,132,124,0.1)] hover:-translate-y-3 text-center overflow-hidden"
      >
        {/* Background Number - Aesthetic look */}
        <div className="absolute -right-4 -top-4 text-gray-50 font-black text-8xl group-hover:text-[#17847c]/5 transition-colors">
          {item.num}
        </div>

        {/* Icon */}
        <div className="relative z-10 w-16 h-16 bg-[#17847c]/5 text-[#17847c] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#17847c] group-hover:text-white transition-all duration-500">
           <item.icon className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />
        </div>

        {/* Text */}
        <h3 className="relative z-10 text-xl font-black mb-4 tracking-tight group-hover:text-[#17847c] transition-colors">
          {item.title}
        </h3>
        <p className="relative z-10 text-gray-500 font-light leading-relaxed">
          {item.desc}
        </p>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-[#17847c] group-hover:w-full transition-all duration-700" />
      </div>
    ))}
  </div>
</div>


        {/* Story Section - Dark Mode Aesthetic */}
        <div className="bg-[#0a0a0a] text-white p-12 md:p-24 relative overflow-hidden rounded-[3rem] shadow-2xl group">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
               <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tighter">
                OUR <br/> <span className="text-primary italic pr-4">JOURNEY</span>
              </h2>
              <div className="w-20 h-1.5 bg-primary"></div>
            </div>
            
            <div className="space-y-8 text-gray-400 text-lg font-light leading-relaxed">
              <p className="hover:text-white transition-colors duration-500">
                Wigzo Tape started in a small lab with a big dream: to make hair replacement feel like a second skin.
              </p>
              <p className="hover:text-white transition-colors duration-500">
                Today, we're the gold standard for Broadway shows and top-tier salons, blending chemistry with artistry.
              </p>
              <button className="group flex items-center gap-4 text-primary font-bold tracking-widest text-sm hover:text-white transition-all">
                READ MORE <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
