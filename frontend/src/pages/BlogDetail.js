import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAuth } from '../AuthContext';
import api from '../api';
import { Calendar, User, ArrowLeft, Trash2, Clock, Share2 } from 'lucide-react';
import { toast } from 'sonner';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
    window.scrollTo(0, 0); // Page load hote hi top par scroll karega
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/blogs/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.error('Failed to fetch blog:', error);
      toast.error('Blog not found');
      navigate('/blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await api.delete(`/admin/blogs/${id}`);
      toast.success('Article deleted successfully');
      navigate('/blogs');
    } catch (error) {
      toast.error('Failed to delete article');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17847c] mx-auto mb-4"></div>
          <p className="text-xs font-black tracking-widest text-gray-400 uppercase">Loading Article...</p>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20 relative overflow-hidden" data-testid="blog-detail-page">
      {/* Aesthetic Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#17847c]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Floating Back Button */}
        <button
          onClick={() => navigate('/blogs')}
          className="group mb-12 flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#17847c] transition-all"
          data-testid="back-to-blogs"
        >
          <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-[#17847c] transition-all">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          BACK TO JOURNAL
        </button>

        <article className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
          {/* Header Section */}
          <header className="mb-12 space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-[#17847c]/10 text-[#17847c] text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
                Expert Insight
              </span>
              <div className="h-[1px] flex-1 bg-gray-100" />
            </div>

            <div className="flex justify-between items-start gap-8">
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-[1.1]" data-testid="blog-title">
                {blog.title}
              </h1>
              
              {user?.is_admin && (
                <Button
                  onClick={handleDelete}
                  className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl px-4 py-2 border border-red-100 transition-all duration-300"
                  data-testid="delete-blog-button"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-y-4 gap-x-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#17847c]/5 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#17847c]" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Author</p>
                  <p className="font-bold text-gray-900 leading-none">{blog.author_name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Published</p>
                  <p className="font-bold text-gray-900 leading-none">
                    {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 ml-auto">
                <button className="p-3 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Main Content Body */}
          <div className="relative">
             {/* Decorative side accent */}
             <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#17847c] via-gray-100 to-transparent hidden lg:block" />
             
             <div 
              className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-light first-letter:text-5xl first-letter:font-black first-letter:text-[#17847c] first-letter:mr-3 first-letter:float-left"
              style={{ whiteSpace: 'pre-wrap' }}
              data-testid="blog-content"
            >
              {blog.content}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-20 pt-12 border-t border-gray-100 text-center">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">End of Article</p>
            <Button
              onClick={() => navigate('/blogs')}
              className="bg-black text-white hover:bg-[#17847c] px-10 py-4 rounded-2xl font-bold tracking-widest transition-all shadow-xl shadow-black/10"
            >
              READ MORE STORIES
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
