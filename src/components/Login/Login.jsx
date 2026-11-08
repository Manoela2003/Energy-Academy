import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { API_BASE_URL } from '../../utils/ApiConfig';

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {

            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Грешен имейл или парола");
            }

            localStorage.setItem('jwt_token', data.token);
            localStorage.setItem('user_email', data.email);
            localStorage.setItem('user_name', data.firstName + ' ' + data.lastName);
            window.dispatchEvent(new Event('auth-changed'));

            const redirectPath = localStorage.getItem('redirect_after_login');
            
            if (redirectPath) {
                localStorage.removeItem('redirect_after_login');
                navigate(redirectPath);
            } else {
                navigate('/');
            }
            window.location.reload();

        } catch (err) {
            setError(err.message || "Възникна грешка при влизане");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Вход в Energy Academy</h2>

            {error && <div className="error-alert">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Имейл или потребителско име *</label>
                    <input
                        type="text"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Парола *</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Влизане..." : "Вход"}
                </button>
            </form>

            <p className="register-redirect">
                Нямате профил? <Link to="/register">Регистрирайте се тук</Link>
            </p>
        </div>
    );
}