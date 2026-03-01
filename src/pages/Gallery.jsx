import paintings from "../data/paintings";
import PaintingCard from "../components/PaintingCard";
import "./Gallery.css";

function Gallery() {
  return (
    <div className="gallery-page">
      <div className="container">
        <h1 className="gallery-title">Gallery</h1>

        <div className="gallery-grid">
          {paintings.map((painting) => (
            <PaintingCard
              key={painting.id}
              painting={painting}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
