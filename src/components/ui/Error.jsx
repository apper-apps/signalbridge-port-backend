import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="bg-surface-500 rounded-lg p-8 border border-surface-600 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-500" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Error Occurred</h3>
          <p className="text-gray-400 mb-6">{message}</p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-premium transition-all duration-300 flex items-center space-x-2"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;