import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),out=path.join(root,'out');
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const htmlFiles=files(out).filter(f=>f.endsWith('.html')),pages=new Map();
for(const file of htmlFiles){const html=fs.readFileSync(file,'utf8'),ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,`Duplicate IDs: ${file}`);assert.equal((html.match(/<main(?:\s|>)/g)||[]).length,1,`Main landmark: ${file}`);assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`One page title: ${file}`);assert.ok(html.includes('name="description"'),`Description: ${file}`);assert.ok(html.includes('lang="en"'),`Language: ${file}`);for(const m of html.matchAll(/<img\b[^>]*>/g))assert.ok(/\balt=/.test(m[0]),`Image alt missing: ${file}`);pages.set(file,{html,ids:new Set(ids)});}
const errors=[];
function resolve(ref,file){if(/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(ref))return;let [raw,hash]=ref.replaceAll('&amp;','&').split('#');raw=raw.split('?')[0];let decoded;try{decoded=decodeURIComponent(raw);}catch{return;}
 let target=file;if(decoded){const base=decoded.startsWith('/')?path.join(out,decoded):path.resolve(path.dirname(file),decoded);target=[base,base+'.html',path.join(base,'index.html')].find(p=>fs.existsSync(p)&&fs.statSync(p).isFile());}if(!target){errors.push(`${path.relative(out,file)} → ${ref}`);return;}if(hash&&pages.has(target)&&!pages.get(target).ids.has(decodeURIComponent(hash)))errors.push(`${path.relative(out,file)} → missing anchor ${ref}`);
}
for(const [file,{html}] of pages){for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g))resolve(m[1],file);for(const m of html.matchAll(/\bsrcSet="([^"]+)"/gi))for(const ref of m[1].split(','))resolve(ref.trim().split(/\s+/)[0],file);}
assert.deepEqual(errors,[],errors.join('\n'));
const index=JSON.parse(fs.readFileSync(path.join(root,'content/search-index.json'),'utf8'));
for(const page of index)resolve(page.url,path.join(out,'index.html'));
assert.deepEqual(errors,[],errors.join('\n'));
const policy=pages.get(path.join(out,'trust/policies/24-ai-safety-framework.html')).html;assert.ok(policy.includes('class="policy-matrix"'),'Safety policy table must render as a table');assert.ok(policy.includes('<th scope="col">Level</th>'));assert.ok(!pages.get(path.join(out,'trust.html')).html.includes('five-level'));
const notfound=pages.get(path.join(out,'404.html')).html;assert.ok(notfound.includes('signal-game'));assert.ok(/<meta\b[^>]*name="robots"[^>]*content="noindex(?:,|")/.test(notfound));
const experiences=JSON.parse(fs.readFileSync(path.join(root,'content/experiences.json'),'utf8'));
for(const item of experiences){const file=path.join(out,item.url.slice(1)+'.html');assert.ok(pages.has(file),`Experience route: ${item.url}`);if(!['/os','/library'].includes(item.url))assert.ok(pages.get(file).html.includes('class="experience-switcher"'),`Experience switcher: ${item.url}`);}
const articles=JSON.parse(fs.readFileSync(path.join(root,'content/research.json'),'utf8'));
for(const article of articles){const html=pages.get(path.join(out,'blog',article.slug+'.html')).html;assert.ok(html.includes(`href="/library?article=${article.slug}"`),`Quiet Library deep link: ${article.slug}`);assert.ok(html.includes('class="article-mobile-contents"'),`Mobile article navigation: ${article.slug}`);}
assert.ok(pages.get(path.join(out,'lab.html')).html.includes('class="lab-browser"'),'Searchable Lab directory');
console.log(`Export audit passed: ${htmlFiles.length} pages, unique IDs, one main and H1 per page, image alt attributes, all internal links/assets/anchors, ${index.length} searchable destinations, experience switchers, article deep links, mobile contents, semantic policy table and game 404.`);
