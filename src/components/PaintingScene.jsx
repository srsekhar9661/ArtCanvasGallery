import { useEffect, useState } from "react";

// A decorative SVG studio scene. It does not contain, imitate or transform gallery artwork.
function PaintingScene({ active }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!active || started) return;
    const frame = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(frame);
  }, [active, started]);
  return (
    <div className={`painting-scene ${started ? "scene-started" : ""} ${active ? "" : "scene-paused"}`} aria-hidden="true" data-painting-scene>
      <div className="studio-light" />
      <svg className="studio-illustration" viewBox="0 0 720 690" role="presentation" focusable="false">
        <defs>
          <linearGradient id="studio-canvas" x2=".7" y2="1"><stop stopColor="#f5ecda" /><stop offset="1" stopColor="#dbccb4" /></linearGradient>
          <linearGradient id="studio-shadow" x2="1" y2=".8"><stop stopColor="#b6916e" /><stop offset="1" stopColor="#6e5544" /></linearGradient>
          <clipPath id="canvas-clip"><rect x="160" y="67" width="390" height="443" /></clipPath>
        </defs>
        <ellipse cx="382" cy="632" rx="267" ry="32" fill="#060d0e" opacity=".44" />
        <path d="M345 473 251 634M390 479 519 633M363 460 360 645" stroke="#5e3f2b" strokeWidth="19" strokeLinecap="round" />
        <path d="M152 61h406v458H152z" fill="#533b30" />
        <path d="M161 67h389v443H161z" fill="url(#studio-canvas)" />
        <path d="M154 520h408l24 17H132z" fill="#9e7455" />
        <g clipPath="url(#canvas-clip)" className="paint-composition">
          <path className="paint-stroke stroke-one" d="M220 405C272 292 374 209 514 159" stroke="#a66b4e" strokeWidth="48" fill="none" strokeLinecap="round" />
          <path className="paint-stroke stroke-two" d="M187 363C299 399 422 342 498 266" stroke="#b6976d" strokeWidth="31" fill="none" strokeLinecap="round" />
          <path className="paint-stroke stroke-three" d="M278 451C350 394 411 391 510 438" stroke="#476b70" strokeWidth="34" fill="none" strokeLinecap="round" />
          <path className="paint-stroke stroke-four" d="M315 160C311 264 377 250 419 200" stroke="#718176" strokeWidth="18" fill="none" strokeLinecap="round" />
          <circle className="paint-dot" cx="462" cy="156" r="14" fill="#b58a62" />
          <circle className="paint-dot" cx="241" cy="236" r="8" fill="#476b70" />
          <circle className="paint-dot" cx="480" cy="373" r="6" fill="#a66b4e" />
        </g>
        <g className="studio-brush" transform="translate(565 92) rotate(21)">
          <path d="M0 0 11 2 12 300 1 300Z" fill="#b7895f" />
          <path d="M1 258h11v26H1z" fill="#b8a798" />
          <path d="M1 284h11l-5 41Z" fill="#b46e52" />
        </g>
        <path d="M89 574h135l-22 16H105z" fill="#c0a380" />
        <path d="M113 576 103 636M200 577l12 59" stroke="#68513d" strokeWidth="11" strokeLinecap="round" />
        <circle cx="142" cy="569" r="12" fill="#9f6c50" /><circle cx="170" cy="568" r="10" fill="#45666c" />
      </svg>
      <span className="scene-caption">A decorative study of creation / not a gallery painting</span>
    </div>
  );
}

export default PaintingScene;
