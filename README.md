# Revival Revolutions — Website Source

This is the full source for the Revival Revolutions website. It's a plain static site: HTML, CSS and a single JavaScript file. There's no build step, framework or install.

## Viewing it locally

Open `index.html` in a browser. The hero video and a few other features work better through a local server, so if you can, run this from inside the folder:

```
python3 -m http.server 8000
```

Then go to http://localhost:8000

## What's in the folder

| File | What it is |
|---|---|
| `index.html` | Home page |
| `project-97.html` | Project 97 (BMW E36), the lead concept |
| `v8-coupe.html` | The V8 Coupé |
| `v12-grand-tourer.html` | The V12 Grand Tourer |
| `gt1-road-car.html` | The GT1 Road Car |
| `approach.html` | The plan |
| `bespoke.html` | Your idea (bespoke commissions) |
| `contact.html` | Contact page and enquiry form |
| `credits.html` | Notes and credits |
| `base.css` | Reset and base styles |
| `style.css` | All site design: layout, colours, type, animation |
| `app.js` | Menu, race clock, galleries, contact form behaviour |
| `favicon.svg` | Browser tab icon |
| `assets/` | Images (`.webp`) and the hero video (`hero.mp4`) |

## Editing notes

- Text lives directly in each HTML page. The header, menu and footer are repeated on every page, so a change there has to be made on each page.
- Fonts are loaded from Fontshare (Panchang, Switzer) and Google Fonts (DM Mono, Yesteryear), so an internet connection is needed for them to show.
- The contact form doesn't use a server. It opens the visitor's email app with a message addressed to alvarohachuelm@gmail.com.
- To swap an image, replace the file in `assets/` with one of the same name, or update the path in the HTML.

## Publishing on GitHub Pages

1. Create a new repository on GitHub, for example `revival-revolutions`.
2. Upload everything in this folder to the root of the repository, including the hidden `.nojekyll` file. You can drag and drop the files on the repository page (Add file → Upload files) or push them with git. The hero video is about 5 MB, well under GitHub's 25 MB browser upload limit.
3. Go to Settings → Pages. Under "Build and deployment", set Source to "Deploy from a branch", choose `main` and `/ (root)`, then save.
4. After a minute or two the site will be live at `https://<your-username>.github.io/revival-revolutions/`.
5. To share editing, add people under Settings → Collaborators. Every change pushed to `main` republishes the site automatically.

All links in the site are relative (`./page.html`), so it works from a GitHub Pages subfolder without any changes. To use your own domain, add it under Settings → Pages → Custom domain.

## Other hosts

Any static host will work. Upload the folder as it is to Netlify, Vercel, GitHub Pages, Cloudflare Pages or similar. `index.html` is the entry page.

Everything on the site is concept work. Revival Revolutions isn't affiliated with BMW AG, Aston Martin Lagonda or McLaren Automotive.
