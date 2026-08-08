import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const LINKS = {
  github: 'https://github.com/nolimitwaiz',
  linkedin: 'https://www.linkedin.com/in/waiz-khan-024529223',
  email: 'mailto:wkhan12@jh.edu',
  resumePdf: '/myportfolio/Waiz_Khan.pdf',
}

const NOW = [
  { title: 'Research with Prof. Philipp Koehn', body: 'Evaluation metrics for LLM representations at Johns Hopkins. An NSF proposal in development.' },
  { title: 'Iris, at Arzaic', body: 'Co-founder and founding engineer. An LLM agent platform for heart failure care.' },
  { title: 'M.S.E. Data Science, Johns Hopkins', body: 'May 2027. Machine translation, deep learning, applied statistics.' },
]

const WORK = [
  {
    title: 'Iris',
    tag: 'Arzaic · Co-Founder and Founding Engineer',
    year: '2026',
    stack: 'TypeScript · Node · Next.js',
    status: 'Private',
    hook: 'A companion for the weeks between clinic visits.',
    body: 'Five stages per reply: gate, route, retrieve, generate, guard. Agent tools retrieve over a multimodal patient record that changes only through auditable patches. Built at Arzaic, where I am co-founder and founding engineer.',
    result: 'A safety judge fails closed on every response; safety evaluation gates every merge',
    links: {},
  },
  {
    title: 'OFX',
    tag: 'Order flow · Microstructure',
    year: '2026',
    stack: 'TypeScript · WebGL',
    status: 'Private',
    hook: 'A market at the resolution it actually trades.',
    body: 'A sequenced limit order book rebuilt from exchange depth diffs, the liquidity field in WebGL, and full session replay.',
    result: 'The study harness refuses to report statistics from thin samples',
    links: { code: 'https://github.com/nolimitwaiz/ofx-terminal' },
  },
  {
    title: 'ExoSAGE',
    tag: 'Exoplanets · Telescope allocation',
    year: '2026',
    stack: 'Python · FastAPI · D3',
    status: null,
    hook: 'Telescope time is scarce. This decides where it goes.',
    body: 'Candidates screened as they looked on a given date, never later, with false discovery rate control across thousands of targets.',
    result: 'A screen, not a classifier. It makes no claim about life.',
    links: { code: 'https://github.com/nolimitwaiz/exosage' },
  },
]

const RESEARCH = [
  {
    title: 'Multilingual LLM interpretability',
    tag: 'Johns Hopkins · NSF proposal',
    year: '2026',
    stack: 'PyTorch · Slurm · 17 models',
    status: null,
    hook: 'How much of a language model is about language itself?',
    body: 'An intrinsic metric for the language component of a representation, tested on NTREX-128 and Belebele across 17 open models against preregistered predictions.',
    result: 'Trained against directly, the metric collapses into a shortcut. A construct failure, not an implementation bug.',
    links: {},
  },
  {
    title: 'Hieroglyph translation',
    tag: 'Johns Hopkins · Multimodal MT',
    year: '2026',
    stack: 'PyTorch · ConvNeXt',
    status: null,
    hook: 'Which architectures learn a language that left almost no data?',
    body: 'Fifteen decoders and learning rules on a 61k example corpus, some reading the carved sign images rather than a lookup table.',
    result: 'BLEU-4 30.3 on a 150 example test set',
    links: {},
  },
  {
    title: 'Gardiner',
    tag: 'Sign function · Unsupervised',
    year: '2026',
    stack: 'NumPy · SSL vision',
    status: null,
    hook: 'Recovering what a sign does with nothing to translate against.',
    body: 'No dictionary, no parallel text, no labels. Distributional statistics and self supervised visual features.',
    result: 'ARI 0.262 against a 0.0016 random floor, and a correction of the inflated number that came before it',
    links: {},
  },
  {
    title: 'Glyphos',
    tag: 'Decipherment infrastructure',
    year: '2026',
    stack: 'Python · CI gated',
    status: 'Release planned',
    hook: 'The plumbing that decides whether a result is real.',
    body: 'Eleven ancient language corpora behind 26 frozen test partitions, a preregistered ledger, and a gate blocking pretrained weights.',
    result: 'An audit found roughly 34% near duplicate leakage in the standard splits',
    links: { code: 'https://github.com/nolimitwaiz/glyphos' },
  },
  {
    title: 'AttendOpt',
    tag: 'Causal ML · Optimization',
    year: '2026',
    stack: 'CatBoost · DoWhy · PuLP',
    status: null,
    hook: 'Who is about to leave school, and where should the money go?',
    body: 'A national survey of 47,027 students, calibrated predictions, and a causal test of whether distance is a real barrier.',
    result: 'ROC-AUC 0.841 against a 0.699 baseline; an integer program doubles impact per fixed budget',
    links: { code: 'https://github.com/nolimitwaiz/attendopt' },
  },
  {
    title: 'Resonance',
    tag: 'Music and the brain',
    year: '2026',
    stack: 'MERT · banded ridge · fMRI',
    status: null,
    hook: 'Predicting a brain in the middle of a song.',
    body: 'MERT audio features against cortical responses recorded while five people listened to music.',
    result: 'r 0.311 ± 0.082, about 47% of the noise ceiling, with the retraction of a prettier earlier number kept beside it',
    links: {},
  },
  {
    title: 'Heela',
    tag: 'Nonprofit · Vice Chair and Director',
    year: '2026 –',
    stack: 'HTML · React · Supabase · Vercel',
    status: null,
    hook: 'Heela means hope in Pashto.',
    body: 'A college preparation platform for refugee students, running in production. Students, advisors and administrators each get their own view, and fellows are invited, matched and carried through an application year. I serve as Vice Chair and Director.',
    result: 'Live at heela.org',
    links: { live: 'https://heela.org' },
  },
]

