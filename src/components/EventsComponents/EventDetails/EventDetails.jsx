import './EventDetails.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react';

function EventDetails({ eventId }) {
    const { id } = useParams(); // This grabs the ":id" from the URL
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Query your Spring Boot backend for the specific event ID
        // Make sure this endpoint matches your Java controller!
        // fetch(`https://energy-academy-be.onrender.com/api/events/${id}`)
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Събитието не е намерено');
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         setEvent(data);
        //         setIsLoading(false);
        //     })
        //     .catch(err => {
        //         console.error("Error fetching event:", err);
        //         setError(err.message);
        //         setIsLoading(false);
        //     });
        setEvent(
            {
                "id": 1,
                "title": "Енергиен Баланс и Пространство",
                "subtitle": "Практически уъркшоп по Фън Шуй",
                "date": "15 Октомври 2026",
                "time": "18:00 - 20:30",
                "location": "Онлайн / На живо в студиото",
                "isUpcoming": true,
                "description": "Този уъркшоп ще ви преведе през основите на енергийното изчистване и подредба на дома. Ще разгледаме как пространството, в което живеем, отразява нашия вътрешен свят и как можем съзнателно да го променим, за да привлечем хармония, здраве и изобилие. \n\nВ рамките на събитието ще научите практични Фън Шуй съвети за спалнята, хола и работното място. Ще разберете кои предмети блокират вашата енергия и как правилно да насочите потока на Чи (жизнената енергия), за да се чувствате подкрепени и спокойни в собствения си дом.",
                "imageUrl": "https://plus.unsplash.com/premium_photo-1728682626063-c12da4b7c4b3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            })
        setIsLoading(false);
    }, [id]);

    if (isLoading) {
        return (
            <div className="event-details-page loading-state">
                <h2>Зареждане на събитието...</h2>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="event-details-page error-state">
                <h2>Възникна грешка</h2>
                <p>{error}</p>
                <Link to="/events" className="btn btn-secondary">Върни се към събитията</Link>
            </div>
        );
    }

    return (
        <div className="event-details-page">
            <div className="event-details-container">
                <Link to="/events" className="back-link">
                    <ArrowLeft size={20} /> Обратно към всички събития
                </Link>

                <div className="event-details-header">
                    <h1>{event.title}</h1>
                    <p className="subtitle">{event.subtitle}</p>
                </div>

                <div className="event-details-body">
                    {/* If your backend sends an image URL, render it here */}
                    {event.imageUrl && (
                        <div className="event-main-image">
                            <img src={event.imageUrl} alt={event.title} />
                        </div>
                    )}

                    <div className="event-info-panel">
                        <div className="info-item"><Calendar size={20} /> {event.date}</div>
                        <div className="info-item"><Clock size={20} /> {event.time}</div>
                        <div className="info-item"><MapPin size={20} /> {event.location}</div>
                        {event.isUpcoming && (
                            <Link to={`/events/${event.id}/register`} className="btn btn-primary sign-up-btn">Запиши се за участие</Link>
                        )}
                    </div>

                    <div className="event-description">
                        <h3>За събитието</h3>
                        <p>{event.description}</p>

                        {/* You can add more detailed text from your backend here if you add a 'fullDescription' field to your DB */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetails;