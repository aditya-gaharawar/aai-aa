import {useEffect,useState} from 'react';
import Link from 'next/link';
import type {ResearchArticle} from '../lib/research';
export function ArticleContents({article}:{article:ResearchArticle}){
 const [active,setActive]=useState('');
 useEffect(()=>{setActive('');const ids=[...article.sections.map(s=>s.id),'sources'];const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);if(visible[0])setActive(visible[0].target.id);},{rootMargin:'-110px 0px -55% 0px',threshold:0});for(const id of ids){const el=document.getElementById(id);if(el)observer.observe(el);}return()=>observer.disconnect();},[article.slug]);
 function links(){return <>{article.sections.map(s=><a href={`#${s.id}`} key={s.id} aria-current={active===s.id?'location':undefined} onClick={e=>{setActive(s.id);const details=e.currentTarget.closest('details');if(details)details.open=false;}}>{s.title}</a>)}<a href="#sources" aria-current={active==='sources'?'location':undefined} onClick={e=>{setActive('sources');const details=e.currentTarget.closest('details');if(details)details.open=false;}}>Sources & references</a></>;}
 return <><aside className="journal-toc"><nav aria-label="Article contents"><p>IN THIS ARTICLE</p>{links()}<Link href="/blog">← All stories</Link></nav></aside><details className="article-mobile-contents"><summary>On this page <span aria-hidden="true">⌄</span></summary><nav aria-label="Article contents on small screens">{links()}</nav></details></>;
}
