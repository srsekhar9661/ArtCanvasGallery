import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function ScrollProgress() {
  const bar = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const page = document.scrollingElement || document.documentElement;
      const max = page.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, page.scrollTop / max)) : 0})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);
  return <div className="scroll-track" aria-hidden="true"><div className="scroll-bar" ref={bar} /></div>;
}

export default ScrollProgress;
