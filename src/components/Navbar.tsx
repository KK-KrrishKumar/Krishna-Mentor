import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useGoToSection } from "../hooks/useGoToSection";

interface NavbarProps {
  onBookCounseling: () => void;
  topOffset?: number;
}

type NavItem = { label: string; type: "route"; to: string } | { label: string; type: "section"; id: string };

// Kept intentionally short: only the destinations people actually look for in
// a nav bar (pages + contact). In-page anchors like "Skill Hub" / "Process" /
// "Testimonials" were removed from here since they're already reachable by
// scrolling the homepage, and a leaner nav reads cleaner and converts better.
const navItems: NavItem[] = [
  { label: "Home", type: "route", to: "/" },
  { label: "About", type: "section", id: "about" },
  { label: "Courses", type: "route", to: "/courses" },
  { label: "Certificates", type: "route", to: "/certificates" },
  { label: "Blog", type: "route", to: "/blog" },
  { label: "Contact", type: "section", id: "contact" }
];

export default function Navbar({ onBookCounseling, topOffset = 0 }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const goToSection = useGoToSection();
  const location = useLocation();

  const renderNavLink = (item: NavItem, className: string, onClick?: () => void) => {
    if (item.type === "route") {
      return (
        <Link
          key={item.label}
          to={item.to}
          onClick={() => {
            onClick?.();
            // Clicking a route link that already matches the current page (e.g.
            // "Home" while already on "/") doesn't trigger a navigation, so
            // ScrollManager never re-runs. Scroll to top here instead so the
            // link still behaves as expected after scrolling/jumping around.
            if (location.pathname === item.to) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className={className}
        >
          {item.label}
        </Link>
      );
    }
    return (
      <button
        key={item.label}
        type="button"
        onClick={() => {
          onClick?.();
          goToSection(item.id);
        }}
        className={className}
      >
        {item.label}
      </button>
    );
  };

  return (
    <header
      style={{ top: topOffset }}
      className="fixed left-0 w-full z-50 bg-gradient-to-r from-heritage-burgundy via-heritage-maroon to-heritage-burgundy backdrop-blur-md shadow-lg border-b border-antique-gold/25 transition-[top] duration-300"
    >
      <div className="w-full px-6 md:px-10 lg:px-14 h-24 md:h-28 flex justify-between items-center">
        <Link
          to="/"
          onClick={() => {
            if (location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="relative flex items-center gap-5 group focus:outline-none h-full"
        >
          <div className="relative w-20 md:w-28 h-full shrink-0">
            <picture>
              <source srcSet="/logo-feather-quill-cropped.webp" type="image/webp" />
              <img
                src="/logo-feather-quill-cropped.png"
                alt="Krishna Mentor — feather quill logo"
                width={260}
                height={372}
                loading="eager"
                fetchPriority="high"
                className="absolute left-0 bottom-0 translate-y-[12%] h-24 md:h-32 w-auto object-contain z-30
                           drop-shadow-[0_14px_22px_rgba(0,0,0,0.5)]"
              />
            </picture>
          </div>
          {/* Decorative divider between the mark and the wordmark */}
          <span className="hidden sm:block w-px h-10 bg-gradient-to-b from-transparent via-antique-gold/60 to-transparent shrink-0" />

          <div className="relative">
            <span className="font-serif text-2xl md:text-[1.85rem] font-bold tracking-wide uppercase block leading-none">
              <span className="text-cream">Krishna</span>{" "}
              <span className="text-cream">Mentor</span>
            </span>
            <span className="flex items-center gap-1.5 mt-1.5">
              <span className="w-1 h-1 rounded-full bg-antique-gold" />
              <span className="text-[10.5px] uppercase font-sans tracking-[0.25em] text-peach-soft/90">
                Clarity In Every Decision
              </span>
            </span>
            {/* Animated underline sweep on hover — a subtle, professional flourish rather
                than another static gold block */}
            <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold group-hover:w-full transition-all duration-500 ease-out" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) =>
            renderNavLink(
              item,
              "text-cream/85 hover:text-sunlight-gold font-sans font-medium text-sm transition-colors duration-200 whitespace-nowrap bg-transparent border-0 cursor-pointer p-0"
            )
          )}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/tuition"
            className="icon-pop px-5 py-3 rounded-full font-sans font-semibold text-sm border border-white/40 text-cream hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
          >
            Tuition
          </Link>

          <Link
            to="/invite-us"
            className="icon-pop px-5 py-3 rounded-full font-sans font-semibold text-sm border border-white/40 text-cream hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
          >
            Invite Us
          </Link>
          <button
            onClick={onBookCounseling}
            className="btn-shine px-6 py-3 rounded-full font-sans font-semibold text-sm shadow-[0_8px_24px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.6)] bg-peach/90 backdrop-blur-md border border-white/40 text-heritage-burgundy hover:bg-peach-soft transition-all duration-300 hover:scale-[1.03]"
          >
            Book Free Counseling
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-cream hover:text-sunlight-gold transition-colors focus:outline-none"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-heritage-burgundy/80 backdrop-blur-lg border-t border-antique-gold/20 px-6 py-6 space-y-4 animate-fade-in-up">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) =>
              renderNavLink(
                item,
                "text-left text-cream/85 hover:text-sunlight-gold font-sans font-medium text-base py-1 transition-colors duration-200 bg-transparent border-0 cursor-pointer p-0",
                () => setIsOpen(false)
              )
            )}
          </div>
          <div className="pt-4 border-t border-cream/15 flex flex-col gap-3">
            <Link
              to="/tuition"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 rounded-full font-sans font-semibold text-sm border border-cream/40 text-cream"
            >
              Tuition
            </Link>

            <Link
              to="/invite-us"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 rounded-full font-sans font-semibold text-sm border border-cream/40 text-cream"
            >
              Invite Us
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                onBookCounseling();
              }}
              className="w-full text-center py-3 rounded-full font-sans font-semibold text-sm bg-peach text-heritage-burgundy shadow-md"
            >
              Book Free Counseling
            </button>
          </div>
        </div>
      )}
    </header>
  );
}