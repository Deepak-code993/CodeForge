import { useEffect, useRef, useState } from 'react';

const heroImageOne = new URL('../ChatGPT Image Jun 25, 2026, 12_09_59 PM.png', import.meta.url).href;
const heroImageTwo = new URL('../ChatGPT Image Jun 25, 2026, 12_10_07 PM.png', import.meta.url).href;
const heroImageThree = new URL('../ChatGPT Image Jun 25, 2026, 12_10_33 PM.png', import.meta.url).href;

const teachItems = [
  { id: 'html', icon: 'H', label: 'HTML', description: 'Learn modern HTML structure, semantic markup, and page layout fundamentals.' },
  { id: 'css', icon: 'C', label: 'CSS', description: 'Master responsive design, animations, and styling for polished interfaces.' },
  { id: 'javascript', icon: 'JS', label: 'JavaScript', description: 'Build dynamic behavior, interactivity, and client-side application logic.' },
  { id: 'python', icon: 'Py', label: 'Python', tag: 'Data Science / MySQL', description: 'Explore Python for data science, automation, and backend integration.' },
  { id: 'mysql', icon: 'DB', label: 'MySQL', description: 'Work with relational data, queries, and real-world database workflows.' },
  { id: 'react', icon: 'R', label: 'React', description: 'Create component-driven web apps with modern UI patterns and hooks.' },
  { id: 'data-science', icon: 'DS', label: 'Data Science', description: 'Analyze data, visualize insights, and apply machine learning ideas.' }
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

  useEffect(() => {
    const updateDistance = () => {
      if (!trackRef.current) return;

      const gap = parseFloat(getComputedStyle(trackRef.current).gap || '16') || 16;
      const distance = firstSetRefs.current.reduce((total, pill) => {
        return total + (pill?.getBoundingClientRect().width || 0);
      }, 0) + gap * teachItems.length;

      trackRef.current.style.setProperty('--teach-scroll-distance', `${distance}px`);
    };

    updateDistance();
    window.addEventListener('resize', updateDistance, { passive: true });
    return () => window.removeEventListener('resize', updateDistance);
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll('.card, .plan, .cert, .hero__stats div, .hex-block');

    if (!('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 0.55s ease ${i * 0.06}s, transform 0.55s ease ${i * 0.06}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectedItem = selectedPill ? teachItems.find((item) => item.id === selectedPill.split('-')[1]) : null;

  const togglePill = (key) => {
    setSelectedPill((current) => current === key ? null : key);
  };

  return (
    <>
      <FloatingBackground />
      <Header onEnroll={scrollToPricing} scrolled={navScrolled} />
      <TeachDetailsPanel selectedItem={selectedItem} clearSelection={() => setSelectedPill(null)} />

      <main>
        <Hero onEnroll={scrollToPricing} />
        <TeachCarousel
          selectedPill={selectedPill}
          setSelectedPill={togglePill}
          trackRef={trackRef}
          firstSetRefs={firstSetRefs}
        />
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
  const renderedItems = [...teachItems, ...teachItems];

  const handleKeyDown = (event, key) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setSelectedPill(key);
  };

  return (
    <section id="teach" className="teach">
      <h2 className="section-title">We Will Teach</h2>
      <p className="section-sub">Pick a track. Every track ends in a real project, not just a quiz.</p>
      <div className="teach-carousel" aria-label="Subjects we teach">
        <div ref={trackRef} className={`teach-carousel__track ${selectedPill ? 'is-paused' : ''}`}>
          {renderedItems.map((item, index) => {
            const copy = index < teachItems.length ? 0 : 1;
            const key = `${copy}-${item.id}`;
            const selected = selectedPill === key;

            return (
              <div
                key={key}
                ref={(node) => {
                  if (copy === 0) firstSetRefs.current[index] = node;
                }}
                className={`pill ${selected ? 'is-selected' : ''}`}
                role="button"
                tabIndex={copy === 0 ? 0 : -1}
                aria-hidden={copy === 1 ? 'true' : undefined}
                aria-pressed={copy === 0 ? selected : undefined}
                onClick={() => setSelectedPill(key)}
                onKeyDown={(event) => handleKeyDown(event, key)}
              >
                <span className="pill__icon">{item.icon}</span>
                <span className="pill__label">{item.label}</span>
                {item.tag && <span className="pill__tag">{item.tag}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TeachDetailsPanel({ selectedItem, clearSelection }) {
  if (!selectedItem) return null;

  return (
    <aside
      className="teach-detail-panel"
      aria-live="polite"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 'auto',
        width: 'clamp(320px, 33.333vw, 460px)',
        height: '100vh',
        zIndex: 99999,
        background: 'rgba(255, 255, 255, 0.62)',
        backdropFilter: 'blur(28px)'
      }}
    >
      <div className="teach-detail-panel__header">
        <div className="teach-detail-panel__pill">
          <span className="pill__icon">{selectedItem.icon}</span>
        </div>
        <div>
          <p className="teach-detail-panel__label">{selectedItem.label}</p>
          {selectedItem.tag && <p className="teach-detail-panel__tag">{selectedItem.tag}</p>}
        </div>
      </div>
      <p className="teach-detail-panel__description">{selectedItem.description}</p>
      <button type="button" className="teach-detail-panel__close" onClick={clearSelection}>
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
