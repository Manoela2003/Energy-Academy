import './AboutSection.css'
import aboutImage from '../../assets/about-me-image.webp'
import { motion } from 'framer-motion'
import EditableText from '../EditableText/EditableText.jsx'
import { getText } from '../../utils/ContentHelper.jsx'

export default function AboutSection({ isAdminMode, backendContent, onSave }) {

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

                    <div className="about-intro">
                        <EditableText isAdminMode={isAdminMode} contentKey='about-intro' onSave={onSave}
                            initialText={getText(backendContent, 'about-intro', "От 2023 г. моят път е свързан с радиестезията, енергийните изчиствания и работата с фините енергийни полета.")} />
                    </div>

                    <div className="about-text">
                        <EditableText isAdminMode={isAdminMode} contentKey='about-text' onSave={onSave}
                            initialText={getText(backendContent, 'about-text', "В практиката си изследвам невидимите взаимодействия, които могат да влияят върху човека и неговото състояние. Работя с изчистване и балансиране на биополето, както и с практики за освобождаване от нежелани енергийни влияния, натрупвания, програми, кодове, отпечатъци и същности.")} />
                    </div>

                    <div className="about-text">
                        <EditableText isAdminMode={isAdminMode} contentKey='about-text-2' onSave={onSave}
                            initialText={getText(backendContent, 'about-text-2', "Чрез радиестезията търся информацията, свързана с конкретното състояние, а чрез енергийните практики работя в посока хармонизиране и възстановяване на вътрешния баланс. Всяка работа е изцяло индивидуална - с внимание към вашите лични усещания и нужди.")} />
                    </div>

                    <div className="about-welcome-box">
                        <div>
                            <EditableText isAdminMode={isAdminMode} contentKey='about-welcome-box' onSave={onSave}
                                initialText={getText(backendContent, 'about-welcome-box', "Понякога промяната започва там, където невидимото най-накрая бъде осъзнато. Добре дошли в пространство, посветено на терапията и познанието за фините енергии.")} />
                        </div>
                    </div>

                    <blockquote className="about-quote">
                        <EditableText isAdminMode={isAdminMode} contentKey='about-quote' onSave={onSave}
                            initialText={getText(backendContent, 'about-quote', "„Това, което не се вижда с очите, понякога се усеща най-силно.“")} />
                    </blockquote>
                </motion.div>
            </div>
        </section>
    )
}