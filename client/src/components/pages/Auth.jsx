import React from 'react'
import LoginForm from '../LoginForm'
import { motion } from 'framer-motion'

const Auth = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full" >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
            >
                <LoginForm />
            </motion.div>
        </div>
    )
}

export default Auth