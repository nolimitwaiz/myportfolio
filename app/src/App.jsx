import { useEffect, useRef, useState } from 'react'

const BASE = import.meta.env.BASE_URL
const PHOTO = `${BASE}photo.jpg`
const EMAIL = 'wkhan12@jh.edu'
const KOEHN = 'https://www.cs.jhu.edu/~phi/'
const ext = { target: '_blank', rel: 'noopener noreferrer' }

const ICONS = {
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
  cv: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></svg>,
  github: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" /></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>,
}

const LINKS = [
  ['mail', EMAIL, `mailto:${EMAIL}`],
  ['cv', 'CV (PDF)', `${BASE}Waiz_Khan.pdf`],
  ['github', 'GitHub', 'https://github.com/nolimitwaiz'],
  ['linkedin', 'LinkedIn', 'https://www.linkedin.com/in/waiz-khan-024529223'],
]

const TOC = [['about', 'About'], ['interests', 'Interests'], ['research', 'Research'], ['projects', 'Projects'], ['experience', 'Experience'], ['contact', 'Contact']]
// Sections without their own TOC entry light up the one above them.
const SPY = [['about', 'about'], ['interests', 'interests'], ['news', 'interests'], ['research', 'research'], ['projects', 'projects'], ['experience', 'experience'], ['education', 'experience'], ['contact', 'contact']]

// Interests web: x is a fraction of the width, y is in pixels.
const INTERESTS = [
  { id: 'mr', when: 'now', label: ['Multilingual', 'representation'], name: 'Multilingual representation', text: 'What a model keeps when the language, model family, or training method changes.', wide: [0.05, 58], narrow: [0.06, 58] },
  { id: 'lr', when: 'now', label: ['Low resource', 'language learning'], name: 'Low resource language learning', text: 'What can transfer from languages with lots of data without erasing the structure of languages with little.', wide: [0.1, 192], narrow: [0.08, 162] },
  { id: 'dec', when: 'now', label: ['Computational', 'decipherment'], name: 'Computational decipherment', text: 'Whether visual, statistical, and graph evidence can agree when the language itself has been lost.', wide: [0.26, 262], narrow: [0.42, 216] },
  { id: 'ev', when: 'now', label: ['Evaluation'], name: 'Evaluation', text: 'Which results survive frozen splits, contamination audits, and model families held out from the start.', wide: [0.28, 120], narrow: [0.46, 108] },
  { id: 'la', when: 'next', label: ['Learning', 'architectures'], name: 'Learning architectures', text: 'Whether a model can learn which computation to use and which parameters to update.', wide: [0.53, 62], narrow: [0.06, 318] },
  { id: 'mem', when: 'next', label: ['Memory and', 'continual learning'], name: 'Memory and continual learning', text: 'How a system can keep learning after deployment without forgetting, drifting, or hiding failure.', wide: [0.55, 200], narrow: [0.1, 420] },
  { id: 'neuro', when: 'next', label: ['NeuroAI'], name: 'NeuroAI', text: 'Which principles of human event memory are real computational ideas rather than loose analogies, tested against fMRI and MEG data.', wide: [0.75, 116], narrow: [0.48, 352] },
  { id: 'wm', when: 'next', label: ['World models and', 'robot learning'], name: 'World models and robot learning', text: 'When a learned representation becomes predictive enough to plan and act with.', wide: [0.74, 262], narrow: [0.42, 466] },
]
const EDGES = [['mr', 'lr'], ['mr', 'ev'], ['lr', 'ev'], ['lr', 'dec'], ['ev', 'dec'], ['mr', 'la'], ['ev', 'mem'], ['la', 'mem'], ['la', 'neuro'], ['mem', 'neuro'], ['mem', 'wm'], ['neuro', 'wm']]
const WEB = {
  wide: { height: 300, groups: [['NOW', 0.05, 16], ['NEXT', 0.53, 16]] },
  narrow: { height: 500, groups: [['NOW', 0.14, 16], ['NEXT', 0.14, 276]] },
}

