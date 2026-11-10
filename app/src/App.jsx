import { useEffect, useState } from 'react'

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
  ['cv', 'Resume (PDF)', `${BASE}Waiz_Khan.pdf?v=fef445a2`],
  ['github', 'GitHub', 'https://github.com/nolimitwaiz'],
  ['linkedin', 'LinkedIn', 'https://www.linkedin.com/in/waiz-khan-024529223'],
]

const TOC = [['about', 'About'], ['research', 'Research'], ['interests', 'Interests'], ['projects', 'Projects'], ['experience', 'Experience'], ['contact', 'Contact']]
// Education shares a navigation item with Experience.
const SPY = TOC.flatMap(([id]) => id === 'experience' ? [[id, id], ['education', id]] : [[id, id]])

const INTERESTS = [
  { id: 'representations', group: 'now', label: ['Multilingual', 'representations'], text: 'How language identity appears across model layers and families, and what changes when we intervene during training.', wide: [5, 22], narrow: [6, 21] },
  { id: 'transfer', group: 'now', label: ['Low-resource', 'language learning'], text: 'How languages with more training data can support languages with less, and how to tell when transfer helps.', wide: [8, 61], narrow: [54, 21] },
  { id: 'scripts', group: 'now', label: ['Computational', 'decipherment'], text: 'What models trained from scratch can learn from ancient text and rendered signs.', wide: [25, 82], narrow: [6, 40] },
  { id: 'evaluation', group: 'now', label: ['Evaluation'], text: 'How contamination audits, frozen test splits, and held-out model families change what results we can trust.', wide: [28, 42], narrow: [54, 40] },
  { id: 'learning', group: 'next', label: ['Learning and', 'inference'], text: 'How learning rules and choices about which computations to run affect what a model can learn and generalize.', wide: [54, 22], narrow: [6, 68] },
  { id: 'memory', group: 'next', label: ['Memory and', 'adaptation'], text: 'How systems can learn from new experiences without losing what they already know.', wide: [53, 63], narrow: [54, 68] },
  { id: 'cognition', group: 'next', label: ['Human cognition', 'and NeuroAI'], text: 'How comparisons between model representations, behavioral data, and neural data could help test ideas about learning and memory.', wide: [73, 42], narrow: [6, 88] },
  { id: 'world', group: 'next', label: ['World models', 'and robot learning'], text: 'How predictive models could support planning and action in robots and agents.', wide: [72, 83], narrow: [54, 88] },
]
const INTEREST_BY_ID = Object.fromEntries(INTERESTS.map(item => [item.id, item]))
const INTEREST_EDGES = [
  ['representations', 'transfer'], ['representations', 'evaluation'], ['transfer', 'scripts'], ['evaluation', 'scripts'],
  ['representations', 'learning'], ['evaluation', 'memory'], ['learning', 'memory'], ['learning', 'cognition'],
  ['memory', 'cognition'], ['memory', 'world'], ['cognition', 'world'],
]

