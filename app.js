const $=s=>document.querySelector(s), esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let db,state,view=initialPortalView(),term=new URLSearchParams(location.search).get('periodo')||'2026-2',search='',groupId=null,unit=0,answers={},graded=false,game=null;
const names=['Lissette Viviana Cárdenas Pallares','Jesús Gabriel Rodriguez Rubio','Yefrey Sneyder Sanchez Alba'];

function toast(s){$('#toast').textContent=s;$('#toast').style.display='block';setTimeout(()=>$('#toast').style.display='none',6000)}
async function mutate(fn){if(document.body.hasAttribute('data-preview')){toast('Vista previa: esta operación no modifica los datos compartidos.');return false}if(!state||cloudSaving){toast('Espera a que termine el guardado anterior.');return false}const previous=structuredClone(state);cloudSaving=true;try{fn();await syncCloud(previous,state);await loadCloud();return true}catch(error){state=previous;await loadCloud();toast(cloudError(error)+' Los registros que se hayan confirmado se conservaron; puedes reintentar.');return false}finally{cloudSaving=false}}
startCloud();
const activeGroups=()=>state.groups.filter(g=>g.term===term&&(`${g.name} ${g.company}`).toLowerCase().includes(search.toLowerCase()));
function heading(title,subtitle,extra=''){return `<div class="section-heading"><div><h2>${title}</h2><p class="sub">${subtitle}</p></div>${extra}</div>`}
function termSelect(){return `<select id="term" aria-label="Semestre académico">${state.terms.map(t=>`<option value="${esc(t)}" ${t===term?'selected':''}>${esc(periodLabel(t))}</option>`).join('')}</select>`}
function render(){
  if(!state)return;
  document.body.dataset.section=view;
  $('#homeHero').hidden=view!=='home';
  $('#newGroup').hidden=view!=='projects'||Boolean(groupId);
  $('#academicPeriods').innerHTML=state.terms.map(t=>`<option value="${esc(t)}">${esc(periodLabel(t))}</option>`).join('');
  $('#members').innerHTML=state.members.map(name=>`<li>${esc(name)}</li>`).join('');
  document.querySelectorAll('[data-section]').forEach(link=>{
    if(link.dataset.section===view)link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
  if(view==='home')renderPortalHome();
  if(view==='projects')renderProjects();
  if(view==='learn')renderLearn();
  if(view==='games')renderGames();
  if(view==='archive')renderArchive();
  $('#term')?.addEventListener('change',e=>{term=e.target.value;groupId=null;render()});
}
function renderProjects(){if(groupId)return renderGroup();let groups=activeGroups(),files=state.files.filter(f=>state.groups.some(g=>g.id===f.groupId&&g.term===term));$('#app').innerHTML=`<div class="stats"><div class="stat"><div><strong>${groups.length.toString().padStart(2,'0')}</strong> <span>Grupos de trabajo</span></div><div class="icon">♧</div></div><div class="stat"><div><strong>${files.length.toString().padStart(2,'0')}</strong> <span>Documentos guardados</span></div><div class="icon">▤</div></div><div class="stat"><div><strong>03</strong> <span>Fases para transformar</span></div><div class="icon">↗</div></div></div>${heading('Nuestros proyectos','Cada grupo, una empresa. Un recorrido compartido.',`<div class="filters"><input id="search" placeholder="Buscar grupo o empresa" aria-label="Buscar grupo" value="${esc(search)}">${termSelect()}</div>`)}<div class="grid company-grid">${groups.map(g=>{let fs=state.files.filter(f=>f.groupId===g.id);return `<article class="card ${g.company==='Cerámica Italia'?'feature':''}"><div class="card-top">${companyLogo(g.company)}<span class="tag">${esc(g.name)} · Sem. ${romanSemester(g.level)}</span></div><h3>${esc(g.company)}</h3><p>Proyecto de transformación empresarial<br>Periodo ${esc(periodLabel(g.term))}</p><div class="phase-dots">${[1,2,3].map(p=>`<span class="${fs.some(f=>f.phase===p)?'done':''}" title="Fase ${p}"></span>`).join('')}</div><div class="card-bottom"><span>▤ &nbsp; ${fs.length} documentos</span><button data-group="${g.id}">Ver proyecto &nbsp; ↗</button></div></article>`}).join('')}</div>${groups.length?'':'<p class="empty">No hay grupos para este filtro. Crea uno para comenzar.</p>'}`;document.querySelectorAll('[data-portal-view]').forEach(button=>button.onclick=()=>openPortalView(button.dataset.portalView));$('#search').oninput=e=>{let pos=e.target.selectionStart;search=e.target.value;renderProjects();$('#search').focus();$('#search').setSelectionRange(pos,pos)};document.querySelectorAll('[data-group]').forEach(b=>b.onclick=()=>{groupId=b.dataset.group;render()})}
$('#programLevel').innerHTML=Array.from({length:20},(_,i)=>`<option value="${i+1}" ${i===6?'selected':''}>${romanSemester(i+1)}</option>`).join('');
function renderPhaseFiles(targetGroup,phase){
  const files=state.files.filter(file=>file.groupId===targetGroup&&file.phase===phase);
  const replaced=new Set(files.map(file=>file.previousId).filter(Boolean));
  return files.slice().reverse().map(file=>{
    const oldVersion=replaced.has(file.id);
    const badge=oldVersion?'Versión anterior':file.previousId?'Versión actual':'';
    const update=!oldVersion&&canUploadGroup(targetGroup)
      ? `<button type="button" data-update-document="${esc(file.id)}" aria-label="Actualizar documento: ${esc(file.name)}">Actualizar documento</button>`
      : '';
    const remove=`<button type="button" data-remove="${esc(file.id)}" aria-label="Eliminar PDF: ${esc(file.name)}">Eliminar PDF</button>`;
    return `<div class="file"><strong>${esc(file.name)}</strong>
      ${badge?`<span class="tag">${badge}</span>`:''}
      <p class="sub">${(file.size/1024).toFixed(1)} KB · ${new Date(file.date).toLocaleDateString('es-CO')}</p>
      <button type="button" data-download="${esc(file.id)}">↓ Descargar</button>${update}${remove}</div>`;
  }).join('')||'<p class="empty">Aún no hay documentos.</p>';
}

async function uploadGroupPDF(input,targetGroup,phase,previousId=null){
  const file=input.files[0];
  if(!file)return;
  try{
    if(!file.size||file.size>25*1024*1024)throw Error('El PDF debe pesar entre 1 byte y 25 MB.');
    if(!file.name.toLowerCase().endsWith('.pdf')||!(await file.slice(0,1024).text()).includes('%PDF-'))throw Error('Selecciona un documento PDF válido.');
    const data=await blobData(file);
    const saved=await mutate(()=>state.files.push({
      id:crypto.randomUUID(),groupId:targetGroup,phase,name:file.name,
      size:file.size,date:new Date().toISOString(),data,previousId
    }));
    if(saved)toast(previousId?'Nueva versión guardada. La anterior sigue disponible.':'Documento guardado en Supabase.');
  }catch(error){toast(cloudError(error))}
  finally{input.value=''}
}

async function archiveGroup(group){
  if(!canManage()||cloudSaving)return;
  if(document.body.hasAttribute('data-preview')){toast('Vista previa: el grupo se conserva.');return}
  const confirmed=confirm(`¿Eliminar ${group.name} · ${group.company} del portal? Sus documentos y resultados quedarán conservados en Supabase.`);
  if(!confirmed)return;
  cloudSaving=true;
  const button=$('#archiveGroup');
  button.disabled=true;
  try{
    const {data,error}=await cloud.rpc('archive_proyectos_group',{target_group:group.id});
    if(error)throw error;
    groupId=null;
    await loadCloud();
    toast(data?'Grupo retirado del portal.':'El grupo ya no está disponible.');
  }catch(error){toast(cloudError(error))}
  finally{cloudSaving=false;button.disabled=false}
}

function renderGroup(){let g=state.groups.find(g=>g.id===groupId);if(!g){groupId=null;return renderProjects()}$('#app').innerHTML=heading(esc(g.company),`${esc(g.name)} · Semestre ${romanSemester(g.level)} · Periodo ${esc(periodLabel(g.term))}`,`<div class="actions"><button id="back">← Todos los proyectos</button>${canManage()?'<button type="button" id="archiveGroup">Eliminar grupo</button>':''}</div>`)+`<div class="project-identity">${companyLogo(g.company)}</div><p class="note">Guarda evidencias de cada etapa en PDF. Los archivos se guardan en Supabase y pueden consultarse y descargarse sin iniciar sesión. Puedes subir PDF sin iniciar sesión. La eliminación está protegida.</p>${!canWriteGroup(g.id)&&state.files.some(file=>file.groupId===g.id)?'<div class="actions"><button type="button" id="documentAccess">Iniciar sesión para eliminar documentos</button></div><div id="groupDocumentAccess"></div>':''}<div class="phases">${['Pasado','Presente','Futuro'].map((p,i)=>`<section class="phase"><span class="eyebrow">FASE 0${i+1}</span><h3>${p}</h3><p class="sub">${['Diagnóstico y antecedentes de la empresa.','Desarrollo, prototipo y evidencias actuales.','Roadmap, metas y plan de mejora.'][i]}</p>${canUploadGroup(g.id)?`<label>Subir documento PDF<input type="file" accept="application/pdf,.pdf" data-upload="${i+1}"></label>`:``}${renderPhaseFiles(g.id,i+1)}</section>`).join('')}</div>`;$('#back').onclick=()=>{groupId=null;render()};$('#documentAccess')?.addEventListener('click',()=>showStaffHistoryLogin(g.id));$('#archiveGroup')?.addEventListener('click',()=>archiveGroup(g));document.querySelectorAll('[data-upload]').forEach(input=>input.onchange=()=>uploadGroupPDF(input,g.id,Number(input.dataset.upload)));document.querySelectorAll('[data-update-document]').forEach(button=>button.onclick=()=>{const previous=state.files.find(file=>file.id===button.dataset.updateDocument);const input=document.createElement('input');input.type='file';input.accept='application/pdf,.pdf';input.onchange=()=>uploadGroupPDF(input,g.id,previous.phase,previous.id);input.click()});document.querySelectorAll('[data-download]').forEach(b=>b.onclick=async()=>{try{let f=state.files.find(f=>f.id===b.dataset.download);await cloudDownload(f)}catch(error){toast(cloudError(error))}});document.querySelectorAll('[data-remove]').forEach(button=>button.onclick=async()=>{
  const file=state.files.find(item=>item.id===button.dataset.remove);
  if(!file||file.groupId!==g.id)return;
  if(!canWriteGroup(g.id)){
    showStaffHistoryLogin(g.id);
    $('#groupDocumentAccess')?.scrollIntoView({block:'nearest'});
    return;
  }
  if(!confirm(`¿Eliminar «${file.name}» de este grupo?`))return;
  button.disabled=true;
  try{
    if(await mutate(()=>state.files=state.files.filter(item=>item.id!==file.id)))toast('Documento eliminado.');
  }finally{button.disabled=false}
})}
function download(data,name){let a=document.createElement('a');a.href=data;a.download=name;a.click()}
function downloadJSON(obj,name){let url=URL.createObjectURL(new Blob([JSON.stringify(obj)],{type:'application/json'}));download(url,name);setTimeout(()=>URL.revokeObjectURL(url),10000)}
$('#newGroup').onclick=()=>{let f=$('#groupForm');f.reset();f.term.value=term;$('#dialog').showModal()};$('#groupForm').onsubmit=async e=>{e.preventDefault();let f=e.target,entry={id:crypto.randomUUID(),term:f.term.value.trim(),level:Number(f.level.value),name:f.elements.namedItem('name').value.trim(),company:f.company.value.trim()};if(!entry.term||!entry.name||!entry.company)return;const saved=await mutate(()=>{if(!state.terms.includes(entry.term))state.terms.push(entry.term);state.groups.push(entry)});if(!saved)return;term=entry.term;view='projects';groupId=entry.id;$('#dialog').close();render()};

function tabs(){return `<div class="unit-tabs">${[0,1,2].map(u=>`<button class="${u===unit?'active':''}" data-unit="${u}">Unidad ${u+1}</button>`).join('')}</div>`}function bindTabs(){document.querySelectorAll('[data-unit]').forEach(b=>b.onclick=()=>{if(view==='learn'&&Object.keys(answers).length&&!graded&&!confirm('¿Cambiar de unidad y descartar las respuestas actuales?'))return;if(evidenceBusy)return;unit=Number(b.dataset.unit);evaluationDraw=null;questionPage=0;answers={};graded=false;evidenceAttempt=null;evidenceRequest=null;game=null;render()})}
function renderLearn(){renderEvidenceEvaluation()}
function renderArchive(){$('#app').innerHTML=heading('Cada semestre deja huella','Conserva el trabajo de tus grupos y lleva una copia contigo.')+`<div class="note"><strong>Consulta abierta y edición protegida.</strong><br>Los proyectos y PDF están disponibles sin iniciar sesión. Puedes subir PDF a los grupos sin iniciar sesión. También puedes crear grupos y semestres sin iniciar sesión. La eliminación requiere una cuenta autorizada. Las nuevas evaluaciones generan evidencia PDF individual y registran el resultado de forma privada. Descarga el PDF para conservarlo. Exporta respaldos periódicamente. GitHub conserva el código y el esquema SQL. Para trasladar los datos, exporta e importa un respaldo.</div><div class="grid">${state.terms.map(t=>`<article class="card"><span class="tag">ARCHIVO ACADÉMICO</span><h3>${esc(periodLabel(t))}</h3><p>${state.groups.filter(g=>g.term===t).length} grupos conservados</p><button data-term-open="${esc(t)}">Abrir semestre ↗</button></article>`).join('')}</div><div class="card" style="margin-top:20px"><h3>Respaldo de la base de datos</h3><p>Incluye todos los semestres, grupos, archivos PDF, integrantes y resultados. La importación agrega registros nuevos y conserva los existentes; ante un ID repetido, mantiene el registro local.</p><div class="actions"><button id="export" class="primary">↓ Exportar respaldo completo</button><label style="margin:0"><span>Importar respaldo JSON</span><input type="file" id="import" accept=".json,application/json"></label><button id="newTerm">＋ Nuevo semestre</button></div></div><div class="card" style="margin-top:20px"><h3>Historial de evaluaciones</h3><div id="archiveEvaluationHistory"></div></div>`;renderArchiveEvaluationHistory();document.querySelectorAll('[data-term-open]').forEach(b=>b.onclick=()=>{location.href='?seccion=proyectos&periodo='+encodeURIComponent(b.dataset.termOpen)});$('#export').onclick=()=>exportCloudBackup();$('#newTerm').hidden=false;$('#import').parentElement.hidden=!canManage();$('#newTerm').onclick=()=>{let t=prompt('Periodo académico nuevo (por ejemplo, 2027-1):');if(t?.trim())mutate(()=>{t=t.trim();if(!state.terms.includes(t))state.terms.push(t);term=t})};$('#import').onchange=async e=>{if(!canManage())return;try{let f=e.target.files[0];if(!f)return;let incoming=JSON.parse(await f.text());validateBackup(incoming);const groupMap=new Map(incoming.groups.map(g=>{const existing=state.groups.find(x=>x.id===g.id)||state.groups.find(x=>x.term===g.term&&x.name===g.name&&x.company===g.company&&x.level===g.level);return[g.id,existing?existing.id:g.id]}));const saved=await mutate(()=>{for(let t of incoming.terms)if(!state.terms.includes(t))state.terms.push(t);for(let g of incoming.groups)if(!state.groups.some(x=>x.id===groupMap.get(g.id)))state.groups.push({...g,id:groupMap.get(g.id)});for(let f of incoming.files)if(!state.files.some(x=>x.id===f.id))state.files.push({...f,groupId:groupMap.get(f.groupId)});for(let s of incoming.scores)if(!state.scores.some(x=>x.date===s.date&&x.unit===s.unit))state.scores.push(s)});if(saved)toast('Respaldo importado. Los registros anteriores se conservaron.')}catch(err){toast('No se importó: '+err.message)}}}
function validateBackup(x){if(x.version!==1||!['terms','groups','files','scores','members'].every(k=>Array.isArray(x[k])))throw Error('Formato de respaldo inválido.');if(!x.terms.every(t=>typeof t==='string')||!x.groups.every(g=>typeof g.id==='string'&&typeof g.name==='string'&&typeof g.company==='string'&&x.terms.includes(g.term)&&Number.isInteger(g.level)&&g.level>0&&g.level<=20))throw Error('Grupos o semestres inválidos.');if(new Set(x.groups.map(g=>g.id)).size!==x.groups.length||new Set(x.files.map(f=>f.id)).size!==x.files.length)throw Error('Identificadores duplicados.');if(!x.files.every(f=>typeof f.id==='string'&&typeof f.name==='string'&&[1,2,3].includes(f.phase)&&x.groups.some(g=>g.id===f.groupId)&&Number.isFinite(f.size)&&f.size>=0&&f.size<=25*1024*1024&&typeof f.data==='string'&&/^data:application\/pdf;base64,[A-Za-z0-9+/=]+$/.test(f.data)&&Number.isFinite(Date.parse(f.date))))throw Error('Documentos inválidos.');if(!x.scores.every(s=>[1,2,3].includes(s.unit)&&Number.isInteger(s.score)&&s.score>=0&&s.score<=30&&s.total===30&&Number.isFinite(Date.parse(s.date))))throw Error('Resultados inválidos.')}
function renderGames(){$('#app').innerHTML=heading('Aprender también es jugar','Cada unidad tiene un juego. Inicia una partida nueva para descubrir otros conceptos.')+tabs()+'<div class="card game-card" id="game"></div>';bindTabs();if(unit===0)hangman();if(unit===1)wordSearch();if(unit===2)matching()}
function hangman(){if(!game){const [[word,hint]]=drawGameItems('hangman',hangmanBank,1);game={word,hint,guessed:[]}}let wrong=game.guessed.filter(c=>!game.word.includes(c)).length,won=[...game.word].every(c=>game.guessed.includes(c)),over=won||wrong>=6;$('#game').innerHTML=`<span class="eyebrow">UNIDAD 1 · AHORCADO</span><h3>Descubre el concepto</h3><p>Pista: ${esc(game.hint)}</p><div class="word">${[...game.word].map(c=>game.guessed.includes(c)?c:'_').join('')}</div><p>${over?(won?'¡Muy bien! Has completado el concepto.':'Se agotaron los intentos. La palabra era '+game.word):`Errores: ${wrong}/6 · Elige una letra.`}</p><div class="letters qwerty">${['QWERTYUIOP','ASDFGHJKLÑ','ZXCVBNM'].map(row=>`<div class="keyboard-row">${[...row].map(c=>`<button type="button" data-letter="${c}" ${over||game.guessed.includes(c)?'disabled':''}>${c}</button>`).join('')}</div>`).join('')}</div><div class="game-actions"><button id="resetGame">Nueva partida</button></div>`;document.querySelectorAll('[data-letter]').forEach(b=>b.onclick=()=>{game.guessed.push(b.dataset.letter);hangman()});$('#resetGame').onclick=()=>{game=null;hangman()}}
function wordSearch(){if(!game){const words=drawGameItems('wordSearch',wordSearchBank,6);game={words,cells:buildWordSearch(words),paths:[],selected:[],found:[]}}const {words}=game;$('#game').innerHTML=`<span class="eyebrow">UNIDAD 2 · SOPA DE LETRAS</span><h3>Conecta con los datos</h3><p>Selecciona la primera y la última letra de cada palabra, en horizontal, vertical o diagonal. Puedes seleccionar en cualquier sentido.</p><div class="wordgrid">${game.cells.map((c,i)=>`<button data-cell="${i}" aria-label="Fila ${Math.floor(i/12)+1}, columna ${i%12+1}: ${c}" class="${game.selected.includes(i)||game.found.some(n=>game.paths[n].includes(i))?'selected':''}">${c}</button>`).join('')}</div><p>${words.map((w,i)=>game.found.includes(i)?`<s>${w}</s> ✓`:w).join(' · ')}</p><p>${game.found.length===words.length?'¡Completaste la sopa de letras!':`${game.found.length}/${words.length} palabras encontradas`}</p><div class="game-actions"><button id="resetGame">Nueva sopa</button></div>`;document.querySelectorAll('[data-cell]').forEach(b=>b.onclick=()=>{let n=Number(b.dataset.cell);if(game.selected.length!==1){game.selected=[n]}else{let start=game.selected[0],r=Math.floor(start/12),c=start%12,dr=Math.floor(n/12)-r,dc=n%12-c,len=Math.max(Math.abs(dr),Math.abs(dc));if(!(dr===0||dc===0||Math.abs(dr)===Math.abs(dc))||!len){game.selected=[];wordSearch();return}let path=Array.from({length:len+1},(_,i)=>(r+i*Math.sign(dr))*12+c+i*Math.sign(dc));let str=path.map(i=>game.cells[i]).join('');let index=words.findIndex(w=>w===str||[...w].reverse().join('')===str);if(index>=0&&!game.found.includes(index)){game.found.push(index);game.paths[index]=path;toast('¡Encontraste '+words[index]+'!')}game.selected=[]}wordSearch()});$('#resetGame').onclick=()=>{game=null;wordSearch()}}
function matching(){if(!game){const pairs=drawGameItems('matching',matchingBank,6);game={pairs,left:null,right:null,matched:[],order:shuffleGameItems([0,1,2,3,4,5]),message:''}}const {pairs}=game;$('#game').innerHTML=`<span class="eyebrow">UNIDAD 3 · APAREAMIENTO</span><h3>Cada concepto con su significado</h3><p>Elige un concepto y después su definición. ${game.matched.length}/6 parejas.</p><div class="match"><div>${pairs.map((p,i)=>`<button data-left="${i}" class="${game.left===i?'selected':''} ${game.matched.includes(i)?'matched':''}" ${game.matched.includes(i)?'disabled':''}>${p[0]}</button>`).join('')}</div><div>${game.order.map(i=>`<button data-right="${i}" class="${game.right===i?'selected':''} ${game.matched.includes(i)?'matched':''}" ${game.matched.includes(i)?'disabled':''}>${pairs[i][1]}</button>`).join('')}</div></div><p role="status">${game.matched.length===6?'¡Excelente! Completaste todas las parejas.':game.message}</p><div class="game-actions"><button id="resetGame">Nueva partida</button></div>`;function choose(){if(game.left!==null&&game.right!==null){if(game.left===game.right){game.matched.push(game.left);game.message='✓ Pareja correcta.'}else game.message='Esa pareja no corresponde. Inténtalo de nuevo.';game.left=null;game.right=null}matching()}document.querySelectorAll('[data-left]').forEach(b=>b.onclick=()=>{game.left=Number(b.dataset.left);choose()});document.querySelectorAll('[data-right]').forEach(b=>b.onclick=()=>{game.right=Number(b.dataset.right);choose()});$('#resetGame').onclick=()=>{game=null;matching()}}
