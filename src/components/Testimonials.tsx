import React from "react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  // Duplicate the list once so the marquee can loop seamlessly at -50% translate
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="relative w-full bg-parchment py-24 scroll-mt-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14 space-y-4">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-heritage-maroon">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-heritage-burgundy">
            What Our Students & Families Say
          </h2>
        </div>
      </div>

      {/* Edge fade so cards appear to scroll in and out rather than clip abruptly */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-parchment to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-parchment to-transparent z-10" />

        <div className="group overflow-hidden">
          <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
            {loop.map((t, idx) => (
              <div
                key={`${t.id}-${idx}`}
                className="card-lift w-[320px] sm:w-[380px] shrink-0 rounded-2xl border border-heritage-maroon/10 bg-cream p-8 flex flex-col gap-5"
              >
                <p className="font-sans text-ink/75 leading-relaxed text-sm">"{t.quote}"</p>
                <div className="pt-4 border-t border-heritage-maroon/10">
                  <p className="font-serif text-heritage-burgundy font-semibold">{t.name}</p>
                  <p className="text-xs text-heritage-maroon/80 uppercase tracking-wide mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}