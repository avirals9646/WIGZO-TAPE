import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import api from '../api';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    feedback: ''
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
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        feedback: ''
      });
    } catch (error) {
      console.error('Failed to submit form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16" data-testid="contact-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CONTACT US</h1>
          <p className="text-lg text-gray-600">
            Have questions? We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white border border-gray-200 p-8 rounded-none">
            <h2 className="text-2xl font-bold mb-6">SEND US A MESSAGE</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 rounded-none"
                  data-testid="contact-name-input"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 rounded-none"
                  data-testid="contact-email-input"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 rounded-none"
                  data-testid="contact-phone-input"
                />
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="mt-1 rounded-none"
                  data-testid="contact-address-input"
                />
              </div>

              <div>
                <Label htmlFor="feedback">Feedback / Suggestion *</Label>
                <Textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="mt-1 rounded-none"
                  placeholder="Tell us what's on your mind..."
                  data-testid="contact-feedback-input"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full btn-primary"
                data-testid="contact-submit-button"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="bg-[#17847c] text-white p-8 rounded-none mb-6">
              <h2 className="text-2xl font-bold mb-6">GET IN TOUCH</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p>support@wigzotape.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <p>+91 1234567890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Address</h3>
                    <p>123 Business Street<br />Mumbai, Maharashtra 400001<br />India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-none">
              <div className="flex items-start gap-4">
                <MessageSquare className="w-8 h-8 text-[#17847c]" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Customer Support</h3>
                  <p className="text-gray-600">
                    Our support team is available Monday to Friday, 9 AM to 6 PM IST. We typically respond within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}