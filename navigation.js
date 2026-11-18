(() => {
  const header = document.querySelector('.site-nav');
  const toggle = header?.querySelector('.nav-toggle');
  const navigation = document.getElementById('primaryNavigation');
  if (!header || !toggle || !navigation) return;

  const mobile = window.matchMedia('(max-width: 1240px)');
  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span').textContent = open ? 'Cerrar' : 'Menú';
    header.classList.toggle('nav-open', open);
  }
  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  navigation.addEventListener('click', event => {
    if (mobile.matches && event.target.closest('a')) {
      setOpen(false);
      toggle.focus();
    }
  });
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  mobile.addEventListener('change', () => setOpen(false));
  header.setAttribute('data-nav-ready', '');
})();
