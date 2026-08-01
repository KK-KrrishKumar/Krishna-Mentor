export interface CertificateGroup {
  slug: string;
  title: string;
  blurb: string;
  items: string[];
}

// Short-term certificate & placement-oriented skill courses run directly by Krishna Mentor.
// Sourced from Short_term_Certificates_by_Vinod_1.xlsx.
export const CERTIFICATE_GROUPS: CertificateGroup[] = [
  {
    slug: "placement-oriented-courses",
    title: "Short-Term Placement-Oriented Courses",
    blurb: "Practical, interview-ready courses designed to get students placement and admission ready.",
    items: [
      "English Speaking Course: Basic and Advanced",
      "Group Discussion and Interview Preparation for Admissions",
      "Sales and Marketing Management",
      "Basics of Digital Marketing Management",
      "Case Study Management"
    ]
  }
];

export const TOTAL_CERTIFICATE_COUNT = CERTIFICATE_GROUPS.reduce((sum, g) => sum + g.items.length, 0);