import { GoVideo } from "react-icons/go";
import maxilinVideo1 from '../../../assets/maxilin-video-1.mp4'
import maxilinVideo2 from '../../../assets/maxilin-video-2.mp4'
import maxilinVideo3 from '../../../assets/maxilin-video-3.mp4'
import maxilinVideo4 from '../../../assets/maxilin-video-4.mp4'
import './ProbioticVideoSection.css'

export default function ProbioticVideoSection() {
    const videos = [
        { id: 1, title: "Максилин Maxilin - най-добрият пробиотик за възстановяване на здравата микрофлора", src: maxilinVideo1 },
        { id: 2, title: "Изказване на Бадикеева Н.А. на форум на лекари за Максилин", src: maxilinVideo2 },
        { id: 3, title: "Пробиотик MAXILIN. Лекар терапевт от най-висока категория Бадикеева Н.А.", src: maxilinVideo3 },
        { id: 4, title: "Истината за Максилин БГ", src: maxilinVideo4 },
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
                                <video
                                    src={vid.src}
                                    controls
                                    preload="metadata"
                                    className="local-video-player"
                                ></video>
                            </div>
                            <div className="video-info">
                                <GoVideo size={22} className="yt-icon" />
                                <span>{vid.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}