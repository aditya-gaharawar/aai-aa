import fs from 'node:fs';
import {siteOrigin as origin,seoPages} from '../lib/seo.mjs';
const articles=JSON.parse(fs.readFileSync('content/research.json','utf8'));
const pages=[{title:'Home',url:'/',category:'Explore',description:'A place for useful intelligence and curious people.'},{title:'The Curiosity Lab',url:'/lab',category:'Interactive',description:'Attention studio, context calculator, experiments and games.'},{title:'Lost Signal',url:'/lab/lost-signal',category:'Game',description:'Our 404 maze game. Recover fragments and find your way home.'},{title:'Research & Newsroom',url:'/blog',category:'Journal',description:'AI research analyses and company policy explainers.'},{title:'Your reading list',url:'/reading-list',category:'Explore',description:'Stories saved in this browser.'},{title:'About WEBSPACEAI',url:'/about',category:'Company',description:'Our purpose, principles, and approach to useful AI.'},{title:'Products & possibilities',url:'/products',category:'Company',description:'Explore our product directions and discuss availability.'},{title:'Contact WEBSPACEAI',url:'/contact',category:'Company',description:'Research, enterprise, privacy, accessibility and safety contacts.'},{title:'Trust Center',url:'/trust',category:'Trust',description:'Policies, governance, and responsible AI.'},{title:'Safety Framework',url:'/safety',category:'Trust',description:'Four risk levels and their review requirements.'},{title:'Policy Directory',url:'/trust/policies',category:'Trust',description:'Search all policy documents.'}];
pages.push(
 {title:'The Unanswered Room',url:'/lab/unanswered-room',category:'Interactive fiction',description:'A branching story about evidence, permission, and AI decisions. Revisit a choice and explore four endings.'},
 {title:'Your Personal Observatory',url:'/observatory',category:'Workspace',description:'An opt-in, browser-local constellation of the stories and places you explore.'},
 {title:'Research Time Machine',url:'/lab/time-machine',category:'Interactive',description:'Eight sourced AI research milestones from 2017 to 2025. Compare papers, limits, and open questions.'},
 {title:'The Quiet Library',url:'/library',category:'Workspace',description:'Focus reading with side-by-side articles, exact-passage highlights, margin notes, and local exports.'},
 {title:'ResearchOS',url:'/os',category:'Workspace',description:'A browser-local research desktop with movable windows for articles, notes, radio, maps, and experiments.'},
 {title:'Research Constellation',url:'/lab/constellation',category:'Interactive',description:'An interactive map connecting research ideas, agents, robotics, safety, and systems.'},
 {title:'The Hallucination Room',url:'/lab/hallucination-room',category:'Game',description:'Inspect evidence and catch unsupported claims in six investigations.'},
 {title:'Build a Tiny Brain',url:'/lab/tiny-brain',category:'Simulation',description:'Connect perception, memory, planning, safety, tools, and output.'},
 {title:'Signal Radio',url:'/lab/radio',category:'Interactive',description:'Tune an imaginary radio to find editorial transmissions and a hidden carrier.'},
 {title:'Ask This Article',url:'/lab/article-assistant',category:'Interactive',description:'A local evidence assistant: find exact passages and references in an article.'},
 {title:'The Hidden Frequency',url:'/lab/hidden-frequency',category:'Game',description:'Follow clues, collect five fragments, and unlock a bonus maze and interactive artwork.'},
 {title:'Your Research Desk',url:'/desk',category:'Workspace',description:'Organize saved articles into collections, take notes, and export or import your desk.'}
);
const policySource=fs.readFileSync('WEBSPACEAI_Policy_Suite_v2.1_corrected.md','utf8');const slugSource=fs.readFileSync('constants/policies/slugs.ts','utf8');
const slugs=Object.fromEntries([...slugSource.matchAll(/(\d+):\s*'([^']+)'/g)].map(m=>[m[1],m[2]]));
for(const match of policySource.matchAll(/^## (\d+)\.\s+(.+)$/gm)){const [,num,title]=match;if(Number(num)>40||num==='34')continue;pages.push({title:title.replace(/\s*\*\(New\)\*\s*/g,'').trim(),url:`/trust/policies/${slugs[num]}`,category:'Policy',description:`Document ${num} · WEBSPACEAI policy suite`});}
const tags={
 'coding-agents-beyond-a-leaderboard':'agent reliability coding software engineering benchmark tools',
 'prompt-injection-permission-boundaries':'agent reliability security injection permissions tools',
 'long-context-memory-budget':'GPU memory inference serving attention cache',
 'rag-evidence-before-confidence':'retrieval search knowledge evidence hallucinations',
 'grpo-efficiency-beyond-the-kernel':'reinforcement learning reward optimization training efficiency',
 'robot-foundation-models-data-contract':'robotics physical intelligence actions training data',
 'gps-denied-semantic-mapping':'LiDAR camera SLAM perception spatial mapping'
};
const index=[...pages,...articles.map(a=>({title:a.title,url:`/blog/${a.slug}`,category:a.type==='research'?'Research':'Company',description:`${a.category} · ${a.subtitle}`,keywords:`${tags[a.slug]||''} ${a.summary.join(' ')} ${a.sections.map(s=>s.title+' '+s.paragraphs.join(' ')).join(' ')}`}))];
fs.writeFileSync('content/search-index.json',JSON.stringify(index,null,2)+'\n');
const escape=s=>s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
fs.writeFileSync('public/robots.txt',`User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`);
fs.writeFileSync('public/sitemap.xml',`<?xml version="1.0" encoding="utf-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.entries(seoPages).filter(([,meta])=>!meta.noindex).map(([path,meta])=>`<url><loc>${origin}${path}</loc>${meta.article?`<lastmod>${meta.article.date}</lastmod>`:''}</url>`).join('')}</urlset>\n`);
fs.writeFileSync('public/research/feed.xml',`<?xml version="1.0" encoding="utf-8"?><rss version="2.0"><channel><title>WEBSPACEAI Journal</title><link>${origin}/blog</link><description>Research analyses and company policy explainers.</description>${articles.map(a=>`<item><title>${escape(a.title)}</title><link>${origin}/blog/${a.slug}</link><guid>${origin}/blog/${a.slug}</guid><description>${escape(a.subtitle)}</description><pubDate>${new Date(a.date+'T00:00:00Z').toUTCString()}</pubDate></item>`).join('')}</channel></rss>\n`);
console.log(`Generated search index (${index.length} pages), sitemap and RSS.`);
