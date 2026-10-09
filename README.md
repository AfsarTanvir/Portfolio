# Afsar Tanvir · Portfolio

Personal site for **Afsar Tanvir**, a backend-focused full-stack engineer at AppifyLab and an applicant to MSc Computer Science programmes.

**Live:** https://afsartanvir.github.io/Portfolio/

The site has two reading paths:

- **Engineering:** experience, project case studies and a one-page résumé.
- **Academic:** education, research interests, competitive programming and an academic CV.

## Stack

- React 19, TypeScript, Vite, React Router
- Motion (Framer Motion) for page transitions, scroll reveals, layout animations and the self-drawing rating chart
- Tailwind CSS v4 with CSS-variable design tokens (light and dark themes)
- Fonts are self-hosted through Fontsource: Instrument Serif, Inter and JetBrains Mono

Animations respect `prefers-reduced-motion`. Project visuals are drawn in code, so cards download no images.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173/Portfolio/
npm run build     # type-check + production build into dist/
npm run preview   # serve dist/ locally
```

## Edit content

All text lives in [`src/data/`](src/data). Pages read from these files, so you rarely need to touch components.

| File | What it holds |
|---|---|
| `profile.ts` | Name, intro, availability line, links, headline stats, "Now" list, skills |
| `experience.ts` | Jobs and the filterable "Journey" timeline on About |
| `projects.ts` | Case studies (each becomes `/projects/<slug>`) and the archive table |
| `academics.ts` | Education, study goal, interests, contests and Codeforces history |
| `seo.ts` | Page titles and descriptions used for tabs and link previews |

Static files go in [`public/`](public): `images/` for the photo, `cv/` for the résumé PDFs and `og.png` for the social preview image.

## Deploy (GitHub Pages)

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes it.

One-time setup: in the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.

GitHub Pages has no fallback for single-page apps. The build therefore writes a real `index.html` for every route, with its own title and preview tags, plus a `404.html`, `sitemap.xml` and `robots.txt`. Deep links such as `/projects/mockflow/` load directly.

To serve the site from a user page (`AfsarTanvir.github.io`) or a custom domain, no code change is needed: the workflow reads the base path from GitHub Pages. For a manual build, set `BASE_PATH=/`.
