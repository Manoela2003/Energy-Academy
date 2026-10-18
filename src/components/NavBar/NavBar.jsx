import { useState, useEffect } from 'react';
import './NavBar.css';
import { Menu, X, User, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';
import logo from '../../assets/logo-placeholder.avif';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [firstName, setFirstName] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            try {
                const payloadBase64 = token.split('.')[1];
                const decodedPayload = JSON.parse(atob(payloadBase64));

                setFirstName(decodedPayload.firstName);
            } catch (e) {
                localStorage.removeItem('jwt_token');
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        setFirstName(null);
        navigate('/');
        window.location.reload();
    };

    const navItems = [
        { id: 1, label: "Начало", href: "/" },
        { id: 2, label: "Събития", href: "/events" },
        { id: 3, label: "За мен", href: "/about-me" },
        { id: 4, label: "Контакти", href: "/contacts" },
        { id: 5, label: "Пробиотик", href: "/probiotic" },
    ];

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="nav-bar">
            <img className="nav-logo" src={logo} alt="Logo" />

            <div className="nav-container">
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

            <div className="account-icon">
                <div>
                    {firstName ? (
                        <div className="user-info">
                            <span className="user-name">Здравей, {firstName}</span>
                            <button className="logout-btn" onClick={handleLogout} title="Изход">
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <button className="login-btn" onClick={() => navigate('/login')}>
                            Вход
                        </button>
                    )}
                </div>
                <User />
            </div>
        </nav>
    );
}

export default NavBar;