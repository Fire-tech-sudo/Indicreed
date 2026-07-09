import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import LandingPage from './pages/LandingPage.jsx'
import PortfolioPage from './pages/PortfolioPage.jsx'
import ProjectDetails from './pages/ProjectDetails.jsx'
import AuthPage from './pages/AuthPage.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import NotificationToast from './components/NotificationToast.jsx'
import PublicRoute from './components/PublicRoute.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import PolicyPage from './pages/PolicyPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import WebDevPage from './pages/WebDevPage.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <NotificationToast />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Public routes */}
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:id" element={<ProjectDetails />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/web-development" element={<WebDevPage />} />
        <Route path="/privacy-policy" element={<PolicyPage />} />
        
        {/* Public route - only accessible when NOT logged in */}
        <Route path="/auth" element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        } />
      </Routes>
      <Footer />
    </>
  )
}
