import { APPS_SCRIPT_URL, isEmailConfigured } from "../config/email";

export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  program?: string;
  message?: string;
}

export class EmailNotConfiguredError extends Error {
  constructor() {
    super("The Apps Script backend isn't configured yet — see src/config/email.ts.");
    this.name = "EmailNotConfiguredError";
  }
}

/**
 * Sends a lead to the business Gmail inbox via a Google Apps Script web
 * app (see apps-script/Code.gs), then fires a best-effort auto-reply to
 * the visitor from the same script.
 *
 * This never falls back to mailto: — it either sends silently in the
 * background, or throws so the caller can show an inline error. The
 * visitor's mail app is never opened. No third-party email service is
 * used; everything runs through your own Gmail account.
 */
export async function sendLeadEmail(lead: LeadPayload, subjectLine: string): Promise<void> {
  if (!isEmailConfigured) {
    throw new EmailNotConfiguredError();
  }

  // Content-Type is deliberately text/plain (not application/json): Apps
  // Script web apps don't respond to CORS preflight (OPTIONS) requests,
  // so keeping this a "simple request" avoids the browser ever sending
  // one. The script still parses the body as JSON on its side.
  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || "Not provided",
      address: lead.address || "Not provided",
      program: lead.program || "General enquiry",
      message: lead.message || "(none)",
      subjectLine
    })
  });

  if (!response.ok) {
    throw new Error(`Apps Script request failed with status ${response.status}`);
  }

  const data = await response.json().catch(() => null);
  if (!data || data.ok !== true) {
    throw new Error((data && data.error) || "Apps Script did not confirm the email was sent.");
  }
}
