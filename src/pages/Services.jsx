import { useState } from "react";
import { Link } from "react-router-dom";
import services, { serviceCategories } from "../data/services";
import ServiceCard from "../components/ServiceCard";
import { whatsappUrl } from "../utils/enquiry";

function Services() {
  const [category, setCategory] = useState("All Services");
  const filtered = category === "All Services" ? services : services.filter((service) => service.category === category);
  return (
    <div className="services-page">
      <section className="page-intro container">
        <p className="eyebrow">Creative / Growth / Collaboration</p>
        <h1>Explore our<br /><em>creative services.</em></h1>
        <p>Art, learning and creative collaboration at Directional Works. Explore the catalogue and ask Praveen S. about the scope of an offering.</p>
      </section>
      <section className="section container">
        <div className="section-heading"><div><p className="eyebrow">The catalogue / 12 offerings</p><h2>Find your direction</h2></div><p>Details vary by enquiry. No prices, schedules or availability are implied.</p></div>
        <div className="category-filters" role="group" aria-label="Filter services by category">
          {["All Services", ...serviceCategories].map((item) => (
            <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
        <p className="filter-count" role="status">{filtered.length} {filtered.length === 1 ? "service" : "services"} shown</p>
        <div className="service-grid">{filtered.map((service) => <ServiceCard key={service.id} service={service} />)}</div>
      </section>
      <section className="section enquiry-section"><div className="container enquiry-inner"><div><p className="eyebrow light">Have a question?</p><h2>Let's find a way<br /><em>to make it happen.</em></h2></div><a className="button button-light" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp ↗</a></div></section>
      <div className="container service-secondary-link"><Link className="text-link" to="/collaborations">Explore collaborations ↗</Link></div>
    </div>
  );
}

export default Services;
