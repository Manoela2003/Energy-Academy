import './Footer.css'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { FaInstagram, FaFacebookF, FaTelegramPlane } from 'react-icons/fa'
import logo from '../../assets/logo-placeholder.avif'

function Footer() {
    const quickLinks = [
        { id: 1, label: "Начало", href: "/" },
        { id: 2, label: "Предстоящи събития", href: "#events" },
        { id: 3, label: "За мен", href: "#about" },
        { id: 4, label: "Контакти", href: "#contact" },
    ]

    const serviceLinks = [
        { id: 1, label: "Радиестезично изчистване", href: "#" },
        { id: 2, label: "Балансиране на чакрите", href: "#" },
        { id: 3, label: "Индивидуални консултации", href: "#" },
        { id: 4, label: "Практически уъркшопи", href: "#" },
    ]

    const additionalLinks = [
        { id: 1, label: "Общи условия", href: "#" },
        { id: 2, label: "Политика за поверителност", href: "#" },
        { id: 3, label: "Бисквитки", href: "#" },
    ]

    return (
        <footer className="footer">
            <div className="inner-footer">
                <div className="footer-head">
                    <div className="footer-brand">
                        <img className="footer-logo" src={logo} alt="Енергийна Академия" />
                        <div>
                            <span className="footer-brand-title">Енергийна Академия</span>
                            <p className="footer-brand-tagline">Пространство за фини енергии и осъзнатост</p>
                        </div>
                    </div>
                    <div className="footer-socials">
                        <a href="#" aria-label="Instagram"><FaInstagram size={19} /></a>
                        <a href="#" aria-label="Facebook"><FaFacebookF size={18} /></a>
                        <a href="#" aria-label="Telegram"><FaTelegramPlane size={18} /></a>
                    </div>
                </div>

                <div className="energy-divider">
                    <span className="divider-line"></span>
                    <span className="divider-symbol">✦</span>
                    <span className="divider-line"></span>
                </div>

                <div className="footer-main">
                    <div className="footer-column">
                        <h4>Бързи връзки</h4>
                        <ul>
                            {quickLinks.map((link) => (
                                <li key={link.id}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Практики и курсове</h4>
                        <ul>
                            {serviceLinks.map((service) => (
                                <li key={service.id}>
                                    <a href={service.href}>{service.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Контакти</h4>
                        <div className="contact-list">
                            <div className="contact-item">
                                <MapPin size={18} />
                                <span>България</span>
                            </div>
                            <div className="contact-item">
                                <Mail size={18} />
                                <a href="mailto:contact@energyacademy.bg">contact@energyacademy.bg</a>
                            </div>
                            <div className="contact-item">
                                <Phone size={18} />
                                <a href="tel:+359888000000">+359 88 800 0000</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="energy-divider">
                    <span className="divider-line"></span>
                    <span className="divider-symbol">✦</span>
                    <span className="divider-line"></span>
                </div>

                <div className="footer-additional">
                    <p>&copy; {new Date().getFullYear()} Енергийна Академия. Всички права запазени.</p>
                    <div className="additional-links">
                        <ul>
                            {additionalLinks.map((link) => (
                                <li key={link.id}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer