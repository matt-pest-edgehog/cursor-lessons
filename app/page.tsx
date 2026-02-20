"use client";

import { type MouseEvent, useEffect, useMemo, useState } from "react";
import EdgehogLogo from "./components/edgehog-logo";
import { slides } from "./lib/slides";

type Theme = "light" | "dark";

export default function Home() {
  const [active, setActive] = useState(0);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem("cursor-lessons-theme") as Theme | null;
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const total = slides.length;
  const slide = slides[active];

  const progress = useMemo(() => ((active + 1) / total) * 100, [active, total]);

  const prev = () => setActive((p) => (p > 0 ? p - 1 : p));
  const next = () => setActive((p) => (p < total - 1 ? p + 1 : p));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("cursor-lessons-theme", theme);
  }, [theme]);

  const toggleTheme = async (e: MouseEvent<HTMLButtonElement>) => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    if (!("startViewTransition" in document)) {
      setTheme(nextTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const maxX = Math.max(x, window.innerWidth - x);
    const maxY = Math.max(y, window.innerHeight - y);
    const endRadius = Math.hypot(maxX, maxY);

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    await transition.ready;
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 600,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  return (
    <div className="deck-root">
      <div className="deck-noise" />
      <main className="deck-main">
        <header className="deck-header">
          <EdgehogLogo className="deck-logo" variant="full" theme={theme} />
          <div className="deck-meta">
            <span>{slide.kicker}</span>
            <div className="deck-right-meta">
              <span>
                {active + 1}/{total}
              </span>
              <button type="button" className="theme-toggle" onClick={toggleTheme}>
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            </div>
          </div>
          <div className="deck-progress" aria-hidden>
            <div className="deck-progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </header>

        <section className="deck-slide" key={slide.id}>
          <h1>{slide.title}</h1>

          {slide.image && (
            <img
              src={slide.image.src}
              alt={slide.image.alt}
              className="deck-diagram"
            />
          )}

          {slide.sections.map((sec, i) => (
            <div key={sec.heading ?? i} className="deck-section">
              {sec.heading && <h2>{sec.heading}</h2>}
              <ul>
                {sec.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="deck-citations">
            {slide.citations.map((citation) => (
              <a key={citation.url} href={citation.url} target="_blank" rel="noreferrer">
                {citation.label}
              </a>
            ))}
          </div>
        </section>

        <footer className="deck-controls">
          <button type="button" onClick={prev} disabled={active === 0}>
            ← Prev
          </button>
          <span className="deck-kbd-hint">Arrow keys to navigate</span>
          <button type="button" onClick={next} disabled={active === total - 1}>
            Next →
          </button>
        </footer>
      </main>
    </div>
  );
}
