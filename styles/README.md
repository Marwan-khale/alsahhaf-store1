# styles/

Global stylesheet lives at `app/globals.css` (Next.js App Router convention),
which imports the files in this folder:

- `typography.css` — type scale utility classes (`.text-display`, `.text-h1`, ...)
- `spacing.css` — semantic spacing custom properties for section/card rhythm
- `shadows.css` — brand-tinted shadow scale (`.shadow-brand-sm/md/lg`)
- `animations.css` — the small set of keyframes not already covered by the
  `tailwindcss-animate` plugin (which handles Radix component transitions)
