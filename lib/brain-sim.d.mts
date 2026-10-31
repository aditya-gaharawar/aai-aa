export const BRAIN_BLOCKS:{id:string;name:string;symbol:string;description:string}[];
export const BRAIN_SCENARIOS:{id:string;name:string;observation:string;memory:string;goal:string;sensitive:boolean;description:string}[];
export interface BrainTrace {block:string;message:string;observed:boolean;recalled:boolean;plan:string|null;checked:boolean;executed:string|null;blocked:boolean}
export function simulateBrain(pipeline:string[],scenarioId:string):{trace:BrainTrace[];success:boolean;unsafe:boolean;blocked:boolean;executed:string|null;steps:number;status:string};
