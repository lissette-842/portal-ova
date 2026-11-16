let questionPage=0;

function evaluationMark(score,total){
  return total>0 ? (5*score/total).toFixed(2).replace('.',',') : '0,00';
}
function markSummary(attempt){
  const score=Number(attempt.score),total=Number(attempt.total);
  return `<strong class="grade-value">${evaluationMark(score,total)} / 5</strong> · ${score} aciertos · ${total-score} desaciertos`;
}
function weightedMark(attempt){
  const name=attempt.studentName.trim().toLocaleLowerCase('es');
  const code=(attempt.studentCode||'').trim().toLocaleLowerCase('es');
  const cuts=new Map([[attempt.unit,attempt]]);
  for(const item of evidenceHistory().slice().reverse()){
    if(item.groupId!==attempt.groupId||item.studentName.trim().toLocaleLowerCase('es')!==name||(item.studentCode||'').trim().toLocaleLowerCase('es')!==code||cuts.has(item.unit))continue;
    cuts.set(item.unit,item);
  }
  const results=[...cuts.values()];
  const correct=results.reduce((sum,item)=>sum+Number(item.score),0);
  const total=results.reduce((sum,item)=>sum+Number(item.total),0);
  return `<p>${cuts.size===3?'Nota ponderada de los tres cortes':'Nota ponderada parcial ('+cuts.size+' de 3 cortes)'}: <strong>${evaluationMark(correct,total)} / 5</strong></p><p class="sub">Se usa el intento más reciente de cada corte disponible en esta pestaña. Cada pregunta tiene el mismo peso.</p>`;
}

function showQuestion(index){
  questionPage=Math.max(0,Math.min(29,index));
  document.querySelectorAll('#quiz [data-question]').forEach(section=>section.hidden=Number(section.dataset.question)!==questionPage);
  document.querySelectorAll('[data-question-jump]').forEach(button=>{
    const number=Number(button.dataset.questionJump);
    button.classList.toggle('answered',Object.hasOwn(answers,number));
    if(number===questionPage)button.setAttribute('aria-current','step');
    else button.removeAttribute('aria-current');
  });
  $('#previousQuestion').disabled=questionPage===0;
  $('#nextQuestion').disabled=questionPage===29;
  $('#questionPosition').textContent='Pregunta '+(questionPage+1)+' de 30';
}

let evaluationDraw = null;

function evaluationQuestions() {
  if (evaluationDraw?.unit !== unit) {
    const pool = questions[unit].slice();
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    evaluationDraw = {unit, items: pool.slice(0, 30)};
  }
  return evaluationDraw.items;
}

