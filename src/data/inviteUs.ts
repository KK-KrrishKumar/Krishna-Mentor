export interface SeminarTopic {
  id: number;
  title: string;
  blurb: string;
}

// 11 seminar topics, sourced from the "Seminar Topics" sheet of
// Short_term_Certificates_by_Vinod_1.xlsx. Each brief was written to give a
// college/institute coordinator a one-line sense of what the session covers
// when deciding what to invite Krishna Mentor for.
export const SEMINAR_TOPICS: SeminarTopic[] = [
  { id: 1, title: "Time Management", blurb: "Practical frameworks for prioritising, planning, and getting more done without burning out." },
  { id: 2, title: "Stress Management", blurb: "Recognising pressure early and building coping strategies that hold up under real deadlines." },
  { id: 3, title: "Influencer Marketing", blurb: "How brands partner with creators to build trust, reach, and conversions in a crowded feed." },
  { id: 4, title: "Digital Leadership", blurb: "Leading teams and decisions in a digital-first, fast-changing business environment." },
  { id: 5, title: "Road to B School", blurb: "What it actually takes to get into a top B-school — profile, prep, and process, demystified." },
  { id: 6, title: "Expectations of Hiring Managers", blurb: "What recruiters really screen for beyond the resume, and how to meet that bar." },
  { id: 7, title: "From Classroom to Boardroom", blurb: "Bridging the gap between academic learning and what the corporate world expects on day one." },
  { id: 8, title: "Gen Z Impact: Entrepreneurs for Change", blurb: "How the newest generation of founders is reshaping business with purpose and speed." },
  { id: 9, title: "Group Discussion and Interview Skills", blurb: "Structured techniques to perform confidently in GDs and personal interviews." },
  { id: 10, title: "Career Counselling", blurb: "One-on-one guidance to help students map career choices to their strengths and goals." },
  { id: 11, title: "Customized Topic as per Organizational Requirement", blurb: "A tailored session built around your institute's specific requirement from the management domain." }
];

export interface FacultyProfile {
  name: string;
  title: string;
  qualifications: string;
  experience: string;
  bio: string;
  highlights: string[];
  institutionsTaught: string[];
}

// Summarised from Dr. Vinod Kumar's profile & pedagogy document — key,
// verifiable highlights only, written for a college/institute coordinator
// deciding whether to invite him as visiting faculty.
export const FACULTY_PROFILE: FacultyProfile = {
  name: "Dr. Vinod Kumar",
  title: "Senior Marketing Faculty, Trainer & Marketing Consultant",
  qualifications: "PhD, M.Phil, MBA, M.Com, PGDBM, MMC, PGDA&PR, UGC-NET qualified; case study training from IIT",
  experience: "22+ years in academia, including 5+ years of corporate experience in the PR/event management industry",
  bio:
    "A UGC-NET-qualified marketing academic with over two decades of teaching experience, backed by hands-on corporate exposure managing large-scale events and campaigns for national and international brands. Known for a research-driven, case-heavy teaching style that consistently earns strong student feedback.",
  highlights: [
    "22+ years of total experience, including 5+ years of corporate experience in event management",
    "463+ YouTube teaching videos with 2.5 lakh+ views, used to reinforce classroom concepts",
    "A personal library of 16,000+ curated case studies, ads, and video clips used to teach with live, current examples",
    "9 research papers published and presented at national & international conferences",
    "3 Best Faculty awards, with a consistent student feedback score above 8/10",
    "5+ years of corporate project experience with brands including Colgate, Siemens, Tata Steel, JCB, Godrej, Yamaha, Mercedes-Benz, and Nissan",
    "200+ projects executed with service excellence across product launches, roadshows, and exhibitions",
    "Visiting faculty experience across leading institutes"
  ],
  institutionsTaught: [
    "BML Munjal University",
    "SOIL",
    "ICFAI Business School",
    "IIPM",
    "IILM",
    "IBMR Business School"
  ]
};

// Sourced from the "Short term courses" (Visiting Faculty Subjects) sheet of
// Short_term_Certificates_by_Vinod_1.xlsx.
export const VISITING_FACULTY_SUBJECTS = [
  "Marketing Management",
  "Advanced Marketing Management",
  "Sales and Distribution Management",
  "Service Marketing",
  "Business Strategy",
  "B2B Marketing",
  "Marketing of Products and Services",
  "Brand Management",
  "Relationship Marketing",
  "Advertising and Sales Promotion",
  "Integrated Marketing Communication",
  "Entrepreneurship and Small Business Management",
  "Business Organisation and Principles of Management",
  "Event Management",
  "Sports Marketing Management",
  "E-Commerce Marketing Management",
  "Retail Marketing Management",
  "Developing Case Study Skills",
  "Pricing Strategies in the Corporate Sector",
  "Marketing at the Bottom of the Pyramid",
  "Media Planning and Buying"
];