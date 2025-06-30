import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import StatusBadge from '@/components/atoms/StatusBadge';

const ConnectionStatus = ({ mt5Status, apiStatus, activeConnections }) => {
  return (
    <div className="bg-surface-500 border border-surface-600 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Server" className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-300">MT5 Connection</span>
            <StatusBadge status={mt5Status} />
          </div>
          
          <div className="flex items-center space-x-2">
            <ApperIcon name="Globe" className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-300">API Status</span>
            <StatusBadge status={apiStatus} />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <ApperIcon name="Users" className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-300">Active Connections</span>
          <span className="text-sm font-medium text-white bg-accent-500/20 px-2 py-1 rounded">
            {activeConnections}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;