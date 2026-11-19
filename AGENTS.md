# Instructions for AI assistants working in this repository

## What this project is

A personal site for hardware roles, built with Hugo (since 18 November
2026) and published by GitHub Actions to the gh-pages branch. It must stay
readable to someone who is learning front-end development. Optimise for
clarity, not cleverness.

## Hard constraints

* Hugo with plain HTML templates, plain CSS and vanilla JavaScript. No
  Hugo theme, no npm, no CSS framework, no JavaScript framework.
* Do not add a Hugo module, pipe or asset step for anything a static file
  can do. The CSS and JS are served as they are from `static/`.
* Content is data: papers, projects and contributions live in `data/*.yaml`
  and the templates loop over them. Do not write an entry into a template.
* Addresses keep the `.html` ending (`uglyURLs = true`), so every link
  between pages is relative and unchanged from the hand-written site.
* The blog in `_local/` is not built and not committed. Leave it alone.
* If a dependency seems genuinely necessary, ask first and explain why.

## Code style

1. Keep HTML semantic and readable: `header`, `main`, `section`, `article`,
   `footer`, real headings in order.
2. Meaningful class names (`.entry-title`, not `.pt-4 .text-lg`). No
   utility-class strings.
3. `static/css/style.css` is organised by section with a banner comment per
   section. Colour, type sizes and spacing come from the `:root` custom
   properties; each colour is written once as `light-dark(light, dark)`.
4. Keep JavaScript minimal; prefer CSS.
5. Do not modify files unrelated to the task.
6. The header and footer are partials; a change to one is a change to all
   pages.

## Visual direction

The layout is a plain academic home page, written by hand in
`static/css/style.css` without a framework: one 900px column; a header with the name "Ana Liu"
(2.5em), one role line, the email and a "GitHub / LinkedIn" link row on
the left and a 180px round portrait on the right; `h2` headings at 1.6rem
with a thin underline; project and open-source rows
(`.publication-with-teaser`) with a 180px thumbnail on the left when the
entry has a figure, then title, an italic context line, "/"-separated
links and a description of at most three sentences at 0.9em; plain bullet
lists for Publications (title, authors with the owner in bold, status
line, one-sentence summary), Education, Experience, Honors and Service;
a centred footer under a rule. Below 768px the header stacks with the
portrait first and the rows stack. Only the colours, the fonts and the
light/dark switch are this site's own; do not reintroduce section
numbers, bands, a navigation bar, the timeline or scroll animations.

Publications are a bullet list with no figures and no links until a paper
has a public link; the owner asked for this on 18 November 2026. The four
paper detail pages and the CMOS-inverter page in `content/projects/` are
kept as `draft: true` and not built. There is no CV link on the site.
About Me is one sentence plus a bullet list of courses (`cv.courses`),
each course linked to its SGS calendar page.

Palette: University of Toronto blue (`#002a5c`) for headings and links on
white, silver-white (`#f4f6f9`) for thumbnail plates, table stripes and
code; in dark mode a deep navy background with a lighter blue accent.
Colours come only from the `:root` tokens. The portrait keeps its original
colours. The light/dark button (fixed, top right) must keep working on
every page.

Type: Absans (Collletttivo, SIL Open Font License, self-hosted) for the
name, headings and entry titles; the operating system's interface font for
everything else, at 12pt. No other web fonts.

Figures are the owner's own: images from her papers, reports and slides in
`static/assets/projects/`. Never reuse figures from course handouts, other
people's papers or other websites. Every project row has a figure; an
entry without one simply has no thumbnail, and never a drawn placeholder.

## Animation policy

None beyond hover states (row background, thumbnail
lift) and the theme button's circular reveal. No reveal on scroll, no
reading-progress line, no view transitions between pages.

## Content policy

**Say nothing the owner has not verified.** Every claim and number comes
from her own records: her experience bank (a Notion page she maintains,
last used 18 November 2026), her CV, her reports and papers, and the
GitHub pages of her pull requests. If something is uncertain, leave it out
or label it.

Rules from the owner's experience bank:

* Work in progress says "in progress" in its meta line and reports only
  what has been measured. Never write "on-board", "deployed", "tapeout",
  "silicon" or "measured" for pre-silicon results; the CIM chip is "chip
  design".
* Papers under review show `Under review` with no venue name and no PDF,
  preprint or code link. GenPose is shown (the owner added it back on 18
  November 2026) with no venue, like the others. The about text says "Ana Liu (Kuan-Yu Liu on my
  papers)" so the author name can be matched; the owner's title is
  "MEng Student @ University of Toronto ECE" only. She takes part in a
  research project at LCRAIN (York University) but asked that it not
  appear as a title, role or project on the site, and the ECE1388 team
  chip is not listed either, nor the ECE1388 SRAM decoder and CMOS
  inverter projects; do not write "TSMC 65 nm" anywhere. Never write "accepted" until the owner has the
  notification. GenPose's old 95.83 AP25 figure must never return; the
  paper says 85.90.
* Open source lists only merged pull requests, with the merge date; the owner does not want open, draft or
  in-progress work on the site. Check the PR page itself on github.com
  before adding one (the REST API answered stale data for axi #455 on
  18 November 2026; the page showed it merged on 11 November). Merged as
  of 18 November 2026: axi #455, xls #5163, MONAI #9143, model-zoo #791
  and Code-a-Chip #215, which appears once, under Projects.
* AXI #455: the maintainers dropped the testbench, so write "validated with
  a local testbench", not "added a testbench". Every project has a figure
  the owner supplied; the convolution-engine figure (a Sobel illustration)
  was her choice on 18 November 2026. MONAI #9025 was never run on
  a GPU. The CPU and GPU baselines of the convolution engine were provided
  by the course. The PUF cell of the CIM chip is a teammate's; the owner
  ran Monte Carlo on it.
* The ECE1756 Lab 3 RAM-mapping tool is not on the site until the owner
  has rewritten it as her own and submitted the report.
* Only the honors listed in `data/cv.yaml`; there is no Dean's List. The
  NCKU EE Alumni Scholarship semesters are 2022 Spring, 2023 Fall, 2024
  Spring, 2024 Fall and 2025 Fall, as the owner gave them.

The site is aimed at hardware roles: lead with hardware, use precise
vocabulary (restricted Fmax, DRC/LVS, post-fit, three-corner signoff), and
never inflate a course project or an internship.

### Numbers already corrected (do not reintroduce the old wording)

* Localized certification: Spearman 0.9885 goes with a Jaccard churn of
  0.628, about 46% of the selected set replaced, not "more than 60%".
  R² 0.968 against 0.655 holds in the small-perturbation regime.
* Quantized routing: 20.9 MB to 5.3 MB is nominal weight storage. A Jaccard
  overlap of 0.371 means about 46% of the deferred inputs are replaced.
* Liver volumetry: the Dice starting point is unconfirmed (0.9167 or
  0.9238); the detail page keeps 0.9238 against the per-case oracle from
  the manuscript. Do not state the other value until the owner checks.
* WhereNext: the title ("…Checked Explanations") and author order follow
  the submitted PDF, not the experience bank.
