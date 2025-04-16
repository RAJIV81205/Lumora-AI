import React, { useState, useEffect } from "react";
import {
    Layers,
    Upload,
    Bot,
    ArrowRight,
    FileText,
    Image,
    MoreVertical,
    CheckCircle,
    Clock,
    Send,

} from "lucide-react";
import Sidebar from "./Sidebar";
import UploadMaterialsPopup from "./UploadMaterialsPopup";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router";

const Dashboard = () => {
    const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")
    const url = import.meta.env.VITE_BACKEND_URL;

    const verifyToken = async (token) => {
        try {
            const response = await fetch(`${url}/verify-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                getQuote()
            } else {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch (error) {
            console.error('Token verification failed:', error);
            localStorage.removeItem('token');
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    };

    const getQuote = async () => {
        const response = await fetch('https://quotes-api-self.vercel.app/quote')
        const data = await response.json()
        setQuote(data.quote)
        setAuthor(data.author)

    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            verifyToken(token);
        }
    }, [navigate, url]);

    function countWords(text) {
        if (!text) return 0; // Return 0 if text is empty or null
        const words = text.trim().split(/\s+/);
        return words.length;
    }

    

  

   

    if (isLoading) {
        return <div className="min-h-screen w-full flex justify-center items-center"><span className="loader"></span></div>;
    }

    return (
        <div className="font-sans bg-gradient-to-br from-green-200 to-white rounded-xl shadow-md p-4 sm:p-6 w-full">
            <Navbar />

            <UploadMaterialsPopup
                isOpen={isUploadPopupOpen}
                onClose={() => setIsUploadPopupOpen(false)}
            />

            <main className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
                <Sidebar />

                <section className="col-span-1 md:col-span-7 space-y-4 sm:space-y-6">
                    <div className="bg-gradient-to-r from-green-600 to-green-400 text-white rounded-xl p-4 sm:p-6 relative overflow-hidden group border border-gray-800 font-open-sans">
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Welcome back, {user?.username || 'User'}!</h2>
                        <p className="text-green-100 mb-4 sm:mb-6 max-w-xl text-sm sm:text-base">Continue your learning journey with AI-powered assistance. Upload new materials or continue from where you left off.</p>
                        <div className="bg-white shadow-md rounded-xl p-3 sm:p-4 border-l-4 border-green-500 w-full">
                            <p className="text-gray-800 italic text-base sm:text-lg">
                                {quote}
                            </p>
                            <p className="text-gray-600 text-right mt-2 text-sm sm:text-base font-semibold">– {author}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-800">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                            <h2 className="text-base sm:text-lg font-semibold font-open-sans">Recent Materials</h2>
                            <Link to="/dashboard/materials" className="text-blue-600 flex items-center hover:underline text-sm sm:text-base">
                                <span>View all</span>
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            {user?.material?.length !== 0 ? (
                                [...user.material]
                                    .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
                                    .map((mate, index) => (
                                        <div key={index} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-blue-200">
                                            <div className="p-2 sm:p-3 bg-blue-50 rounded-lg text-blue-600">
                                                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium capitalize font-open-sans text-shadow-gray-900 text-sm sm:text-base truncate">{mate.subName}</h3>
                                                <p className="text-xs sm:text-sm font-open-sans text-gray-500">
                                                    {countWords(mate.summary) + countWords(mate.study_guide)} words • Processed on <span className="text-gray-700 uppercase font-open-sans">{mate.addedAt}</span>
                                                </p>
                                                <div className="flex items-center mt-1 sm:mt-2 text-xs sm:text-sm">
                                                    <span className="text-green-600 font-medium flex items-center font-open-sans">
                                                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                                        Processed
                                                    </span>
                                                </div>
                                            </div>
                                            <button className="p-1 sm:p-2 rounded-full hover:bg-gray-200 transition-all duration-300">
                                                <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </button>
                                        </div>
                                    ))
                            ) : (
                                <div className="text-center py-8 sm:py-12">
                                    <FileText className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No materials yet</h3>
                                    <p className="text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">Upload your first study material to get started</p>
                                    <button
                                        className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 text-sm sm:text-base"
                                        onClick={() => setIsUploadPopupOpen(true)}
                                    >
                                        Upload Material
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <aside className="col-span-1 md:col-span-3 space-y-4 sm:space-y-6">
                    <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-800 font-open-sans">
                        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Study Progress</h2>
                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <div className="flex justify-between mb-1 text-xs sm:text-sm">
                                    <span>Physics</span>
                                    <span className="font-medium">78%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 sm:h-2">
                                    <div className="bg-blue-500 h-1.5 sm:h-2 rounded-full w-[78%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1 text-xs sm:text-sm">
                                    <span>History</span>
                                    <span className="font-medium">45%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 sm:h-2">
                                    <div className="bg-blue-500 h-1.5 sm:h-2 rounded-full w-[45%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1 text-xs sm:text-sm">
                                    <span>Biology</span>
                                    <span className="font-medium">92%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 sm:h-2">
                                    <div className="bg-green-500 h-1.5 sm:h-2 rounded-full w-[92%]"></div>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-4 sm:mt-6 bg-gray-50 hover:bg-gray-100 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border-2 border-gray-500 cursor-pointer">
                            View detailed progress
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-800 font-open-sans">
                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                            <h2 className="text-base sm:text-lg font-semibold">AI Assistant</h2>
                            <div className="flex items-center text-xs sm:text-sm text-green-600">
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full mr-1 sm:mr-1.5 animate-pulse"></span>
                                <span>Online</span>
                            </div>
                        </div>
                        <div className="h-[200px] sm:h-[280px] bg-gray-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 overflow-y-auto border border-gray-100">
                            <div className="flex justify-start mb-2 sm:mb-3">
                                <div className="bg-blue-500 text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg rounded-tl-none max-w-[80%]">
                                    <p className="text-xs sm:text-sm">Hello! How can I help with your studies today?</p>
                                    <p className="text-[10px] sm:text-xs opacity-75 mt-0.5 sm:mt-1">10:24 AM</p>
                                </div>
                            </div>
                            <div className="flex justify-end mb-2 sm:mb-3">
                                <div className="bg-gray-200 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg rounded-tr-none max-w-[80%]">
                                    <p className="text-xs sm:text-sm">Can you explain the concept of photosynthesis?</p>
                                    <p className="text-[10px] sm:text-xs opacity-75 mt-0.5 sm:mt-1">10:25 AM</p>
                                </div>
                            </div>
                            <div className="flex justify-start mb-2 sm:mb-3">
                                <div className="bg-blue-500 text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg rounded-tl-none max-w-[80%]">
                                    <p className="text-xs sm:text-sm">Photosynthesis is the process where plants convert light energy into chemical energy. They use sunlight, water, and carbon dioxide to produce glucose and oxygen. This happens in the chloroplasts, specifically in the thylakoid membranes.</p>
                                    <p className="text-[10px] sm:text-xs opacity-75 mt-0.5 sm:mt-1">10:27 AM</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ask anything..."
                                className="w-full py-2 sm:py-3 pl-3 sm:pl-4 pr-8 sm:pr-10 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                            />
                            <button className="absolute right-2 sm:right-3 top-2 sm:top-3 text-blue-600 hover:text-blue-700 transition-colors duration-300">
                                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default Dashboard;
