# 12yuuuu.github.io

Personal site for Ana Liu: hardware design, FPGA work, open-source
contributions and research papers. Built with [Hugo](https://gohugo.io/)
and published by GitHub Actions, with the same layout and setup as
jayinnn.dev (one column, name and portrait, publication rows with a
thumbnail, "/"-separated links) in this site's own colours and fonts.

## How it is put together

```
hugo.toml                 site settings (addresses keep their .html ending)
content/_index.md         the home page (its content lives in data/ and layouts/index.html)
content/projects/*.html   detail pages, written as HTML with a small front matter
data/publications.yaml    the publication list (a bullet list), one entry per paper
data/projects.yaml        the project list
data/opensource.yaml      pull requests and issues
data/cv.yaml              courses, education, honors, experience (bullet lists)
data/service.yaml         reviewing
layouts/_default/baseof.html   the page frame: head, header, footer
layouts/index.html        the home page, section by section
layouts/projects/single.html   a detail page plus previous/next
layouts/partials/         footer and one list row (entry.html)
static/css/style.css      all styles; colours and sizes are the :root tokens
static/js/main.js         the light/dark switch
static/assets/            fonts, portrait, figures from the owner's reports
.github/workflows/hugo.yml     builds with Hugo and publishes to the gh-pages branch
_local/                   kept on this computer only (the blog); ignored by git
```

The built site goes to `public/`, which is ignored by git: GitHub Actions
builds it on every push to `main` and publishes it to the `gh-pages`
branch. GitHub Pages must be set to serve from that branch
(Settings → Pages → Build and deployment → Source: Deploy from a branch →
`gh-pages`, `/ (root)`).

## Working on it

Install Hugo (extended, 0.167 or later) and run `hugo server` in this
folder; the site appears at http://localhost:1313/. `hugo` alone writes
the site to `public/`.

To add a paper, project or contribution, add an entry to the matching file
in `data/`: copy a neighbouring entry and change its title, meta line
(shown in italics under the authors), links, text and figure. The name,
role lines, email and links at the top of the page are in `hugo.toml`. Keep each entry to three sentences at most. Put
figures in `static/assets/projects/` (your own images from a paper, report
or slides, about 1,200 px wide). Add `hidden: true` to keep an entry out
of the page without deleting it.

Only a project that needs a long write-up gets a detail page: copy the
closest file in `content/projects/`, keep the front matter (`title`,
`short` for the previous/next links, `description`, `weight` for the
order) and link it from its entry with a `details` link. The four paper
pages and the CMOS-inverter page are marked `draft: true` and are not
built; remove that line to bring one back.

## Credits

Absans by Collletttivo, under the SIL Open Font License
(`static/assets/fonts/OFL.txt`). Everything else is the owner's own.
