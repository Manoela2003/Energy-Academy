import './ProbioticSection.css'
import { motion } from 'framer-motion'
import { ShoppingBag, UserPlus, ShieldCheck } from 'lucide-react'
import probioticImage from '../../../assets/probiotic-placeholder.webp'
import EditableText from '../../EditableText/EditableText.jsx'
import { getText } from '../../../utils/ContentHelper.jsx'

export default function ProbioticSection({ isAdminMode, backendContent, onSave }) {

    return (
        <section className="probiotic-section">
            <div className="probiotic-container">
                <motion.div
                    className="probiotic-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                >
                    <div className="probiotic-header">
                        <span className="probiotic-badge">
                            <ShieldCheck size={16} />
                            <EditableText isAdminMode={isAdminMode} contentKey='probiotic-badge' onSave={onSave}
                                initialText={getText(backendContent, 'probiotic-badge', "Цялостна грижа отвътре")} />
                        </span>
                        <h2 className="probiotic-title">
                            <EditableText isAdminMode={isAdminMode} contentKey='probiotic-title' onSave={onSave}
                                initialText={getText(backendContent, 'probiotic-title', "Балансът започва в микробиома")} />
                        </h2>
                        <div className="probiotic-subtitle">
                            <EditableText isAdminMode={isAdminMode} contentKey='probiotic-subtitle' onSave={onSave}
                                initialText={getText(backendContent, 'probiotic-subtitle', "Често търсим причината за трудното сваляне на килограми само в храната… но организмът е много по-сложна система. 🌿")} />
                        </div>
                    </div>

                    <div className="probiotic-body">
                        <div className="probiotic-img-wrapper">
                            <img
                                src={probioticImage}
                                alt="MaXilin Пробиотик"
                                className="probiotic-img"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>

                        <div className="probiotic-info">
                            <div className="probiotic-paragraph">
                                <EditableText isAdminMode={isAdminMode} contentKey='probiotic-paragraph' onSave={onSave}
                                    initialText={getText(backendContent, 'probiotic-paragraph', "Чревната микрофлора участва в редица процеси, свързани с храносмилането и обмяната на веществата. Затова грижата за нейния баланс може да бъде важна част от цялостния подход към доброто здраве.")} />
                            </div>

                            <div className="probiotic-highlight-box">
                                <div>
                                    <EditableText isAdminMode={isAdminMode} contentKey='probiotic-highlight' onSave={onSave}
                                        initialText={getText(backendContent, 'probiotic-highlight', "MaXilin е пробиотик, създаден да допълни ежедневната грижа за чревната микрофлора. Не като „магическо решение“, а като част от устойчив режим, включващ балансирано хранене, движение и достатъчно сън.")} />
                                </div>
                            </div>

                            <div className="probiotic-footer-text">
                                <EditableText isAdminMode={isAdminMode} contentKey='probiotic-footer-text' onSave={onSave}
                                    initialText={getText(backendContent, 'probiotic-footer-text', "Погрижи се за себе си отвътре навън. 💚")} />
                            </div>

                            <div className="probiotic-actions">
                                <a
                                    href="https://energymaxgroup.eu/cabinet/referral-shop/598d9fe14596f9d5fa2935ae6e1288dd"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="probiotic-btn primary-btn"
                                >
                                    <ShoppingBag size={18} />
                                    <span>Купи като клиент</span>
                                </a>

                                <a
                                    href="https://energymaxgroup.eu/cabinet/registration?invite=1ed6f209448a33f9b80c517e523150ac"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="probiotic-btn secondary-btn"
                                >
                                    <UserPlus size={18} />
                                    <span>Включи се в партньорската мрежа</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}