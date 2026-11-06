import { Link } from "react-router-dom";
import paintings from "../data/paintings";
import PaintingCard from "../components/PaintingCard";
import { whatsappUrl } from "../utils/enquiry";

function About() {
  return (
    <div className="about-page">
      <section className="page-intro container">
        <p className="eyebrow">The story / Directional Works</p>
        <h1>Many directions.<br /><em>One creative spirit.</em></h1>
        <p>Directional Works brings together the original art and broader creative interests of Praveen S. — a space for creating, learning and working together.</p>
      </section>
      <section className="section container">
        <div className="section-heading"><div><p className="eyebrow">01 / The approach</p><h2>Creative. Growth.<br />Collaboration.</h2></div><Link className="text-link" to="/services">Explore services ↗</Link></div>
        <div className="business-pillars">
          <div className="pillar"><h3>Creative</h3><p>Painting, drawing, crafts, design and other creative interests.</p></div>
          <div className="pillar"><h3>Growth</h3><p>Mentoring and opportunities approached with curiosity and care.</p></div>
          <div className="pillar"><h3>Collaboration</h3><p>Discuss possible workshops, events and shared creative ideas.</p></div>
        </div>
      </section>
      <section className="section about-biography">
        <div className="container split-layout">
          <div className="portrait-frame"><img src="/images/praveen.png" alt="Portrait of Praveen S." /></div>
          <div className="split-copy">
            <p className="eyebrow">02 / Meet Praveen S.</p>
            <h2>Art is his<br /><em>life line.</em></h2>
            <p>Praveen S. entered the field of arts at a very early age and pursued Fine Arts with dedication and passion.</p>
            <p>As a professional Visual Effects technician, he has worked in organizations such as DQ Entertainment International Limited and Discreet Arts, contributing to Indian and overseas projects.</p>
          </div>
        </div>
      </section>
      <section className="section statement-section">
        <div className="container statement-inner">
          <p className="eyebrow">03 / In his words</p>
          <blockquote>“The source of inspiration for my creative artworks has always been the material world that I see and the dreams that appear in my mind.”</blockquote>
          <p className="statement-credit">— Praveen S.</p>
        </div>
      </section>
      <section className="section container about-selected">
        <div className="section-heading"><div><p className="eyebrow">04 / Original artwork</p><h2>Explore the paintings</h2></div><Link className="text-link" to="/gallery">View Gallery ↗</Link></div>
        <div className="preview-grid">{paintings.slice(0, 2).map((work) => <PaintingCard key={work.id} painting={work} />)}</div>
      </section>
      <section className="section enquiry-section"><div className="container enquiry-inner"><div><p className="eyebrow light">Continue the conversation</p><h2>Connect with<br /><em>Directional Works.</em></h2></div><div className="collab-actions"><a className="button button-light" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp ↗</a><Link className="text-link light-link" to="/contact">Contact options ↗</Link></div></div></section>
    </div>
  );
}

export default About;