const VIZ = [
  {
    title: 'Screening 7,512 planet candidates',
    tag: 'D3.js v7 · Distribution + sky projection',
    year: '2026',
    stack: 'JavaScript · D3 v7 · no build step',
    status: null,
    hook: 'Which of these worlds are worth a telescope?',
    body: 'Every TESS candidate with a measured radius and starlight, on log scales, with the temperate band and the rocky ceiling drawn in. A hand-implemented Aitoff projection puts the same objects on the sky.',
    result: 'Fourteen of 7,512 fall inside the temperate, rocky box',
    links: { live: 'https://nolimitwaiz.github.io/dataviz-samples/exoplanet-screen/', code: 'https://github.com/nolimitwaiz/dataviz-samples/tree/main/exoplanet-screen' },
  },
  {
    title: 'Watching a strategy stop guessing',
    tag: 'D3.js v7 · Small multiples',
    year: '2026',
    stack: 'JavaScript · D3 v7 · no build step',
    status: null,
    hook: 'Twelve poker decisions, from coin-flip to committed.',
    body: 'A solver walks the equilibrium path as players get less random. Each panel is one decision; strong hands climb, weak ones fall, and the whole thing starts at fifty-fifty.',
    result: 'Exploitability falls 0.499 to 0.278, and the page says it stopped there',
    links: { live: 'https://nolimitwaiz.github.io/dataviz-samples/qre-path/', code: 'https://github.com/nolimitwaiz/dataviz-samples/tree/main/qre-path' },
  },
]

const INDEX = [
  { name: 'Encore', what: 'Naturalistic fMRI framework testing whether encoding time brain activity predicts later free recall, beyond what the film itself explains.', year: '2026', note: 'No model trained yet' },
  { name: 'Morrow', what: 'iOS app turning Apple Health data into an explainable daily landscape. Deterministic engine, no cloud, no analytics.', year: '2026', note: 'Local only' },
  { name: 'Cheironomia', what: 'Real time sign language recognition on iPhone. Vision hand pose into a 55k parameter Core ML network, entirely on device.', year: '2026', note: 'Needs held out eval' },
  { name: 'QuantNet Solver', what: 'C++20 Newton and Levenberg-Marquardt solver for quantal response equilibria in imperfect information poker.', year: '2026', note: 'Needs a benchmark' },
  { name: 'Regime Detector', what: 'Market regime detection combining liquid time constant networks, graph based contagion, and a reinforcement learned policy.', year: '2026', note: 'Figures, no table yet' },
  { name: 'SLM Lab', what: 'Matched comparison of small language models: transformer against mamba, CfC, test time training and mixture of experts, under one fixed budget.', year: '2026', note: 'Preregistered, unrun' },
  { name: 'NavRover', href: 'https://github.com/nolimitwaiz/navrover', what: 'Offline pipeline converting robot bag files into a labeled ground vehicle navigation dataset, with synthetic fixtures validating the label math.', year: '2026', note: 'Pipeline, no policy' },
  { name: 'Agentic Snake', what: 'Graph attention double dueling deep Q network with prioritized replay, and a live view of what the agent attends to.', year: '2026', note: 'Trained, needs baseline' },
  { name: 'Black-Scholes Pricer', href: 'https://github.com/nolimitwaiz/black-scholes-pricer', what: 'European options pricer with Greeks, a Newton-Raphson implied volatility solver with Brent fallback, and arbitrage diagnostics.', year: '2025', note: '91 tests in CI' },
  { name: 'Klesis', href: 'https://nolimitwaiz.github.io/klesis/', what: 'Messenger that carries text between nearby devices over sound. No network, no accounts, no pairing.', year: '2026', note: 'Live in the browser' },
]

