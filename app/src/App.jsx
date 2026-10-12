import { useEffect, useRef, useState } from 'react'
import {
  BrowserRouter,
  Link,
  Navigate,
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
    brief: 'How language changes model representations across layers and training methods.',
    highlight: '17 models · 128 languages · held-out model families',
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
    brief: 'Translation and cross-lingual transfer with limited training data.',
    highlight: 'Ongoing · transfer, representation, and evaluation',
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
    brief: 'Visual, distributional, and graph structure in ancient writing systems.',
    highlight: '11 corpora · hieroglyph translation · contamination audits',
    anchors: ['61k examples', '15+ architectures', 'vision + language', '≈34% duplicate leakage'],
    keywords: ['computational decipherment', 'multimodal learning', 'graph learning', 'data provenance'],
    why:
      'Computational decipherment is low-resource learning at its limit. Data is scarce, scripts may be only partly understood, and evaluation can fail before the model does.',
    method:
      'The research combines image-based hieroglyph translation, distributional and visual analysis of sign function, and frozen evaluation infrastructure across eleven ancient-language corpora.',
    findings:
      'A hieroglyph translation study reached BLEU-4 30.3 on a 150-example held-out set. Unsupervised sign-function clustering reached ARI 0.262 against a 0.0016 random floor. A later audit found about 34% near-duplicate leakage in standard splits.',
    changed:
      'The leakage audit changed the research program. Ancient Script Decipherment emerged as evaluation infrastructure: frozen partitions, preregistered runs, audit logs, and automated checks that block pretrained weights.',
    future:
      'Can translation, visual structure, and graph-based evidence support one another without importing an answer from pretrained systems?',
    technical: [
      'Translation: 61,000 examples across 15+ decoders and learning methods, including models that read carved-sign images.',
      'Structure: distributional statistics and self-supervised visual features for sign-function discovery without labels or parallel text.',
      'Evaluation: eleven corpora, 26 frozen partitions, preregistered runs, and contamination audits.',
    ],
    links: [
      { label: 'Ancient Script Decipherment code', href: 'https://github.com/nolimitwaiz/ancient-script-decipherment' },
    ],
  },
  {
    index: '04',
    slug: 'human-systems',
    title: 'Causal ML & Education',
    question: 'What changes when a prediction affects a person?',
    institution: 'GD Goenka University · Dr. Yogesh Kumar',
    dates: '2022 · Revisited 2026',
    summary:
      'Prediction, causal inference, and fixed-budget allocation for chronic absenteeism.',
    brief: 'Chronic absenteeism: prediction, causal inference, and allocation of support.',
    highlight: '47,027 students · ROC-AUC 0.841 vs. 0.699 baseline',
    anchors: ['47,027 students', 'ROC-AUC 0.841', '0.699 baseline', 'causal inference + optimization'],
    keywords: ['causal ML', 'gradient boosting', 'DoWhy', 'integer optimization'],
    why:
      'Predicting chronic absenteeism is only the beginning when the result may influence where limited student support is sent.',
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
  { title: 'Language', terms: 'Multilingual models · low-resource NLP · decipherment' },
  { title: 'Learning & memory', terms: 'Continual learning · episodic memory · consolidation' },
  { title: 'World models', terms: 'Predictive representations · vision · spatial intelligence' },
  { title: 'Embodied AI', terms: 'Robot perception · navigation · learning through action' },
  { title: 'NeuroAI', terms: 'Human memory · event segmentation · fMRI' },
  { title: 'Scientific AI', terms: 'Earth-system dynamics · rare events · uncertainty' },
  { title: 'Reliable AI', terms: 'Evaluation · robustness · safety' },
]

