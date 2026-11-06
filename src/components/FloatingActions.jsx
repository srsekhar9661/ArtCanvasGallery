import { useEffect, useState } from "react";
import { whatsappUrl } from "../utils/enquiry";

function FloatingActions() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 520);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const top = () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  return <div className="floating-actions" aria-label="Quick actions">
    <button className={`floating-top ${scrolled ? "is-visible" : ""}`} type="button" aria-label="Back to top"
      aria-hidden={!scrolled} tabIndex={scrolled ? 0 : -1} disabled={!scrolled} onClick={top}>↑</button>
    <a className="floating-whatsapp" href={whatsappUrl(null, "Hello Praveen, I visited the Directional Works website and would like to know more about your creative services.")}
      target="_blank" rel="noopener noreferrer" aria-label="Enquire with Directional Works on WhatsApp">
      <svg viewBox="0 0 32 32" width="25" height="25" aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M16 .5A15.4 15.4 0 0 0 2.8 23.9L.6 31.4l7.7-2a15.4 15.4 0 1 0 7.7-28.9Zm0 28A12.5 12.5 0 0 1 9.5 27l-.5-.3-4.5 1.2 1.3-4.4-.3-.5A12.6 12.6 0 1 1 16 28.5Zm6.9-9.5c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.4-.2.3-.4.3-.8.1a10.3 10.3 0 0 1-3-1.9 11.4 11.4 0 0 1-2.1-2.6c-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2.1-.5 0-.7s-.8-2-1.1-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1.1.5-.3.4-1.3 1.3-1.3 3.1s1.4 3.5 1.6 3.7c.2.3 2.7 4.2 6.5 5.7.9.4 1.6.6 2.1.7.9.1 1.7.1 2.3-.2.7-.3 2.2-1.9 2.5-2.7.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.9-.6Z" />
      </svg>
    </a>
  </div>;
}

export default FloatingActions;
