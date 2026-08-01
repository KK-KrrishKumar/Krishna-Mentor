import React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import Reveal from "./Reveal";
import { FAQ_DATA } from "../data";

/**
 * Renders the site FAQs as native <details>/<summary> so the content is
 * fully crawlable without JS, and pairs with FAQPage JSON-LD (added in
 * HomePage's Seo structured data) so AI answer engines and rich search
 * results can surface these questions directly.
 */
export default function FaqSection() {
  return (
    <section id="faq" className="relative py-24 scroll-mt-20 bg-parchment border-t border-heritage-maroon/10">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <Reveal className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-antique-gold/10 border border-antique-gold/20 rounded-full">
            <HelpCircle className="w-4 h-4 text-heritage-maroon" />
            <span className="font-mono text-xs font-bold text-heritage-maroon uppercase tracking-wider">FAQs</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-heritage-burgundy tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold mx-auto rounded-full" />
        </Reveal>

        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => (
            <Reveal key={faq.question} delayMs={idx * 40}>
              <details
                className="group bg-white border border-heritage-maroon/10 rounded-xl shadow-sm open:shadow-md transition-shadow"
              >
                <summary className="list-none cursor-pointer select-none flex items-center justify-between gap-4 px-6 py-4">
                  <h3 className="font-sans text-sm md:text-base font-semibold text-heritage-burgundy">
                    {faq.question}
                  </h3>
                  <ChevronDown className="w-4 h-4 text-antique-gold shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-5 pt-0">
                  <p className="text-sm text-ink/70 font-sans leading-relaxed border-t border-heritage-maroon/10 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
