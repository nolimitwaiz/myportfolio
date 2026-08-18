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
  heela: 'https://heela.org',
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

const SYSTEMS = [
  {
    title: 'OFX',
    line: 'Market structure at event resolution.',
    href: 'https://github.com/nolimitwaiz/ofx-terminal',
  },
  {
    title: 'NavRover',
    line: 'Learning to move through the world.',
    href: 'https://github.com/nolimitwaiz/navrover',
  },
  {
    title: 'Klesis',
    line: 'Communication without a network.',
    href: 'https://nolimitwaiz.github.io/klesis/',
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
        element.setAttribute('fill', dot.on ? (nearby ? '#e64980' : '#171310') : '#e0d4b6')
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
            fill={dot.on ? '#171310' : '#e0d4b6'}
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
  const styles = `inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] underline decoration-blush decoration-2 underline-offset-4 transition-colors hover:text-pink ${className}`
  if (external) {
    return <a href={to} target="_blank" rel="noopener noreferrer" className={styles}>{children} ↗</a>
  }
  return <Link to={to} className={styles}>{children} →</Link>
}

function Header() {
  const navClass = ({ isActive }) =>
    `whitespace-nowrap transition-colors hover:text-pink ${isActive ? 'text-ink underline decoration-pink decoration-2 underline-offset-8' : ''}`

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-7 sm:px-8">
        <Link to="/" className="font-display text-xl italic text-ink">Waiz Khan</Link>
        <div className="flex w-full min-w-0 items-center justify-start gap-5 overflow-x-auto pb-1 text-[13px] text-clay sm:w-auto sm:flex-1 sm:justify-end sm:gap-6 sm:pb-0 sm:text-[14px]">
          <nav className="flex items-center gap-5 sm:gap-6" aria-label="Primary navigation">
            <NavLink to="/research" className={navClass}>Research</NavLink>
            <NavLink to="/directions" className={navClass}>Directions</NavLink>
            <NavLink to="/build" className={navClass}>Build</NavLink>
            <NavLink to="/heela" className={navClass}>Heela</NavLink>
            <NavLink to="/story" className={navClass}>Story</NavLink>
            <NavLink to="/resume" className={navClass}>CV</NavLink>
          </nav>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap font-mono text-xs text-ink hover:text-pink">GitHub ↗</a>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-ink bg-cream">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8 px-5 py-10 sm:px-8">
        <div>
          <p className="font-display text-3xl text-ink">Waiz Khan</p>
          <p className="mt-2 text-sm leading-relaxed text-clay">Johns Hopkins University · M.S.E. Data Science</p>
        </div>
        <div className="flex flex-wrap gap-5 font-mono text-xs uppercase tracking-wider text-ink">
          <a href={LINKS.email} className="hover:text-pink">Email</a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-pink">GitHub ↗</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-pink">LinkedIn ↗</a>
          <Link to="/resume" className="hover:text-pink">CV</Link>
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

function SectionEyebrow({ children, light = false }) {
  return <p className={`font-mono text-xs uppercase tracking-[0.25em] ${light ? 'text-blush' : 'text-pink'}`}>{children}</p>
}

function HomePage() {
  return (
    <main>
      <PageMeta
        description="Waiz Khan studies multilingual language models, low-resource learning, computational decipherment, and reliable AI at Johns Hopkins University."
      />

      <section className="mx-auto grid min-h-[58vh] max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 sm:py-18 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <SectionEyebrow>Baltimore · Johns Hopkins</SectionEyebrow>
          <h1 className="sr-only">Waiz Khan</h1>
          <div className="mt-8 max-w-2xl">
            <DotMatrix text="WAIZ KHAN" className="w-full cursor-crosshair" />
          </div>
        </div>
        <Reveal>
          <p className="font-display text-3xl leading-[1.15] sm:text-4xl">Data science student at Johns Hopkins University.</p>
          <p className="mt-5 text-[16px] leading-relaxed text-clay">Research in multilingual language models, low-resource learning, and computational decipherment.</p>
          <div className="mt-8"><ArrowLink to="/research">Research</ArrowLink></div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <SectionEyebrow>01</SectionEyebrow>
            <h2 className="mt-3 font-display text-5xl sm:text-6xl">Research</h2>
          </div>
          <span className="hidden font-mono text-xs text-clay sm:block">Questions, methods, evidence</span>
        </div>
        <ResearchIndex compact />
        <div className="pt-8 text-right"><ArrowLink to="/research">Explore all research</ArrowLink></div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-22">
          <SectionEyebrow light>02 · Directions</SectionEyebrow>
          <p className="mt-5 font-display text-4xl sm:text-5xl">Questions I haven’t finished asking.</p>
          <div className="mt-10 grid gap-px bg-cream/20 sm:grid-cols-2 lg:grid-cols-5">
            {DIRECTIONS.map((direction) => (
              <div key={direction.title} className="bg-ink p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-blush">{direction.title}</p>
                <p className="mt-5 font-display text-2xl leading-snug">{direction.question}</p>
              </div>
            ))}
          </div>
          <div className="mt-8"><ArrowLink to="/directions" className="text-cream">Explore directions</ArrowLink></div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-7xl border-t border-cream/20 px-5 py-18 sm:px-8 sm:py-24">
          <SectionEyebrow light>03 · Build</SectionEyebrow>
          <p className="mt-7 font-display text-6xl sm:text-7xl">Arzaic</p>
          <p className="mt-7 max-w-3xl font-display text-3xl leading-snug text-sand sm:text-4xl">Useful AI is not enough when being wrong has consequences.</p>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-blush">Iris</p>
              <p className="mt-4 font-display text-4xl">What happens between clinic visits?</p>
            </div>
            <div>
              <p className="font-mono text-sm tracking-wide text-blush">GATE → ROUTE → RETRIEVE → GENERATE → GUARD</p>
              <p className="mt-7 text-[17px] leading-relaxed text-sand">Iris is a healthcare agent architecture for longitudinal patient support, organized around auditable state, retrieval, tools, and safety checks.</p>
              <div className="mt-8"><ArrowLink to="/build" className="text-cream">Inside Iris</ArrowLink></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-18 sm:px-8 sm:py-24 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionEyebrow>04 · Heela</SectionEyebrow>
            <h2 className="mt-5 font-display text-6xl sm:text-7xl">Heela</h2>
            <p className="mt-3 font-display text-2xl italic text-pink">Hope, in Pashto.</p>
          </div>
          <Reveal>
            <p className="font-display text-3xl leading-tight sm:text-4xl">Some access problems don’t need another model.</p>
            <p className="mt-8 text-[17px] leading-relaxed text-clay">Heela is a nonprofit organization that helps refugee students navigate the path toward higher education through mentorship, guidance, and sustained support.</p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-pink">Vice Chair & Director · Governance · People · Continuity</p>
            <div className="mt-9"><ArrowLink to="/heela">More about Heela</ArrowLink></div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionEyebrow>05 · Story</SectionEyebrow>
        <Reveal>
          <p className="mt-10 max-w-5xl font-display text-5xl uppercase leading-[0.95] sm:text-7xl">Before models,<br />I thought in frames.</p>
          <p className="mt-9 max-w-2xl text-lg leading-relaxed text-clay">Stories are representations too. They decide what to preserve, what to remove, and what a viewer carries forward.</p>
          <div className="mt-10"><ArrowLink to="/story">Continue the story</ArrowLink></div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl border-t border-ink px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex items-end justify-between gap-8">
          <div><SectionEyebrow>06</SectionEyebrow><h2 className="mt-4 font-display text-5xl sm:text-6xl">Selected systems</h2></div>
          <span className="hidden font-mono text-xs text-clay sm:block">Three, not twenty</span>
        </div>
        <div className="mt-12">
          {SYSTEMS.map((system) => (
            <a key={system.title} href={system.href} target="_blank" rel="noopener noreferrer" className="group grid gap-2 border-t border-line py-7 sm:grid-cols-[12rem_1fr_auto] sm:items-center">
              <span className="font-display text-3xl group-hover:text-pink">{system.title}</span>
              <span className="text-clay">{system.line}</span>
              <span className="font-mono text-xs text-pink">↗</span>
            </a>
          ))}
          <div className="border-t border-line pt-8"><ArrowLink to={LINKS.github} external>Everything else on GitHub</ArrowLink></div>
        </div>
      </section>
    </main>
  )
}

function ResearchPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-18 pt-14 sm:px-8 sm:pt-20">
      <PageMeta title="Research" description="Research by Waiz Khan in multilingual representation, low-resource learning, computational decipherment, and causal ML." />
      <SectionEyebrow>Research</SectionEyebrow>
      <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[1.02] sm:text-7xl">Questions first.<br />Evidence close behind.</h1>
      <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-clay">Four connected research programs spanning language, representation, ancient scripts, and human systems.</p>
      <div className="mt-12"><ResearchIndex /></div>
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
      <section className="mx-auto max-w-7xl px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
        <Link to="/research" className="font-mono text-xs uppercase tracking-wider text-clay hover:text-pink">← All research</Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_.6fr]">
          <div>
            <SectionEyebrow>{item.index} · Research</SectionEyebrow>
            <h1 className="mt-5 font-display text-5xl leading-none sm:text-7xl">{item.title}</h1>
            <p className="mt-7 max-w-4xl font-display text-2xl leading-snug text-clay sm:text-4xl">{item.question}</p>
          </div>
          <div className="border-t border-ink pt-5 lg:mt-12">
            <p className="font-medium">{item.institution}</p>
            <p className="mt-2 font-mono text-xs text-pink">{item.dates}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {item.anchors.map((anchor) => <div key={anchor} className="bg-cream p-6 font-mono text-sm text-ink">{anchor}</div>)}
        </div>
      </section>

      <section className="border-y border-ink bg-sand">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          {[
            ['Question', item.why],
            ['Method', item.method],
            ['Findings', item.findings],
            ['What changed', item.changed],
          ].map(([label, copy]) => (
            <Reveal key={label}>
              <div className="grid gap-5 border-t border-ink py-8 sm:grid-cols-[10rem_1fr] sm:py-10">
                <SectionEyebrow>{label}</SectionEyebrow>
                <p className="max-w-4xl font-display text-2xl leading-snug sm:text-3xl">{copy}</p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-ink" />

          <details className="group border-b border-ink py-7">
            <summary className="cursor-pointer list-none font-mono text-xs uppercase tracking-[0.18em] text-ink">Methods + results <span className="text-pink group-open:hidden">↓</span><span className="hidden text-pink group-open:inline">↑</span></summary>
            <ul className="mt-8 max-w-3xl space-y-4 text-[17px] leading-relaxed text-clay">
              {item.technical.map((line) => <li key={line} className="border-l-2 border-pink pl-4">{line}</li>)}
            </ul>
          </details>

          <div className="grid gap-5 pt-10 sm:grid-cols-[10rem_1fr]">
            <SectionEyebrow>Where next</SectionEyebrow>
            <p className="max-w-4xl font-display text-3xl leading-snug sm:text-4xl">{item.future}</p>
          </div>

          {item.links.length > 0 && (
            <div className="mt-14 flex flex-wrap gap-6">
              {item.links.map((link) => <ArrowLink key={link.href} to={link.href} external>{link.label}</ArrowLink>)}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function DirectionsPage() {
  return (
    <main className="bg-ink text-cream">
      <PageMeta title="Directions" description="Research directions in memory, world models, language, NeuroAI, and continual learning." />
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-22">
        <SectionEyebrow light>Directions</SectionEyebrow>
        <h1 className="mt-5 font-display text-5xl sm:text-7xl">Questions I haven’t finished asking.</h1>
        <div className="mt-14">
          {DIRECTIONS.map((direction, index) => (
            <Reveal key={direction.title}>
              <section className="grid gap-6 border-t border-cream/25 py-10 sm:grid-cols-[4rem_1fr] sm:py-14">
                <span className="font-mono text-xs text-blush">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="font-display text-5xl uppercase sm:text-7xl">{direction.title}</h2>
                  <p className="mt-5 max-w-4xl font-display text-2xl leading-snug text-sand sm:text-4xl">{direction.question}</p>
                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-blush">{direction.terms}</p>
                </div>
              </section>
            </Reveal>
          ))}
          <div className="border-t border-cream/25" />
        </div>
      </section>
    </main>
  )
}

function BuildPage() {
  return (
    <main>
      <PageMeta title="Build" description="Arzaic, Iris, and selected systems by Waiz Khan." />
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-22">
          <SectionEyebrow light>Build</SectionEyebrow>
          <h1 className="mt-6 font-display text-6xl sm:text-8xl">Arzaic</h1>
          <p className="mt-7 max-w-4xl font-display text-3xl leading-tight text-sand sm:text-5xl">Useful AI is not enough when being wrong has consequences.</p>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-7xl border-t border-cream/20 px-5 py-16 sm:px-8 sm:py-22">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <SectionEyebrow light>Iris</SectionEyebrow>
              <h2 className="mt-5 font-display text-5xl sm:text-7xl">What happens between clinic visits?</h2>
            </div>
            <div>
              <div className="grid gap-px bg-cream/20 sm:grid-cols-5">
                {['Gate', 'Route', 'Retrieve', 'Generate', 'Guard'].map((stage) => <div key={stage} className="bg-ink p-5 text-center font-mono text-xs uppercase tracking-wider text-blush">{stage}</div>)}
              </div>
              <p className="mt-10 text-xl leading-relaxed text-sand">Iris is a healthcare agent architecture for longitudinal patient support, designed around auditable state, retrieval, tools, and safety checks.</p>
              <div className="mt-10 grid gap-4 font-mono text-xs uppercase tracking-wider text-blush sm:grid-cols-2">
                {['Longitudinal memory', 'Multimodal patient data', 'Agent tools', 'Safety evaluation'].map((term) => <p key={term} className="border-t border-cream/25 pt-4">{term}</p>)}
              </div>
            </div>
          </div>

          <div className="mt-18 border-t border-cream/20 pt-9">
            <SectionEyebrow light>Next / Arzaic</SectionEyebrow>
            <p className="mt-4 font-display text-5xl sm:text-7xl">Eve</p>
            <p className="mt-6 font-display text-3xl text-sand sm:text-4xl">Can reliability itself be learned?</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-22">
        <SectionEyebrow>Experience</SectionEyebrow>
        <h2 className="mt-5 font-display text-4xl sm:text-6xl">The work around the work.</h2>
        <div className="mt-10">
          {EXPERIENCE.map((item) => (
            <Reveal key={`${item.place}-${item.role}`}>
              <div className="grid gap-4 border-t border-ink py-8 sm:grid-cols-[10rem_1fr_1fr] sm:gap-8">
                <span className="font-mono text-xs text-pink">{item.when}</span>
                <div><p className="font-display text-2xl">{item.place}</p><p className="mt-1 text-sm text-clay">{item.role}</p></div>
                <p className="text-[15px] leading-relaxed text-clay">{item.detail}</p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-ink" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-ink px-5 py-14 sm:px-8 sm:py-20">
        <SectionEyebrow>Selected systems</SectionEyebrow>
        <div className="mt-10">
          {SYSTEMS.map((system) => (
            <a key={system.title} href={system.href} target="_blank" rel="noopener noreferrer" className="group grid gap-2 border-t border-line py-7 sm:grid-cols-[12rem_1fr_auto] sm:items-center">
              <span className="font-display text-3xl group-hover:text-pink">{system.title}</span>
              <span className="text-clay">{system.line}</span>
              <span className="font-mono text-xs text-pink">↗</span>
            </a>
          ))}
          <div className="border-t border-line pt-8"><ArrowLink to={LINKS.github} external>Everything else on GitHub</ArrowLink></div>
        </div>
      </section>
    </main>
  )
}

function HeelaPage() {
  return (
    <main className="bg-sand">
      <PageMeta title="Heela" description="Heela is a nonprofit supporting refugee students on the path toward higher education." />
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-22">
        <SectionEyebrow>Heela · Nonprofit Organization</SectionEyebrow>
        <h1 className="mt-6 font-display text-7xl sm:text-8xl">Heela</h1>
        <p className="mt-4 font-display text-3xl italic text-pink sm:text-4xl">Hope, in Pashto.</p>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <p className="font-display text-4xl leading-tight sm:text-5xl">Some access problems don’t need another model.</p>
          <div>
            <p className="text-xl leading-relaxed text-clay">Heela helps refugee students navigate the path toward higher education through mentorship, guidance, and sustained support.</p>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-pink">Vice Chair & Director</p>
            <p className="mt-5 text-[17px] leading-relaxed text-clay">My role spans leadership, governance, people, and continuity: helping the organization remain useful to students and dependable for the people who support them.</p>
            <div className="mt-10"><ArrowLink to={LINKS.heela} external>Visit Heela</ArrowLink></div>
          </div>
        </div>

        <div className="mt-16 grid gap-px bg-ink sm:grid-cols-3">
          {['Governance', 'People', 'Continuity'].map((word) => <div key={word} className="bg-sand p-9 font-display text-3xl">{word}</div>)}
        </div>
      </section>
    </main>
  )
}

function StoryPage() {
  return (
    <main>
      <PageMeta title="Story" description="The visual questions that preceded Waiz Khan’s work in language, memory, and intelligent systems." />
      <section className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-26">
        <SectionEyebrow>Story</SectionEyebrow>
        <h1 className="mt-12 max-w-6xl font-display text-6xl uppercase leading-[0.92] sm:text-8xl">Before models,<br />I thought in frames.</h1>
      </section>
      <section className="border-y border-ink bg-sand">
        <div className="mx-auto max-w-5xl px-5 py-18 text-center sm:px-8 sm:py-26">
          <p className="font-display text-4xl sm:text-6xl">I was once drawn to filmmaking.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-18 sm:px-8 sm:py-26">
        <p className="max-w-4xl font-display text-4xl leading-tight sm:text-6xl">Stories are representations too.</p>
        <p className="mt-10 max-w-2xl text-xl leading-relaxed text-clay">They decide what to preserve, what to remove, and what a viewer carries forward.</p>
        <p className="mt-16 font-display text-3xl sm:text-4xl">I stopped making films.<br /><em className="text-pink">The questions stayed.</em></p>

        <div className="mt-18 grid gap-6 sm:grid-cols-4">
          {['Image', 'Language', 'Memory', 'World'].map((word, index) => (
            <div key={word} className="border-t border-ink pt-5">
              <p className="font-mono text-xs text-pink">0{index + 1}</p>
              <p className="mt-4 font-display text-4xl">{word}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function ResumePage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <PageMeta title="CV" description="Curriculum vitae for Waiz Khan." />
      <SectionEyebrow>CV</SectionEyebrow>
      <h1 className="mt-5 font-display text-5xl sm:text-7xl">Curriculum vitae</h1>
      <div className="mt-10 flex flex-wrap gap-4">
        <a href={LINKS.resumePdf} download="Waiz_Khan.pdf" className="border-2 border-ink bg-ink px-6 py-3 text-cream hover:border-pink hover:bg-pink">Download PDF</a>
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
          <Route path="/heela" element={<HeelaPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
