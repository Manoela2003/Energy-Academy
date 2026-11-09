import { useState, useEffect } from 'react';
import { Users, Calendar, BarChart3, Trash2, Edit, Shield, UserCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import './AdminDashboard.css';
import { API_BASE_URL } from '../../../utils/ApiConfig';
import { apiFetch } from '../../../utils/ApiClient';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('stats');
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, totalEvents: 0, totalRegistrations: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const token = localStorage.getItem('jwt_token');

    useEffect(() => {
        setError(null);
        setSuccess(null);

        if (activeTab === 'users') {
            fetchUsers();
        } else if (activeTab === 'events') {
            fetchEvents();
        } else if (activeTab === 'stats') {
            fetchStats();
        }
    }, [activeTab]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                data.map(user => {
                    if (user.role === 'ROLE_ADMIN') {
                        user.role = 'Администратор';
                    } else if (user.role === 'ROLE_USER') {
                        user.role = 'Потребител';
                    } else {
                        user.role = 'Неизвестна роля';
                    }
                });
                setUsers(data);
            } else {
                throw new Error("Неуспешно зареждане на потребителите.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/events`);
            if (res.ok) {
                const data = await res.json();
                setEvents(data);
            }
        } catch (err) {
            setError("Неуспешно зареждане на събитията.");
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiFetch("/api/admin/stats", {
                method: 'GET'
            });
            setStats(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        setError(null);
        setSuccess(null);

        setLoading(true);
        try {
            await apiFetch(`/api/admin/users/${id}`, {
                method: 'DELETE'
            });

            setUsers(prev => prev.filter(user => user.id !== id));
            setSuccess("Потребителят беше успешно изтрит.");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: 'ROLE_USER'
    });

    const openEditModal = (id) => {
        setError(null);
        setSuccess(null);
        const userToEdit = users.find(u => u.id === id);
        if (userToEdit) {
            setEditingUser({
                id: userToEdit.id,
                firstName: userToEdit.firstName || '',
                lastName: userToEdit.lastName || '',
                email: userToEdit.email || '',
                phoneNumber: userToEdit.phoneNumber || '',
                role: userToEdit.role === 'Администратор' ? 'ROLE_ADMIN' : 'ROLE_USER'
            });
            setIsEditModalOpen(true);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingUser(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const updatedUser = await apiFetch(`/api/admin/users/${editingUser.id}`, {
                method: 'PUT',
                body: JSON.stringify(editingUser)
            });

            setUsers(prev => prev.map(u => {
                if (u.id === editingUser.id) {
                    return {
                        ...u,
                        firstName: editingUser.firstName,
                        lastName: editingUser.lastName,
                        email: editingUser.email,
                        phoneNumber: editingUser.phoneNumber,
                        role: editingUser.role === 'ROLE_ADMIN' ? 'Администратор' : 'Потребител'
                    };
                }
                return u;
            }));

            setSuccess("Потребителят беше успешно обновен.");
            setIsEditModalOpen(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-dashboard-page">
            <div className="admin-header-section">
                <h1>Административен панел</h1>
                <p>Управление на потребители, събития и статистика на платформата.</p>
            </div>

            <div className="admin-tabs">
                <button
                    className={`admin-tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
                    onClick={() => setActiveTab('stats')}
                >
                    <BarChart3 size={18} /> Статистика
                </button>
                <button
                    className={`admin-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    <Users size={18} /> Потребители
                </button>
                <button
                    className={`admin-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
                    onClick={() => setActiveTab('events')}
                >
                    <Calendar size={18} /> Събития
                </button>
            </div>

            {error && (
                <div className="admin-error-banner">
                    <AlertCircle size={20} style={{ flexShrink: 0 }} />
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div className="admin-success-banner">
                    <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
                    <span>{success}</span>
                </div>
            )}

            <div className="admin-content-card">
                {activeTab === 'stats' && (
                    <div className="stats-grid">
                        <div className="stat-card">
                            <Users size={32} className="stat-icon" />
                            <div>
                                <h3>{stats.totalUsers}</h3>
                                <p>Общо потребители</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <Calendar size={32} className="stat-icon" />
                            <div>
                                <h3>{stats.totalEvents}</h3>
                                <p>Активни събития</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <UserCheck size={32} className="stat-icon" />
                            <div>
                                <h3>{stats.totalRegistrations}</h3>
                                <p>Общо записвания</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="table-responsive">
                        <h3>Управление на потребители</h3>
                        {loading ? <p>Зареждане...</p> : (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Име</th>
                                        <th>Имейл</th>
                                        <th>Телефон</th>
                                        <th>Роля</th>
                                        <th>Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? users.map(u => (
                                        <tr key={u.id}>
                                            <td>{u.firstName} {u.lastName}</td>
                                            <td>{u.email}</td>
                                            <td>{u.phoneNumber || '-'}</td>
                                            <td><span className={`badge ${u.role}`}>{u.role}</span></td>
                                            <td>
                                                <button className="action-btn edit" title="Редактирай" onClick={() => openEditModal(u.id)}><Edit size={16} /></button>
                                                <button className="action-btn delete" title="Изтрий" onClick={() => deleteUser(u.id)}><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="empty-row">Няма намерени потребители или endpoint-а все още не е свързан.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className="table-responsive">
                        <div className="table-header-flex">
                            <h3>Управление на събития</h3>
                            <button className="btn-primary-small">+ Добави събитие</button>
                        </div>
                        {loading ? <p>Зареждане...</p> : (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Заглавие</th>
                                        <th>Дата</th>
                                        <th>Локация</th>
                                        <th>Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.length > 0 ? events.map(ev => (
                                        <tr key={ev.id}>
                                            <td>{ev.title}</td>
                                            <td>{ev.date}</td>
                                            <td>{ev.location}</td>
                                            <td>
                                                <button className="action-btn edit" title="Редактирай"><Edit size={16} /></button>
                                                <button className="action-btn delete" title="Изтрий"><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="empty-row">Няма намерени събития.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
            {isEditModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <h3>Редактиране на потребител</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label>Име</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editingUser.firstName}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Фамилия</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editingUser.lastName}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Имейл</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editingUser.email}
                                    onChange={handleEditChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Телефон</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={editingUser.phoneNumber}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Роля</label>
                                <select
                                    name="role"
                                    value={editingUser.role}
                                    onChange={handleEditChange}
                                >
                                    <option value="ROLE_USER">Потребител</option>
                                    <option value="ROLE_ADMIN">Администратор</option>
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => setIsEditModalOpen(false)}
                                >
                                    Отказ
                                </button>
                                <button type="submit" className="btn-primary-small">
                                    Запази промените
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;