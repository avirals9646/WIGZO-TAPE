import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAuth } from '../AuthContext';
import api from '../api';
import { Calendar, User, ArrowLeft, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17847c] mx-auto mb-4"></div>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="min-h-screen py-16" data-testid="blog-detail-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          onClick={() => navigate('/blogs')}
          className="btn-secondary mb-8"
          data-testid="back-to-blogs"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Button>

        <article className="bg-white border border-gray-200 p-8 rounded-none">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="blog-title">
              {blog.title}
            </h1>
            {user?.is_admin && (
              <Button
                onClick={handleDelete}
                className="bg-red-600 text-white hover:bg-red-700 rounded-none px-4 py-2"
                data-testid="delete-blog-button"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            )}
          </div>

          <div className="flex items-center gap-6 text-gray-600 mb-8 pb-6 border-b">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{blog.author_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(blog.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </div>

          <div 
            className="prose prose-lg max-w-none"
            style={{ whiteSpace: 'pre-wrap' }}
            data-testid="blog-content"
          >
            {blog.content}
          </div>
        </article>
      </div>
    </div>
  );
}