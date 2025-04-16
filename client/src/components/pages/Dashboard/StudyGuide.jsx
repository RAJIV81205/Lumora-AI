import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

const StudyGuide = ({ material }) => {
  const [sections, setSections] = useState({});
  const [parsedSections, setParsedSections] = useState([]);
  const [studyGuideData, setStudyGuideData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandAll, setExpandAll] = useState(false);

  useEffect(() => {
    if (!material?.study_guide) {
      setLoading(false);
      return;
    }

    try {
      const content = material.study_guide;
      
      // Extract title
      const titleMatch = content.match(/# TITLE: (.*?)(?:\n|$)/);
      const title = titleMatch ? titleMatch[1].trim() : 'Study Guide';
      
      // Extract overview
      const overviewMatch = content.match(/## OVERVIEW: (.*?)(?=\n##|\n$|$)/s);
      const overview = overviewMatch 
        ? overviewMatch[1].trim() 
        : 'Overview of the study material';
      
      // Build JSON structure
      const studyGuideJSON = {
        title,
        overview,
        content,
      };
      
      setStudyGuideData(studyGuideJSON);
      
      // Parse sections - improved regex to better handle section content
      const sectionRegex = /## ([^\n]+)\n([\s\S]*?)(?=(?:## [^\n]+)|$)/g;
      const matches = [...content.matchAll(sectionRegex)];
      
      // Filter out the OVERVIEW section
      const filteredMatches = matches.filter(match => !match[1].startsWith('OVERVIEW:'));
      
      const sectionTitles = filteredMatches.map((match) => match[1].trim());
      
      // Initialize all sections as collapsed by default
      const initialState = {};
      sectionTitles.forEach((title) => {
        initialState[title] = false;
      });
      
      setSections(initialState);
      setParsedSections(filteredMatches.map((match) => ({
        title: match[1].trim(),
        content: match[2].trim()
      })));
    } catch (error) {
      console.error("Error parsing study guide:", error);
    } finally {
      setLoading(false);
    }
  }, [material]);

  const toggleSection = (title) => {
    setSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleExpandAll = () => {
    const newExpandState = !expandAll;
    setExpandAll(newExpandState);
    
    // Update all sections to the new expand state
    const updatedSections = {};
    Object.keys(sections).forEach(title => {
      updatedSections[title] = newExpandState;
    });
    setSections(updatedSections);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-500">Loading study guide...</div>
      </div>
    );
  }

  if (!studyGuideData) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <p className="text-gray-600">No study guide available for this material.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-scroll w-full">
      <div className="mb-6 sm:mb-8 border-b pb-3 sm:pb-4">
        <div className="flex items-center space-x-2 mb-2 sm:mb-3">
          <BookOpen className="text-blue-600" size={20} />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{studyGuideData.title}</h1>
        </div>
        <p className="text-sm sm:text-base text-gray-600 italic">{studyGuideData.overview}</p>
      </div>
      
      <div className="mb-3 sm:mb-4 flex justify-between items-center">
        <span className="text-xs sm:text-sm text-gray-500">
          {parsedSections.length} {parsedSections.length === 1 ? 'section' : 'sections'}
        </span>
        <button 
          onClick={handleExpandAll}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium"
        >
          {expandAll ? (
            <>
              <ChevronUp size={14} />
              <span>Collapse All</span>
            </>
          ) : (
            <>
              <ChevronDown size={14} />
              <span>Expand All</span>
            </>
          )}
        </button>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {parsedSections.map((section, index) => {
          const isOpen = sections[section.title];
          
          return (
            <div 
              key={`section-${index}`} 
              className="border rounded-lg shadow-sm overflow-hidden transition-all duration-200"
            >
              <div
                className={`flex items-center justify-between p-3 sm:p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${isOpen ? 'border-b' : ''}`}
                onClick={() => toggleSection(section.title)}
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{section.title}</h2>
                <div className="text-blue-600">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>
              
              {isOpen && (
                <div className="p-3 sm:p-4 bg-white">
                  <div className="prose prose-slate max-w-none text-sm sm:text-base">
                    <ReactMarkdown
                      children={section.content}
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                      components={{
                        h3: ({node, ...props}) => <h3 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4 mb-1.5 sm:mb-2" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-4 sm:pl-5 my-1.5 sm:my-2" {...props} />,
                        li: ({node, ...props}) => <li className="mb-0.5 sm:mb-1" {...props} />,
                        p: ({node, ...props}) => <p className="mb-2 sm:mb-3" {...props} />
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {parsedSections.length === 0 && (
        <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
          No sections found in this study guide.
        </div>
      )}
    </div>
  );
};

export default StudyGuide;