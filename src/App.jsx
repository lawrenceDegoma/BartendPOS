import React from 'react';
import CustomerOrderForm from './components/CustomerOrderForm';
import BartenderQueue from './components/BartenderQueue';
import { OrderProvider } from './components/OrderContext';

function App() {
  return (
    <OrderProvider>
      <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
        <CustomerOrderForm />
        <BartenderQueue />
      </div>
    </OrderProvider>
  );
}

export default App;
