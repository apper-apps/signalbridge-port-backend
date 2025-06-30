import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import StatusBadge from '@/components/atoms/StatusBadge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { apiConfigService } from '@/services/api/apiConfigService';

const ApiConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  const [formData, setFormData] = useState({
    endpoint: '',
    authMethod: 'api-key',
    webhookUrl: '',
    mt5Parameters: {
      serverAddress: '',
      login: '',
      password: '',
      maxLotSize: 1.0,
      allowedSymbols: '',
      riskLevel: 'medium'
    }
  });

  const loadConfig = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await apiConfigService.getConfig();
      setConfig(data);
      setFormData(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load API configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await apiConfigService.updateConfig(formData);
      setConfig(formData);
      toast.success('Configuration saved successfully');
    } catch (err) {
      toast.error('Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  const testConnection = async () => {
    try {
      setTesting(true);
      const result = await apiConfigService.testConnection(formData);
      if (result.success) {
        toast.success('Connection test successful');
      } else {
        toast.error(`Connection test failed: ${result.error}`);
      }
    } catch (err) {
      toast.error('Connection test failed');
    } finally {
      setTesting(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadConfig} />;

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
              API Configuration
            </h1>
            <p className="text-gray-400 mt-2">
              Configure your MT5 connection settings and API endpoints
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <StatusBadge status={config?.isActive ? 'active' : 'inactive'} />
            <Button
              variant="secondary"
              icon="TestTube"
              loading={testing}
              onClick={testConnection}
            >
              Test Connection
            </Button>
            <Button
              variant="primary"
              icon="Save"
              loading={saving}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Configuration */}
        <div className="bg-surface-500 rounded-lg p-6 border border-surface-600">
          <div className="flex items-center space-x-3 mb-6">
            <ApperIcon name="Globe" className="w-6 h-6 text-accent-400" />
            <h2 className="text-xl font-semibold text-white">API Settings</h2>
          </div>

          <div className="space-y-4">
            <Input
              label="API Endpoint URL"
              value={formData.endpoint}
              onChange={(e) => handleInputChange('endpoint', e.target.value)}
              placeholder="https://api.signalbridge.com/v1/signals"
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Authentication Method
              </label>
              <select
                value={formData.authMethod}
                onChange={(e) => handleInputChange('authMethod', e.target.value)}
                className="w-full px-3 py-2 bg-surface-600 border border-surface-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="api-key">API Key</option>
                <option value="bearer-token">Bearer Token</option>
                <option value="oauth">OAuth 2.0</option>
              </select>
            </div>

            <Input
              label="Webhook URL"
              value={formData.webhookUrl}
              onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
              placeholder="https://your-domain.com/webhook/signals"
            />
          </div>
        </div>

        {/* MT5 Configuration */}
        <div className="bg-surface-500 rounded-lg p-6 border border-surface-600">
          <div className="flex items-center space-x-3 mb-6">
            <ApperIcon name="Server" className="w-6 h-6 text-accent-400" />
            <h2 className="text-xl font-semibold text-white">MT5 Parameters</h2>
          </div>

          <div className="space-y-4">
            <Input
              label="Server Address"
              value={formData.mt5Parameters.serverAddress}
              onChange={(e) => handleInputChange('mt5Parameters.serverAddress', e.target.value)}
              placeholder="broker-server.com:443"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Login"
                value={formData.mt5Parameters.login}
                onChange={(e) => handleInputChange('mt5Parameters.login', e.target.value)}
                placeholder="12345678"
              />
              <Input
                label="Password"
                type="password"
                value={formData.mt5Parameters.password}
                onChange={(e) => handleInputChange('mt5Parameters.password', e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <Input
              label="Max Lot Size"
              type="number"
              step="0.01"
              value={formData.mt5Parameters.maxLotSize}
              onChange={(e) => handleInputChange('mt5Parameters.maxLotSize', parseFloat(e.target.value))}
              placeholder="1.00"
            />

            <Input
              label="Allowed Symbols (comma-separated)"
              value={formData.mt5Parameters.allowedSymbols}
              onChange={(e) => handleInputChange('mt5Parameters.allowedSymbols', e.target.value)}
              placeholder="EURUSD, GBPUSD, USDJPY"
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Risk Level
              </label>
              <select
                value={formData.mt5Parameters.riskLevel}
                onChange={(e) => handleInputChange('mt5Parameters.riskLevel', e.target.value)}
                className="w-full px-3 py-2 bg-surface-600 border border-surface-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      <div className="bg-surface-500 rounded-lg p-6 border border-surface-600">
        <div className="flex items-center space-x-3 mb-4">
          <ApperIcon name="Activity" className="w-6 h-6 text-accent-400" />
          <h2 className="text-xl font-semibold text-white">Connection Status</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-600 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">MT5 Connection</p>
                <p className="text-lg font-semibold text-white">Active</p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-glow" />
            </div>
          </div>

          <div className="bg-surface-600 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">API Status</p>
                <p className="text-lg font-semibold text-white">Online</p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-glow" />
            </div>
          </div>

          <div className="bg-surface-600 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Last Sync</p>
                <p className="text-lg font-semibold text-white">2 min ago</p>
              </div>
              <ApperIcon name="RefreshCw" className="w-5 h-5 text-accent-400" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ApiConfig;