const K='gda_'+M.id,L=s=>{try{return JSON.parse(localStorage.getItem(s))}catch(e){return null}};
let S=L(K)||{done:[],best:0};const sv=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const $=s=>document.querySelector(s);
function render(){let h=`<a href="index.html">← Home</a><h1>${M.icon} ${M.name}</h1><div class="hud"><span>⏱ ${M.topics.reduce((a,t)=>a+t.t,0)} h study</span><span>✅ ${S.done.length}/${M.topics.length}</span><span>🏆 Best ${S.best}%</span></div><div class="bar"><i style="width:${pct(S)}%"></i></div>
<div class="tabs"><button onclick="tab(0)">📘 Learn</button><button onclick="tab(1)" class="alt">🎮 Quiz</button></div><div id="L">`;
M.topics.forEach((t,i)=>{h+=`<details class="card"><summary>${S.done.includes(i)?'✅':'⭕'} ${t.n} <span class="tag">${'🔥'.repeat(t.f)} · ${t.t}h</span></summary><p>🧒 <b>In simple words:</b> ${t.e}</p><b>Key points</b><ul>${t.p.map(x=>`<li>${x}</li>`).join('')}</ul><div class="card">🧪 <b>Worked example:</b> ${t.x}</div><div class="tip">💡 ${t.k}</div><p class="tag">PYQ pattern: ${t.y}</p><button onclick="done(${i})">${S.done.includes(i)?'Done ✓ (tap to undo)':'Mark complete +5 XP'}</button></details>`});
$('#app').innerHTML=h+'</div><div id="Q" class="hide"></div>'}
function pct(s){return Math.round(s.done.length/M.topics.length*60+s.best*.4)}
function done(i){const d=S.done,x=d.indexOf(i);x<0?d.push(i):d.splice(x,1);sv();render()}
function tab(n){$('#L').classList.toggle('hide',!!n);$('#Q').classList.toggle('hide',!n);if(n)quiz()}
let qi,sc,qs;
function quiz(){qs=[...M.q].sort(()=>Math.random()-.5);qi=0;sc=0;ask()}
function ask(){const q=qs[qi];if(!q){const p=Math.round(sc/qs.length*100);S.best=Math.max(S.best,p);sv();$('#Q').innerHTML=`<div class="card"><h2>${p>=70?'🏆 Great!':'💪 Keep going'}</h2>Score ${sc}/${qs.length} (${p}%)<br><br><button onclick="quiz()">Retry</button> <button class="alt" onclick="render();tab(0)">Back</button></div>`;return}
$('#Q').innerHTML=`<div class="card"><div class="tag">Q${qi+1}/${qs.length} · ${q[4]||'PYQ-style'} · Score ${sc}</div><p><b>${q[0]}</b></p>${q[1].map((o,i)=>`<button class="opt" onclick="pick(${i})">${o}</button>`).join('')}<div id="ex"></div></div>`}
function pick(i){const q=qs[qi],b=document.querySelectorAll('.opt');if(b[0].disabled)return;b.forEach((x,j)=>{x.disabled=1;if(j==q[2])x.classList.add('ok')});if(i==q[2])sc++;else b[i].classList.add('no');
$('#ex').innerHTML=`<p>${i==q[2]?'✅ +10 XP':'❌'} ${q[3]}</p><button onclick="qi++;ask()">Next →</button>`}
render();
