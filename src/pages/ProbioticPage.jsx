import ProbioticHero from '../components/ProbioticComponents/ProbioticHero/ProbioticHero.jsx'
import ProbioticBenefits from '../components/ProbioticComponents/ProbioticBenefits/ProbioticBenefits.jsx'
import ProbioticVideoSection from '../components/ProbioticComponents/ProbioticVideoSection/ProbioticVideoSection.jsx'
import './css/ProbioticPage.css'

export default function ProbioticPage() {
    return (
        <div className="probiotic-page">
            <ProbioticHero />
            <ProbioticBenefits />
            <ProbioticVideoSection />
        </div>
    )
}