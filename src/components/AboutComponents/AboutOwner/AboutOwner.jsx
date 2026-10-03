import './AboutOwner.css'
import ownerPhoto from '../../../assets/about-me-image.jpg'
import EditableText from '../../EditableText/EditableText.jsx'
import { getText } from '../../../utils/ContentHelper.jsx'

function AboutOwner({ isAdminMode, backendContent, onSave }) {
    return (
        <section className="about-owner-section">
            <div className="about-owner-container">
                <div className="owner-image-wrapper">
                    <img src={ownerPhoto} alt="Бистра Стаменова" className="owner-photo" />
                </div>
                <div className="owner-bio-content">
                    <span className="bio-eyebrow">За създателя</span>
                    <h1 className="bio-title">Здравейте, аз съм <span className="highlight-name">Бистра Стаменова</span></h1>
                    <div className="bio-text">
                        <EditableText isAdminMode={isAdminMode} contentKey='bio-text' onSave={onSave}
                            initialText={getText(backendContent, `bio-text`, "Добре дошли в моето пространство за енергиен баланс, хармония и личностно израстване. Тук съчетавам древни мъдрости като Фън Шуй с практични съвременни техники за преодоляване на тревожността и подредба на вътрешния свят.")} />
                    </div>
                    <div className="bio-text">
                        <EditableText isAdminMode={isAdminMode} contentKey='bio-text-2' onSave={onSave}
                            initialText={getText(backendContent, `bio-text-2`, "Моята мисия е да ви помогна да откриете вътрешния си потенциал и да създадете хармония в живота си чрез енергийни практики, които подкрепят вашето благополучие и личностно развитие.")} />
                    </div>
                    <div className="bio-text">
                        <EditableText isAdminMode={isAdminMode} contentKey='bio-text-3' onSave={onSave}
                            initialText={getText(backendContent, `bio-text-3`, "Съчетавам радиестезията, енергийните изчиствания и практиките за баланс с индивидуален подход към всеки човек, за да постигнем устойчиви резултати и вътрешен мир.")} />
                    </div>
                    <div className="bio-text">
                        <EditableText isAdminMode={isAdminMode} contentKey='bio-text-4' onSave={onSave}
                            initialText={getText(backendContent, `bio-text-4`, "Вярвам, че всяко променение започва от нашето вътрешно Аз и се отразява пряко в дома и ежедневието ни.")} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutOwner