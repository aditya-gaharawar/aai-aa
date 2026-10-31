import Link from 'next/link';
import {UnansweredRoom} from '../../components/continuum/UnansweredRoom';
export default function Page(){return <><main className="continuum-page"><header className="continuum-intro"><Link href="/lab">← The Curiosity Lab</Link><p className="continuum-eyebrow">SOME QUESTIONS NEED ROOM</p><h1>The Unanswered Room.</h1><p>A quiet story about an answer, an action, and the space between them. Make a choice. See what follows. Go back when you change your mind.</p></header><UnansweredRoom/></main></>;}
