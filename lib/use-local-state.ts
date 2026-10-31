import {useCallback,useEffect,useRef,useState} from 'react';
// Hydration-safe local storage with cross-tab updates and immediate writes.
export function useLocalState<T>(key:string,clean:(value:unknown)=>T){
 const [state,setState]=useState<T>(()=>clean(null)),[ready,setReady]=useState(false),[error,setError]=useState('');
 const current=useRef(state),cleanRef=useRef(clean);cleanRef.current=clean;
 useEffect(()=>{function read(){try{const value=cleanRef.current(JSON.parse(localStorage.getItem(key)||'null'));current.current=value;setState(value);setError('');}catch{setError('Storage is unavailable. Changes in this session may not be saved.');}}
 read();setReady(true);function sync(e:StorageEvent){if(e.key===key||e.key===null)read();}function local(){read();}window.addEventListener('storage',sync);window.addEventListener(`${key}:change`,local);return()=>{window.removeEventListener('storage',sync);window.removeEventListener(`${key}:change`,local);};},[key]);
 const update=useCallback((change:(value:T)=>T)=>{const next=change(current.current);current.current=next;setState(next);try{localStorage.setItem(key,JSON.stringify(next));setError('');window.dispatchEvent(new Event(`${key}:change`));}catch{setError('Storage is unavailable. Export a copy to keep your changes.');}},[key]);
 return {state,ready,error,update};
}
export function downloadJson(name:string,value:unknown){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
