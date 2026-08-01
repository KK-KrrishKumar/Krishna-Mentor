import React, { useState } from "react";
import { ROADMAP_STEPS } from "../data";
import { Sparkles, CheckCircle2, ChevronRight, GraduationCap, Flame, Eye, Compass } from "lucide-react";
import Reveal from "./Reveal";

export default function TimelineRoadmap() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="process"
      className="relative py-24 scroll-mt-20 bg-gradient-to-b from-parchment to-cream text-ink overflow-hidden"
    >
      {/* Decorative Traditional Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-antique-gold/[0.06] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-heritage-maroon flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sunlight-gold" />
            Milestone Map
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-heritage-burgundy tracking-tight">
            Our Mentorship Process
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold mx-auto rounded-full" />
          <p className="font-sans text-sm sm:text-base text-ink/70">
            Interactive guide mapping the step-by-step transformation of student capabilities under the strategic counseling of Krishna Mentor. Click each step below.
          </p>
        </Reveal>

        {/* Desktop Timeline (Progress Divine with glowing pearl nodes) */}
        <div className="hidden md:block relative max-w-5xl mx-auto mb-16">

          {/* Line + nodes get their own fixed-height row, so the line's vertical center is
              pinned to the nodes — not to the overall block including the text below it. */}
          <div className="relative h-7">
            {/* Progress Divine thread (Background line) */}
            <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-heritage-maroon/15 -translate-y-1/2 z-0" />

            {/* Active Progress Line (Gold Thread) */}
            <div
              className="absolute top-1/2 left-10 h-0.5 bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold -translate-y-1/2 z-0 transition-all duration-500 ease-out"
              style={{ width: `${(activeStep / (ROADMAP_STEPS.length - 1)) * 90}%` }}
            />

            <div className="flex justify-between items-center relative z-10 h-full">
              {ROADMAP_STEPS.map((step, idx) => {
                const isCompleted = idx < activeStep;
                const isActive = idx === activeStep;

                return (
                  <button
                    key={step.number}
                    onClick={() => setActiveStep(idx)}
                    className="flex justify-center focus:outline-none group w-1/4"
                    aria-label={`Go to step ${step.number}: ${step.title}`}
                  >
                    {/* Glowing Pearl Node */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-sunlight-gold ring-4 ring-antique-gold/40 scale-125 shadow-[0_0_15px_#F9DF8D]"
                          : isCompleted
                          ? "bg-heritage-crimson ring-2 ring-cream shadow-[0_0_10px_rgba(25,114,120,0.5)]"
                          : "bg-peach-soft border border-heritage-maroon/20 group-hover:border-antique-gold"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-cream" />
                      ) : (
                        <div className={`w-2 h-2 rounded-full ${isActive ? "bg-cosmic-midnight" : "bg-heritage-maroon/40 group-hover:bg-heritage-maroon"}`} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step Title & Subtitle — its own row, with real breathing room below the line */}
          <div className="flex justify-between mt-6">
            {ROADMAP_STEPS.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center text-center focus:outline-none group w-1/4"
                >
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-heritage-maroon block">
                    Step {step.number}: {step.subtitle}
                  </span>
                  <h3 className={`font-serif text-lg font-bold mt-1 transition-colors ${isActive ? "text-heritage-burgundy scale-105" : "text-ink/50 group-hover:text-heritage-burgundy"}`}>
                    {step.title}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile View Timeline (Vertical list) */}
        <div className="md:hidden space-y-6 mb-12">
          {ROADMAP_STEPS.map((step, idx) => {
            const isActive = idx === activeStep;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-6 rounded-xl border flex items-start gap-4 transition-all ${
                  isActive 
                    ? "bg-peach/50 border-heritage-maroon shadow-md" 
                    : "bg-cream border-heritage-maroon/10"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-bold shrink-0 ${
                  isActive ? "bg-sunlight-gold text-cosmic-midnight" : "bg-peach-soft text-ink/60"
                }`}>
                  0{step.number}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-heritage-maroon block">
                    {step.subtitle}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-heritage-burgundy mt-0.5">
                    {step.title}
                  </h3>
                  {isActive && (
                    <p className="font-sans text-xs text-ink/75 mt-2 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card representing progress checklists */}
        <div className="relative max-w-4xl mx-auto">
          {/* Prev arrow — sits parallel to the card, vertically centered on its left edge */}
          <button
            type="button"
            onClick={() => setActiveStep((activeStep - 1 + ROADMAP_STEPS.length) % ROADMAP_STEPS.length)}
            aria-label="Previous phase"
            className="absolute left-1 sm:-left-5 lg:-left-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-cream/90 shadow-md border border-heritage-maroon/10 text-heritage-maroon/60 hover:text-heritage-maroon hover:bg-cream transition-colors"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>

          {/* Next arrow — sits parallel to the card, vertically centered on its right edge */}
          <button
            type="button"
            onClick={() => setActiveStep((activeStep + 1) % ROADMAP_STEPS.length)}
            aria-label="Next phase"
            className="absolute right-1 sm:-right-5 lg:-right-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-cream/90 shadow-md border border-heritage-maroon/10 text-heritage-maroon/60 hover:text-heritage-maroon hover:bg-cream transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="glass-card rounded-2xl p-8 md:p-10 border border-antique-gold/20 relative overflow-hidden animate-fade-in-up">
            {/* Subtle overlay glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-antique-gold/10 rounded-bl-full pointer-events-none" />

            <div className="max-w-2xl mx-auto text-center space-y-4">
              {/* Step summary block */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-antique-gold/20 border border-sunlight-gold/30 rounded-full">
                <span className="font-mono text-xs font-bold text-sunlight-gold">Phase 0{ROADMAP_STEPS[activeStep].number}</span>
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-heritage-burgundy">
                {ROADMAP_STEPS[activeStep].title}
              </h4>
              <p className="font-sans text-sm text-ink/75 leading-relaxed">
                {ROADMAP_STEPS[activeStep].description}
              </p>
            </div>
          </div>

          {/* Page counter, centered below the card */}
          <p className="text-center mt-4 text-xs font-mono text-heritage-maroon/50">
            0{activeStep + 1} / 0{ROADMAP_STEPS.length}
          </p>
        </div>

      </div>
    </section>
  );
}