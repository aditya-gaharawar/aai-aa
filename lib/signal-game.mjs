export const DIRECTIONS = {up:[0,-1],right:[1,0],down:[0,1],left:[-1,0]};
export const ROUTES = [{seed:404,title:'The quiet detour'},{seed:2026,title:'Between the branches'},{seed:73,title:'The long way home'},{seed:1201,title:'Between frequencies'}];
export function createWorld(seed=404){
 const width=13,height=9;let n=seed>>>0;
 const random=()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};
 const walls=Array(width*height).fill(true);const start=width+1;walls[start]=false;const stack=[start];
 while(stack.length){const pos=stack.at(-1),x=pos%width,y=Math.floor(pos/width);
  const choices=Object.values(DIRECTIONS).map(([dx,dy])=>[x+dx*2,y+dy*2,dx,dy]).filter(([nx,ny])=>nx>0&&nx<width-1&&ny>0&&ny<height-1&&walls[ny*width+nx]);
  if(!choices.length){stack.pop();continue;}
  const [nx,ny,dx,dy]=choices[Math.floor(random()*choices.length)];walls[(y+dy)*width+x+dx]=false;walls[ny*width+nx]=false;stack.push(ny*width+nx);
 }
 const exit=(height-2)*width+width-2;
 const distance=(from)=>{const d=Array(walls.length).fill(-1),q=[from];d[from]=0;for(let i=0;i<q.length;i++)for(const [dx,dy] of Object.values(DIRECTIONS)){const p=q[i],x=p%width+dx,y=Math.floor(p/width)+dy,j=y*width+x;if(x>=0&&x<width&&y>=0&&y<height&&!walls[j]&&d[j]<0){d[j]=d[p]+1;q.push(j);}}return d;};
 const keys=[];let distances=distance(start);
 for(let i=0;i<3;i++){let best=-1,score=-1;for(let j=0;j<walls.length;j++){if(walls[j]||j===start||j===exit||keys.includes(j))continue;const s=distances[j];if(s>score){best=j;score=s;}}keys.push(best);const next=distance(best);distances=distances.map((d,j)=>Math.min(d,next[j]));}
 return {width,height,walls,start,exit,keys};
}
export function initialState(world){return {position:world.start,collected:0,moves:0,won:false};}
export function moveSignal(world,state,direction){
 const delta=DIRECTIONS[direction];if(!delta||state.won)return state;
 const x=state.position%world.width+delta[0],y=Math.floor(state.position/world.width)+delta[1],next=y*world.width+x;
 if(x<0||x>=world.width||y<0||y>=world.height||world.walls[next])return state;
 const key=world.keys.indexOf(next),collected=key>=0?state.collected|(1<<key):state.collected;
 return {position:next,collected,moves:state.moves+1,won:next===world.exit&&collected===7};
}
export function findRoute(world,state){
 if(state.won)return [];
 const queue=[{position:state.position,collected:state.collected,path:[]}],seen=new Set([`${state.position}:${state.collected}`]);
 for(let i=0;i<queue.length;i++){
  const node=queue[i];for(const direction of Object.keys(DIRECTIONS)){
   const next=moveSignal(world,{...node,moves:0,won:false},direction);if(next.position===node.position)continue;
   const path=[...node.path,direction];if(next.won)return path;
   const key=`${next.position}:${next.collected}`;if(!seen.has(key)){seen.add(key);queue.push({...next,path});}
  }
 }
 return [];
}
