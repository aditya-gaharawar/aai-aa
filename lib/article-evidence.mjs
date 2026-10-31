const stop=new Set('a an the what why how when where is are do does it this that to of in and or for can could should would we i you me us from on with about explain tell please article main point summary'.split(' '));
export function answerFromArticle(article,question){
 const q=question.toLowerCase().trim();if(!q)return {kind:'empty',passages:[]};
 let intent=null;if(/\b(limit|limitations|not been|not run|has not|uncertain|caveat|scope)\b/.test(q))intent='limitations';else if(/\b(experiment|test|propos|next step|protocol)\w*\b/.test(q))intent='proposal';else if(/\b(main point|summary|summar|overview|takeaway)\w*\b/.test(q))intent='summary';
 const terms=[...new Set(q.match(/[a-z0-9]+/g)||[])].filter(t=>t.length>2&&!stop.has(t));
 const passages=article.sections.flatMap((section,si)=>section.paragraphs.map((text,pi)=>({sectionId:section.id,title:section.title,text,refs:section.refs,kind:section.kind,order:si*10+pi})));
 const rank=passages.map(p=>{const text=(p.title+' '+p.text).toLowerCase();let score=terms.reduce((s,t)=>s+(text.includes(t)?1:0),0);if(intent==='limitations'&&p.kind==='limitations')score+=12;if(intent==='proposal'&&p.kind==='proposal')score+=12;if(intent==='summary'&&p.order<3)score+=12;return {...p,score};}).filter(p=>p.score>0).sort((a,b)=>b.score-a.score||a.order-b.order);
 if(!rank.length)return {kind:'not-found',passages:[]};
 // Return exact passages only. A lexical match is never represented as model confidence.
 return {kind:'extract',passages:rank.slice(0,intent?2:3).map(({score,order,...p})=>p)};
}
