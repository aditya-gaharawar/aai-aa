// These helpers accept only known site data. No URLs, HTML, or external records are trusted.
export function cleanJourney(raw, routes){
 const allowed=new Set(routes), visits={};
 if(raw?.version===1&&raw.visits&&typeof raw.visits==='object')for(const [route,v] of Object.entries(raw.visits)){
  if(!allowed.has(route)||!v||!Number.isFinite(v.first)||!Number.isFinite(v.last)||v.first<0||v.last<v.first||v.last>8640000000000000)continue;
  visits[route]={first:v.first,last:v.last,count:Math.max(1,Math.min(9999,Math.floor(Number(v.count)||1)))};
 }
 return {version:1,enabled:raw?.version===1&&raw.enabled===true,visits};
}
export function visitRoute(state,route,now,routes){
 const clean=cleanJourney(state,routes), path=route.split(/[?#]/)[0];
 if(!clean.enabled||!routes.includes(path)||!Number.isFinite(now)||now<0)return clean;
 const prev=clean.visits[path];if(prev&&now-prev.last<2000)return clean;
 return {...clean,visits:{...clean.visits,[path]:{first:prev?.first??now,last:now,count:Math.min(9999,(prev?.count??0)+1)}}};
}
export function validHighlight(raw, articles){
 if(!raw||typeof raw.id!=='string'||!/^[a-zA-Z0-9_-]{1,100}$/.test(raw.id))return null;
 const article=articles.find(a=>a.slug===raw.slug),section=article?.sections.find(s=>s.id===raw.section),paragraph=section?.paragraphs[raw.paragraph];
 if(typeof paragraph!=='string'||!Number.isInteger(raw.paragraph)||!Number.isInteger(raw.start)||!Number.isInteger(raw.end)||raw.start<0||raw.end<=raw.start||raw.end>paragraph.length||paragraph.slice(raw.start,raw.end)!==raw.quote)return null;
 return {id:raw.id,slug:raw.slug,section:raw.section,paragraph:raw.paragraph,start:raw.start,end:raw.end,quote:raw.quote,color:['sun','sage','lilac'].includes(raw.color)?raw.color:'sun',note:typeof raw.note==='string'?raw.note.slice(0,4000):'',trashed:raw.trashed===true};
}
export function cleanReader(raw,articles){
 const slugs=articles.map(a=>a.slug),notes=[],ids=new Set();
 if(raw?.version===1&&Array.isArray(raw.notes))for(const item of raw.notes.slice(0,300)){const note=validHighlight(item,articles);if(note&&!ids.has(note.id)){notes.push(note);ids.add(note.id);}}
 const progress={};if(raw?.progress&&typeof raw.progress==='object')for(const [slug,value] of Object.entries(raw.progress)){if(slugs.includes(slug)&&Number.isFinite(value))progress[slug]=Math.max(0,Math.min(100,value));}
 return {version:1,notes,progress,left:slugs.includes(raw?.left)?raw.left:slugs[0],right:slugs.includes(raw?.right)?raw.right:slugs[1]??slugs[0],compare:raw?.compare===true,font:raw?.font==='sans'?'sans':'serif',size:Math.max(16,Math.min(24,Number(raw?.size)||19))};
}
export function parseReaderImport(raw,articles){if(raw?.format!=='webspaceai-quiet-library'||raw.version!==1||raw.reader?.version!==1)throw new Error('Choose a Quiet Library export (version 1).');return cleanReader(raw.reader,articles);}
export function highlightParts(text,notes){
 const relevant=notes.filter(n=>!n.trashed&&n.start>=0&&n.end<=text.length&&n.end>n.start).sort((a,b)=>a.start-b.start);
 const boundaries=[...new Set([0,text.length,...relevant.flatMap(n=>[n.start,n.end])])].sort((a,b)=>a-b);
 return boundaries.slice(0,-1).map((start,i)=>({text:text.slice(start,boundaries[i+1]),start,color:relevant.find(n=>n.start<=start&&n.end>=boundaries[i+1])?.color??null}));
}
export function storyTrail(nodes,history){
 const trail=[],choices=[];let id='arrival';
 for(const choiceId of Array.isArray(history)?history.slice(0,20):[]){const node=nodes[id],choice=node?.choices?.find(c=>c.id===choiceId);if(!choice||!nodes[choice.next])break;trail.push({node:id,choice:choice.id,label:choice.label,consequence:choice.consequence});choices.push(choice.id);id=choice.next;if(nodes[id].ending)break;}
 return {node:id,trail,history:choices};
}
