import { ShieldCheck, Zap, Activity, HeartPulse } from 'lucide-react'
import './ProbioticBenefits.css'

export default function ProbioticBenefits() {
    const benefits = [
        {
            icon: <Activity size={24} />,
            title: "Метаболизъм и храносмилане",
            description: "Полезните микроорганизми в червата участват активно в обмяната на веществата и усвояването на хранителни вещества."
        },
        {
            icon: <Zap size={24} />,
            title: "Енергия и жизненост",
            description: "Поддържането на чревния баланс оказва благоприятно влияние върху общия тонус и ежедневната енергия."
        },
        {
            icon: <ShieldCheck size={24} />,
            title: "Имунна функция",
            description: "Чревният микробиом е тясно свързан с нормалната имунна защита на организма."
        },
        {
            icon: <HeartPulse size={24} />,
            title: "Чист състав",
            description: "Продуктът е създаден без съдържание на лактоза, следвайки строги стандарти за качество и естествена ферментация."
        }
    ]

    return (
        <section className="probiotic-benefits">
            <div className="probiotic-benefits-container">
                <h2 className="section-title">Какво прави MaXilin различен?</h2>
                <div className="benefits-grid">
                    {benefits.map((item, idx) => (
                        <div key={idx} className="benefit-card">
                            <div className="benefit-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}