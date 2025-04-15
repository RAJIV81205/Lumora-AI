import React from 'react'
import { LayoutDashboard, BookOpen, HelpCircle, CreditCard, BarChart3, Settings, Sparkles, LogOut } from 'lucide-react'
import { Link, useLocation , useNavigate } from 'react-router'

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper function to determine if a link is active
    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    const handleLogOut = (e) =>{
        e.preventDefault();
        localStorage.removeItem('token');
        navigate("/login");
    }

    return (
        <nav className="col-span-2 bg-white rounded-xl shadow p-4 min-h-screen border border-gray-800">
            <ul className="space-y-2">
                <li>
                    <Link to="/dashboard">
                        <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${isActive('/dashboard') && location.pathname !== '/dashboard/materials' &&
                                location.pathname !== '/dashboard/quizzes' &&
                                location.pathname !== '/dashboard/flashcards' &&
                                location.pathname !== '/dashboard/progress' &&
                                location.pathname !== '/dashboard/chat' &&
                                location.pathname !== '/dashboard/settings'
                                ? 'text-blue-600 font-medium bg-blue-50 hover:bg-blue-100'
                                : 'hover:bg-gray-50'
                            }`}>
                            <LayoutDashboard className="h-5 w-5" />
                            <span>Dashboard</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/materials">
                        <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${isActive('/dashboard/materials')
                                ? 'text-blue-600 font-medium bg-blue-50 hover:bg-blue-100'
                                : 'hover:bg-gray-50'
                            }`}>
                            <BookOpen className="h-5 w-5" />
                            <span>My Materials</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/quizzes">
                        <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${isActive('/dashboard/quizzes')
                                ? 'text-blue-600 font-medium bg-blue-50 hover:bg-blue-100'
                                : 'hover:bg-gray-50'
                            }`}>
                            <HelpCircle className="h-5 w-5" />
                            <span>Quizzes</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/flashcards">
                        <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${isActive('/dashboard/flashcards')
                                ? 'text-blue-600 font-medium bg-blue-50 hover:bg-blue-100'
                                : 'hover:bg-gray-50'
                            }`}>
                            <CreditCard className="h-5 w-5" />
                            <span>Flashcards</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/progress">
                        <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${isActive('/dashboard/progress')
                                ? 'text-blue-600 font-medium bg-blue-50 hover:bg-blue-100'
                                : 'hover:bg-gray-50'
                            }`}>
                            <BarChart3 className="h-5 w-5" />
                            <span>Progress</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/chat">
                        <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${isActive('/dashboard/chat')
                                ? 'text-blue-600 font-medium bg-blue-50 hover:bg-blue-100'
                                : 'hover:bg-gray-50'
                            }`}>
                            <Sparkles className="h-5 w-5" />
                            <span>AI Assistant</span>
                        </div>
                    </Link>
                </li>
                <li className="border-t border-gray-100 pt-2 mt-4">
                    <Link to="/dashboard/settings">
                        <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 cursor-pointer ${isActive('/dashboard/settings')
                                ? 'text-blue-600 font-medium bg-blue-50 hover:bg-blue-100'
                                : 'hover:bg-gray-50'
                            }`}>
                            <Settings className="h-5 w-5" />
                            <span>Settings</span>
                        </div>
                    </Link>
                </li>
                <li>

                    <div onClick={handleLogOut}className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 cursor-pointer  text-red-500 font-medium  hover:bg-red-50">
                        <LogOut className="h-5 w-5" />
                        <span>Log Out</span>
                    </div>

                </li>
            </ul>
        </nav>
    )
}

export default Sidebar