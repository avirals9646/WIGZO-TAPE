import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import api from '../api';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Upload, Package, Users as UsersIcon, ShoppingBag } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('products');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  return (
    <div className="min-h-screen py-16" data-testid="admin-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8" data-testid="admin-title">ADMIN PANEL</h1>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="border border-gray-200 p-6 rounded-none bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-600">Total Users</h3>
                <UsersIcon className="w-5 h-5 text-[#17847c]" />
              </div>
              <p className="text-3xl font-bold">{stats.total_users}</p>
            </div>
            <div className="border border-gray-200 p-6 rounded-none bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-600">Total Orders</h3>
                <ShoppingBag className="w-5 h-5 text-[#17847c]" />
              </div>
              <p className="text-3xl font-bold">{stats.total_orders}</p>
            </div>
            <div className="border border-gray-200 p-6 rounded-none bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-600">Total Products</h3>
                <Package className="w-5 h-5 text-[#17847c]" />
              </div>
              <p className="text-3xl font-bold">{stats.total_products}</p>
            </div>
            <div className="border border-gray-200 p-6 rounded-none bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-600">Total Revenue</h3>
                <span className="text-[#17847c]">₹</span>
              </div>
              <p className="text-3xl font-bold">₹{stats.total_revenue.toFixed(2)}</p>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="coupons">Coupons</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductsTab />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab />
          </TabsContent>

          <TabsContent value="coupons">
            <CouponsTab />
          </TabsContent>

          <TabsContent value="blogs">
            <BlogsTab />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Products Tab Component
function ProductsTab() {
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
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products Management</h2>
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
        <div className="mb-8 border border-gray-200 p-6 rounded-none bg-white">
          <h3 className="text-xl font-bold mb-4">
            {editingProduct ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 rounded-none"
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
                rows={3}
                className="mt-1 rounded-none"
              />
            </div>

            <div>
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea
                id="features"
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 rounded-none"
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
                />
                <Button type="button" disabled={uploading} className="btn-secondary">
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-none border"
                />
              )}
              <p className="text-sm text-gray-500 mt-2">Or enter image URL:</p>
              <Input
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="mt-1 rounded-none"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="btn-primary">
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

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 p-4 rounded-none bg-white flex gap-4"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-none"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-1">{product.description}</p>
              <p className="text-[#17847c] font-bold mt-1">₹{product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Stock: {product.stock} units</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button onClick={() => handleEdit(product)} className="btn-secondary">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(product.id)}
                className="bg-red-600 text-white hover:bg-red-700 rounded-none uppercase tracking-wider font-bold px-4 py-2"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Orders Tab Component
function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      toast.success('Order status updated!');
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast.error('Failed to update order status');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders Management ({orders.length})</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 border border-gray-200 rounded-none">
          <p className="text-lg text-gray-500">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 p-6 rounded-none bg-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">User ID: {order.user_id}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#17847c]">
                    ₹{order.total_amount.toFixed(2)}
                  </p>
                  <div className="mt-2">
                    <Label className="text-sm">Status:</Label>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value)}
                    >
                      <SelectTrigger className="w-40 mt-1 rounded-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <h4 className="font-bold mb-2">Items:</h4>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 mb-2">
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-none"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-bold mb-2">Shipping Address:</h4>
                <p className="text-sm text-gray-600">
                  {order.shipping_address.fullName}<br />
                  {order.shipping_address.address}<br />
                  {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}<br />
                  Phone: {order.shipping_address.phone}<br />
                  Email: {order.shipping_address.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Users Tab Component
function UsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userEmail) => {
    if (!window.confirm(`Are you sure you want to delete user ${userEmail}? This will also delete their orders and cart.`)) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      toast.success('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error(error.response?.data?.detail || 'Failed to delete user');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Users Database ({users.length})</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 p-3 text-left font-bold">Name</th>
              <th className="border border-gray-200 p-3 text-left font-bold">Email</th>
              <th className="border border-gray-200 p-3 text-left font-bold">Role</th>
              <th className="border border-gray-200 p-3 text-left font-bold">Password (Encrypted)</th>
              <th className="border border-gray-200 p-3 text-left font-bold">Created At</th>
              <th className="border border-gray-200 p-3 text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 p-3">{user.name}</td>
                <td className="border border-gray-200 p-3">{user.email}</td>
                <td className="border border-gray-200 p-3">
                  <span className={`px-2 py-1 rounded-none text-xs font-bold ${user.is_admin ? 'bg-[#17847c] text-white' : 'bg-gray-200'}`}>
                    {user.is_admin ? 'ADMIN' : 'USER'}
                  </span>
                </td>
                <td className="border border-gray-200 p-3">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">{user.password}</code>
                </td>
                <td className="border border-gray-200 p-3 text-sm">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="border border-gray-200 p-3">
                  {!user.is_admin && (
                    <Button
                      onClick={() => handleDeleteUser(user.id, user.email)}
                      className="bg-red-600 text-white hover:bg-red-700 rounded-none text-xs px-3 py-1"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// Coupons Tab Component
function CouponsTab() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discount_type: 'percentage',
    discount_value: '',
    min_purchase: '0',
    max_discount: '',
    usage_limit: '',
    valid_from: new Date().toISOString().split('T')[0],
    valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    is_active: true
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/coupons');
      setCoupons(response.data);
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCode = async () => {
    try {
      const response = await api.post('/admin/coupons/generate');
      setFormData({ ...formData, code: response.data.code });
      toast.success('Coupon code generated!');
    } catch (error) {
      toast.error('Failed to generate code');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/coupons', formData);
      toast.success('Coupon created successfully!');
      setShowForm(false);
      resetForm();
      fetchCoupons();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to create coupon');
    }
  };

  const handleDelete = async (couponId) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;

    try {
      await api.delete(`/admin/coupons/${couponId}`);
      toast.success('Coupon deleted successfully!');
      fetchCoupons();
    } catch (error) {
      toast.error('Failed to delete coupon');
    }
  };

  const handleToggleActive = async (couponId, currentStatus) => {
    try {
      await api.put(`/admin/coupons/${couponId}`, { is_active: !currentStatus });
      toast.success('Coupon status updated!');
      fetchCoupons();
    } catch (error) {
      toast.error('Failed to update coupon');
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      discount_type: 'percentage',
      discount_value: '',
      min_purchase: '0',
      max_discount: '',
      usage_limit: '',
      valid_from: new Date().toISOString().split('T')[0],
      valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      is_active: true
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading coupons...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Coupon Management ({coupons.length})</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          {showForm ? 'Cancel' : 'Create Coupon'}
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 border border-gray-200 p-6 rounded-none bg-white">
          <h3 className="text-xl font-bold mb-4">CREATE NEW COUPON</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="code">Coupon Code *</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    required
                    className="rounded-none"
                    placeholder="SUMMER2024"
                  />
                  <Button type="button" onClick={handleGenerateCode} className="btn-secondary">
                    Generate
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="discount_type">Discount Type *</Label>
                <Select
                  value={formData.discount_type}
                  onValueChange={(value) => setFormData({ ...formData, discount_type: value })}
                >
                  <SelectTrigger className="mt-1 rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount (\u20b9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="discount_value">Discount Value *</Label>
                <Input
                  id="discount_value"
                  type="number"
                  step="0.01"
                  value={formData.discount_value}
                  onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                  required
                  className="mt-1 rounded-none"
                  placeholder={formData.discount_type === 'percentage' ? '10' : '100'}
                />
              </div>
              <div>
                <Label htmlFor="min_purchase">Minimum Purchase (\u20b9)</Label>
                <Input
                  id="min_purchase"
                  type="number"
                  step="0.01"
                  value={formData.min_purchase}
                  onChange={(e) => setFormData({ ...formData, min_purchase: e.target.value })}
                  className="mt-1 rounded-none"
                />
              </div>
              {formData.discount_type === 'percentage' && (
                <div>
                  <Label htmlFor="max_discount">Max Discount (\u20b9)</Label>
                  <Input
                    id="max_discount"
                    type="number"
                    step="0.01"
                    value={formData.max_discount}
                    onChange={(e) => setFormData({ ...formData, max_discount: e.target.value })}
                    className="mt-1 rounded-none"
                    placeholder="Optional"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="usage_limit">Usage Limit</Label>
                <Input
                  id="usage_limit"
                  type="number"
                  value={formData.usage_limit}
                  onChange={(e) => setFormData({ ...formData, usage_limit: e.target.value })}
                  className="mt-1 rounded-none"
                  placeholder="Leave empty for unlimited"
                />
              </div>
              <div>
                <Label htmlFor="valid_from">Valid From *</Label>
                <Input
                  id="valid_from"
                  type="date"
                  value={formData.valid_from}
                  onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
                  required
                  className="mt-1 rounded-none"
                />
              </div>
              <div>
                <Label htmlFor="valid_until">Valid Until *</Label>
                <Input
                  id="valid_until"
                  type="date"
                  value={formData.valid_until}
                  onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                  required
                  className="mt-1 rounded-none"
                />
              </div>
            </div>

            <Button type="submit" className="btn-primary">
              Create Coupon
            </Button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {coupons.length === 0 ? (
          <div className="text-center py-12 border border-gray-200 rounded-none">
            <p className="text-lg text-gray-500">No coupons yet. Create your first coupon!</p>
          </div>
        ) : (
          coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="border border-gray-200 p-6 rounded-none bg-white"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-[#17847c]">{coupon.code}</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${coupon.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {coupon.is_active ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <strong>Discount:</strong>{' '}
                      {coupon.discount_type === 'percentage'
                        ? `${coupon.discount_value}%`
                        : `\u20b9${coupon.discount_value}`}
                      {coupon.max_discount && ` (Max: \u20b9${coupon.max_discount})`}
                    </p>
                    {coupon.min_purchase > 0 && (
                      <p><strong>Min Purchase:</strong> \u20b9{coupon.min_purchase}</p>
                    )}
                    <p>
                      <strong>Valid:</strong>{' '}
                      {new Date(coupon.valid_from).toLocaleDateString()} -{' '}
                      {new Date(coupon.valid_until).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Usage:</strong> {coupon.used_count}{' '}
                      {coupon.usage_limit ? `/ ${coupon.usage_limit}` : '(Unlimited)'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleToggleActive(coupon.id, coupon.is_active)}
                    className={`${coupon.is_active ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-none text-xs px-4 py-2`}
                  >
                    {coupon.is_active ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    onClick={() => handleDelete(coupon.id)}
                    className="bg-red-600 text-white hover:bg-red-700 rounded-none text-xs px-4 py-2"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Blogs Tab Component (Admin)
function BlogsTab() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await api.delete(`/admin/blogs/${blogId}`);
      toast.success('Blog deleted successfully!');
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading blogs...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Blog Management ({blogs.length})</h2>

      {blogs.length === 0 ? (
        <div className="text-center py-12 border border-gray-200 rounded-none">
          <p className="text-lg text-gray-500">No blogs yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="border border-gray-200 p-6 rounded-none bg-white"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{blog.content}</p>
                  <div className="text-sm text-gray-500">
                    <p><strong>Author:</strong> {blog.author_name}</p>
                    <p><strong>Posted:</strong> {new Date(blog.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-600 text-white hover:bg-red-700 rounded-none text-xs px-4 py-2"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Contacts Tab Component (Admin)
function ContactsTab() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/contact-forms');
      setContacts(response.data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (contactId) => {
    if (!replyText.trim()) {
      toast.error('Please enter a reply');
      return;
    }

    try {
      await api.post(`/admin/contact-forms/${contactId}/reply`, { reply: replyText });
      toast.success('Reply sent successfully!');
      setReplyingTo(null);
      setReplyText('');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to send reply');
    }
  };

  const handleDelete = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact form?')) return;

    try {
      await api.delete(`/admin/contact-forms/${contactId}`);
      toast.success('Contact form deleted!');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to delete contact form');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading contact forms...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Forms ({contacts.length})</h2>

      {contacts.length === 0 ? (
        <div className="text-center py-12 border border-gray-200 rounded-none">
          <p className="text-lg text-gray-500">No contact forms yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="border border-gray-200 p-6 rounded-none bg-white"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{contact.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${contact.status === 'replied' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {contact.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Address:</strong> {contact.address}</p>
                    <p><strong>Submitted:</strong> {new Date(contact.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded mb-4">
                    <p className="text-sm font-bold mb-1">Message:</p>
                    <p className="text-gray-700">{contact.feedback}</p>
                  </div>

                  {contact.admin_reply && (
                    <div className="bg-[#F0FDFD] border border-[#17847c] p-4 rounded">
                      <p className="text-sm font-bold mb-1">Your Reply:</p>
                      <p className="text-gray-700">{contact.admin_reply}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Replied on: {new Date(contact.replied_at).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {replyingTo === contact.id ? (
                <div className="mt-4">
                  <Label htmlFor={`reply-${contact.id}`}>Your Reply</Label>
                  <Textarea
                    id={`reply-${contact.id}`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                    className="mt-1 rounded-none"
                    placeholder="Type your reply here..."
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      onClick={() => handleReply(contact.id)}
                      className="btn-primary"
                    >
                      Send Reply
                    </Button>
                    <Button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText('');
                      }}
                      className="btn-secondary"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 mt-4">
                  {contact.status === 'pending' && (
                    <Button
                      onClick={() => setReplyingTo(contact.id)}
                      className="bg-[#17847c] text-white hover:bg-black rounded-none text-xs px-4 py-2"
                    >
                      Reply
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDelete(contact.id)}
                    className="bg-red-600 text-white hover:bg-red-700 rounded-none text-xs px-4 py-2"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

