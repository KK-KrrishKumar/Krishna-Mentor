import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Sparkles,
  ArrowRight,
  Mic,
  Users,
  TrendingUp,
  Megaphone,
  FileSearch,
  CheckCircle2
} from "lucide-react";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import { CERTIFICATE_GROUPS } from "../data/certificates";
import { CERTIFICATES_SEO, CERTIFICATES_STRUCTURED_DATA } from "../data/certificatesMeta";

interface CertificatesPageProps {
  onBookCounseling: (programName?: string) => void;
}

// Rich presentation detail for each of the five placement-oriented courses —
// this is the only group left after retiring the 30-item management list, so
// each course now gets a proper spotlight instead of being buried in an accordion.
const COURSE_SPOTLIGHT: Record<string, { icon: React.ElementType; pitch: string; points: string[] }> = {
  "English Speaking Course: Basic and Advanced": {
    icon: Mic,
    pitch: "Two fluency tiers, one clear goal: speak with total confidence.",
    points: ["Grammar & vocabulary foundations", "Accent neutralisation & voice modulation", "Boardroom-ready articulation"]
  },
  "Group Discussion and Interview Preparation for Admissions": {
    icon: Users,
    pitch: "Walk into any panel having already faced tougher ones.",
    points: ["Live mock GDs with video review", "Personal interview stress-drills", "Instant, actionable feedback"]
  },
  "Sales and Marketing Management": {
    icon: TrendingUp,
    pitch: "The core playbook behind every business that sells well.",
    points: ["Selling frameworks that convert", "Go-to-market strategy basics", "Real case-based practice"]
  },
  "Basics of Digital Marketing Management": {
    icon: Megaphone,
    pitch: "Run a campaign the way modern brands actually do.",
    points: ["SEO & performance marketing", "Social & content strategy", "Analytics-driven decisions"]
  },
  "Case Study Management": {
    icon: FileSearch,
    pitch: "Structured thinking for the rounds that eliminate everyone else.",
    points: ["Frameworks for case interviews", "Business problem breakdowns", "Confident, structured delivery"]
  }
};

/** Subtle mouse-driven 3D tilt, matching the hub cards used across the site. */
function TiltCard({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -6;
    const rotateY = ((x - rect.width / 2) / rect.width) * 6;
    el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.01)`;
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

export default function CertificatesPage({ onBookCounseling }: CertificatesPageProps) {
  const courses = CERTIFICATE_GROUPS[0]?.items ?? [];

  return (
    <div className="pt-24 md:pt-28">
      <Seo {...CERTIFICATES_SEO} structuredData={CERTIFICATES_STRUCTURED_DATA} />

      {/* Page Hero */}
      <section className="relative bg-gradient-to-b from-heritage-burgundy via-heritage-maroon to-heritage-burgundy py-10 md:py-14 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-antique-gold/10 rounded-full blur-3xl animate-drift-slow-reverse" />
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-antique-gold/15 border border-sunlight-gold/30 rounded-full mb-4">
            <Award className="w-4 h-4 text-sunlight-gold" />
            <span className="font-mono text-xs font-bold text-sunlight-gold uppercase tracking-wider">
              Placement-Oriented Courses
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight">
            Short-Term Certificate & Skill Courses
          </h1>
          <p className="mt-4 text-cream/80 font-sans text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Practical certificate courses designed to sharpen your communication, business, and interview skills
            alongside your degree.
          </p>

          {/* Quick stats strip */}
          <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="rounded-xl bg-white/10 border border-white/15 py-2.5">
              <p className="font-serif text-lg md:text-xl font-bold text-sunlight-gold">Varied</p>
              <p className="text-[11px] uppercase tracking-wider text-cream/70 font-sans mt-0.5">Courses</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/15 py-2.5">
              <p className="font-serif text-lg md:text-xl font-bold text-sunlight-gold">Practical</p>
              <p className="text-[11px] uppercase tracking-wider text-cream/70 font-sans mt-0.5">Skill-Based</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/15 py-2.5">
              <p className="font-serif text-lg md:text-xl font-bold text-sunlight-gold">Short</p>
              <p className="text-[11px] uppercase tracking-wider text-cream/70 font-sans mt-0.5">Term Format</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight Grid — five courses, five distinct cards (no dropdown) */}
      <section className="relative bg-cream py-12 md:py-16 overflow-hidden">
        <div className="absolute top-1/3 right-[8%] w-72 h-72 bg-peach/25 rounded-full blur-3xl pointer-events-none animate-drift-slow" />
        <div className="absolute bottom-0 left-[6%] w-80 h-80 bg-heritage-maroon/10 rounded-full blur-3xl pointer-events-none animate-drift-slow-reverse" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <Reveal className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-heritage-maroon">
              Tactical Preparedness
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-heritage-burgundy tracking-tight">
              Focused Courses. Real Skills.
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold mx-auto rounded-full" />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((item, idx) => {
              const spotlight = COURSE_SPOTLIGHT[item];
              const Icon = spotlight?.icon ?? Award;
              return (
                <Reveal key={item} delayMs={idx * 80}>
                  <TiltCard className="h-full">
                    <div className="group relative h-full flex flex-col glass-card p-7 sm:p-8 rounded-3xl overflow-hidden hover:shadow-[0_18px_40px_rgba(122,17,26,0.25)] transition-shadow duration-300">
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-heritage-maroon/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      <div className="relative flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-heritage-maroon/20 to-heritage-crimson/10 border border-antique-gold/20 flex items-center justify-center group-hover:scale-110 group-hover:border-sunlight-gold/50 transition-all duration-300 shadow-md">
                          <Icon className="w-6 h-6 text-heritage-maroon" />
                        </div>
                        <span className="font-mono text-[11px] font-bold text-heritage-maroon/50">
                          {String(idx + 1).padStart(2, "0")} / {String(courses.length).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl font-bold text-heritage-burgundy mb-2 group-hover:text-heritage-maroon transition-colors">
                        {item}
                      </h3>
                      {spotlight && (
                        <p className="font-sans text-sm text-ink/70 leading-relaxed mb-5">{spotlight.pitch}</p>
                      )}

                      {spotlight && (
                        <ul className="space-y-1.5 mb-6">
                          {spotlight.points.map((point) => (
                            <li key={point} className="flex items-start gap-2 text-xs text-ink/65 font-sans">
                              <CheckCircle2 className="w-3.5 h-3.5 text-antique-gold shrink-0 mt-0.5" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}

                      <button
                        onClick={() => onBookCounseling(item)}
                        className="mt-auto self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-heritage-burgundy text-cream hover:bg-heritage-maroon transition-all"
                      >
                        Enquire Now
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-link to Courses + CTA */}
      <section className="bg-parchment py-16 border-t border-heritage-maroon/10">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <Sparkles className="w-6 h-6 text-antique-gold mx-auto mb-4" />
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-heritage-burgundy">
            Also planning your degree admission?
          </h2>
          <p className="mt-3 text-ink/70 font-sans text-sm md:text-base max-w-xl mx-auto">
            Browse 100+ degree programs across BBA, MBA, B.Tech, Law, and more that we help students get admission
            into.
          </p>
          <Link
            to="/courses"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold text-heritage-burgundy hover:shadow-[0_0_15px_rgba(249,223,141,0.5)] transition-all"
          >
            Explore Degree Programs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}