import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createWorld,initialState,moveSignal,findRoute,ROUTES,DIRECTIONS} from '../lib/signal-game.mjs';
import {TOKENS,attentionWeights} from '../lib/attention.mjs';
import {searchPages} from '../lib/site-search.mjs';
const pages=JSON.parse(fs.readFileSync(new URL('../content/search-index.json',import.meta.url),'utf8'));
test('every shipped maze can collect all three fragments and reach home',()=>{
 for(const route of ROUTES){const world=createWorld(route.seed);let state=initialState(world);const path=findRoute(world,state);assert.ok(path.length>3);for(const direction of path){const next=moveSignal(world,state,direction);assert.notEqual(next,state,'solution cannot hit walls');state=next;}assert.equal(state.collected,7);assert.equal(state.position,world.exit);assert.equal(state.won,true);assert.equal(state.moves,path.length);assert.deepEqual(findRoute(world,state),[]);assert.equal(moveSignal(world,state,'left'),state,'winning freezes the board');}
});
test('maze generation stays connected and solvable over 100 different seeds',()=>{
 for(let seed=1;seed<=100;seed++){const world=createWorld(seed);assert.equal(new Set(world.keys).size,3);assert.ok(world.keys.every(pos=>!world.walls[pos]&&pos!==world.start&&pos!==world.exit));const visited=new Set([world.start]),queue=[world.start];for(let i=0;i<queue.length;i++){for(const [dx,dy] of Object.values(DIRECTIONS)){const pos=queue[i],x=pos%world.width+dx,y=Math.floor(pos/world.width)+dy,p=y*world.width+x;if(x>=0&&x<world.width&&y>=0&&y<world.height&&!world.walls[p]&&!visited.has(p)){visited.add(p);queue.push(p);}}}assert.equal(visited.size,world.walls.filter(v=>!v).length);assert.ok(findRoute(world,initialState(world)).length>0);}
});
test('walls cannot be crossed and hints still work after a detour',()=>{
 const w=createWorld();let s=initialState(w);assert.equal(moveSignal(w,s,'up'),s);assert.equal(moveSignal(w,s,'left'),s);
 const first=findRoute(w,s)[0],opposite={up:'down',right:'left',down:'up',left:'right'};s=moveSignal(w,s,first);s=moveSignal(w,s,opposite[first]);assert.equal(s.position,w.start);let route=findRoute(w,s);for(const d of route)s=moveSignal(w,s,d);assert.ok(s.won);assert.ok(s.moves>route.length);
});
test('touch and keyboard direction names share valid unit grid movements',()=>{for(const [direction,[x,y]] of Object.entries(DIRECTIONS)){assert.equal(Math.abs(x)+Math.abs(y),1);assert.ok(['up','right','down','left'].includes(direction));}});
test('attention remains finite, positive and normalized across the full control range',()=>{
 for(const q of [[1,.1,.1],[.1,1,.1],[.1,.1,1]])for(let t=.1;t<=2.001;t+=.05){const w=attentionWeights(q,t);assert.equal(w.length,TOKENS.length);assert.ok(w.every(x=>Number.isFinite(x)&&x>0&&x<1));assert.ok(Math.abs(w.reduce((a,b)=>a+b,0)-1)<1e-12);}
 const entropy=w=>-w.reduce((s,x)=>s+x*Math.log(x),0);assert.ok(entropy(attentionWeights([1,.1,.1],.1))<entropy(attentionWeights([1,.1,.1],2)));
 assert.throws(()=>attentionWeights([1,.1,.1],0),RangeError);assert.throws(()=>attentionWeights([NaN,1,1]),RangeError);
});
test('search finds real research, policy and game destinations',()=>{
 assert.equal(searchPages(pages,'LOST SIGNAL')[0].url,'/lab/lost-signal');assert.ok(searchPages(pages,'privacy').some(p=>p.url==='/trust/policies/01-privacy-policy'));assert.ok(searchPages(pages,'GRPO').some(p=>p.url.includes('grpo')));assert.deepEqual(searchPages(pages,'  absolutely-no-matching-term  '),[]);assert.equal(searchPages(pages,'').length,8);assert.equal(searchPages(pages,'  ').length,8);assert.ok(searchPages(pages,'agent reliability').length>0);assert.equal(new Set(pages.map(p=>p.url)).size,pages.length);
});

test('reaching the portal without fragments does not finish the game',()=>{
 const world={width:5,height:5,walls:Array(25).fill(false),start:0,exit:1,keys:[6,12,18]};
 let state=moveSignal(world,initialState(world),'right');assert.equal(state.position,world.exit);assert.equal(state.won,false);
 state=moveSignal(world,{position:0,collected:7,moves:9,won:false},'right');assert.equal(state.won,true);assert.equal(state.moves,10);
});
