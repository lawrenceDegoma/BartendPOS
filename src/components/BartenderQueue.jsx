import React, { useContext, useState } from "react";
import { OrderContext } from "./OrderContext.jsx";

// Import recipes and cooking instructions
const recipeData = {
  'Long Island Iced Tea': '0.5 oz vodka, 0.5 oz gin, 0.5 oz rum, 0.5 oz tequila, 0.5 oz Triple sec, 0.5 oz simple syrup, 0.5 oz lemon juice, top with coke, lemon wedge garnish',
  'Tokyo Tea': '0.5 oz vodka, 0.5 oz gin, 0.5 oz rum, 0.5 oz tequila, 0.5 oz midori, 2 oz sour mix, top with sprite, lemon or lime garnish',
  'Midori Sour': '1.5 oz midori, 2 oz sour mix, 1.5 oz lime juice, top with sprite',
  'Moscow Mule': '2 oz vodka, 0.5 oz lime juice, 4 oz ginger beer',
  'Lemon Drop': 'From bottle',
  'Green Tea Shot': 'From bottle'
};

const cookingData = {
  'Grilled Ribeye Steak': 'Season 12oz ribeye with salt, pepper, and garlic powder. Preheat grill to high heat. Grill 4-5 minutes per side for medium-rare. Let rest 5 minutes. Serve with roasted vegetables and potato.',
  'Pan-Seared Salmon': 'Season salmon fillet with salt and pepper. Heat oil in pan over medium-high heat. Cook skin-side up for 4 minutes, flip and cook 3-4 minutes more. Finish with lemon herb butter. Serve with jasmine rice and vegetables.',
  'Fettuccine Alfredo': 'Cook fresh fettuccine in salted boiling water until al dente. In large pan, melt butter and add heavy cream. Whisk in parmesan cheese until smooth. Toss with pasta and fresh herbs. Serve immediately.'
};

