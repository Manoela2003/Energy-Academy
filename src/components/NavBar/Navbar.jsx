import './Navbar.css'
import { User } from 'lucide-react'
import logo from '../../assets/logo-placeholder.avif'

function Navbar() {

    const navItems = [
        { id: 1, label: "Начало", href: "#home" },
        { id: 2, label: "Събития", href: "#events" },
        { id: 3, label: "За мен", href: "#about" },
        { id: 4, label: "Контакти", href: "#contacts" },
    ]

    return (
        <nav className="nav-bar">
            <img className="nav-logo" src={logo}/>
            <ul>
                {navItems.map(item => <li key={item.id} className="nav-item"><a href={item.href}>{item.label}</a></li>)}
            </ul>
            <User />
        </nav>
    )
}

export default Navbar;