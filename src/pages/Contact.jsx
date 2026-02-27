import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <h1>Get in Touch</h1>
        <p>Interested in a custom artwork or collaboration?</p>
      </section>

      {/* Contact Content */}
      <section className="contact-content container">
        <div className="contact-form">
          <h2>Send a Message</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="hero-btn">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>Email: artist@example.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Vijayawada, India</p>
        </div>
      </section>
    </div>
  );
}

export default Contact;