let evidenceAttempt=null,evidenceRequest=null,evidenceBusy=false,studentInfo={name:'',code:'',groupId:''};
try{studentInfo={...studentInfo,...JSON.parse(sessionStorage.getItem('proyectos-student-info')||'{}')}}catch(_){}
function evidenceHistory(){try{const saved=JSON.parse(sessionStorage.getItem('proyectos-evidence-history')||'[]');return Array.isArray(saved)?saved:[]}catch(_){return []}}
function storeEvidence(attempt){try{const list=evidenceHistory().filter(item=>item.id!==attempt.id);list.push(attempt);sessionStorage.setItem('proyectos-evidence-history',JSON.stringify(list.slice(-30)))}catch(_){toast('El PDF está disponible, pero no se pudo conservar el historial en esta pestaña.')}}
function rememberStudent(){try{sessionStorage.setItem('proyectos-student-info',JSON.stringify(studentInfo))}catch(_){}}
function newEvidenceRequest(){return {id:crypto.randomUUID(),receipt:Array.from(crypto.getRandomValues(new Uint8Array(32)),byte=>byte.toString(16).padStart(2,'0')).join('')}}
function localEvidence(){
  const group=state.groups.find(g=>g.id===studentInfo.groupId),details=evaluationQuestions().map((q,i)=>({...q,selected:answers[i],correct:answers[i]===q.answer})),score=details.filter(q=>q.correct).length;
  return {id:evidenceRequest.id,studentName:studentInfo.name.trim(),studentCode:studentInfo.code.trim(),groupId:group.id,groupName:group.name,company:group.company,term:group.term,level:group.level,unit:unit+1,date:new Date().toISOString(),score,total:30,percentage:score*100/30,details,saved:false};
}
async function saveEvaluationEvidence(){
  if(document.body.hasAttribute('data-preview')){storeEvidence(evidenceAttempt);return evidenceAttempt}
  const {data,error}=await cloud.rpc('submit_proyectos_evaluation_v2',{p_id:evidenceRequest.id,p_receipt:evidenceRequest.receipt,p_student_name:evidenceAttempt.studentName,p_student_code:evidenceAttempt.studentCode,p_group_id:evidenceAttempt.groupId,p_unit:evidenceAttempt.unit,p_question_ids:evidenceAttempt.details.map(q=>q.id),p_answers:evidenceAttempt.details.map(q=>q.selected)});
  if(error)throw error;evidenceAttempt=data;storeEvidence(data);return data;
}
async function finishEvaluation(){
  if(evidenceBusy)return;
  if(!studentInfo.name.trim()||studentInfo.name.trim().length<3){toast('Escribe el nombre completo del estudiante.');$('#studentName')?.focus();return}
  if(!state.groups.some(g=>g.id===studentInfo.groupId)){toast('Selecciona el grupo y periodo del estudiante.');$('#studentGroup')?.focus();return}
  if(Object.keys(answers).length!==30){showQuestion(evaluationQuestions().findIndex((_,i)=>!Object.hasOwn(answers,i)));toast('Responde las 30 preguntas antes de calificar.');return}
  evidenceRequest=newEvidenceRequest();evidenceAttempt=localEvidence();graded=true;evidenceBusy=true;renderEvidenceEvaluation();
  try{await saveEvaluationEvidence()}catch(error){storeEvidence(evidenceAttempt);toast('La evidencia está disponible, pero falta registrarla en Supabase: '+cloudError(error))}
  finally{evidenceBusy=false;renderEvidenceEvaluation();$('#evidenceResult')?.scrollIntoView({behavior:'smooth',block:'start'})}
}
function renderEvidenceEvaluation(){
  const qs=evaluationQuestions();
  $('#app').innerHTML=heading('Tu siguiente aprendizaje','Evaluaciones por estudiante con evidencia descargable en PDF.','<a class="portal-button" href="https://aulaextendida.unisimon.edu.co/" target="_blank" rel="noopener">Abrir Aula Extendida ↗</a>')+tabs()+
  '<div class="card"><h3>Unidad '+(unit+1)+' · '+['Fundamentos y diagnóstico','Datos, automatización y experiencia','Innovación y transformación sostenible'][unit]+'</h3><p>'+syllabus[unit].map(esc).join(' · ')+'</p></div>'+
  '<div class="section-heading"><div><h2>Evaluación de práctica</h2><p class="sub">30 preguntas al azar de un banco de 70 para este corte. Cada acierto aporta 5/30 a la nota. Las respuestas incorrectas aportan 0. Práctica tipo ICFES, no oficial.</p></div><span id="answeredCount">'+Object.keys(answers).length+'/30 respondidas</span></div>'+
  '<form id="quiz"><div class="card student-fields"><h3>Datos para tu evidencia</h3><label>Nombre completo del estudiante<input id="studentName" name="studentName" required minlength="3" maxlength="160" autocomplete="name" value="'+esc(studentInfo.name)+'" '+(graded?'disabled':'')+'></label><label>Código estudiantil (opcional)<input id="studentCode" name="studentCode" maxlength="60" value="'+esc(studentInfo.code)+'" '+(graded?'disabled':'')+'></label><label>Grupo y periodo académico<select id="studentGroup" name="studentGroup" required '+(graded?'disabled':'')+'><option value="">Selecciona tu grupo</option>'+state.groups.map(g=>'<option value="'+esc(g.id)+'" '+(g.id===studentInfo.groupId?'selected':'')+'>'+esc(periodLabel(g.term)+' · '+g.name+' · '+g.company)+'</option>').join('')+'</select></label><p class="sub">El nombre y el resultado se guardan de forma privada para consulta del docente. Puedes descargar tu PDF sin iniciar sesión.</p></div><progress id="quizProgress" max="30" value="'+Object.keys(answers).length+'"></progress>'+
  (graded?'':'<div class="quiz-navigation"><p id="questionPosition" aria-live="polite"></p><div class="question-steps" aria-label="Ir a pregunta">'+qs.map((_,i)=>'<button type="button" data-question-jump="'+i+'" aria-label="Pregunta '+(i+1)+'">'+(i+1)+'</button>').join('')+'</div></div>')+
  qs.map((q,i)=>'<section class="question" data-question="'+i+'"><span class="eyebrow">PREGUNTA '+(i+1)+' DE 30</span><p>'+esc(q.q)+'</p>'+q.options.map((option,j)=>'<label class="option"><input type="radio" name="q'+i+'" value="'+j+'" '+(answers[i]===j?'checked':'')+' '+(graded?'disabled':'')+'>'+'ABCD'[j]+'. '+esc(option)+'</label>').join('')+(graded?'<div class="feedback '+(answers[i]===q.answer?'':'wrong')+'">'+(answers[i]===q.answer?'Correcta.':'Respuesta correcta: '+'ABCD'[q.answer]+'.')+' '+esc(q.explanation)+'</div>':'')+'</section>').join('')+
  (graded?'':'<div class="quiz-actions"><button type="button" id="previousQuestion">Anterior</button><button type="button" id="nextQuestion">Siguiente</button><button class="primary" type="submit">Calificar y generar evidencia</button></div>')+'</form>'+
  (graded&&evidenceAttempt?'<section class="card" id="evidenceResult" style="margin-top:24px"><h2>'+esc(evidenceAttempt.studentName)+'</h2><p>'+markSummary(evidenceAttempt)+'</p>'+weightedMark(evidenceAttempt)+'<p class="sub">'+(evidenceBusy?'Registrando el resultado…':document.body.hasAttribute('data-preview')?'Resultado de prueba en esta pestaña.':evidenceAttempt.saved?'Resultado guardado y calificado en Supabase.':'Resultado pendiente de registro. El PDF indicará que es un resultado local.')+'</p><div class="actions"><button class="primary" id="downloadEvidence" '+(evidenceBusy?'disabled':'')+'>Descargar evidencia PDF</button>'+(!document.body.hasAttribute('data-preview')&&!evidenceAttempt.saved&&!evidenceBusy?'<button id="retryEvidenceSave">Reintentar registro</button>':'')+'<button id="retryEvaluation" '+(evidenceBusy?'disabled':'')+'>Nueva evaluación</button></div></section>':'')+
  '<div class="actions"><button id="myEvidenceHistory">Mis evidencias de esta pestaña</button>'+(['admin','teacher'].includes(access?.role)?'<button id="staffResults">Resultados por estudiante</button>':'')+'</div>';
  bindTabs();
  if(!graded){
    showQuestion(questionPage);
    $('#previousQuestion').onclick=()=>showQuestion(questionPage-1);
    $('#nextQuestion').onclick=()=>showQuestion(questionPage+1);
    document.querySelectorAll('[data-question-jump]').forEach(button=>button.onclick=()=>showQuestion(Number(button.dataset.questionJump)));
  }
  $('#studentName').oninput=event=>{studentInfo.name=event.target.value;rememberStudent()};$('#studentCode').oninput=event=>{studentInfo.code=event.target.value;rememberStudent()};$('#studentGroup').onchange=event=>{studentInfo.groupId=event.target.value;rememberStudent()};
  $('#quiz').onchange=event=>{if(/^q\d+$/.test(event.target.name)){answers[Number(event.target.name.slice(1))]=Number(event.target.value);$('#answeredCount').textContent=Object.keys(answers).length+'/30 respondidas';$('#quizProgress').value=Object.keys(answers).length;showQuestion(questionPage)}};
  $('#quiz').onsubmit=event=>{event.preventDefault();finishEvaluation()};
  $('#downloadEvidence')?.addEventListener('click',()=>downloadEvaluationPDF(evidenceAttempt));
  $('#retryEvidenceSave')?.addEventListener('click',async()=>{evidenceBusy=true;renderEvidenceEvaluation();try{await saveEvaluationEvidence()}catch(error){toast(cloudError(error))}finally{evidenceBusy=false;renderEvidenceEvaluation()}});
  $('#retryEvaluation')?.addEventListener('click',()=>{evaluationDraw=null;questionPage=0;answers={};graded=false;evidenceAttempt=null;evidenceRequest=null;renderEvidenceEvaluation()});
  $('#myEvidenceHistory').onclick=()=>showEvidenceHistory();$('#staffResults')?.addEventListener('click',()=>showStudentResults());
}
function showEvidenceHistory(){
  const list=evidenceHistory().reverse();$('#app').innerHTML=heading('Mis evidencias','Disponibles en esta pestaña del navegador. Descarga el PDF para conservarlo.')+'<button id="backEvaluation">← Volver a la evaluación</button><div class="grid" style="margin-top:20px">'+(list.map((item,i)=>'<article class="card"><h3>'+esc(item.studentName)+'</h3><p>Unidad '+item.unit+' · '+esc(periodLabel(item.term))+' · '+esc(item.groupName)+'</p><p>'+markSummary(item)+'</p><p>'+new Date(item.date).toLocaleString('es-CO')+'</p><button data-evidence="'+i+'">Descargar PDF</button></article>').join('')||'<p class="empty">Aún no has generado evidencias en esta pestaña.</p>')+'</div>';$('#backEvaluation').onclick=()=>renderEvidenceEvaluation();document.querySelectorAll('[data-evidence]').forEach(button=>button.onclick=()=>downloadEvaluationPDF(list[Number(button.dataset.evidence)]));
}
async function showStudentResults(){
  if(!['admin','teacher'].includes(access?.role))return;
  $('#app').innerHTML=heading('Resultados por estudiante','Registro privado de evidencias. Los nombres son declarados por cada estudiante.')+'<button id="backEvaluation">← Volver a la evaluación</button><div class="filters" style="margin:20px 0"><input id="resultSearch" placeholder="Buscar estudiante o código" aria-label="Buscar estudiante"><select id="resultPeriod" aria-label="Periodo de resultados"><option value="">Todos los periodos</option>'+state.terms.map(t=>'<option value="'+esc(t)+'">'+esc(periodLabel(t))+'</option>').join('')+'</select></div><div id="studentResults">Cargando resultados…</div>';$('#backEvaluation').onclick=()=>view==='archive'?renderArchive():renderEvidenceEvaluation();
  try{const all=await fetchAllStudentEvidence();if(!$('#studentResults'))return;
    const paint=()=>{const query=$('#resultSearch').value.toLowerCase(),period=$('#resultPeriod').value;const list=all.filter(item=>(!period||item.term===period)&&(item.studentName+' '+item.studentCode).toLowerCase().includes(query));$('#studentResults').innerHTML='<div class="grid">'+(list.map((item,i)=>'<article class="card"><h3>'+esc(item.studentName)+'</h3><p>'+esc(item.studentCode||'Sin código')+' · '+esc(periodLabel(item.term))+' · '+esc(item.groupName)+'</p><p>Unidad '+item.unit+' · '+markSummary(item)+'</p><p>'+new Date(item.date).toLocaleString('es-CO')+'</p><button data-staff-pdf="'+i+'">Evidencia PDF</button></article>').join('')||'<p class="empty">No hay resultados para este filtro.</p>')+'</div>';document.querySelectorAll('[data-staff-pdf]').forEach(button=>button.onclick=()=>downloadEvaluationPDF(list[Number(button.dataset.staffPdf)]))};$('#resultSearch').oninput=paint;$('#resultPeriod').onchange=paint;paint();
  }catch(error){if($('#studentResults'))$('#studentResults').textContent=cloudError(error)}
}
function archiveEvaluationItems(){
  const evidence=evidenceHistory();
  const ids=new Set(evidence.map(item=>item.id).filter(Boolean));
  const previous=(state.scores||[]).filter(item=>!item.id||!ids.has(item.id)).map(item=>({...item,legacy:true}));
  return [...evidence,...previous].sort((a,b)=>(Date.parse(b.date)||0)-(Date.parse(a.date)||0));
}
function renderArchiveEvaluationHistory(){
  const target=$('#archiveEvaluationHistory');if(!target)return;
  if(['admin','teacher'].includes(access?.role)){renderPrivateArchiveHistory(target);return}
  const items=archiveEvaluationItems();
  target.innerHTML='<p class="sub">Tus evidencias recientes están disponibles en esta pestaña. Descarga los PDF para conservarlos después de cerrarla. También se muestran las prácticas anteriores disponibles en este navegador.</p><div class="actions"><button id="archiveStartEvaluation">Realizar evaluación</button><button id="staffHistoryAccess">Acceso docente y administradora</button>'+(['admin','teacher'].includes(access?.role)?'<button id="archiveStaffResults">Resultados por estudiante</button>':'')+'</div>'+(items.length?'<div class="grid">'+items.map((item,i)=>'<article class="card"><h4>'+esc(item.studentName||'Práctica anterior sin identificación')+'</h4><p>Unidad '+esc(item.unit)+' · <strong>'+esc(item.score)+'/'+esc(item.total)+' · '+(item.score*100/item.total).toFixed(1)+' %</strong></p>'+(item.groupName?'<p>'+esc(periodLabel(item.term))+' · '+esc(item.groupName)+'</p>':'')+'<p>'+(Number.isFinite(Date.parse(item.date))?esc(new Date(item.date).toLocaleString('es-CO')):'Fecha no disponible')+'</p>'+(item.legacy?'<p class="sub">Este registro anterior no incluye el detalle de respuestas para generar una evidencia PDF.</p>':'<p class="sub">'+(item.saved?'Registrado en Supabase':'Pendiente de registro en Supabase')+'</p><button data-archive-evidence="'+i+'">Descargar evidencia PDF</button>')+'</article>').join('')+'</div>':'<p class="empty">No hay evaluaciones disponibles en esta pestaña o navegador. Completa una evaluación para ver aquí tu resultado y descargar su evidencia.</p>');
  $('#staffHistoryAccess').onclick=()=>showStaffHistoryLogin();
  $('#archiveStartEvaluation').onclick=()=>openPortalView('learn');
  $('#archiveStaffResults')?.addEventListener('click',()=>showStudentResults());
  target.querySelectorAll('[data-archive-evidence]').forEach(button=>button.onclick=()=>downloadEvaluationPDF(items[Number(button.dataset.archiveEvidence)]));
}
async function fetchAllStudentEvidence(){
  if(!['admin','teacher'].includes(access?.role))throw new Error('Solo el profesor y la administradora pueden consultar este registro.');
  const all=[],pageSize=250;
  for(let offset=0;;offset+=pageSize){
    const {data,error}=await cloud.from('proyectos_evaluation_attempts').select('snapshot').order('created_at',{ascending:false}).order('id',{ascending:false}).range(offset,offset+pageSize-1);
    if(error)throw error;all.push(...data.map(row=>row.snapshot));if(data.length<pageSize)break;
  }
  return all;
}
async function renderPrivateArchiveHistory(target){
  target.innerHTML='<p>Cargando el historial privado de todos los estudiantes…</p>';
  try{
    const all=await fetchAllStudentEvidence();if(!target.isConnected||!['admin','teacher'].includes(access?.role))return;
    target.innerHTML='<p class="sub">Registro privado de todos los intentos guardados en Supabase, desde cualquier equipo. Los nombres son declarados por los estudiantes.</p><div class="actions"><button id="refreshPrivateHistory">Actualizar resultados</button><button id="staffHistorySignOut">Cerrar sesión privada</button></div><div class="filters"><input id="privateHistorySearch" aria-label="Buscar estudiante o código" placeholder="Buscar estudiante o código"><select id="privateHistoryUnit" aria-label="Filtrar unidad"><option value="">Todas las unidades</option><option value="1">Unidad 1</option><option value="2">Unidad 2</option><option value="3">Unidad 3</option></select><select id="privateHistoryPeriod" aria-label="Filtrar periodo"><option value="">Todos los periodos</option>'+[...new Set(all.map(a=>a.term))].sort().map(t=>'<option value="'+esc(t)+'">'+esc(periodLabel(t))+'</option>').join('')+'</select></div><p id="privateHistoryCount"></p><div id="privateHistoryList"></div>';
    const paint=()=>{const search=$('#privateHistorySearch').value.toLocaleLowerCase('es'),unit=$('#privateHistoryUnit').value,period=$('#privateHistoryPeriod').value;const list=all.filter(a=>(!unit||String(a.unit)===unit)&&(!period||a.term===period)&&(a.studentName+' '+a.studentCode).toLocaleLowerCase('es').includes(search));$('#privateHistoryCount').textContent=list.length+' de '+all.length+' evaluaciones · '+new Set(list.map(a=>(a.studentCode||a.studentName).trim().toLocaleLowerCase('es'))).size+' estudiantes (según identificación declarada)';$('#privateHistoryList').innerHTML='<div class="grid">'+(list.map((a,i)=>'<article class="card"><h4>'+esc(a.studentName)+'</h4><p>'+esc(a.studentCode||'Sin código')+' · '+esc(periodLabel(a.term))+' · '+esc(a.groupName)+'</p><p>Unidad '+esc(a.unit)+' · '+markSummary(a)+'</p><p>'+esc(new Date(a.date).toLocaleString('es-CO'))+'</p><button data-private-history-pdf="'+i+'">Descargar evidencia PDF</button></article>').join('')||'<p>No hay evaluaciones para este filtro.</p>')+'</div>';target.querySelectorAll('[data-private-history-pdf]').forEach(b=>b.onclick=()=>downloadEvaluationPDF(list[Number(b.dataset.privateHistoryPdf)]))};
    $('#privateHistorySearch').oninput=paint;$('#privateHistoryUnit').onchange=paint;$('#privateHistoryPeriod').onchange=paint;$('#refreshPrivateHistory').onclick=()=>renderPrivateArchiveHistory(target);$('#staffHistorySignOut').onclick=async()=>{const {error}=await cloud.auth.signOut();if(error){toast(cloudError(error));return}access=null;currentUser=null;renderArchiveEvaluationHistory()};paint();
  }catch(error){if(target.isConnected){target.innerHTML='<p role="alert">No se pudo cargar el historial: '+esc(cloudError(error))+'</p><button id="retryPrivateHistory">Reintentar</button>';$('#retryPrivateHistory').onclick=()=>renderPrivateArchiveHistory(target)}}
}
function showStaffHistoryLogin(targetGroup=null){
  const target=$(targetGroup?'#groupDocumentAccess':'#archiveEvaluationHistory');if(!target)return;
  target.innerHTML='<h4>Acceso privado para docente y administradora</h4><p>Utiliza una cuenta confirmada y autorizada. Los estudiantes no necesitan iniciar sesión para realizar evaluaciones.</p><form id="staffHistoryLogin"><label>Correo<input name="email" type="email" autocomplete="username" required></label><label>Contraseña<input name="password" type="password" autocomplete="current-password" required></label><p id="staffHistoryMessage" role="status"></p><div class="actions"><button class="primary" type="submit">Ver todos los resultados</button><button type="button" id="createStaffAccount">Crear cuenta</button><button type="button" id="cancelStaffHistory">Volver a mi historial</button></div></form>';
  if(targetGroup){
    target.querySelector('h4').textContent='Acceso para eliminar documentos';
    target.querySelector('p').textContent='Entra con una cuenta autorizada para este grupo.';
    target.querySelector('button[type="submit"]').textContent='Iniciar sesión';
    $('#createStaffAccount').hidden=true;
    $('#cancelStaffHistory').textContent='Cancelar';
    target.scrollIntoView({block:'nearest'});
  }
  $('#createStaffAccount').onclick=()=>showStaffAccountRegistration();
  $('#cancelStaffHistory').onclick=()=>{if(targetGroup)target.replaceChildren();else renderArchiveEvaluationHistory()};
  $('#staffHistoryLogin').onsubmit=async event=>{event.preventDefault();const form=event.currentTarget,message=$('#staffHistoryMessage');form.querySelector('button[type="submit"]').disabled=true;message.textContent='Comprobando acceso…';try{const {data,error}=await cloud.auth.signInWithPassword({email:form.elements.email.value.trim().toLowerCase(),password:form.elements.password.value});if(error)throw error;const {data:own,error:roleError}=await cloud.from('proyectos_access').select('role').eq('email',data.user.email.toLowerCase()).maybeSingle();if(roleError)throw roleError;const allowed=targetGroup
      ? own?.role==='admin'||(own?.role==='student'&&own.group_id===targetGroup)
      : ['admin','teacher'].includes(own?.role);
    if(!allowed)throw new Error(targetGroup?'Esta cuenta no puede eliminar documentos de este grupo.':'Esta cuenta no tiene acceso docente o de administradora.');
    if(!targetGroup)view='archive';
    await loadCloud()}catch(error){if(message.isConnected)message.textContent=cloudError(error);else toast(cloudError(error))}finally{if(form.isConnected){form.elements.password.value='';form.querySelector('button[type="submit"]').disabled=false}}};
}
function showStaffAccountRegistration(){
  const target=$('#archiveEvaluationHistory');if(!target)return;
  target.innerHTML='<h4>Crear cuenta de acceso privado</h4><p>Registra tu correo y elige tu contraseña. Crear una cuenta no asigna permisos: el acceso a resultados requiere un correo previamente autorizado.</p><form id="staffAccountRegistration"><label>Correo electrónico<input name="email" type="email" autocomplete="email" maxlength="254" required></label><label>Contraseña<input name="password" type="password" autocomplete="new-password" minlength="12" required aria-describedby="newPasswordHelp"></label><p id="newPasswordHelp" class="sub">Usa al menos 12 caracteres.</p><label>Confirmar contraseña<input name="confirmation" type="password" autocomplete="new-password" minlength="12" required></label><p id="staffRegistrationMessage" role="status" aria-live="polite"></p><div class="actions"><button class="primary" type="submit">Crear mi cuenta</button><button type="button" id="backStaffLogin">Ya tengo cuenta · Iniciar sesión</button></div></form>';
  $('#backStaffLogin').onclick=()=>showStaffHistoryLogin();
  $('#staffAccountRegistration').onsubmit=async event=>{
    event.preventDefault();const form=event.currentTarget,message=$('#staffRegistrationMessage'),password=form.elements.password.value;
    if(!form.reportValidity())return;
    if(password.length<12){message.textContent='La contraseña debe tener al menos 12 caracteres.';return}
    if(password!==form.elements.confirmation.value){message.textContent='Las contraseñas no coinciden.';form.elements.confirmation.focus();return}
    const button=form.querySelector('button[type="submit"]');button.disabled=true;message.textContent='Creando cuenta…';
    try{
      if(document.body.hasAttribute('data-preview')){message.textContent='Vista previa: no se creará una cuenta.';return}
      const {data,error}=await cloud.auth.signUp({email:form.elements.email.value.trim().toLowerCase(),password,options:{emailRedirectTo:new URL('index.html',location.href).href}});
      if(error)throw error;
      if(message.isConnected)message.textContent=data.session?'Cuenta registrada. Pulsa «Ya tengo cuenta · Iniciar sesión» para consultar tu acceso autorizado.':'Revisa tu correo y abre el enlace de confirmación. Luego vuelve a esta página e inicia sesión. Si ya tenías cuenta, utiliza tu contraseña anterior. Revisa también la carpeta de correo no deseado.';
    }catch(error){if(message.isConnected)message.textContent=cloudError(error);else toast(cloudError(error))}
    finally{if(form.isConnected){form.elements.password.value='';form.elements.confirmation.value='';button.disabled=false}}
  };
}
