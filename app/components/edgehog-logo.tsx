"use client";

import { useEffect, useState } from "react";

type EdgehogLogoProps = {
  className?: string;
  staticMode?: boolean;
};

const SPIKES = [
  { x: -20, y: -42, r: -20 },
  { x: 0, y: -48, r: 0 },
  { x: 22, y: -42, r: 20 },
  { x: 38, y: -24, r: 48 },
  { x: 42, y: 0, r: 90 },
  { x: 36, y: 24, r: 132 },
  { x: -36, y: -26, r: -46 },
];

export function EdgehogLogo({ className = "", staticMode = false }: EdgehogLogoProps) {
  const [hovered, setHovered] = useState(false);
  const [winking, setWinking] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setWinking(true);
      setTimeout(() => setWinking(false), 220);
    }, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <button
      type="button"
      aria-label="Edgehog logo"
      className={`logo-wrap ${className}`}
      onMouseEnter={() => !staticMode && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setWinking(true);
        setTimeout(() => setWinking(false), 220);
      }}
    >
      <svg viewBox="-90 -90 180 180" className="logo-svg" role="img">
        <g>
          {SPIKES.map((spike, i) => (
            <polygon
              key={`${spike.x}-${spike.y}-${i}`}
              points="0,-8 4,8 -4,8"
              className="logo-spike"
              style={{
                transform: `translate(${spike.x}px, ${spike.y}px) rotate(${spike.r}deg) ${
                  hovered ? "translateY(-8px)" : ""
                }`,
              }}
            />
          ))}
        </g>

        <ellipse cx="-38" cy="10" rx="5" ry="5" className="logo-face" />
        <ellipse
          cx="-16"
          cy="-6"
          rx="4.8"
          ry={winking ? 0.8 : 4.8}
          className={`logo-eye ${winking ? "logo-eye-now" : "logo-eye-auto"}`}
        />
        <ellipse cx="0" cy="0" rx="40" ry="32" className="logo-face" />
      </svg>
    </button>
  );
}

export default EdgehogLogo;
