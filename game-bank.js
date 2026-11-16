const hangmanBank = [
  ['DIGITALIZACION','Convertir información física o analógica a un formato digital.'],
  ['ESTRATEGIA','Plan que orienta las decisiones para lograr objetivos de negocio.'],
  ['CANVAS','Lienzo de nueve bloques para describir un modelo de negocio.'],
  ['MADUREZ','Nivel de desarrollo de las capacidades digitales de una organización.'],
  ['PROCESO','Conjunto de actividades que transforma entradas en resultados.'],
  ['BPMN','Notación gráfica para representar procesos de negocio.'],
  ['COMPUERTA','Elemento de un diagrama que divide o reúne rutas de un proceso.'],
  ['PILOTO','Implementación de alcance limitado que permite probar una propuesta.'],
  ['DIAGNOSTICO','Análisis de la situación actual y las oportunidades de mejora.'],
  ['INTEGRACION','Conexión de sistemas para que compartan información y operaciones.'],
  ['AUTOMATIZACION','Uso de tecnología para ejecutar tareas con menor intervención manual.'],
  ['NUBE','Infraestructura y servicios informáticos accesibles por red bajo demanda.'],
  ['SENSOR','Dispositivo que mide una condición física como temperatura o vibración.'],
  ['INVENTARIO','Registro de existencias disponibles en una organización.'],
  ['INDICADOR','Medida que ayuda a evaluar el progreso o desempeño de un objetivo.'],
  ['REPROCESO','Trabajo que se debe repetir para corregir un error anterior.'],
  ['CANAL','Medio por el que una empresa se comunica o entrega valor a sus clientes.'],
  ['DEPENDENCIA','Relación en la que una actividad requiere el resultado de otra.']
];

const wordSearchBank = [
  'DATOS','MODELO','NUBE','ROBOT','FLUJO','CLIENTE','TABLERO','VENTAS','PROTOTIPO',
  'CALIDAD','VARIABLE','ETIQUETA','ENTRENAR','PREDICCION','CONSULTA','CREDENCIAL',
  'ARQUITECTURA','INTEGRACION','WEBHOOK','SEGMENTO','USABILIDAD','METRICA','API','RPA'
];

const matchingBank = [
  ['Design Thinking','Método de diseño que parte de las necesidades de las personas.'],
  ['Ciberseguridad','Protección de sistemas e información frente a amenazas.'],
  ['KPI','Medida vinculada al desempeño de un objetivo.'],
  ['Roadmap','Plan que organiza iniciativas, hitos y dependencias.'],
  ['Ética de IA','Evaluación de equidad, transparencia y responsabilidad en sistemas de IA.'],
  ['Sostenibilidad digital','Gestión del impacto ambiental y social de la tecnología.'],
  ['Empatía','Comprensión del contexto y las necesidades de quienes usan un servicio.'],
  ['Ideación','Generación de alternativas para abordar un problema definido.'],
  ['Riesgo residual','Riesgo que permanece después de aplicar los controles.'],
  ['Integridad','Propiedad que protege la exactitud de la información frente a cambios indebidos.'],
  ['Disponibilidad','Posibilidad de usar un servicio o consultar datos cuando se necesitan.'],
  ['Autenticación multifactor','Verificación de identidad con dos o más factores distintos.'],
  ['Permiso mínimo','Asignación del acceso estrictamente necesario para cumplir una tarea.'],
  ['Gobierno digital','Definición de responsabilidades y reglas para administrar datos y servicios digitales.'],
  ['Patrocinador del cambio','Persona que respalda las decisiones y consigue recursos para una iniciativa.'],
  ['Línea base','Medición inicial con la que se comparan los resultados posteriores.'],
  ['Hito','Resultado verificable que marca un punto importante del plan.'],
  ['Retención de datos','Plazos y criterios para conservar o eliminar información.'],
  ['Sesgo algorítmico','Patrón que produce resultados desfavorables de forma sistemática para ciertos grupos.'],
  ['Prueba piloto','Ensayo de alcance limitado que aporta evidencia antes de un despliegue general.'],
  ['Plan de continuidad','Acciones para mantener funciones esenciales durante una interrupción.'],
  ['Control de acceso','Reglas que determinan quién puede consultar o modificar un recurso.'],
  ['Validación','Comprobación con evidencia de que una solución cumple su propósito.'],
  ['Adopción','Uso efectivo de un cambio por las personas que deben incorporarlo a su trabajo.']
];

function shuffleGameItems(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const lastGameSelections = new Map();
function drawGameItems(key, bank, count) {
  const last = lastGameSelections.get(key) || [];
  const fresh = bank.filter(item => !last.includes(item));
  const draw = shuffleGameItems(fresh.length >= count ? fresh : bank).slice(0, count);
  lastGameSelections.set(key, draw);
  return draw;
}

function buildWordSearch(words) {
  const size = 12;
  const directions = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]];
  const placements = words.map(word => {
    const paths = [];
    for (let r=0;r<size;r++) for (let c=0;c<size;c++) for (const [dr,dc] of directions) {
      const endRow = r + dr*(word.length-1), endCol = c + dc*(word.length-1);
      if (endRow<0 || endRow>=size || endCol<0 || endCol>=size) continue;
      paths.push(Array.from(word, (_,i)=>(r+dr*i)*size+c+dc*i));
    }
    return shuffleGameItems(paths);
  });

  let cells;
  for (let attempt=0;attempt<20;attempt++) {
    cells = Array(size*size).fill('');
    const placed = words.every((word,index) => {
      const path = placements[index].find(path => path.every((cell,i)=>!cells[cell] || cells[cell]===word[i]));
      if (!path) return false;
      path.forEach((cell,i)=>{cells[cell]=word[i]});
      return true;
    });
    if (placed) return fillEmptyGameCells(cells);
  }

  // Cada palabra cabe en su propia fila si las ubicaciones cruzadas se agotan.
  cells = Array(size*size).fill('');
  const rows = shuffleGameItems(Array.from({length:size},(_,i)=>i));
  words.forEach((word,i)=>{
    const letters = Math.random() < .5 ? [...word] : [...word].reverse();
    const col = Math.floor(Math.random()*(size-word.length+1));
    letters.forEach((letter,j)=>{cells[rows[i]*size+col+j]=letter});
  });
  return fillEmptyGameCells(cells);
}

function fillEmptyGameCells(cells) {
  return cells.map(letter => letter || String.fromCharCode(65+Math.floor(Math.random()*26)));
}
