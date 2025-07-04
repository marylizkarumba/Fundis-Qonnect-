
import React from 'react';
import { Star, MapPin, Clock, Phone } from 'lucide-react';

interface ServiceCardProps {
  name: string;
  service: string;
  rating: number;
  reviews: number;
  price: string;
  location: string;
  image: string;
  isAvailable: boolean;
  onClick: () => void;
}

const ServiceCard = ({ 
  name, 
  service, 
  rating, 
  reviews, 
  price, 
  location, 
  image, 
  isAvailable,
  onClick 
}: ServiceCardProps) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-blue-200"
      onClick={onClick}
    >
      <div className="flex space-x-4">
        <div className="relative">
          <img 
            src={image} 
            alt={name}
            className="w-20 h-20 rounded-2xl object-cover"
          />
          {isAvailable && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-3 border-white"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-gray-900 truncate">{name}</h3>
              <p className="text-gray-600 mb-2">{service}</p>
            </div>
            <div className="text-right">
              <span className="text-blue-600 font-bold text-lg">KES {price}</span>
              <p className="text-xs text-gray-500">per service</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Star size={14} className="text-yellow-400 fill-current mr-1" />
              <span className="font-medium text-gray-700">{rating}</span>
              <span className="text-gray-500">({reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              <span>{location}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm">
              <Clock size={14} className="mr-2 text-orange-500" />
              <span className={`font-medium ${isAvailable ? 'text-orange-500' : 'text-gray-500'}`}>
                {isAvailable ? 'Available now' : 'Busy'}
              </span>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Hire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
