import React, { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // Load orders from localStorage or start empty
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Listen for changes in other tabs and update state
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "orders") {
        const newOrders = event.newValue ? JSON.parse(event.newValue) : [];
        setOrders(newOrders);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  const removeOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, removeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
