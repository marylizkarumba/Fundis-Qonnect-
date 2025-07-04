
import React from 'react';

interface ServiceCategoryProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

const ServiceCategory = ({ icon, title, count, isActive, onClick }: ServiceCategoryProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
        isActive
          ? 'border-orange-500 bg-orange-50 text-orange-600'
          : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
      }`}
    >
      <div className="flex flex-col items-center space-y-2">
        <div className={`p-3 rounded-xl ${isActive ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
          {icon}
        </div>
        <div className="text-center">
          <p className="font-medium text-sm">{title}</p>
          <p className="text-xs text-gray-500">{count} available</p>
        </div>
      </div>
    </button>
  );
};

export default ServiceCategory;
