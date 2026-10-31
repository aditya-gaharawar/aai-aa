import Link from 'next/link';
import {useRouter} from 'next/router';
import {useDiscovery} from '../../lib/use-discovery';
import {LostSignal} from '../../components/lab/LostSignal';
export default function Play(){const router=useRouter();const {unlocked}=useDiscovery();const bonus=unlocked&&router.query.bonus==='1';return <><main className="studio-page play-page"><Link className="studio-back" href="/lab">← Back to the lab</Link><header className="notfound-intro"><p className="studio-kicker">A SMALL WEBSPACEAI EXPERIMENT</p><h1>Lost Signal.</h1><p>There’s more than one kind of discovery. Sometimes, it’s just finding your way back.</p></header><LostSignal key={bonus?'bonus':'normal'} bonus={bonus}/></main></>;}
