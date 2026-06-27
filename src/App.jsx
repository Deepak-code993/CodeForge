import { useEffect, useRef, useState } from 'react';

const heroImageOne = new URL('../ChatGPT Image Jun 25, 2026, 12_09_59 PM.png', import.meta.url).href;
const heroImageTwo = new URL('../ChatGPT Image Jun 25, 2026, 12_10_07 PM.png', import.meta.url).href;
const heroImageThree = new URL('../ChatGPT Image Jun 25, 2026, 12_10_33 PM.png', import.meta.url).href;

const teachCarouselSettings = {
  speed: '18s',
  wheelBoostSpeed: '7s',
  cardWidth: '200px',
  cardHeight: '192px'
};

const teachItems = [
  {
    id: 'html',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    label: 'HTML',
    tag: 'Markup',
    accent: '#e44d26',
    soft: '#fff0eb',
    glow: 'rgba(228, 77, 38, 0.28)',
    description: 'Learn modern HTML structure, semantic markup, and page layout fundamentals.',
    concepts: ['Semantic tags', 'Forms', 'Tables', 'SEO basics']
  },
  {
    id: 'css',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    label: 'CSS',
    tag: 'Design',
    accent: '#1572b6',
    soft: '#eaf5ff',
    glow: 'rgba(21, 114, 182, 0.26)',
    description: 'Master responsive design, animations, and styling for polished interfaces.',
    concepts: ['Flexbox', 'Grid', 'Responsive UI', 'Animations']
  },
  {
    id: 'javascript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    label: 'JavaScript',
    tag: 'Logic',
    accent: '#d6a800',
    soft: '#fff8d9',
    glow: 'rgba(214, 168, 0, 0.28)',
    description: 'Build dynamic behavior, interactivity, and client-side application logic.',
    concepts: ['Variables', 'Functions', 'DOM events', 'Async API calls']
  },
  {
    id: 'python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    label: 'Python',
    tag: 'Data Science / MySQL',
    accent: '#3776ab',
    soft: '#edf6ff',
    glow: 'rgba(55, 118, 171, 0.26)',
    description: 'Explore Python for data science, automation, and backend integration.',
    concepts: ['Loops', 'Functions', 'File handling', 'Data analysis']
  },
  {
    id: 'mysql',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    label: 'MySQL',
    tag: 'Database',
    accent: '#00618a',
    soft: '#e8f7fb',
    glow: 'rgba(0, 97, 138, 0.26)',
    description: 'Work with relational data, queries, and real-world database workflows.',
    concepts: ['Tables', 'SELECT queries', 'Joins', 'CRUD']
  },
  {
    id: 'react',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    label: 'React',
    tag: 'Frontend',
    accent: '#149eca',
    soft: '#eafaff',
    glow: 'rgba(20, 158, 202, 0.28)',
    description: 'Create component-driven web apps with modern UI patterns and hooks.',
    concepts: ['Components', 'Props', 'State', 'Hooks']
  },
  {
    id: 'data-science',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    label: 'Data Science',
    tag: 'Analytics',
    accent: '#654ff0',
    soft: '#f1efff',
    glow: 'rgba(101, 79, 240, 0.28)',
    description: 'Analyze data, visualize insights, and apply machine learning ideas.',
    concepts: ['Pandas', 'Charts', 'Cleaning data', 'ML basics']
  }
];

const projects = [
  ['Book', 'Booksell', 'An online bookstore with cart, search and checkout flow.'],
  ['Care', 'Healthcare', 'Patient records and appointment booking, built end to end.'],
  ['AI', 'AI Assistant', 'A chat-driven assistant project - our most-built capstone.', true],
  ['Hotel', 'Hotel Ordering', 'Full hotel ordering system with room selection and billing.'],
  ['Chart', 'Stock Tracker', 'Live data, charts and alerts using Python and an API.'],
  ['+', '100+ more', 'Browse the full project library after you enroll.', false, true]
];

