import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultWorkspace,normalizeWorkspace,fitWindow,openWindow,focusWindow,closeWindow,changeWindow,tileTwo,parseWorkspaceImport} from '../lib/research-os.mjs';
const bounds={width:1120,height:680},slugs=['one','two','three'];
test('windows are recovered inside the viewport, including narrow screens and invalid sizes',()=>{
 for(const b of [bounds,{width:320,height:450},{width:1,height:1}])for(const rect of [{x:9000,y:-50,w:2000,h:1800},{x:-100,y:5000,w:NaN,h:Infinity},{x:20,y:20,w:-1,h:-1}]){const w=fitWindow({id:'library',app:'library',...rect,minimized:false,maximized:false},b);assert.ok(w.x>=0&&w.y>=0);assert.ok(w.x+w.w<=b.width);assert.ok(w.y+w.h<=b.height);assert.ok(Number.isFinite(w.w)&&Number.isFinite(w.h));}
});
test('opening and focusing apps preserves singletons and articles are distinct windows',()=>{
 let state=defaultWorkspace(bounds);state=openWindow(state,'radio',bounds);assert.equal(state.windows.length,3);state=openWindow(state,'radio',bounds);assert.equal(state.windows.length,3);state=openWindow(state,'article',bounds,'one');state=openWindow(state,'article',bounds,'two');assert.equal(state.windows.length,5);state=openWindow(state,'article',bounds,'one');assert.equal(state.windows.length,5);assert.equal(state.windows.at(-1).slug,'one');assert.equal(openWindow(state,'article',bounds),state);
 state=changeWindow(state,'radio',{minimized:true},bounds);assert.equal(state.windows.find(w=>w.id==='radio').minimized,true);state=focusWindow(state,'radio');assert.equal(state.windows.at(-1).id,'radio');assert.equal(state.windows.at(-1).minimized,false);assert.equal(focusWindow(state,'radio'),state);
});
test('window close and rearrangement never delete notebook content',()=>{
 let state=defaultWorkspace(bounds);state.notes[0].body='Keep this research question.';state=closeWindow(state,'notebook');assert.equal(state.notes[0].body,'Keep this research question.');state=openWindow(state,'notebook',bounds);state=tileTwo(state,bounds);const [left,right]=state.windows;assert.equal(left.x,0);assert.equal(right.x,left.w+12);assert.equal(left.y,right.y);assert.equal(left.h,bounds.height);assert.equal(state.notes[0].body,'Keep this research question.');
});
test('the desktop caps windows without losing existing state',()=>{
 let state=defaultWorkspace(bounds);for(let i=0;i<20;i++)state=openWindow(state,'article',bounds,`story-${i}`);assert.equal(state.windows.length,12);assert.equal(openWindow(state,'radio',bounds),state);assert.equal(state.notes.length,1);
});
test('restored workspaces reject unknown apps, unknown articles, duplicate IDs and unsafe note shapes',()=>{
 const raw={version:1,wallpaper:'javascript:alert(1)',windows:[{app:'library',x:99999,y:99,w:999,h:999},{app:'library'},{app:'remote-shell'},{app:'article',slug:'unknown'},{app:'article',slug:'one'}],notes:[{id:'same',title:'x'.repeat(200),body:'a'.repeat(22000),slug:'one',trashed:true},{id:'same',body:'duplicate'},{id:'bad id',body:'reject'}],selectedNote:'unknown'};
 const result=normalizeWorkspace(raw,slugs,bounds);assert.equal(result.wallpaper,'sage');assert.equal(result.windows.length,2);assert.equal(result.windows[1].id,'article:one');assert.equal(result.notes.length,1);assert.equal(result.notes[0].title.length,120);assert.equal(result.notes[0].body.length,20000);assert.equal(result.notes[0].trashed,true);assert.equal(result.selectedNote,null);
});
test('export and import round-trip notes, trash, layout, and wallpaper with explicit format validation',()=>{
 let original=defaultWorkspace(bounds);original.wallpaper='dusk';original.notes[0].trashed=true;original=openWindow(original,'article',bounds,'one');const exported=JSON.parse(JSON.stringify({format:'webspaceai-researchos',version:1,workspace:original}));const restored=parseWorkspaceImport(exported,slugs,bounds);assert.equal(restored.wallpaper,'dusk');assert.equal(restored.notes[0].trashed,true);assert.equal(restored.windows.at(-1).slug,'one');assert.throws(()=>parseWorkspaceImport({version:1,workspace:original},slugs,bounds));assert.throws(()=>parseWorkspaceImport({format:'webspaceai-researchos',version:2,workspace:original},slugs,bounds));
});
