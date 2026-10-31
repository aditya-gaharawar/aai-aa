export interface SearchEntry {title:string;url:string;category:string;description:string;keywords?:string}
export function searchPages(pages:SearchEntry[],query:string,limit?:number):SearchEntry[];
