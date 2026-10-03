import AboutOwner from '../components/AboutComponents/AboutOwner/AboutOwner.jsx'
import Certificates from '../components/AboutComponents/Certificates/Certificates.jsx'
import MagicalTips from '../components/AboutComponents/MagicalTips/MagicalTips.jsx'
import './css/AboutMePage.css'

function AboutMePage({isAdminMode, backendContent, onSave}) {
    return (
        <div className="about-me-page">
            <AboutOwner isAdminMode={isAdminMode} backendContent={backendContent} onSave={onSave} />
            <Certificates isAdminMode={isAdminMode} backendContent={backendContent} onSave={onSave} />
            <MagicalTips isAdminMode={isAdminMode} backendContent={backendContent} onSave={onSave} />
        </div>
    )
}

export default AboutMePage