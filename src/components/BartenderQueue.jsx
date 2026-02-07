import React, { useContext, useState } from "react";
import { OrderContext } from "./OrderContext.jsx";

// Import recipes from CustomerOrderForm data
const recipeData = {
  'Mai Tai': '1 oz aged rum, 1 oz white rum, 0.5 oz orange curaçao, 0.5 oz orgeat syrup, 1 oz lime juice, mint sprig garnish',
  'Zombie': '1 oz white rum, 1 oz gold rum, 1 oz dark rum, 0.5 oz apricot liqueur, 1 oz lime juice, 1 oz pineapple juice, grenadine dash',
  'Piña Colada': '2 oz white rum, 1 oz coconut cream, 3 oz pineapple juice, pineapple wedge garnish',
  'Scorpion Bowl': '2 oz light rum, 1 oz brandy, 2 oz orange juice, 2 oz lemon juice, 1 oz orgeat syrup',
  'Blue Hawaiian': '1 oz light rum, 1 oz blue curaçao, 2 oz pineapple juice, 1 oz cream of coconut, 0.5 oz lime juice',
  'Navy Grog': '1 oz light rum, 1 oz dark rum, 1 oz demerara rum, 0.75 oz lime juice, 0.75 oz grapefruit juice, 0.75 oz honey syrup'
};

