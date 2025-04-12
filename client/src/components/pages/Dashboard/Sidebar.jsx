import React from 'react'
import { LayoutDashboard, BookOpen, HelpCircle, CreditCard, BarChart3, Settings } from 'lucide-react'

const Sidebar = () => {
  return (
    <nav className="col-span-2 bg-white rounded-xl shadow p-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center space-x-3 text-blue-600 font-medium p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-300">
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
                <BookOpen className="h-5 w-5" />
                <span>My Materials</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
                <HelpCircle className="h-5 w-5" />
                <span>Quizzes</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
                <CreditCard className="h-5 w-5" />
                <span>Flashcards</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
                <BarChart3 className="h-5 w-5" />
                <span>Progress</span>
              </a>
            </li>
            <li className="border-t border-gray-100 pt-2 mt-4">
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
  )
}

export default Sidebar