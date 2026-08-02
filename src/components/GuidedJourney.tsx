import React from "react";

// The flute (Krishna's) opens directly into a winding road — a literal "the path starts with
// guidance" visual. Gentle float on the whole piece, a warm glow pulsing behind the flute's
// mouth (reusing the site's existing flute-glow-pulse keyframe), and a small light traveling
// along the road via native SVG <animateMotion> to suggest an actual journey being walked.
export default function GuidedJourney() {
  return (
    <section className="relative w-full bg-gradient-to-b from-cream to-peach-soft/50 py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 order-2 lg:order-1">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-sunlight-gold">
            Our Approach
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-heritage-burgundy leading-tight">
            We Help You Find — and Follow — Your Own Path
          </h2>
          <p className="font-sans text-ink/75 leading-relaxed max-w-lg">
            Every student's story is different. Rather than pushing a one-size-fits-all formula, our
            advisors trace your interests, strengths, and goals to uncover the academic path that
            genuinely fits you — then walk that path with you, step by step.
          </p>
        </div>

        <div className="order-1 lg:order-2 flex justify-center">
          <div className="relative w-full max-w-md animate-float-feather">
            {/* Warm glow behind the flute's mouth, where the road begins */}
            <div
              className="absolute left-[8%] top-[38%] w-40 h-40 rounded-full blur-3xl animate-flute-glow pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(233,163,71,0.55) 0%, rgba(201,149,68,0.2) 55%, transparent 75%)" }}
            />

            <picture>
              <source
                srcSet="/flute-road-path-640w.webp 640w, /flute-road-path.webp 900w"
                sizes="(min-width: 1024px) 448px, 90vw"
                type="image/webp"
              />
              <img
                src="/flute-road-path.png"
                alt="Krishna's flute opening into a winding road, symbolizing a guided path forward"
                width={900}
                height={720}
                loading="lazy"
                className="relative w-full h-auto drop-shadow-[0_20px_40px_rgba(74,14,20,0.2)]"
              />
            </picture>

            {/* A small light traveling the length of the road, end to end, on loop */}
            <svg viewBox="0 0 1402 1122" className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <radialGradient id="gj-spark" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFE9B8" stopOpacity="1" />
                  <stop offset="55%" stopColor="#E9A347" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#E9A347" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path
                id="gj-road-path"
                d="M 650 555
                   C 480 640, 300 700, 235 860
                   C 175 1005, 320 1040, 460 940
                   C 640 815, 560 700, 760 610
                   C 950 525, 1000 470, 945 395
                   C 895 320, 995 300, 1080 335
                   C 1160 370, 1195 300, 1150 260
                   C 1105 222, 1180 205, 1235 215"
                fill="none"
                stroke="none"
              />
              <circle r="16" fill="url(#gj-spark)">
                <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#gj-road-path" />
                </animateMotion>
              </circle>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
