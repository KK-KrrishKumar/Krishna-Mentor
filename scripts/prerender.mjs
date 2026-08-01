// scripts/prerender.mjs
//
// Runs automatically after `vite build` (see "postbuild" in package.json,
// which runs `npm run build:ssr` first, then this script).
//
// Two problems, two fixes, both handled here:
//
// 1. Meta tags (title/description/OG/Twitter/canonical) — Seo.tsx updates
//    these client-side via useEffect, which works for real browsers and
//    JS-executing crawlers (Googlebot), but does nothing for crawlers that
//    don't run JavaScript — most social link-preview bots (Facebook,
//    LinkedIn, WhatsApp, Slack, X) and several AI answer-engine crawlers.
//
// 2. Page body content — the SPA's dist/index.html has an empty
//    `<div id="root"></div>`; real content only appears after React runs
//    in the browser. A non-JS crawler hitting /courses directly saw a
//    blank page even after fix #1 above. That's what src/entry-server.tsx
//    + `npm run build:ssr` exist for: they render each route's actual
//    component tree to an HTML string at build time (via React's
//    renderToString), so the crawler gets the real page content, not
//    just a relabeled empty shell.
//
// For every route below (plus "/"), this script takes the already-built
// dist/index.html (which has the correct <script>/<link> tags Vite
// generated) and writes a copy to dist/<route>/index.html with that
// route's meta tags swapped in AND its real rendered HTML dropped into
// `<div id="root">`. Static hosts (Vercel, Netlify, etc.) serve the
// matching static file for a path before falling back to the SPA
// rewrite, so crawlers hitting e.g. /courses directly get a fully
// formed page — and real visitors still get the normal client-rendered
// app on top of it (see note on hydration below).
//
// Note on hydration: main.tsx uses createRoot(...), not hydrateRoot(...).
// That means the browser doesn't try to reconcile against this
// prerendered markup — it briefly shows the static HTML, then React
// replaces it with a fresh client render once the JS bundle runs. This
// trades a small amount of perf for avoiding an entire class of
// hydration-mismatch bugs (useId, lazy-loaded chunk boundaries, animation
// libraries with non-deterministic initial values, etc.). If you want
// true hydration later, switching main.tsx to hydrateRoot is the next
// step — but every page will need to render *identically* on server and
// first client pass, which is a bigger lift than this fixes today.
//
// Keep the ROUTES list below in sync with the SEO objects exported from
// each page (see the `export const SEO = {...}` near the top of every
// file in src/pages/) and with the route list in src/App.tsx. (Blog post
// entries below are just titles/descriptions for prerendered meta tags —
// public/sitemap.xml itself is no longer hand-maintained: it's generated
// from src/data/blog.ts automatically by scripts/generate-sitemap.mjs,
// which runs before every build. See that file for details.) It's
// intentionally duplicated here (rather than
// imported) so this script can run with plain Node and no TypeScript
// build step for the metadata; the actual page content comes from the
// compiled dist-server/entry-server.js SSR bundle instead of being
// duplicated.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, "..", "dist");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");
const SSR_ENTRY_PATH = path.join(__dirname, "..", "dist-server", "entry-server.js");

if (!existsSync(TEMPLATE_PATH)) {
  console.error(`[prerender] Could not find ${TEMPLATE_PATH} — did "vite build" run first?`);
  process.exit(1);
}
if (!existsSync(SSR_ENTRY_PATH)) {
  console.error(`[prerender] Could not find ${SSR_ENTRY_PATH} — did "npm run build:ssr" run first?`);
  process.exit(1);
}

const template = readFileSync(TEMPLATE_PATH, "utf-8");
const { render } = await import(pathToFileURL(SSR_ENTRY_PATH).href);

/** @typedef {{ path: string, title: string, description: string, keywords?: string }} PageMeta */

/** @type {PageMeta[]} */
const ROUTES = [
  // Home ("/") is handled separately below — dist/index.html already has
  // the right meta tags baked in from index.html, so only its body needs
  // the rendered content dropped in, not a meta swap.
  {
    path: "/courses",
    title: "Degree Programs & Admission Guidance | BBA, MBA, B.Tech, Law & More | Krishna Mentor",
    description:
      "Explore degree programs across BBA, MBA, PGDM, B.Tech, M.Tech, BCA, MCA, Law, BA, B.Sc, MA, M.Sc and B.Design that Krishna Mentor helps students get admitted into.",
    keywords:
      "BBA admission consultant, MBA admission consultant, B.Tech admission guidance, PGDM colleges, BCA MCA admission, law admission consultant, best degree courses"
  },
  {
    path: "/certificates",
    title: "Short-Term Certificate & Placement-Oriented Courses | Krishna Mentor",
    description:
      "Build in-demand skills with Krishna Mentor's short-term certificate courses in marketing, business strategy, communication, and placement-oriented programs like English speaking and interview preparation.",
    keywords:
      "short term certificate course, digital marketing certificate, English speaking course, GD PI preparation, business communication course, placement oriented courses"
  },
  {
    path: "/blog",
    title: "Admissions & Mentorship Blog | Krishna Mentor",
    description:
      "Practical admissions guidance, GDPI interview tips, and personality development advice from Krishna Mentor's academic advisors.",
    keywords: "admission tips blog, GDPI preparation blog, college admission guidance India, personality development articles"
  },
  {
    path: "/invite-us",
    title: "Invite Us — Visiting Faculty & Seminar Sessions | Krishna Mentor",
    description:
      "Invite Krishna Mentor to your college or institute as visiting faculty, or book a guest seminar from a range of management and business topics — marketing, strategy, digital, and more.",
    keywords: "invite visiting faculty, guest seminar management college, guest lecture marketing management, visiting faculty MBA college"
  },
  {
    path: "/tuition",
    title: "CBSE Class 11 & 12 Tuition — Business Studies & Economics | Krishna Mentor",
    description:
      "Krishna Mentor offers CBSE Class XI–XII tuition in Business Studies and Economics — one-on-one teaching at our centre, or online.",
    keywords: "CBSE class 11 12 tuition, Business Studies tuition, Economics tuition CBSE, home tutor Business Studies Economics"
  },
  {
    path: "/disclaimer",
    title: "Disclaimer | Krishna Mentor",
    description:
      "Krishna Mentor's role as an advisory and consultancy unit, and the limits of our responsibility for legal, financial, and transactional outcomes."
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | Krishna Mentor",
    description: "How Krishna Mentor collects, uses, and protects client personal, contact, academic, and property-related information."
  },
  {
    path: "/promote",
    title: "Promo QR Code Generator | Krishna Mentor",
    description: "Generate a QR code that links directly to the Krishna Mentor booking form, for flyers, posters, and real-world promotion."
  },

  // Blog posts — keep in sync with src/data/blog.ts (BLOG_POSTS).
  {
    path: "/blog/how-to-choose-the-right-degree-program",
    title: "How to Choose the Right Degree Program in 2026 | Krishna Mentor",
    description:
      "A practical framework for comparing BBA, B.Tech, and other undergraduate options based on interests, career goals, and college fit — not just brand names."
  },
  {
    path: "/blog/gdpi-preparation-tips-that-actually-work",
    title: "GDPI Preparation Tips That Actually Work | Krishna Mentor",
    description:
      "The group discussion and personal interview mistakes we see most often, and the specific habits that consistently help students stand out to admission panels."
  },
  {
    path: "/blog/why-english-speaking-skills-matter-for-admissions",
    title: "Why English Speaking Skills Matter for Admissions | Krishna Mentor",
    description:
      "Strong spoken English shapes first impressions in interviews and campus life alike. Here's how to build fluency and confidence before your admission cycle starts."
  },
  {
    path: "/blog/mba-vs-pgdm-what-actually-differs",
    title: "MBA vs PGDM: What Actually Differs | Krishna Mentor",
    description:
      "The two credentials get compared constantly, but the real differences — accreditation, curriculum flexibility, and recruiter perception — rarely get explained clearly."
  },
  {
    path: "/blog/what-one-on-one-mentorship-actually-changes",
    title: "What One-on-One Mentorship Actually Changes | Krishna Mentor",
    description:
      "Generic advice and personalized guidance can sound similar on paper, but they lead students to very different outcomes. Here's what a genuine mentoring relationship adds."
  },
  {
    path: "/blog/building-a-standout-extracurricular-profile",
    title: "Building a Standout Extracurricular Profile | Krishna Mentor",
    description:
      "Why depth beats breadth when it comes to activities outside the classroom, and how to build a profile that actually tells a coherent story."
  },
  {
    path: "/blog/study-abroad-vs-domestic-what-fits-you",
    title: "Study Abroad vs. Domestic: What's Actually Right for You | Krishna Mentor",
    description:
      "Beyond prestige and Instagram photos — a grounded look at cost, career outcomes, and personal readiness when weighing international versus domestic options."
  },
  {
    path: "/blog/scholarship-hunting-a-practical-guide",
    title: "Scholarship Hunting: A Practical Guide | Krishna Mentor",
    description:
      "Merit scholarships, need-based aid, and institute-specific grants explained simply, with a realistic timeline for actually applying to them."
  },
  {
    path: "/blog/the-real-timeline-for-admission-applications",
    title: "The Real Timeline for Admission Applications | Krishna Mentor",
    description: "What actually needs to happen, and by when, if you want a genuinely strategic (not panicked) application season."
  },
  {
    path: "/blog/body-language-tips-for-interview-success",
    title: "Body Language Tips for Interview Success | Krishna Mentor",
    description:
      "Posture, eye contact, and small non-verbal habits that shape how an interview panel reads your confidence — often before you've said a word."
  },
  {
    path: "/blog/how-to-write-a-winning-sop-for-mba-admissions",
    title: "How to Write a Winning Statement of Purpose (SOP) for MBA Admissions | Krishna Mentor",
    description:
      "What admission committees are actually screening for in an MBA SOP, the structure that consistently works, and the clichés that quietly sink otherwise strong applications."
  },
  {
    path: "/blog/bba-after-12th-commerce-complete-roadmap",
    title: "BBA After 12th Commerce: A Complete Roadmap | Krishna Mentor",
    description:
      "Entrance exams, top college categories, eligibility, and the decisions that actually matter when planning a BBA right after Class 12 commerce."
  },
  {
    path: "/blog/common-group-discussion-topics-2026-how-to-structure-your-answer",
    title: "Common Group Discussion Topics in 2026 (and How to Structure Your Answer) | Krishna Mentor",
    description:
      "The recurring GD topic categories admission panels keep returning to this year, and a repeatable structure for contributing clearly under time pressure."
  },
  {
    path: "/blog/how-to-overcome-interview-anxiety-before-admission-panel",
    title: "How to Overcome Interview Anxiety Before an Admission Panel | Krishna Mentor",
    description:
      "Practical, specific techniques for managing nerves before and during an admission interview — beyond generic advice to \"just relax.\""
  },
  {
    path: "/blog/when-to-hire-an-admission-counselor-vs-going-solo",
    title: "When to Hire an Admission Counselor vs. Going Solo: A Decision Framework | Krishna Mentor",
    description:
      "A grounded framework for deciding whether structured mentorship is actually worth it for your situation, or whether self-guided preparation genuinely makes sense."
  }
];

const SITE_URL = "https://www.krishnamentor.com";
const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ROOT_DIV = '<div id="root"></div>';

function replaceTag(html, regex, replacement) {
  return regex.test(html) ? html.replace(regex, replacement) : html;
}

function injectBody(html, bodyHtml) {
  if (!html.includes(ROOT_DIV)) {
    console.warn(`[prerender] Could not find ${ROOT_DIV} in template — body content was not injected.`);
    return html;
  }
  return html.replace(ROOT_DIV, `<div id="root">${bodyHtml}</div>`);
}

function applyMeta(html, page) {
  const fullUrl = `${SITE_URL}${page.path}`;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);

  let out = html;
  out = replaceTag(out, /<title>.*?<\/title>/s, `<title>${title}</title>`);
  out = replaceTag(out, /<meta name="description" content=".*?"\s*\/?>/s, `<meta name="description" content="${description}" />`);
  if (page.keywords) {
    const keywords = escapeHtml(page.keywords);
    out = replaceTag(out, /<meta name="keywords" content=".*?"\s*\/?>/s, `<meta name="keywords" content="${keywords}" />`);
  }
  out = replaceTag(out, /<link rel="canonical" href=".*?"\s*\/?>/s, `<link rel="canonical" href="${fullUrl}" />`);
  out = replaceTag(out, /<meta property="og:title" content=".*?"\s*\/?>/s, `<meta property="og:title" content="${title}" />`);
  out = replaceTag(
    out,
    /<meta property="og:description" content=".*?"\s*\/?>/s,
    `<meta property="og:description" content="${description}" />`
  );
  out = replaceTag(out, /<meta property="og:url" content=".*?"\s*\/?>/s, `<meta property="og:url" content="${fullUrl}" />`);
  out = replaceTag(out, /<meta name="twitter:title" content=".*?"\s*\/?>/s, `<meta name="twitter:title" content="${title}" />`);
  out = replaceTag(
    out,
    /<meta name="twitter:description" content=".*?"\s*\/?>/s,
    `<meta name="twitter:description" content="${description}" />`
  );

  return out;
}

let written = 0;
let failed = 0;

// Home ("/"): meta tags in dist/index.html are already correct as-authored
// in index.html, so only the body needs the rendered markup dropped in.
// Overwrite dist/index.html itself (no subdirectory — this IS the file
// static hosts serve for "/").
try {
  const homeHtml = render("/");
  writeFileSync(TEMPLATE_PATH, injectBody(template, homeHtml), "utf-8");
  written++;
} catch (err) {
  failed++;
  console.error(`[prerender] Failed to render "/":`, err);
}

for (const page of ROUTES) {
  try {
    const bodyHtml = render(page.path);
    const outDir = path.join(DIST_DIR, page.path);
    const outFile = path.join(outDir, "index.html");
    const html = injectBody(applyMeta(template, page), bodyHtml);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(outFile, html, "utf-8");
    written++;
  } catch (err) {
    failed++;
    console.error(`[prerender] Failed to render "${page.path}":`, err);
  }
}

console.log(`[prerender] Wrote ${written} static route(s) with rendered content + page-specific meta tags into dist/.`);
if (failed > 0) {
  console.error(`[prerender] ${failed} route(s) failed to render — see errors above.`);
  process.exit(1);
}
