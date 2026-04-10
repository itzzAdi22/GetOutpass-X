import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, ShieldPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GlassCard, Button } from '../components/ui';
import { Input } from '../components/ui/Input';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register(name, email, password, role);
      toast.success(`Account created! Welcome, ${user.name}`);
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
      
      <GlassCard className="w-full max-w-md backdrop-blur-2xl border-white/20 p-8 pt-6">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/30"
          >
            <ShieldPlus className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-gray-400 text-sm">Join the GatePassX network</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-0">
          <Input label="Full Name" icon={User} value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Email Address" type="email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" icon={Lock} value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          <div className="mb-8 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={cn(
                "py-3 rounded-xl border-2 transition-all duration-300 font-medium",
                role === 'student' ? "border-indigo-500 bg-indigo-500/10 text-white" : "border-white/10 text-gray-400"
              )}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={cn(
                "py-3 rounded-xl border-2 transition-all duration-300 font-medium",
                role === 'admin' ? "border-indigo-500 bg-indigo-500/10 text-white" : "border-white/10 text-gray-400"
              )}
            >
              Admin
            </button>
          </div>


          <Button 
            variant="secondary" 
            className="w-full h-12 text-lg shadow-teal-500/20" 
            loading={loading}
          >
            Register Now <UserPlus className="ml-2 w-5 h-5" />
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-8 text-sm">
          Already have an account? {' '}
          <Link to="/login" className="text-teal-400 hover:text-teal-300 font-medium">Log In</Link>
        </p>
      </GlassCard>
    </div>
  );
};

export default Register;

