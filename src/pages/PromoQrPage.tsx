import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Download, Link as LinkIcon, QrCode as QrCodeIcon, Sparkles } from "lucide-react";
import Seo from "../components/Seo";

const SITE_URL = "https://www.krishnamentor.com";
const BOOKING_LINK = `${SITE_URL}/?book=1`;

/**
 * Self-serve QR code generator. Point it at the booking link (the default)
 * so anyone who scans a printed flyer/poster/banner lands straight on the
 * site with the "Book Free Counseling" form already open — or type in any
 * other page (e.g. /courses, /certificates) to generate a QR for that
 * instead. Not linked in the main navigation on purpose — bookmark this
 * page (/promote) whenever you need a fresh QR code for a campaign.
 */
export default function PromoQrPage() {
  const [target, setTarget] = useState(BOOKING_LINK);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    if (!target.trim()) {
      setQrDataUrl("");
      return;
    }
    QRCode.toDataURL(target.trim(), {
      width: 640,
      margin: 2,
      color: { dark: "#4a0e14", light: "#fdf6ec" }
    })
      .then((url) => {
        if (!cancelled) {
          setQrDataUrl(url);
          setError("");
        }
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't generate a QR code for that text.");
      });
    return () => {
      cancelled = true;
    };
  }, [target]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "krishna-mentor-qr-code.png";
    a.click();
  };

  return (
    <div className="min-h-screen bg-cream pt-32 pb-20 px-6">
      <Seo
        title="Promo QR Code Generator | Krishna Mentor"
        description="Generate a QR code that links directly to the Krishna Mentor booking form, for flyers, posters, and real-world promotion."
        path="/promote"
      />
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-antique-gold/15 border border-antique-gold/30 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-heritage-maroon" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-heritage-maroon">
              Promotion Tool
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-heritage-burgundy">QR Code Generator</h1>
          <p className="font-sans text-sm text-ink/70 max-w-md mx-auto">
            Scan-ready QR code for flyers, posters, or banners. Defaults to a link that opens the booking form
            directly — change it below to point anywhere else on the site.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
          <label className="block space-y-1.5">
            <span className="flex items-center gap-1.5 text-[11px] uppercase font-mono font-semibold tracking-wider text-heritage-maroon/80">
              <LinkIcon className="w-3 h-3 text-antique-gold" />
              Link to encode
            </span>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-white border border-heritage-maroon/15 focus:border-antique-gold focus:ring-4 focus:ring-antique-gold/15 outline-none rounded-xl px-4 py-2.5 text-ink text-sm shadow-sm transition-all"
            />
          </label>

          <div className="flex flex-wrap gap-2 text-xs font-sans">
            <button
              type="button"
              onClick={() => setTarget(BOOKING_LINK)}
              className="px-3 py-1.5 rounded-full border border-heritage-maroon/20 text-heritage-maroon hover:bg-peach/30 transition-all"
            >
              Booking Form
            </button>
            <button
              type="button"
              onClick={() => setTarget(`${SITE_URL}/courses`)}
              className="px-3 py-1.5 rounded-full border border-heritage-maroon/20 text-heritage-maroon hover:bg-peach/30 transition-all"
            >
              Degree Courses
            </button>
            <button
              type="button"
              onClick={() => setTarget(`${SITE_URL}/certificates`)}
              className="px-3 py-1.5 rounded-full border border-heritage-maroon/20 text-heritage-maroon hover:bg-peach/30 transition-all"
            >
              Certificate Courses
            </button>
          </div>

          <div className="flex flex-col items-center gap-4 pt-2">
            {error && <p className="text-xs text-heritage-crimson">{error}</p>}
            {qrDataUrl && (
              <div className="p-4 bg-white rounded-2xl border border-heritage-maroon/10 shadow-sm">
                <img src={qrDataUrl} alt="Generated QR code" className="w-56 h-56" />
              </div>
            )}
            {!qrDataUrl && !error && (
              <div className="w-56 h-56 flex items-center justify-center text-ink/30 border-2 border-dashed border-heritage-maroon/15 rounded-2xl">
                <QrCodeIcon className="w-10 h-10" />
              </div>
            )}
            <button
              type="button"
              onClick={handleDownload}
              disabled={!qrDataUrl}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-sans font-bold text-sm bg-gradient-to-r from-antique-gold via-sunlight-gold to-antique-gold text-heritage-burgundy hover:shadow-[0_0_18px_rgba(249,223,141,0.55)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Download PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
