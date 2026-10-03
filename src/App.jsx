import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './css/App.css'
import './css/reset.css'
import HomePage from './pages/HomePage.jsx'
import ProbioticPage from './pages/ProbioticPage.jsx'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer.jsx'
import AboutMe from './pages/AboutMe.jsx'



function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <div className="app">
      <NavBar />
      <div className="admin-toggle-bar">
        <button
          onClick={() => setIsAdminMode(!isAdminMode)}
          className={`admin-toggle-btn ${isAdminMode ? 'active' : ''}`}
        >
          {isAdminMode ? '🔓 Режим Админ: Включен (Натисни за изход)' : '🔒 Обикновен потребител (Натисни, за да влезеш като админ)'}
        </button>
      </div>
      <Routes>
        <Route path="/" element={<HomePage isAdminMode={isAdminMode}/>} />
        <Route path="/probiotic" element={<ProbioticPage isAdminMode={isAdminMode}/>} />
        <Route path="/about-me" element={<AboutMe isAdminMode={isAdminMode}/>} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
