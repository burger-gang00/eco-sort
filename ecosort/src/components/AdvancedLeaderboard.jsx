import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Filter,
  Search,
  Users,
  Flame
} from 'lucide-react';
import { LeaderboardSkeleton, AvatarSkeleton, TextSkeleton, CardSkeleton } from './SkeletonLoader';

const AdvancedLeaderboard = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const [leaderboardRef, leaderboardInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [podiumRef, podiumInView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    const mockUsers = [
      { 
        id: 1, 
        rank: 1, 
        name: 'EcoMaster Pro', 
        avatar: '🌟',
        points: 2847, 
        logs: 156, 
        streak: 28,
        level: 'Platinum',
        badges: ['♻️', '🌱', '⚡', '🏆'],
        joinedDays: 89,
        accuracy: 98.5,
        impact: 'Saved 245kg CO2'
      },
      { 
        id: 2, 
        rank: 2, 
        name: 'Green Ninja', 
        avatar: '🥷',
        points: 2156, 
        logs: 134, 
        streak: 21,
        level: 'Gold',
        badges: ['♻️', '🌱', '⚡'],
        joinedDays: 67,
        accuracy: 96.8,
        impact: 'Saved 198kg CO2'
      },
      { 
        id: 3, 
        rank: 3, 
        name: 'Waste Wizard', 
        avatar: '🧙‍♂️',
        points: 1923, 
        logs: 121, 
        streak: 15,
        level: 'Gold',
        badges: ['♻️', '🌱'],
        joinedDays: 54,
        accuracy: 95.2,
        impact: 'Saved 167kg CO2'
      },
      { 
        id: 4, 
        rank: 4, 
        name: 'Planet Guardian', 
        avatar: '🛡️',
        points: 1687, 
        logs: 98, 
        streak: 12,
        level: 'Silver',
        badges: ['♻️', '🌱'],
        joinedDays: 43,
        accuracy: 94.1,
        impact: 'Saved 134kg CO2'
      },
      { 
        id: 5, 
        rank: 5, 
        name: 'Eco Champion', 
        avatar: '🏆',
        points: 1534, 
        logs: 87, 
        streak: 9,
        level: 'Silver',
        badges: ['♻️'],
        joinedDays: 38,
        accuracy: 92.7,
        impact: 'Saved 112kg CO2'
      },
      { 
        id: 6, 
        rank: 6, 
        name: 'Nature Hero', 
        avatar: '🦸‍♀️',
        points: 1289, 
        logs: 76, 
        streak: 7,
        level: 'Bronze',
        badges: ['♻️'],
        joinedDays: 31,
        accuracy: 91.3,
        impact: 'Saved 95kg CO2'
      },
      { 
        id: 7, 
        rank: 7, 
        name: 'Green Warrior', 
        avatar: '⚔️',
        points: 1156, 
        logs: 68, 
        streak: 5,
        level: 'Bronze',
        badges: ['♻️'],
        joinedDays: 27,
        accuracy: 89.8,
        impact: 'Saved 81kg CO2'
      },
      { 
        id: 8, 
        rank: 8, 
        name: 'Eco Defender', 
        avatar: '🛡️',
        points: 987, 
        logs: 59, 
        streak: 4,
        level: 'Bronze',
        badges: ['🌱'],
        joinedDays: 23,
        accuracy: 88.2,
        impact: 'Saved 67kg CO2'
      }
    ];
    
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1500);
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-400 drop-shadow-lg" size={28} />;
      case 2:
        return <Trophy className="text-gray-400 drop-shadow-lg" size={26} />;
      case 3:
        return <Medal className="text-orange-400 drop-shadow-lg" size={24} />;
      default:
        return (
          <div className="w-8 h-8 bg-gradient-eco rounded-full flex items-center justify-center text-white font-bold text-sm">
            {rank}
          </div>
        );
    }
  };

  const getRankGradient = (rank) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 via-yellow-500 to-yellow-600';
      case 2:
        return 'from-gray-300 via-gray-400 to-gray-500';
      case 3:
        return 'from-orange-400 via-orange-500 to-orange-600';
      default:
        return 'from-eco-primary via-eco-primary-light to-eco-primary';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Platinum':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'Gold':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 'Silver':
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 'Bronze':
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-gradient-eco text-white';
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'all' || user.level.toLowerCase() === filter)
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-eco-bg-50 via-white to-eco-bg-100">
        {/* Hero Section Skeleton */}
        <section className="relative pb-12 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-eco-bg-200 via-eco-bg-300 to-eco-bg-200 rounded-eco-xl animate-skeleton-shimmer mb-6" />
              <TextSkeleton width="300px" height="48px" className="mx-auto mb-4" variant="holographic" />
              <TextSkeleton width="500px" height="20px" className="mx-auto" />
            </div>
          </div>
        </section>

        {/* Search and Filter Skeleton */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 mb-12">
          <div className="card-glass p-6 space-y-4">
            <CardSkeleton height="48px" variant="glass" />
            <div className="flex space-x-2">
              {[...Array(4)].map((_, i) => (
                <CardSkeleton key={i} width="100px" height="36px" />
              ))}
            </div>
          </div>
        </section>

        {/* Leaderboard Skeleton */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Podium Skeleton */}
          <div className="mb-12">
            <div className="flex items-end justify-center space-x-8 mb-8">
              {/* Second Place */}
              <div className="text-center">
                <AvatarSkeleton size="lg" variant="neon" className="mx-auto mb-4" />
                <div className="w-20 h-24 bg-gradient-to-t from-eco-bg-200 to-eco-bg-300 rounded-t-eco-xl animate-skeleton-pulse" />
              </div>
              {/* First Place */}
              <div className="text-center">
                <AvatarSkeleton size="xl" variant="holographic" className="mx-auto mb-4" />
                <div className="w-24 h-32 bg-gradient-to-t from-eco-bg-200 to-eco-bg-300 rounded-t-eco-xl animate-skeleton-wave" />
              </div>
              {/* Third Place */}
              <div className="text-center">
                <AvatarSkeleton size="lg" variant="glass" className="mx-auto mb-4" />
                <div className="w-20 h-20 bg-gradient-to-t from-eco-bg-200 to-eco-bg-300 rounded-t-eco-xl animate-skeleton-shimmer" />
              </div>
            </div>
          </div>

          {/* Leaderboard List Skeleton */}
          <LeaderboardSkeleton 
            count={10} 
            showAvatar={true}
            showRank={true}
            showStats={true}
            variant="card"
            animate="wave"
          />
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-bg-50 via-white to-eco-bg-100">
      {/* Hero Section */}
      <section className="relative pb-12 overflow-hidden">
        <div className="absolute inset-0 hero-mesh opacity-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-holographic bg-[length:200%_200%] text-white px-6 py-3 rounded-full text-sm font-medium mb-6 animate-holographic"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            >
              <Flame className="w-5 h-5" />
              <span>Global Champions</span>
              <Trophy className="w-5 h-5" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-display font-black mb-4">
              <span className="text-gradient-holographic">Ultimate</span>{' '}
              <span className="text-eco-text-primary">Leaderboard</span>
            </h1>
            
            <p className="text-xl text-eco-text-secondary mb-8 max-w-3xl mx-auto">
              Witness the rise of eco-warriors who are transforming the world one sort at a time.
              Join the elite ranks and make your mark on sustainability!
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div 
            className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-eco-text-tertiary w-4 h-4" />
              <input
                type="text"
                placeholder="Search champions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-64"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-eco-text-tertiary w-4 h-4" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input w-40"
              >
                <option value="all">All Levels</option>
                <option value="platinum">Platinum</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="bronze">Bronze</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Podium Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div 
          ref={podiumRef}
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={podiumInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {filteredUsers.slice(0, 3).map((user, index) => (
              <motion.div
                key={user.id}
                className={`relative p-8 rounded-eco-2xl shadow-eco-xl border-2 transition-all duration-500 hover:shadow-eco-glow hover:-translate-y-4 cursor-pointer group ${
                  user.rank === 1 ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100' :
                  user.rank === 2 ? 'border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100' :
                  'border-orange-400 bg-gradient-to-br from-orange-50 to-orange-100'
                }`}
                initial={{ y: 100, opacity: 0 }}
                animate={podiumInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedUser(user)}
              >
                {/* Rank Badge */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getRankGradient(user.rank)} rounded-full flex items-center justify-center shadow-lg`}>
                    {getRankIcon(user.rank)}
                  </div>
                </div>

                {/* Level Badge */}
                <div className="absolute -top-3 -right-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${getLevelColor(user.level)} shadow-lg`}>
                    {user.level}
                  </div>
                </div>

                <div className="text-center mt-4">
                  {/* Avatar */}
                  <div className="text-6xl mb-4 animate-bounce-gentle">
                    {user.avatar}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-eco-text-primary mb-2 group-hover:text-gradient transition-all">
                    {user.name}
                  </h3>

                  {/* Stats */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-eco-text-tertiary text-sm">Points</span>
                      <div className="text-2xl font-bold text-gradient">
                        <CountUp start={0} end={user.points} duration={2} />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-eco-text-tertiary text-sm">Accuracy</span>
                      <div className="text-lg font-semibold text-eco-success">
                        {user.accuracy}%
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-eco-text-tertiary text-sm">Streak</span>
                      <div className="flex items-center space-x-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="font-bold text-orange-600">{user.streak}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex justify-center space-x-1 mb-4">
                    {user.badges.map((badge, badgeIndex) => (
                      <motion.span
                        key={badgeIndex}
                        className="text-lg"
                        whileHover={{ scale: 1.3, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {badge}
                      </motion.span>
                    ))}
                  </div>

                  {/* Impact */}
                  <div className="text-xs text-eco-text-tertiary bg-eco-bg-100 rounded-full px-3 py-1 inline-block">
                    {user.impact}
                  </div>
                </div>

                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-eco-2xl opacity-0 group-hover:opacity-20 bg-gradient-to-r ${getRankGradient(user.rank)} transition-opacity duration-300`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Full Leaderboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          ref={leaderboardRef}
          variants={containerVariants}
          initial="hidden"
          animate={leaderboardInView ? "show" : "hidden"}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-eco-text-primary flex items-center space-x-2">
              <Users className="w-6 h-6 text-eco-primary" />
              <span>Global Rankings</span>
            </h2>
            <div className="text-eco-text-tertiary text-sm">
              {filteredUsers.length} Champions
            </div>
          </div>

          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                variants={itemVariants}
                className="flex items-center justify-between p-4 rounded-eco-lg bg-gradient-to-r from-white to-eco-bg-50 border border-eco-bg-200 hover:shadow-eco-lg hover:border-eco-primary/30 transition-all duration-300 cursor-pointer group"
                whileHover={{ scale: 1.02, x: 10 }}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    {getRankIcon(user.rank)}
                  </div>

                  {/* Avatar & Info */}
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{user.avatar}</div>
                    <div>
                      <div className="font-semibold text-eco-text-primary group-hover:text-eco-primary transition-colors">
                        {user.name}
                      </div>
                      <div className="text-sm text-eco-text-tertiary flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(user.level)}`}>
                          {user.level}
                        </span>
                        <span>•</span>
                        <span>{user.joinedDays} days</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-8 text-right">
                  <div>
                    <div className="text-sm text-eco-text-tertiary">Points</div>
                    <div className="font-bold text-eco-primary">
                      {user.points.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-eco-text-tertiary">Accuracy</div>
                    <div className="font-bold text-eco-success">{user.accuracy}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-eco-text-tertiary">Streak</div>
                    <div className="font-bold text-orange-600 flex items-center space-x-1">
                      <Flame className="w-4 h-4" />
                      <span>{user.streak}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              className="bg-white rounded-eco-xl p-8 max-w-md w-full shadow-eco-2xl"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{selectedUser.avatar}</div>
                <h3 className="text-2xl font-bold text-eco-text-primary mb-2">
                  {selectedUser.name}
                </h3>
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getLevelColor(selectedUser.level)} mb-6`}>
                  {selectedUser.level} Level Champion
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-eco-bg-50 rounded-eco">
                    <div className="text-2xl font-bold text-eco-primary mb-1">
                      {selectedUser.points.toLocaleString()}
                    </div>
                    <div className="text-sm text-eco-text-tertiary">Total Points</div>
                  </div>
                  <div className="text-center p-4 bg-eco-bg-50 rounded-eco">
                    <div className="text-2xl font-bold text-eco-success mb-1">
                      {selectedUser.accuracy}%
                    </div>
                    <div className="text-sm text-eco-text-tertiary">Accuracy</div>
                  </div>
                  <div className="text-center p-4 bg-eco-bg-50 rounded-eco">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {selectedUser.streak}
                    </div>
                    <div className="text-sm text-eco-text-tertiary">Day Streak</div>
                  </div>
                  <div className="text-center p-4 bg-eco-bg-50 rounded-eco">
                    <div className="text-2xl font-bold text-eco-secondary mb-1">
                      {selectedUser.logs}
                    </div>
                    <div className="text-sm text-eco-text-tertiary">Items Sorted</div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm text-eco-text-tertiary mb-2">Environmental Impact</div>
                  <div className="text-lg font-semibold text-eco-primary">
                    {selectedUser.impact}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedUser(null)}
                  className="btn-primary w-full"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedLeaderboard;
