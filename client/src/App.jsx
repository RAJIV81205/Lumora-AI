import React from 'react'
import Auth from './components/pages/Auth'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import LandingPage from './components/pages/LandingPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/auth" element={<Auth/>} />
      </Routes>
    </Router>
  )
}

export default App