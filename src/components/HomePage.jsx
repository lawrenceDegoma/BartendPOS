import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const HomePage = () => {
  const [guestName, setGuestName] = useState("");
  const [showMenuSelection, setShowMenuSelection] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're coming back from an order form with state
  useEffect(() => {
    if (location.state?.guestName && location.state?.showMenuSelection) {
      setGuestName(location.state.guestName);
      setShowMenuSelection(true);
    }
  }, [location.state]);

  const handleGuestContinue = () => {
    if (guestName.trim() === "") {
      alert("Please enter your name to continue.");
      return;
    }
    setShowMenuSelection(true);
  };

  const handleMenuSelection = (menuType) => {
    if (menuType === 'drinks') {
      navigate("/order", {state: { guestName } });
    } else if (menuType === 'food') {
      navigate("/food", {state: { guestName } });
    }
  };

  return(
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to Biggie's Spot</h1>
      
      {!showMenuSelection ? (
        <>
          <div className="mb-6 w-full max-w-sm">
            <label className="block mb-2 font-semibold text-lg">Enter your name</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Your name..."
              className="w-full px-4 py-3 rounded-xl !text-white !bg-black !border !border-gray-700"
            />
          </div>
          <button
            onClick={handleGuestContinue}
            className="mb-4 px-6 py-3 rounded-xl !bg-pink-600 !hover:bg-pink-700 transition w-full max-w-sm"
          >
            Continue as Guest
          </button>
        </>
      ) : (
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Hi {guestName}! 👋</h2>
            <p className="text-purple-200">What would you like to order?</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => handleMenuSelection('drinks')}
              className="w-full p-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">🍹</div>
                <h3 className="text-xl font-bold">Biggie's Bar</h3>
                <p className="text-purple-100 text-sm">Both alcoholic and non</p>
              </div>
            </button>
            
            <button
              onClick={() => handleMenuSelection('food')}
              className="w-full p-6 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 border border-gray-600"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">🍽️</div>
                <h3 className="text-xl font-bold">Biggie's Bites</h3>
                <p className="text-gray-300 text-sm">Yummy dishes & entrees</p>
              </div>
            </button>
          </div>
          
          <button
            onClick={() => setShowMenuSelection(false)}
            className="w-full py-2 text-purple-300 hover:text-white text-sm"
          >
            ← Back to name entry
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
