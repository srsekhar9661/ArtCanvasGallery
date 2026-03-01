import { useState } from "react";
import "./Contact.css";

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
      <div className="container">

        <div className="contact-header">
          <h1>Contact</h1>
          <p>
            For exhibitions, collaborations, or artwork inquiries,
            feel free to get in touch.
          </p>
        </div>

        <div className="contact-layout">

          {/* FORM */}
          <form className="contact-form" onSubmit={handleSubmit}>
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
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>

          {/* CONTACT INFO */}
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>Email: praveen.artist@example.com</p>
            <p>Location: India</p>
            <p>Available for exhibitions & collaborations</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;