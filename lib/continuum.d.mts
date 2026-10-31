import type {ResearchArticle} from './research';
export interface Journey {version:1;enabled:boolean;visits:Record<string,{first:number;last:number;count:number}>}
export interface Highlight {id:string;slug:string;section:string;paragraph:number;start:number;end:number;quote:string;color:'sun'|'sage'|'lilac';note:string;trashed:boolean}
export interface ReaderState {version:1;notes:Highlight[];progress:Record<string,number>;left:string;right:string;compare:boolean;font:'serif'|'sans';size:number}
export interface StoryChoice {id:string;label:string;detail:string;next:string;consequence:string}
export interface StoryNode {title:string;body:string;choices?:StoryChoice[];ending?:boolean;reflection?:string;article?:string}
export function cleanJourney(raw:unknown,routes:string[]):Journey;
export function visitRoute(state:Journey,route:string,now:number,routes:string[]):Journey;
export function validHighlight(raw:unknown,articles:ResearchArticle[]):Highlight|null;
export function cleanReader(raw:unknown,articles:ResearchArticle[]):ReaderState;
export function parseReaderImport(raw:unknown,articles:ResearchArticle[]):ReaderState;
export function highlightParts(text:string,notes:Highlight[]):{text:string;start:number;color:Highlight['color']|null}[];
export function storyTrail(nodes:Record<string,StoryNode>,history:unknown):{node:string;trail:{node:string;choice:string;label:string;consequence:string}[];history:string[]};
