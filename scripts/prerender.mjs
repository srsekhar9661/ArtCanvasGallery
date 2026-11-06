import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { render } from "../dist-ssr/entry-server.js";
import { publicRoutes, renderSeoHead, SITE_URL } from "../src/data/seo.js";

const dist = path.resolve("dist");
const template = await readFile(path.join(dist, "index.html"), "utf8");
const shell = template.replace(/<!--page-head-start-->[\s\S]*?<!--page-head-end-->/, renderSeoHead("/not-found"));
await writeFile(path.join(dist, "spa.html"), shell);
for (const route of publicRoutes) {
  const markup = await render(route);
  const output = template
    .replace(/<!--page-head-start-->[\s\S]*?<!--page-head-end-->/, renderSeoHead(route))
    .replace('<div id="root"></div>', `<div id="root" data-prerendered>${markup}</div>`);
  const destination = route === "/" ? path.join(dist, "index.html") : path.join(dist, route.slice(1), "index.html");
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, output);
}
const missing = template
  .replace(/<!--page-head-start-->[\s\S]*?<!--page-head-end-->/, renderSeoHead("/not-found"))
  .replace('<div id="root"></div>', `<div id="root" data-prerendered>${await render("/not-found")}</div>`);
await writeFile(path.join(dist, "404.html"), missing);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicRoutes.map((route) => `  <url><loc>${SITE_URL}${route}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);
const redirects = [
  ...publicRoutes.filter((route) => route !== "/").flatMap((route) => [
    `${route}/ ${route} 301!`,
    `${route} /${route.slice(1)}/index.html 200!`,
  ]),
  "/* /spa.html 404",
].join("\n") + "\n";
await writeFile(path.join(dist, "_redirects"), redirects);
console.log(`Prerendered ${publicRoutes.length} public routes and a 404 document.`);
