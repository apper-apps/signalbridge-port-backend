import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/organisms/Sidebar';
import ConnectionStatus from '@/components/molecules/ConnectionStatus';

const Layout = () => {
  return (
    <div className="flex h-screen bg-background-500">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with Connection Status */}
        <header className="bg-surface-500 border-b border-surface-600 p-4">
          <ConnectionStatus 
            mt5Status="connected"
            apiStatus="active"
            activeConnections={24}
          />
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;