const THOUGHT_NODES = [
  {
    id: 'representation',
    label: 'Representation',
    category: 'Core question',
    x: 50,
    y: 45,
    note: 'What information survives a change in language, modality, model family, or training method?',
    view: 'A useful representation should preserve task-relevant structure while making nuisance variation measurable. A clean metric is not automatically a safe training objective; intervention can expose shortcuts.',
    open: 'Which measurements remain meaningful after a model is trained to optimize them?',
    terms: ['representation learning', 'invariance', 'transfer'],
    to: '/research/multilingual-representation',
  },
  {
    id: 'multilingual',
    label: 'Multilingual AI',
    category: 'Current research',
    x: 20,
    y: 24,
    note: 'How much structure is shared across languages, and where does language-specific variation remain?',
    view: 'Shared meaning does not require identical geometry at every layer. Language family, model family, and training recipe may shape different parts of the representation.',
    open: 'Which differences predict downstream transfer, and which are only signatures of the training process?',
    terms: ['multilingual LLMs', 'cross-lingual structure', 'model depth'],
    to: '/research/multilingual-representation',
  },
  {
    id: 'low-resource',
    label: 'Low-resource NLP',
    category: 'Current research',
    x: 18,
    y: 62,
    note: 'What can transfer from abundant languages without erasing the structure of languages with less data?',
    view: 'Transfer is useful only when the source of the gain is clear. Benchmark coverage, supervision, and data provenance matter as much as the final translation score.',
    open: 'How can transfer supply useful structure without flattening the language receiving it?',
    terms: ['machine translation', 'cross-lingual transfer', 'scarce supervision'],
    to: '/research/low-resource-language-learning',
  },
  {
    id: 'decipherment',
    label: 'Decipherment',
    category: 'Current research',
    x: 36,
    y: 84,
    note: 'Can visual, distributional, and graph evidence support one another when the language itself has been lost?',
    view: 'Visual form, sign co-occurrence, translation, and archaeological context provide incomplete but complementary evidence. Evaluation must be fixed before model selection begins.',
    open: 'How can these signals agree without importing answers from pretrained systems?',
    terms: ['ancient scripts', 'multimodal learning', 'graph learning'],
    to: '/research/computational-decipherment',
  },
  {
    id: 'evaluation',
    label: 'Evaluation',
    category: 'Method',
    x: 72,
    y: 69,
    note: 'Which results survive frozen splits, contamination audits, held-out model families, and intervention?',
    view: 'Evaluation is part of the research object, not a final reporting step. A result becomes more useful when its provenance, failure conditions, and sensitivity are visible.',
    open: 'What should replace a metric when optimizing it changes the behavior the metric was meant to describe?',
    terms: ['robustness', 'data provenance', 'reproducibility'],
    to: '/research',
  },
  {
    id: 'memory',
    label: 'Memory',
    category: 'Direction',
    x: 50,
    y: 12,
    note: 'How should a machine preserve useful experience without turning memory into uncontrolled context?',
    view: 'Memory should be selective, inspectable, and tied to decisions. More context is not necessarily better memory; retention and forgetting both need a purpose.',
    open: 'What deserves consolidation, what should remain episodic, and what should be forgotten?',
    terms: ['episodic memory', 'retrieval', 'consolidation'],
  },
  {
    id: 'world-models',
    label: 'World models',
    category: 'Direction',
    x: 82,
    y: 23,
    note: 'When does a learned representation become predictive enough to support planning and action?',
    view: 'A world model should expose what it expects to happen next and where that expectation is uncertain. Prediction matters when it changes an agent’s possible actions.',
    open: 'How much structure must be learned before planning becomes reliable outside the training distribution?',
    terms: ['multimodal learning', 'prediction', 'embodied intelligence'],
  },
  {
    id: 'neuroai',
    label: 'NeuroAI',
    category: 'Direction',
    x: 86,
    y: 49,
    note: 'Which principles of human event memory are useful computational ideas rather than loose analogies?',
    view: 'Human memory segments continuous experience, compresses events, and reconstructs rather than replays. Those mechanisms suggest testable designs, but biological language alone is not evidence.',
    open: 'Which memory principles produce measurable computational advantages under controlled comparison?',
    terms: ['human memory', 'event segmentation', 'naturalistic fMRI'],
  },
  {
    id: 'continual',
    label: 'Continual learning',
    category: 'Direction',
    x: 68,
    y: 88,
    note: 'How can a system keep changing after deployment without forgetting, drifting, or hiding failure?',
    view: 'Adaptation needs boundaries: what may change, what must remain stable, and how the change becomes observable. Reliability requires a record of learning, not only a new checkpoint.',
    open: 'Can a system learn continuously while preserving calibrated uncertainty and an auditable history?',
    terms: ['adaptation', 'stability', 'alternative learning systems'],
  },
]

