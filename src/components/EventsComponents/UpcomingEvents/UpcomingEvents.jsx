import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UpcomingEvents.css';
import { Calendar, Clock, MapPin, ArrowRight, Info } from 'lucide-react';
import eventPlaceholder from '../../../assets/course-1-image.jpg';

function UpcomingEvents() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace this URL with your actual Spring Boot endpoint (e.g., 'http://localhost:8080/api/events')
        fetch('/api/events')
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch events');
                return response.json();
            })
            .then(data => {
                setEvents(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching events:", err);
                // Fallback to mock data for development if backend is not ready
                setEvents([
                    {
                        id: 1,
                        title: "Енергиен Баланс и Пространство",
                        subtitle: "Практически уъркшоп по Фън Шуй",
                        date: "15 Октомври 2026",
                        time: "18:00 - 20:30",
                        location: "Онлайн / На живо",
                        description: "Научете как да подредите дома си така, че да привлекат хармония, спокойствие и изобилие във вашето ежедневие.",
                        imageUrl: eventPlaceholder
                    },
                    {
                        id: 2,
                        title: "Освобождаване от Тревожността",
                        subtitle: "Дихателни практики и вътрешен мир",
                        date: "28 Октомври 2026",
                        time: "19:00 - 21:00",
                        location: "Онлайн събитие",
                        description: "Специална сесия, посветена на справянето със стреса, напрежението и менталната умора чрез доказани техники.",
                        imageUrl: eventPlaceholder
                    }
                ]);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <section className="upcoming-events-section" id="events">
                <div className="upcoming-events-container">
                    <h2 className="upcoming-events-title">Зареждане на събития...</h2>
                </div>
            </section>
        );
    }

    return (
        <section className="upcoming-events-section" id="events">
            <div className="upcoming-events-container">
                <span className="events-eyebrow">Предстоящи събития</span>
                <h2 className="upcoming-events-title">Време за промяна и нови знания</h2>

                <div className="events-grid">
                    {events.map(event => (
                        <div key={event.id} className="event-card">
                            <div className="event-media">
                                <img src={event.imageUrl || eventPlaceholder} alt={event.title} className="event-img" />
                            </div>
                            <div className="event-content">
                                <h3 className="event-title">{event.title}</h3>
                                <p className="event-subtitle">{event.subtitle}</p>
                                <p className="event-description">{event.description}</p>

                                <div className="event-details">
                                    <div className="event-detail-item">
                                        <Calendar size={18} />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="event-detail-item">
                                        <Clock size={18} />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="event-detail-item">
                                        <MapPin size={18} />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                <div className="event-actions">
                                    <Link
                                        to={`/events/${event.id}`}
                                        className="btn btn-secondary"
                                    >
                                        <Info size={18} /> Научи повече
                                    </Link>
                                        <Link to={`/events/${event.id}/register`} className="btn btn-primary">
                                            Запиши се <ArrowRight size={18} />
                                        </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default UpcomingEvents;