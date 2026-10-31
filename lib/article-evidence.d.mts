import type {ResearchArticle} from './research';
export interface EvidencePassage {sectionId:string;title:string;text:string;refs:number[];kind:string}
export function answerFromArticle(article:ResearchArticle,question:string):{kind:string;passages:EvidencePassage[]};
