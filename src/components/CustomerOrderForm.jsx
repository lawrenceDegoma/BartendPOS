import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { OrderContext } from "./OrderContext";

const menuItems = [
  { 
    name: 'Long Island Iced Tea', 
    emoji: '🍹', 
    category: 'Strong',
    description: 'A potent mix of vodka, rum, gin, tequila, and triple sec with cola. Despite the name, no tea involved - just a smooth, strong cocktail that tastes surprisingly refreshing!',
    recipe: ''
  },
  { 
    name: 'Tokyo Tea', 
    emoji: '🍵', 
    category: 'Strong',
    description: 'Similar to Long Island but with melon liqueur instead of cola, giving it a beautiful green color and a slightly sweeter, fruity taste. Still packs a punch!',
    recipe: ''
  },
  { 
    name: 'Midori Sour', 
    emoji: '🍸', 
    category: 'Classic',
    description: 'A vibrant neon-green cocktail known for its sweet and sour flavor profile.',
    recipe: ''
  },
  { 
    name: 'Moscow Mule', 
    emoji: '🥃', 
    category: 'Classic',
    description: 'Vodka, spicy ginger beer, and fresh lime juice served in a copper mug. Refreshing, zesty, and has a nice kick from the ginger. A timeless favorite!',
    recipe: ''
  },
  { 
    name: 'Lemon Drop', 
    emoji: '🍋', 
    category: 'Sweet',
    description: 'Vodka-based cocktail with fresh lemon juice and simple syrup, served with a sugar rim. Sweet, tart, and goes down dangerously smooth!',
    recipe: ''
  },
  { 
    name: 'Green Tea Shot', 
    emoji: '🟢', 
    category: 'Shot',
    description: 'A fun party shot mixing whiskey, peach schnapps, sour mix, and Sprite. Tastes like sweet tea but with a boozy twist. Perfect for group toasts!',
    recipe: ''
  },
];

const CustomerOrderForm = () => {
  const { addOrder } = useContext(OrderContext);
  const location = useLocation();

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
      alert('Please select at least one drink! 🍹');
      return;
    }

    const drinksData = selectedItems.map((drinkName) =>
      menuItems.find((item) => item.name === drinkName)
    );

    const order = {
      id: Date.now() + Math.random(),
      customer: name || "Anonymous",
      items: drinksData,
      notes,
    };

    addOrder(order);

    // Reset form with a slight delay for visual feedback
    setTimeout(() => {
      setSelectedItems([]);
      setNotes('');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-white text-center">
            Biggie's Bar
          </h1>
          <p className="text-purple-200 text-center text-sm mt-1">
            What's your poison tonight?
          </p>
        </div>
      </div>

      {/* Wrap all siblings in a container */}
      <div className="px-6 py-6 space-y-6">
        {/* Drink Selection */}
        <div className="space-y-4">
          <label className="text-white font-medium text-sm uppercase tracking-wide">
            Choose Your Drinks
          </label>

          <div className="grid gap-3">
            {menuItems.map((item, index) => {
              const isSelected = selectedItems.includes(item.name);
              const showDesc = showDescription === index;

              return (
                <div key={index} className="space-y-2">
                  <div
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 shadow-lg shadow-purple-500/25'
                        : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-purple-300'
                    } backdrop-blur-sm`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <span className="text-2xl">{item.emoji}</span>
                        <div className="text-left flex-1">
                          <h3 className={`font-semibold text-white`}>
                            {item.name}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-purple-500/30 text-purple-200'
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* Info Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowDescription(index);
                          }}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            showDesc
                              ? 'bg-yellow-400 border-yellow-400 text-yellow-900'
                              : isSelected
                              ? 'border-white/60 text-white/80 hover:bg-white/20'
                              : 'border-white/40 text-white/60 hover:bg-white/10'
                          }`}
                          title="View description"
                        >
                          <span className="text-sm font-bold">i</span>
                        </button>

                        {/* Select Button */}
                        <button
                          type="button"
                          onClick={() => handleItemToggle(item)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 transform active:scale-95 ${
                            isSelected
                              ? 'bg-white border-white'
                              : 'border-white/40 hover:bg-white/10'
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="w-4 h-4 text-purple-600"
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
                    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-4 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
                      <p className="text-blue-100 text-sm leading-relaxed">
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
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-green-200 text-sm font-medium">
              ðŸ›’ {selectedItems.length} drink{selectedItems.length > 1 ? 's' : ''} selected
            </p>
          </div>
        )}

        {/* Special Notes */}
        <div className="space-y-2">
          <label className="text-white font-medium text-sm uppercase tracking-wide">
            Special Requests
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Extra lime, no ice, make it strong..."
            rows="3"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:bg-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-200 backdrop-blur-sm resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={selectedItems.length === 0}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform active:scale-95 ${
            selectedItems.length > 0
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25 hover:from-pink-600 hover:to-purple-700'
              : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
          }`}
        >
          {selectedItems.length > 0 ? (
            <span className="flex items-center justify-center space-x-2">
              <span>ðŸš€</span>
              <span>Send My Order</span>
              <span>ðŸ»</span>
            </span>
          ) : (
            'Select drinks to continue'
          )}
        </button>

        {/* Bottom Spacing for Mobile */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default CustomerOrderForm;
