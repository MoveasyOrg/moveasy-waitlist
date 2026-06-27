"use client";

/**
 * Top-down view of wavy roads with vehicles cruising along them.
 * Each road carries a few vehicles offset by keyPoints so the scene
 * looks populated and is already in motion on first paint.
 */

type Vehicle = "sedan" | "suv" | "moto" | "keke";

type Lane = {
  /** SVG path for the road centerline (top to bottom of canvas). */
  path: string;
  /** Painted road width in svg units. */
  width: number;
  /** Animation duration in seconds (one full lap). */
  duration: number;
  /** Vehicles riding this road. Each "start" is a 0..1 position along the path. */
  vehicles: { kind: Vehicle; color: string; start: number }[];
};

const lanes: Lane[] = [
  {
    path: "M 80 -40 C 110 60, 50 140, 90 220, 130 300, 60 360, 100 460",
    width: 56,
    duration: 26,
    vehicles: [
      { kind: "sedan", color: "#F2A93B", start: 0.05 },
      { kind: "moto", color: "#67E8F9", start: 0.55 },
    ],
  },
  {
    path: "M 320 -40 C 280 60, 360 130, 300 220, 240 310, 350 380, 310 460",
    width: 56,
    duration: 30,
    vehicles: [
      { kind: "suv", color: "#FFFFFF", start: 0.2 },
      { kind: "sedan", color: "#7FB069", start: 0.7 },
    ],
  },
  {
    path: "M 560 -40 C 600 70, 520 150, 580 240, 640 330, 540 390, 580 460",
    width: 46,
    duration: 22,
    vehicles: [
      { kind: "moto", color: "#F2A93B", start: 0.1 },
      { kind: "keke", color: "#FFCB6E", start: 0.6 },
    ],
  },
  {
    path: "M 800 -40 C 770 60, 830 140, 780 240, 730 340, 820 400, 790 460",
    width: 56,
    duration: 32,
    vehicles: [
      { kind: "keke", color: "#FFCB6E", start: 0.0 },
      { kind: "sedan", color: "#FFFFFF", start: 0.45 },
    ],
  },
];

/**
 * Vehicles are drawn pointing along +Y (length along Y axis).
 * The local g element pre-rotates by 90° so the long axis aligns with +X,
 * which is the axis animateMotion's rotate="auto" snaps to the path tangent.
 */
function Vehicle({ kind, color }: { kind: Vehicle; color: string }) {
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
      className="block w-full h-[260px] sm:h-[300px] md:h-[340px]"
      aria-hidden
    >
      <defs>
        {/* Roads bleed into the navy gradient at both ends */}
        <linearGradient id="roadFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="45%" stopColor="white" stopOpacity="1" />
          <stop offset="80%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="roadMask">
          <rect width="880" height="440" fill="url(#roadFade)" />
        </mask>
      </defs>

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

        {/* Vehicles — multiple per lane, all moving from t=0 thanks to keyPoints */}
        {lanes.flatMap((lane, laneIdx) =>
          lane.vehicles.map((v, vIdx) => {
            // We loop the whole 0→1 path but start at `v.start` by feeding
            // keyTimes/keyPoints that advance from start → 1 → 0 → start.
            const s = v.start.toFixed(3);
            return (
              <g key={`v-${laneIdx}-${vIdx}`}>
                <Vehicle kind={v.kind} color={v.color} />
                <animateMotion
                  dur={`${lane.duration}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                  path={lane.path}
                  keyTimes={`0; ${(1 - v.start).toFixed(3)}; ${(1 - v.start).toFixed(3)}; 1`}
                  keyPoints={`${s}; 1; 0; ${s}`}
                  calcMode="linear"
                />
              </g>
            );
          }),
        )}
      </g>
    </svg>
  );
}
