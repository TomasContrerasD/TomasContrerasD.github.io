const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Section links stay useful when JavaScript is unavailable.
const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

if ('IntersectionObserver' in window) {
  const visibleSections = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visibleSections.add(entry.target.id);
      else visibleSections.delete(entry.target.id);
    });
    const current = sections.find(section => visibleSections.has(section.id));
    navLinks.forEach(link => {
      if (current && link.getAttribute('href') === '#' + current.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-125px 0px -35% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}
