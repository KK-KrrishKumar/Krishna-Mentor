import { ServiceProgram, RoadmapStep, Testimonial, FAQItem, CredibilityStat } from "./types";

export const PROGRAMS_DATA: ServiceProgram[] = [
  {
    id: "premium-college-admissions",
    title: "Premium College Admissions",
    description: "Navigating top-tier college placements nationwide. Your dream campus awaits.",
    longDescription: "Our signature, high-touch consultation provides end-to-end strategy for admission in Ivy League, top global universities, and premium domestic institutions. From profile building to essay editing and strategic choices.",
    iconName: "account_balance",
    tag: "Divine Placements"
  },
  {
    id: "english-speaking-mastery",
    title: "English Speaking Mastery",
    description: "Overcome hesitation. Develop fluent, impactful communication skills designed for the modern academic and corporate world.",
    longDescription: "Unchain your verbal capability. We focus on articulation, reduction of linguistic hesitation, voice modulation, and advanced corporate presentation techniques, molding standard speakers into leaders.",
    iconName: "record_voice_over",
    tag: "Elite Articulation"
  },
  {
    id: "personality-development",
    title: "Personality Development",
    description: "Transform your presence. We build confidence, body language, and leadership skills that make you stand out in any room.",
    longDescription: "We combine psychological strategy with performance arts to mold your presence. Focuses on body language, professional etiquette, micro-expressions, aura enhancement, and modern personal branding.",
    iconName: "self_improvement",
    tag: "Commanding Aura"
  },
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    number: 1,
    title: "The Awakening",
    subtitle: "Assessment",
    description: "Deep-dive profile evaluation to understand your unique strengths and goals, unveiling hidden academic paths."
  },
  {
    number: 2,
    title: "The Strategy",
    subtitle: "Roadmap",
    description: "Crafting a personalized, high-precision blueprint for elite college selection or custom skill enhancement."
  },
  {
    number: 3,
    title: "The Transformation",
    subtitle: "Training",
    description: "Intensive training across GDPI, fluent communication, core charisma building, and deep academic preparedness."
  },
  {
    number: 4,
    title: "The Victory",
    subtitle: "Admission",
    description: "Securing your prestigious seat in a reputed institution, crowning your journey with divine success."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Aman Gupta",
    role: "Admitted, Premium College Admissions",
    quote: "Krishna Mentor gave my application the clarity and structure it needed. The advisors were direct, responsive, and genuinely invested in my outcome.",
    rating: 5
  },
  {
    id: "t2",
    name: "Harshita Chaudhary",
    role: "English Speaking Mastery Graduate",
    quote: "I walked in hesitant to speak up in meetings. A few months later, I was leading client presentations with confidence.",
    rating: 5
  },
  {
    id: "t3",
    name: "Rohan Verma",
    role: "GD & PI Certificate Course Alumnus",
    quote: "The mock interview sessions were tougher than the real thing — which is exactly why I was so calm on the actual day.",
    rating: 5
  },
  {
    id: "t4",
    name: "Ananya Malhotra",
    role: "Parent, Personality Development Program",
    quote: "We saw a visible shift in our daughter's confidence and body language within weeks. Worth every session.",
    rating: 5
  }
];

// Shown in the homepage CredibilityStrip. Pulled from real figures already
// published elsewhere on the site (see the mentor bio in Philosophy.tsx) so
// this strip never contradicts what's said elsewhere. If you'd rather show
// enrollment-style numbers (e.g. "500+ students mentored"), replace these
// with your actual counts — don't publish a number you can't back up.
export const CREDIBILITY_STATS: CredibilityStat[] = [
  { value: "22+", label: "Years of Experience", iconName: "calendar" },
  { value: "200+", label: "Corporate Projects Delivered", iconName: "award" },
  { value: "9", label: "Published Research Papers", iconName: "users" },
  { value: "3", label: "Best-Faculty Awards Won", iconName: "star" }
];

// Feeds the aggregateRating block in HomePage's structured data. Derived
// directly from TESTIMONIALS below rather than an invented figure — Google's
// review-snippet policy requires the count to reflect genuine reviews. Update
// this pairing only by adding real testimonials with real ratings above.
export const AGGREGATE_RATING = {
  ratingValue: (
    TESTIMONIALS.reduce((sum, t) => sum + (t.rating ?? 5), 0) / TESTIMONIALS.length
  ).toFixed(1),
  reviewCount: String(TESTIMONIALS.length)
};

export const FAQ_DATA: FAQItem[] = [
  {
    question: "What programs do you offer?",
    keywords: ["program", "programs", "services", "offer", "courses"],
    answer:
      "We offer Premium College Admissions counseling, English Speaking Mastery, and Personality Development mentorship, along with two dedicated tracks: full degree admission guidance (BBA, MBA, B.Tech, and more) and short-term, placement-oriented certificate courses including GD & PI preparation. You can see full details in the Services section above."
  },
  {
    question: "What makes Krishna Mentor different?",
    keywords: ["different", "unique", "why choose", "why krishna mentor"],
    answer:
      "We combine personalized, one-on-one attention with deep research into each student's profile, goals, and market realities — rather than one-size-fits-all packages. Every plan is built around the individual student, not a template."
  },
  {
    question: "How do I book a free counseling session?",
    keywords: ["book", "counseling", "counselling", "session", "appointment", "schedule", "free"],
    answer:
      "Click \"Book Free Counseling\" at the top of the page or in the hero section, fill in your details, and our team will reach out to schedule your session."
  },
  {
    question: "How does the admissions consulting process work?",
    keywords: ["process", "admission", "admissions", "how does", "steps", "roadmap"],
    answer:
      "Our process has four stages: Assessment (understanding your profile), Roadmap (a personalized strategy), Training (skill-building and preparation), and Admission (securing your seat). See the Mentorship Process section for details."
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
    question: "Who is Krishna Mentor's mentorship suited for?",
    keywords: ["who", "suited for", "students", "eligibility", "target audience"],
    answer:
      "Our mentorship is designed for school students exploring career paths, undergraduates seeking degree admissions, and working professionals looking to sharpen placement-ready skills — anyone navigating a major academic or career decision."
  },
  {
    question: "Do you offer short-term certificate courses?",
    keywords: ["certificate", "short term", "certification", "skill course"],
    answer:
      "Yes — we run short-term certificate courses in marketing, business strategy, and communication, plus placement-oriented courses like English speaking and group discussion & interview preparation. See the Certificates page for the complete list."
  },
  {
    question: "Do you charge for the first counseling session?",
    keywords: ["fee", "fees", "cost", "price", "pricing", "charge", "charges", "how much"],
    answer:
      "The first counseling session is free — it's how we understand your goals and recommend the right path. Program-specific fees vary by course and are discussed directly with our advisors during that session, since they depend on the university, specialization, and mode of study you choose."
  },
  {
    question: "What is Krishna Mentor's approach to mentorship?",
    keywords: ["approach", "philosophy", "mentorship style", "how we work"],
    answer:
      "We believe in transparent counsel, objective evaluation, and steady, hands-on guidance at every stage — from initial assessment through to final decision-making — so students and families always know exactly where they stand."
  },
  {
    question: "What is your refund or cancellation policy?",
    keywords: ["refund", "cancellation", "cancel", "money back"],
    answer:
      "Refund and cancellation terms depend on the specific program or course you've enrolled in. Please contact our team directly at +91 98990 78020 or krishnamentoring@gmail.com for the exact terms that apply to your enrollment."
  }
];