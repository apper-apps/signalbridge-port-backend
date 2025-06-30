import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/molecules/StatCard';
import SignalMonitor from '@/components/organisms/SignalMonitor';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize dashboard data
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Small delay to ensure all components are ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        setIsLoading(false);
      } catch (err) {
        console.error('Dashboard initialization error:', err);
        setError('Failed to load dashboard');
        setIsLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  const stats = [
    {
      title: 'Active Signals',
      value: '12',
      change: '+3 today',
      changeType: 'positive',
      icon: 'TrendingUp',
      trend: true
    },
    {
      title: 'Connected Accounts',
      value: '24',
      change: '+2 this week',
      changeType: 'positive',
      icon: 'Users',
      trend: true
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+1.2%',
      changeType: 'positive',
      icon: 'Target',
      trend: true
    },
    {
      title: 'Daily Volume',
      value: '156',
      change: '12 pending',
      changeType: 'neutral',
      icon: 'BarChart3',
      trend: false
    }
];

  if (isLoading) {
    return <Loading type="page" />;
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="bg-surface-500 rounded-lg p-6 border border-surface-600">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Trading Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Monitor your MT5 signal distribution and account performance in real-time
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Last Updated</p>
            <p className="text-lg font-semibold text-white">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

{/* Signal Monitor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="bg-surface-500 rounded-lg border border-surface-600 overflow-hidden">
          <SignalMonitor />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;