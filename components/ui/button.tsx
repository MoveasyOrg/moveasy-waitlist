"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "pill";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-white text-navy hover:bg-accent hover:text-ink shadow-cta transition-all",
  ghost:
    "bg-white/10 text-white hover:bg-white/20 border border-white/15",
  pill:
    "bg-white text-navy hover:bg-accent hover:text-ink rounded-full",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-5 h-11 text-sm font-medium tracking-tight transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-50 disabled:cursor-not-allowed",
          styles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
