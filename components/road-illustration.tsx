"use client";

/**
 * Top-down Moveasy city scene: a warm cream "ground" anchors a road grid
 * with a central roundabout, surrounded by brand-coloured buildings, parks,
 * and vehicles. Replaces the all-blue roundabout so the hero gets the
 * yellow/cream accents from the brand pack.
 *
 * Vehicles use animateMotion along paths that stay strictly within the
 * road grid (no off-road drifting).
 */

type Vehicle = {
  kind: "sedan" | "suv" | "keke" | "moto";
  color: string;
  path: string;
  duration: number;
  start: number;
};

// ViewBox 1200 × 600. Road grid:
// - Horizontal main road at y = 360 (lane band 340 – 400 = 60 wide)
// - Vertical road at x = 600 (lane band 580 – 640 = 60 wide)
// - Roundabout centred (600, 360), outer 90, inner 56.
const ROAD_W = 60;
const RB_OUTER = 90;
const RB_INNER = 56;

const vehicles: Vehicle[] = [
  // Horizontal sedan, west → east via roundabout (anti-clockwise around)
  {
    kind: "sedan",
    color: "#F2A93B",
    path: "M -40 360 L 510 360 A 90 90 0 0 0 600 270 A 90 90 0 0 1 690 360 L 1240 360",
    duration: 13,
    start: 0.05,
  },
  // East → West (opposite lane, south of roundabout)
  {
    kind: "suv",
    color: "#FFFFFF",
    path: "M 1240 380 L 690 380 A 90 90 0 0 1 600 450 A 90 90 0 0 0 510 380 L -40 380",
    duration: 15,
    start: 0.4,
  },
  // North → South through roundabout
  {
    kind: "sedan",
    color: "#7FB069",
    path: "M 580 -40 L 580 270 A 90 90 0 0 0 510 360 A 90 90 0 0 1 580 450 L 580 640",
    duration: 14,
    start: 0.2,
  },
  // South → North
  {
    kind: "keke",
    color: "#FFCB6E",
    path: "M 620 640 L 620 450 A 90 90 0 0 0 690 360 A 90 90 0 0 1 620 270 L 620 -40",
    duration: 14,
    start: 0.55,
  },
  // Motorbike weaving along the horizontal road
  {
    kind: "moto",
    color: "#E94560",
    path: "M -40 372 L 510 372 A 90 90 0 0 0 600 282 A 90 90 0 0 1 690 372 L 1240 372",
    duration: 11,
    start: 0.3,
  },
  // Pure roundabout looper
  {
    kind: "sedan",
    color: "#A7C7E7",
    path:
      "M 600 270 A 90 90 0 0 0 510 360 A 90 90 0 0 0 600 450 A 90 90 0 0 0 690 360 A 90 90 0 0 0 600 270 Z",
    duration: 9,
    start: 0,
  },
];

