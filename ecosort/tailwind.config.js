/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors - Enhanced with more variants
        'eco-primary': {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        
        // Secondary Colors - Enhanced
        'eco-secondary': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        
        // Accent Colors - Enhanced
        'eco-accent': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        
        // Special Effects Colors
        'neon': {
          'green': '#39ff14',
          'blue': '#1b03a3',
          'pink': '#ff10f0',
          'purple': '#bc13fe',
          'orange': '#ff8c00',
        },
        
        // Holographic Colors
        'holographic': {
          'pink': '#ff006e',
          'blue': '#3a86ff',
          'purple': '#8338ec',
          'yellow': '#ffbe0b',
          'green': '#06ffa5',
        },
        
        // Status Colors - Enhanced
        'eco-success': {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        'eco-warning': {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        'eco-error': {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
        'eco-info': {
          50: '#ecfeff',
          500: '#06b6d4',
          600: '#0891b2',
        },
        
        // Advanced Background Colors
        'eco-bg': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        
        // Text Colors - Enhanced
        'eco-text': {
          primary: '#0f172a',
          secondary: '#475569',
          tertiary: '#64748b',
          quaternary: '#94a3b8',
          light: '#cbd5e1',
          'ultra-light': '#e2e8f0',
        },
        
        // Glass Effects - Enhanced
        'glass': {
          'white': 'rgba(255, 255, 255, 0.1)',
          'black': 'rgba(0, 0, 0, 0.1)',
          'eco': 'rgba(5, 150, 105, 0.1)',
          'blue': 'rgba(14, 165, 233, 0.1)',
          'purple': 'rgba(139, 92, 246, 0.1)',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['5.5rem', { lineHeight: '1', fontWeight: '900', letterSpacing: '-0.025em' }],
        'display-xl': ['4.5rem', { lineHeight: '1', fontWeight: '800', letterSpacing: '-0.025em' }],
        'display-lg': ['3.75rem', { lineHeight: '1', fontWeight: '800', letterSpacing: '-0.025em' }],
        'display-md': ['3rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.025em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.025em' }],
        'title': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'subtitle': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      boxShadow: {
        'eco-xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'eco-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'eco': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'eco-md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'eco-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'eco-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'eco-2xl': '0 35px 60px -12px rgba(0, 0, 0, 0.3)',
        
        // Glow Effects
        'eco-glow': '0 0 20px rgba(5, 150, 105, 0.4)',
        'eco-glow-lg': '0 0 30px rgba(5, 150, 105, 0.6)',
        'eco-glow-xl': '0 0 40px rgba(5, 150, 105, 0.8)',
        'neon-green': '0 0 20px #39ff14, 0 0 40px #39ff14, 0 0 80px #39ff14',
        'neon-blue': '0 0 20px #1b03a3, 0 0 40px #1b03a3, 0 0 80px #1b03a3',
        'neon-pink': '0 0 20px #ff10f0, 0 0 40px #ff10f0, 0 0 80px #ff10f0',
        
        // Glass Effects
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 25px 45px 0 rgba(31, 38, 135, 0.25)',
        'glass-xl': '0 35px 60px 0 rgba(31, 38, 135, 0.15)',
        
        // Neumorphism
        'neuro': '20px 20px 60px #c8d0e0, -20px -20px 60px #ffffff',
        'neuro-inset': 'inset 20px 20px 60px #c8d0e0, inset -20px -20px 60px #ffffff',
        'neuro-sm': '8px 8px 16px #c8d0e0, -8px -8px 16px #ffffff',
        
        // Holographic
        'holographic': '0 0 30px rgba(255, 0, 110, 0.3), 0 0 60px rgba(58, 134, 255, 0.2), 0 0 90px rgba(131, 56, 236, 0.1)',
      },
      borderRadius: {
        'eco-xs': '4px',
        'eco-sm': '8px',
        'eco': '12px',
        'eco-md': '16px',
        'eco-lg': '20px',
        'eco-xl': '24px',
        'eco-2xl': '32px',
        'eco-3xl': '40px',
        'organic': '63% 37% 54% 46% / 55% 48% 52% 45%',
        'blob': '30% 70% 70% 30% / 30% 30% 70% 70%',
      },
      animation: {
        // Basic animations - enhanced
        'bounce-slow': 'bounce 3s infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'pulse-eco': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        
        // Fade animations
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        'fade-in-right': 'fadeInRight 0.6s ease-out',
        
        // Slide animations
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'slide-in-up': 'slideInUp 0.4s ease-out',
        'slide-in-down': 'slideInDown 0.4s ease-out',
        
        // Scale animations
        'scale-in': 'scaleIn 0.3s ease-out',
        'scale-in-center': 'scaleInCenter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'scale-up': 'scaleUp 0.2s ease-out',
        
        // Special effects
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'wobble': 'wobble 1s ease-in-out',
        
        // Glow animations
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'neon-glow': 'neonGlow 1.5s ease-in-out infinite alternate',
        
        // Text effects
        'shimmer': 'shimmer 2s linear infinite',
        'shimmer-slow': 'shimmer 3s linear infinite',
        'typing': 'typing 3.5s steps(40, end), blink 0.75s step-end infinite',
        'typewriter': 'typewriter 4s steps(44) 1s 1 normal both',
        
        // Background effects
        'gradient-shift': 'gradientShift 8s ease infinite',
        'gradient-x': 'gradientX 3s ease infinite',
        'gradient-y': 'gradientY 3s ease infinite',
        'gradient-xy': 'gradientXY 3s ease infinite',
        
        // Morphing animations
        'morph': 'morph 8s ease-in-out infinite',
        'blob': 'blob 7s ease-in-out infinite',
        
        // Particle effects
        'particle-float': 'particleFloat 20s linear infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        
        // Rotation animations
        'spin-slow': 'spin 3s linear infinite',
        'spin-reverse': 'spinReverse 1s linear infinite',
        'rotate-y': 'rotateY 2s ease-in-out infinite',
        
        // Elastic animations
        'elastic': 'elastic 1s ease-in-out',
        'rubber-band': 'rubberBand 1s ease-in-out',
        
        // Holographic effect
        'holographic': 'holographic 3s ease-in-out infinite',
        'rainbow-shift': 'rainbowShift 5s linear infinite',
        
        // Skeleton loading animations
        'skeleton-pulse': 'skeletonPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'skeleton-shimmer': 'skeletonShimmer 2s linear infinite',
        'skeleton-wave': 'skeletonWave 1.6s linear infinite',
        'skeleton-draw': 'skeletonDraw 3s ease-in-out infinite',
      },
      keyframes: {
        // Basic fade animations
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        
        // Slide animations
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        
        // Scale animations
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleInCenter: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        
        // Bounce animations
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(-5%)' },
        },
        
        // Float animations
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(0deg) translateY(0px)' },
          '25%': { transform: 'rotate(1deg) translateY(-5px)' },
          '75%': { transform: 'rotate(-1deg) translateY(-5px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(50px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(50px) rotate(-360deg)' },
        },
        wobble: {
          '0%': { transform: 'translateX(0%)' },
          '15%': { transform: 'translateX(-25%) rotate(-5deg)' },
          '30%': { transform: 'translateX(20%) rotate(3deg)' },
          '45%': { transform: 'translateX(-15%) rotate(-3deg)' },
          '60%': { transform: 'translateX(10%) rotate(2deg)' },
          '75%': { transform: 'translateX(-5%) rotate(-1deg)' },
          '100%': { transform: 'translateX(0%)' },
        },
        
        // Glow animations
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(5, 150, 105, 0.4)' },
          '100%': { boxShadow: '0 0 30px rgba(5, 150, 105, 0.8)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(5, 150, 105, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(5, 150, 105, 0.8), 0 0 60px rgba(5, 150, 105, 0.4)' },
        },
        neonGlow: {
          '0%': { 
            textShadow: '0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14',
            filter: 'hue-rotate(0deg)'
          },
          '100%': { 
            textShadow: '0 0 20px #39ff14, 0 0 30px #39ff14, 0 0 40px #39ff14',
            filter: 'hue-rotate(360deg)'
          },
        },
        
        // Shimmer effects
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        
        // Typing effects
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        },
        blink: {
          '50%': { borderColor: 'transparent' }
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        },
        
        // Gradient animations
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '100% 50%' },
          '50%': { backgroundPosition: '50% 0%' },
          '75%': { backgroundPosition: '50% 100%' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientY: {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        gradientXY: {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '25%': { backgroundPosition: '100% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '0% 100%' },
        },
        
        // Morphing animations
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        
        // Particle effects
        particleFloat: {
          '0%': { transform: 'translateY(0px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) rotate(360deg)', opacity: '0' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        
        // Rotation animations
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        rotateY: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        
        // Elastic animations
        elastic: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.25)' },
          '75%': { transform: 'scale(0.75)' },
          '100%': { transform: 'scale(1)' },
        },
        rubberBand: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scaleX(1.25) scaleY(0.75)' },
          '40%': { transform: 'scaleX(0.75) scaleY(1.25)' },
          '50%': { transform: 'scaleX(1.15) scaleY(0.85)' },
          '65%': { transform: 'scaleX(0.95) scaleY(1.05)' },
          '75%': { transform: 'scaleX(1.05) scaleY(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        
        // Holographic effect
        holographic: {
          '0%, 100%': { 
            backgroundPosition: '0% 50%',
            filter: 'hue-rotate(0deg)',
          },
          '50%': { 
            backgroundPosition: '100% 50%',
            filter: 'hue-rotate(180deg)',
          },
        },
        rainbowShift: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        
        // Skeleton loading keyframes
        skeletonPulse: {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.4'
          },
        },
        skeletonShimmer: {
          '0%': {
            transform: 'translateX(-100%)'
          },
          '100%': {
            transform: 'translateX(100%)'
          },
        },
        skeletonWave: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '50%': {
            opacity: '1'
          },
          '100%': {
            transform: 'translateX(100%)',
            opacity: '0'
          },
        },
        skeletonDraw: {
          '0%': {
            strokeDasharray: '0 1000',
            opacity: '0'
          },
          '50%': {
            opacity: '1'
          },
          '100%': {
            strokeDasharray: '1000 0',
            opacity: '0'
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      backgroundImage: {
        // Eco gradients
        'gradient-eco': 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        'gradient-eco-reverse': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-eco-radial': 'radial-gradient(circle, #10b981 0%, #059669 100%)',
        
        // Secondary gradients
        'gradient-secondary': 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
        'gradient-secondary-reverse': 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
        
        // Accent gradients
        'gradient-accent': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        'gradient-accent-reverse': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        
        // Multi-color gradients
        'gradient-rainbow': 'linear-gradient(135deg, #ff006e 0%, #8338ec 25%, #3a86ff 50%, #06ffa5 75%, #ffbe0b 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-forest': 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
        
        // Holographic gradients
        'gradient-holographic': 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #ff006e)',
        'gradient-chrome': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'gradient-neon': 'linear-gradient(135deg, #39ff14 0%, #1b03a3 50%, #ff10f0 100%)',
        
        // Complex mesh gradients
        'gradient-mesh': 'radial-gradient(at 40% 20%, #059669 0px, transparent 50%), radial-gradient(at 80% 0%, #0ea5e9 0px, transparent 50%), radial-gradient(at 0% 50%, #f59e0b 0px, transparent 50%), radial-gradient(at 80% 50%, #22c55e 0px, transparent 50%), radial-gradient(at 0% 100%, #06b6d4 0px, transparent 50%), radial-gradient(at 80% 100%, #8b5cf6 0px, transparent 50%), radial-gradient(at 0% 0%, #ef4444 0px, transparent 50%)',
        'gradient-mesh-2': 'radial-gradient(at 20% 80%, #8b5cf6 0px, transparent 50%), radial-gradient(at 80% 20%, #06b6d4 0px, transparent 50%), radial-gradient(at 40% 40%, #10b981 0px, transparent 50%)',
        'gradient-mesh-3': 'conic-gradient(from 180deg at 50% 50%, #8b5cf6 0deg, #06b6d4 60deg, #10b981 120deg, #f59e0b 180deg, #ef4444 240deg, #ec4899 300deg, #8b5cf6 360deg)',
        
        // Pattern gradients
        'gradient-diagonal': 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(5, 150, 105, 0.1) 2px, rgba(5, 150, 105, 0.1) 4px)',
        'gradient-dots': 'radial-gradient(circle at 2px 2px, rgba(5, 150, 105, 0.15) 1px, transparent 1px)',
        
        // Shimmer effects
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        'shimmer-gold': 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent)',
        'shimmer-rainbow': 'linear-gradient(90deg, transparent, rgba(255, 0, 110, 0.4), rgba(58, 134, 255, 0.4), rgba(6, 255, 165, 0.4), transparent)',
        
        // Noise textures
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
        '224': '56rem',
        '240': '60rem',
      },
      
      // Custom properties for advanced effects
      content: {
        'empty-string': '""',
      },
      
      // Custom transforms
      transformOrigin: {
        'center-center': 'center center',
        'top-left-1/4': '25% 25%',
      },
      
      // Custom filters
      filter: {
        'none': 'none',
        'holographic': 'hue-rotate(0deg) saturate(1.5) brightness(1.2)',
      },
      
      // Custom backdrop filters
      backdropSaturate: {
        '150': '1.5',
        '200': '2',
      },
      
      // Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}