const RESEARCH = [
  {
    id: 'language-factor-share',
    title: 'Measuring the Language Share of Multilingual Representations',
    status: 'First author · Under review at ICLR 2027',
    meta: 'Johns Hopkins University · With Philipp Koehn',
    summary: 'I developed Language Factor Share (LFS), a measure of how much variation in multilingual model representations is associated with language identity. LFS dipped in the middle layers of all 17 models in the primary analysis, but training models to lower it weakened cross-language alignment in our experiments.',
    more: [
      ['What LFS measures', 'LFS uses variance decomposition on representations of matched multilingual examples to estimate the share of variation associated with language identity. A low share does not mean a layer has lost all language information.'],
      ['Primary analysis', 'I built the pipeline to extract and compare layer representations from 17 open models ranging from 0.6B to 9B parameters. We also tested predictions on held-out model families.'],
      ['Training interventions', 'Lowering LFS directly reduced the statistic but also weakened cross-language alignment. This makes LFS useful for describing representations, but a lower value is not a reliable training goal on its own.'],
    ],
  },
  {
    id: 'ancient-script-modeling',
    title: 'Ancient-script modeling and evaluation',
    status: 'Ongoing research',
    meta: 'Johns Hopkins University · Advised by Philipp Koehn',
    summary: 'I trained character-level models from scratch on Hebrew, Coptic, and Greek, and compared rendered hieroglyphs with tokenized transliterations for Egyptian-to-German translation. I also audited data for overlap with training sets and built frozen evaluation splits for computational decipherment. The translation comparison is preliminary.',
    code: 'https://github.com/nolimitwaiz/ancient-script-decipherment',
    more: [
      ['Character-level language models', 'The Hebrew, Coptic, and Greek models each beat a bigram baseline on validation cross-entropy in single-seed runs. The frozen test sets were not used for these comparisons.'],
      ['Hieroglyph translation', 'Tokenized transliterations had lower validation loss than rendered hieroglyphs in the initial comparison. Model capacity and compute were not matched, so this does not settle which input representation works better.'],
      ['Contamination audit', 'The near-duplicate check removed 964 of 2,821 Earlier Egyptian test and validation examples (about 34%) because they overlapped with training data.'],
      ['Sign-function recovery', 'A separate experiment recovered some sign-function structure without using the labels for training (adjusted Rand index 0.169, above chance). This measures recovery of known structure, not decipherment of an unknown language.'],
    ],
  },
  {
    id: 'attendopt',
    title: 'AttendOpt: absenteeism prediction and intervention allocation',
    status: 'Research project · Begun in 2022, extended in 2026',
    meta: 'GD Goenka University · Began with Dr. Yogesh Kumar',
    summary: 'I built a pipeline to predict school absenteeism, check calibration, and study the effect of school distance using survey data. It also simulates how to allocate a fixed intervention budget under assumed effects. The allocation has not been validated in a field study.',
    code: 'https://github.com/nolimitwaiz/attendopt',
    more: [
      ['Prediction and calibration', 'On state-grouped splits of the IHDS-II student data, CatBoost reached 0.841 ROC-AUC versus 0.699 for logistic regression. Random forest had the lowest expected calibration error (0.039).'],
      ['Observational causal analysis', 'The school-distance analysis used refutation checks on a 1,000-row survey subset. It was a test of the method, not a definitive population estimate.'],
      ['Simulated allocation', 'The integer program returned about twice the modeled expected benefit of random allocation under the assumed intervention effects. This is a simulation result, not a measured improvement in attendance.'],
    ],
  },
]

const PROJECTS = [
  { title: 'Iris', note: 'Arzaic · In development', text: 'I built the data layer that combines records from multiple sources into one versioned patient record. Iris retrieves from that record, and automated checks trace generated claims back to the source records.' },
  { title: 'Order Book', href: 'https://github.com/nolimitwaiz/ofx-terminal', note: 'Ongoing personal project · TypeScript', text: 'A market-data pipeline that reconstructs live exchange order books, checks them against exchange snapshots, and stores normalized events for replay.' },
]

const MORE_PROJECTS = [
  ['NavRover', 'https://github.com/nolimitwaiz/navrover'],
  ['Klesis', 'https://github.com/nolimitwaiz/klesis'],
  ['GitHub', 'https://github.com/nolimitwaiz?tab=repositories'],
]

const EXPERIENCE = [
  ['Research Assistant, Johns Hopkins University', 'Dec 2025 – present', 'Multilingual representations and ancient-script modeling with Philipp Koehn.'],
  ['Co-Founder and CTO, Arzaic', 'Apr 2026 – present', 'Iris development through the Johns Hopkins Pava Center accelerator.'],
  ['Vice Chair and Director, Heela', '2026 – present', <>Leadership at <a href="https://heela.org" {...ext}>Heela</a>, a nonprofit supporting college access for refugee students.</>],
  ['Research Assistant, GD Goenka University', '2022', 'Chronic absenteeism research with Dr. Yogesh Kumar.'],
]

const EDUCATION = [
  ['Johns Hopkins University', 'Expected May 2027', 'M.S.E. in Data Science, Department of Applied Mathematics and Statistics'],
  ['GD Goenka University', '2019–2023', 'B.Tech. in Computer Science and Engineering'],
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
    addEventListener('resize', update)
    update()
    return () => {
      removeEventListener('scroll', update)
      removeEventListener('resize', update)
    }
  }, [])
  return active
}

