export const FRAGMENTS=[
 {id:'spark',letter:'F',title:'Where the journey begins',clue:'A small spark waits below the first great view.',url:'/#discovery-spark'},
 {id:'orbit',letter:'O',title:'Between connected ideas',clue:'Follow the lines between questions, then inspect the map’s legend.',url:'/lab/constellation#discovery-orbit'},
 {id:'margin',letter:'U',title:'A note in the margin',clue:'The journal has something beyond its stories.',url:'/blog#discovery-margin'},
 {id:'purpose',letter:'N',title:'Behind the purpose',clue:'Among the principles, curiosity leaves a trace.',url:'/about#discovery-purpose'},
 {id:'carrier',letter:'D',title:'A frequency between frequencies',clue:'Tune the radio to 99.1. The carrier is listening.',url:'/lab/radio#discovery-carrier'}
];
export function cleanFragments(value){return Array.isArray(value)?FRAGMENTS.map(f=>f.id).filter(id=>value.includes(id)):[];}
export function isDiscovered(value){return cleanFragments(value).length===FRAGMENTS.length;}
export function radioStation(frequency){return RADIO_STATIONS.find(s=>Math.abs(s.frequency-frequency)<.06)??null;}
export const RADIO_STATIONS=[
 {frequency:88.4,name:'A good question',tag:'ORIGINS',text:'Useful intelligence begins with a question worth asking. Stay curious about the assumptions, not just the answer.',url:'/about',link:'Meet the ideas behind the work'},
 {frequency:94.7,name:'Evidence, not echoes',tag:'THE JOURNAL',text:'A confident sentence is not a source. Trace the claim back to its evidence, then ask what the experiment actually measured.',url:'/lab/hallucination-room',link:'Enter the Hallucination Room'},
 {frequency:99.1,name:'The hidden carrier',tag:'TRANSMISSION 05',text:'Some signals are only found by looking in the space between things. You have found one of five fragments.',url:'/lab/hidden-frequency',link:'Follow the hidden frequency'},
 {frequency:104.6,name:'Room to remember',tag:'SYSTEMS',text:'A longer context window needs somewhere to live. Explore the memory arithmetic before treating a context length as serving capacity.',url:'/blog/long-context-memory-budget',link:'Read the context memory analysis'},
 {frequency:107.2,name:'The scenic route',tag:'PLAY',text:'A wrong turn can become a small adventure. Three fragments. One portal. No timer, no rush.',url:'/lab/lost-signal',link:'Help a signal find its way home'}
];
