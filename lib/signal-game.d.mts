export type Direction='up'|'right'|'down'|'left';
export interface World {width:number;height:number;walls:boolean[];start:number;exit:number;keys:number[]}
export interface SignalState {position:number;collected:number;moves:number;won:boolean}
export const DIRECTIONS:Record<Direction,[number,number]>;
export const ROUTES:{seed:number;title:string}[];
export function createWorld(seed?:number):World;
export function initialState(world:World):SignalState;
export function moveSignal(world:World,state:SignalState,direction:Direction):SignalState;
export function findRoute(world:World,state:SignalState):Direction[];
