import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
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
  const [extractedText, setExtractedText] = useState('');
  const [summary, setSummary] = useState('');
  const [studyGuide, setStudyGuide] = useState('');
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
    setExtractedText('');
    setSummary('');
    setStudyGuide('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('subject', subject);

    try {
      // First, upload and extract text from PDF
      const uploadResponse = await fetch(`${url}/upload-pdf`, {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || 'Failed to upload file');
      }

      setExtractedText(uploadData.text);
      console.log('Extracted Text:', uploadData.text);

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

      setSummary(summaryData.summary);
      console.log('Summary:', summaryData.summary);

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

      setStudyGuide(studyGuideData.study_guide);
      console.log('Study Guide:', studyGuideData.study_guide);

      const saveData = await fetch ( `${backendUrl}/materials/save`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
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
      console.log('Materials saved successfully:', saveResponse);
    
      setFile(null);
      setSubject('');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-nunito-sans">Upload Materials</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject Name
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter subject name"
            />
          </div>
          
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
              Upload File (PDF, max 5MB)
            </label>
            <div 
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} border-dashed rounded-lg`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave} 
              onDrop={handleDrop}
            >
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600">
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
                <p className="text-xs text-gray-500">PDF up to 5MB</p>
              </div>
            </div>
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file: {file.name}
              </p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Upload'}
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="mt-6 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Processing your document...</p>
          </div>
        )}

        {(extractedText || summary || studyGuide) && !isLoading && (
          <div className="mt-6 space-y-4">
            {extractedText && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Extracted Text</h3>
                <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                  <p className="text-gray-700 whitespace-pre-wrap">{extractedText}</p>
                </div>
              </div>
            )}
            
            {summary && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Summary</h3>
                <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto prose prose-sm max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      // Customize link rendering to open in new tab
                      a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" />
                      ),
                      // Ensure code blocks have proper styling
                      code: ({ node, inline, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <code className={`${className} block bg-gray-100 p-2 rounded`} {...props}>
                            {children}
                          </code>
                        ) : (
                          <code className={`${className} bg-gray-100 px-1 py-0.5 rounded`} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {summary}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {studyGuide && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Study Guide</h3>
                <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto prose prose-sm max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      // Customize link rendering to open in new tab
                      a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" />
                      ),
                      // Ensure code blocks have proper styling
                      code: ({ node, inline, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <code className={`${className} block bg-gray-100 p-2 rounded`} {...props}>
                            {children}
                          </code>
                        ) : (
                          <code className={`${className} bg-gray-100 px-1 py-0.5 rounded`} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {studyGuide}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadMaterialsPopup;