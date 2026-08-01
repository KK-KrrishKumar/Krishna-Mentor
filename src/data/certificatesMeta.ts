import { CERTIFICATE_GROUPS, TOTAL_CERTIFICATE_COUNT } from "./certificates";

// Split out from CertificatesPage.tsx: Vite's Fast Refresh requires a file
// that exports a React component to export ONLY that component (plus known
// constant patterns). Mixing in plain data exports like these disables Fast
// Refresh for the whole file, so they live here instead.

export const CERTIFICATES_STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.krishnamentor.com/" },
      { "@type": "ListItem", position: 2, name: "Certificates", item: "https://www.krishnamentor.com/certificates" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Short-Term Certificate Courses at Krishna Mentor",
    description:
      "Short-term management and placement-oriented certificate courses run directly by Krishna Mentor, covering marketing, business strategy, communication, and interview readiness.",
    numberOfItems: TOTAL_CERTIFICATE_COUNT,
    itemListElement: CERTIFICATE_GROUPS.flatMap((group) =>
      group.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Course",
          name: item,
          description: `${item} — a short-term certificate course offered by Krishna Mentor.`,
          provider: { "@type": "EducationalOrganization", name: "Krishna Mentor", sameAs: "https://www.krishnamentor.com/" }
        }
      }))
    )
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What short-term certificate courses does Krishna Mentor offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Krishna Mentor offers short-term certificate courses in marketing management, digital marketing, business strategy, event management, consumer behavior, and more, along with placement-oriented courses like English speaking and group discussion & interview preparation."
        }
      },
      {
        "@type": "Question",
        name: "Are Krishna Mentor's certificate courses good for placement preparation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The placement-oriented track covers English speaking, group discussion and interview preparation, sales and marketing management, digital marketing management, and case study management to help students get admission and job ready."
        }
      },
      {
        "@type": "Question",
        name: "How are these certificate courses conducted?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All of Krishna Mentor's short-term certificate courses are hands-on sessions with direct mentor feedback."
        }
      }
    ]
  }
];

// Single source of truth for this page's title/description/keywords/path —
// scripts/prerender.mjs keeps a matching copy of these values to bake
// matching static HTML per route, so there's never a second copy to drift
// out of sync within the app itself.
export const CERTIFICATES_SEO = {
  title: "Short-Term Certificate & Placement-Oriented Courses | Krishna Mentor",
  description:
    "Build in-demand skills with Krishna Mentor's short-term certificate courses in marketing, business strategy, communication, and placement-oriented programs like English speaking and interview preparation.",
  path: "/certificates",
  keywords:
    "short term certificate course, digital marketing certificate, English speaking course, GD PI preparation, business communication course, placement oriented courses"
};
