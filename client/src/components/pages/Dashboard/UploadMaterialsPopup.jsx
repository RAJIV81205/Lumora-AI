import React, { useState, useRef } from 'react';
import { X, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const UploadMaterialsPopup = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Processing your document...');
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size should not exceed 5MB');
      setFile(null);
      return;
    }

    const validTypes = ['application/pdf'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF file');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const url = import.meta.env.VITE_PYTHON_BACKEND_URL;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    if (!subject.trim()) {
      setError('Please enter a subject name');
      return;
    }

    setIsLoading(true);
    setError('');
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('subject', subject);

    try {
      // First, upload and extract text from PDF
      setLoadingMessage('Uploading and extracting text from PDF...');
      setProgress(10);
      
      const uploadResponse = await fetch(`${url}/upload-pdf`, {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || 'Failed to upload file');
      }

      setProgress(30);
      setLoadingMessage('Summarizing your document...');
      
      // Then, get the summary
      const summaryResponse = await fetch(`${url}/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: uploadData.text }),
      });

      const summaryData = await summaryResponse.json();

      if (!summaryResponse.ok) {
        throw new Error(summaryData.error || 'Failed to generate summary');
      }

      setProgress(60);
      setLoadingMessage('Generating study guide...');
      
      // Generate study guide
      const studyGuideResponse = await fetch(`${url}/study-guide`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: uploadData.text }),
      });

      const studyGuideData = await studyGuideResponse.json();

      if (!studyGuideResponse.ok) {
        throw new Error(studyGuideData.error || 'Failed to generate study guide');
      }

      setProgress(80);
      setLoadingMessage('Saving your materials...');
      
      const saveData = await fetch(`${backendUrl}/materials/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          subject: subject,
          content: uploadData.text,
          summary: summaryData.summary,
          study_guide: studyGuideData.study_guide,
        }),
      })

      const saveResponse = await saveData.json();
      if (!saveData.ok) {
        throw new Error(saveResponse.error || 'Failed to save materials');
      }
      
      setProgress(100);
      setLoadingMessage('Materials saved successfully!');
      
      // Close popup and refresh page after a short delay
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4 font-open-sans">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 font-nunito-sans">Upload Materials</h2>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Subject Name
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter subject name"
            />
          </div>

          <div>
            <label htmlFor="file" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Upload File (PDF, max 5MB)
            </label>
            <div
              className={`mt-1 flex justify-center px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-6 border-2 ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              } border-dashed rounded-lg transition-colors duration-200`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="space-y-2 text-center flex flex-col items-center">
                <FileText className="h-10 w-10 text-gray-400" />
                <div className="flex text-xs sm:text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">PDF up to 5MB</p>
              </div>
            </div>
            {file && (
              <p className="mt-2 text-xs sm:text-sm text-gray-600">
                Selected file: {file.name}
              </p>
            )}
          </div>

          {error && (
            <div className="text-red-600 text-xs sm:text-sm">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 text-center">{loadingMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? 'Processing...' : 'Upload and Process'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadMaterialsPopup;