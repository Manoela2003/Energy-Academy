import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './css/App.css'
import './css/reset.css'
import HomePage from './pages/HomePage.jsx'
import ProbioticPage from './pages/ProbioticPage.jsx'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer.jsx'
import AboutMe from './pages/AboutMePage.jsx'

function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [backendContent, setBackendContent] = useState({});
  const API_URL = 'https://energy-academy-be.onrender.com/api/content';

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setBackendContent(data);
      })
      .catch(err => console.log("Backend not running or offline, using defaults.", err));
  }, []);

  const handleSaveContent = async (key, newValue) => {
    try {
      const response = await fetch(`${API_URL}/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentValue: newValue })
      });

      if (response.ok) {
        setBackendContent(prev => ({ ...prev, [key]: newValue }));
      }
    } catch (error) {
      console.error("Failed to save content to backend:", error);
    }
  };

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
        <Route path="/" element={<HomePage isAdminMode={isAdminMode} backendContent={backendContent}
          onSave={handleSaveContent} />} />
        <Route path="/probiotic" element={<ProbioticPage isAdminMode={isAdminMode} backendContent={backendContent}
          onSave={handleSaveContent} />} />
        <Route path="/about-me" element={<AboutMe isAdminMode={isAdminMode} backendContent={backendContent}
          onSave={handleSaveContent} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
