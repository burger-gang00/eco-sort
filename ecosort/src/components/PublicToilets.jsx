import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  MapPin, Navigation, Clock, Star, Search, Building2, Accessibility,
  Wifi, Car, Baby, Phone, Plus, Camera, Heart, MessageCircle, Share2,
  Map, List, Locate, Users, Award, Droplets, Zap, AlertCircle, CheckCircle,
  ThumbsUp, ThumbsDown, Flag, Edit, Trash2, Eye, Upload, X, Filter
} from 'lucide-react';
import { GridSkeleton } from './SkeletonLoader';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const PublicToilets = () => {
  const { user, isAuthenticated } = useAuth();
  const [toilets, setToilets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [selectedToilet, setSelectedToilet] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [isAddingToilet, setIsAddingToilet] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const mapRef = useRef(null);
  const [olaMap, setOlaMap] = useState(null);
  const [mapViewMode, setMapViewMode] = useState('map'); // 'map' or 'list'

  // Form states
  const [newToilet, setNewToilet] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    accessibility: false,
    wifi: false,
    parking: false,
    babyFacilities: false,
    isEcoFriendly: false,
    openHours: '24 hours',
    amenities: [],
    features: []
  });

  const [review, setReview] = useState({
    rating: 5,
    cleanlinessRating: 5,
    comment: ''
  });

  // Animation refs
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const filters = [
    { value: 'all', label: 'All Facilities', icon: Building2, color: 'blue' },
    { value: 'open', label: 'Open Now', icon: Clock, color: 'green' },
    { value: 'accessible', label: 'Accessible', icon: Accessibility, color: 'purple' },
    { value: 'baby_friendly', label: 'Baby Care', icon: Baby, color: 'pink' },
    { value: 'eco_friendly', label: 'Eco-Friendly', icon: Droplets, color: 'emerald' },
    { value: 'high_rated', label: '4+ Stars', icon: Star, color: 'yellow' },
    { value: 'nearby', label: 'Nearby', icon: Locate, color: 'indigo' }
  ];

  const amenityOptions = [
    'Hand Sanitizer', 'Air Dryer', 'Baby Station', 'Wheelchair Access',
    'Solar Power', 'Rainwater Harvesting', 'Composting', 'CCTV Security',
    'Attendant Available', 'Tissue Paper', 'Soap Dispenser', 'Mirror'
  ];

  useEffect(() => {
    fetchToilets();
    getUserLocation();
  }, []);

  useEffect(() => {
    if (viewMode === 'map' && mapRef.current && userLocation && toilets.length > 0) {
      initializeOlaMap();
    }
  }, [viewMode, userLocation, toilets]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
          // Default to Delhi
          setUserLocation({ lat: 28.6139, lng: 77.2090 });
        }
      );
    } else {
      setUserLocation({ lat: 28.6139, lng: 77.2090 });
    }
  };

  const fetchToilets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/public-toilets`);
      const data = await response.json();
      
      if (data.success) {
        setToilets(data.data.toilets);
      } else {
        toast.error('Failed to fetch toilets');
      }
    } catch (error) {
      console.error('Error fetching toilets:', error);
      toast.error('Failed to fetch toilets');
    } finally {
      setIsLoading(false);
    }
  };

  const initializeOlaMap = async () => {
    if (!mapRef.current || !userLocation) return;
    
    // Set a flag to show the fallback map component
    setOlaMap('fallback');
  };



  // Helper function to open directions
  const openDirections = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const openGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  // Group toilets by city for better organization
  const getToiletsByCity = () => {
    const toiletsByCity = {};
    filteredToilets.forEach(toilet => {
      const city = toilet.address.split(',').slice(-3, -2)[0]?.trim() || 'Unknown';
      if (!toiletsByCity[city]) {
        toiletsByCity[city] = [];
      }
      toiletsByCity[city].push(toilet);
    });
    return toiletsByCity;
  };

  // Fallback Map Component
  const FallbackMapComponent = () => {
    const toiletsByCity = getToiletsByCity();

    return (
      <div className="w-full h-full relative bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header Controls */}
        <div className="absolute top-4 left-4 right-4 z-20">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">🗺️ Toilet Locations Map</h3>
                <p className="text-sm text-gray-600">{filteredToilets.length} locations across {Object.keys(toiletsByCity).length} cities</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setMapViewMode('map')}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    mapViewMode === 'map' 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                >
                  🗺️ Map View
                </button>
                <button
                  onClick={() => setMapViewMode('list')}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    mapViewMode === 'list' 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                >
                  📋 List View
                </button>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Eco-Friendly</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Regular</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Accessible</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>High Rated (4+)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map View */}
        {mapViewMode === 'map' && (
          <div className="w-full h-full pt-32 pb-4 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-full overflow-y-auto">
              {Object.entries(toiletsByCity).map(([city, cityToilets]) => (
                <div key={city} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">{city}</h4>
                    <span className="text-sm text-gray-500">{cityToilets.length} locations</span>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {cityToilets.map(toilet => (
                      <div key={toilet.id} className="bg-white/60 rounded-lg p-3 border border-gray-100">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className={`w-2 h-2 rounded-full ${
                                toilet.isEcoFriendly ? 'bg-green-500' : 
                                toilet.accessibility ? 'bg-purple-500' :
                                toilet.rating >= 4 ? 'bg-yellow-500' : 'bg-blue-500'
                              }`}></div>
                              <h5 className="font-medium text-sm text-gray-800 truncate">{toilet.name}</h5>
                            </div>
                            <div className="flex items-center space-x-3 text-xs text-gray-600 mb-2">
                              <span>⭐ {toilet.rating}</span>
                              <span className={toilet.status === 'OPEN' ? 'text-green-600' : 'text-red-600'}>
                                {toilet.status === 'OPEN' ? '🟢' : '🔴'} {toilet.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {toilet.isEcoFriendly && <span className="text-xs bg-green-100 text-green-700 px-1 py-0.5 rounded">🌱</span>}
                              {toilet.accessibility && <span className="text-xs bg-purple-100 text-purple-700 px-1 py-0.5 rounded">♿</span>}
                              {toilet.wifi && <span className="text-xs bg-blue-100 text-blue-700 px-1 py-0.5 rounded">📶</span>}
                              {toilet.babyFacilities && <span className="text-xs bg-pink-100 text-pink-700 px-1 py-0.5 rounded">👶</span>}
                            </div>
                          </div>
                          <button
                            onClick={() => openDirections(toilet.latitude, toilet.longitude)}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors ml-2"
                          >
                            📍
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* List View */}
        {mapViewMode === 'list' && (
          <div className="w-full h-full pt-32 pb-4 px-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 h-full">
              <div className="h-full overflow-y-auto space-y-3">
                {filteredToilets.map(toilet => (
                  <div key={toilet.id} className="bg-white/60 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${
                            toilet.isEcoFriendly ? 'bg-green-500' : 
                            toilet.accessibility ? 'bg-purple-500' :
                            toilet.rating >= 4 ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}></div>
                          <h4 className="font-semibold text-gray-900">{toilet.name}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{toilet.address}</p>
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="text-sm">⭐ {toilet.rating}/5 ({toilet.reviews} reviews)</span>
                          <span className={`text-sm ${toilet.status === 'OPEN' ? 'text-green-600' : 'text-red-600'}`}>
                            {toilet.status === 'OPEN' ? '🟢 Open' : '🔴 Closed'}
                          </span>
                          {toilet.isEcoFriendly && <span className="text-sm text-green-600">🌱 Eco-Friendly</span>}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                          <span>🕒 {toilet.openHours}</span>
                          {toilet.sustainabilityScore && <span>🌍 {toilet.sustainabilityScore}/100</span>}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {toilet.accessibility && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">♿ Accessible</span>}
                          {toilet.wifi && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">📶 WiFi</span>}
                          {toilet.parking && <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">🚗 Parking</span>}
                          {toilet.babyFacilities && <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">👶 Baby Care</span>}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <button
                          onClick={() => openDirections(toilet.latitude, toilet.longitude)}
                          className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
                        >
                          📍 Directions
                        </button>
                        <button
                          onClick={() => openGoogleMaps(toilet.latitude, toilet.longitude)}
                          className="bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 transition-colors"
                        >
                          🗺️ View Map
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const filteredToilets = toilets.filter(toilet => {
    const matchesSearch = toilet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         toilet.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = () => {
      switch (selectedFilter) {
        case 'open': return toilet.status === 'OPEN';
        case 'accessible': return toilet.accessibility;
        case 'baby_friendly': return toilet.babyFacilities;
        case 'eco_friendly': return toilet.isEcoFriendly;
        case 'high_rated': return toilet.rating >= 4.0;
        case 'nearby': return toilet.distance <= 2.0;
        default: return true;
      }
    };

    return matchesSearch && matchesFilter();
  });



  const handleAddToilet = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add toilets');
      return;
    }
    setShowAddModal(true);
  };

  const handleReviewToilet = (toilet) => {
    if (!isAuthenticated) {
      toast.error('Please login to add reviews');
      return;
    }
    setSelectedToilet(toilet);
    setShowReviewModal(true);
  };

  const submitNewToilet = async (e) => {
    e.preventDefault();
    setIsAddingToilet(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/public-toilets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newToilet)
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setShowAddModal(false);
        setNewToilet({
          name: '',
          address: '',
          latitude: '',
          longitude: '',
          accessibility: false,
          wifi: false,
          parking: false,
          babyFacilities: false,
          isEcoFriendly: false,
          openHours: '24 hours',
          amenities: [],
          features: []
        });
        fetchToilets(); // Refresh the list
      } else {
        toast.error(data.error || 'Failed to add toilet');
      }
    } catch (error) {
      console.error('Error adding toilet:', error);
      toast.error('Failed to add toilet');
    } finally {
      setIsAddingToilet(false);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setIsSubmittingReview(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/public-toilets/${selectedToilet.id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(review)
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setShowReviewModal(false);
        setReview({ rating: 5, cleanlinessRating: 5, comment: '' });
        fetchToilets(); // Refresh the list
      } else {
        toast.error(data.error || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNewToilet(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }));
          toast.success('Location updated!');
        },
        (error) => {
          toast.error('Failed to get location');
        }
      );
    } else {
      toast.error('Geolocation not supported');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Enhanced Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-green-400/5" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-16 h-16 rounded-full bg-gradient-to-r ${
                i % 3 === 0 ? 'from-blue-400/20 to-blue-600/20' : 
                i % 3 === 1 ? 'from-green-400/20 to-green-600/20' : 
                'from-purple-400/20 to-purple-600/20'
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
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/25 mb-6"
            >
              <Building2 className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Smart Toilet</span><br />
              <span className="text-slate-800">Locator</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              Find, review, and contribute to India's largest community-driven toilet database. 
              Real-time updates, eco-friendly options, and accessibility information.
            </motion.p>

            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-white/20 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{toilets.length}</div>
                <div className="text-sm text-slate-600">Total Facilities</div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-white/20 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {toilets.length > 0 ? Math.round((toilets.filter(t => t.isEcoFriendly).length / toilets.length) * 100) : 0}%
                </div>
                <div className="text-sm text-slate-600">Eco-Friendly</div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-white/20 text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {toilets.length > 0 ? (toilets.reduce((sum, t) => sum + t.rating, 0) / toilets.length).toFixed(1) : '0.0'}
                </div>
                <div className="text-sm text-slate-600">Avg Rating</div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-white/20 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {toilets.filter(t => t.accessibility).length}
                </div>
                <div className="text-sm text-slate-600">Accessible</div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0 }}
            >
              <button
                onClick={handleAddToilet}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Toilet</span>
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
                className="bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {viewMode === 'map' ? <List className="w-5 h-5" /> : <Map className="w-5 h-5" />}
                <span>{viewMode === 'map' ? 'List View' : 'Map View'}</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <motion.div 
          className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-white/20 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, location, or amenities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-32 py-4 text-lg bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button
                onClick={getUserLocation}
                className="p-2 text-slate-500 hover:text-blue-500 transition-colors"
                title="Update location"
              >
                <Locate className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Enhanced Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                  selectedFilter === filter.value
                    ? `border-${filter.color}-500 bg-${filter.color}-500 text-white shadow-lg shadow-${filter.color}-500/25`
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{filter.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {viewMode === 'map' ? (
          <motion.div 
            className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Interactive Map</h3>
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Regular</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Eco-Friendly</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Closed</span>
                </div>
              </div>
            </div>
            <div 
              ref={mapRef} 
              className="w-full h-96 md:h-[600px] bg-gray-100 relative"
              style={{ 
                minHeight: '400px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading toilet locations...</p>
                  </div>
                </div>
              ) : olaMap === 'fallback' ? (
                <FallbackMapComponent />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Initializing map...</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : isLoading ? (
          <GridSkeleton
            columns={{ sm: 1, md: 2, lg: 3 }}
            count={6}
            itemHeight="400px"
            gap="24px"
            showShimmer={true}
            animate="wave"
          />
        ) : filteredToilets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredToilets.map((toilet, index) => (
              <motion.div
                key={toilet.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Enhanced Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-xl ${
                      toilet.isEcoFriendly ? 'bg-green-100 text-green-600' :
                      toilet.status === 'OPEN' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                    }`}>
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-slate-600">{toilet.rating}</span>
                        <span className="text-xs text-slate-400">({toilet.reviews})</span>
                      </div>
                      {toilet.isEcoFriendly && (
                        <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          🌱 Eco
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {toilet.name}
                  </h3>
                  
                  <p className="text-slate-500 text-sm mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {toilet.address}
                  </p>

                  {/* Enhanced Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                      toilet.status === 'OPEN' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {toilet.status === 'OPEN' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      <span>{toilet.status === 'OPEN' ? 'Open Now' : 'Closed'}</span>
                    </span>
                    <span className="text-xs text-slate-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {toilet.openHours}
                    </span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {toilet.accessibility && (
                      <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                        <Accessibility className="w-3 h-3" />
                        <span>Accessible</span>
                      </div>
                    )}
                    {toilet.wifi && (
                      <div className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                        <Wifi className="w-3 h-3" />
                        <span>WiFi</span>
                      </div>
                    )}
                    {toilet.parking && (
                      <div className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        <Car className="w-3 h-3" />
                        <span>Parking</span>
                      </div>
                    )}
                    {toilet.babyFacilities && (
                      <div className="flex items-center space-x-1 bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">
                        <Baby className="w-3 h-3" />
                        <span>Baby Care</span>
                      </div>
                    )}
                  </div>

                  {/* Sustainability Score */}
                  {toilet.isEcoFriendly && (
                    <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-800">Sustainability Score</span>
                        <span className="text-lg font-bold text-green-600">{toilet.sustainabilityScore}/100</span>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${toilet.sustainabilityScore}%` }}
                        ></div>
                      </div>
                      {toilet.waterSaved && (
                        <div className="flex items-center justify-between text-xs text-green-700 mt-2">
                          <span>💧 Water Saved: {toilet.waterSaved}</span>
                          {toilet.carbonFootprint && <span>🌱 {toilet.carbonFootprint}</span>}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openDirections(toilet.latitude, toilet.longitude)}
                      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Directions</span>
                    </button>
                    <button
                      onClick={() => handleReviewToilet(toilet)}
                      className="flex-1 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Star className="w-4 h-4" />
                      <span>Review</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No toilets found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={handleAddToilet}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Add the first toilet</span>
            </button>
          </motion.div>
        )}
      </section>

      {/* Add Toilet Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Add New Toilet</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-slate-600 mt-2">Help others by adding a public toilet to our database</p>
              </div>

              <form onSubmit={submitNewToilet} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Toilet Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newToilet.name}
                      onChange={(e) => setNewToilet(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="e.g., Central Park Restroom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Open Hours
                    </label>
                    <input
                      type="text"
                      value={newToilet.openHours}
                      onChange={(e) => setNewToilet(prev => ({ ...prev, openHours: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="e.g., 6:00 AM - 10:00 PM"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    required
                    value={newToilet.address}
                    onChange={(e) => setNewToilet(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    rows="3"
                    placeholder="Full address with landmarks"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Latitude *
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={newToilet.latitude}
                      onChange={(e) => setNewToilet(prev => ({ ...prev, latitude: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="28.6139"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Longitude *
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        step="any"
                        required
                        value={newToilet.longitude}
                        onChange={(e) => setNewToilet(prev => ({ ...prev, longitude: e.target.value }))}
                        className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        placeholder="77.2090"
                      />
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        title="Get current location"
                      >
                        <Locate className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4">
                    Available Facilities
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newToilet.accessibility}
                        onChange={(e) => setNewToilet(prev => ({ ...prev, accessibility: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-2">
                        <Accessibility className="w-4 h-4 text-purple-600" />
                        <span className="text-sm">Wheelchair Access</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newToilet.wifi}
                        onChange={(e) => setNewToilet(prev => ({ ...prev, wifi: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-2">
                        <Wifi className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">WiFi</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newToilet.parking}
                        onChange={(e) => setNewToilet(prev => ({ ...prev, parking: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-2">
                        <Car className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">Parking</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newToilet.babyFacilities}
                        onChange={(e) => setNewToilet(prev => ({ ...prev, babyFacilities: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-2">
                        <Baby className="w-4 h-4 text-pink-600" />
                        <span className="text-sm">Baby Care</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newToilet.isEcoFriendly}
                        onChange={(e) => setNewToilet(prev => ({ ...prev, isEcoFriendly: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-2">
                        <Droplets className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Eco-Friendly</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4">
                    Additional Amenities (Optional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {amenityOptions.map((amenity) => (
                      <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newToilet.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewToilet(prev => ({
                                ...prev,
                                amenities: [...prev.amenities, amenity]
                              }));
                            } else {
                              setNewToilet(prev => ({
                                ...prev,
                                amenities: prev.amenities.filter(a => a !== amenity)
                              }));
                            }
                          }}
                          className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-6 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isAddingToilet}
                    className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isAddingToilet ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add Toilet</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && selectedToilet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Review Toilet</h2>
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-slate-600 mt-2">{selectedToilet.name}</p>
              </div>

              <form onSubmit={submitReview} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Overall Rating
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReview(prev => ({ ...prev, rating: star }))}
                        className={`p-1 transition-colors ${
                          star <= review.rating ? 'text-yellow-400' : 'text-slate-300'
                        }`}
                      >
                        <Star className="w-8 h-8 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Cleanliness Rating
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReview(prev => ({ ...prev, cleanlinessRating: star }))}
                        className={`p-1 transition-colors ${
                          star <= review.cleanlinessRating ? 'text-blue-400' : 'text-slate-300'
                        }`}
                      >
                        <Droplets className="w-8 h-8 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Comment (Optional)
                  </label>
                  <textarea
                    value={review.comment}
                    onChange={(e) => setReview(prev => ({ ...prev, comment: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    rows="4"
                    placeholder="Share your experience..."
                  />
                </div>

                <div className="flex space-x-4 pt-6 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmittingReview ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Star className="w-4 h-4" />
                        <span>Submit Review</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PublicToilets;