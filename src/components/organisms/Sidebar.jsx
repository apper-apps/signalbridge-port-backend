import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { AuthContext } from '../App';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
    { name: 'Signals', href: '/signals', icon: 'TrendingUp' },
    { name: 'Accounts', href: '/accounts', icon: 'Users' },
    { name: 'API Config', href: '/api-config', icon: 'Settings' },
    { name: 'Documentation', href: '/documentation', icon: 'FileText' },
  ];

  return (
    <div className="w-64 bg-surface-500 border-r border-surface-600 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-surface-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
            <ApperIcon name="Zap" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">SignalBridge</h1>
            <p className="text-xs text-gray-400">Pro Edition</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary-500 text-white shadow-premium border-l-4 border-accent-500'
                  : 'text-gray-300 hover:text-white hover:bg-surface-600'
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                className="flex items-center w-full"
                whileHover={{ x: 2 }}
              >
                <ApperIcon 
                  name={item.icon} 
                  className={`w-5 h-5 mr-3 ${isActive ? 'text-accent-400' : ''}`} 
                />
                {item.name}
                {isActive && (
                  <motion.div
                    className="ml-auto w-2 h-2 bg-accent-400 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

{/* Footer */}
      <div className="p-4 border-t border-surface-600 space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-surface-600 rounded-lg">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <ApperIcon name="Activity" className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">System Status</p>
            <p className="text-xs text-green-400">All systems operational</p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-gray-300 hover:text-white hover:bg-red-600/20 border border-red-600/30"
        >
          <ApperIcon name="LogOut" className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;