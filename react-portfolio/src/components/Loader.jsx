import React, { useEffect, useRef, useState } from "react";
import { getAudioCtx, playMechanicalClick } from "../utils/audio";
import "../loader.css";

export default function Loader({ onComplete }) {
  const rootRef = useRef(null);
  const completedRef = useRef(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const lastActiveIndexRef = useRef(-1);

  useEffect(() => {
    const unlock = () => {
      getAudioCtx();
      setHasInteracted(true);
      window.removeEventListener("mousedown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("wheel", unlock, { passive: true });
    };

    window.addEventListener("mousedown", unlock);
    window.addEventListener("touchstart", unlock);
    window.addEventListener("keydown", unlock);
    window.addEventListener("wheel", unlock, { passive: true });

    const root = rootRef.current;
    if (!root) return;

    const list = root.querySelector("ul");
    const items = [...list.children];

    list.style.setProperty("--count", items.length);

    items.forEach((item, i) => {
      item.style.setProperty("--i", i);
    });

    root.dataset.snap = "true";
    root.dataset.animate = "true";

    // Set colors matching design9 behavior
    const start = 25;
    const end = 100;
    root.style.setProperty("--start", start);
    root.style.setProperty("--hue", start);
    root.style.setProperty("--end", end);

    const startIndex = 4;
    const index = Math.max(0, Math.min(startIndex, items.length - 1));
    const target = items[index];

    if (target) {
      // Small timeout to allow render before calculating offsets
      setTimeout(() => {
        const offset = target.offsetTop - (root.clientHeight / 2) + (target.clientHeight / 2);
        root.scrollTop = offset;
        handleScroll(); // Trigger initial state
      }, 50);
    }

    const handleScroll = () => {
      const currentScrollTop = root.scrollTop;
      const scrollCenter = currentScrollTop + root.clientHeight / 2;
      
      let activeIndex = -1;
      items.forEach((item, idx) => {
        const itemCenter = item.offsetTop + item.clientHeight / 2;
        const distance = Math.abs(scrollCenter - itemCenter);
        
        if (distance < 50) {
          item.style.opacity = "1";
          item.style.filter = "brightness(1.4)";
          activeIndex = idx;
        } else {
          item.style.opacity = "0.2";
          item.style.filter = "brightness(1)";
        }
      });

      // Play sound whenever the active item changes ("each roll")
      if (activeIndex !== -1 && activeIndex !== lastActiveIndexRef.current) {
        // Only play if it's not the initial state (unless we want sound on first render)
        if (lastActiveIndexRef.current !== -1) {
          playMechanicalClick();
        }
        lastActiveIndexRef.current = activeIndex;
      }

      // Trigger completion when within 50px of the bottom
      if (root.scrollTop + root.clientHeight >= root.scrollHeight - 50) {
        if (!completedRef.current) {
          completedRef.current = true;
          if (onComplete) {
            onComplete();
          }
        }
      }
    };

    root.addEventListener("scroll", handleScroll);
    return () => {
      root.removeEventListener("scroll", handleScroll);
    };
  }, [onComplete]);

  return (
    <section 
      className="word-scroll fluid loader-container" 
      ref={rootRef}
      onPointerDown={() => {
        getAudioCtx();
        setHasInteracted(true);
      }}
    >
      {!hasInteracted && (
        <div className="loader-interaction-hint">
          <span>click here to start</span>
        </div>
      )}
      <div className="scroll-spacer"></div>
      <div className="word-scroll-inner">
        <h2 className="heading-2 heading-sm">
          <span aria-hidden="true">I build&nbsp;</span>
          <span className="sr-only">I build products, systems, platforms, and infrastructure.</span>
        </h2>
        <ul>
          <li>products.</li>
          <li>platforms.</li>
          <li>web applications.</li>
          <li>interfaces.</li>
          <li>design systems.</li>
          <li>API platforms.</li>
          <li>backend services.</li>
          <li>distributed systems.</li>
          <li>data architectures.</li>
          <li>automation pipelines.</li>
          <li>infrastructure.</li>
          <li>developer tooling.</li>
          <li>performance systems.</li>
          <li>edge platforms.</li>
          <li>secure systems.</li>
          <li>resilient architectures.</li>
          <li>scalable software.</li>
          <li>technical foundations.</li>
        </ul>
      </div>
      <div className="scroll-spacer"></div>
    </section>
  );
}
