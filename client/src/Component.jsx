import React from "react"
import { Rocket, CirclePlay, FileUp, FileText, Sparkles , Brain , BookCheck , IdCard } from "lucide-react"

export const Component = () => {
    return (
        <div className="w-full  bg-gradient-to-br from-green-200 to-white font-sans px-4 md:px-0 ">
            <header className="py-6 px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <h1 className="text-xl font-bold text-green-800">LumoraAI</h1>
                </div>

                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <a href="#" className="hover:text-green-600 transition-colors duration-300">Features</a>
                    <a href="#" className="hover:text-green-600 transition-colors duration-300">Pricing</a>
                    <a href="#" className="hover:text-green-600 transition-colors duration-300">Testimonials</a>
                    <a href="#" className="hover:text-green-600 transition-colors duration-300">FAQ</a>
                </nav>

                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 text-sm font-medium rounded-lg text-green-700 hover:bg-green-50 transition-all duration-300">Log in</button>
                    <button className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">Sign up free</button>
                </div>
            </header>

            <main className="py-12 px-8 w-[80%] mx-auto">
                <section className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-12 md:mb-16">
                    <div className="w-full space-y-4 md:space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-green-900 font-open-sans">
                            Turn Study Materials into <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent font-open-sans">Smart Learning</span> Experiences
                        </h2>
                        <p className="text-lg text-gray-500 font-nunito-sans">
                            Upload your notes, textbooks, and lectures. Our AI instantly transforms them into summaries, flashcards, and interactive quizzes.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 font-medium">
                                <Rocket className="w-5 h-5" />
                                Get Started Free
                            </button>
                            <button className="px-6 py-3 border border-green-300 rounded-xl hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2 font-medium">
                                <CirclePlay className="w-5 h-5" />
                                Watch Demo
                            </button>
                        </div>

                        <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-6">
                            <div className="flex -space-x-3">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="User" />
                                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="User" />
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="User" />
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-xs font-medium text-green-700">+5k</div>
                            </div>
                            <p className="text-sm text-gray-600">Trusted by 5,000+ students from top universities</p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500 border border-gray-100">
                            <div className="bg-green-50 p-4 flex justify-between items-center border-b border-gray-100">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="text-sm font-medium text-green-700">LumoraAI Assistant</div>
                                <div></div>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="flex gap-4  ">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <FileUp className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium mb-2">Upload your study materials</p>
                                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors duration-300 text-center cursor-pointer flex flex-col items-center justify-center ">
                                            <FileText className="w-5 h-5 mb-2 text-gray-400" />
                                            <p className="text-sm text-gray-500 font-nunito-sans">Drag & drop files or <span className="text-green-600">browse</span></p>
                                            <p className="text-xs text-gray-400 mt-1 font-nunito-sans">PDFs, images, or text documents</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium mb-2">AI processes your content</p>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs text-gray-500 font-nunito-sans">Processing "Biology_101.pdf"</span>
                                                <span className="text-xs text-green-600 font-nunito-sans">83%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                <div className="bg-green-500 h-1.5 rounded-full w-4/5"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <Brain className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium mb-2">Get personalized study tools</p>
                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            <div className="min-w-[120px] bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-300 cursor-pointer">
                                            <FileText className="w-5 h-5 text-green-500" />
                                                <p className="text-xs font-medium">Summaries</p>
                                            </div>
                                            <div className="min-w-[120px] bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-300 cursor-pointer">
                                            <BookCheck className="w-5 h-5 text-green-500" />
                                                <p className="text-xs font-medium">Quizzes</p>
                                            </div>
                                            <div className="min-w-[120px] bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-300 cursor-pointer">
                                            <IdCard className="w-5 h-5 text-green-500" />
                                                <p className="text-xs font-medium">Flashcards</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -z-10 bg-gradient-to-r from-green-300 to-green-500 w-full h-full rounded-2xl -right-5 -bottom-5"></div>
                    </div>
                </section>

                <section className="mb-12 md:mb-16">
                    <div className="text-center mb-8">
                        <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-2">
                            Trusted by students from
                        </h3>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/MIT_logo.svg/200px-MIT_logo.svg.png"
                                alt="MIT"
                                className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-300"
                            />
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Harvard_shield_wreath.svg/200px-Harvard_shield_wreath.svg.png"
                                alt="Harvard"
                                className="h-12 grayscale hover:grayscale-0 transition-all duration-300"
                            />
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Stanford_logo.png/220px-Stanford_logo.png"
                                alt="Stanford"
                                className="h-10 grayscale hover:grayscale-0 transition-all duration-300"
                            />
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/UCB_seal.svg/200px-UCB_seal.svg.png"
                                alt="Berkeley"
                                className="h-10 md:h-12 grayscale hover:grayscale-0 transition-all duration-300"
                            />
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Oxford-University-Circlet.svg/200px-Oxford-University-Circlet.svg.png"
                                alt="Oxford"
                                className="h-10 md:h-12 grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-green-600">speed</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Learn 3x Faster</h3>
                        <p className="text-gray-600 text-sm">
                            Our AI identifies key concepts and focuses your study time on what matters most, cutting
                            study time by up to 70%.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-green-600">psychology_alt</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Personalized Learning</h3>
                        <p className="text-gray-600 text-sm">
                            The AI adapts to your learning style and knowledge gaps, creating custom quizzes and
                            summaries tailored to your needs.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-green-600">
                                integration_instructions
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Any Format, Any Subject</h3>
                        <p className="text-gray-600 text-sm">
                            Upload PDFs, images, text, or even handwritten notes. Our AI works across all subjects
                            from STEM to humanities.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    )
}
