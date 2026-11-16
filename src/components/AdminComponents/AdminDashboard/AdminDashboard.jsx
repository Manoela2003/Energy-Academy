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
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        userId: null,
        userName: ''
    });

    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        maxPeopleCount: '',
        description: '',
        image: null
    });

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
            const data = await apiFetch("/api/events");
            setEvents(data);
        } catch (err) {
            setError(err.message || "Неуспешно зареждане на събитията.");
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

    const confirmDeleteUser = (u) => {
        setDeleteModal({
            isOpen: true,
            userId: u.id,
            userName: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email
        });
    };

    const deleteUser = async () => {
        const id = deleteModal.userId;
        setDeleteModal({ isOpen: false, userId: null, userName: '' });
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
            await apiFetch(`/api/admin/users/${editingUser.id}`, {
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

    const handleEventChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setNewEvent({ ...newEvent, image: files[0] });
        } else {
            setNewEvent({ ...newEvent, [name]: value });
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const dataToSend = new FormData();
        dataToSend.append('title', newEvent.title);
        dataToSend.append('date', newEvent.date);
        dataToSend.append('time', newEvent.time);
        dataToSend.append('location', newEvent.location);

        if (newEvent.maxPeopleCount !== '') {
            dataToSend.append('maxPeopleCount', newEvent.maxPeopleCount);
        }

        dataToSend.append('description', newEvent.description || '');
        if (newEvent.image) {
            dataToSend.append('image', newEvent.image);
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/events`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: dataToSend
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Неуспешно създаване на събитие.");
            }

            const createdEvent = await res.json();
            setEvents(prev => [...prev, createdEvent]);
            setSuccess("Събитието беше успешно създадено.");
            setIsEventModalOpen(false);
            setNewEvent({ title: '', date: '', time: '', location: '', maxPeopleCount: '', description: '', image: null });
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
                                                <button className="action-btn delete" title="Изтрий" onClick={() => confirmDeleteUser(u)}><Trash2 size={16} /></button>
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
                            <button className="btn-primary-small" onClick={() => setIsEventModalOpen(true)}>
                                + Добави събитие
                            </button>
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

            {deleteModal.isOpen && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <h3>Потвърждение за изтриване</h3>
                        <p style={{ marginBottom: '20px', color: 'var(--color-text-muted)' }}>
                            Сигурни ли сте, че искате да изтриете потребител <strong>{deleteModal.userName}</strong>? Това действие е необратимо.
                        </p>
                        <div className="modal-actions">
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => setDeleteModal({ isOpen: false, userId: null, userName: '' })}
                            >
                                Отказ
                            </button>
                            <button
                                type="button"
                                className="btn-primary-small"
                                onClick={deleteUser}
                            >
                                Изтрий
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

            {isEventModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <h3>Добавяне на ново събитие</h3>
                        <form onSubmit={handleCreateEvent}>
                            <div className="form-group">
                                <label>Заглавие *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleEventChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Дата *</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={newEvent.date}
                                    onChange={handleEventChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Час *</label>
                                <input
                                    type="text"
                                    name="time"
                                    placeholder="напр. 18:00 - 20:30"
                                    value={newEvent.time}
                                    onChange={handleEventChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Локация / Формат *</label>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="напр. Онлайн / На живо в студиото"
                                    value={newEvent.location}
                                    onChange={handleEventChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Максимален брой участници (опционално)</label>
                                <input
                                    type="number"
                                    name="maxPeopleCount"
                                    placeholder="напр. 30 (оставете празно за без лимит)"
                                    value={newEvent.maxPeopleCount}
                                    onChange={handleEventChange}
                                    min="1"
                                />
                            </div>
                            <div className="form-group">
                                <label>Описание</label>
                                <textarea
                                    name="description"
                                    value={newEvent.description}
                                    onChange={handleEventChange}
                                    rows={3}
                                />
                            </div>
                            <div className="form-group">
                                <label>Снимка на събитието</label>
                                <input
                                    style={{ cursor: 'pointer' }}
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleEventChange}
                                />
                            </div>
                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => setIsEventModalOpen(false)}
                                    disabled={loading}
                                >
                                    Отказ
                                </button>
                                <button type="submit" className="btn-primary-small" disabled={loading}>
                                    {loading ? "Запис..." : "Създай събитие"}
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