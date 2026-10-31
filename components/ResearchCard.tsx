import Link from 'next/link';
import { ResearchArticle, articleUrl, artUrl } from '../lib/research';
export function ResearchCard({article}:{article:ResearchArticle}){
 return <Link className="journal-card" href={articleUrl(article)}><div className="journal-card-art"><img src={artUrl(article)} srcSet={`${artUrl(article).replace('.webp','-640.webp')} 640w, ${artUrl(article)} 1280w`} sizes="(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 360px" loading="lazy" decoding="async" alt=""/><span>{article.category}</span></div><div className="journal-card-copy"><div className="journal-card-meta"><span>{article.format}</span><span>{article.readingMinutes} min read</span></div><h3>{article.title}</h3><p>{article.subtitle}</p><div className="journal-card-bottom"><time dateTime={article.date}>{new Date(article.date+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})}</time><span aria-hidden="true">↗</span></div></div></Link>;
}
