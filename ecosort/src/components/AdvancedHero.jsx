import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Leaf, 
  Zap, 
  Globe, 
  Sparkles, 
  ArrowRight,
  Play,
  Star,
  Award,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';

const AdvancedHero = () => {
  const [particleCount] = useState(50);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate particle positions
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  const statsData = [
    {
      icon: Users,
      value: "10K+",
      label: "Active Users",
      gradient: "from-blue-400 to-blue-600",
      delay: 0.2
    },
    {
      icon: Leaf,
      value: "1M+",
      label: "Items Sorted",
      gradient: "from-green-400 to-green-600",
      delay: 0.4
    },
    {
      icon: Award,
      value: "50K+",
      label: "Points Earned",
      gradient: "from-yellow-400 to-yellow-600",
      delay: 0.6
    },
    {
      icon: Target,
      value: "95%",
      label: "Accuracy Rate",
      gradient: "from-purple-400 to-purple-600",
      delay: 0.8
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-eco-bg-50 via-white to-eco-bg-100">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 hero-mesh opacity-20" />
      
      {/* Interactive Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-eco opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        ))}
      </div>

      {/* Interactive Light Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(5, 150, 105, 0.1), transparent 40%)`
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Column - Text Content */}
          <motion.div 
            ref={heroRef}
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -100 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-holographic bg-[length:200%_200%] text-white px-6 py-2 rounded-full text-sm font-medium mb-8 animate-holographic"
              initial={{ scale: 0 }}
              animate={heroInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Revolutionary Eco Platform</span>
              <Sparkles className="w-4 h-4" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-5xl md:text-7xl font-display font-black mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="block text-gradient-holographic">
                Sort Smart,
              </span>
              <span className="block text-eco-text-primary">
                Live Green
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-eco-text-secondary mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Transform your waste management with AI-powered sorting, 
              <span className="text-gradient font-semibold"> earn rewards</span>, 
              and join the revolution for a sustainable future.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <button className="btn-holographic group">
                <span>Start Sorting</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="btn-neuro group">
                <Play className="w-5 h-5 mr-2" />
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Feature Pills */}
            <motion.div 
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {['AI-Powered', 'Real Rewards', 'Eco Impact', 'Community Driven'].map((feature, index) => (
                <motion.span
                  key={feature}
                  className="badge-glass"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {feature}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive 3D Element */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 100 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 1 }}
          >
            {/* Main Visual Element */}
            <div className="relative w-full max-w-lg mx-auto">
              {/* Central Orb */}
              <motion.div
                className="w-80 h-80 mx-auto bg-gradient-holographic bg-[length:200%_200%] rounded-full animate-holographic relative overflow-hidden"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                {/* Inner glow */}
                <div className="absolute inset-4 bg-gradient-eco rounded-full opacity-50 animate-pulse" />
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  >
                    <Globe className="w-24 h-24 text-white drop-shadow-2xl" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Orbiting Elements */}
              {[Leaf, Zap, Star].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="absolute w-16 h-16 bg-glass rounded-full flex items-center justify-center border border-white/30 shadow-glass"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 10 + index * 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, -360],
                    }}
                    transition={{
                      duration: 10 + index * 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      transformOrigin: `${120 + index * 40}px 0px`,
                    }}
                  >
                    <Icon className="w-8 h-8 text-eco-primary" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 card-glass"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: stat.delay, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotateY: 10 }}
            >
              <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${stat.gradient} rounded-full flex items-center justify-center shadow-eco-glow`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-eco-text-tertiary text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default AdvancedHero;
