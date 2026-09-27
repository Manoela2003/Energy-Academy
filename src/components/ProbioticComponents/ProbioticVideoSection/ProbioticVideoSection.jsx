import { FaYoutube } from 'react-icons/fa'
import './ProbioticVideoSection.css'

export default function ProbioticVideoSection() {
    const videos = [
        { id: 1, title: "MaXilin Представяне и ползи", embedUrl: "https://www.youtube.com/embed/uWPSCskSPDI?si=kI2tPJWi0eHyKK0B" },
        { id: 2, title: "Пробиотик MAXILIN", embedUrl: "https://www.youtube.com/embed/ItC_l15WAl0?si=JUXwE3pUBuZN0egN" },
        { id: 3, title: "L-Аргинин EnergyMax Group", embedUrl: "https://www.youtube.com/embed/LOUY0xMLRvQ?si=xH5F-q3Zv_s9k3ZY" }
    ]

    return (
        <section className="probiotic-videos">
            <div className="probiotic-videos-container">
                <h2 className="section-title">Научете повече чрез видео материали</h2>
                <p className="section-subtitle">Гледайте официалните презентации и насоки за употреба.</p>
                
                <div className="video-grid">
                    {videos.map((vid) => (
                        <div key={vid.id} className="video-card">
                            <div className="video-wrapper">
                                <iframe 
                                    src={vid.embedUrl} 
                                    title={vid.title} 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="video-info">
                                <FaYoutube size={22} className="yt-icon" />
                                <span>{vid.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}