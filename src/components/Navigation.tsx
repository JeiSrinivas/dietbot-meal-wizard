
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-dietbot-primary text-white p-2 rounded-full">
            <span className="font-bold text-xl">DB</span>
          </div>
          <span className="font-bold text-xl text-dietbot-dark">DietBot</span>
        </Link>
        <div className="flex gap-4">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/meal-wizard">
            <Button variant="ghost">Meal Wizard</Button>
          </Link>
          <Link to="/chatbot">
            <Button variant="ghost">Chat</Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost">About</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
