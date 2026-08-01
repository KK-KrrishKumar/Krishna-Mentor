import React from "react";
import {
  BookOpenText,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  User,
  MapPin,
  Clock,
  NotebookPen,
  Landmark,
  LineChart
} from "lucide-react";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import LiveClock from "../components/LiveClock";
import { TUITION_SUBJECTS } from "../data/tuition";

interface TuitionPageProps {
  onBookCounseling: (programName?: string) => void;
}

export const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.krishnamentor.com/" },
      { "@type": "ListItem", position: 2, name: "Tuition", item: "https://www.krishnamentor.com/tuition" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "CBSE Class XI–XII Business Studies & Economics Tuition",
    description:
      "One-on-one CBSE Class 11 and 12 tuition for Business Studies and Economics, taught by Krishna Mentor's core faculty at our centre.",
    provider: { "@type": "EducationalOrganization", name: "Krishna Mentor", sameAs: "https://www.krishnamentor.com/" }
  }
];

// Single source of truth for this page's title/description/keywords/path —
// scripts/prerender.mjs imports this exact object to bake matching static
// HTML per route, so there's never a second copy to drift out of sync.
export const SEO = {
  title: "CBSE Class 11 & 12 Tuition — Business Studies & Economics | Krishna Mentor",
  description:
    "Krishna Mentor offers CBSE Class XI–XII tuition in Business Studies and Economics — one-on-one teaching at our centre, or online.",
  path: "/tuition",
  keywords: "CBSE class 11 12 tuition, Business Studies tuition, Economics tuition CBSE, home tutor Business Studies Economics"
};

const FORMAT_HIGHLIGHTS = [
  { icon: User, text: "One-on-one, personalised mentorship", step: "01" },
  { icon: MapPin, text: "At our centre, or online", step: "02" },
  { icon: Clock, text: "Flexible weekly schedule around school hours", step: "03" },
  { icon: NotebookPen, text: "Chapter-wise tests mapped to the CBSE marking scheme", step: "04" }
];

// Each subject gets its own icon and accent gradient in the side-by-side
// spread below, keyed off the slug so the data file stays presentation-free.
const SUBJECT_PRESENTATION: Record<string, { icon: typeof Landmark; accent: string }> = {
  "business-studies": { icon: Landmark, accent: "from-heritage-burgundy via-heritage-maroon to-heritage-crimson" },
  economics: { icon: LineChart, accent: "from-heritage-crimson via-antique-gold to-heritage-maroon" }
};

