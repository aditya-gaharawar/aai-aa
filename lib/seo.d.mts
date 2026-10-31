export interface SeoMeta {title:string;description:string;noindex:boolean;image:string;imageAlt:string;cardTitle?:string;section:string;path:string;url:string;imageUrl:string;article?:{title:string;date:string;author:string;category:string;art:string;readingMinutes:number}}
export const siteOrigin:string;
export const seoPages:Record<string,Omit<SeoMeta,'path'|'url'|'imageUrl'>>;
export function seoForPath(path:string):SeoMeta;
export function structuredData(meta:SeoMeta):Record<string,unknown>;
