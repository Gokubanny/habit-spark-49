import { useEffect, useRef, useState } from "react";
import hero1 from "@/assets/hero-human-1.jpg";
import hero2 from "@/assets/hero-human-2.jpg";
import hero3 from "@/assets/hero-human-3.jpg";

const slides = [
  { src: hero1, alt: "Woman journaling by a sunlit window" },
  { src: hero2, alt: "Man meditating by a window at sunrise" },
  { src: hero3, alt: "Figure walking a misty forest path at sunrise" },
];

const INTERVAL_MS = 6000;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // Mouse parallax (desktop only — pointer:fine)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setParallax({ x: px, y: py }));
    };
    const onLeave = () => setParallax({ x: 0, y: 0 });

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Translate parallax to subtle shift (max ~12px)
  const tx = parallax.x * 14;
  const ty = parallax.y * 10;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {slides.map((s, i) => {
        const isActive = i === active;
        return (
          <img
            key={s.src}
            src={s.src}
            alt={isActive ? s.alt : ""}
            width={1920}
            height={1080}
            aria-hidden={isActive ? undefined : true}
            className={`absolute inset-0 w-full h-full object-cover object-right select-none transition-opacity ease-out ${
              isActive ? "opacity-100 hero-kenburns" : "opacity-0"
            }`}
            style={{
              transitionDuration: "1400ms",
              transform: `translate3d(${tx}px, ${ty}px, 0)`,
              willChange: "transform, opacity",
            }}
          />
        );
      })}

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-auto z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
