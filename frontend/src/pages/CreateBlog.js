import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useAuth } from '../AuthContext';
import api from '../api';
import { toast } from 'sonner';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to create a blog');
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      await api.post('/blogs/create', { title, content });
      toast.success('Blog published successfully!');
      navigate('/blogs');
    } catch (error) {
      console.error('Failed to create blog:', error);
      toast.error('Failed to publish blog');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to write articles</h2>
          <Button onClick={() => navigate('/login')} className="btn-primary">
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16" data-testid="create-blog-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">WRITE ARTICLE</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-gray-200 p-8 rounded-none">
          <div>
            <Label htmlFor="title">Article Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 rounded-none"
              placeholder="Enter your article title"
              data-testid="blog-title-input"
            />
          </div>

          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={15}
              className="mt-1 rounded-none"
              placeholder="Write your article here..."
              data-testid="blog-content-input"
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="btn-primary"
              data-testid="publish-blog-button"
            >
              {loading ? 'Publishing...' : 'Publish Article'}
            </Button>
            <Button
              type="button"
              onClick={() => navigate('/blogs')}
              className="btn-secondary"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}