import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, Loader, Eye, EyeOff, Sparkles, Shield, Heart, Star, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [particles, setParticles] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 3,
        duration: Math.random() * 4 + 3,
      }));
      setParticles(newParticles);
    };
    
    generateParticles();
  }, []);

  // Calculate password strength
  useEffect(() => {
    const calculateStrength = (password) => {
      let strength = 0;
      if (password.length >= 6) strength += 25;
      if (password.length >= 8) strength += 25;
      if (/[A-Z]/.test(password)) strength += 25;
      if (/[0-9]/.test(password)) strength += 25;
      return strength;
    };
    
    setPasswordStrength(calculateStrength(formData.password));
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      const result = await register(registrationData);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error('Registration failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-400';
    if (passwordStrength <= 50) return 'bg-yellow-400';
    if (passwordStrength <= 75) return 'bg-blue-400';
    return 'bg-green-400';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-emerald-50">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `linear-gradient(45deg, #10b981, #06b6d4, #8b5cf6)`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, 30, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-72 h-72 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full"
        >
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              className="text-6xl mb-4 inline-block"
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              🌱
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
              Join EcoSort
            </h1>
            <p className="text-slate-600 font-medium mb-4">Start your sustainable waste management journey</p>
            
            {/* Enhanced Feature Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              <motion.div 
                className="flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="w-3 h-3" />
                Join 10K+ Users
              </motion.div>
              <motion.div 
                className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200"
                whileHover={{ scale: 1.05 }}
              >
                <Shield className="w-3 h-3" />
                100% Secure
              </motion.div>
              <motion.div 
                className="flex items-center gap-1 text-xs text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="w-3 h-3" />
                Free Forever
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Glassmorphism Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="backdrop-blur-2xl bg-white/80 border border-white/30 rounded-3xl shadow-2xl p-8 relative overflow-hidden"
          >
            {/* Enhanced glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-3xl"></div>
            
            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Enhanced Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-3">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors duration-300" size={20} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`w-full pl-12 pr-4 py-4 bg-white/60 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:bg-white/90 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-slate-700 placeholder-slate-400 ${
                        errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-600 font-medium"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Enhanced Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-3">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors duration-300" size={20} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`w-full pl-12 pr-4 py-4 bg-white/60 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:bg-white/90 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-slate-700 placeholder-slate-400 ${
                        errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-600 font-medium"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Enhanced Password Field with Strength Indicator */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-3">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors duration-300" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      className={`w-full pl-12 pr-12 py-4 bg-white/60 border-2 border-slate-200 rounded-xl focus:border-teal-400 focus:bg-white/90 focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all duration-300 text-slate-700 placeholder-slate-400 ${
                        errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-600">Password Strength</span>
                        <span className={`text-xs font-semibold ${
                          passwordStrength <= 25 ? 'text-red-500' :
                          passwordStrength <= 50 ? 'text-yellow-500' :
                          passwordStrength <= 75 ? 'text-blue-500' : 'text-green-500'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${getPasswordStrengthColor()}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${passwordStrength}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  )}
                  
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-600 font-medium"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Enhanced Confirm Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-3">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300" size={20} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={`w-full pl-12 pr-12 py-4 bg-white/60 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:bg-white/90 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-slate-700 placeholder-slate-400 ${
                        errors.confirmPassword ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-300"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    
                    {/* Password Match Indicator */}
                    {formData.confirmPassword && formData.password && (
                      <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                        {formData.password === formData.confirmPassword ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-600 font-medium"
                      >
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Stunning Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-emerald-500 to-teal-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-gradient-to-r from-purple-500 via-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg">
                    {isLoading ? (
                      <>
                        <Loader className="animate-spin" size={24} />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus size={24} />
                        <span>Create Account</span>
                        <Sparkles className="ml-2" size={20} />
                      </>
                    )}
                  </div>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Enhanced Terms */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center mt-6"
          >
            <p className="text-xs text-slate-500 leading-relaxed">
              By creating an account, you agree to our{' '}
              <span className="text-purple-600 hover:text-purple-700 font-medium cursor-pointer hover:underline transition-all duration-300">
                Terms of Service
              </span>{' '}
              and{' '}
              <span className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer hover:underline transition-all duration-300">
                Privacy Policy
              </span>
            </p>
          </motion.div>

          {/* Enhanced Navigation Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center mt-8 space-y-4"
          >
            <p className="text-slate-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-bold text-transparent bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text hover:from-purple-700 hover:to-emerald-700 transition-all duration-300 hover:underline"
              >
                Sign In
              </Link>
            </p>
            
            <Link 
              to="/waste-guide" 
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-purple-600 transition-colors duration-300 hover:underline"
            >
              ← Back to Waste Guide
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
