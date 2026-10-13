# OTIS Space website

Static website published through GitHub Pages at https://otisspace.com.

- `index.html`: company, product overview, team, and contact form.
- `products/orbitpilot/index.html`: OrbitPilot v0.1 ground-planning software, current features, and actual UI screenshots.
- `products/heatbank/index.html`: thermal-storage cartridges.
- `products/heatroute/index.html`: thermal switching and routing.
- `products/thermalcore/index.html`: integrated thermal assemblies.
- `products/orbitbench/index.html`: thermal test equipment and software.
- `assets/site.css` and `assets/site.js`: shared styles, navigation, and contact behavior.
- `assets/atmosphere.js`: decorative stars and pointer effects, with reduced-motion and touch support.
- `images/products/`: hardware concept renderings and OrbitPilot UI screenshots. The `*-cad-v1.webp` images are 1800 × 1800 pixels; `*-cad-v1-480.webp` files are 480px thumbnail variants. OrbitPilot uses `orbitpilot-ui-*-v1.webp` with 640px variants for smaller screens.
- `sitemap.xml`: public page URLs.

No build step or package installation is required. Serve the repository root with any static HTTP server to preview the site, for example `python -m http.server 8765`.

Each product page is a standalone HTML document. Keep shared navigation and footer links consistent when adding pages. Relative asset paths support direct visits to product URLs. Product contact links use `?product=ProductName#contact` to preselect the corresponding product on the home-page form.

Hardware visuals originate from editable native Autodesk Fusion geometry and are rendered in Fusion, then exported as WebP images for the site. Geometry and dimensions are illustrative and do not establish a finished product specification. OrbitPilot visuals are screenshots of the running v0.1 application using its synthetic demonstration mission; chart images are cropped from those screenshots without changing their content.

Hardware hero renderings remain labeled “CAD concept” and “In development.” OrbitPilot is labeled as a ground-planning prototype. Its synthetic results are software examples, not measured spacecraft performance. Screenshot links open the full-size images for inspection.

The contact form uses the existing Formspree endpoint. Do not send live submissions during automated checks. All products are in development; published specifications or performance claims require supporting validation.
