import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {simulateBrain,BRAIN_BLOCKS} from '../lib/brain-sim.mjs';
import {emptyDesk,normalizeDesk,parseDeskImport,moveDeskStory,deleteDeskCollection} from '../lib/desk-state.mjs';
import {FRAGMENTS,cleanFragments,isDiscovered,radioStation,RADIO_STATIONS} from '../lib/discovery.mjs';
import {answerFromArticle} from '../lib/article-evidence.mjs';
const articles=JSON.parse(fs.readFileSync(new URL('../content/research.json',import.meta.url),'utf8'));
const slugs=articles.map(a=>a.slug);
test('tiny brain uses perception, memory and ordering causally',()=>{
 assert.equal(simulateBrain(['perception','planner','tool','output'],'sample').success,true);
 assert.equal(simulateBrain(['planner','perception','tool','output'],'sample').success,false);
 assert.equal(simulateBrain(['perception','planner','tool','output'],'remember').success,false);
 assert.equal(simulateBrain(['memory','planner','tool','output'],'remember').success,true);
 assert.equal(simulateBrain(['planner','memory','tool','output'],'remember').success,false);
 assert.equal(simulateBrain([],'sample').steps,0);
});
test('gate must come before tool execution and cannot retroactively undo an action',()=>{
 assert.equal(simulateBrain(['perception','planner','tool','output'],'injection').unsafe,true);
 const guarded=simulateBrain(['perception','planner','guard','tool','output'],'injection');assert.equal(guarded.blocked,true);assert.equal(guarded.executed,null);assert.equal(guarded.unsafe,false);
 const late=simulateBrain(['perception','planner','tool','guard','output'],'injection');assert.equal(late.unsafe,true);
 assert.equal(simulateBrain(BRAIN_BLOCKS.map(b=>b.id),'injection').success,true);
 assert.throws(()=>simulateBrain([],'unknown'),RangeError);
});
test('desk data validates slugs, unique collections, note limits and assignments',()=>{
 const d=normalizeDesk({collections:[{id:'x',name:' Project '},{id:'x',name:'Duplicate'},{id:'inbox',name:'Fake'},{id:'bad id',name:'Bad'}],notes:{[slugs[0]]:'a'.repeat(4500),notAStory:'private'},assignments:{[slugs[0]]:'x',[slugs[1]]:'unknown'},order:[slugs[0],slugs[0],'unknown']},slugs);
 assert.deepEqual(d.collections,[{id:'inbox',name:'Inbox'},{id:'x',name:'Project'}]);assert.equal(d.notes[slugs[0]].length,4000);assert.equal(d.notes.notAStory,undefined);assert.equal(d.assignments[slugs[1]],undefined);assert.deepEqual(d.order,[slugs[0]]);
 assert.deepEqual(normalizeDesk(null,slugs),emptyDesk());
 const moved=moveDeskStory(d,slugs[0],'inbox');assert.equal(moved.assignments[slugs[0]],'inbox');assert.equal(moveDeskStory(d,slugs[0],'unknown'),d);
 const deleted=deleteDeskCollection(d,'x');assert.equal(deleted.assignments[slugs[0]],'inbox');assert.equal(deleted.collections.length,1);assert.equal(deleteDeskCollection(d,'inbox'),d);
});
test('desk exports round-trip while unknown formats are rejected',()=>{
 const state=emptyDesk();state.notes[slugs[0]]='A question for later.';const payload={format:'webspaceai-research-desk',version:1,saved:[slugs[0],slugs[0],'unknown'],desk:state};const parsed=parseDeskImport(JSON.parse(JSON.stringify(payload)),slugs);assert.deepEqual(parsed.saved,[slugs[0]]);assert.equal(parsed.desk.notes[slugs[0]],'A question for later.');assert.throws(()=>parseDeskImport({version:1},slugs));
});
test('all five real fragments are needed and radio tuning identifies exact carriers',()=>{
 const ids=FRAGMENTS.map(f=>f.id);assert.equal(FRAGMENTS.map(f=>f.letter).join(''),'FOUND');assert.equal(isDiscovered(ids.slice(0,4)),false);assert.equal(isDiscovered([...ids,'fake']),true);assert.deepEqual(cleanFragments(['spark','spark','fake']),['spark']);assert.deepEqual(cleanFragments({spark:true}),[]);
 for(const s of RADIO_STATIONS)assert.equal(radioStation(s.frequency)?.name,s.name);assert.equal(radioStation(99.2),null);assert.equal(radioStation(99.1)?.tag,'TRANSMISSION 05');
});
test('article answers are exact passages with valid references and abstain on no match',()=>{
 for(const article of articles){for(const q of ['What is the main point?','What are the limitations?','What experiments are proposed?']){const result=answerFromArticle(article,q);for(const p of result.passages){const section=article.sections.find(s=>s.id===p.sectionId);assert.ok(section);assert.ok(section.paragraphs.includes(p.text));assert.ok(p.refs.every(n=>n>=1&&n<=article.sources.length));}}assert.equal(answerFromArticle(article,'xyzzynothingmatches7654321').kind,'not-found');}
 const limits=answerFromArticle(articles[0],'What are the limitations?');assert.ok(limits.passages.every(p=>p.kind==='limitations'));
});
