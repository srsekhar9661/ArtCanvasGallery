import { Link } from "react-router-dom";
import "./PaintingCard.css";

function PaintingCard({ painting }) {
  return (
    <Link
      to={`/gallery/${painting.id}`}
      className="painting-card"
    >
      <img
        src={painting.image}
        alt={painting.title}
      />

      <div className="painting-overlay">
        <h3>{painting.title}</h3>
      </div>
    </Link>
  );
}

export default PaintingCard;