import React, { useEffect, useState } from "react";

/** Reads the current wall-clock time in India (Asia/Kolkata) regardless of
 * the visitor's own timezone/device clock settings, using the browser's
 * built-in Intl timezone conversion rather than a fixed UTC+5:30 offset —
 * this stays correct even if India's offset rules were ever to change. */
function getISTParts() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const parts = formatter.formatToParts(new Date());
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { hours: get("hour") % 24, minutes: get("minute"), seconds: get("second") };
}

interface LiveClockProps {
  className?: string;
}

/** A real-time analog clock, hands driven by the actual current IST time and
 * updated every second — not a decorative "10:10 showroom" graphic. */
export default function LiveClock({ className }: LiveClockProps) {
  const [{ hours, minutes, seconds }, setTime] = useState(getISTParts);

  useEffect(() => {
    const id = setInterval(() => setTime(getISTParts()), 1000);
    return () => clearInterval(id);
  }, []);

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={`Current time in India: ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`}
    >
      <circle cx="50" cy="50" r="46" fill="#FFFBF5" stroke="#B07C2C" strokeWidth="3" />
      <circle cx="50" cy="50" r="39" fill="none" stroke="#B07C2C" strokeWidth="1" opacity="0.35" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 50 + 33 * Math.sin(angle);
        const y1 = 50 - 33 * Math.cos(angle);
        const x2 = 50 + 39 * Math.sin(angle);
        const y2 = 50 - 39 * Math.cos(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#7A1B24"
            strokeWidth={i % 3 === 0 ? 2 : 1}
            strokeLinecap="round"
          />
        );
      })}

      {/* Hour hand */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="24"
        stroke="#4A0E14"
        strokeWidth="3.5"
        strokeLinecap="round"
        transform={`rotate(${hourAngle} 50 50)`}
      />
      {/* Minute hand */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="16"
        stroke="#7A1B24"
        strokeWidth="2.5"
        strokeLinecap="round"
        transform={`rotate(${minuteAngle} 50 50)`}
      />
      {/* Second hand */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="18"
        stroke="#C99544"
        strokeWidth="1.2"
        strokeLinecap="round"
        transform={`rotate(${secondAngle} 50 50)`}
      />
      <circle cx="50" cy="50" r="2.6" fill="#4A0E14" />
    </svg>
  );
}
