import './LeafDividerSection.css';

const LeafVineSvg = ({ mirrored = false }) => (
    <svg
        viewBox="0 0 400 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`leaf-vine-svg ${mirrored ? 'mirrored' : ''}`}
        preserveAspectRatio="none"
    >
        <path
            d="M0 16 C 100 12, 200 20, 300 14 C 350 11, 380 16, 400 16"
            stroke="#4A2E1B"
            strokeWidth="2"
            strokeLinecap="round"
        />

        <path
            d="M70 15 C 80 5, 110 8, 120 16 C 110 18, 85 22, 70 15 Z"
            fill="#6E7D52"
            opacity="0.85"
        />
        <path d="M72 15 Q 95 13 118 16" stroke="#4A2E1B" strokeWidth="1" />

        <path
            d="M170 18 C 185 28, 215 26, 225 17 C 210 15, 185 13, 170 18 Z"
            fill="#556644"
            opacity="0.85"
        />
        <path d="M172 18 Q 197 22 223 17" stroke="#4A2E1B" strokeWidth="1" />

        <path
            d="M260 15 C 275 3, 305 6, 315 15 C 300 17, 275 20, 260 15 Z"
            fill="#6E7D52"
            opacity="0.85"
        />
        <path d="M262 15 Q 287 11 313 15" stroke="#4A2E1B" strokeWidth="1" />

        <path
            d="M355 16 C 365 10, 380 12, 385 16 C 378 19, 365 19, 355 16 Z"
            fill="#8A9A65"
        />
    </svg>
);

export default function LeafDividerSection() {
    return (
        <section className="leaf-divider-container">
            <div className="vine-branch left">
                <LeafVineSvg mirrored={true} />
            </div>

            <div className="leaf-center-box">
                <span className="leaf-tag">Енергията говори. Въпросът е дали умеем да я чуем.</span>
                <h2 className="leaf-heading">Усети. Осъзнай. Балансирай.</h2>
                <p className="leaf-description">
                    Всичко около нас е движение, взаимодействие и енергия.
                    Чрез енергийни практики и радиестезия навлизаме отвъд видимото, за да изследваме
                    фините полета, които ни заобикалят и влияят на ежедневното ни състояние.
                </p>
            </div>

            <div className="vine-branch right">
                <LeafVineSvg mirrored={false} />
            </div>
        </section>
    );
}