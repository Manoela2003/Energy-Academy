import Navbar from '../components/NavBar/Navbar.jsx'
import HeroSection from '../components/HeroSection/HeroSection.jsx'
import LeafDividerSection from '../components/LeafDividerSection/LeafDividerSection.jsx';

function HomePage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <LeafDividerSection />
            <UpcomingEventsSection />
        </>
    )
}

export default HomePage;