import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  path: string; // e.g. "/courses"
  keywords?: string;
  structuredData?: object | object[];
  image?: string; // absolute URL; falls back to the default social share image
}

const SITE_URL = "https://www.krishnamentor.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/peacock-feather-hero.png`;

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Head manager for the SPA's inner routes (/courses, /certificates, ...).
 * Updates title, meta description/keywords, canonical link, and Open Graph/
 * Twitter tags client-side (useEffect) — fine for real browsers and
 * JS-executing crawlers, and scripts/prerender.mjs separately bakes the
 * correct values for these same tags into the static HTML `<head>` at
 * build time, so non-JS crawlers get them too on first load.
 *
 * Structured data (JSON-LD) is handled differently: it's rendered directly
 * in this component's JSX return (not via useEffect/DOM manipulation), so
 * it's present in the HTML string produced by both the normal client render
 * AND react-dom/server's renderToString during prerendering. JSON-LD is
 * valid anywhere in the document — Google explicitly supports it in
 * <body> — so this is sufficient on its own.
 *
 * Previously this injected <script> tags into document.head from inside
 * useEffect. useEffect never runs during renderToString, so every static
 * dist/<route>/index.html file (what scripts/prerender.mjs writes, and what
 * non-JS crawlers actually receive) silently had ZERO page-specific JSON-LD:
 * no Course, FAQPage, Review/AggregateRating, or BreadcrumbList data at all,
 * on every inner page. That's a meaningful share of real crawl traffic —
 * Bing, most AI answer-engine bots, and Googlebot's initial non-JS pass.
 */
export default function Seo({ title, description, path, keywords, structuredData, image }: SeoProps) {
  useEffect(() => {
    const fullUrl = `${SITE_URL}${path}`;
    const shareImage = image || DEFAULT_OG_IMAGE;
    document.title = title;

    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", fullUrl);
    setMeta("property", "og:image", shareImage);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", shareImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);
  }, [title, description, path, keywords, image]);

  if (!structuredData) return null;
  const items = Array.isArray(structuredData) ? structuredData : [structuredData];

  return (
    <>
      {items.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          data-seo="page"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}