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
    Send
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
                console.log(data.user)
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
        <div className="font-sans bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md p-6 w-full">

            <Navbar />


            <UploadMaterialsPopup
                isOpen={isUploadPopupOpen}
                onClose={() => setIsUploadPopupOpen(false)}
            />

            <main className="grid grid-cols-12 gap-6">
                <Sidebar />


                <section className="col-span-7 space-y-6">
                    <div className="bg-gradient-to-r from-green-600 to-green-400 text-white rounded-xl p-6 relative overflow-hidden group">
                        <h2 className="text-2xl font-bold mb-3">Welcome back, {user?.username || 'User'}!</h2>
                        <p className="text-green-100 mb-6 max-w-md">Continue your learning journey with AI-powered assistance. Upload new materials or continue from where you left off.</p>
                        <div className="flex space-x-4">
                            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all duration-300" onClick={() => setIsUploadPopupOpen(true)}>
                                <Upload className="h-5 w-5" />
                                <span>Upload Materials</span>
                            </button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-blue-500 transition-all duration-300">
                                <Bot className="h-5 w-5" />
                                <span>Ask AI Assistant</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold">Recent Materials</h2>
                            <Link to="/dashboard/materials" className="text-blue-600 flex items-center hover:underline">
                                <span>View all</span>
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {user?.material?.length != 0 && (
                                user?.material?.map((mate, index) => (
                                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-blue-200">
                                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium capitalize font-open-sans text-shadow-gray-900">{mate.subName}</h3>
                                            <p className="text-sm font-open-sans text-gray-500 "> 
                                                { countWords(mate.summary) + countWords(mate.study_guide) } words • Processed on <span className="text-gray-700 uppercase font-open-sans">{mate.addedAt}</span></p>
                                            <div className="flex items-center mt-2 text-sm">
                                                <span className="text-green-600 font-medium flex items-center font-open-sans">
                                                    <CheckCircle className="h-4 w-4 mr-1" />
                                                    Processed
                                                </span>
                                            </div>
                                        </div>
                                        <button className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300">
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
                                    </div>
                                ))
                            )}










                        </div>
                    </div>
                </section >

                <aside className="col-span-3 space-y-6">
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Study Progress</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1 text-sm">
                                    <span>Physics</span>
                                    <span className="font-medium">78%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full w-[78%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1 text-sm">
                                    <span>History</span>
                                    <span className="font-medium">45%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full w-[45%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1 text-sm">
                                    <span>Biology</span>
                                    <span className="font-medium">92%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full w-[92%]"></div>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-6 bg-gray-50 hover:bg-gray-100 py-2 rounded-full text-sm font-medium transition-all duration-300">
                            View detailed progress
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">AI Assistant</h2>
                            <div className="flex items-center text-sm text-green-600">
                                <span className="w-2 h-2 bg-green-600 rounded-full mr-1.5 animate-pulse"></span>
                                <span>Online</span>
                            </div>
                        </div>
                        <div className="h-[280px] bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto border border-gray-100">
                            <div className="flex justify-start mb-3">
                                <div className="bg-blue-500 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                                    <p className="text-sm">Hello! How can I help with your studies today?</p>
                                    <p className="text-xs opacity-75 mt-1">10:24 AM</p>
                                </div>
                            </div>
                            <div className="flex justify-end mb-3">
                                <div className="bg-gray-200 py-2 px-3 rounded-lg rounded-tr-none max-w-[80%]">
                                    <p className="text-sm">Can you explain the concept of photosynthesis?</p>
                                    <p className="text-xs opacity-75 mt-1">10:25 AM</p>
                                </div>
                            </div>
                            <div className="flex justify-start mb-3">
                                <div className="bg-blue-500 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                                    <p className="text-sm">Photosynthesis is the process where plants convert light energy into chemical energy. They use sunlight, water, and carbon dioxide to produce glucose and oxygen. This happens in the chloroplasts, specifically in the thylakoid membranes.</p>
                                    <p className="text-xs opacity-75 mt-1">10:27 AM</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ask anything..."
                                className="w-full py-3 pl-4 pr-10 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                            />
                            <button className="absolute right-3 top-3 text-blue-600 hover:text-blue-700 transition-colors duration-300">
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </aside>
            </main >
        </div >
    );
};

export default Dashboard;
