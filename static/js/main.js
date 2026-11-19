/* ------------------------------------------------------------
   Light and dark theme

   The colours live in css/style.css. This only sets
   data-theme="light" or "dark" on <html> and remembers the choice in
   localStorage, a small key-value store the browser keeps per
   website. The script in each page's <head> reads it back before the
   page is drawn, so the next page opens in the same theme.

   Until the visitor presses the button there is no data-theme at
   all, and the site follows the operating system.
   ------------------------------------------------------------ */

var root = document.documentElement;
var prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
var themeButton = document.querySelector('.theme-toggle');
var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function currentTheme() {
  if (root.dataset.theme) {
    return root.dataset.theme;
  }
  return systemPrefersDark.matches ? 'dark' : 'light';
}

/* aria-pressed="true" tells screen readers dark mode is on. The CSS
   uses the same attribute to swap the moon icon for the sun. */
function updateThemeButton() {
  if (themeButton) {
    themeButton.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
  }
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    /* Storage can be blocked (some private windows). The theme still
       changes; it just won't be remembered on the next page. */
  }
  updateThemeButton();
}

function switchTheme() {
  var nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';

  /* document.startViewTransition takes a picture of the page, runs
     the change, then animates from the picture to the new page.
     Browsers without it, and visitors who ask for less motion, get
     the change instantly. */
  if (!document.startViewTransition || prefersLessMotion.matches) {
    applyTheme(nextTheme);
    return;
  }

  /* The new colours spread out in a circle from the button, growing
     until the circle reaches the farthest corner. */
  var box = themeButton.getBoundingClientRect();
  var x = box.left + box.width / 2;
  var y = box.top + box.height / 2;
  var radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  root.classList.add('is-switching-theme');

  var transition = document.startViewTransition(function () {
    applyTheme(nextTheme);
  });

  transition.ready.then(function () {
    root.animate(
      {
        clipPath: [
          'circle(0px at ' + x + 'px ' + y + 'px)',
          'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'
        ]
      },
      {
        duration: 600,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        pseudoElement: '::view-transition-new(root)'
      }
    );
  }).catch(function () {
    /* The animation was skipped; the theme has still changed. */
  });

  transition.finished.finally(function () {
    root.classList.remove('is-switching-theme');
  });
}

if (themeButton) {
  updateThemeButton();
  themeButton.addEventListener('click', switchTheme);
  systemPrefersDark.addEventListener('change', updateThemeButton);
}

/* The back button can show a page straight from memory, exactly as
   it was left. Re-apply the saved theme when that happens. */
window.addEventListener('pageshow', function (event) {
  if (!event.persisted) {
    return;
  }
  try {
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      root.dataset.theme = savedTheme;
    }
  } catch (error) {
    /* Nothing saved or storage blocked: keep what is on screen. */
  }
  updateThemeButton();
});
