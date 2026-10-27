export const LINKS = {
  resume: '/myportfolio/Waiz_Khan.pdf',
  email: 'mailto:wkhan12@jh.edu',
  emailText: 'wkhan12@jh.edu',
  github: 'https://github.com/nolimitwaiz',
  linkedin: 'https://www.linkedin.com/in/waiz-khan-024529223',
}

// Newest first. `work` lists research done in that role.
export const TIMELINE = [
  {
    when: '2026–',
    role: 'Co-Founder & Founding Engineer',
    place: 'Arzaic',
    detail: 'Building Iris, a healthcare agent for ongoing patient support.',
  },
  {
    when: '2026–',
    role: 'Vice Chair & Director',
    place: 'Heela',
    detail: 'A nonprofit supporting refugee students.',
  },
  {
    when: '2025–',
    role: 'Graduate Researcher',
    place: 'Johns Hopkins University',
    detail: 'With Prof. Philipp Koehn.',
    work: [
      { title: 'Computational Decipherment', text: 'Finding linguistic structure in ancient writing systems using images, text, and graphs.', href: 'https://github.com/nolimitwaiz/ancient-script-decipherment' },
      { title: 'Multilingual Representation', text: 'How multilingual language models represent information across 128 languages.' },
      { title: 'Low-Resource Language Learning', text: 'Machine translation and language learning when training data is limited.' },
    ],
  },
  {
    when: '2022',
    role: 'Research Assistant',
    place: 'GD Goenka University',
    detail: 'With Dr. Yogesh Kumar.',
    work: [
      { title: 'Causal ML & Education', text: 'Predicting chronic absenteeism and allocating limited student support. Revisited in 2026.', href: 'https://github.com/nolimitwaiz/attendopt' },
    ],
  },
]

export const PROJECTS = [
  { title: 'OFX', text: 'Market-data terminal with order-book visualization and event replay.', href: 'https://github.com/nolimitwaiz/ofx-terminal' },
  { title: 'NavRover', text: 'ROS 2 pipeline that turns robot navigation logs into labeled datasets.', href: 'https://github.com/nolimitwaiz/navrover' },
  { title: 'Klesis', text: 'Offline messaging between nearby devices through sound.', href: 'https://github.com/nolimitwaiz/klesis' },
]
