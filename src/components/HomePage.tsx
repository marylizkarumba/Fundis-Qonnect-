
import React from 'react';
import ServiceCategory from './ServiceCategory';
import ServiceCard from './ServiceCard';
import { 
  Wrench, 
  Sparkles, 
  GraduationCap, 
  Camera, 
  Car, 
  Scissors,
  TrendingUp,
  Shield,
  Star,
  Search
} from 'lucide-react';

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

interface HomePageProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  serviceProviders: ServiceProvider[];
  onProviderClick: (provider: ServiceProvider) => void;
}

const HomePage = ({ 
  selectedCategory, 
  setSelectedCategory, 
  serviceProviders, 
  onProviderClick 
}: HomePageProps) => {
  const serviceCategories = [
    { id: 'all', icon: <TrendingUp size={20} />, title: 'All Services', count: 150 },
    { id: 'plumber', icon: <Wrench size={20} />, title: 'Plumbers', count: 25 },
    { id: 'cleaner', icon: <Sparkles size={20} />, title: 'Cleaners', count: 30 },
    { id: 'tutor', icon: <GraduationCap size={20} />, title: 'Tutors', count: 20 },
    { id: 'photographer', icon: <Camera size={20} />, title: 'Photographers', count: 15 },
    { id: 'mechanic', icon: <Car size={20} />, title: 'Mechanics', count: 18 },
    { id: 'barber', icon: <Scissors size={20} />, title: 'Barbers', count: 22 },
  ];

  const filteredProviders = selectedCategory === 'all' 
    ? serviceProviders 
    : serviceProviders.filter(provider => 
        provider.service.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Find the <span className="text-yellow-300">skilled professionals</span> you need
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Connect with verified local service providers in Kenya. From plumbers to tutors, find trusted fundis for any job.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg">
                  Find Services
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg">
                  Become a Provider
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Shield size={18} className="mr-2" />
                  <span>100% Verified</span>
                </div>
                <div className="flex items-center">
                  <Star size={18} className="mr-2" />
                  <span>Top Rated</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold">1000+</span>
                  <span className="ml-1">Happy Clients</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="bg-white rounded-xl shadow-lg p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" 
                    alt="Professional" 
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="text-gray-900 font-semibold">You have a new job offer from</div>
                    <div className="text-gray-600">David Mwangi</div>
                  </div>
                </div>
                <div className="text-gray-700">Hi there! Ready to fix your plumbing issue? Can we discuss the project details?</div>
              </div>

              <div className="bg-yellow-400 rounded-xl shadow-lg p-4 transform -rotate-2 hover:rotate-0 transition-transform duration-300 mt-4 ml-8">
                <div className="text-gray-900 font-semibold">You just got a</div>
                <div className="text-xl font-bold text-gray-900">payment KES 2,500</div>
                <div className="text-gray-700">from Grace Mutua</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for services, professionals, or location..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <button className="absolute right-2 top-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="max-w-7xl mx-auto p-4 pt-8">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
          {serviceCategories.map((category) => (
            <ServiceCategory
              key={category.id}
              icon={category.icon}
              title={category.title}
              count={category.count}
              isActive={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            />
          ))}
        </div>

        {/* Featured Providers */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'all' ? 'Top Professionals' : `Available ${serviceCategories.find(c => c.id === selectedCategory)?.title}`}
          </h3>
          <button className="text-blue-600 text-lg font-medium hover:text-blue-700">View All</button>
        </div>

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
      </div>
    </>
  );
};

export default HomePage;
