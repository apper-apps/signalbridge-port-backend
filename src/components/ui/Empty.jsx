import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "No Data Available", 
  description = "There's nothing to display at the moment.",
  actionLabel = "Refresh",
  onAction,
  icon = "Database"
}) => {
  return (
    <div className="bg-surface-500 rounded-lg p-12 border border-surface-600 text-center">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center">
          <ApperIcon name={icon} className="w-10 h-10 text-white" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400 mb-8 max-w-md">{description}</p>
        </div>

        {onAction && (
          <button
            onClick={onAction}
            className="px-8 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-premium transition-all duration-300 flex items-center space-x-2"
          >
            <ApperIcon name="Plus" className="w-5 h-5" />
            <span>{actionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Empty;