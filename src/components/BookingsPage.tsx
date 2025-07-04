
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, MessageCircle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Booking {
  id: number;
  providerName: string;
  service: string;
  date: string;
  time: string;
  location: string;
  price: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  providerImage: string;
  notes?: string;
}

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data - in a real app, this would come from your backend
  const bookings: Booking[] = [
    {
      id: 1,
      providerName: 'John Kimani',
      service: 'Professional Plumber',
      date: '2024-01-15',
      time: '10:00 AM',
      location: 'Westlands',
      price: '1,500',
      status: 'confirmed',
      providerImage: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face',
      notes: 'Fix kitchen sink leak'
    },
    {
      id: 2,
      providerName: 'Mary Wanjiku',
      service: 'House Cleaning Expert',
      date: '2024-01-12',
      time: '2:00 PM',
      location: 'Karen',
      price: '2,000',
      status: 'completed',
      providerImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      providerName: 'Peter Ochieng',
      service: 'Math & Science Tutor',
      date: '2024-01-20',
      time: '4:00 PM',
      location: 'Kilimani',
      price: '800',
      status: 'pending',
      providerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'completed':
        return <CheckCircle size={16} className="text-blue-500" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-500" />;
      case 'pending':
        return <AlertCircle size={16} className="text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50';
      case 'completed':
        return 'text-blue-600 bg-blue-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'upcoming') {
      return booking.status === 'confirmed' || booking.status === 'pending';
    } else if (activeTab === 'completed') {
      return booking.status === 'completed';
    } else {
      return booking.status === 'cancelled';
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'completed', label: 'Completed' },
          { id: 'cancelled', label: 'Cancelled' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex space-x-4">
              <img
                src={booking.providerImage}
                alt={booking.providerName}
                className="w-16 h-16 rounded-xl object-cover"
              />
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{booking.providerName}</h3>
                    <p className="text-gray-600">{booking.service}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span className="capitalize">{booking.status}</span>
                    </div>
                    <p className="text-orange-600 font-bold text-lg mt-1">KES {booking.price}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2" />
                    <span>{booking.location}</span>
                  </div>
                </div>

                {booking.notes && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-700"><strong>Notes:</strong> {booking.notes}</p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Phone size={16} />
                    <span>Call</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageCircle size={16} />
                    <span>Message</span>
                  </button>
                  {booking.status === 'confirmed' && (
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                      Reschedule
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No {activeTab} bookings found.</p>
          <p className="text-gray-400">Book a service to get started!</p>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
