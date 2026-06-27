/**
 * WhatsApp light-mode chat placeholder.
 * Beige doodle wallpaper, white incoming bubbles, light-green outgoing.
 * Used inside FeatureMockup until the real exported screenshot lands.
 */

export type ChatBubble =
  | {
      kind: "text";
      side: "in" | "out";
      text: React.ReactNode;
    }
  | {
      kind: "voice";
      side: "in" | "out";
      length: string;
    }
  | {
      kind: "image";
      side: "in" | "out";
      caption?: string;
    };

const WALLPAPER = (
  <svg
    aria-hidden
    className="absolute inset-0 h-full w-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="wa-doodle"
        width="120"
        height="120"
        patternUnits="userSpaceOnUse"
      >
        {/* Subtle off-white doodle marks inspired by the WhatsApp wallpaper */}
        <g fill="none" stroke="#b8a98a" strokeOpacity="0.18" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Paper plane */}
          <path d="M 14 22 l 18 -6 -7 6 z" />
          <path d="M 25 22 l 0 5" />
          {/* Heart */}
          <path d="M 78 18 c -3 -4, -10 -2, -10 3 c 0 4, 6 7, 10 11 c 4 -4, 10 -7, 10 -11 c 0 -5, -7 -7, -10 -3 z" />
          {/* Smiley */}
          <circle cx="36" cy="62" r="7" />
          <circle cx="33.5" cy="60.5" r="0.6" fill="#b8a98a" stroke="none" />
          <circle cx="38.5" cy="60.5" r="0.6" fill="#b8a98a" stroke="none" />
          <path d="M 33 64 q 3 3 6 0" />
          {/* Sun */}
          <circle cx="96" cy="60" r="4" />
          <path d="M 96 52 l 0 3 M 96 65 l 0 3 M 88 60 l 3 0 M 101 60 l 3 0 M 91 55 l 2 2 M 99 55 l -2 2 M 91 65 l 2 -2 M 99 65 l -2 -2" />
          {/* Leaf */}
          <path d="M 18 92 c 12 -6 16 6 0 10 c -2 -4 -2 -7 0 -10 z" />
          {/* Coffee cup */}
          <path d="M 70 92 l 0 8 q 0 4 5 4 l 6 0 q 5 0 5 -4 l 0 -8 z" />
          <path d="M 86 95 q 5 0 5 4 q 0 4 -5 4" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="#e7dfd2" />
    <rect width="100%" height="100%" fill="url(#wa-doodle)" />
  </svg>
);

const TICK = (
  <svg
    width="14"
    height="10"
    viewBox="0 0 14 10"
    fill="none"
    stroke="#4fc3f7"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block align-middle"
    aria-hidden
  >
    <path d="M 1 5 l 3 3 l 6 -6" />
    <path d="M 5 8 l 3 -3 l 0 0" />
    <path d="M 5 5 l 5 -5" />
  </svg>
);

function TextBubble({
  side,
  children,
  time,
}: {
  side: "in" | "out";
  children: React.ReactNode;
  time: string;
}) {
  const out = side === "out";
  return (
    <div className={out ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          "relative max-w-[80%] rounded-lg px-2.5 py-1.5 text-[11px] leading-snug shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] " +
          (out ? "rounded-tr-sm bg-[#d9fdd3]" : "rounded-tl-sm bg-white")
        }
      >
        <div className="text-[#111b21]">{children}</div>
        <div className="mt-0.5 flex items-center justify-end gap-1 text-[9px] text-[#667781]">
          <span>{time}</span>
          {out && TICK}
        </div>
      </div>
    </div>
  );
}

function VoiceBubble({ side, length, time }: { side: "in" | "out"; length: string; time: string }) {
  const out = side === "out";
  const bars = [3, 6, 4, 8, 5, 9, 4, 7, 3, 6, 5, 8, 4, 6, 5, 7, 4];
  return (
    <div className={out ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          "flex items-center gap-2 rounded-lg px-2.5 py-2 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] " +
          (out ? "rounded-tr-sm bg-[#d9fdd3]" : "rounded-tl-sm bg-white")
        }
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#25d366] text-white">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <div className="flex items-center gap-[1.5px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className="block w-[1.5px] rounded-full bg-[#8696a0]"
              style={{ height: `${h * 1.2}px` }}
            />
          ))}
        </div>
        <div className="flex flex-col items-end leading-none">
          <span className="text-[10px] text-[#111b21]">{length}</span>
          <span className="mt-0.5 flex items-center gap-1 text-[9px] text-[#667781]">
            {time}
            {out && TICK}
          </span>
        </div>
      </div>
    </div>
  );
}

