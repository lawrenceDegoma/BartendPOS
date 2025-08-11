import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './components/HomePage';
import CustomerOrderForm from './components/CustomerOrderForm';
import BartenderQueue from './components/BartenderQueue';
import { OrderProvider } from './components/OrderContext';

function App() {
  return (
    <OrderProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order" element={<CustomerOrderForm />} />
        <Route path="/bartender" element={<BartenderQueue />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </OrderProvider>
  );
}

export default App;
