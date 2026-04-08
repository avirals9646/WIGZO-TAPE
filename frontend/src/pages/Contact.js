import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import api from '../api';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', feedback: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/contact/submit', formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', address: '', feedback: '' });
    } catch (error) {
      toast.error('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-24 relative overflow-hidden" data-testid="contact-page">
      {/* Aesthetic Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#17847c]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-left mb-20 animate-in fade-in slide-in-from-bottom-5 duration-1000">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-[#17847c]" />
            <span className="text-[#17847c] font-black tracking-[0.3em] text-[10px] uppercase">Contact Elite</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
            GET IN <span className="text-[#17847c] italic pr-4">TOUCH</span>
          </h1>
          <p className="text-gray-400 mt-6 text-xl font-light max-w-xl">
            Have questions about our professional adhesives? Our experts are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Form - Minimalist Luxury Style */}
          <div className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-gray-100 animate-in fade-in slide-in-from-left-10 duration-1000">
            <h2 className="text-2xl font-black mb-8 tracking-tight">SEND A MESSAGE</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Full Name</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="border-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-[#17847c] transition-all px-0 bg-transparent text-lg"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Email Address</Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-[#17847c] transition-all px-0 bg-transparent text-lg"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Feedback / Message</Label>
                <Textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="border-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-[#17847c] transition-all px-0 bg-transparent text-lg resize-none"
                  placeholder="How can we assist you today?"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-[#17847c] hover:bg-black text-white rounded-2xl font-black tracking-widest transition-all duration-500 shadow-xl shadow-[#17847c]/20 hover:shadow-black/20 flex items-center gap-3"
              >
                {loading ? 'SENDING...' : 'DISPATCH MESSAGE'}
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-1000">
            {/* Dark Premium Info Box */}
            <div className="bg-[#0a0a0a] text-white p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#17847c]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <h2 className="text-3xl font-black mb-10 tracking-tight italic">Direct Reach</h2>
              
              <div className="space-y-10 relative z-10">
                <div className="flex items-center gap-6 group/item">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover/item:bg-[#17847c] transition-all">
                    <Mail className="w-5 h-5 text-[#17847c] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase mb-1">Email Us</p>
                    <p className="text-lg font-medium">wigzotapes@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group/item">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover/item:bg-[#17847c] transition-all">
                    <Phone className="w-5 h-5 text-[#17847c] group-hover/item:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase mb-1">Call Anytime</p>
                    <p className="text-lg font-medium">+91 7217693925</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Highlight */}
            <div className="bg-white border border-gray-100 p-10 rounded-[2.5rem] flex items-start gap-6 hover:shadow-xl transition-all duration-500">
              <div className="p-4 bg-[#17847c]/5 rounded-2xl">
                <MessageSquare className="w-8 h-8 text-[#17847c]" />
              </div>
              <div>
                <h3 className="text-xl font-black mb-2 tracking-tight">Active Support</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  Available Mon-Fri, 9 AM to 6 PM IST. We typically respond within 24 hours.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
