import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { publicRoutes } from "../src/data/seo.js";

const dist = path.resolve("dist");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8",
};

createServer(async (request, response) => {
  const url = new URL(request.url || "/", "http://localhost");
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { response.writeHead(400); response.end(); return; }
  const route = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const isPublicRoute = publicRoutes.includes(route);
  const file = isPublicRoute ? (route === "/" ? "index.html" : `${route.slice(1)}/index.html`)
    : path.extname(pathname) ? pathname.slice(1) : "404.html";
  const target = path.resolve(dist, file);
  if (!target.startsWith(dist + path.sep) && target !== path.join(dist, "index.html")) {
    response.writeHead(404); response.end(); return;
  }
  try {
    if (!(await stat(target)).isFile()) throw new Error("Not a file");
    response.writeHead(isPublicRoute || path.extname(pathname) ? 200 : 404, {
      "Content-Type": types[path.extname(target)] || "application/octet-stream",
    });
    if (request.method === "HEAD") response.end();
    else response.end(await readFile(target));
  } catch {
    response.writeHead(404); response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Prerendered preview: http://127.0.0.1:${port}`));
