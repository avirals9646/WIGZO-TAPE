import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useAuth } from '../AuthContext';
import api from '../api';
import { toast } from 'sonner';
import { PenLine, ArrowLeft, Send, Sparkles } from 'lucide-react';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to create a blog');
      navigate('/login');
      return;
    }

    if (title.trim().length < 3) {
      toast.error('Title is too short!');
      return;
    }

    if (content.trim().length < 50) {
      toast.error('Article content is too short (min 50 characters)!');
      return;
    }

    try {
      setLoading(true);
      
      const response = await api.post('/blogs/create', { 
        title: title.trim(), 
        content: content.trim() 
      });

      // Verify we got a valid blog back
      if (response.data && response.data.id) {
        toast.success('Your article has been published!');
        // Small delay so toast is visible, then navigate
        setTimeout(() => navigate('/blogs'), 500);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Failed to create blog:', error);
      const errorMsg = error.response?.data?.detail || 'Failed to publish. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc] px-6 text-center">
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
          <PenLine className="w-10 h-10 text-primary/40" />
        </div>
        <h2 className="text-3xl font-black tracking-tighter text-gray-900 mb-4 uppercase">Access Restricted</h2>
        <p className="text-gray-500 font-light mb-8 max-w-sm">Please sign in to your professional account to contribute to the Wigzo Journal.</p>
        <Button onClick={() => navigate('/login')} className="bg-primary hover:bg-black text-white px-10 py-6 rounded-2xl font-bold tracking-widest transition-all shadow-xl shadow-primary/20">
          LOGIN TO CONTINUE
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20 relative overflow-hidden" data-testid="create-blog-page">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        
        <button 
          onClick={() => navigate('/blogs')} 
          className="group mb-12 flex items-center gap-2 text-xs font-black tracking-widest text-gray-400 hover:text-primary transition-all"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          BACK TO JOURNAL
        </button>

        <div className="mb-16 space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-1000">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-primary font-black tracking-[0.4em] text-[10px] uppercase">New Insight</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
            WRITE <span className="text-primary italic pr-4">ARTICLE</span>
          </h1>
          <p className="text-gray-400 text-lg font-light">Share your professional expertise with the Wigzo community.</p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000"
        >
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-gray-100">
            <div className="space-y-12">
              
              {/* Title */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black tracking-widest uppercase text-gray-400 ml-1">
                  Article Headline *
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  minLength={3}
                  className="border-0 border-b-2 border-gray-100 rounded-none focus-visible:ring-0 focus-visible:border-primary px-1 bg-transparent text-3xl md:text-4xl font-black tracking-tight placeholder:text-gray-100 py-8 h-auto transition-all"
                  placeholder="The Secret to Perfect Adhesion..."
                  data-testid="blog-title-input"
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black tracking-widest uppercase text-gray-400 ml-1">
                  Your Story * <span className="text-gray-300 font-normal normal-case tracking-normal">({content.length} chars, min 50)</span>
                </Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={12}
                  className="border-0 bg-gray-50/50 rounded-3xl focus-visible:ring-1 focus-visible:ring-primary/20 p-8 text-lg font-light leading-relaxed placeholder:text-gray-300 resize-none transition-all"
                  placeholder="Start sharing your thoughts here..."
                  data-testid="blog-content-input"
                />
                {/* Character count warning */}
                {content.length > 0 && content.length < 50 && (
                  <p className="text-xs text-red-400 ml-1">
                    {50 - content.length} more characters needed
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              disabled={loading || content.trim().length < 50 || title.trim().length < 3}
              className="flex-1 h-16 bg-primary hover:bg-black text-white rounded-2xl font-black tracking-[0.2em] shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="publish-blog-button"
            >
              {loading ? 'PUBLISHING...' : 'PUBLISH TO JOURNAL'}
              <Send className="w-4 h-4" />
            </Button>
            
            <Button
              type="button"
              onClick={() => navigate('/blogs')}
              className="px-10 h-16 bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl font-bold transition-all"
            >
              DISCARD
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
