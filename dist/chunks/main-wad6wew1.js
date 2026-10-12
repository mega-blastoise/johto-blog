import{o as N,q as g}from"./main-32209p8f.js";import{y as h}from"./main-e8csh8xb.js";import{D as v,E as U,F as c,G as s,z as l}from"./main-25a6pj9c.js";var q=l(v(),1);var i=l(v(),1),G=i.createContext(null);function W({children:e,didCatch:t,error:r,resetErrorBoundary:o}){let n=i.useMemo(()=>({didCatch:t,error:r,resetErrorBoundary:o}),[t,r,o]);return i.createElement(G.Provider,{value:n},e)}var b={didCatch:!1,error:null};class w extends i.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=b}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(...e){let{didCatch:t}=this.state;t&&(this.props.onReset?.({args:e,reason:"imperative-api"}),this.setState(b))}componentDidCatch(e,t){this.props.onError?.(e,t)}componentDidUpdate(e,t){let{didCatch:r}=this.state,{resetKeys:o}=this.props;r&&t.didCatch&&I(e.resetKeys,o)&&(this.props.onReset?.({next:o,prev:e.resetKeys,reason:"keys"}),this.setState(b))}render(){let{children:e,fallbackRender:t,FallbackComponent:r,fallback:o}=this.props,{didCatch:n,error:m}=this.state,p=e;if(n){let L={error:m,resetErrorBoundary:this.resetErrorBoundary};if(typeof t=="function")p=t(L);else if(r)p=i.createElement(r,L);else if("fallback"in this.props)p=o;else throw m}return i.createElement(W,{didCatch:n,error:m,resetErrorBoundary:this.resetErrorBoundary},p)}}function I(e=[],t=[]){return e.length!==t.length||e.some((r,o)=>!Object.is(r,t[o]))}var y=l(c(),1);function H(){return y.jsxDEV("div",{className:"query-loader",role:"status",children:[y.jsxDEV("span",{className:"query-loader__signal","aria-hidden":"true"},void 0,!1,void 0,this),y.jsxDEV("span",{children:s.common.loading},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}var A=H;var d=l(c(),1);function Z({reset:e}){return d.jsxDEV("section",{className:"page-intro page-intro--narrow error-state","aria-live":"assertive",children:[d.jsxDEV("p",{className:"eyebrow",children:s.common.errorEyebrow},void 0,!1,void 0,this),d.jsxDEV("h1",{children:s.common.errorTitle},void 0,!1,void 0,this),d.jsxDEV("p",{children:s.common.errorDescription},void 0,!1,void 0,this),d.jsxDEV("div",{className:"hero__actions",children:[e?d.jsxDEV("button",{className:"button button--primary",onClick:e,type:"button",children:s.common.retry},void 0,!1,void 0,this):null,d.jsxDEV(h,{className:"button button--quiet",to:"/posts/",children:s.common.backToJournal},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}var C=Z;var u=l(c(),1);function $({children:e,placeholder:t=u.jsxDEV(A,{},void 0,!1,void 0,this)}){return u.jsxDEV(N,{children:({reset:r})=>u.jsxDEV(w,{fallbackRender:({resetErrorBoundary:o})=>u.jsxDEV(C,{reset:o},void 0,!1,void 0,this),onReset:r,children:u.jsxDEV(q.Suspense,{fallback:t,children:e},void 0,!1,void 0,this)},void 0,!1,void 0,this)},void 0,!1,void 0,this)}var J=$;var P=[{title:"Meta Brief Template: Weekly Decisions, Not Tier Lists",slug:"meta-brief-template",excerpt:"A source-aware format snapshot that turns field reads into concrete deck and tech choices.",date:"2026-10-12",updated:"2026-10-12",kind:"meta-brief",format:"standard",tags:["meta-brief","tournament-prep","template"],featured:!0,visible:!0,body:`## Snapshot boundary

Set the date, format, geography or event class, and source window before writing a conclusion. A metagame report without a boundary ages into misinformation quickly.

## What changed

List the archetypes or card packages that gained or lost share in your sources. Link the evidence in the published version, and label any inference as an inference.

## The room I am preparing for

Turn the snapshot into an expected field. Use ranges when the sample is thin. The goal is not false precision; it is a decision about what your sixty needs to beat.

## Deck selection implications

- **Play:** [archetype or shell] because [field reason].
- **Respect:** [archetype] with [specific answer or sequencing rule].
- **Cut:** [card or package] because [opportunity cost].
- **Test:** [one unresolved matchup or tech package].

## Confidence and expiry

Write down what would invalidate the brief: a new set, a regional result, a format change, or simply another week of data. Update the date when the judgement changes, not merely when the prose is polished.`},{title:"Deck Report Template: From Sixty Cards to Seven Rounds",slug:"deck-report-template",excerpt:"A compact structure for publishing the version, matchup plan, and change log that matter after testing.",date:"2026-10-12",updated:"2026-10-12",kind:"deck-report",format:"standard",tags:["deck-report","template","testing"],featured:!0,visible:!0,deck:{archetype:"[Your archetype]",version:"[List version]",event:"[Event or testing window]",record:"[Record, if applicable]"},body:`## Snapshot

Replace the bracketed fields in the frontmatter before publishing. Start with the tournament, format, and list version. A reader should be able to tell in ten seconds whether the report applies to the room they are entering.

## What this version is trying to do

State the deck’s job in one or two sentences. Name the expected field pressure and the line this build is optimized to create. Avoid describing every card; explain the constraint that shaped the sixty.

## The list

Paste a PTCGL export or a count-by-count list here. Keep the list adjacent to the version name so later revisions do not overwrite history.

## Matchup plan

For each matchup that mattered in testing, record the prize map, the turn-order preference, the first two resources you protect, and the card that changes the game. Separate a tested line from a theory you have not played yet.

## Change log

- **In:** [card] — [the problem it solves]
- **Out:** [card] — [why it lost the slot]
- **Still unresolved:** [one question to test next]

## Next event

End with a clear decision: register this version, test one fork, or move to a different archetype. That conclusion is more useful than a vague verdict.`},{title:"The Prize Map Protocol",slug:"prize-map-protocol",excerpt:"A decision log for players who need every list, matchup note, and format read to earn its place between rounds.",date:"2026-10-12",updated:"2026-10-12",kind:"process",format:"mixed",tags:["process","testing","tournament-prep"],featured:!0,visible:!0,body:`## The premise

Competitive notes should shorten decisions, not turn into a second hobby. Prize Map is built around a simple rule: every published claim needs a format, a date, a condition, and a next action.

That means a deck report is not a 60-card dump. It is the specific version played, the room it was built for, the changes that earned their slots, and the matchups that still need work.

## The reporting standard

- **Deck reports** lead with the list version, event context, and the one thing the list is trying to punish.
- **Meta briefs** are dated snapshots. They distinguish observed results from a hypothesis worth testing.
- **Tournament logs** preserve sequencing, prize mapping, and turning points rather than only round scores.
- **Tech notes** answer one question: when is this card worth a slot over the next-best option?

## What to expect here

The early posts in this repository are intentionally useful authoring templates, not fake claims about a live metagame. Replace them with your own results and source-backed snapshots as the tournament season moves.

The goal is a reliable pre-round read: what you expect to face, what you chose to play, and exactly where the list can break.`}];function f(e){return[...e].sort((t,r)=>r.updated.localeCompare(t.updated))}function O(e){let t=f(e),r=t.filter((n)=>n.featured).slice(0,3),o=new Set(r.map((n)=>n.slug));return{featuredPosts:r,recentPosts:t.filter((n)=>!o.has(n.slug)).slice(0,3),latestBrief:t.find((n)=>n.kind==="meta-brief")}}function Y(e,t,r){let o=t.trim().toLowerCase();return f(e).filter((n)=>{let m=r==="all"||n.kind===r,p=[n.title,n.excerpt,n.kind,n.format,...n.tags].join(" ").toLowerCase();return m&&(!o||p.includes(o))})}function k(e,t){return t.filter((r)=>r.slug!==e.slug).map((r)=>({candidate:r,relevance:r.tags.filter((o)=>e.tags.includes(o)).length})).sort((r,o)=>o.relevance-r.relevance||o.candidate.updated.localeCompare(r.candidate.updated)).slice(0,2).map(({candidate:r})=>r)}class Q{async fetchPosts(){return f(P)}async fetchPost(e){return P.find((t)=>t.slug===e)??null}async fetchRelatedPosts(e){let[t,r]=await Promise.all([this.fetchPost(e),this.fetchPosts()]);return t?k(t,r):[]}}var S=Q;var T=new S,X=["posts"];async function E(){return T.fetchPosts()}async function D(e){return T.fetchPost(e)}async function V(e){return T.fetchRelatedPosts(e)}function Le(){return g({queryKey:X,queryFn:E})}function Ce(e){return g({queryKey:["post",e],queryFn:()=>D(e)})}function Ne(e){return g({queryKey:["related-posts",e],queryFn:()=>V(e)})}function R(e){return`/posts/${e}/`}function K(e){return new Intl.DateTimeFormat("en-US",{day:"numeric",month:"short",timeZone:"UTC",year:"numeric"}).format(new Date(`${e}T00:00:00Z`))}function x(e){return s.articleKinds[e]}function z(e){return s.formats[e.format]}function B(e,t){return e.replace(/\{(\w+)\}/gu,(r,o)=>{let n=t[o];return n===void 0?r:String(n)})}var F=l(v(),1);var a=l(c(),1);function j({article:e,priority:t=!1}){return a.jsxDEV("article",{className:t?"article-card article-card--priority":"article-card",children:[a.jsxDEV("div",{className:"article-card__eyebrow",children:[a.jsxDEV("span",{className:"type-pill",children:x(e.kind)},void 0,!1,void 0,this),a.jsxDEV("time",{dateTime:e.updated,children:B(s.common.updated,{date:K(e.updated)})},void 0,!1,void 0,this)]},void 0,!0,void 0,this),a.jsxDEV("h2",{children:a.jsxDEV(h,{to:R(e.slug),children:e.title},void 0,!1,void 0,this)},void 0,!1,void 0,this),a.jsxDEV("p",{children:e.excerpt},void 0,!1,void 0,this),e.deck?a.jsxDEV("dl",{className:"deck-context","aria-label":s.article.deckContextLabel,children:[a.jsxDEV("div",{children:[a.jsxDEV("dt",{children:s.article.build},void 0,!1,void 0,this),a.jsxDEV("dd",{children:e.deck.version},void 0,!1,void 0,this)]},void 0,!0,void 0,this),a.jsxDEV("div",{children:[a.jsxDEV("dt",{children:s.article.formatLabel},void 0,!1,void 0,this),a.jsxDEV("dd",{children:z(e)},void 0,!1,void 0,this)]},void 0,!0,void 0,this),e.deck.event?a.jsxDEV("div",{children:[a.jsxDEV("dt",{children:s.article.window},void 0,!1,void 0,this),a.jsxDEV("dd",{children:e.deck.event},void 0,!1,void 0,this)]},void 0,!0,void 0,this):null]},void 0,!0,void 0,this):null,a.jsxDEV("footer",{className:"article-card__footer",children:[a.jsxDEV("span",{children:e.tags.slice(0,3).join(" · ")},void 0,!1,void 0,this),a.jsxDEV(h,{className:"text-link",to:R(e.slug),children:[s.common.readNote," ",a.jsxDEV("span",{"aria-hidden":"true",children:"→"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}var _=j;var M=l(c(),1);function ee(e){return M.jsxDEV(_,{...e},void 0,!1,void 0,this)}var te=U(F.memo)(ee);export{J as a,O as b,Y as c,Le as d,Ce as e,Ne as f,R as g,K as h,x as i,z as j,B as k,te as l};

//# debugId=7A8E8961CE7E43EA64756E2164756E21