const NEWS = [
  ['2026', <>Rebuilt the Ancient Script Decipherment project around leakage controlled evaluation; an audit removed about a third of near duplicate test material. <a href="https://github.com/nolimitwaiz/ancient-script-decipherment" {...ext}>Code</a></>],
  ['Apr 2026', 'Cofounded Arzaic and joined the Johns Hopkins Pava Center accelerator to build Iris.'],
  ['2026', <>Revisited my undergraduate absenteeism study with causal inference and budget constrained allocation. <a href="https://github.com/nolimitwaiz/attendopt" {...ext}>Code</a></>],
  ['Dec 2025', 'Joined CLSP as a research assistant with Philipp Koehn on an NSF project on the multilinguality of large language models.'],
  ['Aug 2024', 'Started the MSE in Data Science at Johns Hopkins.'],
]

const RESEARCH = [
  {
    title: 'Multilingual Representation',
    meta: 'Johns Hopkins CLSP, with Philipp Koehn and Kenton Murray · Since 2025',
    q: 'What does a language model share when the language changes?',
    summary: 'Language specific variation inside multilingual language models, studied across layers, languages, model families, and training methods.',
    status: 'Manuscript in preparation with Philipp Koehn',
    facts: '17 open models · 128 languages · 0.6B to 9B parameters · held out model families',
    more: [
      ['Why', 'Multilingual models can express the same meaning in many languages, but their internal representations still carry language specific structure. Understanding that structure can clarify what transfers across languages and what does not.'],
      ['Method', 'Representation level measurements are evaluated across NTREX 128 and Belebele, across model depth, model families, and training recipes. Predictions are set before experiments, and model families are held out during validation.'],
      ['Findings', 'Experiments examine depth structure in language specific variation and differences between training recipes. Downstream validation is ongoing; broad cross model claims remain provisional.'],
      ['What changed', 'Directly optimizing one representation metric exposed a shortcut. That shifted the work from treating the metric as a target to asking which measurements remain meaningful under intervention.'],
      ['Open question', 'Can representation level measurements become useful objectives for improving multilingual models?'],
    ],
  },
  {
    title: 'Computational Decipherment',
    meta: 'Johns Hopkins, ancient languages · Since 2026',
    q: 'What can we recover when even the language itself has been lost?',
    summary: 'Multimodal translation, unsupervised sign structure, and evaluation infrastructure for ancient scripts.',
    facts: 'BLEU 4: 30.3 · 12 corpora · ≈34% duplicate leakage found · 29 frozen splits',
    code: 'https://github.com/nolimitwaiz/ancient-script-decipherment',
    more: [
      ['Why', 'Computational decipherment is low resource learning at its limit. Data is scarce, scripts may be only partly understood, and evaluation can fail before the model does.'],
      ['Method', <>Image based hieroglyph translation, distributional and visual analysis of sign function, and frozen evaluation infrastructure across twelve ancient language corpora.
        <ul>
          <li>Translation: 61,000 examples across 15+ decoders and learning methods, including models that read carved sign images.</li>
          <li>Structure: distributional statistics and self supervised visual features for sign function discovery without labels or parallel text.</li>
          <li>Evaluation: twelve corpora, 29 frozen splits, preregistered runs, and contamination audits.</li>
        </ul></>],
      ['Findings', 'A hieroglyph translation study reached BLEU 4 of 30.3 on a 150 example held out set. An audit then found about 34% of the Egyptian evaluation data duplicated from training. On the rebuilt splits, label blind analysis still recovered sign function above chance (ARI 0.169, p = 0.0015).'],
      ['What changed', 'The leakage audit changed the research program. It became evaluation infrastructure: frozen partitions, preregistered runs, audit logs, and automated checks that block pretrained weights.'],
      ['Open question', 'Can translation, visual structure, and graph based evidence support one another without importing an answer from pretrained systems?'],
    ],
  },
  {
    title: 'Low Resource Language Learning',
    meta: 'Johns Hopkins, machine translation · Ongoing',
    q: 'What can a model learn when examples become scarce?',
    summary: 'Representation, transfer, translation, and evaluation when training data is uneven or scarce.',
    facts: 'cross lingual transfer · machine translation · evaluation',
    more: [
      ['Why', 'Modern language models learn from abundance. Most languages do not have it. Low resource research asks what fails first, what can transfer, and how improvement should be measured when benchmarks are small.'],
      ['Method', 'The work connects multilingual representation analysis with translation experiments, controlled comparisons, and evaluation designed for small or uneven datasets.'],
      ['Findings', 'The current evidence points toward transfer and evaluation as inseparable problems: a better score matters only when the test set, language coverage, and source of supervision are clear.'],
      ['Open question', 'How can higher resource languages help without erasing the structure of the language receiving the transfer?'],
    ],
  },
  {
    title: 'Causal ML for Education',
    meta: 'GD Goenka University, with Yogesh Kumar · 2022, revisited 2026',
    q: 'What changes when a prediction affects a person?',
    summary: 'Prediction, causal inference, and fixed budget allocation for chronic school absenteeism.',
    facts: '47,027 students · ROC AUC 0.841 vs 0.699 baseline · 2× impact vs random targeting',
    code: 'https://github.com/nolimitwaiz/attendopt',
    more: [
      ['Why', 'Predicting chronic absenteeism is only the beginning when the result may influence where limited student support is sent.'],
      ['Method', 'The original study was revisited with calibrated models, a causal test of school distance with refutation checks, and an integer program that allocates a fixed intervention budget, with Monte Carlo sensitivity analysis.'],
      ['Findings', 'The strongest model reached ROC AUC 0.841 against a 0.699 linear baseline. Under the stated intervention assumptions, optimized allocation doubled expected impact relative to random targeting.'],
      ['Open question', 'How should uncertainty in causal estimates and intervention effects change the allocation itself?'],
    ],
  },
]

