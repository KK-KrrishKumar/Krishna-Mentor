export interface CourseCategory {
  slug: string;
  title: string;
  blurb: string;
  items: string[];
}

// Degree programs Krishna Mentor guides students into, grouped by qualification level.
// Sourced from Courses.xlsx and lightly edited for consistent formatting.
export const COURSE_CATEGORIES: CourseCategory[] = [
  {
    slug: "bba",
    title: "BBA",
    blurb: "Undergraduate business administration specialisations for students starting their management journey.",
    items: [
      "BBA BFSI and Fintech",
      "BBA Digital Transformation",
      "BBA Data Science & Artificial Intelligence",
      "BBA Entrepreneurship and Innovation",
      "BBA General Management",
      "BBA Hospitality & Services Management",
      "BBA Marketing for New Age Businesses",
      "BBA Sports Management",
      "BBA Accounting and Finance (with KPMG)",
      "BBA Artificial Intelligence",
      "BBA Aviation Management",
      "BBA Banking & Finance",
      "BBA Business Analytics (with HCL Tech)",
      "BBA General (Finance/HRM/Marketing)",
      "BBA International Business",
      "BBA Logistics Management",
      "BBA Management Technology (with HCL Tech)",
      "BBA Operations Management"
    ]
  },
  {
    slug: "mba",
    title: "MBA",
    blurb: "Postgraduate management specialisations for career acceleration and leadership roles.",
    items: [
      "MBA in Data Science & Artificial Intelligence",
      "MBA in Entrepreneurship & Innovation",
      "MBA in Finance",
      "MBA in General Management",
      "MBA in Healthcare & Hospital Management",
      "MBA in Human Resource Management",
      "MBA in Marketing Management",
      "MBA in Operations",
      "MBA in Real Estate Management",
      "MBA in Sports Management",
      "Masters of Business Administration (Dual Specialisation)",
      "MBA Accounting & Finance (with KPMG)",
      "MBA Artificial Intelligence (with HCL Tech)",
      "MBA Business Analytics (with HCL Tech)",
      "MBA General Management",
      "MBA Human Resource Management",
      "MBA Management Technology in Artificial Intelligence (with HCL Tech)",
      "MBA Management Technology in Business Analytics (with HCL Tech)",
      "MBA Management Technology in Cybersecurity (with HCL Tech)",
      "MBA Management Technology in Data Science (with HCL Tech)",
      "MBA Management Technology in Energy Management",
      "MBA Marketing Management",
      "MBA Operations, Logistics, and Supply Chain Management (with Blue Ocean)"
    ]
  },
  {
    slug: "pgdm",
    title: "PGDM",
    blurb: "Industry-oriented postgraduate diploma programs in management.",
    items: [
      "Post Graduate Diploma in Management — General",
      "PGDM in Data Analytics and Business Intelligence",
      "PGDM in Fintech"
    ]
  },
  {
    slug: "btech",
    title: "B.Tech",
    blurb: "Engineering degrees across computer science, electronics, and emerging technology specialisations.",
    items: [
      "B.Tech in CSE with AI-ML",
      "B.Tech in CSE with Cloud Computing",
      "B.Tech in CSE with Cyber Security and Digital Forensics",
      "B.Tech in CSE with Data Engineering",
      "B.Tech in CSE with Data Science",
      "B.Tech in CSE with Full Stack Development",
      "B.Tech in CSE with Immersive Technologies",
      "B.Tech in CSE with Robotic Intelligence",
      "B.Tech in CSE with Specialisation in Generative AI",
      "B.Tech in CSE with Artificial Intelligence & Machine Learning (with IBM)",
      "B.Tech in CSE with Data Science and Big Data Analytics",
      "B.Tech in CSE with Graphics and Gaming",
      "B.Tech in CSE with Specialisation in iOS Mobile Application with ML & AR (with SKLZ TECT LLP)",
      "B.Tech in CSE with Cloud Computing (with Microsoft)",
      "B.Tech in CSE with Cyber Security (with Microsoft)",
      "B.Tech in CSE with Specialisation in Full Stack Web Development (with L&T EduTech)",
      "B.Tech in Bioinformatics",
      "B.Tech in Biotechnology",
      "B.Tech in Civil & Sustainable Infrastructure Engineering",
      "B.Tech in Electrical & Computer Engineering",
      "B.Tech in Electronics & Communication Engineering",
      "B.Tech in Electronics & Communication Engineering (in collaboration with L&T)",
      "B.Tech in Electronics & Computer Engineering",
      "B.Tech in Food Technology",
      "B.Tech in Mechanical Engineering",
      "B.Tech in Robotics & Artificial Intelligence",
      "B.Tech in Semiconductor Technology"
    ]
  },
  {
    slug: "mtech",
    title: "M.Tech",
    blurb: "Advanced postgraduate engineering specialisations for research and technical leadership careers.",
    items: [
      "M.Tech in CSE with Specialisation in Generative AI",
      "M.Tech in CSE with Specialisation in Robotics & Machine Intelligence",
      "M.Tech in Bioinformatics",
      "M.Tech in Biotechnology",
      "M.Tech in Electronics & Communication Engineering",
      "M.Tech in Mechanical Engineering",
      "M.Tech in Semiconductor Technology"
    ]
  },
  {
    slug: "bca",
    title: "BCA",
    blurb: "Computer applications degrees for students aiming at software and web careers.",
    items: [
      "BCA (4 Years with Hons.) AI-ML",
      "BCA (4 Years with Hons.) Web Development",
      "BCA with Specialisation in Web Design & Development and iOS Fundamentals (with SKLZ TECT LLP)",
      "BCA 3 Years General"
    ]
  },
  {
    slug: "mca",
    title: "MCA",
    blurb: "Master of Computer Applications for advanced software development and IT careers.",
    items: ["MCA — Master of Computer Applications"]
  },
  {
    slug: "law",
    title: "Law",
    blurb: "Integrated and postgraduate law programs for a career in legal practice or corporate law.",
    items: ["BA LLB (Hons.)", "BBA LLB (Hons.)", "LLB", "LLM"]
  },
  {
    slug: "ba",
    title: "BA",
    blurb: "Liberal arts and humanities degrees across psychology, communication, and the social sciences.",
    items: [
      "BA (Hons.) Psychology",
      "BA in Corporate Communication",
      "Bachelors in Journalism & Mass Communication",
      "BA (Hons.) Liberal Arts",
      "BA (Hons.) Economics",
      "BA (Hons.) English",
      "BA (Hons.) History",
      "BA (Hons.) Political Science"
    ]
  },
  {
    slug: "bsc",
    title: "B.Sc",
    blurb: "Science degrees spanning psychology, forensic science, data, and sustainability.",
    items: [
      "BSc (Hons.) Psychology",
      "BSc Dietetics & Nutrition",
      "BSc in Animation and UI/UX",
      "BSc (Hons.) in Forensic Science",
      "BSc / B.Tech in Agriculture",
      "BSc Environmental Science & Sustainability",
      "BSc Industrial Chemistry",
      "BSc Mathematics with Data Science",
      "BSc Mathematics with Financial Analytics"
    ]
  },
  {
    slug: "ma",
    title: "MA",
    blurb: "Postgraduate arts degrees for counselling, communication, and public policy careers.",
    items: [
      "MA Guidance & Counselling",
      "MA Psychology",
      "Masters of Social Work (MSW)",
      "MA in Mass Communication",
      "MA Liberal Arts",
      "MA Public Policy"
    ]
  },
  {
    slug: "msc",
    title: "M.Sc",
    blurb: "Postgraduate science degrees in psychology, chemistry, and data mathematics.",
    items: ["MSc Psychology", "MSc Industrial Chemistry", "MSc Mathematics with Data Science"]
  },
  {
    slug: "design",
    title: "B.Design",
    blurb: "Design degrees for careers in digital product, fashion, and interior design.",
    items: ["B.Des in Digital Product Design", "B.Des in Fashion Design & Management", "B.Des in Interior Design"]
  }
];

export const TOTAL_COURSE_COUNT = COURSE_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);
