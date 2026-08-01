import React from "react";
import { Users, Award, Star, Calendar, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import { CREDIBILITY_STATS } from "../data";
import { CredibilityStat } from "../types";

const ICONS: Record<CredibilityStat["iconName"], LucideIcon> = {
  users: Users,
  award: Award,
  star: Star,
  calendar: Calendar
};

/**
 * Compact "why trust us" stat strip. Sits right under the hero so the first
 * scroll a visitor makes lands on credibility signals, not just a pitch —
 * both for human trust and because AI answer engines / rich results tend to
 * lift concrete, quotable numbers like these when summarizing a business.
 */
export default function CredibilityStrip() {
  return (
    <section className="relative bg-heritage-burgundy py-10 md:py-12 border-y border-antique-gold/20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {CREDIBILITY_STATS.map((stat, idx) => {
            const Icon = ICONS[stat.iconName];
            return (
              <Reveal key={stat.label} delayMs={idx * 80}>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-antique-gold/15 border border-antique-gold/30 flex items-center justify-center mb-1">
                    <Icon className="w-5 h-5 text-sunlight-gold" />
                  </div>
                  <span className="font-serif text-2xl md:text-3xl font-bold text-cream leading-none">
                    {stat.value}
                  </span>
                  <span className="font-sans text-[11px] md:text-xs uppercase tracking-wide text-cream/60">
                    {stat.label}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
