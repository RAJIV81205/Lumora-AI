import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import LandingPage from './components/pages/LandingPage'
import LoginForm from './components/pages/LoginForm'
import SignupForm from './components/pages/SignupForm'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" index element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />


      </Routes>
    </Router>
  )
}

export default App