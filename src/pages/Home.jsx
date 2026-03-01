import { Link } from "react-router-dom";
import paintings from "../data/paintings";
import Footer from "./Footer";
import Slider from "../components/Slider";

function Home() {
  const featured = paintings.slice(0, 4);

  return (
    <div className="home-page">
      <Slider />

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
            the material world that I see and the dreams that appear in my
            mind.”
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
