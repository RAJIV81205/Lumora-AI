import React from 'react'
import { useEffect , useState } from 'react'
import { useParams } from 'react-router'
import { FileText, BookOpen } from 'lucide-react'
import Summary from './Summary'
import StudyGuide from './StudyGuide'

const Share = () => {
    const [material, setMaterial] = useState([])
    const [error, setError] = useState(null)
    const [activeTab, setActiveTab] = useState('summary')
    const [loading, setLoading] = useState(true)
    const { courseId } = useParams()
    const url = import.meta.env.VITE_BACKEND_URL

    const getMaterial = async () => {
        try {
            const response = await fetch(`${url}/material/${courseId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (!response.ok) {
                setError(data.message)
                return
            }
            console.log(data)
            setMaterial(data)
            setLoading(false)
        } catch (error) {
            setError('Failed to fetch material')
        }
    }

    useEffect(() => {
        getMaterial()
    }, [courseId])

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 font-nunito-sans px-4 text-center">
                <img src="/close.png" className="w-16 h-16 mb-4" alt="Error icon" />
                <h1 className="text-3xl font-bold text-red-600 mb-2">{error || "Oops! Something went wrong."}</h1>
                <p className="text-gray-600 text-lg mb-4">
                    We're sorry for the inconvenience. Please try again in a few moments.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition duration-300"
                >
                    Retry
                </button>
            </div>

        )
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="flex flex-col items-center space-y-4 animate-pulse text-gray-600">
                    <svg
                        className="w-12 h-12 text-gray-400 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                    <p className="text-lg font-medium">Loading material...</p>
                    <p className="text-sm text-gray-400">Please wait a moment</p>
                </div>
            </div>

        )
    }

    return (
        <div className="min-h-screen w-full bg-gray-100 p-4 sm:p-6 font-open-sans">
            <div className="max-w-4xl mx-auto h-full">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <FileText className="h-5 w-5" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{material?.subName}</h1>
                                <p className="text-sm text-gray-500">Shared Material</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6">
                        <div className="flex space-x-4 mb-6">
                            <button
                                onClick={() => setActiveTab('summary')}
                                className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300 ${activeTab === 'summary'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <FileText className="h-4 w-4" />
                                <span>Summary</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('studyGuide')}
                                className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300 ${activeTab === 'studyGuide'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <BookOpen className="h-4 w-4" />
                                <span>Study Guide</span>
                            </button>
                        </div>

                        <div className="h-fit overflow-y-auto">
                            {activeTab === 'summary' ? (
                                <Summary material={material} />
                            ) : (
                                <StudyGuide material={material} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share