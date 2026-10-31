// Highlights the current section in the table of contents and, in the
// wide-screen sidebar layout, expands only the active section's sub-items.
(function () {
  var nav = document.getElementById('TableOfContents');
  if (!nav) return;
  var items = [].slice.call(nav.querySelectorAll('a')).map(function (a) {
    return { a: a, el: document.getElementById(decodeURIComponent(a.hash.slice(1))) };
  }).filter(function (x) { return x.el; });
  if (!items.length) return;

  var ticking = false;
  function update() {
    ticking = false;
    var line = 120, cur = null;
    items.forEach(function (x) { if (x.el.getBoundingClientRect().top <= line) cur = x; });
    nav.querySelectorAll('.active').forEach(function (e) { e.classList.remove('active'); });
    nav.querySelectorAll('.open').forEach(function (e) { e.classList.remove('open'); });
    if (!cur) return;
    cur.a.classList.add('active');
    for (var li = cur.a.closest('li'); li; li = li.parentElement && li.parentElement.closest('li')) {
      li.classList.add('open');
    }
    // keep the active link visible inside the scrollable sidebar
    var nr = nav.getBoundingClientRect(), ar = cur.a.getBoundingClientRect();
    if (ar.top < nr.top || ar.bottom > nr.bottom) {
      nav.scrollTop += ar.top - nr.top - nr.height / 3;
    }
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
