# myportfolio

Personal site — [nolimitwaiz.github.io/myportfolio](https://nolimitwaiz.github.io/myportfolio/)

Built with Vite + React. One page; all text lives in `app/src/content.js`. Source lives in `app/`; GitHub Pages serves the built files at the repo root.

## Develop

```bash
cd app
npm install
npm run dev
```

## Deploy

```bash
cd app
npm run deploy:root   # builds and copies dist/ to the repo root (+ 404.html SPA fallback)
```

Then commit and push.
