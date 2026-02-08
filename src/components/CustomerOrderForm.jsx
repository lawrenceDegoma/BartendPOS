import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderContext } from "./OrderContext";

const menuItems = [
  { 
    name: 'Mai Tai', 
    category: 'Classic',
    description: 'The quintessential tiki cocktail with aged rum, orange curaçao, and orgeat syrup. Complex, balanced, and transportive to tropical shores.',
    recipe: '1 oz aged rum, 1 oz white rum, 0.5 oz orange curaçao, 0.5 oz orgeat syrup, 1 oz lime juice, mint sprig garnish'
  },
  { 
    name: 'Piña Colada', 
    category: 'Classic',
    description: 'Creamy tropical bliss with coconut cream, pineapple juice, and white rum. The ultimate vacation cocktail served frozen or on the rocks.',
    recipe: '2 oz white rum, 1 oz coconut cream, 3 oz pineapple juice, pineapple wedge garnish'
  },
  { 
    name: 'Long Island Iced Tea', 
    emoji: '🍹', 
    category: 'Strong',
    description: 'A potent mix of vodka, rum, gin, tequila, and triple sec with cola. Despite the name, no tea involved - just a smooth, strong cocktail that tastes surprisingly refreshing!',
    recipe: '0.5 oz vodka, 0.5 oz gin, 0.5 oz rum, 0.5 oz tequila, 0.5 oz Triple sec, 0.5 oz simple syrup, 0.5 oz lemon juice, top with coke, lemon wedge garnish'
  },
  { 
    name: 'Midori Sour', 
    emoji: '🍸', 
    category: 'Classic',
    description: 'A vibrant neon-green cocktail known for its sweet and sour flavor profile.',
    recipe: '1.5 oz midori, 2 oz sour mix, 1.5 oz lime juice, top with sprite'
  },
  { 
    name: 'Tokyo Tea', 
    emoji: '🍵', 
    category: 'Strong',
    description: 'Similar to Long Island but with the use of a melon liqueur and sprite, giving it a beautiful green color and a slightly sweeter, fruity taste. Still packs a punch!',
    recipe: '0.5 oz vodka, 0.5 oz gin, 0.5 oz rum, 0.5 oz tequila, 0.5 oz midori, 2 oz sour mix, top with sprite, lemon or lime garnish'
  },
];

