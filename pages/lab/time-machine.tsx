import Link from 'next/link';
import {TimeMachine} from '../../components/continuum/TimeMachine';
export default function Page(){return <><main className="continuum-page"><header className="continuum-intro"><Link href="/lab">← The Curiosity Lab</Link><p className="continuum-eyebrow">2017 — 2025 / EIGHT MOMENTS TO REVISIT</p><h1>Good questions<br/><em>travel through time.</em></h1><p>Turn the dial. Revisit a paper. Notice what it changed, what it tested, and what it left for the next curious person.</p></header><TimeMachine/></main></>;}
