import { useParams, useNavigate } from "react-router-dom";
import paintings from "../data/paintings";

function PaintingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const painting = paintings.find(p => p.id === parseInt(id));

  if (!painting) {
    return <h2>Painting not found</h2>;
  }

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Gallery
      </button>

      <div className="detail-content">
        <img src={painting.image} alt={painting.title} />

        <div className="detail-text">
          <h1>{painting.title}</h1>
          <p>
            This artwork explores depth, emotion, and texture through
            expressive strokes and carefully layered tones.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaintingDetail;