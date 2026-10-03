import { useState } from 'react';
import './NavBar.css';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router';
import logo from '../../assets/logo-placeholder.avif';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { id: 1, label: "Начало", href: "/" },
        { id: 2, label: "Събития", href: "#events" },
        { id: 3, label: "За мен", href: "/about-me" },
        { id: 4, label: "Контакти", href: "#contacts" },
        { id: 5, label: "Пробиотик", href: "/probiotic" },
    ];

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="nav-bar">
            <img className="nav-logo" src={logo} alt="Logo" />

            <div className="nav-right-container">
                <ul className={isOpen ? "nav-links active" : "nav-links"}>
                    {navItems.map(item => (
                        <li key={item.id}>
                            <NavLink 
                                className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} 
                                to={item.href} 
                                end
                                onClick={closeMenu}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;