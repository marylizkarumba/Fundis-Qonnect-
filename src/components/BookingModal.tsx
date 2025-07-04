
import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Phone, MessageCircle, CreditCard } from 'lucide-react';
import MpesaPayment from './MpesaPayment';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: {
    name: string;
    service: string;
    rating: number;
    price: string;
    image: string;
    location: string;
  };
}

const BookingModal = ({ isOpen, onClose, provider }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  if (!isOpen) return null;

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const price = parseInt(provider.price.replace(/,/g, ''));

  const handleBookingConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    setShowPayment(true);
  };

  const handlePaymentSuccess = (data: any) => {
    console.log('Payment successful:', data);
    // Here you would typically save the booking to your database
    onClose();
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-md mx-4 rounded-t-3xl sm:rounded-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 rounded-t-3xl sm:rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {showPayment ? 'Payment' : 'Book Service'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Provider Info */}
          <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 rounded-xl">
            <img 
              src={provider.image} 
              alt={provider.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium">{provider.name}</h3>
              <p className="text-sm text-gray-600">{provider.service}</p>
              <p className="text-sm font-semibold text-green-600">KES {provider.price}</p>
            </div>
          </div>

          {!showPayment ? (
            <>
              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Select Time</label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 rounded-lg border text-sm transition-colors ${
                        selectedTime === time
                          ? 'bg-green-600 text-white border-green-600'
                          : 'border-gray-300 hover:border-green-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Additional Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific requirements or instructions..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-20 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBookingConfirm}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <CreditCard size={20} />
                  <span>Proceed to Payment - KES {provider.price}</span>
                </button>
                
                <div className="flex space-x-3">
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Phone size={16} />
                    <span className="text-sm">Call</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageCircle size={16} />
                    <span className="text-sm">WhatsApp</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <MpesaPayment
              amount={price}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
              accountReference={`Booking-${provider.name}`}
              transactionDesc={`Payment for ${provider.service}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
