import { Link } from "react-router-dom";

function PaintingCard({ painting }) {
  return (
    <Link to={`/gallery/${painting.id}`} className="painting-card">
      <div className="image-wrapper">
        <img src={painting.image} alt={painting.title} />
        <div className="overlay">
          <h3>{painting.title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default PaintingCard;