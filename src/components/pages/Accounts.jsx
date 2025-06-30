import React from 'react';
import { motion } from 'framer-motion';
import AccountTable from '@/components/organisms/AccountTable';

const Accounts = () => {
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
            Account Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage trading accounts, API keys, and subscription access
          </p>
        </div>
      </div>

      {/* Account Table */}
      <AccountTable />
    </motion.div>
  );
};

export default Accounts;