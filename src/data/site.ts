export const SITE = {
  name: "Abdülaziz Öner",
  brand: "Abdülaziz Öner",
  url: "https://abdulazizoner.github.io/",
  github: "https://github.com/abdulazizoner",
  linkedin: "https://www.linkedin.com/in/abdülaziz-öner/",
  huggingface: "https://huggingface.co/abdulazizoner",
  email: "mailto:abdulazizoner@gmail.com",
} as const;

export const navLinks = [
  { id: "about", en: "About", tr: "Hakkında" },
  { id: "skills", en: "Skills", tr: "Yetkinlikler" },
  { id: "education", en: "Education", tr: "Eğitim" },
  { id: "focus", en: "Interests", tr: "İlgi alanları" },
  { id: "contact", en: "Contact", tr: "İletişim" },
] as const;

export const hero = {
  badge: {
    en: "Elazığ, Türkiye · Open to internships",
    tr: "Elazığ, Türkiye · Staj fırsatlarına açık",
  },
  title: {
    en: "Artificial Intelligence & Data Engineering",
    tr: "Yapay Zeka ve Veri Mühendisliği",
  },
  lead: {
    en: "I am a third-year student at Fırat University. I work with Python and SQL, with an interest in understanding data and building useful software around it.",
    tr: "Fırat Üniversitesi’nde üçüncü sınıf öğrencisiyim. Python ve SQL ile çalışıyor; veriyi anlamaya ve bu veriden yararlanan yazılımlar geliştirmeye odaklanıyorum.",
  },
} as const;

export const about = {
  paragraphs: [
    {
      en: "My work starts with the data: where it comes from, how reliable it is, and what question it can help answer. I am developing my skills in data preparation, analysis and machine learning, with a particular interest in Turkish text and natural language processing.",
      tr: "Çalışmalarımda önce veriyi ele alıyorum: nereden geldiğini, ne kadar güvenilir olduğunu ve hangi soruya cevap verebileceğini. Veri hazırlama, analiz ve makine öğrenmesi alanlarında kendimi geliştiriyorum. Türkçe metinler ve doğal dil işleme özellikle ilgimi çekiyor.",
    },
    {
      en: "Alongside my degree, I completed GoIT’s Data Analyst training, covering SQL, visualization, KPI analysis and A/B testing. I also build and publish websites, gaining experience with version control, testing and software maintenance.",
      tr: "Lisans eğitimimin yanında GoIT Veri Analisti eğitimini tamamladım. Bu süreçte SQL, görselleştirme, KPI analizi ve A/B testleri üzerine çalıştım. Web siteleri geliştirip yayımlayarak sürüm kontrolü, test ve yazılım bakımı konusunda da deneyim kazanıyorum.",
    },
    {
      en: "I am early in my career. I value clear documentation, checking results against evidence, and understanding the choices behind an implementation. I am looking for opportunities to learn from a team and contribute to practical work in AI and data.",
      tr: "Kariyerimin başındayım. Açık dokümantasyona, sonuçları verilerle kontrol etmeye ve teknik tercihlerin nedenlerini anlamaya önem veriyorum. Bir ekipten öğrenebileceğim ve yapay zeka ile veri alanlarında somut katkı sunabileceğim fırsatlar arıyorum.",
    },
  ],
  tags: [
    { text: "Python · SQL" },
    { en: "Data analysis", tr: "Veri analizi", variant: "blue" as const },
    {
      en: "Natural language processing",
      tr: "Doğal dil işleme",
      variant: "indigo" as const,
    },
  ],
} as const;

export type SkillCard = {
  variant?: "emerald" | "indigo" | "amber";
  title: { en: string; tr: string };
  items: Array<string | { en: string; tr: string }>;
};

export const skills: SkillCard[] = [
  {
    title: { en: "Programming & Data", tr: "Programlama ve Veri" },
    items: [
      "Python",
      "SQL",
      "C",
      "Git / GitHub",
      { en: "Data preprocessing", tr: "Veri ön işleme" },
      { en: "Web scraping", tr: "Web kazıma" },
    ],
  },
  {
    variant: "emerald",
    title: { en: "AI / ML", tr: "YZ / ML" },
    items: [
      "NLP",
      { en: "Text classification", tr: "Metin sınıflandırma" },
      { en: "Sentiment analysis", tr: "Duygu analizi" },
      { en: "RAG fundamentals", tr: "RAG temelleri" },
      { en: "LLM API usage", tr: "LLM API kullanımı" },
    ],
  },
  {
    variant: "indigo",
    title: {
      en: "Data Engineering Fundamentals",
      tr: "Veri Mühendisliği Temelleri",
    },
    items: [
      { en: "Data ingestion", tr: "Veri alma" },
      { en: "Metadata organization", tr: "Üst veri düzenleme" },
      { en: "Retrieval workflows", tr: "Bilgi erişimi iş akışları" },
      { en: "Vector retrieval", tr: "Vektör tabanlı bilgi erişimi" },
    ],
  },
  {
    variant: "amber",
    title: {
      en: "Analytics & Visualization",
      tr: "Analitik ve Görselleştirme",
    },
    items: [
      { en: "KPI analysis", tr: "KPI analizi" },
      { en: "A/B testing", tr: "A/B test" },
      "Power BI",
      "Tableau",
      "Looker Studio",
    ],
  },
  {
    title: { en: "Tools", tr: "Araçlar" },
    items: [
      "Jupyter",
      "Poetry / pip",
      { en: "Docker basics", tr: "Docker temelleri" },
      { en: "Markdown docs", tr: "Markdown dokümantasyon" },
      { en: "Static deployment", tr: "Statik dağıtım" },
    ],
  },
];

export const education = [
  {
    title: {
      en: "B.Sc. Artificial Intelligence and Data Engineering",
      tr: "Lisans — Yapay Zeka ve Veri Mühendisliği",
    },
    org: "Fırat University",
    period: { en: "2024 — Present", tr: "2024 — Devam ediyor" },
    description: {
      en: "Undergraduate program focused on AI, data engineering, machine learning, and software foundations for data-intensive systems.",
      tr: "YZ, veri mühendisliği, makine öğrenmesi ve veri yoğun sistemler için yazılım temellerine odaklanan lisans programı.",
    },
  },
  {
    title: { en: "Data Analyst Certificate", tr: "Veri Analisti Sertifikası" },
    org: "GoIT",
    period: { en: "Completed", tr: "Tamamlandı" },
    description: {
      en: "Practical training in SQL, data analysis, visualization (Power BI, Tableau), KPI tracking, and A/B testing fundamentals.",
      tr: "SQL, veri analizi, görselleştirme (Power BI, Tableau), KPI takibi ve A/B test temellerinde pratik eğitim.",
    },
  },
] as const;

export const focusItems = [
  {
    en: "Source-grounded AI systems and retrieval quality",
    tr: "Kaynak temelli YZ sistemleri ve bilgi erişiminin kalitesi",
  },
  {
    en: "NLP pipelines for Turkish text",
    tr: "Türkçe metin için doğal dil işleme",
  },
  {
    en: "Data ingestion, organization, and metadata design",
    tr: "Veri alma, organizasyon ve metadata tasarımı",
  },
  {
    en: "Clean documentation and deployment practices",
    tr: "Temiz dokümantasyon ve dağıtım pratikleri",
  },
] as const;

export const footerTagline = {
  en: "Artificial Intelligence & Data Engineering",
  tr: "Yapay Zeka ve Veri Mühendisliği",
} as const;
