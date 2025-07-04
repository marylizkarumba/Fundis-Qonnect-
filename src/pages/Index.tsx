import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import BookingModal from '../components/BookingModal';
import SearchPage from '../components/SearchPage';
import ProfilePage from '../components/ProfilePage';
import HomePage from '../components/HomePage';
import BookingsPage from '../components/BookingsPage';
import MessagesPage from '../components/MessagesPage';
import SEOHead from '../components/SEOHead';


const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const serviceProviders = [
     {
      id: 1,
      name: 'John Kimani',
      service: 'Professional Plumber',
      rating: 4.8,
      reviews: 127,
      price: '1,500',
      location: 'Westlands',
      image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face',
      isAvailable: true
    },
    {
      id: 2,
      name: 'Mary Wanjiku',
      service: 'House Cleaning Expert',
      rating: 4.9,
      reviews: 89,
      price: '2,000',
      location: 'Karen',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face',
      isAvailable: true
    },
    {
      id: 3,
      name: 'Peter Ochieng',
      service: 'Math & Science Tutor',
      rating: 4.7,
      reviews: 56,
      price: '800',
      location: 'Kasarani',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isAvailable: false
    },
    {
      id: 4,
      name: 'Grace Mutua',
      service: 'Event Photographer',
      rating: 4.6,
      reviews: 43,
      price: '5,000',
      location: 'Kiambu Road',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=150&h=150&fit=crop&crop=face',
      isAvailable: true
    },
    {
      id: 5,
      name: 'David Mwangi',
      service: 'Car Mechanic',
      rating: 4.5,
      reviews: 78,
      price: '3,500',
      location: 'Industrial Area',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isAvailable: true
    },
    {
      id: 6,
      name: 'Michael Otieno',
      service: 'Electrician',
      rating: 4.7,
      reviews: 92,
      price: '2,200',
      location: 'Kasarani',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      isAvailable: true
    },
    {
      id: 7,
      name: 'Lucy Wambui',
      service: 'Hairstylist',
      rating: 4.9,
      reviews: 156,
      price: '1,800',
      location: 'Westlands',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isAvailable: true
    },
    {
      id: 8,
      name: 'James Kariuki',
      service: 'Carpenter',
      rating: 4.6,
      reviews: 73,
      price: '2,800',
      location: 'Thika Road',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isAvailable: false
    },
    {
      id: 9,
      name: 'Catherine Muthoni',
      service: 'Massage Therapist',
      rating: 4.8,
      reviews: 87,
      price: '3,000',
      location: 'Kilimani',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      isAvailable: true
    },
    {
      id: 10,
      name: 'Nancy Akinyi',
      service: 'Catering Services',
      rating: 4.7,
      reviews: 112,
      price: '6,000',
      location: 'Karen',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      isAvailable: true
    },
    {
      id: 11,
      name: 'Thomas Mbugua',
      service: 'Painter',
      rating: 4.4,
      reviews: 68,
      price: '2,500',
      location: 'Eastlands',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isAvailable: true
    },
    {
      id: 12,
      name: 'Rose Wanjiru',
      service: 'Laundry Services',
      rating: 4.6,
      reviews: 94,
      price: '1,500',
      location: 'Roysambu',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face',
      isAvailable: true
    },
    {
      id: 13,
      name: 'Kevin Otieno',
      service: 'Graphic Designer',
      rating: 4.9,
      reviews: 101,
      price: '4,000',
      location: 'Parklands',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      isAvailable: true
    },
    {
      id: 14,
      name: 'Esther Waweru',
      service: 'Babysitter',
      rating: 4.9,
      reviews: 125,
      price: '1,000',
      location: 'Kileleshwa',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isAvailable: true
    },
    {
      id: 15,
      name: 'Samuel Gitau',
      service: 'Computer Repair',
      rating: 4.6,
      reviews: 82,
      price: '2,500',
      location: 'CBD',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isAvailable: true
    },
    {
      id: 16,
      name: 'Monica Kerubo',
      service: 'Event Planner',
      rating: 4.8,
      reviews: 67,
      price: '8,000',
      location: 'Westlands',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      isAvailable: true
    }
  ];

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
    setIsBookingModalOpen(true);
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'search':
        return 'Search Service Providers - Fundis Qonnect';
      case 'bookings':
        return 'My Bookings - Fundis Qonnect';
      case 'messages':
        return 'Messages - Fundis Qonnect';
      case 'profile':
        return 'My Profile - Fundis Qonnect';
      default:
        return 'Fundis Qonnect - Find Trusted Service Providers in Kenya';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            serviceProviders={serviceProviders}
            onProviderClick={handleProviderClick}
          />
        );
      case 'search':
        return <SearchPage serviceProviders={serviceProviders} onProviderClick={handleProviderClick} />;
      case 'bookings':
        return <BookingsPage />;
      case 'messages':
        return <MessagesPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return (
          <HomePage 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            serviceProviders={serviceProviders}
            onProviderClick={handleProviderClick}
          />
        );
    }
  };

  return (
    <>
      <SEOHead title={getPageTitle()} />
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header />
        
        <main>
          {renderTabContent()}
        </main>

        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          provider={selectedProvider}
        />
      </div>
    </>
  );
};

export default Index;
