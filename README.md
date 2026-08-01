# Krishna Mentor — Website

A static marketing site for Krishna Mentor (academic mentorship & admissions
consulting, Gurugram). Built with React, Vite, and Tailwind CSS.

## Run locally

**Prerequisites:** Node.js (18+)

```
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for deployment

```
npm run build
```

This produces a `dist/` folder containing only static files
(`index.html`, CSS, JS). Upload the contents of `dist/` to any static host:

- GoDaddy's regular file hosting / File Manager
- Netlify, Vercel, or Cloudflare Pages (drag-and-drop `dist/`, free tier)
- GitHub Pages

Point your domain's DNS at whichever host you choose.

## How the contact forms work

The "Book Free Counseling" form and the footer contact form send real
email in the background via a Google Apps Script web app — no visitor
mail app pop-up, and still no backend server to host. The business
inbox gets a notification for every lead, and the visitor gets an
automatic confirmation reply. Everything runs through your own Gmail
account; no third-party email service is used.

**One-time setup:** open `src/config/email.ts` and set `APPS_SCRIPT_URL`
to the web app URL from your deployed Apps Script (see
`src/lib/email.ts` for how it's called). Until that's done,
`isEmailConfigured` is `false` and both forms show an inline message
asking the visitor to call or WhatsApp instead, so nothing breaks.

## Build & prerendering

`npm run build` runs `vite build` and then, via the `postbuild` script,
`scripts/prerender.mjs`. That second step writes a static
`dist/<route>/index.html` for every page (courses, certificates, every
blog post, etc.) with that page's own title/description/canonical/OG
tags baked in — not just the homepage's. This matters because
`Seo.tsx` only updates tags client-side, after the page's JavaScript
runs, which real browsers and Googlebot handle fine but which most
social link-preview bots and some AI crawlers don't. If you add,
rename, or remove a page or blog post, update the `ROUTES` list at the
top of `scripts/prerender.mjs` (and `public/sitemap.xml`) to match.

## QR code for offline promotion

Visit `/promote` on the live site any time you need a scannable QR code
for a flyer, poster, or banner — it defaults to a link that opens the
booking form directly, or you can point it at any other page. Not linked
in the main navigation on purpose; bookmark it.

The chatbot answers from a fixed FAQ list in `src/data.ts` (`FAQ_DATA`) —
also fully static, no API calls.

## Project structure

```
src/
  components/   UI components (Navbar, Hero, Chatbot, Footer, etc.)
  data.ts       Program details, testimonials, FAQ content
  types.ts      Shared TypeScript types
  App.tsx       Page composition
  index.css     Tailwind theme, custom animations
public/         robots.txt, sitemap.xml
```
