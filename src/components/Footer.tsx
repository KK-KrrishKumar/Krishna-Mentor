import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle, Loader2, Instagram, Linkedin, Youtube } from "lucide-react";
import { useGoToSection } from "../hooks/useGoToSection";
import { sendLeadEmail, EmailNotConfiguredError } from "../lib/email";
import { trackEvent } from "../lib/analytics";
import { BUSINESS_EMAIL } from "../config/email";
// Confirmed business location: https://maps.app.goo.gl/cTgW7tMQE8NcWbpU7
const BUSINESS_ADDRESS =
  "Old Railway Road, Near Sohna Chowk, Sector 8, Gurugram, Haryana 122001, India";
// Verified Google Maps embed URL for this exact pin (place ID confirmed),
// rather than a text-search query built from the address string.
const BUSINESS_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d219.22930909768343!2d77.02577840748833!3d28.45939438195704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19c9c8324fad%3A0xb1e2261448b0e217!2sKRISHNA%20MENTOR!5e0!3m2!1sen!2sin!4v1785556724730!5m2!1sen!2sin";

export default function Footer() {
  const goToSection = useGoToSection();
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [website, setWebsite] = useState(""); // honeypot — real visitors never see or fill this field
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Sends via EmailJS (no visitor mail app pop-up, no server to host) — see
  // src/config/email.ts for the one-time setup.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot: bots fill every field including hidden ones. A real visitor
    // never sees this field, so anything here means it's spam — pretend it
    // worked and quietly drop it instead of hitting the email API or tipping
    // the bot off that it was caught.
    if (website.trim() !== "") {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      await sendLeadEmail(
        { name: formData.name, email: formData.email, message: formData.message },
        `Website Inquiry from ${formData.name}`
      );
      setStatus("sent");
      trackEvent("generate_lead", { form: "footer_contact" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof EmailNotConfiguredError
          ? "Online messaging isn't fully switched on yet — please call or WhatsApp us instead."
          : `Couldn't send that — please call us, or copy ${BUSINESS_EMAIL} above.`
      );
    }
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-gradient-to-b from-heritage-burgundy to-heritage-maroon border-t border-antique-gold/20 overflow-hidden scroll-mt-28"
    >
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-heritage-maroon/5 rounded-full blur-3xl pointer-events-none animate-drift-slow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start pb-12 border-b border-cream/15">
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <h3
                className="font-serif text-3xl font-bold tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold drop-shadow-sm"
              >
                Krishna Mentor
              </h3>
              <span className="block w-14 h-[3px] mt-2 rounded-full bg-gradient-to-r from-antique-gold to-sunlight-gold" />
            </div>
            <p className="font-sans text-sm text-cream/75 max-w-sm leading-relaxed">
              We navigate elite families and outstanding students across the region to secure prestigious academic placements and unshakeable personal development.
            </p>

            <div className="space-y-3.5 font-sans text-sm text-cream/75">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-antique-gold shrink-0 mt-0.5" />
                <p className="leading-relaxed">{BUSINESS_ADDRESS}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-antique-gold shrink-0" />
                <a
                  href="tel:+919899078020"
                  onClick={() => trackEvent("click_call", { source: "footer" })}
                  className="hover:text-sunlight-gold transition-colors"
                >
                  +91 98990 78020
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-antique-gold shrink-0" />
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(BUSINESS_EMAIL)}
                  className="hover:text-sunlight-gold transition-colors bg-transparent border-0 p-0 cursor-pointer text-left"
                  title="Click to copy"
                >
                  {BUSINESS_EMAIL}
                </button>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/krishna.mentor/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Krishna Mentor on Instagram"
                className="relative w-9 h-9 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center text-cream/75 hover:text-cosmic-midnight hover:bg-gradient-to-br hover:from-antique-gold hover:to-sunlight-gold hover:border-antique-gold transition-all duration-300 after:content-[''] after:absolute after:-inset-1.5"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/krishnamentor/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Krishna Mentor on LinkedIn"
                className="relative w-9 h-9 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center text-cream/75 hover:text-cosmic-midnight hover:bg-gradient-to-br hover:from-antique-gold hover:to-sunlight-gold hover:border-antique-gold transition-all duration-300 after:content-[''] after:absolute after:-inset-1.5"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@Krishna-Mentoring"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Krishna Mentor on YouTube"
                className="relative w-9 h-9 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center text-cream/75 hover:text-cosmic-midnight hover:bg-gradient-to-br hover:from-antique-gold hover:to-sunlight-gold hover:border-antique-gold transition-all duration-300 after:content-[''] after:absolute after:-inset-1.5"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-peach-soft">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <button type="button" onClick={() => goToSection("about")} className="text-left text-sm text-cream/65 hover:text-sunlight-gold transition-colors bg-transparent border-0 cursor-pointer p-0">About Us</button>
              <Link to="/courses" className="text-sm text-cream/65 hover:text-sunlight-gold transition-colors">Degree Programs</Link>
              <Link to="/certificates" className="text-sm text-cream/65 hover:text-sunlight-gold transition-colors">Certificate Courses</Link>
              <Link to="/tuition" className="text-sm text-cream/65 hover:text-sunlight-gold transition-colors">School Tuition (XI–XII)</Link>
              <Link to="/invite-us" className="text-sm text-cream/65 hover:text-sunlight-gold transition-colors">Invite Us (Faculty / Seminar)</Link>
              <button type="button" onClick={() => goToSection("services")} className="text-left text-sm text-cream/65 hover:text-sunlight-gold transition-colors bg-transparent border-0 cursor-pointer p-0">Mentorship Programs</button>
              <button type="button" onClick={() => goToSection("process")} className="text-left text-sm text-cream/65 hover:text-sunlight-gold transition-colors bg-transparent border-0 cursor-pointer p-0">Our Process</button>
              <button type="button" onClick={() => goToSection("testimonials")} className="text-left text-sm text-cream/65 hover:text-sunlight-gold transition-colors bg-transparent border-0 cursor-pointer p-0">Testimonials</button>
              <button type="button" onClick={() => goToSection("faq")} className="text-left text-sm text-cream/65 hover:text-sunlight-gold transition-colors bg-transparent border-0 cursor-pointer p-0">FAQs</button>
              <Link to="/blog" className="text-sm text-cream/65 hover:text-sunlight-gold transition-colors">Blog</Link>
            </div>
          </div>

          {/* Column 3: Get In Touch — form on the left, map on the right */}
          <div className="md:col-span-6 space-y-4">
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-peach-soft">Get In Touch</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Honeypot field — hidden from real visitors via CSS, but bots that
                    fill every field in the DOM will trip it. aria-hidden + tabIndex=-1
                    + autoComplete="off" keep it out of the way for screen readers,
                    keyboard nav, and browser autofill. */}
                <div className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
                  <label htmlFor="footer-website">Leave this field empty</label>
                  <input
                    id="footer-website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full bg-cream/10 border border-cream/20 focus:border-antique-gold text-cream text-sm placeholder-cream/40 rounded-lg px-4 py-2.5 outline-none transition-all"
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full bg-cream/10 border border-cream/20 focus:border-antique-gold text-cream text-sm placeholder-cream/40 rounded-lg px-4 py-2.5 outline-none transition-all"
                />
                <textarea
                  required
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="w-full bg-cream/10 border border-cream/20 focus:border-antique-gold text-cream text-sm placeholder-cream/40 rounded-lg px-4 py-2.5 outline-none resize-none h-24 transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-sans font-semibold text-sm bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold text-cosmic-midnight hover:shadow-[0_0_15px_rgba(249,223,141,0.5)] transition-all disabled:opacity-70 disabled:cursor-wait"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                {status === "sent" && (
                  <div className="flex items-center gap-2 text-emerald-400 text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    Message sent — we'll get back to you shortly.
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-300 text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    {errorMessage}
                  </div>
                )}
              </form>

              {/* Google Map — verified business location */}
              <div className="rounded-xl overflow-hidden border border-cream/15 min-h-[220px] lg:min-h-0">
                <iframe
                  title="Krishna Mentor location on Google Maps"
                  src={BUSINESS_MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 220 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[20%] contrast-[1.05]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-cream/50">
          <p>© {currentYear} Krishna Mentor Academy. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/promote" className="hover:text-sunlight-gold transition-colors">Promo QR Code</Link>
            <span className="text-antique-gold">•</span>
            <Link to="/disclaimer" className="hover:text-sunlight-gold transition-colors">Disclaimer</Link>
            <span className="text-antique-gold">•</span>
            <Link to="/privacy-policy" className="hover:text-sunlight-gold transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
