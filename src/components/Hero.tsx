import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, GraduationCap, Sparkles } from "lucide-react";

interface HeroProps {
  onStartJourney: () => void;
  onExplorePrograms: () => void;
}

export default function Hero({ onStartJourney, onExplorePrograms }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 scroll-mt-28 flex items-center overflow-hidden bg-gradient-to-b from-cream via-peach-soft/60 to-cream"
    >
      {/* Soft, warm ambient shapes — CSS only, no canvas, so the page loads fast */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-peach/30 blur-3xl animate-drift-slow" />
        <div className="absolute bottom-0 left-1/3 w-[360px] h-[360px] rounded-full bg-antique-gold/10 blur-3xl animate-drift-slow-reverse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left Aligned Content */}
        <div className="lg:col-span-7 flex flex-col items-start gap-8 text-left animate-fade-in-up">
          <div className="relative z-20 inline-flex items-center gap-2.5 bg-white border-2 border-antique-gold rounded-full px-6 py-2.5 shadow-[0_8px_24px_rgba(122,27,36,0.25),inset_0_1px_1px_rgba(255,255,255,0.9)]">
            <Sparkles className="w-4 h-4 text-antique-gold shrink-0" />
            <span
              className="font-serif text-lg sm:text-xl font-black uppercase tracking-[0.1em] text-[#7A1B24]"
              style={{ WebkitTextStroke: "0.8px #7A1B24" }}
            >
              Career And University Admission Advisory
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-heritage-burgundy leading-tight tracking-tight">
            Your Trusted Guide to <br />
            <span className="text-heritage-maroon">
              Academic &amp; Professional
            </span>{" "}
            Success.
          </h1>

          <p className="font-sans text-base sm:text-lg text-ink/75 max-w-xl leading-relaxed">
            Empowering discerning students with elite college admissions consulting, high-impact skill mastery,
            corporate GDPI prep, and academic advisory{" "}
            <span className="text-heritage-maroon font-semibold">tailored to every student</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={onStartJourney}
              className="btn-shine px-8 py-4 rounded-full font-sans font-bold text-base shadow-md bg-heritage-maroon text-cream hover:bg-heritage-burgundy hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onExplorePrograms}
              className="px-8 py-4 rounded-full font-sans font-bold text-base border-2 border-heritage-maroon/40 text-heritage-maroon hover:bg-peach/40 hover:border-heritage-maroon active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Programs
              <Compass className="w-5 h-5" />
            </button>
            <Link
              to="/invite-us"
              className="px-8 py-4 rounded-full font-sans font-bold text-base border-2 border-antique-gold/50 text-heritage-burgundy bg-antique-gold/10 hover:bg-antique-gold/20 hover:border-antique-gold active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Invite Us
              <GraduationCap className="w-5 h-5" />
            </Link>
          </div>

          {/* Core Trust Indicators */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-6 pb-2 px-3 sm:px-6 w-full max-w-md rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 shadow-[0_8px_30px_rgba(122,27,36,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)]">
            <div className="min-w-0">
              <p className="font-serif text-lg sm:text-2xl font-bold text-heritage-maroon truncate">Trusted</p>
              <p className="text-[10px] sm:text-xs text-ink/50 uppercase tracking-wider font-sans truncate">By Families</p>
            </div>
            <div className="min-w-0">
              <p className="font-serif text-lg sm:text-2xl font-bold text-heritage-maroon truncate">University</p>
              <p className="text-[10px] sm:text-xs text-ink/50 uppercase tracking-wider font-sans truncate">Degree Programs</p>
            </div>
            <div className="min-w-0">
              <p className="font-serif text-lg sm:text-2xl font-bold text-heritage-maroon truncate">Diverse</p>
              <p className="text-[10px] sm:text-xs text-ink/50 uppercase tracking-wider font-sans truncate">Certificate Courses</p>
            </div>
          </div>
        </div>

        {/* Right side: the curved peacock feather illustration, gently pivoting from its
            quill tip like a pen actively writing — the same motion language as the brand's
            quill logo, but kept here instead of the (now stable) navbar mark. An open book
            sits beneath it, positioned so the feather's nib appears to be writing on the
            page. A soft radial glow lifts both off the cream background. */}
        <div className="lg:col-span-5 h-[380px] sm:h-[440px] lg:h-[500px] pointer-events-none flex flex-col items-center justify-center relative" style={{ perspective: "1000px" }}>
          {/* Ambient glow halo behind the composition */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full blur-3xl animate-flute-glow"
            style={{ background: "radial-gradient(circle, rgba(47,168,142,0.4) 0%, rgba(79,227,209,0.18) 55%, transparent 75%)" }}
          />

          {/* Quill: outer wrapper sweeps side to side (animate-feather-sweep, translateX — doesn't
              affect layout, so the book below stays put), inner image keeps its small pivoting
              wobble (animate-pen-write) from the nib tip. Together they read as a hand actually
              writing a line across the page, rather than a pen just bobbing in place. */}
          <div className="relative z-20 animate-feather-sweep">
            <picture>
              <source
                srcSet="/peacock-feather-hero-400w.webp 400w, /peacock-feather-hero.webp 640w"
                sizes="(min-width: 1024px) 290px, (min-width: 640px) 250px, 200px"
                type="image/webp"
              />
              <img
                src="/peacock-feather-hero.png"
                alt="Curved peacock feather illustration"
                width={640}
                height={640}
                loading="eager"
                fetchPriority="high"
                className="w-[200px] sm:w-[250px] lg:w-[290px] h-auto drop-shadow-[0_20px_45px_rgba(20,107,92,0.45)] drop-shadow-[0_0_30px_rgba(79,227,209,0.35)] animate-pen-write"
                style={{ transformOrigin: "13% 95%" }}
              />
            </picture>
          </div>

          {/* Open book: pulled up to overlap the quill's transparent margin so the nib
              visibly meets the page instead of floating above it */}
          <div className="relative z-10 -mt-10 sm:-mt-14 lg:-mt-16">
            <picture>
              <source
                srcSet="/hero-open-book-cropped-560w.webp 560w, /hero-open-book-cropped.webp 900w"
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 360px, 280px"
                type="image/webp"
              />
              <img
                src="/hero-open-book-cropped.png"
                alt="Open journal page"
                width={900}
                height={511}
                loading="eager"
                className="w-[280px] sm:w-[360px] lg:w-[440px] h-auto drop-shadow-[0_25px_35px_rgba(58,36,28,0.35)]"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
