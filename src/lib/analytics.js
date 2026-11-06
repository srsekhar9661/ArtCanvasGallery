import services from "../data/services.js";
import paintings from "../data/paintings.js";
import { getPageSeo } from "../data/seo.js";

const ID = import.meta.env?.VITE_GA_MEASUREMENT_ID || "";
const ENABLED = import.meta.env?.VITE_ANALYTICS_ENABLED === "true";
const HOST = "directionalworks.netlify.app";
const KEY = "directional:analytics-consent";
export const ANALYTICS_CHOICE = "directional:analytics-choice";
export const ANALYTICS_OPEN = "directional:analytics-open";
const EVENTS = new Set([
  "page_view", "whatsapp_click", "phone_click", "email_click", "service_view",
  "service_enquiry_click", "artwork_view", "artwork_enquiry_click",
  "gallery_interaction", "collaboration_click", "contact_handoff_click",
]);
let configured = false;
let lastPage = "";

export function validMeasurementId(id) {
  return /^G-[A-Z0-9]{6,15}$/.test(id);
}

export function safePath(path) {
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "");
  if (["/", "/about", "/services", "/gallery", "/collaborations", "/contact", "/privacy", "/terms"].includes(normalized)) return normalized;
  if (services.some((service) => normalized === `/services/${service.slug}`)) return normalized;
  if (paintings.some((work) => normalized === `/gallery/${work.id}`)) return normalized;
  return "/404";
}

export function privacySignal() {
  return typeof navigator !== "undefined" && (navigator.doNotTrack === "1" || navigator.globalPrivacyControl === true);
}

export function analyticsAvailable() {
  return typeof window !== "undefined" && import.meta.env?.PROD === true && ENABLED && validMeasurementId(ID)
    && window.location.hostname === HOST && !privacySignal();
}

export function getConsent() {
  try {
    const saved = window.localStorage.getItem(KEY);
    return saved === "granted" || saved === "denied" ? saved : null;
  } catch { return null; }
}

function pageContext(path) {
  const page = safePath(path);
  return { page_path: page, page_location: `${window.location.origin}${page}`, page_title: getPageSeo(page).title, page_referrer: "" };
}

function setup() {
  if (!analyticsAvailable() || getConsent() !== "granted") return;
  window[`ga-disable-${ID}`] = false;
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args) => window.dataLayer.push(args);
  }
  if (configured) return;
  window.gtag("consent", "default", {
    analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", ID, {
    send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
  });
  window.gtag("consent", "update", { analytics_storage: "granted" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
  document.head.append(script);
  configured = true;
}

export function setConsent(choice) {
  if (choice !== "granted" && choice !== "denied") return;
  try { window.localStorage.setItem(KEY, choice); } catch { /* Storage can be unavailable. */ }
  if (choice === "denied") {
    lastPage = "";
    if (validMeasurementId(ID)) window[`ga-disable-${ID}`] = true;
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.trim().split("=")[0];
      if (name === "_ga" || name.startsWith("_ga_")) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}; SameSite=Lax`;
      }
    }
  } else setup();
  window.dispatchEvent(new Event(ANALYTICS_CHOICE));
}

export function trackEvent(name, path = window.location.pathname) {
  if (!EVENTS.has(name) || !analyticsAvailable() || getConsent() !== "granted") return;
  setup();
  if (name === "page_view") {
    const safe = safePath(path);
    if (safe === lastPage) return;
    lastPage = safe;
  }
  window.gtag?.("event", name, pageContext(path));
}

export function openAnalyticsPreferences() {
  window.dispatchEvent(new Event(ANALYTICS_OPEN));
}
