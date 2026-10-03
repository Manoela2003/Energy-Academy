import './AboutOwner.css'
import ownerPhoto from '../../../assets/about-me-image.jpg'

function AboutOwner() {
    return (
        <section className="about-owner-section">
            <div className="about-owner-container">
                <div className="owner-image-wrapper">
                    <img src={ownerPhoto} alt="Бистра Стаменова" className="owner-photo" />
                </div>
                <div className="owner-bio-content">
                    <span className="bio-eyebrow">За създателя</span>
                    <h1 className="bio-title">Здравейте, аз съм <span className="highlight-name">Бистра Стаменова</span></h1>
                    <p className="bio-text">
                        Добре дошли в моето пространство за енергиен баланс, хармония и личностно израстване. 
                        Тук съчетавам древни мъдрости като Фън Шуй с практични съвременни техники за преодоляване на тревожността и подредба на вътрешния свят.
                    </p>
                    <p className="bio-text">
                        Вярвам, че всяко променение започва от нашето вътрешно Аз и се отразява пряко в дома и ежедневието ни.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default AboutOwner