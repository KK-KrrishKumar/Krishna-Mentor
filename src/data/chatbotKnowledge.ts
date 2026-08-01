import { FAQItem } from "../types";
import { PROGRAMS_DATA, ROADMAP_STEPS } from "../data";
import { COURSE_CATEGORIES } from "./courses";
import { CERTIFICATE_GROUPS } from "./certificates";
import { BLOG_POSTS } from "./blog";

/**
 * Single source of truth for everything the chatbot can talk about.
 * This file turns the site's existing data (courses, certificates, blog,
 * programs, roadmap) into chatbot-ready Q&A automatically, so you never
 * have to hand-write a new FAQ entry every time a course or article is
 * added elsewhere — add it once in courses.ts / certificates.ts / blog.ts
 * / data.ts, and the chatbot picks it up the next time the site builds.
 *
 * Everything here runs entirely in the browser — no AI API, no backend,
 * no cost per conversation. It's a keyword/phrase matcher, not a live
 * language model, so answers are exact-but-limited: great for "do you
 * offer X", weaker for open-ended conversation. That trade-off is what
 * keeps this free to run on a static GoDaddy-hosted site.
 */

// ---- 1. Hand-curated general FAQ (unchanged core questions) ----
export const GENERAL_FAQ: FAQItem[] = [
  {
    question: "What programs do you offer?",
    keywords: ["program", "programs", "services", "offer", "courses"],
    answer:
      "We offer Premium College Admissions counseling, English Speaking Mastery, and Personality Development mentorship, along with three dedicated tracks: full degree admission guidance (BBA, MBA, B.Tech, and more), short-term placement-oriented certificate courses including GD & PI preparation, and CBSE Class XI–XII school tuition in Business Studies and Economics. You can see full details in the Services section above."
  },
  {
    question: "Do you offer school tuition?",
    keywords: ["tuition", "tutor", "class 11", "class 12", "cbse", "business studies", "economics", "school"],
    answer:
      "Yes — we offer CBSE Class XI–XII tuition in Business Studies and Economics, taught one-on-one at our centre. Visit the Tuition page to see the full syllabus coverage and book a free trial session.",
    link: { path: "/tuition", label: "See the Tuition page" }
  },
  {
    question: "Where do you operate?",
    keywords: ["city", "cities", "location", "where"],
    answer: "We actively serve students and families across the region — reach out and we'll confirm whether we cover your area."
  },
  {
    question: "How do I book a free counseling session?",
    keywords: ["book", "counseling", "counselling", "session", "appointment", "schedule", "free"],
    answer:
      'Click "Book Free Counseling" at the top of the page or in the hero section, fill in your details, and our team will reach out to schedule your session.'
  },
  {
    question: "How does the admissions consulting process work?",
    keywords: ["process", "admission", "admissions", "how does", "steps", "roadmap"],
    answer: `Our process has four stages: ${ROADMAP_STEPS.map((s) => `${s.subtitle} (${s.title})`).join(
      ", "
    )}. See the Mentorship Process section for details.`
  },
  {
    question: "How can I contact the team directly?",
    keywords: ["contact", "phone", "email", "call", "reach", "whatsapp"],
    answer:
      "You can call us at +91 98990 78020, email krishnamentoring@gmail.com, use the WhatsApp button, or fill out the contact form at the bottom of the page."
  },
  {
    question: "Do you help with GDPI and interview preparation?",
    keywords: ["gdpi", "interview", "group discussion", "personal interview"],
    answer:
      "Yes — our Group Discussion and Interview Preparation certificate course covers business knowledge, current affairs strategy, mock group discussions with video review, and simulated personal interviews under real pressure conditions."
  },
  {
    question: "What degree programs can you help me get admission into?",
    keywords: ["degree", "college", "admission", "university"],
    answer: `We guide students into degree programs across categories including ${COURSE_CATEGORIES.slice(
      0,
      6
    )
      .map((c) => c.title)
      .join(", ")}, and more. Visit the Courses page to browse the full list by category.`,
    link: { path: "/courses", label: "Browse the Courses page" }
  },
  {
    question: "Do you offer short-term certificate courses?",
    keywords: ["certificate", "short term", "certification", "skill course"],
    answer: `Yes — we run a range of short-term certificate and placement-oriented courses, including ${CERTIFICATE_GROUPS[0]?.items
      .slice(0, 3)
      .join(", ")}, and more. See the Certificates page for the complete list.`,
    link: { path: "/certificates", label: "See the Certificates page" }
  },
  {
    question: "Do you charge for the first counseling session?",
    keywords: ["fee", "fees", "cost", "price", "pricing", "charge", "charges", "how much"],
    answer:
      "The first counseling session is free — it's how we understand your goals and recommend the right path. Program-specific fees vary by course and are discussed directly with our advisors during that session, since they depend on the university, specialization, and mode of study you choose."
  },
  {
    question: "What are your office hours or timings?",
    keywords: ["timing", "timings", "hours", "open", "closed", "working hours"],
    answer:
      "For the most accurate current hours, please call us at +91 98990 78020 or message us on WhatsApp — our team will confirm availability and, if needed, arrange a time that works for you outside standard hours."
  },
  {
    question: "Are you an advisory service or do you guarantee admission/placement?",
    keywords: ["guarantee", "guaranteed", "sure shot", "100%", "assurance", "assured"],
    answer:
      "Krishna Mentor is an advisory and consultancy unit — we guide, train, and coordinate throughout your admissions or placement process, but final outcomes depend on your own profile, exams, and the institution's criteria. We don't guarantee admission or placement outcomes. See our Disclaimer page for full details."
  },
  {
    question: "What is your refund or cancellation policy?",
    keywords: ["refund", "cancellation", "cancel", "money back"],
    answer:
      "Refund and cancellation terms depend on the specific program or course you've enrolled in. Please contact our team directly at +91 98990 78020 or krishnamentoring@gmail.com for the exact terms that apply to your enrollment."
  }
];

