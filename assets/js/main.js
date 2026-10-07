const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

(() => {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || motionPreference.matches) return;

  const elements = [
    ...document.querySelectorAll('.hero-copy, .hero-visual, .method-trace'),
    ...document.querySelectorAll('.story-part > h2, .story-part > p, .story-part > ul, .story-method > li, .contact-actions')
  ];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -28px 0px' });

  elements.forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
  motionPreference.addEventListener('change', event => {
    if (!event.matches) return;
    elements.forEach(element => element.classList.add('is-visible'));
    observer.disconnect();
  });
})();

// Follow the actual heading positions as text, fonts and screen width change.
(() => {
  const flow = document.querySelector('.method-flow');
  const trace = flow?.querySelector('.method-trace');
  const steps = flow ? [...flow.querySelectorAll('.story-method > li')] : [];
  if (!trace || steps.length !== 3) return;

  function drawTrace() {
    const [first, second, third] = steps.map(step => {
      const heading = step.querySelector('h3');
      return step.offsetTop + heading.offsetTop + heading.offsetHeight / 2;
    });
    const firstGap = second - first;
    const secondGap = third - second;
    trace.setAttribute('viewBox', `0 0 52 ${flow.clientHeight}`);
    trace.setAttribute('preserveAspectRatio', 'none');
    trace.querySelector('path').setAttribute('d',
      `M40 ${first} C16 ${first + firstGap * .15} 5 ${first + firstGap * .35} 5 ${first + firstGap * .62} ` +
      `C5 ${second - 22} 23 ${second - 8} 38 ${second + 2} ` +
      `C51 ${second + 14} 53 ${second - 5} 41 ${second - 3} ` +
      `C25 ${second - 1} 9 ${second + secondGap * .25} 7 ${second + secondGap * .48} ` +
      `C4 ${second + secondGap * .75} 15 ${third - 12} 40 ${third}`);
    trace.querySelector('.method-trace-arrow').setAttribute('d', `M30 ${third - 6} L41 ${third} L31 ${third + 6}`);
    trace.classList.add('is-ready');
  }

  drawTrace();
  if ('ResizeObserver' in window) new ResizeObserver(drawTrace).observe(flow);
  else window.addEventListener('resize', drawTrace);
  document.fonts?.ready.then(drawTrace);
})();
