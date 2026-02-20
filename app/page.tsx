"use client";

import { useMemo, useState } from "react";
import EdgehogLogo from "./components/edgehog-logo";
import { slides } from "./lib/slides";

export default function Home() {
  const [active, setActive] = useState(0);
  const total = slides.length;
  const slide = slides[active];

  const progress = useMemo(() => ((active + 1) / total) * 100, [active, total]);

  const prev = () => setActive((p) => (p > 0 ? p - 1 : p));
  const next = () => setActive((p) => (p < total - 1 ? p + 1 : p));

  return (
    <div className="deck-root">
      <div className="deck-noise" />
      <main className="deck-main">
        <header className="deck-header">
          <EdgehogLogo className="deck-logo" />
          <div className="deck-meta">
            <span>{slide.kicker}</span>
            <span>
              {active + 1}/{total}
            </span>
          </div>
          <div className="deck-progress" aria-hidden>
            <div className="deck-progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </header>

        <section className="deck-slide" key={slide.id}>
          <h1>{slide.title}</h1>
          <ul>
            {slide.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

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
            Prev
          </button>
          <button type="button" onClick={next} disabled={active === total - 1}>
            Next
          </button>
        </footer>
      </main>
    </div>
  );
}
