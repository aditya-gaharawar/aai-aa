import pages from '../content/seo-pages.json' with {type:'json'};
export const siteOrigin='https://aai-a.hushednewt.chatgpt.site';
export const seoPages=pages;
export function seoForPath(input){
 const path=String(input||'/').split(/[?#]/)[0].replace(/\/+$/,'')||'/';
 const entry=pages[path]||pages['/404'];
 return {...entry,path:pages[path]?path:'/404',url:siteOrigin+(pages[path]?path:'/404'),imageUrl:siteOrigin+entry.image};
}
export function structuredData(meta){
 const orgId=siteOrigin+'/#organization',webId=siteOrigin+'/#website';
 const graph=[];
 if(meta.path==='/')graph.push({'@type':'Organization','@id':orgId,name:'WEBSPACEAI',alternateName:'WebSpace AI',url:siteOrigin+'/',logo:{'@type':'ImageObject',url:siteOrigin+'/brand/webspaceai-logo.png',width:1200,height:300}}, {'@type':'WebSite','@id':webId,url:siteOrigin+'/',name:'WEBSPACEAI',alternateName:'WebSpace AI',publisher:{'@id':orgId},inLanguage:'en'});
 const type=meta.article?'BlogPosting':meta.path==='/about'?'AboutPage':meta.path==='/contact'?'ContactPage':['/blog','/lab','/trust/policies'].includes(meta.path)?'CollectionPage':'WebPage';
 const page={'@type':type,'@id':meta.url+'#webpage',url:meta.url,name:meta.title,description:meta.description,inLanguage:'en',isPartOf:{'@id':webId},primaryImageOfPage:{'@type':'ImageObject',url:meta.imageUrl,width:1200,height:630}};
 if(meta.article)Object.assign(page,{headline:meta.article.title,datePublished:meta.article.date+'T00:00:00Z',dateModified:meta.article.date+'T00:00:00Z',author:{'@type':'Organization',name:meta.article.author,url:siteOrigin+'/about'},publisher:{'@id':orgId},image:[meta.imageUrl],mainEntityOfPage:meta.url,articleSection:meta.article.category,timeRequired:`PT${meta.article.readingMinutes}M`});
 if(meta.path==='/blog')page.mainEntity={'@type':'ItemList',itemListElement:Object.entries(pages).filter(([,v])=>v.article).map(([path,v],i)=>({'@type':'ListItem',position:i+1,url:siteOrigin+path,name:v.article.title}))};
 if(meta.path!=='/'&&!meta.noindex){
  const crumbs=[{name:'Home',item:siteOrigin+'/'}];
  const segments=meta.path.split('/').filter(Boolean);
  for(let i=0;i<segments.length;i++){const path='/'+segments.slice(0,i+1).join('/');if(pages[path])crumbs.push({name:pages[path].article?.title||pages[path].title.split(' | ')[0],item:siteOrigin+path});}
  page.breadcrumb={'@id':meta.url+'#breadcrumb'};graph.push({'@type':'BreadcrumbList','@id':meta.url+'#breadcrumb',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,...c}))});
 }
 graph.push(page);return {'@context':'https://schema.org','@graph':graph};
}
