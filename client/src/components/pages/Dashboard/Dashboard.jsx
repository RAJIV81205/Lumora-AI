import React, { useState } from "react";
import { 
  Layers, 
  Upload, 
  Bot, 
  ArrowRight, 
  FileText, 
  Image, 
  MoreVertical, 
  CheckCircle, 
  Clock, 
  Send
} from "lucide-react";
import Sidebar from "./Sidebar";
import UploadMaterialsPopup from "./UploadMaterialsPopup";

const Dashboard = () => {
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);

  return (
    <div className="font-sans bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md p-6 w-full">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="bg-white text-white p-2 rounded-full transform hover:rotate-6 transition-transform duration-300">
            <svg 
              className="w-8 h-8 text-green-600" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              whileHover="hover"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 font-open-sans">Lumora AI</h1>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => setIsUploadPopupOpen(true)}
            className="bg-green-300 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
          >
            <Upload className="h-5 w-5" />
            <span>Upload Materials</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-500 transition-all duration-300">
            <Bot className="h-5 w-5" />
            <span>Ask AI Assistant</span>
          </button>
        </div>
      </header>

      <UploadMaterialsPopup 
        isOpen={isUploadPopupOpen}
        onClose={() => setIsUploadPopupOpen(false)}
      />

      <main className="grid grid-cols-12 gap-6">
        <Sidebar />
        

        <section className="col-span-7 space-y-6">
          <div className="bg-gradient-to-r from-green-600 to-green-400 text-white rounded-xl p-6 relative overflow-hidden group">
            <h2 className="text-2xl font-bold mb-3">Welcome back, John!</h2>
            <p className="text-green-100 mb-6 max-w-md">Continue your learning journey with AI-powered assistance. Upload new materials or continue from where you left off.</p>
            <div className="flex space-x-4">
              <button className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all duration-300">
                <Upload className="h-5 w-5" />
                <span>Upload Materials</span>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-500 transition-all duration-300">
                <Bot className="h-5 w-5" />
                <span>Ask AI Assistant</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Recent Materials</h2>
              <a href="#" className="text-blue-600 flex items-center hover:underline">
                <span>View all</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Advanced Physics Notes</h3>
                  <p className="text-sm text-gray-500">16 pages • Last opened 2 days ago</p>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-green-600 font-medium flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      AI summary available
                    </span>
                  </div>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="p-3 bg-green-50 rounded-lg text-green-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">World History Essay</h3>
                  <p className="text-sm text-gray-500">8 pages • Last opened yesterday</p>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-amber-600 font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      AI processing...
                    </span>
                  </div>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                  <Image className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Biology Diagrams</h3>
                  <p className="text-sm text-gray-500">12 images • Last opened 3 days ago</p>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-green-600 font-medium flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      AI notes available
                    </span>
                  </div>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <aside className="col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Study Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Physics</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[78%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>History</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[45%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Biology</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-[92%]"></div>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 bg-gray-50 hover:bg-gray-100 py-2 rounded-full text-sm font-medium transition-all duration-300">
              View detailed progress
            </button>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">AI Assistant</h2>
              <div className="flex items-center text-sm text-green-600">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-1.5 animate-pulse"></span>
                <span>Online</span>
              </div>
            </div>
            <div className="h-[280px] bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto border border-gray-100">
              <div className="flex justify-start mb-3">
                <div className="bg-blue-500 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-sm">Hello! How can I help with your studies today?</p>
                  <p className="text-xs opacity-75 mt-1">10:24 AM</p>
                </div>
              </div>
              <div className="flex justify-end mb-3">
                <div className="bg-gray-200 py-2 px-3 rounded-lg rounded-tr-none max-w-[80%]">
                  <p className="text-sm">Can you explain the concept of photosynthesis?</p>
                  <p className="text-xs opacity-75 mt-1">10:25 AM</p>
                </div>
              </div>
              <div className="flex justify-start mb-3">
                <div className="bg-blue-500 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-sm">Photosynthesis is the process where plants convert light energy into chemical energy. They use sunlight, water, and carbon dioxide to produce glucose and oxygen. This happens in the chloroplasts, specifically in the thylakoid membranes.</p>
                  <p className="text-xs opacity-75 mt-1">10:27 AM</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask anything..." 
                className="w-full py-3 pl-4 pr-10 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
              />
              <button className="absolute right-3 top-3 text-blue-600 hover:text-blue-700 transition-colors duration-300">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Dashboard;
