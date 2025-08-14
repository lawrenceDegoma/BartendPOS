import React, { createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export const OrderContext = createContext();

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => {
        const data = doc.data();
        const { id: _, ...rest } = data;
        return {
          id: doc.id,
          ...rest,
        };
      });
      fetchedOrders.sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds);
      setOrders(fetchedOrders);
    });

    return () => unsubscribe();
  }, []);

  const addOrder = async (order) => {
    const { id: _, ...rest } = order;
    await addDoc(collection(db, "orders"), {
      ...rest,
      createdAt: serverTimestamp(),
    });
  };

  const removeOrder = async (id) => {
    if (!id || typeof id !== "string") {
      console.error("Invalid doc ID:", id);
      return;
    }
    await deleteDoc(doc(db, "orders", id));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, removeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
