import { Sparkles, ShoppingBag, UserPlus, ExternalLink } from 'lucide-react'
import probioticImage from '../../../assets/probiotic-hero.jpg'
import './ProbioticHero.css'

export default function ProbioticHero() {
    return (
        <section className="probiotic-hero">
            <div className="probiotic-hero-container">
                <div className="probiotic-hero-content">
                    <span className="probiotic-hero-badge">
                        <Sparkles size={16} /> Научно подкрепено здраве
                    </span>
                    <h1 className="probiotic-hero-title">MaXilin — Съвременна синбиотична формула</h1>
                    <p className="probiotic-hero-lead">
                        За естествено здраве и професионална грижа всеки ден. Микробиомът е ключова част от твоето ежедневно благосъстояние.
                    </p>
                    <p className="probiotic-hero-text">
                        MaXilin съчетава подбрани пробиотични щамове и пребиотични влакна в една удобна за употреба формула, предназначена да поддържа баланса в храносмилателната система.
                    </p>
                    <div className="probiotic-hero-actions">
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
                            <span>Партньорска мрежа</span>
                        </a>
                        <a 
                            href="https://maxilinlive.com/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="probiotic-btn text-btn"
                        >
                            <span>Официален сайт</span>
                            <ExternalLink size={16} />
                        </a>
                    </div>
                </div>
                <div className="probiotic-hero-image-wrapper">
                    <img 
                        src={probioticImage} 
                        alt="MaXilin Пробиотик" 
                        className="probiotic-hero-img"
                        loading="eager"
                        decoding="async"
                    />
                </div>
            </div>
        </section>
    )
}