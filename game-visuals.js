// La capa comparte el sistema de coordenadas de los botones del tablero.
class GameConnections extends HTMLElement {
  connectedCallback() {
    this.board = this.parentElement;
    this.innerHTML = '<svg aria-hidden="true"></svg>';
    this.svg = this.firstElementChild;
    this.resize = new ResizeObserver(() => this.draw());
    this.resize.observe(this.board);
    this.board.querySelectorAll('button').forEach(button => this.resize.observe(button));
    this.events = new AbortController();
    const options = {signal:this.events.signal};
    this.board.addEventListener('pointermove', event => {
      if (!this.dataset.anchor) return;
      const rect = this.getBoundingClientRect();
      this.pointer = [event.clientX - rect.left, event.clientY - rect.top];
      this.draw();
    }, options);
    this.board.addEventListener('pointerleave', () => { this.pointer = null; this.draw(); }, options);
    this.board.addEventListener('focusin', event => {
      this.pointer = null;
      this.focusTarget = event.target.closest('button');
      this.draw();
    }, options);
    this.board.addEventListener('focusout', () => { this.focusTarget = null; this.draw(); }, options);
    this.draw();
  }
  disconnectedCallback() { this.resize.disconnect(); this.events.abort(); }
  draw() {
    const rect = this.getBoundingClientRect();
    const point = button => {
      const box = button.getBoundingClientRect();
      let x = box.left + box.width / 2;
      if (button.hasAttribute('data-left')) x = box.right;
      if (button.hasAttribute('data-right')) x = box.left;
      return [x - rect.left, box.top + box.height / 2 - rect.top];
    };
    const lines = [];
    const add = (a,b,preview=false) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg','line');
      for (const [key,value] of Object.entries({x1:a[0],y1:a[1],x2:b[0],y2:b[1]})) line.setAttribute(key,value);
      if (preview) line.classList.add('guide');
      lines.push(line);
    };
    for (const [start,end] of JSON.parse(this.dataset.paths)) {
      const a = this.board.querySelector(start), b = this.board.querySelector(end);
      if (a && b) add(point(a),point(b));
    }
    if (this.dataset.anchor) {
      const anchor = this.board.querySelector(this.dataset.anchor);
      const end = this.pointer || (this.focusTarget && point(this.focusTarget));
      if (anchor && end) add(point(anchor),end,true);
    }
    this.svg.replaceChildren(...lines);
  }
}
customElements.define('game-connections',GameConnections);

function connections(paths,anchor='') {
  return '<game-connections aria-hidden="true" data-paths="'+esc(JSON.stringify(paths))+'" data-anchor="'+esc(anchor)+'"></game-connections>';
}

function hangmanDrawing(errors) {
  const stages = [
    '<path d="M20 117h132M42 117l13-15 13 15"/>',
    '<path d="M55 110V13h67M55 37l23-24"/>',
    '<path d="M120 13v18"/>',
    '<circle cx="120" cy="41" r="10"/>',
    '<path d="M120 51v29m0-23-15 12m15-12 15 12"/>',
    '<path d="m120 80-12 19m12-19 12 19"/>'
  ];
  return '<svg class="hangman-drawing" viewBox="0 0 180 130" role="img" aria-label="Dibujo del ahorcado: '+errors+' de 6 etapas">'+
    stages.slice(0,errors).map((shape,i)=>'<g class="'+(i===errors-1?'latest':'')+'">'+shape+'</g>').join('')+'</svg>';
}
