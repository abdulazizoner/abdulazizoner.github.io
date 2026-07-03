import trendaiEn from '../case-studies/trendai-en.html?raw';
import trendaiTr from '../case-studies/trendai-tr.html?raw';
import legalRiskNlpEn from '../case-studies/legal-risk-nlp-en.html?raw';
import legalRiskNlpTr from '../case-studies/legal-risk-nlp-tr.html?raw';
import firatasistanEn from '../case-studies/firatasistan-en.html?raw';
import firatasistanTr from '../case-studies/firatasistan-tr.html?raw';
import { pagePath } from '@/utils/base';

export const caseStudyHtml: Record<string, { en: string; tr: string }> = {
  trendai: { en: trendaiEn.trim(), tr: trendaiTr.trim() },
  'legal-risk-nlp': { en: legalRiskNlpEn.trim(), tr: legalRiskNlpTr.trim() },
  firatasistan: { en: firatasistanEn.trim(), tr: firatasistanTr.trim() },
};

export function fixCaseStudyLinks(html: string): string {
  const home = pagePath('index.html#projects');
  return html.replaceAll('../index.html#projects', home);
}
