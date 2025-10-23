import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderContext } from "./OrderContext";

const foodMenuItems = [
  { 
    name: 'Grilled Ribeye Steak', 
    emoji: '🥩', 
    category: 'Entree',
    description: 'Reverse seared ribeye steak, seasoned simply with salt and pepper, served with roasted vegetables and fennel salad. Cooked medium-rare or medium. Ask me if you want... anything more done.',
    price: 'Free.99'
  },
  { 
    name: 'Miso Salmon', 
    emoji: '🐟', 
    category: 'Entree',
    description: 'Salmon marinated in a miso glaze, broiled to a tender finish, served on a bed of steamed garlic bok choy',
    price: 'Free.99'
  },
  { 
    name: 'Fettuccine Alfredo', 
    emoji: '🍝', 
    category: 'Entree',
    description: 'Fettucine pasta with signature creamy alfredo sauce with fresh parmesan and herbs. Protein choices of chicken or steak.',
    price: 'Free.99'
  },
];

const FoodOrderForm = () => {
  const { addOrder } = useContext(OrderContext);
  const location = useLocation();
  const navigate = useNavigate();

  const initialName = location.state?.guestName || '';
  const [name] = useState(initialName);

  const [selectedItems, setSelectedItems] = useState([]);
  const [notes, setNotes] = useState('');
  const [showDescription, setShowDescription] = useState(null);

  const handleItemToggle = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item.name)
        ? prev.filter((i) => i !== item.name)
        : [...prev, item.name]
    );
  };

  const handleShowDescription = (index) => {
    setShowDescription(showDescription === index ? null : index);
  };

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one dish! 🍽️');
      return;
    }

    const foodData = selectedItems.map((dishName) =>
      foodMenuItems.find((item) => item.name === dishName)
    );

    const order = {
      id: Date.now() + Math.random(),
      customer: name || "Anonymous",
      items: foodData,
      notes,
      type: 'food'
    };

    addOrder(order);

    // Reset form with a slight delay for visual feedback
    setTimeout(() => {
      setSelectedItems([]);
      setNotes('');
    }, 300);
  };

  return (
    <div className="min-h-screen w-screen max-w-none bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col overflow-x-hidden">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm border-b border-gray-600/30 flex-shrink-0 w-full">
        <div className="px-4 sm:px-6 py-3 sm:py-4 w-full max-w-none relative">
          <button
            onClick={() => navigate('/', { state: { guestName: name, showMenuSelection: true } })}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-gray-100 transition-colors duration-200 flex items-center space-x-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Back</span>
          </button>
          
          <h1 className="text-xl sm:text-2xl font-bold text-gray-100 text-center">
            Biggie's Bistro
          </h1>
          <p className="text-gray-300 text-center text-xs sm:text-sm mt-1">
            Gourmet dining experience
          </p>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-safe w-full max-w-none">
          {/* Food Selection */}
          <div className="space-y-3 sm:space-y-4">
            <label className="text-gray-200 font-medium text-xs sm:text-sm uppercase tracking-wide">
              Select Your Dish
            </label>

            <div className="grid gap-3 sm:gap-4">
              {foodMenuItems.map((item, index) => {
                const isSelected = selectedItems.includes(item.name);
                const showDesc = showDescription === index;

                return (
                  <div key={index} className="space-y-3">
                    <div
                      className={`p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-gray-500 shadow-xl shadow-gray-500/20'
                          : 'bg-gray-800/50 border-gray-600/40 hover:bg-gray-700/60 hover:border-gray-500/60'
                      } backdrop-blur-sm touch-manipulation`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                          <span className="text-2xl sm:text-3xl flex-shrink-0">{item.emoji}</span>
                          <div className="text-left flex-1 min-w-0">
                            <h3 className="font-bold text-gray-100 text-base sm:text-lg leading-tight">
                              {item.name}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                isSelected
                                  ? 'bg-gray-600/60 text-gray-200'
                                  : 'bg-gray-700/60 text-gray-300'
                              }`}>
                                {item.category}
                              </span>
                              <span className="text-xs text-gray-400">
                                {item.prepTime}
                              </span>
                            </div>
                            <span className="text-xs text-green-400 font-medium">
                              {item.price}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 flex-shrink-0">
                          {/* Info Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShowDescription(index);
                            }}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200 touch-manipulation bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 active:bg-gray-600"
                            title="View description"
                          >
                            <span className="text-xs sm:text-sm font-bold">i</span>
                          </button>

                          {/* Select Button */}
                          <button
                            type="button"
                            onClick={() => handleItemToggle(item)}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200 touch-manipulation bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 active:bg-gray-600"
                          >
                            {isSelected && (
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-green-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Description Panel */}
                    {showDesc && (
                      <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 border border-gray-600/40 rounded-xl p-3 sm:p-4 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
                        <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Items Counter */}
          {selectedItems.length > 0 && (
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-700/40 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
              <p className="text-green-300 text-xs sm:text-sm font-medium">
                ✨ {selectedItems.length} dish{selectedItems.length > 1 ? 'es' : ''} selected
              </p>
            </div>
          )}

          {/* Special Notes */}
          <div className="space-y-2">
            <label className="text-gray-200 font-medium text-xs sm:text-sm uppercase tracking-wide">
              Special Requests
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Medium rare, extra sauce, no vegetables... 😋"
              rows="3"
              className="w-full px-3 sm:px-4 py-3 bg-gray-800/50 border border-gray-600/40 rounded-xl text-gray-100 placeholder-gray-400 focus:bg-gray-700/60 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/30 transition-all duration-200 backdrop-blur-sm resize-none text-sm sm:text-base touch-manipulation"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={selectedItems.length === 0}
            className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 transform active:scale-95 touch-manipulation ${
              selectedItems.length > 0
                ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white border-2 border-gray-500 shadow-lg shadow-gray-500/20 hover:from-gray-600 hover:to-gray-500'
                : 'bg-gray-800 border-2 border-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedItems.length > 0 ? (
              <span className="flex items-center justify-center space-x-2">
                <span>👨‍🍳</span>
                <span>Send to Kitchen</span>
                <span>✨</span>
              </span>
            ) : (
              'Select a dish to continue'
            )}
          </button>

          {/* Bottom safe area for mobile browsers */}
          <div className="h-4 sm:h-8"></div>
        </div>
      </div>
    </div>
  );
};

export default FoodOrderForm;
