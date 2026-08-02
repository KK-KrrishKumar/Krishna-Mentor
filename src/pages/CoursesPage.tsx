import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Search,
  Sparkles,
  ArrowRight,
  Flame,
  Briefcase,
  Cpu,
  Code2,
  Scale,
  BookOpen,
  FlaskConical,
  Palette,
  X
} from "lucide-react";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import { COURSE_CATEGORIES, TOTAL_COURSE_COUNT, CourseCategory } from "../data/courses";

interface CoursesPageProps {
  onBookCounseling: (programName?: string) => void;
}

// One icon per qualification family, so the explorer reads visually instead of
// as a flat list of acronyms.
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  bba: Briefcase,
  mba: Briefcase,
  pgdm: Briefcase,
  btech: Cpu,
  mtech: Cpu,
  bca: Code2,
  mca: Code2,
  law: Scale,
  ba: BookOpen,
  ma: BookOpen,
  bsc: FlaskConical,
  msc: FlaskConical,
  design: Palette
};

// Groups every qualification into a level band so the selector reads as a
// scannable map instead of a single scrollable strip the user has to hunt through.
const LEVEL_GROUPS: { label: string; slugs: string[] }[] = [
  { label: "Undergraduate", slugs: ["bba", "btech", "bca", "ba", "bsc", "design"] },
  { label: "Postgraduate", slugs: ["mba", "pgdm", "mtech", "mca", "ma", "msc"] },
  { label: "Professional", slugs: ["law"] }
];

const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.krishnamentor.com/" },
      { "@type": "ListItem", position: 2, name: "Courses", item: "https://www.krishnamentor.com/courses" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Degree Programs Guided by Krishna Mentor",
    description:
      "Undergraduate and postgraduate degree programs across management, engineering, computer applications, law, arts, science, and design that Krishna Mentor helps students gain admission into.",
    numberOfItems: TOTAL_COURSE_COUNT,
    itemListElement: COURSE_CATEGORIES.map((cat, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: cat.title,
        description: cat.blurb,
        provider: { "@type": "EducationalOrganization", name: "Krishna Mentor", sameAs: "https://www.krishnamentor.com/" }
      }
    }))
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does Krishna Mentor offer admission guidance for BBA, MBA, B.Tech and other degree programs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Krishna Mentor provides personalised admission counseling and mentorship for BBA, MBA, PGDM, B.Tech, M.Tech, BCA, MCA, Law, BA, B.Sc, MA, M.Sc and B.Design programs across partner colleges nationwide."
        }
      },
      {
        "@type": "Question",
        name: "How do I choose the right degree program with Krishna Mentor?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Book a free counseling session and a senior academic advisor will assess your interests, academic profile, and career goals before recommending the best-fit degree and college."
        }
      }
    ]
  }
];

