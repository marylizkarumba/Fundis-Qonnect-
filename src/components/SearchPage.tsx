
import React, { useState } from 'react';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import ServiceCard from './ServiceCard';

interface ServiceProvider {
  id: number;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  price: string;
  location: string;
  image: string;
  isAvailable: boolean;
}

interface SearchPageProps {
  serviceProviders: ServiceProvider[];
  onProviderClick: (provider: ServiceProvider) => void;
}

const SearchPage = ({ serviceProviders, onProviderClick }: SearchPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const locations = ['all', 'Westlands', 'Karen', 'Kilimani', 'CBD', 'Industrial Area', 'Lavington', 'Kasarani', 'Thika Road', 'Langata', 'Roysambu', 'Kileleshwa', 'Eastlands', 'Runda', 'Gikomba'];

  const filteredProviders = serviceProviders
    .filter(provider => 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.service.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(provider => 
      selectedLocation === 'all' || provider.location === selectedLocation
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, ''));
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Service Providers</h1>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for services or providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-gray-500" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
              <option value="reviews">Sort by Reviews</option>
            </select>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          Found {filteredProviders.length} service providers
        </p>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProviders.map((provider) => (
          <ServiceCard
            key={provider.id}
            name={provider.name}
            service={provider.service}
            rating={provider.rating}
            reviews={provider.reviews}
            price={provider.price}
            location={provider.location}
            image={provider.image}
            isAvailable={provider.isAvailable}
            onClick={() => onProviderClick(provider)}
          />
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No service providers found matching your criteria.</p>
          <p className="text-gray-400">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
