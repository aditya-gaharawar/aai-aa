import {useEffect,useRef} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {menuLinks} from '../constants/data';
import {routePath} from '../lib/navigation.mjs';
export function Menu({isOpen,onClose}:{isOpen:boolean;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null),close=useRef<HTMLButtonElement>(null);const router=useRouter();
 useEffect(()=>{const el=dialog.current;if(!el)return;if(isOpen){if(!el.open)el.showModal();close.current?.focus();}else if(el.open)el.close();},[isOpen]);
 return <dialog id="menu-overlay" ref={dialog} className="site-menu" aria-labelledby="site-menu-title" onCancel={onClose} onClose={onClose}><div className="site-menu-top"><Link href="/" onClick={onClose}>WEBSPACEAI <span>↗</span></Link><button ref={close} onClick={onClose} aria-label="Close menu">Close <span aria-hidden="true">×</span></button></div><div className="site-menu-intro"><p className="studio-kicker">A GOOD PLACE TO GET CURIOUS</p><h2 id="site-menu-title">Where shall we go?</h2><p>Find a story. Follow a question. Make a little space for an idea.</p></div><nav className="site-menu-grid" aria-label="All site navigation">{menuLinks.map(column=><section key={column.title}><h3>{column.title}</h3><ul>{column.links.map(link=><li key={link.text}><Link href={link.href} aria-current={routePath(router.asPath)===link.href?'page':undefined} onClick={onClose}><span>{link.text}</span><span aria-hidden="true">↗</span></Link></li>)}</ul></section>)}</nav><div className="site-menu-bottom"><span>A little less scrolling. A little more wondering.</span><Link href="/research/feed.xml" onClick={onClose}>Follow the journal via RSS ↗</Link></div></dialog>;
}
