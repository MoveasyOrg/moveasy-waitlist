"use client";

/**
 * Top-down view of wavy roads with vehicles cruising along them.
 * Pure inline SVG so it stays under a few kilobytes.
 * Cars follow each road via <animateMotion>. Roads fade into the
 * surrounding navy gradient at the top and bottom.
 */

type Lane = {
  /** SVG path for the road centerline. Starts above viewport, ends below. */
  path: string;
  /** Pixel width of the painted road */
  width: number;
  /** Animation duration in seconds (one full lap) */
  duration: number;
  /** Delay before the first lap */
  delay: number;
  /** Vehicle to render */
  vehicle: "sedan" | "suv" | "moto" | "keke";
  /** Vehicle accent color */
  color: string;
};

const lanes: Lane[] = [
  {
    path: "M 80 -40 C 110 60, 50 140, 90 220, 130 300, 60 360, 100 460",
    width: 56,
    duration: 22,
    delay: 0,
    vehicle: "sedan",
    color: "#F2A93B",
  },
  {
    path: "M 320 -40 C 280 60, 360 130, 300 220, 240 310, 350 380, 310 460",
    width: 56,
    duration: 26,
    delay: 4,
    vehicle: "suv",
    color: "#FFFFFF",
  },
  {
    path: "M 560 -40 C 600 70, 520 150, 580 240, 640 330, 540 390, 580 460",
    width: 46,
    duration: 18,
    delay: 2,
    vehicle: "moto",
    color: "#67E8F9",
  },
  {
    path: "M 800 -40 C 770 60, 830 140, 780 240, 730 340, 820 400, 790 460",
    width: 56,
    duration: 28,
    delay: 7,
    vehicle: "keke",
    color: "#FFCB6E",
  },
];

/**
 * Vehicles are drawn pointing along +Y (the direction of travel down the road)
 * so animateMotion's rotate="auto" (which rotates the local X axis to the
 * tangent) leaves them oriented correctly when paths run vertically.
 *
 * Length axis = Y (taller than wide), front of vehicle at y = -length/2,
 * tail at y = +length/2.
 */
function Vehicle({ kind, color }: { kind: Lane["vehicle"]; color: string }) {
  switch (kind) {
    case "sedan":
      return (
        <g transform="rotate(90)">
          <rect x="-9" y="-16" width="18" height="32" rx="5" fill={color} />
          <rect x="-6" y="-9" width="12" height="11" rx="2" fill="rgba(11,18,59,0.55)" />
          <rect x="-7" y="-15" width="14" height="2" rx="1" fill="rgba(255,255,255,0.55)" />
          <rect x="-7" y="13" width="14" height="2" rx="1" fill="rgba(255,80,80,0.7)" />
        </g>
      );
    case "suv":
      return (
        <g transform="rotate(90)">
          <rect x="-10" y="-18" width="20" height="36" rx="5" fill={color} />
          <rect x="-7" y="-10" width="14" height="14" rx="2" fill="rgba(11,18,59,0.6)" />
          <rect x="-8" y="-17" width="16" height="2" rx="1" fill="rgba(11,18,59,0.4)" />
          <rect x="-8" y="15" width="16" height="2" rx="1" fill="rgba(255,80,80,0.7)" />
        </g>
      );
    case "moto":
      return (
        <g transform="rotate(90)">
          <rect x="-3" y="-12" width="6" height="24" rx="3" fill={color} />
          <circle cx="0" cy="-12" r="3.2" fill="rgba(11,18,59,0.7)" />
          <circle cx="0" cy="12" r="3.6" fill="rgba(11,18,59,0.7)" />
        </g>
      );
    case "keke":
      return (
        <g transform="rotate(90)">
          <path d="M -10 -8 L 10 -8 L 12 14 L -12 14 Z" fill={color} />
          <rect x="-7" y="-6" width="14" height="10" rx="1.5" fill="rgba(11,18,59,0.55)" />
          <rect x="-9" y="-9" width="18" height="2" rx="1" fill="rgba(255,255,255,0.55)" />
        </g>
      );
  }
}

export function RoadIllustration() {
  return (
    <svg
      viewBox="0 0 880 440"
      preserveAspectRatio="xMidYMax slice"
      className="w-full h-[240px] sm:h-[280px] md:h-[320px]"
      aria-hidden
    >
      <defs>
        {/* Fade roads into the surrounding gradient at top and bottom */}
        <linearGradient id="roadFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="22%" stopColor="white" stopOpacity="1" />
          <stop offset="78%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="roadMask">
          <rect width="880" height="440" fill="url(#roadFade)" />
        </mask>
      </defs>

      {/* Roads + cars all masked together so they fade into the gradient */}
      <g mask="url(#roadMask)">
        {/* Road bodies */}
        <g fill="none" strokeLinecap="round">
          {lanes.map((l, i) => (
            <path
              key={`road-${i}`}
              d={l.path}
              stroke="rgba(67,81,176,0.55)"
              strokeWidth={l.width}
            />
          ))}
          {/* Dashed centerlines */}
          {lanes.map((l, i) => (
            <path
              key={`dash-${i}`}
              d={l.path}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.5"
              strokeDasharray="6 10"
            />
          ))}
        </g>

        {/* Vehicles, each riding its own road */}
        {lanes.map((l, i) => (
          <g key={`car-${i}`}>
            <Vehicle kind={l.vehicle} color={l.color} />
            <animateMotion
              dur={`${l.duration}s`}
              begin={`${l.delay}s`}
              repeatCount="indefinite"
              rotate="auto"
              path={l.path}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
