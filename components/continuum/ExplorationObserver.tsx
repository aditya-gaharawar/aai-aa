import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {recordExploration} from '../../lib/observatory';
export function ExplorationObserver(){const router=useRouter();useEffect(()=>{recordExploration(router.asPath);function visit(route:string){recordExploration(route);}router.events.on('routeChangeComplete',visit);return()=>router.events.off('routeChangeComplete',visit);},[router.events]);return null;}
