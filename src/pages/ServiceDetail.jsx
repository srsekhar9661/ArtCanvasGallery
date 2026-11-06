import { Link, useParams } from "react-router-dom";
import services from "../data/services";
import paintings from "../data/paintings";
import PaintingCard from "../components/PaintingCard";
import ServiceCard from "../components/ServiceCard";
import { whatsappUrl } from "../utils/enquiry";

function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  if (!service) return (
    <section className="page-intro container not-found">
      <p className="eyebrow">Service unavailable</p><h1>Service not found.</h1>
      <p>This offering is not in the current catalogue.</p>
      <Link className="button button-dark" to="/services">Explore Services ↗</Link>
    </section>
  );
  const related = services.filter((item) => item.category === service.category && item.id !== service.id).slice(0, 2);
  return (
    <div className="service-detail-page">
      <section className="page-intro container">
        <Link className="text-link detail-back" to="/services">← All services</Link>
        <p className="eyebrow">{service.category} / {String(service.displayOrder).padStart(2, "0")}</p>
        <h1>{service.title}<span className="title-period">.</span></h1>
        <p>{service.summary}</p>
      </section>
      <section className="section container service-detail-layout">
        <div><p className="eyebrow">The offering</p><h2>In conversation.</h2></div>
        <div className="service-detail-copy">
          <p>{service.description}</p>
          <div className="verification-note"><strong>Before you enquire</strong><p>{service.verificationStatus}</p></div>
          <a className="button button-dark" href={whatsappUrl(service.title)} data-analytics="service_enquiry_click" target="_blank" rel="noopener noreferrer">{service.enquiryLabel} on WhatsApp ↗</a>
          <Link className="text-link" to={`/contact?service=${encodeURIComponent(service.slug)}`}>Other ways to connect ↗</Link>
        </div>
      </section>
      {service.galleryLink && <section className="section service-art-section"><div className="container">
        <div className="section-heading"><div><p className="eyebrow">Original paintings</p><h2>From the gallery</h2></div><Link className="text-link" to="/gallery">View all works ↗</Link></div>
        <div className="featured-grid">{paintings.slice(0, 3).map((work) => <PaintingCard key={work.id} painting={work} />)}</div>
      </div></section>}
      {related.length > 0 && <section className="section container">
        <div className="section-heading"><div><p className="eyebrow">Explore further</p><h2>Related directions</h2></div></div>
        <div className="service-grid">{related.map((item) => <ServiceCard key={item.id} service={item} />)}</div>
      </section>}
    </div>
  );
}

export default ServiceDetail;
