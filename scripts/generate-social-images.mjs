import fs from 'node:fs/promises';
import sharp from 'sharp';
import {seoPages} from '../lib/seo.mjs';
const xml=s=>s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
await fs.mkdir('public/brand',{recursive:true});await fs.mkdir('public/social',{recursive:true});
// Use the original wordmark's luminance as alpha; preserve its exact geometry.
const mask=await sharp('src/assets/images/logo.png').flatten({background:'#000'}).greyscale().raw().toBuffer();
const whiteLogo=await sharp({create:{width:925,height:192,channels:3,background:'#fff'}}).joinChannel(mask,{raw:{width:925,height:192,channels:1}}).png().toBuffer();
const logo=await sharp(whiteLogo).resize(310,64,{fit:'contain'}).png().toBuffer();
await sharp({create:{width:1200,height:300,channels:3,background:'#050505'}}).composite([{input:await sharp(whiteLogo).resize(1000,208,{fit:'contain'}).png().toBuffer(),left:100,top:46}]).png().toFile('public/brand/webspaceai-logo.png');
const text=async(value,size,color,width=650)=>sharp({text:{text:`<span foreground="${color}">${xml(value)}</span>`,font:`DejaVu Sans ${size}`,width,wrap:'word',rgba:true,spacing:5}}).png().toBuffer();
for(const [path,meta] of Object.entries(seoPages)){
 const art=meta.article?`public/art/abstract/${meta.article.art}.webp`:path.startsWith('/trust')||path==='/safety'?'public/art/abstract/policies.webp':path.startsWith('/lab')?'public/art/abstract/interpretability.webp':'src/assets/images/social-brand-artwork.png';
 const background=await sharp(art).resize(1200,630,{fit:'cover'}).toBuffer();
 const veil=Buffer.from(`<svg width="1200" height="630"><defs><linearGradient id="shade"><stop stop-color="#080c0c" stop-opacity=".98"/><stop offset=".48" stop-color="#080c0c" stop-opacity=".93"/><stop offset="1" stop-color="#080c0c" stop-opacity=".05"/></linearGradient></defs><rect width="1200" height="630" fill="url(#shade)"/><path d="M64 530H1136" stroke="#ffffff" stroke-opacity=".22"/></svg>`);
 let size=54,title;const words=meta.cardTitle||meta.title.split(' | ')[0];
 do {title=await text(words,size,'#ffffff');const {height}=await sharp(title).metadata();if(height<=252)break;size-=2;}while(size>32);
 const section=await text(meta.section.toUpperCase(),14,'#b9c8bf');const footer=await text('Useful intelligence. Room for curiosity.',16,'#ccd1cd',850);
 await sharp(background).composite([{input:veil},{input:logo,left:64,top:50},{input:section,left:66,top:166},{input:title,left:62,top:214},{input:footer,left:66,top:563}]).jpeg({quality:86,mozjpeg:true}).toFile('public'+meta.image);
}
console.log(`Generated ${Object.keys(seoPages).length} branded 1200×630 sharing cards, logo, and touch icons.`);
