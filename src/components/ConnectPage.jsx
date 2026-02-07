import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaGithub, FaDollarSign } from 'react-icons/fa';

const ConnectPage = () => {
  const navigate = useNavigate();

  const handleBackToOrder = () => {
    // Get the stored guest name and pass it back to the order page
    const storedName = sessionStorage.getItem('guestName');
    if (storedName) {
      navigate('/order', { state: { guestName: storedName } });
    } else {
      navigate('/order');
    }
  };

  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@your_instagram', // Replace with your actual Instagram handle
      url: 'https://www.instagram.com/lawrinsane?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600',
      description: 'Follow my island adventures',
      icon: FaInstagram
    },
    {
      name: 'LinkedIn',
      handle: 'Your Professional Profile', // Replace with your name
      url: 'https://linkedin.com/in/lawrenceDegoma',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      description: 'Connect professionally',
      icon: FaLinkedin
    },
    {
      name: 'GitHub',
      handle: 'lawrenceDegoma', // Using your GitHub username from the repo
      url: 'https://github.com/lawrenceDegoma',
      bgColor: 'bg-gray-800',
      hoverColor: 'hover:bg-gray-900',
      description: 'Check out my code',
      icon: FaGithub
    },
    {
      name: 'Venmo',
      handle: '@your-venmo', // Replace with your actual Venmo handle
      url: 'https://venmo.com/Ldegoma',
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      description: 'Buy me a tropical drink',
      icon: FaDollarSign
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50 w-screen flex flex-col">
      {/* Header */}
      <div className="bg-amber-900 shadow-lg border-b border-amber-800">
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBackToOrder}
            className="text-amber-200 hover:text-amber-100 transition-colors duration-200 flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back </span>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-amber-50 tracking-wide">
            Connect with Me
          </h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 py-8 flex flex-col items-center">
        <div className="w-full max-w-md space-y-6">
          {/* Intro Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-amber-900 mb-2">Let's Connect!</h2>
            <p className="text-amber-700 font-light">
              Thanks for enjoying the Tiki Cove experience. Follow me on social media or support the project!
            </p>
            <div className="w-16 h-1 bg-teal-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-2 gap-6 max-w-xs mx-auto">
            {socialLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`aspect-square rounded-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl ${link.bgColor} ${link.hoverColor} border-2 border-transparent hover:border-white/30`}
                  title={`${link.name} - ${link.description}`}
                >
                  <IconComponent className="text-4xl text-white" />
                </a>
              );
            })}
          </div>

          {/* Platform Labels */}
          <div className="grid grid-cols-2 gap-6 max-w-xs mx-auto mt-3">
            {socialLinks.map((link, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-medium text-amber-800">{link.name}</div>
                <div className="text-xs text-amber-600 opacity-75">{link.description}</div>
              </div>
            ))}
          </div>

          <div className="h-8"></div>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;
