import React from "react";
import Hero from "../components/Hero";
import DividerFlute from "../components/DividerFlute";
import Philosophy from "../components/Philosophy";
import GuidedJourney from "../components/GuidedJourney";
import ServicesMatrix from "../components/ServicesMatrix";
import TimelineRoadmap from "../components/TimelineRoadmap";
import Testimonials from "../components/Testimonials";
import FaqSection from "../components/FaqSection";
import Seo from "../components/Seo";
import { ServiceProgram } from "../types";
import { FAQ_DATA, TESTIMONIALS, AGGREGATE_RATING } from "../data";

interface HomePageProps {
  onBookCounseling: (programName?: string) => void;
  onSelectProgram: (program: ServiceProgram) => void;
}

export const HOME_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Krishna Mentor",
  description:
    "Elite academic mentorship, college admission consulting, and professional development.",
  url: "https://www.krishnamentor.com/",
  telephone: "+91-98990-78020",
  email: "krishnamentoring@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Old Railway Road, Near Sohna Chowk, Sector 8",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122001",
    addressCountry: "IN"
  },
  hasMap: "https://maps.app.goo.gl/cTgW7tMQE8NcWbpU7",
  image: "https://www.krishnamentor.com/logo-feather-quill.png",
  priceRange: "$$",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Gurugram, Haryana, India"
  },
  knowsAbout: [
    "Career and University Admission Advisory",
    "Admission Counseling",
    "Degree Admission Guidance",
    "Certificate Courses",
    "CBSE Tuition"
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Krishna Mentor Programs",
    itemListElement: [
      {
        "@type": "Service",
        name: "Career & University Admission Advisory",
        serviceType: "Admission Counseling",
        description:
          "One-on-one career and university admission counseling — profile assessment, college and program shortlisting, and application strategy. Krishna Mentor's core, primary service.",
        provider: { "@type": "EducationalOrganization", name: "Krishna Mentor" },
        areaServed: { "@type": "AdministrativeArea", name: "Gurugram, Haryana, India" },
        url: "https://www.krishnamentor.com/#services"
      },
      {
        "@type": "OfferCatalog",
        name: "Degree Admission Guidance",
        url: "https://www.krishnamentor.com/courses"
      },
      {
        "@type": "OfferCatalog",
        name: "Short-Term Certificate Courses",
        url: "https://www.krishnamentor.com/certificates"
      },
      {
        "@type": "OfferCatalog",
        name: "CBSE Class XI-XII Tuition (Business Studies & Economics)",
        url: "https://www.krishnamentor.com/tuition"
      }
    ]
  },
  sameAs: [
    "https://www.instagram.com/krishna.mentor/",
    "https://www.linkedin.com/in/krishnamentor/",
    "https://www.youtube.com/@Krishna-Mentoring"
  ],
  // Reuses the exact testimonials shown in Testimonials.tsx, so this schema
  // never claims a review that isn't actually published on the page — the
  // aggregateRating figure is derived from these same entries (see
  // AGGREGATE_RATING in data.ts), not a separate invented number.
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: AGGREGATE_RATING.ratingValue,
    reviewCount: AGGREGATE_RATING.reviewCount,
    bestRating: "5",
    worstRating: "1"
  },
  review: TESTIMONIALS.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewBody: t.quote,
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(t.rating ?? 5),
      bestRating: "5",
      worstRating: "1"
    }
  }))
};

export const BREADCRUMB_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.krishnamentor.com/" }
  ]
};

// Reuses the same FAQ content shown to visitors (FaqSection) so the
// structured data and the on-page copy never drift out of sync — this is
// what lets AI answer engines and Google's rich results quote the FAQs
// directly.
export const FAQ_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DATA.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer }
  }))
};

// Single source of truth for this page's title/description/keywords/path —
// both the live <Seo> call below and scripts/prerender.mjs (which bakes
// this same metadata into static HTML per route at build time, for
// crawlers that don't run JavaScript) import this exact object, so there's
// never a second copy to drift out of sync.
export const SEO = {
  title: "Best Admission Consultancy & Academic Mentor | Krishna Mentor",
  description:
    "Krishna Mentor provides elite academic mentorship, college admission consulting, and professional development.",
  path: "/",
  keywords:
    "college admission consultant, academic mentor, GDPI training, personality development, English speaking course, admission counseling"
};

export default function HomePage({ onBookCounseling, onSelectProgram }: HomePageProps) {
  return (
    <>
      <Seo
        {...SEO}
        structuredData={[HOME_STRUCTURED_DATA, FAQ_STRUCTURED_DATA, BREADCRUMB_STRUCTURED_DATA]}
      />

      <Hero
        onStartJourney={() => onBookCounseling()}
        onExplorePrograms={() => {
          const el = document.getElementById("services");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <DividerFlute />
      <Philosophy />
      <GuidedJourney />
      <ServicesMatrix onSelectProgram={onSelectProgram} onBookCounseling={onBookCounseling} />
      <TimelineRoadmap />
      <Testimonials />
      <FaqSection />
    </>
  );
}
