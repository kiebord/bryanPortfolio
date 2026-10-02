# Bryan Andrade Portfolio

Dark red student portfolio. Next.js App Router, TypeScript, Tailwind CSS v3, Lucide React. No backend.

## Run

```
npm install
npm run dev
```

Open http://localhost:3000

Production:

```
npm run build
npm start
```

## Edit content

All text lives in one file: `lib/content.ts`

- Name, course, year level, email, tagline: `site`
- Hero stats: `stats`
- Projects and their filter categories: `projects`
- Bio, skills, education timeline: `about`
- Gallery items and categories: `gallery`

A project or gallery item can have more than one category. Keep every category used by at least one item so no filter is empty.

## Edit colors

`tailwind.config.ts`, under `theme.extend.colors`. The red accent is `accent`.
Outline text color is set in `app/globals.css` (`.text-outline`).

## Images

All images are local SVG files in `public/images`. No remote URLs.
To regenerate them after changing the palette in `scripts/generate-images.mjs`:

```
npm run images
```

To use a real photo, drop a file into `public/images` and change the `image` path in `lib/content.ts`. The portrait path is set in `app/about/page.tsx`.

## Structure

```
app/            pages: / , /portfolio , /about , /gallery
components/     Header, Footer, PageIntro, FilterBar, ProjectCard, PortfolioGrid, GalleryGrid
lib/content.ts  all editable content
scripts/        SVG image generator
public/images/  generated SVG images
```

Contact links use `mailto:`. Change the email in `lib/content.ts`.
