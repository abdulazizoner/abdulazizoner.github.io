export type ProjectStatus = 'ongoing' | 'prototype' | 'completed';

export type Project = {
  slug: string;
  pageId: string;
  title: string | { en: string; tr: string };
  status: ProjectStatus;
  problem: { en: string; tr: string };
  focus: { en: string; tr: string };
  tags: Array<string | { en: string; tr: string }>;
  seo: {
    en: { title: string; description: string };
    tr: { title: string; description: string };
  };
};

export const projects: Project[] = [
  {
    slug: 'trendai',
    pageId: 'trendai',
    title: 'TrendAI',
    status: 'ongoing',
    problem: {
      en: 'Researching and organizing AI models, tools, and trends is fragmented across many sources.',
      tr: 'YZ modelleri, araçları ve trendleri birçok kaynakta dağınık; organize etmek zor.',
    },
    focus: {
      en: '<strong>What I am building:</strong> A personal AI trend intelligence workspace with data ingestion, metadata organization, and RAG-based chat. Exploring Gemini API and vector retrieval. Early-stage — not a production product.',
      tr: '<strong>Geliştirdiklerim:</strong> Veri alma, metadata düzenleme ve RAG tabanlı sohbet içeren kişisel bir YZ trend istihbarat alanı. Gemini API ve vektör retrieval keşfi. Erken aşama — üretim ürünü değil.',
    },
    tags: [
      'RAG',
      { en: 'Data ingestion', tr: 'Veri alma' },
      'Gemini API',
      { en: 'Vector search', tr: 'Vektör arama' },
    ],
    seo: {
      en: {
        title: 'TrendAI — Case Study | Abdülaziz Öner',
        description:
          'Early-stage AI trend intelligence workspace with data ingestion, metadata organization, and RAG-based research chat.',
      },
      tr: {
        title: 'TrendAI — Proje İncelemesi | Abdülaziz Öner',
        description:
          'Veri alma, metadata düzenleme ve RAG tabanlı araştırma sohbeti içeren erken aşama YZ trend istihbarat alanı.',
      },
    },
  },
  {
    slug: 'legal-risk-nlp',
    pageId: 'legal',
    title: {
      en: 'Turkish Legal-Risk Text Classification',
      tr: 'Türkçe Hukuki Risk Metin Sınıflandırması',
    },
    status: 'prototype',
    problem: {
      en: 'Public Turkish social media text may need review for legal-risk signals, but automated decisions carry ethical and accuracy risks.',
      tr: 'Kamusal Türkçe sosyal medya metinleri hukuki risk sinyalleri için incelenebilir; otomatik kararlar etik ve doğruluk riski taşır.',
    },
    focus: {
      en: '<strong>What I am building:</strong> A decision-support prototype for NLP preprocessing, classification, and keyword matching — designed for <em>human review</em>, not automated reporting. KVKK/GDPR aware.',
      tr: '<strong>Geliştirdiklerim:</strong> NLP ön işleme, sınıflandırma ve anahtar kelime eşleştirmesi için karar destek prototipi — <em>insan incelemesi</em> için, otomatik bildirim değil. KVKK/GDPR farkındalığı.',
    },
    tags: [
      'NLP',
      { en: 'Turkish text', tr: 'Türkçe metin' },
      { en: 'Classification', tr: 'Sınıflandırma' },
      { en: 'Human-in-the-loop', tr: 'İnsan döngüsü' },
    ],
    seo: {
      en: {
        title: 'Turkish Legal-Risk NLP — Case Study | Abdülaziz Öner',
        description:
          'Prototype for Turkish social media text analysis with human-review support and ethical decision-support positioning.',
      },
      tr: {
        title: 'Türkçe Hukuki Risk NLP — Proje İncelemesi | Abdülaziz Öner',
        description:
          'İnsan incelemesini destekleyen Türkçe sosyal medya metin analizi prototipi.',
      },
    },
  },
  {
    slug: 'firatasistan',
    pageId: 'firat',
    title: 'FıratAsistan',
    status: 'ongoing',
    problem: {
      en: 'Students need reliable answers from scattered educational documents, but generic chatbots can hallucinate or ignore source context.',
      tr: 'Öğrenciler dağınık eğitim belgelerinden güvenilir yanıtlara ihtiyaç duyar; genel sohbet botları halüsinasyon üretebilir veya kaynak bağlamını yok sayabilir.',
    },
    focus: {
      en: '<strong>What I am building:</strong> A university-focused AI assistant concept with document ingestion, retrieval workflows, and source-grounded responses. RAG architecture, Turkish content, and production-readiness planning.',
      tr: '<strong>Geliştirdiklerim:</strong> Belge alma, retrieval iş akışları ve kaynak temelli yanıtlar içeren üniversite odaklı YZ asistan konsepti. RAG mimarisi, Türkçe içerik ve üretime hazırlık planlaması.',
    },
    tags: [
      'RAG',
      { en: 'Document ingestion', tr: 'Belge alma' },
      { en: 'Vector search', tr: 'Vektör arama' },
      { en: 'Turkish content', tr: 'Türkçe içerik' },
      { en: 'AI assistant', tr: 'YZ asistan' },
    ],
    seo: {
      en: {
        title: 'FıratAsistan — Case Study | Abdülaziz Öner',
        description:
          'University-focused AI assistant concept with document ingestion, retrieval workflows, and source-grounded responses.',
      },
      tr: {
        title: 'FıratAsistan — Proje İncelemesi | Abdülaziz Öner',
        description:
          'Belge alma, retrieval iş akışları ve kaynak temelli yanıtlar içeren üniversite odaklı YZ asistan konsepti.',
      },
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectTitle(project: Project, lang: 'en' | 'tr' = 'en'): string {
  return typeof project.title === 'string' ? project.title : project.title[lang];
}
