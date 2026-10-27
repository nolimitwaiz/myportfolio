export const LINKS = {
  github: 'https://github.com/nolimitwaiz',
  linkedin: 'https://www.linkedin.com/in/waiz-khan-024529223',
  email: 'mailto:wkhan12@jh.edu',
  resumePdf: '/myportfolio/Waiz_Khan.pdf',
}

export const RESEARCH = [
  {
    slug: 'multilingual-representation',
    year: 2025,
    title: 'Multilingual Representation',
    brief: 'How multilingual models represent information across different languages.',
    meta: 'Johns Hopkins · Prof. Philipp Koehn · 2025–Present',
    question: 'What does a language model share when the language changes?',
    sections: [
      ['Overview', 'Multilingual models can express the same meaning in many languages, but their internal representations still carry language-specific structure. Understanding that structure can clarify what transfers across languages and what does not.'],
      ['Method', 'Representation-level measurements are evaluated across NTREX-128 and Belebele, across model depth, model families, and training recipes. The evaluation spans 17 open models from 0.6B to 8B parameters. Predictions are set before experiments, and model families are held out during validation.'],
      ['Findings', 'Experiments examine depth structure in language-specific variation and differences between training recipes. Directly optimizing one representation metric exposed a shortcut, which shifted the work toward asking which measurements remain meaningful under intervention. Downstream validation is ongoing; broad cross-model claims remain provisional.'],
      ['Open question', 'Can representation-level measurements become useful objectives for improving multilingual models?'],
    ],
  },
  {
    slug: 'low-resource-language-learning',
    year: 2025,
    title: 'Low-Resource Language Learning',
    brief: 'Machine translation and language learning when training data is limited.',
    meta: 'Johns Hopkins · Machine Translation · Ongoing',
    question: 'What can a model learn when examples become scarce?',
    sections: [
      ['Overview', 'Modern language models learn from abundance. Most languages do not have it. Low-resource research asks what fails first, what can transfer, and how improvement should be measured when benchmarks are small.'],
      ['Method', 'The work connects multilingual representation analysis with translation experiments, controlled comparisons, and evaluation designed for small or uneven datasets.'],
      ['Findings', 'The current evidence points toward transfer and evaluation as inseparable problems: a better score matters only when the test set, language coverage, and source of supervision are clear.'],
      ['Open question', 'How can higher-resource languages help without erasing the structure of the language receiving the transfer?'],
    ],
  },
  {
    slug: 'computational-decipherment',
    year: 2026,
    title: 'Computational Decipherment',
    brief: 'Finding linguistic structure in ancient writing systems using images, text, and graphs.',
    meta: 'Johns Hopkins · Ancient Languages · 2026–Present',
    question: 'What can we recover when even the language itself has been lost?',
    sections: [
      ['Overview', 'Computational decipherment is low-resource learning at its limit. Data is scarce, scripts may be only partly understood, and evaluation can fail before the model does.'],
      ['Method', 'The research combines image-based hieroglyph translation, distributional and visual analysis of sign function, and frozen evaluation infrastructure across eleven ancient-language corpora.'],
      ['Findings', 'A hieroglyph translation study reached BLEU-4 30.3 on a 150-example held-out set. Unsupervised sign-function clustering reached ARI 0.262 against a 0.0016 random floor. A later audit found about 34% near-duplicate leakage in standard splits, which turned the project toward evaluation infrastructure: frozen partitions, preregistered runs, and audit logs.'],
      ['Open question', 'Can translation, visual structure, and graph-based evidence support one another without importing an answer from pretrained systems?'],
    ],
    code: 'https://github.com/nolimitwaiz/ancient-script-decipherment',
  },
  {
    slug: 'human-systems',
    year: 2022,
    title: 'Causal ML & Education',
    brief: 'Predicting chronic absenteeism and allocating limited student support. Revisited in 2026.',
    meta: 'GD Goenka University · Dr. Yogesh Kumar · 2022, revisited 2026',
    question: 'What changes when a prediction affects a person?',
    sections: [
      ['Overview', 'Predicting chronic absenteeism is only the beginning when the result may influence where limited student support is sent.'],
      ['Method', 'The original study of 47,027 students was revisited with calibrated models, a causal test of school distance, and an integer program that allocates a fixed intervention budget.'],
      ['Findings', 'The strongest model reached ROC-AUC 0.841 against a 0.699 linear baseline. Under the stated intervention assumptions, optimized allocation doubled expected impact relative to random targeting.'],
      ['Open question', 'How should uncertainty in causal estimates and intervention effects change the allocation itself?'],
    ],
    code: 'https://github.com/nolimitwaiz/attendopt',
  },
]

export const PROJECTS = [
  { year: 2026, title: 'OFX', brief: 'A market-data terminal with order-book visualization and event replay.', href: 'https://github.com/nolimitwaiz/ofx-terminal' },
  { year: 2026, title: 'NavRover', brief: 'A ROS 2 pipeline that turns robot navigation logs into labeled datasets.', href: 'https://github.com/nolimitwaiz/navrover' },
  { year: 2026, title: 'Klesis', brief: 'An offline messaging app that sends text between nearby devices through sound.', href: 'https://github.com/nolimitwaiz/klesis' },
]

export const EXPERIENCE = [
  { role: 'Co-Founder & Founding Engineer', place: 'Arzaic', year: 2026, when: '2026–', detail: 'Building Iris, a healthcare agent for ongoing patient support.' },
  { role: 'Vice Chair & Director', place: 'Heela', year: 2026, when: '2026–', detail: 'A nonprofit supporting refugee students.' },
  { role: 'Graduate Researcher', place: 'Johns Hopkins University', year: 2025, when: '2025–', detail: 'Research with Prof. Philipp Koehn.' },
  { role: 'Research Assistant', place: 'GD Goenka University', year: 2022, when: '2022', detail: 'Research with Dr. Yogesh Kumar.' },
]
