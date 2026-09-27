import HeroSection from '../components/HeroSection/HeroSection.jsx'
import LeafDividerSection from '../components/LeafDividerSection/LeafDividerSection.jsx';
import UpcomingEventsSection from '../components/UpcomingEventsSection/UpcomingEventSection.jsx';
import AboutSection from '../components/AboutSection/AboutSection.jsx';
import ProbioticSection from '../components/ProbioticComponents/ProbioticSection/ProbioticSection.jsx';

function HomePage() {
    return (
        <>
            <HeroSection />
            <LeafDividerSection />
            <UpcomingEventsSection />
            <AboutSection />
            <ProbioticSection />
        </>
    )
}

export default HomePage;