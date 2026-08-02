import React, { useState, Suspense, lazy, ComponentType } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import ConsentPopup, { NOTICE_STRIP_HEIGHT } from "./components/ConsentPopup";
import ScrollManager from "./components/ScrollManager";
import HomePage from "./pages/HomePage";
import { ServiceProgram } from "./types";
import { trackEvent } from "./lib/analytics";
import { PhoneCall, Sparkles, X, Info } from "lucide-react";

// Lazy: pulls in framer-motion, which the homepage itself never needs at
// first paint — the modal is only rendered after the user clicks a "Book
// Free Counseling" button, so there's no reason to ship it in the main chunk.
const CounselingModal = lazy(() => import("./components/CounselingModal"));

// Everything except the homepage is lazy-loaded: most visitors land on "/"
// first, so there's no reason to make them download the Courses, Blog,
// Certificates, etc. bundles up front. Each becomes its own small chunk
// fetched only when that route is actually visited — smaller initial
// download, faster first paint, especially on mobile data.
//
// This lazy map is only the CLIENT default. React's synchronous
// renderToString (used by scripts/prerender.mjs via src/entry-server.tsx)
// can't wait on a lazy import's promise — it just renders the Suspense
// fallback instead, which would make every prerendered route body empty.
// So App accepts an optional `pages` prop: entry-server.tsx passes real,
// eagerly-imported components there, bypassing lazy/Suspense for SSR only.
// The client render path (main.tsx) doesn't pass this prop, so real
// visitors still get the normal code-split, lazy-loaded behavior.
export type RoutedPages = {
  CoursesPage: ComponentType<{ onBookCounseling: (programName?: string) => void }>;
  CertificatesPage: ComponentType<{ onBookCounseling: (programName?: string) => void }>;
  BlogPage: ComponentType<{ onBookCounseling: (programName?: string) => void }>;
  BlogPostPage: ComponentType<{ onBookCounseling: (programName?: string) => void }>;
  InviteUsPage: ComponentType<{ onBookCounseling: (programName?: string) => void }>;
  TuitionPage: ComponentType<{ onBookCounseling: (programName?: string) => void }>;
  PromoQrPage: ComponentType<Record<string, never>>;
  DisclaimerPage: ComponentType<Record<string, never>>;
  PrivacyPolicyPage: ComponentType<Record<string, never>>;
};

const defaultPages: RoutedPages = {
  CoursesPage: lazy(() => import("./pages/CoursesPage")),
  CertificatesPage: lazy(() => import("./pages/CertificatesPage")),
  BlogPage: lazy(() => import("./pages/BlogPage")),
  BlogPostPage: lazy(() => import("./pages/BlogPostPage")),
  InviteUsPage: lazy(() => import("./pages/InviteUsPage")),
  TuitionPage: lazy(() => import("./pages/TuitionPage")),
  PromoQrPage: lazy(() => import("./pages/PromoQrPage")),
  DisclaimerPage: lazy(() => import("./pages/DisclaimerPage")),
  PrivacyPolicyPage: lazy(() => import("./pages/PrivacyPolicyPage")),
};

// Confirmed Google Maps place link (points to the exact verified pin, not a
// text search) — used for the "Get directions" quick-link below.
const BUSINESS_MAPS_URL = "https://maps.app.goo.gl/cTgW7tMQE8NcWbpU7";

interface AppProps {
  pages?: RoutedPages;
}

