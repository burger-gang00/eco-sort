import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  Menu, 
  X, 
  User, 
  MapPin, 
  BarChart3, 
  Recycle, 
  Trophy,
  Coins,
  LogOut,
  Settings,
  ChevronDown,
  Award,
  Gem,
  DollarSign,
  Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  // Navigation items
  const navItems = [
    { 
      path: '/waste-guide', 
      label: 'Waste Guide', 
      icon: Recycle,
      description: 'Learn about waste types'
    },
    { 
      path: '/bin-map', 
      label: 'Bin Locator', 
      icon: MapPin,
      description: 'Find nearby bins'
    },
    { 
      path: '/valuable-guide', 
      label: 'Valuable Materials', 
      icon: Gem,
      description: 'Discover valuable recyclables'
    },
    { 
      path: '/scrap-prices', 
      label: 'Scrap Prices', 
      icon: DollarSign,
      description: 'Current market rates'
    }
  ];

  const authenticatedNavItems = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: BarChart3,
      description: 'Your eco stats'
    },
    { 
      path: '/points-tracker', 
      label: 'Track Points', 
      icon: Plus,
      description: 'Earn eco points'
    },
    { 
      path: '/leaderboard', 
      label: 'Leaderboard', 
      icon: Trophy,
      description: 'Eco champions'
    }
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const NavLink = ({ item, mobile = false }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <Link
        to={item.path}
        className={`group relative flex items-center space-x-3 px-4 py-2 rounded-eco-md transition-all duration-300 ${
          mobile 
            ? 'w-full hover:bg-eco-primary/10 hover:text-eco-primary' 
            : 'hover:bg-eco-bg-100'
        } ${
          isActive 
            ? mobile 
              ? 'bg-eco-primary text-white' 
              : 'text-eco-primary bg-eco-bg-100'
            : 'text-eco-text-secondary hover:text-eco-primary'
        }`}
      >
        <item.icon className={`w-5 h-5 ${mobile ? '' : 'group-hover:scale-110'} transition-transform duration-300`} />
        <div className={mobile ? '' : 'hidden lg:block'}>
          <div className="font-medium text-sm">{item.label}</div>
          {mobile && (
            <div className="text-xs opacity-75">{item.description}</div>
          )}
        </div>
        
        {/* Active indicator */}
        {isActive && !mobile && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute bottom-0 left-1/2 w-6 h-0.5 bg-eco-primary rounded-full"
            style={{ transform: 'translateX(-50%)' }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-eco border-b border-eco-bg-200/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/waste-guide" 
                className="flex items-center space-x-3 group"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-eco rounded-eco-md flex items-center justify-center shadow-eco group-hover:shadow-eco-glow transition-all duration-300">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-eco rounded-eco-md opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"></div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl lg:text-2xl font-display font-bold text-gradient">
                    EcoSort
                  </h1>
                  <p className="text-xs text-eco-text-tertiary -mt-1">
                    Smart Waste Management
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
              {isAuthenticated && authenticatedNavItems.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* User Menu or Auth Buttons */}
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 px-4 py-2 bg-gradient-eco text-white rounded-eco-md shadow-eco hover:shadow-eco-glow transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium">{user?.name || 'User'}</div>
                      <div className="text-xs opacity-75 flex items-center space-x-1">
                        <Award className="w-3 h-3" />
                        <span>{user?.points || 0} points</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </motion.button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-eco-lg shadow-eco-lg border border-eco-bg-200/50 overflow-hidden"
                      >
                        <div className="p-4 bg-gradient-eco text-white">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="font-medium">{user?.name}</div>
                              <div className="text-sm opacity-75">{user?.email}</div>
                              <div className="text-sm opacity-90 mt-1 flex items-center space-x-1">
                                <Award className="w-4 h-4" />
                                <span>{user?.points || 0} Eco Points</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <Link
                            to="/profile"
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-eco-bg-50 rounded-eco text-eco-text-secondary hover:text-eco-primary transition-colors duration-300"
                          >
                            <Settings className="w-5 h-5" />
                            <span>Profile Settings</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 rounded-eco text-eco-text-secondary hover:text-red-600 transition-colors duration-300"
                          >
                            <LogOut className="w-5 h-5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="btn-ghost"
                  >
                    Sign In
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/register"
                      className="btn-primary"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-eco text-eco-text-secondary hover:text-eco-primary hover:bg-eco-bg-100 transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="absolute right-0 top-0 h-full w-80 max-w-sm bg-white shadow-eco-xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-eco-bg-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-eco rounded-eco-md flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-gradient">EcoSort</h2>
                      <p className="text-xs text-eco-text-tertiary">Smart Waste Management</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-eco text-eco-text-secondary hover:text-eco-primary hover:bg-eco-bg-100 transition-colors duration-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 p-6 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NavLink item={item} mobile />
                    </motion.div>
                  ))}
                  
                  {isAuthenticated && (
                    <>
                      <div className="my-4 h-px bg-eco-bg-200" />
                      {authenticatedNavItems.map((item, index) => (
                        <motion.div
                          key={item.path}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (navItems.length + index) * 0.1 }}
                        >
                          <NavLink item={item} mobile />
                        </motion.div>
                      ))}
                    </>
                  )}
                </div>

                {/* Mobile Auth Section */}
                {!isAuthenticated && (
                  <div className="p-6 border-t border-eco-bg-200 space-y-3">
                    <Link
                      to="/login"
                      className="w-full btn-outline text-center block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="w-full btn-primary text-center block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}

                {/* Mobile User Info */}
                {isAuthenticated && (
                  <div className="p-6 border-t border-eco-bg-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-eco rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-eco-text-primary">{user?.name}</div>
                        <div className="text-sm text-eco-text-tertiary">{user?.email}</div>
                        <div className="text-sm text-eco-primary font-medium mt-1 flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>{user?.points || 0} Eco Points</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-eco-bg-50 rounded-eco text-eco-text-secondary hover:text-eco-primary transition-colors duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="w-5 h-5" />
                        <span>Profile Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 rounded-eco text-eco-text-secondary hover:text-red-600 transition-colors duration-300"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
