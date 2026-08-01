import React from "react";

// An original peacock feather illustration built from first principles: a central
// shaft with paired chevron "barbs" that droop downward and taper to a point at the
// tip — the actual silhouette of a feather — topped with the iconic eye marking.
// Static SVG (no canvas), so animating it with CSS is cheap.
export default function PeacockFeather({ className = "" }: { className?: string }) {
  const shaftX = 130;
  const eyeY = 92;
  const tipY = 560;
  const rows = 46;

  // Each row is one pair of barbs (left + right) drooping away from the shaft.
  // Width tapers smoothly from wide (just below the eye) to a point at the tip.
  const barbs = Array.from({ length: rows }).map((_, i) => {
    const t = i / (rows - 1); // 0 = just below the eye, 1 = the very tip
    const y = eyeY + 34 + t * (tipY - eyeY - 34);
    const width = 108 * Math.pow(1 - t, 0.82) * (1 - 0.05 * t);
    const droop = 26 + 30 * Math.sin(Math.PI * Math.min(t * 1.15, 1));
    const flick = 10 * (1 - t);
    return { y, width, droop, flick };
  });

  return (
    <svg viewBox="0 0 260 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pf-shaft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFE8DE" />
          <stop offset="100%" stopColor="#C9BEA9" />
        </linearGradient>
        <linearGradient id="pf-barb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E6B5C" />
          <stop offset="55%" stopColor="#2FA88E" />
          <stop offset="100%" stopColor="#8FD9C4" />
        </linearGradient>
        <radialGradient id="pf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4FE3D1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4FE3D1" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pf-eye-outer" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#2FBFA6" />
          <stop offset="100%" stopColor="#0E6B5C" />
        </radialGradient>
        <radialGradient id="pf-eye-cyan" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#5FE9DC" />
          <stop offset="100%" stopColor="#189C90" />
        </radialGradient>
        <radialGradient id="pf-eye-navy" cx="42%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#141B3D" />
          <stop offset="100%" stopColor="#080B1F" />
        </radialGradient>
        <linearGradient id="pf-eye-amber" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C97A2E" />
          <stop offset="100%" stopColor="#7A3E10" />
        </linearGradient>
      </defs>

      {/* Soft teal halo behind the eye */}
      <circle cx={shaftX} cy={eyeY + 4} r="92" fill="url(#pf-glow)" />

      {/* Fine wispy strands fanning up and around the eye */}
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (-100 + i * 25) * (Math.PI / 180);
        const len = 70 + (i % 3) * 12;
        const x2 = shaftX + Math.sin(a) * len;
        const y2 = eyeY - 30 - Math.cos(a) * len * 0.9;
        return (
          <path
            key={`top-${i}`}
            d={`M${shaftX} ${eyeY - 20} Q${shaftX + Math.sin(a) * len * 0.5} ${eyeY - 30 - Math.cos(a) * len * 0.5} ${x2} ${y2}`}
            stroke="url(#pf-barb)"
            strokeWidth="1"
            fill="none"
            opacity={0.75}
          />
        );
      })}

      {/* Main plume: paired chevron barbs drooping down and tapering to a point */}
      {barbs.map((b, i) => (
        <g key={i}>
          <path
            d={`M${shaftX} ${b.y} Q${shaftX - b.width * 0.65} ${b.y + b.droop} ${shaftX - b.width} ${b.y + b.droop - b.flick}`}
            stroke="url(#pf-barb)"
            strokeWidth="1.4"
            fill="none"
            opacity={0.9}
          />
          <path
            d={`M${shaftX} ${b.y} Q${shaftX + b.width * 0.65} ${b.y + b.droop} ${shaftX + b.width} ${b.y + b.droop - b.flick}`}
            stroke="url(#pf-barb)"
            strokeWidth="1.4"
            fill="none"
            opacity={0.9}
          />
        </g>
      ))}

      {/* Quill shaft running down the center, on top of the barbs so it reads clearly */}
      <path d={`M${shaftX} ${eyeY + 30} Q${shaftX - 6} ${(eyeY + tipY) / 2} ${shaftX} ${tipY}`} stroke="url(#pf-shaft)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* The iconic feather "eye" */}
      <g>
        <ellipse cx={shaftX} cy={eyeY} rx="58" ry="72" fill="url(#pf-eye-outer)" />
        <ellipse cx={shaftX} cy={eyeY + 4} rx="42" ry="54" fill="url(#pf-eye-cyan)" />
        <ellipse cx={shaftX} cy={eyeY + 9} rx="27" ry="36" fill="url(#pf-eye-navy)" />
        <path d={`M${shaftX - 22} ${eyeY + 9} Q${shaftX} ${eyeY - 6} ${shaftX + 22} ${eyeY + 9} Q${shaftX + 14} ${eyeY + 32} ${shaftX} ${eyeY + 36} Q${shaftX - 14} ${eyeY + 32} ${shaftX - 22} ${eyeY + 9} Z`} fill="url(#pf-eye-amber)" opacity="0.9" />
        <circle cx={shaftX + 6} cy={eyeY} r="10" fill="#3E9BFF" />
        <circle cx={shaftX + 3} cy={eyeY - 4} r="3.5" fill="#BFE8FF" />
      </g>
    </svg>
  );
}
