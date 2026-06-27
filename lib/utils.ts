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

export function normalizeName(value: string): string {
  return value.trim().replace(/\s+/g, " ").slice(0, 80);
}

export function normalizeCity(value: string): string {
  return value.trim().slice(0, 80);
}

export function firstName(full: string | null | undefined): string | null {
  if (!full) return null;
  const first = full.trim().split(/\s+/)[0];
  if (!first) return null;
  return first.charAt(0).toUpperCase() + first.slice(1);
}
