import React from 'react';

const StatusBadge = ({ status, className = '' }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'connected':
      case 'executed':
      case 'success':
        return {
          bg: 'bg-green-500/20',
          text: 'text-green-400',
          border: 'border-green-500/30',
          dot: 'bg-green-400'
        };
      case 'pending':
      case 'processing':
        return {
          bg: 'bg-yellow-500/20',
          text: 'text-yellow-400',
          border: 'border-yellow-500/30',
          dot: 'bg-yellow-400'
        };
      case 'failed':
      case 'error':
      case 'disconnected':
      case 'expired':
        return {
          bg: 'bg-red-500/20',
          text: 'text-red-400',
          border: 'border-red-500/30',
          dot: 'bg-red-400'
        };
      case 'inactive':
      case 'paused':
        return {
          bg: 'bg-gray-500/20',
          text: 'text-gray-400',
          border: 'border-gray-500/30',
          dot: 'bg-gray-400'
        };
      case 'live':
        return {
          bg: 'bg-accent-500/20',
          text: 'text-accent-400',
          border: 'border-accent-500/30',
          dot: 'bg-accent-400 animate-pulse-glow'
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          text: 'text-gray-400',
          border: 'border-gray-500/30',
          dot: 'bg-gray-400'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border} ${className}`}>
      <span className={`w-2 h-2 rounded-full mr-1.5 ${config.dot}`} />
      {status}
    </span>
  );
};

export default StatusBadge;