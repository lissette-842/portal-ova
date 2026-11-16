// Banco original de práctica: no corresponde a preguntas oficiales del ICFES.
const syllabus=[
['Fundamentos de transformación empresarial','Transformación digital vs. digitalización','Estrategia y capacidades digitales','Business Model Canvas','Madurez digital','Procesos empresariales','BPM y BPMN','Oportunidades de transformación','IA, nube, Big Data, IoT y automatización'],
['Gestión y analítica de datos','Business Intelligence y dashboards','Inteligencia artificial generativa','Machine Learning','Automatización inteligente y RPA','Power Automate y n8n','Arquitectura empresarial','Sistemas de información','Experiencia del cliente y prototipos'],
['Innovación y Design Thinking','Ciberseguridad y gestión de riesgos','Cultura organizacional y cambio','Gobierno digital','Ética en inteligencia artificial','Sostenibilidad digital','Indicadores de desempeño','Roadmap de transformación','Presentación y validación del proyecto integrador']];
const raw=[
[
['Una empresa escanea facturas sin modificar su operación. ¿Cómo se clasifica la iniciativa?','Digitalización de información','Transformación integral del modelo de negocio','Innovación del ecosistema','Cambio de propuesta de valor','Convertir documentos a formato digital no implica por sí solo transformar el negocio.'],
['Cerámica Italia busca transformar su servicio. ¿Qué acción tiene mayor alcance estratégico?','Rediseñar la compra y entrega a partir de necesidades del cliente','Comprar computadores sin objetivos','Digitalizar el logotipo','Abrir redes sin responsables','La transformación conecta procesos, personas, tecnología y valor para el cliente.'],
['Antes de elegir una plataforma, ¿qué debería definir un equipo?','El problema del negocio y el resultado esperado','El color de la interfaz','La marca más conocida','El número máximo de funciones','La tecnología debe responder a un propósito empresarial.'],
['Una fábrica tiene herramientas modernas pero no personal capacitado. ¿Qué necesita fortalecer?','Capacidades digitales del equipo','Solo más licencias','Publicidad de la herramienta','Eliminar la formación','Las capacidades incluyen habilidades, procesos y cultura, además de tecnología.'],
['Un Canvas debe explicar por qué un cliente elige la empresa. ¿Qué bloque lo representa?','Propuesta de valor','Estructura de costos','Recursos clave','Socios clave','La propuesta de valor describe los beneficios que resuelven necesidades del cliente.'],
['Una empresa identifica arquitectos y hogares como compradores. ¿Qué bloque del Canvas está trabajando?','Segmentos de clientes','Fuentes de ingresos','Actividades clave','Estructura de costos','Los segmentos agrupan clientes con necesidades y comportamientos relevantes.'],
['Las ventas por tienda y comercio electrónico pertenecen a qué bloque del Canvas?','Canales','Socios clave','Costos fijos','Recursos humanos','Los canales permiten comunicar, entregar y vender la propuesta de valor.'],
['El pago por suscripción de un servicio se describe principalmente en:','Fuentes de ingresos','Recursos clave','Actividades clave','Socios clave','Las fuentes de ingresos explican cómo el negocio recibe dinero.'],
['Una empresa evalúa liderazgo, datos, procesos y tecnología. ¿Qué está diagnosticando?','Madurez digital','Únicamente rentabilidad','Solo inventario','Valor de la marca','La madurez digital requiere evaluar varias dimensiones de la organización.'],
['Para sustentar un diagnóstico de madurez conviene:','Combinar entrevistas, evidencias y métricas','Usar solo impresiones del gerente','Contar computadores','Copiar el resultado de otra empresa','Varias fuentes permiten contrastar la situación real.'],
['Un proceso presenta esperas largas entre aprobación y despacho. ¿Qué conviene hacer primero?','Mapear el flujo e identificar el cuello de botella','Automatizarlo sin revisarlo','Contratar publicidad','Eliminar controles al azar','Comprender el flujo permite intervenir la causa de la demora.'],
['Un proceso empresarial se caracteriza por:','Transformar entradas en resultados que generan valor','Ser una lista aislada de cargos','Ser únicamente software','No tener responsables','Un proceso conecta actividades, entradas, salidas y propósito.'],
['La empresa documenta su operación actual. ¿Qué modelo está construyendo?','AS-IS','TO-BE','Modelo de ingresos','Mapa de marca','AS-IS describe la situación existente.'],
['Después del diagnóstico se diseña un proceso mejorado. ¿Qué representa?','TO-BE','AS-IS','Inventario físico','Estado financiero','TO-BE muestra el estado futuro deseado.'],
['En BPMN, ¿qué elemento representa una decisión que separa caminos?','Compuerta','Evento de inicio','Objeto de datos','Anotación','Las compuertas controlan divergencias y convergencias del flujo.'],
['En BPMN, una tarea se representa habitualmente mediante:','Rectángulo con esquinas redondeadas','Rombo','Círculo de inicio','Línea de mensaje','La tarea representa una actividad concreta dentro del proceso.'],
['Dos departamentos desconocen quién aprueba pedidos. ¿Qué ayuda a aclararlo?','Asignar responsabilidades en carriles del proceso','Aumentar colores del diagrama','Eliminar nombres de roles','Ocultar el procedimiento','Los carriles permiten asociar actividades con participantes o roles.'],
['¿Qué plantea BPM más allá de dibujar procesos?','Medir y mejorar continuamente su desempeño','Archivar diagramas sin uso','Sustituir toda gestión por software','Evitar la revisión del proceso','BPM integra diseño, ejecución, seguimiento y mejora.'],
['Hay presupuesto limitado y muchas iniciativas. ¿Cómo priorizar?','Comparar impacto, esfuerzo y viabilidad','Elegir la más vistosa','Comprar la más costosa','Seleccionar al azar','La priorización debe relacionar beneficios, recursos y posibilidades reales.'],
['¿Cuál es una oportunidad de mejora bien formulada?','Reducir errores de pedidos con validación y seguimiento','Usar IA porque está de moda','Comprar tecnología sin objetivo','Tener todas las aplicaciones','La oportunidad debe conectar un problema concreto con un cambio verificable.'],
['Sensores reportan temperatura de hornos en tiempo real. ¿Qué tecnología predomina?','Internet de las cosas','Editor de texto','Red social','Firma gráfica','IoT conecta dispositivos físicos que capturan y transmiten datos.'],
['Una empresa necesita ampliar recursos informáticos según la demanda. ¿Qué alternativa encaja?','Computación en la nube','Archivos impresos','Capacidad fija sin expansión','Copias manuales en papel','La nube permite aprovisionar recursos de forma flexible.'],
['Se analizan grandes volúmenes de datos variados a alta velocidad. ¿Qué concepto se relaciona?','Big Data','BPMN exclusivamente','Diseño de logotipo','Archivo físico','Big Data se asocia con volumen, variedad y velocidad, entre otras características.'],
['Un modelo aprende de ventas históricas para estimar demanda. ¿Qué capacidad utiliza?','Aprendizaje automático','Digitalización de papel','BPMN manual','Edición de imágenes','El aprendizaje automático identifica patrones en datos.'],
['Antes de automatizar una tarea repetitiva, conviene:','Simplificarla y definir reglas y excepciones','Mantener errores para acelerar','Eliminar toda supervisión','Evitar medir resultados','Automatizar un proceso defectuoso puede multiplicar sus problemas.'],
['Dos sistemas registran el mismo pedido con valores distintos. ¿Qué falta principalmente?','Integración y reglas de calidad de datos','Más formularios duplicados','Cambiar el logo','Más publicaciones','La integración y las reglas comunes reducen inconsistencias.'],
['¿Qué indicador permite evaluar una mejora en despacho?','Tiempo promedio desde pedido hasta entrega','Número de fondos de pantalla','Color de uniformes','Cantidad de reuniones sin resultados','El indicador debe medir directamente el desempeño que se busca mejorar.'],
['¿Qué hace comparable una medición posterior al cambio?','Tener línea base y criterio de medición consistente','Cambiar la definición cada semana','Ignorar el dato anterior','Medir solo casos exitosos','La línea base permite evaluar variaciones con criterios equivalentes.'],
['Un equipo introduce un cambio pequeño con resultados rápidos. ¿Qué busca?','Una victoria temprana que valide y genere confianza','Evitar toda evaluación','Reemplazar la estrategia completa','Eliminar el aprendizaje','Las victorias tempranas pueden demostrar valor y facilitar la adopción.'],
['En la fase pasado del proyecto, ¿qué evidencia es más pertinente?','Diagnóstico del estado inicial con fuentes','Beneficios futuros inventados','Una solución sin problema','Un resultado sin fecha','El pasado debe documentar cómo era la organización y qué necesidades existían.']
],
[
['Un tablero muestra ventas históricas por región. ¿Qué tipo de analítica predomina?','Descriptiva','Prescriptiva','Generativa','Causal experimental','La analítica descriptiva resume qué ocurrió.'],
['El equipo investiga por qué disminuyeron las ventas. ¿Qué analítica aplica?','Diagnóstica','Solo descriptiva','Generación de texto','Diseño gráfico','La analítica diagnóstica busca explicar causas o factores asociados.'],
['Se estima la demanda del próximo mes. ¿Qué analítica se utiliza?','Predictiva','Descriptiva histórica','Transcripción','Archivo','La analítica predictiva estima resultados futuros a partir de datos.'],
['Un sistema recomienda cómo distribuir inventario con restricciones. ¿Qué analítica es?','Prescriptiva','Descriptiva','Digitalización','Catalogación','La analítica prescriptiva propone acciones para alcanzar objetivos.'],
['Una base contiene clientes duplicados. ¿Qué debe hacerse antes de analizarla?','Depurar e identificar registros únicos','Contar duplicados como nuevos clientes','Ocultar el problema','Agregar datos ficticios','Los duplicados pueden distorsionar conclusiones.'],
['Un campo de fecha mezcla formatos incompatibles. ¿Qué operación ayuda?','Estandarización de datos','Cambiar el título del tablero','Eliminar toda la base','Duplicar columnas sin criterio','Estandarizar permite interpretar los valores de forma coherente.'],
['Un tablero ejecutivo tiene demasiados gráficos. ¿Qué ajuste es más útil?','Conservar indicadores vinculados con decisiones','Agregar animaciones','Reducir etiquetas hasta ocultarlas','Mostrar todo sin jerarquía','Un dashboard debe facilitar decisiones con información relevante.'],
['Se comparan ventas entre categorías. ¿Qué gráfico suele ser claro?','Barras','Decoración tridimensional','Foto de catálogo','Diagrama sin escala','Las barras facilitan comparar magnitudes entre categorías.'],
['Se quiere observar la evolución mensual de pedidos. ¿Qué gráfico conviene?','Líneas en orden temporal','Barras sin fechas','Nube de palabras','Fotografía','Las líneas permiten apreciar tendencias a lo largo del tiempo.'],
['Ventas y publicidad crecen juntas. ¿Qué conclusión es prudente?','Existe asociación, pero falta demostrar causalidad','La publicidad causó todo el crecimiento','No hay relación posible','La correlación prueba la causa','Otros factores pueden explicar una asociación observada.'],
['Una IA redacta información falsa con tono convincente. ¿Qué debe hacer el equipo?','Verificar con fuentes y revisar antes de usar','Publicar sin leer','Asumir que siempre acierta','Eliminar las fuentes','Los modelos generativos pueden producir afirmaciones incorrectas.'],
['Para obtener una respuesta útil de IA generativa, el prompt debe incluir:','Contexto, tarea y criterios de salida','Solo una palabra ambigua','Datos confidenciales innecesarios','Órdenes contradictorias','Instrucciones claras permiten orientar la respuesta.'],
['Una persona quiere pegar datos privados de clientes en una IA pública. ¿Qué conviene?','Usar información anonimizada y herramientas autorizadas','Publicar identificaciones completas','Compartir contraseñas','Ignorar permisos','Debe minimizarse la exposición de datos personales.'],
['Un modelo aprende con ejemplos etiquetados de pedidos fraudulentos. ¿Qué aprendizaje es?','Supervisado','No supervisado','Sin datos','Solo reglas manuales','Las etiquetas proporcionan el resultado esperado durante el entrenamiento.'],
['Se agrupan clientes por similitud sin categorías previas. ¿Qué aprendizaje es?','No supervisado','Supervisado con etiquetas','Transcripción manual','BPMN','El agrupamiento descubre estructuras sin etiquetas objetivo.'],
['Un modelo rinde muy bien al entrenar y mal con casos nuevos. ¿Qué problema sugiere?','Sobreajuste','Generalización perfecta','Datos siempre correctos','Automatización total','El sobreajuste limita el rendimiento fuera de los datos de entrenamiento.'],
['¿Por qué separar entrenamiento y prueba?','Evaluar el desempeño con datos no usados para aprender','Duplicar resultados','Garantizar acierto total','Evitar validar','La separación ayuda a estimar la generalización.'],
['Un robot copia datos de un formulario a un sistema con reglas fijas. ¿Qué solución encaja?','RPA','IoT de hornos','Diseño de marca','Analítica causal','RPA automatiza acciones repetitivas sobre interfaces digitales.'],
['Un proceso cambia cada día y no tiene reglas claras. ¿Qué conviene antes de usar RPA?','Estabilizar el proceso y definir excepciones','Automatizar todos los clics de inmediato','Eliminar responsables','Ocultar errores','La automatización requiere comprender reglas, variaciones y excepciones.'],
['Un flujo envía una notificación cuando llega un formulario. ¿Qué inicia la ejecución?','Un disparador o trigger','El color del formulario','Una imagen','El pie de página','El disparador es el evento que activa el flujo.'],
['Un flujo pierde la conexión con un servicio. ¿Qué debe prever?','Reintentos controlados, registro y alerta de error','Repetición infinita sin control','Borrar todos los datos','Ignorar fallos','La gestión de errores permite recuperar y supervisar la automatización.'],
['n8n y Power Automate conectan servicios mediante:','Flujos con acciones, condiciones y conectores','Solo imágenes estáticas','Exclusivamente papel','Cambios de uniformes','Los conectores y acciones permiten coordinar tareas entre servicios.'],
['Una empresa alinea procesos, aplicaciones, datos y tecnología. ¿Qué disciplina aplica?','Arquitectura empresarial','Publicidad exterior','Edición fotográfica','Diseño ornamental','La arquitectura empresarial relaciona el negocio con sus sistemas y capacidades.'],
['Inventario y ventas usan sistemas aislados. ¿Qué mejora aporta integrarlos?','Visibilidad consistente de existencias y pedidos','Más captura duplicada','Menos trazabilidad','Datos sin propietario','La integración facilita compartir información y coordinar procesos.'],
['Un sistema centraliza relaciones e interacciones con clientes. ¿Cuál es?','CRM','BPMN','Sensor IoT','Editor de audio','CRM apoya la gestión de relaciones con clientes.'],
['Un sistema integra finanzas, compras e inventario. ¿Cuál es?','ERP','Red social','Hoja sin conexión como única opción','Editor de imágenes','ERP integra procesos y recursos empresariales.'],
['Para mejorar la experiencia de compra, se dibujan etapas y emociones del cliente. ¿Qué herramienta se usa?','Customer Journey Map','Balance contable','Organigrama únicamente','Mapa de servidores','El mapa del viaje representa la experiencia a través de puntos de contacto.'],
['Los clientes abandonan el pago por un formulario extenso. ¿Qué debe priorizar el prototipo?','Simplificar el pago y probarlo con usuarios','Agregar campos sin necesidad','Ocultar el precio','Cambiar solo el logotipo','El prototipo debe abordar la fricción observada.'],
['¿Qué valida mejor un prototipo temprano?','Observar usuarios realizando tareas y recoger evidencia','Preguntar solo al diseñador','Medir únicamente colores','Considerarlo producto final','Las pruebas con tareas permiten detectar problemas de uso.'],
['En la fase presente de Cerámica Italia, ¿qué evidencia aporta más?','Prototipo funcional con pruebas y hallazgos','Promesas sin demostración','Capturas ajenas sin contexto','Una lista de compras','El presente debe mostrar implementación y aprendizaje verificable.']
],
[
['Antes de proponer soluciones, un equipo entrevista a usuarios. ¿Qué fase de Design Thinking desarrolla?','Empatizar','Escalar','Vender','Automatizar','Empatizar busca comprender necesidades y contexto de las personas.'],
['El equipo sintetiza entrevistas en un problema concreto. ¿Qué fase realiza?','Definir','Desplegar','Facturar','Cerrar','Definir enfoca el reto a partir de lo aprendido.'],
['Se generan varias alternativas antes de seleccionar una. ¿Qué fase corresponde?','Idear','Auditar','Archivar','Producir masivamente','Idear amplía las posibilidades de solución.'],
['¿Cuál es el propósito de un prototipo de baja fidelidad?','Probar hipótesis con poco costo y rapidez','Garantizar ventas definitivas','Evitar contacto con usuarios','Reemplazar toda evaluación','Un prototipo temprano permite aprender antes de invertir más.'],
['Una prueba revela que la solución no resuelve el problema. ¿Qué procede?','Iterar a partir de la evidencia','Ignorar usuarios','Ocultar resultados','Publicar como éxito','La iteración incorpora hallazgos para mejorar o replantear la solución.'],
['Un correo pide una contraseña con urgencia y un enlace extraño. ¿Qué riesgo sugiere?','Phishing','Respaldo verificado','Mantenimiento autorizado garantizado','Cifrado','El phishing intenta engañar para obtener datos o acceso.'],
['¿Qué medida refuerza el acceso a cuentas?','Autenticación multifactor','Contraseña compartida','Desactivar controles','Publicar claves','El segundo factor añade una barrera de verificación.'],
['Un empleado solo necesita consultar inventario. ¿Qué acceso debería tener?','Los permisos mínimos necesarios','Acceso de administrador a todo','Las claves de todos','Permiso para borrar respaldos','El mínimo privilegio reduce la exposición ante errores o incidentes.'],
['¿Qué demuestra que un respaldo es útil?','Una restauración de prueba exitosa','Que exista un archivo sin abrir','Que tenga un nombre bonito','Que esté en el mismo disco únicamente','La restauración verifica que se pueda recuperar la información.'],
['Un ataque cifra los archivos y exige dinero. ¿Qué amenaza es?','Ransomware','Business Intelligence','Prototipado','Interoperabilidad','El ransomware bloquea o cifra datos para exigir un rescate.'],
['Para priorizar riesgos se evalúa principalmente:','Probabilidad e impacto','Color y tamaño de un reporte','Número de reuniones','Opinión sin evidencia','La combinación orienta el nivel de atención del riesgo.'],
['Un riesgo alto de pérdida de datos exige:','Responsable, controles y plan de respuesta','Ocultarlo hasta que ocurra','Eliminar los registros de riesgo','Depender de una persona sin respaldo','Gestionar un riesgo implica asignar acciones y seguimiento.'],
['El personal teme que una nueva herramienta cambie su trabajo. ¿Qué facilita la adopción?','Comunicación, participación y capacitación','Imposición sin explicaciones','Castigar toda pregunta','Retirar soporte','La gestión del cambio debe abordar necesidades y preocupaciones.'],
['¿Qué señal refleja una cultura favorable a la innovación?','Aprender de pruebas y compartir hallazgos','Ocultar errores sistemáticamente','Evitar propuestas nuevas','Premiar solo la obediencia ciega','La innovación requiere experimentar y aprender de manera responsable.'],
['¿Qué debe hacer un patrocinador del cambio?','Respaldar objetivos y resolver barreras de adopción','Limitarse a anunciar software','Evitar toda responsabilidad','Ocultar recursos','El patrocinio sostiene la iniciativa y facilita su ejecución.'],
['Un tablero de gobierno digital debe aclarar:','Responsables, decisiones y seguimiento','Solo colores institucionales','Únicamente marcas de equipos','Contraseñas públicas','El gobierno define cómo se toman y supervisan decisiones.'],
['Dos áreas discuten quién corrige un dato de cliente. ¿Qué falta?','Propiedad y reglas de gobierno del dato','Más copias sin dueño','Un logotipo nuevo','Eliminar la trazabilidad','Definir responsables permite gestionar calidad y uso de los datos.'],
['Una IA rechaza sistemáticamente candidatos de un grupo. ¿Qué se debe revisar?','Sesgos en datos, modelo y resultados','Solo velocidad del sistema','Colores de interfaz','Cantidad de licencias','La equidad requiere examinar impactos y posibles sesgos.'],
['Una decisión automatizada afecta a una persona. ¿Qué práctica favorece la transparencia?','Explicar criterios, límites y vías de revisión','Ocultar toda información','Afirmar que la IA nunca falla','Negar revisión humana','La transparencia facilita comprender y cuestionar decisiones relevantes.'],
['¿Qué implica supervisión humana significativa en IA?','Personas capaces de revisar y corregir decisiones','Firmar sin leer resultados','Eliminar responsables','Aceptar cualquier salida','La supervisión debe permitir intervenir efectivamente.'],
['Se recopilan datos que no son necesarios para el servicio. ¿Qué principio conviene aplicar?','Minimización de datos','Acumulación ilimitada','Publicación indiscriminada','Duplicación automática','Se deben tratar los datos pertinentes para el propósito definido.'],
['¿Qué iniciativa aporta a la sostenibilidad digital?','Extender vida útil de equipos y gestionar residuos electrónicos','Reemplazar todo cada mes','Ignorar consumo energético','Desechar dispositivos sin control','La sostenibilidad considera recursos, energía y ciclo de vida.'],
['Para evaluar el impacto energético de una solución, conviene:','Medir consumo antes y después con alcance comparable','Suponer que toda digitalización ahorra energía','Contar solo pantallas','Excluir infraestructura sin explicarlo','La evaluación requiere medición y límites claros.'],
['¿Cuál es un KPI útil para reducir devoluciones?','Porcentaje de pedidos devueltos por periodo','Número de diapositivas','Cantidad de reuniones','Tamaño del logo','El KPI debe vincularse al resultado buscado.'],
['¿Cómo se calcula la tasa de cumplimiento de entregas a tiempo?','Entregas puntuales / entregas totales × 100','Pedidos totales × precio','Retrasos + ventas','Empleados / clientes','La tasa expresa la proporción de entregas que cumplen el plazo.'],
['Una meta dice mejorar el servicio. ¿Cómo volverla medible?','Definir indicador, línea base, valor objetivo y plazo','Agregar un adjetivo','Quitar la fecha','Evitar responsables','Una meta verificable necesita criterios concretos de logro.'],
['¿Qué debe incluir un roadmap de transformación?','Iniciativas, hitos, responsables, dependencias y plazos','Solo una fecha final','Una lista sin prioridades','Beneficios sin actividades','El roadmap convierte la visión en una secuencia de ejecución.'],
['Una iniciativa depende de limpiar datos primero. ¿Cómo reflejarlo en el roadmap?','Programar la limpieza como dependencia previa','Ejecutar todo sin orden','Ocultar la dependencia','Eliminar la calidad de datos','Las dependencias determinan el orden viable de implementación.'],
['En la fase futuro del proyecto, ¿qué entrega es más sólida?','Roadmap con metas, riesgos y recursos estimados','Resultados inventados como si ya ocurrieran','Una promesa sin fechas','Solo una portada','El futuro debe distinguir proyecciones de resultados comprobados.'],
['Para validar el proyecto integrador de Cerámica Italia, conviene presentar:','Problema, diagnóstico, prototipo, evidencia y plan de mejora','Solo diapositivas decorativas','Beneficios sin medición','Funciones ajenas al problema','La validación debe conectar la solución con el problema y sus evidencias.']
]];
const additionalQuestions = [
 [
  [
   "¿Qué diferencia una estrategia digital de un catálogo de tecnologías?",
   "Define resultados de negocio y cómo alcanzarlos",
   "Clasifica herramientas por precio",
   "Enumera los equipos instalados",
   "Proyecta el costo anual de licencias",
   "Respuesta esperada: Define resultados de negocio y cómo alcanzarlos."
  ],
  [
   "Una cadena abre una tienda en línea y mantiene inventarios desconectados. ¿Qué obstáculo debe resolver?",
   "La integración del proceso de inventario entre canales",
   "La extensión del dominio web",
   "La cantidad de publicaciones semanales",
   "La resolución de las fotos de productos",
   "Respuesta esperada: La integración del proceso de inventario entre canales."
  ],
  [
   "¿Qué evidencia muestra una mejora real en el despacho?",
   "Menor tiempo de entrega medido frente a una línea base comparable",
   "Más usuarios registrados en el sistema de pedidos",
   "Más pantallas en el tablero logístico",
   "Mayor cantidad de reuniones de seguimiento",
   "Respuesta esperada: Menor tiempo de entrega medido frente a una línea base comparable."
  ],
  [
   "¿En qué bloque del Canvas se registra el contrato con un operador logístico?",
   "Socios clave",
   "Canales",
   "Segmentos de clientes",
   "Fuentes de ingresos",
   "Respuesta esperada: Socios clave."
  ],
  [
   "En el Canvas, ¿dónde se registra el gasto recurrente de almacenamiento en nube?",
   "Estructura de costos",
   "Recursos clave",
   "Relaciones con clientes",
   "Canales",
   "Respuesta esperada: Estructura de costos."
  ],
  [
   "Un portal ofrece asistencia técnica personalizada después de la venta. ¿Qué bloque describe esa interacción?",
   "Relaciones con clientes",
   "Socios clave",
   "Fuentes de ingresos",
   "Estructura de costos",
   "Respuesta esperada: Relaciones con clientes."
  ],
  [
   "¿Qué bloque describe la fabricación y el control de calidad de una cerámica?",
   "Actividades clave",
   "Segmentos de clientes",
   "Canales",
   "Relaciones con clientes",
   "Respuesta esperada: Actividades clave."
  ],
  [
   "¿Qué debe incluir el diagnóstico antes de asignar un nivel de madurez digital?",
   "Evidencias de varias áreas y criterios de valoración comunes",
   "El presupuesto propuesto por un proveedor",
   "El número de equipos por departamento",
   "Una encuesta exclusiva a la gerencia",
   "Respuesta esperada: Evidencias de varias áreas y criterios de valoración comunes."
  ],
  [
   "La producción depende de un archivo que solo conoce una persona. ¿Qué brecha revela?",
   "Falta de documentación y transferencia de conocimiento",
   "Falta de capacidad de red",
   "Ausencia de canales comerciales",
   "Exceso de integración tecnológica",
   "Respuesta esperada: Falta de documentación y transferencia de conocimiento."
  ],
  [
   "¿Cuál es un ejemplo de capacidad digital organizacional?",
   "Mantener y mejorar un proceso digital con personas, herramientas y reglas claras",
   "Tener una aplicación adquirida sin uso establecido",
   "Conservar un catálogo de proveedores",
   "Almacenar equipos de reemplazo",
   "Respuesta esperada: Mantener y mejorar un proceso digital con personas, herramientas y reglas claras."
  ],
  [
   "Un vendedor detecta que el cliente repite sus datos en cada canal. ¿Qué objetivo responde a ese problema?",
   "Reutilizar datos autorizados entre canales para reducir capturas repetidas",
   "Agregar otro formulario de contacto",
   "Aumentar el espacio de almacenamiento de cada canal",
   "Cambiar los colores de los formularios",
   "Respuesta esperada: Reutilizar datos autorizados entre canales para reducir capturas repetidas."
  ],
  [
   "¿Qué distingue una métrica de actividad de un indicador de resultado?",
   "La actividad mide lo realizado y el resultado mide el efecto logrado",
   "Ambos miden siempre lo mismo",
   "El resultado solo se mide en dinero",
   "La actividad solo se mide al final",
   "Respuesta esperada: La actividad mide lo realizado y el resultado mide el efecto logrado."
  ],
  [
   "¿Qué pregunta ayuda a delimitar un proceso de devoluciones?",
   "¿Qué evento lo inicia y cuándo termina?",
   "¿Qué marca usa el equipo administrativo?",
   "¿Cuántos colores tendrá el portal?",
   "¿Qué proveedor ofrece más funciones?",
   "Respuesta esperada: ¿Qué evento lo inicia y cuándo termina?."
  ],
  [
   "¿Para qué conviene documentar excepciones en un proceso?",
   "Para definir cómo actuar cuando no se cumplen las condiciones habituales",
   "Para eliminar la necesidad de medir el proceso",
   "Para evitar responsabilidades sobre el proceso",
   "Para ocultar los casos no resueltos",
   "Respuesta esperada: Para definir cómo actuar cuando no se cumplen las condiciones habituales."
  ],
  [
   "¿Qué indica un evento final en BPMN?",
   "El punto en que concluye una ruta del proceso",
   "La asignación de un responsable",
   "El almacenamiento de un documento",
   "El intercambio entre participantes",
   "Respuesta esperada: El punto en que concluye una ruta del proceso."
  ],
  [
   "¿Qué representa un pool en BPMN?",
   "Un participante en el proceso",
   "Una condición de salida",
   "Una espera de duración fija",
   "Una tarea automatizada",
   "Respuesta esperada: Un participante en el proceso."
  ],
  [
   "¿Qué elemento representa comunicación entre participantes BPMN separados?",
   "Flujo de mensaje",
   "Flujo de secuencia",
   "Compuerta exclusiva",
   "Evento de fin",
   "Respuesta esperada: Flujo de mensaje."
  ],
  [
   "En BPMN, se debe ejecutar inventario y facturación en paralelo. ¿Qué compuerta es apropiada?",
   "Paralela",
   "Exclusiva",
   "Basada en eventos",
   "De fin",
   "Respuesta esperada: Paralela."
  ],
  [
   "¿Qué modela una compuerta exclusiva cuando un pedido es aprobado o rechazado?",
   "La selección de una sola ruta según la condición",
   "La ejecución simultánea de ambas rutas",
   "La espera obligatoria de dos mensajes",
   "El inicio de un proceso ajeno",
   "Respuesta esperada: La selección de una sola ruta según la condición."
  ],
  [
   "Un diagrama muestra que una orden espera cinco días para una firma. ¿Qué conviene medir?",
   "Tiempo de espera antes y después de la aprobación",
   "Longitud de los nombres de las tareas",
   "Número de íconos por carril",
   "Antigüedad del formato de la orden",
   "Respuesta esperada: Tiempo de espera antes y después de la aprobación."
  ],
  [
   "¿Qué indicador ayuda a detectar reprocesos de facturación?",
   "Porcentaje de facturas corregidas después de su emisión",
   "Total de correos recibidos por toda la empresa",
   "Cantidad de versiones del portal",
   "Tamaño de la base de datos",
   "Respuesta esperada: Porcentaje de facturas corregidas después de su emisión."
  ],
  [
   "¿Qué objetivo es medible para una iniciativa de inventario?",
   "Reducir diferencias de inventario del 8 % al 3 % en seis meses",
   "Modernizar el almacén cuanto antes",
   "Aumentar la transformación organizacional",
   "Incorporar tecnología avanzada",
   "Respuesta esperada: Reducir diferencias de inventario del 8 % al 3 % en seis meses."
  ],
  [
   "¿Qué comparación ayuda a priorizar dos iniciativas con presupuesto limitado?",
   "Valor esperado, costo, riesgo y factibilidad",
   "Popularidad del proveedor y color de su marca",
   "Número de diapositivas de cada propuesta",
   "Cantidad de términos técnicos del documento",
   "Respuesta esperada: Valor esperado, costo, riesgo y factibilidad."
  ],
  [
   "¿Cuándo conviene hacer un piloto antes de escalar?",
   "Cuando se necesita comprobar el efecto de la solución en un alcance limitado",
   "Cuando ya se ha validado todo el despliegue",
   "Cuando no se han definido usuarios ni problema",
   "Cuando se busca eliminar el seguimiento",
   "Respuesta esperada: Cuando se necesita comprobar el efecto de la solución en un alcance limitado."
  ],
  [
   "Una fábrica necesita vigilar vibraciones de máquinas. ¿Qué tecnología obtiene las lecturas?",
   "Sensores conectados de IoT",
   "Gestión de contenidos web",
   "Editor de texto colaborativo",
   "Autenticación multifactor",
   "Respuesta esperada: Sensores conectados de IoT."
  ],
  [
   "¿Qué ventaja práctica ofrece la nube ante demanda estacional?",
   "Ajustar capacidad según la carga",
   "Eliminar la necesidad de controlar costos",
   "Evitar copias de seguridad por definición",
   "Garantizar acceso sin conexión",
   "Respuesta esperada: Ajustar capacidad según la carga."
  ],
  [
   "¿Qué riesgo conviene estudiar antes de migrar datos sensibles a la nube?",
   "Acceso indebido y configuración de permisos",
   "El color de la consola de administración",
   "El formato de la presentación del proyecto",
   "La cantidad de iconos del proveedor",
   "Respuesta esperada: Acceso indebido y configuración de permisos."
  ],
  [
   "¿Qué caso justifica considerar tecnologías de Big Data?",
   "Analizar flujos de sensores de gran volumen y frecuencia",
   "Registrar manualmente cinco pedidos mensuales",
   "Archivar una hoja con diez proveedores",
   "Redactar las actas de una reunión",
   "Respuesta esperada: Analizar flujos de sensores de gran volumen y frecuencia."
  ],
  [
   "¿Cuál tarea es buena candidata para automatización basada en reglas?",
   "Verificar si una factura cumple campos y condiciones definidos",
   "Negociar una alianza estratégica compleja",
   "Definir el propósito de la empresa",
   "Mediar un conflicto interpersonal",
   "Respuesta esperada: Verificar si una factura cumple campos y condiciones definidos."
  ],
  [
   "¿Cuál iniciativa usa IA como apoyo a una decisión operativa?",
   "Clasificar reclamos según su contenido para derivarlos a un equipo",
   "Convertir archivos de texto a PDF",
   "Mostrar la fecha actual en el portal",
   "Copiar un archivo entre carpetas",
   "Respuesta esperada: Clasificar reclamos según su contenido para derivarlos a un equipo."
  ],
  [
   "Una solución digital ahorra tiempo pero aumenta errores. ¿Qué acción permite evaluar su impacto?",
   "Revisar juntos tiempo, calidad y causas de error",
   "Ignorar errores y reportar solo rapidez",
   "Ampliar el despliegue sin diagnóstico",
   "Sustituir las mediciones por opiniones",
   "Respuesta esperada: Revisar juntos tiempo, calidad y causas de error."
  ],
  [
   "Un pedido cambia de estado en distintos sistemas. ¿Qué ayuda a mantener coherencia?",
   "Definir un identificador común y reglas de actualización",
   "Cambiar el formato visual de cada pantalla",
   "Crear más copias manuales del pedido",
   "Permitir códigos distintos sin correspondencia",
   "Respuesta esperada: Definir un identificador común y reglas de actualización."
  ],
  [
   "¿Qué debe incluir una línea base de entregas?",
   "Indicador, periodo medido, población y método de cálculo",
   "Nombre del proveedor y logotipo",
   "Predicciones sin observaciones",
   "Metas futuras sin datos previos",
   "Respuesta esperada: Indicador, periodo medido, población y método de cálculo."
  ],
  [
   "¿Qué actor debe participar al diseñar un flujo de devoluciones?",
   "Quienes ejecutan el flujo y quienes reciben su resultado",
   "Solo quienes eligen la herramienta",
   "Solo el equipo que diseña la marca",
   "Solo quienes aprueban el presupuesto",
   "Respuesta esperada: Quienes ejecutan el flujo y quienes reciben su resultado."
  ],
  [
   "¿Qué señal sugiere que la solución responde a un problema del negocio?",
   "La mejora medida coincide con una necesidad priorizada",
   "La solución usa el mayor número de integraciones",
   "El equipo hizo una demostración extensa",
   "El proveedor tiene mayor visibilidad",
   "Respuesta esperada: La mejora medida coincide con una necesidad priorizada."
  ],
  [
   "¿Qué función cumple un mapa de procesos en el diagnóstico?",
   "Mostrar relaciones entre procesos y puntos de coordinación",
   "Asignar automáticamente todas las tareas",
   "Cambiar el modelo de ingresos sin análisis",
   "Sustituir la observación del trabajo",
   "Respuesta esperada: Mostrar relaciones entre procesos y puntos de coordinación."
  ],
  [
   "¿Qué documentación facilita repetir un proceso manual antes de automatizarlo?",
   "Entradas, pasos, responsables, decisiones y excepciones",
   "Solo una captura de la pantalla final",
   "Un listado de herramientas sin uso definido",
   "Una colección de comentarios sin orden",
   "Respuesta esperada: Entradas, pasos, responsables, decisiones y excepciones."
  ],
  [
   "¿Cómo se distingue un objetivo de una solución en una propuesta?",
   "El objetivo describe el resultado y la solución propone cómo lograrlo",
   "Ambos son el nombre del software",
   "El objetivo es siempre una herramienta",
   "La solución es el indicador de referencia",
   "Respuesta esperada: El objetivo describe el resultado y la solución propone cómo lograrlo."
  ],
  [
   "¿Por qué se revisa la propuesta de valor después del diagnóstico?",
   "Para comprobar que la iniciativa resuelve una necesidad del cliente",
   "Para fijar el color de todos los sistemas",
   "Para evitar discutir los costos",
   "Para prescindir del análisis del proceso",
   "Respuesta esperada: Para comprobar que la iniciativa resuelve una necesidad del cliente."
  ],
  [
   "¿Qué evidencia fortalece la fase Pasado del caso Cerámica Italia?",
   "Datos de operación y un mapa del proceso actual",
   "Capturas del diseño futuro sin contexto",
   "Proyecciones registradas como logros",
   "Un listado de aplicaciones de moda",
   "Respuesta esperada: Datos de operación y un mapa del proceso actual."
  ]
 ],
 [
  [
   "Un archivo de ventas contiene filas repetidas. ¿Qué se debe definir antes de borrarlas?",
   "La clave que distingue transacciones válidas de duplicados",
   "El nuevo tipo de gráfico",
   "El color de las columnas",
   "El tamaño de la pantalla",
   "Respuesta esperada: La clave que distingue transacciones válidas de duplicados."
  ],
  [
   "¿Qué dimensión de calidad se afecta si faltan las fechas de venta?",
   "Completitud",
   "Puntualidad de los envíos",
   "Disponibilidad del servidor",
   "Seguridad física",
   "Respuesta esperada: Completitud."
  ],
  [
   "¿Qué práctica conserva el significado de los campos de una base de clientes?",
   "Mantener un diccionario de datos con definiciones y formatos",
   "Cambiar los nombres de los campos en cada informe",
   "Guardar únicamente los gráficos finales",
   "Eliminar la documentación de los campos",
   "Respuesta esperada: Mantener un diccionario de datos con definiciones y formatos."
  ],
  [
   "Para comparar devoluciones de sucursales de distinto tamaño, ¿qué conviene mostrar?",
   "Devoluciones como proporción de ventas por sucursal",
   "Solo el total de devoluciones de cada sede",
   "La cantidad de empleados por turno",
   "El promedio de todas las sucursales sin desglose",
   "Respuesta esperada: Devoluciones como proporción de ventas por sucursal."
  ],
  [
   "¿Qué gráfico conviene para observar ventas semanales durante un año?",
   "Gráfico de líneas",
   "Gráfico circular con 52 secciones",
   "Diagrama de jerarquía",
   "Mapa de ubicaciones",
   "Respuesta esperada: Gráfico de líneas."
  ],
  [
   "¿Qué debe indicar un tablero junto al valor de un KPI?",
   "Unidad, periodo y criterio de comparación",
   "Número de pantallas que lo muestran",
   "Marca del equipo donde se ejecuta",
   "Nombre del archivo de diseño",
   "Respuesta esperada: Unidad, periodo y criterio de comparación."
  ],
  [
   "¿Qué filtro ayuda a encontrar la causa de un pico de reclamos?",
   "Producto, canal y fecha del reclamo",
   "Color del fondo del tablero",
   "Idioma de la computadora",
   "Nombre del archivo exportado",
   "Respuesta esperada: Producto, canal y fecha del reclamo."
  ],
  [
   "¿Qué hace una etapa de transformación en un flujo ETL?",
   "Limpia y estandariza datos antes de cargarlos",
   "Cambia permisos del proveedor de Internet",
   "Envía notificaciones a los clientes finales",
   "Reemplaza el tablero con una presentación",
   "Respuesta esperada: Limpia y estandariza datos antes de cargarlos."
  ],
  [
   "¿Qué permite rastrear el linaje de un dato?",
   "Identificar de dónde viene y qué transformaciones recibió",
   "Conocer únicamente quién abrió el tablero",
   "Calcular ventas sin fuente definida",
   "Elegir el gráfico más llamativo",
   "Respuesta esperada: Identificar de dónde viene y qué transformaciones recibió."
  ],
  [
   "¿Qué acción reduce el riesgo de revelar datos al usar IA generativa?",
   "Anonimizar o excluir la información sensible antes de enviarla",
   "Pedir al modelo que olvide los datos al final",
   "Incluir los datos completos para mejorar el estilo",
   "Guardar el prompt en una carpeta compartida",
   "Respuesta esperada: Anonimizar o excluir la información sensible antes de enviarla."
  ],
  [
   "Una IA redacta un informe con cifras no incluidas en las fuentes. ¿Qué debe hacer el analista?",
   "Contrastar cada cifra con fuentes confiables",
   "Aceptar las cifras por la fluidez del texto",
   "Publicar el borrador y corregir después",
   "Usar la respuesta como dato de referencia",
   "Respuesta esperada: Contrastar cada cifra con fuentes confiables."
  ],
  [
   "¿Cuál prompt favorece una respuesta verificable?",
   "Solicitar el resumen solo con los datos aportados y señalar vacíos",
   "Pedir conclusiones sin citar los datos",
   "Pedir cifras precisas aunque no estén disponibles",
   "Eliminar el contexto para evitar sesgos",
   "Respuesta esperada: Solicitar el resumen solo con los datos aportados y señalar vacíos."
  ],
  [
   "¿Qué dato funciona como etiqueta al entrenar un modelo para predecir devoluciones?",
   "Si cada pedido histórico fue devuelto",
   "El nombre del modelo entrenado",
   "La ubicación del archivo de entrenamiento",
   "El color de la interfaz de devoluciones",
   "Respuesta esperada: Si cada pedido histórico fue devuelto."
  ],
  [
   "¿Qué técnica corresponde a segmentar clientes sin categorías predefinidas?",
   "Agrupamiento no supervisado",
   "Clasificación supervisada con etiquetas",
   "Conversión de PDF a texto",
   "Automatización de interfaz",
   "Respuesta esperada: Agrupamiento no supervisado."
  ],
  [
   "¿Cuál es una variable objetivo para predecir tiempos de entrega?",
   "Duración real desde el pedido hasta la entrega",
   "Nombre del vendedor",
   "Identificador interno del cliente",
   "Modelo del computador de la sucursal",
   "Respuesta esperada: Duración real desde el pedido hasta la entrega."
  ],
  [
   "¿Por qué se separan datos de entrenamiento y prueba?",
   "Para evaluar el modelo con casos que no usó para aprender",
   "Para duplicar todas las filas del conjunto",
   "Para eliminar la necesidad de métricas",
   "Para permitir usar resultados futuros durante entrenamiento",
   "Respuesta esperada: Para evaluar el modelo con casos que no usó para aprender."
  ],
  [
   "¿Qué se debe evitar al entrenar con pedidos que se repiten en varias tablas?",
   "Que el mismo pedido aparezca en entrenamiento y prueba",
   "Que los pedidos tengan identificador",
   "Que la prueba contenga ejemplos reales",
   "Que la tabla tenga fecha de captura",
   "Respuesta esperada: Que el mismo pedido aparezca en entrenamiento y prueba."
  ],
  [
   "Un modelo pierde precisión cuando cambian los hábitos de compra. ¿Qué conviene monitorear?",
   "Cambios en los datos y en el desempeño del modelo",
   "El tamaño de la imagen del tablero",
   "La cantidad de botones en la interfaz",
   "El nombre del sistema de archivos",
   "Respuesta esperada: Cambios en los datos y en el desempeño del modelo."
  ],
  [
   "¿Cuándo un flujo debe incluir revisión humana?",
   "Cuando el resultado puede causar un impacto relevante y hay incertidumbre",
   "Cuando la tarea solo mueve un archivo temporal",
   "Cuando el sistema genera la fecha de hoy",
   "Cuando la respuesta es siempre una copia literal",
   "Respuesta esperada: Cuando el resultado puede causar un impacto relevante y hay incertidumbre."
  ],
  [
   "¿En qué caso suele ser más estable una API que un robot que hace clic en pantallas?",
   "Cuando el sistema ofrece operaciones documentadas para intercambiar datos",
   "Cuando no existe un servicio de integración",
   "Cuando se necesita usar una pantalla sin acceso a datos",
   "Cuando la única salida está impresa en papel",
   "Respuesta esperada: Cuando el sistema ofrece operaciones documentadas para intercambiar datos."
  ],
  [
   "¿Qué debe ocurrir si un robot no reconoce el formato de una factura?",
   "Derivar el caso a revisión y registrar el motivo",
   "Completar campos con valores aleatorios",
   "Descartar la factura sin aviso",
   "Repetir el flujo indefinidamente",
   "Respuesta esperada: Derivar el caso a revisión y registrar el motivo."
  ],
  [
   "En un flujo n8n, ¿qué recibe un webhook?",
   "Una solicitud que inicia o alimenta el flujo",
   "Un informe impreso escaneado sin conexión",
   "Una contraseña guardada en texto visible",
   "Un conjunto de permisos del navegador",
   "Respuesta esperada: Una solicitud que inicia o alimenta el flujo."
  ],
  [
   "¿Por qué conviene guardar credenciales en el gestor del flujo?",
   "Para evitar exponerlas en el código o en registros de ejecución",
   "Para que todos los usuarios puedan leerlas",
   "Para reemplazar los permisos de los sistemas conectados",
   "Para omitir el control de acceso",
   "Respuesta esperada: Para evitar exponerlas en el código o en registros de ejecución."
  ],
  [
   "¿Qué evita procesar dos veces un pago si se repite un mensaje?",
   "Usar una clave única de operación y comprobar si ya fue procesada",
   "Cambiar el mensaje en cada reintento",
   "Aumentar el número de correos de confirmación",
   "Cerrar el registro antes de validar",
   "Respuesta esperada: Usar una clave única de operación y comprobar si ya fue procesada."
  ],
  [
   "¿Qué respuesta es apropiada si un servicio externo falla temporalmente?",
   "Reintentar con espera y detenerse tras un límite",
   "Reintentar de inmediato sin límite",
   "Informar éxito aunque no se ejecutó",
   "Eliminar los datos de entrada",
   "Respuesta esperada: Reintentar con espera y detenerse tras un límite."
  ],
  [
   "¿Qué elemento muestra qué aplicaciones soportan un proceso de ventas?",
   "Mapa de aplicaciones y su relación con procesos",
   "Calendario de vacaciones",
   "Paleta institucional",
   "Listado de dispositivos sin relación con procesos",
   "Respuesta esperada: Mapa de aplicaciones y su relación con procesos."
  ],
  [
   "¿Cuál es una responsabilidad de la arquitectura de datos?",
   "Definir fuentes, flujos y reglas de intercambio de información",
   "Escoger la música para un video",
   "Aprobar todas las campañas publicitarias",
   "Asignar turnos de atención",
   "Respuesta esperada: Definir fuentes, flujos y reglas de intercambio de información."
  ],
  [
   "¿Para qué sirve comparar arquitectura actual y objetivo?",
   "Para identificar brechas y acciones de transición",
   "Para eliminar el inventario de aplicaciones",
   "Para hacer idénticos todos los sistemas",
   "Para reemplazar la planificación de capacidades",
   "Respuesta esperada: Para identificar brechas y acciones de transición."
  ],
  [
   "¿Qué sistema suele integrar finanzas, inventario y compras?",
   "ERP",
   "CRM de atención",
   "Sistema de diseño de interfaces",
   "Servidor de correo",
   "Respuesta esperada: ERP."
  ],
  [
   "¿Qué sistema apoya el seguimiento comercial y el historial de clientes?",
   "CRM",
   "Sistema de control industrial",
   "Sistema de copias de seguridad",
   "Planificador de producción sin datos comerciales",
   "Respuesta esperada: CRM."
  ],
  [
   "¿Qué sistema facilita administrar turnos, nómina y datos de personal?",
   "Sistema de información de recursos humanos",
   "Catálogo de productos",
   "Sistema de gestión de transporte",
   "Gestor de inventarios",
   "Respuesta esperada: Sistema de información de recursos humanos."
  ],
  [
   "¿Qué integración conviene cuando varias aplicaciones necesitan el estado del mismo pedido?",
   "Un contrato de datos con identificador y estados comunes",
   "Exportar hojas sin columnas acordadas",
   "Enviar capturas por mensajería",
   "Mantener códigos sin correspondencia",
   "Respuesta esperada: Un contrato de datos con identificador y estados comunes."
  ],
  [
   "¿Qué muestra un mapa del recorrido del cliente?",
   "Pasos, canales, necesidades y dificultades en la experiencia",
   "Las dependencias internas de las bases de datos",
   "Solo la lista de precios de productos",
   "Únicamente los costos del software",
   "Respuesta esperada: Pasos, canales, necesidades y dificultades en la experiencia."
  ],
  [
   "¿Qué permite detectar una prueba de usabilidad?",
   "En qué pasos las personas se confunden o se detienen",
   "El costo total de licencias anuales",
   "El número de proveedores del mercado",
   "El cumplimiento tributario de la empresa",
   "Respuesta esperada: En qué pasos las personas se confunden o se detienen."
  ],
  [
   "¿Qué puede probarse con un prototipo de baja fidelidad?",
   "La comprensión de un flujo antes de desarrollar sus detalles",
   "La capacidad del servidor bajo máxima demanda",
   "La seguridad de una integración en producción",
   "La precisión de un modelo sin datos",
   "Respuesta esperada: La comprensión de un flujo antes de desarrollar sus detalles."
  ],
  [
   "¿Qué define una hipótesis útil para probar un nuevo formulario?",
   "Un cambio esperado y una medida para comprobarlo",
   "La descripción del color preferido del equipo",
   "La marca de la herramienta de diseño",
   "Una afirmación que no puede medirse",
   "Respuesta esperada: Un cambio esperado y una medida para comprobarlo."
  ],
  [
   "¿Qué muestra que un prototipo de devoluciones mejora la experiencia?",
   "Más usuarios completan la devolución con menos errores",
   "El prototipo tiene más pantallas",
   "La animación es más larga",
   "El diseño usa más colores corporativos",
   "Respuesta esperada: Más usuarios completan la devolución con menos errores."
  ],
  [
   "Si dos canales ofrecen respuestas distintas al mismo reclamo, ¿qué se debe integrar?",
   "Reglas de atención e historial del caso",
   "Fondos visuales de ambos canales",
   "Cantidad de botones del formulario",
   "Límites de tamaño de adjuntos",
   "Respuesta esperada: Reglas de atención e historial del caso."
  ],
  [
   "¿Cómo debe presentarse un tablero a un usuario con baja visión?",
   "Con contraste, etiquetas textuales y gráficos legibles",
   "Con significados indicados solo mediante color",
   "Con texto pequeño dentro de gráficos complejos",
   "Con datos representados únicamente por iconos",
   "Respuesta esperada: Con contraste, etiquetas textuales y gráficos legibles."
  ],
  [
   "¿Qué evidencia corresponde a la fase Presente de un prototipo académico?",
   "Resultados observados de pruebas y ajustes realizados",
   "Beneficios futuros tratados como mediciones",
   "Datos históricos sin relación con la solución",
   "Solo la promesa de construirlo",
   "Respuesta esperada: Resultados observados de pruebas y ajustes realizados."
  ]
 ],
 [
  [
   "¿Qué actividad corresponde a empatizar en Design Thinking?",
   "Observar y entrevistar a usuarios en su contexto",
   "Elegir una solución antes de escuchar a los usuarios",
   "Comprar una licencia sin identificar problemas",
   "Publicar el producto como primera actividad",
   "Respuesta esperada: Observar y entrevistar a usuarios en su contexto."
  ],
  [
   "¿Cuál enunciado formula mejor un problema de diseño?",
   "Los compradores necesitan conocer el estado del pedido para planear su recepción",
   "Construir una aplicación en un lenguaje específico",
   "Usar un botón verde en todas las páginas",
   "Instalar una herramienta que el equipo ya conoce",
   "Respuesta esperada: Los compradores necesitan conocer el estado del pedido para planear su recepción."
  ],
  [
   "¿Qué práctica conviene durante la ideación?",
   "Generar opciones antes de compararlas con criterios",
   "Descartar alternativas sin examinarlas",
   "Elegir la primera idea como decisión final",
   "Evaluar únicamente el costo del diseño visual",
   "Respuesta esperada: Generar opciones antes de compararlas con criterios."
  ],
  [
   "¿Qué hacer si varios usuarios no entienden el mismo paso del prototipo?",
   "Ajustar el flujo y volver a probarlo",
   "Modificar los resultados para que se vean mejores",
   "Ignorar las observaciones repetidas",
   "Pasar a producción sin corregirlo",
   "Respuesta esperada: Ajustar el flujo y volver a probarlo."
  ],
  [
   "¿Qué caracteriza un experimento de innovación útil?",
   "Tiene hipótesis, evidencia esperada y un criterio de decisión",
   "Solo contiene opiniones de quienes lo crearon",
   "Confirma siempre la idea inicial",
   "Reemplaza los indicadores con publicidad",
   "Respuesta esperada: Tiene hipótesis, evidencia esperada y un criterio de decisión."
  ],
  [
   "¿Qué control protege una cuenta aunque se filtre su contraseña?",
   "Autenticación multifactor",
   "Usar un fondo visual oscuro",
   "Guardar la contraseña en un archivo compartido",
   "Ocultar el nombre de usuario en el portal",
   "Respuesta esperada: Autenticación multifactor."
  ],
  [
   "¿Qué acción reduce el daño de una cuenta comprometida?",
   "Asignar permisos mínimos según sus tareas",
   "Compartir una cuenta de administración entre todos",
   "Mantener permisos de proyectos anteriores",
   "Otorgar acceso total de forma preventiva",
   "Respuesta esperada: Asignar permisos mínimos según sus tareas."
  ],
  [
   "¿Qué propiedad se afecta si alguien modifica registros de inventario sin permiso?",
   "Integridad",
   "Disponibilidad de la red",
   "Legibilidad del informe",
   "Velocidad de respuesta",
   "Respuesta esperada: Integridad."
  ],
  [
   "¿Qué propiedad se afecta si una caída impide consultar pedidos?",
   "Disponibilidad",
   "Confidencialidad",
   "Diseño visual",
   "Relevancia del indicador",
   "Respuesta esperada: Disponibilidad."
  ],
  [
   "¿Qué control permite recuperar datos después de un incidente?",
   "Respaldos verificados con pruebas de restauración",
   "Guardar un vínculo al archivo original",
   "Cambiar el nombre de las carpetas",
   "Eliminar los registros de errores",
   "Respuesta esperada: Respaldos verificados con pruebas de restauración."
  ],
  [
   "¿Qué conviene hacer al detectar un correo que pide credenciales y contiene un enlace sospechoso?",
   "Reportarlo por el canal interno de seguridad",
   "Introducir los datos para verificar el sitio",
   "Reenviarlo al equipo sin contexto",
   "Responder con una copia del documento de identidad",
   "Respuesta esperada: Reportarlo por el canal interno de seguridad."
  ],
  [
   "¿Qué criterio combina una matriz básica de riesgos?",
   "Probabilidad e impacto",
   "Diseño de la interfaz y presupuesto anual",
   "Tamaño de archivo y velocidad de descarga",
   "Cantidad de usuarios y marca del equipo",
   "Respuesta esperada: Probabilidad e impacto."
  ],
  [
   "Un proceso esencial depende de un único proveedor. ¿Qué mitigación es razonable?",
   "Preparar y probar una alternativa de continuidad",
   "Eliminar el análisis porque nunca ha fallado",
   "Quitar todas las copias de datos",
   "Ampliar la dependencia sin plan",
   "Respuesta esperada: Preparar y probar una alternativa de continuidad."
  ],
  [
   "¿Qué describe el riesgo residual?",
   "El riesgo que permanece después de aplicar controles",
   "El riesgo que ya se eliminó por completo",
   "El costo total de todos los proyectos",
   "Una amenaza que nunca fue evaluada",
   "Respuesta esperada: El riesgo que permanece después de aplicar controles."
  ],
  [
   "¿Qué señal muestra adopción de un nuevo sistema?",
   "Usuarios que completan sus tareas habituales en él",
   "Cantidad de correos de anuncio enviados",
   "Total de licencias compradas",
   "Cantidad de carteles en la oficina",
   "Respuesta esperada: Usuarios que completan sus tareas habituales en él."
  ],
  [
   "¿Qué acción ayuda si parte del equipo desconoce un flujo nuevo?",
   "Practicar con casos reales y ofrecer acompañamiento",
   "Aumentar la cantidad de comunicados genéricos",
   "Medir únicamente el presupuesto ejecutado",
   "Eliminar el material de ayuda",
   "Respuesta esperada: Practicar con casos reales y ofrecer acompañamiento."
  ],
  [
   "¿Qué papel cumple un patrocinador del cambio?",
   "Respaldar decisiones, asignar recursos y remover obstáculos",
   "Documentar cada incidente de soporte técnico",
   "Operar el sistema en nombre de todos",
   "Definir solo los colores de la comunicación",
   "Respuesta esperada: Respaldar decisiones, asignar recursos y remover obstáculos."
  ],
  [
   "¿Qué mejora la comunicación sobre un cambio de proceso?",
   "Explicar qué cambia, a quién afecta y dónde pedir apoyo",
   "Anunciar la fecha sin detallar el impacto",
   "Usar términos técnicos sin ejemplos",
   "Enviar instrucciones distintas a cada equipo",
   "Respuesta esperada: Explicar qué cambia, a quién afecta y dónde pedir apoyo."
  ],
  [
   "¿Qué ayuda a detectar resistencia antes de un despliegue?",
   "Escuchar inquietudes y probar el flujo con grupos representativos",
   "Ocultar el cambio hasta su lanzamiento",
   "Consultar exclusivamente a quienes lo diseñaron",
   "Medir solo el número de licencias",
   "Respuesta esperada: Escuchar inquietudes y probar el flujo con grupos representativos."
  ],
  [
   "¿Qué decisión corresponde al gobierno digital?",
   "Definir responsables y reglas para el uso de datos y servicios",
   "Elegir el formato de una diapositiva",
   "Delegar cada decisión a un proveedor",
   "Evitar documentar quién aprueba cambios",
   "Respuesta esperada: Definir responsables y reglas para el uso de datos y servicios."
  ],
  [
   "¿Qué función cumple un responsable de datos de clientes?",
   "Definir reglas de calidad, acceso y uso de esos datos",
   "Diseñar los banners de la tienda",
   "Administrar exclusivamente el cableado de red",
   "Autorizar cambios sin revisar su propósito",
   "Respuesta esperada: Definir reglas de calidad, acceso y uso de esos datos."
  ],
  [
   "¿Qué práctica mejora la rendición de cuentas de un servicio digital?",
   "Registrar decisiones, responsables e indicadores",
   "Eliminar el historial de cambios",
   "Guardar las decisiones solo en conversaciones privadas",
   "Cambiar criterios después de medir",
   "Respuesta esperada: Registrar decisiones, responsables e indicadores."
  ],
  [
   "¿Qué debe considerar un servicio digital público al diseñar su acceso?",
   "Accesibilidad y opciones para distintos niveles de conectividad",
   "Solo dispositivos de última generación",
   "Únicamente la velocidad del equipo interno",
   "El color del uniforme de los operadores",
   "Respuesta esperada: Accesibilidad y opciones para distintos niveles de conectividad."
  ],
  [
   "Un modelo perjudica más a un segmento de clientes. ¿Qué acción corresponde?",
   "Medir el desempeño por segmento y corregir el sesgo detectado",
   "Reportar solo la precisión global",
   "Eliminar el segmento de los informes",
   "Aumentar el volumen sin revisar los datos",
   "Respuesta esperada: Medir el desempeño por segmento y corregir el sesgo detectado."
  ],
  [
   "¿Qué práctica mejora la transparencia en una recomendación automatizada?",
   "Comunicar el propósito y los factores principales de la recomendación",
   "Ocultar por completo el uso del sistema",
   "Dar una explicación genérica para cualquier resultado",
   "Presentar la recomendación como decisión humana",
   "Respuesta esperada: Comunicar el propósito y los factores principales de la recomendación."
  ],
  [
   "¿Qué incluye una política responsable de retención de datos?",
   "Plazos de conservación y eliminación según propósito y obligaciones",
   "Conservar todo de forma indefinida",
   "Borrar datos sin revisar su valor ni requisitos",
   "Permitir que cada usuario defina plazos por su cuenta",
   "Respuesta esperada: Plazos de conservación y eliminación según propósito y obligaciones."
  ],
  [
   "¿Qué debería poder hacer un usuario frente a una decisión automatizada relevante?",
   "Solicitar revisión humana y aportar información",
   "Aceptar la decisión sin posibilidad de aclaración",
   "Modificar directamente el modelo en producción",
   "Cambiar por su cuenta las reglas del sistema",
   "Respuesta esperada: Solicitar revisión humana y aportar información."
  ],
  [
   "¿Qué acción favorece la sostenibilidad al renovar equipos?",
   "Reutilizar, reparar o reciclar según el estado de los equipos",
   "Desechar equipos operativos en basura común",
   "Cambiar todos los equipos por fecha fija",
   "Comprar equipos sin considerar consumo",
   "Respuesta esperada: Reutilizar, reparar o reciclar según el estado de los equipos."
  ],
  [
   "¿Qué indicador ayuda a comparar la eficiencia energética de dos servicios digitales?",
   "Consumo de energía por transacción comparable",
   "Número de colores de la interfaz",
   "Cantidad de archivos en el repositorio",
   "Precio del monitor utilizado",
   "Respuesta esperada: Consumo de energía por transacción comparable."
  ],
  [
   "¿Qué se debe analizar antes de afirmar que una migración reduce emisiones?",
   "Consumo antes y después y alcance de la medición",
   "Cantidad de etiquetas ecológicas en el portal",
   "Número de dispositivos comprados en total",
   "Preferencia del proveedor por ciertas marcas",
   "Respuesta esperada: Consumo antes y después y alcance de la medición."
  ],
  [
   "¿Qué KPI permite evaluar si se resuelven reclamos dentro del plazo?",
   "Porcentaje de reclamos resueltos dentro del tiempo acordado",
   "Total de correos enviados por todo el equipo",
   "Cantidad de categorías del formulario",
   "Promedio de antigüedad del personal",
   "Respuesta esperada: Porcentaje de reclamos resueltos dentro del tiempo acordado."
  ],
  [
   "¿Qué dato permite saber si un KPI mejoró después de un cambio?",
   "Una línea base comparable y una medición posterior",
   "Solo el valor meta",
   "Una descripción del proveedor",
   "El número de iconos del tablero",
   "Respuesta esperada: Una línea base comparable y una medición posterior."
  ],
  [
   "¿Qué problema tiene un KPI sin responsable asignado?",
   "Dificulta revisar sus resultados y tomar acciones",
   "Aumenta automáticamente los costos de licencias",
   "Impide usar cualquier gráfico",
   "Cambia el periodo de medición por sí solo",
   "Respuesta esperada: Dificulta revisar sus resultados y tomar acciones."
  ],
  [
   "¿Qué se debe hacer si un indicador mejora pero aparecen más quejas?",
   "Revisar si el indicador captura el resultado esperado y complementarlo",
   "Publicar solo el indicador favorable",
   "Eliminar las quejas del análisis",
   "Mantener los criterios sin revisar",
   "Respuesta esperada: Revisar si el indicador captura el resultado esperado y complementarlo."
  ],
  [
   "¿Qué distingue un hito de una tarea en un roadmap?",
   "El hito marca un resultado verificable en un punto del plan",
   "El hito siempre dura más que una tarea",
   "El hito reemplaza a todos los responsables",
   "El hito solo indica un costo de software",
   "Respuesta esperada: El hito marca un resultado verificable en un punto del plan."
  ],
  [
   "¿Qué debe mostrar un roadmap al combinar proyectos con recursos compartidos?",
   "Dependencias y disponibilidad de los equipos",
   "Solo el nombre de cada proyecto",
   "Un orden alfabético sin fechas",
   "Una lista de herramientas aprobadas",
   "Respuesta esperada: Dependencias y disponibilidad de los equipos."
  ],
  [
   "¿Qué conviene hacer si un piloto no alcanza el resultado esperado?",
   "Analizar causas y ajustar, repetir o detener la iniciativa",
   "Escalarlo sin cambios porque ya se invirtió",
   "Registrar el resultado como meta cumplida",
   "Ocultar las mediciones del piloto",
   "Respuesta esperada: Analizar causas y ajustar, repetir o detener la iniciativa."
  ],
  [
   "¿Cómo validar una propuesta de transformación ante un comité?",
   "Relacionar problema, evidencia, beneficios medibles y riesgos",
   "Mostrar solo capturas del diseño",
   "Evitar explicar supuestos y recursos",
   "Presentar estimaciones como datos observados",
   "Respuesta esperada: Relacionar problema, evidencia, beneficios medibles y riesgos."
  ],
  [
   "¿Qué muestra que la fase Futuro puede ejecutarse?",
   "Hitos con responsables, recursos, indicadores y dependencias",
   "Un calendario sin acciones asignadas",
   "Una promesa de éxito sin presupuesto",
   "Una lista de herramientas sin prioridades",
   "Respuesta esperada: Hitos con responsables, recursos, indicadores y dependencias."
  ],
  [
   "¿Qué información debe quedar al cerrar el proyecto integrador?",
   "Resultados observados, límites y próximos pasos verificables",
   "Una colección de imágenes sin contexto",
   "Únicamente el nombre del equipo",
   "Un listado de beneficios que no se midieron",
   "Respuesta esperada: Resultados observados, límites y próximos pasos verificables."
  ]
 ]
];
raw.forEach((unit,index)=>unit.push(...additionalQuestions[index]));
const questions=raw.map((unit,u)=>unit.map((r,i)=>{let options=r.slice(1,5);let shift=(i+u)%4;options=options.slice(shift).concat(options.slice(0,shift));return {id:i+1,q:r[0],options,answer:(4-shift)%4,explanation:r[5]}}));
