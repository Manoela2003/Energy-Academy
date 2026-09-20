import './HeroSection.css';
import tree from '/tree.webp';

function HeroSection() {
    return (
        <section className="hero-container">
            <img
                className="hero-image"
                src={tree}
                alt="Energy Academy Foundation Tree"
                fetchPriority="high"
                loading="eager"
            />

            <div className="hero-overlay">
                <div className="hero-solid-content">
                    <span className="hero-tag">Добре дошъл в</span>
                    <h1 className="hero-title">Енергийна Академия</h1>
                    <p className="hero-subtitle">Мястото, на което ще възстановиш връзката със себе си</p>
                    <button className="hero-btn">Разгледай събитията</button>
                </div>

                <div className="hero-divider">
                    <svg className="hero-wave-svg"
                        viewBox="0 0 1000 700"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="
                                M 0,0
                                L 1000,0
                                L 1000,310
                                C 975,290 960,175 935,385
                                C 915,395 905,230 870,335
                                C 840,340 830,150 795,440
                                C 765,430 755,360 720,380
                                C 690,395 675,210 635,500
                                C 600,790 595,420 560,435
                                C 525,450 515,595 470,590
                                C 430,585 425,865 385,460
                                C 355,375 340,735 305,530
                                C 275,125 265,330 225,450
                                C 185,470 170,610 125,620
                                C 90,630 85,520 50,535
                                C 25,545 15,640 0,645
                                Z
                            "
                            fill="var(--color-bg)"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;