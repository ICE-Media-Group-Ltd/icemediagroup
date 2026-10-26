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

  // Contact form: sends enquiries to Formspree, then shows the site's own thank-you page
  var thankYou = new URL('../../thank-you.html', document.currentScript.src).href;
  document.querySelectorAll('[data-contact-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      d.append('_subject', 'Website enquiry: ' + d.get('interest'));
      d.append('page', window.location.href);
      var btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      fetch(form.action, { method: 'POST', body: d, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('Send failed');
          var go = function () { window.location.href = thankYou; };
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: 'contact_form_submit', interest: d.get('interest'), eventCallback: go, eventTimeout: 1500 });
          setTimeout(go, 1600);
        })
        .catch(function () {
          btn.disabled = false;
          alert('Sorry, your enquiry could not be sent. Please try again or call us on 01233 221316.');
        });
    });
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
