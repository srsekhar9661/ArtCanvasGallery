import paintings from "../data/paintings";
import PaintingCard from "../components/PaintingCard";

function Gallery(){
    return (
        <div>
            <h1 style={{marginBottom: "30px"}} >Gallery</h1>
            <div className="gallery-grid">
                {paintings.map((painting => (
                    <PaintingCard key={painting.id} painting={painting} />
                )))}
            </div>
        </div>
    )
}

export default Gallery;
