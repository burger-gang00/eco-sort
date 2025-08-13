import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  Edit3,
  Save,
  X,
  Camera,
  Trophy,
  Star,
  TrendingUp,
  MapPin,
  Settings,
  Shield,
  Bell,
  Eye,
  Lock,
  Globe,
  UserCheck,
  Crown,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CardSkeleton, StatsSkeleton, AvatarSkeleton, TextSkeleton, GridSkeleton } from './SkeletonLoader';
import api from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userStats, setUserStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  // Animation refs
  const [profileRef, profileInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [achievementsRef, achievementsInView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/users/me/stats');
        if (response.data.success) {
          setUserStats(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    });
  };

  const handleSave = async () => {
    try {
      const response = await api.put('/users/me', formData);
      if (response.data.success) {
        updateUser(response.data.data);
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    });
  };

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: 'Eco Beginner',
      description: 'Complete your first waste disposal',
      icon: Trophy,
      color: 'from-green-400 to-green-600',
      earned: true,
      progress: 100,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Recycling Champion',
      description: 'Dispose 50 recyclable items',
      icon: Star,
      color: 'from-blue-400 to-blue-600',
      earned: true,
      progress: 100,
      date: '2024-02-20'
    },
    {
      id: 3,
      title: 'Waste Warrior',
      description: 'Log 100 waste disposals',
      icon: Shield,
      color: 'from-purple-400 to-purple-600',
      earned: false,
      progress: 73,
      date: null
    },
    {
      id: 4,
      title: 'Green Guardian',
      description: 'Earn 1000 eco points',
      icon: Crown,
      color: 'from-yellow-400 to-yellow-600',
      earned: false,
      progress: 42,
      date: null
    },
    {
      id: 5,
      title: 'Sustainability Expert',
      description: 'Complete all waste categories',
      icon: Award,
      color: 'from-red-400 to-red-600',
      earned: false,
      progress: 20,
      date: null
    },
    {
      id: 6,
      title: 'Community Leader',
      description: 'Help 10 other users',
      icon: Zap,
      color: 'from-indigo-400 to-indigo-600',
      earned: false,
      progress: 0,
      date: null
    }
  ];

  // Mock user stats for now
  const mockStats = userStats || {
    totalDisposals: 127,
    points: 1540,
    rank: 15,
    weeklyDisposals: 12
  };

  const stats = [
    {
      icon: Zap,
      label: 'Eco Points',
      value: mockStats.points,
      color: 'from-eco-primary to-eco-secondary',
      prefix: ''
    },
    {
      icon: Trophy,
      label: 'Current Rank',
      value: `#${mockStats.rank}`,
      color: 'from-eco-accent to-eco-primary',
      prefix: '#'
    },
    {
      icon: TrendingUp,
      label: 'Total Disposals',
      value: mockStats.totalDisposals,
      color: 'from-eco-secondary to-eco-accent',
      prefix: ''
    },
    {
      icon: MapPin,
      label: 'This Week',
      value: mockStats.weeklyDisposals,
      color: 'from-eco-success to-eco-info',
      prefix: ''
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-bg-50 via-white to-eco-bg-100">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 hero-gradient opacity-5" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            ref={profileRef}
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={profileInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Profile Picture */}
            <motion.div
              className="relative inline-block mb-6"
              initial={{ scale: 0 }}
              animate={profileInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            >
              <div className="w-32 h-32 bg-gradient-eco rounded-full flex items-center justify-center shadow-eco-glow relative overflow-hidden">
                <User className="w-16 h-16 text-white" />
                
                {/* Upload button */}
                <button className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full">
                  <Camera className="w-6 h-6 text-white" />
                </button>
              </div>
              
              {/* Status indicator */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-eco-success rounded-full border-4 border-white flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-white" />
              </div>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl font-display font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={profileInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <span className="text-gradient">{user?.name || 'Eco Warrior'}</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-eco-text-secondary mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={profileInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              Making a difference, one disposal at a time 🌱
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="card-glass p-8 mb-8">
          <motion.div 
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {isLoading ? (
              <StatsSkeleton count={4} variant="card" showIcon={true} animate="shimmer" />
            ) : (
              stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-card group text-center relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-eco-md flex items-center justify-center shadow-eco-glow`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-eco-text-primary mb-2">
                    {stat.prefix === '#' ? (
                      <span>#{stat.value}</span>
                    ) : (
                      <CountUp
                        start={0}
                        end={typeof stat.value === 'number' ? stat.value : 0}
                        duration={2}
                        delay={0.6 + index * 0.2}
                      />
                    )}
                  </div>
                  
                  <p className="text-eco-text-tertiary text-sm">{stat.label}</p>
                  
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-eco-lg transition-opacity duration-300`} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Profile Information & Achievements */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <motion.div 
            className="card p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <Settings className="w-5 h-5 text-eco-primary" />
              <h3 className="text-xl font-semibold text-eco-text-primary">Profile Information</h3>
            </div>

            {isLoading ? (
              // Profile Info Skeleton
              <div className="space-y-6">
                <div>
                  <TextSkeleton width="120px" height="16px" className="mb-2" />
                  <CardSkeleton height="48px" variant="glass" />
                </div>
                <div>
                  <TextSkeleton width="140px" height="16px" className="mb-2" />
                  <CardSkeleton height="48px" variant="glass" />
                </div>
                <div>
                  <TextSkeleton width="100px" height="16px" className="mb-2" />
                  <CardSkeleton height="48px" variant="glass" />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="flex items-center space-x-2 text-eco-text-secondary text-sm font-medium mb-2">
                    <User className="w-4 h-4" />
                    <span>Full Name</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-eco-border rounded-eco-lg focus:ring-2 focus:ring-eco-primary/20 focus:border-eco-primary transition-colors"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-eco-bg-50 rounded-eco-lg border border-eco-border">
                      <span className="text-eco-text-primary font-medium">{user?.name || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="flex items-center space-x-2 text-eco-text-secondary text-sm font-medium mb-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Address</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-eco-border rounded-eco-lg focus:ring-2 focus:ring-eco-primary/20 focus:border-eco-primary transition-colors"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-eco-bg-50 rounded-eco-lg border border-eco-border">
                      <span className="text-eco-text-primary font-medium">{user?.email || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                {/* Member Since */}
                <div>
                  <label className="flex items-center space-x-2 text-eco-text-secondary text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Member Since</span>
                  </label>
                  <div className="px-4 py-3 bg-eco-bg-50 rounded-eco-lg border border-eco-border">
                    <span className="text-eco-text-primary font-medium">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Not available'}
                    </span>
                  </div>
                </div>

                {/* Edit/Save Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-eco-border">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn-ghost flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="btn-outline flex items-center space-x-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>

                {/* Quick Settings */}
                <div className="pt-4 border-t border-eco-border">
                  <h4 className="font-medium text-eco-text-primary mb-4">Quick Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-eco-text-secondary" />
                        <span className="text-eco-text-secondary">Notifications</span>
                      </div>
                      <button className="w-11 h-6 bg-eco-success rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-eco-text-secondary" />
                        <span className="text-eco-text-secondary">Profile Visibility</span>
                      </div>
                      <button className="w-11 h-6 bg-eco-success rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Achievements */}
          <motion.div 
            ref={achievementsRef}
            className="card p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <Trophy className="w-5 h-5 text-eco-accent" />
              <h3 className="text-xl font-semibold text-eco-text-primary">Achievements</h3>
            </div>

            {isLoading ? (
              // Achievements Skeleton
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-4 rounded-eco-lg border border-eco-bg-200">
                    <AvatarSkeleton size="sm" variant="neon" />
                    <div className="flex-1 space-y-2">
                      <TextSkeleton width="160px" height="16px" />
                      <TextSkeleton width="120px" height="12px" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    className={`p-4 rounded-eco-lg border-2 transition-all duration-300 ${
                      achievement.earned 
                        ? 'border-eco-success bg-eco-success/5 shadow-eco-sm' 
                        : 'border-eco-border bg-eco-bg-50'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={achievementsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-eco-md flex items-center justify-center ${
                        achievement.earned 
                          ? `bg-gradient-to-r ${achievement.color} shadow-eco-glow` 
                          : 'bg-eco-text-tertiary/20'
                      }`}>
                        <achievement.icon className={`w-6 h-6 ${
                          achievement.earned ? 'text-white' : 'text-eco-text-tertiary'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-eco-text-primary">
                            {achievement.title}
                          </h4>
                          {achievement.earned && (
                            <span className="text-xs font-medium text-eco-success bg-eco-success/10 px-2 py-1 rounded-full">
                              Earned
                            </span>
                          )}
                        </div>
                        
                        <p className="text-eco-text-tertiary text-sm mb-2">
                          {achievement.description}
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between text-xs mt-1">
                          <span className="text-eco-text-tertiary">
                            {achievement.progress}% Complete
                          </span>
                          {achievement.earned && achievement.date && (
                            <span className="text-eco-text-tertiary">
                              Earned {new Date(achievement.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
