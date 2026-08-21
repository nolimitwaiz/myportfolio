import { useEffect, useRef } from 'react'
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

const LINKS = {
  github: 'https://github.com/nolimitwaiz',
  linkedin: 'https://www.linkedin.com/in/waiz-khan-024529223',
  email: 'mailto:wkhan12@jh.edu',
  resumePdf: '/myportfolio/Waiz_Khan.pdf',
}

const RESEARCH = [
  {
    index: '01',
    slug: 'multilingual-representation',
    title: 'Multilingual Representation',
    question: 'What does a language model share when the language changes?',
    institution: 'Johns Hopkins · Prof. Philipp Koehn',
    dates: '2025–Present',
    summary:
      'Language-specific variation inside multilingual language models, studied across layers, languages, model families, and training methods.',
    anchors: ['17 open models', '128 languages', '0.6B–8B parameters', 'held-out model families'],
    keywords: ['multilingual LLMs', 'representation learning', 'NTREX-128', 'Belebele'],
    why:
      'Multilingual models can express the same meaning in many languages, but their internal representations still carry language-specific structure. Understanding that structure can clarify what transfers across languages and what does not.',
    method:
      'Representation-level measurements are evaluated across NTREX-128 and Belebele, across model depth, model families, and training recipes. Predictions are set before experiments, and model families are held out during validation.',
    findings:
      'The experiments found a recurring depth structure in language-specific variation, substantial differences between training recipes, and relationships with downstream multilingual behavior that persisted under additional controls and held-out validation.',
    changed:
      'Directly optimizing one representation metric exposed a shortcut. That shifted the work from treating the metric as a target to asking which measurements remain meaningful under intervention.',
    future:
      'Can representation-level measurements become useful objectives for improving multilingual models?',
    technical: [
      'Evaluation spans 17 open models from 0.6B to 8B parameters.',
      'Language coverage is drawn from NTREX-128 and paired with downstream evaluation on Belebele.',
      'Validation includes additional controls and held-out model families rather than only random examples.',
    ],
    links: [],
  },
  {
    index: '02',
    slug: 'low-resource-language-learning',
    title: 'Low-Resource Language Learning',
    question: 'What can a model learn when examples become scarce?',
    institution: 'Johns Hopkins · Machine Translation',
    dates: 'Ongoing',
    summary:
      'Representation, transfer, translation, and evaluation when training data is uneven or scarce.',
    anchors: ['representation', 'cross-lingual transfer', 'machine translation', 'evaluation'],
    keywords: ['low-resource NLP', 'machine translation', 'cross-lingual transfer', 'evaluation'],
    why:
      'Modern language models learn from abundance. Most languages do not have it. Low-resource research asks what fails first, what can transfer, and how improvement should be measured when benchmarks are small.',
    method:
      'The work connects multilingual representation analysis with translation experiments, controlled comparisons, and evaluation designed for small or uneven datasets.',
    findings:
      'The current evidence points toward transfer and evaluation as inseparable problems: a better score matters only when the test set, language coverage, and source of supervision are clear.',
    changed:
      'The research expanded from translation performance alone toward the representations and evaluation choices that determine whether a result is trustworthy.',
    future:
      'How can higher-resource languages help without erasing the structure of the language receiving the transfer?',
    technical: [
      'Representation: what disappears first as supervision becomes scarce?',
      'Transfer: what can a higher-resource language lend to a lower-resource one?',
      'Evaluation: how can progress be separated from benchmark noise or leakage?',
    ],
    links: [],
  },
  {
    index: '03',
    slug: 'computational-decipherment',
    title: 'Computational Decipherment',
    question: 'What can we recover when even the language itself has been lost?',
    institution: 'Johns Hopkins · Ancient Languages',
    dates: '2026–Present',
    summary:
      'Multimodal translation, unsupervised sign structure, and evaluation infrastructure for ancient scripts.',
    anchors: ['61k examples', '15+ architectures', 'vision + language', '≈34% duplicate leakage'],
    keywords: ['computational decipherment', 'multimodal learning', 'graph learning', 'data provenance'],
    why:
      'Computational decipherment is low-resource learning at its limit. Data is scarce, scripts may be only partly understood, and evaluation can fail before the model does.',
    method:
      'The research combines image-based hieroglyph translation, distributional and visual analysis of sign function, and frozen evaluation infrastructure across eleven ancient-language corpora.',
    findings:
      'A hieroglyph translation study reached BLEU-4 30.3 on a 150-example held-out set. Unsupervised sign-function clustering reached ARI 0.262 against a 0.0016 random floor. A later audit found about 34% near-duplicate leakage in standard splits.',
    changed:
      'The leakage audit changed the research program. Glyphos emerged as evaluation infrastructure: frozen partitions, preregistered runs, audit logs, and automated checks that block pretrained weights.',
    future:
      'Can translation, visual structure, and graph-based evidence support one another without importing an answer from pretrained systems?',
    technical: [
      'Translation: 61,000 examples across 15+ decoders and learning methods, including models that read carved-sign images.',
      'Structure: distributional statistics and self-supervised visual features for sign-function discovery without labels or parallel text.',
      'Evaluation: eleven corpora, 26 frozen partitions, preregistered runs, and contamination audits.',
    ],
    links: [
      { label: 'Glyphos code', href: 'https://github.com/nolimitwaiz/glyphos' },
    ],
  },
  {
    index: '04',
    slug: 'human-systems',
    title: 'Human Systems',
    question: 'What changes when a prediction affects a person?',
    institution: 'GD Goenka University · Dr. Yogesh Kumar',
    dates: '2022 · Revisited 2026',
    summary:
      'Prediction, causal inference, and fixed-budget allocation for chronic absenteeism.',
    anchors: ['47,027 students', 'ROC-AUC 0.841', '0.699 baseline', 'causal inference + optimization'],
    keywords: ['causal ML', 'gradient boosting', 'DoWhy', 'integer optimization'],
    why:
      'One of my first research questions concerned students who stop showing up. Predicting risk is only the beginning when the result may influence where limited support is sent.',
    method:
      'The original absenteeism study was revisited with calibrated models, a causal test of school distance, and an integer program that allocates a fixed intervention budget.',
    findings:
      'The strongest model reached ROC-AUC 0.841 against a 0.699 linear baseline. Under the stated intervention assumptions, optimized allocation doubled expected impact relative to random targeting.',
    changed:
      'The question grew from prediction into three linked problems: who is at risk, which factors may actually matter, and where a limited budget should go.',
    future:
      'How should uncertainty in causal estimates and intervention effects change the allocation itself?',
    technical: [
      'Prediction: calibrated risk models evaluated with state-grouped train and test splits.',
      'Causal inference: distance-to-school estimates tested with refutation checks.',
      'Optimization: one intervention per student under a fixed budget, with Monte Carlo sensitivity analysis.',
    ],
    links: [
      { label: 'AttendOpt code', href: 'https://github.com/nolimitwaiz/attendopt' },
    ],
  },
]

