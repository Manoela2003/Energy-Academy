import { useState, useEffect } from 'react';
import { Users, Calendar, BarChart3, Trash2, Edit, Shield, UserCheck } from 'lucide-react';
import './AdminDashboard.css';
import { API_BASE_URL } from '../../../utils/ApiConfig';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('stats');
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, totalEvents: 0, totalRegistrations: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('jwt_token');

    useEffect(() => {
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
        // Placeholder stats fetch or computed from items
        setStats({ totalUsers: 12, totalEvents: 5, totalRegistrations: 34 });
    };

    return (
        <div className="admin-dashboard-page">
            <div className="admin-header-section">
                <h1>Административен панел</h1>
                <p>Управление на потребители, събития и статистика на платформата.</p>
            </div>

            {/* Tab Navigation */}
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

            {error && <div className="admin-error-banner">{error}</div>}

            {/* Tab Content Area */}
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
                                               <button className="action-btn edit" title="Редактирай"><Edit size={16}/></button>
                                               <button className="action-btn delete" title="Изтрий"><Trash2 size={16}/></button>
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
                                               <button className="action-btn edit" title="Редактирай"><Edit size={16}/></button>
                                               <button className="action-btn delete" title="Изтрий"><Trash2 size={16}/></button>
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
        </div>
    );
}

export default AdminDashboard;