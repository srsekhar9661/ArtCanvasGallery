import { Link } from "react-router-dom";
import paintings from "../data/paintings";

function Home() {
  const featured = paintings.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-content">
          <h1>ArtCanvasGallery</h1>
          <p>Experience emotion, texture, and imagination on canvas.</p>
          <Link to="/gallery" className="hero-btn">
            Explore Gallery
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section container">
        <h2>Featured Works</h2>
        <div className="featured-grid">
          {featured.map((item) => (
            <Link
              key={item.id}
              to={`/gallery/${item.id}`}
              className="featured-card"
            >
              <img src={item.image} alt={item.title} />
              <div className="featured-overlay">
                <h3>{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview">
        <div className="container">
          <h2>About the Artist</h2>
          <p>
            A journey through color, form, and expression. Each painting
            reflects a deep connection between imagination and reality,
            capturing moments of emotion on canvas.
          </p>
          <Link to="/about" className="outline-btn">
            Learn More
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Interested in a Custom Artwork?</h2>
        <Link to="/contact" className="hero-btn">
          Contact Now
        </Link>
      </section>
    </div>
  );
}

export default Home;