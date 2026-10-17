import { useEffect, useRef } from 'react'
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
    brief: 'How multilingual models represent information across different languages.',
    highlight: '17 models · 128 languages · held-out model families',
    anchors: ['17 open models', '128 languages', '0.6B–8B parameters', 'held-out model families'],
    keywords: ['multilingual LLMs', 'representation learning', 'NTREX-128', 'Belebele'],
    why:
      'Multilingual models can express the same meaning in many languages, but their internal representations still carry language-specific structure. Understanding that structure can clarify what transfers across languages and what does not.',
    method:
      'Representation-level measurements are evaluated across NTREX-128 and Belebele, across model depth, model families, and training recipes. Predictions are set before experiments, and model families are held out during validation.',
    findings:
      'Experiments examine depth structure in language-specific variation and differences between training recipes. Downstream validation is ongoing; broad cross-model claims remain provisional.',
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
    brief: 'Machine translation and language learning when training data is limited.',
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
    brief: 'Finding linguistic structure in ancient writing systems using images, text, and graphs.',
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
    brief: 'Predicting chronic absenteeism and studying how to allocate limited student support.',
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
  { title: 'Learning architectures', terms: 'Adaptive computation, alternative learning rules, and routing.' },
  { title: 'Memory & world models', terms: 'Episodic memory, continual learning, and predictive representations.' },
  { title: 'NeuroAI', terms: 'Human cognition and comparisons with fMRI and MEG data.' },
  { title: 'Physical systems', terms: 'Vision, robotics, and Earth-system dynamics.' },
]

