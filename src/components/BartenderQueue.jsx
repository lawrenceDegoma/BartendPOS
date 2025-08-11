import React, { useContext } from "react";
import { OrderContext } from "./OrderContext.jsx";

const BartenderQueue = () => {
  const { orders, removeOrder } = useContext(OrderContext);
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getTimeElapsed = (timestamp) => {
    const now = new Date();
    const orderTime = new Date(timestamp);
    const diffMinutes = Math.floor((now - orderTime) / (1000 * 60));
    
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes === 1) return "1 min ago";
    return `${diffMinutes} mins ago`;
  };

  const getUrgencyColor = (timestamp) => {
    const now = new Date();
    const orderTime = new Date(timestamp);
    const diffMinutes = Math.floor((now - orderTime) / (1000 * 60));
    
    if (diffMinutes >= 10) return "border-l-red-500 bg-red-50/50";
    if (diffMinutes >= 5) return "border-l-orange-400 bg-orange-50/50";
    return "border-l-green-500 bg-white";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍹</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bartender Queue</h1>
                <p className="text-sm text-gray-600">
                  {orders.length === 0 ? "No pending orders" : `${orders.length} order${orders.length > 1 ? 's' : ''} in queue`}
                </p>
              </div>
            </div>
            
            {orders.length > 0 && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Current Time</div>
                <div className="text-lg font-semibold text-gray-900">
                  {new Date().toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-gray-400">🍸</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600">New orders will appear here when customers place them.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className={`border-l-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${getUrgencyColor(order.timestamp)}`}
              >
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {order.customer ? order.customer.charAt(0).toUpperCase() : '#'}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {order.customer || `Order #${index + 1}`}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>🕐 {formatTime(order.timestamp)}</span>
                          <span className="font-medium">{getTimeElapsed(order.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeOrder(order.id)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md"
                    >
                      <span>✅</span>
                      <span>Complete</span>
                    </button>
                  </div>

                  {/* Drinks List */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">
                      Drinks Ordered ({order.items.length})
                    </h4>
                    <div className="grid gap-2">
                      {order.items.map((drink, i) => (
                        <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <span className="text-2xl">{drink.emoji || '🍹'}</span>
                          <span className="font-medium text-gray-900 flex-1">{drink.name || drink}</span>
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                            #{i + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Notes */}
                  {order.notes && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-0.5">📝</span>
                        <div>
                          <h5 className="text-sm font-medium text-blue-900 mb-1">Special Requests</h5>
                          <p className="text-blue-800 text-sm leading-relaxed">{order.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BartenderQueue;
