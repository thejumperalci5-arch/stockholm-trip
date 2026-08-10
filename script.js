const app=document.getElementById("app"),fx=document.getElementById("fx"),rate=.0917;
const SWEDEN_FLAG=`<span class="se-flag" aria-label="Bandera de Suecia"></span>`;
const SEFLAG=`<span class="se-flag" aria-label="Bandera de Suecia"></span>`;
const data=[
 {theme:"postcard",time:"14:00",day:"VIERNES 18",title:"Primera misión: aterrizar en Estocolmo",sub:"10:35 · Arlanda. Dejamos las maletas y elegimos cómo queremos conocer la ciudad.",alc:"A",opts:[
  {k:"A",e:"🏘️",t:"Gamla Stan",d:"Callejuelas, Stortorget y Estocolmo de postal.",sek:0,cls:"gamla"},
  {k:"B",e:"⛵",t:"Strandvägen",d:"Agua, barcos y paseo elegante.",sek:0,cls:"water"},
  {k:"C",e:"☕",t:"Fika primero",d:"Azúcar en sangre antes de tomar decisiones serias.",sek:120,cls:"fika-photo"}]},
 {theme:"cafe",time:"16:30",day:"VIERNES 18",title:"La fika es un asunto de Estado",sub:"Una consumición. Una elección. Cero posibilidad de copiar.",alc:"C",opts:[
  {k:"A",e:"🍥",t:"Kanelbulle",d:"Canela. Clásico sueco. Candidato muy serio.",sek:65},
  {k:"B",e:"🌿",t:"Kardemummabulle",d:"Cardamomo. Para gente que parece saber de fika.",sek:65},
  {k:"C",e:"🍰",t:"Prinsesstårta",d:"Una tarta verde llamada princesa. Caso cerrado.",sek:85}]},
 {theme:"night",time:"20:30",day:"VIERNES 18",title:"Una última cosa antes de dormir…",sub:"El despertador para Málaga habrá sonado a una hora criminal. Elige sabiamente.",alc:"A",opts:[
  {k:"A",e:"🌅",t:"Monteliusvägen",d:"Vistas sobre el agua y permiso para ponerse románticos.",sek:0},
  {k:"B",e:"🌙",t:"Gamla Stan nocturno",d:"Callejear con luces y menos gente.",sek:0},
  {k:"C",e:"🍸",t:"Cocktail inaugural",d:"Brindar por haber sobrevivido al día uno.",sek:170}]}
];
let state={i:0,answers:[],resolved:{},spins:{Anaïs:3,Alcides:3},used:{Anaïs:0,Alcides:0},wheelQueue:[],wheelIndex:0,wheelLast:null};
const eur=n=>(n*rate).toFixed(2).replace(".",",");
function money(sek){return `${money(sek)}`;}
const floats=()=>`<span class="float f1">✦</span><span class="float f2"><span class="se-flag" aria-label="Bandera de Suecia"></span></span><span class="float f3">⛵</span><span class="float f4">♡</span>`;
function welcome(){app.innerHTML=`<section class="screen hero-scene">${floats()}<section class="card hero"><span class="sticker">✈ OPERATION STOCKHOLM</span><h1>STOCKHOLM<span>18 — 22 SEPT · 2026</span></h1><p>Dos personas. Una ciudad.<br><b>Y 3 re-spins por cabeza para negociar con el destino.</b></p><button class="btn primary" id="go">EMPEZAR EL JUEGO →</button><p class="tiny">🎟️ Anaïs ×3 &nbsp; · &nbsp; 🎟️ Alcides ×3 &nbsp; · &nbsp; válidos para todo el viaje</p></section></section>`;document.getElementById("go").onclick=render}
function shell(q,inner,cls){return `<section class="screen ${cls}">${cls==="night-scene"?'<div class="stars"></div>':""}<section class="card ${q.theme==="postcard"?"postcard-card":q.theme==="cafe"?"menu-card":"night-card"}"><div class="top"><span class="pill">${q.day}</span><div class="progress"><div style="width:${state.i/data.length*100}%"></div></div><span class="count">${state.i+1}/${data.length}</span></div><div class="head ${q.theme==="cafe"?"menu-title":""}"><div class="mini">DECISIÓN ${state.i+1} · ELECCIÓN SECRETA</div><h2>${q.title}</h2><p>${q.sub}</p></div>${inner}</section></section>`}
function render(){
 let q=data[state.i],a=state.answers[state.i],inner="";
 if(q.theme==="postcard")inner=`<div class="postcards">${q.opts.map(o=>`<button class="postcard ${a===o.k?"selected":""}" data-k="${o.k}"><div class="photo ${o.cls}">${o.e}</div><span class="stamp">STOCKHOLM</span><strong>${o.t}</strong><small>${o.d}</small><small>${o.sek?`${money(o.sek)}`:"GRATIS ✨"}</small></button>`).join("")}</div>`;
 if(q.theme==="cafe")inner=`<div class="menu-options">${q.opts.map(o=>`<button class="menu-option ${a===o.k?"selected":""}" data-k="${o.k}"><span class="food">${o.e}</span><span><strong>${o.t}</strong><small>${o.d}</small></span><span class="menu-price">${money(o.sek)}<br><small>~${eur(o.sek)} €</small></span></button>`).join("")}</div>`;
 if(q.theme==="night")inner=`<div class="tickets">${q.opts.map(o=>`<button class="ticket ${a===o.k?"selected":""}" data-k="${o.k}"><div class="ticket-top">${o.e}</div><div class="ticket-body"><strong>${o.t}</strong><small>${o.d}</small><small>${o.sek?`${money(o.sek)}`:"ENTRADA: GRATIS"}</small></div></button>`).join("")}</div>`;
 inner+=a?`<div class="lock"><small>🔐 ALCIDES YA ELIGIÓ. ¿ABRIMOS EL SOBRE?</small><button class="btn primary" id="reveal">REVELAR SU ELECCIÓN</button></div>`:"";
 app.innerHTML=shell(q,inner,q.theme==="postcard"?"postcard-scene":q.theme==="cafe"?"cafe-scene":"night-scene");
 document.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{state.answers[state.i]=b.dataset.k;render()});
 if(document.getElementById("reveal"))document.getElementById("reveal").onclick=()=>startReveal(q)
}
function startReveal(q){fx.innerHTML=`<div class="overlay"><div class="revealbox"><div class="bigicon">${q.theme==="postcard"?"💌":q.theme==="cafe"?"☕":"🎟️"}</div><div class="loading">RECUPERANDO ELECCIÓN DE ALCIDES…</div><h2 style="font:500 clamp(2rem,7vw,4.5rem)/1 Georgia,serif">No vale cambiar de opinión ahora.</h2></div></div>`;setTimeout(()=>countdown(3,q),900)}
function countdown(n,q){fx.innerHTML=`<div class="overlay"><div class="countdown">${n}</div></div>`;n>1?setTimeout(()=>countdown(n-1,q),560):setTimeout(()=>secret(q),560)}
function secret(q){let o=q.opts.find(x=>x.k===q.alc);fx.innerHTML=`<div class="overlay"><div class="revealbox"><div class="secret"><div class="loading">ALCIDES ELIGIÓ…</div><div class="emoji">${o.e}</div><h3>${o.t}</h3></div></div></div>`;setTimeout(()=>result(q,o),1100)}
function result(q,o){
 let mine=q.opts.find(x=>x.k===state.answers[state.i]),m=mine.k===o.k;
 if(m)state.resolved[state.i]=mine.k;
 fx.innerHTML=`<div class="result ${m?"match":"nomatch"}"><div id="rb"><div style="font-size:3rem">${m?"💛✨":`🚨`}</div><div class="resultword">${m?"MATCH!":"NO MATCH"}</div><div class="joke">${m?"Suecia respira tranquila.":"Asunto enviado al Consejo de Estocolmo."}</div><div class="compare"><span>Anaïs · ${mine.e} ${mine.t}</span><span>Alcides · ${o.e} ${o.t}</span></div><button class="btn primary" id="next">${state.i===data.length-1?"VER RESUMEN DEL DÍA":"SIGUIENTE →"}</button></div></div>`;
 if(m)confetti();else rb.classList.add("shake");document.getElementById("next").onclick=()=>{fx.innerHTML="";state.i===data.length-1?dailyReport():(state.i++,render())}
}
function confetti(){let colors=["#ffd85a","#246f9e","#fff","#ef7f9a","#75b79e"];for(let i=0;i<50;i++){let d=document.createElement("i");d.className="confetti";d.style.left=Math.random()*100+"vw";d.style.background=colors[i%colors.length];d.style.setProperty("--d",(1.7+Math.random()*1.6)+"s");d.style.setProperty("--x",(-100+Math.random()*200)+"px");fx.appendChild(d);setTimeout(()=>d.remove(),3500)}}
function personCost(person){
 return data.reduce((t,q,i)=>{let key=person==="Anaïs"?state.answers[i]:q.alc;return t+(q.opts.find(o=>o.k===key)?.sek||0)},0)
}
function officialCost(){return data.reduce((t,q,i)=>t+(q.opts.find(o=>o.k===state.resolved[i])?.sek||0),0)}
function dailyReport(){
 let mismatches=data.map((q,i)=>state.answers[i]!==q.alc?i:null).filter(x=>x!==null);
 state.wheelQueue=mismatches;state.wheelIndex=0;
 let ac=personCost("Anaïs"),bc=personCost("Alcides");
 app.innerHTML=`<section class="screen report-scene">${floats()}<section class="card summary"><div class="report-header"><div><span class="sticker">INFORME DEL VIERNES</span><h2>Consejo de Estocolmo</h2><p>Los MATCH están aprobados. Lo demás… tendrá que enfrentarse a las cartas del destino.</p></div><div class="report-stamp">${mismatches.length?"ASUNTOS PENDIENTES":"DÍA PERFECTO"}</div></div>
 <div class="decision-list">${data.map((q,i)=>{let a=q.opts.find(o=>o.k===state.answers[i]),b=q.opts.find(o=>o.k===q.alc),m=a.k===b.k;return `<div class="decision ${m?"":"pending"}"><b>${m?"💛 CONFIRMADO":"🚨 ASUNTO PENDIENTE"} · ${q.title}</b><p>Anaïs: ${a.e} ${a.t} · ${money(a.sek)}</p><p>Alcides: ${b.e} ${b.t} · ${money(b.sek)}</p></div>`}).join("")}</div>
 <div class="budgets"><div class="budget-card ana"><span>PRESUPUESTO ANAÏS</span><strong>${ac} SEK</strong><small>~${eur(ac)} €</small></div><div class="budget-card alc"><span>PRESUPUESTO ALCIDES</span><strong>${bc} SEK</strong><small>~${eur(bc)} €</small></div><div class="budget-card official-budget"><span>RE-SPINS RESTANTES</span><strong>🎟️ ${state.spins["Anaïs"]} · 🎟️ ${state.spins["Alcides"]}</strong><small>Anaïs · Alcides</small></div></div>
 <div class="actions"><button class="btn primary" id="council">${mismatches.length?"IR A LAS CARTAS DEL DESTINO 🃏":"APROBAR EL DÍA 💛"}</button></div></section></section>`;
 council.onclick=()=>mismatches.length?wheelScreen():officialDay()
}
function wheelOptions(q){
 let keys=[state.answers[state.wheelQueue[state.wheelIndex]],q.alc];
 let third=q.opts.find(o=>!keys.includes(o.k));
 return [q.opts.find(o=>o.k===keys[0]),q.opts.find(o=>o.k===keys[1]),third];
}
function wheelScreen(){
 let qi=state.wheelQueue[state.wheelIndex],q=data[qi],opts=wheelOptions(q);
 state.wheelLast=null;
 cardTable(q,opts,null);
}
function cardTable(q,opts,excluded){
 const labels=["👩 ANAÏS","👨 ALCIDES","🃏 COMODÍN"];
 const active=opts.filter(o=>o.k!==excluded);
 app.innerHTML=`<section class="screen cards-scene"><section class="card cards-panel">
 <span class="sticker">LAS CARTAS DEL DESTINO</span>
 <h2>Suecia tiene tres planes.</h2>
 <p>Primero te los enseña. Después los esconde. Y entonces eliges tú.</p>
 <div class="respin-board">
   <div class="respin">Anaïs <span class="tokens">${"🎟️".repeat(state.spins["Anaïs"])}${"▫️".repeat(3-state.spins["Anaïs"])}</span></div>
   <div class="respin">Alcides <span class="tokens">${"🎟️".repeat(state.spins["Alcides"])}${"▫️".repeat(3-state.spins["Alcides"])}</span></div>
 </div>
 <div class="deck-table" id="deckTable">
 ${opts.map((o,i)=>`<button class="destiny-card ${excluded===o.k?"card-out":""}" data-key="${o.k}" disabled>
   <span class="card-inner">
    <span class="card-face card-front">
      <small>${labels[i]}</small><b>${o.e}</b><strong>${o.t}</strong><em>${o.sek?money(o.sek):"GRATIS"}</em>
    </span>
    <span class="card-face card-back"><i>♛</i><b>STOCKHOLM</b><span class="mini-flag"></span><small>ÖDET VÄLJER</small></span>
   </span>
 </button>`).join("")}
 </div>
 <div id="cardArea"><button class="btn primary" id="shuffle">BARAJAR LAS CARTAS ✦</button></div>
 <p class="tiny">${excluded?`La opción anterior está fuera de esta ronda. Las dos restantes se esconden y cambian de sitio.`:"Memorízalas si quieres. No te va a servir de mucho."}</p>
 </section></section>`;
 document.getElementById("shuffle").onclick=()=>shuffleCards(q,opts,excluded);
}
async function shuffleCards(q,opts,excluded){
 const cards=[...document.querySelectorAll(".destiny-card")];
 const live=cards.filter(c=>!c.classList.contains("card-out"));
 const button=document.getElementById("shuffle");
 button.disabled=true;
 button.textContent="BARAJANDO…";
 document.getElementById("cardArea").insertAdjacentHTML("afterbegin",`<div class="shuffle-status" id="shuffleStatus">1 · OCULTANDO LAS CARTAS</div>`);

 // 1) Girarlas boca abajo.
 live.forEach((c,i)=>setTimeout(()=>c.classList.add("flipped"),i*120));
 await wait(850);

 const table=document.getElementById("deckTable");
 const tableRect=table.getBoundingClientRect();
 const centerX=tableRect.left + tableRect.width/2;
 const centerY=tableRect.top + tableRect.height/2;

 // Guardamos sus posiciones visuales actuales.
 const starts=live.map(c=>{
   const r=c.getBoundingClientRect();
   return {c, x:(r.left+r.width/2)-centerX, y:(r.top+r.height/2)-centerY};
 });

 document.getElementById("shuffleStatus").textContent="2 · JUNTANDO EL MAZO";

 // 2) Ir al centro, claramente superpuestas.
 await Promise.all(starts.map(({c,x,y},i)=>{
   c.style.zIndex=10+i;
   const a=c.animate([
     {transform:"translate(0,0) rotate(0deg)"},
     {transform:`translate(${-x}px,${-y}px) rotate(${(i-1)*5}deg) scale(.98)`}
   ],{duration:650,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"});
   return a.finished.catch(()=>{});
 }));
 await wait(180);

 document.getElementById("shuffleStatus").textContent="3 · BARAJANDO EL DESTINO";

 // 3) Barajado visible: abanico -> cruce -> intercambio -> centro.
 const spread = live.length===3 ? [-150,0,150] : [-100,100];
 const cross  = live.length===3 ? [145,-145,0] : [90,-90];

 for(let round=0; round<3; round++){
   await Promise.all(live.map((c,i)=>{
     const sign=round%2===0?1:-1;
     const a=c.animate([
       {transform:`translate(${spread[i]*.15}px,0) rotate(${(i-(live.length-1)/2)*5}deg) scale(.98)`},
       {transform:`translate(${spread[i]*sign}px,${i%2===0?-26:24}px) rotate(${(i-(live.length-1)/2)*12*sign}deg) scale(1.02)`},
       {transform:`translate(${cross[i]*sign}px,${i%2===0?18:-20}px) rotate(${(1-i)*10*sign}deg) scale(.99)`},
       {transform:"translate(0,0) rotate(0deg) scale(.98)"}
     ],{duration:720,easing:"cubic-bezier(.35,.05,.2,1)",fill:"forwards"});
     return a.finished.catch(()=>{});
   }));
 }

 // 4) Reordenación real aleatoria.
 let order=live.map(c=>c.dataset.key);
 for(let r=0;r<10;r++) order.sort(()=>Math.random()-.5);

 order.forEach(k=>table.appendChild(cards.find(c=>c.dataset.key===k)));
 cards.filter(c=>c.classList.contains("card-out")).forEach(c=>table.appendChild(c));

 // Cancelamos animaciones y limpiamos estilos para que no se queden "pilladas".
 live.forEach(c=>{
   c.getAnimations().forEach(a=>a.cancel());
   c.style.transform="";
   c.style.zIndex="";
 });

 document.getElementById("shuffleStatus").textContent="4 · REPARTIENDO";

 // 5) Reparto individual bien visible.
 const liveNow=[...table.querySelectorAll(".destiny-card:not(.card-out)")];
 liveNow.forEach((c,i)=>{
   c.classList.add("dealing-v62");
   c.style.animationDelay=`${i*180}ms`;
 });

 await wait(1050);
 liveNow.forEach(c=>{
   c.classList.remove("dealing-v62");
   c.style.animationDelay="";
   c.disabled=false;
   c.classList.add("pickable");
   c.onclick=()=>pickCard(q,opts,c);
 });

 document.getElementById("shuffleStatus").remove();
 document.getElementById("cardArea").innerHTML=`<div class="choose-call">✦ ELIGE UNA CARTA ✦<small>Ahora sí: están mezcladas de verdad.</small></div>`;
}

function wait(ms){ return new Promise(resolve=>setTimeout(resolve,ms)); }
function pickCard(q,opts,card){
 const key=card.dataset.key,result=opts.find(o=>o.k===key);
 document.querySelectorAll(".destiny-card").forEach(c=>{c.disabled=true;c.classList.remove("pickable")});
 card.classList.add("chosen");
 setTimeout(()=>card.classList.remove("flipped"),350);
 setTimeout(()=>cardDecision(q,opts,result,card),1250);
}
function cardDecision(q,opts,result,card){
 state.wheelLast=result.k;
 let qi=state.wheelQueue[state.wheelIndex];
 let wildcard=result.k!==state.answers[qi]&&result.k!==q.alc;
 document.getElementById("cardArea").innerHTML=`<div class="card-verdict">
 <small>${wildcard?"🃏 JACKPOT DEL CAOS":"✦ DESTINO SELLADO"}</small>
 <h3>${result.e} ${result.t}</h3>
 <p>${wildcard?"Habéis conseguido escoger algo que ninguno de los dos había elegido. Suecia está orgullosa.":"La carta ya está sobre la mesa. ¿La aceptamos?"}</p>
 </div><div class="center-result">
 <button class="btn primary" id="accept">ACEPTAMOS EL DESTINO</button>
 <button class="btn danger ${state.spins["Anaïs"]<=0?"disabled":""}" id="ra">SEGUNDA OPORTUNIDAD ANAÏS (${state.spins["Anaïs"]})</button>
 <button class="btn danger ${state.spins["Alcides"]<=0?"disabled":""}" id="rb2">SEGUNDA OPORTUNIDAD ALCIDES (${state.spins["Alcides"]})</button>
 </div>`;
 document.getElementById("accept").onclick=()=>acceptWheel(result);
 if(state.spins["Anaïs"]>0)document.getElementById("ra").onclick=()=>cardRetry("Anaïs",q,opts,result.k);
 if(state.spins["Alcides"]>0)document.getElementById("rb2").onclick=()=>cardRetry("Alcides",q,opts,result.k);
}
function cardRetry(person,q,opts,excluded){
 state.spins[person]--;state.used[person]++;
 cardTable(q,opts,excluded);
}
function respin(person,q,opts,excluded){cardRetry(person,q,opts,excluded)}
function acceptWheel(result){
 let qi=state.wheelQueue[state.wheelIndex];state.resolved[qi]=result.k;
 if(state.wheelIndex<state.wheelQueue.length-1){state.wheelIndex++;wheelScreen()}else officialDay()
}
function officialDay(){
 let cost=officialCost(),ac=personCost("Anaïs"),bc=personCost("Alcides");
 app.innerHTML=`<section class="screen official-scene"><section class="card official"><span class="sticker">ITINERARIO OFICIAL</span><h2>Viernes 18 · aprobado.</h2><p>Lo que coincidió entró directamente. Lo que no, sobrevivió a las Cartas del Destino.</p>
 <div class="timeline"><div class="timeline-item"><small>10:35</small><strong>✈️ Llegada a Arlanda</strong><span>Traslado a Estocolmo y dejar equipaje.</span></div>${data.map((q,i)=>{let o=q.opts.find(x=>x.k===state.resolved[i]);return `<div class="timeline-item"><small>${q.time}</small><strong>${o.e} ${o.t}</strong><span>${o.d}</span></div>`}).join("")}</div>
 <div class="budgets"><div class="budget-card ana"><span>ANAÏS HABÍA ELEGIDO</span><strong>${ac} SEK</strong><small>~${eur(ac)} €</small></div><div class="budget-card alc"><span>ALCIDES HABÍA ELEGIDO</span><strong>${bc} SEK</strong><small>~${eur(bc)} €</small></div><div class="budget-card official-budget"><span>PLAN GANADOR</span><strong>${money(cost)}</strong><small>~${eur(cost)} €</small></div></div>
 <div style="text-align:center;margin-top:25px"><div class="approved"> DAY 1 · APPROVED</div><p class="tiny">Re-spins gastados · Anaïs ${state.used["Anaïs"]}/3 · Alcides ${state.used["Alcides"]}/3</p><p class="tiny">Restantes · Anaïs ${state.spins["Anaïs"]}/3 · Alcides ${state.spins["Alcides"]}/3</p><button class="btn primary" id="saturday">CONTINUAR AL SÁBADO 19 →</button><button class="btn secondary" id="again">↻ Repetir viernes</button></div></section></section>`;
 document.getElementById("saturday").onclick=saturdayIntro; again.onclick=()=>{state={i:0,answers:[],resolved:{},spins:{Anaïs:3,Alcides:3},used:{Anaïs:0,Alcides:0},wheelQueue:[],wheelIndex:0,wheelLast:null};welcome()}
}
welcome();


/* ===== V7 · SÁBADO 19 ===== */
const saturdayData=[
 {time:"09:30",kind:"museum",title:"¿Cómo empezamos Djurgården?",sub:"Primer gran plan del sábado. Algo muy Estocolmo, pero con energías diferentes.",alc:"A",opts:[
  {k:"A",e:"⚓",t:"Museo Vasa",d:"El barco del siglo XVII que se hundió en su viaje inaugural.",sek:240},
  {k:"B",e:"🎤",t:"ABBA The Museum",d:"Pop sueco, luces y cero vergüenza cantando.",sek:299},
  {k:"C",e:"🌿",t:"Skansen",d:"Museo al aire libre, historia sueca y paseo por Djurgården.",sek:305}]},
 {time:"14:30",kind:"afternoon",title:"Después de comer, ¿qué hacemos?",sub:"La tarde puede seguir intensa… o podemos bajar un poco las revoluciones.",alc:"B",opts:[
  {k:"A",e:"🎨",t:"Otro museo",d:"Aprovechar Djurgården y seguir en modo cultural.",sek:250},
  {k:"B",e:"🚶",t:"Paseo por Djurgården",d:"Agua, jardines y Estocolmo sin necesidad de correr.",sek:0},
  {k:"C",e:"⛴️",t:"Barco panorámico",d:"Cambiar las piernas por agua y ver la ciudad desde otra perspectiva.",sek:285}]},
 {time:"19:30",kind:"dinner",title:"La gran pregunta del sábado: ¿qué cenamos?",sub:"Aquí sí estamos decidiendo el tono de la noche.",alc:"A",opts:[
  {k:"A",e:"",t:"Cena sueca",d:"Husmanskost, albóndigas y cocina tradicional.",sek:350},
  {k:"B",e:"❤️",t:"Cena romántica",d:"Priorizar ambiente y una noche un poco más especial.",sek:500},
  {k:"C",e:"🌍",t:"Internacional",d:"Libertad total para elegir según lo que apetezca ese día.",sek:350}]}
];
let sat={i:0,answers:[],resolved:{},queue:[],queueIndex:0,score:0,max:3,dinnerPlace:null};

function saturdayIntro(){
 app.innerHTML=`<section class="screen saturday-scene">${floats()}<section class="card saturday-cover">
 <span class="sticker">DÍA 2 · SÁBADO 19</span>
 <div class="sat-date">19</div><h2>God morgon, Stockholm.</h2>
 <p>Hoy toca Djurgården, una decisión importante para cenar y comprobar si seguimos siendo compatibles después del viernes.</p>
 <div class="carry"><b>SEGUNDAS OPORTUNIDADES QUE SOBREVIVIERON AL DÍA 1</b><span>Anaïs · ${"🎟️".repeat(state.spins["Anaïs"])}${"▫️".repeat(3-state.spins["Anaïs"])}</span><span>Alcides · ${"🎟️".repeat(state.spins["Alcides"])}${"▫️".repeat(3-state.spins["Alcides"])}</span></div>
 <button class="btn primary" id="startSat">EMPEZAR EL SÁBADO →</button>
 </section></section>`;
 document.getElementById("startSat").onclick=renderSaturday;
}
function satTheme(q){
 if(q.kind==="museum")return "museum";
 if(q.kind==="afternoon")return "park";
 return "restaurant";
}
function renderSaturday(){
 const q=saturdayData[sat.i], chosen=sat.answers[sat.i], theme=satTheme(q);
 const label=theme==="museum"?"BILLETE DE MUSEO":theme==="park"?"MAPA DE DJURGÅRDEN":"MENÚ DE NOCHE";
 app.innerHTML=`<section class="screen sat-${theme}"><section class="card sat-question">
 <div class="top"><span class="pill">SÁBADO 19 · ${q.time}</span><div class="progress"><div style="width:${(sat.i+1)/saturdayData.length*100}%"></div></div><span class="count">${sat.i+1}/3</span></div>
 <div class="head"><div class="mini">${label}</div><h2>${q.title}</h2><p>${q.sub}</p></div>
 <div class="sat-options ${theme}">${q.opts.map(o=>`<button class="sat-option ${chosen===o.k?"selected":""}" data-satk="${o.k}">
 <span class="sat-emoji">${o.e}</span><span><strong>${o.t}</strong><small>${o.d}</small></span><em>${o.sek?`${money(o.sek)}`:"GRATIS"}</em></button>`).join("")}</div>
 ${chosen?`<div class="lock"><small>🔐 ALCIDES YA ELIGIÓ</small><button class="btn primary" id="satReveal">DESCUBRIR SI HAY MATCH</button></div>`:""}
 </section></section>`;
 document.querySelectorAll("[data-satk]").forEach(b=>b.onclick=()=>{sat.answers[sat.i]=b.dataset.satk;renderSaturday()});
 if(chosen)document.getElementById("satReveal").onclick=()=>satReveal(q);
}
function satReveal(q){
 const mine=q.opts.find(o=>o.k===sat.answers[sat.i]);
 const his=q.opts.find(o=>o.k===q.alc);
 const theme=satTheme(q);
 const icon=theme==="museum"?"🎟️":theme==="park"?"🗺️":"🍽️";
 const loading=theme==="museum"?"LOCALIZANDO EL BILLETE DE ALCIDES":theme==="park"?"DESPLEGANDO SU MAPA SECRETO":"CONSULTANDO SU RESERVA";
 fx.innerHTML=`<div class="overlay sat-reveal-overlay ${theme}">
   <div class="revealbox">
     <div class="bigicon">${icon}</div>
     <div class="loading">${loading}…</div>
     <h2 class="sat-reveal-copy">Alcides ya tomó esta decisión.</h2>
   </div>
 </div>`;
 setTimeout(()=>satCountdown(3,q,mine,his),950);
}
function satCountdown(n,q,mine,his){
 fx.innerHTML=`<div class="overlay sat-count-overlay"><div class="countdown">${n}</div></div>`;
 if(n>1)setTimeout(()=>satCountdown(n-1,q,mine,his),560);
 else setTimeout(()=>satSecret(q,mine,his),560);
}
function satSecret(q,mine,his){
 const theme=satTheme(q);
 const label=theme==="museum"?"SU ENTRADA DICE…":theme==="park"?"EN SU MAPA APARECE…":"SU ELECCIÓN PARA LA CENA ES…";
 fx.innerHTML=`<div class="overlay">
   <div class="revealbox">
     <div class="secret sat-secret-card ${theme}">
       <div class="loading">${label}</div>
       <div class="emoji">${his.e||"✦"}</div>
       <h3>${his.t}</h3>
     </div>
   </div>
 </div>`;
 setTimeout(()=>satResult(q,mine,his),1150);
}
function satResult(q,mine,his){
 const match=mine.k===his.k;
 if(match && !sat.resolved[sat.i]){
   sat.resolved[sat.i]=mine.k;
   sat.score++;
 }
 fx.innerHTML=`<div class="result ${match?"match":"nomatch"}">
   <div id="satResultBox">
     <div style="font-size:3rem">${match?"💛✨":"🚨"}</div>
     <div class="resultword">${match?"MATCH!":"NO MATCH"}</div>
     <div class="joke">${match?"+1 ❤️ para la compatibilidad viajera.":"Las Cartas del Destino vuelven a tener trabajo."}</div>
     <div class="compare"><span>Anaïs · ${mine.e||"✦"} ${mine.t}</span><span>Alcides · ${his.e||"✦"} ${his.t}</span></div>
     <button class="btn primary" id="satNext">${sat.i===2?"CONTINUAR":"SIGUIENTE →"}</button>
   </div>
 </div>`;
 if(match)confetti();
 else document.getElementById("satResultBox").classList.add("shake");

 document.getElementById("satNext").onclick=()=>{
   fx.innerHTML="";
   if(sat.i===2){
     if(match && mine.k==="A"){
       sat.resolved[2]="A";
       swedishDinnerChoice();
     }else{
       saturdayReport();
     }
   }else{
     sat.i++;
     renderSaturday();
   }
 };
}
function saturdayReport(){
 sat.queue=saturdayData.map((q,i)=>sat.answers[i]!==q.alc&&!sat.resolved[i]?i:null).filter(i=>i!==null);sat.queueIndex=0;
 app.innerHTML=`<section class="screen sat-report"><section class="card summary">
 <span class="sticker">INFORME DEL SÁBADO</span><h2>Djurgården ha hablado.</h2>
 <div class="decision-list">${saturdayData.map((q,i)=>{let a=q.opts.find(o=>o.k===sat.answers[i]),b=q.opts.find(o=>o.k===q.alc),m=a.k===b.k;return `<div class="decision ${m?"":"pending"}"><b>${m?"💛 CONFIRMADO":"🃏 PENDIENTE"} · ${q.title}</b><p>Anaïs: ${a.e} ${a.t}</p><p>Alcides: ${b.e} ${b.t}</p></div>`}).join("")}</div>
 <div class="compat"><small>COMPATIBILIDAD DEL SÁBADO</small><strong>${sat.score} / ${sat.max} ❤️</strong><span>${sat.score===3?"Sospechosamente coordinados.":sat.score===2?"Podéis viajar juntos sin mediador.":sat.score===1?"Las cartas van a trabajar horas extra.":"Suecia solicita un árbitro."}</span></div>
 <div class="actions"><button class="btn primary" id="resolveSat">${sat.queue.length?"RESOLVER CON LAS CARTAS 🃏":"APROBAR EL SÁBADO"}</button></div>
 </section></section>`;
 document.getElementById("resolveSat").onclick=()=>sat.queue.length?satCards():(sat.resolved[2]==="A"&&!sat.dinnerPlace?swedishDinnerChoice():saturdayOfficial());
}
function satCardOptions(q,qi){
 let keys=[sat.answers[qi],q.alc],third=q.opts.find(o=>!keys.includes(o.k));
 return [q.opts.find(o=>o.k===keys[0]),q.opts.find(o=>o.k===keys[1]),third];
}
function satCards(excluded=null){
 const qi=sat.queue[sat.queueIndex],q=saturdayData[qi],opts=satCardOptions(q,qi);
 const labels=["👩 ANAÏS","👨 ALCIDES","🃏 COMODÍN"];
 app.innerHTML=`<section class="screen cards-scene"><section class="card cards-panel"><span class="sticker">LAS CARTAS DEL DESTINO · SÁBADO</span>
 <h2>${q.title}</h2><div class="respin-board"><div class="respin">Anaïs ${"🎟️".repeat(state.spins["Anaïs"])}${"▫️".repeat(3-state.spins["Anaïs"])}</div><div class="respin">Alcides ${"🎟️".repeat(state.spins["Alcides"])}${"▫️".repeat(3-state.spins["Alcides"])}</div></div>
 <div class="deck-table" id="deckTable">${opts.map((o,i)=>`<button class="destiny-card ${excluded===o.k?"card-out":""}" data-key="${o.k}" disabled><span class="card-inner"><span class="card-face card-front"><small>${labels[i]}</small><b>${o.e}</b><strong>${o.t}</strong><em>${o.sek?money(o.sek):"GRATIS"}</em></span><span class="card-face card-back"><i>♛</i><b>STOCKHOLM</b><span class="mini-flag"></span><small>ÖDET VÄLJER</small></span></span></button>`).join("")}</div>
 <div id="cardArea"><button class="btn primary" id="satShuffle">BARAJAR LAS CARTAS ✦</button></div></section></section>`;
 document.getElementById("satShuffle").onclick=()=>satShuffle(q,opts,excluded);
}
async function satShuffle(q,opts,excluded){
 const cards=[...document.querySelectorAll(".destiny-card")],live=cards.filter(c=>!c.classList.contains("card-out"));
 document.getElementById("satShuffle").disabled=true;
 live.forEach((c,i)=>setTimeout(()=>c.classList.add("flipped"),i*120));await wait(800);
 for(let round=0;round<3;round++){
  await Promise.all(live.map((c,i)=>c.animate([{transform:"translate(0,0)"},{transform:`translate(${(i-1)*(round%2?130:-130)}px,${i%2?22:-22}px) rotate(${(i-1)*10}deg)`},{transform:"translate(0,0)"}],{duration:650,easing:"ease-in-out"}).finished.catch(()=>{})));
 }
 let order=live.map(c=>c.dataset.key);for(let n=0;n<10;n++)order.sort(()=>Math.random()-.5);
 const table=document.getElementById("deckTable");order.forEach(k=>table.appendChild(cards.find(c=>c.dataset.key===k)));
 live.forEach(c=>{c.getAnimations().forEach(a=>a.cancel());c.disabled=false;c.classList.add("pickable");c.onclick=()=>satPick(q,opts,c)});
 document.getElementById("cardArea").innerHTML=`<div class="choose-call">✦ ELIGE UNA CARTA ✦<small>El sábado depende de este clic.</small></div>`;
}
function satPick(q,opts,card){
 const result=opts.find(o=>o.k===card.dataset.key);
 document.querySelectorAll(".destiny-card").forEach(c=>{c.disabled=true;c.classList.remove("pickable")});card.classList.add("chosen");
 setTimeout(()=>card.classList.remove("flipped"),300);
 setTimeout(()=>{document.getElementById("cardArea").innerHTML=`<div class="card-verdict"><small>✦ DESTINO SELLADO</small><h3>${result.e} ${result.t}</h3></div><div class="center-result"><button class="btn primary" id="satAccept">ACEPTAMOS</button><button class="btn danger ${state.spins["Anaïs"]<=0?"disabled":""}" id="satRA">SEGUNDA OPORTUNIDAD ANAÏS (${state.spins["Anaïs"]})</button><button class="btn danger ${state.spins["Alcides"]<=0?"disabled":""}" id="satRB">SEGUNDA OPORTUNIDAD ALCIDES (${state.spins["Alcides"]})</button></div>`;
 document.getElementById("satAccept").onclick=()=>{const resolvedIndex=sat.queue[sat.queueIndex];sat.resolved[resolvedIndex]=result.k;if(resolvedIndex===2&&result.k==="A"){swedishDinnerChoice()}else{saturdayReport()}};
 if(state.spins["Anaïs"]>0)document.getElementById("satRA").onclick=()=>{state.spins["Anaïs"]--;state.used["Anaïs"]++;satCards(result.k)};
 if(state.spins["Alcides"]>0)document.getElementById("satRB").onclick=()=>{state.spins["Alcides"]--;state.used["Alcides"]++;satCards(result.k)};
 },1100);
}

function swedishDinnerChoice(){
 const places=[
  {k:"G",tag:"GAMLA STAN",e:"🥘",name:"Stockholms Gästabud",vibe:"Pequeño, cálido y muy sueco.",desc:"La opción más acogedora: cocina tradicional en pleno casco antiguo.",price:"≈ 200–300 SEK · ~18–28 €",badge:"FAVORITO DE ALCIDES"},
  {k:"T",tag:"TRADICIÓN",e:"🕯️",name:"Tradition",vibe:"Clásico sin ponerse demasiado serio.",desc:"Recetas suecas tradicionales y una cena con aire más elegante.",price:"≈ 200–600 SEK · ~18–55 €",badge:"CLÁSICO"},
  {k:"S",tag:"SORPRESA",e:"🎁",name:"Que decida Estocolmo",vibe:"No saber también es un plan.",desc:"Dejamos una tercera alternativa abierta para elegir algo especial más adelante.",price:"PRESUPUESTO ABIERTO",badge:"COMODÍN"}
 ];
 app.innerHTML=`<section class="screen dinner-unlock-scene"><section class="card dinner-unlock">
 <div class="unlock-burst">🔓</div><span class="sticker">MISIÓN DESBLOQUEADA</span>
 <h2>Vale. Cena sueca.</h2>
 <p>Pero decir “comida sueca” era demasiado fácil. Ahora toca decidir <b>dónde</b>.</p>
 <div class="restaurant-stack">${places.map((p,i)=>`<button class="restaurant-ticket ${sat.dinnerPlace===p.k?"selected":""}" data-place="${p.k}">
   <span class="ticket-number">0${i+1}</span><span class="ticket-main"><small>${p.tag}</small><b>${p.e} ${p.name}</b><em>${p.vibe}</em><span>${p.desc}</span></span><span class="ticket-side"><i>${p.badge}</i><strong>${p.price}</strong></span>
 </button>`).join("")}</div>
 <div id="dinnerConfirm">${sat.dinnerPlace?`<button class="btn primary" id="confirmDinner">ESTE ES NUESTRO SITIO →</button>`:`<p class="tiny">Elige una. Esta subdecisión solo aparece porque la cena sueca ha ganado.</p>`}</div>
 </section></section>`;
 document.querySelectorAll("[data-place]").forEach(b=>b.onclick=()=>{sat.dinnerPlace=b.dataset.place;swedishDinnerChoice()});
 if(sat.dinnerPlace)document.getElementById("confirmDinner").onclick=()=>{
   saturdayReport();
 };
}
function saturdayOfficial(){
 let cost=saturdayData.reduce((t,q,i)=>t+(q.opts.find(o=>o.k===sat.resolved[i])?.sek||0),0);
 let dinner=saturdayData[2].opts.find(o=>o.k===sat.resolved[2]);
 app.innerHTML=`<section class="screen sat-final"><section class="card official"><span class="sticker">SÁBADO 19 · APROBADO</span><h2>Un día entero en Estocolmo.</h2>
 <div class="timeline">${saturdayData.map((q,i)=>{let o=q.opts.find(x=>x.k===sat.resolved[i]);return `<div class="timeline-item"><small>${q.time}</small><strong>${o.e} ${o.t}</strong><span>${o.d}</span></div>`}).join("")}</div>
 ${dinner?.k==="A"&&sat.dinnerPlace?`<div class="unlock"><small>🍽️ SUBDECISIÓN CERRADA</small><h3>${sat.dinnerPlace==="G"?"Stockholms Gästabud":sat.dinnerPlace==="T"?"Tradition":"Restaurante sorpresa"}</h3><p>La cena sueca ya tiene destino.</p></div>`:""}
 <div class="budgets"><div class="budget-card official-budget"><span>PRESUPUESTO DEL PLAN</span><strong>${money(cost)}</strong><small>por persona</small></div><div class="budget-card ana"><span>SEGUNDAS OPORTUNIDADES</span><strong>${state.spins["Anaïs"]}/3</strong><small>Anaïs</small></div><div class="budget-card alc"><span>SEGUNDAS OPORTUNIDADES</span><strong>${state.spins["Alcides"]}/3</strong><small>Alcides</small></div></div>
 <div style="text-align:center;margin-top:25px"><div class="approved">DAY 2 · APPROVED</div><button class="btn primary" id="sundayGo">CONTINUAR AL DOMINGO 20 →</button></div>
 </section></section>`;
 document.getElementById("sundayGo").onclick=sundayIntro;
}


/* ===== V8 · DÍA 3 · DOMINGO 20 ===== */
const sundayData=[
 {time:"09:00",kind:"archipelago",title:"Hoy salimos de Estocolmo. ¿Cómo?",sub:"El archipiélago es la gran elección del domingo.",alc:"A",grand:true,opts:[
  {k:"A",e:"⛴️",t:"Archipiélago",d:"Islas, agua y un día que se siente completamente distinto.",sek:0},
  {k:"B",e:"🏙️",t:"Seguir en Estocolmo",d:"Más barrios, cafés y ciudad sin depender de barcos.",sek:0},
  {k:"C",e:"🌲",t:"Naturaleza cerca",d:"Verde, calma y una escapada sin convertir el día en una excursión larga.",sek:0}]},
 {time:"16:30",kind:"return",title:"Cuando volvamos, ¿qué ritmo quieres?",sub:"Después de la excursión no hace falta ganar ninguna medalla.",alc:"B",opts:[
  {k:"A",e:"☕",t:"Fika larga",d:"Café, dulce y sentarnos sin mirar el reloj.",sek:130},
  {k:"B",e:"🌅",t:"Paseo al atardecer",d:"Caminar sin plan y dejar que Estocolmo haga el resto.",sek:0},
  {k:"C",e:"🛋️",t:"Descanso",d:"Volver, ducharnos y recuperar dignidad antes de la noche.",sek:0}]},
 {time:"20:00",kind:"night",title:"¿Cómo cerramos el domingo?",sub:"Nada de una cena enorme si el día ya ha sido intenso.",alc:"A",opts:[
  {k:"A",e:"🍜",t:"Cena informal",d:"Algo rico, fácil y sin protocolo.",sek:250},
  {k:"B",e:"🍸",t:"Una copa bonita",d:"Priorizar ambiente y picar algo.",sek:300},
  {k:"C",e:"🥡",t:"Take away + hotel",d:"Plan manta internacional. Suecia también cuenta.",sek:200}]}
];
let sun={i:0,answers:[],resolved:{},queue:[],queueIndex:0,score:0,max:4,archipelago:null};

function sundayIntro(){
 app.innerHTML=`<section class="screen sunday-cover-scene">${floats()}<section class="card sunday-cover">
 <span class="sticker">DÍA 3 · DOMINGO 20</span>
 <div class="waterline">≈ ≈ ≈ ⛵ ≈ ≈ ≈</div>
 <h2>Hoy manda el agua.</h2>
 <p>El domingo tiene una gran decisión: salir hacia el archipiélago. Y si coincidimos, se desbloquea una segunda pregunta.</p>
 <div class="carry"><b>SEGUNDAS OPORTUNIDADES DISPONIBLES</b><span>Anaïs · ${"🎟️".repeat(state.spins["Anaïs"])}${"▫️".repeat(3-state.spins["Anaïs"])}</span><span>Alcides · ${"🎟️".repeat(state.spins["Alcides"])}${"▫️".repeat(3-state.spins["Alcides"])}</span></div>
 <button class="btn primary" id="startSun">EMPEZAR EL DOMINGO →</button>
 </section></section>`;
 document.getElementById("startSun").onclick=renderSunday;
}
function sunTheme(q){return q.kind}
function renderSunday(){
 const q=sundayData[sun.i],chosen=sun.answers[sun.i];
 app.innerHTML=`<section class="screen sun-${q.kind}"><section class="card sun-question">
 <div class="top"><span class="pill">DOMINGO 20 · ${q.time}</span><div class="progress"><div style="width:${(sun.i+1)/3*100}%"></div></div><span class="count">${sun.i+1}/3</span></div>
 <div class="sun-head"><small>${q.grand?"GRAN ELECCIÓN · +2 ❤️":"DECISIÓN DEL DÍA · +1 ❤️"}</small><h2>${q.title}</h2><p>${q.sub}</p></div>
 <div class="sun-options">${q.opts.map(o=>`<button class="sun-option ${chosen===o.k?"selected":""}" data-sunk="${o.k}">
 <span class="sun-icon">${o.e}</span><span class="sun-copy"><strong>${o.t}</strong><small>${o.d}</small></span><em>${o.sek?`${money(o.sek)}`:"SIN COSTE FIJO"}</em></button>`).join("")}</div>
 ${chosen?`<div class="lock"><small>🔐 ALCIDES YA ELIGIÓ</small><button class="btn primary" id="sunReveal">REVELAR SU DECISIÓN</button></div>`:""}
 </section></section>`;
 document.querySelectorAll("[data-sunk]").forEach(b=>b.onclick=()=>{sun.answers[sun.i]=b.dataset.sunk;renderSunday()});
 if(chosen)document.getElementById("sunReveal").onclick=()=>sunReveal(q);
}
function sunReveal(q){
 const mine=q.opts.find(o=>o.k===sun.answers[sun.i]),his=q.opts.find(o=>o.k===q.alc);
 fx.innerHTML=`<div class="overlay sea-reveal"><div class="revealbox"><div class="bigicon">${q.kind==="archipelago"?"⚓":q.kind==="return"?"🗺️":"🌙"}</div><div class="loading">ABRIENDO EL SOBRE DE ALCIDES…</div><h2 class="sat-reveal-copy">El domingo ya tiene una respuesta escondida.</h2></div></div>`;
 setTimeout(()=>sunCountdown(3,q,mine,his),900);
}
function sunCountdown(n,q,mine,his){
 fx.innerHTML=`<div class="overlay sea-count"><div class="countdown">${n}</div></div>`;
 if(n>1)setTimeout(()=>sunCountdown(n-1,q,mine,his),540);else setTimeout(()=>sunResult(q,mine,his),620);
}
function sunResult(q,mine,his){
 const match=mine.k===his.k;
 if(match&&!sun.resolved[sun.i]){sun.resolved[sun.i]=mine.k;sun.score+=q.grand?2:1}
 fx.innerHTML=`<div class="result ${match?"match":"nomatch"}"><div id="sunResultBox">
 <div style="font-size:3rem">${match?"💛✨":"🚨"}</div><div class="resultword">${match?"MATCH!":"NO MATCH"}</div>
 <div class="joke">${match?(q.grand?"+2 ❤️ · GRAN ELECCIÓN. Habéis desbloqueado algo.":"+1 ❤️ · seguimos siendo aptos para viajar juntos."):"Las Cartas del Destino vuelven a la mesa."}</div>
 <div class="compare"><span>Anaïs · ${mine.e} ${mine.t}</span><span>Alcides · ${his.e} ${his.t}</span></div>
 <button class="btn primary" id="sunNext">CONTINUAR →</button></div></div>`;
 if(match)confetti(); else document.getElementById("sunResultBox").classList.add("shake");
 document.getElementById("sunNext").onclick=()=>{fx.innerHTML="";
   if(sun.i===0&&match&&mine.k==="A"){archipelagoChoice()}
   else if(sun.i===2){sundayReport()}
   else{sun.i++;renderSunday()}
 };
}
function archipelagoChoice(){
 const opts=[
  {k:"V",e:"🏘️",name:"Vaxholm",tag:"ISLA + PUEBLO",desc:"Casitas, puerto y sensación de excursión real.",sek:395},
  {k:"C",e:"⛴️",name:"Crucero panorámico",tag:"TODO DESDE EL BARCO",desc:"Ver el archipiélago sin convertir el domingo en una expedición.",sek:395},
  {k:"N",e:"🌲",name:"Naturaleza",tag:"VERDE + CALMA",desc:"Priorizar paisaje, paseo y una isla con menos ciudad.",sek:375}
 ];
 app.innerHTML=`<section class="screen archipelago-unlock"><section class="card archipelago-card">
 <div class="unlock-burst">🔓</div><span class="sticker">DOBLE MATCH DISPONIBLE · +1 ❤️</span>
 <h2>Vale. Archipiélago.<br>¿Pero cuál?</h2><p>Habéis abierto una subdecisión que solo existe si los dos queríais salir a las islas.</p>
 <div class="island-map">${opts.map(o=>`<button class="island ${sun.archipelago===o.k?"selected":""}" data-island="${o.k}"><span>${o.e}</span><small>${o.tag}</small><strong>${o.name}</strong><em>${o.desc}</em><b>${money(o.sek)}</b></button>`).join("")}</div>
 <div id="islandConfirm">${sun.archipelago?`<button class="btn primary" id="confirmIsland">SELLAR ESTA RUTA →</button>`:`<p class="tiny">Esta elección suma otro corazón si coincide con la elección secreta de Alcides.</p>`}</div>
 </section></section>`;
 document.querySelectorAll("[data-island]").forEach(b=>b.onclick=()=>{sun.archipelago=b.dataset.island;archipelagoChoice()});
 if(sun.archipelago)document.getElementById("confirmIsland").onclick=()=>archipelagoReveal(opts);
}
function archipelagoReveal(opts){
 const alc="V",mine=opts.find(o=>o.k===sun.archipelago),his=opts.find(o=>o.k===alc),match=mine.k===alc;
 fx.innerHTML=`<div class="overlay sea-count"><div class="countdown">3</div></div>`;
 setTimeout(()=>{fx.innerHTML=`<div class="result ${match?"match":"nomatch"}"><div><div style="font-size:3rem">${match?"💛⛴️":"🃏"}</div><div class="resultword">${match?"DOBLE MATCH!":"NO MATCH"}</div><div class="joke">${match?"+1 ❤️ extra. Vaxholm queda sellado.":"Hasta las islas necesitan mediación."}</div><div class="compare"><span>Anaïs · ${mine.e} ${mine.name}</span><span>Alcides · ${his.e} ${his.name}</span></div><button class="btn primary" id="islandDone">CONTINUAR →</button></div></div>`;if(match){sun.score++;confetti()}document.getElementById("islandDone").onclick=()=>{fx.innerHTML="";sun.i=1;renderSunday()};},900);
}
function sundayReport(){
 sun.queue=sundayData.map((q,i)=>sun.answers[i]!==q.alc&&!sun.resolved[i]?i:null).filter(i=>i!==null);sun.queueIndex=0;
 app.innerHTML=`<section class="screen sunday-report"><section class="card summary"><span class="sticker">INFORME DEL DOMINGO</span><h2>Agua, paseo y decisiones.</h2>
 <div class="decision-list">${sundayData.map((q,i)=>{let a=q.opts.find(o=>o.k===sun.answers[i]),b=q.opts.find(o=>o.k===q.alc),m=!!sun.resolved[i];return `<div class="decision ${m?"":"pending"}"><b>${m?"💛 CONFIRMADO":"🃏 PENDIENTE"} · ${q.title}</b><p>Anaïs: ${a.e} ${a.t}</p><p>Alcides: ${b.e} ${b.t}</p></div>`}).join("")}</div>
 ${sun.archipelago?`<div class="unlock"><small>⛴️ RUTA DEL ARCHIPIÉLAGO</small><h3>${sun.archipelago==="V"?"Vaxholm":sun.archipelago==="C"?"Crucero panorámico":"Naturaleza"}</h3></div>`:""}
 <div class="compat"><small>COMPATIBILIDAD DEL DOMINGO</small><strong>${sun.score} / ${sun.max} ❤️</strong><span>${sun.score>=3?"Esto empieza a ser sospechoso.":sun.score===2?"Aprobados con margen.":"Las cartas se están ganando el sueldo."}</span></div>
 <button class="btn primary" id="resolveSun">${sun.queue.length?"RESOLVER CON LAS CARTAS 🃏":"APROBAR EL DOMINGO"}</button>
 </section></section>`;
 document.getElementById("resolveSun").onclick=()=>sun.queue.length?sunCards():sundayOfficial();
}
function sunCardOpts(q,qi){let keys=[sun.answers[qi],q.alc],third=q.opts.find(o=>!keys.includes(o.k));return [q.opts.find(o=>o.k===keys[0]),q.opts.find(o=>o.k===keys[1]),third]}
function sunCards(excluded=null){
 const qi=sun.queue[sun.queueIndex],q=sundayData[qi],opts=sunCardOpts(q,qi),labels=["👩 ANAÏS","👨 ALCIDES","🃏 COMODÍN"];
 app.innerHTML=`<section class="screen cards-scene"><section class="card cards-panel"><span class="sticker">LAS CARTAS DEL DESTINO · DOMINGO</span><h2>${q.title}</h2>
 <div class="respin-board"><div class="respin">Anaïs ${"🎟️".repeat(state.spins["Anaïs"])}${"▫️".repeat(3-state.spins["Anaïs"])}</div><div class="respin">Alcides ${"🎟️".repeat(state.spins["Alcides"])}${"▫️".repeat(3-state.spins["Alcides"])}</div></div>
 <div class="deck-table" id="deckTable">${opts.map((o,i)=>`<button class="destiny-card ${excluded===o.k?"card-out":""}" data-key="${o.k}" disabled><span class="card-inner"><span class="card-face card-front"><small>${labels[i]}</small><b>${o.e}</b><strong>${o.t}</strong><em>${o.sek?money(o.sek):"GRATIS"}</em></span><span class="card-face card-back"><i>♛</i><b>STOCKHOLM</b><span class="mini-flag"></span><small>ÖDET VÄLJER</small></span></span></button>`).join("")}</div><div id="cardArea"><button class="btn primary" id="sunShuffle">BARAJAR LAS CARTAS ✦</button></div></section></section>`;
 document.getElementById("sunShuffle").onclick=()=>sunShuffle(q,opts,excluded);
}
async function sunShuffle(q,opts,excluded){
 const cards=[...document.querySelectorAll(".destiny-card")],live=cards.filter(c=>!c.classList.contains("card-out"));
 document.getElementById("sunShuffle").disabled=true;live.forEach((c,i)=>setTimeout(()=>c.classList.add("flipped"),i*120));await wait(800);
 for(let round=0;round<3;round++){await Promise.all(live.map((c,i)=>c.animate([{transform:"translate(0,0)"},{transform:`translate(${(i-1)*(round%2?130:-130)}px,${i%2?22:-22}px) rotate(${(i-1)*10}deg)`},{transform:"translate(0,0)"}],{duration:650,easing:"ease-in-out"}).finished.catch(()=>{})))}
 let order=live.map(c=>c.dataset.key);for(let n=0;n<10;n++)order.sort(()=>Math.random()-.5);const table=document.getElementById("deckTable");order.forEach(k=>table.appendChild(cards.find(c=>c.dataset.key===k)));
 live.forEach(c=>{c.getAnimations().forEach(a=>a.cancel());c.disabled=false;c.classList.add("pickable");c.onclick=()=>sunPick(q,opts,c)});
 document.getElementById("cardArea").innerHTML=`<div class="choose-call">✦ ELIGE UNA CARTA ✦<small>El archipiélago no acepta reclamaciones.</small></div>`;
}
function sunPick(q,opts,card){
 const result=opts.find(o=>o.k===card.dataset.key);document.querySelectorAll(".destiny-card").forEach(c=>{c.disabled=true;c.classList.remove("pickable")});card.classList.add("chosen");setTimeout(()=>card.classList.remove("flipped"),300);
 setTimeout(()=>{document.getElementById("cardArea").innerHTML=`<div class="card-verdict"><small>✦ DESTINO SELLADO</small><h3>${result.e} ${result.t}</h3></div><div class="center-result"><button class="btn primary" id="sunAccept">ACEPTAMOS</button><button class="btn danger ${state.spins["Anaïs"]<=0?"disabled":""}" id="sunRA">SEGUNDA OPORTUNIDAD ANAÏS (${state.spins["Anaïs"]})</button><button class="btn danger ${state.spins["Alcides"]<=0?"disabled":""}" id="sunRB">SEGUNDA OPORTUNIDAD ALCIDES (${state.spins["Alcides"]})</button></div>`;
 document.getElementById("sunAccept").onclick=()=>{const idx=sun.queue[sun.queueIndex];sun.resolved[idx]=result.k;if(idx===0&&result.k==="A"&&!sun.archipelago){archipelagoChoice()}else sundayReport()};
 if(state.spins["Anaïs"]>0)document.getElementById("sunRA").onclick=()=>{state.spins["Anaïs"]--;state.used["Anaïs"]++;sunCards(result.k)};
 if(state.spins["Alcides"]>0)document.getElementById("sunRB").onclick=()=>{state.spins["Alcides"]--;state.used["Alcides"]++;sunCards(result.k)};
 },1050);
}
function sundayOfficial(){
 const archCost=sun.archipelago==="V"?395:sun.archipelago==="C"?395:sun.archipelago==="N"?375:0;
 const base=sundayData.reduce((t,q,i)=>t+(q.opts.find(o=>o.k===sun.resolved[i])?.sek||0),0),cost=base+archCost;
 app.innerHTML=`<section class="screen sunday-final"><section class="card official"><span class="sticker">DOMINGO 20 · APROBADO</span><h2>Día 3 sellado.</h2>
 <div class="timeline">${sundayData.map((q,i)=>{let o=q.opts.find(x=>x.k===sun.resolved[i]);return `<div class="timeline-item"><small>${q.time}</small><strong>${o.e} ${o.t}</strong><span>${o.d}</span></div>`}).join("")}</div>
 ${sun.archipelago?`<div class="unlock"><small>RUTA ELEGIDA</small><h3>⛴️ ${sun.archipelago==="V"?"Vaxholm":sun.archipelago==="C"?"Crucero panorámico":"Naturaleza"}</h3></div>`:""}
 <div class="budgets"><div class="budget-card official-budget"><span>PRESUPUESTO DEL PLAN</span><strong>${money(cost)}</strong><small>por persona</small></div><div class="budget-card ana"><span>SEGUNDAS OPORTUNIDADES</span><strong>${state.spins["Anaïs"]}/3</strong><small>Anaïs</small></div><div class="budget-card alc"><span>SEGUNDAS OPORTUNIDADES</span><strong>${state.spins["Alcides"]}/3</strong><small>Alcides</small></div></div>
 <div style="text-align:center;margin-top:25px"><div class="approved">DAY 3 · APPROVED</div><div class="monday-tease"><small>LUNES 21</small><strong>👑 Palacio Real</strong><strong>🔒 ██████████</strong><strong>🔒 ██████████</strong></div><button class="btn primary" id="mondayGo">ABRIR EL DÍA 4 →</button></div>
 </section></section>`;
 document.getElementById("mondayGo").onclick=mondayIntro;
}


/* ===== V9 · DÍA 4 · LUNES 21 =====
   IMPORTANTE: las actividades secretas nunca se nombran en la UI.
*/
const mondayData=[
 {time:"10:30",kind:"royal",title:"Dentro del Palacio Real, ¿qué te apetece más?",sub:"El Palacio no se negocia. Lo que sí puedes decidir es cómo lo vivimos.",alc:"A",opts:[
  {k:"A",e:"👑",t:"Verlo con calma",d:"Interiores, detalles y cero carreras.",sek:0},
  {k:"B",e:"📸",t:"Modo fotógrafa",d:"Buscar rincones bonitos y recuerdos del palacio.",sek:0},
  {k:"C",e:"🕵️",t:"Modo curiosidad",d:"Historias raras, detalles y cosas que normalmente pasaríamos por alto.",sek:0}]},
 {time:"13:00",kind:"lunch",title:"Después del Palacio: comida sin complicarnos",sub:"Aquí elegimos el estilo, no un restaurante meses antes.",alc:"A",opts:[
  {k:"A",e:"🌯",t:"Algo informal",d:"Rápido, rico y cerca de donde estemos.",sek:180},
  {k:"B",e:"☕",t:"Fika + algo ligero",d:"Café, dulce y comida sencilla.",sek:160},
  {k:"C",e:"🍜",t:"Lo primero que nos convenza",d:"Improvisación responsable. Más o menos.",sek:200}]}
];
let mon={i:0,answers:[],resolved:{},queue:[],queueIndex:0,score:0,max:2};

function mondayIntro(){
 app.innerHTML=`<section class="screen monday-secret-scene"><section class="card monday-cover">
 <span class="sticker">DÍA 4 · LUNES 21</span>
 <div class="classified">CONFIDENCIAL</div>
 <h2>Hoy no tienes toda la información.</h2>
 <p>Hay partes del lunes que Anaïs puede decidir… y otras que Alcides se niega educadamente a explicar.</p>
 <div class="monday-file">
   <div><small>10:30</small><strong>👑 PALACIO REAL · INTERIOR</strong><span>Información disponible ✓</span></div>
   <div class="redacted"><small>16:30</small><strong>████████████</strong><span>Acceso restringido</span></div>
   <div class="redacted"><small>19:30</small><strong>████████████</strong><span>Acceso muy restringido</span></div>
 </div>
 <div class="carry"><b>SEGUNDAS OPORTUNIDADES</b><span>Anaïs · ${"🎟️".repeat(state.spins["Anaïs"])}${"▫️".repeat(3-state.spins["Anaïs"])}</span><span>Alcides · ${"🎟️".repeat(state.spins["Alcides"])}${"▫️".repeat(3-state.spins["Alcides"])}</span></div>
 <button class="btn primary" id="startMon">ACEPTO NO SABERLO TODO →</button>
 </section></section>`;
 document.getElementById("startMon").onclick=renderMonday;
}
function renderMonday(){
 const q=mondayData[mon.i],chosen=mon.answers[mon.i];
 app.innerHTML=`<section class="screen mon-${q.kind}"><section class="card mon-question">
 <div class="top"><span class="pill">LUNES 21 · ${q.time}</span><div class="progress"><div style="width:${(mon.i+1)/2*100}%"></div></div><span class="count">${mon.i+1}/2</span></div>
 <div class="mon-head"><small>${q.kind==="royal"?"ROYAL ACCESS":"PAUSA TÁCTICA"}</small><h2>${q.title}</h2><p>${q.sub}</p></div>
 <div class="mon-options">${q.opts.map(o=>`<button class="mon-option ${chosen===o.k?"selected":""}" data-monk="${o.k}"><span class="mon-icon">${o.e}</span><span><strong>${o.t}</strong><small>${o.d}</small></span><em>${o.sek?`${money(o.sek)}`:"INCLUIDO"}</em></button>`).join("")}</div>
 ${chosen?`<div class="lock"><small>🔐 ELECCIÓN DE ALCIDES ARCHIVADA</small><button class="btn primary" id="monReveal">ABRIR EL EXPEDIENTE</button></div>`:""}
 </section></section>`;
 document.querySelectorAll("[data-monk]").forEach(b=>b.onclick=()=>{mon.answers[mon.i]=b.dataset.monk;renderMonday()});
 if(chosen)document.getElementById("monReveal").onclick=()=>monReveal(q);
}
function monReveal(q){
 const mine=q.opts.find(o=>o.k===mon.answers[mon.i]),his=q.opts.find(o=>o.k===q.alc);
 fx.innerHTML=`<div class="overlay classified-overlay"><div class="revealbox"><div class="classified-stamp">TOP SECRET</div><div class="loading">DESCLASIFICANDO LA ELECCIÓN DE ALCIDES…</div><h2 class="sat-reveal-copy">Solo esta parte del expediente puede abrirse.</h2></div></div>`;
 setTimeout(()=>monCountdown(3,q,mine,his),950);
}
function monCountdown(n,q,mine,his){
 fx.innerHTML=`<div class="overlay classified-count"><div class="countdown">${n}</div></div>`;
 if(n>1)setTimeout(()=>monCountdown(n-1,q,mine,his),540);else setTimeout(()=>monResult(q,mine,his),600);
}
function monResult(q,mine,his){
 const match=mine.k===his.k;
 if(match&&!mon.resolved[mon.i]){mon.resolved[mon.i]=mine.k;mon.score++}
 fx.innerHTML=`<div class="result ${match?"match":"nomatch"}"><div id="monResultBox"><div style="font-size:3rem">${match?"💛✨":"🚨"}</div><div class="resultword">${match?"MATCH!":"NO MATCH"}</div><div class="joke">${match?"+1 ❤️ · expediente aprobado.":"El departamento de conflictos llama a Las Cartas del Destino."}</div><div class="compare"><span>Anaïs · ${mine.e} ${mine.t}</span><span>Alcides · ${his.e} ${his.t}</span></div><button class="btn primary" id="monNext">${mon.i===1?"VER INFORME DEL LUNES":"SIGUIENTE →"}</button></div></div>`;
 if(match)confetti();else document.getElementById("monResultBox").classList.add("shake");
 document.getElementById("monNext").onclick=()=>{fx.innerHTML="";if(mon.i===1)mondayReport();else{mon.i++;renderMonday()}};
}
function mondayReport(){
 mon.queue=mondayData.map((q,i)=>mon.answers[i]!==q.alc&&!mon.resolved[i]?i:null).filter(i=>i!==null);mon.queueIndex=0;
 app.innerHTML=`<section class="screen monday-report"><section class="card summary"><span class="sticker">EXPEDIENTE · LUNES 21</span><h2>Lo que puedes saber.</h2>
 <div class="decision-list">${mondayData.map((q,i)=>{let a=q.opts.find(o=>o.k===mon.answers[i]),b=q.opts.find(o=>o.k===q.alc),m=!!mon.resolved[i];return `<div class="decision ${m?"":"pending"}"><b>${m?"💛 CONFIRMADO":"🃏 PENDIENTE"} · ${q.title}</b><p>Anaïs: ${a.e} ${a.t}</p><p>Alcides: ${b.e} ${b.t}</p></div>`}).join("")}</div>
 <div class="secret-agenda"><div><small>10:30</small><strong>👑 Palacio Real</strong></div><div class="blurred-row"><small>16:30</small><strong>████████████</strong></div><div class="blurred-row"><small>19:30</small><strong>████████████</strong></div></div>
 <div class="compat"><small>COMPATIBILIDAD DEL LUNES</small><strong>${mon.score} / ${mon.max} ❤️</strong><span>${mon.score===2?"Demasiado fácil. Por eso hay secretos.":mon.score===1?"Suficiente para conservar la sorpresa.":"Menos mal que existen las cartas."}</span></div>
 <button class="btn primary" id="resolveMon">${mon.queue.length?"RESOLVER CON LAS CARTAS 🃏":"CERRAR EL EXPEDIENTE"}</button>
 </section></section>`;
 document.getElementById("resolveMon").onclick=()=>mon.queue.length?monCards():mondayOfficial();
}
function monCardOpts(q,qi){let keys=[mon.answers[qi],q.alc],third=q.opts.find(o=>!keys.includes(o.k));return [q.opts.find(o=>o.k===keys[0]),q.opts.find(o=>o.k===keys[1]),third]}
function monCards(excluded=null){
 const qi=mon.queue[mon.queueIndex],q=mondayData[qi],opts=monCardOpts(q,qi),labels=["👩 ANAÏS","👨 ALCIDES","🃏 COMODÍN"];
 app.innerHTML=`<section class="screen cards-scene"><section class="card cards-panel"><span class="sticker">LAS CARTAS DEL DESTINO · EXPEDIENTE 21</span><h2>${q.title}</h2><div class="respin-board"><div class="respin">Anaïs ${"🎟️".repeat(state.spins["Anaïs"])}${"▫️".repeat(3-state.spins["Anaïs"])}</div><div class="respin">Alcides ${"🎟️".repeat(state.spins["Alcides"])}${"▫️".repeat(3-state.spins["Alcides"])}</div></div>
 <div class="deck-table" id="deckTable">${opts.map((o,i)=>`<button class="destiny-card ${excluded===o.k?"card-out":""}" data-key="${o.k}" disabled><span class="card-inner"><span class="card-face card-front"><small>${labels[i]}</small><b>${o.e}</b><strong>${o.t}</strong><em>${o.sek?money(o.sek):"INCLUIDO"}</em></span><span class="card-face card-back"><i>♛</i><b>STOCKHOLM</b><span class="mini-flag"></span><small>ÖDET VÄLJER</small></span></span></button>`).join("")}</div><div id="cardArea"><button class="btn primary" id="monShuffle">BARAJAR LAS CARTAS ✦</button></div></section></section>`;
 document.getElementById("monShuffle").onclick=()=>monShuffle(q,opts,excluded);
}
async function monShuffle(q,opts,excluded){
 const cards=[...document.querySelectorAll(".destiny-card")],live=cards.filter(c=>!c.classList.contains("card-out"));document.getElementById("monShuffle").disabled=true;live.forEach((c,i)=>setTimeout(()=>c.classList.add("flipped"),i*120));await wait(800);
 for(let r=0;r<3;r++){await Promise.all(live.map((c,i)=>c.animate([{transform:"translate(0,0)"},{transform:`translate(${(i-1)*(r%2?130:-130)}px,${i%2?22:-22}px) rotate(${(i-1)*10}deg)`},{transform:"translate(0,0)"}],{duration:650,easing:"ease-in-out"}).finished.catch(()=>{})))}
 let order=live.map(c=>c.dataset.key);for(let n=0;n<10;n++)order.sort(()=>Math.random()-.5);const table=document.getElementById("deckTable");order.forEach(k=>table.appendChild(cards.find(c=>c.dataset.key===k)));live.forEach(c=>{c.getAnimations().forEach(a=>a.cancel());c.disabled=false;c.classList.add("pickable");c.onclick=()=>monPick(q,opts,c)});document.getElementById("cardArea").innerHTML=`<div class="choose-call">✦ ELIGE UNA CARTA ✦<small>Los documentos clasificados no admiten protestas.</small></div>`;
}
function monPick(q,opts,card){
 const result=opts.find(o=>o.k===card.dataset.key);document.querySelectorAll(".destiny-card").forEach(c=>{c.disabled=true;c.classList.remove("pickable")});card.classList.add("chosen");setTimeout(()=>card.classList.remove("flipped"),300);
 setTimeout(()=>{document.getElementById("cardArea").innerHTML=`<div class="card-verdict"><small>✦ DECISIÓN DESCLASIFICADA</small><h3>${result.e} ${result.t}</h3></div><div class="center-result"><button class="btn primary" id="monAccept">ACEPTAMOS</button><button class="btn danger ${state.spins["Anaïs"]<=0?"disabled":""}" id="monRA">SEGUNDA OPORTUNIDAD ANAÏS (${state.spins["Anaïs"]})</button><button class="btn danger ${state.spins["Alcides"]<=0?"disabled":""}" id="monRB">SEGUNDA OPORTUNIDAD ALCIDES (${state.spins["Alcides"]})</button></div>`;
 document.getElementById("monAccept").onclick=()=>{mon.resolved[mon.queue[mon.queueIndex]]=result.k;mondayReport()};
 if(state.spins["Anaïs"]>0)document.getElementById("monRA").onclick=()=>{state.spins["Anaïs"]--;state.used["Anaïs"]++;monCards(result.k)};
 if(state.spins["Alcides"]>0)document.getElementById("monRB").onclick=()=>{state.spins["Alcides"]--;state.used["Alcides"]++;monCards(result.k)};
 },1050);
}
function mondayOfficial(){
 const cost=mondayData.reduce((t,q,i)=>t+(q.opts.find(o=>o.k===mon.resolved[i])?.sek||0),0);
 app.innerHTML=`<section class="screen monday-final"><section class="card official"><span class="sticker">LUNES 21 · PARCIALMENTE APROBADO</span><h2>Itinerario autorizado.</h2>
 <div class="timeline"><div class="timeline-item"><small>10:30</small><strong>👑 Palacio Real · interior</strong><span>Aproximadamente 2 horas.</span></div><div class="timeline-item"><small>13:00</small><strong>${mondayData[1].opts.find(o=>o.k===mon.resolved[1]).e} ${mondayData[1].opts.find(o=>o.k===mon.resolved[1]).t}</strong><span>Comida sin restaurante cerrado de antemano.</span></div><div class="timeline-item secret-time"><small>16:30</small><strong>🔒 ████████████</strong><span>Alcides tiene instrucciones. Tú no.</span></div><div class="timeline-item secret-time"><small>19:30</small><strong>🔒 ████████████</strong><span>Clasificación: no preguntes todavía.</span></div></div>
 <div class="budgets"><div class="budget-card official-budget"><span>PRESUPUESTO VISIBLE</span><strong>${money(cost)}</strong><small>~${eur(cost)} € por persona · secretos no incluidos</small></div><div class="budget-card ana"><span>SEGUNDAS OPORTUNIDADES</span><strong>${state.spins["Anaïs"]}/3</strong><small>Anaïs</small></div><div class="budget-card alc"><span>SEGUNDAS OPORTUNIDADES</span><strong>${state.spins["Alcides"]}/3</strong><small>Alcides</small></div></div>
 <div class="classified-final"><span>🔒</span><b>EL RESTO DEL DÍA SE REVELARÁ CUANDO TOQUE.</b><small>Intentar sonsacar información a Alcides puede resultar en respuestas poco fiables.</small></div>
 <div style="text-align:center;margin-top:25px"><div class="approved">DAY 4 · CLASSIFIED</div><p class="tiny">Martes 22 · última página del pasaporte.</p><button class="btn primary" id="tuesdayGo">ABRIR EL ÚLTIMO DÍA →</button></div></section></section>`;
 document.getElementById("tuesdayGo").onclick=tuesdayIntro;
}


/* ===== V10 · DÍA 5 · MARTES 22 ===== */
const tuesdayData=[
 {time:"09:30",kind:"morning",title:"Última mañana. ¿Cómo la gastamos?",sub:"No queda mucho viaje, así que toca elegir bien el ritmo.",alc:"A",opts:[
  {k:"A",e:"🚶",t:"Último paseo",d:"Volver a caminar por Estocolmo sin perseguir atracciones.",sek:0},
  {k:"B",e:"☕",t:"Despedida con fika",d:"Sentarnos, pedir algo rico y fingir que el avión no existe.",sek:140},
  {k:"C",e:"📸",t:"Cazar últimas fotos",d:"Volver a nuestros rincones favoritos y llenar el carrete.",sek:0}]},
 {time:"11:30",kind:"shopping",title:"¿Qué nos llevamos de Estocolmo?",sub:"Última misión: volver con algo más interesante que la tarjeta de embarque.",alc:"B",opts:[
  {k:"A",e:"◆",t:"Algo de diseño",d:"Un objeto bonito que realmente parezca sueco.",sek:350},
  {k:"B",e:"🎁",t:"Algo artesanal",d:"Diseñadores y artesanos nórdicos; pequeño y con historia.",sek:300},
  {k:"C",e:"🫎",t:"Souvenir suequísimo",d:"Cero sutileza. Queremos que grite Estocolmo.",sek:180},
  {k:"D",e:"💸",t:"Todo lo anterior",d:"Porque administrar dinero nunca fue el objetivo del viaje.",sek:830}]}
];
let tue={i:0,answers:[],resolved:{},queue:[],queueIndex:0,score:0,max:2};

function tuesdayIntro(){
 app.innerHTML=`<section class="screen tuesday-cover-scene"><section class="card tuesday-cover">
 <span class="sticker">DÍA 5 · MARTES 22</span>
 <div class="passport-stamp">SISTA DAGEN</div>
 <h2>Último día.</h2>
 <p>Quedan unas horas, una maleta que probablemente ya no cierre y exactamente dos decisiones.</p>
 <div class="departure-strip"><span>STOCKHOLM</span><b>→</b><span>CASA</span></div>
 <div class="carry"><b>ÚLTIMAS SEGUNDAS OPORTUNIDADES</b><span>Anaïs · ${"🎟️".repeat(state.spins["Anaïs"])}${"▫️".repeat(3-state.spins["Anaïs"])}</span><span>Alcides · ${"🎟️".repeat(state.spins["Alcides"])}${"▫️".repeat(3-state.spins["Alcides"])}</span></div>
 <button class="btn primary" id="startTue">VAMOS A DESPEDIRNOS →</button>
 </section></section>`;
 document.getElementById("startTue").onclick=renderTuesday;
}
function renderTuesday(){
 const q=tuesdayData[tue.i],chosen=tue.answers[tue.i];
 app.innerHTML=`<section class="screen tue-${q.kind}"><section class="card tue-question">
 <div class="top"><span class="pill">MARTES 22 · ${q.time}</span><div class="progress"><div style="width:${(tue.i+1)/2*100}%"></div></div><span class="count">${tue.i+1}/2</span></div>
 <div class="tue-head"><small>${q.kind==="morning"?"ÚLTIMAS HORAS":"ÚLTIMO HUECO EN LA MALETA"}</small><h2>${q.title}</h2><p>${q.sub}</p></div>
 <div class="tue-options ${q.kind}">${q.opts.map(o=>`<button class="tue-option ${chosen===o.k?"selected":""}" data-tuek="${o.k}"><span class="tue-icon">${o.e}</span><span><strong>${o.t}</strong><small>${o.d}</small></span><em>${o.sek?`${money(o.sek)}`:"GRATIS"}</em></button>`).join("")}</div>
 ${chosen?`<div class="lock"><small>🔐 ALCIDES YA HIZO SU ÚLTIMA ELECCIÓN</small><button class="btn primary" id="tueReveal">REVELAR</button></div>`:""}
 </section></section>`;
 document.querySelectorAll("[data-tuek]").forEach(b=>b.onclick=()=>{tue.answers[tue.i]=b.dataset.tuek;renderTuesday()});
 if(chosen)document.getElementById("tueReveal").onclick=()=>tueReveal(q);
}
function tueReveal(q){
 const mine=q.opts.find(o=>o.k===tue.answers[tue.i]),his=q.opts.find(o=>o.k===q.alc);
 fx.innerHTML=`<div class="overlay goodbye-reveal"><div class="revealbox"><div class="bigicon">${q.kind==="shopping"?"🧳":"🎫"}</div><div class="loading">${q.kind==="shopping"?"ABRIENDO LA MALETA DE ALCIDES":"REVISANDO SU ÚLTIMA DECISIÓN"}…</div><h2 class="sat-reveal-copy">Última oportunidad para demostrar compatibilidad.</h2></div></div>`;
 setTimeout(()=>tueCountdown(3,q,mine,his),900);
}
function tueCountdown(n,q,mine,his){
 fx.innerHTML=`<div class="overlay goodbye-count"><div class="countdown">${n}</div></div>`;
 if(n>1)setTimeout(()=>tueCountdown(n-1,q,mine,his),540);else setTimeout(()=>tueResult(q,mine,his),600);
}
function tueResult(q,mine,his){
 const match=mine.k===his.k;if(match&&!tue.resolved[tue.i]){tue.resolved[tue.i]=mine.k;tue.score++}
 fx.innerHTML=`<div class="result ${match?"match":"nomatch"}"><div id="tueResultBox"><div style="font-size:3rem">${match?"💛✨":"🚨"}</div><div class="resultword">${match?"MATCH!":"NO MATCH"}</div><div class="joke">${match?"+1 ❤️ · el viaje termina con dignidad.":"Último servicio oficial de Las Cartas del Destino."}</div><div class="compare"><span>Anaïs · ${mine.e} ${mine.t}</span><span>Alcides · ${his.e} ${his.t}</span></div><button class="btn primary" id="tueNext">${tue.i===1?"CERRAR LAS DECISIONES":"ÚLTIMA DECISIÓN →"}</button></div></div>`;
 if(match)confetti();else document.getElementById("tueResultBox").classList.add("shake");
 document.getElementById("tueNext").onclick=()=>{fx.innerHTML="";if(tue.i===1)tuesdayReport();else{tue.i++;renderTuesday()}};
}
function tuesdayReport(){
 tue.queue=tuesdayData.map((q,i)=>tue.answers[i]!==q.alc&&!tue.resolved[i]?i:null).filter(i=>i!==null);tue.queueIndex=0;
 app.innerHTML=`<section class="screen tuesday-report"><section class="card summary"><span class="sticker">ÚLTIMO INFORME</span><h2>¿Nos podemos ir ya?</h2>
 <div class="decision-list">${tuesdayData.map((q,i)=>{let a=q.opts.find(o=>o.k===tue.answers[i]),b=q.opts.find(o=>o.k===q.alc),m=!!tue.resolved[i];return `<div class="decision ${m?"":"pending"}"><b>${m?"💛 CONFIRMADO":"🃏 PENDIENTE"} · ${q.title}</b><p>Anaïs: ${a.e} ${a.t}</p><p>Alcides: ${b.e} ${b.t}</p></div>`}).join("")}</div>
 <div class="compat"><small>COMPATIBILIDAD DEL MARTES</small><strong>${tue.score} / ${tue.max} ❤️</strong><span>${tue.score===2?"Final perfecto. Sospechoso.":tue.score===1?"Una de dos tampoco está mal.":"Las cartas quieren horas extra."}</span></div>
 <button class="btn primary" id="resolveTue">${tue.queue.length?"ÚLTIMAS CARTAS DEL DESTINO 🃏":"VER EL VIAJE COMPLETO"}</button></section></section>`;
 document.getElementById("resolveTue").onclick=()=>tue.queue.length?tueCards():tuesdayOfficial();
}
function tueCardOpts(q,qi){let keys=[tue.answers[qi],q.alc],third=q.opts.find(o=>!keys.includes(o.k));return [q.opts.find(o=>o.k===keys[0]),q.opts.find(o=>o.k===keys[1]),third]}
function tueCards(excluded=null){
 const qi=tue.queue[tue.queueIndex],q=tuesdayData[qi],opts=tueCardOpts(q,qi),labels=["👩 ANAÏS","👨 ALCIDES","🃏 COMODÍN"];
 app.innerHTML=`<section class="screen cards-scene"><section class="card cards-panel"><span class="sticker">ÚLTIMAS CARTAS DEL DESTINO</span><h2>${q.title}</h2><div class="respin-board"><div class="respin">Anaïs ${"🎟️".repeat(state.spins["Anaïs"])}${"▫️".repeat(3-state.spins["Anaïs"])}</div><div class="respin">Alcides ${"🎟️".repeat(state.spins["Alcides"])}${"▫️".repeat(3-state.spins["Alcides"])}</div></div>
 <div class="deck-table" id="deckTable">${opts.map((o,i)=>`<button class="destiny-card ${excluded===o.k?"card-out":""}" data-key="${o.k}" disabled><span class="card-inner"><span class="card-face card-front"><small>${labels[i]}</small><b>${o.e}</b><strong>${o.t}</strong><em>${o.sek?money(o.sek):"GRATIS"}</em></span><span class="card-face card-back"><i>♛</i><b>STOCKHOLM</b><span class="mini-flag"></span><small>ÖDET VÄLJER</small></span></span></button>`).join("")}</div><div id="cardArea"><button class="btn primary" id="tueShuffle">ÚLTIMO BARAJADO ✦</button></div></section></section>`;
 document.getElementById("tueShuffle").onclick=()=>tueShuffle(q,opts,excluded);
}
async function tueShuffle(q,opts,excluded){
 const cards=[...document.querySelectorAll(".destiny-card")],live=cards.filter(c=>!c.classList.contains("card-out"));document.getElementById("tueShuffle").disabled=true;live.forEach((c,i)=>setTimeout(()=>c.classList.add("flipped"),i*120));await wait(800);
 for(let r=0;r<3;r++){await Promise.all(live.map((c,i)=>c.animate([{transform:"translate(0,0)"},{transform:`translate(${(i-1)*(r%2?130:-130)}px,${i%2?22:-22}px) rotate(${(i-1)*10}deg)`},{transform:"translate(0,0)"}],{duration:650,easing:"ease-in-out"}).finished.catch(()=>{})))}
 let order=live.map(c=>c.dataset.key);for(let n=0;n<10;n++)order.sort(()=>Math.random()-.5);const table=document.getElementById("deckTable");order.forEach(k=>table.appendChild(cards.find(c=>c.dataset.key===k)));live.forEach(c=>{c.getAnimations().forEach(a=>a.cancel());c.disabled=false;c.classList.add("pickable");c.onclick=()=>tuePick(q,opts,c)});document.getElementById("cardArea").innerHTML=`<div class="choose-call">✦ ELIGE UNA CARTA ✦<small>Última intervención del destino.</small></div>`;
}
function tuePick(q,opts,card){
 const result=opts.find(o=>o.k===card.dataset.key);document.querySelectorAll(".destiny-card").forEach(c=>{c.disabled=true;c.classList.remove("pickable")});card.classList.add("chosen");setTimeout(()=>card.classList.remove("flipped"),300);
 setTimeout(()=>{document.getElementById("cardArea").innerHTML=`<div class="card-verdict"><small>✦ DESTINO SELLADO</small><h3>${result.e} ${result.t}</h3></div><div class="center-result"><button class="btn primary" id="tueAccept">ACEPTAMOS</button><button class="btn danger ${state.spins["Anaïs"]<=0?"disabled":""}" id="tueRA">SEGUNDA OPORTUNIDAD ANAÏS (${state.spins["Anaïs"]})</button><button class="btn danger ${state.spins["Alcides"]<=0?"disabled":""}" id="tueRB">SEGUNDA OPORTUNIDAD ALCIDES (${state.spins["Alcides"]})</button></div>`;
 document.getElementById("tueAccept").onclick=()=>{tue.resolved[tue.queue[tue.queueIndex]]=result.k;tuesdayReport()};
 if(state.spins["Anaïs"]>0)document.getElementById("tueRA").onclick=()=>{state.spins["Anaïs"]--;state.used["Anaïs"]++;tueCards(result.k)};
 if(state.spins["Alcides"]>0)document.getElementById("tueRB").onclick=()=>{state.spins["Alcides"]--;state.used["Alcides"]++;tueCards(result.k)};
 },1050);
}
function tuesdayOfficial(){
 const cost=tuesdayData.reduce((t,q,i)=>t+(q.opts.find(o=>o.k===tue.resolved[i])?.sek||0),0);
 const totalHearts=(sat?.score||0)+(sun?.score||0)+(mon?.score||0)+(tue.score||0);
 app.innerHTML=`<section class="screen trip-finale"><section class="card finale-card"><span class="sticker">STOCKHOLM · VIAJE APROBADO</span>
 <div class="final-stamp">APPROVED</div><h2>Ya está.<br>Nos vamos a Suecia.</h2><p>Las decisiones están tomadas. Las discusiones importantes han sido externalizadas a tres cartas.</p>
 <div class="last-day"><div><small>09:30</small><strong>${tuesdayData[0].opts.find(o=>o.k===tue.resolved[0]).e} ${tuesdayData[0].opts.find(o=>o.k===tue.resolved[0]).t}</strong></div><div><small>11:30</small><strong>${tuesdayData[1].opts.find(o=>o.k===tue.resolved[1]).e} ${tuesdayData[1].opts.find(o=>o.k===tue.resolved[1]).t}</strong></div></div>
 <div class="final-score"><small>CORAZONES CONSEGUIDOS DESDE EL SÁBADO</small><strong>${totalHearts} ❤️</strong><span>${totalHearts>=8?"Podéis viajar juntos. Incluso sin supervisión.":totalHearts>=5?"Compatibilidad suficiente para sobrevivir a Estocolmo.":"Por suerte inventamos Las Cartas del Destino."}</span></div>
 <div class="budgets"><div class="budget-card official-budget"><span>GASTO VISIBLE DEL MARTES</span><strong>${money(cost)}</strong><small>por persona</small></div><div class="budget-card ana"><span>TICKETS RESTANTES</span><strong>${state.spins["Anaïs"]}/3</strong><small>Anaïs</small></div><div class="budget-card alc"><span>TICKETS RESTANTES</span><strong>${state.spins["Alcides"]}/3</strong><small>Alcides</small></div></div>
 <div class="farewell"><b>Listo. Ahora a ver si lo cumplimos.</b><span>Porque organizarlo era la parte fácil. 😌</span></div><div class="actions"><button class="btn primary" id="fullTripBtn">🗺️ VER NUESTRO VIAJE</button></div></section></section>`;confetti();document.getElementById("fullTripBtn").onclick=passesIntro;
}


/* ===== V11 · ITINERARIO FINAL COMPLETO ===== */
function safeOption(list,key){
  return list?.find(o=>o.k===key) || null;
}
function day1FinalItems(){
  return data.map((q,i)=>({time:q.time||["14:00","16:30","20:30"][i], option:safeOption(q.opts,state.resolved[i])}));
}
function day2FinalItems(){
  return saturdayData.map((q,i)=>({time:q.time, option:safeOption(q.opts,sat.resolved[i])}));
}
function day3FinalItems(){
  return sundayData.map((q,i)=>({time:q.time, option:safeOption(q.opts,sun.resolved[i])}));
}
function day4FinalItems(){
  const lunch=safeOption(mondayData[1].opts,mon.resolved[1]);
  return [
    {time:"10:30",title:"👑 Palacio Real · interior",desc:"Visita interior de aproximadamente 2 horas. Entrada adulta de septiembre: 240 SEK.",sek:240},
    {time:"13:00",title:lunch?`${lunch.e} ${lunch.t}`:"🌯 Comida",desc:"Comida sin restaurante cerrado de antemano.",sek:lunch?.sek||0},
    {time:"16:30",title:"🔒 PLAN SECRETO",desc:"Hay cosas que este itinerario tampoco tiene permiso para contarte.",secret:true},
    {time:"19:30",title:"🔒 SORPRESA DE ALCIDES",desc:"Información clasificada hasta que llegue el momento.",secret:true}
  ];
}
function day5FinalItems(){
  return tuesdayData.map((q,i)=>({time:q.time, option:safeOption(q.opts,tue.resolved[i])}));
}
function sumResolved(list,resolved){
  return list.reduce((t,q,i)=>t+(safeOption(q.opts,resolved[i])?.sek||0),0);
}
function totalVisibleBudget(){
 const d1=sumResolved(data,state.resolved);
 const d2=sumResolved(saturdayData,sat.resolved);
 const arch=sun.archipelago==="V"?395:sun.archipelago==="C"?395:sun.archipelago==="N"?375:0;
 const d3=sumResolved(sundayData,sun.resolved)+arch;
 const d4=sumResolved(mondayData,mon.resolved)+240;
 const d5=sumResolved(tuesdayData,tue.resolved);
 return {d1,d2,d3,d4,d5,total:d1+d2+d3+d4+d5};
}
function finalHearts(){
  return (sat?.score||0)+(sun?.score||0)+(mon?.score||0)+(tue?.score||0);
}
function tripPhrase(score){
  if(score>=8)return "Podéis viajar juntos. Incluso sin supervisión.";
  if(score>=5)return "Compatibilidad suficiente para sobrevivir a Estocolmo.";
  return "Por suerte inventamos Las Cartas del Destino.";
}
function itemHTML(item){
  if(item.option){
    return `<div class="trip-line ${item.option.secret?"secret-line":""}"><small>${item.time}</small><div><strong>${item.option.e||"✦"} ${item.option.t}</strong><span>${item.option.d||""}</span></div></div>`;
  }
  return `<div class="trip-line ${item.secret?"secret-line":""}"><small>${item.time}</small><div><strong>${item.title}</strong><span>${item.desc||""}</span></div></div>`;
}
function renderFullTrip(){
  const b=totalVisibleBudget();
  const hearts=finalHearts();
  const dinnerName=sat.dinnerPlace==="G"?"Stockholms Gästabud":sat.dinnerPlace==="T"?"Tradition":sat.dinnerPlace==="S"?"Restaurante sorpresa":null;
  const archName=sun.archipelago==="V"?"Vaxholm":sun.archipelago==="C"?"Crucero panorámico":sun.archipelago==="N"?"Naturaleza":null;

  app.innerHTML=`<section class="screen final-trip-scene"><section class="card full-trip-card">
    <div class="trip-hero">
      <span class="sticker">18 — 22 SEPT · 2026</span>
      <h2>Nuestro Estocolmo.</h2>
      <p>Esto ya no es un cuestionario. Es el viaje que habéis construido juntos.</p>
    </div>

    <div class="trip-days">
      <section class="trip-day">
        <header><span>01</span><div><small>VIERNES 18</small><h3>Primera toma de contacto</h3></div></header>
        <div class="trip-lines">
          <div class="trip-line"><small>10:35</small><div><strong>✈️ Llegada a Arlanda</strong><span>Traslado a Estocolmo y dejar equipaje.</span></div></div>
          ${day1FinalItems().map(itemHTML).join("")}
        </div>
      </section>

      <section class="trip-day">
        <header><span>02</span><div><small>SÁBADO 19</small><h3>Djurgården + noche sueca</h3></div></header>
        <div class="trip-lines">
          ${day2FinalItems().map(itemHTML).join("")}
          ${dinnerName?`<div class="trip-sub"><small>🍽️ RESTAURANTE ELEGIDO</small><strong>${dinnerName}</strong></div>`:""}
        </div>
      </section>

      <section class="trip-day">
        <header><span>03</span><div><small>DOMINGO 20</small><h3>Agua y archipiélago</h3></div></header>
        <div class="trip-lines">
          ${day3FinalItems().map(itemHTML).join("")}
          ${archName?`<div class="trip-sub"><small>⛴️ RUTA ELEGIDA</small><strong>${archName}</strong></div>`:""}
        </div>
      </section>

      <section class="trip-day classified-day">
        <header><span>04</span><div><small>LUNES 21</small><h3>Día parcialmente clasificado</h3></div></header>
        <div class="trip-lines">${day4FinalItems().map(itemHTML).join("")}</div>
        <div class="classified-note">🔒 Hay cosas que este itinerario tampoco tiene permiso para contarte.</div>
      </section>

      <section class="trip-day">
        <header><span>05</span><div><small>MARTES 22</small><h3>Últimas horas</h3></div></header>
        <div class="trip-lines">
          ${day5FinalItems().map(itemHTML).join("")}
          <div class="trip-line"><small>20:15</small><div><strong>✈️ Vuelo de vuelta</strong><span>Fin del viaje. O eso dice el billete.</span></div></div>
        </div>
      </section>
    </div>

    <div class="final-panels">
      <div class="final-panel love"><small>❤️ COMPATIBILIDAD VIAJERA</small><strong>${hearts} ❤️</strong><span>${tripPhrase(hearts)}</span></div>
      <div class="final-panel money"><small>💰 PRESUPUESTO VISIBLE</small><strong>${money(b.total)}</strong><span>por persona</span><em>El plan secreto del lunes no está incluido.</em></div>
    </div>

    <div class="budget-breakdown">
      <div><span>Viernes 18</span><b>${money(b.d1)}</b></div>
      <div><span>Sábado 19</span><b>${money(b.d2)}</b></div>
      <div><span>Domingo 20</span><b>${money(b.d3)}</b></div>
      <div><span>Lunes 21</span><b>${money(b.d4)} + 🔒</b></div>
      <div><span>Martes 22</span><b>${money(b.d5)}</b></div>
    </div>

    <div class="final-message">
      <b>Listo. Ahora a ver si lo cumplimos.</b>
      <span>Spoiler: seguramente improvisemos la mitad. 😌</span>
    </div>
  </section></section>`;
}


/* ===== V12 · PASES + PRESUPUESTO INTELIGENTE ===== */
const passPrices={
 transport:{sevenDay:470,single:43,arlandaSupplement:157,arlandaCombined:200,estimatedCityRides:10},
 goCity:{essentials:649}
};
function goCityEligible(){
 // Conservative Essentials logic:
 // 1 "big" choice: Vasa OR Royal Palace OR Skansen.
 // + up to two selected extras from the Essentials/top selection.
 const big=[];
 const extras=[];

 const satMuseum=safeOption(saturdayData[0].opts,sat.resolved[0]);
 if(satMuseum){
   if(/Vasa/i.test(satMuseum.t)) big.push({name:"Vasa",sek:240});
   if(/Skansen/i.test(satMuseum.t)) big.push({name:"Skansen",sek:305});
 }
 // Royal Palace is fixed on Monday and costs 240 SEK in Sep.
 big.push({name:"Palacio Real",sek:240});

 const satAfternoon=safeOption(saturdayData[1].opts,sat.resolved[1]);
 if(satAfternoon && /Barco panorámico/i.test(satAfternoon.t)){
   // Treat the closest included equivalent conservatively as Royal Djurgården boat tour.
   extras.push({name:"Barco por Djurgården",sek:285});
 }

 // Essentials includes only one of the main three. Choose the most expensive selected big attraction.
 big.sort((a,b)=>b.sek-a.sek);
 extras.sort((a,b)=>b.sek-a.sek);
 const covered=[...big.slice(0,1),...extras.slice(0,2)];
 const selectedRelevant=[...big,...extras];

 return {covered,selectedRelevant,big,extras};
}
function goCityMath(){
 const x=goCityEligible();
 const coveredValue=x.covered.reduce((a,v)=>a+v.sek,0);
 const individualRelevant=x.selectedRelevant.reduce((a,v)=>a+v.sek,0);
 const pass=passPrices.goCity.essentials;
 return {
   ...x,
   coveredValue,
   individualRelevant,
   pass,
   saving:coveredValue-pass
 };
}
function transportMath(){
 const p=passPrices.transport;
 // Airport by SL commuter rail in both directions.
 const withPass=p.sevenDay+(2*p.arlandaSupplement);
 const withoutPass=(2*p.arlandaCombined)+(p.estimatedCityRides*p.single);
 const breakEvenCityRides=Math.floor((withPass-(2*p.arlandaCombined))/p.single)+1;
 return {
   pass:withPass,
   loose:withoutPass,
   cityRides:p.estimatedCityRides,
   breakEvenCityRides,
   saving:withoutPass-withPass
 };
}
function passesIntro(){
 const g=goCityMath(),t=transportMath();
 app.innerHTML=`<section class="screen passes-scene"><section class="card passes-card">
 <span class="sticker">ÚLTIMA DECISIÓN PRÁCTICA</span><h2>Vale. Ahora toca hacer cuentas.</h2>
 <p>Ya sabemos qué queréis hacer. Los pases se deciden con el itinerario delante, no a ciegas.</p>
 <div class="math-preview"><div><small>🎟️ ATRACCIONES COMPATIBLES</small><strong>${money(g.individual)}</strong><span>${g.selectedRelevant.map(x=>x.name).join(" · ")}<br><b>Essentials solo puede cubrir 1 entre Vasa / Palacio / Skansen.</b></span></div><div><small>🚇 TRANSPORTE ESTIMADO</small><strong>${money(t.loose)}</strong><span>${t.cityRides} trayectos urbanos estimados + Arlanda ida/vuelta por SL.</span></div></div>
 <button class="btn primary" id="startPasses">DECIDIR LOS PASES →</button></section></section>`;
 document.getElementById("startPasses").onclick=goCityDecision;
}
function goCityDecision(){
 const g=goCityMath(),worth=g.saving>0;
 app.innerHTML=`<section class="screen pass-gocity"><section class="card pass-choice"><span class="sticker">🎟️ GO CITY</span><h2>¿Compramos Go City?</h2>
 <div class="comparison-money"><div><small>VALOR QUE REALMENTE CUBRIRÍA</small><strong>${money(g.coveredValue)}</strong></div><div class="versus">VS</div><div><small>GO CITY</small><strong>${money(g.pass)}</strong></div></div>
 <div class="saving ${worth?"good":"bad"}">${worth?`💚 AHORRO ESTIMADO · ${money(g.saving)}`:`⚠️ Con este itinerario sale ${Math.abs(g.saving)} SEK más caro`}</div>
 <div class="pass-buttons"><button class="pass-answer ${passes.goCity===true?"selected":""}" data-go="yes">🎟️<b>SÍ, GO CITY</b><small>${money(g.pass)}</small></button><button class="pass-answer ${passes.goCity===false?"selected":""}" data-go="no">🧾<b>NO</b><small>Entradas individuales</small></button></div>
 ${passes.goCity!==null?`<button class="btn primary" id="goNext">SIGUIENTE →</button>`:""}</section></section>`;
 document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{passes.goCity=b.dataset.go==="yes";goCityDecision()});
 if(passes.goCity!==null)document.getElementById("goNext").onclick=transportDecision;
}
function transportDecision(){
 const t=transportMath(),worth=t.saving>0;
 app.innerHTML=`<section class="screen pass-transport"><section class="card pass-choice"><span class="sticker">🚇 TRANSPORTE</span><h2>¿Bono o billetes sueltos?</h2><p class="audit-note">Incluye Arlanda ida/vuelta usando SL. Con bono se añaden los suplementos de estación; sin bono se usan los billetes combinados de Arlanda.</p>
 <div class="comparison-money"><div><small>BILLETES ESTIMADOS</small><strong>${money(t.loose)}</strong></div><div class="versus">VS</div><div><small>BONO</small><strong>${money(t.pass)}</strong></div></div>
 <div class="saving ${worth?"good":"bad"}">${worth?`💚 AHORRO ESTIMADO · ${money(t.saving)}`:"Billetes sueltos parecen suficientes con esta estimación."}</div>
 <div class="pass-buttons"><button class="pass-answer ${passes.transport===true?"selected":""}" data-tr="yes">🚇<b>BONO</b><small>${money(t.pass)}</small></button><button class="pass-answer ${passes.transport===false?"selected":""}" data-tr="no">🎫<b>SUELTOS</b><small>${money(t.loose)}</small></button></div>
 ${passes.transport!==null?`<button class="btn primary" id="transportNext">VER PRESUPUESTO DEFINITIVO →</button>`:""}</section></section>`;
 document.querySelectorAll("[data-tr]").forEach(b=>b.onclick=()=>{passes.transport=b.dataset.tr==="yes";transportDecision()});
 if(passes.transport!==null)document.getElementById("transportNext").onclick=renderSmartBudget;
}
function smartBudget(){
 const base=totalVisibleBudget(),g=goCityMath(),t=transportMath();

 // Royal Palace is fixed but not present in mondayData option prices.
 const royalPalaceFixed=240;

 // Base activities currently include Vasa/Skansen/boat when chosen, but not Royal Palace.
 let visibleBase=base.total+royalPalaceFixed;

 // When Go City is selected, subtract only covered attractions that are already inside visibleBase.
 // Royal Palace is now inside visibleBase as fixed 240.
 const covered=passes.goCity?g.coveredValue:0;
 const visibleAdjusted=Math.max(0,visibleBase-covered);

 const goCost=passes.goCity?g.pass:0;
 const transportCost=passes.transport?t.pass:t.loose;
 const total=visibleAdjusted+goCost+transportCost;

 // Comparison: same itinerary, no Go City, no 7-day travelcard.
 const comparison=visibleBase+t.loose;

 return {
   visibleAdjusted,goCost,transportCost,total,
   saving:comparison-total,
   royalPalaceFixed,
   comparison
 };
}
function passCombo(){
 if(passes.goCity&&passes.transport)return "GO CITY + BONO DE TRANSPORTE";
 if(passes.goCity)return "SOLO GO CITY";
 if(passes.transport)return "SOLO BONO DE TRANSPORTE";
 return "SIN PASES";
}
function renderSmartBudget(){
 const x=smartBudget();
 app.innerHTML=`<section class="screen smart-budget-scene"><section class="card smart-budget-card"><span class="sticker">PRESUPUESTO AUDITADO · 10/08/2026</span><h2>Las cuentas de verdad.</h2><p class="audit-note">Tarifas oficiales comprobadas. Las comidas, compras y algunas actividades variables siguen siendo estimaciones.</p>
 <div class="combo-ticket"><small>VUESTRA COMBINACIÓN</small><strong>${passCombo()}</strong></div>
 <div class="smart-lines"><div><span>🗺️ Resto visible del viaje</span><b>${money(x.visibleAdjusted)}</b></div><div><span>🎟️ Go City</span><b>${passes.goCity?money(x.goCost):"NO"}</b></div><div><span>🚇 Transporte</span><b>${money(x.transportCost)}</b></div><div class="secret-budget"><span>🔒 Plan secreto de Alcides</span><b>████ SEK · ██ €</b></div></div>
 <div class="grand-total"><small>TOTAL CONOCIDO · POR PERSONA</small><strong>${money(x.total)}</strong></div>
 <div class="saving final-saving"><b>${x.saving>0?`💚 Ahorro estimado · ${money(x.saving)}`:"Esta combinación prioriza flexibilidad."}</b><small>Comparado con la estimación sin pases.</small></div>
 <button class="btn primary" id="budgetTrip">🗺️ VER ITINERARIO + PRESUPUESTO</button></section></section>`;
 document.getElementById("budgetTrip").onclick=renderFullTripV12;
}
function renderFullTripV12(){
 renderFullTrip();
 const x=smartBudget(),card=document.querySelector(".full-trip-card");
 const panels=card.querySelector(".final-panels");
 if(panels)panels.innerHTML=`<div class="final-panel love"><small>❤️ COMPATIBILIDAD VIAJERA</small><strong>${finalHearts()} ❤️</strong><span>${tripPhrase(finalHearts())}</span></div><div class="final-panel money"><small>💰 TOTAL CONOCIDO</small><strong>${x.total} SEK</strong><span>~${eur(x.total)} € por persona</span><em>${passCombo()} · secreto no incluido</em></div>`;
 const breakdown=card.querySelector(".budget-breakdown");
 if(breakdown)breakdown.innerHTML=`<div><span>🎟️ Go City</span><b>${passes.goCity?`${money(x.goCost)}`:"No elegido"}</b></div><div><span>🚇 Transporte</span><b>${money(x.transportCost)}</b></div><div><span>🗺️ Resto visible</span><b>${money(x.visibleAdjusted)}</b></div><div><span>🔒 Plan secreto</span><b>████ SEK · ██ €</b></div><div><span>💚 Ahorro estimado</span><b>${Math.max(0,x.saving)} SEK · ~${eur(Math.max(0,x.saving))} €</b></div>`;
}

/* ===== V14 · MICROINTERACCIONES IPHONE ===== */
function softTap(pattern=10){
  try{ if(navigator.vibrate) navigator.vibrate(pattern); }catch(e){}
}
document.addEventListener("click",e=>{
  const el=e.target.closest("button,[data-key],[data-tuek],[data-go],[data-tr]");
  if(el && !el.disabled) softTap(8);
},{passive:true});

/* Prevent accidental double-taps from firing the same action twice. */
let lastActionAt=0;
document.addEventListener("click",e=>{
  const btn=e.target.closest(".btn.primary");
  if(!btn)return;
  const now=Date.now();
  if(now-lastActionAt<280){
    e.preventDefault();
    e.stopImmediatePropagation();
    return;
  }
  lastActionAt=now;
},true);
