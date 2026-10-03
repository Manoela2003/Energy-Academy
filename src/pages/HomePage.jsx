import HeroSection from '../components/HeroSection/HeroSection.jsx'
import LeafDividerSection from '../components/LeafDividerSection/LeafDividerSection.jsx';
import UpcomingEventsSection from '../components/UpcomingEventsSection/UpcomingEventSection.jsx';
import AboutSection from '../components/AboutSection/AboutSection.jsx';
import ProbioticSection from '../components/ProbioticComponents/ProbioticSection/ProbioticSection.jsx';

function HomePage({isAdminMode, backendContent, onSave}) {
    return (
        <>
            <HeroSection />
            <LeafDividerSection isAdminMode={isAdminMode} backendContent={backendContent} onSave={onSave}/>
            <UpcomingEventsSection isAdminMode={isAdminMode} backendContent={backendContent} onSave={onSave}/>
            <AboutSection isAdminMode={isAdminMode} backendContent={backendContent} onSave={onSave}/>
            <ProbioticSection isAdminMode={isAdminMode} backendContent={backendContent} onSave={onSave}/>
        </>
    )
}

export default HomePage;