const BartenderQueue = () => {
  const { orders, removeOrder } = useContext(OrderContext);
  const [showRecipe, setShowRecipe] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null); // 'bar', 'kitchen', or null
  
  // Separate orders by type
  const drinkOrders = orders.filter(order => order.type !== 'food');
  const foodOrders = orders.filter(order => order.type === 'food');
  
  // Filter orders based on active filter
  const getFilteredOrders = () => {
    if (activeFilter === 'bar') return drinkOrders;
    if (activeFilter === 'kitchen') return foodOrders;
    return orders; // Show all when no filter is active
  };

  const filteredOrders = getFilteredOrders();

  // Handle filter toggle
  const handleFilterToggle = (filterType) => {
    if (activeFilter === filterType) {
      setActiveFilter(null); // Turn off filter if already active
    } else {
      setActiveFilter(filterType); // Turn on new filter (turns off any other)
    }
  };
  
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

  const handleShowRecipe = (orderIndex, drinkIndex) => {
    const key = `${orderIndex}-${drinkIndex}`;
    setShowRecipe(showRecipe === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-screen overflow-x-hidden">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-full px-4 sm:px-6 md:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl sm:text-3xl">🍹</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Staff Queue</h1>
                <p className="text-sm sm:text-base text-gray-600">
                  {orders.length === 0 ? "No pending orders" : 
                   activeFilter ? 
                     `Showing ${filteredOrders.length} of ${orders.length} ${activeFilter === 'bar' ? 'bar' : 'kitchen'} order${filteredOrders.length !== 1 ? 's' : ''}` :
                     `${orders.length} order${orders.length > 1 ? 's' : ''} in queue`
                  }
                </p>
              </div>
            </div>

            {orders.length > 0 && (
              <div className="text-right">
                <div className="text-xs sm:text-base text-gray-500">Current Time</div>
                <div className="text-lg sm:text-2xl font-semibold text-gray-900">
                  {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                </div>
              </div>
            )}
          </div>
          
          {/* Filter Buttons */}
          {orders.length > 0 && (
            <div className="flex space-x-3">
              <button
                onClick={() => handleFilterToggle('bar')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === 'bar'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">🍹</span>
                <span>Bar ({drinkOrders.length})</span>
                {activeFilter === 'bar' && (
                  <span className="text-xs opacity-75">• Active</span>
                )}
              </button>
              
              <button
                onClick={() => handleFilterToggle('kitchen')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === 'kitchen'
                    ? 'bg-gray-700 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">👨‍🍳</span>
                <span>Kitchen ({foodOrders.length})</span>
                {activeFilter === 'kitchen' && (
                  <span className="text-xs opacity-75">• Active</span>
                )}
              </button>

              {activeFilter && (
                <div className="flex items-center text-xs text-gray-500 ml-2">
                  <span>Showing {filteredOrders.length} of {orders.length} orders • Click button again to show all</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Orders List */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-6">
        {orders.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl sm:text-7xl text-gray-400">�️</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-3">All caught up!</h3>
            <p className="text-lg sm:text-xl text-gray-600">New orders will appear here when customers place them.</p>
          </div>
        ) : filteredOrders.length === 0 && activeFilter ? (
          <div className="text-center py-24">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl sm:text-7xl text-gray-400">
                {activeFilter === 'bar' ? '🍹' : '👨‍🍳'}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-3">
              No {activeFilter === 'bar' ? 'bar' : 'kitchen'} orders right now
            </h3>
            <p className="text-lg sm:text-xl text-gray-600">
              Click the {activeFilter === 'bar' ? 'Bar' : 'Kitchen'} button again to show all orders.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, orderIndex) => (
              <div
                key={order.id}
                className={`border-l-4 rounded-xl shadow-sm transition-all duration-200 hover:shadow-lg w-full max-w-[768px] ${getUrgencyColor(order.timestamp)}`}
                style={{ marginLeft: 0 }}
              >
                <div className="p-4 sm:p-6">
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg sm:text-xl">
                          {order.customer ? order.customer.charAt(0).toUpperCase() : '#'}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{order.customer || `Order #${orderIndex + 1}`}</h3>
                        <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-600 mt-1">
                          <span>🕐 {formatTime(order.timestamp)}</span>
                          <span className="font-medium">{getTimeElapsed(order.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeOrder(order.id)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center space-x-1 sm:space-x-2 shadow-sm hover:shadow-md text-sm sm:text-base"
                    >
                      <span>✅</span>
                      <span>Complete</span>
                    </button>
                  </div>

                  {/* Items List */}
                  <div className="mb-4">
                    <h4 className="text-sm sm:text-base font-medium text-gray-700 mb-2 uppercase tracking-wide flex items-center space-x-2">
                      <span>{order.type === 'food' ? '👨‍🍳' : '🍹'}</span>
                      <span>{order.type === 'food' ? 'Dishes' : 'Drinks'} Ordered ({order.items.length})</span>
                    </h4>
                    <div className="grid gap-2">
                      {order.items.map((item, itemIndex) => {
                        const recipeKey = `${orderIndex}-${itemIndex}`;
                        const showThisRecipe = showRecipe === recipeKey;
                        const isFood = order.type === 'food';
                        
                        return (
                          <div key={itemIndex} className="space-y-2">
                            <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                              <span className="text-2xl sm:text-3xl">{item.emoji || (isFood ? '�️' : '�🍹')}</span>
                              <div className="flex-1">
                                <span className="font-medium text-gray-900 text-sm sm:text-base block">{item.name || item}</span>
                                {isFood && item.prepTime && (
                                  <span className="text-xs text-gray-500">{item.prepTime}</span>
                                )}
                              </div>
                              <span className="text-xs sm:text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full font-medium">#{itemIndex + 1}</span>
                              
                              {/* Recipe/Instructions Button */}
                              <button
                                onClick={() => handleShowRecipe(orderIndex, itemIndex)}
                                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                                  showThisRecipe
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                }`}
                              >
                                {showThisRecipe ? 'Hide' : (isFood ? 'Instructions' : 'Recipe')}
                              </button>
                            </div>
                            
                            {/* Recipe/Instructions Panel */}
                            {showThisRecipe && (
                              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 sm:p-4 ml-4">
                                <div className="flex items-start space-x-2">
                                  <span className="text-blue-600 mt-0.5 text-base sm:text-lg">{isFood ? '👨‍🍳' : '🥄'}</span>
                                  <div>
                                    <h5 className="text-sm sm:text-base font-medium text-blue-900 mb-2">
                                      {isFood ? 'Cooking Instructions' : 'Recipe'} for {item.name}
                                    </h5>
                                    <p className="text-sm sm:text-base text-blue-800 leading-relaxed">
                                      {isFood 
                                        ? (cookingData[item.name] || 'Cooking instructions not available')
                                        : (recipeData[item.name] || 'Recipe not available')
                                      }
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Special Notes */}
                  {order.notes && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                      <div className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-0.5 text-base sm:text-lg">📝</span>
                        <div>
                          <h5 className="text-sm sm:text-base font-medium text-blue-900 mb-1">Special Requests</h5>
                          <p className="text-sm sm:text-base text-blue-800 leading-relaxed">{order.notes}</p>
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
