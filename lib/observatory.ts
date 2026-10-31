import {articles} from './research';
import {cleanJourney,visitRoute} from './continuum.mjs';
export const JOURNEY_KEY='webspaceai:observatory';
export const journeyRoutes=['/','/blog','/lab','/about','/os','/library','/observatory','/desk','/lab/constellation','/lab/unanswered-room','/lab/time-machine','/lab/hallucination-room','/lab/tiny-brain','/lab/radio','/lab/article-assistant','/lab/hidden-frequency','/lab/lost-signal',...articles.map(a=>`/blog/${a.slug}`)];
export const cleanObservatory=(value:unknown)=>cleanJourney(value,journeyRoutes);
export function recordExploration(route:string){try{const raw=JSON.parse(localStorage.getItem(JOURNEY_KEY)||'null'),state=cleanObservatory(raw);if(!state.enabled)return;const next=visitRoute(state,route,Date.now(),journeyRoutes);localStorage.setItem(JOURNEY_KEY,JSON.stringify(next));window.dispatchEvent(new Event(`${JOURNEY_KEY}:change`));}catch{/* Opt-in tracking remains inactive if storage is unavailable. */}}
