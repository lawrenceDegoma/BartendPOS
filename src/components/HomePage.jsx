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
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to Biggie's Bar</h1>
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
    </div>
  );
};

export default HomePage;
