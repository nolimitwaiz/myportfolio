import { LINKS, PROJECTS, TIMELINE } from './content.js'

function External({ href, children, className }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
}

const YEARS = [...new Set(TIMELINE.map((entry) => entry.year))]

function Timeline() {
  return (
    <div className="timeline">
      {YEARS.map((year) => (
        <section key={year} className="year">
          <h2 className="year-label">{year}</h2>
          <ol className="entries">
            {TIMELINE.filter((entry) => entry.year === year).map((entry) => (
              <li key={entry.place} className="entry">
                <div className="entry-head">
                  <div>
                    <h3>{entry.role}</h3>
                    <p className="place">{entry.place}</p>
                  </div>
                  <span className="when">{entry.when}</span>
                </div>
                <p className="detail">{entry.detail}</p>
                {entry.work && (
                  <ul className="work">
                    {entry.work.map((item) => (
                      <li key={item.title} className="card">
                        <div className="card-head">
                          <strong>{item.title}</strong>
                          {item.href && <External href={item.href} className="code">Code ↗</External>}
                        </div>
                        <p>{item.text}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}

function Panel() {
  return (
    <aside className="panel">
      <section>
        <h2>Resume</h2>
        <External href={LINKS.resume} className="button">View resume</External>
        <a href={LINKS.resume} download="Waiz_Khan.pdf" className="small-link">Download PDF</a>
      </section>

      <section>
        <h2>Contact</h2>
        <dl className="contact">
          <div><dt>Email</dt><dd><a href={LINKS.email}>{LINKS.emailText}</a></dd></div>
          <div><dt>GitHub</dt><dd><External href={LINKS.github}>nolimitwaiz ↗</External></dd></div>
          <div><dt>LinkedIn</dt><dd><External href={LINKS.linkedin}>Waiz Khan ↗</External></dd></div>
        </dl>
      </section>

      <section>
        <h2>Projects</h2>
        <ul className="projects">
          {PROJECTS.map((project) => (
            <li key={project.title}>
              <External href={project.href}>
                <span className="project-title">{project.title} <span aria-hidden="true">↗</span></span>
                <span className="project-text">{project.text}</span>
              </External>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

export default function App() {
  return (
    <div className="page">
      <header className="intro">
        <h1>Waiz Khan</h1>
        <p className="tagline">
          Student in the Department of Applied Mathematics and Statistics at Johns Hopkins University.
        </p>
        <p className="sub">M.S.E. Data Science, expected May 2027 · Interested in learning architectures, memory and world models, and NeuroAI.</p>
      </header>
      <main>
        <Timeline />
      </main>
      <Panel />
    </div>
  )
}