/** Subtle mouse-driven 3D tilt, matching the hub cards used on the Certificates page. */
function TiltPanel({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -2.5;
    const rotateY = ((x - rect.width / 2) / rect.width) * 2.5;
    el.style.transform = `perspective(1600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1600px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.2s ease-out" }}
      className={`will-change-transform ${className || ""}`}
    >
      {children}
    </div>
  );
}

// Framer Motion variants for the staggered item grid inside the active tab panel.
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }
};

export default function CoursesPage({ onBookCounseling }: CoursesPageProps) {
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState(COURSE_CATEGORIES[0].slug);
  const panelRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  // After a person taps a qualification pill, the result panel is brought into
  // view automatically (accounting for the fixed navbar) instead of leaving
  // them to scroll down and hunt for it. Skipped on first render so the page
  // doesn't jump on initial load.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isSearching || !panelRef.current) return;
    // On lg+ screens the panel sits sticky right beside the pills, so there's
    // nothing to scroll to. This only matters on narrower layouts where the
    // panel stacks below the pills.
    if (window.innerWidth >= 1024) return;
    const navbarOffset = 96;
    const top = panelRef.current.getBoundingClientRect().top + window.scrollY - navbarOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }, [activeSlug]);

  // Cross-category live search results — shown instead of the tab panel while typing.
  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return COURSE_CATEGORIES.flatMap((cat) =>
      cat.items
        .filter((item) => item.toLowerCase().includes(normalizedQuery))
        .map((item) => ({ item, cat }))
    );
  }, [normalizedQuery, isSearching]);

  const activeCategory: CourseCategory =
    COURSE_CATEGORIES.find((c) => c.slug === activeSlug) ?? COURSE_CATEGORIES[0];

  return (
    <div className="pt-24 md:pt-28">
      <Seo
        title="Degree Programs & Admission Guidance | BBA, MBA, B.Tech, Law & More | Krishna Mentor"
        description="Explore degree programs across BBA, MBA, PGDM, B.Tech, M.Tech, BCA, MCA, Law, BA, B.Sc, MA, M.Sc and B.Design that Krishna Mentor helps students get admitted into."
        path="/courses"
        keywords="BBA admission consultant, MBA admission consultant, B.Tech admission guidance, PGDM colleges, BCA MCA admission, law admission consultant, best degree courses"
        structuredData={STRUCTURED_DATA}
      />

      {/* Page Hero */}
      <section id="courses-top" className="relative bg-gradient-to-b from-heritage-burgundy via-heritage-maroon to-heritage-burgundy py-10 md:py-14 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-antique-gold/10 rounded-full blur-3xl animate-drift-slow" />
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-antique-gold/15 border border-sunlight-gold/30 rounded-full mb-4">
            <GraduationCap className="w-4 h-4 text-sunlight-gold" />
            <span className="font-mono text-xs font-bold text-sunlight-gold uppercase tracking-wider">
              Degree Programs
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight">
            Degree Programs We Guide You Into
          </h1>
          <p className="mt-4 text-cream/80 font-sans text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            From BBA and MBA to B.Tech, Law, and Design — Krishna Mentor helps ambitious students
            find and secure admission to the right college and specialisation.
          </p>

          <div className="mt-6 max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-burgundy/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search a program, e.g. Data Science, Law, Marketing..."
              aria-label="Search degree programs"
              className="w-full pl-11 pr-10 py-3.5 rounded-full bg-cream/95 text-ink placeholder:text-ink/40 font-sans text-sm outline-none border border-antique-gold/20 focus:border-antique-gold shadow-lg"
            />
            {isSearching && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-heritage-burgundy/50 hover:text-heritage-burgundy"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick stats strip */}
          <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="rounded-xl bg-white/10 border border-white/15 py-2.5">
              <p className="font-serif text-lg md:text-xl font-bold text-sunlight-gold">Broad</p>
              <p className="text-[11px] uppercase tracking-wider text-cream/70 font-sans mt-0.5">Programs</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/15 py-2.5">
              <p className="font-serif text-lg md:text-xl font-bold text-sunlight-gold">Diverse</p>
              <p className="text-[11px] uppercase tracking-wider text-cream/70 font-sans mt-0.5">Qualifications</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/15 py-2.5">
              <p className="font-serif text-lg md:text-xl font-bold text-sunlight-gold">Trusted</p>
              <p className="text-[11px] uppercase tracking-wider text-cream/70 font-sans mt-0.5">Guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== Interactive Explorer (tabs + animated panel) ============== */}
      <section className="relative bg-cream py-10 md:py-14 overflow-hidden">
        <div className="absolute top-0 right-[8%] w-72 h-72 bg-peach/20 rounded-full blur-3xl pointer-events-none animate-drift-slow" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <Reveal className="text-center max-w-2xl mx-auto mb-6 space-y-3">
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-heritage-maroon">
              Divine Placements
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-heritage-burgundy tracking-tight">
              Find Your Qualification
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold mx-auto rounded-full" />
            <p className="text-xs text-ink/50 font-sans">Tap a qualification below — your options appear instantly.</p>
          </Reveal>

          {/* Side-by-side layout on desktop: qualification pills on the left, the
              selected course panel directly beside them on the right (sticky, so
              it stays in view as you scroll the pill list) — no more scrolling
              down to see what you picked. On mobile/tablet, where there isn't
              room for two columns, the panel sits directly under the pills and
              the page auto-scrolls to it after a tap. */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
            <div className="lg:col-span-5">
              {/* Qualification map — grouped by level, wraps to fit everything on screen at once (no scrollbar to hunt through) */}
              {!isSearching && (
                <div className="mb-6 space-y-5">
                  {LEVEL_GROUPS.map((group) => {
                    const cats = group.slugs
                      .map((slug) => COURSE_CATEGORIES.find((c) => c.slug === slug))
                      .filter((c): c is CourseCategory => !!c);
                    if (cats.length === 0) return null;
                    return (
                      <div key={group.label}>
                        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-heritage-maroon/50 mb-2.5">
                          {group.label}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cats.map((cat) => {
                            const Icon = CATEGORY_ICONS[cat.slug] ?? GraduationCap;
                            const isActive = cat.slug === activeSlug;
                            return (
                              <button
                                key={cat.slug}
                                onClick={() => setActiveSlug(cat.slug)}
                                className={`relative flex items-center gap-1.5 px-4 py-2.5 lg:px-4 lg:py-3 rounded-full text-xs font-sans font-bold transition-colors ${
                                  isActive ? "text-cream" : "text-heritage-maroon bg-white border border-heritage-maroon/10 hover:border-antique-gold/40"
                                }`}
                              >
                                {isActive && (
                                  <motion.span
                                    layoutId="active-course-tab"
                                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-heritage-burgundy via-heritage-maroon to-heritage-crimson shadow-md"
                                  />
                                )}
                                <Icon className="relative w-3.5 h-3.5" />
                                <span className="relative">{cat.title}</span>
                                <span className="relative opacity-70">({cat.items.length})</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Small illustration accent — only where there's genuine spare width
                  (xl+), tucked quietly under the pills instead of competing with
                  the panel for space. Purely decorative, so it's hidden on the
                  breakpoints that need every inch for the two-column layout. */}
              <div className="hidden xl:flex justify-center pointer-events-none select-none opacity-90 mt-4">
                <div className="relative w-full max-w-[220px]">
                  <picture>
                    <source srcSet="/krishna-tree-reading.webp" type="image/webp" />
                    <img
                      src="/krishna-tree-reading.png"
                      alt="Krishna reading beneath a tree, illustrating a path of learning"
                      width={440}
                      height={660}
                      loading="lazy"
                      className="w-full h-auto animate-tree-sway"
                      style={{ transformOrigin: "50% 100%" }}
                    />
                  </picture>
                </div>
              </div>
            </div>

            {/* Animated content: either the active tab's panel, or live search
                results — sticky on desktop so it tracks alongside the pills. */}
            <div ref={panelRef} className="lg:col-span-7 lg:sticky lg:top-24 scroll-mt-24 mt-8 lg:mt-0">
            <AnimatePresence mode="wait">
              {isSearching ? (
                <motion.div
                  key="search-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs font-sans font-semibold text-ink/50 uppercase tracking-wider mb-4">
                    {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{query}"
                  </p>
                  {searchResults.length === 0 ? (
                    <p className="text-center text-ink/60 font-sans py-16">
                      No programs matched "{query}". Try another keyword.
                    </p>
                  ) : (
                    <motion.div
                      variants={gridVariants}
                      initial="hidden"
                      animate="show"
                      className="grid sm:grid-cols-2 gap-3"
                    >
                      {searchResults.map(({ item, cat }) => {
                        const Icon = CATEGORY_ICONS[cat.slug] ?? GraduationCap;
                        return (
                          <motion.button
                            key={`${cat.slug}-${item}`}
                            variants={itemVariants}
                            onClick={() => onBookCounseling(item)}
                            whileHover={{ y: -3 }}
                            className="text-left flex items-start gap-3 p-4 rounded-2xl bg-white border border-heritage-maroon/10 hover:border-antique-gold/40 hover:shadow-[0_10px_25px_rgba(122,17,26,0.1)] transition-all"
                          >
                            <div className="w-8 h-8 shrink-0 rounded-lg bg-heritage-burgundy/5 border border-antique-gold/20 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-heritage-maroon" />
                            </div>
                            <div>
                              <p className="text-sm font-sans font-semibold text-heritage-burgundy leading-snug">{item}</p>
                              <p className="text-[10px] font-mono uppercase tracking-wider text-antique-gold mt-1">{cat.title}</p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={activeCategory.slug}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TiltPanel className="relative glass-card rounded-3xl p-7 sm:p-10 overflow-hidden shadow-[0_18px_45px_rgba(122,17,26,0.12)] hover:shadow-[0_22px_55px_rgba(122,17,26,0.2)] transition-shadow duration-300">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-heritage-burgundy via-heritage-maroon to-heritage-crimson" />

                    <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-heritage-maroon/20 to-heritage-crimson/10 border border-antique-gold/20 flex items-center justify-center shadow-md">
                          {React.createElement(CATEGORY_ICONS[activeCategory.slug] ?? GraduationCap, {
                            className: "w-7 h-7 text-heritage-maroon"
                          })}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-heritage-burgundy">
                              {activeCategory.title}
                            </h3>
                            {activeCategory.items.length >= 15 && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-heritage-burgundy bg-sunlight-gold/40 border border-sunlight-gold/60 px-2 py-0.5 rounded-full">
                                <Flame className="w-2.5 h-2.5" /> Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-ink/60 font-sans mt-1 max-w-lg">{activeCategory.blurb}</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider bg-heritage-burgundy/5 border border-antique-gold/20 text-heritage-maroon px-3 py-1.5 rounded-full shrink-0">
                        {activeCategory.items.length} Specialisations
                      </span>
                    </div>

                    <motion.div
                      variants={gridVariants}
                      initial="hidden"
                      animate="show"
                      className="flex flex-wrap gap-2 mb-8"
                    >
                      {activeCategory.items.map((item) => (
                        <motion.span
                          key={item}
                          variants={itemVariants}
                          whileHover={{ y: -2, backgroundColor: "rgba(192,138,52,0.12)" }}
                          className="inline-flex items-center gap-1.5 text-xs text-ink/75 font-sans leading-snug bg-parchment/70 border border-heritage-maroon/10 hover:border-antique-gold/40 rounded-full px-3.5 py-1.5 transition-colors cursor-default"
                        >
                          <span className="text-antique-gold font-bold">✦</span>
                          {item}
                        </motion.span>
                      ))}
                    </motion.div>

                    <button
                      onClick={() => onBookCounseling(activeCategory.title)}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-heritage-burgundy text-cream hover:bg-heritage-maroon transition-all"
                    >
                      Get Guidance for {activeCategory.title}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </TiltPanel>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-link to Certificates + CTA */}
      <section className="bg-parchment py-16 border-t border-heritage-maroon/10">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <Sparkles className="w-6 h-6 text-antique-gold mx-auto mb-4" />
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-heritage-burgundy">
            Looking for a short-term certificate course instead?
          </h2>
          <p className="mt-3 text-ink/70 font-sans text-sm md:text-base max-w-xl mx-auto">
            We also run short, placement-oriented certificate courses in marketing, communication, and interview
            readiness — perfect for building skills alongside your degree.
          </p>
          <Link
            to="/certificates"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold text-heritage-burgundy hover:shadow-[0_0_15px_rgba(249,223,141,0.5)] transition-all"
          >
            Explore Certificate Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
