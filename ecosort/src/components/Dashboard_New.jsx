import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts';
import { 
  Trophy, 
  Trash2, 
  MapPin, 
  Users, 
  TrendingUp, 
  Clock,
  Zap,
  Target,
  Award,
  Leaf,
  Calendar,
  Activity,
  BarChart3,
  PieChart as PieIcon,
  TrendingDown,
  CheckCircle,
  RefreshCw,
  Globe,
  Sparkles
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [binStatus, setBinStatus] = useState([]);
  const [wasteFeed, setWasteFeed] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Animation refs
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [chartsRef, chartsInView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch user stats
        const userStatsResponse = await api.get('/users/me/stats');
        if (userStatsResponse.data.success) {
          setUserStats(userStatsResponse.data.data);
        }

        // Fetch admin data
        if (user) {
          const [metricsResponse, binStatusResponse, wasteFeedResponse] = await Promise.all([
            api.get('/dashboard/metrics'),
            api.get('/dashboard/bin-status'),
            api.get('/dashboard/waste-feed?limit=20')
          ]);

          if (metricsResponse.data.success) {
            setMetrics(metricsResponse.data.data);
          }

          if (binStatusResponse.data.success) {
            setBinStatus(binStatusResponse.data.data);
          }

          if (wasteFeedResponse.data.success) {
            setWasteFeed(wasteFeedResponse.data.data);
          }
        }
      } catch (error) {
        console.error('Dashboard fetch error:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  // Chart colors
  const chartColors = {
    primary: '#059669',
    secondary: '#0ea5e9',
    accent: '#f59e0b',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4'
  };

  // Mock data for better visualization
  const weeklyData = [
    { day: 'Mon', items: 12, points: 24 },
    { day: 'Tue', items: 8, points: 16 },
    { day: 'Wed', items: 15, points: 35 },
    { day: 'Thu', items: 10, points: 22 },
    { day: 'Fri', items: 18, points: 42 },
    { day: 'Sat', items: 25, points: 65 },
    { day: 'Sun', items: 20, points: 48 }
  ];

  const categoryData = [
    { name: 'Recyclable', value: 35, color: chartColors.success },
    { name: 'Wet Waste', value: 25, color: chartColors.primary },
    { name: 'Dry Waste', value: 20, color: chartColors.secondary },
    { name: 'E-Waste', value: 15, color: chartColors.warning },
    { name: 'Hazardous', value: 5, color: chartColors.error }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-eco-bg-50 via-white to-eco-bg-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-bg-50 via-white to-eco-bg-100">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 hero-gradient opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-eco rounded-eco-xl shadow-eco-glow mb-6"
            >
              <BarChart3 className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="text-gradient">Welcome back,</span><br />
              <span className="text-eco-text-primary">{user?.name || 'Eco Warrior'}!</span>
            </h1>
            
            <p className="text-xl text-eco-text-secondary mb-8 max-w-2xl mx-auto">
              Track your environmental impact and celebrate your contribution to a sustainable future.
            </p>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div 
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            {[
              {
                icon: Award,
                label: 'Total Points',
                value: userStats?.totalPoints || 0,
                color: 'from-yellow-400 to-yellow-600',
                bgColor: 'bg-yellow-50',
                textColor: 'text-yellow-600',
                trend: '+12%'
              },
              {
                icon: Trash2,
                label: 'Items Sorted',
                value: userStats?.totalItems || 0,
                color: 'from-green-400 to-green-600',
                bgColor: 'bg-green-50',
                textColor: 'text-green-600',
                trend: '+8%'
              },
              {
                icon: TrendingUp,
                label: 'This Week',
                value: userStats?.weeklyItems || 0,
                color: 'from-blue-400 to-blue-600',
                bgColor: 'bg-blue-50',
                textColor: 'text-blue-600',
                trend: '+25%'
              },
              {
                icon: Globe,
                label: 'Impact Score',
                value: Math.floor((userStats?.totalPoints || 0) / 10),
                color: 'from-purple-400 to-purple-600',
                bgColor: 'bg-purple-50',
                textColor: 'text-purple-600',
                trend: '+5%'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card group hover:shadow-eco-lg transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-eco-md ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                    <div className="flex items-center space-x-1 text-eco-success text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      <span>{stat.trend}</span>
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-eco-text-primary mb-1">
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2}
                      delay={0.8 + index * 0.2}
                    />
                  </div>
                  
                  <p className="text-eco-text-tertiary text-sm">{stat.label}</p>
                </div>
                
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-eco-lg transition-opacity duration-300`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div 
          ref={chartsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={chartsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {/* Weekly Activity Chart */}
          <motion.div 
            className="card p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={chartsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-eco-text-primary flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-eco-primary" />
                  <span>Weekly Activity</span>
                </h3>
                <p className="text-eco-text-tertiary text-sm mt-1">Your waste sorting activity over the past week</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-eco-primary">
                  <CountUp start={0} end={108} duration={2} />
                </div>
                <div className="text-sm text-eco-text-tertiary">Total Items</div>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="itemsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="items" 
                    stroke={chartColors.primary} 
                    fillOpacity={1} 
                    fill="url(#itemsGradient)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Distribution */}
          <motion.div 
            className="card p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={chartsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-eco-text-primary flex items-center space-x-2">
                  <PieIcon className="w-5 h-5 text-eco-secondary" />
                  <span>Category Distribution</span>
                </h3>
                <p className="text-eco-text-tertiary text-sm mt-1">Breakdown of waste types you've sorted</p>
              </div>
            </div>
            
            <div className="h-64 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-eco-text-secondary">{entry.name}</span>
                  <span className="text-sm font-medium text-eco-text-primary ml-auto">
                    {entry.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-eco-text-primary mb-2">
              Your Achievements
            </h2>
            <p className="text-eco-text-secondary">Celebrate your environmental milestones</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'Eco Beginner',
                description: 'Sorted your first 10 items',
                progress: 100,
                earned: true,
                color: 'from-green-400 to-green-600'
              },
              {
                icon: Target,
                title: 'Recycling Hero',
                description: 'Recycled 50+ items',
                progress: 75,
                earned: false,
                color: 'from-blue-400 to-blue-600'
              },
              {
                icon: Trophy,
                title: 'Waste Warrior',
                description: 'Earn 500 eco points',
                progress: 30,
                earned: false,
                color: 'from-purple-400 to-purple-600'
              }
            ].map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className={`card p-6 relative overflow-hidden ${achievement.earned ? 'ring-2 ring-eco-success/50' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative z-10">
                  <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-eco-md flex items-center justify-center mb-4 ${achievement.earned ? 'shadow-eco-glow' : ''}`}>
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-eco-text-primary mb-2">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-eco-text-tertiary text-sm mb-4">
                    {achievement.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="progress-bar mb-2">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-eco-text-tertiary">
                      {achievement.progress}% Complete
                    </span>
                    {achievement.earned && (
                      <div className="flex items-center space-x-1 text-eco-success">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-medium">Earned!</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Background Glow */}
                {achievement.earned && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${achievement.color} opacity-5 rounded-eco-lg`} />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Dashboard;
