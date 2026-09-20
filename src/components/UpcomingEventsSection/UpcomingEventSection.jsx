import './UpcomingEventSection.css'
import { MoveRight, Sparkles, CalendarDays } from 'lucide-react'
import courseOneImage from '../../assets/course-1-image.jpg'
import courseTwoImage from '../../assets/course-2-image.jpg'
import { motion } from 'framer-motion'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.1,
        },
    },
}

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 35,
        boxShadow: "rgba(61, 92, 95, 0.08) 0px 8px 24px",
    },
    visible: {
        opacity: 1,
        y: 0,
        boxShadow: "rgba(61, 92, 95, 0.08) 0px 8px 24px",
        transition: {
            duration: 0.7,
            ease: [0.215, 0.61, 0.355, 1],
        },
    },
}

function Event({ title, subtitle, description, highlights, quote, image }) {
  return (
    <motion.article
      className="event"
      variants={cardVariants}
      whileHover={{
        y: -6,
        boxShadow: "rgba(61, 92, 95, 0.18) 0px 16px 36px",
        transition: { duration: 0.22, ease: 'easeOut' },
      }}
    >
      <div className="event-media">
        <motion.img
          src={image}
          alt={title}
          className="event-img"
          whileHover={{
            scale: 1.04,
            transition: { duration: 0.25, ease: 'easeOut' },
          }}
        />
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
    </motion.article>
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
            <motion.h2
                className="upcoming-events-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                Предстоящи събития
            </motion.h2>

            <motion.div
                className="events"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
            >
                {events.map((event) => (
                    <Event key={event.id} {...event} />
                ))}
            </motion.div>

            <motion.div
                className="events-footer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <a href="/events" className="view-all-link">
                    <CalendarDays size={18} />
                    <span>Всички предстоящи събития</span>
                </a>
            </motion.div>
        </section>
    )
}