const CustomerOrderForm = () => {
  const { addOrder } = useContext(OrderContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Get initial name from location state or sessionStorage
  const getInitialName = () => {
    const locationName = location.state?.guestName;
    const storedName = sessionStorage.getItem('guestName');
    
    if (locationName) {
      // If coming from navigation with state, store it and use it
      sessionStorage.setItem('guestName', locationName);
      return locationName;
    }
    
    // Otherwise use stored name or empty string
    return storedName || '';
  };

  const initialName = getInitialName();
  const [name] = useState(initialName);

  const [itemQuantities, setItemQuantities] = useState({});
  const [notes, setNotes] = useState('');
  const [showDescription, setShowDescription] = useState(null);

  const handleQuantityChange = (itemName, change) => {
    setItemQuantities((prev) => {
      const currentQuantity = prev[itemName] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      
      if (newQuantity === 0) {
        const { [itemName]: removed, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [itemName]: newQuantity
      };
    });
  };

  const handleShowDescription = (index) => {
    setShowDescription(showDescription === index ? null : index);
  };

  const handleSubmit = () => {
    const selectedItemNames = Object.keys(itemQuantities);
    if (selectedItemNames.length === 0) {
      alert('Please select at least one drink!');
      return;
    }

    // Create items array with quantities
    const drinksData = [];
    selectedItemNames.forEach((itemName) => {
      const menuItem = menuItems.find((item) => item.name === itemName);
      const quantity = itemQuantities[itemName];
      
      // Add the item multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        drinksData.push(menuItem);
      }
    });

    const order = {
      id: Date.now() + Math.random(),
      customer: name || "Anonymous",
      items: drinksData,
      notes,
      timestamp: Date.now(),
    };

    addOrder(order);

    // Reset form with a slight delay for visual feedback
    setTimeout(() => {
      setItemQuantities({});
      setNotes('');
    }, 300);
  };

  return (
    <div className="min-h-screen w-screen max-w-none bg-stone-100 dark:bg-stone-900 flex flex-col overflow-x-hidden relative">
      {/* Bamboo Pattern Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
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
      <div className="bg-amber-900 dark:bg-amber-800 border-b-4 border-amber-800 dark:border-amber-700 flex-shrink-0 w-full relative overflow-hidden">
        {/* Tiki Mask Pattern */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-20 dark:opacity-30">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-700 dark:text-amber-600">
            <path d="M50 10 L35 25 L35 40 L25 50 L35 60 L35 75 L50 90 L65 75 L65 60 L75 50 L65 40 L65 25 Z" fill="currentColor"/>
            <circle cx="40" cy="35" r="3" fill="#000"/>
            <circle cx="60" cy="35" r="3" fill="#000"/>
            <path d="M45 50 L50 55 L55 50" stroke="#000" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        
        <div className="px-4 sm:px-6 py-4 sm:py-5 w-full max-w-none relative z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                // Clear stored guest name when going back to home
                sessionStorage.removeItem('guestName');
                navigate('/');
              }}
              className="w-fit text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 transition-colors duration-200 flex items-center space-x-1 bg-amber-800/30 dark:bg-amber-700/30 px-3 py-2 rounded-full border border-amber-700/50 dark:border-amber-600/50"
            >
              <span>←</span>
              <span className="text-xs sm:text-base">Back</span>
            </button>
            <div className="text-center flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-amber-50 dark:text-amber-100 tracking-wide flex items-center justify-center space-x-3">
                <div className="w-8 h-8 border-2 border-amber-300 dark:border-amber-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-amber-300 dark:bg-amber-400 rounded-full"></div>
                </div>
                <span>Tiki Cove</span>
                <div className="w-8 h-8 border-2 border-amber-300 dark:border-amber-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-amber-300 dark:bg-amber-400 rounded-full"></div>
                </div>
              </h1>
            </div>
            <div className="w-16 sm:w-20"></div>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto w-full bg-stone-100 dark:bg-stone-900 relative">
        <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-safe w-full max-w-none relative z-10">
          {/* Tropical Border Decoration */}
          <div className="flex items-center justify-center space-x-4 py-4">
            <div className="h-px bg-amber-600 dark:bg-amber-500 flex-1 max-w-20"></div>
            <div className="w-6 h-6 border-2 border-amber-600 dark:border-amber-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-amber-600 dark:bg-amber-500 rounded-full"></div>
            </div>
            <div className="h-px bg-amber-600 dark:bg-amber-500 flex-1 max-w-20"></div>
          </div>

          {/* Drink Selection */}
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <label className="text-amber-900 dark:text-amber-100 font-bold text-lg sm:text-xl uppercase tracking-widest block mb-2">
                Sacred Libations
              </label>
              <div className="text-amber-700 dark:text-amber-300 text-sm font-light">Choose your island elixir</div>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {menuItems.map((item, index) => {
                const quantity = itemQuantities[item.name] || 0;
                const isSelected = quantity > 0;
                const showDesc = showDescription === index;

                return (
                  <div key={index} className="space-y-3">
                    <div
                      className={`relative p-4 sm:p-6 rounded-2xl border-3 transition-all duration-300 transform hover:scale-102 ${
                        isSelected
                          ? 'bg-amber-800 dark:bg-amber-700 border-amber-600 dark:border-amber-500 shadow-2xl text-white'
                          : 'bg-stone-50 dark:bg-stone-800 border-amber-300 dark:border-amber-600 hover:bg-amber-50 dark:hover:bg-stone-700 hover:border-amber-500 dark:hover:border-amber-500 shadow-lg'
                      } touch-manipulation overflow-hidden`}
                    >
                      {/* Tiki Pattern Corner */}
                      <div className="absolute top-0 right-0 w-12 h-12 opacity-20 dark:opacity-30">
                        <div className="w-full h-full bg-amber-900 dark:bg-amber-800 transform rotate-45 translate-x-6 -translate-y-6"></div>
                        <div className="absolute top-2 right-2 w-2 h-2 bg-amber-700 dark:bg-amber-600 rounded-full"></div>
                      </div>
                      
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center space-x-4 flex-1 min-w-0">
                          {/* Tiki Totem Icon */}
                          <div className={`w-12 h-16 flex-shrink-0 rounded-lg border-2 ${
                            isSelected ? 'border-white bg-amber-700 dark:bg-amber-600' : 'border-amber-600 dark:border-amber-500 bg-amber-100 dark:bg-amber-900'
                          } flex flex-col items-center justify-center relative`}>
                            <div className={`w-3 h-3 rounded-full ${isSelected ? 'bg-white' : 'bg-amber-800 dark:bg-amber-300'} mb-1`}></div>
                            <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-amber-800 dark:bg-amber-300'}`}></div>
                            <div className={`w-4 h-1 ${isSelected ? 'bg-white' : 'bg-amber-800 dark:bg-amber-300'} mt-1 rounded-full`}></div>
                          </div>
                          
                          <div className="text-left flex-1 min-w-0">
                            <h3 className={`font-bold text-lg sm:text-xl leading-tight mb-2 ${
                              isSelected ? 'text-white' : 'text-amber-900 dark:text-amber-100'
                            }`}>
                              {item.name}
                            </h3>
                            <span
                              className={`text-xs px-4 py-2 rounded-full inline-block font-semibold uppercase tracking-wide border-2 ${
                                isSelected
                                  ? 'bg-amber-600 dark:bg-amber-500 text-white border-amber-500 dark:border-amber-400'
                                  : 'bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 border-amber-400 dark:border-amber-600'
                              }`}
                            >
                              {item.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 flex-shrink-0">
                          {/* Info Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShowDescription(index);
                            }}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 flex items-center justify-center transition-all duration-200 touch-manipulation ${
                              isSelected 
                                ? 'bg-amber-600 dark:bg-amber-500 border-amber-500 dark:border-amber-400 text-white dark:text-white hover:bg-amber-500 dark:hover:bg-amber-400' 
                                : 'bg-stone-200 dark:bg-stone-700 border-amber-600 dark:border-amber-600 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-stone-600'
                            }`}
                            title="View description"
                          >
                            <span className="text-sm sm:text-base font-bold">i</span>
                          </button>

                          {/* Conditional Controls */}
                          {quantity === 0 ? (
                            /* Initial Add Button */
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(item.name, 1)}
                              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 flex items-center justify-center transition-all duration-200 touch-manipulation bg-amber-200 dark:bg-amber-800 border-amber-600 dark:border-amber-600 text-amber-800 dark:text-amber-200 hover:bg-amber-300 dark:hover:bg-amber-700"
                            >
                              <div className="text-lg font-bold">+</div>
                            </button>
                          ) : (
                            /* Expanded Quantity Controls */
                            <div className="flex items-center space-x-2">
                              {/* Minus Button */}
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item.name, -1)}
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 flex items-center justify-center transition-all duration-200 touch-manipulation ${
                                  isSelected 
                                    ? 'bg-amber-600 dark:bg-amber-500 border-amber-500 dark:border-amber-400 text-white dark:text-white hover:bg-amber-500 dark:hover:bg-amber-400' 
                                    : 'bg-amber-200 dark:bg-amber-800 border-amber-600 dark:border-amber-600 text-amber-800 dark:text-amber-200 hover:bg-amber-300 dark:hover:bg-amber-700'
                                }`}
                              >
                                <span className="text-lg font-bold">−</span>
                              </button>

                              {/* Quantity Display */}
                              <div className={`min-w-12 h-10 sm:h-12 px-3 rounded-xl border-3 flex items-center justify-center ${
                                isSelected 
                                  ? 'bg-amber-600 dark:bg-amber-500 border-amber-500 dark:border-amber-400 text-white dark:text-white' 
                                  : 'bg-amber-100 dark:bg-amber-900 border-amber-600 dark:border-amber-600 text-amber-800 dark:text-amber-200'
                              }`}>
                                <span className="text-base sm:text-lg font-bold">{quantity}</span>
                              </div>

                              {/* Plus Button */}
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item.name, 1)}
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 flex items-center justify-center transition-all duration-200 touch-manipulation ${
                                  isSelected 
                                    ? 'bg-amber-600 dark:bg-amber-500 border-amber-500 dark:border-amber-400 text-white dark:text-white hover:bg-amber-500 dark:hover:bg-amber-400' 
                                    : 'bg-amber-200 dark:bg-amber-800 border-amber-600 dark:border-amber-600 text-amber-800 dark:text-amber-200 hover:bg-amber-300 dark:hover:bg-amber-700'
                                }`}
                              >
                                <span className="text-lg font-bold">+</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description Panel */}
                    {showDesc && (
                      <div className="bg-stone-200 dark:bg-stone-700 border-2 border-amber-400 dark:border-amber-600 rounded-xl p-4 sm:p-6 animate-in slide-in-from-top-2 duration-300 relative">
                        <div className="absolute top-2 left-2 w-4 h-4 border-2 border-amber-600 dark:border-amber-500 rounded-full opacity-30"></div>
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-amber-600 dark:border-amber-500 rounded-full opacity-30"></div>
                        <p className="text-amber-900 dark:text-amber-100 text-sm sm:text-base leading-relaxed font-medium relative z-10">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tropical Border Decoration */}
          <div className="flex items-center justify-center space-x-4 py-4">
            <div className="h-px bg-amber-600 dark:bg-amber-500 flex-1 max-w-20"></div>
            <div className="w-6 h-6 border-2 border-amber-600 dark:border-amber-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-amber-600 dark:bg-amber-500 rounded-full"></div>
            </div>
            <div className="h-px bg-amber-600 dark:bg-amber-500 flex-1 max-w-20"></div>
          </div>

          {/* Selected Items Counter */}
          {Object.keys(itemQuantities).length > 0 && (
            <div className="bg-amber-100 dark:bg-amber-900 border-3 border-amber-500 dark:border-amber-600 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-amber-400 dark:bg-amber-500"></div>
              <div className="absolute top-2 right-4 w-6 h-6 border-2 border-amber-700 dark:border-amber-400 rounded-full opacity-30"></div>
              <div className="text-center relative z-10">
                <p className="text-amber-900 dark:text-amber-100 text-base sm:text-lg font-bold mb-2">
                  {Object.values(itemQuantities).reduce((sum, qty) => sum + qty, 0)} Sacred Elixir{Object.values(itemQuantities).reduce((sum, qty) => sum + qty, 0) > 1 ? 's' : ''} Selected
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {Object.entries(itemQuantities).map(([itemName, qty]) => (
                    <span key={itemName} className="bg-amber-600 dark:bg-amber-700 text-white dark:text-amber-100 px-3 py-1 rounded-full text-sm font-semibold">
                      {itemName} × {qty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Special Notes */}
          <div className="space-y-4">
            <div className="text-center">
              <label className="text-amber-900 dark:text-amber-100 font-bold text-lg sm:text-xl uppercase tracking-widest block mb-2">
                Special Requests
              </label>
              <div className="text-amber-700 dark:text-amber-300 text-sm font-light">Whisper your desires</div>
            </div>
            <div className="relative">
              <div className="absolute top-2 left-2 w-4 h-4 border-2 border-amber-600 dark:border-amber-500 rounded-full opacity-30"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-amber-600 dark:border-amber-500 rounded-full opacity-30"></div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Extra rum, coconut rim, served in a sacred vessel..."
                rows="3"
                className="w-full px-6 sm:px-8 py-4 sm:py-6 bg-stone-50 dark:bg-stone-800 border-3 border-amber-400 dark:border-amber-600 rounded-2xl text-amber-900 dark:text-amber-100 placeholder-amber-600 dark:placeholder-amber-400 focus:bg-white dark:focus:bg-stone-700 focus:border-amber-600 dark:focus:border-amber-500 focus:ring-4 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-200 resize-none text-sm sm:text-base touch-manipulation shadow-lg font-medium relative z-10"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="relative">
            <button
              onClick={handleSubmit}
              disabled={Object.keys(itemQuantities).length === 0}
              className={`w-full py-6 sm:py-8 rounded-2xl font-bold text-xl sm:text-2xl transition-all duration-300 transform active:scale-95 touch-manipulation shadow-2xl border-4 relative overflow-hidden ${
                Object.keys(itemQuantities).length > 0
                  ? 'bg-gradient-to-r from-amber-700 to-amber-800 dark:from-amber-600 dark:to-amber-700 text-white border-amber-500 dark:border-amber-400 hover:from-amber-600 hover:to-amber-700 dark:hover:from-amber-500 dark:hover:to-amber-600 hover:border-amber-400 dark:hover:border-amber-300 ring-4 ring-amber-300/50 dark:ring-amber-500/50'
                  : 'bg-stone-300 dark:bg-stone-600 border-stone-400 dark:border-stone-500 text-stone-500 dark:text-stone-400 cursor-not-allowed'
              }`}
            >
              {/* Tiki Pattern Overlay */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-3 left-6 w-8 h-8 border-3 border-current rounded-full animate-pulse"></div>
                <div className="absolute top-3 right-6 w-8 h-8 border-3 border-current rounded-full animate-pulse delay-300"></div>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-current rounded-full animate-pulse delay-150"></div>
              </div>
              <div className="relative z-10 flex items-center justify-center space-x-4">
                {Object.keys(itemQuantities).length > 0 ? (
                  <>
                    <div className="w-8 h-8 border-3 border-white rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="uppercase tracking-wider">Send to Sacred Tiki Bar</span>
                    <div className="w-8 h-8 border-3 border-white rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </>
                ) : (
                  <span>Choose Your Island Elixir First</span>
                )}
              </div>
            </button>
          </div>

          {/* Connect Page Link */}
          <button
            onClick={() => {
              // Store the current user name before navigating
              if (name) {
                sessionStorage.setItem('guestName', name);
              }
              navigate('/connect');
            }}
            className="w-full py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base transition-all duration-200 transform active:scale-98 touch-manipulation bg-transparent dark:bg-transparent hover:bg-stone-200 dark:hover:bg-stone-800 text-amber-700 dark:text-amber-300 border-2 border-amber-400 dark:border-amber-500 hover:border-amber-500 dark:hover:border-amber-400 shadow-md hover:shadow-lg"
          >
            <div className="flex items-center justify-center space-x-2 opacity-80 hover:opacity-100">
              <div className="w-3 h-3 border border-current rounded-full"></div>
              <span>Connect with Island Creator</span>
              <div className="w-3 h-3 border border-current rounded-full"></div>
            </div>
          </button>

          {/* Bottom Tropical Border */}
          <div className="flex items-center justify-center space-x-4 py-6">
            <div className="h-px bg-amber-600 dark:bg-amber-500 flex-1 max-w-20"></div>
            <div className="w-6 h-6 border-2 border-amber-600 dark:border-amber-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-amber-600 dark:bg-amber-500 rounded-full"></div>
            </div>
            <div className="h-px bg-amber-600 dark:bg-amber-500 flex-1 max-w-20"></div>
          </div>

          {/* Bottom safe area for mobile browsers */}
          <div className="h-4 sm:h-8"></div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderForm;
