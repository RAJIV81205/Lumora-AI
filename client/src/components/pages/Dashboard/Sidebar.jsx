import React, { useState } from 'react'
import { LayoutDashboard, BookOpen, HelpCircle, CreditCard, BarChart3, Settings, Sparkles, LogOut, Menu, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router'

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // Helper function to determine if a link is active
    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate("/login");
    }

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 right-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg shadow-md bg-green-200 hover:bg-gray-50 border border-gray-900"
                >
                    {isOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
                </button>
            </div>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <nav className={`col-span-1 md:col-span-2 bg-white rounded-xl shadow p-4 min-h-screen border border-gray-800 md:block h-screen font-open-sans ${
                isOpen ? 'fixed top-0 left-0 w-64 z-50 translate-x-0' : 'hidden md:block'
            }`}>
                <ul className="space-y-1 sm:space-y-2">
                    <li>
                        <Link to="/dashboard">
                            <div className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-300 cursor-pointer ${isActive('/dashboard') && location.pathname !== '/dashboard/materials' &&
                                    location.pathname !== '/dashboard/quizzes' &&
                                    location.pathname !== '/dashboard/flashcards' &&
                                    location.pathname !== '/dashboard/progress' &&
                                    location.pathname !== '/dashboard/chat' &&
                                    location.pathname !== '/dashboard/settings'
                                    ? 'text-blue-600 font-medium bg-blue-50 hover:bg-blue-100'
                                    : 'hover:bg-gray-50'
                                }`}>
                                <LayoutDashboard className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="text-sm sm:text-base">Dashboard</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/materials">
                            <div className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-300 cursor-pointer ${isActive('/dashboard/materials')
                                    ? 'text-blue-600 font-medium bg-blue-50 hover:bg-blue-100'
                                    : 'hover:bg-gray-50'
                                }`}>
                                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="text-sm sm:text-base">My Materials</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/quizzes">
                            <div className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-300 cursor-pointer ${isActive('/dashboard/quizzes')
                                    ? 'text-blue-600 font-medium bg-blue-50 hover:bg-blue-100'
                                    : 'hover:bg-gray-50'
                                }`}>
                                <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="text-sm sm:text-base">Quizzes</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/flashcards">
                            <div className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-300 cursor-pointer ${isActive('/dashboard/flashcards')
                                    ? 'text-blue-600 font-medium bg-blue-50 hover:bg-blue-100'
                                    : 'hover:bg-gray-50'
                                }`}>
                                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="text-sm sm:text-base">Flashcards</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/progress">
                            <div className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-300 cursor-pointer ${isActive('/dashboard/progress')
                                    ? 'text-blue-600 font-medium bg-blue-50 hover:bg-blue-100'
                                    : 'hover:bg-gray-50'
                                }`}>
                                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="text-sm sm:text-base">Progress</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/chat">
                            <div className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-300 cursor-pointer ${isActive('/dashboard/chat')
                                    ? 'text-blue-600 font-medium bg-blue-50 hover:bg-blue-100'
                                    : 'hover:bg-gray-50'
                                }`}>
                                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="text-sm sm:text-base">AI Assistant</span>
                            </div>
                        </Link>
                    </li>
                    <li className="border-t border-gray-100 pt-2 mt-2 sm:mt-4">
                        <Link to="/dashboard/settings">
                            <div className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-300 cursor-pointer ${isActive('/dashboard/settings')
                                    ? 'text-blue-600 font-medium bg-blue-50 hover:bg-blue-100'
                                    : 'hover:bg-gray-50'
                                }`}>
                                <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="text-sm sm:text-base">Settings</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <div onClick={handleLogOut} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-300 cursor-pointer text-red-500 font-medium hover:bg-red-50">
                            <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="text-sm sm:text-base">Log Out</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Sidebar