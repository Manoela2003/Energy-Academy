import { useState } from 'react'
import './Certificates.css'
import certificate1 from '../../../assets/certificate-1.jpg'
import certificate2 from '../../../assets/certificate-2.jpg'
import certificate3 from '../../../assets/certificate-3.jpg'

function Certificates() {
    const [selectedImage, setSelectedImage] = useState(null);

    const certificates = [
        { id: 1, title: "Сертификат за Радиестезия и енергийна терапия", issuer: "Енергийница", year: "2026", image: certificate1 },
        { id: 2, title: "Сертификат за Окултна терапия", issuer: "Българска академия на науките и изкуствата", year: "2024", image: certificate2 },
        { id: 3, title: "Сертификат за Парапсихология", issuer: "Българска академия на науките и изкуствата", year: "2024", image: certificate3 }
    ];

    return (
        <section className="certificates-section">
            <div className="certificates-container">
                <h2 className="section-heading">Сертификати и Квалификации</h2>
                <div className="certificates-grid">
                    {certificates.map(cert => (
                        <div key={cert.id} className="cert-card">
                            <div className="cert-image-wrapper" onClick={() => setSelectedImage(cert.image)}>
                                <img src={cert.image} alt={cert.title} className="cert-image" />
                                <div className="cert-overlay">
                                    <span>Увеличи</span>
                                </div>
                            </div>
                            <div className="cert-info">
                                <h3>{cert.title}</h3>
                                <p className="cert-issuer">{cert.issuer}</p>
                                <span className="cert-year">{cert.year}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedImage && (
                <div className="cert-modal" onClick={() => setSelectedImage(null)}>
                    <div className="cert-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="cert-close-btn" onClick={() => setSelectedImage(null)}>&times;</button>
                        <img src={selectedImage} alt="Certificate Fullscreen" className="cert-modal-image" />
                    </div>
                </div>
            )}
        </section>
    )
}

export default Certificates