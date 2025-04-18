import React, { useState, useEffect } from "react"
import { Rocket, CirclePlay, FileUp, FileText, Sparkles, Brain, BookCheck, IdCard, Gauge, BrainCog, Braces, Menu, X } from "lucide-react"
import { Link } from "react-router"
import { motion, AnimatePresence } from "framer-motion"

const LandingPage = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5 }
        }
    }

    const buttonVariants = {
        hover: { 
            scale: 1.05,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.3 }
        },
        tap: { scale: 0.95 }
    }

    const cardVariants = {
        hover: { 
            scale: 1.03,
            boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.3 }
        }
    }

    const logoVariants = {
        hover: { 
            rotate: 360,
            transition: { duration: 0.8 }
        }
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <motion.div 
            className="w-full bg-gradient-to-br from-green-200 to-white font-sans px-4 md:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.header 
                className="py-6 px-10 flex justify-between items-center relative z-50"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <Link to="/">
                    <motion.div 
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.svg 
                            className="w-8 h-8 text-green-600" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                            variants={logoVariants}
                            whileHover="hover"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </motion.svg>
                        <h1 className="text-xl font-bold text-green-800">LumoraAI</h1>
                    </motion.div>
                </Link>

                {/* Mobile Menu Button */}
                <div className="md:hidden z-50">
                    <button 
                        onClick={toggleMenu}
                        className="text-green-700 hover:text-green-800 focus:outline-none p-2 rounded-full hover:bg-green-50 transition-colors duration-300"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Full Screen Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div 
                            className="fixed inset-0 bg-gradient-to-br from-green-50 to-white z-40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div 
                                className="h-full flex flex-col pt-24 px-8 pb-8"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                            >
                                <motion.nav 
                                    className="flex flex-col space-y-6"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.a 
                                        href="#" 
                                        className="text-xl font-medium text-green-800 hover:text-green-600 transition-colors duration-300 py-2 border-b border-green-100"
                                        variants={itemVariants}
                                        whileHover={{ x: 10 }}
                                    >
                                        Features
                                    </motion.a>
                                    <motion.a 
                                        href="#" 
                                        className="text-xl font-medium text-green-800 hover:text-green-600 transition-colors duration-300 py-2 border-b border-green-100"
                                        variants={itemVariants}
                                        whileHover={{ x: 10 }}
                                    >
                                        Pricing
                                    </motion.a>
                                    <motion.a 
                                        href="#" 
                                        className="text-xl font-medium text-green-800 hover:text-green-600 transition-colors duration-300 py-2 border-b border-green-100"
                                        variants={itemVariants}
                                        whileHover={{ x: 10 }}
                                    >
                                        Testimonials
                                    </motion.a>
                                    <motion.a 
                                        href="#" 
                                        className="text-xl font-medium text-green-800 hover:text-green-600 transition-colors duration-300 py-2 border-b border-green-100"
                                        variants={itemVariants}
                                        whileHover={{ x: 10 }}
                                    >
                                        FAQ
                                    </motion.a>
                                </motion.nav>
                                
                                <motion.div 
                                    className="flex flex-col space-y-4 mt-auto pt-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.4 }}
                                >
                                    <Link to="/login">
                                        <motion.button 
                                            className="w-full px-6 py-3 text-base font-medium rounded-xl text-green-700 bg-green-50 hover:bg-green-100 transition-all duration-300 cursor-pointer"
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            Log in
                                        </motion.button>
                                    </Link>
                                    <Link to="/signup">
                                        <motion.button 
                                            className="w-full px-6 py-3 text-base font-medium bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            Sign up free
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Desktop Navigation */}
                <motion.nav 
                    className="hidden md:flex items-center space-x-8 text-sm font-medium"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.a 
                        href="#" 
                        className="hover:text-green-600 transition-colors duration-300"
                        variants={itemVariants}
                        whileHover={{ scale: 1.1 }}
                    >
                        Features
                    </motion.a>
                    <motion.a 
                        href="#" 
                        className="hover:text-green-600 transition-colors duration-300"
                        variants={itemVariants}
                        whileHover={{ scale: 1.1 }}
                    >
                        Pricing
                    </motion.a>
                    <motion.a 
                        href="#" 
                        className="hover:text-green-600 transition-colors duration-300"
                        variants={itemVariants}
                        whileHover={{ scale: 1.1 }}
                    >
                        Testimonials
                    </motion.a>
                    <motion.a 
                        href="#" 
                        className="hover:text-green-600 transition-colors duration-300"
                        variants={itemVariants}
                        whileHover={{ scale: 1.1 }}
                    >
                        FAQ
                    </motion.a>
                </motion.nav>

                {/* Desktop Auth Buttons */}
                <motion.div 
                    className="hidden md:flex items-center gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Link to="/login">
                        <motion.button 
                            className="px-4 py-2 text-sm font-medium rounded-lg text-green-700 hover:bg-green-50 transition-all duration-300 cursor-pointer"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            Log in
                        </motion.button>
                    </Link>
                    <Link to="/signup">
                        <motion.button 
                            className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            Sign up free
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.header>

            <motion.main 
                className=" w-full py-12 px-8 lg:w-[85%] mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.section 
                    className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 mb-12 lg:mb-16"
                    variants={itemVariants}
                >
                    <motion.div 
                        className="w-full space-y-4 md:space-y-6"
                        variants={containerVariants}
                    >
                        <motion.h2 
                            className="text-4xl md:text-5xl font-bold leading-tight text-green-900 font-open-sans"
                            variants={itemVariants}
                        >
                            Turn Study Materials into <motion.span 
                                className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent font-open-sans"
                                variants={itemVariants}
                            >
                                Smart Learning
                            </motion.span> Experiences
                        </motion.h2>
                        <motion.p 
                            className="text-lg text-gray-500 font-nunito-sans"
                            variants={itemVariants}
                        >
                            Upload your notes, textbooks, and lectures. Our AI instantly transforms them into summaries, flashcards, and interactive quizzes.
                        </motion.p>

                        <motion.div 
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                            variants={itemVariants}
                        >
                            <Link to="/login">
                                <motion.button 
                                    className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 font-medium cursor-pointer"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <Rocket className="w-5 h-5" />
                                    Get Started Free
                                </motion.button>
                            </Link>
                            <motion.button 
                                className="px-6 py-3 border border-green-300 rounded-xl hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <CirclePlay className="w-5 h-5" />
                                Watch Demo
                            </motion.button>
                        </motion.div>

                        <motion.div 
                            className="flex items-center gap-3 md:gap-4 pt-4 md:pt-6"
                            variants={itemVariants}
                        >
                            <div className="flex -space-x-3">
                                <motion.img 
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                                    className="w-8 h-8 rounded-full border-2 border-white object-cover" 
                                    alt="User" 
                                    whileHover={{ scale: 1.2, zIndex: 10 }}
                                />
                                <motion.img 
                                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                                    className="w-8 h-8 rounded-full border-2 border-white object-cover" 
                                    alt="User" 
                                    whileHover={{ scale: 1.2, zIndex: 10 }}
                                />
                                <motion.img 
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                                    className="w-8 h-8 rounded-full border-2 border-white object-cover" 
                                    alt="User" 
                                    whileHover={{ scale: 1.2, zIndex: 10 }}
                                />
                                <motion.div 
                                    className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-xs font-medium text-green-700"
                                    whileHover={{ scale: 1.2, zIndex: 10 }}
                                >
                                    +5k
                                </motion.div>
                            </div>
                            <p className="text-sm text-gray-600">Trusted by 5,000+ students from top universities</p>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="w-full md:w-1/2 relative mt-8 md:mt-0"
                        variants={itemVariants}
                    >
                        <motion.div 
                            className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500 border border-gray-100"
                            variants={cardVariants}
                            whileHover="hover"
                        >
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
                                <motion.div 
                                    className="flex gap-4"
                                    variants={itemVariants}
                                >
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <FileUp className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium mb-2">Upload your study materials</p>
                                        <motion.div 
                                            className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors duration-300 text-center cursor-pointer flex flex-col items-center justify-center"
                                            whileHover={{ scale: 1.02, borderColor: "#10B981" }}
                                        >
                                            <FileText className="w-5 h-5 mb-2 text-gray-400" />
                                            <p className="text-sm text-gray-500 font-nunito-sans">Drag & drop files or <span className="text-green-600">browse</span></p>
                                            <p className="text-xs text-gray-400 mt-1 font-nunito-sans">PDFs, images, or text documents</p>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className="flex gap-4"
                                    variants={itemVariants}
                                >
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
                                            <motion.div 
                                                className="w-full bg-gray-200 rounded-full h-1.5"
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            >
                                                <motion.div 
                                                    className="bg-green-500 h-1.5 rounded-full w-4/5"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "80%" }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                ></motion.div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className="flex gap-4"
                                    variants={itemVariants}
                                >
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <Brain className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium mb-2">Get personalized study tools</p>
                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            <motion.div 
                                                className="min-w-[120px] bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center flex-col"
                                                whileHover={{ scale: 1.05, y: -5 }}
                                            >
                                                <FileText className="w-5 h-5 mb-2 text-green-500" />
                                                <p className="text-xs font-medium">Summaries</p>
                                            </motion.div>
                                            <motion.div 
                                                className="min-w-[120px] bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center flex-col"
                                                whileHover={{ scale: 1.05, y: -5 }}
                                            >
                                                <BookCheck className="w-5 h-5 mb-2 text-green-500" />
                                                <p className="text-xs font-medium">Quizzes</p>
                                            </motion.div>
                                            <motion.div 
                                                className="min-w-[120px] bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center flex-col"
                                                whileHover={{ scale: 1.05, y: -5 }}
                                            >
                                                <IdCard className="w-5 h-5 mb-2 text-green-500" />
                                                <p className="text-xs font-medium">Flashcards</p>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div 
                            className="absolute -z-10 bg-gradient-to-r from-green-300 to-green-500 w-full h-full rounded-2xl -right-5 -bottom-5"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        ></motion.div>
                    </motion.div>
                </motion.section>

                <motion.section 
                    className="mb-12 md:mb-16"
                    variants={itemVariants}
                >
                    <div className="text-center mb-8">
                        <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-2">
                            Trusted by students from
                        </h3>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
                            <motion.img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/2560px-MIT_logo.svg.png"
                                alt="MIT"
                                className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all duration-300"
                                whileHover={{ scale: 1.1 }}
                            />
                            <motion.img
                                src="https://lh5.googleusercontent.com/EituGLa2LhnAd-B-SUCpw9WhJTImioKqwFLpe1qDhAx1lKq_VSNiYVi-ghrMxROfyfwz8Rfz-cKYOKBDwh-7OEMButVijE5mXKI9333g2QaiPwzAY6_8HlOSaGI5gy3xHfgia1cB0mU669xrGJ4TXHU"
                                alt="Harvard"
                                className="h-12 grayscale hover:grayscale-0 transition-all duration-300"
                                whileHover={{ scale: 1.1 }}
                            />
                            <motion.img
                                src="https://assurgentmedical.com/wp-content/uploads/2017/07/stanford-logo-660x330.png"
                                alt="Stanford"
                                className="h-10 grayscale hover:grayscale-0 transition-all duration-300"
                                whileHover={{ scale: 1.1 }}
                            />
                            <motion.img
                                src="https://logos-world.net/wp-content/uploads/2022/02/UC-Berkeley-Symbol.png"
                                alt="Berkeley"
                                className="h-10 md:h-12 grayscale hover:grayscale-0 transition-all duration-300"
                                whileHover={{ scale: 1.1 }}
                            />
                            <motion.img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/University_of_Oxford.svg/821px-University_of_Oxford.svg.png"
                                alt="Oxford"
                                className="h-10 md:h-12 grayscale hover:grayscale-0 transition-all duration-300"
                                whileHover={{ scale: 1.1 }}
                            />
                        </div>
                    </div>
                </motion.section>

                <motion.section 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                >
                    <motion.div 
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                        variants={itemVariants}
                        whileHover={{ y: -10, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)" }}
                    >
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <Gauge className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Learn 3x Faster</h3>
                        <p className="text-gray-600 text-sm">
                            Our AI identifies key concepts and focuses your study time on what matters most, cutting
                            study time by up to 70%.
                        </p>
                    </motion.div>

                    <motion.div 
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                        variants={itemVariants}
                        whileHover={{ y: -10, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)" }}
                    >
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <BrainCog className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Personalized Learning</h3>
                        <p className="text-gray-600 text-sm">
                            The AI adapts to your learning style and knowledge gaps, creating custom quizzes and
                            summaries tailored to your needs.
                        </p>
                    </motion.div>

                    <motion.div 
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                        variants={itemVariants}
                        whileHover={{ y: -10, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)" }}
                    >
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <Braces className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Any Format, Any Subject</h3>
                        <p className="text-gray-600 text-sm">
                            Upload PDFs, images, text, or even handwritten notes. Our AI works across all subjects
                            from STEM to humanities.
                        </p>
                    </motion.div>
                </motion.section>
            </motion.main>
        </motion.div>
    )
}

export default LandingPage;
