import React from "react";

export default function DividerFlute() {
  return (
    <div className="relative w-full py-12 bg-cream flex flex-col items-center justify-center overflow-hidden">
      {/* Soft background light */}
      <div className="absolute w-[80%] h-24 bg-gradient-to-r from-transparent via-antique-gold/10 to-transparent blur-3xl pointer-events-none" />

      {/* Interactive Flute Container */}
      <div className="relative w-full max-w-4xl px-8 group cursor-pointer" title="The Bansuri of Wisdom">
        <div className="flex items-center justify-center w-full h-8 relative">
          
          {/* Left tassel string hanging */}
          <div className="absolute left-10 top-4 w-3 h-12 border-l border-b border-sunlight-gold/40 rounded-bl-md opacity-70 group-hover:opacity-100 transition-opacity" />
          
          {/* The Flute Body (Bansuri) */}
          <div className="relative w-full h-3 rounded-full bg-gradient-to-r from-transparent via-antique-gold via-sunlight-gold via-antique-gold to-transparent flute-glow shadow-md flex items-center justify-between px-16">
            
            {/* Thread Bindings - Traditional Red/Burgundy wraps on the bansuri */}
            <div className="absolute left-[15%] w-2.5 h-4 bg-heritage-maroon rounded-sm border-x border-sunlight-gold/30" />
            <div className="absolute left-[35%] w-2 h-4 bg-heritage-maroon rounded-sm border-x border-sunlight-gold/30" />
            <div className="absolute right-[35%] w-2 h-4 bg-heritage-maroon rounded-sm border-x border-sunlight-gold/30" />
            <div className="absolute right-[15%] w-2.5 h-4 bg-heritage-maroon rounded-sm border-x border-sunlight-gold/30" />

            {/* Finger Holes (the 7 classical swaras of the Bansuri) */}
            <div className="flex justify-center items-center gap-10 mx-auto z-10">
              <div className="w-2 h-2 rounded-full bg-cream border border-antique-gold/60 shadow-inner group-hover:bg-sunlight-gold transition-colors duration-300" />
              <div className="w-2 h-2 rounded-full bg-cream border border-antique-gold/60 shadow-inner group-hover:bg-sunlight-gold transition-colors duration-300" />
              <div className="w-2 h-2 rounded-full bg-cream border border-antique-gold/60 shadow-inner group-hover:bg-sunlight-gold transition-colors duration-300" />
              <div className="w-2 h-2 rounded-full bg-cream border border-antique-gold/60 shadow-inner group-hover:bg-sunlight-gold transition-colors duration-300" />
              <div className="w-2 h-2 rounded-full bg-cream border border-antique-gold/60 shadow-inner group-hover:bg-sunlight-gold transition-colors duration-300" />
              <div className="w-2 h-2 rounded-full bg-cream border border-antique-gold/60 shadow-inner group-hover:bg-sunlight-gold transition-colors duration-300" />
              <div className="w-2 h-2 rounded-full bg-cream border border-antique-gold/60 shadow-inner group-hover:bg-sunlight-gold transition-colors duration-300" />
            </div>

          </div>

          {/* Right tassel string hanging */}
          <div className="absolute right-10 top-4 w-3 h-12 border-r border-b border-sunlight-gold/40 rounded-br-md opacity-70 group-hover:opacity-100 transition-opacity" />

        </div>
        
        {/* Playful prompt indicator on hover */}
        <p className="text-[10px] font-mono tracking-widest text-center uppercase text-sunlight-gold/40 mt-3 group-hover:text-sunlight-gold/90 transition-colors duration-300">
          ─── The Bansuri — A Guide's Instrument ───
        </p>
      </div>
    </div>
  );
}
