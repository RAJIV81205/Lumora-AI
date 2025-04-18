import React, { useState, useEffect, useRef } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { FileText, MoreVertical, CheckCircle, Clock, ArrowRight, Upload, File, Image, Loader2, X } from 'lucide-react'
import UploadMaterialsPopup from './UploadMaterialsPopup'
import Summary from './Summary'
import StudyGuide from './StudyGuide'
import Quiz from './Quiz'

const Material = () => {
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showStudyGuide, setShowStudyGuide] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false)
  // Track which material's menu is open by its ID
  const [openMenuId, setOpenMenuId] = useState(null);

  const [materials, setMaterials] = useState([]);
  const menuRef = useRef(null);


  const url = import.meta.env.VITE_BACKEND_URL
  const token = localStorage.getItem('token')

  // Function to generate a random color combination
  const getRandomColor = (id) => {
    const colors = [
      { bg: 'bg-blue-50', text: 'text-blue-600' },
      { bg: 'bg-green-50', text: 'text-green-600' },
      { bg: 'bg-purple-50', text: 'text-purple-600' },
      { bg: 'bg-pink-50', text: 'text-pink-600' },
      { bg: 'bg-indigo-50', text: 'text-indigo-600' },
      { bg: 'bg-teal-50', text: 'text-teal-600' },
      { bg: 'bg-orange-50', text: 'text-orange-600' },
      { bg: 'bg-cyan-50', text: 'text-cyan-600' },
      { bg: 'bg-red-50', text: 'text-red-600' },
      { bg: 'bg-emerald-50', text: 'text-emerald-600' },
      { bg: 'bg-lime-50', text: 'text-lime-600' },
      { bg: 'bg-amber-50', text: 'text-amber-600' },
      { bg: 'bg-yellow-50', text: 'text-yellow-600' },
      { bg: 'bg-rose-50', text: 'text-rose-600' },
      { bg: 'bg-fuchsia-50', text: 'text-fuchsia-600' },
      { bg: 'bg-violet-50', text: 'text-violet-600' },
      { bg: 'bg-sky-50', text: 'text-sky-600' },
      { bg: 'bg-zinc-50', text: 'text-zinc-600' },
      { bg: 'bg-neutral-50', text: 'text-neutral-600' },
      { bg: 'bg-stone-50', text: 'text-stone-600' }
    ];

    // Use the material id to consistently get the same color for the same document
    // If id is undefined, use a random index
    const index = id ? id % colors.length : Math.floor(Math.random() * colors.length);
    return colors[index];
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    getMaterials();
  }, []);

  const getMaterials = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${url}/get/materials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch materials');
      }

      const data = await response.json();
      setMaterials(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching materials:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'processed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-amber-100 text-amber-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'document':
        return <File className="h-5 w-5" />;
      case 'image':
        return <Image className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  }

  function countWords(text) {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      // Parse the date string in the format "DD/MM/YYYY, HH:mm:ss am/pm"
      const [datePart, timePart] = dateString.split(', ');
      const [day, month, year] = datePart.split('/');
      const [time, period] = timePart.split(' ');
      const [hours, minutes] = time.split(':');

      // Create a new Date object
      const date = new Date(year, month - 1, day);
      date.setHours(parseInt(hours) + (period.toLowerCase() === 'pm' ? 12 : 0), parseInt(minutes));

      // Format the date
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; // Return original string if parsing fails
    }
  }

  const handleSummaryClick = (material) => {
    setSelectedMaterial(material);
    setShowSummary(true);
    setShowStudyGuide(false);
    setShowQuiz(false);
  };

  const handleStudyGuideClick = (material) => {
    setSelectedMaterial(material);
    setShowStudyGuide(true);
    setShowSummary(false);
    setShowQuiz(false);
  };

  const handleQuizClick = (material) => {
    setSelectedMaterial(material);
    setShowQuiz(true);
    setShowSummary(false);
    setShowStudyGuide(false);
  }

  const handleClose = () => {
    setShowSummary(false);
    setShowStudyGuide(false);
    setSelectedMaterial(null);
    setShowQuiz(false);
  };

  const toggleOptionsMenu = (materialId, event) => {
    // Prevent event bubbling
    event.stopPropagation();
    setOpenMenuId(openMenuId === materialId ? null : materialId);
  };

  const handleChangeName = (material) => {
    // Implement the logic to change the name of the material
    setOpenMenuId(null); // Close the menu after action
  };

  const handleDelete = async (materialId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/delete/material`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ materialId })
      });


      const data = await response.json();
      if (response.ok) {
        getMaterials();
        alert('Material deleted successfully!');
        setIsLoading(false)
      } else {
        setError(data.message || 'Failed to delete material');
        setIsLoading(false)

        // Implement the logic to delete the material
        setOpenMenuId(null); // Close the menu after action
      }
    } catch (error) {
      console.error('Error deleting material:', error);
      setError('Failed to delete material. Please try again.');
      setIsLoading(false)

    }
  };

  if (isLoading) {
    return <div className="min-h-screen w-full flex justify-center items-center"><span className="loader"></span></div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold font-open-sans">Error loading materials</p>
          <p className="text-sm font-open-sans">{error}</p>
          <button
            onClick={getMaterials}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gradient-to-br from-green-200 to-white rounded-xl shadow-md p-6 w-full min-h-screen">
      <UploadMaterialsPopup
        isOpen={isUploadPopupOpen}
        onClose={() => setIsUploadPopupOpen(false)}
        onUploadSuccess={getMaterials}
      />
      <Navbar />

      {(showSummary || showStudyGuide || showQuiz) ? (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-white rounded-xl w-full max-w-4xl h-[90vh] flex flex-col relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full transition-colors z-10"
            >
              <X className="h-8 w-8 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-3xl transition-all duration-300" />
            </button>
            {showSummary ? (
              <Summary material={selectedMaterial} onClose={handleClose} />
            ) : showStudyGuide ? (
              <StudyGuide material={selectedMaterial} />
            ) : showQuiz ? (
              <Quiz material={selectedMaterial} />
            ) : null}
          </div>
        </div>
      ) : (
        <main className="grid grid-cols-12 gap-6">
          <Sidebar />

          <section className="md:col-span-10 space-y-6 col-span-12 ">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-6 w-full">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 font-open-sans">My Materials</h2>
                  <p className="text-gray-500">Manage and view your uploaded study materials</p>
                </div>
                <div className=" hidden lg:flex items-center space-x-4">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-700 transition-all duration-300"
                    onClick={() => setIsUploadPopupOpen(true)}
                  >
                    <Upload className="h-5 w-5" />
                    <span>Upload New</span>
                  </button>
                </div>
              </div>

              {materials.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No materials yet</h3>
                  <p className="text-gray-500 mb-4">Upload your first study material to get started</p>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300"
                    onClick={() => setIsUploadPopupOpen(true)}
                  >
                    Upload Material
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {materials.map((material, index) => (
                    <div
                      key={material.id || index}
                      className="bg-white rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-300 overflow-hidden group hover:shadow-lg"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-lg ${getRandomColor(index).bg} ${getRandomColor(index).text}`}>
                            {getTypeIcon(material.type)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Processed
                            </span>
                            <div className="relative">
                              <button
                                className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 opacity-80 group-hover:opacity-100"
                                onClick={(e) => toggleOptionsMenu(material.id || index, e)}
                              >
                                <MoreVertical className="h-5 w-5 text-gray-500" />
                              </button>

                              {openMenuId === (material.id || index) && (
                                <div
                                  ref={menuRef}
                                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-xl z-20 overflow-hidden transition-all duration-200 ease-in-out font-open-sans"
                                  style={{
                                    animation: "fadeIn 0.2s ease-out"
                                  }}
                                >
                                  <div className="py-1">
                                    <button
                                      className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                      onClick={() => handleChangeName(material)}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                      </svg>
                                      Change Name
                                    </button>

                                    <div className="border-t border-gray-100 my-1"></div>

                                    <button
                                      className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                                      onClick={() => handleDelete(material.id)}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1 font-open-sans">{material.subName}</h3>

                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-500">
                            <FileText className="h-4 w-4 mr-2" />
                            <span className='font-nunito-sans'>{countWords(material.summary) + countWords(material.study_guide)} words</span>
                          </div>

                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className='font-nunito-sans'>Added on <span className='text-gray-500 font-nunito-sans'>{formatDate(material.addedAt)}</span></span>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <button
                            onClick={() => handleSummaryClick(material)}
                            className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-all duration-300 border-2 border-solid border-blue-50 hover:border-blue-400"
                          >
                            <FileText className="h-5 w-5" />
                            <span className="font-medium font-open-sans">Summary</span>
                          </button>
                          <button
                            onClick={() => handleStudyGuideClick(material)}
                            className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition-all duration-300 border-2 border-solid border-green-50 hover:border-green-500"
                          >
                            <File className="h-5 w-5" />
                            <span className="font-medium font-open-sans">Study Guide</span>
                          </button>
                          <button
                            onClick={() => handleQuizClick(material.study_guide)} className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 transition-all duration-300 border-2 border-solid border-purple-50 hover:border-purple-400">
                            <CheckCircle className="h-5 w-5" />
                            <span className="font-medium font-open-sans">Quiz</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      )}
    </div>
  )
}

export default Material