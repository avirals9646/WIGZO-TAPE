import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import api from '../api';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: 'wig-tape',
    stock: '100',
    features: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const response = await api.post('/products/upload-image', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setFormData({ ...formData, image_url: response.data.image_url });
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Failed to upload image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image_url: formData.image_url,
        category: formData.category,
        stock: parseInt(formData.stock),
        features: formData.features.split('\n').filter(f => f.trim())
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, productData);
        toast.success('Product updated successfully!');
      } else {
        await api.post('/products', productData);
        toast.success('Product created successfully!');
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Failed to save product:', error);
      toast.error('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
      category: product.category,
      stock: product.stock.toString(),
      features: product.features.join('\n')
    });
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await api.delete(`/products/${productId}`);
      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image_url: '',
      category: 'wig-tape',
      stock: '100',
      features: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17847c] mx-auto mb-4"></div>
          <p>Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16" data-testid="admin-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold" data-testid="admin-title">ADMIN PANEL</h1>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
            data-testid="add-product-button"
          >
            <Plus className="w-5 h-5 mr-2" />
            {showForm ? 'Cancel' : 'Add Product'}
          </Button>
        </div>

        {showForm && (
          <div className="mb-12 border border-gray-200 p-6 rounded-none" data-testid="product-form">
            <h2 className="text-2xl font-bold mb-6">
              {editingProduct ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 rounded-none"
                    data-testid="product-name-input"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="mt-1 rounded-none"
                    data-testid="product-price-input"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="mt-1 rounded-none"
                    data-testid="product-category-input"
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock *</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    className="mt-1 rounded-none"
                    data-testid="product-stock-input"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="mt-1 rounded-none"
                  data-testid="product-description-input"
                />
              </div>

              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Medical-grade adhesive&#10;Long-lasting hold&#10;Hypoallergenic"
                  className="mt-1 rounded-none"
                  data-testid="product-features-input"
                />
              </div>

              <div>
                <Label htmlFor="image">Product Image</Label>
                <div className="mt-1 flex items-center gap-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="rounded-none"
                    data-testid="product-image-upload"
                  />
                  <Button type="button" disabled={uploading} className="btn-secondary">
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Upload'}
                  </Button>
                </div>
                {formData.image_url && (
                  <div className="mt-4">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-none border"
                    />
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Or enter image URL:
                </p>
                <Input
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1 rounded-none"
                  data-testid="product-image-url-input"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="btn-primary" data-testid="save-product-button">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </Button>
                {editingProduct && (
                  <Button type="button" onClick={resetForm} className="btn-secondary">
                    Cancel Edit
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-6">ALL PRODUCTS ({products.length})</h2>
          {products.length === 0 ? (
            <div className="text-center py-12 border border-gray-200 rounded-none">
              <p className="text-lg text-gray-500">No products yet. Add your first product!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6" data-testid="products-list">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 p-6 rounded-none flex gap-6"
                  data-testid={`admin-product-${product.id}`}
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-none"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    <p className="text-[#17847c] font-bold mb-2">₹{product.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Stock: {product.stock} units</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleEdit(product)}
                      className="btn-secondary"
                      data-testid={`edit-product-${product.id}`}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 text-white hover:bg-red-700 rounded-none uppercase tracking-wider font-bold px-6 py-2"
                      data-testid={`delete-product-${product.id}`}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}