import React from 'react'
import { Upload, Bot } from 'lucide-react'
import UploadMaterialsPopup from "./UploadMaterialsPopup";
import { useState } from 'react';
import { Link } from 'react-router';

const Navbar = () => {

    const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-8">
            <Link to="/" className="flex items-center space-x-2">
                <div className="text-white p-1.5 sm:p-2 rounded-full transform hover:rotate-6 transition-transform duration-300">
                    <svg
                        className="w-6 h-6 sm:w-8 sm:h-8 text-green-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-green-600 font-sans">Lumora AI</h1>
            </Link>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                <button
                    onClick={() => setIsUploadPopupOpen(true)}
                    className="bg-green-300 text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 border hover:border-green-600 text-sm sm:text-base"
                >
                    <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Upload Materials</span>
                </button>
                <button className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-blue-500 transition-all duration-300 border-blue-950 border text-sm sm:text-base">
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Ask AI Assistant</span>
                </button>
            </div>
            <UploadMaterialsPopup
                isOpen={isUploadPopupOpen}
                onClose={() => setIsUploadPopupOpen(false)}
            />
        </header>
    )
}

export default Navbar