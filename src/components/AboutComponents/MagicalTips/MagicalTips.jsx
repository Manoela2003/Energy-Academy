import EditableText from '../../EditableText/EditableText';
import { getText } from '../../../utils/ContentHelper.jsx';
import './MagicalTips.css'

function MagicalTips({ isAdminMode, backendContent, onSave }) {
    const tips = [
        { tip: "Ако ви е трудно да видите кой път да следвате или какво решение да вземете... почистете прозорците и погледнете през тях." },
        { tip: "Ако страдате от нервност, безпокойство или съмнение в себе си... дръжте нещата спретнато на местата им и завесите добре осветени." },
        { tip: "Ако чувствате, че трябва да промените неща в живота си, които вече не ви харесват... помете къщата отвътре навън." },
        { tip: "Когато сте тъжни, меланхолични или депресирани... дръпнете завесите и оставете много слънце в къщата." },
        { tip: "Когато трябва да учите или да се подготвите за някакъв тест... първо измийте мръсните съдове." },
        { tip: "Когато искате да сложите ред в живота си, защото има нещо \"не както трябва\".... оправете леглото си веднага щом станете." },
        { tip: "Когато имате идея в ума си и искате да я обмислите, преди да я приложите в действие... измийте пода." },
        { tip: "Когато искате бедността да напусне къщата... изхвърлете всички неща, които не използвате или имате нужда и изпразнете чекмеджетата от хартия и неизползваеми предмети." },
        { tip: "За да изоставите лош навик.... почистете праха от мебелите." },
        { tip: "За да се ​​почувствате Прекрасното същество, което сте.... вземете хубав душ с усмивка." }
    ];

    return (
        <section className="magical-tips-section">
            <div className="magical-tips-container">
                <div className="magical-card">
                    <h2 className="magical-title">
                        <EditableText isAdminMode={isAdminMode} contentKey='magical-tips-title' onSave={onSave}
                            initialText={getText(backendContent, `magical-tips-title`, "🍁 ВАЖНИ МАГИЧЕСКИ СЪВЕТИ ОТ МЕН 🍁")} />
                    </h2>
                    <div className="magical-intro">
                        <EditableText isAdminMode={isAdminMode} contentKey='magical-tips-intro' onSave={onSave}
                            initialText={getText(backendContent, `magical-tips-intro`, "Нека не забравяме, че нашият дом е отражение на това, което може да се случи в нашето вътрешно Аз. Някои от тези съвети произхождат от Фън Шуй, упражнения за лечение на тревожност...")} />
                    </div>
                    <div className="tips-list">
                        {tips.map((tip, index) => (
                            <div key={index} className="tip-item">
                                <span className="tip-icon">🍁🍁</span>
                                <div>
                                    <EditableText isAdminMode={isAdminMode} contentKey={`magical-tip-${index + 1}`} onSave={onSave}
                                        initialText={getText(backendContent, `magical-tip-${index + 1}`, tip.tip)} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="magical-signature">
                        <p>С ЛЮБОВ, </p>
                        <h3>БИСТРА СТАМЕНОВА</h3>
                        <p>🧹 ✨ ♥️</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MagicalTips