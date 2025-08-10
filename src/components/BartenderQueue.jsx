import React, { useContext } from "react";
import { OrderContext } from "./OrderContext.jsx";

const BartenderQueue = () => {
  const { orders, removeOrder } = useContext(OrderContext);
  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Bartender Queue</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map((order) => (
            <li
              key={order.id}
              style={{
                padding: "0.5rem",
                marginBottom: "1rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong>{order.customer}</strong>

                <button
                  onClick={() => removeOrder(order.id)}
                  style={{
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  ✅ Complete
                </button>
              </div>

              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem" }}>
                {order.items.map((drink, i) => (
                  <li key={i}>
                    {drink.emoji} {drink.name}
                  </li>
                ))}
              </ul>

              {order.notes && (
                <p style={{ fontStyle: "italic", marginTop: "0.5rem" }}>
                  📝 Notes: {order.notes}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BartenderQueue;