function InterestWeb() {
  const [active, setActive] = useState(INTERESTS[0].id)
  const selected = INTEREST_BY_ID[active]

  return (
    <>
      <div className="interest-web" role="group" aria-label="Research interests map">
        <span className="web-group web-now">Current work</span>
        <span className="web-group web-next">Research directions</span>
        {['wide', 'narrow'].map(layout => (
          <svg key={layout} className={`web-lines web-${layout}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {INTEREST_EDGES.map(([from, to]) => {
              const [x1, y1] = INTEREST_BY_ID[from][layout]
              const [x2, y2] = INTEREST_BY_ID[to][layout]
              return <line key={`${from}-${to}`} className={active === from || active === to ? 'on' : undefined} x1={x1} y1={y1} x2={x2} y2={y2} vectorEffect="non-scaling-stroke" />
            })}
          </svg>
        ))}
        {INTERESTS.map(item => (
          <button key={item.id} type="button" className={`web-node ${item.group}`}
            style={{ '--x': `${item.wide[0]}%`, '--y': `${item.wide[1]}%`, '--small-x': `${item.narrow[0]}%`, '--small-y': `${item.narrow[1]}%` }}
            aria-label={`${item.label.join(' ')} (${item.group === 'now' ? 'current work' : 'research direction'})`}
            aria-pressed={active === item.id} aria-controls="interest-note"
            onClick={() => setActive(item.id)} onMouseEnter={() => setActive(item.id)}>
            <span className="web-marker" aria-hidden="true" />
            <span className="web-label" aria-hidden="true">{item.label.map(line => <span key={line}>{line}</span>)}</span>
          </button>
        ))}
      </div>
      <div className="web-note" id="interest-note" aria-live="polite">
        <h3>{selected.label.join(' ')}</h3>
        <p>{selected.text}</p>
      </div>
    </>
  )
}

function Entry({ item }) {
  return (
    <article className="entry" id={item.id}>
      <h3>{item.title}</h3>
      <p className="status">{item.status}</p>
      <p className="meta">{item.meta}</p>
      <p className="summary">{item.summary}</p>
      <div className="actions">
        {item.code && <a href={item.code} aria-label={`Code for ${item.title}`} {...ext}>Code <span aria-hidden="true">↗</span></a>}
        <details>
          <summary>Methods and results</summary>
          <div className="more">{item.more.map(([label, body]) => <div key={label}><h4>{label}</h4><p>{body}</p></div>)}</div>
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
        <p className="role">M.S.E. student in Data Science<br />Johns Hopkins University</p>
        <ul className="links">
          {LINKS.map(([icon, label, href]) => (
            <li key={icon}><a href={href} {...(href.startsWith('http') ? ext : {})}>{ICONS[icon]}{label}</a></li>
          ))}
        </ul>
        <nav aria-label="On this page">
          <ul className="toc">
            {TOC.map(([id, label]) => <li key={id}><a href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a></li>)}
          </ul>
        </nav>
      </aside>

      <main>
        <section id="about" className="bio" aria-label="About">
          <p>I’m a Data Science M.S.E. student in the Department of Applied Mathematics and Statistics at Johns Hopkins University and a research assistant with <a href={KOEHN} {...ext}>Philipp Koehn</a>.</p>
          <p>My current research is on multilingual model representations and ancient-script modeling. More broadly, I’m interested in how learning, inference, and memory support adaptation in models and people.</p>
          <p className="notice">Applying to PhD programs for Fall 2027.</p>
        </section>

        <section id="research">
          <h2>Selected Research</h2>
          <div className="work">{RESEARCH.map(item => <Entry key={item.id} item={item} />)}</div>
        </section>

        <section id="interests">
          <h2>Research Interests</h2>
          <InterestWeb />
        </section>

        <section id="projects">
          <h2>Selected Systems</h2>
          <div className="projects">
            {PROJECTS.map(project => (
              <article key={project.title} className="card">
                <h3>{project.href ? <a href={project.href} {...ext}>{project.title} <span aria-hidden="true">↗</span></a> : project.title}</h3>
                <p className="status">{project.note}</p>
                <p>{project.text}</p>
              </article>
            ))}
          </div>
          <div className="more-projects">
            <span>More projects</span>
            <ul>{MORE_PROJECTS.map(([title, href]) => <li key={title}><a href={href} {...ext}>{title} <span aria-hidden="true">↗</span></a></li>)}</ul>
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
          <p>If our research interests overlap, I’d be glad to hear from you at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
        </section>

        <footer>
          <span>Waiz Khan · Baltimore</span>
          <span>Updated November 2026</span>
        </footer>
      </main>
    </div>
  )
}
