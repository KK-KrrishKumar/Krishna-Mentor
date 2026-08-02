import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Sparkles, ChevronDown, HelpCircle } from "lucide-react";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import { BLOG_POSTS } from "../data/blog";

const SITE_URL = "https://www.krishnamentor.com";

interface BlogPostPageProps {
  onBookCounseling: (programName?: string) => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPostPage({ onBookCounseling }: BlogPostPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const index = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const post = index >= 0 ? BLOG_POSTS[index] : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const nextPost = BLOG_POSTS[(index + 1) % BLOG_POSTS.length];

  const wordCount = post.content.join(" ").split(/\s+/).filter(Boolean).length;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    wordCount,
    articleSection: post.category,
    image: `${SITE_URL}/logo-feather-quill.png`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    author: { "@type": "Organization", name: "Krishna Mentor", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Krishna Mentor",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-feather-quill.png` }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` }
    ]
  };

  // Only present when this post's `faqs` array is populated — keeps FAQPage
  // markup honest (matching visible on-page content) rather than emitted
  // blindly for every post.
  const faqSchema = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer }
        }))
      }
    : null;

  const structuredData = [blogPostingSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <div className="pt-24 md:pt-28">
      <Seo
        title={`${post.title} | Krishna Mentor Blog`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        structuredData={structuredData}
      />

      {/* Article Hero */}
      <section className="relative bg-gradient-to-b from-heritage-burgundy via-heritage-maroon to-heritage-burgundy py-16 md:py-20 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-antique-gold/10 rounded-full blur-3xl animate-drift-slow" />
        <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
          <Link
            to="/blog"
            className="flex w-fit items-center gap-1.5 text-sm font-sans font-medium text-cream/70 hover:text-sunlight-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>

          <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-sunlight-gold">
            {post.category}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-cream leading-tight mt-3">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-cream/60 font-sans mt-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          {/* Key Takeaways — scannable summary box, also a common target for
              featured snippets and AI answer engines summarizing the page. */}
          <Reveal className="mb-10">
            <div className="bg-parchment border border-antique-gold/25 rounded-2xl p-6 md:p-7">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-heritage-maroon" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-heritage-maroon">
                  Key Takeaways
                </span>
              </div>
              <ul className="space-y-2.5">
                {post.takeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-sans text-sm text-ink/80 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-antique-gold mt-1.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="prose-none">
            <div className="space-y-6">
              {post.content.map((paragraph, idx) => (
                <p key={idx} className="font-sans text-base sm:text-lg text-ink/85 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {/* In-article FAQ — mirrors post.faqs 1:1 so the FAQPage schema
              above always matches what's actually visible on the page. */}
          {post.faqs?.length ? (
            <Reveal className="mt-14">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-4 h-4 text-heritage-maroon" />
                <h2 className="font-serif text-xl md:text-2xl font-bold text-heritage-burgundy">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-3">
                {post.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group bg-white border border-heritage-maroon/10 rounded-xl shadow-sm open:shadow-md transition-shadow"
                  >
                    <summary className="list-none cursor-pointer select-none flex items-center justify-between gap-4 px-5 py-4">
                      <h3 className="font-sans text-sm md:text-base font-semibold text-heritage-burgundy">
                        {faq.question}
                      </h3>
                      <ChevronDown className="w-4 h-4 text-antique-gold shrink-0 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-sm text-ink/70 font-sans leading-relaxed border-t border-heritage-maroon/10 pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </Reveal>
          ) : null}

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

          {/* Next article */}
          <Link
            to={`/blog/${nextPost.slug}`}
            className="group mt-10 flex items-center justify-between gap-4 bg-white border border-heritage-maroon/10 rounded-2xl p-6 hover:shadow-md hover:border-antique-gold/30 transition-all"
          >
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-antique-gold">
                Read Next
              </span>
              <h3 className="font-serif text-lg font-bold text-heritage-burgundy mt-1 group-hover:text-heritage-maroon transition-colors">
                {nextPost.title}
              </h3>
            </div>
            <ArrowRight className="w-5 h-5 text-heritage-maroon/50 group-hover:text-heritage-maroon group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        </div>
      </section>
    </div>
  );
}
