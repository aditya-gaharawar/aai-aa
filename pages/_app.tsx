import type {AppProps} from 'next/app';
import Head from 'next/head';
import {Seo} from '../components/Seo';
import {useRouter} from 'next/router';
import {useEffect,useState} from 'react';
import {Header} from '../components/Header';
import {Footer} from '../components/Footer';
import '../styles/globals.css';
import '../styles/studio.css';
import '../styles/experiences.css';
import '../styles/research-os.css';
import '../styles/continuum.css';
import '../styles/polish.css';
import {ExploreWayfinding,ContinueExploring} from '../components/Wayfinding';
import {NavigationFeedback,BackToTop} from '../components/NavigationFeedback';
import {ExplorationObserver} from '../components/continuum/ExplorationObserver';
import {SpeedInsights} from '@vercel/speed-insights/next';
function preferredTheme():'dark'|'light'{try{const value=localStorage.getItem('theme');if(value==='dark'||value==='light')return value;}catch{}return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
export default function App({Component,pageProps}:AppProps){const immersive=['/os','/library'].includes(useRouter().pathname);const [theme,setTheme]=useState<'dark'|'light'>('dark');useEffect(()=>{function sync(){const value=preferredTheme();setTheme(value);document.documentElement.classList.toggle('dark',value==='dark');}sync();const media=window.matchMedia('(prefers-color-scheme: dark)');media.addEventListener('change',sync);window.addEventListener('storage',sync);return()=>{media.removeEventListener('change',sync);window.removeEventListener('storage',sync);};},[]);function toggleTheme(){const next=theme==='dark'?'light':'dark';setTheme(next);document.documentElement.classList.toggle('dark',next==='dark');try{localStorage.setItem('theme',next);}catch{}}return <><Head><meta name="viewport" content="width=device-width, initial-scale=1"/></Head><Seo/><a className="skip-link" href="#page-content">Skip to main content</a><ExplorationObserver/><NavigationFeedback/><div className="site-root">{!immersive&&<Header theme={theme} toggleTheme={toggleTheme}/>}<div id="page-content" tabIndex={-1} className={!immersive?'with-wayfinding':undefined}>{!immersive&&<ExploreWayfinding/>}<Component {...pageProps} {...(immersive?{theme,toggleTheme}:{})}/></div>{!immersive&&<><ContinueExploring/><Footer/><BackToTop/></>}</div><SpeedInsights/></>;}
