import React from 'react'
import { Upload, Bot } from 'lucide-react'
import UploadMaterialsPopup from "./UploadMaterialsPopup";
import { useState } from 'react';
import { Link } from 'react-router';

const Navbar = () => {

    const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
    return (
        <header className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center space-x-2">
                <div className="bg-white text-white p-2 rounded-full transform hover:rotate-6 transition-transform duration-300">
                    <svg
                        className="w-8 h-8 text-green-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-green-600 font-sans">Lumora AI</h1>
            </Link>
            <div className="flex space-x-4">
                <button
                    onClick={() => setIsUploadPopupOpen(true)}
                    className="bg-green-300 text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all duration-300 border-2 hover:border-green-600 "
                >
                    <Upload className="h-5 w-5" />
                    <span>Upload Materials</span>
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-500 transition-all duration-300 border-blue-950 border-2">
                    <Bot className="h-5 w-5" />
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