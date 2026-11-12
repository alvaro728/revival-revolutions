(function () {
  var doc = document.documentElement;
  var header = document.querySelector('.site-header');
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');

  function solid() {
    if (header) header.classList.toggle('solid', window.scrollY > 24 || doc.classList.contains('menu-open'));
  }
  window.addEventListener('scroll', solid, { passive: true });
  solid();

  function setMenu(open) {
    doc.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
    if (open) { var a = menu.querySelector('a'); if (a) a.focus({ preventScroll: true }); }
    document.body.style.overflow = open ? 'hidden' : '';
    solid();
  }
  if (btn && menu) {
    btn.addEventListener('click', function () { setMenu(!doc.classList.contains('menu-open')); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && doc.classList.contains('menu-open')) { setMenu(false); btn.focus(); }
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  }

  /* Elapsed race clock: the page, read as a 24-hour race */
  var clock = document.querySelector('[data-clock]');
  var line = document.querySelector('[data-race-line]');
  if (clock && line) {
    var tick = false;
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var race = function () {
      tick = false;
      var max = doc.scrollHeight - window.innerHeight;
      var p = max > 4 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      var s = Math.round(p * 86400);
      clock.textContent = pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s % 3600 / 60)) + ':' + pad(s % 60);
      line.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    };
    var ask = function () { if (!tick) { tick = true; requestAnimationFrame(race); } };
    window.addEventListener('scroll', ask, { passive: true });
    window.addEventListener('resize', ask);
    if ('ResizeObserver' in window) new ResizeObserver(ask).observe(document.body);
    race();
  }

  /* Home carousel */
  var show = document.querySelector('[data-show]');
  if (show) {
    var frames = show.querySelectorAll('.stage-frames img');
    var data = JSON.parse(show.querySelector('script[type="application/json"]').textContent);
    var title = show.querySelector('[data-title]');
    var spec = show.querySelector('[data-spec]');
    var link = show.querySelector('[data-link]');
    var count = show.querySelector('[data-count]');
    var role = show.querySelector('[data-role]');
    var head = show.querySelector('.show-head');
    var slots = show.querySelectorAll('[data-slot]');
    var i = 0;
    function go(n) {
      i = (n + data.length) % data.length;
      frames.forEach(function (f, k) { f.classList.toggle('on', k === i); });
      slots.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
      head.style.opacity = 0;
      setTimeout(function () {
        title.textContent = data[i].name;
        spec.textContent = data[i].spec;
        link.setAttribute('href', data[i].href);
        link.setAttribute('aria-label', 'View this study: ' + data[i].name);
        if (role) role.textContent = data[i].role;
        if (count) count.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(data.length).padStart(2, '0');
        head.style.opacity = 1;
      }, 220);
    }
    head.style.transition = 'opacity 220ms ease';
    slots.forEach(function (b, k) { b.addEventListener('click', function () { if (k !== i) go(k); }); });
    show.querySelector('.prev').addEventListener('click', function () { go(i - 1); });
    show.querySelector('.next').addEventListener('click', function () { go(i + 1); });
    show.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') go(i - 1);
      if (e.key === 'ArrowRight') go(i + 1);
    });
    var x0 = null;
    var stage = show.querySelector('.stage');
    stage.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }

  /* Hero film: pause control, and no autoplay when reduced motion is requested */
  var film = document.querySelector('.hero-video');
  var toggle = document.querySelector('[data-hero-toggle]');
  if (film && toggle) {
    var label = toggle.querySelector('[data-label]');
    var setFilm = function (play) {
      if (play) { var p = film.play(); if (p && p.catch) p.catch(function () {}); } else { film.pause(); }
      toggle.setAttribute('aria-pressed', String(!play));
      label.textContent = play ? 'Pause film' : 'Play film';
    };
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      film.removeAttribute('autoplay');
      setFilm(false);
    }
    toggle.addEventListener('click', function () { setFilm(film.paused); });
  }

  /* Colour studies */
  document.querySelectorAll('[data-colour]').forEach(function (box) {
    var imgs = box.querySelectorAll('.colour-stage img');
    var btns = box.querySelectorAll('button.chip');
    var name = box.querySelector('[data-colour-name]');
    btns.forEach(function (b, k) {
      b.addEventListener('click', function () {
        imgs.forEach(function (im, n) { im.classList.toggle('on', n === k); });
        btns.forEach(function (o, n) { o.setAttribute('aria-pressed', String(n === k)); });
        name.textContent = b.getAttribute('data-name');
      });
    });
  });

  /* Section dots */
  var dots = document.querySelectorAll('.dots a');
  if (dots.length && 'IntersectionObserver' in window) {
    var map = {};
    dots.forEach(function (d) { map[d.getAttribute('href').slice(1)] = d; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          dots.forEach(function (d) { d.removeAttribute('aria-current'); });
          var d = map[en.target.id];
          if (d) d.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* Contact form: composes an email in the visitor's mail app */
  var form = document.querySelector('[data-mailform]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var to = form.getAttribute('data-mailform');
      var subject = f.get('request') + ': ' + f.get('interest');
      var msg = (f.get('message') || '').trim();
      var body = (msg ? msg + '\n\n' : '') + f.get('name') + '\n' + f.get('email');
      var a = document.createElement('a');
      a.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a); a.click(); a.remove();
      var note = form.querySelector('.form-note');
      note.hidden = false;
    });
  }
})();
