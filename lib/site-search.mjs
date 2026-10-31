export function searchPages(pages,query,limit=12){
 const terms=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 if(!terms.length){const starts=['/blog','/lab','/os','/library','/lab/time-machine','/desk','/observatory','/trust'];return starts.map(url=>pages.find(page=>page.url===url)).filter(Boolean).slice(0,limit);}
 return pages.map((page,index)=>{const title=page.title.toLowerCase(),text=`${title} ${page.category} ${page.description} ${page.keywords||''}`.toLowerCase();if(!terms.every(term=>text.includes(term)))return {page,score:0,index};return {page,score:terms.reduce((sum,t)=>sum+(title.startsWith(t)?6:title.includes(t)?4:1),0),index};}).filter(r=>r.score>0).sort((a,b)=>b.score-a.score||a.index-b.index).slice(0,limit).map(r=>r.page);
}
