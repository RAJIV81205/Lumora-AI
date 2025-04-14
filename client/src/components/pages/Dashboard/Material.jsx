import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { FileText, MoreVertical, CheckCircle, Clock, ArrowRight, Upload, File, Image } from 'lucide-react'
import UploadMaterialsPopup from './UploadMaterialsPopup'

const Material = () => {
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);

  const [materials, setMaterials] = useState([
    {
      id: 1,
      subName: "Advanced Physics Notes",
      type: "document",
      summary: "hello there",
      study_guide: "this is a study guide",
      addedAt:"2023-10-01",
      status: "processed",
      color: "blue"
    },
    {
      id: 2,
      subName: "World History Essay",
      type: "document",
      summary: "hello there",
      study_guide: "this is a study guide",
      addedAt:"2023-10-01",
      status: "processing",
      color: "green"
    },
    {
      id: 3,
      subName: "Biology Diagrams",
      type: "image",
      summary: "hello there",
      study_guide: "this is a study guide",
      addedAt:"2023-10-01",
      status: "processed",
      color: "purple"
    }
  ]);

  const url = import.meta.env.VITE_BACKEND_URL
  const token = localStorage.getItem('token')

  const getMaterials = async () => {
    const response = await fetch(`${url}/get/materials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    const data = await response.json()
    if (response.ok) {
      setMaterials(data)
    }
  }

  const getStatusColor = (status) => {
    return status === 'processed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800';
  }

  const getTypeIcon = (type) => {
    return type === 'document' ? <File className="h-5 w-5" /> : <Image className="h-5 w-5" />;
  }

  function countWords(text) {
    if (!text) return 0; // Return 0 if text is empty or null
    const words = text.trim().split(/\s+/);
    return words.length;
  }

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
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-700 transition-all duration-300"
                  onClick={() => setIsUploadPopupOpen(true)}
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload New</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => (
                <div
                  key={material.id}
                  className="bg-white rounded-xl border border-gray-200 hover:border-gray-900 transition-all duration-300 overflow-hidden group hover:shadow-lg"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${material.color === 'blue' ? 'bg-blue-50 text-blue-600' : material.color === 'green' ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-purple-600'}`}>
                        {getTypeIcon(material.type)}
                      </div>
                      <button className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 opacity-0 group-hover:opacity-100">
                        <MoreVertical className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>

                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1 font-open-sans">{material.subName}</h3>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <FileText className="h-4 w-4 mr-2" />
                        <span className='font-nunito-sans'>{ countWords(material.summary) + countWords(material.study_guide) } words</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className='font-nunito-sans'>Processed on <span className='text-gray-800'>{material.addedAt}</span></span>
                      </div>


                    </div>

                    <div className="mt-4 space-y-2">
                      <button className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-all duration-300 border-2 border-solid border-blue-50 hover:border-blue-400">
                        <FileText className="h-5 w-5" />
                        <span className="font-medium font-open-sans">Summary</span>
                      </button>
                      <button className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition-all duration-300 border-2 border-solid border-green-50 hover:border-green-500">
                        <File className="h-5 w-5" />
                        <span className="font-medium font-open-sans">Study Guide</span>
                      </button>
                      <button className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 transition-all duration-300 border-2 border-solid border-purple-50 hover:border-purple-400">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium font-open-sans">Quiz</span>
                      </button>
                    </div>
                  </div>
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