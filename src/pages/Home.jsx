import { Link } from "react-router-dom";
import paintings from "../data/paintings";

function Home() {
  const featured = paintings.slice(0, 4);

  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Praveen S.</h1>
          <p>Fine Artist & International Exhibitor</p>
          <Link to="/gallery" className="hero-btn">
            View Gallery
          </Link>
        </div>
      </section>

      {/* FEATURED WORKS */}
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
              <div className="overlay">
                <h3>{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ARTIST STATEMENT */}
      <section className="artist-statement">
        <div className="container">
          <h2>Artist Statement</h2>
          <p>
            “The source of inspiration for my creative artworks has always been
            the material world that I see and the dreams that appear in my mind.”
          </p>
        </div>
      </section>

    </div>
  );
}

export default Home;