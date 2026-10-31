import sharp from 'sharp';
import fs from 'node:fs/promises';
const source='public/brand/favicon-source.png';
for(const size of [16,32,48,180,192,512]){
 const name=size===180?'apple-touch-icon.png':`favicon-${size}.png`;
 await sharp(source).resize(size,size,{fit:'contain',background:'#ffffff'}).png().toFile('public/'+name);
}
const sizes=[16,32,48];const pngs=await Promise.all(sizes.map(s=>fs.readFile(`public/favicon-${s}.png`)));
const header=Buffer.alloc(6+sizes.length*16);header.writeUInt16LE(1,2);header.writeUInt16LE(sizes.length,4);let offset=header.length;
for(let i=0;i<sizes.length;i++){const entry=6+i*16;header[entry]=sizes[i];header[entry+1]=sizes[i];header.writeUInt16LE(1,entry+4);header.writeUInt16LE(32,entry+6);header.writeUInt32LE(pngs[i].length,entry+8);header.writeUInt32LE(offset,entry+12);offset+=pngs[i].length;}
await fs.writeFile('public/favicon.ico',Buffer.concat([header,...pngs]));
console.log('Generated favicons and touch icons from the supplied WEBSPACEAI mark.');
