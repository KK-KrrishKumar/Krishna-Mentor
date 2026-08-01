import React, { useState, useEffect, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Calendar,
  Send,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  User,
  Mail,
  Phone,
  GraduationCap,
  MessageSquare,
  MapPin,
  ShieldCheck,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { sendLeadEmail, EmailNotConfiguredError } from "../lib/email";
import { trackEvent } from "../lib/analytics";

interface CounselingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProgramName?: string;
}

/** Small reusable field shell: icon + label + input, consistent focus glow across the form. */
function Field({
  label,
  required,
  icon: Icon,
  children
}: {
  label: string;
  required?: boolean;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 text-[11px] uppercase font-mono font-semibold tracking-wider text-heritage-maroon/80"
      >
        <Icon className="w-3 h-3 text-antique-gold" />
        {label}
        {required && <span className="text-heritage-crimson">*</span>}
      </label>
      {/* Each child input/select/textarea receives the generated id via cloneElement in the field usage below */}
      {React.isValidElement(children) ? React.cloneElement(children as React.ReactElement<any>, { id }) : children}
    </div>
  );
}

export default function CounselingModal({
  isOpen,
  onClose,
  selectedProgramName = "Premium Academic Mentorship"
}: CounselingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    program: selectedProgramName,
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot — real visitors never see or fill this field

  useEffect(() => {
    if (selectedProgramName) {
      setFormData((prev) => ({ ...prev, program: selectedProgramName }));
    }
  }, [selectedProgramName]);

  // Reset back to a clean form each time the modal is freshly opened.
  useEffect(() => {
    if (isOpen) setStatus("idle");
  }, [isOpen]);

  // Sends the lead straight to the admissions inbox (and an auto-reply to the
  // visitor) via EmailJS — no mail app pop-up, no server to host. See
  // src/config/email.ts for the one-time setup.
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot: a filled hidden field means a bot submitted this, not a
    // person. Pretend it succeeded and quietly drop it.
    if (company.trim() !== "") {
      setStatus("success");
      return;
    }
    setStatus("sending");
    try {
      await sendLeadEmail(
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          program: formData.program,
          message: formData.message
        },
        `Free Counseling Request — ${formData.program}`
      );
      setStatus("success");
      trackEvent("generate_lead", { form: "counseling_modal", program: formData.program });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof EmailNotConfiguredError
          ? "Online booking isn't fully switched on yet — please call or WhatsApp us instead, and we'll finish setup shortly."
          : "Something went wrong sending that. Please try again, or reach us directly on WhatsApp or by phone."
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-heritage-burgundy/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl h-[92vh] md:h-auto md:max-h-[88vh] bg-cream border border-antique-gold/25 rounded-3xl shadow-[0_30px_80px_rgba(74,14,20,0.45)] flex flex-col overflow-hidden z-10"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-antique-gold/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative px-6 sm:px-8 py-5 border-b border-heritage-maroon/10 flex justify-between items-center bg-gradient-to-r from-heritage-burgundy via-heritage-maroon to-heritage-burgundy shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-antique-gold to-sunlight-gold flex items-center justify-center shadow-lg">
                  <Calendar className="w-5 h-5 text-heritage-burgundy" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-cream leading-tight">Book Free Academic Counseling</h3>
                  <p className="text-[10px] uppercase font-mono font-semibold tracking-widest text-sunlight-gold/90 mt-1">
                    1-on-1 strategy call with elite advisors
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-cream/70 hover:text-cream hover:bg-white/10 p-2 rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-grow px-6 sm:px-8 py-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-10 space-y-5"
                  >
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.05 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-antique-gold to-sunlight-gold flex items-center justify-center mx-auto shadow-[0_10px_30px_rgba(176,124,44,0.35)]"
                    >
                      <CheckCircle2 className="w-8 h-8 text-heritage-burgundy" />
                    </motion.div>
                    <div>
                      <h4 className="font-serif text-2xl font-bold text-heritage-burgundy">Request Sent!</h4>
                      <p className="font-sans text-sm text-ink/70 max-w-md mx-auto leading-relaxed mt-2">
                        Your details have reached our admissions desk, and a confirmation is on its way
                        to your inbox. We'll call or WhatsApp you shortly.
                      </p>
                    </div>
                    <div className="pt-2 flex items-center justify-center gap-3">
                      <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-full font-sans font-bold text-sm bg-gradient-to-r from-antique-gold to-sunlight-gold text-heritage-burgundy hover:shadow-[0_0_15px_rgba(249,223,141,0.5)] transition-all"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    {/* Honeypot field — hidden from real visitors via CSS, but bots that
                        fill every field in the DOM will trip it. */}
                    <div className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
                      <label htmlFor="counseling-company">Leave this field empty</label>
                      <input
                        id="counseling-company"
                        type="text"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                    <div className="relative overflow-hidden bg-gradient-to-br from-peach/40 to-antique-gold/10 border border-antique-gold/25 rounded-2xl p-4 flex gap-3 items-start text-sm text-ink/75 leading-relaxed">
                      <div className="w-9 h-9 shrink-0 rounded-full bg-white/70 border border-antique-gold/30 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-antique-gold" />
                      </div>
                      <p className="pt-1.5">
                        Ensure your child secures admissions in elite campuses. Leave your contacts, and receive a
                        complete strategy from our team.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                      <Field label="Full Name" required icon={User}>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Arjun Sharma"
                          className="w-full bg-white border border-heritage-maroon/15 focus:border-antique-gold focus:ring-4 focus:ring-antique-gold/15 outline-none rounded-xl px-4 py-2.5 text-ink text-sm shadow-sm transition-all"
                        />
                      </Field>

                      <Field label="Email Address" required icon={Mail}>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. arjun@gmail.com"
                          className="w-full bg-white border border-heritage-maroon/15 focus:border-antique-gold focus:ring-4 focus:ring-antique-gold/15 outline-none rounded-xl px-4 py-2.5 text-ink text-sm shadow-sm transition-all"
                        />
                      </Field>

                      <Field label="WhatsApp/Phone" required icon={Phone}>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-white border border-heritage-maroon/15 focus:border-antique-gold focus:ring-4 focus:ring-antique-gold/15 outline-none rounded-xl px-4 py-2.5 text-ink text-sm shadow-sm transition-all"
                        />
                      </Field>

                      <div className="md:col-span-2">
                        <Field label="Address" icon={MapPin}>
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="e.g. Sector 45, City, State"
                            className="w-full bg-white border border-heritage-maroon/15 focus:border-antique-gold focus:ring-4 focus:ring-antique-gold/15 outline-none rounded-xl px-4 py-2.5 text-ink text-sm shadow-sm transition-all"
                          />
                        </Field>
                      </div>

                      <Field label="Program / Course of Interest" icon={GraduationCap}>
                        <input
                          type="text"
                          value={formData.program}
                          onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                          placeholder="e.g. Premium College Admissions"
                          className="w-full bg-white border border-heritage-maroon/15 focus:border-antique-gold focus:ring-4 focus:ring-antique-gold/15 outline-none rounded-xl px-4 py-2.5 text-ink text-sm shadow-sm transition-all"
                        />
                      </Field>

                      <div className="md:col-span-2">
                        <Field label="Specific Goals / Background Queries" icon={MessageSquare}>
                          <textarea
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="State current academic status, career aspirations, or target universities..."
                            className="w-full bg-white border border-heritage-maroon/15 focus:border-antique-gold focus:ring-4 focus:ring-antique-gold/15 outline-none rounded-xl px-4 py-2.5 text-ink text-sm shadow-sm transition-all resize-none"
                          />
                        </Field>
                      </div>
                    </div>

                    {status === "error" && (
                      <div className="flex items-start gap-2 bg-heritage-crimson/10 border border-heritage-crimson/25 rounded-xl p-3 text-xs text-heritage-crimson">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <p className="flex flex-col gap-1 text-[11px] text-ink/45 font-sans">
                        <span className="inline-flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-antique-gold/80" />
                          Your details go straight to our admissions desk — never shared or sold.
                        </span>
                        <span>
                          By submitting, you acknowledge our{" "}
                          <Link to="/disclaimer" className="underline hover:text-heritage-burgundy">
                            Disclaimer
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy-policy" className="underline hover:text-heritage-burgundy">
                            Privacy Policy
                          </Link>
                          .
                        </span>
                      </p>
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={onClose}
                          className="px-5 py-2.5 rounded-full text-xs font-bold border border-heritage-maroon/20 text-heritage-burgundy hover:bg-peach/30 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold text-heritage-burgundy hover:shadow-[0_0_18px_rgba(249,223,141,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait disabled:hover:translate-y-0"
                        >
                          {status === "sending" ? (
                            <>
                              Sending…
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            </>
                          ) : (
                            <>
                              Secure Free Counseling Slot
                              <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}