// ---- 2. Auto-generated: one FAQ entry per degree course category ----
const COURSE_CATEGORY_FAQ: FAQItem[] = COURSE_CATEGORIES.map((cat) => ({
  question: `Do you offer ${cat.title} programs?`,
  keywords: [cat.title.toLowerCase(), cat.slug, ...cat.items.slice(0, 2).map((i) => i.toLowerCase())],
  answer: `Yes — under ${cat.title}, we guide students into specialisations such as ${cat.items
    .slice(0, 5)
    .join(", ")}${cat.items.length > 5 ? ", and more" : ""}. ${cat.blurb} Visit the Courses page for the full list.`,
  link: { path: "/courses", label: `See ${cat.title} programs` }
}));

// ---- 3. Auto-generated: one FAQ entry per certificate group ----
const CERTIFICATE_FAQ: FAQItem[] = CERTIFICATE_GROUPS.map((grp) => ({
  question: grp.title,
  keywords: [grp.title.toLowerCase(), ...grp.items.map((i) => i.toLowerCase())],
  answer: `${grp.blurb} This includes: ${grp.items.join(", ")}.`,
  link: { path: "/certificates", label: `See ${grp.title}` }
}));

// ---- 4. Auto-generated: one FAQ entry per Services/Programs card ----
const PROGRAM_FAQ: FAQItem[] = PROGRAMS_DATA.map((p) => ({
  question: p.title,
  keywords: [p.title.toLowerCase(), ...(p.tag ? [p.tag.toLowerCase()] : [])],
  answer: p.longDescription || p.description
}));

// ---- 5. Auto-generated: one FAQ entry per blog post (teaser + pointer) ----
const BLOG_FAQ: FAQItem[] = BLOG_POSTS.map((post) => ({
  question: post.title,
  keywords: [post.title.toLowerCase(), post.category.toLowerCase()],
  answer: `${post.excerpt} Read the full article on our Blog page: "${post.title}".`,
  link: { path: `/blog/${post.slug}`, label: "Read the full article" }
}));

/**
 * The combined knowledge base the chatbot searches. Order matters only in
 * that FAQ items appearing earlier are used as the default "quick prompt"
 * suggestions shown under the chat window — keep the most broadly useful
 * questions in GENERAL_FAQ's first few entries.
 */
export const CHATBOT_KNOWLEDGE_BASE: FAQItem[] = [
  ...GENERAL_FAQ,
  ...PROGRAM_FAQ,
  ...COURSE_CATEGORY_FAQ,
  ...CERTIFICATE_FAQ,
  ...BLOG_FAQ
];

/**
 * Flat list of every individual degree program / certificate item name,
 * used for exact "do you have BBA Data Science & AI" style lookups that
 * are more specific than the category-level FAQ above.
 */
export interface SpecificItem {
  name: string;
  categoryTitle: string;
  kind: "degree" | "certificate";
}

export const ALL_SPECIFIC_ITEMS: SpecificItem[] = [
  ...COURSE_CATEGORIES.flatMap((cat) =>
    cat.items.map((item) => ({ name: item, categoryTitle: cat.title, kind: "degree" as const }))
  ),
  ...CERTIFICATE_GROUPS.flatMap((grp) =>
    grp.items.map((item) => ({ name: item, categoryTitle: grp.title, kind: "certificate" as const }))
  )
];