const THOUGHT_EDGES = [
  ['representation', 'multilingual'],
  ['representation', 'low-resource'],
  ['representation', 'decipherment'],
  ['representation', 'evaluation'],
  ['representation', 'memory'],
  ['representation', 'world-models'],
  ['multilingual', 'low-resource'],
  ['low-resource', 'decipherment'],
  ['decipherment', 'evaluation'],
  ['evaluation', 'world-models'],
  ['evaluation', 'continual'],
  ['memory', 'neuroai'],
  ['memory', 'continual'],
  ['world-models', 'neuroai'],
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
]

const EXPERIENCE = [
  {
    when: '2026–Present',
    role: 'Co-Founder & Founding Engineer',
    place: 'Arzaic',
    detail: 'Iris, a healthcare agent for ongoing patient support.',
  },
  {
    when: '2026–Present',
    role: 'Vice Chair & Director',
    place: 'Heela',
    detail: 'Nonprofit supporting refugee students.',
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

function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} · Waiz Khan` : 'Waiz Khan'
    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) meta.setAttribute('content', description)
  }, [title, description])
  return null
}

function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (hash) {
      const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
      return () => cancelAnimationFrame(frame)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, key])
  return null
}

function ArrowLink({ to, children, external = false, className = '' }) {
  const styles = `inline-flex items-center gap-2 border border-line px-2.5 py-1.5 text-xs no-underline transition-colors hover:border-pink hover:bg-pink/5 hover:text-ink ${className}`
  if (external) {
    return <a href={to} target="_blank" rel="noopener noreferrer" className={styles}>{children} ↗</a>
  }
  return <Link to={to} className={styles}>{children} →</Link>
}

function Header() {
  const { pathname, hash } = useLocation()
  const navClass = (active) => `whitespace-nowrap border bg-cream px-2 py-2 text-[11px] transition-colors hover:border-pink hover:bg-pink/5 sm:px-2.5 ${active ? 'border-pink text-ink' : 'border-line text-clay'}`

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-5 gap-y-2 px-5 py-2.5 sm:px-8">
        <Link to="/" className="font-display text-xl italic text-ink">Waiz Khan</Link>
        <nav className="flex flex-wrap items-center gap-1 sm:gap-1.5" aria-label="Primary navigation">
          {[
            ['Research', '/#research', pathname.startsWith('/research/') || (pathname === '/' && hash === '#research')],
            ['Projects', '/#projects', pathname === '/' && hash === '#projects'],
            ['About', '/#about', pathname === '/' && ['#about', '#experience', '#interests'].includes(hash)],
            ['Resume', '/resume', pathname === '/resume'],
          ].map(([label, to, active]) => <Link key={label} to={to} aria-current={active ? 'location' : undefined} className={navClass(active)}>{label}</Link>)}
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className={navClass(false)}>GitHub ↗</a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <p className="text-xs text-clay">Waiz Khan · Baltimore</p>
        <div className="flex flex-wrap gap-2">
          <a href={LINKS.email} className="border border-line px-2.5 py-1.5 text-xs hover:border-pink hover:bg-pink/5">wkhan12@jh.edu</a>
          <ArrowLink to={LINKS.linkedin} external>LinkedIn</ArrowLink>
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

function ResearchGrid() {
  return (
    <div className="grid gap-x-7 md:grid-cols-2">
      {RESEARCH.map((item) => (
        <article key={item.slug} className="border-t border-line py-4">
          <h3 className="font-display text-[22px] leading-tight"><Link to={`/research/${item.slug}`} className="hover:text-pink">{item.title}</Link></h3>
          <p className="mt-1 text-xs text-clay">{item.institution}</p>
          <p className="mt-2 text-sm leading-relaxed">{item.brief}</p>
          <p className="mt-1 text-xs leading-relaxed text-clay">{item.highlight}</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <ArrowLink to={`/research/${item.slug}`}><span className="sr-only">{item.title} </span>Notes</ArrowLink>
            {item.links.map((link) => <ArrowLink key={link.href} to={link.href} external><span className="sr-only">{item.title} </span>Code</ArrowLink>)}
          </div>
        </article>
      ))}
    </div>
  )
}

function SectionEyebrow({ children, light = false }) {
  return <p className={`font-mono text-xs uppercase tracking-[0.25em] ${light ? 'text-blush' : 'text-pink'}`}>{children}</p>
}

function ThoughtsPage() {
  const [selectedId, setSelectedId] = useState('representation')
  const selected = THOUGHT_NODES.find((node) => node.id === selectedId)
  const nodeById = Object.fromEntries(THOUGHT_NODES.map((node) => [node.id, node]))
  const connected = THOUGHT_EDGES
    .filter(([from, to]) => from === selectedId || to === selectedId)
    .map(([from, to]) => nodeById[from === selectedId ? to : from])

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <PageMeta title="Thoughts" description="A connected map of Waiz Khan's research questions across language, representation, memory, evaluation, and intelligent systems." />
      <div className="grid gap-4 border-b border-ink pb-6 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
        <div>
          <SectionEyebrow>Connected questions</SectionEyebrow>
          <h1 className="mt-2 font-display text-5xl sm:text-6xl">Thoughts</h1>
        </div>
        <p className="text-[15px] leading-relaxed text-clay">A working map of questions connecting current research to longer-term directions. Each node holds a question, a current view, and the part that remains unresolved.</p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
        <section aria-label="Research thought graph">
          <div className="flex flex-wrap gap-2 sm:hidden" aria-label="Research questions">
            {THOUGHT_NODES.map((node) => (
              <button key={node.id} type="button" aria-pressed={node.id === selectedId} onClick={() => setSelectedId(node.id)} className={`border bg-cream px-3 py-2 text-xs ${node.id === selectedId ? 'border-pink' : 'border-line'}`}>{node.label}</button>
            ))}
          </div>
          <div
            className="relative hidden h-[31rem] overflow-hidden border border-line bg-cream sm:block"
            style={{ backgroundImage: 'radial-gradient(#d8d8d8 1px, transparent 1px)', backgroundSize: '18px 18px' }}
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {THOUGHT_EDGES.map(([from, to]) => {
                const start = nodeById[from]
                const end = nodeById[to]
                const active = from === selectedId || to === selectedId
                return (
                  <line
                    key={`${from}-${to}`}
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={active ? '#e60063' : '#a8a8a8'}
                    strokeWidth={active ? 1.5 : 1}
                    vectorEffect="non-scaling-stroke"
                  />
                )
              })}
            </svg>

            {THOUGHT_NODES.map((node) => {
              const active = node.id === selectedId
              return (
                <button
                  key={node.id}
                  type="button"
                  aria-label={`Open thought: ${node.label}`}
                  aria-pressed={active}
                  onClick={() => setSelectedId(node.id)}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 border bg-cream px-2 py-1.5 font-mono text-[10px] leading-none shadow-[2px_2px_0_#fff] transition-colors sm:px-2.5 sm:py-2 sm:text-[11px] ${active ? 'border-pink bg-pink/10 text-ink' : 'border-ink text-clay hover:border-pink hover:text-ink'}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  {node.label}
                </button>
              )
            })}

            <p className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-wider text-clay">{THOUGHT_NODES.length} notes · {THOUGHT_EDGES.length} links</p>
          </div>
        </section>

        <aside className="flex min-h-64 flex-col border border-ink p-5 sm:p-6" aria-live="polite">
          <div className="flex items-start justify-between gap-4">
            <SectionEyebrow>{selected.category}</SectionEyebrow>
            <span className="h-3 w-3 border border-pink bg-pink/10" aria-hidden="true" />
          </div>
          <h2 className="mt-3 font-display text-4xl leading-tight">{selected.label}</h2>

          <div className="mt-4 border-t border-line pt-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-pink">Question</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink">{selected.note}</p>
          </div>
          <div className="mt-4 border-t border-line pt-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-pink">Working view</p>
            <p className="mt-2 text-[14px] leading-relaxed text-clay">{selected.view}</p>
          </div>
          <div className="mt-4 border-t border-line pt-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-pink">Still open</p>
            <p className="mt-2 text-[14px] leading-relaxed text-clay">{selected.open}</p>
          </div>

          <div className="mt-4 border-t border-line pt-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-pink">Connected to</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {connected.map((node) => (
                <button key={node.id} type="button" aria-label={`Follow connection: ${node.label}`} onClick={() => setSelectedId(node.id)} className="border border-line px-2 py-1 text-[11px] text-clay hover:border-pink hover:text-ink">{node.label}</button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selected.terms.map((term) => <span key={term} className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-clay">{term}</span>)}
          </div>
          {selected.to && <div className="mt-auto pt-5"><ArrowLink to={selected.to}>Related work</ArrowLink></div>}
        </aside>
      </div>
    </main>
  )
}

function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-8">
      <PageMeta
        description="Waiz Khan is a student in the Department of Applied Mathematics and Statistics at Johns Hopkins University, researching multilingual language models, low-resource learning, and computational decipherment."
      />

      <section className="py-6 sm:py-7">
        <div className="grid items-center gap-5 md:grid-cols-[.85fr_1.15fr] md:gap-9">
          <div>
            <SectionEyebrow>Baltimore · Johns Hopkins</SectionEyebrow>
            <h1 className="sr-only">Waiz Khan</h1>
            <div className="mt-3 max-w-[23rem]"><DotMatrix text="WAIZ KHAN" className="w-full cursor-crosshair" /></div>
          </div>
          <div>
            <p className="font-display text-[23px] leading-snug">Student in the Department of Applied Mathematics and Statistics at Johns Hopkins University.</p>
            <p className="mt-2 text-sm text-clay">M.S.E. Data Science · Expected May 2027</p>
            <p className="mt-1 text-sm text-clay">Graduate researcher with Prof. Philipp Koehn.</p>
          </div>
        </div>
      </section>

      <section id="research" aria-labelledby="research-title" className="border-t border-ink pb-3 pt-5">
        <h2 id="research-title" className="mb-3 font-display text-2xl">Research</h2>
        <ResearchGrid />
      </section>

      <section id="projects" aria-labelledby="projects-title" className="border-t border-ink py-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 id="projects-title" className="font-display text-2xl">Personal projects</h2>
          <ArrowLink to={LINKS.github} external>All repositories</ArrowLink>
        </div>
        <div className="grid gap-x-7 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <article key={project.title} className="border-t border-line py-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl">{project.title}</h3>
                <ArrowLink to={project.href} external><span className="sr-only">{project.title} </span>Code</ArrowLink>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{project.line}</p>
              <p className="mt-1 text-xs leading-relaxed text-clay">{project.terms.slice(0, 2).join(' · ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" aria-labelledby="about-title" className="border-t border-ink py-5">
        <h2 id="about-title" className="mb-4 font-display text-2xl">About</h2>
        <div className="grid gap-7 lg:grid-cols-[1.15fr_.85fr]">
          <section id="experience" aria-labelledby="experience-title">
            <h3 id="experience-title" className="mb-2 text-sm font-semibold">Experience</h3>
            <ul className="divide-y divide-line border-t border-line">
              {EXPERIENCE.map((item) => (
                <li key={`${item.place}-${item.role}`} className="py-2.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <p className="text-sm"><span className="font-semibold">{item.place}</span> · {item.role}</p>
                    <span className="text-xs text-clay">{item.when}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-clay">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>
          <section id="interests" aria-labelledby="interests-title">
            <h3 id="interests-title" className="mb-2 text-sm font-semibold">Research interests</h3>
            <dl className="space-y-2 border-t border-line pt-2.5">
              {DIRECTIONS.map((direction) => (
                <div key={direction.title} className="text-xs leading-relaxed">
                  <dt className="inline font-semibold">{direction.title}</dt>{' '}
                  <dd className="inline text-clay">— {direction.terms}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3"><ArrowLink to="/thoughts">Thoughts & questions</ArrowLink></div>
          </section>
        </div>
      </section>
    </main>
  )
}

function ResearchDetailPage() {
  const { slug } = useParams()
  const item = RESEARCH.find((entry) => entry.slug === slug)
  if (!item) return <Navigate to="/#research" replace />

  return (
    <main className="mx-auto max-w-3xl px-5 py-7 sm:px-8 sm:py-9">
      <PageMeta title={item.title} description={item.summary} />
      <ArrowLink to="/#research">All research</ArrowLink>
      <h1 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">{item.title}</h1>
      <p className="mt-2 text-sm text-clay">{item.institution} · {item.dates}</p>
      <p className="mt-4 font-display text-xl leading-snug">{item.question}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.links.map((link) => <ArrowLink key={link.href} to={link.href} external>{link.label}</ArrowLink>)}
      </div>

      <div className="mt-6 space-y-5 border-t border-line pt-5">
        {[
          ['Overview', item.why],
          ['Method', item.method],
          ['Findings', item.findings],
        ].map(([label, copy]) => (
          <section key={label}>
            <h2 className="text-sm font-semibold">{label}</h2>
            <p className="mt-1 text-sm leading-relaxed text-clay">{copy}</p>
          </section>
        ))}
        <details className="border-y border-line py-3">
          <summary className="cursor-pointer text-sm font-semibold">Technical notes +</summary>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-clay">
            {item.technical.map((line) => <li key={line}>{line}</li>)}
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-clay">{item.changed}</p>
        </details>
        <section>
          <h2 className="text-sm font-semibold">Open question</h2>
          <p className="mt-1 text-sm leading-relaxed text-clay">{item.future}</p>
        </section>
      </div>
    </main>
  )
}

function ResumePage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-7 sm:px-8">
      <PageMeta title="Resume" description="Resume for Waiz Khan." />
      <h1 className="font-display text-3xl">Resume</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        <a href={LINKS.resumePdf} download="Waiz_Khan.pdf" className="border border-line px-3 py-2 text-sm hover:border-pink hover:bg-pink/5">Download PDF</a>
        <ArrowLink to={LINKS.resumePdf} external>Open in new tab</ArrowLink>
      </div>
      <div className="mt-5 border border-line">
        <object data={LINKS.resumePdf} type="application/pdf" className="h-[85vh] w-full" aria-label="Waiz Khan resume PDF">
          <div className="p-5 text-center text-clay"><a href={LINKS.resumePdf} className="underline decoration-pink underline-offset-4">Download the resume</a></div>
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
          <Route path="/research" element={<Navigate to="/#research" replace />} />
          <Route path="/research/:slug" element={<ResearchDetailPage />} />
          <Route path="/thoughts" element={<ThoughtsPage />} />
          <Route path="/directions" element={<Navigate to="/#interests" replace />} />
          <Route path="/build" element={<Navigate to="/#experience" replace />} />
          <Route path="/heela" element={<Navigate to="/#experience" replace />} />
          <Route path="/story" element={<Navigate to="/#about" replace />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
