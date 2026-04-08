import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPinIcon, Mail, ArrowUpRight, Linkedin, Code2, Phone, MapPin } from 'lucide-react';


export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-[#0a0a0a] text-white pt-24 pb-12 overflow-hidden">
      {/* Aesthetic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#17847c] to-transparent opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#17847c]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">

          {/* Brand Identity */}
          <div className="md:col-span-4 space-y-8">
            <img
              src="https://customer-assets.emergentagent.com/job_b4f0fc4c-96da-4399-b28f-8218e03f515b/artifacts/wouuvr44_IMG-20260212-WA0090.jpg"
              alt="Wigzo Tape"
              className="h-16 w-auto brightness-110"
            />
            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-sm">
              Defining the future of hair aesthetics with <span className="text-white font-medium">medical-grade precision</span> and invisible confidence.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/wigzo_tapes?igsh=MXE2MjA1cW9qbGZjMw%3D%3D&utm_source=qr" },
                { Icon: Facebook, href: "https://www.facebook.com/share/18KWyeUk3R/?mibextid=wwXIfr" },
                { Icon: MapPinIcon, href: "https://maps.app.goo.gl/5LA8DPaUrKHqpSso6?g_st=iw" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank" 
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#17847c] hover:border-[#17847c] hover:-translate-y-2 transition-all duration-500 group"
                >
                  <social.Icon className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-6 ">
            <h3 className="text-[#17847c] font-black tracking-[0.2em] text-xs uppercase">Company</h3>
            <ul className="space-y-4">
              {['Home', 'Products', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
                    className="group flex items-center text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <span className="text-sm">{item}</span>
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        

          {/* Newsletter / Contact */}
          <div className="md:col-span-4 space-y-8">
            <h3 className="text-white font-bold text-xl tracking-tight">Stay in the loop</h3>
            <div className="relative group">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-[#17847c] transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-[#17847c] text-white rounded-xl text-xs font-bold hover:bg-[#126b64] transition-all">
                JOIN
              </button>
            </div>
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <Mail className="w-4 h-4 text-[#17847c]" />      
              <span>wigzotapes@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <Phone className="w-4 h-4 text-[#17847c]" />
              <span>+91 7217693925</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <MapPin className="w-4 h-4 text-[#17847c]" />
              <a
                href="https://maps.app.goo.gl/5LA8DPaUrKHqpSso6?g_st=iw"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#17847c] transition-colors underline underline-offset-2"
              >
                 H-38, Street No 4, Brahmpuri, Delhi - 110053
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar Updated with Developer Badge */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="space-y-4">
            <p className="text-xs text-gray-500 font-light tracking-widest uppercase">
              © 2026 Wigzo Tape <span className="mx-2">•</span> Handcrafted for Professionals
            </p>

            {/* Developer Badge */}
            {/* Developer Badge for Two Creators */}
            {/* Developers Section - Two Separate Aesthetic Boxes */}
            {/* Developers Section - Inbox aur LinkedIn Connect ke saath */}
            <div className="flex flex-wrap gap-4 mt-6">

              {/* Developer 1 */}
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md group hover:border-[#17847c]/50 transition-all duration-500">
                <div className="w-8 h-8 rounded-xl bg-[#17847c]/10 flex items-center justify-center text-[#17847c] group-hover:bg-primary group-hover:text-white transition-all">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-black tracking-widest text-gray-500 uppercase leading-none mb-1">Developed BY</span>
                  <span className="text-xs font-bold text-gray-200">Sarthak Kesarwani</span>
                </div>
                <div className="flex gap-2 ml-2 border-l border-white/10 pl-2">
                  {/* Mailto link: Isse direct Inbox khulega */}
                  <a href="sarthakkesarwani2001@gmil.com" title="Send Email" className="text-gray-500 hover:text-[#17847c] transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                  {/* LinkedIn direct link */}
                  <a href="https://www.linkedin.com/in/sarthak8858/" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile" className="text-gray-500 hover:text-[#17847c] transition-colors">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Developer 2 */}
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md group hover:border-[#17847c]/50 transition-all duration-500">
                <div className="w-8 h-8 rounded-xl bg-[#17847c]/10 flex items-center justify-center text-[#17847c] group-hover:bg-primary group-hover:text-white transition-all">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-black tracking-widest text-gray-500 uppercase leading-none mb-1">Developed BY</span>
                  <span className="text-xs font-bold text-gray-200">Aviral Srivastava</span>
                </div>
                <div className="flex gap-2 ml-2 border-l border-white/10 pl-2">
                  <a href="mailto:p2@email.com" title="Send Email" className="text-gray-500 hover:text-[#17847c] transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile" className="text-gray-500 hover:text-[#17847c] transition-colors">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Developer 3 */}
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md group hover:border-[#17847c]/50 transition-all duration-500">
                <div className="w-8 h-8 rounded-xl bg-[#17847c]/10 flex items-center justify-center text-[#17847c] group-hover:bg-primary group-hover:text-white transition-all">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-black tracking-widest text-gray-500 uppercase leading-none mb-1">Developed BY</span>
                  <span className="text-xs font-bold text-gray-200">Pranav Mishra</span>
                </div>
                <div className="flex gap-2 ml-2 border-l border-white/10 pl-2">
                  <a href="mailto:p2@email.com" title="Send Email" className="text-gray-500 hover:text-[#17847c] transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile" className="text-gray-500 hover:text-[#17847c] transition-colors">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>



          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#17847c] transition-all uppercase tracking-widest"
          >
            Back to top
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#17847c] transition-all">
              ↑
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
