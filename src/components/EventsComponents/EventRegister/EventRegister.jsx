import './EventRegister.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { decodeToken } from '../../../utils/JWTHelper';
import { API_BASE_URL } from '../../../utils/ApiConfig';

function EventRegister() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [eventTitle, setEventTitle] = useState("Събитие");

    const [formData, setFormData] = useState({
        name: localStorage.getItem('user_name') || '',
        email: localStorage.getItem('user_email') || '',
        phone: localStorage.getItem('user_phone') || ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            const decodedUser = decodeToken(token);
            if (decodedUser) {
                const fullName = `${decodedUser.firstName || ''} ${decodedUser.lastName || ''}`.trim();

                setFormData({
                    name: fullName,
                    email: decodedUser.sub || '',
                    phone: decodedUser.phone || ''
                });
            }
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const token = localStorage.getItem('jwt_token');

        try {
            const response = await fetch(`${API_BASE_URL}/api/events/${id}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Грешка на сървър: ${response.status} ${response.statusText}`);
            }

            setIsSuccess(true);
        } catch (err) {
            console.error("Registration error:", err);
            setError(err.message || 'Възникна грешка при регистрацията.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="event-register-page">
            <div className="event-register-container">
                <Link to={`/events/${id}`} className="back-link">
                    <ArrowLeft size={20} /> Обратно към събитието
                </Link>

                <div className="register-card">
                    {isSuccess ? (
                        <div className="success-state">
                            <CheckCircle2 size={64} className="success-icon" />
                            <h2>Успешна регистрация!</h2>
                            <p>Благодарим ви, че се записахте. Очакваме ви!</p>
                            <button
                                onClick={() => navigate('/events')}
                                className="btn submit-btn"
                            >
                                Към всички събития
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="register-header">
                                <h1>Регистрация за събитие</h1>
                                <p className="event-subtitle-ref">{eventTitle}</p>
                            </div>

                            {error && <div className="error-banner">{error}</div>}

                            <form onSubmit={handleSubmit} className="register-form">
                                <div className="form-group">
                                    <label htmlFor="name">Име и фамилия</label>
                                    <div className="input-with-icon">
                                        <User size={18} />
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="Вашите имена"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Имейл адрес</label>
                                    <div className="input-with-icon">
                                        <Mail size={18} />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Телефон за връзка</label>
                                    <div className="input-with-icon">
                                        <Phone size={18} />
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            placeholder="+359 88X XXX XXX"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="btn submit-btn" disabled={isSubmitting}>
                                    {isSubmitting ? 'Изпращане...' : 'Потвърди записването'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EventRegister;