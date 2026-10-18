import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

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
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Грешен имейл или парола");
            }

            // Save JWT token and redirect home
            localStorage.setItem('jwt_token', data.token);
            navigate('/');
            window.location.reload(); // Quick refresh so the NavBar instantly picks up the token & name

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