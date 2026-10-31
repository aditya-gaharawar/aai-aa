import test from 'node:test';import assert from 'node:assert/strict';
import {seoForPath,seoPages,structuredData,siteOrigin} from '../lib/seo.mjs';
test('deep links and filtered views consolidate to the underlying canonical page',()=>{
 for(const [input,path] of [['/lab?group=Understand&q=attention','/lab'],['/blog/rag-evidence-before-confidence/#sources','/blog/rag-evidence-before-confidence'],['/library?article=long-context-memory-budget','/library']]){const meta=seoForPath(input);assert.equal(meta.url,siteOrigin+path);assert.ok(!/[?#]/.test(meta.url));}
});
test('private browser workspaces and missing pages remain out of search',()=>{
 for(const path of ['/desk','/os','/library','/observatory','/reading-list','/404','/soon','/does-not-exist'])assert.equal(seoForPath(path).noindex,true,path);
 assert.equal(seoForPath('/lab/lost-signal').noindex,false);
});
test('article entities preserve real authorship, dates, branded images and source identity',()=>{
 for(const path of Object.keys(seoPages).filter(p=>p.startsWith('/blog/'))){const meta=seoForPath(path),graph=structuredData(meta)['@graph'],article=graph.find(n=>n['@type']==='BlogPosting');assert.equal(article.mainEntityOfPage,meta.url);assert.equal(article.datePublished,meta.article.date+'T00:00:00Z');assert.deepEqual(article.image,[meta.imageUrl]);assert.ok(graph.some(n=>n['@type']==='BreadcrumbList'));}
});
