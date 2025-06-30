import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon, 
  trend,
  className = '' 
}) => {
  const changeColors = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-gray-400'
  };

  return (
    <motion.div
      className={`bg-surface-500 border border-surface-600 rounded-lg p-6 shadow-card hover:shadow-premium transition-all duration-300 ${className}`}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white mb-2">{value}</p>
          
          {change && (
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${changeColors[changeType]}`}>
                {change}
              </span>
              {trend && (
                <ApperIcon 
                  name={changeType === 'positive' ? 'TrendingUp' : changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
                  className={`w-4 h-4 ${changeColors[changeType]}`} 
                />
              )}
            </div>
          )}
        </div>
        
        {icon && (
          <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
            <ApperIcon name={icon} className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;