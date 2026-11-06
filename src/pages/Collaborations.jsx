import { Link } from "react-router-dom";
import services from "../data/services";
import ServiceCard from "../components/ServiceCard";
import { whatsappUrl } from "../utils/enquiry";

const collaborationIds = [1, 3, 4, 5, 10, 11, 12];

function Collaborations() {
  return (
    <div className="collaborations-page">
      <section className="page-intro container">
        <p className="eyebrow">Ideas work better together</p>
        <h1>Creative work<br /><em>in good company.</em></h1>
        <p>Have an idea for a workshop, event, design conversation or creative project? Directional Works welcomes enquiries about possible collaborations.</p>
      </section>
      <section className="section container">
        <div className="section-heading"><div><p className="eyebrow">Ways to connect</p><h2>Start with a conversation</h2></div><p>Each enquiry is discussed individually. No project scope or availability is assumed.</p></div>
        <div className="service-grid">{services.filter((service) => collaborationIds.includes(service.id)).map((service) => <ServiceCard key={service.id} service={service} />)}</div>
      </section>
      <section className="section enquiry-section"><div className="container enquiry-inner"><div><p className="eyebrow light">An idea worth sharing?</p><h2>Let's talk about<br /><em>what's possible.</em></h2></div><div className="collab-actions"><a className="button button-light" href={whatsappUrl()} data-analytics="collaboration_click" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp ↗</a><Link className="text-link light-link" to="/contact">Contact details ↗</Link></div></div></section>
    </div>
  );
}

export default Collaborations;
