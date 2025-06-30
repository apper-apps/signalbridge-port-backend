import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import StatusBadge from '@/components/atoms/StatusBadge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { signalService } from '@/services/api/signalService';

const SignalMonitor = () => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSignals = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await signalService.getRecentSignals();
      setSignals(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load signals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSignals();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      loadSignals();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loading type="table" />;
  if (error) return <Error message={error} onRetry={loadSignals} />;
  if (!signals.length) return (
    <Empty 
      title="No Active Signals" 
      description="No trading signals are currently active. Signals will appear here when received from MT5."
      icon="TrendingUp"
    />
  );

  return (
    <div className="bg-surface-500 rounded-lg border border-surface-600">
      <div className="p-6 border-b border-surface-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ApperIcon name="Activity" className="w-6 h-6 text-accent-400" />
            <h2 className="text-xl font-semibold text-white">Live Signal Monitor</h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse-glow" />
            <span className="text-sm text-accent-400 font-medium">Live</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                SL/TP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Lot Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Account
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-600">
            {signals.map((signal) => (
              <motion.tr
                key={signal.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hover:bg-surface-600 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                  {new Date(signal.timestamp).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-white">{signal.symbol}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    signal.action.toLowerCase() === 'buy' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    <ApperIcon 
                      name={signal.action.toLowerCase() === 'buy' ? 'ArrowUp' : 'ArrowDown'} 
                      className="w-3 h-3 mr-1" 
                    />
                    {signal.action}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-mono">
                  {signal.price.toFixed(5)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
<div className="text-xs">
                    <div>SL: {signal.stop_loss.toFixed(5)}</div>
                    <div>TP: {signal.take_profit.toFixed(5)}</div>
                  </div>
                </td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-white font-mono">
                  {signal.lot_size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={signal.status} />
                </td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                  {signal.account_number}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SignalMonitor;