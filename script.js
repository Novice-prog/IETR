function loadPage(pageUrl, title, breadcrumb) {
  fetch(pageUrl)
    .then(r => r.text())
    .then(html => {
      document.getElementById('content').innerHTML = html;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (title) document.getElementById('page-title').textContent = title;
      if (breadcrumb) document.getElementById('breadcrumb').textContent = breadcrumb;
      document.querySelectorAll('.submenu a').forEach(a => a.classList.remove('active'));
      event.target.classList.add('active');
    })
    .catch(e => console.error('Ошибка загрузки:', e));
  return false;
}

function loadPageAndScroll(pageUrl, elementId, title, breadcrumb) {
  fetch(pageUrl)
    .then(r => r.text())
    .then(html => {
      document.getElementById('content').innerHTML = html;
      if (title) document.getElementById('page-title').textContent = title;
      if (breadcrumb) document.getElementById('breadcrumb').textContent = breadcrumb;
      document.querySelectorAll('.submenu a').forEach(a => a.classList.remove('active'));
      event.target.classList.add('active');
      setTimeout(() => {
        const el = document.getElementById(elementId);
        const main = document.getElementById('main');
        if (el && main) {
          // вычисляем позицию el относительно #main
          let offset = 0;
          let node = el;
          while (node && node !== main) {
            offset += node.offsetTop;
            node = node.offsetParent;
          }
          main.scrollTo({ top: offset - 16, behavior: 'smooth' });
        }
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
