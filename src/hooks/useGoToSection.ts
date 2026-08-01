import { useNavigate, useLocation } from "react-router-dom";

/**
 * Navigates to an in-page section (e.g. "about", "services") on the homepage.
 * If already on the homepage, scrolls directly. If on another route (e.g.
 * /courses), navigates to "/" first and passes the target section id via
 * router state, so ScrollManager can scroll to it once the homepage renders.
 */
export function useGoToSection() {
  const navigate = useNavigate();
  const location = useLocation();

  return (sectionId: string) => {
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };
}
