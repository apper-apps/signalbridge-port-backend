import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import StatusBadge from '@/components/atoms/StatusBadge';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { accountService } from '@/services/api/accountService';

const AccountTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAccounts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await accountService.getAll();
      setAccounts(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load accounts');
    } finally {
      setLoading(false);
    }
  };

  const generateApiKey = async (accountNumber) => {
    try {
      const newKey = await accountService.generateApiKey(accountNumber);
      setAccounts(accounts.map(account => 
        account.accountNumber === accountNumber 
          ? { ...account, apiKey: newKey }
          : account
      ));
      toast.success('API key generated successfully');
    } catch (err) {
      toast.error('Failed to generate API key');
    }
  };

  const copyApiKey = (apiKey) => {
    navigator.clipboard.writeText(apiKey);
    toast.success('API key copied to clipboard');
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  if (loading) return <Loading type="table" />;
  if (error) return <Error message={error} onRetry={loadAccounts} />;
  if (!accounts.length) return (
    <Empty 
      title="No Accounts Found" 
      description="No trading accounts have been added yet. Add accounts to manage API access."
      icon="Users"
    />
  );

  return (
    <div className="bg-surface-500 rounded-lg border border-surface-600">
      <div className="p-6 border-b border-surface-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ApperIcon name="Users" className="w-6 h-6 text-accent-400" />
            <h2 className="text-xl font-semibold text-white">Account Management</h2>
          </div>
          <Button variant="primary" icon="Plus">
            Add Account
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Account Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                API Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Subscription
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Signals Received
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-600">
            {accounts.map((account) => (
              <motion.tr
                key={account.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hover:bg-surface-600 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-white font-mono">
                    {account.accountNumber}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-300 font-mono">
                      {account.apiKey.substring(0, 8)}...
                    </span>
                    <button
                      onClick={() => copyApiKey(account.apiKey)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ApperIcon name="Copy" className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={account.subscriptionStatus} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(account.expiryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-accent-400">
                    {account.signalsReceived.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(account.lastActive).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="RefreshCw"
                      onClick={() => generateApiKey(account.accountNumber)}
                    >
                      Regenerate Key
                    </Button>
                    <Button variant="ghost" size="sm" icon="MoreHorizontal">
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountTable;