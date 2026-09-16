# Instructions for AI assistants working in this repository

## What this project is

A small personal research portfolio. It must stay readable to someone who is
learning front-end development. Optimise for clarity, not cleverness.

## Hard constraints

* Semantic HTML, plain CSS, vanilla JavaScript. Nothing else.
* Do **not** introduce React, Next.js, Vue, Tailwind, Bootstrap, jQuery,
  GSAP, Framer Motion, build tools, or any npm dependency.
* Do not add a dependency for anything that a few lines of HTML/CSS/JS can do.
* If a dependency seems genuinely necessary, ask first and explain why.

## Code style

1. Keep HTML semantic and readable, `header`, `main`, `section`, `article`,
   `footer`, real headings in order.
2. Use meaningful class names (`.project-title`, not `.pt-4 .text-lg`).
3. No utility-class strings.
4. Keep `css/style.css` organised by page section, in the same order as the
   HTML, with a banner comment per section.
5. Colour, type sizes and spacing come from the `:root` custom properties.
   Do not hard-code new values without adding them there first.
6. Avoid deep nesting and premature abstraction.
7. Keep JavaScript minimal. Prefer a CSS solution when one exists.
8. Do not modify files unrelated to the task.
9. Optimise for readability, not the fewest lines.

## Visual direction

Restrained academic portfolio: strong typography, generous whitespace, clear
hierarchy, strong project imagery.

Avoid: heavy rounded cards, gradients, glows, shadows, many colours,
decorative icons, dense layouts, generic SaaS landing-page aesthetics.

## Animation policy

Restrained. What exists today:

* hover states on links,
* one scroll-reveal on the experience timeline, built on the browser's own
  `IntersectionObserver` in `js/main.js`.

Never add a scroll-animation library. Any new motion must be scoped to the
`.js` class so the content is still visible without JavaScript, and must be
switched off under `prefers-reduced-motion: reduce`.

## Content policy

Do not invent research descriptions, publication venues, affiliations, links
or contact details. Placeholder text must be visibly marked as a placeholder
and confirmed by the site owner before it ships.

### Papers under review (important)

Several projects on this site are unpublished manuscripts under review.

* For **double-blind** venues (currently the liver volumetry paper and the
  multi-view pose manuscript): show the title and `Under review` only. Do
  **not** name the venue, and do **not** link a PDF, preprint or repository.
* For **single-blind** venues, where the submission already carries the
  authors' names (currently ICASSP and Measurement): naming the venue is fine.
* Never add a Paper / Code / Demo link for a manuscript that is still under
  review unless the site owner confirms the venue permits it.

Descriptions must stay faithful to the manuscripts. Do not round, restate or
improve reported numbers.

## Explaining changes

Before editing a file, briefly state what the file does, what is changing and
why. After a meaningful section is built, explain the important code plainly.
Briefly explain any new HTML/CSS/JS concept introduced. Keep it short.
