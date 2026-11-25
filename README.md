# RONGXIN International Trading Company Limited — V5.1.0

Premium responsive corporate website for an apparel sourcing and trading company. The site is a static, no-backend HTML/CSS/Vanilla JavaScript application with a small local rendering runtime.

## What is included
- Adaptive header: one clustered navigation row when it fits; accessible compact menu when it does not.
- Hero, company overview, product range, services, capabilities, supply network, quality workflow, markets, responsible sourcing, buyer resources, FAQ, reasons to work with Rongxin, inquiry CTA and contact.
- Six product cards with category-matched local photography.
- Fully local image registry: bundled WebP → bundled SVG fallback. No remote image CDN is requested.
- Local PC-only Admin utilities for navigation and product-category visibility in `admin/`.
- Local glyph icons and system fonts; no icon CDN or web-font CDN is requested.
- Print stylesheet, responsive layouts, skip link, keyboard focus styles and reduced-motion support.

## Run locally
Use Python 3:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/` from this folder. Do not open `index.html` through `file://` because JSON settings are loaded with `fetch()`.

## Repeatable QA
Requires Node.js and Python 3, no npm dependencies:

```bash
node qa-check.mjs
```

The check validates every JavaScript file's syntax, all JSON files, every registered local image, required page section IDs, key product image mappings, and the private Admin folder boundary.

## Product categories
- Open `admin/product-category-control.html` on the local PC.
- Enable or disable DENIM, WOVEN, SHIRTS, KNIT, LADIES and KIDS.
- Download `product-categories.json` and upload it beside `index.html` in the public website root.
- The public site has no category filter bar; only enabled product cards are shown.
- If the public category JSON is missing or invalid, all categories remain visible by default.

## Navigation management
- Open `admin/navigation-control.html` locally.
- Export `navigation.json` and upload it beside `index.html` in the public website root.
- Home remains enabled. If the file is unavailable, all known navigation links remain visible.

## Deployment
1. Run `node qa-check.mjs` and confirm it reports PASS.
2. Keep the public root files, all root WebP/SVG assets, `navigation.json`, `product-categories.json`, and `Rongxin-Company-Profile.pdf`.
3. Do **not** upload the private `admin/` folder. Keep it on the PC.
4. Upload the contents of this folder to the hosting document root so `index.html` is at the root.
5. Enable HTTPS at the hosting provider and verify the live domain after deployment.

`.gitignore` excludes `/admin/` for new untracked files. If Admin files were already committed, untrack them separately before pushing.

## Image and content accuracy
The bundled photography is illustrative editorial imagery created for this design; it is not a claim that the pictured people, studio, factory or logistics facility belong to Rongxin. Replace it with company-owned or properly licensed photography when available. No certification, audit status, factory capacity, client relationship or delivery guarantee is claimed unless separately verified.

## Inquiry form limitation
The inquiry form prepares an email using the visitor's configured email application (`mailto:info@rongxinbd.com`). It does not submit to a server, store enquiries, or guarantee delivery. A hosted enquiry workflow requires a separately configured and tested form service/backend.

## Release details
See `VERSION.txt` and `CHANGELOG.md`.

## Offline media and CDN independence
All 12 active photo slots are stored as WebP files in the website root. Local SVG fallback illustrations, logos, CSS, JavaScript runtime and page modules are also bundled. Icons are rendered by local JavaScript glyphs. Typography uses system font stacks. The page does not request images, icon packs, stylesheets, scripts or fonts from external CDNs. The canonical Rongxin website URL and contact link remain normal website links.