function App() {
  const [selectedPill, setSelectedPill] = useState(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const trackRef = useRef(null);
  const firstSetRefs = useRef([]);

  // derive selected item from key like "0-html" or "1-data-science"
  const selectedItem = selectedPill
    ? teachItems.find((it) => it.id === selectedPill.split('-').slice(1).join('-'))
    : null;

  const clearSelection = () => setSelectedPill(null);

  // panel closing state (requested by clicking same pill or external triggers)
  const [panelClosing, setPanelClosing] = useState(false);

  // toggle when clicking same pill: if same key, request closing animation; otherwise open new
  const togglePill = (key) => {
    setPanelClosing(false);
    setSelectedPill((prev) => {
      if (prev === key) {
        // request close animation, parent will clear after timeout
        setPanelClosing(true);
        return prev; // keep selected until animation completes
      }
      return key;
    });
  };

  // when a close is requested, clear selection after the animation duration
  useEffect(() => {
    if (!panelClosing) return;
    const t = setTimeout(() => {
      setPanelClosing(false);
      setSelectedPill(null);
    }, 320);
    return () => clearTimeout(t);
  }, [panelClosing]);

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close the panel when clicking anywhere outside the panel or pills
  // request the closing animation rather than instantly clearing selection
  useEffect(() => {
    const onPointerDown = (e) => {
      const target = e.target;
      if (!target) return;
      // if clicking inside the detail panel or on a pill, do nothing
      if (
        target.closest
        && (
          target.closest('.teach-detail-panel')
          || target.closest('.pill')
          || target.closest('.teach-carousel__hit')
        )
      ) return;
      // if a panel is open, request the closing animation
      if (selectedPill) {
        setPanelClosing(true);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [selectedPill]);

  return (
    <>
      <Header onEnroll={scrollToPricing} scrolled={navScrolled} />

      <main>
        <Hero onEnroll={scrollToPricing} />

        <TeachCarousel
          selectedPill={selectedPill}
          setSelectedPill={togglePill}
          trackRef={trackRef}
          firstSetRefs={firstSetRefs}
        />

        <TeachDetailsPanel selectedItem={selectedItem} clearSelection={clearSelection} externalClosing={panelClosing} />

        <Projects />
        <Certificate />

        <Pricing onEnroll={scrollToPricing} />
      </main>

      <Footer />
    </>
  );
}

function FloatingBackground() {
  return (
    <ul className="floating-bg" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, index) => <li key={index}></li>)}
    </ul>
  );
}

function Header({ onEnroll, scrolled }) {
  return (
    <header
      className="nav"
      style={{
        boxShadow: scrolled
          ? '0 4px 24px rgba(45,55,72,0.12)'
          : '0 2px 16px rgba(45,55,72,0.07)'
      }}
    >
      <div className="nav__inner">
        <a className="nav__brand" href="#">
          <span className="nav__logo">&lt;/&gt;</span>
          <span className="nav__name">Code<span>Forge</span></span>
        </a>

        <div className="nav__search">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Search courses, projects..." aria-label="Search" />
        </div>

        <nav className="nav__links" aria-label="Primary navigation">
          <a href="#teach">We Teach</a>
          <a href="#projects">Projects</a>
          <a href="#certificate">Certificate</a>
        </nav>

        <button className="nav__cta" onClick={onEnroll}>Enroll Now</button>
      </div>
    </header>
  );
}

function Hero({ onEnroll }) {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <div className="hero__badge">
            <span className="badge__dot"></span>
            <span>Internship Program</span>
            <span className="badge__sep">|</span>
            <span>Real World Experience</span>
          </div>

          <h1>
            <span className="hero__hello">Hii Their,</span>
            we are providing one mounth
            <strong>INTERNSHIP</strong>
          </h1>

          <p className="hero__sub">
            where we teach the programing languages that used in real world
            more then 100plus real world projects that you can chuse
            <br /><br />
            with a cartificate by codeFroge
          </p>

          <div className="hero__actions">
            <button className="btn btn--primary" onClick={onEnroll}>
              Enroll Now
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <p className="hero__alert"><span></span> alertfor first 50 students is <del>2000</del> 1599</p>
        </div>

        <div className="hero__visual hero-shapes" aria-label="CodeForge internship images">
          <figure className="image-shape-one shape-card shape-card--top">
            <img src={heroImageOne} alt="CodeForge internship preview" />
          </figure>
          <figure className="image-shape-two shape-card shape-card--mid">
            <img src={heroImageTwo} alt="CodeForge course preview" />
          </figure>
          <figure className="image-shape-three shape-card shape-card--bottom">
            <img src={heroImageThree} alt="CodeForge certificate preview" />
          </figure>
          <ul className="shape-points" aria-label="Program highlights">
            <li>30-Day Internship</li>
            <li>Expert Mentorship</li>
            <li>Industry Certification</li>
            <li>Real Project Development</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function TeachCarousel({ selectedPill, setSelectedPill, trackRef, firstSetRefs }) {
  const renderedItems = teachItems;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = (event, key) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setSelectedPill(key);
  };

  useTeachWheel(trackRef, setActiveIndex, renderedItems.length);
  const visibleItems = [-2, -1, 0, 1, 2].map((offset) => {
    const itemIndex = (activeIndex + offset + renderedItems.length) % renderedItems.length;
    const item = renderedItems[itemIndex];

    return {
      item,
      offset,
      key: `0-${item.id}`
    };
  });

  return (
    <section id="teach" className="teach">
      <h2 className="section-title">We Will Teach</h2>
      <p className="section-sub">Pick a track. Every track ends in a real project, not just a quiz.</p>
      <div
        className="teach-carousel"
        aria-label="Subjects we teach"
        style={{
          '--teach-scroll-duration': teachCarouselSettings.speed,
          '--teach-wheel-duration': teachCarouselSettings.wheelBoostSpeed,
          '--pill-width': teachCarouselSettings.cardWidth,
          '--pill-height': teachCarouselSettings.cardHeight
        }}
      >
        <div ref={trackRef} className={`teach-carousel__track ${selectedPill ? 'is-paused' : ''}`}>
          {renderedItems.map((item, index) => {
            const key = `0-${item.id}`;
            const selected = selectedPill === key;
            const offset = getLoopOffset(index, activeIndex, renderedItems.length);
            const positionClass = offset === 0
              ? 'is-active'
              : offset === -1
                ? 'is-prev'
                : offset === 1
                  ? 'is-next'
                  : offset === -2
                    ? 'is-prev-outer'
                    : offset === 2
                      ? 'is-next-outer'
                  : offset < -1
                    ? 'is-before-hidden'
                    : 'is-after-hidden';
            const isVisible = Math.abs(offset) <= 2;

            return (
              <div
                key={key}
                ref={(node) => {
                  firstSetRefs.current[index] = node;
                }}
                className={`pill ${positionClass} ${selected ? 'is-selected' : ''}`}
                role={isVisible ? 'button' : 'presentation'}
                tabIndex={isVisible ? 0 : -1}
                aria-hidden={!isVisible}
                aria-label={isVisible ? `Open ${item.label}` : undefined}
                onClick={() => {
                  if (isVisible) setSelectedPill(key);
                }}
                onKeyDown={(event) => {
                  if (isVisible) handleKeyDown(event, key);
                }}
                style={{
                  '--card-index': index,
                  '--card-count': renderedItems.length,
                  '--card-offset': offset,
                  '--pill-accent': item.accent,
                  '--pill-soft': item.soft,
                  '--pill-glow': item.glow
                }}
              >
                <span className="pill__shine" aria-hidden="true"></span>
                <span className="pill__icon">
                  <img src={item.icon} alt="" aria-hidden="true" />
                </span>
                <span className="pill__content">
                  <span className="pill__label">{item.label}</span>
                  {item.tag && <span className="pill__tag">{item.tag}</span>}
                </span>
              </div>
            );
          })}
          <div className="teach-carousel__hits" aria-hidden="false">
            {visibleItems.map(({ item, offset, key }) => (
              <button
                key={`hit-${key}-${offset}`}
                type="button"
                className={`teach-carousel__hit teach-carousel__hit--${
                  offset === 0
                    ? 'center'
                    : offset === -1
                      ? 'left'
                      : offset === 1
                        ? 'right'
                        : offset === -2
                          ? 'left-outer'
                          : 'right-outer'
                }`}
                aria-label={`Open ${item.label}`}
                onClick={() => setSelectedPill(key)}
                onKeyDown={(event) => handleKeyDown(event, key)}
              ></button>
            ))}
          </div>
        </div>
      </div>
      <ConceptCards items={renderedItems} />
    </section>
  );
}

function ConceptCards({ items }) {
  const movingItems = [...items, ...items];

  return (
    <div className="concept-marquee" aria-label="Programming concepts">
      <div className="concept-marquee__track">
        {movingItems.map((item, index) => (
          <article
            key={`${item.id}-${index}`}
            className="concept-card"
            style={{
              '--pill-accent': item.accent,
              '--pill-soft': item.soft,
              '--pill-glow': item.glow
            }}
            aria-hidden={index >= items.length}
          >
            <div className="concept-card__head">
              <span className="concept-card__icon">
                <img src={item.icon} alt="" aria-hidden="true" />
              </span>
              <h3>{item.label}</h3>
            </div>
            <ul>
              {item.concepts.map((concept) => (
                <li key={concept}>{concept}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

function getLoopOffset(index, activeIndex, total) {
  const half = Math.floor(total / 2);
  let offset = index - activeIndex;

  if (offset > half) offset -= total;
  if (offset < -half) offset += total;

  return offset;
}

// Wheel scrolling over the strip advances the carousel; otherwise it stays static.
function useTeachWheel(trackRef, setActiveIndex, totalItems) {
  useEffect(() => {
    const el = trackRef.current;
    if (!el || totalItems < 2) return;

    let wheelRemainder = 0;
    let wheelLock = false;

    const onWheel = (e) => {
      e.preventDefault();

      const primaryDelta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const modeMultiplier = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      wheelRemainder += primaryDelta * modeMultiplier;

      if (wheelLock || Math.abs(wheelRemainder) < 80) return;

      const direction = wheelRemainder > 0 ? 1 : -1;
      wheelRemainder = 0;
      wheelLock = true;

      setActiveIndex((current) => (current + direction + totalItems) % totalItems);

      window.setTimeout(() => {
        wheelLock = false;
      }, 260);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [trackRef, setActiveIndex, totalItems]);
}

function TeachDetailsPanel({ selectedItem, clearSelection, externalClosing }) {
  const [isClosing, setIsClosing] = useState(false);
  if (!selectedItem) return null;

  const handleClose = () => {
    // play closing animation then call clearSelection
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      clearSelection();
    }, 320);
  };

  return (
    <aside
      key={selectedItem.id}
      className={`teach-detail-panel ${(isClosing || externalClosing) ? 'closing' : ''}`}
      aria-live="polite"
      style={{
        '--pill-accent': selectedItem.accent,
        '--pill-soft': selectedItem.soft,
        '--pill-glow': selectedItem.glow,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 'auto',
        width: 'clamp(320px, 33.333vw, 460px)',
        height: '100vh',
        zIndex: 99999,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)'
      }}
    >
      <div className="teach-detail-panel__header">
        <div className="teach-detail-panel__pill">
          <span className="pill__icon">
            <img src={selectedItem.icon} alt="" aria-hidden="true" />
          </span>
        </div>
        <div>
          <p className="teach-detail-panel__label">{selectedItem.label}</p>
          {selectedItem.tag && <p className="teach-detail-panel__tag">{selectedItem.tag}</p>}
        </div>
      </div>
      <p className="teach-detail-panel__description">{selectedItem.description}</p>
      <button type="button" className="teach-detail-panel__close" onClick={handleClose}>
        Close
      </button>
    </aside>
  );
}

function Projects() {
  return (
    <section id="projects" className="projects">
      <h2 className="section-title">We Provide Projects</h2>
      <p className="section-sub">Our projects are real-world based - 100+ and counting, from simple to high level.</p>
      <div className="project-grid">
        {projects.map(([label, title, body, featured, ghost]) => (
          <article key={title} className={`card ${featured ? 'card--featured' : ''} ${ghost ? 'card--ghost' : ''}`}>
            {featured && <span className="card__badge">AI Assistant</span>}
            <div className={`card__thumb ${featured ? 'card__thumb--lg' : ''}`} data-label={label}></div>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Certificate() {
  return (
    <section id="certificate" className="certificate">
      <h2 className="section-title">Certificate</h2>
      <p className="section-sub">A certificate that names the project you actually built - not just the course.</p>
      <div className="cert">
        <div className="cert__corner cert__corner--tl"></div>
        <div className="cert__corner cert__corner--tr"></div>
        <div className="cert__corner cert__corner--bl"></div>
        <div className="cert__corner cert__corner--br"></div>
        <p className="cert__eyebrow">CodeForge / Certificate of Completion</p>
        <p className="cert__line">This certifies that</p>
        <p className="cert__name">Student Name</p>
        <p className="cert__line">has successfully built</p>
        <p className="cert__project">Hotel Ordering System - Python + FastAPI Track</p>
        <div className="cert__footer">
          <div className="cert__sig">
            <span className="cert__sigline"></span>
            <span>Program Director</span>
          </div>
          <div className="cert__seal">CF</div>
          <div className="cert__sig cert__sig--right">
            <span className="cert__sigline"></span>
            <span>Date Issued</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing({ onEnroll }) {
  return (
    <section id="pricing" className="pricing">
      <h2 className="section-title">Pricing</h2>
      <p className="section-sub">Two ways in. Both end with something you can show.</p>
      <div className="plan-grid">
        <div className="plan">
          <p className="plan__name">Python Track</p>
          <p className="plan__price"><span>Rs.</span>1800</p>
          <ul className="plan__list">
            <li>Python, Data Science &amp; MySQL</li>
            <li>30-day language curriculum</li>
            <li>Guided practice projects</li>
          </ul>
          <button className="btn btn--ghost btn--full" onClick={onEnroll}>Choose Python</button>
        </div>
        <div className="plan plan--featured">
          <p className="plan__ribbon">Most Chosen</p>
          <p className="plan__name">Internship + Project + Certificate</p>
          <p className="plan__price"><span>Rs.</span>1900</p>
          <ul className="plan__list">
            <li>1-month full internship</li>
            <li>30 days language + 10 days project-focused teaching</li>
            <li>40+ hours of hands-on project work</li>
            <li>Certificate from CodeForge</li>
          </ul>
          <button className="btn btn--primary btn--full" onClick={onEnroll}>Choose Internship</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">&lt;/&gt; CodeForge</div>
      <p>Built by students. Verified by the work they shipped.</p>
    </footer>
  );
}

export default App;
