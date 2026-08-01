// scripts/generate-sitemap.mjs
//
// Generates public/sitemap.xml automatically from a single source of truth
// (STATIC_ROUTES below + BLOG_POSTS in src/data/blog.ts) instead of a
// hand-maintained XML file.
//
// Why this exists: public/sitemap.xml was previously edited by hand, in
// parallel with src/data/blog.ts, scripts/prerender.mjs's ROUTES list, and
// src/App.tsx's <Route> list. Four places that all need to agree on the
// same set of blog slugs is a drift risk — a post added to blog.ts (so it
// renders fine on the site) but never added to sitemap.xml is invisible to
// search engines, and a sitemap entry left behind after a post is removed
// is a dead URL that erodes crawl trust. This script removes the blog half
// of that duplication: BLOG_POSTS is the only place blog post metadata is
// authored, and this script derives the sitemap from it every build.
//
// It also fixes a real accuracy bug: the hand-written sitemap gave every
// blog post the same <lastmod> (the date the file was last hand-edited),
// even though BLOG_POSTS already tracks each post's real `date` and
// optional `updated` field. Search engines use <lastmod> to prioritize
// re-crawling — a uniform date across 15 posts is either wrong for most of
// them or gets silently discounted as untrustworthy. This script uses each
// post's own `updated ?? date`.
//
// Runs automatically before every build via the "prebuild" npm lifecycle
// script (see package.json) — no manual step required.
//
// NOTE: if you add a new top-level page (not a blog post), add it to
// STATIC_ROUTES below AND keep doing what the codebase already does for
// every other page: add it to scripts/prerender.mjs's ROUTES list and to
// src/App.tsx. That part of the duplication still exists — this script
// only removes the *blog post* duplication, which is the part that grows
// over time and was the actual source of drift.

import { build } from "esbuild";
import { writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SITE_URL = "https://www.krishnamentor.com";
const OUT_PATH = path.join(ROOT, "public", "sitemap.xml");

// Top-level static pages worth indexing. (Utility/legal pages — disclaimer,
// privacy-policy, promote — are intentionally left out of the sitemap, same
// as before: they're linked in-app but not pages we want ranking.)
const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/courses", changefreq: "weekly", priority: "0.9" },
  { path: "/certificates", changefreq: "weekly", priority: "0.9" },
  { path: "/invite-us", changefreq: "weekly", priority: "0.8" },
  { path: "/tuition", changefreq: "weekly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" }
];

async function loadBlogPosts() {
  // src/data/blog.ts is plain data (types + an array literal, no JSX/React),
  // so it can be transpiled standalone with esbuild — no need to spin up a
  // full app build just to read it, and no risk of this script's output
  // drifting from what BlogPage/BlogPostPage actually render, since it's
  // reading the exact same file.
  const result = await build({
    entryPoints: [path.join(ROOT, "src", "data", "blog.ts")],
    bundle: false,
    write: false,
    format: "esm",
    platform: "node",
    logLevel: "silent"
  });

  const tmpDir = mkdtempSync(path.join(tmpdir(), "km-sitemap-"));
  const tmpFile = path.join(tmpDir, "blog-data.mjs");
  writeFileSync(tmpFile, result.outputFiles[0].text);
  try {
    const mod = await import(pathToFileURL(tmpFile).href);
    return mod.BLOG_POSTS;
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>"
  ].join("\n");
}

const today = new Date().toISOString().slice(0, 10);
const blogPosts = await loadBlogPosts();

const staticEntries = STATIC_ROUTES.map((route) =>
  urlEntry({
    loc: `${SITE_URL}${route.path}`,
    lastmod: today,
    changefreq: route.changefreq,
    priority: route.priority
  })
);

const blogEntries = blogPosts.map((post) =>
  urlEntry({
    loc: `${SITE_URL}/blog/${post.slug}`,
    lastmod: post.updated ?? post.date,
    changefreq: "monthly",
    priority: "0.6"
  })
);

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  [...staticEntries, ...blogEntries].join("\n") +
  `\n</urlset>\n`;

writeFileSync(OUT_PATH, xml);
console.log(`[generate-sitemap] Wrote ${staticEntries.length + blogEntries.length} URLs to public/sitemap.xml`);
