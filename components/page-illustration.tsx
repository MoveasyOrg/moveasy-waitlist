/**
 * Small inline SVG illustrations that anchor each sublink hero band.
 * Brand palette only (navy / accent / cream / royal / paper).
 */

export type IllustrationKind = "about" | "faqs" | "privacy" | "terms";

export function PageIllustration({ kind }: { kind: IllustrationKind }) {
  if (kind === "about") {
    return (
      <svg
        viewBox="0 0 220 220"
        className="absolute right-4 top-4 hidden h-44 w-44 sm:block lg:h-56 lg:w-56"
        aria-hidden
      >
        <defs>
          <linearGradient id="about-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE9B5" />
            <stop offset="100%" stopColor="#FFC76A" />
          </linearGradient>
        </defs>
        {/* Map silhouette of Anambra-ish shape */}
        <path
          d="M40 70 L80 40 L130 38 L170 60 L180 110 L160 160 L120 180 L70 170 L40 130 Z"
          fill="url(#about-ground)"
          opacity="0.9"
        />
        {/* Pin */}
        <circle cx="115" cy="105" r="14" fill="#F2A93B" />
        <circle cx="115" cy="105" r="5" fill="#1B2A8F" />
        <path d="M115 119 L115 138" stroke="#F2A93B" strokeWidth="3" strokeLinecap="round" />
        {/* Roads */}
        <path
          d="M50 110 Q90 90 115 105 Q150 120 175 95"
          stroke="rgba(11,18,59,0.35)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />
        <path
          d="M115 105 Q120 140 90 165"
          stroke="rgba(11,18,59,0.35)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />
      </svg>
    );
  }

  if (kind === "faqs") {
    return (
      <svg
        viewBox="0 0 220 220"
        className="absolute right-4 top-4 hidden h-44 w-44 sm:block lg:h-56 lg:w-56"
        aria-hidden
      >
        {/* Speech bubbles */}
        <path
          d="M30 60 q0 -18 18 -18 L130 42 q18 0 18 18 L148 100 q0 18 -18 18 L70 118 L48 140 L52 118 q-22 0 -22 -18 Z"
          fill="#F2A93B"
        />
        <text x="89" y="92" textAnchor="middle" fontSize="40" fontWeight="700" fill="#1B2A8F">
          ?
        </text>
        <path
          d="M88 130 q0 -16 16 -16 L188 114 q16 0 16 16 L220 168 q0 16 -16 16 L130 184 L108 200 L112 184 q-20 0 -20 -16 Z"
          fill="#FAFAF7"
          opacity="0.95"
        />
        <text x="156" y="160" textAnchor="middle" fontSize="32" fontWeight="700" fill="#1B2A8F">
          !
        </text>
      </svg>
    );
  }

  if (kind === "privacy") {
    return (
      <svg
        viewBox="0 0 220 220"
        className="absolute right-4 top-4 hidden h-44 w-44 sm:block lg:h-56 lg:w-56"
        aria-hidden
      >
        {/* Shield */}
        <path
          d="M110 25 L185 55 L185 110 Q185 165 110 195 Q35 165 35 110 L35 55 Z"
          fill="#F2A93B"
        />
        <path
          d="M110 40 L172 64 L172 110 Q172 156 110 180 Q48 156 48 110 L48 64 Z"
          fill="#FFD98A"
          opacity="0.6"
        />
        {/* Lock */}
        <rect x="86" y="100" width="48" height="44" rx="6" fill="#1B2A8F" />
        <path
          d="M94 100 v-12 a16 16 0 0 1 32 0 v12"
          stroke="#1B2A8F"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="110" cy="120" r="5" fill="#F2A93B" />
        <rect x="107" y="120" width="6" height="14" rx="1.5" fill="#F2A93B" />
      </svg>
    );
  }

  // terms — a scroll / document
  return (
    <svg
      viewBox="0 0 220 220"
      className="absolute right-4 top-4 hidden h-44 w-44 sm:block lg:h-56 lg:w-56"
      aria-hidden
    >
      {/* Paper */}
      <rect x="40" y="30" width="130" height="160" rx="10" fill="#FAFAF7" />
      <rect x="48" y="30" width="6" height="160" fill="#F2A93B" />
      {/* Lines */}
      {[60, 80, 100, 120, 140, 160].map((y, i) => (
        <rect
          key={i}
          x="64"
          y={y}
          width={i % 2 === 0 ? 92 : 72}
          height="6"
          rx="2"
          fill="rgba(11,18,59,0.18)"
        />
      ))}
      {/* Signature stroke */}
      <path
        d="M64 178 q 12 -8 22 0 t 22 0 t 22 0"
        stroke="#1B2A8F"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Stamp */}
      <circle cx="160" cy="60" r="22" fill="none" stroke="#E94560" strokeWidth="3" opacity="0.7" />
      <text x="160" y="65" textAnchor="middle" fontSize="11" fontWeight="700" fill="#E94560" opacity="0.75">
        OK
      </text>
    </svg>
  );
}
