import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import services from "../data/services";
import { whatsappUrl, emailUrl, businessEmail, whatsappNumber } from "../utils/enquiry";
import { trackEvent } from "../lib/analytics";

function Contact() {
  const [params] = useSearchParams();
  const preselected = services.find((item) => item.slug === params.get("service"));
  const [serviceSlug, setServiceSlug] = useState(preselected?.slug || "");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const selected = services.find((item) => item.slug === serviceSlug);
    const text = `Hello Praveen, I'm ${name.trim()}. I visited the Directional Works website${selected ? ` and would like to know more about ${selected.title}` : ""}. ${message.trim()}`;
    const method = event.nativeEvent.submitter?.value;
    const url = method === "email" ? emailUrl(selected ? `Enquiry: ${selected.title}` : "Directional Works enquiry", text) : whatsappUrl(null, text);
    // This opens a draft only. Sending remains the visitor's action in their chosen app.
    trackEvent("contact_handoff_click");
    if (method === "email") window.location.href = url;
    else window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="contact-page">
      <section className="page-intro container">
        <p className="eyebrow">Get in touch / Directional Works</p>
        <h1>Let's connect<span className="title-period">.</span></h1>
        <p>Ask about art, creative learning, a service or a potential collaboration. Directional Works operates by appointment only.</p>
      </section>
      <section className="section contact-section">
        <div className="container contact-layout">
          <div>
            <p className="eyebrow">Direct contact</p>
            <h2>Your next idea<br /><em>starts here.</em></h2>
            <div className="contact-direct">
              <a className="text-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp {whatsappNumber} ↗</a>
              <a className="text-link" href="tel:+919966966881">Call {whatsappNumber} ↗</a>
              <a className="text-link" href={`mailto:${businessEmail}`}>{businessEmail} ↗</a>
              <p>By appointment only.</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Prepare an enquiry</h3>
            <p>Fill in your details, then continue in WhatsApp or your email app to review and send your message.</p>
            <div className="contact-controls">
              <label htmlFor="enquiry-service">Area of interest</label>
              <select id="enquiry-service" value={serviceSlug} onChange={(event) => setServiceSlug(event.target.value)}>
                <option value="">General enquiry or collaboration</option>
                {services.map((service) => <option value={service.slug} key={service.id}>{service.title}</option>)}
              </select>
              <label htmlFor="enquiry-name">Your name</label>
              <input id="enquiry-name" name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required maxLength="120" />
              <label htmlFor="enquiry-message">Your message</label>
              <textarea id="enquiry-message" name="message" rows="5" value={message} onChange={(event) => setMessage(event.target.value)} required minLength="10" maxLength="5000" />
            </div>
            <div className="contact-actions">
              <button type="submit" value="whatsapp" className="button button-dark">Continue in WhatsApp ↗</button>
              <button type="submit" value="email" className="button button-outline">Draft an email ↗</button>
            </div>
            <p className="contact-disclaimer">Opening an app does not send or confirm an enquiry. Review and send your message there. No message is stored by this site.</p>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
