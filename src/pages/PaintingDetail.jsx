import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import paintings from "../data/paintings";
import { whatsappUrl } from "../utils/enquiry";

function ArtworkDialog({ painting, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const drag = useRef(null);
  const touches = useRef(new Map());
  const pinch = useRef(null);
  const imageRef = useRef(null);
  const viewportRef = useRef(null);
  const [fit, setFit] = useState(1);

  const fitForRotation = (nextRotation) => {
    const image = imageRef.current;
    const viewport = viewportRef.current;
    if (!image || !viewport || nextRotation % 180 === 0) return 1;
    return Math.min(1, viewport.clientWidth / image.clientHeight, viewport.clientHeight / image.clientWidth);
  };
  const clampPosition = (next, nextZoom = zoom, nextRotation = rotation) => {
    const image = imageRef.current;
    const viewport = viewportRef.current;
    if (!image || !viewport || nextZoom <= 1) return { x: 0, y: 0 };
    const rotated = nextRotation % 180 !== 0;
    const width = rotated ? image.clientHeight : image.clientWidth;
    const height = rotated ? image.clientWidth : image.clientHeight;
    const scale = nextZoom * fitForRotation(nextRotation);
    const xMax = Math.max(0, (width * scale - viewport.clientWidth) / 2);
    const yMax = Math.max(0, (height * scale - viewport.clientHeight) / 2);
    return { x: Math.max(-xMax, Math.min(xMax, next.x)), y: Math.max(-yMax, Math.min(yMax, next.y)) };
  };
  const changeZoom = (delta) => {
    const next = Math.max(1, Math.min(4, Math.round((zoom + delta) * 100) / 100));
    setZoom(next);
    setPosition((pos) => clampPosition(pos, next));
  };
  const rotate = () => {
    const next = (rotation + 90) % 360;
    setRotation(next);
    setFit(fitForRotation(next));
    setPosition({ x: 0, y: 0 });
  };
  const reset = () => {
    setZoom(1);
    setRotation(0);
    setFit(1);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const buttons = [...dialogRef.current.querySelectorAll("button")];
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [onClose]);
  useEffect(() => {
    const onResize = () => {
      setFit(fitForRotation(rotation));
      setPosition((current) => clampPosition(current));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  // The resize handler reads the current rotation and zoom from this render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotation, zoom]);

  const onPointerDown = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    touches.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (touches.current.size === 2) {
      const [a, b] = [...touches.current.values()];
      pinch.current = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom };
      drag.current = null;
    } else if (zoom > 1) {
      drag.current = { x: event.clientX - position.x, y: event.clientY - position.y };
    }
  };
  const onPointerMove = (event) => {
    if (!touches.current.has(event.pointerId)) return;
    touches.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (touches.current.size === 2 && pinch.current) {
      const [a, b] = [...touches.current.values()];
      const next = Math.max(1, Math.min(4, pinch.current.zoom * Math.hypot(a.x - b.x, a.y - b.y) / Math.max(1, pinch.current.distance)));
      setZoom(next);
      setPosition((current) => clampPosition(current, next));
      return;
    }
    if (!drag.current) return;
    setPosition(clampPosition({ x: event.clientX - drag.current.x, y: event.clientY - drag.current.y }));
  };
  const endDrag = (event) => {
    touches.current.delete(event.pointerId);
    drag.current = null;
    pinch.current = null;
    if (touches.current.size === 1 && zoom > 1) {
      const remaining = [...touches.current.values()][0];
      drag.current = { x: remaining.x - position.x, y: remaining.y - position.y };
    }
  };

  return createPortal(
    <div className="art-dialog" role="dialog" aria-modal="true" aria-label={`View work ${painting.id}`} ref={dialogRef}>
      <div className="dialog-toolbar">
        <span className="dialog-title">Work {String(painting.id).padStart(2, "0")}</span>
        <div className="dialog-buttons">
          <button type="button" onClick={() => changeZoom(-0.25)} disabled={zoom <= 1} aria-label="Zoom out">−</button>
          <span aria-live="polite" className="zoom-level">{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => changeZoom(0.25)} disabled={zoom >= 4} aria-label="Zoom in">+</button>
          <button type="button" onClick={rotate} aria-label="Rotate artwork 90 degrees">Rotate</button>
          <button type="button" onClick={reset} aria-label="Reset view">Reset</button>
          <button type="button" ref={closeRef} onClick={onClose} aria-label="Close artwork viewer">Close ×</button>
        </div>
      </div>
      <div className={`dialog-viewport ${zoom > 1 ? "can-pan" : ""}`} ref={viewportRef}
        onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag}
        onWheel={(event) => { if (event.deltaY !== 0) changeZoom(event.deltaY < 0 ? 0.25 : -0.25); }}>
        <img ref={imageRef} src={painting.image} alt={`Original artwork by Praveen S., work ${painting.id}`}
          draggable="false" onLoad={() => { setFit(fitForRotation(rotation)); setPosition({ x: 0, y: 0 }); }}
          style={{ transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${zoom * fit})` }} />
      </div>
      <p className="dialog-hint">Use the controls or pinch to zoom. Drag to pan when zoomed.</p>
    </div>, document.body
  );
}

function PaintingDetail() {
  const { id } = useParams();
  const painting = paintings.find((work) => String(work.id) === id);
  const [isOpen, setIsOpen] = useState(false);
  const closeViewer = useCallback(() => setIsOpen(false), []);
  if (!painting) return (
    <section className="page-intro container not-found"><p className="eyebrow">Artwork unavailable</p>
      <h1>Work not found.</h1><p>There is no artwork at this address.</p>
      <Link className="button button-dark" to="/gallery">Return to Gallery ↗</Link>
    </section>
  );
  return (
    <div className="detail-page container">
      <Link className="text-link detail-back" to="/gallery">← Back to Gallery</Link>
      <div className="detail-layout">
        <div className="detail-art">
          <img src={painting.image} alt={`Original artwork by Praveen S., work ${painting.id}`} />
          <button type="button" className="viewer-trigger" onClick={() => setIsOpen(true)}>Open full view ↗</button>
        </div>
        <div className="detail-info">
          <p className="eyebrow">The collection / Work {String(painting.id).padStart(2, "0")}</p>
          <h1>Work {String(painting.id).padStart(2, "0")}</h1>
          <p>An original painting by Praveen S. Artwork details have not yet been provided.</p>
          <div className="detail-divider" />
          <button type="button" className="button button-dark" onClick={() => setIsOpen(true)}>View artwork in full ↗</button>
          <a className="text-link" href={whatsappUrl(`original painting, work ${painting.id}`)} data-analytics="artwork_enquiry_click" target="_blank" rel="noopener noreferrer">Enquire about this work ↗</a>
        </div>
      </div>
      {isOpen && <ArtworkDialog painting={painting} onClose={closeViewer} />}
    </div>
  );
}

export default PaintingDetail;
