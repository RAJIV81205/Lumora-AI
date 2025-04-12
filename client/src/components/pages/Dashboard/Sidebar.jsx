import React from 'react'
import { LayoutDashboard, BookOpen, HelpCircle, CreditCard, BarChart3, Settings, Sparkles } from 'lucide-react'
import { Link } from 'react-router'

const Sidebar = () => {
    return (
        <nav className="col-span-2 bg-white rounded-xl shadow p-4">
            <ul className="space-y-2">
                <li>
                    <div className="flex items-center space-x-3 text-blue-600 font-medium p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-300 cursor-pointer">
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                    </div>
                </li>
                <li>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                        <BookOpen className="h-5 w-5" />
                        <span>My Materials</span>
                    </div>
                </li>
                <li>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                        <HelpCircle className="h-5 w-5" />
                        <span>Quizzes</span>
                    </div>
                </li>
                <li>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                        <CreditCard className="h-5 w-5" />
                        <span>Flashcards</span>
                    </div>
                </li>
                <li>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                        <BarChart3 className="h-5 w-5" />
                        <span>Progress</span>
                    </div>
                </li>
                <li>
                    <Link to="/dashboard/chat">
                        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                            <Sparkles className="h-5 w-5" />
                            <span>AI Assistant</span>
                        </div>
                    </Link>
                </li>
                <li className="border-t border-gray-100 pt-2 mt-4">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar