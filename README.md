# OTIS Space website

Static website published through GitHub Pages at https://otisspace.com.

- `index.html`: company, product overview, team, and contact form.
- `products/orbitpilot/index.html`: workload-control software.
- `products/heatbank/index.html`: thermal-storage cartridges.
- `products/heatroute/index.html`: thermal switching and routing.
- `products/thermalcore/index.html`: integrated thermal assemblies.
- `products/orbitbench/index.html`: thermal test equipment and software.
- `assets/site.css` and `assets/site.js`: shared styles, navigation, and contact behavior.
- `assets/atmosphere.js`: decorative stars and pointer effects, with reduced-motion and touch support.
- `images/products/`: Fusion CAD concept renderings for the five products. The `*-cad-v1.webp` images are 1800 × 1800 pixels; `*-cad-v1-480.webp` files are 480px thumbnail variants.
- `sitemap.xml`: public page URLs.

No build step or package installation is required. Serve the repository root with any static HTTP server to preview the site, for example `python -m http.server 8765`.

Each product page is a standalone HTML document. Keep shared navigation and footer links consistent when adding pages. Relative asset paths support direct visits to product URLs. Product contact links use `?product=ProductName#contact` to preselect the corresponding product on the home-page form.

Product visuals originate from editable native Autodesk Fusion geometry and are rendered in Fusion, then exported as WebP images for the site. OrbitPilot is a modeled interface composition representing software; the other four visuals are hardware design concepts. Geometry, dimensions, and interface details are illustrative and do not establish a finished product specification.

Hero renderings are labeled “CAD concept” or “Interface concept” and “In development.” The product system diagrams remain in the Design scope section. Keep these labels when replacing concept assets with later design iterations.

The contact form uses the existing Formspree endpoint. Do not send live submissions during automated checks. All products are in development; published specifications or performance claims require supporting validation.
