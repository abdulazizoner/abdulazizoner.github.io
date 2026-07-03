export const SITE = {
  name: 'Abdülaziz Öner',
  brand: 'abdulaziz.oner',
  url: 'https://abdulazizoner.github.io/Aonware.ai/',
  github: 'https://github.com/abdulazizoner',
  linkedin: 'https://www.linkedin.com/in/abdülaziz-öner/',
  email: 'mailto:abdulazizoner@gmail.com',
} as const;

export const navLinks = [
  { id: 'about', en: 'About', tr: 'Hakkında' },
  { id: 'skills', en: 'Skills', tr: 'Yetkinlikler' },
  { id: 'projects', en: 'Projects', tr: 'Projeler' },
  { id: 'education', en: 'Education', tr: 'Eğitim' },
  { id: 'focus', en: 'Focus', tr: 'Odak' },
] as const;

export const hero = {
  badge: {
    en: 'Open to internship & junior AI-data roles',
    tr: 'Staj & junior AI-veri rollerine açık',
  },
  title: {
    en: 'AI & Data Engineering Student',
    tr: 'Yapay Zeka ve Veri Mühendisliği Öğrencisi',
  },
  lead: {
    en: 'I build and learn through applied AI projects — data ingestion, NLP pipelines, retrieval workflows, and analytics-driven prototypes. Currently studying AI & Data Engineering at Fırat University, with a solid analytics foundation from the GoIT Data Analyst Certificate.',
    tr: "Uygulamalı yapay zeka projeleriyle öğreniyor ve gelişiyorum — veri alma, NLP hatları, retrieval iş akışları ve analitik odaklı prototipler. Fırat Üniversitesi'nde Yapay Zeka ve Veri Mühendisliği okuyorum; GoIT Veri Analisti Sertifikası analitik temelimi destekliyor.",
  },
} as const;

export const about = {
  paragraphs: [
    {
      en: 'I am an <strong>AI & Data Engineering student</strong> at <strong>Fırat University</strong> (2024–present), learning to design data systems and applied AI workflows through hands-on projects. My main interests are NLP, retrieval-augmented generation (RAG), data ingestion, and turning structured analysis into useful product prototypes.',
      tr: "<strong>Fırat Üniversitesi</strong>'nde (2024–günümüz) <strong>Yapay Zeka ve Veri Mühendisliği</strong> öğrencisiyim. Veri sistemleri ve uygulamalı yapay zeka iş akışlarını projelerle öğreniyorum. Ana ilgi alanlarım NLP, retrieval-augmented generation (RAG), veri alma ve yapılandırılmış analizi kullanılabilir prototiplere dönüştürmek.",
    },
    {
      en: 'I completed the <strong>GoIT Data Analyst Certificate</strong>, which gave me a practical foundation in SQL, KPI analysis, visualization, and A/B testing — skills I now apply alongside Python and ML-oriented work. I am early in my career path and focused on building credible project work, clean documentation, and steady technical growth.',
      tr: "<strong>GoIT Veri Analisti Sertifikası</strong>'nı tamamladım; SQL, KPI analizi, görselleştirme ve A/B test temelleri kazandım. Bu becerileri Python ve ML odaklı çalışmalarımla birlikte kullanıyorum. Kariyerimin başındayım; güvenilir proje çıktıları, temiz dokümantasyon ve sürekli teknik gelişime odaklanıyorum.",
    },
  ],
  tags: [
    { text: 'Fırat University' },
    { en: 'AI & Data Engineering', tr: 'Yapay Zeka ve Veri Mühendisliği', variant: 'blue' as const },
    { en: 'Applied AI & NLP', tr: 'Uygulamalı YZ ve NLP', variant: 'indigo' as const },
  ],
} as const;

export type SkillCard = {
  variant?: 'emerald' | 'indigo' | 'amber';
  title: { en: string; tr: string };
  items: Array<string | { en: string; tr: string }>;
};

