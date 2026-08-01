import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Info, X } from "lucide-react";

const STORAGE_KEY = "km-notice-dismissed-v1";
export const NOTICE_STRIP_HEIGHT = 36;

interface ConsentPopupProps {
  onVisibilityChange?: (visible: boolean) => void;
}

/**
 * Small, ignorable strip pinned to the top of the site, above the navbar,
 * linking to the Disclaimer and Privacy Policy. Purely informational — no
 * "accept" button, just an X to close. Once closed, it's remembered in
 * this browser (via localStorage) so it doesn't reappear on later visits.
 *
 * Reports its visibility up via onVisibilityChange so the parent can push
 * the (fixed-position) Navbar down by NOTICE_STRIP_HEIGHT while this is
 * showing, so the two never overlap.
 *
 * Bump STORAGE_KEY's version suffix (e.g. -v2) if you ever want it to
 * show again for everyone after a policy update.
 */
export default function ConsentPopup({ onVisibilityChange }: ConsentPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let shouldShow = true;
    try {
      shouldShow = !localStorage.getItem(STORAGE_KEY);
    } catch {
      shouldShow = true;
    }
    setVisible(shouldShow);
    onVisibilityChange?.(shouldShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Non-fatal — worst case it shows again next visit.
    }
    setVisible(false);
    onVisibilityChange?.(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 inset-x-0 z-[60] bg-heritage-burgundy border-b border-antique-gold/30"
      style={{ height: NOTICE_STRIP_HEIGHT }}
    >
      <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-center gap-3">
        <Info className="w-3.5 h-3.5 text-sunlight-gold flex-shrink-0 hidden sm:block" />

        <p className="text-[11px] sm:text-xs text-cream/80 font-sans text-center leading-snug">
          Krishna Mentor is an advisory and consultancy unit. See our{" "}
          <Link to="/disclaimer" className="underline text-sunlight-gold hover:text-antique-gold">
            Disclaimer
          </Link>{" "}
          and{" "}
          <Link to="/privacy-policy" className="underline text-sunlight-gold hover:text-antique-gold">
            Privacy Policy
          </Link>
          .
        </p>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="flex-shrink-0 p-1 text-cream/60 hover:text-cream transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}