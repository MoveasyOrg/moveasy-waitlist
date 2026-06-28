"use client";

/**
 * Top-down view of a busy Nigerian roundabout. The roundabout sits in the
 * centre, six radial roads cut in and out, and a fleet of cars circle and
 * cross. Transparent over the navy hero gradient.
 */

type Vehicle = {
  kind: "sedan" | "suv" | "keke" | "moto";
  color: string;
  trim?: string;
  /** SVG path string the vehicle follows */
  path: string;
  /** Full loop duration in seconds */
  duration: number;
  /** Where on the path the vehicle starts (0..1) */
  start: number;
};

// 1000 × 540 canvas. Roundabout centre (500, 270), outer road ring 130, inner
// island 70. Roads radiate from the ring to the four cardinals + two diagonals.
const RING_R_OUTER = 130;
const RING_R_INNER = 90;
const ISLAND_R = 60;

// Paths describing each car's journey. Each enters from offscreen, arcs around
// the roundabout in the correct direction (clockwise = "1" sweep flag for
// right-hand traffic in some countries; Nigeria drives on the right so traffic
// in a roundabout flows anti-clockwise — sweep flag 0), then exits.
const vehicles: Vehicle[] = [
  // North entry → East exit
  {
    kind: "sedan",
    color: "#F2A93B",
    path: "M 500 -40 L 500 140 A 130 130 0 0 0 630 270 L 1040 270",
    duration: 12,
    start: 0.05,
  },
  // East entry → South exit
  {
    kind: "suv",
    color: "#FFFFFF",
    path: "M 1040 270 L 630 270 A 130 130 0 0 0 500 400 L 500 580",
    duration: 13,
    start: 0.3,
  },
  // South entry → West exit
  {
    kind: "sedan",
    color: "#7FB069",
    path: "M 500 580 L 500 400 A 130 130 0 0 0 370 270 L -40 270",
    duration: 14,
    start: 0.1,
  },
  // West entry → North exit
  {
    kind: "keke",
    color: "#FFCB6E",
    path: "M -40 270 L 370 270 A 130 130 0 0 0 500 140 L 500 -40",
    duration: 13,
    start: 0.55,
  },
  // NW entry → SE exit (diagonal)
  {
    kind: "moto",
    color: "#67E8F9",
    path: "M -40 -20 L 400 280 A 130 130 0 1 1 600 280 L 1040 580",
    duration: 16,
    start: 0.2,
  },
  // Pure roundabout looper (just circles)
  {
    kind: "sedan",
    color: "#E94560",
    path:
      "M 500 140 A 130 130 0 0 0 370 270 A 130 130 0 0 0 500 400 A 130 130 0 0 0 630 270 A 130 130 0 0 0 500 140 Z",
    duration: 10,
    start: 0,
  },
  // NE entry → SW exit
  {
    kind: "sedan",
    color: "#A7C7E7",
    path: "M 1040 -20 L 600 280 A 130 130 0 1 1 400 280 L -40 580",
    duration: 18,
    start: 0.4,
  },
];

/**
 * Top-down sedan/SUV/keke/moto rendered as SVG. Drawn pointing along +Y in
 * local coordinates with a length axis on Y; the outer <g> applies a 90°
 * pre-rotation so animateMotion's rotate="auto" (which aligns +X with the
 * path tangent) leaves the car oriented along the road.
 */
