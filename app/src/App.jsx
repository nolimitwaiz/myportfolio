import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
import { DIRECTIONS, EXPERIENCE, LINKS, PROJECTS, RESEARCH, THOUGHT_EDGES, THOUGHT_NODES } from './content.js'

function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} · Waiz Khan` : 'Waiz Khan'
    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) meta.setAttribute('content', description)
  }, [title, description])
  return null
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }))
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

const quiet = 'text-clay transition-colors hover:text-pink'
const accent = 'text-pink underline-offset-4 hover:underline'

function External({ href, children, className = quiet }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}

function Header() {
  const nav = ({ isActive }) => `${quiet} ${isActive ? 'text-ink' : ''}`
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-3xl flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-6 py-5">
        <Link to="/" className="font-display text-xl text-ink">Waiz Khan</Link>
        <nav className="flex flex-wrap gap-x-5 text-[15px]" aria-label="Primary">
          <Link to="/#research" className={quiet}>Research</Link>
          <Link to="/#projects" className={quiet}>Projects</Link>
          <NavLink to="/thoughts" className={nav}>Thoughts</NavLink>
          <NavLink to="/resume" className={nav}>CV</NavLink>
          <External href={LINKS.github}>GitHub</External>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-wrap items-baseline justify-between gap-x-6 gap-y-3 px-6 py-8 text-[14px] text-clay">
        <p>Waiz Khan · Johns Hopkins University</p>
        <p className="flex gap-x-5">
          <a href={LINKS.email} className={quiet}>Email</a>
          <External href={LINKS.github}>GitHub</External>
          <External href={LINKS.linkedin}>LinkedIn</External>
        </p>
      </div>
    </footer>
  )
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream text-ink">
      <ScrollToTop />
      <Header />
      <div className="flex-1"><Outlet /></div>
      <Footer />
    </div>
  )
}

function Section({ id, title, aside, children }) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-line py-12">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="font-display text-3xl">{title}</h2>
        {aside && <p className="text-[15px]">{aside}</p>}
      </div>
      {children}
    </section>
  )
}

function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6">
      <PageMeta description="Waiz Khan is a student in the Department of Applied Mathematics and Statistics at Johns Hopkins University, researching multilingual language models, low-resource learning, and computational decipherment." />

      <section className="py-16 sm:py-24">
        <h1 className="font-display text-5xl leading-none sm:text-6xl">Waiz Khan</h1>
        <p className="mt-6 max-w-xl font-display text-2xl leading-snug">
          Student in the Department of Applied Mathematics and Statistics at Johns Hopkins University.
        </p>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-clay">
          M.S.E. Data Science. I work on multilingual language models, low-resource NLP, and computational decipherment with Prof. Philipp Koehn, and co-founded Arzaic, where I build Iris, a healthcare agent for longitudinal patient support.
        </p>
        <p className="mt-5 text-[15px] text-clay">
          Baltimore · <a href={LINKS.email} className={accent}>wkhan12@jh.edu</a> · <Link to="/resume" className={accent}>CV</Link>
        </p>
      </section>

      <Section id="research" title="Research">
        <div className="divide-y divide-line">
          {RESEARCH.map((item) => (
            <article key={item.slug} className="grid gap-x-6 gap-y-1 py-7 sm:grid-cols-[3rem_1fr]">
              <span className="pt-1.5 text-[14px] text-pink">{item.index}</span>
              <div>
                <h3 className="font-display text-2xl leading-tight">
                  <Link to={`/research/${item.slug}`} className="transition-colors hover:text-pink">{item.title}</Link>
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-clay">{item.summary}</p>
                <p className="mt-2 text-[14px] text-clay">{item.institution} · {item.dates}</p>
                <Link to={`/research/${item.slug}`} className={`mt-3 inline-block text-[15px] ${accent}`}>Read more →</Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects" aside={<External href={LINKS.github} className={accent}>All repositories ↗</External>}>
        <ul className="divide-y divide-line">
          {PROJECTS.map((project) => (
            <li key={project.title} className="grid gap-x-6 gap-y-1 py-5 sm:grid-cols-[11rem_1fr]">
              <External href={project.href} className="font-display text-xl leading-tight text-ink transition-colors hover:text-pink">{project.title}</External>
              <div>
                <p className="text-[16px] leading-relaxed text-clay">{project.line}</p>
                <p className="mt-1 text-[14px] text-clay/80">{project.terms.join(' · ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="experience" title="Experience">
        <ul className="divide-y divide-line">
          {EXPERIENCE.map((item) => (
            <li key={`${item.place}-${item.role}`} className="grid gap-x-6 gap-y-1 py-5 sm:grid-cols-[11rem_1fr]">
              <span className="text-[14px] text-clay">{item.when}</span>
              <div>
                <p className="text-[16px]"><span className="font-medium">{item.role}</span>, {item.place}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-clay">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="interests" title="Interests" aside={<Link to="/thoughts" className={accent}>Connected questions →</Link>}>
        <ul className="divide-y divide-line">
          {DIRECTIONS.map((direction) => (
            <li key={direction.title} className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[11rem_1fr]">
              <span className="font-medium">{direction.title}</span>
              <span className="text-[16px] leading-relaxed text-clay">{direction.question}</span>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  )
}

function ResearchDetailPage() {
  const { slug } = useParams()
  const item = RESEARCH.find((entry) => entry.slug === slug)
  if (!item) return <Navigate to="/#research" replace />

  const sections = [
    ['Why', item.why],
    ['Method', item.method],
    ['Findings', item.findings],
    ['What changed', item.changed],
  ]

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <PageMeta title={item.title} description={`${item.title}: ${item.question}`} />
      <Link to="/#research" className={`text-[15px] ${quiet}`}>← Research</Link>

      <p className="mt-10 text-[14px] text-pink">{item.index}</p>
      <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{item.title}</h1>
      <p className="mt-4 font-display text-2xl leading-snug text-clay">{item.question}</p>
      <p className="mt-5 text-[14px] text-clay">{item.institution} · {item.dates}</p>
      <p className="mt-2 text-[14px] text-clay">{item.anchors.join(' · ')}</p>

      <div className="mt-12 space-y-9">
        {sections.map(([label, copy]) => (
          <section key={label}>
            <h2 className="font-display text-2xl">{label}</h2>
            <p className="mt-2 text-[17px] leading-relaxed text-clay">{copy}</p>
          </section>
        ))}
        <section>
          <h2 className="font-display text-2xl">Details</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[17px] leading-relaxed text-clay">
            {item.technical.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl">Where next</h2>
          <p className="mt-2 font-display text-xl leading-snug">{item.future}</p>
        </section>
        {item.links.length > 0 && (
          <p className="text-[15px]">
            {item.links.map((link) => <External key={link.href} href={link.href} className={accent}>{link.label} ↗</External>)}
          </p>
        )}
      </div>
    </main>
  )
}

function ThoughtsPage() {
  const [selectedId, setSelectedId] = useState('representation')
  const nodeById = Object.fromEntries(THOUGHT_NODES.map((node) => [node.id, node]))
  const selected = nodeById[selectedId]
  const connected = THOUGHT_EDGES
    .filter(([from, to]) => from === selectedId || to === selectedId)
    .map(([from, to]) => nodeById[from === selectedId ? to : from])

  const nodeButton = (node, positioned) => {
    const active = node.id === selectedId
    return (
      <button
        key={node.id}
        type="button"
        aria-pressed={active}
        onClick={() => setSelectedId(node.id)}
        className={`${positioned ? 'absolute -translate-x-1/2 -translate-y-1/2' : ''} border bg-cream px-2.5 py-1.5 text-[13px] leading-none transition-colors ${active ? 'border-pink text-pink' : 'border-line text-clay hover:border-ink hover:text-ink'}`}
        style={positioned ? { left: `${node.x}%`, top: `${node.y}%` } : undefined}
      >
        {node.label}
      </button>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <PageMeta title="Thoughts" description="A connected map of Waiz Khan's research questions across language, representation, memory, evaluation, and intelligent systems." />
      <h1 className="font-display text-4xl sm:text-5xl">Thoughts</h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-clay">
        A map of questions connecting current research to longer-term directions. Select a node to read the question, my current view, and what remains open.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <div
            className="relative hidden aspect-[4/3] border border-line sm:block"
            style={{ backgroundImage: 'radial-gradient(#e4e4e4 1px, transparent 1px)', backgroundSize: '18px 18px' }}
            aria-label="Thought graph"
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {THOUGHT_EDGES.map(([from, to]) => {
                const active = from === selectedId || to === selectedId
                return (
                  <line
                    key={`${from}-${to}`}
                    x1={nodeById[from].x}
                    y1={nodeById[from].y}
                    x2={nodeById[to].x}
                    y2={nodeById[to].y}
                    stroke={active ? '#e60063' : '#d4d4d4'}
                    strokeWidth={active ? 1.5 : 1}
                    vectorEffect="non-scaling-stroke"
                  />
                )
              })}
            </svg>
            {THOUGHT_NODES.map((node) => nodeButton(node, true))}
          </div>
          <div className="flex flex-wrap gap-2 sm:hidden">{THOUGHT_NODES.map((node) => nodeButton(node, false))}</div>
        </div>

        <aside aria-live="polite">
          <p className="text-[14px] text-pink">{selected.category}</p>
          <h2 className="mt-1 font-display text-3xl leading-tight">{selected.label}</h2>
          <div className="mt-5 space-y-5 text-[16px] leading-relaxed">
            <div>
              <p className="font-medium">Question</p>
              <p className="mt-1 text-clay">{selected.note}</p>
            </div>
            <div>
              <p className="font-medium">Working view</p>
              <p className="mt-1 text-clay">{selected.view}</p>
            </div>
            <div>
              <p className="font-medium">Still open</p>
              <p className="mt-1 text-clay">{selected.open}</p>
            </div>
            <div>
              <p className="font-medium">Connected to</p>
              <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                {connected.map((node) => (
                  <button key={node.id} type="button" onClick={() => setSelectedId(node.id)} className={`text-[15px] ${accent}`}>{node.label}</button>
                ))}
              </p>
            </div>
            {selected.to && <p className="text-[15px]"><Link to={selected.to} className={accent}>Related research →</Link></p>}
          </div>
        </aside>
      </div>
    </main>
  )
}

function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <PageMeta title="CV" description="Curriculum vitae for Waiz Khan." />
      <h1 className="font-display text-4xl sm:text-5xl">Curriculum vitae</h1>
      <p className="mt-4 text-[15px]">
        <a href={LINKS.resumePdf} download="Waiz_Khan.pdf" className={accent}>Download PDF</a>
        <span className="text-clay"> · </span>
        <External href={LINKS.resumePdf} className={accent}>Open in new tab ↗</External>
      </p>
      <object data={LINKS.resumePdf} type="application/pdf" className="mt-8 h-[85vh] w-full border border-line" aria-label="Waiz Khan resume PDF">
        <p className="p-10 text-center text-clay"><a href={LINKS.resumePdf} className={accent}>Download the CV</a></p>
      </object>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/myportfolio">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/research" element={<Navigate to="/#research" replace />} />
          <Route path="/research/:slug" element={<ResearchDetailPage />} />
          <Route path="/thoughts" element={<ThoughtsPage />} />
          <Route path="/directions" element={<Navigate to="/thoughts" replace />} />
          <Route path="/build" element={<Navigate to="/#experience" replace />} />
          <Route path="/heela" element={<Navigate to="/#experience" replace />} />
          <Route path="/story" element={<Navigate to="/" replace />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
