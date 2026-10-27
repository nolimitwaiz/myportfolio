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

function HomePage() {
  usePage()
  return (
    <main>
      <h1>Waiz Khan</h1>
      <p className="intro">
        Student in the Department of Applied Mathematics and Statistics at Johns Hopkins University,
        M.S.E. Data Science, expected May 2027.
      </p>
      <p className="links">
        <Link to="/resume">Resume</Link>
        <External href={LINKS.github}>GitHub</External>
        <External href={LINKS.linkedin}>LinkedIn</External>
        <a href={LINKS.email}>Email</a>
      </p>

      <section id="research">
        <h2>Research</h2>
        <ul>
          {RESEARCH.map((item) => (
            <li key={item.slug}>
              <Link to={`/research/${item.slug}`} className="title">{item.title} →</Link>
              <p>{item.brief}</p>
            </li>
          ))}
        </ul>
        <p className="note">Also interested in learning architectures, memory and world models, and NeuroAI.</p>
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <ul>
          {PROJECTS.map((item) => (
            <li key={item.title}>
              <External href={item.href}><span className="title">{item.title} ↗</span></External>
              <p>{item.brief}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="experience">
        <h2>Experience</h2>
        <ul>
          {EXPERIENCE.map((item) => (
            <li key={item.place}>
              <div className="row"><span className="title">{item.role}, {item.place}</span><span className="when">{item.when}</span></div>
              <p>{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>
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
        <Route path="/research" element={<Navigate to="/#research" replace />} />
        <Route path="/projects/iris" element={<Navigate to="/#experience" replace />} />
        <Route path="/build" element={<Navigate to="/#experience" replace />} />
        <Route path="/heela" element={<Navigate to="/#experience" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
