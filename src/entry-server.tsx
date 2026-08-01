// src/entry-server.tsx
//
// Build-time-only SSR entry point. Not shipped to the browser — it's
// compiled by `npm run build:ssr` (a separate `vite build --ssr` pass)
// into dist-server/, then imported by scripts/prerender.mjs from plain
// Node to render each route's real HTML for the static dist/<route>/
// files. Real visitors never load this file; they get src/main.tsx.
//
// All page components are imported eagerly here (no React.lazy) so that
// renderToString — which is fully synchronous and cannot wait on a
// Suspense boundary's promise — has everything it needs on the first
// pass instead of falling back to empty Suspense fallback markup.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App, { RoutedPages } from "./App";
import CoursesPage from "./pages/CoursesPage";
import CertificatesPage from "./pages/CertificatesPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import InviteUsPage from "./pages/InviteUsPage";
import TuitionPage from "./pages/TuitionPage";
import PromoQrPage from "./pages/PromoQrPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

const eagerPages: RoutedPages = {
  CoursesPage,
  CertificatesPage,
  BlogPage,
  BlogPostPage,
  InviteUsPage,
  TuitionPage,
  PromoQrPage,
  DisclaimerPage,
  PrivacyPolicyPage,
};

// A no-op handler is enough for onBookCounseling/etc during prerendering —
// nothing in the initial render output depends on what these callbacks do,
// only real browser clicks (which hydrate against main.tsx, not this file)
// need the real handlers.
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App pages={eagerPages} />
    </StaticRouter>
  );
}
