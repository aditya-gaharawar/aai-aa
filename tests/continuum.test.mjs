import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {cleanJourney,visitRoute,validHighlight,cleanReader,parseReaderImport,highlightParts,storyTrail} from '../lib/continuum.mjs';
import {OS_APPS,defaultWorkspace,openWindow,normalizeWorkspace} from '../lib/research-os.mjs';
const articles=JSON.parse(fs.readFileSync(new URL('../content/research.json',import.meta.url))),nodes=JSON.parse(fs.readFileSync(new URL('../content/unanswered.json',import.meta.url))),timeline=JSON.parse(fs.readFileSync(new URL('../content/research-timeline.json',import.meta.url)));
const a=articles[0],section=a.sections[0],text=section.paragraphs[0];const note={id:'test-passage',slug:a.slug,section:section.id,paragraph:0,start:3,end:30,quote:text.slice(3,30),color:'sage',note:'My question',trashed:false};
test('observatory is opt-in, strips query and fragment data, and ignores unknown paths',()=>{
 const routes=['/','/blog/test'];let state=cleanJourney(null,routes);assert.equal(state.enabled,false);assert.deepEqual(visitRoute(state,'/',1000,routes).visits,{});state.enabled=true;state=visitRoute(state,'/blog/test?secret=discard#selection',3000,routes);assert.deepEqual(Object.keys(state.visits),['/blog/test']);assert.equal(state.visits['/blog/test'].count,1);assert.equal(visitRoute(state,'/blog/test',3100,routes).visits['/blog/test'].count,1);state=visitRoute(state,'/blog/test',6000,routes);assert.equal(state.visits['/blog/test'].count,2);assert.deepEqual(visitRoute(state,'https://example.com',9000,routes).visits,state.visits);state.enabled=false;assert.deepEqual(visitRoute(state,'/',10000,routes).visits,state.visits);
});
test('journey restore rejects unknown routes and dates that cannot be displayed',()=>{
 const result=cleanJourney({version:1,enabled:true,visits:{'/':{first:10,last:100,count:5},'/unknown':{first:1,last:2},'/bad':{first:5,last:1},'/huge':{first:1,last:1e20}}},['/','/bad','/huge']);assert.deepEqual(Object.keys(result.visits),['/']);assert.equal(result.enabled,true);assert.equal(cleanJourney({version:2,enabled:true},['/']).enabled,false);
});
test('highlights remain anchored to exact text and reject invalid range, article, or paragraph references',()=>{
 assert.equal(validHighlight(note,articles).quote,note.quote);for(const patch of [{start:-1},{end:text.length+1},{end:3},{start:3.5},{quote:'invented'},{paragraph:'0'},{paragraph:999},{section:'unknown'},{slug:'unknown'},{id:'bad id'}])assert.equal(validHighlight({...note,...patch},articles),null,JSON.stringify(patch));
});
test('overlapping highlights preserve every character without duplicating or dropping text',()=>{
 const second={...note,id:'second',start:12,end:40,quote:text.slice(12,40),color:'lilac'};const parts=highlightParts(text,[note,second]);assert.equal(parts.map(p=>p.text).join(''),text);assert.ok(parts.some(p=>p.color==='sage'));assert.ok(parts.some(p=>p.color==='lilac'));assert.equal(highlightParts(text,[{...note,trashed:true}]).length,1);assert.equal(highlightParts(text,[{...note,trashed:true}])[0].color,null);
});
test('Quiet Library imports validate passages, bound notes, preserve trash, and require an explicit format',()=>{
 const original={...cleanReader(null,articles),notes:[{...note,trashed:true}],compare:true,left:articles[2].slug,right:a.slug,progress:{[a.slug]:44},font:'sans',size:22};const restored=parseReaderImport(JSON.parse(JSON.stringify({format:'webspaceai-quiet-library',version:1,reader:original})),articles);assert.deepEqual(restored,original);assert.throws(()=>parseReaderImport({reader:original},articles));assert.throws(()=>parseReaderImport({format:'webspaceai-quiet-library',version:2,reader:original},articles));const normalized=cleanReader({...original,notes:[note,note,{...note,id:'other',note:'x'.repeat(6000)}],progress:{[a.slug]:999,unknown:60}},articles);assert.equal(normalized.notes.length,2);assert.equal(normalized.notes[1].note.length,4000);assert.equal(normalized.progress[a.slug],100);assert.equal(normalized.progress.unknown,undefined);
});
test('every story choice reaches a real node, all paths terminate, and all four endings are reachable',()=>{
 const endings=new Set();function walk(id,path=[]){assert.ok(nodes[id],id);assert.ok(!path.includes(id),'Unintended cycle');const node=nodes[id];if(node.ending){endings.add(id);assert.ok(articles.some(a=>a.slug===node.article));return;}assert.ok(node.choices?.length>=2);assert.equal(new Set(node.choices.map(c=>c.id)).size,node.choices.length);for(const choice of node.choices)walk(choice.next,[...path,id]);}walk('arrival');assert.deepEqual([...endings].sort(),['general','leak','review','unanswered']);
 const first=storyTrail(nodes,['evidence','check','wait']);assert.equal(first.node,'unanswered');assert.equal(first.trail.length,3);assert.equal(storyTrail(nodes,first.history.slice(0,-1)).node,'missing');assert.equal(storyTrail(nodes,['invalid','permission']).node,'arrival');assert.deepEqual(storyTrail(nodes,['evidence','obey','send']).history,['evidence','obey']);
});
test('research timeline is chronological, sourced, and links only existing analyses',()=>{
 assert.equal(timeline.length,8);for(let i=0;i<timeline.length;i++){const e=timeline[i];assert.match(e.date,/^\d{4}-\d{2}-\d{2}$/);assert.ok(!i||timeline[i-1].date<e.date);assert.equal(new URL(e.url).hostname,'arxiv.org');assert.ok(e.summary&&e.contribution&&e.limit&&e.question);assert.ok(articles.some(a=>a.slug===e.article));}assert.equal(new Set(timeline.map(e=>e.id)).size,timeline.length);
});
test('all four new OS apps can open and survive workspace export restoration',()=>{
 let state=defaultWorkspace();for(const app of ['reader','observatory','story','time']){assert.ok(OS_APPS.some(a=>a.id===app));state=openWindow(state,app,{width:1100,height:680});}const restored=normalizeWorkspace(JSON.parse(JSON.stringify(state)),articles.map(a=>a.slug));assert.ok(['reader','observatory','story','time'].every(app=>restored.windows.some(w=>w.app===app)));assert.equal(restored.notes.length,state.notes.length);
});
