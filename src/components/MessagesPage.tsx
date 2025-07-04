
import React, { useState } from 'react';
import { Search, Phone, Video, MoreVertical, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface Conversation {
  id: number;
  providerName: string;
  providerImage: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<number>(1);
  const [newMessage, setNewMessage] = useState('');

  // Mock data
  const conversations: Conversation[] = [
    {
      id: 1,
      providerName: 'John Kimani',
      providerImage: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'I can fix your plumbing issue tomorrow at 10 AM',
      timestamp: '2 min ago',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 2,
      providerName: 'Mary Wanjiku',
      providerImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thank you for choosing our cleaning service!',
      timestamp: '1 hour ago',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 3,
      providerName: 'Peter Ochieng',
      providerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'What subjects need tutoring?',
      timestamp: '3 hours ago',
      unreadCount: 1,
      isOnline: true
    }
  ];

  const messages: { [key: number]: Message[] } = {
    1: [
      {
        id: 1,
        text: 'Hi! I need help with a plumbing issue in my kitchen.',
        timestamp: '10:30 AM',
        isOwn: true
      },
      {
        id: 2,
        text: 'Hello! I can help you with that. What seems to be the problem?',
        timestamp: '10:32 AM',
        isOwn: false
      },
      {
        id: 3,
        text: 'The kitchen sink is leaking underneath and water is dripping.',
        timestamp: '10:33 AM',
        isOwn: true
      },
      {
        id: 4,
        text: 'I can fix your plumbing issue tomorrow at 10 AM. Would that work for you?',
        timestamp: '10:35 AM',
        isOwn: false
      }
    ],
    2: [
      {
        id: 1,
        text: 'Thank you for the excellent cleaning service!',
        timestamp: '2:00 PM',
        isOwn: true
      },
      {
        id: 2,
        text: 'Thank you for choosing our cleaning service! We appreciate your feedback.',
        timestamp: '2:05 PM',
        isOwn: false
      }
    ],
    3: [
      {
        id: 1,
        text: 'I need tutoring for my son in Math and Science.',
        timestamp: '4:00 PM',
        isOwn: true
      },
      {
        id: 2,
        text: 'What subjects need tutoring?',
        timestamp: '4:05 PM',
        isOwn: false
      }
    ]
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would send this to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);
  const conversationMessages = messages[selectedConversation] || [];

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-200px)] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-orange-50 border-orange-200' : ''
                }`}
              >
                <div className="flex space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.providerImage}
                      alt={conversation.providerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900 truncate">{conversation.providerName}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConv && (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={selectedConv.providerImage}
                      alt={selectedConv.providerName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {selectedConv.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedConv.providerName}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedConv.isOnline ? 'Online' : 'Last seen recently'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Phone size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Video size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreVertical size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversationMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? 'text-orange-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