function Car({ kind, color }: { kind: Vehicle["kind"]; color: string }) {
  const tireColor = "rgba(11,18,59,0.85)";
  const glass = "rgba(255,255,255,0.18)";
  const glassMid = "rgba(255,255,255,0.08)";

  if (kind === "moto") {
    return (
      <g transform="rotate(90)">
        {/* Frame */}
        <rect x="-2.5" y="-9" width="5" height="18" rx="2.5" fill={color} />
        {/* Rider helmet */}
        <circle cx="0" cy="-3" r="3.2" fill="rgba(11,18,59,0.85)" />
        <circle cx="0" cy="-3" r="2" fill={glass} />
        {/* Wheels */}
        <rect x="-2" y="-12" width="4" height="3" rx="0.8" fill={tireColor} />
        <rect x="-2" y="9" width="4" height="3" rx="0.8" fill={tireColor} />
      </g>
    );
  }

  if (kind === "keke") {
    return (
      <g transform="rotate(90)">
        {/* Body (trapezoid — narrower in front) */}
        <path
          d="M -6 -10 L 6 -10 L 8 10 L -8 10 Z"
          fill={color}
        />
        {/* Canopy */}
        <rect x="-6" y="-7" width="12" height="12" rx="1" fill="rgba(11,18,59,0.55)" />
        {/* Front bumper highlight */}
        <rect x="-6" y="-11" width="12" height="1.5" rx="0.5" fill="rgba(255,255,255,0.55)" />
        {/* Tail */}
        <rect x="-7" y="9" width="14" height="1.5" rx="0.5" fill="rgba(255,80,80,0.7)" />
        {/* Wheels */}
        <rect x="-9" y="-3" width="1.5" height="6" rx="0.5" fill={tireColor} />
        <rect x="7.5" y="-3" width="1.5" height="6" rx="0.5" fill={tireColor} />
      </g>
    );
  }

  // Sedan / SUV share the same shape, SUV is slightly chunkier
  const isSUV = kind === "suv";
  const halfWidth = isSUV ? 9 : 8;
  const halfLength = isSUV ? 16 : 15;

  return (
    <g transform="rotate(90)">
      {/* Body */}
      <rect
        x={-halfWidth}
        y={-halfLength}
        width={halfWidth * 2}
        height={halfLength * 2}
        rx="4.5"
        fill={color}
      />
      {/* Hood highlight */}
      <rect
        x={-halfWidth + 1}
        y={-halfLength + 1}
        width={halfWidth * 2 - 2}
        height="3"
        rx="1"
        fill="rgba(255,255,255,0.18)"
      />
      {/* Front windshield */}
      <path
        d={`M ${-halfWidth + 1.5} ${-halfLength + 5} L ${halfWidth - 1.5} ${-halfLength + 5} L ${halfWidth - 2.5} ${-halfLength + 11} L ${-halfWidth + 2.5} ${-halfLength + 11} Z`}
        fill={glass}
      />
      {/* Roof */}
      <rect
        x={-halfWidth + 2}
        y={-halfLength + 11}
        width={(halfWidth - 2) * 2}
        height={halfLength * 2 - 22}
        fill="rgba(11,18,59,0.42)"
      />
      {/* Rear windshield */}
      <path
        d={`M ${-halfWidth + 2.5} ${halfLength - 11} L ${halfWidth - 2.5} ${halfLength - 11} L ${halfWidth - 1.5} ${halfLength - 5} L ${-halfWidth + 1.5} ${halfLength - 5} Z`}
        fill={glassMid}
      />
      {/* Side mirrors */}
      <rect x={-halfWidth - 1.5} y={-halfLength + 7} width="1.5" height="2.5" rx="0.6" fill={color} />
      <rect x={halfWidth} y={-halfLength + 7} width="1.5" height="2.5" rx="0.6" fill={color} />
      {/* Headlights (front) */}
      <rect x={-halfWidth + 1.5} y={-halfLength + 0.5} width="3" height="2" rx="0.6" fill="rgba(255,243,180,0.95)" />
      <rect x={halfWidth - 4.5} y={-halfLength + 0.5} width="3" height="2" rx="0.6" fill="rgba(255,243,180,0.95)" />
      {/* Taillights (back) */}
      <rect x={-halfWidth + 1} y={halfLength - 2.5} width="4" height="2" rx="0.6" fill="rgba(255,75,75,0.95)" />
      <rect x={halfWidth - 5} y={halfLength - 2.5} width="4" height="2" rx="0.6" fill="rgba(255,75,75,0.95)" />
      {/* Wheels */}
      <rect x={-halfWidth - 0.5} y={-halfLength + 3} width="1.5" height="5" rx="0.5" fill={tireColor} />
      <rect x={halfWidth - 1} y={-halfLength + 3} width="1.5" height="5" rx="0.5" fill={tireColor} />
      <rect x={-halfWidth - 0.5} y={halfLength - 8} width="1.5" height="5" rx="0.5" fill={tireColor} />
      <rect x={halfWidth - 1} y={halfLength - 8} width="1.5" height="5" rx="0.5" fill={tireColor} />
    </g>
  );
}

