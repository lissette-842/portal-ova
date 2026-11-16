// Cliente público: las políticas de Supabase autorizan cada operación.
const cloud = window.supabase.createClient(
  'https://mzaqymoftnokkmauasvx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16YXF5bW9mdG5va2ttYXVhc3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5Nzk3MTksImV4cCI6MjA3ODU1NTcxOX0.LYySALEGdlj4xjvS5mRGz3Kyu7kpKkH5_jjEZUDfKd4'
);
let currentUser=null, access=null, cloudLoading=0, cloudSaving=false;
const bucket=()=>cloud.storage.from('proyectos-pdf');
const canManage=()=>access?.role==='admin';
const canUploadGroup=id=>!!state?.groups.some(group=>group.id===id);
const canWriteGroup=id=>canManage()||(access?.role==='student'&&access.group_id===id);
function unwrap(result){if(result.error)throw result.error;return result.data}
function cloudError(error){const message=error?.message||String(error);if(/invalid login/i.test(message))return 'Correo o contraseña incorrectos.';if(/email not confirmed/i.test(message))return 'Confirma tu correo antes de entrar.';if(/rate limit/i.test(message))return 'Se alcanzó el límite de intentos. Espera unos minutos.';if(/fetch|network/i.test(message))return 'No se pudo conectar con Supabase. Revisa tu conexión e inténtalo de nuevo.';return message}
function authShell(){
  state=null;access=null;$('#members').textContent=names.join(' · ');$('#newGroup').hidden=true;
  $('#app').innerHTML='<div class="auth-card card"><span class="eyebrow">TU AULA COMPARTIDA</span><h2>Inicia sesión en Proyectos</h2><p>Entra con tu correo para consultar los proyectos y documentos de tu grupo.</p><form id="authForm"><label>Correo electrónico<input name="email" type="email" autocomplete="email" required></label><label>Contraseña<input name="password" type="password" autocomplete="current-password" required></label><div class="actions"><button class="primary" type="submit">Entrar</button><button type="button" id="signUp">Crear mi cuenta</button></div><p id="authMessage" role="status"></p></form><p class="sub">Primero crea y confirma tu cuenta. La administradora debe autorizar tu correo y asignarte un grupo. El profesor tendrá acceso de consulta a todos los proyectos.</p></div>';
  const back=document.createElement('button');back.type='button';back.className='text';back.textContent='← Volver a proyectos';back.onclick=()=>{view='projects';loadCloud()};$('#app .auth-card').prepend(back);const form=$('#authForm');
  async function submit(signup){const message=$('#authMessage');const email=form.elements.email.value.trim().toLowerCase(),password=form.elements.password.value;if(!form.reportValidity())return;if(signup&&password.length<12){message.textContent='Elige una contraseña de al menos 12 caracteres.';return}form.querySelectorAll('button').forEach(b=>b.disabled=true);message.textContent=signup?'Creando cuenta…':'Iniciando sesión…';try{if(signup){unwrap(await cloud.auth.signUp({email,password,options:{emailRedirectTo:new URL('index.html',location.href).href}}));message.textContent='Revisa tu correo para confirmar la cuenta. Después vuelve a esta página e inicia sesión.'}else{unwrap(await cloud.auth.signInWithPassword({email,password}));await loadCloud()}}catch(error){if(message.isConnected)message.textContent=cloudError(error)}finally{if(form.isConnected)form.querySelectorAll('button').forEach(b=>b.disabled=false)}}
  form.onsubmit=e=>{e.preventDefault();submit(false)};$('#signUp').onclick=()=>submit(true);
}
async function loadCloud(){
  const epoch=++cloudLoading;
  const {data,error}=await cloud.auth.getUser();
  if(epoch!==cloudLoading)return;
  if(error||!data.user){currentUser=null;}
  currentUser=data?.user||null;
  try{
    const own=currentUser?unwrap(await cloud.from('proyectos_access').select('*').eq('email',currentUser.email.toLowerCase()).maybeSingle()):null;
    if(epoch!==cloudLoading)return;
    access=own;$('#newGroup').hidden=false;
    const results=await Promise.all([
      cloud.from('proyectos_semesters').select('*').order('period'),
      cloud.from('proyectos_groups').select('*').is('archived_at',null).order('name'),
      cloud.from('proyectos_documents').select('*').order('created_at'),
      currentUser&&access?cloud.from('proyectos_results').select('*').order('created_at'):Promise.resolve({data:guestScores()}),
      cloud.from('proyectos_settings').select('members').eq('id',1).single()
    ]);
    const [periods,groups,files,scores,settings]=results.map(unwrap);
    if(epoch!==cloudLoading)return;
    const visibleGroupIds=new Set(groups.map(group=>group.id));
    state={version:1,members:settings.members,terms:periods.map(p=>p.period),groups:groups.map(g=>({id:g.id,name:g.name,company:g.company,term:g.period,level:g.program_semester})),files:files.filter(file=>visibleGroupIds.has(file.group_id)).map(f=>({id:f.id,groupId:f.group_id,phase:f.phase,name:f.filename,size:f.byte_size,date:f.created_at,path:f.path,previousId:f.previous_id})),scores:scores.map(s=>({id:s.id,userId:s.user_id,unit:s.unit,score:s.score,total:s.total,date:s.created_at||s.date}))};
    if(!state.terms.includes(term))term=state.terms.at(-1)||'2026-2';
    render();
  }catch(error){$('#app').innerHTML='<div class="note">No se pudieron cargar los datos. '+esc(cloudError(error))+'<p><button id="retryCloud">Reintentar conexión</button></p></div>';$('#retryCloud').onclick=()=>loadCloud()}
}
async function startCloud(){

  cloud.auth.onAuthStateChange((event)=>{if(['SIGNED_IN','SIGNED_OUT','TOKEN_REFRESHED'].includes(event))setTimeout(()=>loadCloud(),0)});
  await loadCloud();
}
async function cloudDownload(file){const blob=unwrap(await bucket().download(file.path));const url=URL.createObjectURL(blob);download(url,file.name);setTimeout(()=>URL.revokeObjectURL(url),10000)}
async function blobData(blob){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob)})}
async function putCloudDocument(file){
  const path=file.groupId+'/'+file.id+'.pdf';const raw=atob(file.data.split(',')[1]);const blob=new Blob([Uint8Array.from(raw,c=>c.charCodeAt(0))],{type:'application/pdf'});
  const result=await bucket().upload(path,blob,{contentType:'application/pdf',upsert:false});
  if(result.error){
    if(!/already exists|duplicate/i.test(result.error.message))throw result.error;
    const existing=unwrap(await bucket().download(path));
    const bytes=await Promise.all([existing.arrayBuffer(),blob.arrayBuffer()]);
    const hashes=await Promise.all(bytes.map(b=>crypto.subtle.digest('SHA-256',b)));
    if(new Uint8Array(hashes[0]).toString()!==new Uint8Array(hashes[1]).toString())throw Error('Existe otro documento con este identificador.');
  }
  const saved=await cloud.from('proyectos_documents').insert({id:file.id,group_id:file.groupId,phase:file.phase,filename:file.name,byte_size:blob.size,created_at:file.date,path,previous_id:file.previousId||null});
  if(saved.error){if(!result.error)await bucket().remove([path]);throw saved.error}
}
async function syncCloud(before,after){
  const freshTerms=after.terms.filter(t=>!before.terms.includes(t));
  if(freshTerms.length)unwrap(await cloud.from('proyectos_semesters').upsert(freshTerms.map(period=>({period})),{onConflict:'period',ignoreDuplicates:true}));
  const groups=after.groups.filter(g=>!before.groups.some(old=>old.id===g.id));
  if(groups.length)unwrap(await cloud.from('proyectos_groups').insert(groups.map(g=>({id:g.id,name:g.name,company:g.company,period:g.term,program_semester:g.level}))));
  const pendingFiles=after.files.filter(f=>!before.files.some(old=>old.id===f.id));
  while(pendingFiles.length){
    const next=pendingFiles.findIndex(file=>!pendingFiles.some(parent=>parent.id===file.previousId));
    if(next<0)throw Error('El respaldo tiene un ciclo entre versiones de documentos.');
    const [file]=pendingFiles.splice(next,1);
    await putCloudDocument(file);
  }
  for(const file of before.files.filter(f=>!after.files.some(now=>now.id===f.id))){
    // Eliminar primero el objeto garantiza que los permisos no dejen un PDF accesible.
    unwrap(await bucket().remove([file.path]));unwrap(await cloud.from('proyectos_documents').delete().eq('id',file.id));
  }
  const scores=after.scores.filter(s=>!before.scores.some(old=>old.id&&old.id===s.id||old.date===s.date&&old.unit===s.unit));
  if(scores.length){if(currentUser&&access){unwrap(await cloud.from('proyectos_results').insert(scores.map(s=>({user_id:currentUser.id,unit:s.unit,score:s.score,total:30,created_at:s.date}))));}else{try{localStorage.setItem('proyectos-guest-scores',JSON.stringify([...guestScores(),...scores]));}catch(_){toast('El resultado se calculó, pero el navegador no permitió guardar el historial.');}}}
}
async function exportCloudBackup(){try{toast('Preparando respaldo con los PDF disponibles para tu cuenta…');const backup=structuredClone(state);for(const file of backup.files)file.data=await blobData(unwrap(await bucket().download(file.path)));downloadJSON(backup,'proyectos-respaldo-compartido-'+new Date().toISOString().slice(0,10)+'.json');toast('Respaldo descargado.')}catch(error){toast(cloudError(error))}}
function guestScores(){try{const saved=JSON.parse(localStorage.getItem('proyectos-guest-scores')||'[]');return Array.isArray(saved)?saved.filter(s=>[1,2,3].includes(s.unit)&&Number.isInteger(s.score)&&s.score>=0&&s.score<=30&&s.total===30&&typeof s.date==='string'):[]}catch(_){return []}}
