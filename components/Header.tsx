import {useEffect,useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {LogoIcon,SidebarIcon,SunIcon,MoonIcon} from './icons';
import {Menu} from './Menu';
import {Search} from './Search';
export const Header=({theme,toggleTheme}:{theme:'dark'|'light';toggleTheme:()=>void})=>{
 const [isMenuOpen,setIsMenuOpen]=useState(false),[searchOpen,setSearchOpen]=useState(false),[scrolled,setScrolled]=useState(false);const router=useRouter();
 useEffect(()=>{function scroll(){setScrolled(window.scrollY>20);}scroll();window.addEventListener('scroll',scroll,{passive:true});return()=>window.removeEventListener('scroll',scroll);},[]);
 useEffect(()=>{const old=document.body.style.overflow;if(isMenuOpen||searchOpen)document.body.style.overflow='hidden';return()=>{document.body.style.overflow=old;};},[isMenuOpen,searchOpen]);
 useEffect(()=>{function shortcut(e:KeyboardEvent){if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setIsMenuOpen(false);setSearchOpen(v=>!v);}}window.addEventListener('keydown',shortcut);return()=>window.removeEventListener('keydown',shortcut);},[]);
 useEffect(()=>{function close(){setIsMenuOpen(false);setSearchOpen(false);}router.events.on('routeChangeStart',close);return()=>router.events.off('routeChangeStart',close);},[router.events]);
 return <><header className={`site-header ${scrolled?'is-scrolled':''}`}><div className="site-header-inner"><Link href="/" aria-label="WEBSPACEAI home" className="site-brand"><LogoIcon className="h-8 md:h-9 w-auto invert dark:invert-0"/></Link><div className="site-header-actions"><button className="header-search" onClick={()=>{setIsMenuOpen(false);setSearchOpen(true);}} aria-label="Search website" aria-haspopup="dialog"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg></button><button onClick={toggleTheme} aria-label={`Switch to ${theme==='dark'?'light':'dark'} theme`}>{theme==='dark'?<SunIcon className="w-5 h-5"/>:<MoonIcon className="w-5 h-5"/>}</button><button onClick={()=>{setSearchOpen(false);setIsMenuOpen(true);}} aria-label="Open menu" aria-expanded={isMenuOpen} aria-controls="menu-overlay" aria-haspopup="dialog"><SidebarIcon className="w-6 h-6"/></button></div></div></header><Menu isOpen={isMenuOpen} onClose={()=>setIsMenuOpen(false)}/><Search open={searchOpen} onClose={()=>setSearchOpen(false)}/></>;
};