const TIMELINE = [
  { when: '2026', what: 'Co-Founder and Founding Engineer, Arzaic LLC', detail: 'Iris, an LLM agent platform for heart failure care. April 2026 to present.' },
  { when: '2025', what: 'Research Assistant, Johns Hopkins University', detail: 'Advised by Prof. Philipp Koehn. December 2025 to present.' },
  { when: '2024', what: 'M.S.E. Data Science, Johns Hopkins University', detail: 'August 2024 to May 2027.' },
  { when: '2022', what: 'Research Assistant, GD Goenka University', detail: 'Chronic absenteeism on a 40k student national survey, advised by Dr. Yogesh Kumar.' },
]

// ---------- dot matrix (squares) ----------

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
const S_ON = 7.4
const S_OFF = 4.2
const INK = '#171310'
const FAINT = '#e0d4b6'
const PINK = '#e64980'
const HOVER_RADIUS = 85

function buildDots(text) {
  const glyphs = [...text.toUpperCase()].map((ch) => GLYPHS[ch] ?? GLYPHS[' '])
  const dots = []
  let xOffset = 0
  glyphs.forEach((glyph, gi) => {
    const width = glyph[0].length
    glyph.forEach((row, y) => {
      ;[...row].forEach((bit, x) => {
        dots.push({
          on: bit === '1',
          cx: (xOffset + x + 0.5) * CELL,
          cy: (y + 0.5) * CELL,
          delay: (xOffset + x) * 18 + y * 26,
        })
      })
    })
    xOffset += width + (gi < glyphs.length - 1 ? 1 : 0)
  })
  return { dots, cols: xOffset }
}

