// import paintings from "../data/paintings";

function PaintingCard({painting}){
    return (
        <div className="painting-card">
            <img src={painting.image} alt={painting.title} />
            <h3>{ painting.title }</h3>
        </div>
    )
}
export default PaintingCard;