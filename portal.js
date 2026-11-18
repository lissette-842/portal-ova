const companyAssets = {
  'ceramicaitalia': 'ceramica.png',
  'cocacola': 'coca-cola.png',
  'netflix': 'netflix.svg',
  'exito': 'exito.svg',
  'grupoexito': 'exito.svg',
  'lego': 'lego.svg',
  'mcdonald': 'mcdonalds.svg',
  'mcdonalds': 'mcdonalds.svg',
  'samsung': 'samsung.svg',
  'terpel': 'terpel.png'
};

function romanSemester(level) {
  const n = Number(level);
  if (!Number.isInteger(n) || n < 1 || n > 20) return '—';
  return ['','I','II','III','IV','V','VI','VII','VIII','IX','X',
    'XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX'][n];
}

function periodLabel(period) {
  const match = /^(\d{4})-([12])$/.exec(period);
  return match ? match[1] + ' · ' + romanSemester(match[2]) : period;
}

function companyLogo(name) {
  const key = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]/g, '');
  const asset = Object.hasOwn(companyAssets, key) ? companyAssets[key] : '';
  const initials = name.trim().split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase();
  return asset
    ? '<span class="company-logo"><img src="assets/empresas/' + asset + '" alt="' + esc(name) + '" loading="lazy"></span>'
    : '<span class="company-logo company-initials" aria-hidden="true">' + esc(initials) + '</span>';
}

const sectionRoutes={projects:'proyectos',learn:'evaluaciones',games:'juegos',archive:'semestres'};
function initialPortalView(){
  const section=new URLSearchParams(location.search).get('seccion');
  return Object.keys(sectionRoutes).find(key=>sectionRoutes[key]===section)||'home';
}
function renderPortalHome(){
  $('#app').innerHTML=`<section class="quick-cards" aria-labelledby="learningTitle">
    <div class="section-header"><h2 id="learningTitle">Centro de aprendizaje</h2></div>
    <div class="quick-cards-grid">
      <a href="?seccion=proyectos" class="quick-card"><span class="quick-icon" aria-hidden="true">▦</span><h3>Proyectos</h3><p>Consulta los trabajos y documentos por grupo y semestre.</p></a>
      <a href="?seccion=evaluaciones" class="quick-card"><span class="quick-icon" aria-hidden="true">✓</span><h3>Evaluaciones</h3><p>Responde 30 preguntas por corte y descarga tu evidencia.</p></a>
      <a href="?seccion=juegos" class="quick-card"><span class="quick-icon" aria-hidden="true">♧</span><h3>Aprende jugando</h3><p>Practica con el ahorcado, la sopa de letras y el apareamiento.</p></a>
      <a href="?seccion=semestres" class="quick-card"><span class="quick-icon" aria-hidden="true">↺</span><h3>Semestres y respaldos</h3><p>Consulta periodos, respaldos y evidencias.</p></a>
    </div>
  </section>`;
}
function openPortalView(destination){
  if(!evidenceBusy&&sectionRoutes[destination])location.href='?seccion='+sectionRoutes[destination];
}