function DotMatrix({ text, className }) {
  const svgRef = useRef(null)
  const rectRefs = useRef([])
  const { dots, cols } = buildDots(text)

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    rectRefs.current.forEach((el, i) => {
      if (!el) return
      if (reduced) {
        el.style.opacity = 1
        return
      }
      el.style.opacity = 0
      el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 380,
        delay: dots[i].delay,
        fill: 'forwards',
        easing: 'ease-out',
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    let raf = null
    let point = null

    const apply = () => {
      raf = null
      rectRefs.current.forEach((el, i) => {
        if (!el) return
        const d = dots[i]
        const dist = point ? Math.hypot(d.cx - point.x, d.cy - point.y) : Infinity
        const near = dist < HOVER_RADIUS
        const boost = near ? 1 + (1 - dist / HOVER_RADIUS) * 0.55 : 1
        const size = (d.on ? S_ON : S_OFF) * boost
        el.setAttribute('width', size.toFixed(2))
        el.setAttribute('height', size.toFixed(2))
        el.setAttribute('x', (d.cx - size / 2).toFixed(2))
        el.setAttribute('y', (d.cy - size / 2).toFixed(2))
        el.setAttribute('fill', d.on ? (near ? PINK : INK) : FAINT)
      })
    }
    const onMove = (e) => {
      const rect = svg.getBoundingClientRect()
      point = {
        x: ((e.clientX - rect.left) / rect.width) * cols * CELL,
        y: ((e.clientY - rect.top) / rect.height) * 7 * CELL,
      }
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      point = null
      if (!raf) raf = requestAnimationFrame(apply)
    }
    svg.addEventListener('pointermove', onMove)
    svg.addEventListener('pointerleave', onLeave)
    return () => {
      svg.removeEventListener('pointermove', onMove)
      svg.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <svg ref={svgRef} viewBox={`0 0 ${cols * CELL} ${7 * CELL}`} className={className} aria-hidden="true">
      {dots.map((d, i) => {
        const size = d.on ? S_ON : S_OFF
        return (
          <rect
            key={i}
            ref={(el) => (rectRefs.current[i] = el)}
            x={d.cx - size / 2}
            y={d.cy - size / 2}
            width={size}
            height={size}
            fill={d.on ? INK : FAINT}
          />
        )
      })}
    </svg>
  )
}

// ---------- shared pieces ----------

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

function Marquee() {
  const items = ['Open to research roles', 'LLM evaluation', 'Machine translation', 'Quant', 'Baltimore']
  const run = items.map((t, i) => (
    <span key={i} className="mx-6 flex items-center gap-6">
      {t} <span className="text-blush">■</span>
    </span>
  ))
  return (
    <div className="marquee border-b-2 border-ink bg-ink py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-cream">
      <div className="marquee-track">
        <div className="flex">{run}</div>
        <div className="flex" aria-hidden="true">{run}</div>
      </div>
    </div>
  )
}

function GitHubIcon({ className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  )
}

function ArrowIcon({ className = 'size-4' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15L15 5M15 5H7.5M15 5v7.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
    </svg>
  )
}

function SectionTitle({ index, children }) {
  return (
    <div className="flex items-end justify-between border-b-2 border-ink pb-5">
      <h2 className="font-display text-5xl text-ink sm:text-6xl">{children}</h2>
      <span className="font-mono text-base text-pink">{index}</span>
    </div>
  )
}

function IndexRow({ r }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[11rem_1fr_9rem]">
      <p className="font-semibold text-ink">
        {r.href ? (
          <a href={r.href} target="_blank" rel="noopener noreferrer" className="underline decoration-blush decoration-2 underline-offset-4 transition-colors hover:text-pink">
            {r.name}
          </a>
        ) : r.name}
      </p>
      <p className="order-3 text-[15px] leading-snug text-clay sm:order-none">{r.what}</p>
      <p className="text-right font-mono text-xs text-clay">
        {r.year}
        {r.note && <span className="block text-pink">{r.note}</span>}
      </p>
    </div>
  )
}

function WorkRow({ p, i }) {
  return (
    <Reveal>
      <div className="grid gap-4 border-b border-line py-10 sm:grid-cols-[3.5rem_1fr_13rem] sm:gap-8">
        <span className="pt-1.5 font-mono text-sm text-pink">{String(i + 1).padStart(2, '0')}</span>
        <div>
          <h3 className="font-display text-3xl text-ink sm:text-4xl">{p.title}</h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-clay">{p.tag}</p>
          {p.hook && (
            <p className="mt-4 max-w-2xl font-display text-xl leading-snug text-ink sm:text-2xl">{p.hook}</p>
          )}
          <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-clay">{p.body}</p>
          {p.result && (
            <p className="mt-4 flex max-w-2xl items-start gap-2.5 font-mono text-[13px] leading-relaxed text-ink">
              <span className="mt-1.5 inline-block size-2 shrink-0 bg-pink" aria-hidden="true" />
              {p.result}
            </p>
          )}
        </div>
        <div className="flex flex-row flex-wrap gap-x-6 gap-y-2 border-line pt-1.5 text-sm sm:flex-col sm:border-l sm:pl-6">
          <p className="font-mono text-xs text-ink">{p.year}</p>
          <p className="font-mono text-xs leading-relaxed text-clay">{p.stack}</p>
          {p.links.code && (
            <a
              href={p.links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink underline decoration-blush decoration-2 underline-offset-4 transition-colors hover:text-pink"
            >
              <GitHubIcon className="size-4" /> Code
            </a>
          )}
          {p.links.live && (
            <a
              href={p.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink underline decoration-blush decoration-2 underline-offset-4 transition-colors hover:text-pink"
            >
              <ArrowIcon className="size-4" /> Live
            </a>
          )}
          {p.status && (
            <p className="border border-ink/20 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-ink/60 sm:self-start">
              {p.status}
            </p>
          )}
        </div>
      </div>
    </Reveal>
  )
}

// ---------- layout ----------

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function Layout() {
  const navClass = ({ isActive }) =>
    `transition-colors hover:text-ink ${isActive ? 'text-ink underline decoration-pink decoration-2 underline-offset-8' : ''}`
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Marquee />
      <header className="sticky top-0 z-10 border-b border-line bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="font-display text-xl italic text-ink">
            Waiz Khan
          </Link>
          <nav className="flex items-center gap-4 text-[15px] text-clay sm:gap-6">
            <NavLink to="/work" className={navClass}>Work</NavLink>
            <NavLink to="/work#visualization" className="hidden transition-colors hover:text-ink sm:block">Visualization</NavLink>
            <NavLink to="/work#research" className="hidden transition-colors hover:text-ink sm:block">Research</NavLink>
            <NavLink to="/#about" className="hidden transition-colors hover:text-ink sm:block">About</NavLink>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-ink transition-colors hover:text-pink">
              <GitHubIcon />
            </a>
            <NavLink
              to="/resume"
              className="border-2 border-ink bg-ink px-4 py-1.5 font-medium text-cream transition-colors hover:border-pink hover:bg-pink"
            >
              Resume
            </NavLink>
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="border-t-2 border-ink">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-[15px] text-clay sm:px-8">
          <p className="font-mono text-xs">© {new Date().getFullYear()} Waiz Khan</p>
          <div className="flex items-center gap-6">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-pink">
              <GitHubIcon />
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-pink">LinkedIn</a>
            <a href={LINKS.email} className="transition-colors hover:text-pink">Email</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ---------- pages ----------

function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 sm:px-8">
      <section className="py-20 text-center sm:py-28">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-pink">
          Baltimore · Johns Hopkins
        </p>
        <h1 className="mt-10 flex justify-center">
          <span className="sr-only">Waiz Khan</span>
          <DotMatrix text="WAIZ KHAN" className="w-full max-w-3xl cursor-crosshair" />
        </h1>
        <p className="mx-auto mt-12 max-w-4xl font-display text-4xl leading-snug text-ink sm:text-6xl sm:leading-[1.15]">
          Machine learning research, and the{' '}
          <em className="italic text-pink">experiments that prove it works.</em>
        </p>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-clay">
          Graduate researcher at Johns Hopkins, working with Prof. Philipp Koehn on how language
          models represent language. The parts I care most about are the unglamorous ones:
          evaluation, preregistration, and numbers that survive being checked.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-base">
          <Link to="/resume" className="border-2 border-ink bg-ink px-6 py-3 font-medium text-cream transition-colors hover:border-pink hover:bg-pink">
            View resume
          </Link>
          <Link to="/work" className="border-2 border-ink px-6 py-3 text-ink transition-colors hover:border-pink hover:text-pink">
            See the work
          </Link>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-2 border-ink px-6 py-3 text-ink transition-colors hover:border-pink hover:text-pink">
            <GitHubIcon className="size-5" /> GitHub
          </a>
        </div>
      </section>

      <Reveal>
        <section aria-label="Currently" className="border-2 border-ink">
          <div className="grid divide-y-2 divide-ink sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0">
            {NOW.map((n) => (
              <div key={n.title} className="p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-pink">Now</p>
                <h2 className="mt-3 text-lg font-semibold text-ink">{n.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-clay">{n.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <section className="pt-24 sm:pt-28">
        <Reveal>
          <SectionTitle index="01">Selected</SectionTitle>
        </Reveal>
        <div>
          {WORK.map((p, i) => (
            <WorkRow key={p.title} p={p} i={i} />
          ))}
        </div>
        <Reveal>
          <div className="pt-8 text-right">
            <Link to="/work" className="font-mono text-sm uppercase tracking-wider text-ink underline decoration-blush decoration-2 underline-offset-4 transition-colors hover:text-pink">
              All work and research →
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="pt-24 sm:pt-28">
        <Reveal>
          <SectionTitle index="02">About</SectionTitle>
        </Reveal>
        <div className="mt-12 grid gap-12 sm:grid-cols-2">
          <Reveal>
            <p className="font-display text-4xl leading-snug text-ink sm:text-5xl">
              Every number on this site is one <em className="italic text-pink">I measured.</em>
            </p>
          </Reveal>
          <Reveal>
            <div className="space-y-5 text-[17px] leading-relaxed text-clay">
              <p>
                I like systems where the failure mode is boring. That means registering predictions
                before the experiment runs, and keeping the retraction next to the number when one
                turns out to be inflated.
              </p>
              <p>
                Research at Johns Hopkins with Prof. Philipp Koehn on how multilingual models
                represent language, now growing into an NSF proposal. Alongside it, Iris: the agent
                platform at Arzaic, the startup I co-founded.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="mt-12">
          {TIMELINE.map((t) => (
            <Reveal key={t.what}>
              <div className="grid gap-1 border-b border-line py-6 sm:grid-cols-[6rem_1fr] sm:gap-8">
                <span className="font-mono text-sm text-pink">{t.when}</span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{t.what}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-clay">{t.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className="py-28 text-center sm:py-32">
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-pink">Contact</p>
          <a
            href={LINKS.email}
            className="mt-6 block font-display text-5xl text-ink underline decoration-blush decoration-4 underline-offset-[12px] transition-colors hover:text-pink sm:text-7xl"
          >
            Say hello.
          </a>
          <p className="mt-8 text-base text-clay">wkhan12@jh.edu · usually replies the same day</p>
        </Reveal>
      </section>
    </main>
  )
}

function WorkPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 sm:px-8">
      <section className="pt-16 sm:pt-20">
        <Reveal>
          <SectionTitle index="01">Work</SectionTitle>
        </Reveal>
        <div>
          {WORK.map((p, i) => (
            <WorkRow key={p.title} p={p} i={i} />
          ))}
        </div>
      </section>
      <section id="visualization" className="pt-24 sm:pt-28">
        <Reveal>
          <SectionTitle index="02">Visualization</SectionTitle>
        </Reveal>
        <div>
          {VIZ.map((p, i) => (
            <WorkRow key={p.title} p={p} i={i} />
          ))}
        </div>
      </section>

      <section id="research" className="pt-24 sm:pt-28">
        <Reveal>
          <SectionTitle index="03">Research</SectionTitle>
        </Reveal>
        <div>
          {RESEARCH.map((p, i) => (
            <WorkRow key={p.title} p={p} i={i} />
          ))}
        </div>
      </section>
      <section className="pt-24 sm:pt-28">
        <Reveal>
          <SectionTitle index="04">Also</SectionTitle>
        </Reveal>
        <div className="mt-4">
          {INDEX.map((r) => (
            <Reveal key={r.name}>
              <IndexRow r={r} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 text-center">
        <Reveal>
          <p className="text-[15px] text-clay">
            More experiments and tooling live on{' '}
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-blush decoration-2 underline-offset-4 hover:text-pink">
              GitHub
            </a>
            , including the ones still being packaged.
          </p>
        </Reveal>
      </section>
    </main>
  )
}

function ResumePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 sm:px-8">
      <section className="pt-16 sm:pt-20">
        <Reveal>
          <SectionTitle index="03">Resume</SectionTitle>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={LINKS.resumePdf}
            download="Waiz_Khan.pdf"
            className="border-2 border-ink bg-ink px-6 py-3 text-base font-medium text-cream transition-colors hover:border-pink hover:bg-pink"
          >
            Download PDF
          </a>
          <a
            href={LINKS.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-ink px-6 py-3 text-base text-ink transition-colors hover:border-pink hover:text-pink"
          >
            Open in new tab
          </a>
        </div>
        <div className="my-10 border-2 border-ink">
          <object data={LINKS.resumePdf} type="application/pdf" className="h-[85vh] w-full" aria-label="Waiz Khan resume PDF">
            <div className="p-10 text-center text-clay">
              <p>
                Your browser does not preview PDFs.{' '}
                <a href={LINKS.resumePdf} className="text-ink underline decoration-blush decoration-2 underline-offset-4 hover:text-pink">
                  Download the resume instead.
                </a>
              </p>
            </div>
          </object>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/myportfolio">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
