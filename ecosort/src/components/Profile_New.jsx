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
import api from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userStats, setUserStats] = useState(null);
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
        const response = await api.get('/users/me/stats');
        if (response.data.success) {
          setUserStats(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
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
      description: 'Sorted your first 10 items',
      icon: Star,
      earned: true,
      progress: 100,
      color: 'from-green-400 to-green-600',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Recycling Hero',
      description: 'Recycled 50+ items',
      icon: Trophy,
      earned: true,
      progress: 100,
      color: 'from-blue-400 to-blue-600',
      date: '2024-02-20'
    },
    {
      id: 3,
      title: 'Waste Warrior',
      description: 'Earn 500 eco points',
      icon: Crown,
      earned: false,
      progress: 65,
      color: 'from-purple-400 to-purple-600',
      date: null
    },
    {
      id: 4,
      title: 'Sorting Master',
      description: 'Perfect sorting streak of 20',
      icon: Zap,
      earned: false,
      progress: 40,
      color: 'from-yellow-400 to-yellow-600',
      date: null
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
              Environmental champion making a difference, one sort at a time.
            </motion.p>

            {/* Action buttons */}
            <motion.div 
              className="flex items-center justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={profileInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              {!isEditing ? (
                <button 
                  onClick={handleEdit}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button 
                    onClick={handleSave}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {[
              {
                icon: Award,
                label: 'Total Points',
                value: userStats?.totalPoints || 0,
                color: 'from-yellow-400 to-yellow-600',
                bgColor: 'bg-yellow-50',
                textColor: 'text-yellow-600'
              },
              {
                icon: TrendingUp,
                label: 'Items Sorted',
                value: userStats?.totalItems || 0,
                color: 'from-green-400 to-green-600',
                bgColor: 'bg-green-50',
                textColor: 'text-green-600'
              },
              {
                icon: Trophy,
                label: 'Achievements',
                value: achievements.filter(a => a.earned).length,
                color: 'from-purple-400 to-purple-600',
                bgColor: 'bg-purple-50',
                textColor: 'text-purple-600'
              },
              {
                icon: Globe,
                label: 'Rank',
                value: userStats?.rank || 'N/A',
                color: 'from-blue-400 to-blue-600',
                bgColor: 'bg-blue-50',
                textColor: 'text-blue-600',
                isRank: true
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card group hover:shadow-eco-lg transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-eco-md ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-eco-text-primary mb-1">
                    {stat.isRank ? (
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
                </div>
                
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-eco-lg transition-opacity duration-300`} />
              </motion.div>
            ))}
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
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
