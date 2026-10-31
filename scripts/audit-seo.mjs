import fs from 'node:fs';import assert from 'node:assert/strict';import sharp from 'sharp';import {seoPages,siteOrigin} from '../lib/seo.mjs';
const sitemap=fs.readFileSync('out/sitemap.xml','utf8');
const required=['description','robots','og:title','og:description','og:type','og:url','og:image','og:image:alt','og:image:width','og:image:height','twitter:card','twitter:title','twitter:description','twitter:image','twitter:image:alt'];
for(const [path,meta] of Object.entries(seoPages)){
 const file=path==='/'?'out/index.html':`out${path}.html`;const html=fs.readFileSync(file,'utf8');const head=html.match(/<head>([\s\S]*?)<\/head>/)[1];const tags=[...head.matchAll(/<meta\b[^>]*>/g)].map(m=>Object.fromEntries([...m[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map(a=>[a[1],a[2]])));
 for(const name of required)assert.equal(tags.filter(t=>(t.name||t.property)===name).length,1,`${path}: ${name} count`);
 const tag=name=>tags.find(t=>(t.name||t.property)===name)?.content;
 assert.equal([...head.matchAll(/<title\b[^>]*>/g)].length,1,`${path}: title count`);
 assert.equal([...head.matchAll(/rel="canonical"/g)].length,1,`${path}: canonical count`);
 assert.ok(head.includes(`rel="canonical" href="${siteOrigin}${path}"`),`${path}: canonical URL`);
 assert.equal(tag('og:url'),siteOrigin+path);assert.equal(tag('og:image'),siteOrigin+meta.image);assert.equal(tag('twitter:image'),tag('og:image'));assert.equal(tag('og:image:width'),'1200');assert.equal(tag('og:image:height'),'630');assert.equal(tag('robots').includes('noindex'),meta.noindex);
 assert.equal(sitemap.includes(`<loc>${siteOrigin}${path}</loc>`),!meta.noindex,`${path}: sitemap eligibility`);
 const image=await sharp('out'+meta.image).metadata();assert.equal(image.width,1200);assert.equal(image.height,630);assert.ok(fs.statSync('out'+meta.image).size<500000,`${path}: sharing image size`);
 const scripts=[...head.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];assert.equal(scripts.length,1,`${path}: JSON-LD count`);const graph=JSON.parse(scripts[0][1])['@graph'];assert.ok(graph.some(n=>n.url===siteOrigin+path));
}
assert.ok(fs.readFileSync('out/robots.txt','utf8').includes(`Sitemap: ${siteOrigin}/sitemap.xml`));
console.log(`SEO audit passed: ${Object.keys(seoPages).length} pages with unique metadata, canonical/social URLs, parseable JSON-LD, indexability/sitemap agreement, and branded 1200×630 images.`);
