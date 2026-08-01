import React from "react";
import { Link } from "react-router-dom";
import { Newspaper, ArrowRight, Calendar, Clock } from "lucide-react";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import { BLOG_POSTS } from "../data/blog";

interface BlogPageProps {
  onBookCounseling: (programName?: string) => void;
}

export const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.krishnamentor.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.krishnamentor.com/blog" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Krishna Mentor Blog",
    description:
      "Admissions guidance, interview preparation, and personality development insights from Krishna Mentor's academic advisors.",
    url: "https://www.krishnamentor.com/blog",
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: { "@type": "Organization", name: "Krishna Mentor" }
    }))
  }
];

// Single source of truth for this page's title/description/keywords/path —
// scripts/prerender.mjs imports this exact object to bake matching static
// HTML per route, so there's never a second copy to drift out of sync.
export const SEO = {
  title: "Admissions & Mentorship Blog | Krishna Mentor",
  description:
    "Practical admissions guidance, GDPI interview tips, and personality development advice from Krishna Mentor's academic advisors.",
  path: "/blog",
  keywords: "admission tips blog, GDPI preparation blog, college admission guidance India, personality development articles"
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage({ onBookCounseling }: BlogPageProps) {
  return (
    <div className="pt-24 md:pt-28">
      <Seo {...SEO} structuredData={STRUCTURED_DATA} />


      {/* Page Hero */}
      <section className="relative bg-gradient-to-b from-heritage-burgundy via-heritage-maroon to-heritage-burgundy py-16 md:py-24 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-antique-gold/10 rounded-full blur-3xl animate-drift-slow" />
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-antique-gold/15 border border-sunlight-gold/30 rounded-full mb-6">
            <Newspaper className="w-4 h-4 text-sunlight-gold" />
            <span className="font-mono text-xs font-bold text-sunlight-gold uppercase tracking-wider">
              Insights &amp; Guidance
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-cream leading-tight">
            The Krishna Mentor Blog
          </h1>
          <p className="mt-6 text-cream/80 font-sans text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Practical, no-fluff guidance on admissions, interviews, and personal development from our academic
            advisors.
          </p>
        </div>
      </section>

      {/* Post Grid */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post, idx) => (
              <Reveal key={post.slug} delayMs={idx * 60}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group h-full flex flex-col bg-white border border-heritage-maroon/10 rounded-2xl shadow-sm hover:shadow-md hover:border-antique-gold/30 transition-all p-7"
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-antique-gold mb-3">
                    {post.category}
                  </span>
                  <h2 className="font-serif text-xl font-bold text-heritage-burgundy leading-snug mb-3 group-hover:text-heritage-maroon transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-ink/70 font-sans leading-relaxed mb-6 flex-1">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-heritage-maroon/10 mt-auto">
                    <div className="flex items-center gap-3 text-xs text-ink/50 font-sans">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-sans font-semibold text-heritage-maroon/70 group-hover:text-heritage-maroon group-hover:gap-1.5 transition-all">
                      Read more
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center bg-parchment border border-heritage-maroon/10 rounded-2xl p-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-heritage-burgundy">
              Want guidance tailored to your profile?
            </h2>
            <p className="mt-3 text-ink/70 font-sans text-sm md:text-base max-w-xl mx-auto">
              Book a free counseling session and get a personalised admissions roadmap from our advisors.
            </p>
            <button
              onClick={() => onBookCounseling()}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold text-heritage-burgundy hover:shadow-[0_0_15px_rgba(249,223,141,0.5)] transition-all"
            >
              Book Free Counseling
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}