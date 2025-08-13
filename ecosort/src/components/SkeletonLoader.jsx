import React from 'react';

// Base Skeleton Component with Advanced Animations
const BaseSkeleton = ({ className = '', variant = 'default', children, ...props }) => {
  const variants = {
    default: 'bg-gradient-to-r from-eco-bg-200 via-eco-bg-100 to-eco-bg-200',
    glass: 'bg-gradient-to-r from-white/20 via-white/40 to-white/20 backdrop-blur-sm',
    neon: 'bg-gradient-to-r from-green-100 via-green-200 to-green-100',
    holographic: 'bg-gradient-holographic bg-[length:200%_200%] opacity-20',
    card: 'bg-gradient-to-r from-eco-bg-100 via-white to-eco-bg-100 rounded-eco-lg'
  };

  return (
    <div
      className={`relative overflow-hidden animate-skeleton-pulse ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-skeleton-shimmer" />
    </div>
  );
};

// Text Skeleton Component
export const TextSkeleton = ({ lines = 1, className = '', variant = 'default' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <BaseSkeleton
          key={index}
          variant={variant}
          className={`h-4 rounded-eco ${index === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  );
};

// Card Skeleton Component
export const CardSkeleton = ({ className = '', showHeader = true, showFooter = false, variant = 'card' }) => {
  return (
    <div className={`card p-6 ${className}`}>
      {showHeader && (
        <div className="mb-4 space-y-3">
          <BaseSkeleton variant={variant} className="h-6 w-3/4 rounded-eco" />
          <BaseSkeleton variant={variant} className="h-4 w-1/2 rounded-eco" />
        </div>
      )}
      
      <div className="space-y-3">
        <BaseSkeleton variant={variant} className="h-4 w-full rounded-eco" />
        <BaseSkeleton variant={variant} className="h-4 w-5/6 rounded-eco" />
        <BaseSkeleton variant={variant} className="h-4 w-4/5 rounded-eco" />
      </div>
      
      {showFooter && (
        <div className="mt-6 flex justify-between items-center">
          <BaseSkeleton variant={variant} className="h-8 w-20 rounded-eco" />
          <BaseSkeleton variant={variant} className="h-8 w-24 rounded-eco" />
        </div>
      )}
    </div>
  );
};

// Button Skeleton Component
export const ButtonSkeleton = ({ className = '', variant = 'default', size = 'md' }) => {
  const sizes = {
    sm: 'h-8 w-16',
    md: 'h-10 w-20',
    lg: 'h-12 w-24',
    xl: 'h-14 w-28'
  };

  return (
    <BaseSkeleton 
      variant={variant}
      className={`${sizes[size]} rounded-eco-md ${className}`} 
    />
  );
};

// Avatar Skeleton Component
export const AvatarSkeleton = ({ size = 'md', className = '', variant = 'default' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    xxl: 'w-24 h-24'
  };

  return (
    <BaseSkeleton 
      variant={variant}
      className={`${sizes[size]} rounded-full ${className}`} 
    />
  );
};

// Table Skeleton Component
export const TableSkeleton = ({ rows = 5, columns = 4, className = '', variant = 'default' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 p-4 bg-eco-bg-50 rounded-eco-lg">
        {Array.from({ length: columns }).map((_, index) => (
          <BaseSkeleton 
            key={`header-${index}`}
            variant={variant}
            className="h-4 rounded-eco" 
          />
        ))}
      </div>
      
      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="grid grid-cols-4 gap-4 p-4 border-b border-eco-bg-200">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <BaseSkeleton 
              key={`cell-${rowIndex}-${colIndex}`}
              variant={variant}
              className="h-4 rounded-eco" 
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// List Skeleton Component
export const ListSkeleton = ({ items = 5, showAvatar = false, showIcon = false, className = '', variant = 'default' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-3 p-3 rounded-eco-lg hover:bg-eco-bg-50 transition-colors">
          {showAvatar && <AvatarSkeleton size="md" variant={variant} />}
          {showIcon && <BaseSkeleton variant={variant} className="w-6 h-6 rounded-eco" />}
          
          <div className="flex-1 space-y-2">
            <BaseSkeleton variant={variant} className="h-4 w-3/4 rounded-eco" />
            <BaseSkeleton variant={variant} className="h-3 w-1/2 rounded-eco" />
          </div>
          
          <BaseSkeleton variant={variant} className="h-8 w-16 rounded-eco" />
        </div>
      ))}
    </div>
  );
};

// Stats Skeleton Component
export const StatsSkeleton = ({ stats = 4, className = '', variant = 'card' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${stats} gap-6 ${className}`}>
      {Array.from({ length: stats }).map((_, index) => (
        <div key={index} className="card p-6 text-center">
          <BaseSkeleton variant={variant} className="h-8 w-16 mx-auto mb-2 rounded-eco" />
          <BaseSkeleton variant={variant} className="h-4 w-20 mx-auto rounded-eco" />
        </div>
      ))}
    </div>
  );
};

// Chart Skeleton Component
export const ChartSkeleton = ({ type = 'bar', className = '', variant = 'default' }) => {
  return (
    <div className={`card p-6 ${className}`}>
      {/* Chart Header */}
      <div className="mb-6 space-y-2">
        <BaseSkeleton variant={variant} className="h-6 w-1/3 rounded-eco" />
        <BaseSkeleton variant={variant} className="h-4 w-1/4 rounded-eco" />
      </div>
      
      {/* Chart Content */}
      <div className="space-y-4">
        {type === 'bar' && (
          <div className="flex items-end justify-between h-40 space-x-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <BaseSkeleton 
                key={index}
                variant={variant}
                className={`w-8 rounded-eco-t`}
                style={{ height: `${Math.random() * 80 + 20}%` }}
              />
            ))}
          </div>
        )}
        
        {type === 'line' && (
          <div className="h-40 relative">
            <svg className="w-full h-full" viewBox="0 0 400 160">
              <path
                d="M 50 120 Q 100 80 150 100 T 250 90 T 350 70"
                stroke="url(#skeleton-gradient)"
                strokeWidth="3"
                fill="none"
                className="animate-skeleton-draw"
              />
              <defs>
                <linearGradient id="skeleton-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f3f4f6" />
                  <stop offset="50%" stopColor="#e5e7eb" />
                  <stop offset="100%" stopColor="#f3f4f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
        
        {type === 'pie' && (
          <div className="h-40 flex items-center justify-center">
            <BaseSkeleton variant={variant} className="w-32 h-32 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

// Form Skeleton Component
export const FormSkeleton = ({ fields = 4, className = '', variant = 'default' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="space-y-2">
          <BaseSkeleton variant={variant} className="h-4 w-24 rounded-eco" />
          <BaseSkeleton variant={variant} className="h-12 w-full rounded-eco" />
        </div>
      ))}
      
      <div className="flex space-x-4 pt-4">
        <ButtonSkeleton variant={variant} size="lg" className="flex-1" />
        <ButtonSkeleton variant={variant} size="lg" className="w-24" />
      </div>
    </div>
  );
};

// Navigation Skeleton Component
export const NavigationSkeleton = ({ items = 5, className = '', variant = 'default' }) => {
  return (
    <nav className={`flex space-x-8 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <BaseSkeleton 
          key={index}
          variant={variant}
          className="h-6 w-16 rounded-eco" 
        />
      ))}
    </nav>
  );
};

