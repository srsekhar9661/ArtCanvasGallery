# Directional Works implementation notes

The 13 original gallery paintings live in `public/images/`. Their original paths,
IDs and display order are recorded in `artwork-order-baseline.txt`; the baseline
SHA-256 digests (including the artist portrait) are in `artwork-baseline.sha256`.
Run `sha256sum -c artwork-baseline.sha256` to verify the source files. Do not edit
or replace these assets.

The homepage uses five cinematic CSS/SVG slide visuals. Slide one is a separate
decorative canvas-and-brush animation; it contains none of the original paintings.
Artwork titles, dates, mediums, dimensions, prices and availability have not been
provided; the UI uses neutral work numbers rather than inferring metadata.
The approved owner-supplied JPEG is copied unchanged to
`public/images/directional-works-logo.jpg` (SHA-256
`347a6034a044df59dadfad9a81b91758044d5ad816e2d6e758b819bf196aa57e`).
A separate RGBA PNG with its near-white background made transparent is used
for the navbar, footer, favicon and social image. The original JPEG is retained
unchanged; transparency cannot be stored in a JPEG.

The previous contact form discarded messages but claimed success. The owner has
now supplied `+91 9966966881` (WhatsApp), `worksdirectional@gmail.com` and
appointment-only operating information. The new enquiry form validates input and
opens a prefilled WhatsApp or email draft; it **does not** submit or store messages.
The visitor must review and send the draft in their chosen app. There is no
backend and no on-site delivery confirmation.

The 12 catalogue entries and their source order live in `src/data/services.js`.
The screenshots' underlying service image files are not present locally, so
non-art services use typographic cards. Catalogue titles truncated in the supplied
text are conservatively labelled; qualifications, precise scopes, examples, prices
and availability still need owner review. In particular, workshop health language,
recruitment and investment topics must not be expanded without appropriate
verification and compliance review. No medical, job-placement or financial
service is offered through this site.

No verified social profiles or exhibition entries are available; the empty
Exhibitions component remains unlinked. Production builds prerender 33 genuine
routes with route-specific HTML, canonical, Open Graph, Twitter, and conservative
structured data. `scripts/prerender.mjs` generates sitemap and Netlify rewrites.
`npm run preview` serves prerendered routes locally. Search Console still needs
owner-side verification; no verification token is present in the repository.

## GA4 activation

Analytics is **disabled** without an owner-created Directional Works GA4 property.
Do not reuse a Measurement ID from another business. To enable on the real
production domain only, create a GA4 web data stream and set
`VITE_ANALYTICS_ENABLED=true` and `VITE_GA_MEASUREMENT_ID=G-...` in the deployment
build environment. Vite embeds these public configuration values in the bundle;
never use secret credentials here. Verify the property, deployment URL and
consent behavior in a browser before declaring tracking live. Disable automatic
page-view collection in GA4 Enhanced Measurement: the app sends consent-gated
SPA page views itself (`send_page_view: false` is also set at configuration).
The footer's Analytics preferences control can withdraw permission. DNT and
GPC block analytics even after an earlier Allow; local development and previews
never load GA4. No `generate_lead` event is emitted because enquiry drafts are
not confirmed submissions. Review the `/privacy` page before publication.
## Development

This is a React, JavaScript, Vite and React Router application.

```sh
npm install
npm run dev
npm run lint
npm test
npm run build
npm run preview
```

Routes: `/`, `/about`, `/services`, `/services/:slug`, `/gallery`,
`/gallery/:id`, `/collaborations`, `/contact`, `/privacy`, `/terms`.
Gallery cards, home previews and artwork details use the same immutable
`src/data/paintings.js` references. The production build generates redirects
from `src/data/seo.js`; unknown paths return an unindexed 404 shell.
