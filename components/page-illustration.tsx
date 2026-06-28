/**
 * Illustrations for sub-pages.
 * - "decor": small top-right accent (legacy, kept for flexibility)
 * - "background": large, low-opacity, blended background element
 */

export type IllustrationKind = "about" | "faqs" | "privacy" | "terms";
export type IllustrationVariant = "decor" | "background";

export function PageIllustration({
  kind,
  variant = "decor",
}: {
  kind: IllustrationKind;
  variant?: IllustrationVariant;
}) {
  const isBg = variant === "background";

  // Shared low-opacity palette for backgrounds — bumped up so they are visible but still blended
  const bgOpacity = isBg ? 0.08 : 1;
  const bgAccent = "rgba(242,169,59,0.22)";
  const bgPaper = "rgba(250,250,247,0.18)";
  const bgNavy = "rgba(27,42,143,0.22)";

  if (kind === "about") {
    if (isBg) {
      return (
        <svg
          viewBox="0 0 420 420"
          className="absolute -right-6 -top-6 h-[320px] w-[320px] opacity-[0.58] sm:-right-4 sm:h-[380px] sm:w-[380px] lg:-right-8 lg:top-2 lg:h-[460px] lg:w-[460px]"
          aria-hidden
        >
          <defs>
            <linearGradient id="bg-about-ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE9B5" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#FFC76A" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <path
            d="M70 130 L140 75 L230 70 L295 105 L310 185 L275 270 L210 300 L125 285 L75 220 Z"
            fill="url(#bg-about-ground)"
          />
          <circle cx="200" cy="180" r="26" fill={bgAccent} />
          <circle cx="200" cy="180" r="10" fill="rgba(27,42,143,0.35)" />
          <path d="M200 206 L200 242" stroke={bgAccent} strokeWidth="5" strokeLinecap="round" />
          <path d="M95 188 Q150 155 200 180 Q255 205 300 165" stroke="rgba(255,255,255,0.14)" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="6 9" />
          <path d="M200 180 Q210 235 160 275" stroke="rgba(255,255,255,0.14)" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="6 9" />
        </svg>
      );
    }
    // decor (small)
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
        <path
          d="M40 70 L80 40 L130 38 L170 60 L180 110 L160 160 L120 180 L70 170 L40 130 Z"
          fill="url(#about-ground)"
          opacity="0.9"
        />
        <circle cx="115" cy="105" r="14" fill="#F2A93B" />
        <circle cx="115" cy="105" r="5" fill="#1B2A8F" />
        <path d="M115 119 L115 138" stroke="#F2A93B" strokeWidth="3" strokeLinecap="round" />
        <path d="M50 110 Q90 90 115 105 Q150 120 175 95" stroke="rgba(11,18,59,0.35)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="4 6" />
        <path d="M115 105 Q120 140 90 165" stroke="rgba(11,18,59,0.35)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="4 6" />
      </svg>
    );
  }

  if (kind === "faqs") {
    if (isBg) {
      return (
        <svg viewBox="0 0 420 420" className="absolute -right-10 top-6 h-[340px] w-[340px] opacity-[0.58] sm:-right-6 sm:h-[400px] sm:w-[400px] lg:-right-4 lg:h-[480px] lg:w-[480px]" aria-hidden>
          <path d="M60 110 q0 -32 32 -32 L230 78 q32 0 32 32 L280 185 q0 32 -32 32 L125 230 L85 265 L92 230 q-38 0 -38 -32 Z" fill={bgAccent} />
          <text x="165" y="168" textAnchor="middle" fontSize="78" fontWeight="800" fill="rgba(27,42,143,0.32)">?</text>
          <path d="M165 240 q0 -28 28 -28 L325 212 q28 0 28 28 L380 300 q0 28 -28 28 L235 340 L195 370 L202 340 q-35 0 -35 -28 Z" fill={bgPaper} />
          <text x="280" y="295" textAnchor="middle" fontSize="58" fontWeight="800" fill="rgba(27,42,143,0.28)">!</text>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 220 220" className="absolute right-4 top-4 hidden h-44 w-44 sm:block lg:h-56 lg:w-56" aria-hidden>
        <path d="M30 60 q0 -18 18 -18 L130 42 q18 0 18 18 L148 100 q0 18 -18 18 L70 118 L48 140 L52 118 q-22 0 -22 -18 Z" fill="#F2A93B" />
        <text x="89" y="92" textAnchor="middle" fontSize="40" fontWeight="700" fill="#1B2A8F">?</text>
        <path d="M88 130 q0 -16 16 -16 L188 114 q16 0 16 16 L220 168 q0 16 -16 16 L130 184 L108 200 L112 184 q-20 0 -20 -16 Z" fill="#FAFAF7" opacity="0.95" />
        <text x="156" y="160" textAnchor="middle" fontSize="32" fontWeight="700" fill="#1B2A8F">!</text>
      </svg>
    );
  }

  if (kind === "privacy") {
    if (isBg) {
      return (
        <svg viewBox="0 0 420 420" className="absolute -right-8 top-2 h-[300px] w-[300px] opacity-[0.58] sm:-right-2 sm:h-[360px] sm:w-[360px] lg:right-4 lg:h-[440px] lg:w-[440px]" aria-hidden>
          <path d="M210 55 L330 100 L330 195 Q330 285 210 335 Q90 285 90 195 L90 100 Z" fill={bgAccent} />
          <path d="M210 78 L310 115 L310 195 Q310 268 210 310 Q110 268 110 195 L110 115 Z" fill={bgPaper} />
          <rect x="162" y="178" width="96" height="82" rx="10" fill="rgba(27,42,143,0.35)" />
          <path d="M178 178 v-22 a28 28 0 0 1 56 0 v22" stroke="rgba(242,169,59,0.25)" strokeWidth="10" fill="none" strokeLinecap="round" />
          <circle cx="210" cy="215" r="9" fill={bgAccent} />
          <rect x="204" y="215" width="12" height="26" rx="2" fill={bgAccent} />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 220 220" className="absolute right-4 top-4 hidden h-44 w-44 sm:block lg:h-56 lg:w-56" aria-hidden>
        <path d="M110 25 L185 55 L185 110 Q185 165 110 195 Q35 165 35 110 L35 55 Z" fill="#F2A93B" />
        <path d="M110 40 L172 64 L172 110 Q172 156 110 180 Q48 156 48 110 L48 64 Z" fill="#FFD98A" opacity="0.6" />
        <rect x="86" y="100" width="48" height="44" rx="6" fill="#1B2A8F" />
        <path d="M94 100 v-12 a16 16 0 0 1 32 0 v12" stroke="#1B2A8F" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="110" cy="120" r="5" fill="#F2A93B" />
        <rect x="107" y="120" width="6" height="14" rx="1.5" fill="#F2A93B" />
      </svg>
    );
  }

  // terms
  if (isBg) {
    return (
      <svg viewBox="0 0 420 420" className="absolute -right-6 top-8 h-[310px] w-[310px] opacity-[0.58] sm:right-0 sm:h-[370px] sm:w-[370px] lg:-right-2 lg:h-[450px] lg:w-[450px]" aria-hidden>
        <rect x="80" y="60" width="240" height="295" rx="18" fill={bgPaper} />
        <rect x="95" y="60" width="11" height="295" fill={bgAccent} />
        {[110,145,180,215,250,285].map((y, i) => (
          <rect key={i} x="120" y={y} width={i % 2 === 0 ? 170 : 132} height="11" rx="3" fill="rgba(11,18,59,0.12)" />
        ))}
        <path d="M120 320 q 22 -15 40 0 t 40 0 t 40 0" stroke="rgba(27,42,143,0.25)" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="295" cy="108" r="38" fill="none" stroke="rgba(233,69,96,0.18)" strokeWidth="6" />
        <text x="295" y="117" textAnchor="middle" fontSize="18" fontWeight="800" fill="rgba(233,69,96,0.22)">OK</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 220 220" className="absolute right-4 top-4 hidden h-44 w-44 sm:block lg:h-56 lg:w-56" aria-hidden>
      <rect x="40" y="30" width="130" height="160" rx="10" fill="#FAFAF7" />
      <rect x="48" y="30" width="6" height="160" fill="#F2A93B" />
      {[60, 80, 100, 120, 140, 160].map((y, i) => (
        <rect key={i} x="64" y={y} width={i % 2 === 0 ? 92 : 72} height="6" rx="2" fill="rgba(11,18,59,0.18)" />
      ))}
      <path d="M64 178 q 12 -8 22 0 t 22 0 t 22 0" stroke="#1B2A8F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="160" cy="60" r="22" fill="none" stroke="#E94560" strokeWidth="3" opacity="0.7" />
      <text x="160" y="65" textAnchor="middle" fontSize="11" fontWeight="700" fill="#E94560" opacity="0.75">OK</text>
    </svg>
  );
}
