export interface ServiceProgram {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  iconName: "account_balance" | "record_voice_over" | "self_improvement" | "groups" | "domain";
  tag?: string;
}

export interface RoadmapStep {
  number: number;
  title: string;
  subtitle: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface CounselingRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  message: string;
  date: string;
  status: "Pending" | "Scheduled" | "Completed";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  /** 1-5 star rating. Optional — only set this from a real rating a client actually gave.
   *  Defaults to 5 in Review structured data if omitted, since every testimonial currently
   *  shown is a positive one; replace with real per-review scores as you collect them. */
  rating?: number;
}

export interface FAQItem {
  question: string;
  keywords: string[];
  answer: string;
  /** Optional relevant page to link to below this answer (e.g. Courses, a specific blog post). */
  link?: { path: string; label: string };
}

/** A small "why trust us" number shown in the credibility strip on the homepage. */
export interface CredibilityStat {
  value: string;
  label: string;
  iconName: "users" | "award" | "star" | "calendar";
}