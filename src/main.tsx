import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// BrowserRouter gives real, shareable URLs (yoursite.com/courses instead of
// yoursite.com/#/courses). This matters a lot for how the site gets found:
// URL fragments (the part after #) are never sent in the HTTP request, so
// with the old HashRouter every crawler that doesn't run JavaScript — link
// previews on WhatsApp/social, and most AI answer-engine bots — received the
// exact same homepage response for every single page on the site. Clean
// paths fix that, as long as the host is configured to serve index.html for
// any path (see public/_redirects for Netlify/Cloudflare Pages and
// public/.htaccess for Apache-based hosts like GoDaddy shared hosting —
// both are already set up in this project).
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
