import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Send, Bot } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const userMessage = {
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsLoading(true);

      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        const aiMessage = {
          text: "I'm here to help you with your studies. What would you like to learn about?",
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="font-sans bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md p-4 sm:p-6 w-full">
      <Navbar />
      
      <main className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
        <Sidebar />

        <section className="col-span-1 md:col-span-9 space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">AI Assistant</h2>
                <p className="text-xs sm:text-sm text-gray-500">Ask questions about your study materials</p>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-green-600">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full mr-1 sm:mr-1.5 animate-pulse"></span>
                <span>Online</span>
              </div>
            </div>
            
            <div className="h-[300px] sm:h-[400px] bg-gray-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 overflow-y-auto border border-gray-100">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Bot className="h-8 w-8 sm:h-12 sm:w-12 mb-2 sm:mb-4" />
                  <p className="text-center text-sm sm:text-base">Start a conversation with your AI assistant</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2 sm:mb-3`}>
                    <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white rounded-lg rounded-tr-none' : 'bg-gray-200 rounded-lg rounded-tl-none'} py-1.5 sm:py-2 px-2 sm:px-3 max-w-[80%]`}>
                      <p className="text-xs sm:text-sm">{message.text}</p>
                      <p className="text-[10px] sm:text-xs opacity-75 mt-0.5 sm:mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start mb-2 sm:mb-3">
                  <div className="bg-gray-200 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-xs sm:text-sm">Thinking...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSendMessage} className="relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask anything..."
                className="w-full py-2 sm:py-3 pl-3 sm:pl-4 pr-8 sm:pr-10 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
              />
              <button 
                type="submit" 
                className="absolute right-2 sm:right-3 top-2 sm:top-3 text-blue-600 hover:text-blue-700 transition-colors duration-300"
                disabled={!inputMessage.trim()}
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Chat; 