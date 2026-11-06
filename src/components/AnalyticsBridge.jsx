import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ANALYTICS_CHOICE, trackEvent } from "../lib/analytics";

function AnalyticsBridge() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = () => {
      trackEvent("page_view", pathname);
      if (pathname.startsWith("/services/")) trackEvent("service_view", pathname);
      if (pathname.startsWith("/gallery/")) trackEvent("artwork_view", pathname);
    };
    page();
    window.addEventListener(ANALYTICS_CHOICE, page);
    return () => window.removeEventListener(ANALYTICS_CHOICE, page);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!anchor) return;
      const explicit = anchor.dataset.analytics;
      if (explicit) { trackEvent(explicit); return; }
      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("https://wa.me/919966966881")) trackEvent("whatsapp_click");
      else if (href.startsWith("mailto:")) trackEvent("email_click");
      else if (href.startsWith("tel:")) trackEvent("phone_click");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}

export default AnalyticsBridge;
