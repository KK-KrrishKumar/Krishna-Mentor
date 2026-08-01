import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Handles smooth-scrolling to in-page section anchors (e.g. "/#about") across
 * route changes, and scrolls to top on plain route navigation. Needed because
 * React Router's client-side navigation doesn't trigger the browser's native
 * hash-scroll behaviour.
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // Wait a tick so the target route has rendered before we try to scroll.
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
