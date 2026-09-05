export const LINKS = {
  github: 'https://github.com/nolimitwaiz',
  linkedin: 'https://www.linkedin.com/in/waiz-khan-024529223',
  email: 'mailto:wkhan12@jh.edu',
  resumePdf: '/myportfolio/Waiz_Khan.pdf',
}

export const RESEARCH = [
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

export const DIRECTIONS = [
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

export const THOUGHT_NODES = [
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

export const THOUGHT_EDGES = [
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

export const PROJECTS = [
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
    title: 'Ancient Script Decipherment',
    line: 'Leakage-controlled evaluation infrastructure for ancient-script decipherment.',
    terms: ['Python', 'PyTorch', 'data provenance', 'frozen evaluation'],
    href: 'https://github.com/nolimitwaiz/ancient-script-decipherment',
  },
]

export const EXPERIENCE = [
  {
    when: '2026–Present',
    role: 'Co-Founder & Founding Engineer',
    place: 'Arzaic',
    detail: 'Building Iris, a healthcare agent architecture for longitudinal patient support: auditable state, retrieval, tool use, and safety checks.',
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
