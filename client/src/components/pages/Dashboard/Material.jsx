import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { FileText, MoreVertical, CheckCircle, Clock, ArrowRight, Upload } from 'lucide-react'
import UploadMaterialsPopup from './UploadMaterialsPopup'

const Material = () => {
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);    

  // This would typically come from your backend/state management
  const [materials] = useState([
    {
      id: 1,
      title: "Advanced Physics Notes",
      type: "document",
      pages: 16,
      lastOpened: "2 days ago",
      status: "processed",
      color: "blue"
    },
    {
      id: 2,
      title: "World History Essay",
      type: "document",
      pages: 8,
      lastOpened: "yesterday",
      status: "processing",
      color: "green"
    },
    {
      id: 3,
      title: "Biology Diagrams",
      type: "image",
      pages: 12,
      lastOpened: "3 days ago",
      status: "processed",
      color: "purple"
    }
  ]);

  return (
    <div className="font-sans bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md p-6 w-full">
        <UploadMaterialsPopup
            isOpen={isUploadPopupOpen}
            onClose={() => setIsUploadPopupOpen(false)}
        />
      <Navbar />
      
      <main className="grid grid-cols-12 gap-6">
        <Sidebar />

        <section className="col-span-10 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6 w-full">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-open-sans">My Materials</h2>
                <p className="text-gray-500">Manage and view your uploaded study materials</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-700 transition-all duration-300" onClick={() => setIsUploadPopupOpen(true)}>
                  <Upload className="h-5 w-5" />
                  <span>Upload New</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {materials.map((material) => (
                <div 
                  key={material.id} 
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
                >
                  <div className={`p-3 bg-${material.color}-50 rounded-lg text-${material.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">{material.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{material.pages} pages • Last opened {material.lastOpened}</p>
                    <div className="flex items-center text-sm">
                      <span className={`text-${material.status === 'processed' ? 'green' : 'amber'}-600 font-medium flex items-center`}>
                        {material.status === 'processed' ? (
                          <CheckCircle className="h-4 w-4 mr-1" />
                        ) : (
                          <Clock className="h-4 w-4 mr-1" />
                        )}
                        {material.status === 'processed' ? 'AI summary available' : 'AI processing...'}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Material