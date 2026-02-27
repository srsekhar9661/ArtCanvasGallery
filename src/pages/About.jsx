function About() {
  return (
    <div className="about-page">
      
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About the Artist</h1>
        <p>Exploring emotion, imagination, and depth through canvas.</p>
      </section>

      {/* Bio Section */}
      <section className="about-content container">
        <div className="about-text">
          <h2>The Journey</h2>
          <p>
            ArtCanvasGallery represents years of dedication to artistic
            expression. Each painting reflects a moment of inspiration,
            combining texture, color, and movement to create emotional depth.
          </p>
          <p>
            The artist believes that art is not just visual beauty, but a
            conversation between imagination and reality — where every stroke
            carries meaning.
          </p>
        </div>

        <div className="about-image">
          <img
            src="https://picsum.photos/500/600?grayscale"
            alt="Artist"
          />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="about-philosophy">
        <div className="container">
          <h2>Artistic Philosophy</h2>
          <p>
            "Art should evoke feeling before it seeks understanding."
          </p>
          <p>
            Every canvas is an exploration of emotion, inviting the viewer to
            interpret and connect in their own unique way.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats container">
        <div className="stat">
          <h3>50+</h3>
          <p>Completed Artworks</p>
        </div>
        <div className="stat">
          <h3>10+</h3>
          <p>Exhibitions</p>
        </div>
        <div className="stat">
          <h3>5+</h3>
          <p>Years of Experience</p>
        </div>
      </section>

    </div>
  );
}

export default About;
