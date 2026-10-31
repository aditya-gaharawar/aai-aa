import React from 'react';
import Link from 'next/link';
import { CardData } from '../types';
import { ArrowRightIcon } from './icons';
/** Abstract artwork stays decorative; the entire card has one clear destination. */
export const Card: React.FC<CardData & {
    layout?: 'default' | 'horizontal';
}> = ({ category, date, title, description, imageUrl, imagePosition = 'center', href = '/products', logo, codeSnippet, linkText, layout = 'default', }) => (<Link href={href} className={`visual-card ${layout === 'horizontal' ? 'visual-card-horizontal' : 'visual-card-vertical'}`}>
    {imageUrl && <img className="visual-card-image" src={imageUrl} srcSet={imageUrl.startsWith('/art/abstract/') ? `${imageUrl.replace('.webp', '-640.webp')} 640w, ${imageUrl} 1280w` : undefined} sizes="(max-width: 640px) 85vw, 400px" style={{ objectPosition: imagePosition }} alt="" aria-hidden="true" loading="lazy" decoding="async"/>}
    <div className="visual-card-shade" aria-hidden="true"/>
    <div className="visual-card-top"><div className="visual-card-meta">
      {category && <span className="visual-card-category">{category}</span>}
      {date && <span className="visual-card-date">{date}</span>}
    </div><span className="visual-card-arrow" aria-hidden="true"><ArrowRightIcon /></span></div>
    {logo && <div className="visual-card-logo">{logo}</div>}
    {codeSnippet && <pre className="visual-card-code"><code>{codeSnippet.code}</code></pre>}
    <div className="visual-card-copy"><h3>{title}</h3>{description && <p>{description}</p>}{linkText && <span className="visual-card-link">{linkText} ↗</span>}</div>
  </Link>);
