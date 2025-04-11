import React from "react"


const Dashboard = () => {
    return (
        <div id="webcrumbs">
            <div className="w-full font-sans bg-white rounded-xl shadow-lg p-6">
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-600 text-white p-2 rounded-full transform hover:rotate-6 transition-transform duration-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                <path d="M2 17l10 5 10-5"></path>
                                <path d="M2 12l10 5 10-5"></path>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-primary-700">Welcome back, John!</h1>
                    </div>
                    <div className="flex space-x-4">
                        <button className="bg-green-300 text-primary-600 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all duration-300">
                            <span className="material-symbols-outlined">upload_file</span>
                            <span>Upload Materials</span>
                        </button>
                        <button className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-primary-400 transition-all duration-300">
                            <span className="material-symbols-outlined">smart_toy</span>
                            <span>Ask AI Assistant</span>
                        </button>
                    </div>
                </header>

                <main className="grid grid-cols-12 gap-6">
                    <nav className="col-span-2 bg-white rounded-xl shadow p-4">
                        <ul className="space-y-2">
                            <li><a href="#" className="flex items-center space-x-3 text-primary-600 font-medium p-3 rounded-lg bg-primary-50 hover:bg-primary-100 transition-all duration-300"><span className="material-symbols-outlined">dashboard</span><span>Dashboard</span></a></li>
                            <li><a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300"><span className="material-symbols-outlined">library_books</span><span>My Materials</span></a></li>
                            <li><a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300"><span className="material-symbols-outlined">quiz</span><span>Quizzes</span></a></li>
                            <li><a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300"><span className="material-symbols-outlined">style</span><span>Flashcards</span></a></li>
                            <li><a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300"><span className="material-symbols-outlined">monitoring</span><span>Progress</span></a></li>
                            <li className="border-t border-gray-100 pt-2 mt-4"><a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300"><span className="material-symbols-outlined">settings</span><span>Settings</span></a></li>
                        </ul>
                    </nav>

                    <section className="col-span-7 space-y-6">
                        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 relative overflow-hidden group">
                            <h2 className="text-2xl font-bold mb-3">Welcome back, John!</h2>
                            <p className="text-primary-100 mb-6 max-w-md">Continue your learning journey with AI-powered assistance. Upload new materials or continue from where you left off.</p>
                            <div className="flex space-x-4">
                                <button className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all duration-300">
                                    <span className="material-symbols-outlined">upload_file</span>
                                    <span>Upload Materials</span>
                                </button>
                                <button className="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-primary-400 transition-all duration-300">
                                    <span className="material-symbols-outlined">smart_toy</span>
                                    <span>Ask AI Assistant</span>
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold">Recent Materials</h2>
                                <a href="#" className="text-primary-600 flex items-center hover:underline"><span>View all</span><span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-primary-200">
                                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><span className="material-symbols-outlined">picture_as_pdf</span></div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">Advanced Physics Notes</h3>
                                        <p className="text-sm text-gray-500">16 pages • Last opened 2 days ago</p>
                                        <div className="flex items-center mt-2 text-sm"><span className="text-green-600 font-medium flex items-center"><span className="material-symbols-outlined text-sm mr-1">check_circle</span>AI summary available</span></div>
                                    </div>
                                    <button className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300"><span className="material-symbols-outlined">more_vert</span></button>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-primary-200">
                                    <div className="p-3 bg-green-50 rounded-full text-green-600"><span className="material-symbols-outlined">description</span></div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">World History Essay</h3>
                                        <p className="text-sm text-gray-500">8 pages • Last opened yesterday</p>
                                        <div className="flex items-center mt-2 text-sm"><span className="text-amber-600 font-medium flex items-center"><span className="material-symbols-outlined text-sm mr-1">pending</span>AI processing...</span></div>
                                    </div>
                                    <button className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300"><span className="material-symbols-outlined">more_vert</span></button>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 border-b border-gray-100">
                                    <div className="p-3 bg-purple-50 rounded-full text-purple-600"><span className="material-symbols-outlined">image</span></div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">Biology Diagrams</h3>
                                        <p className="text-sm text-gray-500">12 images • Last opened 3 days ago</p>
                                        <div className="flex items-center mt-2 text-sm"><span className="text-green-600 font-medium flex items-center"><span className="material-symbols-outlined text-sm mr-1">check_circle</span>AI notes available</span></div>
                                    </div>
                                    <button className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300"><span className="material-symbols-outlined">more_vert</span></button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <aside className="col-span-3 space-y-6">
                        <div className="bg-white rounded-xl shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">Study Progress</h2>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1 text-sm"><span>Physics</span><span className="font-medium">78%</span></div>
                                    <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-primary-500 h-2 rounded-full w-[78%]"></div></div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1 text-sm"><span>History</span><span className="font-medium">45%</span></div>
                                    <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full w-[45%]"></div></div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1 text-sm"><span>Biology</span><span className="font-medium">92%</span></div>
                                    <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full w-[92%]"></div></div>
                                </div>
                            </div>
                            <button className="w-full mt-6 bg-gray-50 hover:bg-gray-100 py-2 rounded-full text-sm font-medium transition-all duration-300">View detailed progress</button>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">AI Assistant</h2>
                                <div className="flex items-center text-sm text-green-600"><span className="w-2 h-2 bg-green-600 rounded-full mr-1.5 animate-pulse"></span><span>Online</span></div>
                            </div>
                            <div className="h-[280px] bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto border border-gray-100">
                                <div className="flex justify-start mb-3">
                                    <div className="bg-primary-500 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]"><p className="text-sm">Hello! How can I help with your studies today?</p><p className="text-xs opacity-75 mt-1">10:24 AM</p></div>
                                </div>
                                <div className="flex justify-end mb-3">
                                    <div className="bg-gray-200 py-2 px-3 rounded-lg rounded-tr-none max-w-[80%]"><p className="text-sm">Can you explain the concept of photosynthesis?</p><p className="text-xs opacity-75 mt-1">10:25 AM</p></div>
                                </div>
                                <div className="flex justify-start mb-3">
                                    <div className="bg-primary-500 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]"><p className="text-sm">Photosynthesis is the process where plants convert light energy into chemical energy. They use sunlight, water, and carbon dioxide to produce glucose and oxygen. This happens in the chloroplasts, specifically in the thylakoid membranes.</p><p className="text-xs opacity-75 mt-1">10:27 AM</p></div>
                                </div>
                            </div>
                            <div className="relative">
                                <input type="text" placeholder="Ask anything..." className="w-full py-3 pl-4 pr-10 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300" />
                                <button className="absolute right-3 top-3 text-primary-600 hover:text-primary-700 transition-colors duration-300"><span className="material-symbols-outlined">send</span></button>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    )
}

export default Dashboard