# 12yuuuu.github.io

Personal research portfolio for Ana Liu, reliable and efficient machine
learning systems.

Static site: semantic HTML, plain CSS, vanilla JavaScript. No build step,
no framework, no dependencies. Deployed by GitHub Pages from `main`.

## Structure

```
index.html            single page: hero, research, experience, about
css/style.css         all styles, organised by page section
js/main.js            mobile navigation toggle, scroll reveal
assets/profile/       portrait / profile imagery
assets/projects/      project figures
```

## Working on it locally

Open `index.html` in a browser, or serve the folder to avoid `file://` quirks:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Deploying

Commit and push to `main`. GitHub Pages publishes the repository root.

## Still to add

* A CV. Nothing links to one yet; when it exists, drop it at `assets/cv.pdf`
  and add the link to the nav and the footer.
* Project figures, if they are wanted later. Research entries are currently
  text only; `assets/projects/` is empty and holds them when they arrive.

## Conventions

* Design tokens (colour, type scale, spacing) live at the top of
  `css/style.css` under `:root`. Change values there, not inline.
* Research, Experience and About all share one `.page-section` grid: a label
  column on the left, content on the right.
* See `AGENTS.md` for the rules AI assistants should follow in this repo.
