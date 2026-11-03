# Orbit Technologies website

Built with Next.js and exported as a static site.

## Local development

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

The static site is generated in `out/`. Configure the hosting provider and any
required base path for the destination repository or deployment environment.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys the site when
changes are pushed to `main`. Set **Settings → Pages → Build and deployment →
Source** to **GitHub Actions**. The site will then be available at
<https://adityapandey7.github.io/orbitnewwebsite/>.

The quote form is currently a front-end demo and does not send or store
submissions.
