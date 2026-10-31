import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { heroSlides } from '../constants/data';
import { ArrowRightIcon } from './icons';
export const Hero: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(true);
    const [playing, setPlaying] = useState(true);
    const [engaged, setEngaged] = useState(false);
    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(media.matches);
        const update = () => setReducedMotion(media.matches);
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);
    useEffect(() => {
        if (reducedMotion || !playing || engaged)
            return;
        const timer = window.setInterval(() => setCurrentSlide(i => (i + 1) % heroSlides.length), 7000);
        return () => window.clearInterval(timer);
    }, [reducedMotion, playing, engaged, currentSlide]);
    const slide = heroSlides[currentSlide];
    return <section className="art-hero" aria-label="Featured at WEBSPACEAI" aria-roledescription="carousel" onMouseEnter={() => setEngaged(true)} onMouseLeave={() => setEngaged(false)} onFocusCapture={() => setEngaged(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget as Node))
        setEngaged(false); }}>
    <div className="art-hero-images" aria-hidden="true">{heroSlides.map((item, i) => <img key={item.title} className={`art-hero-image ${i === currentSlide ? 'is-active' : ''}`} src={item.imageUrl} alt="" loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : 'low'} decoding="async"/>)}</div>
    <div className="art-hero-shade" aria-hidden="true"/>
    <div className="art-hero-content" aria-live={playing ? 'off' : 'polite'}>
      <h1>{slide.title}</h1><p>{slide.description}</p>
      <Link href={slide.href} className="art-hero-cta">{slide.buttonText}<ArrowRightIcon /></Link>
    </div>
    <div className="art-hero-bottom"><span className="art-hero-counter" aria-hidden="true">{String(currentSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}</span>
      <div className="art-hero-dots" role="group" aria-label="Choose featured content">{heroSlides.map((item, i) => <button key={item.title} aria-label={`Show ${item.title}`} aria-pressed={i === currentSlide} onClick={() => setCurrentSlide(i)} className={i === currentSlide ? 'is-active' : ''}><span /></button>)}</div>
      <div className="art-hero-controls"><button aria-label="Previous feature" onClick={() => setCurrentSlide(i => (i + heroSlides.length - 1) % heroSlides.length)}>‹</button><button aria-label="Next feature" onClick={() => setCurrentSlide(i => (i + 1) % heroSlides.length)}>›</button>{!reducedMotion && <button className="art-hero-pause" aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} onClick={() => setPlaying(!playing)}>{playing ? 'Ⅱ' : '▷'}</button>}</div>
    </div>
  </section>;
};
