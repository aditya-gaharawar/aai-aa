import Link from 'next/link';
import {Observatory} from '../components/continuum/Observatory';
export default function Page(){return <><main className="continuum-page"><header className="continuum-intro"><Link href="/lab">← The Curiosity Lab</Link><p className="continuum-eyebrow">A SKY THAT TAKES ITS TIME</p><h1>Your curiosity.<br/><em>A constellation.</em></h1><p>Every new question leaves a little light. Start remembering your journey, then follow the spaces you haven’t explored.</p></header><Observatory/></main></>;}
