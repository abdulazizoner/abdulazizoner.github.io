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
  {
    id: "skills",
    en: "Skills & Interests",
    tr: "Yetkinlikler ve İlgi Alanları",
  },
  { id: "education", en: "Education", tr: "Eğitim" },
] as const;

export const hero = {
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
  description: { en: string; tr: string };
  items: Array<string | { en: string; tr: string }>;
};

export const skills: SkillCard[] = [
  {
    title: { en: "Programming & Data", tr: "Programlama ve Veri" },
    description: {
      en: "I use Python and SQL to collect, clean and explore data, and C to develop my programming foundations.",
      tr: "Python ve SQL ile veri toplama, temizleme ve keşif analizi üzerine çalışıyorum. C ile programlama temellerimi geliştiriyorum.",
    },
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
    description: {
      en: "I work on Turkish text classification and sentiment analysis. My learning priorities include source-grounded language models and evaluating their responses.",
      tr: "Türkçe metin sınıflandırma ve duygu analizi üzerine çalışıyorum. Kaynaklara dayalı dil modelleri ve yanıtlarının değerlendirilmesi öğrenme önceliklerim arasında.",
    },
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
    description: {
      en: "I am developing my understanding of data ingestion, metadata and search, including vector-based retrieval for document-grounded applications.",
      tr: "Veri alma, üst veri düzenleme ve arama konularında kendimi geliştiriyorum. Belgeye dayalı uygulamalarda vektör tabanlı bilgi erişimine ilgi duyuyorum.",
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
    description: {
      en: "I use SQL and visualization tools to examine performance indicators and communicate findings. My training covered KPI analysis and A/B testing.",
      tr: "Performans göstergelerini incelemek ve bulguları aktarmak için SQL ve görselleştirme araçlarını kullanıyorum. Eğitimimde KPI analizi ve A/B testleri üzerine çalıştım.",
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
    description: {
      en: "I use Git for version control and Jupyter for exploration. I focus on reproducible environments, clear documentation and testing.",
      tr: "Sürüm kontrolünde Git, veri keşfinde Jupyter kullanıyorum. Tekrarlanabilir çalışma ortamlarına, açık dokümantasyona ve testlere önem veriyorum.",
    },
    items: [
      "Jupyter",
      "Poetry / pip",
      { en: "Docker basics", tr: "Docker temelleri" },
      { en: "Markdown docs", tr: "Markdown dokümantasyon" },
      { en: "Static deployment", tr: "Statik dağıtım" },
    ],
  },
  {
    title: {
      en: "Web Development & Publishing",
      tr: "Web Geliştirme ve Yayınlama",
    },
    description: {
      en: "I build and publish websites with HTML, CSS and JavaScript. I am improving my practice in responsive design, accessibility and browser testing.",
      tr: "HTML, CSS ve JavaScript ile web siteleri geliştirip yayımlıyorum. Mobil uyum, erişilebilirlik ve tarayıcı testleri konusunda deneyimimi artırıyorum.",
    },
    items: [
      "HTML / CSS",
      "JavaScript",
      "Astro",
      "GitHub Pages",
      { en: "Responsive design", tr: "Mobil uyumlu tasarım" },
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
