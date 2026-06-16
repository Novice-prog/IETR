function setActive(linkEl) {
  if (!linkEl) return;
  document.querySelectorAll('.submenu a').forEach(a => a.classList.remove('active'));
  linkEl.classList.add('active');
}

function loadPage(pageUrl, title, breadcrumb) {
  // захватываем кликнутый пункт СИНХРОННО, пока event ещё актуален
  var linkEl = window.event ? window.event.target : null;
  fetch(pageUrl + '?t=' + Date.now())
    .then(r => r.text())
    .then(html => {
      document.getElementById('content').innerHTML = html;
      if (title) document.getElementById('page-title').textContent = title;
      if (breadcrumb) document.getElementById('breadcrumb').textContent = breadcrumb;
      setActive(linkEl);
      const main = document.getElementById('main');
      if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    .catch(e => console.error('Ошибка загрузки:', e));
  return false;
}

function loadPageAndScroll(pageUrl, elementId, title, breadcrumb) {
  var linkEl = window.event ? window.event.target : null;
  fetch(pageUrl + '?t=' + Date.now())
    .then(r => r.text())
    .then(html => {
      document.getElementById('content').innerHTML = html;
      if (title) document.getElementById('page-title').textContent = title;
      if (breadcrumb) document.getElementById('breadcrumb').textContent = breadcrumb;
      setActive(linkEl);
      setTimeout(() => {
        const el = document.getElementById(elementId);
        // scrollIntoView сам находит нужный контейнер прокрутки
        // (#main на десктопе или окно на мобильной вёрстке);
        // scroll-margin-top в CSS не даёт спрятаться под липкой шапкой
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    })
    .catch(e => console.error('Ошибка загрузки:', e));
  return false;
}

function toggleMenu(el, subId) {
  const sub = document.getElementById(subId);
  const isOpen = sub.classList.contains('open');
  document.querySelectorAll('.submenu').forEach(s => s.classList.remove('open'));
  document.querySelectorAll('.nav-main-link').forEach(l => { l.classList.remove('open'); l.classList.remove('active'); });
  if (!isOpen) {
    sub.classList.add('open');
    el.classList.add('open');
    el.classList.add('active');
  }
}
