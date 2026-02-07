import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [guestName, setGuestName] = useState("");
  const navigate = useNavigate();

  const handleGuestContinue = () => {
    if (guestName.trim() === "") {
      alert("Please enter your name to continue.");
      return;
    }
    navigate("/order", {state: { guestName } });
  };

  return(
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-stone-100 text-amber-900 px-4 relative overflow-hidden">
      {/* Bamboo Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #8B4513 0px,
            #8B4513 6px,
            #A0522D 6px,
            #A0522D 12px
          )`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Floating Tiki Elements */}
      <div className="absolute top-10 left-10 w-8 h-8 border-2 border-amber-600 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-20 right-16 w-6 h-6 border-2 border-amber-600 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-6 h-6 border-2 border-amber-600 rounded-full opacity-20 animate-pulse delay-500"></div>
      <div className="absolute bottom-32 right-12 w-8 h-8 border-2 border-amber-600 rounded-full opacity-20 animate-pulse delay-1500"></div>

      <div className="text-center mb-12 relative z-10">
        {/* Tiki Mask Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-28 bg-amber-800 rounded-2xl border-4 border-amber-600 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
            {/* Tiki Face */}
            <div className="absolute top-0 left-0 w-full h-8 bg-amber-700 rounded-t-xl"></div>
            <div className="w-4 h-4 bg-white rounded-full mb-2 relative z-10"></div>
            <div className="w-3 h-3 bg-white rounded-full mb-2 relative z-10"></div>
            <div className="w-6 h-2 bg-white rounded-full relative z-10"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-amber-600 rounded-full"></div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-tiki-title mb-4 text-amber-900 tracking-wide relative">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 border-2 border-amber-700 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
            </div>
            <span>Tiki Cove</span>
            <div className="w-8 h-8 border-2 border-amber-700 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
            </div>
          </div>
        </h1>
        
        {/* Decorative Tiki Border */}
        <div className="flex items-center justify-center space-x-6 mb-8">
          <div className="h-px bg-amber-600 flex-1 max-w-16"></div>
          <div className="w-6 h-6 border-2 border-amber-600 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
          </div>
          <div className="h-px bg-amber-600 flex-1 max-w-16"></div>
          <div className="w-6 h-6 border-2 border-amber-600 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
          </div>
          <div className="h-px bg-amber-600 flex-1 max-w-16"></div>
        </div>
      </div>
      
      <div className="mb-10 w-full max-w-sm relative z-10">
        <div className="text-center mb-6">
          <label className="block mb-4 font-tiki-header text-xl text-amber-800 uppercase tracking-wider">
            Your Island Name
          </label>
        </div>
        <div className="relative">
          <div className="absolute top-3 left-3 w-4 h-4 border-2 border-amber-600 rounded-full opacity-40"></div>
          <div className="absolute top-3 right-3 w-4 h-4 border-2 border-amber-600 rounded-full opacity-40"></div>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full px-12 py-4 rounded-2xl bg-stone-50 border-3 border-amber-400 text-amber-900 placeholder-amber-500 focus:border-amber-600 focus:ring-4 focus:ring-amber-200 transition-all duration-200 shadow-xl text-center font-tiki-body text-lg relative z-10"
          />
        </div>
      </div>
      
      <button
        onClick={handleGuestContinue}
        className="mb-8 px-8 py-4 rounded-2xl !bg-black hover:bg-stone-800 text-white font-tiki-body font-bold text-lg transition-all duration-200 w-full max-w-sm shadow-2xl border-4 border-stone-600 hover:border-stone-500 active:scale-95 relative overflow-hidden"
      >
        {/* Tiki Button Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-2 left-4 w-4 h-4 border-2 border-white rounded-full"></div>
          <div className="absolute top-2 right-4 w-4 h-4 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-white rounded-full"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center space-x-3">
          <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span>Enter Paradise</span>
          <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </button>
      
      <div className="text-center relative z-10">
        <p className="text-amber-600 text-base font-light max-w-md leading-relaxed">
          Welcome to Tiki Cove where ancient spirits aren't in reference to the ancestors
        </p>
        
        {/* Bottom Decorative Elements */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          <div className="w-6 h-6 border-2 border-amber-500 rounded-full opacity-60"></div>
          <div className="h-px bg-amber-500 w-16"></div>
          <div className="w-8 h-8 border-2 border-amber-500 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
          </div>
          <div className="h-px bg-amber-500 w-16"></div>
          <div className="w-6 h-6 border-2 border-amber-500 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
