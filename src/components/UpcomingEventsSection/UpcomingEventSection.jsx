import './UpcomingEventSection.css'
import { MoveRight, Sparkles } from 'lucide-react'
import courseOneImage from '../../assets/course-1-image.jpg'
import courseTwoImage from '../../assets/course-2-image.jpg'

function Event({ title, subtitle, description, highlights, quote, image }) {
  return (
    <article className="event">
      <div className="event-media">
        <img src={image} alt={title} className="event-img" />
      </div>

      <div className="event-content">
        <h3 className="event-title">{title}</h3>
        {subtitle && <p className="event-subtitle">{subtitle}</p>}
        <p className="event-description">{description}</p>

        {highlights?.length > 0 && (
          <div className="event-highlights">
            <span className="highlights-label">🌿 За теб, ако усещаш порив да:</span>
            <ul>
              {highlights.map((item, idx) => (
                <li key={idx}>
                  <Sparkles size={14} className="highlight-icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {quote && <blockquote className="event-quote">{quote}</blockquote>}

        <button className="sign-button" type="button">
          <span>Запиши се</span>
          <MoveRight size={18} />
        </button>
      </div>
    </article>
  )
}

export default function UpcomingEventsSection() {
  const events = [
    {
      id: 1,
      title: 'Курс по радиестезично енергийно изчистване',
      subtitle: 'Пътуване към по-дълбоко усещане за себе си и фините енергийни процеси',
      description:
        'Ще се запознаеш с работата с махало и основите на радиестезията, ще усвоиш практики за изследване на енергийни дисбаланси и техники за хармонизиране.',
      highlights: [
        'освободиш натрупаното',
        'внесеш повече лекота и хармония',
        'се свържеш по-дълбоко със своята интуиция',
        'научиш нов инструмент за лична практика',
      ],
      quote: '„Не е нужно да знаеш. Нужно е само да бъдеш отворена да усетиш.“',
      image: courseOneImage,
    },
    {
      id: 2,
      title: 'Енергийно пробуждане и баланс',
      subtitle: 'Практически уъркшоп за работа с чакрите',
      description:
        'Научи се как да усещаш, диагностицираш и балансираш собствената си енергия в ежедневието с лесни медитативни техники.',
      highlights: [
        'намалиш стреса и умората',
        'възстановиш вътрешния фокус',
        'създадеш здравословни енергийни граници',
      ],
      quote: '„Твоето пътуване започва с една малка стъпка.“',
      image: courseTwoImage,
    },
  ]

  return (
    <section className="upcoming-events-container">
      <h2 className="upcoming-events-title">Предстоящи събития</h2>
      <div className="events">
        {events.map((event) => (
          <Event key={event.id} {...event} />
        ))}
      </div>
    </section>
  )
}