export default function App({ pages = defaultPages }: AppProps) {
  const {
    CoursesPage,
    CertificatesPage,
    BlogPage,
    BlogPostPage,
    InviteUsPage,
    TuitionPage,
    PromoQrPage,
    DisclaimerPage,
    PrivacyPolicyPage,
  } = pages;

  // Modal controllers
  const [isCounselingOpen, setIsCounselingOpen] = useState(false);
  const [selectedProgramName, setSelectedProgramName] = useState("Premium Academic Mentorship");

  // Selected program overview drawer state
  const [activeDetailedProgram, setActiveDetailedProgram] = useState<ServiceProgram | null>(null);

  // WhatsApp helper
  const [isWaOpen, setIsWaOpen] = useState(false);
  const [waMessage, setWaMessage] = useState("");

  // Tracks whether the dismissible top notice strip is showing, so the
  // (fixed-position) Navbar can be pushed down to avoid overlapping it.
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);

  const triggerCounseling = (programName?: string) => {
    setSelectedProgramName(programName || "Premium Academic Mentorship");
    setIsCounselingOpen(true);
    trackEvent("open_counseling_modal", { program: programName || "Premium Academic Mentorship" });
  };

  // QR codes/flyers can link to "?book=1" (see /promote) to drop a visitor
  // straight into the booking form instead of the homepage.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("book")) {
      triggerCounseling();
      params.delete("book");
      const cleanUrl = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash}`;
      window.history.replaceState({}, "", cleanUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerProgramDetails = (program: ServiceProgram) => {
    setActiveDetailedProgram(program);
  };

  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMsg = encodeURIComponent(
      waMessage || "Hello Krishna Mentor, I would like to inquire about your elite academic programs and college admissions counseling."
    );
    window.open(`https://wa.me/919899078020?text=${formattedMsg}`, "_blank", "noopener,noreferrer");
    trackEvent("contact_whatsapp", { source: "floating_widget" });
    setIsWaOpen(false);
    setWaMessage("");
  };

  return (
    <div className="min-h-screen bg-cream text-ink selection:bg-antique-gold selection:text-cream overflow-x-hidden font-sans">
      {/* Sticky Header Navigation */}
      <ErrorBoundary name="Navbar">
        <Navbar onBookCounseling={() => triggerCounseling()} topOffset={isNoticeVisible ? NOTICE_STRIP_HEIGHT : 0} />
      </ErrorBoundary>

      {/* Short, ignorable strip above the navbar linking to Disclaimer + Privacy Policy */}
      <ErrorBoundary name="ConsentPopup">
        <ConsentPopup onVisibilityChange={setIsNoticeVisible} />
      </ErrorBoundary>

      {/* Keeps in-page anchor scrolling and scroll-to-top working across routes */}
      <ScrollManager />

      {/* Routed Page Content */}
      <main className="relative">
        <ErrorBoundary name="RoutedPage">
          <Suspense fallback={<div className="min-h-[60vh]" />}>
            <Routes>
              <Route
                path="/"
                element={<HomePage onBookCounseling={triggerCounseling} onSelectProgram={triggerProgramDetails} />}
              />
              <Route path="/courses" element={<CoursesPage onBookCounseling={triggerCounseling} />} />
              <Route path="/certificates" element={<CertificatesPage onBookCounseling={triggerCounseling} />} />
              <Route path="/blog" element={<BlogPage onBookCounseling={triggerCounseling} />} />
              <Route path="/blog/:slug" element={<BlogPostPage onBookCounseling={triggerCounseling} />} />
              <Route path="/invite-us" element={<InviteUsPage onBookCounseling={triggerCounseling} />} />
              <Route path="/tuition" element={<TuitionPage onBookCounseling={triggerCounseling} />} />
              <Route path="/promote" element={<PromoQrPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Footer Segment (includes lamp-toggled contact form + map) */}
      <ErrorBoundary name="Footer">
        <Footer />
      </ErrorBoundary>

      {/* ================= FLOATING ELEMENTS ================= */}

      {/* WhatsApp + Maps Pinned Actions (Bottom Left) */}
      <ErrorBoundary name="WhatsAppMapsWidget">
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
        {/* Google Maps quick-link, stacked above WhatsApp */}
        <a
          href={BUSINESS_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="Get directions on Google Maps"
          onClick={() => trackEvent("click_directions")}
          className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(176,124,44,0.35)] border border-heritage-maroon/10 transition-all duration-300"
        >
          <picture>
            <source srcSet="/google-maps-icon.webp" type="image/webp" />
            <img
              src="/google-maps-icon.png"
              alt="Google Maps"
              width={192}
              height={192}
              loading="eager"
              className="w-8 h-8 object-contain"
            />
          </picture>
        </a>

        <button
          onClick={() => setIsWaOpen(!isWaOpen)}
          className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] border border-emerald-400/30 transition-all duration-300"
          title="Connect on WhatsApp"
        >
          <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>

        {isWaOpen && (
          <div className="absolute bottom-16 left-0 w-[80vw] sm:w-[320px] bg-gradient-to-b from-emerald-800 to-emerald-950 border border-emerald-500/30 rounded-2xl shadow-2xl p-4 animate-fade-in-up">
            <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-serif text-sm font-bold text-white">Direct Admissions Desk</span>
              </div>
              <button onClick={() => setIsWaOpen(false)} aria-label="Close WhatsApp panel" className="text-white/60 hover:text-white">
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>

            <form onSubmit={sendWhatsApp} className="space-y-3">
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                Type your inquiry to send directly to our admissions team:
              </p>
              <textarea
                value={waMessage}
                onChange={(e) => setWaMessage(e.target.value)}
                placeholder="I am interested in securing college admissions / English Speaking courses..."
                className="w-full text-xs bg-emerald-950 border border-white/10 focus:border-emerald-500 rounded-lg p-2.5 text-white outline-none resize-none h-20"
              />
              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Launch WhatsApp Chat
              </button>
            </form>
          </div>
        )}
      </div>
      </ErrorBoundary>

      {/* Chatbot (Bottom Right) */}
      <ErrorBoundary name="Chatbot">
        <Chatbot />
      </ErrorBoundary>

      {/* Counseling Booking Modal */}
      <Suspense fallback={null}>
        <CounselingModal
          isOpen={isCounselingOpen}
          onClose={() => setIsCounselingOpen(false)}
          selectedProgramName={selectedProgramName}
        />
      </Suspense>

      {/* Service Program Details Drawer overlay */}
      {activeDetailedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <div
            onClick={() => setActiveDetailedProgram(null)}
            className="absolute inset-0 bg-heritage-burgundy/50 backdrop-blur-md transition-opacity"
          />

          <div className="relative w-full max-w-lg h-full bg-cream border-l border-antique-gold/25 shadow-2xl p-8 flex flex-col justify-between overflow-y-auto animate-fade-in-up z-10">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-antique-gold via-sunlight-gold to-antique-gold" />

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-antique-gold/20 border border-sunlight-gold/30 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-sunlight-gold" />
                  <span className="font-mono text-[10px] font-bold text-sunlight-gold uppercase tracking-wider">
                    {activeDetailedProgram.tag || "Elite Program"}
                  </span>
                </div>
                <button
                  onClick={() => setActiveDetailedProgram(null)}
                  aria-label="Close program details"
                  className="text-ink/50 hover:text-heritage-burgundy hover:bg-heritage-maroon/10 p-2 rounded-full transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <h3 className="font-serif text-3xl font-bold text-heritage-burgundy leading-tight">{activeDetailedProgram.title}</h3>

              <div className="w-12 h-1 bg-gradient-to-r from-antique-gold to-sunlight-gold rounded-full" />

              <div className="space-y-4 font-sans text-ink/75 text-sm leading-relaxed">
                <p className="font-medium text-heritage-burgundy text-base">{activeDetailedProgram.description}</p>
                <p>
                  {activeDetailedProgram.longDescription ||
                    "This elite mentorship program is structured for ambitious candidates looking to secure significant growth, unshakeable confidence, and secure admissions."}
                </p>
              </div>

              <div className="bg-peach/25 border border-heritage-maroon/10 rounded-xl p-5 space-y-3.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sunlight-gold flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-sunlight-gold" />
                  Curriculum Highlights
                </h4>
                <ul className="space-y-2 text-xs text-ink/70">
                  <li className="flex items-start gap-2">
                    <span className="text-antique-gold font-bold">✓</span>
                    <span>1-on-1 direct guidance from senior academic advisors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-antique-gold font-bold">✓</span>
                    <span>Intensive strategies matching top-tier local &amp; global colleges.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-antique-gold font-bold">✓</span>
                    <span>Deep profile and confidence enhancement audits.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-heritage-maroon/10 flex gap-3">
              <button
                onClick={() => setActiveDetailedProgram(null)}
                className="flex-grow py-3 rounded-full text-xs font-bold border border-heritage-maroon/25 text-heritage-burgundy hover:bg-peach/30 transition-all text-center"
              >
                Close Drawer
              </button>
              <button
                onClick={() => {
                  const title = activeDetailedProgram.title;
                  setActiveDetailedProgram(null);
                  triggerCounseling(title);
                }}
                className="flex-grow py-3 rounded-full text-xs font-bold bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold text-cosmic-midnight hover:shadow-[0_0_15px_rgba(249,223,141,0.5)] transition-all text-center"
              >
                Inquire &amp; Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