const PROJECTS = [
  { title: 'Iris', note: 'Arzaic', text: 'An AI agent platform for ongoing patient care, with retrieval over a versioned patient record, tool use, and a safety judge that fails closed.', tags: 'gate → route → retrieve → generate → guard' },
  { title: 'OFX', href: 'https://github.com/nolimitwaiz/ofx-terminal', text: 'An interactive market data terminal with order book visualization and event replay.', tags: 'TypeScript · WebGL · market microstructure' },
  { title: 'NavRover', href: 'https://github.com/nolimitwaiz/navrover', text: 'A ROS 2 pipeline that turns robot navigation logs into labeled datasets.', tags: 'ROS 2 · Python · robot navigation' },
  { title: 'Klesis', href: 'https://github.com/nolimitwaiz/klesis', text: 'An offline messaging app that sends text between nearby devices through sound.', tags: 'PWA · Web Audio · ggwave' },
]

const EXPERIENCE = [
  ['Research Assistant, Johns Hopkins CLSP', 'Dec 2025 to now', 'Multilingual representation and computational decipherment with Philipp Koehn.'],
  ['Cofounder and CTO, Arzaic', 'Apr 2026 to now', 'Building Iris through the Johns Hopkins Pava Center accelerator.'],
  ['Vice Chair and Director, Heela', '2026 to now', 'Nonprofit supporting college access for refugee students.'],
  ['Research Assistant, GD Goenka University', '2022', 'Chronic absenteeism research with Yogesh Kumar.'],
]

const EDUCATION = [
  ['Johns Hopkins University', '2024 to 2027', 'MSE in Data Science, Department of Applied Mathematics and Statistics'],
  ['GD Goenka University', '2019 to 2023', 'BTech in Computer Science and Engineering'],
]