export function RoadIllustration() {
  const cx = 500;
  const cy = 270;

  // Road segments: from offscreen → roundabout outer ring, in 4 cardinal + 2 diagonal directions.
  const roads = [
    "M 500 -40 L 500 140", // N in
    "M 500 400 L 500 580", // S out
    "M -40 270 L 370 270", // W in
    "M 630 270 L 1040 270", // E out
    "M -40 -20 L 400 280", // NW in
    "M 600 280 L 1040 580", // SE out
    "M 1040 -20 L 600 280", // NE in
    "M 400 280 L -40 580", // SW out
  ];

  return (
    <svg
      viewBox="0 0 1000 540"
      preserveAspectRatio="xMidYMax slice"
      className="block w-full h-[300px] sm:h-[360px] md:h-[420px]"
      aria-hidden
    >
      <defs>
        <linearGradient id="roadFadeV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="38%" stopColor="white" stopOpacity="1" />
          <stop offset="82%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="roadFadeH" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="14%" stopColor="white" stopOpacity="1" />
          <stop offset="86%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="roundaboutFade" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0.55" />
        </radialGradient>
        <mask id="roadMask">
          <rect width="1000" height="540" fill="url(#roadFadeV)" />
          <rect
            width="1000"
            height="540"
            fill="url(#roadFadeH)"
            style={{ mixBlendMode: "multiply" }}
          />
        </mask>
      </defs>

      <g mask="url(#roadMask)">
        {/* Roundabout outer band */}
        <circle
          cx={cx}
          cy={cy}
          r={(RING_R_OUTER + RING_R_INNER) / 2}
          fill="none"
          stroke="rgba(67,81,176,0.55)"
          strokeWidth={RING_R_OUTER - RING_R_INNER}
        />
        {/* Roundabout outline */}
        <circle
          cx={cx}
          cy={cy}
          r={RING_R_OUTER}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="1"
        />
        <circle
          cx={cx}
          cy={cy}
          r={RING_R_INNER}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="1"
        />
        {/* Centre lane dash */}
        <circle
          cx={cx}
          cy={cy}
          r={(RING_R_OUTER + RING_R_INNER) / 2}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.2"
          strokeDasharray="6 10"
        />
        {/* Island (centre of roundabout) */}
        <circle
          cx={cx}
          cy={cy}
          r={ISLAND_R}
          fill="rgba(67,81,176,0.18)"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="1"
        />
        {/* Decorative tree dots on the island */}
        {[
          [-22, -10],
          [10, -22],
          [22, 10],
          [-12, 22],
        ].map(([dx, dy], i) => (
          <circle
            key={i}
            cx={cx + dx}
            cy={cy + dy}
            r={6}
            fill="rgba(127,176,105,0.42)"
            stroke="rgba(127,176,105,0.55)"
            strokeWidth="0.6"
          />
        ))}

        {/* Radial roads */}
        <g fill="none" strokeLinecap="round">
          {roads.map((d, i) => (
            <g key={i}>
              <path d={d} stroke="rgba(67,81,176,0.55)" strokeWidth="56" />
              <path
                d={d}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.2"
                strokeDasharray="6 10"
              />
            </g>
          ))}
        </g>

        {/* Vehicles */}
        {vehicles.map((v, i) => (
          <g key={i}>
            <Car kind={v.kind} color={v.color} />
            <animateMotion
              dur={`${v.duration}s`}
              repeatCount="indefinite"
              rotate="auto"
              path={v.path}
              keyTimes={`0; ${(1 - v.start).toFixed(3)}; ${(1 - v.start).toFixed(3)}; 1`}
              keyPoints={`${v.start.toFixed(3)}; 1; 0; ${v.start.toFixed(3)}`}
              calcMode="linear"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
