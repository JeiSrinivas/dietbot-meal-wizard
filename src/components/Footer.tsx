
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="bg-dietbot-primary text-white p-1 rounded-full">
                <span className="font-bold text-sm">DB</span>
              </div>
              <span className="font-bold text-lg text-dietbot-dark">DietBot</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Personalized meal plans for your health conditions</p>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col">
              <h4 className="font-semibold text-sm mb-2">Links</h4>
              <Link to="/" className="text-sm text-gray-600 hover:text-dietbot-primary">Home</Link>
              <Link to="/meal-wizard" className="text-sm text-gray-600 hover:text-dietbot-primary">Meal Wizard</Link>
              <Link to="/chatbot" className="text-sm text-gray-600 hover:text-dietbot-primary">Chat</Link>
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold text-sm mb-2">More</h4>
              <Link to="/about" className="text-sm text-gray-600 hover:text-dietbot-primary">About</Link>
              <a href="#" className="text-sm text-gray-600 hover:text-dietbot-primary">Privacy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-dietbot-primary">Terms</a>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} DietBot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
