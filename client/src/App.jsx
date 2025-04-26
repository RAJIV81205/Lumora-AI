import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router'
import LandingPage from './components/pages/LandingPage'
import LoginForm from './components/pages/Auth/LoginForm'
import SignupForm from './components/pages/Auth/SignupForm'
import Dashboard from './components/pages/Dashboard/Dashboard'
import Chat from './components/pages/Dashboard/Chat'
import Material from './components/pages/Dashboard/Material'
import Share from './components/pages/Dashboard/Share'


// ScrollToTop component to reset scroll position on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" index element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/chat" element={<Chat />} />
        <Route path="/dashboard/materials" element={<Material />} />
        <Route path="/share/:courseId" element={<Share />} />
      </Routes>
    </Router>
  )
}

export default App