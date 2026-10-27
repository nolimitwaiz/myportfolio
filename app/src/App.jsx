import { LINKS, PROJECTS, TIMELINE } from './content.js'

function External({ href, children, className }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
}

function Timeline() {
  return (
    <ol className="timeline">
      {TIMELINE.map((entry) => (
        <li key={entry.place}>
          <span className="when">{entry.when}</span>
          <div className="entry">
            <h3>{entry.role}</h3>
            <p className="place">{entry.place}</p>
            <p>{entry.detail}</p>
            {entry.work && (
              <ul className="work">
                {entry.work.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    {item.href && <> · <External href={item.href} className="code">Code ↗</External></>}
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
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
        <ul className="contact">
          <li><a href={LINKS.email}>{LINKS.emailText}</a></li>
          <li><External href={LINKS.github}>GitHub ↗</External></li>
          <li><External href={LINKS.linkedin}>LinkedIn ↗</External></li>
        </ul>
      </section>

      <section>
        <h2>Projects</h2>
        <ul className="projects">
          {PROJECTS.map((project) => (
            <li key={project.title}>
              <External href={project.href}>{project.title} ↗</External>
              <p>{project.text}</p>
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
        <p>
          Student in the Department of Applied Mathematics and Statistics at Johns Hopkins University,
          M.S.E. Data Science, expected May 2027.
        </p>
        <p>Interested in learning architectures, memory and world models, and NeuroAI.</p>
      </header>
      <Panel />
      <main>
        <h2 className="section-title">Timeline</h2>
        <Timeline />
      </main>
    </div>
  )
}
