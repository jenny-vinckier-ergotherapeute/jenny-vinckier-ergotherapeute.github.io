(function () {
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('menu');
  const links = menu.querySelectorAll('a');

  function toggle(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  }
  burger.addEventListener('click', () => toggle(!menu.classList.contains('open')));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });

  // Smooth scroll (avec décalage pour le header sticky)
  links.forEach(a => a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = document.querySelector('.site-header').offsetHeight;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: reduce ? 'auto' : 'smooth' });
    toggle(false);
    history.replaceState(null, '', a.getAttribute('href'));
  }));

  // Lien actif au défilement
  const sections = [...links].map(a => document.querySelector(a.getAttribute('href')));
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => s && io.observe(s));

  // Masque proprement les images pas encore ajoutées (petites icônes uniquement)
  document.querySelectorAll('img').forEach(img => {
    const hide = () => { if (!img.matches('.hero-photo img')) img.classList.add('hidden'); };
    if (img.complete && img.naturalWidth === 0) hide();
    img.addEventListener('error', hide);
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
