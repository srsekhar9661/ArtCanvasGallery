import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PaintingScene from "./PaintingScene";
import { heroSlides, SLIDE_DURATION } from "../data/heroSlides";
import { whatsappUrl } from "../utils/enquiry";
import "./HeroSlider.css";

function SlideVisual({ type, active }) {
  if (type === "painting") return <PaintingScene active={active} />;
  return <div className={`hero-art hero-art-${type}`} aria-hidden="true">
    <div className="hero-art-light" />
    {type === "gallery" && <><div className="gallery-arch"><span className="gallery-arch-inner" /></div><span className="gallery-sculpture" /><span className="gallery-plinth" /></>}
    {type === "learning" && <><div className="learning-sheet"><svg viewBox="0 0 370 440"><path d="M60 245c48-146 88 73 141-68s52 123 116-70M90 305c94-47 133-34 195-60" fill="none" stroke="#ad795b" strokeWidth="5" strokeLinecap="round" /><circle cx="218" cy="290" r="55" fill="none" stroke="#497078" strokeWidth="2" /></svg></div><span className="learning-pencil" /><span className="learning-pencil second" /></>}
    {type === "studio" && <><span className="studio-tile tile-one">FORM</span><span className="studio-tile tile-two">IDEA</span><span className="studio-tile tile-three">MAKE</span></>}
    {type === "connection" && <><span className="connection-ring ring-one" /><span className="connection-ring ring-two" /><span className="connection-ring ring-three" /><span className="connection-center" /></>}
  </div>;
}

function SlideAction({ action, secondary = false }) {
  const className = secondary ? "text-link light-link" : "button button-light";
  const content = <>{action.label} <span aria-hidden="true">↗</span></>;
  if (action.whatsapp) return <a className={className} href={whatsappUrl("creative mentoring")} target="_blank" rel="noopener noreferrer">{content}</a>;
  return <Link className={className} to={action.to}>{content}</Link>;
}

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sequence, setSequence] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const root = useRef(null);
  const touchStart = useRef(null);
  const pointerInput = useRef(false);
  const remaining = useRef(SLIDE_DURATION);
  const timeStarted = useRef(0);
  const resetSerial = useRef(0);
  const paused = manualPause || hovered || focused || !visible || !pageVisible || reduced;

  const changeSlide = (target, manual = true) => {
    resetSerial.current++;
    remaining.current = SLIDE_DURATION;
    setCurrentIndex((target + heroSlides.length) % heroSlides.length);
    setSequence((value) => value + 1);
    if (manual) setManualPause(true);
  };

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const frame = requestAnimationFrame(() => {
      setReduced(preference.matches);
      setPageVisible(!document.hidden);
    });
    const onPreference = () => setReduced(preference.matches);
    const onVisibility = () => setPageVisible(!document.hidden);
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    if (root.current) observer.observe(root.current);
    return () => {
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    timeStarted.current = performance.now();
    const stamp = resetSerial.current;
    let fired = false;
    const timer = window.setTimeout(() => {
      fired = true;
      resetSerial.current++;
      remaining.current = SLIDE_DURATION;
      setCurrentIndex((value) => (value + 1) % heroSlides.length);
      setSequence((value) => value + 1);
    }, remaining.current);
    return () => {
      window.clearTimeout(timer);
      // A slide change resets the clock; only a pause should retain elapsed time.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (!fired && stamp === resetSerial.current) remaining.current = Math.max(0, remaining.current - (performance.now() - timeStarted.current));
    };
  }, [paused, sequence]);
  useEffect(() => {
    if (!manualPause) return;
    const timeout = window.setTimeout(() => setManualPause(false), 6000);
    return () => window.clearTimeout(timeout);
  }, [manualPause, sequence]);

  const onTouchStart = (event) => {
    if (event.touches.length === 1) touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };
  const onTouchEnd = (event) => {
    if (!touchStart.current || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - touchStart.current.x;
    const dy = event.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) changeSlide(currentIndex + (dx < 0 ? 1 : -1));
    touchStart.current = null;
  };
  const onKeyDown = (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      changeSlide(currentIndex + (event.key === "ArrowRight" ? 1 : -1));
    }
  };

  return (
    <section className="cinema-hero" ref={root} aria-roledescription="carousel" aria-label="Directional Works highlights"
      tabIndex={0} onKeyDown={(event) => { pointerInput.current = false; onKeyDown(event); }}
      onPointerDownCapture={() => { pointerInput.current = true; setFocused(false); }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => { if (!pointerInput.current) setFocused(true); }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {heroSlides.map((slide, index) => {
        const active = index === currentIndex;
        const first = slide.title.slice(0, slide.title.lastIndexOf(slide.emphasis)).trim();
        return (
          <div className={`cinema-slide cinema-${slide.visual} ${active ? "is-active" : ""}`} key={slide.id} aria-hidden={!active} inert={!active}>
            <SlideVisual type={slide.visual} active={active && visible && !reduced} />
            <div className="cinema-vignette" />
            <div className="container cinema-layout">
              <div className="cinema-copy">
                <p className="eyebrow light">{slide.eyebrow}</p>
                {index === 0 ? <h1>{first} <em>{slide.emphasis}</em></h1> : <h2>{first} <em>{slide.emphasis}</em></h2>}
                <p className="cinema-description">{slide.description}</p>
                <div className="button-row"><SlideAction action={slide.primary} /><SlideAction action={slide.secondary} secondary /></div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="container cinema-controls">
        <div className="cinema-arrows">
          <button type="button" onClick={() => changeSlide(currentIndex - 1)} aria-label="Previous slide">←</button>
          <button type="button" onClick={() => changeSlide(currentIndex + 1)} aria-label="Next slide">→</button>
        </div>
        <div className="cinema-pagination">
          <span className="cinema-count" aria-live="polite">{String(currentIndex + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}</span>
          <div className="cinema-dots" role="group" aria-label="Choose slide">
            {heroSlides.map((slide, index) => <button type="button" key={slide.id} className={index === currentIndex ? "is-current" : ""} aria-label={`Go to slide ${index + 1}: ${slide.title}`} aria-current={index === currentIndex ? "true" : undefined} onClick={() => changeSlide(index)}>
              {index === currentIndex && <span key={sequence} className={`cinema-progress ${paused ? "is-paused" : ""}`} style={{ animationDuration: `${SLIDE_DURATION}ms` }} />}
            </button>)}
          </div>
          <button className="cinema-play" type="button" aria-label={manualPause ? "Resume slideshow" : "Pause slideshow"} onClick={() => setManualPause((value) => !value)}>{manualPause ? "Play" : "Pause"}</button>
        </div>
      </div>
    </section>
  );
}

export default Slider;