import heroImage from './assets/hero.png'
import './App.css'

const projects = [
  {
    title: 'Fintech Dashboard',
    type: 'Product Design + React',
    description:
      'A clean analytics workspace for tracking revenue, retention, and team goals across markets.',
  },
  {
    title: 'Studio Booking App',
    type: 'Frontend Engineering',
    description:
      'A responsive booking flow with calendar availability, service packages, and client onboarding.',
  },
  {
    title: 'Portfolio System',
    type: 'Design System',
    description:
      'Reusable page sections, project cards, and visual language for fast personal-site launches.',
  },
]

const skills = ['React', 'Vite', 'JavaScript', 'CSS', 'UI Design', 'Responsive Layouts']

function App() {
  return (
    <main className="site-shell">
      <nav className="navbar" aria-label="Primary navigation">
        <a className="logo" href="#top" aria-label="Go to top">
          <span>SH</span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <p className="kicker">Frontend Developer</p>
          <h1>Building sharp, responsive web experiences.</h1>
          <p className="hero-text">
            I create modern interfaces with React, clear design systems, and
            practical code that stays easy to maintain.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#work">
              View work
            </a>
            <a className="secondary-action" href="#contact">
              Contact me
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <img src={heroImage} alt="Abstract portfolio workspace preview" />
          <div className="profile-card" aria-label="Portfolio summary">
            <span>Available for projects</span>
            <strong>React websites, dashboards, and landing pages</strong>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="Career highlights">
        <div>
          <strong>20+</strong>
          <span>UI screens built</span>
        </div>
        <div>
          <strong>8</strong>
          <span>Project types explored</span>
        </div>
        <div>
          <strong>100%</strong>
          <span>Responsive layouts</span>
        </div>
      </section>

      <section className="section" id="work">
        <div className="section-heading">
          <p className="kicker">Selected Work</p>
          <h2>Projects with a focus on clarity and usability.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <span>{project.type}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="skills">
        <div className="section-heading">
          <p className="kicker">Skills</p>
          <h2>Tools and practices I use to ship polished frontends.</h2>
        </div>
        <div className="skill-list">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="kicker">Contact</p>
          <h2>Have a website idea or project brief?</h2>
          <p>
            Send a message and I will help shape it into a clean, usable web
            experience.
          </p>
        </div>
        <a href="mailto:hello@example.com">hello@example.com</a>
      </section>
    </main>
  )
}

export default App