function Car({ kind, color }: { kind: Vehicle["kind"]; color: string }) {
  const tire = "rgba(11,18,59,0.85)";
  const glass = "rgba(255,255,255,0.18)";
  const glassMid = "rgba(255,255,255,0.08)";

  if (kind === "moto") {
    return (
      <g transform="rotate(90)">
        <rect x="-2.5" y="-9" width="5" height="18" rx="2.5" fill={color} />
        <circle cx="0" cy="-3" r="3.2" fill="rgba(11,18,59,0.85)" />
        <circle cx="0" cy="-3" r="2" fill={glass} />
        <rect x="-2" y="-12" width="4" height="3" rx="0.8" fill={tire} />
        <rect x="-2" y="9" width="4" height="3" rx="0.8" fill={tire} />
      </g>
    );
  }

  if (kind === "keke") {
    return (
      <g transform="rotate(90)">
        <path d="M -6 -10 L 6 -10 L 8 10 L -8 10 Z" fill={color} />
        <rect x="-6" y="-7" width="12" height="12" rx="1" fill="rgba(11,18,59,0.55)" />
        <rect x="-6" y="-11" width="12" height="1.5" rx="0.5" fill="rgba(255,255,255,0.55)" />
        <rect x="-7" y="9" width="14" height="1.5" rx="0.5" fill="rgba(255,80,80,0.7)" />
        <rect x="-9" y="-3" width="1.5" height="6" rx="0.5" fill={tire} />
        <rect x="7.5" y="-3" width="1.5" height="6" rx="0.5" fill={tire} />
      </g>
    );
  }

  const isSUV = kind === "suv";
  const hw = isSUV ? 9 : 8;
  const hl = isSUV ? 16 : 15;

  return (
    <g transform="rotate(90)">
      <rect x={-hw} y={-hl} width={hw * 2} height={hl * 2} rx="4.5" fill={color} />
      <rect x={-hw + 1} y={-hl + 1} width={hw * 2 - 2} height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      <path
        d={`M ${-hw + 1.5} ${-hl + 5} L ${hw - 1.5} ${-hl + 5} L ${hw - 2.5} ${-hl + 11} L ${-hw + 2.5} ${-hl + 11} Z`}
        fill={glass}
      />
      <rect x={-hw + 2} y={-hl + 11} width={(hw - 2) * 2} height={hl * 2 - 22} fill="rgba(11,18,59,0.42)" />
      <path
        d={`M ${-hw + 2.5} ${hl - 11} L ${hw - 2.5} ${hl - 11} L ${hw - 1.5} ${hl - 5} L ${-hw + 1.5} ${hl - 5} Z`}
        fill={glassMid}
      />
      <rect x={-hw - 1.5} y={-hl + 7} width="1.5" height="2.5" rx="0.6" fill={color} />
      <rect x={hw} y={-hl + 7} width="1.5" height="2.5" rx="0.6" fill={color} />
      <rect x={-hw + 1.5} y={-hl + 0.5} width="3" height="2" rx="0.6" fill="rgba(255,243,180,0.95)" />
      <rect x={hw - 4.5} y={-hl + 0.5} width="3" height="2" rx="0.6" fill="rgba(255,243,180,0.95)" />
      <rect x={-hw + 1} y={hl - 2.5} width="4" height="2" rx="0.6" fill="rgba(255,75,75,0.95)" />
      <rect x={hw - 5} y={hl - 2.5} width="4" height="2" rx="0.6" fill="rgba(255,75,75,0.95)" />
      <rect x={-hw - 0.5} y={-hl + 3} width="1.5" height="5" rx="0.5" fill={tire} />
      <rect x={hw - 1} y={-hl + 3} width="1.5" height="5" rx="0.5" fill={tire} />
      <rect x={-hw - 0.5} y={hl - 8} width="1.5" height="5" rx="0.5" fill={tire} />
      <rect x={hw - 1} y={hl - 8} width="1.5" height="5" rx="0.5" fill={tire} />
    </g>
  );
}

/** A chowdeck-style stylised building: footprint with top-down windows. */
function Building({
  x,
  y,
  w,
  h,
  fill,
  shade,
  cols = 3,
  rows = 4,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  shade: string;
  cols?: number;
  rows?: number;
}) {
  const padX = w * 0.12;
  const padY = h * 0.1;
  const winW = ((w - padX * 2) / cols) * 0.6;
  const winH = ((h - padY * 2) / rows) * 0.55;
  const stepX = (w - padX * 2) / cols;
  const stepY = (h - padY * 2) / rows;
  return (
    <g>
      {/* Cast shadow */}
      <rect x={x + 4} y={y + 6} width={w} height={h} rx="6" fill="rgba(11,18,59,0.25)" />
      {/* Main body */}
      <rect x={x} y={y} width={w} height={h} rx="6" fill={fill} />
      {/* Top edge highlight */}
      <rect x={x} y={y} width={w} height={h * 0.18} rx="6" fill={shade} />
      {/* Windows */}
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={x + padX + c * stepX + (stepX - winW) / 2}
            y={y + padY + r * stepY + (stepY - winH) / 2}
            width={winW}
            height={winH}
            rx="1.2"
            fill="rgba(11,18,59,0.32)"
          />
        )),
      )}
      {/* Roof accent line */}
      <rect x={x + padX} y={y + 4} width={w - padX * 2} height="2" rx="1" fill="rgba(255,255,255,0.45)" />
    </g>
  );
}

