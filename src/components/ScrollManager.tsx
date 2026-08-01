import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Place once near the top of the routed app. On every navigation, either
 * scrolls smoothly to a section requested via useGoToSection() (passed as
 * router state), or scrolls to the top of the new page.
 */
export default function ScrollManager() {
  const location = useLocation();
  const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;

  useEffect(() => {
    if (scrollTo) {
      const timer = setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0 });
  }, [location.pathname, scrollTo]);

  return null;
}
