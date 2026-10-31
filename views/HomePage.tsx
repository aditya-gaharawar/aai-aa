import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {Fragment} from '../components/explore/Fragment';
import {HomeDiscover,ReadingPaths,ResearchOSInvite,QuietSpaces} from '../components/HomeDiscover';
import { Hero } from '../components/Hero';
import { Card } from '../components/Card';
import { CallToAction } from '../components/CallToAction';
import { productCards, researchCards, newsCards } from '../constants/data';
import { CardData } from '../types';
import { ArrowRightIcon } from '../components/icons';
const HorizontalSection: React.FC<{
    title: string;
    cards: CardData[];
    href: string;
}> = ({ title, cards, href }) => {
    const rail = useRef<HTMLDivElement>(null);
    const [edges, setEdges] = useState({ start: true, end: false });
    const update = () => { const el = rail.current; if (el)
        setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 }); };
    useEffect(() => { update(); const observer = new ResizeObserver(update); if (rail.current)
        observer.observe(rail.current); return () => observer.disconnect(); }, []);
    const move = (direction: number) => { const el = rail.current; if (el)
        el.scrollBy({ left: direction * ((el.firstElementChild?.getBoundingClientRect().width || 400) + 24), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); };
    return <section className="art-card-section" aria-label={title}><div className="art-card-heading"><h2>{title}</h2><div className="art-card-actions"><Link href={href}>View all <ArrowRightIcon className="w-4 h-4"/></Link><div className="art-card-arrows"><button aria-label={`Previous ${title} cards`} onClick={() => move(-1)} disabled={edges.start}>‹</button><button aria-label={`Next ${title} cards`} onClick={() => move(1)} disabled={edges.end}>›</button></div></div></div><div className="art-card-rail" ref={rail} onScroll={update}>{cards.map(card => <Card key={card.title} {...card} layout="horizontal"/>)}</div></section>;
};
export default function HomePage() {
    return <main className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 xl:px-24 w-full">
    <Hero />
    <Fragment id="spark" />
    <HorizontalSection title="Product directions" cards={productCards} href="/products"/>
    <HomeDiscover />
    <HorizontalSection title="Research" cards={researchCards} href="/blog"/>
    <HorizontalSection title="News" cards={newsCards} href="/blog"/>
    <ReadingPaths />
    <QuietSpaces />
    <ResearchOSInvite />
    <CallToAction />
  </main>;
}