function Tree({ cx, cy, r = 14, color = "#5b8a4f" }: { cx: number; cy: number; r?: number; color?: string }) {
  return (
    <g>
      <circle cx={cx + 1.5} cy={cy + 2.5} r={r} fill="rgba(11,18,59,0.25)" />
      <circle cx={cx} cy={cy} r={r} fill={color} />
      <circle cx={cx - r * 0.35} cy={cy - r * 0.25} r={r * 0.32} fill="rgba(255,255,255,0.12)" />
    </g>
  );
}

export function RoadIllustration() {
  return (
    <svg
      viewBox="0 0 1200 620"
      preserveAspectRatio="xMidYMax slice"
      className="block w-full"
      aria-hidden
    >
      <defs>
        {/* Mask: fade top (into hero content), sides (to viewport edges), and bottom (into page gradient) */}
        <linearGradient id="cityFadeV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="18%" stopColor="white" stopOpacity="1" />
          <stop offset="78%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cityFadeH" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="2.5%" stopColor="white" stopOpacity="1" />
          <stop offset="97.5%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="cityMask">
          <rect width="1200" height="620" fill="url(#cityFadeV)" />
          <rect
            width="1200"
            height="620"
            fill="url(#cityFadeH)"
            style={{ mixBlendMode: "multiply" }}
          />
        </mask>
        {/* Ground gradient — warm cream → soft yellow */}
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE9B5" />
          <stop offset="55%" stopColor="#FFD98A" />
          <stop offset="100%" stopColor="#FFC76A" />
        </linearGradient>
      </defs>

      <g mask="url(#cityMask)">
        {/* Ground band — extends full width and deep so bottom can softly fade into the page */}
        <path
          d="M -60 205 L 1260 205 L 1260 680 L -60 680 Z"
          fill="url(#ground)"
        />

        {/* Mountains / hills silhouette behind the buildings */}
        <path
          d="M -60 225 L 80 165 L 200 215 L 340 155 L 480 215 L 620 180 L 760 220 L 900 160 L 1040 215 L 1180 175 L 1260 210 L 1260 260 L -60 260 Z"
          fill="rgba(27,42,143,0.55)"
        />

        {/* Sky stars / city lights above the horizon (subtle) */}
        <g fill="rgba(255,255,255,0.55)">
          {[
            [80, 60], [180, 110], [310, 50], [420, 130], [560, 70],
            [720, 100], [860, 60], [980, 120], [1100, 80], [240, 160],
            [620, 150], [880, 150],
          ].map(([sx, sy], i) => (
            <circle key={i} cx={sx} cy={sy} r={i % 3 === 0 ? 1.4 : 1} />
          ))}
        </g>

        {/* Buildings — spans the full SVG width so the city reaches both edges */}
        <Building x={-20} y={205} w={70} h={115} fill="#E94560" shade="#FF7A8A" cols={2} rows={4} />
        <Building x={60} y={200} w={60} h={120} fill="#FAFAF7" shade="#FFFFFF" cols={2} rows={4} />
        <Building x={130} y={210} w={70} h={110} fill="#4351B0" shade="#5C6CD4" cols={2} rows={4} />
        <Building x={210} y={195} w={60} h={125} fill="#F2A93B" shade="#FFC36C" cols={2} rows={5} />
        <Building x={280} y={205} w={70} h={115} fill="#FAFAF7" shade="#FFFFFF" cols={3} rows={4} />
        <Building x={360} y={190} w={60} h={130} fill="#1B2A8F" shade="#3A4BC0" cols={2} rows={5} />
        <Building x={430} y={210} w={55} h={110} fill="#7FB069" shade="#A8D08A" cols={2} rows={4} />
        <Building x={770} y={210} w={55} h={110} fill="#7FB069" shade="#A8D08A" cols={2} rows={4} />
        <Building x={835} y={200} w={70} h={120} fill="#FAFAF7" shade="#FFFFFF" cols={3} rows={4} />
        <Building x={915} y={195} w={70} h={125} fill="#F2A93B" shade="#FFC36C" cols={2} rows={5} />
        <Building x={995} y={210} w={60} h={110} fill="#E94560" shade="#FF7A8A" cols={2} rows={4} />
        <Building x={1065} y={200} w={60} h={120} fill="#4351B0" shade="#5C6CD4" cols={2} rows={4} />
        <Building x={1135} y={205} w={70} h={115} fill="#FAFAF7" shade="#FFFFFF" cols={2} rows={4} />
        <Building x={1215} y={210} w={50} h={110} fill="#F2A93B" shade="#FFC36C" cols={2} rows={4} />

        {/* Trees lining the horizon */}
        <Tree cx={50} cy={325} r={16} color="#5b8a4f" />
        <Tree cx={140} cy={340} r={12} color="#6ea35d" />
        <Tree cx={410} cy={330} r={14} color="#5b8a4f" />
        <Tree cx={460} cy={345} r={10} color="#6ea35d" />
        <Tree cx={730} cy={330} r={13} color="#5b8a4f" />
        <Tree cx={1130} cy={335} r={15} color="#6ea35d" />
        <Tree cx={1180} cy={345} r={11} color="#5b8a4f" />

        {/* Roads — laid AFTER mountains/trees so the road sits on the ground */}
        <g>
          {/* Horizontal main road body */}
          <rect x="-40" y={360 - ROAD_W / 2} width="1280" height={ROAD_W} fill="#2A3568" />
          {/* Vertical main road body */}
          <rect x={600 - ROAD_W / 2} y="-40" width={ROAD_W} height="680" fill="#2A3568" />
          {/* Road kerb highlight */}
          <rect x="-40" y={360 - ROAD_W / 2 - 1} width="1280" height="1.5" fill="rgba(255,255,255,0.18)" />
          <rect x="-40" y={360 + ROAD_W / 2 - 0.5} width="1280" height="1.5" fill="rgba(255,255,255,0.18)" />
          <rect x={600 - ROAD_W / 2 - 1} y="-40" width="1.5" height="680" fill="rgba(255,255,255,0.18)" />
          <rect x={600 + ROAD_W / 2 - 0.5} y="-40" width="1.5" height="680" fill="rgba(255,255,255,0.18)" />
          {/* Lane dividers — dashed */}
          <line x1="-40" y1="360" x2={600 - RB_OUTER} y2="360" stroke="rgba(255,236,170,0.85)" strokeWidth="2" strokeDasharray="14 12" />
          <line x1={600 + RB_OUTER} y1="360" x2="1240" y2="360" stroke="rgba(255,236,170,0.85)" strokeWidth="2" strokeDasharray="14 12" />
          <line x1="600" y1="-40" x2="600" y2={360 - RB_OUTER} stroke="rgba(255,236,170,0.85)" strokeWidth="2" strokeDasharray="14 12" />
          <line x1="600" y1={360 + RB_OUTER} x2="600" y2="640" stroke="rgba(255,236,170,0.85)" strokeWidth="2" strokeDasharray="14 12" />
        </g>

        {/* Roundabout */}
        <g>
          {/* Outer road ring */}
          <circle cx="600" cy="360" r={(RB_OUTER + RB_INNER) / 2} fill="none" stroke="#2A3568" strokeWidth={RB_OUTER - RB_INNER} />
          {/* Lane dash on the ring */}
          <circle cx="600" cy="360" r={(RB_OUTER + RB_INNER) / 2} fill="none" stroke="rgba(255,236,170,0.85)" strokeWidth="1.5" strokeDasharray="10 12" />
          {/* Inner island */}
          <circle cx="600" cy="360" r={RB_INNER} fill="#7FB069" />
          <circle cx="600" cy="360" r={RB_INNER} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          {/* Trees on the island */}
          <Tree cx={580} cy={345} r={10} color="#3f6b3a" />
          <Tree cx={612} cy={340} r={9} color="#4f8045" />
          <Tree cx={595} cy={372} r={11} color="#3f6b3a" />
        </g>

        {/* Foreground vegetation strips between road + buildings */}
        <rect x="-40" y={400} width="1280" height="20" fill="rgba(91,138,79,0.35)" />
        <rect x="-40" y={300} width="1280" height="20" fill="rgba(91,138,79,0.35)" />

        {/* Pedestrian zebra crossing approaches */}
        {[400, 800].map((zx, i) => (
          <g key={`zebra-${i}`}>
            {[0, 1, 2, 3].map((s) => (
              <rect
                key={s}
                x={zx + s * 12}
                y={360 - ROAD_W / 2 + 4}
                width="8"
                height={ROAD_W - 8}
                fill="rgba(255,255,255,0.65)"
              />
            ))}
          </g>
        ))}

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
