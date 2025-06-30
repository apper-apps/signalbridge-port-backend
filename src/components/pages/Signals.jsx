import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import StatusBadge from '@/components/atoms/StatusBadge';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { signalService } from '@/services/api/signalService';

const Signals = () => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadSignals = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await signalService.getAll();
      setSignals(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load signals');
    } finally {
      setLoading(false);
    }
  };

  const exportSignals = () => {
    const csvContent = signals.map(signal => 
      `${signal.timestamp},${signal.symbol},${signal.action},${signal.price},${signal.stopLoss},${signal.takeProfit},${signal.lotSize},${signal.status},${signal.accountNumber}`
    ).join('\n');
    
    const blob = new Blob([`Timestamp,Symbol,Action,Price,Stop Loss,Take Profit,Lot Size,Status,Account\n${csvContent}`], 
      { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `signals_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Signals exported successfully');
  };

  const filteredSignals = signals.filter(signal => {
    const matchesSearch = signal.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         signal.accountNumber.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || signal.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    loadSignals();
  }, []);

  if (loading) return <Loading type="table" />;
  if (error) return <Error message={error} onRetry={loadSignals} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="bg-surface-500 rounded-lg p-6 border border-surface-600">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Signal History
            </h1>
            <p className="text-gray-400 mt-2">
              View and manage your complete trading signal history
            </p>
          </div>
          <Button variant="primary" icon="Download" onClick={exportSignals}>
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search by symbol or account number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-surface-600 border border-surface-500 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="executed">Executed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Signals Table */}
      {filteredSignals.length === 0 ? (
        <Empty 
          title="No Signals Found" 
          description="No signals match your current filters. Try adjusting your search criteria."
          icon="TrendingUp"
        />
      ) : (
        <div className="bg-surface-500 rounded-lg border border-surface-600">
          <div className="p-6 border-b border-surface-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ApperIcon name="TrendingUp" className="w-6 h-6 text-accent-400" />
                <h2 className="text-xl font-semibold text-white">
                  Signal Records ({filteredSignals.length})
                </h2>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Entry Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Stop Loss
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Take Profit
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
                {filteredSignals.map((signal) => (
                  <motion.tr
                    key={signal.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hover:bg-surface-600 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                      {new Date(signal.timestamp).toLocaleString()}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400 font-mono">
                      {signal.stopLoss.toFixed(5)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-mono">
                      {signal.takeProfit.toFixed(5)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-mono">
                      {signal.lotSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={signal.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                      {signal.accountNumber}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Signals;