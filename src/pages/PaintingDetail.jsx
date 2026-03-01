import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import paintings from "../data/paintings";
import './PaintingDetail.css';

function PaintingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const painting = paintings.find(p => p.id === parseInt(id));

  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const startPos = useRef({ x: 0, y: 0 });

  if (!painting) return <h2>Painting not found</h2>;

  const closeModal = () => {
    setIsOpen(false);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse wheel zoom
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isOpen) return;

      if (e.deltaY < 0) {
        setZoom(z => z + 0.1);
      } else {
        setZoom(z => (z > 1 ? z - 0.1 : 1));
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isOpen]);

  // ESC close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Drag start
  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  // Drag move
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="detail-page">
  <div className="container">

    <button className="back-btn" onClick={() => navigate(-1)}>
      ← Back to Gallery
    </button>

    {/* IMAGE CENTERED */}
    <div className="detail-image-wrapper">
      <img src={painting.image} alt={painting.title} />

      <div className="detail-overlay">
        <button onClick={() => setIsOpen(true)}>🔍 View</button>
      </div>
    </div>

    {/* CONTENT BELOW IMAGE */}
    <div className="detail-text">
      <h1>{painting.title}</h1>

      <p>
        This artwork explores depth, emotion, and expressive texture.
      </p>

      <div className="detail-meta">
        <p><strong>Medium:</strong> Acrylic on Canvas</p>
        <p><strong>Year:</strong> 2024</p>
      </div>
    </div>

  </div>

  {/* KEEP YOUR MODAL ZOOM SYSTEM */}
  {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div
            className="modal-controls"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setZoom(z => z + 0.2)}>+</button>
            <button onClick={() => setZoom(z => (z > 1 ? z - 0.2 : 1))}>−</button>
            <button onClick={closeModal}>✕</button>
          </div>

          <div
            className="modal-image-wrapper"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={painting.image}
              alt={painting.title}
              className="modal-image"
              onMouseDown={handleMouseDown}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                cursor:
                  zoom > 1
                    ? isDragging
                      ? "grabbing"
                      : "grab"
                    : "default"
              }}
              draggable={false}
            />
          </div>
        </div>
      )}
</div>
    
  );
}

export default PaintingDetail;