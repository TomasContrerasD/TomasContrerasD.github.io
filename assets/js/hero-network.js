(() => {
  const canvas = document.getElementById('hero-canvas');
  const section = document.querySelector('.hero-section');
  const context = canvas?.getContext('2d');
  if (!context || !section) return;

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = { x: -9999, y: -9999 };
  const nodes = [];
  const linkDistance = 155;
  let width = 0;
  let height = 0;
  let visible = true;
  let frameId = null;
  let previousTime = null;
  const random = (min, max) => Math.random() * (max - min) + min;

  function createNode() {
    return {
      x: random(0, width), y: random(0, height),
      vx: random(-0.38, 0.38), vy: random(-0.38, 0.38),
      radius: random(2.5, 5.5), alpha: random(0.25, 0.55)
    };
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (distance >= linkDistance) continue;
        context.strokeStyle = 'rgba(0,80,157,' + (1 - distance / linkDistance) * 0.28 + ')';
        context.lineWidth = 0.9;
        context.beginPath();
        context.moveTo(nodes[i].x, nodes[i].y);
        context.lineTo(nodes[j].x, nodes[j].y);
        context.stroke();
      }
    }
    for (const node of nodes) {
      context.beginPath();
      context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(0,80,157,' + node.alpha + ')';
      context.fill();
    }
  }

  function animate(time) {
    frameId = null;
    const step = previousTime === null ? 1 : Math.min((time - previousTime) / (1000 / 60), 2);
    previousTime = time;
    for (const node of nodes) {
      node.x += node.vx * step;
      node.y += node.vy * step;
      const dx = node.x - pointer.x;
      const dy = node.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 130 && distance > 0.5) {
        const strength = ((130 - distance) / 130) * 5 * step;
        node.x += dx / distance * strength;
        node.y += dy / distance * strength;
      }
      if (node.x < node.radius || node.x > width - node.radius) {
        node.x = Math.max(node.radius, Math.min(width - node.radius, node.x));
        node.vx *= -1;
      }
      if (node.y < node.radius || node.y > height - node.radius) {
        node.y = Math.max(node.radius, Math.min(height - node.radius, node.y));
        node.vy *= -1;
      }
    }
    draw();
    frameId = requestAnimationFrame(animate);
  }

  function syncAnimation() {
    const shouldAnimate = visible && !document.hidden && !motionPreference.matches;
    if (shouldAnimate && frameId === null) {
      previousTime = null;
      frameId = requestAnimationFrame(animate);
    } else if (!shouldAnimate) {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
      previousTime = null;
      draw();
    }
  }

  function resize() {
    const oldWidth = width;
    const oldHeight = height;
    width = Math.max(1, section.clientWidth);
    height = Math.max(1, section.clientHeight);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    for (const node of nodes) {
      node.x = oldWidth ? node.x / oldWidth * width : node.x;
      node.y = oldHeight ? node.y / oldHeight * height : node.y;
    }
    const count = Math.max(22, Math.min(55, Math.round(width * height / 14000)));
    nodes.length = Math.min(nodes.length, count);
    while (nodes.length < count) nodes.push(createNode());
    draw();
    syncAnimation();
  }

  section.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || motionPreference.matches) return;
    const bounds = canvas.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
  });
  section.addEventListener('pointerleave', () => { pointer.x = -9999; pointer.y = -9999; });
  document.addEventListener('visibilitychange', syncAnimation);
  motionPreference.addEventListener('change', syncAnimation);
  window.addEventListener('resize', resize);

  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(section);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    }).observe(section);
  }
  resize();
})();
