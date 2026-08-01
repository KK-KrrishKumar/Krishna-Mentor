import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface FlipBookPage {
  icon?: LucideIcon;
  eyebrow?: string;
  title: string;
  body: React.ReactNode;
}

interface MentorFlipBookProps {
  pages: FlipBookPage[];
}

// A book the visitor can actually "flip" through — each page rotates in on the Y axis with a
// perspective transform, pivoting from the edge it's entering from, so it reads as a genuine
// page turn rather than a plain slide/fade. Built on framer-motion (already a project
// dependency) rather than pulling in a dedicated page-flip library, keeping this self-contained.
export default function MentorFlipBook({ pages }: MentorFlipBookProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = pages.length;
  const page = pages[index];
  const Icon = page.icon;

  const goTo = (next: number, dir: number) => {
    if (next < 0 || next >= total) return;
    setDirection(dir);
    setIndex(next);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Book frame */}
      <div
        className="relative rounded-2xl border border-antique-gold/25 bg-gradient-to-br from-[#fdf6e8] to-[#f6ecd8] shadow-[0_25px_60px_rgba(74,14,20,0.25)] overflow-hidden"
        style={{ perspective: "1600px" }}
      >
        {/* Spine shadow down the left edge, for a bound-book feel */}
        <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-20" />
        {/* Page-edge lines on the right, like a stack of paper */}
        <div className="absolute right-0 top-3 bottom-3 w-2 flex flex-col justify-between pointer-events-none z-20 opacity-60">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-px bg-heritage-maroon/15" />
          ))}
        </div>

        <div className="relative min-h-[420px] sm:min-h-[380px] p-8 sm:p-10" style={{ transformStyle: "preserve-3d" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ rotateY: direction > 0 ? 78 : -78, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: direction > 0 ? -78 : 78, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.45, 0, 0.55, 1] }}
              style={{
                transformOrigin: direction > 0 ? "left center" : "right center",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                {Icon && (
                  <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-heritage-maroon to-heritage-crimson flex items-center justify-center text-cream shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </span>
                )}
                <div>
                  {page.eyebrow && (
                    <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-heritage-crimson/70">
                      {page.eyebrow}
                    </p>
                  )}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-heritage-burgundy leading-snug">
                    {page.title}
                  </h3>
                </div>
              </div>

              <div className="font-sans text-sm sm:text-[15px] text-ink/80 leading-relaxed space-y-3">
                {page.body}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Page number, bottom-right, like a printed folio */}
        <div className="absolute bottom-4 right-6 text-[11px] font-mono text-heritage-maroon/40 z-20">
          {index + 1} / {total}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={() => goTo(index - 1, -1)}
          disabled={index === 0}
          aria-label="Previous page"
          className="w-11 h-11 rounded-full border border-heritage-maroon/20 bg-white flex items-center justify-center text-heritage-maroon hover:bg-heritage-maroon hover:text-cream disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-heritage-maroon transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i, i > index ? 1 : -1)}
              aria-label={`Go to page ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-antique-gold" : "w-2 bg-heritage-maroon/20 hover:bg-heritage-maroon/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1, 1)}
          disabled={index === total - 1}
          aria-label="Next page"
          className="w-11 h-11 rounded-full border border-heritage-maroon/20 bg-white flex items-center justify-center text-heritage-maroon hover:bg-heritage-maroon hover:text-cream disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-heritage-maroon transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
