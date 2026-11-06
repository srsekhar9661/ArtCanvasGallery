import { Link } from "react-router-dom";
import paintings from "../data/paintings";
import PaintingCard from "../components/PaintingCard";
import services from "../data/services";
import ServiceCard from "../components/ServiceCard";
import { whatsappUrl } from "../utils/enquiry";
import Slider from "../components/Slider";

function Home() {
  return (
    <div className="home-page">
      <Slider />
      <section className="section container">
        <div className="section-heading"><div><p className="eyebrow">01 / Three directions</p><h2>More than one way<br /><em>to create.</em></h2></div><Link className="text-link" to="/about">Our story ↗</Link></div>
        <div className="business-pillars">
          <div className="pillar"><h3>Creative</h3><p>Original paintings, crafts, mentoring and creative ideas across disciplines.</p></div>
          <div className="pillar"><h3>Growth</h3><p>Creative learning and catalogue-listed opportunities discussed directly, with scope confirmed on enquiry.</p></div>
          <div className="pillar"><h3>Collaboration</h3><p>Conversations around workshops, events, design and shared creative projects.</p></div>
        </div>
      </section>
      <section className="section about-home-intro">
        <div className="container about-home-layout">
          <p className="eyebrow">02 / About Directional Works</p>
          <div><h2>Ideas begin with<br /><em>an open mind.</em></h2><p>Directional Works brings Praveen S.'s original art together with creative learning, design interests and opportunities to collaborate. Each direction begins with a conversation about what is possible.</p><Link className="text-link" to="/about">Meet the artist ↗</Link></div>
        </div>
      </section>
      <section className="section artist-preview">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">03 / The catalogue</p><h2>Explore the possibilities</h2></div><Link className="text-link" to="/services">View all 12 services ↗</Link></div>
          <div className="service-teasers">{[1, 3, 5, 6].map((id) => <ServiceCard key={id} service={services[id - 1]} />)}</div>
        </div>
      </section>
      <section className="section featured-section container">
        <div className="section-heading">
          <div><p className="eyebrow">04 / Original paintings</p><h2>From the collection</h2></div>
          <Link className="text-link" to="/gallery">Explore all works <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="featured-grid">
          {paintings.slice(0, 3).map((item) => <PaintingCard key={item.id} painting={item} />)}
        </div>
      </section>
      <section className="section artist-preview">
        <div className="container split-layout">
          <div className="portrait-frame"><img src="/images/praveen.png" alt="Portrait of Praveen S." loading="lazy" /></div>
          <div className="split-copy">
            <p className="eyebrow">05 / Creative learning</p>
            <h2>Learn through<br /><em>making.</em></h2>
            <p>Ask about calligraphy and handwriting, painting and drawing mentoring, or art-focused creative sessions. Format and availability are confirmed directly.</p>
            <div className="home-service-links">{[1, 2, 3].map((id) => <Link className="text-link" key={id} to={`/services/${services[id - 1].slug}`}>{services[id - 1].title} ↗</Link>)}</div>
          </div>
        </div>
      </section>
      <section className="section statement-section">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">06 / Across disciplines</p><h2>Creativity travels.</h2></div><p>From creative technology and branding to events, media and design, every idea starts with a conversation.</p></div>
          <div className="home-service-links">{[4, 5, 10, 11, 12].map((id) => <Link className="text-link" key={id} to={`/services/${services[id - 1].slug}`}>{services[id - 1].title} ↗</Link>)}</div>
        </div>
      </section>
      <section className="section artist-vision">
        <div className="container statement-inner"><p className="eyebrow">07 / The artist's vision</p><blockquote>“The source of inspiration for my creative artworks has always been the material world that I see and the dreams that appear in my mind.”</blockquote><p className="statement-credit">— Praveen S.</p></div>
      </section>
      <section className="section collection-preview container">
        <div className="section-heading">
          <div><p className="eyebrow">08 / Growth & collaboration</p><h2>Room for what comes next.</h2></div>
          <p>The catalogue also mentions recruitment and investment-related topics. Their scope needs owner clarification; no jobs or financial offers are published here.</p>
        </div>
        <Link className="button button-dark" to="/collaborations">Explore Collaborations ↗</Link>
      </section>
      <section className="section enquiry-section">
        <div className="container enquiry-inner"><div><p className="eyebrow light">09 / Get in touch</p><h2>Start with<br /><em>a conversation.</em></h2></div>
          <div className="collab-actions"><a className="button button-light" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp ↗</a><Link className="text-link light-link" to="/contact">Other contact options ↗</Link></div>
        </div>
      </section>
    </div>
  );
}

export default Home;
