import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

/**
 * Fades and slides content into view the first time it enters the viewport.
 * Lightweight alternative to a full animation library for scroll-driven motion.
 */
export default function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Safety net: if IntersectionObserver isn't supported, or its callback
    // never fires for any reason (old browser, unusual zoom/layout, etc.),
    // force content visible after a short delay rather than hiding it forever.
    const fallback = window.setTimeout(() => setIsVisible(true), 1200);

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return () => window.clearTimeout(fallback);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
          window.clearTimeout(fallback);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
