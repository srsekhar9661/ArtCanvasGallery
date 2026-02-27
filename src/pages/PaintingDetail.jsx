import { useParams } from "react-router-dom";
import paintings from "../data/paintings";

function PaintingDetail() {
  const { id } = useParams();
  const painting = paintings.find(p => p.id === parseInt(id));

  if (!painting) {
    return <h2>Painting not found</h2>;
  }

  return (
    <div className="detail-container">
      <img src={painting.image} alt={painting.title} />
      <div className="detail-info">
        <h1>{painting.title}</h1>
        <p>
          This is a masterpiece capturing emotion and depth through color and texture.
        </p>
      </div>
    </div>
  );
}

export default PaintingDetail;