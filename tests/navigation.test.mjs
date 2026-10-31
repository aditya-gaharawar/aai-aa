import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {routePath,routeWithin,primarySection,filterExperiences,labSelection,experienceNeighbors,LAB_GROUPS} from '../lib/navigation.mjs';
import {searchPages} from '../lib/site-search.mjs';
const experiences=JSON.parse(fs.readFileSync(new URL('../content/experiences.json',import.meta.url))),navigation=JSON.parse(fs.readFileSync(new URL('../content/navigation.json',import.meta.url))),search=JSON.parse(fs.readFileSync(new URL('../content/search-index.json',import.meta.url)));
test('active navigation follows complete path segments across research, trust, and personal spaces',()=>{
 assert.equal(routePath('/blog/one/?q=two#source-1'),'/blog/one');assert.equal(routeWithin('/blogger','/blog'),false);assert.equal(routeWithin('/blog/one?view=quiet','/blog'),true);assert.equal(primarySection('/blog/one'),'/blog');assert.equal(primarySection('/safety'),'/trust');assert.equal(primarySection('/trust/policies/one'),'/trust');for(const path of ['/lab','/lab/time-machine','/library','/observatory','/desk','/reading-list'])assert.equal(primarySection(path),'/lab');assert.equal(primarySection('/os'),'/os');assert.equal(primarySection('/'),null);
});
test('the Lab directory covers every experience once and filters by intent and search together',()=>{
 assert.equal(experiences.length,13);assert.equal(new Set(experiences.map(x=>x.url)).size,13);const grouped=LAB_GROUPS.slice(1).flatMap(g=>filterExperiences(experiences,g,''));assert.equal(grouped.length,13);assert.equal(new Set(grouped.map(x=>x.url)).size,13);assert.equal(filterExperiences(experiences,'All','radio')[0].url,'/lab/radio');assert.equal(filterExperiences(experiences,'Understand','radio').length,0);assert.equal(filterExperiences(experiences,'All','no-match-xyz').length,0);assert.equal(filterExperiences(experiences,'Make space','quiet library')[0].url,'/library');
});
test('Lab URL filters reject unrecognized shapes and restore known group and query values',()=>{
 assert.deepEqual(labSelection({group:'Make space',q:'notes'}),{group:'Make space',q:'notes'});assert.deepEqual(labSelection({group:['Understand'],q:['bad']}),{group:'All',q:''});assert.equal(labSelection({q:'x'.repeat(300)}).q.length,120);
});
test('continuation links lead to different experiences in the same neighborhood',()=>{
 for(const item of experiences){const result=experienceNeighbors(experiences,item.url+'?x=1');assert.equal(result.current.url,item.url);assert.equal(result.related.length,2);for(const related of result.related){assert.notEqual(related.url,item.url);assert.equal(related.group,item.group);}}assert.equal(experienceNeighbors(experiences,'/unknown'),null);
});
test('menu destinations exist in the site index and initial search surfaces the useful workspaces',()=>{
 const urls=new Set(search.map(x=>x.url));for(const group of navigation){assert.ok(group.links.length<=6);for(const link of group.links)assert.ok(urls.has(link.href),link.href);}const start=searchPages(search,'');for(const url of ['/blog','/lab','/os','/library','/desk','/observatory'])assert.ok(start.some(x=>x.url===url),url);
});
