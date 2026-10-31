export interface DeskState {version:1;collections:{id:string;name:string}[];assignments:Record<string,string>;notes:Record<string,string>;order:string[]}
export function emptyDesk():DeskState;
export function normalizeDesk(value:unknown,slugs:string[]):DeskState;
export function parseDeskImport(value:unknown,slugs:string[]):{saved:string[];desk:DeskState};
export function moveDeskStory(desk:DeskState,slug:string,collection:string):DeskState;
export function deleteDeskCollection(desk:DeskState,id:string):DeskState;
