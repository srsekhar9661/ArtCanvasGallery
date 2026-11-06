import { Link } from "react-router-dom";
import { whatsappUrl } from "../utils/enquiry";

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <Link className="service-card-main" to={`/services/${service.slug}`}>
        <span className="service-number">{String(service.displayOrder).padStart(2, "0")} / {service.category}</span>
        <h3>{service.title}</h3>
        <p>{service.summary}</p>
        <span className="service-arrow" aria-hidden="true">↗</span>
      </Link>
      <div className="service-card-actions">
        <Link className="text-link" to={`/services/${service.slug}`}>View details <span aria-hidden="true">↗</span></Link>
        <a className="text-link" href={whatsappUrl(service.title)} data-analytics="service_enquiry_click" target="_blank" rel="noopener noreferrer" aria-label={`Enquire about ${service.title} on WhatsApp`}>WhatsApp <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}

export default ServiceCard;
