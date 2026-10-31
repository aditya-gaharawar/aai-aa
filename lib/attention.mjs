export const TOKENS=[{word:'the',key:[.1,.2,.1]},{word:'curious',key:[.8,.2,.5]},{word:'robot',key:[1,.9,.2]},{word:'finds',key:[.4,.7,1]},{word:'a',key:[.1,.1,.1]},{word:'path',key:[.6,.8,.9]}];
export function attentionWeights(query,temperature=1){
 if(!Number.isFinite(temperature)||temperature<=0)throw new RangeError('Temperature must be positive.');
 if(query.length!==3||query.some(v=>!Number.isFinite(v)))throw new RangeError('Expected three finite query values.');
 const scores=TOKENS.map(t=>t.key.reduce((sum,v,i)=>sum+v*query[i],0)/Math.sqrt(3)/temperature);
 const max=Math.max(...scores),exp=scores.map(s=>Math.exp(s-max)),total=exp.reduce((a,b)=>a+b,0);
 return exp.map(v=>v/total);
}
