import './NavBar.css'
import { User } from 'lucide-react'
import { NavLink } from 'react-router'
import logo from '../../assets/logo-placeholder.avif'

function NavBar() {

    const navItems = [
        { id: 1, label: "Начало", href: "/" },
        { id: 2, label: "Събития", href: "#events" },
        { id: 3, label: "За мен", href: "/about-me" },
        { id: 4, label: "Контакти", href: "#contacts" },
        { id: 5, label: "Пробиотик", href: "/probiotic" },
    ]

    return (
        <nav className="nav-bar">
            <img className="nav-logo" src={logo} />
            <ul>
                {navItems.map(item => <NavLink key={item.id} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} to={item.href} end>{item.label}</NavLink>)}
            </ul>
            <User />
        </nav>
    )
}

export default NavBar;