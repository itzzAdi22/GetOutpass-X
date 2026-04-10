import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, LogIn, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GlassCard, Button } from '../components/ui';
import { Input } from '../components/ui/Input';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      toast.success(`Welcome back, ${user.name}!`);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg animate-mesh flex items-center justify-center p-6 bg-blue-900/10">
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      
      <GlassCard className="w-full max-w-md backdrop-blur-2xl border-white/20 p-8">
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30"
          >
            <ShieldCheck className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">GatePassX</h1>
          <p className="text-gray-400">Hostel Outpass Management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-2">
          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <div className="flex items-center justify-between text-sm mb-6">
            <label className="flex items-center text-gray-400 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-white/10 bg-white/5" />
              Remember me
            </label>
            <a href="#" className="text-indigo-400 hover:text-indigo-300">Forgot?</a>
          </div>

          <Button 
            variant="primary" 
            className="w-full h-12 text-lg" 
            loading={loading}
          >
            Sign In <LogIn className="ml-2 w-5 h-5" />
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-8">
          Don't have an account? {' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">Create One</Link>
        </p>
      </GlassCard>
    </div>
  );
};

export default Login;
