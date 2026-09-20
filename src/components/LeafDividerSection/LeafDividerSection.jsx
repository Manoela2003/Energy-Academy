import './LeafDividerSection.css';
import { motion } from 'framer-motion';

const vineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.1, ease: [0.25, 1, 0.5, 1] },
      opacity: { duration: 0.2 },
    },
  },
};

const leafVariants = (delay) => ({
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 0.85,
    transition: {
      duration: 0.45,
      delay,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
});

const LeafVineSvg = ({ mirrored = false }) => (
  <motion.svg
    viewBox="0 0 400 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`leaf-vine-svg ${mirrored ? 'mirrored' : ''}`}
    preserveAspectRatio="none"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.4 }}
  >
    {/* Main growing stem */}
    <motion.path
      d="M0 16 C 100 12, 200 20, 300 14 C 350 11, 380 16, 400 16"
      stroke="#4A2E1B"
      strokeWidth="2"
      strokeLinecap="round"
      variants={vineVariants}
    />

    {/* Leaf 1 (earliest along the vine) */}
    <motion.g variants={leafVariants(0.35)} style={{ transformOrigin: '70px 15px' }}>
      <path
        d="M70 15 C 80 5, 110 8, 120 16 C 110 18, 85 22, 70 15 Z"
        fill="#6E7D52"
      />
      <path d="M72 15 Q 95 13 118 16" stroke="#4A2E1B" strokeWidth="1" />
    </motion.g>

    {/* Leaf 2 */}
    <motion.g variants={leafVariants(0.6)} style={{ transformOrigin: '170px 18px' }}>
      <path
        d="M170 18 C 185 28, 215 26, 225 17 C 210 15, 185 13, 170 18 Z"
        fill="#556644"
      />
      <path d="M172 18 Q 197 22 223 17" stroke="#4A2E1B" strokeWidth="1" />
    </motion.g>

    {/* Leaf 3 */}
    <motion.g variants={leafVariants(0.85)} style={{ transformOrigin: '260px 15px' }}>
      <path
        d="M260 15 C 275 3, 305 6, 315 15 C 300 17, 275 20, 260 15 Z"
        fill="#6E7D52"
      />
      <path d="M262 15 Q 287 11 313 15" stroke="#4A2E1B" strokeWidth="1" />
    </motion.g>

    {/* Leaf 4 (tip) */}
    <motion.g variants={leafVariants(1.05)} style={{ transformOrigin: '355px 16px' }}>
      <path
        d="M355 16 C 365 10, 380 12, 385 16 C 378 19, 365 19, 355 16 Z"
        fill="#8A9A65"
      />
    </motion.g>
  </motion.svg>
);

export default function LeafDividerSection() {
  return (
    <section className="leaf-divider-container">
      <div className="vine-branch left">
        <LeafVineSvg mirrored={true} />
      </div>

      <motion.div
        className="leaf-center-box"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="leaf-tag">Енергията говори. Въпросът е дали умеем да я чуем.</span>
        <h2 className="leaf-heading">Усети. Осъзнай. Балансирай.</h2>
        <p className="leaf-description">
          Всичко около нас е движение, взаимодействие и енергия.
          Чрез енергийни практики и радиестезия навлизаме отвъд видимото, за да изследваме
          фините полета, които ни заобикалят и влияят на ежедневното ни състояние.
        </p>
      </motion.div>

      <div className="vine-branch right">
        <LeafVineSvg mirrored={false} />
      </div>
    </section>
  );
}