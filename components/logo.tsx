import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block", className)}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 140 110 L 175 88 L 175 90" />
        <path d="M 175 130 L 175 412" />
        <path d="M 175 412 C 175 372,195 232,220 232 C 245 232,260 280,270 360 L 280 412 C 280 372,300 232,325 232 C 350 232,365 280,375 360 L 385 412 C 385 372,405 232,432 232 C 457 232,472 280,475 412" />
      </g>
    </svg>
  );
}
