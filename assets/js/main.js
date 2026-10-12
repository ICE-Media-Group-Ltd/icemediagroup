(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) toggle.addEventListener('click', function () {
    var open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.sub-toggle').forEach(function (b) {
    b.addEventListener('click', function () {
      var item = b.closest('.has-sub');
      var open = item.classList.toggle('open');
      b.setAttribute('aria-expanded', open);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.querySelectorAll('.has-sub.open').forEach(function (i) { i.classList.remove('open'); });
  });

  // Missing images: keep the frame, drop the broken icon
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    var hide = function () { img.style.visibility = 'hidden'; };
    if (img.complete && img.naturalWidth === 0) hide();
    img.addEventListener('error', hide);
  });

  // Course filter
  var filters = document.querySelector('[data-filters]');
  if (filters) filters.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var lvl = b.dataset.level;
    filters.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    document.querySelectorAll('[data-level-row]').forEach(function (r) {
      r.hidden = !(lvl === 'All' || r.dataset.levelRow === lvl);
    });
  });

  // Contact form: opens the visitor's email client until a form handler is connected
  var form = document.querySelector('[data-contact-form]');
  if (form) form.addEventListener('submit', function (e) {
    if (form.getAttribute('action')) return;
    e.preventDefault();
    var d = new FormData(form);
    var body = 'Name: ' + d.get('name') + '\nEmail: ' + d.get('email') + '\nPhone: ' + (d.get('phone') || '') +
      '\nInterested in: ' + d.get('interest') + '\nWebsite: ' + (d.get('website') || '') + '\n\n' + (d.get('message') || '');
    window.location.href = 'mailto:contactus@icemediagroup.co.uk?subject=' + encodeURIComponent('Website enquiry: ' + d.get('interest')) + '&body=' + encodeURIComponent(body);
    form.classList.add('sent');
  });

  // Cookie consent. GTM (GTM-PCHKLG8S) loads on every page with Consent Mode v2 defaults set to denied.
  var KEY = 'ice_cookie_consent';
  var banner = document.querySelector('.cookie');
  window.dataLayer = window.dataLayer || [];
  function gtagC() { window.dataLayer.push(arguments); }
  function loadAnalytics() {
    gtagC('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
    window.dataLayer.push({ event: 'cookie_consent_accepted' });
  }
  function denyAnalytics() {
    gtagC('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
  }
  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}
    if (!choice && banner) banner.classList.add('show');
  function set(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    if (banner) banner.classList.remove('show');
    if (v === 'accepted') loadAnalytics(); else denyAnalytics();
  }
  document.querySelectorAll('[data-cookie]').forEach(function (b) {
    b.addEventListener('click', function () { set(b.dataset.cookie); });
  });
  document.querySelectorAll('[data-cookie-settings]').forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); if (banner) banner.classList.add('show'); });
  });
})();
