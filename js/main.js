/* ------------------------------------------------------------
   1. Mobile navigation toggle

   The nav is hidden by CSS below 620px. This adds/removes the
   .is-open class on it, and keeps aria-expanded in sync so screen
   readers announce whether the menu is open.
   ------------------------------------------------------------ */

var toggle = document.querySelector('.nav-toggle');
var nav = document.querySelector('.site-nav');

toggle.addEventListener('click', function () {
  var isOpen = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

/* Tapping a link should close the menu again. */
nav.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});


/* ------------------------------------------------------------
   2. Reveal elements as they scroll into view

   IntersectionObserver is built into the browser. You hand it a
   callback and a list of elements, and it tells you when those
   elements enter or leave the viewport, without running code on
   every scroll event, which is what makes it cheap.

   The CSS in style.css does the actual fading. All this does is
   add the .is-visible class at the right moment.
   ------------------------------------------------------------ */

var revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);   /* animate once, then stop watching */
      }
    });
  }, {
    threshold: 0.15,                /* fire when 15% of the element is showing */
    rootMargin: '0px 0px -60px 0px' /* ...but wait until it is 60px inside the fold */
  });

  revealItems.forEach(function (element) {
    observer.observe(element);
  });
} else {
  /* Very old browser: skip the animation and just show everything. */
  revealItems.forEach(function (element) {
    element.classList.add('is-visible');
  });
}
