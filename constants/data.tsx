import navigation from '../content/navigation.json';
import React from 'react';
import { CardData, FooterLinkColumn } from '../types';
import { researchArticles, companyArticles, articleUrl, artUrl } from '../lib/research';

export const heroSlides = [
  {
    title: 'Explore Our Research',
    description: 'Advancing AI to benefit all of humanity—safely, transparently, and with lasting purpose.',
    imageUrl: '/art/abstract/hero.webp',
    buttonText: 'Explore the research journal',
    href: '/blog',
  },
  {
    title: 'Stay Curious',
    description: 'Explore ideas you can interact with. A space for small experiments and unexpected discoveries.',
    imageUrl: '/art/abstract/assistant.webp',
    buttonText: 'Enter the Curiosity Lab',
    href: '/lab',
  },
  {
    title: 'Trust by Design',
    description: 'Transparency, governance, and safety are foundational to everything we build.',
    imageUrl: '/art/abstract/safety.webp',
    buttonText: 'Visit Trust Center',
    href: '/trust',
  },
  {
    title: 'Useful Intelligence',
    description: 'Thoughtful systems begin with good questions. Get to know the ideas behind WEBSPACEAI.',
    imageUrl: '/art/abstract/alignment.webp',
    buttonText: 'Get to know us',
    href: '/about',
  },
];

export const productCards: CardData[] = [
  {
    category: 'For Everyone',
    title: 'WEBSPACEAI Assistant',
    imageUrl: '/art/abstract/assistant.webp',
    href: '/products#assistant',
  },
  {
    category: 'For Teams',
    title: 'WEBSPACEAI ONE',
    imageUrl: '/art/abstract/one.webp',
    href: '/products#one',
  },
];

export const researchCards: CardData[] = researchArticles.map(article => ({
  category: article.category,
  date: `${new Date(article.date+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})} · Research analysis`,
  title: article.title,
  imageUrl: artUrl(article),
  href: articleUrl(article),
}));

export const newsCards: CardData[] = companyArticles.map(article => ({
  category: 'Company explainer',
  date: new Date(article.date+'T00:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}),
  title: article.title,
  imageUrl: artUrl(article),
  href: articleUrl(article),
}));

export const menuLinks: FooterLinkColumn[] = navigation;
export const footerLinks: FooterLinkColumn[] = [
 {title:'Explore',links:[{text:'Journal & newsroom',href:'/blog'},{text:'Curiosity Lab',href:'/lab'},{text:'Research Constellation',href:'/lab/constellation'},{text:'Research Time Machine',href:'/lab/time-machine'},{text:'Play Lost Signal',href:'/lab/lost-signal'}]},
 {title:'Your spaces',links:[{text:'ResearchOS',href:'/os'},{text:'Quiet Library',href:'/library'},{text:'Research desk',href:'/desk'},{text:'Saved stories',href:'/reading-list'},{text:'Personal Observatory',href:'/observatory'}]},
 {title:'Company',links:[{text:'About WEBSPACEAI',href:'/about'},{text:'Product directions',href:'/products'},{text:'Contact the team',href:'/contact'},{text:'RSS feed',href:'/research/feed.xml'}]},
 {title:'Trust & legal',links:[{text:'Trust Center',href:'/trust'},{text:'Safety framework',href:'/safety'},{text:'Privacy policy',href:'/trust/policies/01-privacy-policy'},{text:'Terms of service',href:'/trust/policies/02-terms-of-service'},{text:'Accessibility',href:'/trust/policies/13-accessibility-statement'},{text:'All policies',href:'/trust/policies'}]},
];
