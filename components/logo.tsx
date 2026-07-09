import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The Moveasy M mark — real brand asset (M on a navy square).
 * Use this everywhere we previously had the hand-drawn SVG.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/mark-navy.png"
      alt="Moveasy"
      width={512}
      height={512}
      priority
      className={cn("block rounded-[22%]", className)}
    />
  );
}

/**
 * Full "Moveasy" wordmark (the M-mark integrated into the word).
 * Two variants: on-navy (white lockup on navy) and on-orange.
 */
export function Wordmark({
  variant = "navy",
  className,
}: {
  variant?: "navy" | "orange";
  className?: string;
}) {
  const src =
    variant === "orange" ? "/brand/wordmark-orange.png" : "/brand/wordmark-navy.png";
  return (
    <Image
      src={src}
      alt="Moveasy"
      width={1024}
      height={536}
      className={cn("block h-auto w-auto", className)}
    />
  );
}