// W and K drawn as 9px squares on a 10px grid: [column, row] cells.
const MARK = [
  [0, 0], [4, 0], [0, 1], [4, 1], [0, 2], [4, 2], [0, 3], [2, 3], [4, 3], [0, 4], [2, 4], [4, 4], [0, 5], [2, 5], [4, 5], [1, 6], [3, 6],
  [6, 0], [10, 0], [6, 1], [9, 1], [6, 2], [8, 2], [6, 3], [7, 3], [6, 4], [8, 4], [6, 5], [9, 5], [6, 6], [10, 6],
]

function Portrait() {
  if (PHOTO) return <img className="avatar" src={PHOTO} alt="Waiz Khan" />
  return (
    <div className="mark" aria-hidden="true">
      <svg viewBox="0 0 110 70" fill="currentColor">{MARK.map(([c, r]) => <rect key={`${c}-${r}`} x={c * 10} y={r * 10} width="9" height="9" />)}</svg>
    </div>
  )
}

function useActiveSection() {
  const [active, setActive] = useState('about')
  useEffect(() => {
    const update = () => {
      let current = 'about'
      for (const [id, tocId] of SPY) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < innerHeight * 0.35) current = tocId
      }
      if (innerHeight + scrollY >= document.body.scrollHeight - 4) current = 'contact'
      setActive(current)
    }
    addEventListener('scroll', update, { passive: true })
    update()
    return () => removeEventListener('scroll', update)
  }, [])
  return active
}

