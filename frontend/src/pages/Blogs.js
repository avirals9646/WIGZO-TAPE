import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAuth } from '../AuthContext';
import api from '../api';
import { Calendar, User, Plus, ArrowRight, BookOpen } from 'lucide-react';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/blogs');
      // Sort newest first on frontend too (safety net)
      const sorted = (response.data || []).sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setBlogs(sorted);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc]">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-[#17847c]/20 border-t-[#17847c] rounded-full animate-spin"></div>
          <BookOpen className="absolute inset-0 m-auto w-6 h-6 text-[#17847c] animate-pulse" />
        </div>
        <p className="mt-4 text-xs font-black tracking-[0.3em] text-gray-400 uppercase">Loading Stories...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20 relative overflow-hidden" data-testid="blogs-page">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#17847c]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 animate-in fade-in slide-in-from-bottom-5 duration-1000">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-[#17847c]" />
              <span className="text-[#17847c] font-black tracking-[0.3em] text-[10px] uppercase">Journal & Insights</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
              THE <span className="text-[#17847c] italic pr-4">JOURNAL</span>
            </h1>
            <p className="text-gray-500 text-lg font-light max-w-xl leading-relaxed">
              Stories, professional tips, and deep insights from the Wigzo community.
            </p>
          </div>
          
          {user && (
            <Link to="/blogs/create" className="group">
              <Button className="bg-[#17847c] hover:bg-black text-white px-8 py-7 rounded-2xl font-bold tracking-widest text-xs transition-all shadow-xl shadow-[#17847c]/20 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                WRITE ARTICLE
              </Button>
            </Link>
          )}
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-gray-100 shadow-sm animate-in fade-in duration-700" data-testid="no-blogs">
            <BookOpen className="w-16 h-16 text-gray-100 mx-auto mb-6" />
            <p className="text-2xl font-bold text-gray-400 italic mb-6">No articles yet. Be the first to share your story!</p>
            {user && (
              <Link to="/blogs/create">
                <Button className="bg-[#17847c] hover:bg-black text-white px-10 py-4 rounded-xl font-bold">Write First Article</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog, index) => (
              <Link
                key={blog.id}
                to={`/blogs/${blog.id}`}
                className="group relative flex flex-col h-full"
                style={{ animationDelay: `${index * 150}ms` }}
                data-testid={`blog-card-${blog.id}`}
              >
                <div className="flex-1 bg-white rounded-[2.5rem] p-8 border border-gray-50 transition-all duration-500 group-hover:shadow-[0_40px_80px_-15px_rgba(23,132,124,0.12)] group-hover:-translate-y-3 flex flex-col">
                  
                  <div className="flex justify-between items-center mb-8">
                    <span className="bg-[#17847c]/5 text-[#17847c] text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
                      Insight
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                      <Calendar className="w-3 h-3" />
                      {new Date(blog.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h2 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-[#17847c] transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-400 text-sm font-light leading-relaxed line-clamp-3">
                      {blog.content.substring(0, 150)}...
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <span className="text-xs font-bold text-gray-900 tracking-tight">{blog.author_name}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-200 group-hover:text-[#17847c] group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