// Grid Skeleton Component
export const GridSkeleton = ({ 
  items = 6, 
  columns = 3, 
  className = '', 
  variant = 'card',
  showImage = true,
  showContent = true 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="card p-0 overflow-hidden">
          {showImage && (
            <BaseSkeleton variant={variant} className="h-48 w-full rounded-t-eco-lg" />
          )}
          
          {showContent && (
            <div className="p-6 space-y-4">
              <BaseSkeleton variant={variant} className="h-6 w-3/4 rounded-eco" />
              <div className="space-y-2">
                <BaseSkeleton variant={variant} className="h-4 w-full rounded-eco" />
                <BaseSkeleton variant={variant} className="h-4 w-5/6 rounded-eco" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <BaseSkeleton variant={variant} className="h-8 w-20 rounded-eco" />
                <BaseSkeleton variant={variant} className="h-8 w-8 rounded-full" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Page Skeleton Component
export const PageSkeleton = ({ className = '', variant = 'default' }) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-eco-bg-50 via-white to-eco-bg-100 ${className}`}>
      {/* Header Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center space-y-4">
          <BaseSkeleton variant={variant} className="h-12 w-64 mx-auto rounded-eco" />
          <BaseSkeleton variant={variant} className="h-6 w-96 mx-auto rounded-eco" />
        </div>
        
        {/* Stats Skeleton */}
        <StatsSkeleton className="mb-12" variant={variant} />
        
        {/* Content Grid */}
        <GridSkeleton className="mb-12" variant={variant} />
        
        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartSkeleton type="bar" variant={variant} />
          <ChartSkeleton type="pie" variant={variant} />
        </div>
      </div>
    </div>
  );
};

// Leaderboard Skeleton Component
export const LeaderboardSkeleton = ({ className = '', variant = 'default' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Podium Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((position) => (
          <div key={position} className="card p-8 text-center relative">
            <BaseSkeleton variant={variant} className="w-12 h-12 mx-auto mb-4 rounded-full" />
            <AvatarSkeleton size="xxl" className="mx-auto mb-4" variant={variant} />
            <BaseSkeleton variant={variant} className="h-6 w-32 mx-auto mb-2 rounded-eco" />
            <BaseSkeleton variant={variant} className="h-8 w-20 mx-auto mb-4 rounded-eco" />
            <div className="flex justify-center space-x-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <BaseSkeleton key={i} variant={variant} className="w-6 h-6 rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Rankings List */}
      <div className="card p-6">
        <BaseSkeleton variant={variant} className="h-6 w-48 mb-6 rounded-eco" />
        <ListSkeleton items={8} showAvatar={true} variant={variant} />
      </div>
    </div>
  );
};

export default BaseSkeleton;
