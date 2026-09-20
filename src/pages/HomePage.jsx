import Navbar from '../components/NavBar/Navbar.jsx'
import HeroSection from '../components/HeroSection/HeroSection.jsx'
import LeafDividerSection from '../components/LeafDividerSection/LeafDividerSection.jsx';
import UpcomingEventsSection from '../components/UpcomingEventsSection/UpcomingEventSection.jsx';
import AboutSection from '../components/AboutSection/AboutSection.jsx';
import Footer from '../components/Footer/Footer.jsx';

function HomePage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <LeafDividerSection />
            <UpcomingEventsSection />
            <AboutSection />
            <Footer />
        </>
    )
}

export default HomePage;