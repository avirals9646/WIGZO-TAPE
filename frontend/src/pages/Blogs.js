import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAuth } from '../AuthContext';
import api from '../api';
import { Calendar, User, Plus } from 'lucide-react';

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
      setBlogs(response.data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17847c] mx-auto mb-4"></div>
          <p>Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16" data-testid="blogs-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">BLOG & ARTICLES</h1>
            <p className="text-lg text-gray-600">
              Read stories, tips, and insights from our community
            </p>
          </div>
          {user && (
            <Link to="/blogs/create">
              <Button className="btn-primary" data-testid="create-blog-button">
                <Plus className="w-5 h-5 mr-2" />
                Write Article
              </Button>
            </Link>
          )}
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20" data-testid="no-blogs">
            <p className="text-xl text-gray-500 mb-6">No articles yet. Be the first to write!</p>
            {user && (
              <Link to="/blogs/create">
                <Button className="btn-primary">Write First Article</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blogs/${blog.id}`}
                className="border border-gray-200 hover:shadow-xl transition-shadow duration-300 rounded-none bg-white overflow-hidden group"
                data-testid={`blog-card-${blog.id}`}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-[#17847c] transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.content.substring(0, 150)}...
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{blog.author_name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>
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