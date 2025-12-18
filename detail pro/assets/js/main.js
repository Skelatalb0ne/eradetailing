(function(){
  const btn = document.querySelector('[data-menu-btn]');
  const menu = document.querySelector('[data-mobile-menu]');
  if(btn && menu){
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Active link highlighting
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-nav] a').forEach(a=>{
    const href = (a.getAttribute('href') || '').toLowerCase();
    if(href === path) a.classList.add('active');
    if(path === '' && href === 'index.html') a.classList.add('active');
  });

  // Gallery lightbox (works on gallery.html and index.html if gallery exists)
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxTitle = document.querySelector('[data-lightbox-title]');
  const closeBtn = document.querySelector('[data-lightbox-close]');
  const items = document.querySelectorAll('[data-gallery-item]');
  if(lightbox && items.length){
    const open = (title) => {
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden','false');
      if(lightboxTitle) lightboxTitle.textContent = title || 'Preview';
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    };
    items.forEach(el => {
      el.addEventListener('click', () => open(el.getAttribute('data-title')));
      el.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el.getAttribute('data-title')); }
      });
    });
    closeBtn && closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if(e.target === lightbox) close(); });
    window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });
  }
})();
