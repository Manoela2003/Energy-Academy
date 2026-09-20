import Navbar from '../components/NavBar/Navbar.jsx'
import HeroSection from '../components/HeroSection/HeroSection.jsx'
import LeafDividerSection from '../components/LeafDividerSection/LeafDividerSection.jsx';
import UpcomingEventsSection from '../components/UpcomingEventsSection/UpcomingEventSection.jsx';

function HomePage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <LeafDividerSection />
            <UpcomingEventsSection />
            <div style={{height: '200px'}}>


            </div>
        </>
    )
}

export default HomePage;