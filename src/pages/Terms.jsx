import { Link } from "react-router-dom";
import { businessEmail } from "../utils/enquiry";

function Terms() {
  return <div className="legal-page">
    <section className="page-intro container"><p className="eyebrow">Directional Works / Website information</p><h1>Website Terms<span className="title-period">.</span></h1><p>Important context for exploring this portfolio and service catalogue. Last updated 6 November 2026.</p></section>
    <div className="container legal-content section">
      <section><h2>Original artwork</h2><p>The paintings shown in the <Link to="/gallery">gallery</Link> are original works by Praveen S. Website access does not grant permission to reproduce or use the artwork. Ask the artist before using any image.</p></section>
      <section><h2>Service information</h2><p>Catalogue entries describe areas for enquiry, not guaranteed availability, booking, clinical treatment, recruitment placement, investment products or financial advice. Service scope, arrangements and any future terms must be confirmed directly. No payment or booking is accepted through this website.</p></section>
      <section><h2>External contact apps</h2><p>WhatsApp and email links open external services. Drafting an enquiry does not mean that Directional Works received it. Review and send your message in the chosen app. For questions, email <a href={`mailto:${businessEmail}`}>{businessEmail}</a>.</p></section>
    </div>
  </div>;
}
export default Terms;
