async function renderGlossary() {
  if (document.querySelector('#glossary')) return;
  const app = document.querySelector('#app');
  app.innerHTML = heading('Glosario y debates', 'Explora los conceptos de cada empresa y conversa sobre su aplicación en los proyectos.') +
    '<section id="glossary" class="card glossary"></section>';
  const panel = document.querySelector('#glossary');
  const fold = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const canonical = name => ({lego:'LEGO', 'mc donald':'McDonald’s'}[fold(name)] || name);
  let companies, company, terms = [], search = '', currentTerm, currentTopic;
  const button = (label, action) => '<button type="button" data-action="' + action + '">' + label + '</button>';
  const bind = (action, handler) => panel.querySelector('[data-action="' + action + '"]').onclick = handler;
  const byId = (id, rows, handler) => panel.querySelectorAll('[' + id + ']').forEach(el => {
    el.onclick = () => handler(rows.find(row => row.id === el.getAttribute(id)));
  });
  const field = (label, name, max, multiline = false) => '<label>' + label +
    (multiline ? '<textarea rows="3"' : '<input') + ' name="' + name + '" maxlength="' + max +
    '" required>' + (multiline ? '</textarea>' : '') + '</label>';
  const author = () => field('Nombre o alias público', 'author', 60);
  const form = (summary, inputs) => '<details class="forum-compose"><summary>' + summary + '</summary><form>' +
    inputs + '<button class="primary">Publicar</button><span role="status"></span></form></details>';
  function submit(table, fixed, after) {
    panel.querySelector('form').onsubmit = async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = Object.fromEntries([...new FormData(form)].map(([k,v]) => [k,v.trim()]));
      const status = form.querySelector('[role=status]');
      if (Object.values(data).some(value => !value)) { status.textContent = 'Completa todos los campos.'; return; }
      const send = form.querySelector('button');
      send.disabled = true;
      try {
        unwrap(await cloud.from(table).insert({...fixed,...data}));
        toast('Publicación guardada.');
        if (form.isConnected) await after();
      } catch (error) {
        status.textContent = error.code === '23505' ? 'Este término ya existe para la empresa.' : cloudError(error);
      } finally { send.disabled = false; }
    };
  }
  let version = 0;
  async function read(table, column, value, order, show) {
    const mine = ++version;
    panel.innerHTML = '<p role="status">Cargando…</p>';
    try {
      const rows = [];
      for (let start = 0; ; start += 200) {
        let query = cloud.from(table).select('*').eq(column,value).order(order).order('id');
        const page = unwrap(await query.range(start,start+199));
        if (version !== mine || !panel.isConnected) return;
        rows.push(...page);
        if (page.length < 200) break;
      }
      show(rows);
    } catch (error) {
      if (mine !== version) return;
      panel.innerHTML = '<p role="alert">' + esc(cloudError(error)) + '</p>' + button('Reintentar','retry');
      bind('retry', () => read(table,column,value,order,show));
    }
  }
  function listTerms() {
    return read('ova_terms','company',company,'title',rows => {
      terms = rows;
      panel.innerHTML = '<div class="forum-filters"><label>Empresa<select id="forumCompany">' +
        companies.map(c => '<option' + (c===company?' selected':'') + '>' + esc(c) + '</option>').join('') +
        '</select></label><label>Buscar concepto<input id="forumSearch" type="search" value="' + esc(search) +
        '" placeholder="Término o definición"></label></div>' + form('Agregar término',field('Término','title',120)+field('Definición','body',2000,true)) +
        '<div class="forum-terms"></div>';
      panel.querySelector('select').onchange = e => { company=e.target.value; search=''; listTerms(); };
      panel.querySelector('#forumSearch').oninput = e => { search=e.target.value; filter(); };
      submit('ova_terms',{company},() => { search=''; return listTerms(); });
      function filter() {
        const found = terms.filter(t => fold(t.title+' '+t.body).includes(fold(search.trim())));
        panel.querySelector('.forum-terms').innerHTML = found.map(t => '<article><h3>' + esc(t.title) +
          '</h3><p>' + esc(t.body) + '</p><button data-term-id="' + esc(t.id) + '">Ver debates</button></article>').join('') ||
          '<p>No hay términos para esta búsqueda.</p>';
        byId('data-term-id',found,term => { currentTerm=term; listTopics(); });
      }
      filter();
    });
  }
  function listTopics() {
    return read('ova_topics','term_id',currentTerm.id,'created_at',rows => {
      panel.innerHTML = button('← Glosario de '+esc(company),'back') + '<h3>' + esc(currentTerm.title) + '</h3><p>' +
        esc(currentTerm.body) + '</p><h4>Debates</h4>' + form('Abrir un debate',author()+field('Título del debate','title',120)+
        field('Pregunta o aporte inicial','body',2000,true)) + rows.reverse().map(t => '<article><button data-topic-id="' +
        esc(t.id) + '">' + esc(t.title) + '</button>' + credit(t) + '</article>').join('') +
        (rows.length?'':'<p>Aún no hay debates sobre este término. Puedes abrir el primero.</p>');
      bind('back',listTerms);
      byId('data-topic-id',rows,topic => {currentTopic=topic; listReplies();});
      submit('ova_topics',{term_id:currentTerm.id},listTopics);
    });
  }
  function credit(entry) {
    return '<small>' + esc(entry.author) + ' · ' + esc(new Date(entry.created_at).toLocaleDateString('es-CO')) + '</small>';
  }
  function listReplies() {
    return read('ova_replies','topic_id',currentTopic.id,'created_at',rows => {
      panel.innerHTML = button('← Debates de '+esc(currentTerm.title),'back') + '<h3>' + esc(currentTopic.title) +
        '</h3>' + credit(currentTopic) + '<p>' + esc(currentTopic.body) + '</p><h4>Respuestas (' + rows.length + ')</h4>' +
        rows.map(r => '<article>' + credit(r) + '<p>' + esc(r.body) + '</p></article>').join('') +
        form('Responder al debate',author()+field('Tu respuesta','body',2000,true));
      bind('back',listTopics);
      submit('ova_replies',{topic_id:currentTopic.id},listReplies);
    });
  }
  companies = [...new Set(['Cerámica Italia','Coca-Cola','Éxito','Homecenter','LEGO','McDonald’s','Netflix','Samsung','Terpel',
    ...state.groups.map(group => canonical(group.company))])].sort((a,b)=>a.localeCompare(b,'es'));
  company = companies[0];
  await listTerms();
}
