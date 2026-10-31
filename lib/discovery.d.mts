export const FRAGMENTS:{id:string;letter:string;title:string;clue:string;url:string}[];
export const RADIO_STATIONS:{frequency:number;name:string;tag:string;text:string;url:string;link:string}[];
export function cleanFragments(value:unknown):string[];
export function isDiscovered(value:unknown):boolean;
export function radioStation(frequency:number):typeof RADIO_STATIONS[number]|null;