export default function TuitionPage({ onBookCounseling }: TuitionPageProps) {
  return (
    <div className="pt-24 md:pt-28">
      <Seo {...SEO} structuredData={STRUCTURED_DATA} />

      {/* Page Hero */}
      <section className="relative bg-gradient-to-b from-heritage-burgundy via-heritage-maroon to-heritage-burgundy py-10 md:py-14 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-antique-gold/10 rounded-full blur-3xl animate-drift-slow" />
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-antique-gold/15 border border-sunlight-gold/30 rounded-full mb-4">
            <BookOpenText className="w-4 h-4 text-sunlight-gold" />
            <span className="font-mono text-xs font-bold text-sunlight-gold uppercase tracking-wider">
              CBSE Class XI &amp; XII Tuition
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight">
            Business Studies &amp; Economics, Explained the Way You'll Remember
          </h1>
          <p className="mt-4 text-cream/80 font-sans text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Board-focused, concept-first tuition for CBSE Class 11 and 12 — built by the same faculty behind our
            college-level marketing and management teaching, adapted for school boards and board exams.
          </p>
        </div>
      </section>

      {/* Both Subjects, Side by Side — an open "twin ledger" spread instead of a
          pick-one toggle, since most students want both taught together. */}
      <section className="relative bg-cream py-12 md:py-16 overflow-hidden">
        <div className="absolute top-1/3 right-[8%] w-72 h-72 bg-peach/25 rounded-full blur-3xl pointer-events-none animate-drift-slow" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <Reveal className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-heritage-maroon">
              One Enrolment, Both Subjects
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-heritage-burgundy tracking-tight">
              Business Studies &amp; Economics, Side by Side
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold mx-auto rounded-full" />
            <p className="font-sans text-sm sm:text-[15px] text-ink/70 max-w-lg mx-auto">
              Most CBSE commerce students take both — so both live here together. Take one, or take both;
              the faculty and schedule flex either way.
            </p>
          </Reveal>

          {/* The spread: two panels bound by a shared centre spine on desktop,
              stacked with a connecting "&" on mobile. */}
          <div className="relative grid md:grid-cols-2 gap-6 md:gap-0">
            {/* Centre spine (desktop only) */}
            <div className="hidden md:flex absolute inset-y-4 left-1/2 -translate-x-1/2 z-20 flex-col items-center justify-center w-10">
              <span className="flex-1 w-px bg-gradient-to-b from-transparent via-antique-gold/50 to-transparent" />
              <span className="w-11 h-11 rounded-full bg-cream border-2 border-antique-gold/40 shadow-[0_6px_16px_rgba(74,14,20,0.18)] flex items-center justify-center font-serif font-bold text-heritage-maroon text-sm shrink-0">
                &amp;
              </span>
              <span className="flex-1 w-px bg-gradient-to-b from-transparent via-antique-gold/50 to-transparent" />
            </div>

            {TUITION_SUBJECTS.map((s, idx) => {
              const presentation = SUBJECT_PRESENTATION[s.slug] ?? SUBJECT_PRESENTATION["business-studies"];
              const Icon = presentation.icon;
              const isFirst = idx === 0;
              return (
                <Reveal key={s.slug} delayMs={idx * 100}>
                  <div
                    className={`group relative h-full glass-card p-8 md:p-10 pt-9 border border-antique-gold/15 ${
                      isFirst
                        ? "rounded-3xl md:rounded-r-none md:rounded-l-3xl"
                        : "rounded-3xl md:rounded-l-none md:rounded-r-3xl"
                    }`}
                  >
                    <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${presentation.accent} ${
                      isFirst ? "rounded-tl-3xl md:rounded-tl-3xl" : "rounded-tr-3xl md:rounded-tr-3xl"
                    }`} />

                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${presentation.accent} flex items-center justify-center shadow-md shrink-0`}>
                        <Icon className="w-7 h-7 text-cream" />
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-antique-gold/15 border border-antique-gold/25 text-[11px] font-mono font-bold uppercase tracking-wider text-heritage-maroon">
                        {s.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-heritage-burgundy mb-3">
                      {s.label}
                    </h3>
                    <p className="font-sans text-sm text-ink/70 leading-relaxed mb-6">{s.summary}</p>

                    <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-mono font-semibold text-heritage-maroon/70 mb-3">
                      <Sparkles className="w-3.5 h-3.5" />
                      Highlights from the syllabus
                    </p>
                    <ul className="space-y-2.5 mb-8">
                      {s.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2.5 text-sm text-ink/75 font-sans">
                          <CheckCircle2 className="w-4 h-4 text-antique-gold shrink-0 mt-0.5" />
                          {topic}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => onBookCounseling(`Tuition: ${s.label} (Class XI–XII)`)}
                      className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans font-bold text-sm shadow-md bg-heritage-maroon text-cream hover:bg-heritage-burgundy hover:scale-[1.03] active:scale-95 transition-all duration-300"
                    >
                      Enquire for {s.label}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Combined path — the option that used to be hidden behind a toggle */}
          <Reveal delayMs={220} className="mt-8 flex flex-col items-center text-center gap-4 max-w-xl mx-auto">
            <p className="font-sans text-sm text-ink/70">
              Not sure yet, or fairly certain you'll want both? One conversation covers it — we'll build a
              single weekly schedule around whichever subjects you need.
            </p>
            <button
              type="button"
              onClick={() => onBookCounseling("Tuition: Business Studies & Economics (Both, Class XI–XII)")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans font-bold text-sm border-2 border-heritage-maroon/25 text-heritage-maroon hover:border-heritage-maroon hover:bg-heritage-maroon hover:text-cream transition-all duration-300"
            >
              <GraduationCap className="w-4 h-4" />
              Enquire for Both Subjects Together
            </button>
          </Reveal>
        </div>
      </section>

      {/* How It Works — a numbered step-timeline, dressed with a tiny animated
          wristwatch (schedule) and a scribbling nib (chapter-wise tests) so
          the two most "process" feeling steps get a matching bit of motion. */}
      <section className="relative bg-gradient-to-b from-spiritual-cream to-cream py-14 md:py-20 overflow-hidden">
        <div className="absolute bottom-0 left-[6%] w-80 h-80 bg-heritage-maroon/10 rounded-full blur-3xl pointer-events-none animate-drift-slow-reverse" />
        <div className="absolute top-10 right-[8%] w-64 h-64 bg-antique-gold/10 rounded-full blur-3xl pointer-events-none animate-drift-slow" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <Reveal className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-heritage-maroon">
              How It Works
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-heritage-burgundy tracking-tight">
              Teaching Built Around the Student
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold mx-auto rounded-full" />
          </Reveal>

          {/* A live analog clock showing the real current time in India (IST) —
              hands are recalculated from the actual clock every second, not a
              fixed decorative position. */}
          <Reveal className="flex items-center justify-center mb-4 select-none">
            <LiveClock className="w-[76px] sm:w-[96px] h-auto drop-shadow-[0_10px_18px_rgba(74,14,20,0.2)]" />
          </Reveal>

          <p className="text-center font-sans text-xs sm:text-sm text-ink/55 italic mb-10">
            Flexible scheduling — every session works around the student's actual school day.
          </p>

          {/* Step timeline — a connecting rail runs behind the cards on desktop,
              each step sits on it like a bead, numbered and iconed. */}
          <div className="relative">
            <div className="hidden md:block absolute top-9 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-antique-gold/40 to-transparent" />

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-5">
              {FORMAT_HIGHLIGHTS.map((item, idx) => {
                const Icon = item.icon;
                const isSchedule = item.step === "03";
                const isTests = item.step === "04";
                return (
                  <Reveal key={item.text} delayMs={idx * 110}>
                    <div className="group relative h-full flex flex-col items-center text-center gap-4 bg-white/70 rounded-2xl px-5 pt-8 pb-6 shadow-[0_6px_18px_rgba(74,14,20,0.08)] border border-antique-gold/15 hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(74,14,20,0.14)] transition-all duration-300">
                      {/* Step number badge */}
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-heritage-burgundy border-2 border-antique-gold/50 flex items-center justify-center font-mono text-[11px] font-bold text-sunlight-gold shadow-md">
                        {item.step}
                      </span>

                      {/* Icon, with a small watch or scribbling-pen flourish layered on for the two process-driven steps */}
                      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-heritage-maroon to-heritage-crimson flex items-center justify-center shrink-0 text-cream shadow-md group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6" />

                        {isSchedule && (
                          <svg
                            viewBox="0 0 40 40"
                            className="absolute -top-2 -right-2 w-6 h-6 drop-shadow-sm"
                            aria-hidden="true"
                          >
                            {/* Static "flexible/toggle" glyph — two curved arrows, standing
                                in for adjustable scheduling without implying a live clock. */}
                            <circle cx="20" cy="20" r="18" fill="#FFFBF5" stroke="#B07C2C" strokeWidth="2" />
                            <path
                              d="M13 15a9 9 0 0 1 14 2"
                              fill="none"
                              stroke="#4A0E14"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path d="M27 13v4h-4" fill="none" stroke="#4A0E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path
                              d="M27 25a9 9 0 0 1-14-2"
                              fill="none"
                              stroke="#7A1B24"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path d="M13 27v-4h4" fill="none" stroke="#7A1B24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}

                        {isTests && (
                          <svg
                            viewBox="0 0 40 40"
                            className="absolute -top-2 -right-2 w-7 h-7 drop-shadow-sm"
                            aria-hidden="true"
                          >
                            <line x1="6" y1="30" x2="26" y2="30" stroke="#B07C2C" strokeWidth="2" strokeLinecap="round" strokeDasharray="20" strokeDashoffset="20" className="animate-underline-draw" />
                            <g className="animate-nib-scribble" style={{ transformBox: "fill-box" }}>
                              <path d="M10 28 L26 10 L31 15 L15 33 Z" fill="#FFFBF5" stroke="#4A0E14" strokeWidth="1.4" strokeLinejoin="round" />
                              <path d="M26 10 L31 15" stroke="#7A1B24" strokeWidth="1.4" />
                            </g>
                          </svg>
                        )}
                      </div>

                      <p className="font-sans text-sm font-medium text-ink/85 leading-snug">{item.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delayMs={200} className="mt-14 text-center">
            <button
              type="button"
              onClick={() => onBookCounseling("Tuition: General Enquiry")}
              className="btn-shine inline-flex items-center gap-2 px-8 py-4 rounded-full font-sans font-bold text-base shadow-md bg-heritage-maroon text-cream hover:bg-heritage-burgundy hover:scale-[1.03] active:scale-95 transition-all duration-300"
            >
              Book a Free Trial Session
              <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}