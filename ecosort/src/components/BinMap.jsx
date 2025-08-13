import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { 
  MapPin, Navigation, AlertTriangle, CheckCircle, Share2, Route, 
  Eye, Camera, Star, Clock, Filter, Search, Layers, Compass,
  Phone, MessageCircle, Bookmark, Download, Upload, Zap,
  Users, Award, TrendingUp, BarChart3, Settings, RefreshCw,
  ExternalLink, Map as MapIcon, List, Grid, Heart, Flag
} from 'lucide-react';
import L from 'leaflet';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

// Custom bin icons
const createBinIcon = (type, isFull) => {
  const colors = {
    WET: '#10b981', // green
    DRY: '#3b82f6', // blue
    E_WASTE: '#f59e0b', // amber
    HAZARDOUS: '#ef4444', // red
    RECYCLABLE: '#8b5cf6' // purple
  };

  const color = isFull ? '#ef4444' : colors[type] || '#6b7280';
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 25px;
        height: 25px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 12px;
          font-weight: bold;
        ">
          ${isFull ? '!' : type.charAt(0)}
        </div>
      </div>
    `,
    className: 'custom-bin-icon',
    iconSize: [25, 25],
    iconAnchor: [12, 24]
  });
};

// User location icon
const userIcon = L.divIcon({
  html: `
    <div style="
      background-color: #dc2626;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      position: relative;
    ">
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        background-color: white;
        border-radius: 50%;
      "></div>
    </div>
  `,
  className: 'user-location-icon',
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

// Utility function for bin type colors
const getBinTypeColor = (type) => {
  const colors = {
    WET: 'text-green-600 bg-green-100',
    DRY: 'text-blue-600 bg-blue-100',
    E_WASTE: 'text-amber-600 bg-amber-100',
    HAZARDOUS: 'text-red-600 bg-red-100',
    RECYCLABLE: 'text-purple-600 bg-purple-100'
  };
  return colors[type] || 'text-gray-600 bg-gray-100';
};

// Map wrapper component to handle initialization properly
const MapWrapper = ({ center, zoom, userLocation, bins, user, reportingBin, setReportingBin, setBins }) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full rounded-lg"
      zoomControl={false}
      key={`map-${center[0]}-${center[1]}-${zoom}`}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* User location marker */}
      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={userIcon}
        >
          <Popup>
            <div className="text-center">
              <div className="font-medium text-gray-800 mb-1">Your Location</div>
              <div className="text-sm text-gray-600">
                Lat: {userLocation.lat.toFixed(4)}<br/>
                Lng: {userLocation.lng.toFixed(4)}
              </div>
            </div>
          </Popup>
        </Marker>
      )}
      
      {/* Bin markers */}
      {bins.map((bin) => (
        <Marker
          key={bin.id}
          position={[bin.latitude, bin.longitude]}
          icon={createBinIcon(bin.type, bin.isFull)}
        >
          <Popup>
            <div className="min-w-64">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-800">{bin.name}</h4>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getBinTypeColor(bin.type)}`}>
                    {bin.type.replace('_', '-')}
                  </span>
                </div>
                <MapPin className="w-4 h-4 text-gray-400 mt-1" />
              </div>

              <div className="flex items-center gap-2 mb-3">
                {bin.isFull ? (
                  <div className="flex items-center gap-1 text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">Full</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Available</span>
                  </div>
                )}
                <span className="text-sm text-gray-600">
                  Capacity: {bin.capacity}L
                </span>
              </div>

              {!bin.isFull && user && (
                <BinReportButton 
                  bin={bin}
                  reportingBin={reportingBin}
                  setReportingBin={setReportingBin}
                  setBins={setBins}
                />
              )}

              <div className="mt-2 text-xs text-gray-500">
                {bin.latitude.toFixed(4)}, {bin.longitude.toFixed(4)}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

