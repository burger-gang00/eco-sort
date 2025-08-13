import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Search, 
  Trash2, 
  MapPin, 
  Award, 
  X, 
  Filter,
  Sparkles,
  TrendingUp,
  Zap,
  Star,
  ChevronRight,
  Eye,
  Plus,
  Info,
  Recycle
} from 'lucide-react';
import { wasteItemAPI, wasteLogAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { GridSkeleton, TextSkeleton, CardSkeleton, StatsSkeleton } from './SkeletonLoader';
import toast from 'react-hot-toast';

const WasteGuide = () => {
  const { isAuthenticated } = useAuth();
  const [wasteItems, setWasteItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalCount: 0
  });
  const [showFilters, setShowFilters] = useState(false);

  // Animation refs
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const categories = [
    { 
      value: '', 
      label: 'All Categories', 
      color: 'bg-eco-bg-100 text-eco-text-secondary',
      icon: '🗂️',
      gradient: 'from-eco-bg-100 to-eco-bg-200'
    },
    { 
      value: 'WET', 
      label: 'Wet Waste', 
      color: 'badge-success',
      icon: '🥬',
      gradient: 'from-green-400 to-green-600'
    },
    { 
      value: 'DRY', 
      label: 'Dry Waste', 
      color: 'badge-info',
      icon: '🗞️',
      gradient: 'from-blue-400 to-blue-600'
    },
    { 
      value: 'RECYCLABLE', 
      label: 'Recyclable', 
      color: 'badge-info',
      icon: '♻️',
      gradient: 'from-purple-400 to-purple-600'
    },
    { 
      value: 'E_WASTE', 
      label: 'E-Waste', 
      color: 'badge-warning',
      icon: '📱',
      gradient: 'from-amber-400 to-amber-600'
    },
    { 
      value: 'HAZARDOUS', 
      label: 'Hazardous', 
      color: 'badge-error',
      icon: '☢️',
      gradient: 'from-red-400 to-red-600'
    },
  ];

  // Fetch waste items function
  const fetchWasteItems = useCallback(async (page = 1) => {
    try {
      setIsLoading(true);
      const params = {
        page,
        limit: 20,
        search: searchQuery.trim(),
        category: selectedCategory,
      };

      const response = await wasteItemAPI.getAll(params);
      
      if (response.success) {
        setWasteItems(response.data.wasteItems);
        setPagination({
          page: response.data.pagination.page,
          totalPages: response.data.pagination.totalPages,
          totalCount: response.data.pagination.totalCount
        });
      }
    } catch (error) {
      console.error('Failed to fetch waste items:', error);
      toast.error('Failed to load waste guide');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedCategory]);

  // Search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchWasteItems(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [fetchWasteItems]);

  // Initial load
  useEffect(() => {
    fetchWasteItems();
  }, [fetchWasteItems]);

  // Handle item click
  const handleItemClick = async (item) => {
    try {
      const response = await wasteItemAPI.getById(item.id);
      if (response.success) {
        setSelectedItem(response.data.wasteItem);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Failed to fetch item details:', error);
      toast.error('Failed to load item details');
    }
  };

  // Handle waste log creation
  const handleLogWaste = async (quantity = 1) => {
    if (!isAuthenticated) {
      toast.error('Please login to log waste disposal');
      return;
    }

    try {
      const response = await wasteLogAPI.create({
        wasteItemId: selectedItem.id,
        quantity
      });

      if (response.success) {
        toast.success(response.data.message);
        setShowModal(false);
      }
    } catch (error) {
      console.error('Failed to log waste:', error);
      toast.error('Failed to log waste disposal');
    }
  };

  // Get category info
  const getCategoryInfo = (category) => {
    return categories.find(cat => cat.value === category) || categories[0];
  };

  // Get bin type color
  const getBinTypeColor = (binType) => {
    switch (binType) {
      case 'WET': return 'text-green-600 bg-green-50 border-green-200';
      case 'DRY': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'E_WASTE': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'HAZARDOUS': return 'text-red-600 bg-red-50 border-red-200';
      case 'RECYCLABLE': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-bg-50 via-white to-eco-bg-100">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative pb-16 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 hero-gradient opacity-5" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-20 h-20 rounded-full bg-gradient-to-r ${
                i % 2 === 0 ? 'from-eco-primary/20 to-eco-secondary/20' : 'from-eco-accent/20 to-eco-primary/20'
              } floating`}
              style={{
                left: `${10 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={heroInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-eco rounded-eco-xl shadow-eco-glow mb-6"
            >
              <Recycle className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <span className="text-gradient">Smart Waste</span><br />
              <span className="text-eco-text-primary">Classification Guide</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-eco-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              Discover how to properly sort and dispose of different waste items. 
              Earn eco points and contribute to a sustainable future.
            </motion.p>

            {/* Quick Stats */}
            <motion.div 
              ref={statsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              {isLoading ? (
                // Stats Skeleton Loading
                <StatsSkeleton 
                  count={3} 
                  variant="card" 
                  showIcon={true}
                  animate="pulse"
                  className="h-24"
                />
              ) : (
                [
                  { icon: Sparkles, label: 'Waste Items', value: pagination.totalCount || '50+' },
                  { icon: TrendingUp, label: 'Categories', value: '5' },
                  { icon: Award, label: 'Max Points', value: '20' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="stat-card-gradient text-center p-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-white" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Search and Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <motion.div 
          className="card-glass p-8 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-eco-text-tertiary" />
            <input
              type="text"
              placeholder="Search waste items... (e.g., plastic bottle, apple peel)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-glass pl-12 pr-16 py-4 text-lg"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <span className="text-sm text-eco-text-tertiary">
                {pagination.totalCount} items
              </span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-eco-text-primary">Categories</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden btn-ghost flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
            
            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
              {categories.map((category, index) => (
                <motion.button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`relative overflow-hidden p-4 rounded-eco-md border-2 transition-all duration-300 ${
                    selectedCategory === category.value
                      ? 'border-green-500 bg-green-500 text-white shadow-lg shadow-green-500/25'
                      : 'border-eco-bg-300 hover:border-green-400/50 hover:shadow-eco'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    selectedCategory === category.value ? 'from-green-500 to-green-600' : category.gradient
                  } opacity-0 transition-opacity duration-300 ${
                    selectedCategory === category.value ? 'opacity-100' : 'hover:opacity-10'
                  }`} />
                  <div className="relative z-10 text-center">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium">{category.label}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {isLoading ? (
          // Enhanced Skeleton Loading State
          <div className="space-y-8">
            {/* Search Results Header Skeleton */}
            <div className="flex items-center justify-between">
              <TextSkeleton variant="glass" width="200px" height="32px" />
              <TextSkeleton variant="neon" width="80px" height="24px" />
            </div>
            
            {/* Results Grid Skeleton */}
            <GridSkeleton
              variant="holographic"
              columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
              count={12}
              itemHeight="280px"
              gap="24px"
              showShimmer={true}
              animate="wave"
            />
            
            {/* Pagination Skeleton */}
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gradient-to-r from-eco-bg-200 via-eco-bg-300 to-eco-bg-200 rounded-eco animate-skeleton-shimmer"
                />
              ))}
            </div>
          </div>
        ) : wasteItems.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            {wasteItems.map((item, index) => {
              const categoryInfo = getCategoryInfo(item.category);
              const binColor = getBinTypeColor(item.binType);
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card group cursor-pointer hover:shadow-eco-lg hover:-translate-y-2 transition-all duration-300"
                  onClick={() => handleItemClick(item)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Card Header */}
                  <div className="relative p-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-eco-md ${binColor} border`}>
                        <Trash2 className="w-6 h-6" />
                      </div>
                      <div className={`badge ${categoryInfo.color} text-xs`}>
                        {categoryInfo.icon} {item.category.replace('_', ' ')}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-eco-text-primary text-lg mb-2 group-hover:text-eco-primary transition-colors duration-300">
                      {item.name}
                    </h3>
                    
                    <p className="text-eco-text-tertiary text-sm line-clamp-2 mb-4">
                      {item.disposalInstructions}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-0 border-t border-eco-bg-200">
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-eco-accent" />
                        <span className="text-sm font-medium text-eco-text-secondary">
                          {item.points} points
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-eco-primary group-hover:translate-x-1 transition-transform duration-300">
                        <span className="text-sm font-medium">Learn More</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-eco opacity-0 group-hover:opacity-5 rounded-eco-lg transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          // Empty State
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-32 h-32 bg-eco-bg-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-16 h-16 text-eco-text-tertiary" />
            </div>
            <h3 className="text-xl font-semibold text-eco-text-primary mb-2">No items found</h3>
            <p className="text-eco-text-secondary mb-6">
              Try adjusting your search or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-2">
              {[...Array(pagination.totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => fetchWasteItems(pageNum)}
                    className={`px-4 py-2 rounded-eco transition-all duration-300 ${
                      pagination.page === pageNum
                        ? 'bg-eco-primary text-white shadow-eco-glow'
                        : 'bg-white text-eco-text-secondary hover:bg-eco-bg-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </section>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {showModal && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-eco-xl shadow-eco-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-eco text-white p-6 rounded-t-eco-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-eco-md flex items-center justify-center">
                      <Trash2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                          {getCategoryInfo(selectedItem.category).icon} {selectedItem.category.replace('_', ' ')}
                        </span>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>{selectedItem.points} points</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-white/10 rounded-eco transition-colors duration-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-eco-text-primary mb-3 flex items-center space-x-2">
                      <Info className="w-5 h-5" />
                      <span>Disposal Instructions</span>
                    </h3>
                    <div className="bg-eco-bg-50 p-4 rounded-eco border border-eco-bg-200">
                      <p className="text-eco-text-secondary leading-relaxed">
                        {selectedItem.disposalInstructions}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-eco-text-primary mb-3 flex items-center space-x-2">
                      <MapPin className="w-5 h-5" />
                      <span>Bin Information</span>
                    </h3>
                    <div className={`p-4 rounded-eco border ${getBinTypeColor(selectedItem.binType)}`}>
                      <div className="flex items-center space-x-3 mb-2">
                        <Trash2 className="w-5 h-5" />
                        <span className="font-medium">{selectedItem.binType.replace('_', ' ')} Bin</span>
                      </div>
                      <p className="text-sm opacity-80">
                        Dispose this item in the appropriate {selectedItem.binType.toLowerCase().replace('_', ' ')} waste bin.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isAuthenticated && (
                  <div className="mt-8 pt-6 border-t border-eco-bg-200">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleLogWaste(1)}
                        className="btn-primary flex items-center justify-center space-x-2"
                      >
                        <Plus className="w-5 h-5" />
                        <span>Log Disposal (+{selectedItem.points} points)</span>
                      </button>
                      <Link
                        to="/bin-map"
                        className="btn-outline flex items-center justify-center space-x-2"
                        onClick={() => setShowModal(false)}
                      >
                        <MapPin className="w-5 h-5" />
                        <span>Find Nearby Bins</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WasteGuide;