function InterestWeb() {
  const box = useRef(null)
  const [width, setWidth] = useState(640)
  const [active, setActive] = useState('mr')
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)))
    observer.observe(box.current)
    return () => observer.disconnect()
  }, [])

  const mode = width >= 600 ? 'wide' : 'narrow'
  const { height, groups } = WEB[mode]
  const pos = Object.fromEntries(INTERESTS.map(item => [item.id, [item[mode][0] * width, item[mode][1]]]))
  const linked = new Set(EDGES.filter(edge => edge.includes(active)).flat())
  const current = INTERESTS.find(item => item.id === active)

  return (
    <div className="web" ref={box}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Research interests: four current areas linked to four next directions">
        <defs><pattern id="web-dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" className="dots" /></pattern></defs>
        <rect width={width} height={height} fill="url(#web-dots)" />
        {groups.map(([label, x, y]) => <text key={label} className="group-label" x={x * width} y={y}>{label}</text>)}
        {EDGES.map(([a, b]) => (
          <line key={a + b} className={`edge${a === active || b === active ? ' on' : ''}`} x1={pos[a][0]} y1={pos[a][1]} x2={pos[b][0]} y2={pos[b][1]} />
        ))}
        {INTERESTS.map(item => {
          const [x, y] = pos[item.id]
          const state = item.id === active ? ' active' : linked.has(item.id) ? '' : ' dim'
          return (
            <g key={item.id} className={`node ${item.when}${state}`} tabIndex="0" role="button" aria-label={item.name}
              onMouseEnter={() => setActive(item.id)} onFocus={() => setActive(item.id)} onClick={() => setActive(item.id)}>
              <circle cx={x} cy={y} r={item.id === active ? 9 : 7} />
              <text x={x + 15} y={y + 5 - (item.label.length - 1) * 8}>
                {item.label.map((line, i) => <tspan key={line} x={x + 15} dy={i ? 16 : 0}>{line}</tspan>)}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="web-note" aria-live="polite">
        <b>{current.name}</b><span className="when">{current.when === 'now' ? 'Working on now' : 'Where I want to go next'}</span>
        <p>{current.text}</p>
      </div>
      <p className="web-legend"><span><i className="now" />What I work on now</span><span><i />Where I want to go next</span></p>
      <ul className="sr-only">{INTERESTS.map(item => <li key={item.id}>{item.name}: {item.text}</li>)}</ul>
    </div>
  )
}

function Entry({ item }) {
  return (
    <article className="entry">
      <h3>{item.title}</h3>
      <p className="meta">{item.meta}</p>
      <p className="q">{item.q}</p>
      <p className="summary">{item.summary}</p>
      {item.status && <p className="status">{item.status}</p>}
      <p className="facts">{item.facts}</p>
      <div className="actions">
        {item.code && <a href={item.code} {...ext}>Code ↗</a>}
        <details>
          <summary>Details</summary>
          <div className="more">{item.more.map(([label, body]) => <div key={label}><h4>{label}</h4>{body}</div>)}</div>
        </details>
      </div>
    </article>
  )
}

function Rows({ items }) {
  return (
    <ul className="rows">
      {items.map(([title, when, text]) => <li key={title}><h3>{title}</h3><time>{when}</time><p>{text}</p></li>)}
    </ul>
  )
}

export default function App() {
  const active = useActiveSection()
  return (
    <div className="page">
      <aside className="side">
        <Portrait />
        <h1>Waiz Khan</h1>
        <p className="role">MSE Data Science<br />Johns Hopkins University<br />Center for Language and Speech Processing</p>
        <ul className="links">
          {LINKS.map(([icon, label, href]) => (
            <li key={icon}><a href={href} {...(href.startsWith('http') ? ext : {})}>{ICONS[icon]}{label}</a></li>
          ))}
        </ul>
        <ul className="toc" aria-label="On this page">
          {TOC.map(([id, label]) => <li key={id}><a href={`#${id}`} className={active === id ? 'active' : undefined}>{label}</a></li>)}
        </ul>
      </aside>

      <main>
        <section id="about" className="bio" aria-label="About">
          <p>I am a master's student in Data Science at Johns Hopkins University, where I do research at the Center for Language and Speech Processing with <a href={KOEHN} {...ext}>Philipp Koehn</a>.</p>
          <p>I study how models learn and represent language when data is uneven or scarce: what multilingual models share across languages, what can transfer to languages with little data, and what we can still recover when the language itself has been lost, as with ancient scripts. Across all of it I care about evaluation that holds up, with frozen splits, contamination audits, and predictions written down before the experiment runs.</p>
          <p className="quiet">Outside the lab, I cofounded Arzaic, where we build Iris, an AI system for ongoing patient care, and I serve as Vice Chair of <a href="https://heela.org" {...ext}>Heela</a>, a nonprofit that helps refugee students get to college.</p>
          <p className="notice">I am applying to PhD programs for Fall 2027. If our interests overlap, I would be glad to hear from you.</p>
        </section>

        <section id="interests">
          <h2>Research Interests</h2>
          <InterestWeb />
        </section>

        <section id="news">
          <h2>News</h2>
          <ul className="news">{NEWS.map(([when, text], i) => <li key={i}><time>{when}</time><span>{text}</span></li>)}</ul>
        </section>

        <section id="research">
          <h2>Research</h2>
          <div className="work">{RESEARCH.map(item => <Entry key={item.title} item={item} />)}</div>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <div className="projects">
            {PROJECTS.map(project => {
              const body = (
                <>
                  <h3>{project.title} <span>{project.href ? '↗' : project.note}</span></h3>
                  <p>{project.text}</p>
                  <p className="tags">{project.tags}</p>
                </>
              )
              return project.href
                ? <a key={project.title} className="card" href={project.href} {...ext}>{body}</a>
                : <div key={project.title} className="card">{body}</div>
            })}
          </div>
        </section>

        <section id="experience">
          <h2>Experience</h2>
          <Rows items={EXPERIENCE} />
        </section>

        <section id="education">
          <h2>Education</h2>
          <Rows items={EDUCATION} />
        </section>

        <section id="contact" className="contact">
          <h2>Contact</h2>
          <p>Email is the best way to reach me: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          <p className="address">Center for Language and Speech Processing<br />Johns Hopkins University<br />3400 N. Charles Street, Baltimore, MD 21218</p>
        </section>

        <footer>
          <span>Waiz Khan · Baltimore</span>
          <span>Updated November 2026</span>
        </footer>
      </main>
    </div>
  )
}
