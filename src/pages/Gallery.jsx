import paintings from "../data/paintings";
import PaintingCard from "../components/PaintingCard";

function Gallery() {
  return (
    <div className="gallery-page">
      <div className="container">
        <div className="page-intro">
          <p className="eyebrow">Original works / Praveen S.</p>
          <h1>The Gallery<span className="title-period">.</span></h1>
          <p>Explore the collection of original paintings. Select a work to view it in full.</p>
          <span className="work-count">{String(paintings.length).padStart(2, "0")} works</span>
        </div>
        <div className="gallery-grid">
          {paintings.map((painting) => <PaintingCard key={painting.id} painting={painting} />)}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