const DIRECTIONS = [
  {
    title: 'Memory',
    question: 'How should a machine remember?',
    terms: 'Continual learning · episodic memory · consolidation · retrieval',
  },
  {
    title: 'World Models',
    question: 'How does a representation become a world?',
    terms: 'Multimodal learning · prediction · embodied intelligence',
  },
  {
    title: 'Language',
    question: 'Can meaning survive changes in language, modality, and supervision?',
    terms: 'Multilingual AI · low-resource learning · representation',
  },
  {
    title: 'NeuroAI',
    question: 'What should machine learning borrow from human cognition?',
    terms: 'Memory · event segmentation · naturalistic fMRI',
  },
  {
    title: 'Learning',
    question: 'Can a model continue changing after training ends?',
    terms: 'Continual adaptation · test-time learning · alternative learning systems',
  },
]

const PROJECTS = [
  {
    title: 'OFX',
    line: 'A replayable limit-order-book terminal for studying market structure.',
    terms: ['TypeScript', 'WebGL', 'market microstructure', 'event replay'],
    href: 'https://github.com/nolimitwaiz/ofx-terminal',
  },
  {
    title: 'NavRover',
    line: 'ROS 2 navigation logs turned into labeled learning data.',
    terms: ['ROS 2', 'Python', 'robot navigation', 'dataset generation'],
    href: 'https://github.com/nolimitwaiz/navrover',
  },
  {
    title: 'Klesis',
    line: 'Text sent between nearby devices through sound.',
    terms: ['PWA', 'Web Audio', 'ggwave', 'offline communication'],
    href: 'https://github.com/nolimitwaiz/klesis',
  },
  {
    title: 'Glyphos',
    line: 'Leakage-controlled evaluation infrastructure for ancient-script decipherment.',
    terms: ['Python', 'PyTorch', 'data provenance', 'frozen evaluation'],
    href: 'https://github.com/nolimitwaiz/glyphos',
  },
]

