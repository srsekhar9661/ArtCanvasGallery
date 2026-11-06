import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ANALYTICS_CHOICE, ANALYTICS_OPEN, analyticsAvailable, getConsent, privacySignal, setConsent } from "../lib/analytics";

function AnalyticsConsent() {
  const [open, setOpen] = useState(false);
  const panel = useRef(null);
  useEffect(() => {
    const update = () => setOpen(analyticsAvailable() && getConsent() === null);
    const frame = requestAnimationFrame(update);
    const show = () => {
      setOpen(true);
      requestAnimationFrame(() => panel.current?.focus({ preventScroll: true }));
    };
    window.addEventListener(ANALYTICS_OPEN, show);
    window.addEventListener(ANALYTICS_CHOICE, update);
    window.addEventListener("storage", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(ANALYTICS_OPEN, show);
      window.removeEventListener(ANALYTICS_CHOICE, update);
      window.removeEventListener("storage", update);
    };
  }, []);
  if (!open) return null;
  const choose = (choice) => { setConsent(choice); setOpen(false); };
  return <aside className="analytics-card" ref={panel} tabIndex="-1" aria-label="Analytics preferences">
    <h2>Your privacy, your choice.</h2>
    <p>Allow Google Analytics to measure page visits and selected interactions. We never send your message or contact details. Analytics stays off until you choose.</p>
    {!analyticsAvailable() && <p className="analytics-notice">{privacySignal() ? "Your browser privacy setting blocks analytics." : "Analytics is not configured on this website yet."}</p>}
    <div className="analytics-buttons"><button type="button" className="button button-dark" disabled={!analyticsAvailable()} onClick={() => choose("granted")}>Allow analytics</button><button type="button" className="button button-outline" onClick={() => choose("denied")}>Reject</button></div>
    <Link to="/privacy" className="text-link" onClick={() => setOpen(false)}>Read our privacy policy ↗</Link>
  </aside>;
}

export default AnalyticsConsent;
