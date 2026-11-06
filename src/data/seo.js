import services from "./services.js";
import paintings from "./paintings.js";

export const SITE_URL = "https://directionalworks.netlify.app";
export const publicRoutes = [
  "/", "/about", "/services", ...services.map((service) => `/services/${service.slug}`),
  "/gallery", ...paintings.map((painting) => `/gallery/${painting.id}`),
  "/collaborations", "/contact", "/privacy", "/terms",
];

const pages = {
  "/": ["Directional Works | Creative Art, Growth & Collaboration", "Discover original paintings, creative mentoring, workshops, design and collaboration at Directional Works with Praveen S."],
  "/gallery": ["Original Paintings | Directional Works", "Browse 13 original paintings by Praveen S. at Directional Works."],
  "/about": ["About Directional Works & Praveen S.", "Meet Praveen S. and discover the creative, growth and collaboration approach behind Directional Works."],
  "/services": ["Creative Services | Directional Works", "Explore creative workshops, art, mentoring, branding and collaboration enquiries at Directional Works."],
  "/collaborations": ["Creative Collaborations | Directional Works", "Discuss workshops, design ideas, events and creative collaborations with Directional Works."],
  "/contact": ["Contact Directional Works | WhatsApp & Email", "Contact Praveen S. at Directional Works on WhatsApp or by email. By appointment only."],
  "/privacy": ["Privacy Policy | Directional Works", "How Directional Works handles contact enquiries and optional website analytics."],
  "/terms": ["Website Terms | Directional Works", "Information about original artwork, catalogue enquiries and use of the Directional Works website."],
};

export function getPageSeo(rawPath) {
  const path = rawPath === "/" ? "/" : rawPath.replace(/\/$/, "");
  const service = services.find((item) => `/services/${item.slug}` === path);
  const artwork = paintings.find((item) => `/gallery/${item.id}` === path);
  const found = !!pages[path] || !!service || !!artwork;
  const [title, description] = pages[path] || (service
    ? [`${service.title} | Directional Works`, service.summary]
    : artwork ? [`Work ${artwork.id} | Directional Works`, `View original painting work ${artwork.id} by Praveen S. at Directional Works.`]
      : ["Page Not Found | Directional Works", "Explore Directional Works by Praveen S."]);
  const canonical = found ? `${SITE_URL}${path}` : null;
  const schema = path === "/" ? [
    { "@context": "https://schema.org", "@type": "WebSite", name: "Directional Works", url: SITE_URL },
    { "@context": "https://schema.org", "@type": "Organization", name: "Directional Works", url: SITE_URL, email: "worksdirectional@gmail.com", telephone: "+919966966881" },
  ] : path === "/about" ? [
    { "@context": "https://schema.org", "@type": "Person", name: "Praveen S.", url: `${SITE_URL}/about`, description: "Fine artist and visual effects professional" },
  ] : service ? [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: canonical },
    ] },
  ] : [];
  return { path, found, title, description, canonical, schema };
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

export function renderSeoHead(path) {
  const seo = getPageSeo(path);
  const text = (name, value, property = false) => `<meta ${property ? "property" : "name"}="${name}" content="${escapeHtml(value)}" />`;
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    text("description", seo.description), text("robots", seo.found ? "index,follow" : "noindex,follow"),
    ...(seo.canonical ? [`<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`] : []),
    text("og:type", "website", true), text("og:title", seo.title, true),
    text("og:description", seo.description, true), text("og:url", seo.canonical || SITE_URL, true),
    text("og:image", `${SITE_URL}/images/directional-works-logo-transparent.png`, true),
    text("og:image:width", "1024", true), text("og:image:height", "1024", true),
    text("og:image:alt", "Directional Works official logo, Creative and Growth", true),
    text("twitter:card", "summary_large_image"),
    text("twitter:image", `${SITE_URL}/images/directional-works-logo-transparent.png`),
    text("twitter:title", seo.title),
    text("twitter:description", seo.description),
    ...seo.schema.map((item) => `<script type="application/ld+json" data-schema>${JSON.stringify(item).replace(/</g, "\\u003c")}</script>`),
  ].join("\n    ");
}
