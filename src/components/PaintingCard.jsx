import { Link } from "react-router-dom";

function PaintingCard({ painting }){
    return (
        <Link to={`/gallery/${painting.id}`} className="painting-card">
            <img src={painting.image} alt={painting.title} />
            <h3>{painting.title}</h3>
        </Link>
    )
}


export default PaintingCard;
