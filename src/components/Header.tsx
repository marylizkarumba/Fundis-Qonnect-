
import React from 'react';
import { MapPin, Bell, User, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FQ</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Fundis Qonnect</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Find Services</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Become a Provider</a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center text-xs text-gray-500">
            <MapPin size={12} className="mr-1" />
            <span>Nairobi, Kenya</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Bell size={20} className="text-gray-600 hover:text-orange-500 cursor-pointer" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
