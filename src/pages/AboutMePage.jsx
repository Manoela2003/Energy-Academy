import AboutOwner from '../components/AboutComponents/AboutOwner/AboutOwner.jsx'
import Certificates from '../components/AboutComponents/Certificates/Certificates.jsx'
import MagicalTips from '../components/AboutComponents/MagicalTips/MagicalTips.jsx'
import './css/AboutMePage.css'

function AboutMePage() {
    return (
        <div className="about-me-page">
            <AboutOwner />
            <Certificates />
            <MagicalTips />
        </div>
    )
}

export default AboutMePage