function ImageBubble({
  side,
  caption,
  time,
}: {
  side: "in" | "out";
  caption?: string;
  time: string;
}) {
  const out = side === "out";
  return (
    <div className={out ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          "max-w-[78%] overflow-hidden rounded-lg p-1 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] " +
          (out ? "rounded-tr-sm bg-[#d9fdd3]" : "rounded-tl-sm bg-white")
        }
      >
        {/* Subtle "image" placeholder block — the real product shows the photo */}
        <div className="relative h-20 w-44 overflow-hidden rounded-md bg-[linear-gradient(135deg,#9ca3af_0%,#6b7280_50%,#374151_100%)]">
          <svg
            className="absolute inset-0 m-auto h-7 w-7 text-white/70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
        {caption && (
          <div className="px-1.5 pt-1.5 text-[11px] leading-snug text-[#111b21]">
            {caption}
          </div>
        )}
        <div className="mt-0.5 flex items-center justify-end gap-1 px-1.5 pb-1 text-[9px] text-[#667781]">
          <span>{time}</span>
          {out && TICK}
        </div>
      </div>
    </div>
  );
}

export function WhatsappChat({
  bubbles,
  online = "online",
}: {
  bubbles: (ChatBubble & { time: string })[];
  online?: string;
}) {
  return (
    <div className="relative flex h-full w-full flex-col">
      {/* iOS status bar — sits behind the Dynamic Island */}
      <div className="relative z-10 flex h-7 items-center justify-between bg-[#075e54] px-4 text-[10px] font-semibold text-white">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <svg width="14" height="9" viewBox="0 0 18 12" fill="currentColor" aria-hidden>
            <rect x="0" y="8" width="3" height="4" rx="0.5" />
            <rect x="5" y="5" width="3" height="7" rx="0.5" />
            <rect x="10" y="2" width="3" height="10" rx="0.5" />
            <rect x="15" y="0" width="3" height="12" rx="0.5" />
          </svg>
          <svg width="14" height="9" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
            <path d="M1 5a10 10 0 0 1 14 0" />
            <path d="M3.5 7.5a6 6 0 0 1 9 0" />
            <path d="M6 10a2.5 2.5 0 0 1 4 0" />
          </svg>
          <svg width="20" height="10" viewBox="0 0 22 12" aria-hidden>
            <rect x="0.5" y="0.5" width="19" height="11" rx="2.5" fill="none" stroke="currentColor" strokeOpacity="0.85" />
            <rect x="20.5" y="3.5" width="1.5" height="5" rx="0.5" fill="currentColor" fillOpacity="0.85" />
            <rect x="2" y="2" width="14" height="8" rx="1.5" fill="currentColor" />
          </svg>
        </span>
      </div>
      {/* Header */}
      <div className="relative z-10 flex items-center gap-2.5 bg-[#075e54] px-3 pb-2.5 pt-1 text-white">
        <button
          aria-label="Back"
          className="grid h-6 w-6 place-items-center text-white/85"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#25d366] text-[12px] font-bold">
          M
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold">Moveasy</p>
          <p className="truncate text-[10px] text-white/75">{online}</p>
        </div>
        <div className="ml-auto flex items-center gap-3 text-white/85">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <rect x="2" y="6" width="14" height="12" rx="2" />
            <path d="m22 8-6 4 6 4z" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.68.24-1.04-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
          </svg>
          <svg width="3" height="14" viewBox="0 0 3 14" fill="currentColor" aria-hidden>
            <circle cx="1.5" cy="1.5" r="1.5" />
            <circle cx="1.5" cy="7" r="1.5" />
            <circle cx="1.5" cy="12.5" r="1.5" />
          </svg>
        </div>
      </div>

      {/* Wallpaper + bubbles */}
      <div className="relative flex-1 overflow-hidden">
        {WALLPAPER}
        <ul className="relative space-y-1.5 px-2.5 py-3">
          {bubbles.map((b, i) => {
            if (b.kind === "text") {
              return (
                <li key={i}>
                  <TextBubble side={b.side} time={b.time}>
                    {b.text}
                  </TextBubble>
                </li>
              );
            }
            if (b.kind === "voice") {
              return (
                <li key={i}>
                  <VoiceBubble side={b.side} length={b.length} time={b.time} />
                </li>
              );
            }
            return (
              <li key={i}>
                <ImageBubble side={b.side} caption={b.caption} time={b.time} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
