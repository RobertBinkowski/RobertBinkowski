# Robert Binkowski — Portfolio

[![Deploy to GitHub Pages](https://github.com/RobertBinkowski/RobertBinkowski/actions/workflows/deploy.yml/badge.svg)](https://github.com/RobertBinkowski/RobertBinkowski/actions/workflows/deploy.yml)
[![Lighthouse CI](https://github.com/RobertBinkowski/RobertBinkowski/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/RobertBinkowski/RobertBinkowski/actions/workflows/lighthouse.yml)

Hi, I'm **Robert Binkowski** — a software developer specialising in web development, currently working as a Software Engineer in Dublin, Ireland. I work mostly with PHP (Laravel/Symfony) on the backend and Vue on the frontend.

This repository is the source code for my personal portfolio website, built as a single-page Vue app and deployed to GitHub Pages.

**Live site: [robertbinkowski.me](https://robertbinkowski.me/)**

## What's on the site

- **Welcome** — animated landing section with my current role
- **Skills** — the languages, frameworks, and tooling I work with day to day
- **Timeline** — my work experience and education, rendered as a git-style branch graph
- **Contact** — where to find me (LinkedIn, GitHub)

## Tech stack

- [Vue 3](https://vuejs.org/) with [Vue Router](https://router.vuejs.org/)
- [Vite](https://vite.dev/) for dev server and builds
- SCSS for styling
- ESLint + Prettier for code quality
- GitHub Actions for CI/CD (deploy + Lighthouse audits)

## Running locally

Requires Node `^20.19.0 || >=22.12.0`.

```sh
npm install
npm run dev      # start the dev server
npm run build    # production build to ./dist
npm run preview  # preview the production build
npm run lint     # lint and auto-fix
npm run lhci     # run Lighthouse CI locally
```

## Deployment

Every push to `main` triggers the [deploy workflow](.github/workflows/deploy.yml), which builds the site and publishes it to GitHub Pages. A separate [Lighthouse workflow](.github/workflows/lighthouse.yml) audits performance, accessibility, and SEO on each build.

## License

The content of this site is licensed under [CC BY-NC-ND 4.0](http://creativecommons.org/licenses/by-nc-nd/4.0/).