const THOUGHT_NODES = [
  {
    id: 'adaptive-learning',
    label: 'Adaptive computation & learning',
    category: 'Exploratory direction',
    note: 'Can a model learn which computation to use and which parameters to update?',
    view: 'Choosing a computation and choosing a learning update are different decisions. A useful experiment should separate those choices and compare them against fixed routing and update rules.',
    open: 'Does coordinating different learning mechanisms improve adaptation from limited examples?',
    terms: ['alternative learning rules', 'expert routing', 'adaptive computation'],
  },
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


const PROJECTS = [
  {
    title: 'OFX',
    line: 'An interactive market-data terminal with order-book visualization and event replay.',
    terms: ['TypeScript', 'WebGL', 'market microstructure', 'event replay'],
    href: 'https://github.com/nolimitwaiz/ofx-terminal',
  },
  {
    title: 'NavRover',
    line: 'A ROS 2 pipeline that turns robot navigation logs into labeled datasets.',
    terms: ['ROS 2', 'Python', 'robot navigation', 'dataset generation'],
    href: 'https://github.com/nolimitwaiz/navrover',
  },
  {
    title: 'Klesis',
    line: 'An offline messaging app that sends text between nearby devices through sound.',
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
      // Keep the name readable while the background pixels settle in.
      const startOpacity = dots[index].on ? 0.75 : 0
      element.style.opacity = startOpacity
      element.animate([{ opacity: startOpacity }, { opacity: 1 }], {
        duration: 260,
        delay: dots[index].delay * 0.15,
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
        element.setAttribute('fill', dot.on ? (nearby ? '#285f4f' : '#19251f') : '#e0e5e1')
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
            fill={dot.on ? '#19251f' : '#e0e5e1'}
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

function SquareLink({ to, children, external = false, className = '' }) {
  if (external) {
    return <a href={to} target="_blank" rel="noopener noreferrer" className={`square-link ${className}`}>{children}<span aria-hidden="true">↗</span></a>
  }
  return <Link to={to} className={`square-link ${className}`}>{children}</Link>
}

function Header() {
  const { pathname, hash } = useLocation()
  const links = [
    ['Research', '/#research', pathname.startsWith('/research/') || (pathname === '/' && hash === '#research')],
    ['Projects', '/#projects', pathname.startsWith('/projects/') || (pathname === '/' && hash === '#projects')],
    ['Experience', '/#experience', pathname === '/' && ['#experience', '#about'].includes(hash)],
    ['Resume', '/resume', pathname === '/resume'],
  ]
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="site-brand" aria-label="Waiz Khan home">Waiz Khan</Link>
        <nav aria-label="Primary navigation" className="primary-nav">
          {links.map(([label, to, active]) => <Link key={label} to={to} aria-current={active ? 'location' : undefined}>{label}</Link>)}
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return <footer className="site-footer"><span>Waiz Khan · Baltimore</span><a href={LINKS.email}>wkhan12@jh.edu</a></footer>
}

function Layout() {
  return <><ScrollToTop /><a className="skip-link" href="#main">Skip to content</a><Header /><Outlet /><Footer /></>
}

function OverviewRow({ title, meta, children, to, action, external = false }) {
  return (
    <article className="overview-row">
      <div className="row-heading"><h3>{title}</h3><p>{meta}</p></div>
      <p className="row-description">{children}</p>
      <SquareLink to={to} external={external}><span className="sr-only">{title}: </span>{action}</SquareLink>
    </article>
  )
}

function HomePage() {
  return (
    <main id="main" className="home-page">
      <PageMeta description="Waiz Khan is a data science student at Johns Hopkins University, a graduate researcher with Prof. Philipp Koehn, Co-Founder and Founding Engineer at Arzaic, and Vice Chair and Director at Heela." />
      <section id="about" className="introduction" aria-label="About Waiz Khan">
        <h1><span className="sr-only">Waiz Khan</span><DotMatrix text="WAIZ KHAN" className="pixel-signature" /></h1>
        <p className="affiliation">Student in the Department of Applied Mathematics and Statistics at Johns Hopkins University.</p>
        <p className="degree">M.S.E. Data Science · Expected May 2027</p>
        <p className="introduction-copy">Graduate researcher with Prof. Philipp Koehn. Co-Founder & Founding Engineer at Arzaic. Vice Chair & Director at Heela, a nonprofit supporting refugee students.</p>
        <div className="intro-links">
          <SquareLink to="/resume">Resume</SquareLink>
          <SquareLink to={LINKS.github} external>GitHub</SquareLink>
          <a href={LINKS.email} className="square-link">Email</a>
          <SquareLink to={LINKS.linkedin} external>LinkedIn</SquareLink>
        </div>
      </section>

      <section id="research" aria-labelledby="research-title" className="overview-section">
        <div className="section-heading"><h2 id="research-title">Research</h2><span>Questions, methods, and findings</span></div>
        <div className="research-list">
          {RESEARCH.map(item => <OverviewRow key={item.slug} title={item.title} meta={item.institution} to={`/research/${item.slug}`} action="Details">{item.brief}</OverviewRow>)}
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-title" className="overview-section">
        <div className="section-heading"><h2 id="projects-title">Selected projects</h2><a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-link">All repositories ↗</a></div>
        <div className="project-list">
          <OverviewRow title="Iris" meta="Arzaic · Healthcare agents" to="/projects/iris" action="Overview">A healthcare-agent architecture for ongoing patient support, with retrieval, tool use, and safety checks.</OverviewRow>
          {PROJECTS.map(item => <OverviewRow key={item.title} title={item.title} meta={item.terms.slice(0, 2).join(' · ')} to={item.href} action="Code" external>{item.line}</OverviewRow>)}
        </div>
      </section>

      <section id="experience" aria-labelledby="experience-title" className="overview-section">
        <div className="section-heading"><h2 id="experience-title">Experience</h2></div>
        <ul className="experience-list">
          {EXPERIENCE.map(item => (
            <li key={item.place}>
              <h3>{item.place}</h3><p>{item.role}</p><span>{item.when}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="interests" aria-labelledby="interests-title" className="interest-note">
        <h2 id="interests-title">Research interests</h2>
        <p>Learning architectures, continual learning and memory, world models, and NeuroAI.</p>
        <Link to="/thoughts" className="text-link">Research directions & questions →</Link>
      </section>
    </main>
  )
}

function IrisPage() {
  return (
    <main id="main" className="reading-page">
      <PageMeta title="Iris" description="Iris at Arzaic: healthcare-agent architecture for ongoing patient support. Waiz Khan, Co-Founder and Founding Engineer." />
      <Link to="/#projects" className="text-link">← Selected projects</Link>
      <div className="reading-heading"><p className="eyebrow">Arzaic · Healthcare agents</p><h1>Iris</h1><p className="lead">Healthcare-agent architecture for ongoing patient support.</p></div>
      <section className="reading-section"><h2>Role</h2><p>Co-Founder & Founding Engineer at Arzaic.</p></section>
      <section className="reading-section"><h2>System</h2><p>Iris brings together longitudinal patient state, information retrieval, agent tools, and safety checks.</p></section>
      <section className="reading-section"><h2>Architecture</h2><ol className="architecture-list">{['Gate', 'Route', 'Retrieve', 'Generate', 'Guard'].map(stage => <li key={stage}>{stage}</li>)}</ol></section>
      <section className="reading-section"><h2>Focus</h2><p>Patient context over time, auditable state, tool use, and safety evaluation.</p></section>
    </main>
  )
}

function ResearchDetailPage() {
  const { slug } = useParams()
  const item = RESEARCH.find(entry => entry.slug === slug)
  if (!item) return <Navigate to="/#research" replace />
  return (
    <main id="main" className="reading-page">
      <PageMeta title={item.title} description={item.summary} />
      <Link to="/#research" className="text-link">← Research index</Link>
      <div className="reading-heading">
        <p className="eyebrow">{item.institution} · {item.dates}</p>
        <h1>{item.title}</h1><p className="lead">{item.question}</p>
      </div>
      {[['Overview', item.why], ['Method', item.method], ['Findings', item.findings]].map(([label, copy]) => (
        <section className="reading-section" key={label}><h2>{label}</h2><p>{copy}</p></section>
      ))}
      <details className="technical-notes">
        <summary>Technical notes<span className="expand-mark" aria-hidden="true">+</span></summary>
        <ul>{item.technical.map(line => <li key={line}>{line}</li>)}</ul>
        <p>{item.changed}</p>
      </details>
      <section className="reading-section"><h2>Open question</h2><p>{item.future}</p></section>
      <div className="entry-actions">{item.links.map(link => <SquareLink key={link.href} to={link.href} external>{link.label}</SquareLink>)}</div>
    </main>
  )
}

function ThoughtsPage() {
  return (
    <main id="main" className="reading-page">
      <PageMeta title="Research directions" description="Research questions and exploratory directions in learning architectures, language, memory, world models, and NeuroAI." />
      <Link to="/#interests" className="text-link">← Overview</Link>
      <div className="reading-heading"><p className="eyebrow">Questions & notes</p><h1>Research directions</h1><p className="lead">Interests and working questions for future research.</p></div>
      <dl className="direction-overview">{DIRECTIONS.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.terms}</dd></div>)}</dl>
      <div className="direction-list">{THOUGHT_NODES.map(node => (
        <details key={node.id}>
          <summary><span><span className="entry-title">{node.label}</span><span className="entry-meta">{node.category}</span></span><span className="expand-mark" aria-hidden="true">+</span></summary>
          <div className="direction-body">
            <p className="direction-question">{node.note}</p><p>{node.view}</p>
            <h2>Open question</h2><p>{node.open}</p>
            {node.to && <div className="entry-actions"><SquareLink to={node.to}>Related research →</SquareLink></div>}
          </div>
        </details>
      ))}</div>
    </main>
  )
}

function ResumePage() {
  return (
    <main id="main" className="resume-page">
      <PageMeta title="Resume" description="Resume for Waiz Khan." />
      <div className="section-heading"><h1>Resume</h1><div className="entry-actions"><a href={LINKS.resumePdf} download="Waiz_Khan.pdf" className="square-link">Download PDF ↓</a><SquareLink to={LINKS.resumePdf} external>Open PDF</SquareLink></div></div>
      <object data={LINKS.resumePdf} type="application/pdf" aria-label="Waiz Khan resume PDF"><p><a href={LINKS.resumePdf}>Download the resume</a></p></object>
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
          <Route path="/projects/iris" element={<IrisPage />} />
          <Route path="/thoughts" element={<ThoughtsPage />} />
          <Route path="/directions" element={<Navigate to="/thoughts" replace />} />
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
