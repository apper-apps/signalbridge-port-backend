import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Documentation = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'FileText' },
    { id: 'endpoints', name: 'API Endpoints', icon: 'Globe' },
    { id: 'mt5-integration', name: 'MT5 Integration', icon: 'Server' },
    { id: 'examples', name: 'Code Examples', icon: 'Code' },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Code copied to clipboard');
  };

  const codeExamples = {
    webhook: `// Webhook endpoint to receive signals
app.post('/webhook/signals', (req, res) => {
  const signal = req.body;
  
  // Validate API key
  if (req.headers['x-api-key'] !== VALID_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Process the signal
  console.log('Received signal:', signal);
  
  // Forward to MT5 EA
  forwardToMT5(signal);
  
  res.json({ status: 'received' });
});`,
    
    mt5Expert: `// MT5 Expert Advisor - Signal Receiver
#include <Trade\\Trade.mqh>

CTrade trade;

void OnInit() {
    // Initialize WebSocket or HTTP client
    Print("Signal Receiver EA initialized");
}

void OnTick() {
    // Check for new signals from API
    string signals = GetPendingSignals();
    
    if (signals != "") {
        ProcessSignals(signals);
    }
}

void ProcessSignals(string signalData) {
    // Parse signal JSON
    // Execute trade based on signal
    
    double lot = 0.1;
    int slippage = 10;
    
    if (signal.action == "BUY") {
        trade.Buy(lot, signal.symbol, signal.price, 
                 signal.stopLoss, signal.takeProfit);
    } else if (signal.action == "SELL") {
        trade.Sell(lot, signal.symbol, signal.price, 
                  signal.stopLoss, signal.takeProfit);
    }
}`,

    apiRequest: `// Send signal via API
const sendSignal = async (signalData) => {
  const response = await fetch('https://api.signalbridge.com/v1/signals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'your-api-key-here',
      'Authorization': 'Bearer your-token'
    },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      symbol: signalData.symbol,
      action: signalData.action, // 'BUY' or 'SELL'
      price: signalData.price,
      stopLoss: signalData.stopLoss,
      takeProfit: signalData.takeProfit,
      lotSize: signalData.lotSize,
      accountNumber: signalData.accountNumber
    })
  });
  
  const result = await response.json();
  console.log('Signal sent:', result);
};`
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="bg-surface-500 rounded-lg p-6 border border-surface-600">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            API Documentation
          </h1>
          <p className="text-gray-400 mt-2">
            Complete guide for integrating with SignalBridge Pro API
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-surface-500 rounded-lg border border-surface-600 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white shadow-premium'
                      : 'text-gray-300 hover:text-white hover:bg-surface-600'
                  }`}
                >
                  <ApperIcon name={tab.icon} className="w-5 h-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-surface-500 rounded-lg border border-surface-600 p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
                  <p className="text-gray-300 mb-4">
                    SignalBridge Pro provides a robust API for distributing MT5 trading signals 
                    to multiple accounts with subscription-based access control.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface-600 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <ApperIcon name="Zap" className="w-5 h-5 text-accent-400 mr-2" />
                      <h3 className="font-semibold text-white">Real-time Signals</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Distribute trading signals instantly to authorized accounts via WebSocket or HTTP.
                    </p>
                  </div>
                  
                  <div className="bg-surface-600 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <ApperIcon name="Shield" className="w-5 h-5 text-accent-400 mr-2" />
                      <h3 className="font-semibold text-white">Secure Access</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      API key-based authentication with account-level access control.
                    </p>
                  </div>
                  
                  <div className="bg-surface-600 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <ApperIcon name="BarChart3" className="w-5 h-5 text-accent-400 mr-2" />
                      <h3 className="font-semibold text-white">Analytics</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Track signal performance and account activity with detailed metrics.
                    </p>
                  </div>
                  
                  <div className="bg-surface-600 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <ApperIcon name="Settings" className="w-5 h-5 text-accent-400 mr-2" />
                      <h3 className="font-semibold text-white">Flexible</h3>
                    </div>
                    <p className="text-sm text-gray-400">
                      Configurable risk parameters and symbol filtering per account.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'endpoints' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">API Endpoints</h2>
                
                <div className="space-y-4">
                  <div className="bg-surface-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-mono mr-3">POST</span>
                        <span className="font-mono text-white">/api/v1/signals</span>
                      </div>
                      <Button variant="ghost" size="sm" icon="Copy" onClick={() => copyToClipboard('/api/v1/signals')}>
                        Copy
                      </Button>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">Send a new trading signal to authorized accounts</p>
                    <div className="bg-background-500 rounded p-3">
                      <pre className="text-sm text-gray-300 font-mono">
{`{
  "timestamp": "2024-01-15T14:30:00Z",
  "symbol": "EURUSD",
  "action": "BUY",
  "price": 1.08945,
  "stopLoss": 1.08800,
  "takeProfit": 1.09200,
  "lotSize": 0.1,
  "accountNumber": "12345678"
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-surface-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-mono mr-3">GET</span>
                        <span className="font-mono text-white">/api/v1/signals</span>
                      </div>
                      <Button variant="ghost" size="sm" icon="Copy" onClick={() => copyToClipboard('/api/v1/signals')}>
                        Copy
                      </Button>
                    </div>
                    <p className="text-gray-400 text-sm">Retrieve signal history with filtering options</p>
                  </div>

                  <div className="bg-surface-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-mono mr-3">GET</span>
                        <span className="font-mono text-white">/api/v1/accounts/validate</span>
                      </div>
                      <Button variant="ghost" size="sm" icon="Copy" onClick={() => copyToClipboard('/api/v1/accounts/validate')}>
                        Copy
                      </Button>
                    </div>
                    <p className="text-gray-400 text-sm">Validate account access and subscription status</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mt5-integration' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">MT5 Integration Guide</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Master EA Setup</h3>
                    <p className="text-gray-300 mb-4">
                      Configure your master Expert Advisor to send signals to the SignalBridge API.
                    </p>
                    
                    <div className="bg-surface-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">MT5 Expert Advisor Code</span>
                        <Button variant="ghost" size="sm" icon="Copy" onClick={() => copyToClipboard(codeExamples.mt5Expert)}>
                          Copy
                        </Button>
                      </div>
                      <div className="bg-background-500 rounded p-3 overflow-x-auto">
                        <pre className="text-sm text-gray-300 font-mono whitespace-pre">
                          {codeExamples.mt5Expert}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Slave EA Setup</h3>
                    <p className="text-gray-300 mb-4">
                      Install the slave EA on client accounts to receive and execute signals.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-surface-600 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-2">Configuration Parameters</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• API Endpoint URL</li>
                          <li>• Account API Key</li>
                          <li>• Maximum Lot Size</li>
                          <li>• Risk Percentage</li>
                          <li>• Allowed Symbols</li>
                        </ul>
                      </div>
                      
                      <div className="bg-surface-600 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-2">Safety Features</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Maximum daily drawdown</li>
                          <li>• Position size limits</li>
                          <li>• Symbol filtering</li>
                          <li>• Connection monitoring</li>
                          <li>• Error handling</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">Code Examples</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Webhook Integration</h3>
                    <div className="bg-surface-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">Node.js Webhook Receiver</span>
                        <Button variant="ghost" size="sm" icon="Copy" onClick={() => copyToClipboard(codeExamples.webhook)}>
                          Copy
                        </Button>
                      </div>
                      <div className="bg-background-500 rounded p-3 overflow-x-auto">
                        <pre className="text-sm text-gray-300 font-mono whitespace-pre">
                          {codeExamples.webhook}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">API Request</h3>
                    <div className="bg-surface-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">JavaScript API Client</span>
                        <Button variant="ghost" size="sm" icon="Copy" onClick={() => copyToClipboard(codeExamples.apiRequest)}>
                          Copy
                        </Button>
                      </div>
                      <div className="bg-background-500 rounded p-3 overflow-x-auto">
                        <pre className="text-sm text-gray-300 font-mono whitespace-pre">
                          {codeExamples.apiRequest}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Documentation;