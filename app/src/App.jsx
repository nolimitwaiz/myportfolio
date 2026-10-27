import { useEffect } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { EXPERIENCE, LINKS, PROJECTS, RESEARCH } from './content.js'

function usePage(title) {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title = title ? `${title} · Waiz Khan` : 'Waiz Khan'
  }, [title])
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
}

function External({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
}

function Back() {
  return <Link to="/" className="back">← Waiz Khan</Link>
}

const KIND_ORDER = ['Role', 'Research', 'Project']

function timelineEntries() {
  const entries = [
    ...EXPERIENCE.map((item) => ({ year: item.year, kind: 'Role', key: item.place, title: `${item.role}, ${item.place}`, text: item.detail })),
    ...RESEARCH.map((item) => ({ year: item.year, kind: 'Research', key: item.slug, title: item.title, text: item.brief, to: `/research/${item.slug}` })),
    ...PROJECTS.map((item) => ({ year: item.year, kind: 'Project', key: item.title, title: item.title, text: item.brief, href: item.href })),
  ]
  const years = [...new Set(entries.map((entry) => entry.year))].sort((a, b) => b - a)
  return years.map((year) => ({
    year,
    items: entries
      .filter((entry) => entry.year === year)
      .sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind)),
  }))
}

function EntryTitle({ entry }) {
  if (entry.to) return <Link to={entry.to} className="title">{entry.title} →</Link>
  if (entry.href) return <External href={entry.href}><span className="title">{entry.title} ↗</span></External>
  return <span className="title">{entry.title}</span>
}

function Timeline() {
  return (
    <section id="timeline" className="timeline" aria-label="Timeline">
      {timelineEntries().map(({ year, items }) => (
        <div key={year} className="year">
          <h2>{year}</h2>
          <ol>
            {items.map((entry) => (
              <li key={entry.key} className={entry.kind === 'Role' ? 'role' : undefined}>
                <div className="row"><EntryTitle entry={entry} /><span className="kind">{entry.kind}</span></div>
                <p>{entry.text}</p>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  )
}

function HomePage() {
  usePage()
  return (
    <main>
      <h1>Waiz Khan</h1>
      <p className="intro">
        Student in the Department of Applied Mathematics and Statistics at Johns Hopkins University,
        M.S.E. Data Science, expected May 2027.
      </p>
      <p className="intro">Interested in learning architectures, memory and world models, and NeuroAI.</p>
      <p className="links">
        <Link to="/resume">Resume</Link>
        <External href={LINKS.github}>GitHub</External>
        <External href={LINKS.linkedin}>LinkedIn</External>
        <a href={LINKS.email}>Email</a>
      </p>

      <Timeline />
    </main>
  )
}

function ResearchPage() {
  const { slug } = useParams()
  const item = RESEARCH.find((entry) => entry.slug === slug)
  usePage(item?.title)
  if (!item) return <Navigate to="/" replace />
  return (
    <main>
      <Back />
      <h1 className="page-title">{item.title}</h1>
      <p className="meta">{item.meta}</p>
      <p className="lead">{item.question}</p>
      {item.sections.map(([label, text]) => (
        <section key={label} className="prose"><h2>{label}</h2><p>{text}</p></section>
      ))}
      {item.code && <p className="links"><External href={item.code}>Code on GitHub ↗</External></p>}
    </main>
  )
}

function ResumePage() {
  usePage('Resume')
  return (
    <main className="wide">
      <Back />
      <h1 className="page-title">Resume</h1>
      <p className="links">
        <a href={LINKS.resumePdf} download="Waiz_Khan.pdf">Download PDF</a>
        <External href={LINKS.resumePdf}>Open in new tab ↗</External>
      </p>
      <object data={LINKS.resumePdf} type="application/pdf" aria-label="Resume PDF">
        <p><a href={LINKS.resumePdf}>Download the resume</a></p>
      </object>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/myportfolio">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/research/:slug" element={<ResearchPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/research" element={<Navigate to="/" replace />} />
        <Route path="/projects/iris" element={<Navigate to="/" replace />} />
        <Route path="/build" element={<Navigate to="/" replace />} />
        <Route path="/heela" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
