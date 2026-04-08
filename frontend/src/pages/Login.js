import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Lock, Mail, User, ArrowRight, Sparkles } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        toast.success('Welcome back to Wigzo!');
      } else {
        await register(email, password, name);
        toast.success('Family member added successfully!');
      }
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center py-12 px-6 lg:px-8 relative overflow-hidden" data-testid="login-page">
      
      {/* Background Aesthetic Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#17847c]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-top-5 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#17847c]/10 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-[#17847c]" />
          </div>
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-none" data-testid="auth-title">
            {isLogin ? 'LOGIN' : 'JOIN US'}
          </h2>
          <p className="mt-4 text-gray-400 font-light text-lg">
            {isLogin ? 'Enter your elite credentials' : 'Start your journey to invisible hold'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border border-gray-100 animate-in zoom-in-95 duration-700">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label className="text-[10px] font-black tracking-widest uppercase text-gray-400 ml-1">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!isLogin}
                      className="border-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-[#17847c] transition-all pl-8 bg-transparent text-lg"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label className="text-[10px] font-black tracking-widest uppercase text-gray-400 ml-1">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-[#17847c] transition-all pl-8 bg-transparent text-lg"
                    placeholder="name@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black tracking-widest uppercase text-gray-400 ml-1">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-[#17847c] transition-all pl-8 bg-transparent text-lg"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-16 bg-[#17847c] hover:bg-black text-white rounded-2xl font-black tracking-[0.2em] text-xs transition-all duration-500 shadow-xl shadow-[#17847c]/20 hover:shadow-black/20 flex items-center justify-center gap-3"
              disabled={loading}
            >
              {loading ? 'PROCESSING...' : isLogin ? 'LOGIN NOW' : 'CREATE ACCOUNT'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs font-bold text-gray-400 hover:text-[#17847c] transition-colors tracking-widest uppercase underline underline-offset-8"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Accent */}
        <p className="mt-8 text-center text-[10px] text-gray-300 font-black tracking-[0.3em] uppercase">
          Wigzo Tape Elite Access • 2026
        </p>
      </div>
    </div>
  );
}
