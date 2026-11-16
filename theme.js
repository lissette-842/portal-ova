(() => {
  const key = 'proyectos-theme';
  let theme = 'light';
  try {
    const saved = localStorage.getItem(key);
    if (saved === 'dark' || saved === 'light') theme = saved;
  } catch (_) { /* El selector funciona aunque el navegador bloquee almacenamiento. */ }
  function apply(value) {
    theme = value;
    document.documentElement.dataset.theme = value;
    document.documentElement.style.colorScheme = value;
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === value));
    });
  }
  apply(theme);
  document.addEventListener('DOMContentLoaded', () => {
    apply(theme);
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      button.addEventListener('click', () => {
        apply(button.dataset.themeChoice);
        try { localStorage.setItem(key, theme); } catch (_) { }
      });
    });
  });
  window.addEventListener('storage', event => {
    if (event.key === key && ['light', 'dark'].includes(event.newValue)) apply(event.newValue);
  });
})();
