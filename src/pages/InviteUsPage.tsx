import React, { useState } from "react";
import {
  Mic2,
  GraduationCap,
  Presentation,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Search,
  Send,
  Award,
  BookOpen,
  Building2
} from "lucide-react";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import { SEMINAR_TOPICS, VISITING_FACULTY_SUBJECTS, FACULTY_PROFILE } from "../data/inviteUs";

interface InviteUsPageProps {
  onBookCounseling: (programName?: string) => void;
}

type InviteOption = "faculty" | "seminar";

export const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.krishnamentor.com/" },
      { "@type": "ListItem", position: 2, name: "Invite Us", item: "https://www.krishnamentor.com/invite-us" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Seminar Topics Offered by Krishna Mentor",
    description:
      "Guest seminar and lecture topics that colleges and institutes can invite Krishna Mentor to deliver, spanning marketing, strategy, and business fundamentals.",
    numberOfItems: SEMINAR_TOPICS.length,
    itemListElement: SEMINAR_TOPICS.map((t) => ({
      "@type": "ListItem",
      position: t.id,
      item: {
        "@type": "Event",
        name: t.title,
        description: t.blurb,
        organizer: { "@type": "EducationalOrganization", name: "Krishna Mentor", sameAs: "https://www.krishnamentor.com/" }
      }
    }))
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: FACULTY_PROFILE.name,
    jobTitle: FACULTY_PROFILE.title,
    description: FACULTY_PROFILE.bio,
    worksFor: { "@type": "EducationalOrganization", name: "Krishna Mentor", sameAs: "https://www.krishnamentor.com/" }
  }
];

// Single source of truth for this page's title/description/keywords/path —
// scripts/prerender.mjs imports this exact object to bake matching static
// HTML per route, so there's never a second copy to drift out of sync.
export const SEO = {
  title: "Invite Us — Visiting Faculty & Seminar Sessions | Krishna Mentor",
  description:
    "Invite Krishna Mentor to your college or institute as visiting faculty, or book a guest seminar from a range of management and business topics — marketing, strategy, digital, and more.",
  path: "/invite-us",
  keywords: "invite visiting faculty, guest seminar management college, guest lecture marketing management, visiting faculty MBA college"
};

