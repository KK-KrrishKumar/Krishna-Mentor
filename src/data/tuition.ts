export interface TuitionSubject {
  slug: string;
  label: string;
  tag: string; // short badge shown on cards
  summary: string;
  topics: string[];
}

// School-level (CBSE Class XI & XII) tuition subjects taught one-on-one at
// our centre by Krishna Mentor's core faculty. Topic lists are
// illustrative highlights from the NCERT/CBSE framework, refreshed each
// session as the board syllabus is revised — not an exhaustive chapter list.
export const TUITION_SUBJECTS: TuitionSubject[] = [
  {
    slug: "business-studies",
    label: "Business Studies",
    tag: "CBSE XI \u2013 XII",
    summary:
      "Concept-first teaching built on the NCERT Business Studies curriculum for Class XI\u2013XII \u2014 from the foundations of business to the principles and functions of management, taught the way the board actually examines it.",
    topics: [
      "Business, Trade & Forms of Organisation",
      "Principles & Functions of Management",
      "Business Finance & Financial Markets",
      "Marketing Management & the Marketing Mix",
      "Consumer Protection & Business Ethics",
      "E-Business & Emerging Trends",
      "Case studies & board-pattern answer writing"
    ]
  },
  {
    slug: "economics",
    label: "Economics",
    tag: "CBSE XI \u2013 XII",
    summary:
      "Microeconomics, Macroeconomics, Statistics, and Indian Economic Development taught with real data, diagrams, and numericals \u2014 built around the NCERT textbooks and the CBSE marking scheme for Class XI\u2013XII.",
    topics: [
      "Microeconomics: Demand, Supply & Market Equilibrium",
      "National Income & Macroeconomic Aggregates",
      "Money, Banking & the Government Budget",
      "Balance of Payments & Foreign Exchange",
      "Indian Economic Development & Reforms",
      "Statistics for Economics",
      "Numerical problem-solving & diagram practice"
    ]
  }
];