export const skills: SkillCard[] = [
  {
    title: { en: 'Programming & Data', tr: 'Programlama ve Veri' },
    items: [
      'Python',
      'SQL',
      'C',
      'Git / GitHub',
      { en: 'Data preprocessing', tr: 'Veri ön işleme' },
      { en: 'Web scraping', tr: 'Web kazıma' },
    ],
  },
  {
    variant: 'emerald',
    title: { en: 'AI / ML', tr: 'YZ / ML' },
    items: [
      'NLP',
      { en: 'Text classification', tr: 'Metin sınıflandırma' },
      { en: 'Sentiment analysis', tr: 'Duygu analizi' },
      { en: 'RAG fundamentals', tr: 'RAG temelleri' },
      { en: 'LLM API usage', tr: 'LLM API kullanımı' },
    ],
  },
  {
    variant: 'indigo',
    title: { en: 'Data Engineering Fundamentals', tr: 'Veri Mühendisliği Temelleri' },
    items: [
      { en: 'Data ingestion', tr: 'Veri alma' },
      { en: 'Metadata organization', tr: 'Metadata düzenleme' },
      { en: 'Retrieval workflows', tr: 'Retrieval iş akışları' },
      { en: 'Vector retrieval', tr: 'Vektör retrieval' },
    ],
  },
  {
    variant: 'amber',
    title: { en: 'Analytics & Visualization', tr: 'Analitik ve Görselleştirme' },
    items: [
      { en: 'KPI analysis', tr: 'KPI analizi' },
      { en: 'A/B testing', tr: 'A/B test' },
      'Power BI',
      'Tableau',
      'Looker Studio',
    ],
  },
  {
    title: { en: 'Tools', tr: 'Araçlar' },
    items: [
      'Jupyter',
      'Poetry / pip',
      { en: 'Docker basics', tr: 'Docker temelleri' },
      { en: 'Markdown docs', tr: 'Markdown dokümantasyon' },
      { en: 'Static deployment', tr: 'Statik dağıtım' },
    ],
  },
];

export const education = [
  {
    title: {
      en: 'B.Sc. Artificial Intelligence and Data Engineering',
      tr: 'Lisans — Yapay Zeka ve Veri Mühendisliği',
    },
    org: 'Fırat University',
    period: { en: '2024 — Present', tr: '2024 — Devam ediyor' },
    description: {
      en: 'Undergraduate program focused on AI, data engineering, machine learning, and software foundations for data-intensive systems.',
      tr: 'YZ, veri mühendisliği, makine öğrenmesi ve veri yoğun sistemler için yazılım temellerine odaklanan lisans programı.',
    },
  },
  {
    title: { en: 'Data Analyst Certificate', tr: 'Veri Analisti Sertifikası' },
    org: 'GoIT',
    period: { en: 'Completed', tr: 'Tamamlandı' },
    description: {
      en: 'Practical training in SQL, data analysis, visualization (Power BI, Tableau), KPI tracking, and A/B testing fundamentals.',
      tr: 'SQL, veri analizi, görselleştirme (Power BI, Tableau), KPI takibi ve A/B test temellerinde pratik eğitim.',
    },
  },
] as const;

export const focusItems = [
  {
    en: 'Source-grounded AI systems and retrieval quality',
    tr: 'Kaynak temelli YZ sistemleri ve retrieval kalitesi',
  },
  {
    en: 'NLP pipelines for Turkish text',
    tr: 'Türkçe metin için NLP hatları',
  },
  {
    en: 'Data ingestion, organization, and metadata design',
    tr: 'Veri alma, organizasyon ve metadata tasarımı',
  },
  {
    en: 'Clean documentation and deployment practices',
    tr: 'Temiz dokümantasyon ve dağıtım pratikleri',
  },
] as const;

export const footerTagline = {
  en: 'Built for open learning.',
  tr: 'Herkese açık öğrenme için inşa edildi.',
} as const;
