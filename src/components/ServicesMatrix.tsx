import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ServiceProgram } from "../types";
import Reveal from "./Reveal";
import { COURSE_CATEGORIES } from "../data/courses";
import { CERTIFICATE_GROUPS } from "../data/certificates";
import { TUITION_SUBJECTS } from "../data/tuition";
import {
  ArrowRight,
  GraduationCap,
  Award,
  Sparkles,
  CheckCircle2,
  BookOpenText
} from "lucide-react";

interface ServicesMatrixProps {
  onSelectProgram: (program: ServiceProgram) => void;
  onBookCounseling: (programName?: string) => void;
}

/** Wraps children with a subtle mouse-driven 3D tilt for a more dynamic, dimensional feel. */
function TiltCard({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -6;
    const rotateY = ((x - rect.width / 2) / rect.width) * 6;
    el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.15s ease-out, box-shadow 0.3s ease" }}
      className={`will-change-transform ${className || ""}`}
    >
      {children}
    </div>
  );
}

export default function ServicesMatrix({ onBookCounseling }: ServicesMatrixProps) {
  // A handful of top-level category names to preview inside each hub card.
  const coursePreview = COURSE_CATEGORIES.slice(0, 6).map((c) => c.title);
  const certPreview = CERTIFICATE_GROUPS.flatMap((g) => g.items).slice(0, 6);

  return (
    <section
      id="services"
      className="relative py-24 scroll-mt-20 bg-gradient-to-b from-cream via-peach-soft/40 to-cream text-ink overflow-hidden"
    >
      {/* Dynamic Stardust Background Light */}
      <div className="absolute top-1/4 right-[10%] w-80 h-80 bg-peach/30 rounded-full blur-3xl pointer-events-none animate-drift-slow" />
      <div className="absolute bottom-1/4 left-[10%] w-96 h-96 bg-heritage-maroon/10 rounded-full blur-3xl pointer-events-none animate-drift-slow-reverse" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-heritage-maroon">
            Elite Academic Services
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-heritage-burgundy tracking-tight">
            Three Pathways to Your Future
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold mx-auto rounded-full" />
          <p className="font-sans text-sm sm:text-base text-ink/70 max-w-lg mx-auto">
            Whether you're chasing a full degree, a sharp placement-ready skill, or steady school-level tuition —
            we've mapped every route to get you there.
          </p>
        </Reveal>

        {/* Three Hub Cards: Degree Courses, Certificate Courses & School Tuition */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Degree Courses Hub */}
          <Reveal delayMs={0}>
            <TiltCard className="group h-full">
              <div className="card-lift relative flex flex-col h-full glass-card p-8 sm:p-10 rounded-3xl overflow-hidden">
                {/* Card-wide navigation. Kept as its own element (rather than wrapping the
                    whole card, including the Enquire button below) because a <button>
                    nested inside an <a> is invalid HTML — browsers split it back out when
                    parsing the pre-rendered page, silently detaching the click handler
                    from the button before React finishes mounting. This overlay gives the
                    same "click anywhere to browse" behaviour without that bug. */}
                <Link to="/courses" className="absolute inset-0 z-0" aria-label="Browse all degree courses" />
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-heritage-burgundy via-heritage-maroon to-heritage-crimson" />
                <div className="absolute inset-0 bg-gradient-to-tr from-heritage-maroon/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="relative flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-heritage-maroon/20 to-heritage-crimson/10 border border-antique-gold/20 flex items-center justify-center group-hover:scale-110 group-hover:border-sunlight-gold/50 transition-all duration-300 shadow-md">
                    <GraduationCap className="w-7 h-7 text-heritage-maroon" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider bg-heritage-burgundy/5 border border-antique-gold/20 text-heritage-maroon px-3 py-1.5 rounded-full">
                    Programs
                  </span>
                </div>

                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-heritage-maroon/80 mb-2 block">
                  Divine Placements
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-heritage-burgundy mb-3 group-hover:text-heritage-maroon transition-colors">
                  Degree Courses
                </h3>
                <p className="font-sans text-sm text-ink/70 leading-relaxed mb-6">
                  BBA, MBA, B.Tech, Law, and other qualification levels — full
                  admission guidance into top-tier colleges.
                </p>

                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
                  {coursePreview.map((title) => (
                    <li key={title} className="flex items-center gap-1.5 text-xs font-sans text-ink/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-antique-gold shrink-0" />
                      <span className="truncate">{title}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between pt-5 border-t border-heritage-maroon/10">
                  <span className="text-xs font-mono uppercase tracking-widest text-heritage-maroon/80 group-hover:text-heritage-burgundy transition-colors flex items-center gap-2">
                    Browse All Degree Courses
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onBookCounseling("Degree Courses");
                    }}
                    className="relative z-10 text-xs font-sans font-bold bg-cream border border-heritage-maroon/15 hover:border-sunlight-gold hover:bg-sunlight-gold hover:text-cosmic-midnight px-3 py-1.5 rounded-full transition-all shrink-0"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Certificate Courses Hub */}
          <Reveal delayMs={90}>
            <TiltCard className="group h-full">
              <div className="card-lift relative flex flex-col h-full glass-card p-8 sm:p-10 rounded-3xl overflow-hidden">
                <Link to="/certificates" className="absolute inset-0 z-0" aria-label="Browse all certificate courses" />
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold" />
                <div className="absolute inset-0 bg-gradient-to-tr from-heritage-maroon/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="relative flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-heritage-maroon/20 to-heritage-crimson/10 border border-antique-gold/20 flex items-center justify-center group-hover:scale-110 group-hover:border-sunlight-gold/50 transition-all duration-300 shadow-md">
                    <Award className="w-7 h-7 text-heritage-maroon" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider bg-heritage-burgundy/5 border border-antique-gold/20 text-heritage-maroon px-3 py-1.5 rounded-full">
                    Courses
                  </span>
                </div>

                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-heritage-maroon/80 mb-2 block">
                  Tactical Preparedness
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-heritage-burgundy mb-3 group-hover:text-heritage-maroon transition-colors">
                  Certificate Courses
                </h3>
                <p className="font-sans text-sm text-ink/70 leading-relaxed mb-6">
                  Short-term, placement-oriented skill courses — from Digital Marketing to English Speaking Mastery
                  and GDPI training — designed to get you interview-ready fast.
                </p>

                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
                  {certPreview.map((title) => (
                    <li key={title} className="flex items-center gap-1.5 text-xs font-sans text-ink/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-antique-gold shrink-0" />
                      <span className="truncate">{title}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between pt-5 border-t border-heritage-maroon/10">
                  <span className="text-xs font-mono uppercase tracking-widest text-heritage-maroon/80 group-hover:text-heritage-burgundy transition-colors flex items-center gap-2">
                    Browse All Certificate Courses
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onBookCounseling("Certificate Courses");
                    }}
                    className="relative z-10 text-xs font-sans font-bold bg-cream border border-heritage-maroon/15 hover:border-sunlight-gold hover:bg-sunlight-gold hover:text-cosmic-midnight px-3 py-1.5 rounded-full transition-all shrink-0"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* School Tuition Hub */}
          <Reveal delayMs={180}>
            <TiltCard className="group h-full">
              <div className="card-lift relative flex flex-col h-full glass-card p-8 sm:p-10 rounded-3xl overflow-hidden">
                <Link to="/tuition" className="absolute inset-0 z-0" aria-label="Explore school tuition" />
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-heritage-crimson via-antique-gold to-heritage-maroon" />
                <div className="absolute inset-0 bg-gradient-to-tr from-heritage-maroon/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="relative flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-heritage-maroon/20 to-heritage-crimson/10 border border-antique-gold/20 flex items-center justify-center group-hover:scale-110 group-hover:border-sunlight-gold/50 transition-all duration-300 shadow-md">
                    <BookOpenText className="w-7 h-7 text-heritage-maroon" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider bg-heritage-burgundy/5 border border-antique-gold/20 text-heritage-maroon px-3 py-1.5 rounded-full">
                    CBSE XI–XII
                  </span>
                </div>

                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-heritage-maroon/80 mb-2 block">
                  Foundations, Reinforced
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-heritage-burgundy mb-3 group-hover:text-heritage-maroon transition-colors">
                  School Tuition
                </h3>
                <p className="font-sans text-sm text-ink/70 leading-relaxed mb-6">
                  One-on-one CBSE Class 11–12 tuition in Business Studies and Economics at our centre — the
                  same faculty rigor, adapted for board exams.
                </p>

                <ul className="grid grid-cols-1 gap-y-2 mb-8">
                  {TUITION_SUBJECTS.map((s) => (
                    <li key={s.slug} className="flex items-center gap-1.5 text-xs font-sans text-ink/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-antique-gold shrink-0" />
                      <span className="truncate">{s.label} ({s.tag})</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between pt-5 border-t border-heritage-maroon/10">
                  <span className="text-xs font-mono uppercase tracking-widest text-heritage-maroon/80 group-hover:text-heritage-burgundy transition-colors flex items-center gap-2">
                    Explore Tuition
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onBookCounseling("Tuition: General Enquiry");
                    }}
                    className="relative z-10 text-xs font-sans font-bold bg-cream border border-heritage-maroon/15 hover:border-sunlight-gold hover:bg-sunlight-gold hover:text-cosmic-midnight px-3 py-1.5 rounded-full transition-all shrink-0"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        {/* Supporting note */}
        <Reveal delayMs={140} className="flex items-center justify-center gap-2 mt-10">
          <Sparkles className="w-4 h-4 text-antique-gold" />
          <p className="font-sans text-xs sm:text-sm text-ink/60 text-center">
            Not sure which path fits you? Book a free counseling session and we'll map it out together.
          </p>
        </Reveal>
      </div>
    </section>
  );
}