const BartenderQueue = () => {
  const { orders, removeOrder } = useContext(OrderContext);
  const [showRecipe, setShowRecipe] = useState(null);
  
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
    
    if (diffMinutes >= 10) return "border-l-red-500 bg-red-50 border border-red-200";
    if (diffMinutes >= 5) return "border-l-amber-400 bg-amber-50 border border-amber-200";
    return "border-l-teal-500 bg-white border border-gray-200";
  };

  const handleShowRecipe = (orderIndex, drinkIndex) => {
    const key = `${orderIndex}-${drinkIndex}`;
    setShowRecipe(showRecipe === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-stone-100 w-screen overflow-x-hidden relative">
      {/* Bamboo Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            #8B4513 0px,
            #8B4513 8px,
            #A0522D 8px,
            #A0522D 12px,
            #8B4513 12px,
            #8B4513 20px,
            transparent 20px,
            transparent 40px
          )`,
          backgroundSize: '40px 100%'
        }}></div>
      </div>

      {/* Header */}
      <div className="bg-amber-900 shadow-2xl border-b-4 border-amber-800 sticky top-0 z-10 relative overflow-hidden">
        {/* Tiki Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-10 w-8 h-8 border-2 border-amber-600 rounded-full"></div>
          <div className="absolute top-4 right-16 w-6 h-6 border-2 border-amber-600 rounded-full"></div>
          <div className="absolute bottom-2 left-1/3 w-10 h-2 bg-amber-600 rounded-full"></div>
          <div className="absolute bottom-2 right-1/3 w-10 h-2 bg-amber-600 rounded-full"></div>
        </div>

        <div className="max-w-full px-4 sm:px-6 md:px-8 py-6 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-6">
            {/* Tiki Totem Icon */}
            <div className="w-16 h-20 sm:w-20 sm:h-24 bg-amber-700 rounded-2xl flex flex-col items-center justify-center shadow-2xl border-3 border-amber-600 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-6 bg-amber-800 rounded-t-2xl"></div>
              <div className="w-4 h-4 bg-amber-200 rounded-full mb-1 relative z-10"></div>
              <div className="w-3 h-3 bg-amber-200 rounded-full mb-1 relative z-10"></div>
              <div className="w-5 h-2 bg-amber-200 rounded-full relative z-10"></div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-amber-600 rounded-full"></div>
            </div>
            
            <div>
              <h1 className="text-2xl sm:text-4xl font-tiki-title text-amber-50 tracking-wider flex items-center space-x-3">
                <div className="w-8 h-8 border-2 border-amber-300 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-amber-300 rounded-full"></div>
                </div>
                <span>Sacred Tiki Bar</span>
                <div className="w-8 h-8 border-2 border-amber-300 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-amber-300 rounded-full"></div>
                </div>
              </h1>
              <p className="text-base sm:text-lg font-tiki-body text-amber-200 mt-2 flex items-center space-x-2">
                <div className="w-4 h-4 border border-amber-300 rounded-full"></div>
                <span>
                  {orders.length === 0 ? "Paradise is at peace" : `${orders.length} sacred ritual${orders.length > 1 ? 's' : ''} brewing`}
                </span>
                <div className="w-4 h-4 border border-amber-300 rounded-full"></div>
              </p>
            </div>
          </div>

          {orders.length > 0 && (
            <div className="text-right bg-amber-800/50 px-4 py-3 rounded-2xl border-2 border-amber-600">
              <div className="text-sm sm:text-base font-tiki-header text-amber-300 font-semibold">Island Time</div>
              <div className="text-xl sm:text-3xl font-tiki-body font-bold text-amber-50 flex items-center space-x-2">
                <div className="w-6 h-6 border-2 border-amber-300 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                </div>
                <span>{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Orders List */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-6 relative z-10">
        {orders.length === 0 ? (
          <div className="text-center py-16 sm:py-20 relative">
            {/* Floating tropical elements */}
            <div className="absolute top-8 left-1/4 w-8 h-8 border-2 border-amber-600 rounded-full animate-pulse opacity-30"></div>
            <div className="absolute top-12 right-1/4 w-6 h-6 border-2 border-amber-600 rounded-full animate-pulse opacity-30"></div>
            <div className="absolute bottom-8 left-1/3 w-6 h-6 border-2 border-amber-600 rounded-full animate-pulse opacity-30"></div>
            <div className="absolute bottom-12 right-1/3 w-8 h-8 border-2 border-amber-600 rounded-full animate-pulse opacity-30"></div>
            
            <div className="w-24 h-32 bg-amber-700 rounded-3xl border-4 border-amber-600 flex flex-col items-center justify-center mx-auto mb-8 shadow-2xl">
              <div className="w-6 h-6 bg-white rounded-full mb-2"></div>
              <div className="w-4 h-4 bg-white rounded-full mb-2"></div>
              <div className="w-8 h-3 bg-white rounded-full"></div>
            </div>
            <h2 className="text-2xl sm:text-4xl font-tiki-title text-amber-900 mb-4 flex items-center justify-center space-x-3">
              <div className="w-6 h-6 border-2 border-amber-700 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
              </div>
              <span>The Sacred Tiki Awaits</span>
              <div className="w-6 h-6 border-2 border-amber-700 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
              </div>
            </h2>
            <p className="text-lg sm:text-xl font-tiki-body text-amber-700 max-w-md mx-auto flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border border-amber-600 rounded-full"></div>
              <span>No island spirits require your attention at this time</span>
              <div className="w-4 h-4 border border-amber-600 rounded-full"></div>
            </p>
            
            {/* Decorative tiki border */}
            <div className="mt-12 flex items-center justify-center space-x-4">
              <div className="w-16 h-1 bg-amber-600 rounded-full"></div>
              <div className="w-8 h-8 border-2 border-amber-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
              </div>
              <div className="w-16 h-1 bg-amber-600 rounded-full"></div>
              <div className="w-6 h-6 border-2 border-amber-600 rounded-full"></div>
              <div className="w-16 h-1 bg-amber-600 rounded-full"></div>
              <div className="w-8 h-8 border-2 border-amber-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
              </div>
              <div className="w-16 h-1 bg-amber-600 rounded-full"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, orderIndex) => (
              <div
                key={order.id}
                className={`border-l-8 rounded-3xl shadow-2xl border-4 transition-all duration-500 hover:shadow-3xl w-full max-w-[768px] relative overflow-hidden ${getUrgencyColor(order.timestamp)}`}
                style={{ marginLeft: 0 }}
              >
                {/* Tiki decorative patterns */}
                <div className="absolute top-4 right-4 opacity-20">
                  <div className="w-8 h-8 border-2 border-amber-600 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 opacity-20">
                  <div className="w-6 h-6 border-2 border-amber-600 rounded-full"></div>
                </div>

                <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-amber-100">
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      {/* Tiki customer avatar */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-700 rounded-2xl flex items-center justify-center shadow-2xl border-3 border-amber-600 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-4 bg-amber-800 rounded-t-2xl"></div>
                        <span className="text-amber-100 font-bold text-lg sm:text-2xl relative z-10">
                          {order.customer ? order.customer.charAt(0).toUpperCase() : 'G'}
                        </span>
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-amber-600 rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-tiki-header text-amber-900 flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-amber-700 rounded-full"></div>
                          <span>Islander: {order.customer || `Sacred Guest #${orderIndex + 1}`}</span>
                        </h3>
                        <div className="flex items-center space-x-4 sm:space-x-6 text-sm sm:text-base font-tiki-body text-amber-700 mt-2">
                          <span className="flex items-center space-x-1">
                            <div className="w-3 h-3 border border-amber-600 rounded-full"></div>
                            <span>Blessed at: {formatTime(order.timestamp)}</span>
                          </span>
                          <span className="font-semibold flex items-center space-x-1">
                            <div className="w-3 h-3 border border-amber-600 rounded-full"></div>
                            <span>{getTimeElapsed(order.timestamp)}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeOrder(order.id)}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-tiki-body font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl flex items-center space-x-3 shadow-lg hover:shadow-xl text-base sm:text-lg border-3 border-teal-600 hover:border-teal-700 transition-all duration-300 hover:scale-105"
                    >
                      <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                      <span>Ritual Complete</span>
                    </button>
                  </div>

                  {/* Drinks List */}
                  <div className="mb-6">
                    <h4 className="text-base sm:text-lg font-tiki-header text-amber-800 mb-4 uppercase tracking-wider flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-amber-700 rounded-full"></div>
                      <span>Sacred Island Elixirs ({order.items.length})</span>
                      <div className="w-4 h-4 border-2 border-amber-700 rounded-full"></div>
                    </h4>
                    <div className="grid gap-3">
                      {order.items.map((drink, drinkIndex) => {
                        const recipeKey = `${orderIndex}-${drinkIndex}`;
                        const showThisRecipe = showRecipe === recipeKey;
                        
                        return (
                          <div key={drinkIndex} className="space-y-3">
                            <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-5 bg-amber-100 border-3 border-amber-600 rounded-2xl shadow-lg">
                              <div className="w-4 h-4 bg-teal-600 rounded-full flex-shrink-0 shadow-md"></div>
                              <span className="font-tiki-body text-amber-900 text-base sm:text-lg flex-1 flex items-center space-x-2">
                                <div className="w-3 h-3 border border-amber-700 rounded-full"></div>
                                <span>{drink.name || drink}</span>
                              </span>
                              <span className="text-sm sm:text-base font-tiki-body bg-amber-700 text-amber-100 px-3 py-2 rounded-full font-bold shadow-md">
                                #{drinkIndex + 1}
                              </span>
                              
                              {/* Recipe Button */}
                              <button
                                onClick={() => handleShowRecipe(orderIndex, drinkIndex)}
                                className={`px-4 py-2 text-sm sm:text-base font-tiki-body transition-all duration-300 border-3 shadow-lg hover:shadow-xl ${
                                  showThisRecipe
                                    ? 'bg-teal-600 text-white border-teal-600'
                                    : 'bg-amber-200 text-teal-700 border-amber-400 hover:bg-amber-300 hover:border-amber-500'
                                }`}
                              >
                                {showThisRecipe ? 'Hide Sacred Recipe' : 'Show Sacred Recipe'}
                              </button>
                            </div>
                            
                            {/* Recipe Panel */}
                            {showThisRecipe && (
                              <div className="bg-teal-50 border-3 border-teal-400 rounded-2xl p-4 sm:p-6 ml-6 shadow-xl relative overflow-hidden">
                                {/* Tiki decorative elements */}
                                <div className="absolute top-2 right-2 w-4 h-4 border border-amber-600 rounded-full opacity-30"></div>
                                <div className="absolute bottom-2 left-2 w-4 h-4 border border-amber-600 rounded-full opacity-30"></div>
                                
                                <div className="flex items-start space-x-4">
                                  {/* Tiki recipe icon */}
                                  <div className="w-10 h-10 bg-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                      <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="text-base sm:text-lg font-tiki-header text-teal-900 mb-3 flex items-center space-x-2">
                                      <div className="w-4 h-4 border border-teal-700 rounded-full"></div>
                                      <span>Sacred Recipe for {drink.name}</span>
                                      <div className="w-4 h-4 border border-teal-700 rounded-full"></div>
                                    </h5>
                                    <p className="text-sm sm:text-base font-mono text-teal-800 leading-relaxed bg-white px-4 py-3 rounded-xl border-2 border-teal-300 shadow-md">
                                      {recipeData[drink.name] || 'Ancient recipe lost to the island mists...'}
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
                    <div className="bg-amber-200 border-3 border-amber-600 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
                      {/* Tiki decorative elements */}
                      <div className="absolute top-2 right-2 w-4 h-4 border border-amber-600 rounded-full opacity-30"></div>
                      <div className="absolute bottom-2 left-2 w-4 h-4 border border-amber-600 rounded-full opacity-30"></div>
                      
                      <div className="flex items-start space-x-4">
                        {/* Sacred note icon */}
                        <div className="w-10 h-10 bg-amber-700 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                          <div className="w-4 h-4 bg-amber-200 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h5 className="text-base sm:text-lg font-tiki-header text-amber-900 mb-3 flex items-center space-x-2">
                            <div className="w-4 h-4 border border-amber-700 rounded-full"></div>
                            <span>Sacred Island Wishes</span>
                            <div className="w-4 h-4 border border-amber-700 rounded-full"></div>
                          </h5>
                          <p className="text-sm sm:text-base font-tiki-body text-amber-800 leading-relaxed bg-amber-50 px-4 py-3 rounded-xl border-2 border-amber-400 shadow-md">
                            {order.notes}
                          </p>
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
