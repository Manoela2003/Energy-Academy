import { useState, useEffect } from 'react';
import './PastEvents.css';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Image as ImageIcon, ArrowUp } from 'lucide-react';
import eventPlaceholder from '../../../assets/course-2-image.jpg';

function PastEvents() {
    const [pastEvents, setPastEvents] = useState([]);

    useEffect(() => {
        setPastEvents([
            {
                id: 101,
                title: "Пролетно пречистване на дома",
                date: "12 Март 2026",
                location: "София, България",
                description: "Успешен семинар за освобождаване на застоялата енергия след зимата и подготовка на дома за нов живот.",
                imageUrl: eventPlaceholder
            },
            {
                id: 102,
                title: "Магията на кристалите",
                date: "24 Януари 2026",
                location: "Онлайн",
                description: "Въведение в работата с кристали за начинаещи. Как да ги избираме, изчистваме и програмираме.",
                imageUrl: eventPlaceholder
            },
            {
                id: 103,
                title: "Хармония на работното място",
                date: "15 Ноември 2025",
                location: "Пловдив, България",
                description: "Фън Шуй принципи за офиса – как да увеличим продуктивността и да намалим стреса.",
                imageUrl: eventPlaceholder
            }
        ]);
    }, []);

    return (
        <section className="past-events-section">
            <div className="past-events-container">
                <div className="past-events-header">
                    <h2 className="past-events-title">Минали събития</h2>
                    <p className="past-events-subtitle">Архив на нашите предишни срещи и семинари</p>
                </div>

                <div className="past-events-grid">
                    {pastEvents.map(event => (
                        <div key={event.id} className="past-card">
                            <div className="past-card-image">
                                <img src={event.imageUrl} alt={event.title} />
                            </div>
                            <div className="past-card-content">
                                <h3>{event.title}</h3>
                                <div className="past-card-meta">
                                    <span><Calendar size={14} /> {event.date}</span>
                                    <span><MapPin size={14} /> {event.location}</span>
                                </div>
                                <p>{event.description}</p>

                                <Link to={`/events/${event.id}`} className="past-gallery-btn">
                                    <ImageIcon size={16} /> Виж още
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="back-to-upcoming-wrapper">
                    <a href="#events" className="back-to-upcoming-btn">
                        <ArrowUp size={18} /> Към предстоящите събития
                    </a>
                </div>
            </div>
        </section>
    );
}

export default PastEvents;