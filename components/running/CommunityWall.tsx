// CommunityWall.tsx: team & community photos pinned up like polaroids.
// Add photos in data/runs.ts → communityWall (photo: "/running/your-file.jpg").
import { communityWall } from "@/data/runs";

const tilt = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];
const tones = ["#e9dccd", "#dfe0da", "#e6d6c6", "#dcd8cf", "#ead9c8", "#e2ddd3"];

export default function CommunityWall() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:gap-10">
      {communityWall.map((c, i) => (
        <figure key={c.caption} data-cursor="photo"
          className={`relative bg-paper p-3 pb-12 text-[#2a2723] shadow-[0_18px_36px_-16px_rgba(0,0,0,0.75)] transition duration-500 hover:z-10 hover:rotate-0 hover:scale-[1.04] ${tilt[i % tilt.length]}`}>
          {/* a strip of tape holding it up */}
          <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-4deg] bg-[#d9cdb6]/75 shadow-sm" />
          <div className="relative aspect-square overflow-hidden" style={{ background: tones[i % tones.length] }}>
            {c.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.photo} alt={c.caption} className="h-full w-full object-cover" />
            ) : (
              // placeholder drawing: a few little runners on a horizon
              <svg viewBox="0 0 100 100" className="h-full w-full text-[#2a2723]/40" aria-hidden>
                <circle cx="72" cy="30" r="9" fill="#fffdf8" opacity="0.8" />
                <path d="M0 74 Q30 64 55 72 T100 68 V100 H0 Z" fill="currentColor" opacity="0.25" />
                {[24, 44, 60].map((x, k) => (
                  <g key={x} transform={`translate(${x} ${56 - k * 2}) scale(0.22)`} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
                    <circle cx="24" cy="0" r="9" /><path d="M22 11 L13 46 M17 24 L38 33 M17 24 L0 33 M13 46 L32 60 L27 84 M13 46 L-4 66 L-18 63" />
                  </g>
                ))}
                <text x="50" y="94" textAnchor="middle" fontSize="6" letterSpacing="1.5" fill="currentColor">PHOTO PLACEHOLDER</text>
              </svg>
            )}
          </div>
          <figcaption className="absolute inset-x-3 bottom-3 text-center font-serif text-sm italic text-[#2a2723]/75">{c.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
