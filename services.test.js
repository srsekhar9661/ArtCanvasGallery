import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import services, { serviceCategories } from "./src/data/services.js";
import paintings from "./src/data/paintings.js";
import { businessEmail, whatsappUrl } from "./src/utils/enquiry.js";
import { heroSlides, SLIDE_DURATION } from "./src/data/heroSlides.js";
import { getPageSeo, publicRoutes, renderSeoHead } from "./src/data/seo.js";
import { safePath, validMeasurementId } from "./src/lib/analytics.js";

test("catalogue keeps twelve distinct offerings in source order and valid categories", () => {
  assert.equal(services.length, 12);
  assert.equal(new Set(services.map((item) => item.slug)).size, 12);
  assert.deepEqual(services.map((item) => item.displayOrder), Array.from({ length: 12 }, (_, index) => index + 1));
  for (const item of services) assert.ok(serviceCategories.includes(item.category));
});

test("each service enquiry targets the verified WhatsApp number with its title", () => {
  for (const item of services) {
    const url = new URL(whatsappUrl(item.title));
    assert.equal(url.hostname, "wa.me");
    assert.equal(url.pathname, "/919966966881");
    assert.ok(url.searchParams.get("text").includes(item.title));
  }
  assert.equal(businessEmail, "worksdirectional@gmail.com");
});

test("original gallery assets and their ID/image order match the baseline", () => {
  const baseline = readFileSync(new URL("./artwork-baseline.sha256", import.meta.url), "utf8").trim().split("\n");
  for (const entry of baseline) {
    const [, expected, path] = entry.match(/^([0-9a-f]{64}) \*?(public\/images\/.+)$/);
    const actual = createHash("sha256").update(readFileSync(new URL(`./${path}`, import.meta.url))).digest("hex");
    assert.equal(actual, expected, path);
  }
  const snapshot = readFileSync(new URL("./artwork-order-baseline.txt", import.meta.url), "utf8");
  const mapping = [...snapshot.matchAll(/id\s*:\s*(\d+),\s*image\s*:\s*"([^"]+)"/g)]
    .map((match) => ({ id: Number(match[1]), image: match[2] }));
  assert.deepEqual(paintings, mapping);
});

test("five decorative hero slides have working local destinations and no gallery artwork imagery", () => {
  assert.equal(heroSlides.length, 5);
  assert.equal(SLIDE_DURATION, 5000);
  assert.equal(new Set(heroSlides.map((slide) => slide.id)).size, 5);
  for (const slide of heroSlides) {
    assert.ok(slide.title && slide.description && slide.primary.label && slide.secondary.label);
    assert.ok(publicRoutes.includes(slide.primary.to));
    if (slide.secondary.to) assert.ok(publicRoutes.includes(slide.secondary.to));
    assert.equal("image" in slide, false);
  }
});

test("all public routes have unique prerenderable metadata and safe canonical URLs", () => {
  assert.equal(new Set(publicRoutes).size, publicRoutes.length);
  for (const route of publicRoutes) {
    const seo = getPageSeo(route);
    assert.equal(seo.found, true);
    assert.equal(seo.canonical, `https://directionalworks.netlify.app${route}`);
    assert.ok(seo.title.includes("Directional Works"));
    const head = renderSeoHead(route);
    assert.ok(head.includes('content="index,follow"'));
    assert.ok(head.includes("directional-works-logo-transparent.png"));
  }
  assert.equal(getPageSeo("/unpublished").found, false);
  assert.ok(renderSeoHead("/unpublished").includes('content="noindex,follow"'));
  assert.equal(safePath("/services/unknown?email=visitor"), "/404");
  assert.equal(safePath("/gallery/1"), "/gallery/1");
});

test("GA4 requires a unique, well-formed property and never embeds a reference site's ID", () => {
  assert.equal(validMeasurementId("G-OWNPROPERTY1"), true);
  assert.equal(validMeasurementId(""), false);
  assert.equal(validMeasurementId("G-invalid"), false);
  for (const id of ["G-9JE3R1SM3F", "G-BJ8EPS3NBT", "G-KH6FQZFPDZ"]) {
    assert.equal(readFileSync(new URL("./src/lib/analytics.js", import.meta.url), "utf8").includes(id), false);
  }
});

test("approved logo is byte-for-byte identical to the supplied image", () => {
  const logo = readFileSync(new URL("./public/images/directional-works-logo.jpg", import.meta.url));
  assert.equal(createHash("sha256").update(logo).digest("hex"), "347a6034a044df59dadfad9a81b91758044d5ad816e2d6e758b819bf196aa57e");
  const png = readFileSync(new URL("./public/images/directional-works-logo-transparent.png", import.meta.url));
  assert.equal(png.toString("hex", 25, 26), "06"); // PNG color type 6 is RGBA.
});
