import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidEmail(value: string): boolean {
  if (!value || value.length > 254) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(value.trim());
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}
