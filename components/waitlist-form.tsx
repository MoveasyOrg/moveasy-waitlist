"use client";

import { useState } from "react";
import { Toast, type ToastTone } from "./toast";
import { NIGERIAN_CITIES } from "@/lib/cities";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path
        d="M21 12a9 9 0 0 1-9 9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/55"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function WaitlistForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [toast, setToast] = useState<{ message: string; tone: ToastTone; name?: string | null } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, city }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        duplicate?: boolean;
        firstName?: string | null;
      };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setToast({
          message: data.error ?? "Something blocked your signup. Try again.",
          tone: "error",
        });
        return;
      }
      if (data.duplicate) {
        setStatus("duplicate");
        setToast({
          message: "Looks like you're already on the list. We'll be in touch the day we open up your city.",
          tone: "duplicate",
          name: data.firstName ?? null,
        });
      } else {
        setStatus("success");
        setToast({
          message: "You're on the list. Watch your inbox for the welcome email.",
          tone: "success",
          name: data.firstName ?? null,
        });
        setName("");
        setCity("");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setToast({ message: "Network failed. Try again.", tone: "error" });
    }
  }

  const inputClass =
    "h-12 w-full rounded-2xl bg-white/5 px-5 text-base text-white placeholder:text-white/55 border border-white/10 focus:border-white/30 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/15 transition disabled:opacity-60";

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="glass shadow-glass mx-auto w-full max-w-lg space-y-3 rounded-3xl p-4 sm:p-5"
      >
        {/* Row 1: Name + City */}
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="First name"
            maxLength={60}
            disabled={status === "loading"}
            className={inputClass}
          />
          <div className="relative">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-label="City"
              disabled={status === "loading"}
              className={`${inputClass} appearance-none pr-10 ${city ? "text-white" : "text-white/55"}`}
            >
              <option value="" className="bg-navy-900 text-white/55">
                Your city
              </option>
              {NIGERIAN_CITIES.map((c) => (
                <option key={c} value={c} className="bg-navy-900 text-white">
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>

        {/* Row 2: Email + Join */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
            disabled={status === "loading"}
            className={`${inputClass} sm:flex-1`}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="grid h-12 shrink-0 grid-flow-col items-center justify-center gap-2 rounded-2xl bg-white px-6 text-sm font-medium text-navy transition hover:bg-accent hover:text-ink disabled:cursor-not-allowed disabled:bg-white/85"
            aria-busy={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <Spinner />
                <span>Joining</span>
              </>
            ) : (
              <span>Join Waitlist</span>
            )}
          </button>
        </div>
      </form>

      <Toast
        message={toast?.message ?? null}
        tone={toast?.tone ?? "success"}
        firstName={toast?.name ?? null}
        onDismiss={() => setToast(null)}
      />
    </>
  );
}
