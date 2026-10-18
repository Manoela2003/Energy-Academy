import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        profileImage: null
    });

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profileImage') {
            setFormData({ ...formData, profileImage: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setGeneralError('');

        if (formData.password.length < 6) {
            setErrors({ password: "Паролата трябва да бъде поне 6 символа." });
            return;
        }

        setLoading(true);

        const dataToSend = new FormData();
        dataToSend.append('username', formData.username);
        dataToSend.append('password', formData.password);
        dataToSend.append('email', formData.email);
        dataToSend.append('firstName', formData.firstName);
        dataToSend.append('lastName', formData.lastName);
        dataToSend.append('phoneNumber', formData.phoneNumber || '');
        if (formData.profileImage) {
            dataToSend.append('profileImage', formData.profileImage);
        }

        try {
            const API_URL = 'https://energy-academy-be.onrender.com';

            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                body: dataToSend
            });

            const data = await response.json();

            if (!response.ok) {
                if (typeof data === 'object' && data !== null) {
                    setErrors(data);
                } else {
                    setGeneralError(data.message || "Възникна грешка при регистрация");
                }
                return;
            }

            localStorage.setItem('jwt_token', data.token);
            navigate('/');

        } catch (err) {
            setGeneralError("Няма връзка със сървъра.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Регистрация в Energy Academy</h2>

            {generalError && <div className="error-alert">{generalError}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Потребителско име *</label>
                    <input type="text" name="username" className={errors.username ? 'input-error' : ''} value={formData.username} onChange={handleChange} required />
                    {errors.username && <span className="field-error-text">{errors.username}</span>}
                </div>

                <div>
                    <label>Парола *</label>
                    <input type="password" name="password" className={errors.password ? 'input-error' : ''} value={formData.password} onChange={handleChange} required />
                    {errors.password && <span className="field-error-text">{errors.password}</span>}
                </div>

                <div>
                    <label>Имейл *</label>
                    <input type="email" name="email" className={errors.email ? 'input-error' : ''} value={formData.email} onChange={handleChange} required />
                    {errors.email && <span className="field-error-text">{errors.email}</span>}
                </div>

                <div>
                    <label>Име *</label>
                    <input type="text" name="firstName" className={errors.firstName ? 'input-error' : ''} value={formData.firstName} onChange={handleChange} required />
                    {errors.firstName && <span className="field-error-text">{errors.firstName}</span>}
                </div>

                <div>
                    <label>Фамилия *</label>
                    <input type="text" name="lastName" className={errors.lastName ? 'input-error' : ''} value={formData.lastName} onChange={handleChange} required />
                    {errors.lastName && <span className="field-error-text">{errors.lastName}</span>}
                </div>

                <div>
                    <label>Телефонен номер</label>
                    <input type="tel" name="phoneNumber" className={errors.phoneNumber ? 'input-error' : ''} value={formData.phoneNumber} onChange={handleChange} />
                    {errors.phoneNumber && <span className="field-error-text">{errors.phoneNumber}</span>}
                </div>

                <div>
                    <label>Профилна снимка</label>
                    <input type="file" name="profileImage" accept="image/*" onChange={handleChange} />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Регистриране..." : "Създай профил"}
                </button>
            </form>
        </div>
    );
}