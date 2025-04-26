import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Send, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const Chat = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const url = import.meta.env.VITE_PYTHON_BACKEND_URL;

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

      try {
        const response = await fetch(`${url}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: inputMessage,
            messages: messages
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const aiMessage = {
          text: data.response,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage = {
          text: "Sorry, I encountered an error. Please try again later.",
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <div className="font-sans bg-gradient-to-br from-green-200 to-white rounded-xl shadow-md p-4 sm:p-6 w-full min-h-screen flex flex-col">
      <Navbar />

      <main className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 flex-grow">
        <Sidebar />

        <section className="col-span-1 md:col-span-10 space-y-4 sm:space-y-6 font-open-sans flex flex-col h-full">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col flex-grow">
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

            <div className="flex-grow bg-gray-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 overflow-y-scroll border border-gray-100 ">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Bot className="h-8 w-8 sm:h-12 sm:w-12 mb-2 sm:mb-4" />
                  <p className="text-center text-sm sm:text-base">Start a conversation with your AI assistant</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2 sm:mb-3`}>
                    <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white rounded-lg rounded-tr-none' : 'bg-gray-200 rounded-lg rounded-tl-none'} py-1.5 sm:py-2 px-2 sm:px-3 max-w-[80%]`}>
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                          components={{
                            p: ({node, ...props}) => <p className="text-xs sm:text-sm leading-relaxed" {...props} />,
                            h1: ({node, ...props}) => <h1 className="text-lg sm:text-xl font-bold leading-tight" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-base sm:text-lg font-bold leading-tight" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-sm sm:text-base font-bold leading-tight" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-4 space-y-1" {...props} />,
                            li: ({node, ...props}) => <li className="text-xs sm:text-sm leading-relaxed" {...props} />,
                            code: ({node, inline, ...props}) => 
                              inline ? (
                                <code className="bg-gray-700 text-white px-1 py-0.5 rounded leading-normal" {...props} />
                              ) : (
                                <pre className="bg-gray-700 text-white p-2 rounded overflow-x-auto leading-normal">
                                  <code {...props} />
                                </pre>
                              ),
                            blockquote: ({node, ...props}) => (
                              <blockquote className="border-l-4 border-gray-400 pl-4 italic leading-relaxed" {...props} />
                            ),
                            math: ({node, ...props}) => <div className="my-2 leading-normal" {...props} />,
                            inlineMath: ({node, ...props}) => <span className="leading-normal" {...props} />,
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
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

            <form onSubmit={handleSendMessage} className="relative mt-2">
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
