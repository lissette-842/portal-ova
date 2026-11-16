(() => {
  const canvas = document.querySelector('.hero-network');
  const context = canvas.getContext('2d');
  if (!context) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, frame = 0, lastTime = 0, visible = false;
  let nodes = [];

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    nodes = Array.from({length: width < 600 ? 22 : 38}, () => ({
      x: Math.random() * width, y: Math.random() * height,
      dx: Math.random() * 22 - 11, dy: Math.random() * 22 - 11,
      radius: 1.1 + Math.random() * 1.7
    }));
  }

  function draw(time) {
    const elapsed = lastTime ? Math.min((time - lastTime) / 1000, .05) : 0;
    lastTime = time;
    const dark = document.documentElement.dataset.theme === 'dark';
    const color = dark ? '125, 226, 155' : '9, 132, 59';
    context.clearRect(0, 0, width, height);
    for (const node of nodes) {
      node.x += node.dx * elapsed;
      node.y += node.dy * elapsed;
      if (node.x < 0 || node.x > width) node.dx *= -1;
      if (node.y < 0 || node.y > height) node.dy *= -1;
      node.x = Math.max(0, Math.min(width, node.x));
      node.y = Math.max(0, Math.min(height, node.y));
    }
    const reach = width < 600 ? 92 : 135;
    nodes.forEach((node, index) => {
      for (let i = index + 1; i < nodes.length; i++) {
        const other = nodes[i];
        const distance = Math.hypot(node.x - other.x, node.y - other.y);
        if (distance >= reach) continue;
        context.strokeStyle = 'rgba(' + color + ',' + ((1 - distance / reach) * .26) + ')';
        context.beginPath();
        context.moveTo(node.x, node.y);
        context.lineTo(other.x, other.y);
        context.stroke();
      }
      context.fillStyle = 'rgba(' + color + ',' + (.35 + .15 * Math.sin(time / 800 + index)) + ')';
      context.beginPath();
      context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      context.fill();
    });
    frame = requestAnimationFrame(draw);
  }

  function sync() {
    if (visible && !document.hidden && !reducedMotion.matches) {
      if (!frame) frame = requestAnimationFrame(draw);
    } else {
      cancelAnimationFrame(frame);
      frame = lastTime = 0;
      context.clearRect(0, 0, width, height);
    }
  }

  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(canvas);
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
})();
