# HTTPS Deployment Options

This project currently runs locally at:

```text
http://127.0.0.1:4173/
```

That address is only available on this computer and is not a public trusted HTTPS site.

Good ways to get a real HTTPS address:

## Option 1: Netlify

1. Create a Netlify account.
2. Drag this project folder into Netlify's deploy area, or connect a Git repository.
3. Netlify gives the site a public `https://...netlify.app` address automatically.

## Option 2: Vercel

1. Create a Vercel account.
2. Import this project as a static site.
3. Vercel gives the site a public `https://...vercel.app` address automatically.

## Option 3: GitHub Pages

1. Put these files in a GitHub repository.
2. Enable GitHub Pages for the repository.
3. GitHub gives the site a public `https://...github.io/...` address.

## What To Upload

Upload these files and folders:

```text
assets/
index.html
profiles.html
features.html
admin.html
styles.css
profiles.css
features.css
admin.css
script.js
profiles.js
features.js
admin.js
```

The local `server.cjs` file is useful for previewing on this computer, but most static hosts do not need it.
