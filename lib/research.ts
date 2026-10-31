import data from '../content/research.json';
export interface ResearchSection {
  id: string;
  title: string;
  kind: string;
  paragraphs: string[];
  refs: number[];
  formula?: string;
  code?: string;
  table?: {columns: string[]; rows: string[][]};
}
export interface ResearchArticle {
  slug: string; title: string; subtitle: string; category: string; art: string;
  summary: string[]; sections: ResearchSection[];
  sources: {title: string; url: string; by: string; year: string}[];
  related: string[]; date: string; author: string; format: string; reviewed: string;
  readingMinutes: number; type: 'research' | 'company';
}
export const articles = data as ResearchArticle[];
export const researchArticles = articles.filter(a=>a.type==='research');
export const companyArticles = articles.filter(a=>a.type==='company');
export {siteOrigin} from './seo.mjs';
export function articleUrl(a: ResearchArticle){return `/blog/${a.slug}`;}
export function artUrl(a: ResearchArticle){return `/art/abstract/${a.art}.webp`;}