// Separate component for bin report button to avoid re-renders
const BinReportButton = ({ bin, reportingBin, setReportingBin, setBins }) => {
  const reportBinFull = async (binId) => {
    setReportingBin(binId);
    
    try {
      const response = await api.patch(`/bins/${binId}/report-full`);
      if (response.data.success) {
        toast.success(response.data.message);
        // Update local state
        setBins(prevBins => 
          prevBins.map(b => 
            b.id === binId ? { ...b, isFull: true } : b
          )
        );
      }
    } catch (error) {
      console.error('Error reporting bin:', error);
      toast.error(error.response?.data?.error || 'Failed to report bin');
    } finally {
      setReportingBin(null);
    }
  };

  return (
    <button
      onClick={() => reportBinFull(bin.id)}
      disabled={reportingBin === bin.id}
      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        reportingBin === bin.id
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-red-600 hover:bg-red-700 text-white'
      }`}
    >
      {reportingBin === bin.id ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Reporting...
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Report Full
        </div>
      )}
    </button>
  );
};

const BinMap = () => {
  const { user } = useAuth();
  const [bins, setBins] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [reportingBin, setReportingBin] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAddingBin, setIsAddingBin] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('map'); // 'map', 'list', 'grid'
  const [selectedBin, setSelectedBin] = useState(null);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [favoritesBins, setFavoritesBins] = useState([]);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [mapStyle, setMapStyle] = useState('default');
  const [showNearbyOnly, setShowNearbyOnly] = useState(false);
  const [radiusFilter, setRadiusFilter] = useState(5);
  const [sortBy, setSortBy] = useState('distance');
  const [showStats, setShowStats] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [newBin, setNewBin] = useState({
    name: '',
    latitude: '',
    longitude: '',
    type: 'WET',
    capacity: 240
  });

  useEffect(() => {
    fetchBins();
    loadFavorites();
  }, []);

  // Force re-render map when location changes to avoid initialization conflicts
  useEffect(() => {
    if (userLocation) {
      // Trigger re-render by updating bins
      fetchBins();
    }
  }, [userLocation]);

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchBins();
        toast.success('Bin data refreshed!');
      }, 30000); // Refresh every 30 seconds
      setRefreshInterval(interval);
    } else {
      if (refreshInterval) {
        clearInterval(refreshInterval);
        setRefreshInterval(null);
      }
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [autoRefresh]);

  // Load favorites from localStorage
  const loadFavorites = () => {
    const saved = localStorage.getItem('favoriteBins');
    if (saved) {
      setFavoritesBins(JSON.parse(saved));
    }
  };

  // Save favorites to localStorage
  const saveFavorites = (favorites) => {
    localStorage.setItem('favoriteBins', JSON.stringify(favorites));
    setFavoritesBins(favorites);
  };

  // Toggle favorite bin
  const toggleFavorite = (binId) => {
    const newFavorites = favoritesBins.includes(binId)
      ? favoritesBins.filter(id => id !== binId)
      : [...favoritesBins, binId];
    saveFavorites(newFavorites);
    toast.success(favoritesBins.includes(binId) ? 'Removed from favorites' : 'Added to favorites');
  };

  const fetchBins = async () => {
    try {
      const response = await api.get('/bins');
      if (response.data.success) {
        setBins(response.data.data.bins);
      }
    } catch (error) {
      console.error('Error fetching bins:', error);
      toast.error('Failed to load bin locations');
    }
  };

  const getUserLocation = () => {
    setIsLoadingLocation(true);
    
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLoadingLocation(false);
        toast.success('Location updated!');
      },
      (error) => {
        console.error('Error getting location:', error);
        toast.error('Failed to get your location');
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Enhanced filtering logic
  const filteredBins = bins.filter(bin => {
    const matchesSearch = bin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bin.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'available' && !bin.isFull) ||
                         (selectedFilter === 'full' && bin.isFull) ||
                         (selectedFilter === 'favorites' && favoritesBins.includes(bin.id)) ||
                         bin.type === selectedFilter;

    // Distance filter
    let matchesDistance = true;
    if (showNearbyOnly && userLocation) {
      const distance = calculateDistance(userLocation.lat, userLocation.lng, bin.latitude, bin.longitude);
      matchesDistance = distance <= radiusFilter;
    }

    return matchesSearch && matchesFilter && matchesDistance;
  }).sort((a, b) => {
    if (!userLocation) return 0;
    
    const distanceA = calculateDistance(userLocation.lat, userLocation.lng, a.latitude, a.longitude);
    const distanceB = calculateDistance(userLocation.lat, userLocation.lng, b.latitude, b.longitude);
    
    switch (sortBy) {
      case 'distance':
        return distanceA - distanceB;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'type':
        return a.type.localeCompare(b.type);
      case 'capacity':
        return b.capacity - a.capacity;
      case 'status':
        return a.isFull - b.isFull;
      default:
        return 0;
    }
  });

  const handleAddBin = () => {
    if (!user) {
      toast.error('Please login to add bins');
      return;
    }
    setShowAddModal(true);
  };

  const submitNewBin = async (e) => {
    e.preventDefault();
    setIsAddingBin(true);

    try {
      const response = await api.post('/bins', newBin);
      if (response.data.success) {
        toast.success(response.data.message);
        setShowAddModal(false);
        setNewBin({
          name: '',
          latitude: '',
          longitude: '',
          type: 'WET',
          capacity: 240
        });
        fetchBins(); // Refresh the list
      }
    } catch (error) {
      console.error('Error adding bin:', error);
      toast.error(error.response?.data?.error || 'Failed to add bin');
    } finally {
      setIsAddingBin(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNewBin(prev => ({
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

  // Calculate distance between two points
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Open in Google Maps
  const openInGoogleMaps = (bin) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${bin.latitude},${bin.longitude}&travelmode=walking`;
    window.open(url, '_blank');
    toast.success('Opening in Google Maps...');
  };

  // Open in Apple Maps (for iOS devices)
  const openInAppleMaps = (bin) => {
    const url = `http://maps.apple.com/?daddr=${bin.latitude},${bin.longitude}&dirflg=w`;
    window.open(url, '_blank');
    toast.success('Opening in Apple Maps...');
  };

  // Share bin location
  const shareBin = async (bin) => {
    const shareData = {
      title: `${bin.name} - Smart Bin`,
      text: `Found a ${bin.type.replace('_', ' ')} waste bin: ${bin.name}`,
      url: `${window.location.origin}/bin-map?bin=${bin.id}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } catch (error) {
        copyToClipboard(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      }
    } else {
      copyToClipboard(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy');
    });
  };

  // Get directions via multiple services
  const getDirections = (bin, service = 'google') => {
    if (!userLocation) {
      toast.error('Please enable location to get directions');
      return;
    }

    const urls = {
      google: `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${bin.latitude},${bin.longitude}`,
      apple: `http://maps.apple.com/?saddr=${userLocation.lat},${userLocation.lng}&daddr=${bin.latitude},${bin.longitude}`,
      waze: `https://waze.com/ul?ll=${bin.latitude},${bin.longitude}&navigate=yes`,
      uber: `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=${bin.latitude}&dropoff[longitude]=${bin.longitude}`,
      ola: `https://book.olacabs.com/?serviceType=p2p&lat=${bin.latitude}&lng=${bin.longitude}`
    };

    window.open(urls[service], '_blank');
    toast.success(`Opening in ${service.charAt(0).toUpperCase() + service.slice(1)}...`);
  };

  // Report bin issues
  const reportBinIssue = async (binId, issue) => {
    try {
      // This would typically send to a backend endpoint
      toast.success(`Issue reported: ${issue}`);
      // You could implement actual reporting logic here
    } catch (error) {
      toast.error('Failed to report issue');
    }
  };

  // Export bin data
  const exportBinData = () => {
    const dataStr = JSON.stringify(filteredBins, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `bin-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Bin data exported!');
  };

  const defaultCenter = [12.9716, 77.5946]; // Default to Bangalore coordinates
  const mapCenter = userLocation ? [userLocation.lat, userLocation.lng] : defaultCenter;
  const mapZoom = userLocation ? 15 : 13;

  const binTypes = ['WET', 'DRY', 'E_WASTE', 'HAZARDOUS', 'RECYCLABLE'];
  const filterOptions = [
    { value: 'all', label: 'All Bins', count: bins.length, icon: Grid },
    { value: 'available', label: 'Available', count: bins.filter(b => !b.isFull).length, icon: CheckCircle },
    { value: 'full', label: 'Full', count: bins.filter(b => b.isFull).length, icon: AlertTriangle },
    { value: 'favorites', label: 'Favorites', count: favoritesBins.length, icon: Heart },
    ...binTypes.map(type => ({
      value: type,
      label: type.replace('_', '-'),
      count: bins.filter(b => b.type === type).length,
      icon: MapPin
    }))
  ];

  const sortOptions = [
    { value: 'distance', label: 'Distance', icon: Navigation },
    { value: 'name', label: 'Name', icon: Search },
    { value: 'type', label: 'Type', icon: Filter },
    { value: 'capacity', label: 'Capacity', icon: BarChart3 },
    { value: 'status', label: 'Status', icon: CheckCircle }
  ];

  const mapStyles = [
    { value: 'default', label: 'Default', preview: '🗺️' },
    { value: 'satellite', label: 'Satellite', preview: '🛰️' },
    { value: 'terrain', label: 'Terrain', preview: '🏔️' },
    { value: 'dark', label: 'Dark', preview: '🌙' }
  ];

  return (
    <div className="h-full w-full relative bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Enhanced Header */}
      <div className="absolute top-4 left-4 right-4 z-20 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">🗑️ Smart Bin Locator</h3>
                <p className="text-sm text-gray-600">{filteredBins.length} of {bins.length} bins</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { mode: 'map', icon: MapIcon, label: 'Map' },
                  { mode: 'list', icon: List, label: 'List' },
                  { mode: 'grid', icon: Grid, label: 'Grid' }
                ].map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === mode 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    title={label}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

              {/* Settings */}
              <button
                onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                title="Advanced Filters"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Enhanced Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bins by name, type, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white/80"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Filter Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {filterOptions.slice(0, 4).map(option => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    selectedFilter === option.value
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{option.label}</span>
                  <span className="bg-black/10 px-1.5 py-0.5 rounded-full text-xs">
                    {option.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Advanced Filters Panel */}
          {showFiltersPanel && (
            <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3">Advanced Filters</h4>
              
              {/* Sort Options */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Distance Filter */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Nearby Only</label>
                  <button
                    onClick={() => setShowNearbyOnly(!showNearbyOnly)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      showNearbyOnly ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      showNearbyOnly ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
                {showNearbyOnly && (
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Radius: {radiusFilter}km</label>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={radiusFilter}
                      onChange={(e) => setRadiusFilter(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}
              </div>

              {/* Auto Refresh */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Auto Refresh</label>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    autoRefresh ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                    autoRefresh ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          )}

          {/* Enhanced Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={getUserLocation}
              disabled={isLoadingLocation}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isLoadingLocation
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25'
              }`}
            >
              {isLoadingLocation ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Locating...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4" />
                  <span>My Location</span>
                </>
              )}
            </button>

            <button
              onClick={handleAddBin}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/25 transition-all duration-200"
            >
              <MapPin className="w-4 h-4" />
              <span>Add Bin</span>
            </button>
          </div>

          {/* Additional Action Buttons */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => fetchBins()}
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200 transition-all"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh</span>
            </button>

            <button
              onClick={exportBinData}
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200 transition-all"
            >
              <Download className="w-3 h-3" />
              <span>Export</span>
            </button>

            <button
              onClick={() => setShowStats(!showStats)}
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200 transition-all"
            >
              <BarChart3 className="w-3 h-3" />
              <span>Stats</span>
            </button>
          </div>

          {/* Enhanced Legend */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Bin Types</h4>
              <span className="text-xs text-gray-500">{binTypes.length} types</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {binTypes.map(type => {
                const count = bins.filter(b => b.type === type).length;
                const available = bins.filter(b => b.type === type && !b.isFull).length;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedFilter(type)}
                    className={`flex items-center justify-between p-2 rounded-lg text-xs transition-all ${
                      selectedFilter === type 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'bg-white/60 hover:bg-white hover:shadow-sm border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getBinTypeColor(type).split(' ')[1]}`}></div>
                      <span className="font-medium">{type.replace('_', '-')}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{available}/{count}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Status Legend */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Available: {bins.filter(b => !b.isFull).length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Full: {bins.filter(b => b.isFull).length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <MapWrapper
        center={mapCenter}
        zoom={mapZoom}
        userLocation={userLocation}
        bins={filteredBins}
        user={user}
        reportingBin={reportingBin}
        setReportingBin={setReportingBin}
        setBins={setBins}
      />

      {/* Enhanced Stats overlay */}
      <div className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/20">
        <div className="text-sm font-medium text-gray-800 mb-3">📊 Bin Statistics</div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Available: {bins.filter(b => !b.isFull).length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Full: {bins.filter(b => b.isFull).length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Total: {bins.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Filtered: {filteredBins.length}</span>
          </div>
        </div>
        
        {/* Capacity info */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-600">
            Total Capacity: {bins.reduce((sum, bin) => sum + bin.capacity, 0).toLocaleString()}L
          </div>
          <div className="text-xs text-gray-600">
            Avg per bin: {Math.round(bins.reduce((sum, bin) => sum + bin.capacity, 0) / bins.length || 0)}L
          </div>
        </div>
      </div>

      {/* Add Bin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Add New Bin</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600 mt-2">Help others by adding a waste bin to our database</p>
            </div>

            <form onSubmit={submitNewBin} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bin Name *
                </label>
                <input
                  type="text"
                  required
                  value={newBin.name}
                  onChange={(e) => setNewBin(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="e.g., Central Park Waste Bin"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude *
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={newBin.latitude}
                    onChange={(e) => setNewBin(prev => ({ ...prev, latitude: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="28.6139"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      step="any"
                      required
                      value={newBin.longitude}
                      onChange={(e) => setNewBin(prev => ({ ...prev, longitude: e.target.value }))}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="77.2090"
                    />
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="px-3 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      title="Get current location"
                    >
                      📍
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bin Type *
                  </label>
                  <select
                    required
                    value={newBin.type}
                    onChange={(e) => setNewBin(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    {binTypes.map(type => (
                      <option key={type} value={type}>
                        {type.replace('_', '-')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity (Liters)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="1000"
                    value={newBin.capacity}
                    onChange={(e) => setNewBin(prev => ({ ...prev, capacity: parseInt(e.target.value) || 240 }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="240"
                  />
                </div>
              </div>

              {/* Bin Type Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Bin Type Guide:</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div><span className="font-medium text-green-600">WET:</span> Food waste, organic matter</div>
                  <div><span className="font-medium text-blue-600">DRY:</span> Paper, plastic, metal, glass</div>
                  <div><span className="font-medium text-purple-600">RECYCLABLE:</span> Items that can be recycled</div>
                  <div><span className="font-medium text-amber-600">E-WASTE:</span> Electronic devices, batteries</div>
                  <div><span className="font-medium text-red-600">HAZARDOUS:</span> Chemicals, medical waste</div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAddingBin}
                  className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isAddingBin ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4" />
                      <span>Add Bin</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BinMap;
