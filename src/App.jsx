import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import Dashboard from '@/components/pages/Dashboard';
import Signals from '@/components/pages/Signals';
import Accounts from '@/components/pages/Accounts';
import ApiConfig from '@/components/pages/ApiConfig';
import Documentation from '@/components/pages/Documentation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background-500">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="signals" element={<Signals />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="api-config" element={<ApiConfig />} />
            <Route path="documentation" element={<Documentation />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  );
}

export default App;