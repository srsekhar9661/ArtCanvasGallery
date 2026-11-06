import { StaticRouter } from "react-router-dom";
import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "node:stream";
import App from "./App";

export function render(path) {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    let html = "";
    let failed = false;
    output.setEncoding("utf8");
    output.on("data", (chunk) => { html += chunk; });
    output.on("end", () => failed ? reject(new Error(`Render failed for ${path}`)) : resolve(html));
    const stream = renderToPipeableStream(<StaticRouter location={path}><App /></StaticRouter>, {
      onAllReady() { stream.pipe(output); },
      onError(error) { failed = true; console.error(error); },
    });
  });
}
