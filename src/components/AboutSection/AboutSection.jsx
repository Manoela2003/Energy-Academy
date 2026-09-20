import './AboutSection.css'
import aboutImage from '../../assets/about-me-image.webp'
import { motion } from 'framer-motion'

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
    }
}

export default function AboutSection() {
    return (
        <section className="about-section">
            <div className="about-container">
                <div className="about-image-wrapper">
                    <div className="about-image-backdrop"></div>
                    <img
                        src={aboutImage}
                        alt="Бистра Стаменова - радиестезист"
                        className="about-image"
                        decoding="async"
                    />
                </div>

                <motion.div
                    className="about-content"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <span className="about-eyebrow">За мен</span>
                    <h2 className="about-title">
                        Здравейте, аз съм <span className="highlight-name">Бистра Стаменова</span>
                    </h2>

                    <p className="about-intro">
                        От 2023 г. моят път е свързан с радиестезията, енергийните изчиствания и работата с фините енергийни полета.
                    </p>

                    <p className="about-text">
                        В практиката си изследвам невидимите взаимодействия, които могат да влияят върху човека и неговото състояние. Работя с изчистване и балансиране на биополето, както и с практики за освобождаване от нежелани енергийни влияния, натрупвания, програми, кодове, отпечатъци и същности.
                    </p>

                    <p className="about-text">
                        Чрез радиестезията търся информацията, свързана с конкретното състояние, а чрез енергийните практики работя в посока хармонизиране и възстановяване на вътрешния баланс. Всяка работа е изцяло индивидуална - с внимание към вашите лични усещания и нужди.
                    </p>

                    <div className="about-welcome-box">
                        <p>
                            Понякога промяната започва там, където невидимото най-накрая бъде осъзнато. Добре дошли в пространство, посветено на терапията и познанието за фините енергии.
                        </p>
                    </div>

                    <blockquote className="about-quote">
                        „Това, което не се вижда с очите, понякога се усеща най-силно.“
                    </blockquote>
                </motion.div>
            </div>
        </section>
    )
}