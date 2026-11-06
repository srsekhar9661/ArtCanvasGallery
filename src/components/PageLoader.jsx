import { useEffect, useState } from "react";

function PageLoader() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      if (!sessionStorage.getItem("directional:seen-intro") && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const frame = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(frame);
      }
    } catch { /* Browsing mode can block storage. */ }
  }, []);
  useEffect(() => {
    if (!visible) return;
    try { sessionStorage.setItem("directional:seen-intro", "1"); } catch { /* Browsing mode can block storage. */ }
    const timeout = window.setTimeout(() => setVisible(false), 1100);
    return () => window.clearTimeout(timeout);
  }, [visible]);
  if (!visible) return null;
  return <div className="site-intro" aria-hidden="true">
    <div className="intro-brand"><svg viewBox="0 0 130 62" focusable="false"><path d="M5 49 Q36 -5 70 40 T125 12" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg><span>Directional <em>Works</em></span></div>
  </div>;
}

export default PageLoader;
