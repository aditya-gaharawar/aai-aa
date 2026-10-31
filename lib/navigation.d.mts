export interface Experience {n:string;name:string;line:string;description:string;url:string;symbol:string;color:string;type:string;group:string}
export const LAB_GROUPS:string[];
export function routePath(value:unknown):string;
export function routeWithin(route:string,parent:string):boolean;
export function primarySection(route:string):string|null;
export function filterExperiences(items:Experience[],group:string,query:string):Experience[];
export function labSelection(query:Record<string,unknown>):{group:string;q:string};
export function experienceNeighbors(items:Experience[],route:string):{current:Experience;related:Experience[]}|null;