const EXPERIENCE = [
  {
    when: '2026–Present',
    role: 'Co-Founder & Founding Engineer',
    place: 'Arzaic',
    detail: 'Iris, a healthcare agent architecture for longitudinal patient support.',
  },
  {
    when: '2026–Present',
    role: 'Vice Chair & Director',
    place: 'Heela',
    detail: 'Leadership, governance, and continuity for a nonprofit supporting refugee students.',
  },
  {
    when: '2025–Present',
    role: 'Graduate Researcher',
    place: 'Johns Hopkins University',
    detail: 'Multilingual representation and computational decipherment with Prof. Philipp Koehn.',
  },
  {
    when: '2022',
    role: 'Research Assistant',
    place: 'GD Goenka University',
    detail: 'Chronic absenteeism research with Dr. Yogesh Kumar.',
  },
]

const GLYPHS = {
  W: ['10001', '10001', '10001', '10101', '10101', '10101', '01010'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  ' ': ['000', '000', '000', '000', '000', '000', '000'],
}

const CELL = 10
const ON = 7.4
const OFF = 4.2
const HOVER_RADIUS = 85

function buildDots(text) {
  const glyphs = [...text.toUpperCase()].map((letter) => GLYPHS[letter] ?? GLYPHS[' '])
  const dots = []
  let offset = 0
  glyphs.forEach((glyph, glyphIndex) => {
    const width = glyph[0].length
    glyph.forEach((row, y) => {
      ;[...row].forEach((bit, x) => {
        dots.push({
          on: bit === '1',
          cx: (offset + x + 0.5) * CELL,
          cy: (y + 0.5) * CELL,
          delay: (offset + x) * 18 + y * 26,
        })
      })
    })
    offset += width + (glyphIndex < glyphs.length - 1 ? 1 : 0)
  })
  return { dots, cols: offset }
}

function DotMatrix({ text, className = '' }) {
  const svgRef = useRef(null)
  const rects = useRef([])
  const { dots, cols } = buildDots(text)

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    rects.current.forEach((element, index) => {
      if (!element) return
      if (reduced) {
        element.style.opacity = 1
        return
      }
      element.style.opacity = 0
      element.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 380,
        delay: dots[index].delay,
        fill: 'forwards',
        easing: 'ease-out',
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return undefined
    let frame = null
    let pointer = null

    const update = () => {
      frame = null
      rects.current.forEach((element, index) => {
        if (!element) return
        const dot = dots[index]
        const distance = pointer ? Math.hypot(dot.cx - pointer.x, dot.cy - pointer.y) : Infinity
        const nearby = distance < HOVER_RADIUS
        const scale = nearby ? 1 + (1 - distance / HOVER_RADIUS) * 0.55 : 1
        const size = (dot.on ? ON : OFF) * scale
        element.setAttribute('width', size.toFixed(2))
        element.setAttribute('height', size.toFixed(2))
        element.setAttribute('x', (dot.cx - size / 2).toFixed(2))
        element.setAttribute('y', (dot.cy - size / 2).toFixed(2))
        element.setAttribute('fill', dot.on ? (nearby ? '#e60063' : '#090909') : '#dedede')
      })
    }

    const onMove = (event) => {
      const bounds = svg.getBoundingClientRect()
      pointer = {
        x: ((event.clientX - bounds.left) / bounds.width) * cols * CELL,
        y: ((event.clientY - bounds.top) / bounds.height) * 7 * CELL,
      }
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onLeave = () => {
      pointer = null
      if (!frame) frame = requestAnimationFrame(update)
    }

    svg.addEventListener('pointermove', onMove)
    svg.addEventListener('pointerleave', onLeave)
    return () => {
      svg.removeEventListener('pointermove', onMove)
      svg.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <svg ref={svgRef} viewBox={`0 0 ${cols * CELL} 70`} className={className} aria-hidden="true">
      {dots.map((dot, index) => {
        const size = dot.on ? ON : OFF
        return (
          <rect
            key={index}
            ref={(element) => (rects.current[index] = element)}
            x={dot.cx - size / 2}
            y={dot.cy - size / 2}
            width={size}
            height={size}
            fill={dot.on ? '#090909' : '#dedede'}
          />
        )
      })}
    </svg>
  )
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('in')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('in')
          observer.disconnect()
        }
      },
      { threshold: 0.08 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

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

function ArrowLink({ to, children, external = false, className = '' }) {
  const styles = `inline-flex items-center gap-2 border border-ink px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] no-underline transition-colors hover:border-pink hover:bg-pink hover:text-cream ${className}`
  if (external) {
    return <a href={to} target="_blank" rel="noopener noreferrer" className={styles}>{children} ↗</a>
  }
  return <Link to={to} className={styles}>{children} →</Link>
}

function Header() {
  const navClass = ({ isActive }) =>
    `whitespace-nowrap border bg-transparent px-2 py-2 transition-colors hover:border-pink hover:text-ink sm:px-3 ${isActive ? 'border-pink text-ink' : 'border-line text-clay'}`

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-2 px-5 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-7 sm:px-8">
        <Link to="/" className="font-display text-xl italic text-ink">Waiz Khan</Link>
        <div className="flex w-full min-w-0 items-center justify-start gap-1 overflow-x-auto pb-1 text-[11px] sm:w-auto sm:flex-1 sm:justify-end sm:gap-2 sm:pb-0 sm:text-[12px]">
          <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary navigation">
            <NavLink to="/research" className={navClass}>Research</NavLink>
            <NavLink to="/build" className={navClass}>Work</NavLink>
            <NavLink to="/story" className={navClass}>About</NavLink>
            <NavLink to="/resume" className={navClass}>CV</NavLink>
          </nav>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap border border-ink px-2 py-2 font-mono text-[10px] uppercase tracking-wider text-ink hover:border-pink hover:bg-pink hover:text-cream sm:px-3 sm:text-[11px]">GitHub ↗</a>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-ink bg-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-5 px-5 py-5 sm:px-8">
        <div>
          <p className="font-display text-2xl text-ink">Waiz Khan</p>
          <p className="mt-1 text-xs leading-relaxed text-clay">Johns Hopkins University · Applied Mathematics & Statistics</p>
        </div>
        <div className="flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-wider text-ink">
          <a href={LINKS.email} className="border border-ink px-3 py-2 hover:border-pink hover:bg-pink hover:text-cream">Email</a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="border border-ink px-3 py-2 hover:border-pink hover:bg-pink hover:text-cream">GitHub ↗</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="border border-ink px-3 py-2 hover:border-pink hover:bg-pink hover:text-cream">LinkedIn ↗</a>
          <Link to="/resume" className="border border-ink px-3 py-2 hover:border-pink hover:bg-pink hover:text-cream">CV</Link>
        </div>
      </div>
    </footer>
  )
}

function Layout() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

function ResearchRow({ item }) {
  return (
    <Reveal>
      <article className="grid gap-5 border-t border-ink py-8 sm:grid-cols-[4rem_1fr_14rem] sm:gap-8 sm:py-10">
        <span className="font-mono text-sm text-pink">{item.index}</span>
        <div>
          <h3 className="font-display text-3xl leading-tight sm:text-4xl">{item.title}</h3>
          <p className="mt-3 max-w-3xl font-display text-xl leading-snug text-clay sm:text-2xl">{item.question}</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-clay">{item.summary}</p>
          <div className="mt-5"><ArrowLink to={`/research/${item.slug}`}>Explore research</ArrowLink></div>
        </div>
        <div className="space-y-5 border-line text-sm text-clay sm:border-l sm:pl-6">
          <div>
            <p className="font-medium text-ink">{item.institution}</p>
            <p className="mt-1 font-mono text-xs text-pink">{item.dates}</p>
          </div>
          <ul className="space-y-2 font-mono text-xs leading-relaxed">
            {item.anchors.map((anchor) => <li key={anchor}>{anchor}</li>)}
          </ul>
        </div>
      </article>
    </Reveal>
  )
}

function ResearchIndex({ compact = false }) {
  return (
    <section className={compact ? '' : 'pb-14'}>
      {RESEARCH.map((item) => <ResearchRow key={item.slug} item={item} />)}
      <div className="border-t border-ink" />
    </section>
  )
}

function ResearchGrid() {
  return (
    <div className="grid border-l border-t border-ink md:grid-cols-2">
      {RESEARCH.map((item) => (
        <article key={item.slug} className="border-b border-r border-ink p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <SectionEyebrow>{item.index}</SectionEyebrow>
            <span className="font-mono text-[11px] text-clay">{item.dates}</span>
          </div>
          <h3 className="mt-2 font-display text-2xl leading-tight">{item.title}</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-clay">{item.summary}</p>
          <p className="mt-3 text-[11px] font-semibold text-ink">{item.institution}</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-pink">
            {item.anchors.slice(0, 3).map((anchor) => <span key={anchor}>{anchor}</span>)}
          </div>
          <p className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.08em] text-clay">{item.keywords.join(' · ')}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <ArrowLink to={`/research/${item.slug}`}>Details</ArrowLink>
            {item.links.map((link) => <ArrowLink key={link.href} to={link.href} external>Code</ArrowLink>)}
          </div>
        </article>
      ))}
    </div>
  )
}

function SectionEyebrow({ children, light = false }) {
  return <p className={`font-mono text-xs uppercase tracking-[0.25em] ${light ? 'text-blush' : 'text-pink'}`}>{children}</p>
}

function HomePage() {
  return (
    <main>
      <PageMeta
        description="Waiz Khan is a student in the Department of Applied Mathematics and Statistics at Johns Hopkins University, researching multilingual language models, low-resource learning, and computational decipherment."
      />

      <section className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
        <div className="grid items-center gap-6 lg:grid-cols-[1.18fr_.82fr]">
          <div>
            <SectionEyebrow>Baltimore · Johns Hopkins</SectionEyebrow>
            <h1 className="sr-only">Waiz Khan</h1>
            <div className="mt-4 max-w-lg"><DotMatrix text="WAIZ KHAN" className="w-full cursor-crosshair" /></div>
          </div>
          <div>
            <p className="font-display text-2xl leading-tight">Student in the Department of Applied Mathematics and Statistics at Johns Hopkins University.</p>
            <p className="mt-2 text-[14px] leading-relaxed text-clay">M.S.E. Data Science · Multilingual language models · Low-resource NLP · Computational decipherment</p>
            <div className="mt-4 flex gap-2"><ArrowLink to="/research">Research</ArrowLink><ArrowLink to="/resume">CV</ArrowLink></div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 border-l border-t border-line lg:grid-cols-4">
          {[
            ['Education', 'Johns Hopkins University', 'Applied Mathematics & Statistics · M.S.E. Data Science · 2027'],
            ['Research', 'Graduate Researcher', 'Prof. Philipp Koehn · 2025–Present'],
            ['Arzaic', 'Co-Founder & Founding Engineer', 'Iris · Healthcare agents'],
            ['Heela', 'Vice Chair & Director', 'Nonprofit · Refugee education'],
          ].map(([label, title, detail]) => (
            <div key={label} className="border-b border-r border-line p-3.5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-pink">{label}</p>
              <p className="mt-2 text-sm font-semibold">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-clay">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-ink px-5 py-6 sm:px-8 sm:py-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div><SectionEyebrow>Selected work</SectionEyebrow><h2 className="mt-1 font-display text-3xl">Research</h2></div>
          <ArrowLink to="/research">Research notes</ArrowLink>
        </div>
        <ResearchGrid />
      </section>

      <section className="mx-auto max-w-6xl border-t border-ink px-5 py-6 sm:px-8 sm:py-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div><SectionEyebrow>Personal GitHub</SectionEyebrow><h2 className="mt-1 font-display text-3xl">Projects</h2></div>
          <ArrowLink to={LINKS.github} external>All repositories</ArrowLink>
        </div>
        <div className="grid border-l border-t border-ink md:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((project) => (
            <article key={project.title} className="border-b border-r border-ink p-4 sm:p-5">
              <h3 className="font-display text-2xl">{project.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-clay">{project.line}</p>
              <p className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.08em] text-pink">{project.terms.join(' · ')}</p>
              <div className="mt-3"><ArrowLink to={project.href} external>Code</ArrowLink></div>
            </article>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-4">
          <p className="text-xs text-clay">Arzaic and Iris appear under Work. Research infrastructure appears with the relevant research.</p>
          <ArrowLink to="/build">Work</ArrowLink>
        </div>
      </section>
    </main>
  )
}

function ResearchPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <PageMeta title="Research" description="Research by Waiz Khan in multilingual representation, low-resource learning, computational decipherment, and causal ML." />
      <div className="grid gap-5 border-b border-ink pb-8 lg:grid-cols-[1fr_.8fr] lg:items-end">
        <div><SectionEyebrow>Current work</SectionEyebrow><h1 className="mt-3 font-display text-5xl sm:text-6xl">Research</h1></div>
        <p className="text-[15px] leading-relaxed text-clay">Questions in multilingual representation, low-resource learning, ancient scripts, and causal machine learning.</p>
      </div>
      <div className="mt-8"><ResearchGrid /></div>

      <section id="directions" className="mt-10 border-t border-ink pt-8">
        <div className="mb-6 flex items-end justify-between gap-6"><div><SectionEyebrow>Directions</SectionEyebrow><h2 className="mt-2 font-display text-3xl">Research interests</h2></div></div>
        <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {DIRECTIONS.map((direction) => (
            <div key={direction.title} className="border-b border-r border-line p-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-pink">{direction.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-clay">{direction.terms}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function ResearchDetailPage() {
  const { slug } = useParams()
  const item = RESEARCH.find((entry) => entry.slug === slug)
  if (!item) return <Navigate to="/research" replace />

  return (
    <main>
      <PageMeta title={item.title} description={`${item.title}: ${item.question}`} />
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <Link to="/research" className="inline-flex border border-ink px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-clay hover:border-pink hover:bg-pink hover:text-cream">← Research</Link>
        <div className="mt-7 grid gap-7 lg:grid-cols-[1.4fr_.6fr]">
          <div>
            <SectionEyebrow>{item.index} · Research</SectionEyebrow>
            <h1 className="mt-3 font-display text-4xl leading-none sm:text-6xl">{item.title}</h1>
            <p className="mt-4 max-w-4xl font-display text-xl leading-snug text-clay sm:text-3xl">{item.question}</p>
          </div>
          <div className="border-t border-ink pt-4 lg:mt-8">
            <p className="font-medium">{item.institution}</p>
            <p className="mt-2 font-mono text-xs text-pink">{item.dates}</p>
          </div>
        </div>

        <div className="mt-7 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {item.anchors.map((anchor) => <div key={anchor} className="bg-cream p-4 font-mono text-xs text-ink">{anchor}</div>)}
        </div>
      </section>

      <section className="border-y border-ink bg-sand">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
          <div className="grid border-l border-t border-ink md:grid-cols-2">
            {[
            ['Question', item.why],
            ['Method', item.method],
            ['Findings', item.findings],
            ['What changed', item.changed],
          ].map(([label, copy]) => (
              <div key={label} className="border-b border-r border-ink p-5 sm:p-6">
                <SectionEyebrow>{label}</SectionEyebrow>
                <p className="mt-3 text-[15px] leading-relaxed text-clay">{copy}</p>
              </div>
          ))}
          </div>

          <div className="mt-7 grid gap-7 lg:grid-cols-[1.25fr_.75fr]">
            <div>
              <SectionEyebrow>Methods + results</SectionEyebrow>
              <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-clay">
                {item.technical.map((line) => <li key={line} className="border-l-2 border-pink pl-3">{line}</li>)}
              </ul>
            </div>
            <div>
              <SectionEyebrow>Where next</SectionEyebrow>
              <p className="mt-3 font-display text-2xl leading-snug">{item.future}</p>
            </div>
          </div>

          {item.links.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-6">
              {item.links.map((link) => <ArrowLink key={link.href} to={link.href} external>{link.label}</ArrowLink>)}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function DirectionsPage() {
  return <Navigate to="/research#directions" replace />
}

function BuildPage() {
  return (
    <main>
      <PageMeta title="Build" description="Arzaic, Iris, and selected systems by Waiz Khan." />
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <SectionEyebrow light>Arzaic · Current</SectionEyebrow>
              <h1 className="mt-3 font-display text-5xl sm:text-6xl">Iris</h1>
              <p className="mt-3 text-sm text-blush">Co-Founder & Founding Engineer</p>
            </div>
            <div>
              <h2 className="font-display text-3xl leading-tight text-sand">Longitudinal patient-support architecture.</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-sand">Auditable state · retrieval · tool use · safety checks</p>
              <div className="mt-5 grid gap-px bg-cream/20 sm:grid-cols-5">
                {['Gate', 'Route', 'Retrieve', 'Generate', 'Guard'].map((stage) => <div key={stage} className="bg-ink p-3 text-center font-mono text-[10px] uppercase tracking-wider text-blush">{stage}</div>)}
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-5 border-t border-cream/20 pt-6">
            <SectionEyebrow light>Next · Eve</SectionEyebrow>
            <p className="font-display text-xl text-sand">Reliability-focused learning system under research.</p>
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.35fr_.65fr]">
        <div>
          <SectionEyebrow>Experience</SectionEyebrow>
          <div className="mt-5 border-t border-ink">
            {EXPERIENCE.map((item) => (
              <div key={`${item.place}-${item.role}`} className="grid gap-2 border-b border-line py-4 sm:grid-cols-[7rem_1fr_1.2fr] sm:gap-5">
                <span className="font-mono text-[10px] text-pink">{item.when}</span>
                <div><p className="font-display text-xl">{item.place}</p><p className="mt-1 text-xs text-clay">{item.role}</p></div>
                <p className="text-[13px] leading-relaxed text-clay">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionEyebrow>Personal GitHub</SectionEyebrow>
          <div className="mt-5 border-t border-ink">
            {PROJECTS.map((project) => (
              <div key={project.title} className="border-b border-line py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl">{project.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-clay">{project.line}</p>
                    <p className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.08em] text-pink">{project.terms.join(' · ')}</p>
                  </div>
                  <ArrowLink to={project.href} external>Code</ArrowLink>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5"><ArrowLink to={LINKS.github} external>All repositories</ArrowLink></div>
        </div>
      </section>
    </main>
  )
}

function StoryPage() {
  return (
    <main>
      <PageMeta title="About" description="Waiz Khan is a data science student and machine learning researcher at Johns Hopkins University." />
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr]">
          <div><SectionEyebrow>About</SectionEyebrow><h1 className="mt-3 font-display text-5xl">Waiz Khan</h1></div>
          <div>
            <p className="font-display text-2xl leading-tight sm:text-3xl">Student in the Department of Applied Mathematics and Statistics at Johns Hopkins University.</p>
            <p className="mt-3 text-[14px] leading-relaxed text-clay">M.S.E. Data Science. Research in multilingual language models, low-resource NLP, computational decipherment, and causal machine learning.</p>
            <div className="mt-4 flex flex-wrap gap-2"><ArrowLink to="/research">Research</ArrowLink><ArrowLink to="/resume">CV</ArrowLink></div>
          </div>
        </div>
        <div className="mt-7 grid border-l border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Education', 'Johns Hopkins University', 'M.S.E. Data Science · 2027'],
            ['Research', 'Graduate Researcher', 'Prof. Philipp Koehn'],
            ['Arzaic', 'Co-Founder & Founding Engineer', 'Iris · Healthcare agents'],
            ['Heela', 'Vice Chair & Director', 'Nonprofit · Refugee education'],
          ].map(([label, title, line]) => (
            <div key={label} className="border-b border-r border-ink p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-pink">{label}</p>
              <p className="mt-2 text-sm font-semibold">{title}</p>
              <p className="mt-1 text-xs text-clay">{line}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function ResumePage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
      <PageMeta title="CV" description="Curriculum vitae for Waiz Khan." />
      <SectionEyebrow>CV</SectionEyebrow>
      <h1 className="mt-5 font-display text-5xl sm:text-7xl">Curriculum vitae</h1>
      <div className="mt-10 flex flex-wrap gap-4">
        <a href={LINKS.resumePdf} download="Waiz_Khan.pdf" className="border-2 border-ink px-6 py-3 hover:border-pink hover:bg-pink hover:text-cream">Download PDF</a>
        <a href={LINKS.resumePdf} target="_blank" rel="noopener noreferrer" className="border-2 border-ink px-6 py-3 hover:border-pink hover:text-pink">Open in new tab</a>
      </div>
      <div className="my-10 border-2 border-ink">
        <object data={LINKS.resumePdf} type="application/pdf" className="h-[85vh] w-full" aria-label="Waiz Khan resume PDF">
          <div className="p-10 text-center text-clay"><a href={LINKS.resumePdf} className="underline decoration-blush decoration-2 underline-offset-4">Download the CV</a></div>
        </object>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/myportfolio">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/:slug" element={<ResearchDetailPage />} />
          <Route path="/directions" element={<DirectionsPage />} />
          <Route path="/build" element={<BuildPage />} />
          <Route path="/heela" element={<Navigate to="/build#experience" replace />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