/** Small pill-style toggle used to switch between the two invite options. */
function OptionToggle({ active, onChange }: { active: InviteOption; onChange: (v: InviteOption) => void }) {
  return (
    <div className="inline-flex p-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
      {(
        [
          { key: "faculty" as const, label: "Visiting Faculty", icon: GraduationCap },
          { key: "seminar" as const, label: "Seminar", icon: Mic2 }
        ]
      ).map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-sans font-semibold transition-all duration-300 ${
            active === key
              ? "bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold text-heritage-burgundy shadow-md"
              : "text-cream/75 hover:text-cream"
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}

export default function InviteUsPage({ onBookCounseling }: InviteUsPageProps) {
  const [option, setOption] = useState<InviteOption>("faculty");
  const [query, setQuery] = useState("");

  const filteredTopics = SEMINAR_TOPICS.filter((t) =>
    t.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="pt-24 md:pt-28">
      <Seo {...SEO} structuredData={STRUCTURED_DATA} />

      {/* Page Hero */}
      <section className="relative bg-gradient-to-b from-heritage-burgundy via-heritage-maroon to-heritage-burgundy py-10 md:py-14 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-antique-gold/10 rounded-full blur-3xl animate-drift-slow" />
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-antique-gold/15 border border-sunlight-gold/30 rounded-full mb-4">
            <Presentation className="w-4 h-4 text-sunlight-gold" />
            <span className="font-mono text-xs font-bold text-sunlight-gold uppercase tracking-wider">
              Invite Krishna Mentor
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight">
            Bring Us to Your Campus
          </h1>
          <p className="mt-4 text-cream/80 font-sans text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Colleges, institutes, and corporate training teams can invite Krishna Mentor either as{" "}
            <span className="text-sunlight-gold font-semibold">visiting faculty</span> for a full course, or for a{" "}
            <span className="text-sunlight-gold font-semibold">one-off guest seminar</span> on a specific topic.
          </p>

          <div className="mt-8 flex justify-center">
            <OptionToggle active={option} onChange={setOption} />
          </div>
        </div>
      </section>

      {/* Visiting Faculty */}
      {option === "faculty" && (
        <section className="relative bg-cream py-12 md:py-16 overflow-hidden">
          <div className="absolute top-1/3 right-[8%] w-72 h-72 bg-peach/25 rounded-full blur-3xl pointer-events-none animate-drift-slow" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
            <Reveal className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-heritage-maroon">
                Long-Term Engagement
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-heritage-burgundy tracking-tight">
                Visiting Faculty
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold mx-auto rounded-full" />
              <p className="text-ink/70 font-sans text-sm md:text-base leading-relaxed">
                For institutes that want a full semester, term, or module handled by an experienced practitioner —
                not just a one-time talk. We work with your academic calendar, course outline, and evaluation format.
              </p>
            </Reveal>

            {/* Faculty Spotlight */}
            <Reveal className="glass-card rounded-3xl p-8 md:p-10 mb-8">
              <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-antique-gold to-sunlight-gold flex items-center justify-center shadow-md">
                    <GraduationCap className="w-8 h-8 text-heritage-burgundy" />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-bold text-heritage-burgundy">{FACULTY_PROFILE.name}</p>
                    <p className="text-sm text-ink/60 font-sans mt-0.5 max-w-[220px]">{FACULTY_PROFILE.title}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <p className="text-base text-ink/75 font-sans leading-relaxed">{FACULTY_PROFILE.bio}</p>

                  <div className="flex flex-wrap gap-2 text-sm font-sans">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-heritage-maroon/5 border border-antique-gold/25 font-semibold text-heritage-maroon">
                      <BookOpen className="w-3.5 h-3.5" />
                      {FACULTY_PROFILE.qualifications}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-heritage-maroon/5 border border-antique-gold/25 font-semibold text-heritage-maroon">
                      <Award className="w-3.5 h-3.5" />
                      {FACULTY_PROFILE.experience}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {FACULTY_PROFILE.highlights.map((point) => (
                      <div key={point} className="flex items-start gap-2 text-sm text-ink/70 font-sans leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-antique-gold shrink-0 mt-0.5" />
                        {point}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-heritage-maroon/10">
                    <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-mono font-semibold text-heritage-maroon/70 mb-2">
                      <Building2 className="w-3.5 h-3.5" />
                      Prior Visiting Assignments
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {FACULTY_PROFILE.institutionsTaught.map((inst) => (
                        <span
                          key={inst}
                          className="px-2.5 py-1 rounded-full bg-white/60 border border-heritage-maroon/10 text-xs font-sans text-ink/60"
                        >
                          {inst}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href="https://www.youtube.com/@Krishna-Mentoring"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-heritage-maroon hover:text-heritage-burgundy transition-colors"
                  >
                    <Mic2 className="w-3.5 h-3.5" />
                    Watch teaching videos on our YouTube channel
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="space-y-8">
              <Reveal className="glass-card rounded-3xl p-8 space-y-5">
                <h3 className="font-serif text-lg font-bold text-heritage-burgundy">What this covers</h3>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {[
                    "Full-semester or short-module teaching at your campus",
                    "Curriculum-aligned delivery, assignments, and evaluation support",
                    "Flexible scheduling around your institute's academic calendar",
                    "Practitioner-led teaching grounded in real business experience"
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-ink/75 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-antique-gold shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delayMs={100} className="glass-card rounded-3xl p-8 space-y-5">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h3 className="font-serif text-lg font-bold text-heritage-burgundy">Subject areas</h3>
                </div>
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-6">
                  {VISITING_FACULTY_SUBJECTS.map((subject) => (
                    <div
                      key={subject}
                      className="flex items-start gap-2 text-sm font-sans font-semibold text-heritage-maroon leading-snug mb-3 break-inside-avoid"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-antique-gold mt-1.5 shrink-0" />
                      {subject}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => onBookCounseling("Invite Us: Visiting Faculty")}
                className="btn-shine inline-flex items-center gap-2 px-8 py-4 rounded-full font-sans font-bold text-base shadow-md bg-heritage-maroon text-cream hover:bg-heritage-burgundy hover:scale-[1.03] active:scale-95 transition-all duration-300"
              >
                Request Visiting Faculty
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Seminar */}
      {option === "seminar" && (
        <section className="relative bg-cream py-12 md:py-16 overflow-hidden">
          <div className="absolute bottom-0 left-[6%] w-80 h-80 bg-heritage-maroon/10 rounded-full blur-3xl pointer-events-none animate-drift-slow-reverse" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
            <Reveal className="text-center max-w-2xl mx-auto mb-8 space-y-3">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-heritage-maroon">
                One Session, One Topic
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-heritage-burgundy tracking-tight">
                Seminar Topics to Choose From
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold mx-auto rounded-full" />
              <p className="text-ink/70 font-sans text-sm md:text-base leading-relaxed">
                Pick a topic below and request it directly — we'll confirm the date, format, and duration with your
                coordinator.
              </p>
            </Reveal>

            {/* Search / filter */}
            <div className="max-w-md mx-auto mb-8 relative">
              <Search className="w-4 h-4 text-heritage-maroon/50 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search seminar topics…"
                className="w-full pl-11 pr-4 py-3 rounded-full border border-heritage-maroon/15 bg-white/70 backdrop-blur-md text-sm font-sans text-ink placeholder:text-ink/40 focus:outline-none focus:border-antique-gold transition-colors"
              />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTopics.map((topic, idx) => (
                <Reveal key={topic.id} delayMs={(idx % 6) * 60} className="h-full">
                  <div className="card-lift h-full flex flex-col justify-between glass-card rounded-2xl p-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[11px] font-bold text-antique-gold">
                          {String(topic.id).padStart(2, "0")}
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-antique-gold/60" />
                      </div>
                      <h3 className="font-serif text-base font-bold text-heritage-burgundy leading-snug">
                        {topic.title}
                      </h3>
                      <p className="mt-2 text-xs text-ink/65 font-sans leading-relaxed">{topic.blurb}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onBookCounseling(`Invite Us: Seminar — ${topic.title}`)}
                      className="mt-5 inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full text-xs font-sans font-bold border border-heritage-maroon/20 text-heritage-burgundy hover:bg-heritage-maroon hover:text-cream hover:border-heritage-maroon transition-all duration-300"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Request This Seminar
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>

            {filteredTopics.length === 0 && (
              <p className="text-center text-sm text-ink/60 font-sans mt-10">
                No topics match "{query}" — try a different search, or{" "}
                <button
                  type="button"
                  onClick={() => onBookCounseling("Invite Us: Seminar — Custom Topic")}
                  className="link-underline text-heritage-maroon font-semibold"
                >
                  request a custom topic
                </button>
                .
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}