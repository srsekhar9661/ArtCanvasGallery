import { Link } from "react-router-dom";
import { businessEmail, whatsappNumber, whatsappUrl } from "../utils/enquiry";
import { openAnalyticsPreferences } from "../lib/analytics";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-identity">
          <Link className="footer-brand" to="/"><img src="/images/directional-works-logo-transparent.png" alt="" width="98" height="98" loading="lazy" />Directional <em>Works</em></Link>
          <p>Creative / Growth / Collaboration with Praveen S.</p>
        </div>
        <div className="footer-nav">
          <p className="eyebrow light">Explore</p>
          <Link to="/">Home</Link><Link to="/about">About</Link><Link to="/services">Services</Link><Link to="/gallery">Gallery</Link><Link to="/collaborations">Collaborations</Link><Link to="/contact">Contact</Link>
        </div>
        <div className="footer-note"><p className="eyebrow light">Get in touch</p><div className="footer-contact-links"><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp {whatsappNumber}</a><a href={`mailto:${businessEmail}`}>{businessEmail}</a><p>By appointment only.</p></div></div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Directional Works. All rights reserved.</span>
        <span className="footer-legal"><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Website Terms</Link><button type="button" onClick={openAnalyticsPreferences}>Analytics preferences</button></span>
      </div>
    </footer>
  );
};

export default Footer;
