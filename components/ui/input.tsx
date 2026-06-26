"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-full bg-transparent px-5 text-sm text-white placeholder:text-white/60 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
