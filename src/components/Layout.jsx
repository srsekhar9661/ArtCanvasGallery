import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import Footer from "../pages/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getPageSeo } from "../data/seo";
import ScrollProgress from "./ScrollProgress";
import FloatingActions from "./FloatingActions";
import PageLoader from "./PageLoader";
import AnalyticsBridge from "./AnalyticsBridge";
import AnalyticsConsent from "./AnalyticsConsent";

function Layout({ children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    const seo = getPageSeo(pathname);
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", seo.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", seo.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", seo.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", seo.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", seo.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (seo.found) canonical?.setAttribute("href", seo.canonical);
    else canonical?.removeAttribute("href");
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", seo.canonical || "https://directionalworks.netlify.app");
    document.querySelector('meta[name="robots"]')?.setAttribute("content", seo.found ? "index,follow" : "noindex,follow");
    document.querySelectorAll("script[data-schema]").forEach((script) => script.remove());
    for (const schema of seo.schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.schema = "";
      script.textContent = JSON.stringify(schema).replace(/</g, "\\u003c");
      document.head.append(script);
    }
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <PageLoader />
      <ScrollProgress />
      <AnalyticsBridge />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content" className="page-content" tabIndex="-1">{children}</main>
      <Footer />
      <FloatingActions />
      <AnalyticsConsent />
    </>
  );
}

export default Layout;