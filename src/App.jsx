import { Routes, Route } from 'react-router-dom'
import './css/App.css'
import './css/reset.css'
import HomePage from './pages/HomePage.jsx'
import ProbioticPage from './pages/ProbioticPage.jsx'
import Navbar from './components/NavBar/NavBar.jsx'
import Footer from './components/Footer/Footer.jsx'



function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/probiotic" element={<ProbioticPage />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
