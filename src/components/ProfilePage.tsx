
import React, { useState } from 'react';
import { Camera, Edit, MapPin, Phone, Mail, Star, Award, Clock, CreditCard } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Mwangi',
    email: 'alex.mwangi@gmail.com',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
    bio: 'Regular user of Fundis Qonnect, love finding reliable service providers in my area.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const stats = [
    { icon: <Award size={20} />, label: 'Bookings Made', value: '12' },
    { icon: <Star size={20} />, label: 'Average Rating Given', value: '4.8' },
    { icon: <Clock size={20} />, label: 'Member Since', value: 'Jan 2024' },
    { icon: <CreditCard size={20} />, label: 'Total Spent', value: 'KES 28,500' }
  ];

  const recentBookings = [
    {
      id: 1,
      provider: 'John Kimani',
      service: 'Plumbing',
      date: '2024-01-15',
      rating: 5,
      amount: '1,500'
    },
    {
      id: 2,
      provider: 'Mary Wanjiku',
      service: 'House Cleaning',
      date: '2024-01-12',
      rating: 5,
      amount: '2,000'
    },
    {
      id: 3,
      provider: 'Peter Ochieng',
      service: 'Tutoring',
      date: '2024-01-10',
      rating: 4,
      amount: '800'
    }
  ];

  const handleSave = () => {
    // In a real app, you would save to your backend
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <img
              src={profileData.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors">
              <Camera size={16} />
            </button>
          </div>

          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="text-2xl font-bold border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="text-gray-600 border border-gray-300 rounded-lg px-3 py-2 w-full h-20 resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Tell us about yourself..."
                />
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{profileData.name}</h1>
                <p className="text-gray-600 mb-4">{profileData.bio}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : (
                  <span>{profileData.email}</span>
                )}
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : (
                  <span>{profileData.phone}</span>
                )}
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : (
                  <span>{profileData.location}</span>
                )}
              </div>
            </div>

            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit size={16} />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <div className="flex justify-center text-orange-500 mb-2">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{booking.provider}</h3>
                <p className="text-sm text-gray-600">{booking.service}</p>
                <p className="text-xs text-gray-500">{new Date(booking.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < booking.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="font-bold text-orange-600">KES {booking.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
