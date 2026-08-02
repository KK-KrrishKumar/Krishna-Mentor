import React, { useRef } from "react";
import {
  BookOpen,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Award,
  Sparkles,
  Users,
  Briefcase,
  FolderCheck,
  FileCheck2,
  BookOpenCheck,
  MessagesSquare,
  BellRing,
  LifeBuoy,
  Compass
} from "lucide-react";
import Reveal from "./Reveal";
import MentorFlipBook, { type FlipBookPage } from "./MentorFlipBook";

/** Wraps children with a subtle mouse-driven 3D tilt for a more dynamic, dimensional feel. */
function TiltCard({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -10;
    const rotateY = ((x - rect.width / 2) / rect.width) * 10;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
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

export default function Philosophy() {
  const mentorPages: FlipBookPage[] = [
    {
      icon: GraduationCap,
      eyebrow: "Faculty Profile",
      title: "Dr. Vinod Kumar",
      body: (
        <>
          <p className="font-semibold text-heritage-maroon">
            Senior Marketing Faculty · Trainer · Mentor · Marketing Consultant
          </p>
          <p>Researcher & Writer · Visiting Faculty, Department of Management</p>
          <p className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-antique-gold/15 text-heritage-burgundy text-xs font-bold w-fit">
            <Award className="w-3.5 h-3.5" /> 22+ Years of Total Experience
          </p>
          <p className="text-xs text-heritage-maroon/60 mt-3">krishnamentoring@gmail.com</p>
        </>
      )
    },
    {
      icon: BookOpen,
      eyebrow: "Profile",
      title: "Qualifications & Background",
      body: (
        <>
          <p>
            PHD, M.Phil, MBA, M.Com, PGDBM, MMC, PGDA&PR, and a Case Study course from IIT —
            graduated in Arts and UGC NET qualified in the Department of Management, with
            22+ years of total experience including 5+ years of corporate experience in the
            PR domain of the event management industry.
          </p>
          <p>
            An expert YouTuber with 463+ videos, 1500+ subscribers, and 2.5 Lakh+ views across
            Marketing Management, Sales Management, Distribution Management, Rural Marketing,
            Entrepreneurship, Pricing, Advertising, IMC, B2B & Service Marketing, Retail,
            E-commerce, Media Planning, and General & Event Management.
          </p>
        </>
      )
    },
    {
      icon: Sparkles,
      eyebrow: "Highlights",
      title: "Profile at a Glance",
      body: (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {[
            "463+ YouTube videos",
            "2.5 Lakh+ views",
            "3,000+ case articles",
            "16,000+ links (videos & print ads)",
            "Published research papers",
            "Published case studies",
            "5+ yrs corporate (event management)",
            "22+ years of experience",
            "Innovative teaching pedagogy",
            "200+ corporate projects delivered"
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-antique-gold mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )
    },
    {
      icon: Users,
      eyebrow: "Teaching Pedagogy",
      title: "How He Teaches",
      body: (
        <>
          <p>
            His delivery blends conceptual grounding with case studies, film and documentary
            clips, corporate ads, TV commercials, live project presentations, assignments,
            quizzes, viva, research articles, news-based cases, one-on-one discussion, and
            in-depth report writing.
          </p>
          <p>
            He has won 3 best-faculty awards for this style, maintaining a student feedback
            average above 8/10 consistently — while tracking attendance, participation,
            discipline, and performance closely throughout every batch.
          </p>
        </>
      )
    },
    {
      icon: Briefcase,
      eyebrow: "USP & Corporate Experience",
      title: "What Sets Him Apart",
      body: (
        <>
          <p>
            A personal archive of 16,000+ cases, corporate news items, film clips, print ads,
            company and industry analyses, and documentaries — deployed live in class for
            sharper recall and real competitive edge.
          </p>
          <p>
            5+ years of managerial experience in event management, having run product
            launches, roadshows, exhibitions, and corporate events for clients including
            Colgate, Siemens, Tata Steel, JCB, Godrej, Yamaha, Mercedes-Benz, Nissan, and
            British Telecom — 200+ projects delivered with service excellence.
          </p>
        </>
      )
    },
    {
      icon: ShieldCheck,
      eyebrow: "Research & Recognition",
      title: "Papers, Panels & Partner Institutes",
      body: (
        <>
          <p>
            9 research papers published and presented at national and international
            conferences, alongside 14 seminars, panel discussions, and talks on marketing.
          </p>
          <p>
            Visiting faculty at BML Munjal University, SOIL, ICFAI Business
            School, IIPM, IILM, and other leading institutes — recognized with
            multiple best-faculty and excellent-feedback awards along the way.
          </p>
        </>
      )
    }
  ];

  const serviceGroups = [
    {
      title: "Education & Admission Advisory",
      features: [
        { icon: FolderCheck, text: "Admission Portfolio Management: Strategic profile building and shortlisting top-fit universities" },
        { icon: FileCheck2, text: "Application & Documentation: Step-by-step guidance on form submissions and document verification" },
        { icon: BookOpenCheck, text: "Exam & Process Assistance: Real-time deadline tracking, updates, and post-deadline support options" },
        { icon: BellRing, text: "Corporate & Campus Seminars: Visiting lectures, academic seminars, and career planning workshops for institutions" }
      ]
    },
    {
      title: "Career Development & Skill Training",
      features: [
        { icon: MessagesSquare, text: "GD/PI Master Classes: Structured preparation for Group Discussions, personal interviews, and presentations" },
        { icon: LifeBuoy, text: "Personality & Communication Enhancement: Focused training in spoken English, corporate etiquette, and public speaking" }
      ]
    }
  ];

  const missionPoints = [
    {
      title: "Empower Through Advisory",
      desc: "Guide students toward ideal university admissions through personalized counselling rooted in deep research, market understanding, and career alignment."
    },
    {
      title: "Build Practical Skills",
      desc: "Deliver high-impact training in English proficiency, Group Discussions (GD), and Personal Interviews (PI) to build lasting confidence and career readiness."
    },
    {
      title: "Uphold Absolute Integrity",
      desc: "Build lasting client relationships through transparent counsel, objective evaluation, and strict adherence to standard ethical practices without acting as financial custodians."
    }
  ];

  const pillars = [
    {
      title: "Authenticity & Integrity",
      desc: "We deliver straightforward, unbiased advice — never false promises, guaranteed outcomes, or holding third-party client funds.",
      icon: ShieldCheck,
      color: "from-heritage-maroon to-heritage-crimson"
    },
    {
      title: "Student Empowerment",
      desc: "We equip clients with market insights, communication tools, and the confidence to make sound life decisions.",
      icon: HeartHandshake,
      color: "from-antique-gold to-sunlight-gold"
    },
    {
      title: "End-to-End Care",
      desc: "From interview prep and university selection to finding the right course and specialization, we support the entire transition journey.",
      icon: Compass,
      color: "from-heritage-maroon via-heritage-crimson to-antique-gold"
    },
    {
      title: "Excellence & Precision",
      desc: "Rigorous quality standards across every training module, with thorough diligence across all advisory verticals.",
      icon: GraduationCap,
      color: "from-heritage-crimson to-antique-gold"
    }
  ];

  // Our Core Values: K.R.I.S.H.N.A — spelled out letter by letter as its own
  // distinct section, since this acronym is unique to the brand. Each block
  // gets its own Krishna-blue-to-peacock-green gradient pairing so the strip
  // reads as a connected but visually varied set, rather than repeating the
  // exact same two colors seven times.
  const krishnaValues = [
    { letter: "K", word: "Knowledge", from: "#1B3B6F", to: "#2E8B57" },
    { letter: "R", word: "Reliability", from: "#123C69", to: "#1F9E8C" },
    { letter: "I", word: "Integrity", from: "#0E4D80", to: "#3AAF7A" },
    { letter: "S", word: "Student Centricity", from: "#1A3E7C", to: "#178F6E" },
    { letter: "H", word: "Holistic Support", from: "#164A73", to: "#2FAE8B" },
    { letter: "N", word: "Nurturing", from: "#0F3D6E", to: "#22A184" },
    { letter: "A", word: "Accountability", from: "#1D4E8C", to: "#2E9B6B" }
  ];

  return (
    <section
      id="about"
      className="relative py-24 scroll-mt-28 bg-gradient-to-b from-spiritual-white via-spiritual-cream to-warm-alabaster text-cosmic-midnight overflow-hidden"
    >
      {/* Decorative Traditional Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-antique-gold/5 to-transparent rounded-full blur-3xl pointer-events-none animate-drift-slow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-heritage-maroon/5 to-transparent rounded-full blur-3xl pointer-events-none animate-drift-slow-reverse" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        {/* Our Core Values: K.R.I.S.H.N.A — the acronym rendered as its own
            letter-by-letter strip, now leading the About Us section. */}
        <Reveal className="max-w-4xl mx-auto mb-16 text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-heritage-maroon mb-2">
            Our Core Values
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-heritage-burgundy mb-8">
            K.R.I.S.H.N.A
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {krishnaValues.map((value, idx) => (
              <Reveal key={value.letter} delayMs={idx * 60}>
                <div
                  className="group relative w-full h-32 sm:h-36 rounded-2xl border border-antique-gold/20 shadow-[0_6px_18px_rgba(74,14,20,0.08)] overflow-hidden flex flex-col items-center justify-center py-5 px-2 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.04] hover:shadow-[0_14px_30px_rgba(20,60,50,0.22)]"
                  style={{ background: "linear-gradient(160deg, #ffffff, #faf6ef)" }}
                >
                  {/* Hover-only gradient wash, unique per block */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
                    style={{ background: `linear-gradient(160deg, ${value.from}1a, ${value.to}33)` }}
                  />
                  {/* Hover border glow, unique per block */}
                  <div
                    className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
                    style={{ borderColor: `${value.to}80` }}
                  />

                  <span
                    className="relative block font-serif font-black text-4xl sm:text-5xl mb-1 transition-transform duration-500 ease-out group-hover:scale-110"
                    style={{
                      background: `linear-gradient(160deg, ${value.from}, ${value.to})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    {value.letter}
                  </span>
                  <span className="relative flex items-center justify-center min-h-[2rem] sm:min-h-[2.25rem] text-center font-sans text-sm sm:text-base font-semibold text-ink/75 leading-tight transition-colors duration-500 group-hover:text-ink">
                    {value.word}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* How We Work — plain editorial layout (no card/box grid), placed ahead of the
            Krishna-Arjuna narrative below. Text kept as given, not rewritten. */}
        <Reveal className="max-w-3xl mx-auto text-left mb-16">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-heritage-maroon mb-3">
            Our Vision
          </p>
          <p className="font-sans text-lg sm:text-xl text-heritage-burgundy leading-relaxed">
            "To be India's most trusted advisory partner for individuals navigating major life
            transitions — empowering minds through skill development, guiding academic and
            career choices, and simplifying admission decisions with absolute clarity and
            integrity."
          </p>

          <div className="w-16 h-1 bg-gradient-to-r from-antique-gold to-sunlight-gold my-8 rounded-full" />

          <p className="font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
            Krishna Mentor operates as a premier advisory unit offering expert guidance across a
            comprehensive spectrum of regular degree programs at leading universities, alongside
            short-term, placement-focused certificate courses. We work closely with students and
            professionals to align academic admissions with their budget, location preferences, and
            long-term career aspirations in a fully transparent environment. Whether you need
            comparative analysis of courses, personalized counselling, or assistance with
            ground-level knowledge, we serve as your single point of guidance to turn your
            ambitions into reality.
          </p>
        </Reveal>

        {/* Our Mission — the three mission pillars from our formal profile,
            spelled out individually rather than folded into prose. */}
        <Reveal className="max-w-4xl mx-auto mb-20">
          <p className="font-serif text-2xl sm:text-3xl font-bold text-heritage-maroon text-center mb-10">
            Our Mission
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {missionPoints.map((point, idx) => (
              <Reveal key={point.title} delayMs={idx * 80}>
                <TiltCard className="h-full bg-gradient-to-br from-white to-spiritual-cream rounded-2xl p-6 shadow-[0_6px_18px_rgba(74,14,20,0.1)] border border-antique-gold/15 flex flex-col">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-antique-gold/20 text-heritage-maroon font-serif font-bold text-sm mb-4 shrink-0">
                    {idx + 1}
                  </span>
                  <p className="font-sans font-bold text-heritage-burgundy mb-2">
                    {point.title}
                  </p>
                  <p className="font-sans text-sm text-slate-700 leading-relaxed">
                    {point.desc}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Core Services — grouped under the two service lines from our formal
            profile, rather than one flat list, so each line reads as its own offer. */}
        <Reveal className="max-w-4xl mx-auto mb-20">
          <p className="font-serif text-2xl sm:text-3xl font-bold text-heritage-maroon text-center mb-10">
            Our Core Services
          </p>
          <div className="space-y-10">
            {serviceGroups.map((group, groupIdx) => (
              <div key={group.title}>
                <p className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-heritage-crimson mb-4">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-antique-gold/20 text-heritage-maroon text-[11px] shrink-0">
                    {groupIdx + 1}
                  </span>
                  {group.title}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {group.features.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <Reveal key={feature.text} delayMs={idx * 70}>
                        <TiltCard>
                          <div className="flex items-center gap-3 bg-gradient-to-br from-white to-spiritual-cream rounded-xl px-4 py-3 shadow-[0_6px_18px_rgba(74,14,20,0.1)] border border-antique-gold/15">
                            <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-heritage-maroon to-heritage-crimson text-cream shadow-sm">
                              <Icon className="w-4 h-4" />
                            </div>
                            <p className="font-sans text-sm sm:text-[15px] font-medium text-ink/85 leading-snug">
                              {feature.text}
                            </p>
                          </div>
                        </TiltCard>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Core Philosophy Section */}
        <Reveal className="max-w-4xl mx-auto text-center mb-20 space-y-6">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="h-px w-8 bg-heritage-maroon/30" />
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-heritage-crimson">
              The Krishna-Arjuna Paradigm
            </span>
            <span className="h-px w-8 bg-heritage-maroon/30" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-heritage-maroon tracking-tight leading-tight">
            Mentorship Rooted in Wisdom.<br />Driven by Results.
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-antique-gold to-sunlight-gold mx-auto my-4 rounded-full" />

          <p className="font-sans text-base sm:text-lg text-slate-800 leading-relaxed max-w-3xl mx-auto">
            At <span className="font-semibold text-heritage-maroon">Krishna Mentor</span>, we believe that
            every student has a unique path to greatness. Just as Lord Krishna guided Arjuna with absolute clarity
            and infallible strategy, we navigate students and parents through the complex maze of college admissions
            and personal growth.
          </p>

          <p className="font-sans text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
            We do not just find you a college; we sculpt your confidence, shape your personality, map your legacy,
            and help you build the future you're capable of.
          </p>
        </Reveal>

        {/* The Krishna-Arjuna narrative — expanded, with the guiding artwork set against a
            glassmorphic panel and a soft "rising sun" glow behind it */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative flex justify-center order-2 lg:order-1 -mt-6 sm:-mt-8 lg:-mt-10">
            {/* Rising sun glow — warm gradient arc climbing up behind the artwork, boosted for visibility */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full pointer-events-none animate-flute-glow"
              style={{ background: "radial-gradient(circle at 50% 100%, rgba(233,163,71,0.85) 0%, rgba(233,163,71,0.45) 35%, rgba(201,149,68,0.2) 55%, transparent 75%)" }}
            />
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[320px] rounded-t-full pointer-events-none opacity-80"
              style={{ background: "linear-gradient(to top, rgba(224,162,74,0.55), transparent 72%)" }}
            />
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[260px] h-[260px] rounded-full pointer-events-none opacity-90 animate-flute-glow"
              style={{ background: "radial-gradient(circle at 50% 65%, rgba(255,205,120,0.9) 0%, rgba(233,163,71,0.4) 45%, transparent 72%)" }}
            />

            {/* Glassmorphic panel holding the artwork — kept light and transparent so the glow reads through */}
            <div className="relative w-full max-w-sm rounded-3xl bg-white/8 backdrop-blur-sm border border-white/40 shadow-[0_20px_50px_rgba(122,27,36,0.15)] p-6 overflow-hidden">
              <picture>
                <source srcSet="/krishna-arjuna-silhouette.webp" type="image/webp" />
                <img
                  src="/krishna-arjuna-silhouette.png"
                  alt="Krishna guiding Arjuna — the mentorship metaphor at the heart of Krishna Mentor"
                  width={800}
                  height={893}
                  loading="lazy"
                  className="relative w-full h-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.25)]"
                />
              </picture>
            </div>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-heritage-maroon">
              Our Guiding Philosophy
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-heritage-burgundy leading-tight">
              The Krishna–Arjuna Model of Mentorship
            </h3>
            <p className="font-sans text-ink/75 leading-relaxed">
              When Arjuna froze on the battlefield, unsure which path was right, Krishna didn't take up
              his bow for him — he helped him see clearly, and act with conviction. That's the role we take
              with every student: not doing the work for you, but standing beside you with clarity and
              strategy until you can act with confidence on your own.
            </p>
            <p className="font-sans text-ink/75 leading-relaxed">
              It's this same steady, one-on-one guidance — patient, personal, and genuinely invested in
              your outcome — that shapes every program we run.
            </p>
            <p className="font-sans text-ink/75 leading-relaxed">
              Every mentor on our team is trained to play the same role Krishna played on the battlefield:
              a calm, informed presence who helps you weigh your options honestly, rather than simply
              handing you a decision. We ask the questions that surface what you actually want, connect
              that to a realistic strategy, and stay with you through the follow-through — not just the
              planning.
            </p>
            <p className="font-sans text-ink/75 leading-relaxed">
              That's the difference between advice and guidance. Advice tells you what to do. Guidance
              helps you become someone who can decide for yourself — and that's the confidence we aim to
              leave every student with, long after the mentorship ends.
            </p>
          </div>
        </Reveal>

        {/* Pillars Interactive Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delayMs={idx * 120} className="h-full">
              <TiltCard
                className="h-full bg-cream/90 glass-card-light p-8 rounded-2xl shadow-lg border border-antique-gold/20 hover:shadow-2xl transition-shadow duration-300 relative group overflow-hidden flex flex-col justify-between"
              >
                {/* Accent top-border color */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-antique-gold to-sunlight-gold" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-heritage-maroon to-heritage-crimson flex items-center justify-center mb-6 text-cream shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-heritage-burgundy mb-3">
                    {pillar.title}
                  </h3>

                  <p className="font-sans text-sm text-slate-700 leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>

                <div className="text-xs font-mono font-bold uppercase tracking-wider text-heritage-crimson/80 flex items-center gap-1.5 mt-auto">
                  <span>Pillar {idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-antique-gold" />
                  <span>Wisdom Code</span>
                </div>
              </TiltCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="max-w-3xl mx-auto text-center mt-16">
          <p className="font-sans text-base sm:text-lg text-slate-700 leading-relaxed">
            At <span className="font-semibold text-heritage-maroon">Krishna Mentor</span>, we believe
            every major academic and life transition deserves clear vision, reliable direction, and
            unwavering support. Whether you are aiming for your dream university, honing essential
            career skills, or settling into a new environment, we are here to guide your journey with
            integrity, precision, and purpose.
          </p>
        </Reveal>

      </div>

      {/* Meet Your Mentor — interactive flip-book profile */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mt-24">
        <Reveal>
          <MentorFlipBook pages={mentorPages} />
        </Reveal>
      </div>

    </section>
  );
}
