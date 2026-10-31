import Link from 'next/link';
import {FRAGMENTS} from '../../lib/discovery.mjs';
import {useDiscovery} from '../../lib/use-discovery';

export function Fragment({id}:{id:string}){
 const {found,ready,collect,error,unlocked}=useDiscovery();
 const fragment=FRAGMENTS.find(f=>f.id===id)!;
 const active=found.includes(id);
 return <>
  {/* Keep clue links valid without leaving visible collectible UI after completion. */}
  {id!=='carrier'&&<span id={`discovery-${id}`} className="discovery-anchor" aria-hidden="true"/>}
  {ready&&!unlocked&&<aside className={`discovery-fragment ${active?'is-found':''}`} aria-label="Optional discovery fragment">
   <button aria-label={active?`Fragment ${fragment.letter} collected`:`Collect fragment: ${fragment.title}`} aria-pressed={active} disabled={active} onClick={()=>collect(id)}>
    <span aria-hidden="true">{active?fragment.letter:'✧'}</span>
    <span>{active?'A signal recovered.':'Something is hiding in plain sight.'}<small>{active?`${found.length} of 5 fragments found`:'Collect a small fragment ↗'}</small></span>
   </button>
   <Link href="/lab/hidden-frequency">Follow the frequency ↗</Link>
   <span className="fragment-status" role="status">{error||(active?`Fragment ${fragment.letter} is in your collection.`:'')}</span>
  </aside>}
 </>;
}
