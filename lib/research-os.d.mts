export type OSApp='library'|'notebook'|'radio'|'lab'|'map'|'desk'|'game'|'welcome'|'article'|'reader'|'observatory'|'story'|'time';
export interface OSBounds {width:number;height:number}
export interface OSWindow {id:string;app:OSApp;slug?:string;x:number;y:number;w:number;h:number;minimized:boolean;maximized:boolean}
export interface OSNote {id:string;title:string;body:string;slug:string|null;trashed:boolean}
export interface Workspace {version:1;wallpaper:'sage'|'dusk'|'paper';windows:OSWindow[];notes:OSNote[];selectedNote:string|null}
export const OS_APPS:{id:OSApp;name:string;symbol:string;description:string;color:string}[];
export function fitWindow(win:OSWindow,bounds:OSBounds):OSWindow;
export function defaultWorkspace(bounds?:OSBounds):Workspace;
export function normalizeWorkspace(value:unknown,slugs:string[],bounds?:OSBounds):Workspace;
export function focusWindow(state:Workspace,id:string):Workspace;
export function openWindow(state:Workspace,app:OSApp,bounds:OSBounds,slug?:string):Workspace;
export function changeWindow(state:Workspace,id:string,patch:Partial<OSWindow>,bounds:OSBounds):Workspace;
export function closeWindow(state:Workspace,id:string):Workspace;
export function tileTwo(state:Workspace,bounds:OSBounds):Workspace;
export function parseWorkspaceImport(value:unknown,slugs:string[],bounds:OSBounds):Workspace;
