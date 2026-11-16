function buildEvaluationPDF(attempt, PDF) {
  PDF=PDF||(typeof window!=='undefined'?window.jspdf.jsPDF:null);
  const doc=new PDF({unit:'mm',format:'a4',compress:true});
  const left=18,width=174,bottom=266;let y=0;
  const green=[20,92,67],ink=[30,48,39],muted=[90,108,98];
  const text=value=>String(value??'').replace(/[\r\n\t]+/g,' ').replace(/[–—]/g,'-');
  function header(first){
    doc.setFillColor(...green);doc.rect(0,0,210,7,'F');doc.setTextColor(...green);
    doc.setFont('helvetica','bold');doc.setFontSize(13);doc.text('UNIVERSIDAD SIMÓN BOLÍVAR',left,19);
    doc.setTextColor(...ink);doc.setFontSize(first?19:13);doc.text(first?'Evidencia de evaluación':'Detalle de respuestas',left,30);
    doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor(...muted);
    doc.text('Transformación empresarial | Unidad '+attempt.unit,left,38);
    doc.setDrawColor(210,224,214);doc.line(left,42,192,42);y=51;
  }
  function ensure(height){if(y+height>bottom){doc.addPage();header(false)}}
  function field(label,value){
    doc.setFont('helvetica','normal');doc.setFontSize(10);
    const lines=doc.splitTextToSize(text(value),width-35);ensure(Math.max(1,lines.length)*5+4);
    doc.setFont('helvetica','bold');doc.setTextColor(...green);doc.text(label,left,y);
    doc.setFont('helvetica','normal');doc.setTextColor(...ink);doc.text(lines,left+35,y);y+=Math.max(1,lines.length)*5+4;
  }
  header(true);
  field('Estudiante',attempt.studentName);field('Código',attempt.studentCode||'No indicado');
  field('Grupo',attempt.groupName+' - '+attempt.company);field('Periodo',(typeof periodLabel==='function'?periodLabel(attempt.term):attempt.term)+' | Semestre '+(typeof romanSemester==='function'?romanSemester(attempt.level):attempt.level));
  field('Fecha y hora',new Intl.DateTimeFormat('es-CO',{dateStyle:'medium',timeStyle:'short',timeZone:'America/Bogota'}).format(new Date(attempt.date))+' (Colombia)');
  field('Referencia',attempt.id);
  ensure(32);doc.setFillColor(235,245,236);doc.roundedRect(left,y,width,25,3,3,'F');
  doc.setTextColor(...green);doc.setFont('helvetica','bold');doc.setFontSize(24);doc.text(attempt.score+' / '+attempt.total,left+7,y+12);
  doc.setFontSize(20);doc.text((5*attempt.score/attempt.total).toFixed(2).replace('.',',')+' / 5',185,y+12,{align:'right'});
  doc.setFont('helvetica','normal');doc.setFontSize(9);doc.text(attempt.score+' aciertos y '+(attempt.total-attempt.score)+' desaciertos',left+7,y+20);doc.text('Nota del corte',185,y+20,{align:'right'});y+=34;
  ensure(18);doc.setFontSize(10);doc.setTextColor(...muted);
  const status=attempt.saved?'Resultado registrado y calificado en Supabase.':'Resultado local: pendiente de registro en Supabase.';
  doc.text(doc.splitTextToSize(status,width),left,y);y+=13;
  doc.setFont('helvetica','bold');doc.setFontSize(12);doc.setTextColor(...ink);doc.text('Respuestas de la evaluación',left,y);y+=9;
  (attempt.details||[]).forEach((question,index)=>{
    doc.setFontSize(10);
    const prompt=doc.splitTextToSize((index+1)+'. '+text(question.q),width);
    const chosen=doc.splitTextToSize('Respuesta del estudiante: '+('ABCD'[question.selected]||'-')+'. '+text(question.options[question.selected]??'Sin respuesta'),width-4);
    const correct=doc.splitTextToSize('Respuesta correcta: '+'ABCD'[question.answer]+'. '+text(question.options[question.answer]),width-4);
    const block=(prompt.length+chosen.length+correct.length)*4.6+13;ensure(block);
    doc.setFont('helvetica','bold');doc.setTextColor(...ink);doc.text(prompt,left,y);y+=prompt.length*4.6+3;
    doc.setFont('helvetica','normal');doc.text(chosen,left+2,y);y+=chosen.length*4.6+2;
    doc.setTextColor(...muted);doc.text(correct,left+2,y);y+=correct.length*4.6+2;
    doc.setTextColor(...(question.correct?green:[159,66,40]));doc.setFontSize(8);doc.setFont('helvetica','bold');doc.text(question.correct?'CORRECTA':'INCORRECTA',left+2,y);y+=8;
  });
  const pages=doc.getNumberOfPages();
  for(let page=1;page<=pages;page++){
    doc.setPage(page);doc.setDrawColor(210,224,214);doc.line(left,274,192,274);
    doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(...muted);
    doc.text('Registro de práctica. Identificación suministrada por el estudiante.',left,280);
    doc.text('Docente: Mg. Alvaro Salamanca Landinez',left,286);doc.text('Página '+page+' de '+pages,192,286,{align:'right'});
  }
  doc.setProperties({title:'Evidencia - '+text(attempt.studentName)+' - Unidad '+attempt.unit,subject:'Resultado individual de evaluación',author:'Proyectos - Transformación empresarial'});
  return doc;
}
function downloadEvaluationPDF(attempt){
  const safe=attempt.studentName.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,70)||'estudiante';
  buildEvaluationPDF(attempt).save('Evidencia-Unidad-'+attempt.unit+'-'+safe+'.pdf');
}
if(typeof module!=='undefined'&&module.exports)module.exports={buildEvaluationPDF};
