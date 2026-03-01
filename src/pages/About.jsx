import './About.css';

function About() {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <h1>Praveen S.</h1>
        <p>Fine Artist • Visual Effects Professional • International Exhibitor</p>
      </section>

      {/* BIO SECTION */}
      <section className="about-bio container">
        <div className="about-image">
          <img src="/images/praveen.png" alt="Praveen S." />
        </div>

        <div className="about-text">
          <h2>About the Artist</h2>
          <p>
            Praveen S. entered the field of arts at a very early age and pursued
            Fine Arts with dedication and passion. Over the years, he has
            participated in solo and group exhibitions across India and
            internationally including USA and UK.
          </p>
          <p>
            As a professional Visual Effects technician, he has worked in
            reputed organizations such as DQ Entertainment International
            Limited and Discreet Arts, contributing to Indian and overseas
            projects.
          </p>
          <p>
            Arts is not just a profession — it is his life line.
          </p>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="about-achievements">
        <div className="container">
          <h2>Awards & Recognition</h2>
          <ul>
            <li>International Golden Award – Chitrakala Parishad</li>
            <li>ITAP Award for Ideal Teaching in Arts</li>
            <li>Senior Award – Creative Fine Arts</li>
            <li>Exhibited in USA, UK, Delhi, Hyderabad</li>
            <li>National & International Awards (Online & Offline)</li>
          </ul>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="about-philosophy">
        <div className="container">
          <h2>Artistic Philosophy</h2>
          <p>
            “The source of inspiration for my creative artworks has always been
            the material world that I see and the dreams that appear in my mind.”
          </p>
        </div>
      </section>

    </div>
  );
}

export default About;