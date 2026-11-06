import { Link } from "react-router-dom";

function PaintingCard({ painting }) {
  return (
    <Link
      to={`/gallery/${painting.id}`}
      className="painting-card"
      data-analytics="gallery_interaction"
    >
      <span className="painting-card-image"><img src={painting.image} alt={`Original artwork by Praveen S., work ${painting.id}`} loading="lazy" decoding="async" /></span>
      <span className="painting-card-caption"><span>Work {String(painting.id).padStart(2, "0")}</span><span aria-hidden="true">View artwork ↗</span></span>
    </Link>
  );
}

export default PaintingCard;