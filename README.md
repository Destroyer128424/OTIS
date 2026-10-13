# OTIS Space website

Static website published through GitHub Pages at https://otisspace.com.

- `index.html`: company, product overview, team, and contact form.
- `products/orbitpilot/index.html`: workload-control software.
- `products/heatbank/index.html`: thermal-storage cartridges.
- `products/heatroute/index.html`: thermal switching and routing.
- `products/thermalcore/index.html`: integrated thermal assemblies.
- `products/orbitbench/index.html`: thermal test equipment and software.
- `assets/site.css` and `assets/site.js`: shared styles, navigation, and contact behavior.
- `sitemap.xml`: public page URLs.

No build step or package installation is required. Serve the repository root with any static HTTP server to preview the site, for example `python -m http.server 8765`.

Each product page is a standalone HTML document. Keep shared navigation and footer links consistent when adding pages. Relative asset paths support direct visits to product URLs. Product contact links use `?product=ProductName#contact` to preselect the corresponding product on the home-page form.

The contact form uses the existing Formspree endpoint. Do not send live submissions during automated checks. All products are in development; published specifications or performance claims require supporting validation.
