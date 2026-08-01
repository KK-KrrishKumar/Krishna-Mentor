import React from "react";
import { Lock } from "lucide-react";
import Seo from "../components/Seo";

/**
 * Privacy policy describing what data Krishna Mentor collects, how it's
 * used, and how financial data is handled. Linked from the footer on every
 * page, and referenced from the consent popup on first visit.
 */
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 px-6">
      <Seo
        title="Privacy Policy | Krishna Mentor"
        description="How Krishna Mentor collects, uses, and protects client personal, contact, academic, and property-related information."
        path="/privacy-policy"
      />

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-heritage-maroon/10 border border-heritage-maroon/20 flex items-center justify-center flex-shrink-0">
            <Lock className="w-6 h-6 text-heritage-burgundy" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-heritage-burgundy">Privacy Policy</h1>
        </div>

        <div className="w-16 h-1 bg-gradient-to-r from-antique-gold to-sunlight-gold rounded-full mb-8" />

        <div className="space-y-8 font-sans text-ink/80 text-sm md:text-base leading-relaxed bg-white/40 border border-heritage-maroon/10 rounded-2xl p-6 md:p-10">
          <div className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-heritage-burgundy">Data Collection &amp; Usage</h2>
            <p>
              Krishna Mentor collects essential personal, contact, academic, and property-related
              information provided by clients to effectively deliver our training, admission
              consultancy, and property advisory services. We use this data strictly to process
              course enrollments, share profiles with authorized university channel partners or
              potential employers, and coordinate property requirements between buyers, sellers,
              landlords, and tenants. We maintain a strict policy against selling or trading client
              data to external marketing agencies.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-heritage-burgundy">Financial Data &amp; Security</h2>
            <p>
              We do not collect, process, or store sensitive financial details such as credit card
              numbers or net banking credentials. All payments for our institutional services are
              managed securely through verified, RBI-authorized third-party payment gateways. Any
              transaction amounts related to external property deals or university fees must be
              processed directly between the transacting parties via banking channels. We implement
              industry-standard security safeguards to protect your information, and clients retain
              the right to update or request deletion of their records from our active operational
              databases at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
