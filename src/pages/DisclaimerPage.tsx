import React from "react";
import { ShieldAlert } from "lucide-react";
import Seo from "../components/Seo";

/**
 * Legal disclaimer describing the advisory-only nature of Krishna Mentor's
 * services. Linked from the footer on every page so it's reachable site-wide.
 * Edit the text inside <p> tags below if the wording ever needs updating —
 * it's plain text, no special formatting required.
 */
export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 px-6">
      <Seo
        title="Disclaimer | Krishna Mentor"
        description="Krishna Mentor's role as an advisory and consultancy unit, and the limits of our responsibility for legal, financial, and transactional outcomes."
        path="/disclaimer"
      />

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-heritage-maroon/10 border border-heritage-maroon/20 flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-6 h-6 text-heritage-burgundy" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-heritage-burgundy">Disclaimer</h1>
        </div>

        <div className="w-16 h-1 bg-gradient-to-r from-antique-gold to-sunlight-gold rounded-full mb-8" />

        <div className="space-y-6 font-sans text-ink/80 text-sm md:text-base leading-relaxed bg-white/40 border border-heritage-maroon/10 rounded-2xl p-6 md:p-10">
          <p>
            Krishna Mentor is strictly an advisory and consultancy unit. Our role is to assist
            clients in evaluating, preparing for, and structuring decisions based on available
            information, training modules, and market understanding. We do not act as legal
            representatives, financial custodians, or guarantors of any transaction, academic
            admission, or job placement.
          </p>

          <p>
            All legal, financial, title-related, property-related, structural, institution-related,
            or university-related verifications must be independently confirmed by the client through
            qualified professionals (such as lawyers, technical inspectors, financial advisors, or
            authorized officials of the respective institutions/government bodies). Where applicable
            by law, real estate facilitation is subject to relevant state regulatory guidelines.
          </p>

          <p>
            All payments for any commercial transaction (including university fees, property purchase
            amounts, rental deposits, or lease payments) must be made directly between the contracting
            parties (buyer and seller, or landlord and tenant) through proper banking channels. Krishna
            Mentor does not handle, collect, or hold client funds intended for third-party transactions.
          </p>

          <p>
            Final decision-making responsibility rests solely with the client, based on their
            independent satisfaction, verification, and due diligence. While we remain available to
            support, guide, train, and coordinate throughout the process in an advisory capacity,
            Krishna Mentor is not responsible or legally liable for any conflicts, disputes, monetary
            losses, or structural/academic outcomes that arise post-transaction, post-sale, or
            post-enrollment between the parties on any matter.
          </p>
        </div>
      </div>
    </div>
  );
}
