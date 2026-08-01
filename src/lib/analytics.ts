/**
 * Thin wrapper around Google Analytics 4's gtag() for tracking the handful of
 * actions that actually indicate a lead: opening the booking modal, sending a
 * WhatsApp inquiry, tapping call/directions, submitting a form, and falling
 * back to a human via the chatbot. Without this, there's no way to tell which
 * pages or CTAs are actually producing inquiries.
 *
 * Setup: add your real GA4 Measurement ID in index.html (see the comment
 * there) — until that's done, gtag won't exist on window and every call here
 * safely no-ops instead of throwing.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | "open_counseling_modal"
  | "generate_lead"
  | "contact_whatsapp"
  | "click_directions"
  | "click_call"
  | "chatbot_fallback_contact"
  | "chatbot_question_asked"
  | "chatbot_answer_link_click";

export function trackEvent(event: AnalyticsEvent, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}